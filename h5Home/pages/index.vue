<template>
  <div class="innerWrap">
    <div class="container-index" id="indexContainer">
      <div class="swiper">
        <mt-swipe :auto="5000">
          <mt-swipe-item v-for="(item,index) in this.bannerLists" :key="index" :class="index==0?'is-active':''">
            <a href="javascript:;" @click="zhugeTrack('H5_首页-点击banner',{'banner名称':item.name},item.imgHref)">
              <img :src="item.imgPath | defaultImg" alt=""/>
            </a>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <ul class="courseType cl">
        <li>
          <a href="javascript:;" @click="zhugeTrack('H5_首页-点击就业班',{},'/class')">
            <img src="/web/images/index/course.png" alt=""/>
            <p class="courseName">就业课</p>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="zhugeTrack('H5_首页-点击精品微课',{},'/course/micro')">
            <img src="/web/images/index/mircoCourse.png" alt=""/>
            <p class="courseName">提升课</p>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="zhugeTrack('H5_首页-点击免费微课',{},'/course/free')">
            <img src="/web/images/index/freeMicroCourse.png" alt=""/>
            <p class="courseName">免费课</p>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="zhugeTrack('H5_首页-点击课程分类',{},'/classify')">
            <img src="/web/images/index/courseType.png" alt=""/>
            <p class="courseName">课程分类</p>
          </a>
        </li>
      </ul>
      <!-- <div class="publicCourse commonMargin">
         <div class="commonTitle cl">
           <div class="commonTitle-left">
             <span class="shuxian"></span>
             <span class="commonTitle-name">热门公开直播课</span>
           </div>
           <div class="commonTitle-right">
             <a href="/publicCourse/publicCourse" class="more">更多</a>
           </div>
         </div>
         <publicCourseTemp v-for="(item,index) in this.openCourse" :key="index" :openCourse="item" v-if="index<1"></publicCourseTemp>
         <div  v-if='this.openCourse.length==0'><emptyTemp></emptyTemp></div>
       </div>-->
      <div class="professionCourses commonMargin">
        <div class="commonTitle cl">
          <div class="commonTitle-left">
            <span class="shuxian"></span>
            <span class="commonTitle-name">就业课</span>
          </div>
          <div class="commonTitle-right">
            <a @click="zhugeTrack('H5_首页-点击更多',{'课程类型':'就业班'},'/class/')" class="more">更多</a>
          </div>
        </div>
        <transition-group tag="ul" name="item" class="professionCourses-show cl">
          <jobCourseTemp v-for="(item,index) in this.coursesInfo.careerCourse" :key="index" v-if="index<4"
                         zhugeClickName="H5_首页-点击推荐课程"
                         courseType="就业班"
                         :type="item.courseType"
                         :courseId="item.courseId"
                         :smallimg_path='item.courseImg'
                         :courseName='item.courseName'
                         :description='item.description'
                         :learnd_count='item.learndCount'
                         :current_price='item.currentPrice'>
          </jobCourseTemp>
        </transition-group>
      </div>
      <div class="microCourse commonMargin">
        <div class="commonTitle cl">
          <div class="commonTitle-left">
            <span class="shuxian"></span>
            <span class="commonTitle-name">推荐课程</span>
          </div>
          <div class="commonTitle-right">
            <a @click="zhugeTrack('H5_首页-点击更多',{'课程类型':'精品微课'},'/course/micro/')" class="more">更多</a>
          </div>
        </div>
        <transition-group tag="ul" name="item" class="microCourse-show cl">
          <microCourseTemp v-for="(item,index) in this.coursesInfo.boutiqueMicroCourse" :key="index" v-if="index<6"
                           zhugeClickName="H5_首页-点击推荐课程"
                           courseType="精品微课"
                           courseRouter="/course/micro/detail/"
                           name="course-microCourse"
                           :courseId="item.courseId"
                           :smallimg_path='item.courseImg'
                           :courseName='item.courseName'
                           :learnd_count='item.learndCount'
                           :current_price='item.currentPrice'
                           :isFree="item.isFree">
          </microCourseTemp>
        </transition-group>
      </div>
      <div class="microCourse commonMargin">
        <div class="commonTitle cl">
          <div class="commonTitle-left">
            <span class="shuxian"></span>
            <span class="commonTitle-name">免费课</span>
          </div>
          <div class="commonTitle-right">
            <a @click="zhugeTrack('H5_首页-点击更多',{'课程类型':'免费微课'},'/course/free/')" class="more">更多</a>
          </div>
        </div>
        <transition-group tag="ul" name="item" class="microCourse-show cl">
          <microCourseTemp v-for="(item,index) in this.coursesInfo.freeMicroCourse" :key="index" v-if="index<6"
                           zhugeClickName="H5_首页-点击推荐课程"
                           courseType="免费微课"
                           courseRouter="/course/free/detail/"
                           name="course-microCourse"
                           :courseId="item.courseId"
                           :smallimg_path='item.courseImg'
                           :courseName='item.courseName'
                           :learnd_count='item.learndCount'
                           :current_price='item.currentPrice'
                           :isFree="item.isFree">
          </microCourseTemp>
        </transition-group>
      </div>
    </div>

    <!-- 暂时去除打折的代码，样式也注释了，未来版本删除 -->
    <!-- <div class="discountActiveWrap">
      <div class="discountActive">
        <img src="/web/images/discountImg/close.png" @click="zhixun('关闭')" class="close_img"/>
        <img src="/web/images/discountImg/normal.png"  @click="zhixun('8.8折立即咨询')" class="discountActive_img" alt="">
        <img v-if="discountTag==1" src="/web/images/discountImg/three.png"  @click="zhixun('8.8折立即咨询')" class="discountActive_img" alt="">
        <img v-if="discountTag==2" src="/web/images/discountImg/two.png"  @click="zhixun('8.8折立即咨询')" class="discountActive_img" alt="">
        <img v-if="discountTag==3" src="/web/images/discountImg/one.png"  @click="zhixun('8.8折立即咨询')" class="discountActive_img" alt="">
      </div>
    </div> -->

    <Popup
      :online="act2.online"
      :offline="act2.offline"
      imageDir="AprilActi"
      @get-coupon="getCoupon"
    />

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { appBaseUrl } from "~/api/apiurl";
import { errorTips, zhugeTrack } from "~/plugins/filter";
import { Toast } from 'mint-ui';
import { regPhone } from '~/plugins/vue-validator/validator';
import { getUrlParam } from '~/common/utils/index'
import Popup from '~/components/popup'
import PopupNewYear from '~/components/popupNewyear'

