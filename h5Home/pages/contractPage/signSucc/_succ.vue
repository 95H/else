<template>
  <div class="succ">
    <TitleBack titleName="签订成功"></TitleBack>
    <div class="succ_icon_box">
      <img src="../../../static/web/images/contract/succ.png" alt="">
      <span>签订成功</span>
    </div>
    <p class="succ_text">合同签订成功，课程已激活，赶快去<br/>学习课程吧！</p>
    <div class="succ_btn" @click="watchClass">观看课程</div>
    <span class="see_contract" @click="watchContract">查看合同 >></span>
  </div>
</template>

<script>
import TitleBack from "~/components/titleTemp2/titleBack";
import { zhugeTrack } from '~/plugins/filter'
export default {
  name: 'Succ',
  components: {
    TitleBack
  },
  methods: {
    watchContract() {
      zhugeTrack('H5_签订成功页_点击按钮', {
        '按钮名称': '查看合同'
      })
      let contractNo = this.$route.params.succ
      this.$router.push(`/contractPage/watchContract/${contractNo}`)
    },
    watchClass() {
      zhugeTrack('H5_签订成功页_点击按钮', {
        '按钮名称': '观看课程'
      })
      this.$router.push('/studyCenter')
    }
  },
  mounted () {
    zhugeTrack('H5_进入签订成功页')
  }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/variable.less";
.succ{
  padding-top: unit(120/@u, @uu);
  .succ_icon_box{
    text-align: center;
    margin-top: unit(196/@u, @uu);
    img{
      display: inline-block;
      width: unit(140/@u, @uu);
      height: unit(140/@u, @uu);
    }
    span{
      display: block;
      font-size: unit(36/@u, @uu);
      color: #333;
      margin-top: unit(30/@u, @uu);
    }
  }
  .succ_text{
    text-align: center;
    font-size: unit(32/@u, @uu);
    color: #999;
    margin-top: unit(20/@u, @uu);
    line-height: unit(40/@u, @uu);
  }
  .succ_btn{
    width: unit(340/@u, @uu);
    height: unit(60/@u, @uu);
    background: #38ADFF;
    border-radius: unit(50/@u, @uu);
    text-align: center;
    line-height: unit(60/@u, @uu);
    color: #fff;
    font-size: unit(32/@u, @uu);
    margin: 0 auto;
    margin-top: unit(88/@u, @uu);
  }
  .see_contract{
    display: block;
    text-align: center;
    color: #38ADFF;
    font-size: unit(32/@u, @uu);
    margin-top: unit(30/@u, @uu);
  }
}
</style>


