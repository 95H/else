var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("sign");
var file = require("../../utils/fileHelper.js");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");

//签收列表查询
router.get("/", function(req, res) {
	const tokenUser = req.tokenUser;
	let {filter, range, sort} = req.query;
	filter = JSON.parse(filter);
	range = JSON.parse(range);
	sort = JSON.parse(sort);
	// console.log({filter, range, sort}, range[0]);
	if (tokenUser.orgCode) {
		db.query(
			`select *,(select username from afl_user where id = signUser) as signUserName,(select username from afl_user where id = signClassifer) as signClassiferName from ?? where signOrg = ? limit ${range[0]},${range[1]}; select * from ?? where signCode in (select signCode from (select signCode from ?? where  signOrg = ? limit ${range[0]},${range[1]}) sc);select count(*) as total from ?? where signOrg = ?;`,
			[
				"afl_sign",
				tokenUser.orgCode,
				"afl_signDetail",
				"afl_sign",
				tokenUser.orgCode,
				"afl_sign",
				tokenUser.orgCode
			],
			function(err, results) {
				if (err) {
					log.error(err);
					return res.send({ success: false, message: "查询出错" });
				}

				// 对返回结果进行处理 注意sdList可能返回空对象数组
				results[0].forEach(item => {
					item.sdList = results[1].map(sd => {
						if (sd.signCode == item.signCode) {
							return sd;
						}
					});
				});
				res.setHeader("Content-Range", results[2][0].total);
				res.send(results[0]);
			}
		);
	} else {
		db.query(
			`select *,(select username from afl_user where id = signUser) as signUserName,(select username from afl_user where id = signClassifer) as signClassiferName  from ?? limit ${range[0]},${range[1]}; select * from ?? where signCode in (select signCode from (select signCode from ?? limit ${range[0]},${range[1]}) sc)`,
			["afl_sign", "afl_signDetail", "afl_sign"],
			function(err, results) {
				if (err) {
					log.error(err);
					return res.send({ success: false, message: "查询出错" });
				}

				// 对返回结果进行处理 注意sdList可能返回空对象数组
				results[0].forEach(item => {
					item.sdList = results[1].map(sd => {
						if (sd.signCode == item.signCode) {
							return sd;
						}
					});
				});

				res.setHeader("Content-Range", results[0].length);
				res.send(results[0]);
			}
		);
	}
});

// 增加签收
router.post("/", function(req, res) {
	db.query("insert into ?? set ?", ["afl_sign", req.body], function(
		err,
		results
	) {
		if (err) {
			return res.send(err);
		}
		res.send(results);
	});
});

// 获取签收信息
router.get("/:id", function(req, res) {
	const { id } = req.params;
	db.query("select * from ?? where ?", ["afl_sign", { id }], function(
		err,
		results
	) {
		res.send(results);
	});
});

// 更新签收信息
router.put("/:id", function(req, res) {
	return res.send({});
});

module.exports = router;
