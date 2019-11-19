var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("category");
var file = require("../../utils/fileHelper.js");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");

//资源分类列表查询
router.get("/", function(req, res) {
	db.query("select * from ??", "afl_category", function(err, results) {
    res.setHeader("Content-Range", results.length);
		res.send(results);
	});
});

// 增加资源分类 机构自己增加
router.post("/", function(req, res) {// 获取图片信息
  
  if(req.body.pictures && req.body.pictures[0]){
	  const fileName = file.uploadFile(req.body.pictures[0]);
	  req.body.categoryLogo = `${webConfig.imgServer}${fileName}`
	  delete req.body.pictures
	};

	db.query("insert into ?? set ?", ["afl_category", req.body], function(err, results) {
		if(err){
			return res.send(err);
		}
		res.send(results);
	});
});

// 获取资源分类信息
router.get("/:id", function(req, res) {
  const { id } = req.params;
	db.query("select * from ?? where ?", ["afl_category", { id }], function(err, results) {
		res.send(results);
	});
});

// 更新资源分类信息
router.put("/:id", function(req, res) {
  const { id } = req.params;
	delete req.body.id;
	delete req.body.createTime;
	delete req.body.updateTime;
  
  if(req.body.pictures && req.body.pictures[0]){
	  const fileName = file.uploadFile(req.body.pictures[0]);
	  req.body.categoryLogo = `${webConfig.imgServer}${fileName}`
	  delete req.body.pictures
	};

	db.query("update ?? set ? where ?", ["afl_category", req.body, {id}], function(err, results) {
		res.send(results);
	});
});

module.exports = router;
