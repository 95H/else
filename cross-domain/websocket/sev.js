let express = require('express');
let app = express();
//npm install ws
let Websocket =require('ws');
let wss = new Websocket.Server({port:3000})
wss.on('connection',function(ws){
    ws.on('message',function(data){
      console.log(data)
      ws.send('你也好')
    })
})
