import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

let backendHostname = process.env.REACT_APP_BACKEND_HOSTNAME || 'localhost';
let backendPort = process.env.REACT_APP_BACKEND_PORT || 4000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
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
