<template>
  <div class="content discountPoupon">
    <titleBack titleName="我的优惠券" isShowRight="isShowTip"></titleBack>
    <div class="tabPage">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="可使用" name="inCommission">
          <div class="conversion">
            <label>兑换码：</label>
            <input type="text" name id value v-model="redeemCode" placeholder="请输入优惠券码">
            <span @click="conversionCode()">兑换</span>
          </div>
          <mt-loadmore
            v-if="this.getDiscountPoupon && this.getDiscountPoupon.items.length!=0"
            :bottomMethod="loadBottom"
            :bottom-all-loaded="allLoaded"
            :autoFill="isFull"
            @bottom-status-change="handleTopChange"
            :class="{classTop:classTop}"
            ref="loadmore"
          >
            <div class="main">
              <div
                class="discountPoupon inCommission"
                v-for="(items,index) in this.getDiscountPoupon.items"
                :key="index"
              >
                <div class="money">
                  <h3
                    class="discountsMoney"
                    v-if="items.type == 'CASH'"
                  >￥{{toFixed(items.discount,0)}}</h3>
                  <h3
                    class="discountsMoney"
                    v-if="items.type == 'DISCOUNT'"
                  >{{toFixed(items.discount,1)}}折</h3>
                  <p class="failureTime" v-if="items.expireDay !== 0">({{items.expireDay}}天后失效)</p>
                  <p class="failureTime" v-if="items.expireDay == 0">(1天内失效)</p>
                </div>
                <div class="subject">
                  <h3 class="ticketName">课程券</h3>
                  <p class="scope">使用课程：{{items.courseNames}}</p>
                  <p class="classNumber" v-if="items.courseAmount !== 1">等{{items.courseAmount}}个课程</p>
                  <p class="timer">{{items.startTime | timer}}-{{items.endTime | timer}}</p>
                </div>
                <div class="use">
                  <a
                    href="javascript:;"
                    @click="zhugeTrack('H5_我的优惠券-点击立即使用',{},'/discountPoupon/discountsClass/discountsClass?id='+items.id)"
                  >立即使用</a>
                </div>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span
                v-show="bottomStatus !== 'loading'"
                :class="{ 'rotate': bottomStatus === 'drop' }"
              >{{loadingText}}</span>
              <span v-if="bottomStatus === 'loading'">加载中...</span>
            </div>
          </mt-loadmore>
          <div class="commonProblem" v-else>
            <emptyTemp imgUrl="/web/images/defaultImg/disCountEmpty.png"></emptyTemp>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已使用" name="haveBeenUsed">
          <mt-loadmore
            v-if="this.getDiscountPoupon && this.getDiscountPoupon.items.length!=0"
            :bottomMethod="loadBottom2"
            :bottom-all-loaded="allLoaded2"
            :autoFill="isFull2"
            @bottom-status-change="handleTopChange2"
            :class="{classTop:classTop2}"
            ref="loadmore2"
          >
            <div class="main">
              <div
                class="discountPoupon haveBeenUsed"
                v-for="(items,index) in this.getDiscountPoupon.items"
                :key="index"
              >
                <div class="money">
                  <h3
                    class="discountsMoney"
                    v-if="items.type == 'CASH'"
                  >￥{{toFixed(items.discount,0)}}</h3>
                  <h3
                    class="discountsMoney"
                    v-if="items.type == 'DISCOUNT'"
                  >{{toFixed(items.discount,1)}}折</h3>
                  <p class="failureTime">(已失效)</p>
                </div>
                <div class="subject">
                  <h3 class="ticketName">课程券</h3>
                  <p class="scope">使用课程：{{items.courseNames}}</p>
                  <p class="classNumber" v-if="items.courseAmount !== 1">等{{items.courseAmount}}个课程</p>
                  <p class="timer">{{items.startTime | timer}}-{{items.endTime | timer}}</p>
                </div>
                <div class="use">
                  <p>已使用</p>
                </div>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span
                v-show="bottomStatus2 !== 'loading'"
                :class="{ 'rotate': bottomStatus2 === 'drop' }"
              >{{loadingText2}}</span>
              <span v-if="bottomStatus2 === 'loading'">加载中...</span>
            </div>
          </mt-loadmore>
          <div class="commonProblem" v-else>
            <emptyTemp imgUrl="/web/images/defaultImg/disCountEmpty.png"></emptyTemp>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已过期" name="haveExpired">
          <mt-loadmore
            v-if="this.getDiscountPoupon && this.getDiscountPoupon.items.length!=0"
            :bottomMethod="loadBottom3"
            :bottom-all-loaded="allLoaded3"
            :autoFill="isFull3"
            @bottom-status-change="handleTopChange3"
            :class="{classTop:classTop3}"
            ref="loadmore3"
          >
            <div class="main">
              <div
                class="discountPoupon haveExpired"
                v-for="(items,index) in this.getDiscountPoupon.items"
                :key="index"
              >
                <div class="money">
                  <h3
                    class="discountsMoney"
                    v-if="items.type == 'CASH'"
                  >￥{{toFixed(items.discount,0)}}</h3>
                  <h3
                    class="discountsMoney"
                    v-if="items.type == 'DISCOUNT'"
                  >{{toFixed(items.discount,1)}}折</h3>
                  <p class="failureTime">(已失效)</p>
                </div>
                <div class="subject">
                  <h3 class="ticketName">课程券</h3>
                  <p class="scope">使用课程：{{items.courseNames}}</p>
                  <p class="classNumber" v-if="items.courseAmount !== 1">等{{items.courseAmount}}个课程</p>
                  <p class="timer">{{items.startTime | timer}}-{{items.endTime | timer}}</p>
                </div>
                <div class="use">
                  <p>已过期</p>
                </div>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span
                v-show="bottomStatus3 !== 'loading'"
                :class="{ 'rotate': bottomStatus3 === 'drop' }"
              >{{loadingText3}}</span>
              <span v-if="bottomStatus3 === 'loading'">加载中...</span>
            </div>
          </mt-loadmore>
          <div class="commonProblem" v-else>
            <emptyTemp imgUrl="/web/images/defaultImg/disCountEmpty.png"></emptyTemp>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import { mapMutations, mapState } from "vuex";
