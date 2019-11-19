<template>
  <div>
      <div class="warp-border">
            <Row class="border-b">
                <Col class="border-r" span="6">uid</Col>
                <Col class="border-r" span="6">{{deposit.uid}}</Col>
                <Col class="border-r" span="6">姓名</Col>
                <Col class="border-r" span="6">{{deposit.email}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">订单号</Col>
                <Col class="border-r" span="6">{{deposit.mobile}}</Col>
                <Col class="border-r" span="6">订单内容</Col>
                <Col class="border-r" span="6">{{deposit.buyerName}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">订单实收金额</Col>
                <Col class="border-r" span="6">{{deposit.serialNo}}</Col>
                <Col class="border-r" span="6">订单金额</Col>
                <Col class="border-r" span="6">{{deposit.paymentStatusDesc}}</Col>
            </Row>
              <Row class="border-b">
                <Col class="border-r" span="6">退费金额</Col>
                <Col class="border-r" span="6">{{deposit.depositTerminalDesc}}</Col>
                <Col class="border-r" span="6">退费类型</Col>
                <Col class="border-r" span="6">{{deposit.paymentTerminalDesc}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">总服务期</Col>
                <Col class="border-r" span="6">{{deposit.amount}}</Col>
                <Col class="border-r" span="6">剩服务期</Col>
                <Col class="border-r" span="6">{{deposit.paymentMethodDesc}}</Col>
            </Row>
             <Row class="border-b">
                <Col class="border-r" span="6">创建人</Col>
                <Col class="border-r" span="6">{{deposit.createTime}}</Col>
                <Col class="border-r" span="6">状态</Col>
                <Col class="border-r" span="6">{{deposit.paymentTime}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">退费原因</Col>
                <Col class="border-r" span="6">{{deposit.associatedOrderId}}</Col>
                <Col class="border-r" span="6">OA单号</Col>
                <Col class="border-r" span="6">{{deposit.userName}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">收款信息（省市）</Col>
                <Col class="border-r" span="6">{{deposit.associatedOrderId}}</Col>
                <Col class="border-r" span="6">收款信息（银行）</Col>
                <Col class="border-r" span="6">{{deposit.userName}}</Col>
            </Row>
            <Row class="border-b">
                <Col class="border-r" span="6">收款信息（银联号）</Col>
                <Col class="border-r" span="6">{{deposit.associatedOrderId}}</Col>
                <Col class="border-r" span="6">收款信息（账号）</Col>
                <Col class="border-r" span="6">{{deposit.userName}}</Col>
            </Row>
      </div>  
      <div class="warp-title">退费付款信息</div>
          <div class="warp-border">
            <Row class="border-b">
                <Col class="border-r" span="6">付款账户</Col>
                <Col class="border-r" span="6">{{deposit.uid}}</Col>
                <Col class="border-r" span="6">付款时间</Col>
                <Col class="border-r" span="6">{{deposit.email}}</Col>
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
.warp-title{
  font-size: 16px;
  font-weight: 600;
  margin: 15px 0 15px 0;

}
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

