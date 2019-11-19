var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("users");

var check_api_token = require("../middleware/check_api_token");

/* GET users listing. */
router.get('/', function(req, res) {
  log.debug("I'm in the users module.");
  res.send('respond with a resource');
});

/* GET something that just errors */
router.get('/broken', function(req, res) {
  log.error("Oh noes, something has gone terribly wrong");
  res.error("aargh");
});

/**
 * 获取用户资料
 */
router.get("/getUserInfo", check_api_token, function(req, res, next){
  res.send(req.api_user);
});

module.exports = router;
