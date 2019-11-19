<template>
  <div class="popup-wrapper" v-if="showPopUp">
    <div class="popup">
      <img class="popup-img" :src="popupImgSrc" @click="getCoupon" v-zg="['H5_首页弹窗', { '咨询按钮名称': '立即了解详情（弹窗）' }]"/>
      <!-- <div class="popup-imgarea" @click="getCoupon" v-zg="['H5_首页弹窗', { '按钮名称': '点击弹窗' }]" ></div> -->
      <span class="popup-close" @click="closePopup" v-zg="['H5_首页弹窗', { '按钮名称': '关闭（弹窗）' }]"></span>
      <!-- <span class="popup-txt">{{ popupTxt }}</span> -->
    </div>
  </div>
</template>

<script>
function isDateForamt(d) {
  return d && !isNaN(Number(d)) && d.length == 8
}

function padZero(d) {
  return d < 10 ? '0' + d : d
}

/**
 * 屏幕居中弹窗组件
 *  图的高度得修改，毕竟每次给的图高度不太一样
 *  图上的层宽度, 高度需要调整popup-imgarea
 *  slot...如需要一些文字
 *
 * 使用过的活动:
 *   9月n+12活动
 *   10月国庆活动
 *   1024程序员节
 *   双11活动
 *   双12活动
 *   2019.4月活动
 */
export default {
  name: 'Popup',
  props: {
    // 开始时间戳(包括该点)
    online: {
      type: Number,
      required: true
    },

    // 结束时间戳(不包括该点)
    offline: {
      type: Number,
      required: true
    },

    // 图片的目录名
    imageDir: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      showPopUp: false,
      popupImgSrc: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      popupTxt: ''
    }
  },

  // 判断活动弹窗是否显示
  // 增加最后三天倒计时
  mounted() {
    let onLineTime = this.online
    let offLineTime = this.offline
    let imageDir = this.imageDir

    const nowDate = new Date()
    const nowTime = nowDate.getTime()

    // 判断是否在上下线时间内
    if (nowTime < onLineTime || nowTime > offLineTime) {
      return
    }

    // 由于弹窗活动只会出现一个，所以取的同一个key
    const popupshowt = localStorage.getItem('popupshowt')
    const nowt = nowDate.getFullYear() + '' + padZero(nowDate.getMonth() + 1) + '' + padZero(nowDate.getDate())

    // 判断当天弹窗是否已弹出过
    if (popupshowt && isDateForamt(popupshowt) && nowt == popupshowt) {
      return
    }

    //写入图片
    if (nowTime >= onLineTime&&nowTime <= offLineTime) {
      this.popupImgSrc = require(`~/assets/images/popup/${imageDir}/bg2.png`)
    }

    // const lastThreeDayTime = offLineTime - 3 * 86400000
    // const lastTwoDayTime = offLineTime - 2 * 86400000
    // const lastOneDayTime = offLineTime - 1 * 86400000

    // if (nowTime >= lastOneDayTime) {
    //   this.popupImgSrc = require(`~/assets/images/popup/${imageDir}/day1_time.png`)
    // } else if (nowTime >= lastTwoDayTime) {
    //   this.popupImgSrc = require(`~/assets/images/popup/${imageDir}/day2_time.png`)
    // } else if (nowTime >= lastThreeDayTime) {
    //   this.popupImgSrc = require(`~/assets/images/popup/${imageDir}/day3_time.png`)
    // } else if (nowTime >= onLineTime) {
    //   this.popupImgSrc = require(`~/assets/images/popup/${imageDir}/bg.png`)
    // }

    let that = this
    setTimeout(function(){
      that.showPopUp = true
      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden' 
    },5000)

    localStorage.setItem('popupshowt', nowt)
  },

  methods: {
    // 跳转到咨询
    getCoupon() {
      setTimeout(function() {
        qimoChatClick();
      }, 500);
      this.$emit('get-coupon')
      // window.location.href = "https://webchat.7moor.com/wapchat.html?accessId=b91bf240-868c-11e8-beff-b3a73470030e&fromUrl=m.boxuegu.com&urlTitle=h5%E9%A6%96%E9%A1%B5%E5%BC%B9%E7%AA%97"
    },

    // 关闭弹窗
    closePopup() {
      this.showPopUp = false
      document.body.style.height = ''
      document.body.style.overflow = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../static/css/variable.less";

// .centered(@w, @h, @leftOffset, @topOffset) {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: unit(@w / @u, @uu);
//   height: unit(@h / @u, @uu);
//   margin-top: unit((@topOffset - @h / 2) / @u, @uu);
//   margin-left: unit((@leftOffset - @w / 2) / @u, @uu);
// }

.popup-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 990;

  .popup {
    position: relative;
    top: 0;
    left: 0;
    width: unit(750 / @u, @uu);
    height: unit(733 / @u, @uu);
  }

  .popup-img {
    position: absolute;
    top: 55%;
    left: 50%;
    width: unit(508 / @u, @uu);
    transform: translate(-50%, -50%);
    // position: absolute;
    // top: unit(-50 / @u, @uu);
    // transform: scale(.88);
    // object-fit: cover;
  }

  // .popup-imgarea {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   margin: unit(16 / @u, @uu) 0;
  // }

  // .popup-txt {
  //   position: absolute;
  //   width: unit(50 / @u, @uu);
  //   height: unit(40 / @u, @uu);
  //   line-height: unit(40 / @u, @uu);
  //   top: 10.8%;
  //   left: 55%;
  //   text-align: center;
  //   color: #5417a7;
  //   font-size: unit(32 / @u, @uu);
  //   font-family: 'PingFangSC-Regular';
  // }

  .popup-close {
    position: absolute;
    width: unit(36 / @u, @uu);
    height: unit(36 / @u, @uu);
    top: unit(-20 / @u, @uu);
    right: unit(130 / @u, @uu);
    background-image: url(~assets/images/popup/AprilActi/close.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>