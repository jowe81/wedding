const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  console.log("SETUPPROXY");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend",
      pathRewrite: { "^/api": "" }
    })
  );
};
