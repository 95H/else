/**
 * Created by admin on 2018/5/4.
 * 研发环境
 */
process.env.selfHost = 'http://online-mw.boxuegu.com/app';
process.env.PORT = 3005;
process.env.targetUrlApi = 'http://online-dev.boxuegu.com';
process.env.targetUrlApp = 'http://app-d.boxuegu.com';
//process.env.targetUrlApp='http://proxy.boxuegu.com/portal-api-dev1';

module.exports = require('./nuxt.config');
