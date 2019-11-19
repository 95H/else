var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("user");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");

//用户列表查询
router.get("/", function(req, res) {

	const tokenUser = req.tokenUser;
	if(tokenUser.orgCode){
		db.query("select u.*,c.communityName from ?? c inner join ?? u on c.communityCode = u.communityCode where c.communityCode in (select communityCode from ?? where orgCode = ?)", ["afl_community", "afl_user" , "afl_community", tokenUser.orgCode], function(err, results) {
	    res.setHeader("Content-Range", results.length);
			res.send(results);
		});
	}else{
		db.query("select u.*, (select communityName from ?? c where c.communityCode = u.communityCode) as communityName from ?? u", ["afl_community", "afl_user"], function(err, results) {
	    res.setHeader("Content-Range", results.length);
			res.send(results);
		});	
	}
});

// 增加用户
router.post("/", function(req, res) {

	db.query("insert into ?? set ?", ["afl_user", req.body], function(err, results) {
		if(err){
			return res.send(err);
		}
		res.send(results);
	});
});

// 获取用户信息
router.get("/:id", function(req, res) {
  const { id } = req.params;
	db.query("select u.*, (select communityName from ?? c where c.communityCode = u.communityCode) as communityName from ?? u where ?", ["afl_community", "afl_user", { id }], function(err, results) {
		res.send(results);
	});
});

// 更新用户信息
router.put("/:id", function(req, res) {
  const { id } = req.params;
  const {userType, role} = req.body;
	db.query("update ?? set ? where ?", ["afl_user", {userType, role}, {id}], function(err, results) {
		res.send(results);
	});
});

module.exports = router;
