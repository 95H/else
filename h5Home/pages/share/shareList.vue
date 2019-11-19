<template>
  <div class="shareImgBody imgWarp">
    <mt-loadmore
      v-if="listData.length!=0"
      :bottomMethod="loadBottom"
      :bottom-all-loaded="allLoaded"
      :autoFill="isFull"
      @bottom-status-change="handleTopChange"
      :class="{classTop:classTop}"
      ref="loadmore"
    >
      <transition-group tag="ul" name="item" class="professionCourses-show cl">
        <li class="cl" v-for="(item,index) in listData" :key="item.courseId">
          <a href="javascript:;">
            <div
              class="professionCourses-show-left commonImg"
              @click="courseDetails(item.courseType,item.courseId,item.courseName)"
            >
              <img :src="item.courseImg">
            </div>
            <div class="professionCourses-show-right">
              <div
                class="courseName"
                @click="courseDetails(item.courseType,item.courseId,item.courseName)"
              >{{item.courseName}}</div>
              <div
                class="courseDescription multi-no-wrap"
                @click="courseDetails(item.courseType,item.courseId,item.courseName)"
              >
                <span class="moneyTitle">收益：</span>
                {{item.bonus}}元/人
              </div>
              <div class="countAndMoney cl">
                <button @click="shareDetails(item)">马上邀请</button>
              </div>
            </div>
          </a>
        </li>
      </transition-group>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span
          v-show="bottomStatus !== 'loading'"
          :class="{ 'rotate': bottomStatus === 'drop' }"
        >{{loadingText}}</span>
        <span v-if="bottomStatus === 'loading'">加载中...</span>
      </div>
    </mt-loadmore>
    <div class="commonProblem" v-show="listDataEmpty">
      <div>
        <emptyTemp desc="暂时还没有课程"></emptyTemp>
      </div>
    </div>
  </div>
</template>
<style lang="less">
@import "shareList.less";
html,
body {
  background-color: #f5f5f5 !important;
}
.commonProblem {
  background-color: #fff !important;
}
</style>
<script>
import axios from "axios";
import { appBaseUrl } from "~/api/apiurl";
import { Toast, Loadmore } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import { zhugeTrack } from "~/plugins/filter";
export default {
  name: "shareList",
  head: {
    title: "邀请好友赚奖励金"
  },
  data() {
    return {
      listDataEmpty: false,
      listData: [],
      zhugeTrack: zhugeTrack,
      allLoaded: false, //控制是否加载完成
      isFull: false,
      classTop: false, //解决list被加载中样式顶置问题
      bottomStatus: "", //加载中状态值
      loadingText: "上拉加载更多",
      pageParams: {
        pageNumber: 1,
        pageSize: 10
      },
      totalPage: ""
    };
  },
  computed: {
    ...mapState({
      loginState: function(state) {
        return state.loginModules.loginState;
      }
    })
  },
  mounted() {
    zhugeTrack("H5_进入分销课列表页");
    let coEmpty = document.querySelector(".commonProblem");
    if (coEmpty) {
      coEmpty.style.height = document.body.clientHeight + "px";
    }
    this.getDistributeList();
  },
  methods: {
    courseDetails: function(type, id, name) {
      if (type == 0) {
        zhugeTrack(
          "H5_分销列表页-点击课程",
          { 课程类型: "就业课", 课程id: id, 课程名称: name },
          "/class/detail/?id=" + id
        );
      } else {
        zhugeTrack(
          "H5_分销列表页-点击课程",
          { 课程类型: "微课", 课程id: id, 课程名称: name },
          "/course/micro/detail/?id=" + id
        );
      }
    },
    shareDetails(item) {
      axios
        .get("/online/user/isAlive")
        .then(res => {
          if (res.data.success) {
            if (this.isWeixinBrowser()) {
              window.location = `${appBaseUrl}/wechat/webpage/authorize?userId=${
                res.data.resultObject.id
              }&courseId=${item.courseId}&sign=${localStorage.getItem("sign")}`;
            } else {
              zhugeTrack(
                "H5_分销列表页-点击马上邀请",
                {
                  课程类型: item.courseType == 0 ? "就业课" : "微课",
                  课程id: item.courseId,
                  课程名称: item.courseName
                },
                "/share/shareImg/?courseId=" +
                  item.courseId +
                  "&userId=" +
                  localStorage.getItem("userId")
              );
            }
          } else {
            window.location = "/loginRegister/phoneLogin";
            window.localStorage.setItem("redirectUrl", window.location.href);
          }
        })
        .catch(err => {});
    },
    isWeixinBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      return /micromessenger/.test(ua) ? true : false;
    },
    getDistributeList() {
      this.$indicator.open();
      this.allLoaded = false;
      this.classTop = false;
      axios({
        url: appBaseUrl + "/bxg/distribution/getDistributionCourses",
        method: "POST",
        params: this.pageParams
      }).then(res => {
        this.$indicator.close();
        if (res.status == 200) {
          this.listData = res.data.result.list;
          this.totalPage = res.data.result.total;
          if (res.data.result.list.length == 0) {
            this.listDataEmpty = true;
          }
        } else {
          this.listDataEmpty = true;
        }
      });
    },
    loadBottom() {
      if (this.listData.length != 0) {
        if (this.pageParams.pageSize >= this.totalPage) {
          this.pageParams.pageSize = this.totalPage;
          this.loadingText = "";
          this.allLoaded = true;
          this.classTop = false;
          this.$refs.loadmore.onBottomLoaded();
        } else {
          this.classTop = true;
          this.pageParams.pageSize += 10; //每次加载5条
          if (this.pageParams.pageSize >= this.totalPage) {
            this.pageParams.pageSize = this.totalPage;
            this.loadingText = "";
            this.allLoaded = true;
            this.classTop = false;
            this.$refs.loadmore.onBottomLoaded();
          }
          this.getDistributeList();
        }
      }
    },
    handleTopChange(status) {
      this.bottomStatus = status;
    }
  }
};
</script>
