const { createProxyMiddleware } = require('http-proxy-middleware');

let backendHostname = process.env.REACT_APP_BACKEND_HOSTNAME || 'localhost';
let backendPort = process.env.REACT_APP_BACKEND_PORT || 4000;

module.exports = (app) => {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://' + backendHostname + ':' + backendPort,
      ws: true,
    }),
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://' + backendHostname + ':' + backendPort,
      changeOrigin: true,
    }),
  );
};
