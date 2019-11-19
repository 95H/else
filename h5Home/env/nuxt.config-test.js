/**
 * Created by admin on 2017/12/9.
 * 测试环境
 */
process.env.selfHOST = 'https://m-test.boxuegu.com/app';
process.env.PORT = 3000;
process.env.targetUrlApi = 'https://online-test.boxuegu.com';
process.env.targetUrlApp = 'http://211.103.142.26:5881';

module.exports = require('./nuxt.config');
