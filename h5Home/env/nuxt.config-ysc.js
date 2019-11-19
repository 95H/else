/**
 * Created by admin on 2018/3/27.
 * 预生产
 */
process.env.selfHost = 'm.boxuegu.com'
process.env.PORT = 3003;
process.env.targetUrlApi = 'https://portal-ysc.boxuegu.com';
// process.env.targetUrlApp='http://172.16.1.35:8258';
process.env.targetUrlApp = 'https://api-ysc.boxuegu.com';
//process.env.targetUrlApp='http://proxy.boxuegu.com/portal-api-pred';

module.exports = require('./nuxt.config');
