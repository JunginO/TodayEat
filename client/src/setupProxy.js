const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0",
      changeOrigin: true,
      pathRewrite: {
        "^/api/v1": " ",
      },
    })
  );

  app.use(
    "/api/v2",
    createProxyMiddleware({
      target: "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc",
      changeOrigin: true,
      pathRewrite: {
        "^/api/v2": " ",
      },
    })
  );
};
