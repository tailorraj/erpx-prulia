const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://167.99.77.197",
      changeOrigin: true
    })
  );
};
