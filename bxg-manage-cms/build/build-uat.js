'use strict'
// 配置环境变量 type 为 uat
process.env.type = '"uat"'
// 引入build.js文件，执行原先的编译代码
require('./build')