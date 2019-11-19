<template>
  <div class="paymentWrap">
    <titleBack titleName="订单确认"></titleBack>
    <div class="indexContainer">
      <div class="courseDetails">
        <p class="coursDetailsTitle" data-id>课程名称</p>
        <div class="courseDetailsBody">
          <img :src="paymentData.detailData.image">
          <div class="courseDetailsRight">
            <p class="courseDetailsRightTop">{{paymentData.detailData.name}}</p>
            <!--<p class="courseDetailsRightBottom">(课程有效期至{{paymentData.detailData.expires}})</p>-->
            <p class="courseDetailsRightMoney">￥{{paymentData.detailData.price}}</p>
          </div>
        </div>
      </div>
      <a
        href="javascript:;"
        @click="couponZhuge('/payment/payDiscountCoupon/?courseId='+courseId+'&id='+paymentData.detailData.currentCoupon)"
        class="coupon"
      >
        <p>
          优惠券
          <span v-if="paymentData.detailData.useableCouponAmount==0">无可用优惠券</span>
          <span v-else>有{{paymentData.detailData.useableCouponAmount}}张优惠券可用 ></span>
        </p>
      </a>
      <div class="orderAmount">
        <p>
          订单金额
          <span>￥{{paymentData.price.total_price}}</span>
        </p>
      </div>
      <div class="discount">
        <p>
          优惠券折扣
          <span>- ￥{{paymentData.price.total_discount_amount}}</span>
        </p>
      </div>
      <div class="regisfee" v-if="paymentData.detailData.entryFee">
        <p>
          报名费扣减
          <span>- ￥{{paymentData.detailData.entryFee}}</span>
        </p>
      </div>
      <div class="xieyi">
        <div class="xieyi_img" @click="protocolEve">
          <img src="./images/payClick@2x.png" v-if="protocolState">
          <img src="./images/payNoClick@2x.png" v-else>
        </div>
        <span class="wyxy">我已经阅读并同意</span>
        <nuxt-link to="/payment/userProtocol">《博学谷用户付费协议》</nuxt-link>
      </div>
      <div class="placeOrder">
        <p>
          应付金额：
          <span class="orderMoney">￥{{paymentData.price.total_amount}}</span>
          <button class="placeOrderBtn select" @click="saveOrder" v-if="protocolState">提交订单</button>
          <button class="placeOrderBtn removeSelect" v-else>提交订单</button>
        </p>
      </div>
    </div>
    <videoDialogTemp
      :dialogVisible="dialogInfo.dialogVisible"
      v-on:hide="hideDia"
      BtnType="4"
      :contentTxt="dialogInfo.dialogTxt"
    ></videoDialogTemp>
  </div>
</template>

