let http = require('http')
let url = require('url')
let fs = require('fs')
let slider = require('./slider')
let path = require('path')
// console.log(__dirname, '..', '绝对路径')

function read (cb) {
  fs.readFile('./good.json', 'utf8', (err, data) => {
    if (err || data.length === 0) {
      // 文件错误或者没长度
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}

function write(data, cb) {
  fs.writeFile('./good.json', JSON.stringify(data), 'utf8', cb)
}
let offset = 6 // 每一页数据是6条
http.createServer((req, res) => {
  // 设置哪个域名可以跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // 允许哪个方法可以跨域
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', ' 3.2.1')
  // 如果是options 直接返回成功
  if (req.method == 'OPTIONS') return res.end('200')
  let {
    pathname,
    query
  } = url.parse(req.url, true)
  // 轮播图接口
  if (pathname === '/slider') {
    res.setHeader('content-type', 'text/json;charset=utf8')
    res.end(JSON.stringify(slider))
    return
  }
  // 首页列表接口
  if (pathname === '/new') {
    res.setHeader('content-type', 'text/json;charset=utf8')
    read((data) => {
      let newList = data.reverse().slice(0, 6)
      // console.log(data)
      setTimeout(() => {
        res.end(JSON.stringify(newList))
      }, 4000)
      // res.end(JSON.stringify(data))
    })
    return
  }
  // 列表页接口
  if (pathname === '/list') {
    // let id = query.id
    let id = parseInt(query.id)
    // console.log(id)
    switch (req.method) {
      // 删除接口
      case 'DELETE':
        if (id) {
          read(data => {
            // 把不等于传递过来的id的值变成一个新的data
            data = data.filter(item => item.id !== id)
            // 把新的数据重新写会到json文件里
            write(data, () => {
              res.end(JSON.stringify({}))
            })
          })
        }
        break
      case 'PUT':
        let str = ''
        req.on('data', chunk => {
          str += chunk
        })
        req.on('end', () => {
          // good 是前端传过来的数据
          let good = JSON.parse(str)

          read(data => {
            let goods = data.map(item => {
              // 如果等于改变这项的id，返回改变后的数据（good）;如果不等于直接返回原来的
              if (item.id === id) {
                return good
              }
              return item
            })
            // 把改变后的值重新写入json文件
            write(goods, () => {
              return res.end(JSON.stringify(good))
            })
          })
        })
        break

        // 添加接口
      case 'POST':
        let str1 = ''
        req.on('data', chunk => {
          str1 += chunk
        })
        req.on('end', () => {
          let adgod = JSON.parse(str1)
          console.log(str1, '添加的商品')
          read(data => {
            // data.push(adgod)
            // console.log(data)
            // 给添加的商品加一个id 如果data是空的id为1 否则id为最后一项的id加1
            adgod.id = data.length ? data[data.length - 1].id + 1 : 1
            data = [...data, adgod]
            write(data, () => {
              return res.end(JSON.stringify(adgod))
            })
          })
        })
        break
    }
    res.setHeader('content-type', 'text/json;charset=utf8')
    read((data) => {
      if (id) {
        let good = data.filter(item => item.id === id)
        if (good) {
          res.end(JSON.stringify(good))
        } else {
          // http://localhost:3000/list?id=888
          res.end(JSON.stringify({}))
        }
      } else {
        // console.log(data)
        res.end(JSON.stringify(data))
      }
    })
    return
  }
  // 分页接口
  if (pathname === '/page') {
    res.setHeader('content-type', 'text/json;charset=utf8')
    // data.slice(0, offset * page)
    // localhost:3000/page?page=1
    let page = parseInt(query.page)
    // console.log(page)
    page = page - 1
    let hasmore = true // 默认有下一页
    read((data) => {
      // offset 每次6条
      let pagedata = data.slice(page * offset, page * offset + offset)
      // console.log(pagedata)
      let lastindex = page * offset + offset
      // 如果当前最后的索引大于data的长度 则表示没有数据了
      // slice() 包前不包后
      if (lastindex > data.length) {
        hasmore = false
      }
      res.end(JSON.stringify({
        data: pagedata,
        hasmore
      }))
    })
    return
  }
  res.end('404')
}).listen(3000, () => {
  console.log('YES')
})
