<template>
  <div class="microCourses microCoursesList" ref="scroll">
    <headBar titleName="提升课" isShowClassName="subTitle"></headBar>
    <div class="courseTypeNav">
      <div class="backbg" v-show="selected"></div>
      <div class="selectType_box toBeFixed">
        <ul class="selectType cl">
          <li @click="toggleShow(0,selectTypeName1)">
            <div class="title">
              <span>{{selectTypeName1}}</span>
              <i class="iconfont icon-shangxiajiantou" v-show="isShow[0]"></i>
              <i class="iconfont icon-xiajiantou" v-show="!isShow[0]"></i>
            </div>
          </li>
          <li @click="toggleShow(1,selectTypeName2)">
            <div class="title">
              <span>{{selectTypeName2}}</span>
              <i class="iconfont icon-shangxiajiantou" v-show="isShow[1]"></i>
              <i class="iconfont icon-xiajiantou" v-show="!isShow[1]"></i>
            </div>
          </li>
          <li @click="toggleShow(2,selectTypeName3)">
            <div class="title">
              <span>{{selectTypeName3}}</span>
              <i class="iconfont icon-shangxiajiantou" v-show="isShow[2]"></i>
              <i class="iconfont icon-xiajiantou" v-show="!isShow[2]"></i>
            </div>
          </li>
          <li @click="toggleShow(3,'筛选')">
            <div class="title">
              <span>筛选</span>
              <i class="iconfont icon-shangxiajiantou" v-show="isShow[3]"></i>
              <i class="iconfont icon-xiajiantou" v-show="!isShow[3]"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="selectType_box">
        <div class="selectType_content" :class="{'show':isShow1}" >
          <i class="sanJiao"></i>
          <ul>
            <li :class="isCurrent1==0?'is_active':''" orderType="0"  @click.prevent="findMircoCourse('orderType',0,0,'全部')">全部</li>
            <li :class="isCurrent1==1?'is_active':''" orderType="1"  @click.prevent="findMircoCourse('orderType',1,0,'最新')">最新</li>
            <li :class="isCurrent1==2?'is_active':''" orderType="2"  @click.prevent="findMircoCourse('orderType',2,0,'最热')">最热</li>
          </ul>
        </div>
        <div class="selectType_content" :class="{'show':isShow2}" >
          <i class="sanJiao"></i>
          <ul>
            <li :class="isCurrent2===''?'is_active':''" courseLevel=""   @click.prevent="findMircoCourse('courseLevel','',1,'全部')">全部</li>
            <li :class="isCurrent2===0?'is_active':''" courseLevel="0"  @click.prevent="findMircoCourse('courseLevel',0,1,'基础')">基础</li>
            <li :class="isCurrent2===1?'is_active':''" courseLevel="1"  @click.prevent="findMircoCourse('courseLevel',1,1,'进阶')">进阶</li>
            <li :class="isCurrent2===2?'is_active':''" courseLevel="2"  @click.prevent="findMircoCourse('courseLevel',2,1,'提高')">提高</li>
          </ul>
        </div>
        <div class="selectType_content" :class="{'show':isShow3}" >
          <i class="sanJiao"></i>
          <ul>
            <li :class="isCurrent3==0?'is_active':''" contentType="0"  @click.prevent="findMircoCourse('contentType',0,2,'全部')">全部</li>
            <li :class="isCurrent3==2?'is_active':''" contentType="2"  @click.prevent="findMircoCourse('contentType',2,2,'项目实战')">项目实战</li>
            <li :class="isCurrent3==1?'is_active':''" contentType="1"  @click.prevent="findMircoCourse('contentType',1,2,'知识点精讲')">知识点精讲</li>
          </ul>
        </div>
        <div class="selectType_content" :class="{'show':isShow4}" >
          <i class="sanJiao"></i>
          <div class="shifting">
            <div id="shiftingWrap">
              <div class="shifting_type">
                <span class="biaoqian">方向：</span>
                <ul class="cl">
                  <li :class="isDirec==0?'is_selected':''"  @click.prevent="filterStyle('isDirec','')">全部</li>
                  <li :class="isDirec==item.id?'is_selected':''" v-for="(item,index) in mircoDirections" :key="index" @click.prevent="filterStyle('isDirec',item.id)">{{item.name}}</li>
                </ul>
              </div>
              <div class="shifting_type">
                <span class="biaoqian">学科：</span>
                <ul class="cl">
                  <li :class="isXueke==0?'is_selected':''"  @click.prevent="filterStyle('isXueke','')">全部</li>
                  <li :class="isXueke==item.id?'is_selected':''" v-for="(item,index) in xueke" :key="index" @click.prevent="filterStyle('isXueke',item.id)">{{item.name}}</li>
                </ul>
              </div>
              <div class="shifting_type">
                <span class="biaoqian">分类：</span>
                <ul class="cl">
                  <li :class="isTag==0?'is_selected':''"  @click.prevent="filterStyle('isTag','')">全部</li>
                  <li :class="isTag==item.id?'is_selected':''" v-for="(item,index) in tags" :key="index" @click.prevent="filterStyle('isTag',item.id)">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="shifting_btn">
              <div class="reset" @click="reset">重置</div>
              <div class="confirm" @click.prevent="findMircoCourse('saixuan','',3)">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-loadmore class="microCourse"
                 v-if="this.microCourses.length!=0"
                 :bottomMethod="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 :autoFill="isFull"
                 @bottom-status-change="handleTopChange"
                 :class="{classTop:classTop}"
                 ref="loadmore">
      <transition-group tag="ul" name="item" class="microCourse-show  cl">
        <microCourseTemp v-for="(item,index) in this.microCourses" :key="index"
                         zhugeClickName="H5-课程列表页-点击课程"
                         courseType="精品微课"
                         courseRouter="/course/micro/detail/"
                         :courseId="item.courseId"
                         :smallimg_path='item.courseImg'
                         :courseName='item.courseName'
                         :learnd_count='item.learndCount'
                         :current_price='item.currentPrice'
                         :subjectId="item.subjectId"
                         :isFree="item.isFree">
        </microCourseTemp>
      </transition-group>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">{{loadingText}}</span>
        <span v-if="bottomStatus === 'loading'">加载中...</span>
      </div>
    </mt-loadmore>
    <div class="microCourse" v-else>
      <emptyTemp></emptyTemp>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Indicator, Toast, Loadmore } from "mint-ui";