import axios from "axios";
import { zhugeTrack } from "~/plugins/filter";
export default {
  name: "discountPoupon",
  fetch({ req, store }) {
    var cookieValue = "";
    if (process.server && req) {
      cookieValue = req.headers.cookie;
    }
    return axios({
      url: "/coupon/getMyCoupons",
      method: "get",
      params: {
        status: 0,
        pageNumber: 1,
        pageSize: 10
      },
      headers: { cookie: cookieValue ? cookieValue : "" },
      credentials: "include"
    }).then(res => {
      if (res.data.success) {
        store.commit("getLoginState", true);
        store.commit("getDiscounPoList", res.data);
      } else {
        if (res.data.errorMessage == "请登录") {
          store.commit("getLoginState", false);
        }
      }
    });
  },
  data() {
    return {
      zhugeTrack: zhugeTrack,
      activeName: "inCommission",
      conversion: "",
      //          discounPoList:this.$store.state.discountPoupon.getDiscountPoupon,
      discounPoList: {},
      itemsData: [],
      redeemCode: "",
      allLoaded: false, //控制是否加载完成
      isFull: false,
      classTop: false, //解决list被加载中样式顶置问题
      bottomStatus: "", //加载中状态值
      loadingText: "",
      allLoaded2: false, //控制是否加载完成
      isFull2: false,
      classTop2: false, //解决list被加载中样式顶置问题
      bottomStatus2: "", //加载中状态值
      loadingText2: "",
      allLoaded3: false, //控制是否加载完成
      isFull3: false,
      classTop3: false, //解决list被加载中样式顶置问题
      bottomStatus3: "", //加载中状态值
      loadingText3: "",
      parameter: {
        status: 0,
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapState({
      getDiscountPoupon: function(state) {
        return state.discountPoupon.getDiscountPoupon;
      },
      loginState: function(state) {
        return state.loginModules.loginState;
      }
    })
  },
  mounted() {
    zhugeTrack("H5_进入我的优惠券页");
    /* if(this.loginState==false){
      window.location="/loginRegister/login";
      window.localStorage.setItem('redirectUrl',window.location.href);
    }*/
    axios
      .get("/online/user/isAlive")
      .then(res => {
        if (!res.data.success) {
          window.location = "/loginRegister/phoneLogin";
          window.localStorage.setItem("redirectUrl", window.location.href);
        }
      })
      .catch(err => {});
    if (this.getDiscountPoupon.totalCount < this.parameter.pageSize) {
      this.loadingText = "";
    } else {
      this.loadingText = "上拉加载更多";
    }
  },
  methods: {
    ...mapMutations(["getDiscounPoList", "getLoginState"]),
    toFixed: function(num, n) {
      return parseFloat(num).toFixed(n);
    },
    handleClick(tab, event) {
      zhugeTrack("H5_点击我的优惠劵分类", { 分类名称: tab.label });
      if (tab.name == "inCommission") {
        this.parameter.status = 0;
        this.parameter.pageSize = 10;
        this.inCommission();
      } else if (tab.name == "haveBeenUsed") {
        this.parameter.status = 1;
        this.parameter.pageSize = 10;
        this.inCommission();
      } else if (tab.name == "haveExpired") {
        this.parameter.status = 2;
        this.parameter.pageSize = 10;
        this.inCommission();
      }
    },
    inCommission: function(type) {
      Indicator.open();
      axios
        .get("/coupon/getMyCoupons", {
          params: {
            status: this.parameter.status,
            pageNumber: this.parameter.pageNumber,
            pageSize: this.parameter.pageSize
          }
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.resultObject.items) {
              this.loadingText = "";
            }
            this.$store.commit("getDiscounPoList", res.data);
            Indicator.close();
          } else if (res.data.errorMessage == "请登录") {
            window.location = "/loginRegister/phoneLogin";
            window.localStorage.setItem("redirectUrl", window.location.href);
          }
        })
        .catch(error => {
          Indicator.close();
        });
    },
    conversionCode() {
      if (this.redeemCode != "") {
        zhugeTrack("H5_点击兑换");
        axios
          .get("/coupon/bindCouponToUser", {
            params: {
              serialNo: this.redeemCode
            }
          })
          .then(res => {
            if (res.data.success == true) {
              Toast(res.data.resultObject);
              this.parameter.pageNumber = 1;
              this.inCommission();
              this.redeemCode = "";
            } else {
              Toast(res.data.errorMessage);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        Toast("请输入优惠券码");
      }
    },
    loadBottom() {
      if (this.getDiscountPoupon.items.length != 0) {
        this.classTop = true;
        if (this.parameter.pageSize >= this.getDiscountPoupon.totalCount) {
          return false;
        }
        this.inCommission();
        this.allLoaded = true;
        this.classTop = false;
        this.$refs.loadmore.onBottomLoaded();
        this.loadingText = "";
      }
    },
    handleTopChange(status) {
      this.bottomStatus3 = status;
    },
    handleTopChange2(status) {
      this.bottomStatus2 = status;
    },
    handleTopChange3(status) {
      this.bottomStatus3 = status;
    },
    loadBottom2() {
      if (this.getDiscountPoupon.items.length != 0) {
        this.classTop2 = true;
        if (this.parameter.pageSize >= this.getDiscountPoupon.totalCount) {
          return false;
        }
        this.inCommission();
        if (this.parameter.pageSize >= this.getDiscountPoupon.totalCount) {
          this.allLoaded2 = true;
          this.classTop2 = false;
          this.$refs.loadmore2.onBottomLoaded();
          this.loadingText2 = "";
        }
      }
    },
    loadBottom3() {
      if (this.getDiscountPoupon.items.length != 0) {
        this.classTop3 = true;
        if (this.parameter.pageSize >= this.getDiscountPoupon.totalCount) {
          return false;
        }
        this.inCommission();
        if (this.parameter.pageSize >= this.getDiscountPoupon.totalCount) {
          this.allLoaded3 = true;
          this.classTop3 = false;
          this.$refs.loadmore3.onBottomLoaded();
          this.loadingText3 = "";
        }
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "discountPoupon.less";
.discountPoupon {
  .containerOnlyHeader {
    .el-tabs {
      height: 100%;
    }
  }
}
#__nuxt {
  height: 100%;
}
</style>
