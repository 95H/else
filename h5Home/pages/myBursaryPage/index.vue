<template>
  <div class="warp">
    <div class="headImgWarp">
      <div class="tx_warp">
        <p class="amount" v-if="this.AmountData.balanceAmount">
          <i>{{this.AmountData.balanceAmount}}</i>
          <span>元</span>
        </p>
        <p class="amount" v-else>
          <i>0.00</i>
          <span>元</span>
        </p>
        <div class="btn_warp">
          <button
            v-if="this.AmountData.balanceAmount>=10"
            @click="checkUserPermission"
            class="acBd-1px bdA"
          >
            提现
            <i class="iconfont">&#xe605;</i>
          </button>
          <button v-else class="disabled border-1px bdA">
            提现
            <i class="iconfont">&#xe605;</i>
          </button>
          <a
            href="javascript:;"
            @click="zhugeTrack('H5_点击排行榜',{},'/myBursaryPage/rankingListPage')"
          >
            <button class="acBd-1px bdA">
              排行榜
              <i class="iconfont">&#xe627;</i>
            </button>
          </a>
        </div>
        <p class="info">满10元可提现，每月仅可提取一次</p>
      </div>
    </div>
    <div class="cont_warp">
      <el-tabs v-model="selected" @tab-click="handleClick">
        <el-tab-pane label="奖励金记录" name="1">
          <mt-loadmore
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :auto-fill="false"
            v-bind:class="{classTop:classTop}"
            ref="loadmore"
            v-if="bursaryList.list.length!=0"
          >
            <div class="recordWarp" id="tab1">
              <div class="li_a" v-for="(items,index) in bursaryList.list" :key="index">
                <a
                  href="javascript:;"
                  class="link"
                  @click="zhugeTrack('H5_点击奖励金记录',{'订单号':items.orderId,'课程名称':items.courseName,'课程id':items.courseId,'奖励金金额':items.bonusAmount},'/myBursaryPage/bursaryInfoPage?orderId='+items.id)"
                >
                  <div class="txt_info">
                    <p>
                      {{items.buyerName}}
                      <span v-if="items.buyerMobile">{{items.buyerMobile}}</span>
                      <span v-else>{{items.buyerEmail}}</span>
                    </p>
                    <p class="data">{{items.createTime}}</p>
                  </div>
                  <div class="order_amout">+{{toFixed(items.bonusAmount,2)}}</div>
                  <i class="iconfont">&#xe637;</i>
                </a>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span
                v-if="bottomStatus !== 'loading'"
                :class="{ 'rotate': bottomStatus === 'drop' }"
              >{{loadText}}</span>
              <!-- <span v-if="bottomStatus === 'loading'">{{loadText}}</span>-->
            </div>
          </mt-loadmore>
          <div class="empty" v-show="bursaryDataEmpty">
            <emptyTemp description_link="还没有邀请好友"></emptyTemp>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提现记录" name="2">
          <mt-loadmore
            :bottom-method="loadBottom2"
            :bottom-all-loaded="allLoaded2"
            :auto-fill="false"
            v-bind:class="{classTop:classTop2}"
            ref="loadmore2"
            v-if="amountList.list.length!=0"
          >
            <div class="recordWarp tiXianjilu">
              <div class="li_a" v-for="(items,index) in amountList.list" :key="index">
                <a
                  href="javascript:;"
                  class="link"
                  @click="clickTrack(items.withdrawalSerialNo,items.id,items.status,items.amount)"
                >
                  <div class="txt_info">
                    <p>
                      申请单号
                      <span>{{items.withdrawalSerialNo}}</span>
                    </p>
                    <p class="data">
                      <span v-if="items.status==0">申请中</span>
                      <span v-if="items.status==1">已审核</span>
                      <span v-if="items.status==2" style="color: #ff544c;">提现失败</span>
                      <span v-if="items.status==3">已到账</span>
                      <em>•</em>
                      {{items.createTime}}
                    </p>
                  </div>
                  <div class="order_amout">￥{{toFixed(items.amount,2)}}</div>
                  <i class="iconfont">&#xe637;</i>
                </a>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span
                v-if="bottomStatus2 !== 'loading'"
                :class="{ 'rotate': bottomStatus2 === 'drop' }"
              >{{loadText2}}</span>
              <!-- <span v-if="bottomStatus2 === 'loading'">加载中...</span>-->
            </div>
          </mt-loadmore>
          <div class="empty" v-show="amountDataEmpty">
            <emptyTemp desc="未产生提现记录"></emptyTemp>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="bottom_btn">
      <a href="javascript:;" @click="zhugeTrack('H5_点击邀请好友赚奖励金',{},'/share/shareList')">邀请好友赚奖励金</a>
    </div>
    <!--微信绑定弹窗-->
    <wxBind :isActive="isActive" v-on:closeLayer="closeLayer"></wxBind>
  </div>
</template>