export default {
  layout: "layOut1",

  fetch({ store }) {
    return Promise.all([ axios({
        url: appBaseUrl + "/bbs/banner/getBannerList",
        method: "POST",
        params: {
          client_type: 1
        }
      })
        .then(res => {
          store.commit("getErrorTips", true);
          store.commit("getBannerList", res.data);
        })
        .catch(err => {
          store.commit("getErrorTips", false);
        }),
      axios({
        url: appBaseUrl + "/bxg/index/course",
        method: "get"
      })
        .then(res => {
          store.commit("getErrorTips", true);
          store.commit("getIndexCourseInfo", res.data);
        })
        .catch(err => {
          store.commit("getErrorTips", false);
        })]);
  },

  components: {
    Popup,
    PopupNewYear
  },

  data() {
    return {
      zhugeTrack: zhugeTrack,
      // discountTag: "",
      // isShowDiscount: true,
      // discountFormReg: {
      //   Timer28: new Date("2018/08/28 23:59:59").getTime(),
      //   Timer29: new Date("2018/08/29 23:59:59").getTime(),
      //   Timer30: new Date("2018/08/30 23:59:59").getTime(),
      //   Timer31: new Date("2018/08/31 23:59:59").getTime(),
      //   nowTimer: new Date().getTime()
      // }

      // 4月活动弹窗 开始时间2019/4/16 -- 2019/4/23
      act2: {
        online: new Date(2019, 3, 28, 0, 0, 0).getTime(),
        offline: new Date(2019, 4, 1, 0, 0, 0).getTime()
      },

      // 2019新年弹窗阶段1 开始时间2019/2/20 -- 2019/2/28
      newyear2019Stage1: {
        online: new Date(2019, 1, 20, 0, 0, 0).getTime(),
        offline: new Date(2019, 2, 1, 0, 0, 0).getTime()
      },

      // 2019新年弹窗阶段2 开始时间2019/3/1 -- 2019/3/20
      newyear2019Stage2: {
        online: new Date(2019, 2, 1, 0, 0, 0).getTime(),
        offline: new Date(2019, 2, 21, 0, 0, 0).getTime()
      },

      // 2019新年弹窗阶段3 开始时间2019/3/21 -- 2019/3/31
      newyear2019Stage3: {
        online: new Date(2019, 2, 21, 0, 0, 0).getTime(),
        offline: new Date(2019, 3, 1, 0, 0, 0).getTime()
      }
    }
  },
  computed: {
    ...mapState({
      bannerLists: function(state) {
        return state.indexModules.index.bannerLists;
      },
      openCourse: function(state) {
        return state.indexModules.index.openCourse;
      },
      coursesInfo: function(state) {
        return state.indexModules.index.coursesInfo;
      },
      errorState: function(state) {
        return state.loginModules.errorState;
      }
    })
  },
  beforeMount() {
    if (!this.errorState) {
      errorTips("网络连接错误,请稍后重试~");
    }
  },
  mounted() {
    document.documentElement.style.height = "100%";
    // 站长统计
    (function(){
      var bp = document.createElement('script');
      var curProtocol = window.location.protocol.split(':')[0];
      if (curProtocol === 'https'){
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
      }
      else{
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
      }
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(bp, s);
    })();

    // 360站长
    (function(){
      var bp2 = document.createElement('script');
      bp2.src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?a1be134f1c91461a03d8a77a63cd7a78":"https://jspassport.ssl.qhimg.com/11.0.1.js?a1be134f1c91461a03d8a77a63cd7a78";
      bp2.id = "sozz"
      var s2 = document.getElementsByTagName("script")[0];
      s2.parentNode.insertBefore(bp2, s2);
    })();
    
    zhugeTrack("H5_进入首页");
    // this.computedDay(this.huodongTime);
    /*  this.bannerLists=null;
         this.openCourse=null;
         this.coursesInfo=null;
         this.errorState=null;*/
  },
  updated() {},
  methods: {
    ...mapMutations([
      //"getBannerList",
      "getOpenCourse",
      "getIndexCourseInfo",
      "getErrorTips",
      "getErrorReq"
    ]),
    // computedDay() {
      // if (this.discountFormReg.nowTimer < this.discountFormReg.Timer28) {
      //   this.discountTag = 0;
      // } else if (this.discountFormReg.nowTimer < this.discountFormReg.Timer29) {
      //   this.discountTag = 1;
      // } else if (this.discountFormReg.nowTimer < this.discountFormReg.Timer30) {
      //   this.discountTag = 2;
      // } else if (this.discountFormReg.nowTimer < this.discountFormReg.Timer31) {
      //   this.discountTag = 3;
      // } else {
      //   this.discountTag = 4;
      //   this.isShowDiscount = false;
      // }
    // },
    // zhixun(name) {
    //   if (name != "关闭") {
    //     window.location.href =
    //       "https://webchat.7moor.com/wapchat.html?accessId=b91bf240-868c-11e8-beff-b3a73470030e&fromUrl=m.boxuegu.com&urlTitle=h5%E9%A6%96%E9%A1%B5%E5%BC%B9%E7%AA%97";
    //   }
    //   this.isShowDiscount = false;
    //   zhugeTrack("H5_首页弹窗", { 按钮名称: name });
    // }
    getCoupon() {
      // window.location.href = '/campaign/h5doubletwelve?utm_source=h5sy'
    }
  }
}
</script>
<style lang="less">
html,
body {
  background-color: #f5f5f5;
}
@media screen and (max-width: 360px) {
  body,
  html {
    font-size: 16px;
  }
}
</style>
<style lang="less">
@import "../static/css/variable.less";

