const mockConfig = require('./mock.config')
/*
function(pathname, req) {
  return pathname.indexOf('portalApp') !== -1
}s
*/
const proxyConfig = [
  [ 
    '/portalApi', {
      target: process.env.targetUrlApi,
      pathRewrite: {
        '^/portalApi': ''
      },
      secure: false,
      onProxyRes: function (proxyRes, req, res) {
        // console.log('api', proxyRes.url, headers)
        // if (mockConfig.mockEnable) {
        //   console.error("你现在请求的是mock接口, 记得关闭");
        // }
      },
      onError: function onError(err, req, res) {
        console.error("api接口请求：" + req + "；响应：" + res + "；错误err" + err)
      }
    }
  ],
  [
    '/portalApp', {
      target: process.env.targetUrlApp,
      pathRewrite: {
        '^/portalApp': ''
      },
      secure: false,
      onProxyRes: function (proxyRes, req, res) {
        // if (mockConfig.mockEnable) {
        //   console.error("你现在请求的是mock接口, 记得关闭");
        // }
      },
      onError: function onError(err, req, res) {
        console.error("app接口请求：" + req.url + "；响应：" + res + "；错误err" + err)
      }
    }
  ]
]

module.exports = proxyConfig