/**
 * Created by admin on 2017/10/24.
 * 过滤器
 */
import Vue from 'vue'
import { Toast } from 'mint-ui';
import axios from 'axios';
import {appBaseUrl} from '~/api/apiurl'
/**
 * 判断是否为空值
 * @param val
 * @returns {boolean}
 */
export function isNull(val){
  if(val=="" || val==null || val==undefined){
    return true;
  }else{
    return false;
  }
}
/**
 * 课程缺省图
 * @param imgUrl
 * @returns {*}
 */
export function defaultImg(imgUrl){
  if(isNull(imgUrl)){
    return '/web/images/defaultImg/course_defaultImg.jpg'
  }else{
    return imgUrl
  }
};
/**
 * 缺省头像
 * @param imgUrl
 * @returns {*}
 */
export function defaultHeadImg(imgUrl){
  if(isNull(imgUrl)){
    return '/web/images/defaultImg/defaultHeadImg.jpg'
  }else{
    return imgUrl
  }
};
/**
 * 数据缺省
 * @param content
 * @returns {string}
 */
export function empty(content){
  if(isNull(content)){
    return '<img src="/web/images/defaultImg/empty.png" alt=""/>'
  }
}
/**
 * 时间转换
 * @param content
 * @returns {string}
 */
export function timer(content){
	//content，否则要parseInt转换
    content=content.split(' ');
    let date=content[0].split('-');
    let time=content[1].split(':');
    return date[0]+'年'+date[1]+'月'+date[2]+'日'+time[0]+':'+time[1];
}
/**
 * 时间转换  只保留年-月-日
 * @param content
 * @returns {string}
 */
export function changTimer(content,splitX){
  content=content.split(' ');
  let date=content[0].split('-');
  if(splitX!=undefined){
    return date[0]+splitX+date[1]+splitX+date[2]+'';
  }else{
    return date[0]+''+date[1]+''+date[2]+'';
  }
}
/**
 * 保留N位小数
 * @param num
 * @returns {string}
 */
export function toFixed(num,n){
  let haopinglv =  parseFloat(num).toFixed(n);
  return haopinglv;
}
//判断是否为整数
export function isInteger(obj) {
 return obj%1 === 0
}
const filters = {
  timer,
  changTimer,
  isNull,
  defaultImg,
  defaultHeadImg,
  empty,
  toFixed
}
export default filters
/*
  *存取cookie
 */
export function setCookie(name, value, days){  //设置cookie
    var exp=new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    // var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    document.cookie=name+"="+encodeURIComponent(value)+"; expires="+exp.toUTCString()+"; path=/";
}
export function getCookie(name) { //读取cookie
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]);
    return null;
}
/*
  *弱提示
 */
export function errorTips(val){
  Toast({
    message:val,
    duration:2000
  })
}
/**
 * 诸葛IO数据埋点
 */
export function zhugeTrack(clickName,obj,skipUrl){
  //诸葛
  try{
       zhuge.track(clickName,obj,function(){
         if(skipUrl){
           window.location.href=skipUrl;
         }
       });
  }catch(e){
    console.log(e);
  }
}
//微信分享config
export function wxShare(shareLink) {
		axios({
			url:appBaseUrl+'/user/share',
			method:'post',
			params:{
				url:shareLink
			}
		}).then((res) =>{
			if(res.status==200){
				var respanse = res.data;
				 wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: respanse.appid,
                    timestamp: respanse.timestamp, // 必填，生成签名的时间戳
                    nonceStr: respanse.nonceStr, // 必填，生成签名的随机串
                    signature: respanse.signature,// 必填，签名
                    jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone']// 必填，需要使用的JS接口列表
                });
			}
		})
}
export function shareInfo(obj){
	wx.ready(function () {
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage(obj);
        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline(obj);

        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareQQ(obj);
        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareWeibo(obj);
        // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口
        wx.onMenuShareQZone(obj);
    })
}
/**
 * 注册为VUE过滤器函数
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 判断是否为iphonex系列
export function isIphoneX() {
  // iPhone X、iPhone XS
  var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
  // iPhone XS Max
  var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
  // iPhone XR
  var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
  if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
    return true
  } else {
    return false
  }
}