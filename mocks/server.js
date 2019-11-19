let http = require('http') //node的服务器模块
let fs = require('fs') //fs node的文件模块
let url = require('url') //请求路径和数据解析
// let sliders = require('./slider') //引入轮播图数据
var querystring = require('querystring') //将参数转换为串
function read(cb) {
    //readFile 读取文件 异步操作
    fs.readFile('./user.json', 'utf8', function(err, data) {
        if (err || data.length == 0) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}
function write(data, cb) {
    fs.writeFile('./user.json', JSON.stringify(data), cb)
}

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'false')
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,x-auth-token,Origin,X-Requested-With, Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.setHeader('X-Powered-By', ' 3.2.1')
    if (req.method == 'OPTIONS') return res.end('200')
    // if (pathname === '/allData') {
    //     res.setHeader('Content-type', 'application/json;charset=utf8')
    //     read(userData => {
    //         res.end(JSON.stringify(userData))
    //     })
    //     return
    // }
}).listen(3000, function() {
    console.log('Server is running at 3000')
})