<script>
import axios from "axios";
import { appBaseUrl, noTarget } from "../../api/apiurl";
import { getCookie, zhugeTrack } from "~/plugins/filter";
export default {
  name: "payment",
  data() {
    return {
      isClick: false,
      zhugeTrack: zhugeTrack,
      courseId: this.$route.query.courseId,
      courseType: "",
      menuName: "",
      sign: "",
      shareCode: "",
      parameter: {
        isInitial: 0, //	初次调用isInitial=0；非初次调用：isInitial=1
        initialData: {
          ids: this.$route.query.courseId, //订单的课程id数组（初次调用必传参数）
          sign: "" //	签名(用于验证用户)
        }
      },
      paymentData: {
        detailData: {},
        price: {}
      },
      protocolState: true, //协议勾选状态  默认勾选
      dialogInfo: {
        dialogVisible: false,
        dialogTxt: "该课程已在当前未完成订单内，无法提交订单哦~"
      }
    };
  },
  mounted() {
    let uctArr = getCookie("_uc_t_").split(";");
    let sign = "";

    if (uctArr.length) {
      sign = uctArr[2];
    }

    this.sign = sign || getCookie("sign") || localStorage.getItem("sign");
    this.parameter.initialData["sign"] = this.sign;
    if (this.$route.query.courseCoupon != null) {
      this.parameter.isInitial = 1;
      this.parameter.initialData.courseCoupon =
        "{" + this.$route.query.courseCoupon + "}";
    }
    if (localStorage.getItem("shareUserId") != null) {
      this.shareCode = localStorage.getItem("shareUserId");
    }
    this.$indicator.open();
    this.getCourseInfo();
    this.doConfirm();
  },
  methods: {
    doConfirm: function() {
      axios({
        url:
          appBaseUrl + "/bxg/order/doConfirm/MWEB/" + this.parameter.isInitial,
        method: "POST",
        data: this.parameter.initialData,
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ]
      })
        .then(res => {
          if (res.data.success) {
            this.$indicator.close();
            this.paymentData.detailData =
              res.data.resultObject.detail[0].courses[0];

            this.paymentData.price = {
              total_amount: res.data.resultObject.total_amount,
              total_discount_amount:
                res.data.resultObject.total_discount_amount,
              total_price: res.data.resultObject.total_price,
              total_quantity: res.data.resultObject.total_quantity
            };

            zhugeTrack("H5_进入订单确认页", {
              课程类型: this.courseType == 0 ? "就业课" : "微课",
              课程id: this.paymentData.detailData.id,
              课程名称: this.paymentData.detailData.name,
              应付金额: this.paymentData.detailData.price,
              学科: this.menuName
            });

            var couponIds = [];
            for (
              var i = 0;
              this.paymentData.detailData.coupons.length > i;
              i++
            ) {
              couponIds.push(this.paymentData.detailData.coupons[i].id);
            }
            localStorage.setItem("couponIds", couponIds); //存储优惠券页面所需id
          } else if (res.data.errorMessage == 1001) {
            this.$indicator.close();
            window.localStorage.setItem("redirectUrl", window.location.href);
            window.location.href = "/loginRegister/phoneLogin";
          } else {
            this.$indicator.close();
            this.$toast(res.data.errorMessage);
          }
        })
        .catch(err => {});
    },
    protocolEve: function() {
      this.protocolState = !this.protocolState;
    },
    couponZhuge: function(skipUrl) {
      zhugeTrack(
        "H5-订单确认页-点击优惠券",
        {
          课程id: this.paymentData.detailData.id,
          课程名称: this.paymentData.detailData.name,
          应付金额: this.paymentData.detailData.price
        },
        skipUrl
      );
    },
    getCourseInfo() {
      axios({
        url: appBaseUrl + "/bxg/course/getCourseByCourseId",
        method: "POST",
        data: { course_id: this.courseId },
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ]
      })
        .then(res => {
          this.courseType = res.data.resultObject.courseType;
          this.menuName = res.data.resultObject.subjectName;
        })
        .catch(err => {});
    },

    /**
     * 针对n12在职加薪课销售群体为传智学员的特殊判断
     * (传智学员才可能有优惠劵)
     * @return
     *    false 直接不允许提交订单
     *    true  允许后续提交订单
     * @author wusq
     * @date   20180912
     */
    _isAllowByN12Courses() {
      let allowCommit = true;
      let { id: courseId, useableCouponAmount } = this.paymentData.detailData;
      // n12特殊课程id
      let n12CoursesIds = [1129, 1131, 1132, 1135];

      // 在特殊课程id种
      if (n12CoursesIds.indexOf(courseId) !== -1) {
        allowCommit = false;

        // 用户使用了优惠劵
        if (useableCouponAmount > 0) {
          allowCommit = true;
        }
      }

      return allowCommit;
    },

    /**
     * 提交订单方法
     */
    saveOrder() {
      if (this.isClick) {
        this.$toast("订单已提交");
        return;
      }
      if (!this._isAllowByN12Courses()) {
        this.$toast("仅限传智就业班学员购买，请使用优惠券");
        zhugeTrack("H5_订单提交失败", {
          课程id: this.paymentData.detailData.id,
          课程名称: this.paymentData.detailData.name,
          失败原因: "仅限传智就业班学员购买"
        });
        return;
      }
      this.isClick = true;
      this.$indicator.open();
      var courseCouponData = {
        totalAmount: this.paymentData.price.total_amount,
        orderFrom: 3,
        shareCode: this.shareCode,
        payType: 0,
        courseCoupon: {
          [this.paymentData.detailData.id]: this.paymentData.detailData
            .currentCoupon
        }
      };
      axios({
        url:
          noTarget +
          "/bxg/order/saveOrder?sign=" +
          this.parameter.initialData.sign,
        method: "POST",
        data: { orderStr: JSON.stringify(courseCouponData) },
        transformRequest: [
          function(data) {
            // Do whatever you want to transform the data
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ]
      })
        .then(res => {
          if (res.data.success) {
            this.$indicator.close();
            this.isClick = true;
            if (res.data.resultObject.payment_url) {
              window.location.href = res.data.resultObject.payment_url;
            } else {
              window.location.href = "/studyCenter";
            }
          } else {
            this.$indicator.close();
            if (res.data.errorMessage == 1001) {
              window.localStorage.setItem("redirectUrl", window.location.href);
              window.location.href = "/loginRegister/phoneLogin";
            } else if (res.data.errorMessage == this.dialogInfo.dialogTxt) {
              this.dialogInfo.dialogVisible = true;
            } else {
              this.$toast(res.data.errorMessage);
            }
          }
        })
        .catch(err => {
          this.$indicator.close();
          this.isClick = false;
        });

      // 提交订单点击埋点
      zhugeTrack("H5_点击提交订单", {
        课程ID: this.paymentData.detailData.id,
        课程名称: this.paymentData.detailData.name,
        课程类型: this.courseType,
        包含报名费: this.paymentData.detailData.entryFee == null ? "无" : "有"
      });
    },
    hideDia(val) {
      this.dialogInfo.dialogVisible = val;
    }
  }
};
</script>
<style scope lang="less">
@import "./pay.less";
.indexContainer {
  margin-top: unit(100 / @u, @uu);
}
</style>
