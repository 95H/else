/**
 * Created by admin on 2017/12/9.
 * 线上
 */
process.env.selfHost = 'm.boxuegu.com';
process.env.PORT = 3000;
process.env.targetUrlApi = 'http://100.115.146.123';
process.env.targetUrlApp = 'https://app.boxuegu.com';

module.exports = require('./nuxt.config');
