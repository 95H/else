/**
 * Created by admin on 2017/12/9.
 * 本地环境
 */

// 本地
process.env.selfHost = 'http://online-mw.boxuegu.com/app'
process.env.targetUrlApi = 'https://online-dev.boxuegu.com'
process.env.targetUrlApp = 'https://app-d.boxuegu.com'

process.env.DEBUG = 'nuxt:*'
process.env.PORT = 80

module.exports = require('./nuxt.config')
