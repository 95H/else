var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("community");
var db = require("../../utils/dbHelper.js");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");
var file = require("../../utils/fileHelper.js");

// 社区列表查询
router.get("/", function(req, res) {
	db.query("select * from ??", ["afl_community"], function(err, results) {
		res.setHeader("Content-Range", results.length);
		res.send(results);
	});
});

// 根据多个id查询社区列表
router.get("/:ids", function(req, res) {
  const { ids } = req.params;
	db.query("select * from ?? where id in ("+ ids +")", ["afl_community"], function(err, results) {
		res.send(results[0]);
	});
});

// 增加社区
router.post("/", function(req, res) {
  // 获取图片信息
  if(req.body.pictures && req.body.pictures[0]){
	  const fileName = file.uploadFile(req.body.pictures[0]);
	  req.body.communityImg = `${webConfig.imgServer}${fileName}`
	  delete req.body.pictures
	};

	db.query("insert into ?? set ?", ["afl_community", req.body], function(err, results) {
		if(err){
			return res.send(err);
		}
		res.send(results);
	});
});

// 获取社区信息
router.get("/:id", function(req, res) {
  const { id } = req.params;
	db.query("select * from ?? where ?", ["afl_community", { id }], function(err, results) {
		res.send(results);
	});
});

// 更新社区信息
router.put("/:id", function(req, res) {
  const { id } = req.params;
	delete req.body.id;
	delete req.body.createTime;
	delete req.body.updateTime;

  // 获取图片信息
  if(req.body.pictures && req.body.pictures[0]){
	  const fileName = file.uploadFile(req.body.pictures[0]);
	  req.body.communityImg = `${webConfig.imgServer}${fileName}`
	  delete req.body.pictures
	};

	db.query("update ?? set ? where ?", ["afl_community", req.body, {id}], function(err, results) {
		res.send(results);
	});
});

module.exports = router;
