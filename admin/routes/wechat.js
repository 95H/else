var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("wechat");

var wechatConfig = require('../config/wechat');
var webConfig = require('../config/webConfig');
console.log(webConfig.wwwroot);
var db = require("../utils/dbHelper")

// 微信同步server
var weServer = require("wechat");

// 微信模板消息菜单
var wechatNode = require("wechat-nodejs");
const Wechat = wechatNode.Wechat;
const Menu = wechatNode.Menu;
const Message = wechatNode.Message;
const JSSDK = wechatNode.JSSDK;
const wechat = new Wechat(wechatConfig.appid, wechatConfig.secret);
const menu = new Menu(wechat.getInstance());
const message = new Message(wechat.getInstance());
const jssdk = new JSSDK(wechat.getInstance());

// 微信认证
var OAuth = require("wechat-oauth");
var client = new OAuth(wechatConfig.appid, wechatConfig.secret);

// jwt Token生成
var jwt = require("jsonwebtoken");

router.get("/", function(req, res, next) {
	res.send("hello wechat user~");
});

// 设置菜单
router.get("/setMenu", function(req, res, next) {
	const button = [
		{
			type: "view",
			name: "平台首页",
			url: webConfig.wwwroot
		},
		{
			type: "view",
			name: "在线预约",
			url: `${webConfig.wwwroot}/order/`
		},
		{
			type: "view",
			name: "个人中心",
			url: `${webConfig.wwwroot}/usercenter/`
		}
	];

	menu.create(button).then(data => {
		res.send(data); 
	}).catch(e => {
		res.send({success: false, message: e.message}); 
	}); 
});

// 微信认证
router.get("/wechatAuthorize", function(req, res, next) {
	var url = client.getAuthorizeURL(
		`${webConfig.wwwroot}/wechat/authorizeUser`,
			req.query.redirectUrl,
  		"snsapi_userinfo"
	);
	res.redirect(url);
});

// 获取用户openid
router.get("/authorizeUser", function(req, res, next) {
  var code = req.query.code;
  console.log(req.query);

  // 防止用户重新认证导致的 code 重复认证bug
  // if (req.session.openid) {
  //   res.redirect(req.query.state);
  //   return;
  // }

	// 微信返回自定义参数
	var redirectUrl = req.query.state || "/";

	client.getAccessToken(code, function(err, result) {
    if(err){
    	log.error(err);
      return;
    }

		// 获取到用户的openid和操作token
		const {accessToken, openid} = result.data;

		// 根据微信号请求用户后台资料
		var userInfo = null;

		db.query("select * from ?? where ?", ["afl_user", {openid}], function(err, results){
			userInfo = results[0];

			// 根据openid获取微信用户资料
			client.getUser(openid, function(err, result) {
				if(err){
		    	return log.error(err);
				}

				const param = {userName: result.nickname, userHeadImg: result.headimgurl, openid, userType: 1, userScore: 0};
  			// 后台存在用户资料
  			if (userInfo) {
         //  db.query("update ?? set ? where ?", ["afl_user", param, {openid}], function(err, result, data2){
         //    if(err){
				    	// return log.error(err);
         //      // return res.send({success: false, message: "更新资料出错"});
         //    }
         //    tokenTo();
         //  } );
         tokenTo();
  			}else{
          db.query("insert into ?? set ?", ["afl_user", param], function(err, result){
          	console.log({err, result});
            if(err){
				    	return log.error(err);
              // res.send({success: false, message: "同步资料出错"});
            }

            param.id = result.insertId;

            userInfo = param;
            tokenTo();
  				});
        }

        // 生成Token并且跳转
        function tokenTo(){
          // 创建微信认证token
	  			var token =  jwt.sign({userInfo}, "secret", {
	  				expiresIn: "7 days"
	  			});

	  			// TODO 后期改装提交
	  			if(redirectUrl.indexOf("?") > -1){
	  				res.redirect(`${redirectUrl}&token=${token}`);
	  			}else{
	  				res.redirect(`${redirectUrl}?token=${token}`);
	  			}
        }
			});
		});
	})
});


router.get("/login", function(req, res, next){
	const userInfo = {
		'id' : 2
	}
	// 创建微信认证token
	var token =  jwt.sign(userInfo, "secret", {
		expiresIn: "7 days"
	});

	res.redirect("/?token="+token);

});

// 获取jssdk
router.get("/getJssdk", function(req, res, next){
	jssdk
		.getConfig(req.query.l, ["scanQRCode", "getLocation"], false)
		.then(config => {
			res.send(config);
		});
});

// 微信模板消息和短信统一发送接口
router.post("/send", function(req, res,next) {
	const templateId = 'wmXciixsvp9ayqyhw67E8c1T3GIerTeztnuX_NeM4o0';

	const data = {
		first: {value: '您的积分账户有新的变动，具体内容如下：\n', color: '#FF0000'},
		keyword1: {value: moment(new Date()).format("YYYY-MM-DD HH:mm"), color: '#6495ED'},
		keyword2: {value: parseFloat(sum).toFixed(2) + (mode ? "元": "积分"), color: '#6495ED'},
		keyword3: {value: (type == 1 ? "投递厨余" : "投递再生资源"), color: '#6495ED'},
		keyword4: {value: "现金："+ money + " 积分：" + gold + '\n', color: '#6495ED'},
		remark: {value: '感谢你的投递，爱分类就是爱生活！', color: '#FF0000'}
	}

	message.sendTemplate(openid, templateId, url, data).then((data) => {
			res.send({success: true, msg:'发送成功'});
	}).catch((e) => {
		res.send({success: false, msg: e.message});
	});
});

// 微信服务器交互接口
router.post("/", weServer(wechatConfig).text(function (message, req, res, next) {
  // TODO
}).image(function (message, req, res, next) {
  // TODO
}).voice(function (message, req, res, next) {
  // TODO
}).video(function (message, req, res, next) {
  // TODO
}).location(function (message, req, res, next) {
  // TODO
}).link(function (message, req, res, next) {
  // TODO
}).event(function (message, req, res, next) {
	if(message.Event == "subscribe"){
    res.reply([
     {
       title: '欢迎关注北京垃圾分类公众号',
       description: '普及垃圾分类知识，提供垃圾分类指导服务工作',
       picurl: 'http://zqly.kaitou.net/img/news/3.jpeg',
       url: 'http://zqly.kaitou.net'
     }
    ]);
  }
}).device_text(function (message, req, res, next) {
  // TODO
}).device_event(function (message, req, res, next) {
  // TODO
}).middlewarify());

module.exports = router;
