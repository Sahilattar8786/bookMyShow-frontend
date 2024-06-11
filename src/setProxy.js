const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:7000', // Change this to match your backend server URL
      changeOrigin: true,
    })
  );
};