<template>
  <div class="popup-wrapper" v-if="showPopUp">
    <div class="popup">
      <img class="popup-img" :src="popupImgSrc" v-zg="['H5_首页弹窗', { '按钮名称': '点击弹窗' }]" />
      <div class="popup-imgarea" @click="getCoupon" v-zg="['H5_首页弹窗', { '按钮名称': '点击弹窗' }]"></div>
      <span class="popup-close" @click="closePopup" v-zg="['H5_首页弹窗', { '按钮名称': '关闭弹窗' }]" :style="popupCloseStyle"></span>
      <div class="popup-txt-sec">
        <p class="popup-txt__tp">
          <span class="popup-txt__tp--words"></span>
          <span class="popup-txt__tp--mark" :style="lastmarkStyle" v-if="showLastmark"></span>
        </p>
        <p ref="popTxt" class="popup-txt__title">
          <span class="pop-txt__title--stage" :style="stageStyle"></span>
          <span class="pop-txt__title--amount">{{price}}元</span>
        </p>
        <p class="popup-txt__bp">
          名额仅限<span class="popup-txt__bp-num">100</span>名
        </p>
      </div>
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
 * 首页活动弹窗组件
 * 
 */
export default {
  name: 'Popup2',
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
    },

    stage: {
      type: String
    }
  },

  data() {
    return {
      showPopUp: false,
      popupImgSrc: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      showLastmark: false,
      lastmarkStyle: {},
      popupCloseStyle: {},
      stageStyle: {},
      price: 8929,
      popupTxt: ''
    }
  },

  // 判断活动弹窗是否显示
  // 增加最后三天倒计时
  mounted() {
    const onLineTime = this.online
    const offLineTime = this.offline
    const imageDir = this.imageDir
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

    // 写入图片
    this.popupImgSrc = require(`~/assets/images/popup/${imageDir}/popup.png`)

    let stageImg
    let price
    if (this.stage == 'stage1') {
      stageImg = require(`~/assets/images/popup/${imageDir}/popup-txt-first.png`)
      price = 8929
    } else if (this.stage == 'stage2') {
      stageImg = require(`~/assets/images/popup/${imageDir}/popup-txt-second.png`)
      price = 8779
    } else if (this.stage == 'stage3') {
      stageImg = require(`~/assets/images/popup/${imageDir}/popup-txt-third.png`)
      price = 1699
    }
    
    this.price = price
    this.stageStyle.backgroundImage = `url(${stageImg})`
    
    let closeBtnImg = require(`~/assets/images/popup/${imageDir}/popup-close.png`)
    this.popupCloseStyle.backgroundImage = `url(${closeBtnImg})`

    const lastThreeDayTime = offLineTime - 3 * 86400000
    const lastTwoDayTime = offLineTime - 2 * 86400000
    const lastOneDayTime = offLineTime - 1 * 86400000
    
    if (nowTime >= lastOneDayTime) {
      let lastmarkImg = require(`~/assets/images/popup/${imageDir}/popup-mark-last1.png`)
      this.lastmarkStyle.backgroundImage = `url(${lastmarkImg})`
      this.showLastmark = true
    } else if (nowTime >= lastTwoDayTime) {
      let lastmarkImg = require(`~/assets/images/popup/${imageDir}/popup-mark-last2.png`)
      this.lastmarkStyle.backgroundImage = `url(${lastmarkImg})`
      this.showLastmark = true
    } else if (nowTime >= lastThreeDayTime) {
      let lastmarkImg = require(`~/assets/images/popup/${imageDir}/popup-mark-last3.png`)
      this.lastmarkStyle.backgroundImage = `url(${lastmarkImg})`
      this.showLastmark = true
    }

    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'

    this.showPopUp = true

    localStorage.setItem('popupshowt', nowt)
  },

  methods: {
    // 跳转到咨询
    getCoupon() {
      // setTimeout(function() {
      //   qimoChatClick();
      // }, 500);
      // this.$emit('get-coupon')
      window.location.href = '/campaign/h5-februaryactivities/?utm_source=h5_sytc';
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
    width: 100%;
    // 966 / 2 / 750 
    padding: 64.4% 0;
  }

  .popup-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // object-fit: cover;
  }

  .popup-imgarea {
    position: absolute;
    top: 77%;
    left: 50%;
    width: percentage(420 / 750);
    padding: 30% 0;
    transform: translate(-50%, -50%);
  }

  .popup-txt-sec {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: percentage(135 / 966);
    // width: percentage(550 / 750);
    // padding: percentage(110 / 750) 0;
    width: 100%;
    height: percentage(220 / 966);
    // padding: percentage(110 / 750) 0;
    transform: translateX(-50%);
    background-size: 100% 100%;
    // background-color: yellow;

    .popup-txt__tp {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: percentage(64 / 220);

      .popup-txt__tp--words {
        display: block;
        width: percentage(276 / 750);
        padding: percentage(20 / 750);
        background-image: url(~assets/images/popup/newyear2019/popup-txtbp.png);
        background-repeat: no-repeat;
        background-size: cover;
        // font-size: unit(36 / @u, @uu);
        // font-family: "PingFangSC-Semibold";
        // color: #fff;
        // letter-spacing: unit(3 / @u, @uu)
      }

      .popup-txt__tp--mark {
        display: block;
        width: percentage(120 / 750); // unit(120 / @u, @uu);
        padding: percentage(20 / 750);
        // background-image: url(~assets/images/popup/newyear2019/popup-mark-last1.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    
    .popup-txt__title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: percentage(80 / 220);
      margin: unit(8 / @u, @uu) 0 unit(20 / @u, @uu) 0;
      
      .pop-txt__title--stage {
        width: unit(267 / @u, @uu);
        height: unit(64 / @u, @uu);
        margin-right: unit(6 / @u, @uu);
        background-image: url(~assets/images/popup/newyear2019/popup-txt-first.png);
        background-repeat: no-repeat;
        background-size: 100%;
      }
      
      .pop-txt__title--amount {
        color: #ffeb0d;
        font-size: unit(70 / @u, @uu);
        font-weight: bold;
        font-family: "Microsoft YaHei";
      }
    }

    .popup-txt__bp {
      width: unit(300 / @u, @uu);
      height: unit(40 / @u, @uu);
      line-height: unit(38 / @u, @uu);
      text-align: center;
      font-size: unit(28 / @u, @uu);
      font-family: "PingFangSC";
      color: #fef4f5;
      border: 1px solid #fef4f5;
      border-radius: 20px;
      letter-spacing: unit(6.4 / @u, @uu);

      .popup-txt__bp-num {
        color: #ffeb0d;
      }
    }
  }

  .popup-close {
    position: absolute;
    top: percentage(118 / 966);
    right: percentage(100 / 750);
    width: percentage(60 / 750);
    padding: percentage(30 / 750) 0;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 100;
  }
}
</style>
