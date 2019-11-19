'use strict'
let http = require('http')
let fs = require('fs')
let url = require('url')
let sliders = require('./slider')
function read(cb) {
  fs.readFile('./book.json', 'utf8', function(err, data) {
    if (err || data.length === 0) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}
function write(data, cb) {
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}
let pagesize = 5
http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.setHeader('X-Powered-By', ' 3.2.1')
    if (res.method == 'OPTIONS') return res.end('200')
    // let {
    //     pathname,
    //     query
    // } = url.parse(req.url, true);
    // //true把query转化为对象
    let pathname = url.parse(req.url, true).pathname
    let query = url.parse(req.url, true).query
    if (pathname === '/page') {
      res.setHeader('content-type', 'application/json;charset=utf8')
      let offset = query.offset || 0
      read(function(books) {
        let result = books.reverse().slice(offset, offset + pagesize)
        let hasmore = true
        if (books.length <= offset + pagesize) {
          hasmore = false
        }
        res.end(
          JSON.stringify({
            hasmore,
            books: result
          })
        )
      })
      return
    }
    if (pathname === '/sliders') {
      res.setHeader('content-type', 'application/json;charset=utf8')
      return res.end(JSON.stringify(sliders))
    }
    if (pathname === '/hot') {
      res.setHeader('content-type', 'application/json;charset=utf8')

      read(function(books) {
        let hot = books.reverse().slice(0, 6)
        res.end(JSON.stringify(hot))
      })
      return
    }
    if (pathname === '/book') {
      let id = parseInt(query.id)
      switch (req.method) {
        case 'GET':
          if (!isNaN(id)) {
            read(function(books) {
              res.setHeader('content-type', 'application/json;charset=utf8')
              let book = books.find(item => item.bookId === id)
              if (!book) book = {}
              res.end(JSON.stringify(book))
            })
          } else {
            res.setHeader('content-type', 'application/json;charset=utf8')
            read(function(books) {
              res.end(JSON.stringify(books))
            })
          }
          break
        case 'POST':
          let str = ''
          req.on('data', chunk => {
            str += chunk
          })
          req.on('end', () => {
            let book = JSON.parse(str)
            read(function(books) {
              book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1
              books.push(book)
              write(books, function() {
                res.end(JSON.stringify(book))
              })
            })
          })

          break
        case 'PUT':
          // statements_1
          break
        case 'OPTIONS':
          read(function(books) {
            books = books.filter(item => item.bookId !== id)
            write(books, function() {
              res.end(JSON.stringify({}))
            })
          })
          break
      }
      return
    }
  })
  .listen(3000)
