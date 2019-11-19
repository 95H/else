<template>
  <div class="warp container">
    <div class="headImgWarp">
      <div class="infoWarp cl">
        <div class="headPic">
          <img :src="userInfo.img ? userInfo.img : defaultImg">
        </div>
        <div class="loginInfo">
          <p class="logoBtn">{{userInfo.nickName}}</p>
          <p class="text">{{userInfo.autograph?userInfo.autograph:'说点什么来彰显你的个性吧…'}}</p>
        </div>
      </div>
    </div>
    <div class="listwarp">
      <div class="li_a bdB bd1px">
        <i class="iconfont">&#xe625;</i>
        <a href="javascript:;" @click="zhugeTrack('H5_个人中心-点击我的订单',{},'/orderPage/order')">
          <span>我的订单</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
      <div class="li_a bdB bd1px">
        <i class="iconfont">&#xe634;</i>
        <a href="javascript:;" @click="zhugeTrack('H5_个人中心-点击我的预报名费',{},'/myregisfee')">
          <span>我的预报名费</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
      <div class="li_a bdB bd1px">
        <i class="iconfont">&#xe636;</i>
        <a href="/contractPage/contract" @click="zhugeTrack('H5_个人中心-点击我的合同',{},'')">
          <span>我的合同</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
      <div class="li_a bdB bd1px">
        <i class="iconfont">&#xe621;</i>
        <a
          href="javascript:;"
          @click="zhugeTrack('H5_个人中心-点击我的优惠券',{},'/discountPoupon/discountPoupon')"
        >
          <span>我的优惠券</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
      <div class="li_a bdB">
        <i class="iconfont">&#xe9b6;</i>
        <a href="javascript:;" @click="zhugeTrack('H5_点击我的奖励金',{},'/myBursaryPage')">
          <span>我的奖励金</span>
          <span class="scholarship" v-if="balanceAmount>0">￥{{balanceAmount}}</span>
          <span class="scholarship" v-else>￥0.00</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
    </div>
    <div class="listwarp">
      <div class="li_a bdB">
        <i class="iconfont">&#xe61f;</i>
        <a href="javascript:;" @click="zhugeTrack('H5_个人中心-点击意见反馈',{},'/feedback?platform=h5')">
          <span>意见反馈</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
    </div>
    <div class="listwarp">
      <div class="li_a bdB bd1px">
        <i class="iconfont">&#xe623;</i>
        <a
          href="javascript:;"
          @click="zhugeTrack('H5_个人中心-点击个人设置',{},'/personalPage/userSetting/userSetting')"
        >
          <span>个人设置</span>
          <i class="iconfont">&#xe637;</i>
        </a>
      </div>
      <div class="li_a">
        <i class="iconfont">&#xe624;</i>
        <a href="javascript:;" @click="userAgents">
          <span>下载APP</span>
        </a>
      </div>
    </div>
    <el-button type="primary" class="loginOut" @click="loginOut">退出登录</el-button>
  </div>
</template>
<style lang="less">
@import "personal.less";
</style>
<style lang="less" scoped>
body,
html {
  background: #f5f5f5;
}
@media screen and (max-width: 360px) {
  body,
  html {
    font-size: 16px;
  }
}
</style>
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";
import { isAndroid } from "~/plugins/vue-validator/validator";
import { appBaseUrl } from "~/api/apiurl";
import { setCookie, getCookie, zhugeTrack } from "~/plugins/filter";
export default {
  layout: "layOut2",
  name: "personal",
  head: {
    title: "个人中心"
  },
  data() {
    return {
      zhugeTrack: zhugeTrack,
      userInfo: "",
      balanceAmount: "",
      defaultImg: "/web/images/defaultImg/defaultHeadImg.jpg"
    };
  },
  mounted() {
    this.balanceAmountFun();
  },
  methods: {
    balanceAmountFun() {
      let userId = "";
      axios.get("/online/user/getUserData").then(
        response => {
          Indicator.close();
          if (response.data.success) {
            this.userInfo = response.data.resultObject;
            userId = response.data.resultObject.uid;
            axios({
              url: "/bxg/user/userInfo",
              method: "post",
              params: {
                user_id: userId,
                sign: getCookie("sign")
              }
            }).then(
              res => {
                Indicator.close();
                if (res.data.success) {
                  this.balanceAmount = res.data.resultObject.balanceAmount;
                } else {
                  localStorage.setItem("globalLogin", false);
                  window.location = "/loginRegister/phoneLogin";
                  window.localStorage.setItem(
                    "redirectUrl",
                    window.location.href
                  );
                  setCookie("sign", "", -1);
                }
              },
              err => {
                console.log(err);
              }
            );
          } else {
            localStorage.setItem("globalLogin", false);
            window.location = "/loginRegister/phoneLogin";
            window.localStorage.setItem("redirectUrl", window.location.href);
            setCookie("sign", "", -1);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    userAgents: function() {
      zhugeTrack("H5_个人中心-点击下载APP");
      if (isAndroid()) {
        var ifr = document.createElement("iframe");
        ifr.src = "mtjd089f12195://";
        ifr.style.display = "none";
        document.body.appendChild(ifr);
        setTimeout(function() {
          document.body.removeChild(ifr);
          window.location =
            "https://attachment-center.boxuegu.com/data/attachment/online/apk/bxg.apk";
        }, 5000);
      } else {
        window.location = "BoxueguApp://  ";
        setTimeout(function() {
          window.location =
            "https://itunes.apple.com/cn/app/%E5%8D%9A%E5%AD%A6%E8%B0%B7/id1241182369?mt=8";
        }, 5000);
      }
    },
    loginOut() {
      // 简单修改之前的代码 2018.9.26
      this.$store
        .dispatch("logout")
        .then(res => {
          if (res.data.success) {
            this.$store.dispatch("userLogin", "false");
            localStorage.removeItem("nickName");
            if (localStorage.getItem("disAuthName")) {
              localStorage.removeItem("disAuthName");
            }
            localStorage.removeItem("userId");

            window.localStorage.setItem("redirectUrl", "");
            window.localStorage.setItem("shareUserId", "");
            window.location = "/";

            zhugeTrack("H5_点击退出登录");
          } else {
            Toast({
              message: res.data.errorMessage,
              duration: 2000
            });
          }
        })
        .catch(res => {
          // ???
          Toast({
            message: err.data.errorMessage,
            duration: 2000
          });
        });

      /*
				axios({
					url:'/online/user/logout',
					method:'get'
				}).then( (res) => {
					if(res.data.success){
						this.$store.dispatch('userLogin','false');
						localStorage.removeItem('nickName')
            if(localStorage.getItem('disAuthName')){
              localStorage.removeItem('disAuthName')
            }
						localStorage.removeItem('userId')
						// localStorage.removeItem('sign')
            window.localStorage.setItem('redirectUrl','');
            window.localStorage.setItem('shareUserId','');
						window.location="/"
            setCookie('sign','');
            setCookie('userId', '')
            zhugeTrack('H5_点击退出登录');
					}else{
						Toast({
						  message:res.data.errorMessage,
						  duration:2000
						})
					}
				}).catch( (res) => {
					Toast({
					  message:res.data.errorMessage,
					  duration:2000
					})
        })
        */
    }
  }
};
</script>
