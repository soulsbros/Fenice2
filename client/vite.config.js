import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

let backendHostname = process.env.VITE_APP_BACKEND_HOSTNAME || 'localhost';
let backendPort = process.env.VITE_APP_BACKEND_PORT || 4000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      port: 3000,
    },
    proxy: {
      '/socket.io': {
        target: 'http://' + backendHostname + ':' + backendPort,
        ws: true,
      },
      '/api': {
        target: 'http://' + backendHostname + ':' + backendPort,
        changeOrigin: true,
      },
    },
  },
});
