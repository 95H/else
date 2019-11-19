import Vue from 'vue'

//手机号验证
export function regPhone(val) {
	const reg = /^[1][0-9]{10}$/;
	if(reg.test(val.trim())) {
		return true
	} else {
		return false
	}
}

//邮箱验证
export function regEmail(val) {
	const reg = /^\w+([-+.]\w+)*@\w+([-.]\w{2,})*\.\w{2,}([-.]\w{2,})*$/;
	if(reg.test(val.trim())) {
		return true
	} else {
		return false
	}
}

//非空判断
export function noempty(val) {
	const reg = /^\s*$/g;
	if(val == "" || reg.test(val)) {
		return false
	} else {
		return true
	}
}
//字符串验证
export function patter(val) {
	const reg = /^[A-Za-z0-9_\-]+$/;
	if(reg.test(val)) {
		return true
	} else {
		return false
	}
}
//字符串验证
export function patter2(val) {
	var yonghuReg = /([\u4e00-\u9fa5]+)|(\w+)|([-]+)/g;
	var yonghuNameLength = 0;
	var yonghuName = val.trim();
	var arr = [];
	yonghuName.replace(yonghuReg, function(a, hanzi, number, zXian) {
		if(hanzi != undefined) {
			var hanziL = hanzi.length * 2;
			arr.push(hanziL);
		}
		if(number != undefined) {
			var numberL = number.length;
			arr.push(numberL);
		}
		if(zXian != undefined) {
			var zXianL = zXian.length;
			arr.push(zXianL);
		}
	});
	for(var i = 0; i < arr.length; i++) {
		yonghuNameLength += arr[i];
	}
	return yonghuNameLength;
}

//中文验证
export function regChinese(val) {
  let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  if (reg.test(val)) {
    return true
  } else {
    return false
  }
}

//过滤emoji表情
export function filteremoji(val) {
	var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
	if(regStr.test(val)) {
		return true
	} else {
		return false
	}
}
//判断是ios还是Android
export function isAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	if(/android/.test(ua)) {
		return true
	} else {
		return false;
	}
}

//验证身份证号是否合法
export function checkCardId(sId) {
	let aCity = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	};
	var taiwaiPatt = /^[A-KM-QT-XZ]{1}[0-9]{9}$/;
	var HKPatt = /^[A-Z][0-9]{5,8}[0-9A]$/;
	var aomenPatt = /^[157][0-9]{6}[0-9]$/;
	if(taiwaiPatt.test(sId) || HKPatt.test(sId) || aomenPatt.test(sId)) {
		return true;
	} else if(!taiwaiPatt.test(sId) && !HKPatt.test(sId) && !aomenPatt.test(sId)) {
		let iSum = 0;
		if(!/^\d{17}(\d|x)$/i.test(sId)) return false;
		sId = sId.replace(/X$/, "a");
		if(aCity[parseInt(sId.substr(0, 2))] == null) return false; // "你的身份证地区非法";
		let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false; //"身份证上的出生日期非法";
		for(let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
		if(iSum % 11 != 1) return false; //"你输入的身份证号非法";
		return true; //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
	} else {
		return false;
	}
}