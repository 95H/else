<template>
  <div class="courseDetailWrap_outer">
    <div class="courseDetailWarp" v-if="this.courseDetailInfo">
      <titleBack titleName="就业课" v-if="this.courseDetailInfo.courseType==0"></titleBack>
      <titleBack
        titleName="提升课"
        v-if="this.courseDetailInfo.courseType==1 && this.courseDetailInfo.isFree==false"
      ></titleBack>
      <titleBack
        :titleName="this.courseDetailInfo.courseType==2 ? '直播课' : '免费课'"
        v-if="this.courseDetailInfo.courseType==2 || this.courseDetailInfo.courseType==1 && this.courseDetailInfo.isFree==true"
      ></titleBack>
      <div class="container">
        <div class="courseImg">
          <img :src="this.courseDetailInfo.courseImg |defaultImg" alt>
        </div>
        <div class="courseDetail">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="简介" name="1">
              <div class="courseBrief_box">
                <div class="courseInfo">
                  <div class="courseName">{{this.courseDetailInfo.courseName}}</div>
                  <div
                    class="lecture"
                    v-if="this.courseDetailInfo.teacherName"
                  >主讲：{{this.courseDetailInfo.teacherName}}</div>
                  <div class="lecture" v-else>主讲：暂无讲师</div>
                  <div class="peopleCount" v-if="this.courseDetailInfo.learndCount!=null">
                    人数：{{this.courseDetailInfo.learndCount}}
                    <span v-if="this.courseDetailInfo.courseType==2">人已报名</span>
                    <span v-else>人已学习</span>
                  </div>
                  <div class="peopleCount" v-else>
                    人数：
                    <span v-if="this.courseDetailInfo.courseType==2">0人已报名</span>
                    <span v-else>0人已学习</span>
                  </div>
                  <div
                    class="time"
                    v-if="this.courseDetailInfo.courseType != 2"
                  >时长：{{this.courseDetailInfo.courseLength}}课时</div>
                  <div
                    class="during"
                    v-if="isShowsServicePeriod"
                  >服务期：{{this.courseDetailInfo.servicePeriod}}天</div>
                  <div class="price">
                    <span class="currentPrice">￥{{this.courseDetailInfo.currentPrice}}</span>
                    <del class="originPrice">￥{{this.courseDetailInfo.originalCost}}</del>
                  </div>
                </div>
                <div
                  class="coursebrief"
                  v-if="this.courseDetailInfo.courseDetail1!=null || this.courseDetailInfo.coursePlanDetail!=null || this.courseDetailInfo.courseDetail2!=null || this.courseDetailInfo.courseDetail!=null"
                >
                  <div class="jobBrief" v-if="this.courseDetailInfo.courseType==0">
                    <div
                      class="scoolModal1"
                      v-if="this.courseDetailInfo.courseDetail1!=null"
                      v-html="this.courseDetailInfo.courseDetail1"
                    ></div>
                    <div
                      class="scoolModal2"
                      v-show="isShow"
                      v-if="this.courseDetailInfo.coursePlanDetail!=null"
                      v-html="this.courseDetailInfo.coursePlanDetail"
                    ></div>
                    <el-button
                      type="primary"
                      @click="showToggle"
                      v-show="!isShow"
                      v-if="this.courseDetailInfo.coursePlanDetail!=null"
                    >查看更多</el-button>
                    <div
                      class="scoolModal3"
                      v-if="this.courseDetailInfo.courseDetail2!=null"
                      v-html="this.courseDetailInfo.courseDetail2"
                    ></div>
                  </div>
                  <div v-else v-html="this.courseDetailInfo.courseDetail"></div>
                </div>
                <div class="coursebrief" v-else>
                  <emptyTemp></emptyTemp>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="章节" name="2" v-if="!isN12Course">
              <div class="courseOnline" v-if="this.courseOnline.length!=0">
                <!-- <img
                  v-if="this.courseId == this.javaEEId"
                  src="~assets/images/courseDetail/javaEE.jpg"
                  alt="javaEE课程大纲"
                > -->
                <img
                  v-if="this.courseId == this.goId"
                  src="~assets/images/courseDetail/golang.jpg"
                  alt="go课程大纲"
                >
                <img
                  v-else-if="this.courseId == this.pmpId"
                  src="~assets/images/courseDetail/pmp.jpg"
                  alt="pmp课程大纲"
                >
                <img
                  v-else-if="this.courseId == this.dsId"
                  src="~assets/images/courseDetail/m_ds.jpg"
                  alt="提升课电商课程大纲"
                >
                <img
                  v-else-if="this.courseId == this.pmp2Id"
                  src="~assets/images/courseDetail/pmp2.jpg"
                  alt="pmp(二期)课程大纲"
                >
                <img
                  v-else-if="this.courseId == this.pmp3Id"
                  src="~assets/images/courseDetail/pmp3.jpg"
                  alt="pmp(三期)课程大纲"
                >
                <el-menu
                  v-else
                  class="el-menu-vertical-demo"
                  :unique-opened="true"
                  :default-openeds="defaultOpen"
                  @open="handleOpen"
                  @close="handleClose"
                  theme="dark"
                >
                  <el-submenu
                    :index="'' + index"
                    v-for="(item,index) in this.courseOnline"
                    v-if="item.moduleItems!=null"
                    :key="index"
                  >
                    <template slot="title">{{item.phaseName}}</template>
                    <el-menu-item-group
                      :title="second.moduleName"
                      v-for="(second,ind) in item.moduleItems"
                      :key="ind"
                    >
                      <el-menu-item-group
                        v-for="(third,thirdInd) in second.sectionItems"
                        :key="thirdInd"
                      >
                        <el-menu-item :index="''+thirdInd">{{third.sectionName}}</el-menu-item>
                      </el-menu-item-group>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </div>
              <div class="courseOnline" v-if="this.courseOnline.length==0">
                <emptyTemp></emptyTemp>
              </div>
            </el-tab-pane>
            <el-tab-pane label="讲师" name="3">
              <div class="lecture_box" v-if="lecturerList.length!=0">
                <div class="lecture" v-for="(item,index) in lecturerList" :key="index">
                  <div class="lecture_img">
                    <img :src="item.headImg" alt>
                  </div>
                  <div class="lecture_info">
                    <div class="lecture_nameAndCompany">
                      <!-- h5端显示直播课 新接口lecturerName, 老接口lectureName -->
                      <span class="name">{{item.lectureName || item.lecturerName}}</span>
                      <span class="company">传智&博学谷</span>
                    </div>
                    <div class="lecture_introduce multi-no-wrap">{{item.description}}</div>
                  </div>
                </div>
              </div>
              <div class="lecture_box" v-if="lecturerList.length==0">
                <emptyTemp></emptyTemp>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane v-if="this.courseDetailInfo.courseType==0 || this.courseDetailInfo.isFree==false " label="评价" name="4">
            <div class="evaluate_box" v-if="criticize.items.length!=0">
              <div class="haoPing">
                <span class="haoPingRate">好评{{(this.haoPingCount/criticize.criticizeTotal*100),1| toFixed }}%</span>({{criticize.criticizeTotal}}条评论，{{this.haoPingCount}}条好评)
              </div>
              <mt-loadmore class="evaluate_lists scrolling"
                           :bottomMethod="loadBottom"
                           :bottom-all-loaded="allLoaded"
                           :autoFill="isFull"
                           @bottom-status-change="handleTopChange"
                           :class="{classTop:classTop}"
                           ref="loadmore">
                <div class="evaluate" v-for="(item,index) in criticize.items" :key="'index'">
                  <div class="evaluate_img">
                    <img :src="item.smallPhoto |defaultHeadImg" alt=""/>
                  </div>
                  <div class="evaluate_info">
                    <div class="evaluate_nameAndStart cl">
                      <span class="name">{{item.userName}}</span>
                      <span class="startLevel" v-html="starts(item.starLevel)"></span>
                    </div>
                    <div class="evaluate_introduce multi-no-wrap">{{item.content}}</div>
                  </div>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                  <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">{{loadingText}}</span>
                  <span v-if="bottomStatus === 'loading'">加载中...</span>
                </div>
              </mt-loadmore>
            </div>
            <div class="evaluate_box" v-else>
              <emptyTemp></emptyTemp>
            </div>
            </el-tab-pane>-->
            <el-tab-pane v-if="this.courseDetailInfo.courseType==1" label="Q&A" name="5">
              <div
                class="commonProblem"
                v-if="this.courseDetailInfo.commonProblem!=null"
                v-html="this.courseDetailInfo.commonProblem"
              ></div>
              <div class="commonProblem" v-else>
                <emptyTemp></emptyTemp>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div
        class="courseDetailBtn"
        v-if="this.courseDetailInfo.courseType==0 || this.courseDetailInfo.isFree==false"
      >
        <!--     <a class="freeTryLearn"
                 :href="freeTryUrl"
                 v-if="!this.courseDetailInfo.isApply&&this.courseDetailInfo.currentPrice!='0.00'&&this.courseDetailInfo.existTry"
                 @click="freeTryLearn">
        免费试学
        </a>-->
        <div
          class="signUp"
          v-if="this.courseDetailInfo.courseStatus === 0"
          style="background-color: #959595;"
        >课程已下架</div>
        <div
          class="signUp"
          v-if="this.courseDetailInfo.courseType == 2 && this.courseDetailInfo.liveCourseEndFlag == true"
          style="background-color: #959595;"
        >报名已截止</div>
        <div
          class="signUp"
          v-else-if="this.courseDetailInfo.isApply==true && this.courseDetailInfo.status==1"
          @click="dialogShow"
        >立即学习</div>
        <div
          class="signUp"
          v-else-if="this.courseDetailInfo.isApply==true && this.courseDetailInfo.status==2"
          @click="dialogShow"
        >立即学习</div>
        <!--isApply:是否已经购买 0:否 1:是
      status：学员课程状态：1正常、-1停课、2待开始
        courseStatus: 0已下架 1已启用 2未启用
        terminateCause：课程服务终止原因：1休学、2服务期结束、8退费。注：在课程状态为 “停课” 时填写该值-->
        <div
          class="signUp"
          v-else-if="this.courseDetailInfo.isApply==true && this.courseDetailInfo.status==-1 && this.courseDetailInfo.terminateCause==1"
          style="background-color: #959595;"
        >休学中</div>
        <div
          class="signUp"
          v-else-if="this.courseDetailInfo.isApply==false"
          @click="payCourseSignUp"
        >立即报名</div>
      </div>
      <div class="courseDetailBtn" v-else>
        <div class="signUp" v-if="this.courseDetailInfo.isApply==true" @click="dialogShow">立即学习</div>
        <div class="signUp" v-else @click="freeCourseSignUp">立即报名</div>
      </div>
      <div class="sharingMakes" v-if="distributionInfo" @click="dustributionZG()">
        <img class="sharingMakes-left" src="~assets/images/courseDetail/sharingMakes.png" alt>
        <div class="sharingMakes-right">
          <span>分享赚钱</span>
          <span>￥{{distributionInfo.bonusAmount}}</span>
        </div>
      </div>
      <div class="rightSide" v-if="this.courseDetailInfo.courseType==0">
        <a href="javascript:;" @click="consultClick()" id="bxgzxzx" target="_blank">立即咨询</a>
      </div>
    </div>

    <div class="courseDown" v-else>
      <no-ssr>
        <titleBack></titleBack>
      </no-ssr>
      <div class="empty">
        <emptyTemp desc="该课程已下架！"></emptyTemp>
      </div>
    </div>
    <!--<videoDialogTemp BtnType="1" contentTxt='为了方便你的学习，请使用电脑登录博学谷官网或下载博学谷App进行学习' :dialogVisible="dialogVisible" @hide="changeDialog"></videoDialogTemp>-->
  </div>
