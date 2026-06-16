import axios from 'axios';

// Resolve environment variables and fallbacks
const isProd = import.meta.env.PROD;
const rawEnvUrl = import.meta.env.VITE_API_URL;

// The real hosted backend root — always used for building image/storage URLs.
// In dev we cannot use a relative path for images because they are served
// from api.athul.online, not from localhost.
const getRealBackendRoot = () => {
  if (rawEnvUrl) {
    const base = rawEnvUrl.replace(/\/$/, '');
    return base.endsWith('/api') ? base.slice(0, -4) : base;
  }
  return 'https://api.athul.online';
};

const realBackendRoot = getRealBackendRoot();

// In DEV mode use a relative '/api' path so the Vite proxy tunnels the request
// server-side — this avoids CORS preflight blocks on the X-Admin-Key header.
// In production the full absolute URL is used directly.
const getNormalizedApiUrl = () => {
  if (!isProd) {
    return '/api'; // proxied by vite.config.js → https://api.athul.online/api
  }
  return `${realBackendRoot}/api`;
};

const apiBaseUrl = getNormalizedApiUrl();

// Create the production-grade Axios client
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000, // 30 seconds request timeout
  headers: {
    'Accept': 'application/json',
  },
});

// Configure default retry parameters on the client
apiClient.defaults.retry = 3; // Retry up to 3 times
apiClient.defaults.retryDelay = 1000;

// Request Interceptor: Inject Admin Key automatically
apiClient.interceptors.request.use(
  (config) => {
    // If sending FormData, delete Content-Type to let browser/Axios set it with correct boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    // Only inject the admin key for write operations (POST, PUT, DELETE, PATCH).
    // GET requests hit the public endpoint — sending the key routes them to a
    // non-existent admin handler on the backend and causes a 404.
    const method = (config.method || 'get').toUpperCase();
    const isWriteOp = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    if (isWriteOp) {
      if (!config.headers['X-Admin-Key']) {
        const adminKey = sessionStorage.getItem('admin_key') || import.meta.env.VITE_ADMIN_KEY || '';
        if (adminKey) {
          config.headers['X-Admin-Key'] = adminKey;
        }
      }
      if (!config.headers['Authorization']) {
        const adminToken = sessionStorage.getItem('admin_token');
        if (adminToken) {
          config.headers['Authorization'] = `Bearer ${adminToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Retries & Error Logging
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Reject immediately if no config or retry is disabled
    if (!config || config.retry === undefined) {
      return Promise.reject(error);
    }

    // Set or increment retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we have exceeded max retries
    if (config.__retryCount >= config.retry) {
      console.error(`[API Error] Request failed after ${config.retry} retries:`, error.message);
      return Promise.reject(error);
    }

    // Determine if we should retry (Network error or 5xx status codes)
    const isNetworkError = !response;
    const is5xxError = response && response.status >= 500;

    if (isNetworkError || is5xxError) {
      config.__retryCount += 1;
      
      // Calculate delay with exponential backoff: 1s, 2s, 4s...
      const backoffDelay = Math.pow(2, config.__retryCount - 1) * (config.retryDelay || 1000);
      
      console.warn(
        `[API Warning] Request failed: ${error.message}. ` +
        `Retrying (${config.__retryCount}/${config.retry}) in ${backoffDelay}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, backoffDelay));

      // Re-run the request with Axios instance
      return apiClient(config);
    }

    return Promise.reject(error);
  }
);

/**
 * Gets the real backend root base URL (without '/api' suffix).
 * Always returns the absolute hosted URL — used to build storage image URLs.
 */
export function getApiBase() {
  return realBackendRoot;
}

export function getImageUrl(path, fallbackPath = '') {
  const isValid = (p) => {
    if (!p) return false;
    if (Array.isArray(p)) return p.length > 0 && isValid(p[0]);
    if (typeof p !== 'string') return false;
    const trimmed = p.trim();
    return trimmed !== '' && trimmed !== '[]' && trimmed !== '{}';
  };

  let resolvedPath = '';
  if (isValid(path)) {
    resolvedPath = Array.isArray(path) ? path[0] : path;
  } else if (isValid(fallbackPath)) {
    resolvedPath = Array.isArray(fallbackPath) ? fallbackPath[0] : fallbackPath;
  }

  if (!resolvedPath) {
    return '/360_F_541698271_tqSibLbJ2iPhcN8hrDy9cFDjbe98JYbQ.webp';
  }

  // Already absolute, data URI, or blob URI
  if (resolvedPath.startsWith('http://') || resolvedPath.startsWith('https://') || resolvedPath.startsWith('data:') || resolvedPath.startsWith('blob:')) {
    return resolvedPath;
  }

  const apiBase = getApiBase();
  
  // Format local storage path correctly
  if (resolvedPath.startsWith('/storage')) {
    return `${apiBase}${resolvedPath}`;
  }
  if (resolvedPath.startsWith('storage')) {
    return `${apiBase}/${resolvedPath}`;
  }

  // Any other relative path is assumed to be a frontend asset, so return as-is
  return resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`;
}


export default apiClient;
