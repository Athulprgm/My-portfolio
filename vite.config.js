import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { Agent } from 'https';
import dns from 'dns';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Use VITE_API_URL from .env, or fallback to hosted backend
  let apiUrl = env.VITE_API_URL || 'https://api.athul.online';
  
  // Remove trailing slash and any /api suffix to get the base domain
  apiUrl = apiUrl.replace(/\/$/, '');
  if (apiUrl.endsWith('/api')) {
    apiUrl = apiUrl.slice(0, -4);
  }

  // TLS agent — fixes ECONNRESET when Vite proxies to the HTTPS backend.
  // keepAlive is disabled because the backend drops persistent connections.
  const tlsAgent = new Agent({
    rejectUnauthorized: false,
    keepAlive: false,
    lookup: (hostname, options, callback) => {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (hostname === 'api.athul.online') {
        const addr = '147.79.69.149';
        const family = 4;
        if (options.all) {
          callback(null, [{ address: addr, family }]);
        } else {
          callback(null, addr, family);
        }
      } else {
        dns.lookup(hostname, options, callback);
      }
    }
  });

  return {
    plugins: [vue(), tailwindcss()],
    server: {
      // Proper headers for video/media streaming in dev
      headers: {
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
      },
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          agent: tlsAgent,
          proxyTimeout: 10000, // 10 s — give up if backend doesn't respond
          timeout: 10000,
          configure: (proxy) => {
            proxy.on('error', (err, _req, res) => {
              // Log cleanly instead of crashing; return 502 to the browser
              console.warn('[vite proxy] backend error:', err.message);
              if (res && !res.headersSent) {
                res.writeHead(502, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Backend unavailable', detail: err.message }));
              }
            });
          },
        },
      },
    },
  };
});
