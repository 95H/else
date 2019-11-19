/**
 * Created by admin on 2017/12/9.
 */
const resolve = require('path').resolve;
const proxy = require('./proxy.config')

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
var showMen = function () {
  var mem = process.memoryUsage();
  var format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };
  console.log(
    'Process: heapTotal ' +
    format(mem.heapTotal) +
    ' heapUsed ' +
    format(mem.heapUsed) +
    ' rss ' +
    format(mem.rss));
  console.log('-----------------------------------------------------------');
}
showMen();
module.exports = {
  /*
   ** Headers of the page
   */
  head: {

    title: '博学谷-黑马程序员线上平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-title', content: '博学谷-黑马程序员线上平台' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'renderer', content: 'webkit' },
      { name: 'full-screen', content: 'no' },
      { name: 'browsermode', content: 'application' },
      { name: 'x5-fullscreen', content: 'false' },
      { name: 'x5-page-mode', content: 'app' },
      { name: "screen-orientation", content: 'portrait' },
      { name: 'x5-orientation', content: "portrait" },
      { hid: 'keywords', name: 'keywords', content: 'Java培训,Android培训,安卓培训,PHP培训,C++培训,iOS培训,网页设计培训,平面设计培训,UI设计培训,游戏开发培训,移动开发培训,网络营销培训,web前端培训' },
      { hid: 'description', name: 'description', content: '博学谷云课堂为传智播客旗下在线教育品牌，将积累10年的实体班线下课程和教学方法引到线上。课程大纲全新优化，内容有广度、有深度，顶尖讲师全程直播授课。专注整合传智优势教学资源、打造适合在线学习并能保证教学结果的优质教学产品，同时打造和运营一整套教育生态软件体系，为用户提供满足自身成长和发展要求的有效服务。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/lib/wxShare.min.js' },
      { src: '/lib/zhugeIO.js' },
      { src: "//webchat.7moor.com/javascripts/7moorInit.js?accessId=b91bf240-868c-11e8-beff-b3a73470030e&autoShow=false&language=ZHCN", defer: true },
      // { src: 'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js'} //vconsole
    ]
  },
  css: [
    '~/static/css/normalize.css',
    '~/static/css/reset.css',
    '~/static/fonts/iconfont.css'
  ],
  //
  plugins: [
    { src: '~/plugins/mintui/mintui.js' },
    { src: '~/plugins/element-ui/elementUI' },
    { src: '~/plugins/filter' },
    { src: '~/plugins/directives' },
    { src: '~/api/init' },
    { src: '~/plugins/ga' },
    { src: '~/plugins/commonTemp', ssr: true }
  ],
  modules: [
    /* '@nuxtjs/axios',*/
    ['@nuxtjs/proxy', { logLevel: 'silent' }]
  ],
  env: {
    HOST: process.env.selfHost,
    PORT: process.env.PORT,
    PATH_TYPE: process.env.PATH_TYPE
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  proxy,
  router: {
    mode: 'history',
    extendRoutes(routes) {
      routes.push(
        {
          name: 'class-courseDetail',
          path: '/class/detail/',
          component: resolve(__dirname, '../pages/course/courseDetail/_courseDetail.vue')
        }, {
          name: 'micro-courseDetail',
          path: '/course/micro/detail/',
          component: resolve(__dirname, '../pages/course/courseDetail/_courseDetail.vue')
        }, {
          name: 'free-courseDetail',
          path: '/course/free/detail/',
          component: resolve(__dirname, '../pages/course/courseDetail/_courseDetail.vue')
        }, {
          name: 'SignContract',
          path: '/contract',
          component: resolve(__dirname, '../pages/contractPage/signContract/sign.vue')
        })
    },
    scrollBehavior: function (to, from, savedPosition) {
      return {
        x: 0,
        y: 0
      }
    }
  },
  /*
   ** Customize the progress bar color
   */
  loading: '~/components/loading/loading.vue',

  /*
   ** Build configuration
   */
  performance: {
    prefetch: false
  },

  build: {
    extractCSS: true,

    babel: {
      // presets({ isServer }) {
      //   return [
      //     ['vue-app', { targets: isServer ? { node: 'current' } : { browsers: ['last 2 versions'] } }]
      //   ]
      // },
      plugins: [
        // 插件多模块支持不好
        [
          'component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
        ],
        // [
        //   'component', { libraryName: 'mint-ui', style: true }, 'mint'
        // ]
      ]
    },

    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions', 'iOS >= 9', 'Android >= 5']
      }),
      require('cssnano')({
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }]
      })
    ],

    maxChunkSize: 350000,
    vendor: ['axios', '~/plugins/element-ui/elementUI', '~/plugins/mintui/mintui', '~/plugins/commonTemp' ],
    extend(config, ctx) {
      config.devtool = false

      // 不使用cssModules了
      // const vueLoader = config.module.rules.find(({ loader }) => loader === 'vue-loader')
      // if (isDev) {
      //   vueLoader.options.cssModules = {
      //     // name
      //     localIdentName: '[path]__[local]'
      //   }
      // } else {
      //   vueLoader.options.cssModules = {
      //     localIdentName: '[hash:8]'
      //   }
      // }

      // if (dev && isClient) {
      //   config.module.rules.push({
      //     test: /\.js$/,
      //     loader: 'babel-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}