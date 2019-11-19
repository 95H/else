<template>
  <div class="studyCenter container">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" @click.native="studyCenterZhuge('H5_学习中心-点击在线课程')">在线课程</mt-tab-item>
      <mt-tab-item id="2" @click.native="studyCenterZhuge('H5_学习中心-点击我的就业班')">我的就业班</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-loadmore
          class="study_courseList_container"
          v-if="this.onlineCourseLists.list && this.onlineCourseLists.list.length!=0"
          :bottomMethod="loadBottom2"
          :bottom-all-loaded="allLoaded2"
          :autoFill="isFull2"
          v-bind:class="{classTop:classTop2}"
          ref="loadmore2"
        >
          <ul class="study_courseList">
            <li
              class="cl"
              v-for="(item,index) in this.onlineCourseLists.list"
              :key="index"
              @click="dialogShow({'课程名称':item.courseName,'课程ID':item.id},item)"
            >
              <a href="javascript:;" class="cl">
                <div class="study_courseList_leftImg">
                  <img v-lazy="item.smallImgPath" alt>
                </div>
                <div class="study_courseList_rightContent">
                  <div class="study_courseList_rightInfo">
                    <p class="courseName">{{item.courseName}}</p>
                    <p class="courseLength">{{item.lecturers}}</p>
                    <div class="studyProcess" v-if="item.status==-1&&item.terminateCause==1">休学中</div>
                    <div class="studyProcess" v-else>已学习：{{item.learningPercentPross}}%</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span
              v-show="bottomStatus2 !== 'loading'"
              :class="{ 'rotate': bottomStatus2 === 'drop' }"
            >{{loadingText2}}</span>
            <span v-if="bottomStatus2 === 'loading'">加载中...</span>
          </div>
        </mt-loadmore>
        <div class v-else>
          <emptyTemp imgUrl="/web/images/defaultImg/studyRecordEmpty.png"></emptyTemp>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div
          class="study_courseList_container"
          v-if="this.professionCourseLists && this.professionCourseLists.length!=0"
        >
          <ul class="study_courseList">
            <li
              class="cl"
              v-for="(item,index) in this.professionCourseLists"
              :key="index"
              @click="dialogShow({'课程名称':item.courseName,'课程ID':item.id},item)"
            >
              <a href="javascript:;" class="cl">
                <div class="study_courseList_leftImg">
                  <img v-lazy="item.smallImgPath" alt>
                </div>
                <div class="study_courseList_rightContent">
                  <div class="study_courseList_rightInfo">
                    <p class="courseName">{{item.courseName}}</p>
                    <p class="courseLength">{{item.lecturers}}</p>
                    <div class="studyProcess" v-if="item.status==-1&&item.terminateCause==1">休学中</div>
                    <div class="studyProcess" v-else>已学习：{{item.learningPercentPross}}%</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class v-else>
          <emptyTemp imgUrl="/web/images/defaultImg/studyRecordEmpty.png"></emptyTemp>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <videoDialogTemp
      BtnType="1"
      contentTxt="为了方便你的学习，请使用电脑登录博学谷官网或下载博学谷App进行学习"
      :dialogVisible="dialogVisible"
      canEventname="H5_课程学习页-点击取消"
      dEventname="H5_课程学习页-点击下载"
      @hide="changeDialog"
    ></videoDialogTemp>
  </div>
</template>

<script>
import { Indicator, MessageBox } from 'mint-ui'
import { appBaseUrl } from '~/api/apiurl'
import axios from 'axios'
import { errorTips, getCookie, zhugeTrack } from '~/plugins/filter'
import { mapState, mapMutations } from 'vuex'
import { evokeApp } from '~/common/utils'