import { appBaseUrl } from "~/api/apiurl";
import { mapState, mapMutations } from "vuex";
import { zhugeTrack } from "~/plugins/filter";
export default {
  name: "jobCourse",
  fetch({ store, route }) {
    return axios({
      url: appBaseUrl + "/bxg/index/getMicroCourseByChoice",
      method: "POST",
      params: {
        isFree: 0,
        pageSize: 20,
        pageNo: 1,
        tagId: route.query.tagId
      }
    }).then(res => {
      store.commit("getMicroCourses", res.data);
    });
  },
  data() {
    return {
      zhugeTrack: zhugeTrack,
      isCurrent1: 0,
      isCurrent2: "",
      isCurrent3: 0,
      isDirec: 0,
      isXueke: 0,
      isTag: 0,
      selectTypeName1: "综合",
      selectTypeName2: "难度",
      selectTypeName3: "类型",
      allLoaded: false, //控制是否加载完成
      isFull: false,
      classTop: false, //解决list被加载中样式顶置问题
      bottomStatus: "", //加载中状态值
      loadingText: "",
      isShow: [false, false, false, false], //背景遮罩是否显示
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      selected: false,
      mircoDirections: "",
      xueke: "",
      tags: "",
      paramsData: {
        directionId: "",
        subjectId: "",
        tagId: this.$route.query.tagId,
        orderType: 0,
        courseLevel: "",
        contentType: 0,
        isFree: 0,
        pageNo: 1,
        pageSize: 20
      },
      microCourseLen: 0
    };
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
    

    this.shiftData();
    if (this.$route.query.tagId != undefined) {
      this.isTag = this.$route.query.tagId;
    }
    if (this.microCourses.length < this.paramsData.pageSize) {
      this.loadingText = "";
    } else {
      this.loadingText = "上拉加载更多";
    }
    zhugeTrack("H5-进入课程列表页", { 类型: "精品微课" });
  },
  computed: {
    ...mapState({
      microCourses: function(state) {
        return state.indexModules.index.microCourses;
      }
    })
  },
  methods: {
    ...mapMutations(["getMicroCourses"]),
    findMircoCourse: function(type, current, isShow, selectTypeName) {
      this.paramsData.pageSize = 20;
      this.allLoaded = false;
      this.classTop = false;
      this.loadingText = "上拉加载更多";
      if (type == "orderType") {
        this.paramsData.orderType =
          current == undefined ? this.paramsData.orderType : current;
        this.isCurrent1 = current;
        this.isShow1 = false;
        if (selectTypeName == "全部") {
          this.selectTypeName1 = "综合";
        } else {
          this.selectTypeName1 = selectTypeName;
        }
      } else if (type == "courseLevel") {
        this.paramsData.courseLevel =
          current == undefined ? this.paramsData.courseLevel : current;
        this.isCurrent2 = current;
        this.isShow2 = false;
        if (selectTypeName == "全部") {
          this.selectTypeName2 = "难度";
        } else {
          this.selectTypeName2 = selectTypeName;
        }
      } else if (type == "contentType") {
        this.paramsData.contentType =
          current == undefined ? this.paramsData.contentType : current;
        this.isCurrent3 = current;
        this.isShow3 = false;
        if (selectTypeName == "全部") {
          this.selectTypeName3 = "类型";
        } else {
          this.selectTypeName3 = selectTypeName;
        }
      } else if (type == "saixuan") {
        this.isShow4 = false;
      }
      this.isShow[isShow] = false;
      this.selected = false;
      this.getResult();
    },
    getResult() {
      axios({
        url: appBaseUrl + "/bxg/index/getMicroCourseByChoice",
        method: "POST",
        params: this.paramsData
      }).then(res => {
        this.$store.commit("getMicroCourses", res.data);
        if (this.paramsData.pageSize > res.data.resultObject.length) {
          this.allLoaded = true;
          this.classTop = false;
          this.$refs.loadmore.onBottomLoaded();
          this.loadingText = "";
        }
        this.microCourseLen = res.data.resultObject.length;
        document.getElementById("__nuxt").style.overflowY = "auto";
      });
    },
    loadBottom() {
      if (this.microCourses.length != 0) {
        this.classTop = true;
        this.paramsData.pageSize += 20;
        this.getResult();
      }
    },
    handleTopChange(status) {
      this.bottomStatus = status;
    },
    reset: function() {
      this.isDirec = 0;
      this.isXueke = 0;
      this.isTag = 0;
      this.paramsData.directionId = "";
      this.paramsData.subjectId = "";
      this.paramsData.tagId = "";
    },
    filterStyle: function(type, filterId) {
      if (type == "isDirec") {
        this.paramsData.directionId =
          filterId == undefined ? this.paramsData.directionId : filterId;
        this.isDirec = filterId;
      } else if (type == "isXueke") {
        this.paramsData.subjectId =
          filterId == undefined ? this.paramsData.subjectId : filterId;
        this.isXueke = filterId;
      } else if (type == "isTag") {
        this.paramsData.tagId =
          filterId == undefined ? this.paramsData.tagId : filterId;
        this.isTag = filterId;
      }
    },
    toggleShow: function(num, tagName) {
      zhugeTrack("H5-课程列表页-点击筛选项", { 筛选分类: tagName });
      for (var i = 0; i < this.isShow.length; i++) {
        if (i == num) {
          this.isShow[num] = !this.isShow[num];
          this.selected = this.isShow[num];
          document.documentElement.style.height = "100%";
          document.documentElement.style.overflow = "hidden";
          document.getElementById("__nuxt").style.overflow = "hidden";
          var screenH = this.getBrowserInterfaceSize().pageHeight - 139;
          document.getElementById("shiftingWrap").style.height = screenH + "px";
        } else {
          this.isShow[i] = false;
        }
        if (this.selected == false) {
          document.documentElement.style.height = "auto";
          document.documentElement.style.overflowY = "auto";
          document.getElementById("__nuxt").style.overflowY = "auto";
        }
      }
      if (num == 0) {
        this.isShow1 = !this.isShow1;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      } else if (num == 1) {
        this.isShow2 = !this.isShow2;
        this.isShow1 = false;
        this.isShow3 = false;
        this.isShow4 = false;
      } else if (num == 2) {
        this.isShow3 = !this.isShow3;
        this.isShow2 = false;
        this.isShow1 = false;
        this.isShow4 = false;
      } else {
        this.isShow4 = !this.isShow4;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow1 = false;
      }
    },
    getBrowserInterfaceSize: function() {
      var pageWidth = window.innerWidth;
      var pageHeight = window.innerHeight;

      if (typeof pageWidth != "number") {
        //在标准模式下面
        if (document.compatMode == "CSS1Compat") {
          pageWidth = document.documentElement.clientWidth;
          pageHeight = document.documentElement.clientHeight;
        } else {
          pageWidth = document.body.clientWidth;
          pageHeight = window.body.clientHeight;
        }
      }

      return {
        pageWidth: pageWidth,
        pageHeight: pageHeight
      };
    },
    shiftData: function() {
      axios
        .get("/course/getDirections", {
          params: { courseType: 1, isFree: this.paramsData.isFree }
        })
        .then(res => (this.mircoDirections = res.data.resultObject));
      axios
        .get("/course/getSubjects", {
          params: { isFree: this.paramsData.isFree }
        })
        .then(res => (this.xueke = res.data.resultObject));
      axios
        .get("/course/getTags", { params: { isFree: this.paramsData.isFree } })
        .then(res => (this.tags = res.data.resultObject));
    }
  }
};
</script>

