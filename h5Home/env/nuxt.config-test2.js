/**
 * Created by admin on 2017/12/9.
 * 测试环境
 */
process.env.selfHOST = 'https://m-test2.boxuegu.com/app';
process.env.PORT = 3004;
process.env.targetUrlApi = 'https://online-test2.boxuegu.com';
process.env.targetUrlApp = 'http://211.103.142.26:5881';

module.exports = require('./nuxt.config');