export default {
  name: 'studyCenter',
  layout: 'layOut2',
  
  data() {
    return {
      zhugeTrack: zhugeTrack,
      allLoaded2: false, //控制是否加载完成
      isFull2: false,
      classTop2: false, //解决list被加载中样式顶置问题
      bottomStatus2: '', //加载中状态值
      loadingText2: '',
      selected: '1',
      islogin: false,
      isDropShow: false,
      dialogVisible: false,
      onlineCourse: {
        courseList: '',
        totalPageCount: '',
        pageNumber: 1,
        pageSize: 5,
      },
    }
  },
  fetch({ req, store }) {
    //2 全部课程   1 免费  0 付费
    var cookieValue = ''
    var cookieList = [],
      signId = ''
    if (process.server && req) {
      cookieValue = req.headers.cookie
      if (cookieValue != undefined) {
        var new_cookie = cookieValue.replace(/=/g, ':').split(';')
        for (var i = 0; i < new_cookie.length; i++) {
          cookieList.push(new_cookie[i].split(':'))
        }
        for (var j = 0; j < cookieList.length; j++) {
          if (cookieList[j][0].indexOf('sign') != -1) {
            signId = cookieList[j][1]
          }
        }
      }
    } else if (process.client) {
      signId = getCookie('sign')
    }
    function getOnlineCourse() {
      return axios({
        url: appBaseUrl + '/courseStudyCenter/getStudentMicroCourse',
        method: 'get',
        params: {
          sign: signId,
          pageNumber: 1,
          pageSize: 5,
        },
        headers: {
          cookie: cookieValue ? cookieValue : '',
        },
        credentials: 'include',
      })
    }
    function getMyProfessionCourse() {
      return axios({
        url: appBaseUrl + '/courseStudyCenter/getStudentEmploymentCourse',
        method: 'get',
        params: {
          sign: signId,
        },
        headers: {
          cookie: cookieValue ? cookieValue : '',
        },
        credentials: 'include',
      })
    }
    return axios
      .all([getOnlineCourse(), getMyProfessionCourse()])
      .then(res => {
        store.commit('getErrorTips', true)

        if (res[0].data.status == 200) {
          store.commit('getStudyCourses', res[0].data)
          store.commit('getLoginState', true)
        } else {
          if (
            res[0].data.errorMessage == '用户尚未登录！请重新登录！' ||
            res[0].data.status == 401
          ) {
            store.commit('getLoginState', false)
          }
        }
        if (res[1].data.status == 200) {
          store.commit('getMyProfessionCourse', res[1].data)
        }
      })
      .catch(res => {
        store.commit('getErrorTips', false)
      })
  },
  computed: {
    ...mapState({
      onlineCourseLists: function(state) {
        return state.indexModules.studyCenterData.onlineCourseLists
      },
      professionCourseLists: function(state) {
        return state.indexModules.studyCenterData.professionCourseLists
      },
      loginState: function(state) {
        return state.loginModules.loginState
      },
      errorState: function(state) {
        return state.loginModules.errorState
      },
    }),
  },
  beforeMount() {
    let body = document.body
    if (!body.classList.contains('study-center')) {
      body.classList.add('study-center')
    }

    if (this.loginState) {
      localStorage.setItem('globalLogin', true)
    }
    if (
      localStorage.getItem('globalLogin') == false ||
      this.loginState == false
    ) {
      window.location = '/loginRegister/phoneLogin'
      window.localStorage.setItem('redirectUrl', window.location.href)
    }
    if (!this.errorState) {
      errorTips('网络连接错误,请稍后重试~')
    }
  },

  beforeDestroy() {
    let body = document.body
    if (body.classList.contains('study-center')) {
      body.classList.remove('study-center')
    }
  },

  mounted() {
    this.getResult()
    this.getResult2()
    zhugeTrack('H5_进入学习中心页')
    if (this.onlineCourseLists.total < this.onlineCourse.pageSize) {
      this.loadingText2 = ''
    } else {
      this.loadingText2 = '加载更多'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('getStudyCourses', '')
    this.$store.commit('getMyProfessionCourse', '')
    next()
  },
  methods: {
    studyCenterZhuge: function(clickname) {
      zhugeTrack(clickname)
    },
    dialogShow: function(obj, item) {
      if (item.courseType == 2) {
        MessageBox({
          title: '',
          message: '暂时无法观看直播请前往APP<br />【学习中心-直播计划】中观看',
          showCancelButton: true,
          confirmButtonText: '打开APP'
        }).then(function(action) {
          if (action !== 'confirm') return

          evokeApp()
        })
      } else if (item.status == -1 && item.terminateCause == 1) {
        errorTips('该课程正在处于休学中，无法学习...')
      } else {
        zhugeTrack('H5_学习中心-点击课程', obj)
        window.location.href =
          '/videos/videoPlay/payVideoPlay?moduleId=' +
          item.firstModuleId +
          '&courseId=' +
          item.id
      }
    },
    changeDialog() {
      this.dialogVisible = false
    },
    dropShow: function() {
      this.isDropShow = !this.isDropShow
    },
    ...mapMutations([
      'getStudyCourses',
      'getMyProfessionCourse',
      'getLoginState',
      'getErrorTips',
    ]),
    //        getOnlineCourse:function(){
    //          Indicator.open();
    //          this.isDropShow=false;
    //          this.onlineCourse.pageSize=5; //切换重置pageSize
    //          //切换重置上拉加载数据
    //          this.allLoaded=false;
    //          this.classTop=true;
    //          this.loadingText2="加载更多";
    //          this.getResult();
    //        },
    getResult() {
      Indicator.open()
      axios
        .get(appBaseUrl + '/courseStudyCenter/getStudentMicroCourse/', {
          params: {
            sign: getCookie('sign'),
            pageNumber: this.onlineCourse.pageNumber,
            pageSize: this.onlineCourse.pageSize,
          },
        })
        .then(res => {
          if (res.data.status == 200) {
            this.onlineCourse.totalPageCount = res.data.result.total
            this.$store.commit('getStudyCourses', res.data)
            Indicator.close()
          } else if (
            res.data.errorMessage == '用户尚未登录！请重新登录！' ||
            res.data.status == 401
          ) {
            window.location = '/loginRegister/phoneLogin'
            window.localStorage.setItem('redirectUrl', window.location.href)
          }
        })
    },
    getResult2() {
      axios({
        url: appBaseUrl + '/courseStudyCenter/getStudentEmploymentCourse',
        method: 'get',
        params: {
          sign: getCookie('sign'),
        },
      }).then(res => {
        if (res.data.status == 200) {
          this.$store.commit('getMyProfessionCourse', res.data)
        }
      })
    },
    loadBottom2() {
      if (this.onlineCourseLists != '') {
        if (
          this.onlineCourseLists.list &&
          this.onlineCourseLists.list.length != 0
        ) {
          if (this.onlineCourse.pageSize >= this.onlineCourseLists.total) {
            this.allLoaded = true
            this.classTop2 = false
            this.$refs.loadmore2.onBottomLoaded()
            this.loadingText2 = ''
          } else {
            this.classTop2 = true
            this.onlineCourse.pageSize += 5
            if (this.onlineCourse.pageSize >= this.onlineCourseLists.total) {
              this.allLoaded = true
              this.classTop2 = false
              this.$refs.loadmore2.onBottomLoaded()
              this.loadingText2 = ''
            }
            this.getResult()
          }
        }
      }
    },
  },
}
</script>
<style lang="less">
@import '../../static/css/variable.less';
html,
body {
  background-color: @backgroundColor!important;
  html,
  body.study-center {
    overflow-y: hidden;
  }
  .studyCenter {
    /*	.mint-loadmore{
  		overflow:scroll !important;
  	}*/
    .is_active {
      color: @primaryColor;
    }
    .mint-navbar {
      margin: unit(20 / @u, @uu) 0;
      .mint-tab-item {
        color: @color3;
        padding: unit(34 / @u, @uu) 0;
        margin: 0 unit(80 / @u, @uu);
        .mint-tab-item-label {
          font-size: unit(30 / @u, @uu);
        }
        &.is-selected {
          color: @primaryColor;
          border-bottom: 3px solid @primaryColor;
        }
      }
    }
    .mint-tab-container {
      min-height: unit(320 / @u, @uu);
      /*overflow:inherit;*/
      .courseSelect_content {
        position: relative;
        height: unit(80 / @u, @uu);
        line-height: unit(80 / @u, @uu);
        margin: 0 unit(30 / @u, @uu) unit(20 / @u, @uu);
        background-color: #fff;
        text-align: center;
        font-size: unit(30 / @u, @uu);
        color: @color3;
        .border-radius(unit(8 / @u, @uu));
        i {
          display: inline-block;
          margin-left: unit(20 / @u, @uu);
          color: @color9;
        }
        .courseSelect {
          position: absolute;
          z-index: 1;
          width: 100%;
          background-color: #f6fafe;
        }
      }
      .study_courseList {
        background-color: #fff;
        padding: unit(30 / @u, @uu);
        li {
          position: relative;
          margin-bottom: unit(40 / @u, @uu);
          .study_courseList_leftImg {
            width: unit(286 / @u, @uu);
            height: unit(161 / @u, @uu);
            overflow: hidden;
            float: left;
            .border-radius(unit(8 / @u, @uu));
            img {
              width: 100%;
              height: 100%;
              background: url('/web/images/defaultImg/course_defaultImg.jpg')
                no-repeat center;
              background-size: cover;
            }
          }
          .study_courseList_rightContent {
            position: absolute;
            top: 0;
            width: 100%;
            height: unit(161 / @u, @uu);
            padding-left: unit(306 / @u, @uu);
            overflow: hidden;
            .study_courseList_rightInfo {
              width: 100%;
              display: inline-block;
              font-size: unit(26 / @u, @uu);
              color: @color9;
              .courseName {
                font-size: unit(30 / @u, @uu);
                color: @color3;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              p {
                margin-bottom: unit(14 / @u, @uu);
              }
              .studyProcess {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                position: absolute;
                bottom: 0;
              }
            }
            .circleProcess {
              display: inline-block;
              position: absolute;
              right: 0;
              top: unit(24 / @u, @uu);
              .el-progress {
                .el-progress__text {
                  color: @color3;
                  font-size: unit(30 / @u, @uu) !important;
                }
              }
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

body.study-center {
  .mint-msgbox {
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
