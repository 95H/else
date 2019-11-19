//mock数据
const express = require('express');
const app = express();
let gettest = require('./data/gettest.json')//加载本地数据
let posttest = require('./data/posttest.json')
let apiRoutes = express.Router();
app.use('/api', apiRoutes);
exports.mock = (app) => {
    app.get('/api/gettest', (req, res) => { //get
        res.json(gettest)
    })
    app.post('/api/posttest', (req, res) => { //get
        res.json(posttest)
    })
}
