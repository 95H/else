var express = require("express");
var router = express.Router();

var log = require("log4js").getLogger("message");
var request = require("request");

var messageConfig = require("../config/message");
const SMSClient = require('@alicloud/sms-sdk')

const {accessKeyId, secretAccessKey} = messageConfig;
let smsClient = new SMSClient({accessKeyId, secretAccessKey});

// 短信统一发送接口
/**
 * 发送参数
 * @param mobile	手机号
 * @param templateCode 模板编号
 * @param templateParam 模板参数
 */
router.post("/send", function(req, res,next) {
	const {mobile, templateCode, templateParam} = req.body;

	if(!mobile || !templateCode || !templateParam ){
		return res.send({success: false, message: "短信调用错误，请检查"});
	}

	// 日短信发送量检查
	
	// 发送短信
	const smsParam = {
	    PhoneNumbers: mobile,
	    SignName: '北京垃圾分类',
	    TemplateCode: req.body.templateCode || 'SMS_122297857',
	    TemplateParam: req.body. templateParam || '{"signType": "投递厨余", "value": "0", "score": "100" }'
	};
	console.log(smsParam);
	smsClient.sendSMS(smsParam).then(function (result) {
	    let {Code} = result
	    if (Code === 'OK') {
	        res.send({success: true, templateCode, message: '短信发送成功'});
	    }else{
	        res.send({success: false, templateCode, message: '短信发送失败'});
	    }
	}, function (err) {
	    console.log(err)
	})
})

module.exports = router;
