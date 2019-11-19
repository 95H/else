var path = require('path');
 
module.exports = {
    // 修改enrty为如下三行，在改变代码后 浏览器自动刷新  entry 入口 output 出口 module 模块
    entry:[
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8081',
        path.resolve(__dirname,'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'publish'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: "style!css" }
        ]
    }
}