<script>
import axios from "axios";
import { zhugeTrack, toFixed } from "~/plugins/filter";
import { Toast, Indicator } from "mint-ui";
import wxBind from "../myBursaryPage/comTemp/wxBind";
import { appBaseUrl } from "~/api/apiurl";
export default {
  name: "myBursaryPage",
  head: {
    title: "我的奖励金"
  },
  components: {
    wxBind
  },
  data() {
    return {
      selected: "1",
      zhugeTrack: zhugeTrack,
      bursaryList: true,
      amountList: true,
      isActive: false,
      currTab: "",
      AmountData: "",
      toFixed: toFixed,
      bursaryDataEmpty: false,
      bursaryData: {
        pageNumber: 1,
        pageSize: 5
      },
      amountDataEmpty: false,
      amountData: {
        pageNumber: 1,
        pageSize: 5
      },
      bursaryList: {
        list: [],
        totalCont: ""
      },
      amountList: {
        list: [],
        totalCont: ""
      },
      allLoaded: false,
      allLoaded2: false,
      bottomStatus: "",
      bottomStatus2: "",
      classTop: false,
      loadText: "加载更多",
      loadText2: "加载更多",
      classTop2: false,
      status: ""
    };
  },
  mounted() {
    zhugeTrack("H5_进入我的奖励金页");
    //提现成功页返回
    if (this.$route.query.index) {
      this.selected = this.$route.query.index.toString();
      this.getAmountList();
    }
    //提现记录页返回
    if (localStorage.getItem("withDraw")) {
      this.selected = localStorage.getItem("withDraw");
      localStorage.removeItem("withDraw");
      this.getAmountList();
    }
    //奖励金记录
    this.getBursaryList();

    //缺省图 样式自适应屏幕高度
    let clientH = window.innerHeight;
    let headH = document.getElementsByClassName("headImgWarp")[0].clientHeight;
    let tabH = document.getElementsByClassName("el-tabs__header")[0]
      .clientHeight;
    if (this.bursaryList.list.length == 0 && this.amountList.list.length == 0) {
      let emptyH = document.getElementsByClassName("empty");
      if (clientH - headH - tabH - 70 <= 200) {
        emptyH[0].style.height = 200 + "px";
        emptyH[1].style.height = 200 + "px";
      } else {
        emptyH[0].style.height = clientH - headH - tabH - 70 + "px";
        emptyH[1].style.height = clientH - headH - tabH - 70 + "px";
      }
    }
    //获取奖励金总金额
    this.$indicator.open();
    axios({
      url: appBaseUrl + "/bxg/distribution/getUserDistributionAccount",
      method: "post",
      params: {
        sign: localStorage.getItem("sign")
      }
    }).then(
      response => {
        this.$indicator.close();
        if (response.data.status == 200) {
          this.AmountData = response.data.result;
          this.AmountData.balanceAmount = toFixed(
            response.data.result.balanceAmount,
            2
          );
          localStorage.setItem("amount", this.AmountData.balanceAmount);
        } else if (
          response.data.status == 401 ||
          response.data.errorMessage == "1001" ||
          res.data.status == 403
        ) {
          window.location = "/loginRegister/phoneLogin";
          window.localStorage.setItem("redirectUrl", window.location.href);
        } else {
          Toast({
            message: response.data.message,
            duration: 2000
          });
        }
      },
      err => {
        this.$indicator.close();
        console.log(err);
      }
    );
  },
  methods: {
    closeLayer(val) {
      this.isActive = val;
    },
    //奖励金记录
    getBursaryList() {
      this.$indicator.open();
      axios({
        url: appBaseUrl + "/bxg/distribution/getUserBonusRecords",
        method: "post",
        params: {
          pageNumber: this.bursaryData.pageNumber,
          pageSize: this.bursaryData.pageSize,
          sign: localStorage.getItem("sign")
        }
      })
        .then(res => {
          this.$indicator.close();
          if (res.data.status == 200) {
            this.bursaryList.list = res.data.result.list;
            this.bursaryList.totalCont = res.data.result.total;
            if (this.bursaryData.pageSize >= this.bursaryList.totalCont) {
              this.loadText = "";
              this.allLoaded = true;
              this.classTop = false;
            }
            if (res.data.result.list.length == 0) {
              this.bursaryDataEmpty = true;
            }
          } else if (
            res.data.status == 401 ||
            res.data.errorMessage == "1001" ||
            res.data.message == "1001"
          ) {
            window.location = "/loginRegister/phoneLogin";
            window.localStorage.setItem("redirectUrl", window.location.href);
          } else {
            this.bursaryDataEmpty = true;
            Toast({
              message: res.data.message,
              duration: 2000
            });
          }
        })
        .catch(res => {
          this.$indicator.close();
          //
        });
    },
    //提现记录
    getAmountList() {
      this.$indicator.open();
      axios({
        url: appBaseUrl + "/bxg/distribution/getUserWithdrawRecords",
        method: "post",
        params: {
          pageNumber: this.amountData.pageNumber,
          pageSize: this.amountData.pageSize,
          sign: localStorage.getItem("sign")
        }
      }).then(res => {
        this.$indicator.close();
        if (res.data.status == 200) {
          this.amountList.list = res.data.result.list;
          this.amountList.totalCont = res.data.result.total;
          if (this.amountData.pageSize >= this.amountList.totalCont) {
            this.allLoaded2 = true;
            this.classTop2 = false;
            this.loadText2 = "";
          }
          if (res.data.result.list.length == 0) {
            this.amountDataEmpty = true;
          }
        } else if (
          res.data.status == 401 ||
          res.data.errorMessage == "1001" ||
          res.data.message == "1001"
        ) {
          window.location = "/loginRegister/phoneLogin";
          window.localStorage.setItem("redirectUrl", window.location.href);
        } else {
          this.amountDataEmpty = true;
          Toast({
            message: res.data.message,
            duration: 2000
          });
        }
      });
    },
    //提现权限
    checkUserPermission() {
      zhugeTrack("H5_点击提现至微信");
      this.$indicator.open();
      axios({
        url: appBaseUrl + "/bxg/distribution/checkUserWhetherCanWithdraw",
        method: "post",
        params: {
          sign: localStorage.getItem("sign")
        }
      })
        .then(res => {
          this.$indicator.close();
          if (res.data.status == 200) {
            switch (res.data.result) {
              case "1":
              case "4":
              case "5":
                //可提现
                window.location = "/myBursaryPage/drawCashPage";
                break;
              case "2":
                //未实名认证
                this.$messagebox
                  .confirm("", {
                    message: "请完成实名认证",
                    title: "",
                    confirmButtonText: "去认证",
                    showCancelButton: true
                  })
                  .then(() => {
                    //跳转到认证页
                    window.localStorage.setItem(
                      "redirectUrl",
                      window.location.href
                    );
                    window.location =
                      "/personalPage/userSetting/realNameAuth?realNameStatus=1";
                  })
                  .catch(() => {});
                break;
              case "3":
                //未绑定微信
                this.isActive = true;
                break;
            }
          } else if (
            res.data.status == 401 ||
            res.data.errorMessage == "1001"
          ) {
            window.location = "/loginRegister/phoneLogin";
            window.localStorage.setItem("redirectUrl", window.location.href);
          } else {
            Toast({
              message: res.data.message,
              duration: 2000
            });
          }
        })
        .catch(res => {
          this.$indicator.close();
        });
    },
    handleClick(tab) {
      if (tab.name == 1) {
        //奖励金记录
        this.getBursaryList();
      } else {
        this.getAmountList();
      }
    },
    //奖励金详情上拉加载
    loadBottom() {
      if (this.bursaryList.list.length != 0) {
        if (this.bursaryData.pageSize >= this.bursaryList.totalCont) {
          this.bursaryData.pageSize = this.bursaryList.totalCont;
          this.loadText = "";
          this.allLoaded = true;
          this.classTop = false;
          this.$refs.loadmore.onBottomLoaded();
        } else {
          this.classTop = true;
          this.bursaryData.pageSize += 5; //每次加载5条
          if (this.bursaryData.pageSize >= this.bursaryList.totalCont) {
            this.bursaryData.pageSize = this.bursaryList.totalCont;
            this.loadText = "加载中...";
            this.allLoaded = true;
            this.classTop = false;
            this.$refs.loadmore.onBottomLoaded();
          }
          this.getBursaryList();
        }
      }
    },
    //提现详情上拉加载
    loadBottom2() {
      if (this.amountList.list.length != 0) {
        if (this.amountData.pageSize >= this.amountList.totalCont) {
          this.amountData.pageSize = this.amountList.totalCont;
          //this.getAmountList();
          this.allLoaded2 = true;
          this.classTop2 = false;
          this.loadText2 = "";
          this.$refs.loadmore2.onBottomLoaded();
        } else {
          this.classTop2 = true;
          this.amountData.pageSize += 5; //每次加载5条
          if (this.amountData.pageSize >= this.amountList.totalCont) {
            this.amountData.pageSize = this.amountList.totalCont;
            this.allLoaded2 = true;
            this.classTop2 = false;
            this.loadText2 = "加载中...";
            this.$refs.loadmore2.onBottomLoaded();
          }
          this.getAmountList();
        }
      }
    },
    //点击提现详情埋点
    clickTrack(orderId, id, stu, amt) {
      switch (stu) {
        case 0:
          this.status = "申请中";
          break;
        case 1:
          this.status = "已审核";
          break;
        case 2:
          this.status = "提现失败";
          break;
        case 3:
          this.status = "已到账";
          break;
      }
      localStorage.setItem("withDraw", 2);
      this.zhugeTrack(
        "H5_点击提现记录",
        { 提现申请单号: orderId, 申请状态: this.status, 提现金额: amt },
        "/myBursaryPage/giveDetailsPage?id=" + id
      );
    }
  }
};
</script>

<style lang="less">
@import "bursary.less";
.el-tabs__nav-wrap:after {
  z-index: 0 !important;
}
.mint-indicator-wrapper {
  z-index: 1000 !important;
}

.mint-indicator-mask {
  z-index: 1000 !important;
}

.cont_warp {
  .mint-loadmore-bottom {
    padding-bottom: unit(20 / @u, @uu);
    height: unit(40 / @u, @uu);
    line-height: unit(40 / @u, @uu);
  }

  .el-tabs {
    .el-tabs__item {
      width: auto !important;
    }
  }
}
</style>