@media (min-width: 376px) and (max-width: 415px) {
  .swiper {
    height: unit(340 / @u, @uu) !important;
  }
}
/*
.showShadow {
  display: block;
  overflow-y: auto;
}
.hiddenShadow {
  display: none;
  overflow: hidden;
}
.discountActiveWrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999999999;
  .discountActive {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .close_img {
      width: unit(46 / @u, @uu);
      height: unit(46 / @u, @uu);
      position: absolute;
      right: unit(80 / @u, @uu);
      top: unit(-80 / @u, @uu);
    }
    .discountActive_img {
      width: unit(750 / @u, @uu);
      height: unit(470 / @u, @uu);
    }
  }
}
*/
.container-index {
  .swiper {
    height: unit(300 / @u, @uu);
    overflow: hidden;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mint-swipe-indicators {
      bottom: unit(12 / @u, @uu);
      .mint-swipe-indicator {
        width: unit(12 / @u, @uu);
        height: unit(12 / @u, @uu);
        .border-radius(2px);
        border: 2px solid #747474;
        background-color: @color9;
        .transform-rotate(45deg);
        margin: 0 unit(10 / @u, @uu);
        opacity: 1;
      }
      .is-active {
        border: 2px solid #38adff;
        background-color: #fff;
      }
    }
  }
  .courseType {
    padding: unit(30 / @u, @uu) 0;
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    li {
      flex: 1;
      width: unit(186 / @u, @uu);
      img {
        display: block;
        margin: 0 auto;
        width: unit(74 / @u, @uu);
        height: unit(74 / @u, @uu);
      }
      .courseName {
        text-align: center;
        font-size: unit(24 / @u, @uu);
        color: @color3;
        margin-top: unit(14 / @u, @uu);
      }
    }
  }
  .commonMargin {
    background-color: #fff;
    margin-top: unit(20 / @u, @uu);
    padding: unit(30 / @u, @uu);
    padding-bottom: 0;
  }
  .commonTitle {
    padding-bottom: unit(30 / @u, @uu);
    .commonTitle-left {
      float: left;
      .shuxian {
        display: inline-block;
        width: unit(4 / @u, @uu);
        height: unit(30 / @u, @uu);
        background-color: @primaryColor;
        .border-radius(5px);
        vertical-align: middle;
        margin-right: unit(10 / @u, @uu);
        margin-top: unit(-6 / @u, @uu);
      }
      .commonTitle-name {
        font-size: unit(32 / @u, @uu);
      }
    }
    .commonTitle-right {
      float: right;
      .more {
        font-size: unit(28 / @u, @uu);
        color: @color3;
      }
    }
  }
  .publicCourse {
    padding-bottom: unit(30 / @u, @uu);
  }
  .professionCourses-show {
    li:last-child {
      margin-bottom: 0;
    }
  }
  .microCourse {
    padding-right: 0;
    .commonTitle {
      padding-right: unit(30 / @u, @uu);
    }
  }
}
</style>
