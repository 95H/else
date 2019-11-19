<template>
	<div class="headbar cl" >
		<div class="headWarp">
			<div v-if="!isHideBack" class="headlogo" @click="goBack">
        <img src="../../static/web/images/common/back-icon.png" />
      </div>
      <p class="headTitle">{{titleName}}</p>
      <a href="javascript:void(0)"  @click="zhugeTrack('H5_点击注册',{},'/loginRegister/phoneLogin')" class="rightTem" :class="isShowRight=='isShow'?'isShow':'isHide'" v-if="rightTitle=='login'">注册</a>
      <router-link :to="{name:'loginRegister-phoneLogin'}" class="rightTem" :class="isShowRight=='isShow'?'isShow':'isHide'" v-if="rightTitle=='register'">登录</router-link>
      <a href="javascript:void(0)"  @click="zhugeTrack('H5_点击优惠劵使用说明',{},'/payment/useProtocol')" class="discountTip" :class="isShowRight=='isShowTip'?'isShow':'isHide'"><i class="iconfont icon-tishi"></i></a>
		</div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../static/css/variable.less";
.headbar {
  width: 100%;
  height: unit(100 / @u, @uu);
  background: #ffffff;
  line-height: unit(100 / @u, @uu);
  padding: 0 unit(30 / @u, @uu);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  box-shadow: 0px 0 7px 3px rgba(0, 0, 0, 0.05);
  .headWarp {
    height: 100%;
    width: 100%;
    position: relative;
    text-align: center;
    .rightTem {
      position: absolute;
      right: 0;
      top: 0;
      color: #333;
      font-size: unit(30 / @u, @uu);
    }
    .headTitle {
      height: 100%;
      font-size: unit(36 / @u, @uu);
      color: #333;
      line-height: unit(100 / @u, @uu);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 80%;
      margin: 0 auto;
    }
    .discountTip {
      position: absolute;
      top: 0;
      right: 0;
      i {
        font-size: unit(36 / @u, @uu);
        color: @color3;
      }
    }
    .headlogo {
      height: 100%;
      width: unit(40 / @u, @uu);
      position: absolute;
      top: 0;
      left: 0;
      margin-top: unit(-14.5 / @u, @uu);
      img {
        margin-top: unit(50 / @u, @uu);
        width: unit(16 / @u, @uu);
        height: unit(29 / @u, @uu);
        display: block;
      }
    }
  }
  .isShow {
    display: block;
  }
  .isHide {
    display: none;
  }
}
</style>
<script>
import { zhugeTrack } from "~/plugins/filter";
export default {
  name: "titleBack",
  props: ["titleName", "isShowRight", "rightTitle", 'backGo', 'isHideBack'],
  data() {
    return {
      zhugeTrack: zhugeTrack
    };
  },
  mounted() {
    const logState = localStorage.getItem("globalLogin")
      ? localStorage.getItem("globalLogin")
      : false;
    this.$store.dispatch("userLogin", logState);
  },
  methods: {
    zhugeRegister() {
      zhugeTrack("H5_点击注册", {}, function() {
        location.href = "/loginRegister/phoneLogin";
      });
    },
    goBack() {
      if (this.go) {
        this.$router.push(this.go)
        return
      }

      var currRoute = this.$route.path;
      if (
        currRoute == "/loginRegister/resetPassword" ||
        currRoute == "/loginRegister/phoneLogin" ||
        currRoute == "/resetPassword/successPhone"
      ) {
        window.location = "/loginRegister/phoneLogin";
      } else if (currRoute == "/loginRegister/phoneLogin") {
        window.location = "/";
        // 如果是签订成功页面，直接返回到课程中心
      } else if (currRoute.indexOf('/contractPage/signSucc') != -1) {
        window.location = '/studyCenter'
      } else if (
        currRoute.indexOf('/contract') != -1 &&
        currRoute.indexOf('/contractPage') === -1 &&
        !sessionStorage.getItem('isPayPage')) {
        window.location = '/studyCenter'
      } else if (
        currRoute == "/orderPage/order" &&
        document.referrer.indexOf("pay") != -1
      ) {
        window.location = "/personalPage/personal";
      } else if (document.referrer.indexOf("loginRegister/login") != -1) {
        window.location = "/loginRegister/phoneLogin";
      } else if (currRoute == "/personalPage/userSetting/userSetting") {
        window.location = "/personalPage/personal";
      } else {
        /*			if(document.referrer.indexOf('pay')!=-1){
						window.location='/'
					}else{
						history.go(-1);
					}*/
        history.go(-1);
      }
    }
  }
};
</script>
