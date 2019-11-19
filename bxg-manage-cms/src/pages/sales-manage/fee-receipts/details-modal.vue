<template>
  <div>
      <div class="warp-border">
            <Row class="border-b">
                <Col class="border-r" span="6">购买者（uid）</Col>
                <Col class="border-r" span="6">{{deposit.uid}}</Col>
                <Col class="border-r" span="6">购买者绑定邮箱</Col>
                <Col class="border-r" span="6">{{deposit.email}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">购买者账号</Col>
                <Col class="border-r" span="6">{{deposit.mobile}}</Col>
                <Col class="border-r" span="6">购买者(用户名)</Col>
                <Col class="border-r" span="6">{{deposit.buyerName}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">单据号</Col>
                <Col class="border-r" span="6">{{deposit.serialNo}}</Col>
                <Col class="border-r" span="6">单据状态</Col>
                <Col class="border-r" span="6">{{deposit.paymentStatusDesc}}</Col>
            </Row>
              <Row class="border-b">
                <Col class="border-r" span="6">下单终端</Col>
                <Col class="border-r" span="6">{{deposit.depositTerminalDesc}}</Col>
                <Col class="border-r" span="6">支付终端</Col>
                <Col class="border-r" span="6">{{deposit.paymentTerminalDesc}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">预报名费金额</Col>
                <Col class="border-r" span="6">{{deposit.amount}}</Col>
                <Col class="border-r" span="6">支付方式</Col>
                <Col class="border-r" span="6">{{deposit.paymentMethodDesc}}</Col>
            </Row>
             <Row class="border-b">
                <Col class="border-r" span="6">创建时间</Col>
                <Col class="border-r" span="6">{{deposit.createTime}}</Col>
                <Col class="border-r" span="6">支付时间</Col>
                <Col class="border-r" span="6">{{deposit.paymentTime}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">尾款订单号</Col>
                <Col class="border-r" span="6">{{deposit.associatedOrderId}}</Col>
                <Col class="border-r" span="6">归属人</Col>
                <Col class="border-r" span="6">{{deposit.userName}}</Col>
            </Row>
      </div>  
      <Divider>单据内容</Divider>
       <div class="warp-border">
            <Row class="border-c huise">
                <Col class="border-r" span="6">订单名称</Col>
                <Col class="border-r" span="6">预报名费金额(元)</Col>
                <Col class="border-r" span="6">应付金额(元)</Col>
                <Col class="border-r" span="6">实付金额(元)</Col>
            </Row>
            <Row class="border-c">
                <Col class="border-r yincang" :title="deposit.depositName" span="6">{{deposit.depositName}}</Col>
                <Col class="border-r" span="6">{{deposit.amount}}</Col>
                <Col class="border-r" span="6">{{deposit.amount}}</Col>
                <Col class="border-r" span="6">{{deposit.paymentAmount}}</Col>
            </Row>
      </div>  
      <Divider>支付流水</Divider>
      <div class="warp-border">
            <Row class="border-c huise">
                <Col class="border-r" span="8">支付流水号</Col>
                <Col class="border-r" span="4">支付金额</Col>
                <Col class="border-r" span="4">支付时间</Col>
                <Col class="border-r" span="4">支付方式</Col>
                <Col class="border-r" span="4">支付终端</Col>
            </Row>
            <Row class="border-c">
                <Col class="border-r" span="8">{{depositPayment.payNo}}</Col>
                <Col class="border-r" span="4">{{depositPayment.amount}}</Col>
                <Col class="border-r" span="4">{{depositPayment.payTime}}</Col>
                <Col class="border-r" span="4">{{depositPayment.method}}</Col>
                <Col class="border-r" span="4">{{depositPayment.terminal}}</Col>
            </Row>
      </div>  
      <Divider>操作记录</Divider>
       <div class="warp-border">
            <Row class="border-c huise">
                <Col class="border-r" span="6">操作行为</Col>
                <Col class="border-r" span="6">操作时间</Col>
                <Col class="border-r" span="6">操作人</Col>
                <Col class="border-r" span="6">备注</Col>
            </Row>
            <Row class="border-c" v-if="refundDetail">
                <Col class="border-r" span="6">退费</Col>
                <Col class="border-r" span="6">{{refundDetail.createTime}}</Col>
                <Col class="border-r" span="6">{{refundDetail.creator}}</Col>
                <Col class="border-r" span="6">{{refundDetail.reason}}</Col>
            </Row>
             <Row class="border-c" v-else>
               <Col class="border-r" span="24" style="text-align: center;">暂无数据</Col>
            </Row>
      </div>  
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  mounted() {
    this.fetchDepositDetail();
  },
  props: {
    depositId: String,
    uid: Number
  },
  data() {
    return {
      content: [
        {
          title: "订单名称",
          key: "depositName"
        },
        {
          title: "预报名费金额(元)",
          key: "amount"
        },
        {
          title: "应付金额(元)",
          key: " amount"
        },
        {
          title: "实付金额(元)",
          key: "paymentAmount"
        }
      ]
    };
  },
  methods: {
    fetchDepositDetail() {
      this.$store.dispatch("getDepositDetail", {
        depositId: this.depositId
      });
      this.$store.dispatch("getDepositRefundDetail", {
        uid: this.uid,
        depositId: this.depositId
      });
    }
  },
  computed: {
    ...mapState({
      deposit: state => state.feeReceipts.depositDetail.deposit,
      depositPayment: state => state.feeReceipts.depositDetail.depositPayment,
      refundDetail: state => state.feeReceipts.refundDetail
    })
  }
};
</script>

<style lang="less">
.warp-border {
  border-top: 1px solid #e8eaec;
  border-left: 1px solid #e8eaec;
}
.border-b {
  border-bottom: 1px solid #e8eaec;
  div:nth-child(2n-1) {
    background: #f8f8f9;
  }
}
.border-r {
  border-right: 1px solid #e8eaec;
  padding: 0 10px;
  height: 38px;
  line-height: 38px;
}
.border-c {
  border-bottom: 1px solid #e8eaec;
}
.huise {
  div {
    background: #f8f8f9;
  }
}
.yincang{
  width: 277px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap
}
</style>

