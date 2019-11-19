var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("org");
var webConfig = require("../../config/webConfig.js");
var db = require("../../utils/dbHelper.js");
// var moment = require("moment");
// var multipartMiddleware = multipart({uploadDir: ""});
var multer  = require('multer')
var queryString = require('query-string');
var {withPartials} = require("../../utils/util.js");

// 图片上传中间件
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now())
    let originalnameArr = file.originalname.split('.')
		let postfix = originalnameArr[originalnameArr.length - 1]
		let timeNow = Date.now()
		cb(null, file.fieldname + '_' + timeNow + '.' + postfix)
  }
})

var upload = multer({ storage: storage })



// 访问机构列表页面
router.get("/", function(req, res) {
	res.render('admin/org/orgList', withPartials({
    title: '合作机构列表',
    js: '/assets/js/admin/org/index.js'
  }))
});

// 获取机构列表数据
router.get("/getOrgList", function(req, res){
	let {page, rows, params} = req.query;
	params = params && JSON.parse(params);
	const limit =  params && params.orgName ? " where orgName like " + "'%" + params.orgName + "%'" : '';
	const pageInfo = page ? `limit ${(page-1) * rows},${rows}` : "";
	db.query(`select count(*) as count from ?? ${ limit }; select * from ?? ${limit} ${pageInfo}`, ["afl_org", "afl_org"], function(err, results) {
    
    // 数组转义
    results[1].forEach(item => {
      if(item.orgManageCommunity){
        item.orgManageCommunity = JSON.parse(item.orgManageCommunity)
      }
    });

    res.send({success: true, datas: results[1], total : results[0][0].count});
	});
});



// 访问新增/编辑合作机构页面
router.get("/add", function(req, res) {
	if(!req.query.id){
		return res.render('admin/org/orgAdd', withPartials({
    	title: '新增合作机构',
    	js: '/assets/js/admin/org/index.js'
  	}))
	}

	db.query("select * from ?? where ?", ["afl_org", {id: req.query.id}], function(err, results) {
		res.render('admin/org/orgAdd', withPartials({
    	title: '编辑合作机构',
    	js: '/assets/js/admin/org/index.js',
    	data: results[0]
  	}))
	});
  
});

// 新增合作机构后台业务逻辑
router.post("/", upload.single('orgImg'), function(req, res) {
	console.log(req.body);
	if(req.file){
		req.body.orgImg = "/uploads/" + req.file.filename;
	}else{
		delete req.body.orgImg;
	}

	// 编辑
	if(req.body.id){
		db.query("update ?? set ? where ?", ["afl_org", req.body, {id: req.body.id}], function(err, results) {
			let param = {};
			if(err){
				return res.send(err);
			}

			param = {
		    message: '更新成功',
		    urlGo: "/admin/org",
		    urlBack: "/admin/org/add"
		  }

			res.redirect(`/admin/common/success?${queryString.stringify(param)}`)
		});
	}else{
		delete req.body.id;
		// {a:1,b:2}
		// inser into ?? set ? ["a", {a:1,b:2}]
		// insert into a set a=1, b=2, id=""
		db.query("insert into ?? set ?", ["afl_org", req.body], function(err, results) {
			if(err){
				return res.send(err);
			}

			param = {
		    message: '添加成功',
		    urlGo: "/admin/org",
		    urlBack: "/admin/org/add"
		  }

			res.redirect(`/admin/common/success?${queryString.stringify(param)}`)

		});
	}
});


// 访问卡片列表
router.get("/cardList", function(req, res) {
	res.render('admin/org/orgCardList', withPartials({
    title: '发卡管理',
    js: '/assets/js/admin/org/card.js'
  }))
});

// 打开卡片列表
router.get("/getCardList", function(req, res) {
	let {page, rows, params} = req.query;
	params = JSON.parse(params);
	const limit =  params.orgName ? " where orgName like " + "'%" + params.orgName + "%'" : '';
	db.query(`select count(*) as count from ?? ${ limit }; select oc.*, ao.orgName from ?? oc left join ?? ao on oc.orgCode = ao.orgCode ${limit} limit ${(page-1) * rows},${rows}  `, ["afl_card", "afl_card", "afl_org"], function(err, results) {
		console.log(results[0]);
    res.send({sucess: true, datas: results[1], total : results[0][0].count});
	});
});

// 获取机构信息
router.post("/giveCards", function(req, res) {
  const { orgCode, cardNum } = req.body;
  console.log(req.body);
	// 查询组织下已发实体卡数
	db.query("select count(*) as count from ?? where cardType = 2 and ?;", ['afl_card', {orgCode}], function(err, result){
		if(err){
			return res.send(err);
		}
		function PrefixInteger(num, length) {
		 return ( "00000" + num ).substr( -length );
		}
		// 生成卡号编号 组织机构编码+02（积分卡用户）+卡号编号
		var sqlArr = [];
		var cardsArr = [];
		for(var i = 1; i <= cardNum; i++){
			const cardCode = `${orgCode}02${PrefixInteger((parseInt(result[0].count) + i), 5)}`;
			cardsArr.push(cardCode);
			sqlArr.push({sql: "insert into ?? set ?", values: ["afl_card", {cardCode, orgCode, cardType: 2}]});
		}

		db.execTransaction(sqlArr, function(execResult){
			console.log({execResult});
			if(execResult.success){
				res.send({success: true, data: cardsArr});
			}else{
				res.send({success: false, message: '批量生成卡片出错'});
			}
		});
	});
});

module.exports = router;
