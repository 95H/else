var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var log = require("log4js").getLogger("auth");
var db = require("../../utils/dbHelper.js");

/**
 * 用户登录 返回accessToken
 */
router.post("/", function(req, res, next) {
	db.query("select * from ?? where masterAccount = ?", ["afl_master", req.body.username], function(err, results){
    const master = results && results[0];
  	if (err || !master) {
  		res.json({ success: false, message: "认证失败，用户名不存在" });
  	} else if (master) {
  		// 检查密码
  		if (master.masterPassword != req.body.password) {
  			res.json({ success: false, message: "认证失败，密码错误" });
  		} else {
  			// 创建token
  			var token =  jwt.sign({masterAccount: master.masterAccount, orgCode: master.orgCode}, "secret", {
  				expiresIn: "7 days"
  			});

				// jwt.sign({
				//   data: 'foobar'
				// }, 'secret', { expiresIn: '1h' });

  			res.json({
  				success: true,
  				message: "登录成功",
  				token: token
  			});
  		}
  	}
  })
});

module.exports = router;
