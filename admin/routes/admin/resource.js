var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("resource");
var file = require("../../utils/fileHelper.js");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");



//表头合并
function withPartials(viewData) {
  return Object.assign({
    partials: {
      header: '../partials/header',
      footer: '../partials/footer'      
    }
  }, viewData)
}

// 默认查询机构列表
router.get("/", function(req, res) {
	res.render('admin/resource/resourceList', withPartials({
    title: '合作资源列表',
    js: '/assets/js/admin/resource/index.js'
  }))
});

//资源列表查询
router.get("/getData", function(req, res) {
	let {page,rows,params} =req.query;
	params =JSON.parse(params);
	const limit1 =  params.categoryName ? " where b.categoryName  like " + "'%" + params.categoryName + "%'" : '';
	const limit2 =  params.resourceCode ? `where a.categoryCode=``${params.resourceCode} `: '';
	if (params.categoryName) {
		db.query(`select count(*) as count from ??; select a.id,a.categoryCode,a.orgCode,a.resourceScore,a.createTime,a.updateTime, b.categoryName,b.categoryLogo ,b.categoryUnit from ?? a LEFT JOIN ?? b ON a.categoryCode = b.categoryCode ${limit1} limit ${(page-1) * rows},${rows} `, ["afl_resource", "afl_resource","afl_category"], function(err, results) {
    	res.send({sucess: true, datas: results[1], total : results[0][0].count});
		});
	}else{
	    db.query(`select count(*) as count from ??; select a.id,a.categoryCode,a.orgCode,a.resourceScore,a.createTime,a.updateTime, b.categoryName,b.categoryLogo ,b.categoryUnit from ?? a LEFT JOIN ?? b ON a.categoryCode = b.categoryCode ${limit2} limit ${(page-1) * rows},${rows} `, ["afl_resource", "afl_resource","afl_category"], function(err, results) {
    	res.send({sucess: true, datas: results[1], total : results[0][0].count});
		});
	}
	
});


// 访问新增/编辑合作机构页面
router.get("/add", function(req, res) {
	if(!req.query.id){
		return res.render('admin/resource/resourceAdd', withPartials({
    	title: '新增资源机构',
    	js: '/assets/js/admin/resource/index.js'
  	}))
	}

	db.query("select * from ?? where ?", ["afl_org", {id: req.query.id}], function(err, results) {
		res.render('admin/resource/resourceAdd', withPartials({
    	title: '编辑合作机构',
    	js: '/assets/js/admin/resource/index.js',
    	data: results[0]
  	}))
	});
  
});


// 增加资源 机构自己增加
router.post("/add", function(req, res) {     
	// if(req.tokenUser.orgCode){
	// 	req.body.orgCode = req.tokenUser.orgCode;
	// }
	// db.query("insert into ?? set ?", ["afl_resource", req.body], function(err, results) {
	// 	if(err){
	// 		return res.send(err);
	// 	}
	// 	res.send(results);
	// });
	res.send(result);
});


// 获取资源信息
router.get("/:id", function(req, res) {
  	//const { id } = req.params;
	 //db.query("select * from ?? where ?", ["afl_resource", ·{ id }], function(err, results) {
		//res.send(results);
	// });
});

// 更新资源信息
router.put("/:id", function(req, res) {
  const { id } = req.params;
  console.log("body", req.body);
	delete req.body.id;
	delete req.body.createTime;
	delete req.body.updateTime;
	delete req.body.categoryName;
	delete req.body.orgName;

	db.query("update ?? set ? where ?", ["afl_resource", req.body, {id}], function(err, results) {
		res.send(results);
	});
});

module.exports = router;
