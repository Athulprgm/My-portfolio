import axios from 'axios';

// Resolve environment variables and fallbacks
const isProd = import.meta.env.PROD;
const rawEnvUrl = import.meta.env.VITE_API_URL;

// Normalize API URL to ensure it ends with '/api'
// If no VITE_API_URL is provided, fall back to Render in production and localhost in dev.
const getNormalizedApiUrl = () => {
  if (rawEnvUrl) {
    return rawEnvUrl.endsWith('/api') ? rawEnvUrl : `${rawEnvUrl.replace(/\/$/, '')}/api`;
  }
  return isProd
    ? 'https://backend-portfolio-vk01.onrender.com/api'
    : 'http://localhost:8000/api';
};

const apiBaseUrl = getNormalizedApiUrl();

// Create the production-grade Axios client
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000, // 30 seconds request timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Configure default retry parameters on the client
apiClient.defaults.retry = 3; // Retry up to 3 times
apiClient.defaults.retryDelay = 1000;

// Request Interceptor: Inject Admin Key automatically
apiClient.interceptors.request.use(
  (config) => {
    const adminKey = sessionStorage.getItem('admin_key') || import.meta.env.VITE_ADMIN_KEY || '';
    if (adminKey) {
      config.headers['X-Admin-Key'] = adminKey;
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
 * Gets the backend root base URL (without '/api' suffix)
 */
export function getApiBase() {
  return apiBaseUrl.endsWith('/api') ? apiBaseUrl.slice(0, -4) : apiBaseUrl;
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

  if (!resolvedPath) return '';

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

  return resolvedPath.startsWith('/') ? `${apiBase}${resolvedPath}` : `${apiBase}/${resolvedPath}`;
}

export default apiClient;
