var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("master");
var file = require("../../utils/fileHelper.js");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");

// 管理员列表查询
router.get("/", function(req, res) {
	db.query("select *,(select orgName from ?? o where o.orgCode = m.orgCode ) as orgName from ?? m", ["afl_org" ,"afl_master"], function(err, results) {
    res.setHeader("Content-Range", results.length);
		res.send(results);
	});
});

// 增加管理员
router.post("/", function(req, res) {
	db.query("insert into ?? set ?", ["afl_master", req.body], function(err, results) {
		if(err){
			return res.send(err);
		}
		res.send(results);
	});
});

// 获取登录的管理员信息
router.use("/getInfo", function(req, res) {
	const payload = {success: true, data: req.tokenUser};

	if(!req.tokenUser.orgCode){
		return res.send(payload);
	}

	db.query("select * from ?? where orgCode = ?", ["afl_org", req.tokenUser.orgCode], function(err, results){
		req.tokenUser.orgName = results[0].orgName;
	  res.send(payload);
	});
});

// 获取管理员信息
router.get("/:id", function(req, res) {
  const { id } = req.params;
	db.query("select * from ?? where ?", ["afl_master", { id }], function(err, results) {
		res.send(results);
	});
});

// 更新管理员信息
router.put("/:id", function(req, res) {
  const { id } = req.params;
	delete req.body.id;
	delete req.body.orgName;
	delete req.body.createTime;
	delete req.body.updateTime;

	db.query("update ?? set ? where ?", ["afl_master", req.body, {id}], function(err, results) {
		res.send(results);
	});
});

module.exports = router;