<style lang="less">
@import "../../../static/css/variable.less";
#__nuxt {
  height: 100%;
}
@media screen and (max-width: 360px) {
  body,
  html {
    font-size: 16px;
  }
}
@media screen and (max-width: 360px) {
  .shifting_type li {
    font-size: unit(24 / @u, @uu) !important;
  }
}
/*  .microCoursesList{
      .microCourse-show{
        padding-top: unit(40/@u,@uu);
      }
    }*/
.classTop {
  padding-top: 50px !important;
}
.courseTypeNav {
  position: relative;
  height: unit(80 / @u, @uu);
  margin-top: unit(100 / @u, @uu);
}
.microCourses {
  overflow: inherit;
  padding-bottom: 0;
  height: 100%;
  background: #fff;
  .backbg {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .is_active {
    color: @primaryColor;
  }
  .selectType_box {
    position: relative;
    z-index: 1;
    .selectType {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 0 unit(30 / @u, @uu);
      background-color: @backgroundColor;
      > li {
        width: unit(204 / @u, @uu);
        &:last-child {
          width: unit(80 / @u, @uu);
        }
        .title {
          height: unit(80 / @u, @uu);
          line-height: unit(80 / @u, @uu);
          font-size: unit(26 / @u, @uu);
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
          i {
            vertical-align: middle;
            margin-left: unit(5 / @u, @uu);
          }
        }
      }
    }
    .show {
      display: block !important;
    }
    .selectType_content {
      position: fixed;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #ddd;
      display: none;
      top: unit(180 / @u, @uu);
      &:nth-child(2) {
        .sanJiao {
          left: calc(~"25% + 15px + 1em");
        }
      }
      &:nth-child(3) {
        .sanJiao {
          left: calc(~"2 * 25% + 15px + 1em");
        }
      }
      &:nth-child(4) {
        right: 0;
        width: unit(609 / @u, @uu);
        .sanJiao {
          left: calc(~"3 * 25% + 15px + 1em");
        }
      }
      .sanJiao {
        position: absolute;
        left: calc(~"15px + .5em");
        top: unit(-8 / @u, @uu);
        width: unit(23 / @u, @uu);
        height: unit(15 / @u, @uu);
        background: url("/web/images/mircoCourse/upRow.png") no-repeat center;
      }
      > ul {
        li {
          height: unit(80 / @u, @uu);
          line-height: unit(80 / @u, @uu);
          padding: 0 unit(30 / @u, @uu);
          font-size: unit(26 / @u, @uu);
          border-bottom: 1px solid #eee;
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .shifting {
        min-height: unit(100 / @u, @uu);
        #shiftingWrap {
          overflow-y: auto;
          overflow-x: hidden;
          .shifting_type {
            padding: unit(22 / @u, @uu) unit(44 / @u, @uu) 0;
            .biaoqian {
              display: block;
              margin-bottom: unit(30 / @u, @uu);
              font-size: unit(26 / @u, @uu);
            }
            > ul {
              li {
                float: left;
                width: unit(150 / @u, @uu);
                height: unit(58 / @u, @uu);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: unit(58 / @u, @uu);
                text-align: center;
                font-size: unit(26 / @u, @uu);
                border: 1px solid #eee;
                color: @color9;
                .border-radius(unit(8/@u,@uu));
                margin-right: unit(30 / @u, @uu);
                margin-bottom: unit(30 / @u, @uu);
                &:nth-child(3n) {
                  margin-right: 0;
                  margin-bottom: 0;
                }
                &.is_selected {
                  background-color: @primaryColor!important;
                  color: #fff !important;
                }
              }
            }
          }
        }
        .shifting_btn {
          display: flex;
          flex-flow: row nowrap;
          border-top: 1px solid #eee;
          > div {
            flex: 1;
            font-size: unit(34 / @u, @uu);
            text-align: center;
            line-height: unit(98 / @u, @uu);
            background-color: #fff;
            color: @primaryColor;
          }
          .confirm {
            background-color: @primaryColor;
            color: #fff;
          }
        }
      }
    }
  }
  .toBeFixed {
    position: fixed;
    width: 100%;
    z-index: 1;
  }
  .microCourse {
    background-color: #fff;
    padding: unit(30 / @u, @uu) 0 0 unit(30 / @u, @uu);
  }
}
</style>