</template>

<script>
import axios from "axios";
import { appBaseUrl } from "~/api/apiurl";
import { Toast, MessageBox, Loadmore, Indicator } from "mint-ui";
import { getCookie, zhugeTrack, wxShare, shareInfo } from "~/plugins/filter";
import { mapMutations, mapState } from "vuex";
import { evokeApp } from "~/common/utils";

export default {
  name: "courseDetail",

  fetch({ req, store, route, error }) {
    var cookieValue = "";
    var cookieList = [],
      signId = "";
    if (process.server && req) {
      cookieValue = req.headers.cookie;
      if (cookieValue != undefined) {
        var new_cookie = cookieValue.replace(/=/g, ":").split(";");
        for (var i = 0; i < new_cookie.length; i++) {
          cookieList.push(new_cookie[i].split(":"));
        }
        for (var j = 0; j < cookieList.length; j++) {
          if (cookieList[j][0].indexOf("sign") != -1) {
            signId = cookieList[j][1];
          }
        }
      }
    } else if (process.client) {
      signId = getCookie("sign");
    }
    function courseDetailInfo() {
      return axios({
        url: appBaseUrl + "/bxg/course/getCourseByCourseId",
        method: "POST",
        credentials: "include",
        params: {
          course_id: route.query.id,
          sign: signId
        },
        headers: { cookie: cookieValue ? cookieValue : "" }
      });
    }
    function courseOnline() {
      return axios({
        url: appBaseUrl + "/courseDetail/getCourseOutlineByCourseId",
        method: "POST",
        params: {
          courseId: route.query.id
        }
      });
    }
    function haoPingCount() {
      return axios({
        url: "/course/getGoodCriticizSum",
        method: "GET",
        params: {
          courseId: route.query.id
        },
        headers: { cookie: cookieValue ? cookieValue : "" },
        credentials: "include"
      });
    }
    return Promise.all([courseDetailInfo(), courseOnline(), haoPingCount()])
      .then(res => {
        // 微课且已下架的课程跳转404
        // let detailInfoData = res[0].data.resultObject
        // if (detailInfoData.courseType == 1 && detailInfoData.courseStatus === 0) {
        //   error({ statusCode: 404, message: '该课程已下架' })
        //   return
        // }
        store.commit("getCourseById", res[0].data);
        store.commit("getCourseOnline", res[1].data);
        if (res[3]) {
          store.commit("getGoodCriticizSum", res[3].data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    let courseId = this.$route.query.id;
    let n12CourseIds = [1132, 1131, 1129];
    // n+12的3个提升课程详情页，大纲隐藏
    // 前端, Python, Java
    let isN12Course = n12CourseIds.indexOf(Number(courseId)) > -1;

    return {
      javaEEId: 1112,
      goId: 1125,
      pmpId: 1174,
      dsId: 1210,
      // 预生产环境临时使用id 909
      // 线上对应id 1220
      pmp2Id: 1220,
      // 线上对应id 1228
      pmp3Id: 1228,
      zhugeTrack: zhugeTrack,
      defaultOpen: ["0"],
      allLoaded: false, //控制是否加载完成
      isFull: false,
      classTop: false, //解决list被加载中样式顶置问题
      bottomStatus: "", //加载中状态值
      loadingText: "上拉加载更多",
      islogin: "",
      freeTryUrl: "",
      activeName: "1",
      isShow: false,
      courseId: courseId,
      zhugeObj: {},
      zhugeObjZX: {},
      distributionInfo: "", //是否是分销
      zhugedistributionInfo: {},
      criticize: {
        items: [],
        criticizeTotal: "",
        pageNumber: 1,
        pageSize: 20
      },
      lecturerList: "",
      modulesItemLen: "",
      courseName: "",
      description: "",
      isN12Course
    };
  },
  beforeMount() {
    let body = document.body;
    if (!body.classList.contains("course-detail")) {
      body.classList.add("course-detail");
    }
  },

  beforeDestroy() {
    let body = document.body;
    if (body.classList.contains("course-detail")) {
      body.classList.remove("course-detail");
    }
  },

  mounted() {
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
    
    //courseType==0 就业班   1是微课 isFree==0 付费  1是免费
    var _this = this;
    if (this.courseOnline[0]) {
      this.modulesItemLen = _this.courseOnline[0].moduleItems.length;
    }
    if (this.courseDetailInfo) {
      this.courseName = _this.courseDetailInfo.courseName;
      this.description = _this.courseDetailInfo.description;
    }
    var shareUrl = window.location.href.split("#")[0];
    wxShare(shareUrl);
    var obj = {
      title: "推荐你学习" + "《" + _this.courseName + "》", // 分享标题
      desc: _this.description, // 分享描述
      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: document.location.origin + "/web/images/defaultImg/share.png", // 分享图标
      fail: function(res) {
        alert(JSON.stringify(res));
      }
    };
    shareInfo(obj);
    if (_this.courseName == "") {
      document.title = "博学谷";
    } else {
      document.title = _this.courseName + "-博学谷";
    }
    this.distributionFun();
    if (this.$route.query.shareUserId) {
      localStorage.setItem("shareUserId", this.$route.query.shareUserId);
    }

    if (this.courseDetailInfo) {
      this.zhugedistributionInfo = {
        课程id: this.courseDetailInfo.courseId,
        课程名称: this.courseDetailInfo.courseName
      };
      this.zhugeObj = {
        课程id: this.courseDetailInfo.courseId,
        课程名称: this.courseDetailInfo.courseName,
        学习人数: this.courseDetailInfo.learndCount,
        课程价格: this.courseDetailInfo.currentPrice,
        学科: this.courseDetailInfo.subjectName
      };
      if (this.courseDetailInfo.courseType == 0) {
        this.zhugeObj["课程类型"] = "就业班";
        this.zhugedistributionInfo["课程类型"] = "就业班";
      } else if (
        this.courseDetailInfo.courseType == 1 &&
        this.courseDetailInfo.isFree == 0
      ) {
        this.zhugeObj["课程类型"] = "精品微课";
        this.zhugedistributionInfo["课程类型"] = "精品微课";
      } else if (
        this.courseDetailInfo.courseType == 1 &&
        this.courseDetailInfo.isFree == 1
      ) {
        this.zhugeObj["课程类型"] = "免费微课";
      }
      if (this.distributionInfo == "") {
        this.zhugeObj["分销类型"] = "非分销";
      } else {
        this.zhugeObj["分销类型"] = "分销";
      }
      zhugeTrack("H5_进入课程详情页", this.zhugeObj);
      /*      this.islogin=localStorage.getItem('globalLogin');
       if(this.islogin=='true'){
         this.freeTryUrl='/videos/freeTryLearn?courseId='+this.courseId+'&useStart='+this.use_start+'&isTryLearn=1';
       }else{
         this.freeTryUrl='/loginRegister/login'
          }*/
    }
  },
  computed: {
    ...mapState({
      courseDetailInfo: function(state) {
        return state.indexModules.courseDetail.courseDetailInfo;
      },
      courseOnline: function(state) {
        return state.indexModules.courseDetail.courseOnline;
      },
      haoPingCount: function(state) {
        return state.indexModules.courseDetail.haoPingCount;
      }
    }),

    isShowsServicePeriod() {
      const courseDetailInfo = this.courseDetailInfo;
      return (
        (courseDetailInfo.courseType === 0 &&
          courseDetailInfo.careerCourseExtend &&
          courseDetailInfo.careerCourseExtend.includedService == 1) ||
        (courseDetailInfo.courseType == 1 &&
          courseDetailInfo.microCourseExtend &&
          courseDetailInfo.microCourseExtend.includedService == 1) ||
        (courseDetailInfo.courseType == 2 &&
          courseDetailInfo.liveCourseExtend &&
          courseDetailInfo.liveCourseExtend.includedService == 1)
      );
    }
  },
  methods: {
    consultClick() {
      setTimeout(function() {
        qimoChatClick();
      }, 500);
      zhugeTrack("H5_dp_点击立即咨询", this.zhugeObj);
    },
    distributionFun() {
      axios({
        url: appBaseUrl + "/bxg/distribution/getCourseDistributionInfo",
        method: "POST",
        params: {
          courseId: this.courseId
        }
      })
        .then(res => {
          if (res.data.errorMessage != "1001") {
            this.distributionInfo = res.data.result;
          }
        })
        .catch(err => {
          Toast({
            message: err.message,
            duration: 2000
          });
        });
    },
    dustributionZG() {
      axios
        .get("/online/user/isAlive")
        .then(res => {
          if (res.data.success) {
            if (this.isWeixinBrowser()) {
              window.location = `${appBaseUrl}/wechat/webpage/authorize?userId=${
                res.data.resultObject.id
              }&courseId=${this.courseId}&sign=${localStorage.getItem("sign")}`;
            } else {
              zhugeTrack(
                "H5_dp-点击邀请",
                this.zhugedistributionInfo,
                "/share/shareImg?userId=" +
                  res.data.resultObject.id +
                  "&courseId=" +
                  this.courseId
              );
            }
          } else {
            window.localStorage.setItem("redirectUrl", window.location.href);
            window.location = "/loginRegister/phoneLogin";
          }
        })
        .catch(err => {});
    },
    isWeixinBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      return /micromessenger/.test(ua) ? true : false;
    },
    dialogShow: function() {
      if (this.courseDetailInfo.courseType == 2) {
        MessageBox({
          title: "",
          message: "暂时无法观看直播请前往APP<br />【学习中心-直播计划】中观看",
          showCancelButton: true,
          confirmButtonText: "打开APP"
        }).then(function(action) {
          if (action !== "confirm") return;

          evokeApp();
        });
        return;
      }
      if (this.modulesItemLen != 0) {
        var id = this.courseOnline[0].moduleItems[0].moduleId;
        window.location.href =
          "/videos/videoPlay/payVideoPlay?moduleId=" +
          id +
          "&courseId=" +
          this.$route.query.id;
      } else {
        this.$toast("课程维护中");
      }
    },
    ...mapMutations(["getCourseById", "getCourseOnline", "getGoodCriticizSum"]),
    freeTryLearn: function() {
      window.localStorage.setItem("redirectUrl", window.location.href);
    },
    /*课程简介*/
    handleClick(tab, event) {
      this.zhugeObjZX = {
        课程id: this.courseDetailInfo.courseId,
        课程名称: this.courseDetailInfo.courseName,
        学习人数: this.courseDetailInfo.learndCount,
        课程价格: this.courseDetailInfo.currentPrice,
        学科: this.courseDetailInfo.subjectName,
        分类名称: tab.label
      };
      zhugeTrack("H5-dp-点击内容tab", this.zhugeObjZX);
      if (tab.name == "3") {
        this.lecturer();
      }
      if (tab.name == "4") {
        this.findStudentCriticize();
      }
    },
    /*课程大纲*/
    handleOpen(key, keyPath) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    handleClose(key, keyPath) {},
    starts: function(num) {
      var stars = "";
      for (var i = 0; i < 5 - num; i++) {
        stars +=
          "<i class='start iconfont icon-shoucang' style='color:#d9e0f1'></i>";
      }
      for (var i = 0; i < num; i++) {
        stars += "<i class='start iconfont icon-shoucang'></i>";
      }
      return stars;
    },
    showToggle: function() {
      this.isShow = true;
    },
    findStudentCriticize: function() {
      axios
        .get(appBaseUrl + "/bxg/course/getStudentCriticize", {
          params: {
            course_id: this.courseId,
            pageNo: this.criticize.pageNumber,
            pageSize: this.criticize.pageSize
          }
        })
        .then(res => {
          if (res.data.resultObject.criticize != undefined) {
            this.criticize.criticizeTotal = res.data.resultObject.totalCount;
            this.criticize.items = res.data.resultObject.criticize.items;
          }
        });
    },
    lecturer: function() {
      axios({
        url: appBaseUrl + "/bxg/course/getCourseLecturer",
        method: "POST",
        params: {
          course_id: this.$route.query.id
        }
      })
        .then(res => {
          this.lecturerList = res.data.resultObject;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadBottom() {
      if (this.criticize.items.length != 0) {
        this.classTop = true;
        if (this.criticize.pageSize >= this.criticize.criticizeTotal) {
          this.criticize.pageSize = this.criticize.criticizeTotal;
        } else {
          this.criticize.pageSize += 20;
        }
        this.findStudentCriticize();
        if (this.criticize.pageSize >= this.criticize.criticizeTotal) {
          this.allLoaded = true;
          this.classTop = false;
          this.$refs.loadmore.onBottomLoaded();
          this.loadingText = "加载完成";
        }
      }
    },
    handleTopChange(status) {
      this.bottomStatus = status;
    },
    payCourseSignUp: function() {
      if (this.modulesItemLen == 0) {
        this.$toast("课程维护中");
      } else {
        zhugeTrack("H5_dp_点击立即报名", this.zhugeObj);
        axios
          .get("/online/user/isAlive")
          .then(res => {
            if (res.data.success) {
              //window.location= "/h5/pay/html/pay.html?courseId=" + this.courseId;
              window.location =
                "/payment?courseId=" +
                this.courseId +
                "&utm_source=lijibaoming";
            } else {
              window.localStorage.setItem("redirectUrl", window.location.href);
              window.location = "/loginRegister/phoneLogin";
            }
          })
          .catch(err => {});
      }
    },
    freeCourseSignUp: function() {
      if (this.modulesItemLen == 0) {
        this.$toast("课程维护中");
      } else {
        zhugeTrack("H5_dp_点击立即报名", this.zhugeObj);

        // if(this.courseDetailInfo.videoCount!=0 && this.courseDetailInfo.videoCount!=undefined && this.courseDetailInfo.videoCount!=null){
        MessageBox.confirm(
          "你确定要报名该《" + this.courseDetailInfo.courseName + "》课程？",
          ""
        ).then(action => {
          Indicator.open();
          var parm = JSON.parse(
            '{"totalAmount":0,"courseCoupon":{"' + this.courseId + '":0}}'
          );
          axios({
            method: "post",
            url: "/web/save",
            data: parm
          }).then(res => {
            Indicator.close();
            let data = res.data;

            if (data.status == 200) {
              this.courseDetailInfo.isApply = true;
              this.dialogShow();
            } else if (data.status == 401) {
              window.localStorage.setItem("redirectUrl", window.location.href);
              window.location = "/loginRegister/phoneLogin";
              // }
              // else if (data.status == 500) {
              // Toast({
              //   message: "同学,您已经购买了此课程",
              //   duration: 2000
              // })
              // setTimeout(function() {
              //   this.dialogShow()
              // }, 2000)
            } else {
              Toast("下单失败！");
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "courseDetail.less";
@media screen and (max-width: 360px) {
  body,
  html {
    font-size: 16px;
  }
}
.courseOnline {
  > img {
    width: 100%;
  }
}
.courseDown {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #fff;
  .empty {
    position: relative;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

body.course-detail {
  .mint-msgbox {
    width: 80%;
    border-radius: unit(12 / @u, @uu);

    .mint-msgbox-content {
      display: flex;
      justify-content: center;
      align-items: center;

      .mint-msgbox-message {
        margin-top: 0;
        line-height: unit(40 / @u, @uu);
        font-size: unit(28 / @u, @uu);
        color: #333;
      }
    }

    .mint-msgbox-btns {
      .mint-msgbox-btn {
        height: 100%;
      }
    }
  }
}
</style>
