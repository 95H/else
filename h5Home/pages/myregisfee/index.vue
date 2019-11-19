<template>
	<div :class="['myregisfee', lists.length ? '' : 'nolist']">
    <TitleBack titleName="我的预报名费"></TitleBack>
    <!-- <header>
      <span><i class="el-icon-arrow-left"></i>关闭</span>
      <span>我的预报名费</span>
      <span><i class="el-icon-arrow-left"></i></span>
    </header> -->
    <section class="sec-list" v-if="lists.length">
      <div class="items" v-for="(item, index) in lists" :key="index">
        <div class="myregisfee_box">
          <p class="box_head">
            <span>订单编号：{{item.serialNo}}</span>
            <span v-if="item.depositStatus==0" class="pay_status">未支付</span>
            <span v-else-if="item.depositStatus==1&&item.lockStatus==0&&item.paymentStatus==1" class="pay_status">已支付</span>
            <span v-else-if="item.depositStatus==2||(item.depositStatus==1&&item.lockStatus==1&&item.paymentStatus==1)">已使用</span>
            <span v-else-if="item.depositStatus==-1&&item.paymentStatus==-1">已退费</span>
            <span v-else-if="item.depositStatus==-1&&item.paymentStatus!=-1">已关闭</span>
          </p>
          <div class="box-detail">
            <div class="detail-img">
              <img :src="item.smallimgPath" alt="">
            </div>
            <div class="detail-info">
              <p class="info-coursename">{{item.courseName}}</p>
              <p class="info-amout">¥{{item.amount.toFixed(2)}}</p>
            </div>
          </div>
        </div>
        <p class="box_footer" v-if="item.depositStatus==0">
          <span class="count_down">
            <i class="iconfont icon-jinggao"></i>
            <span>失效时间：{{ item.remainingStr }}</span>
          </span>
          <span class="myregisfee_pay" @click="toPay(item.id)" v-zg="['H5_我的预报名费页_点击支付按钮', { '订单ID': item.id, '课程ID': item.courseId, '课程类型': item.courseType, '课程名称': item.courseName, '报名费金额': item.amount, '订单日期': item.createTime } ]">立即支付</span>
        </p>
        <p class="box_footer" v-else-if="item.depositStatus==1&&item.lockStatus==0&&item.paymentStatus==1">
          <span></span>
          <span class="myregisfee_pay" @click="payOff(item.courseId)" v-zg="['H5_我的预报名费页_点击支付按钮', { '订单ID': item.id, '课程ID': item.courseId, '课程类型': item.courseType, '课程名称': item.courseName, '报名费金额': item.amount, '订单日期': item.createTime } ]">支付尾款</span>
        </p>
        <p class="box_footer" v-else-if="item.depositStatus==-1||item.lockStatus==1||item.paymentStatus==-1">
        </p>
      </div>
      <div class="viewmore-txt" @click="viewMore" v-if="isShowMore">查看更多</div>
      <div class="viewmore-spinner" v-if="isShowSpinner">
        <mt-spinner type="snake" :size="20"></mt-spinner>
      </div>
    </section>
    <section class="sec-nolist" v-else>
      <emptyTemp imgUrl="/web/images/defaultImg/searchNoData.png" desc="暂无消息"></emptyTemp>
    </section>
	</div>
</template>
<script>
import { zhugeTrack } from "~/plugins/filter";
import { regisfeeApi } from "~/api/index";
import { mapGetters } from "vuex";
import { appBaseUrl, noTarget, apiBaseUrl } from "~/api/apiurl";
import axios from "axios";
import TitleBack from "~/components/titleTemp2/titleBack";
// import { calcCountDown } from "~/common/utils/index";

export default {
  // middleware: ["auth"],

  async asyncData({ store, redirect }) {
    let sign = store.getters.userSign;

    let lists = [];
    let paramsData = {
      pageNum: 1,
      pageSize: 10,
      sign: sign
    };

    let { data } = await regisfeeApi.depositList(paramsData);
    
    try {
      if (data.status === 200) {
        paramsData.pageNum += 1;
        data.result.list.map(item => {
          let totalSecond = Math.ceil(item.remainingHour / 1000);
          let day = Math.floor(totalSecond / 86400);
          let hour = Math.floor((totalSecond % 86400) / (60 * 60));
          let min = Math.ceil(((totalSecond % 86400) % (60 * 60)) / 60);
          if (day > 0) {
            item.remainingStr = day + '天' + hour + '时' + min + '分'
          } else {
            item.remainingStr = hour + '时' + min + '分'
          }
        });
        lists = data.result.list;
      } else if (data.status == 401) {
        redirect('/loginRegister/login')
      }
    } catch (err) {}

    return {
      lists,
      paramsData
    }
  },

  data() {
    return {
      // lists: [],
      // paramsData: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   sign: ''
      // },
      isShowMore: false,
      isShowSpinner: false
    };
  },

  components: {
    TitleBack
  },

  methods: {
    /**
     * 立即支付
     */
    toPay(id) {
      axios({
        method: "post",
        url: `${noTarget}/bxg/deposit/toPayDeposit/${id}`,
        params: { sign: this.paramsData.sign, id: id }
      })
        .then(response => {
          let data = response.data;
          if (data.status === 200) {
            window.location = data.result
          } else {
            this.$toast(data.message)
          }
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    /**
     * 支付尾款
     */
    payOff(courserId) {
      axios({
        method: "post",
        url: `${apiBaseUrl}/course/getCourseById?courserId=${courserId}`
      }).then(response => {
        if (response.data.success) {
          if (response.data.resultObject.status != 1) {
            this.$toast("该课程已下架,请联系老师更换报名费课程或退费!");
          } else {
            window.location.href = `/payment?courseId=${courserId}&utm_source=zhifuweikuan`;
          }
        }
      })
    },

    /**
     * 查看更多
     */
    viewMore() {
      this.isShowSpinner = true;

      this.loadNextPageList().then(() => {
        this.isShowSpinner = false;
      });
    },

    /**
     * 加载预报名费订单列表 当前页
     */
    async loadNextPageList() {
      this.isShowMore = false;
      try {
        let { data } = await regisfeeApi.depositList(this.paramsData);
        if (data.status == 200) {
          if (data.result.hasNextPage) {
            this.isShowMore = true;
            this.paramsData.pageNum += 1;
          } else {
            this.isShowMore = false;
          }
          this.lists = this.lists.concat(data.result.list);
        }
      } catch (err) {}
    }
  }
}
</script>
<style lang="less" scoped>
@import "./css/index.less";
</style>    