<template>
  <Modal
    :title="title"
    v-model="modal"
    class-name="vertical-center-modal"
    width="70%"
    :loading="loading"
    @on-ok="asyncOK"
    @on-cancel="cancel"
  >
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">补录支付流水信息</p>
          <div class="warp-box" v-if="detail">
            <Row>
              <Col class="flex-col" span="12">
                <span>支付方式</span>
                <p>{{detail.payMethod}}</p>
              </Col>
              <Col class="flex-col" span="12">
                <span>收款账户</span>
                <p>{{detail.bankAccount}}</p>
              </Col>
            </Row>
            <Row>
              <Col class="flex-col" span="12">
                <span>补录流水金额</span>
                <p>{{detail.amount}}</p>
              </Col>
              <Col class="flex-col" span="12">
                <span>缴费时间</span>
                <p>{{detail.paymentTime}}</p>
              </Col>
            </Row>
            <Row>
              <Col class="flex-col" span="12">
                <span>流水ID</span>
                <p>{{detail.paymentId}}</p>
              </Col>
              <Col class="flex-col" span="12">
                <span>流水状态</span>
                <p>{{compileState}}</p>
              </Col>
            </Row>
            <Row>
              <Col class="flex-col" span="12">
                <span>订单号</span>
                <p @click="goOrderNo" class="goOrderNo">{{detail.orderNo}}</p>
              </Col>
              <Col class="flex-col" span="12">
                <span>收据号</span>
                <p>
                  <Input v-model="receiptNo" placeholder="请输入收据号"/>
                </p>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px;">
      <Col span="24">
        <Card>
          <p slot="title">操作记录</p>
          <Table v-if="logList" width="100%" border :columns="columns" :data="logList"></Table>
        </Card>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '补录支付流水',
      modal: false,
      loading: true,
      receiptNo: '',
      id: '',
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '操作行为',
          key: 'desc'
        },
        {
          title: '操作人',
          key: 'creator'
        },
        {
          title: '操作时间',
          key: 'createTime'
        }
      ]
    }
  },
  methods: {
    asyncOK() {
      setTimeout(async () => {
        this.loading = false
        if (this.receiptNo) {
          this.loading = true
          let result = await api.postSaveReceiptno({
            receiptNo: this.receiptNo,
            id: this.detail.id
          })
          if (result.status === 200) {
            this.$Message.success('收据号修改成功')
            this.$emit('refreshList')
          }
        }
        this.modal = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    cancel() {},
    goOrderNo() {
      this.$router.push(`/orders-details/${this.detail.orderNo}`)
    }
  },
  computed: {
    ...mapState({
      detail: state => state.finance.detail,
      logList: state => {
        if (state.finance.logList) {
          return state.finance.logList.list
        } else {
          return false
        }
      }
    }),
    compileState() {
      //0待审核、1审核通过、2审核驳回、-1审核失败
      this.receiptNo = this.detail.receiptNo
      if (this.detail.status === 0) {
        return '待审核'
      } else if (this.detail.status === 1) {
        return '审核通过'
      } else if (this.detail.status === 2) {
        return '审核驳回'
      } else {
        return '审核失败'
      }
    }
  },
  watch: {
    detail(obj) {
      this.title =
        '补录支付流水-' +
        obj.mobile +
        '-' +
        (obj.userName ? obj.userName : '--')
    }
  }
}
</script>

 <style lang="less">
.warp-box {
  border-top: 1px solid #e8eaec;
  border-left: 1px solid #e8eaec;
  .flex-col {
    display: flex;
    height: 48px;
    line-height: 28px;
    font-size: 12px;
    span {
      padding: 10px;
      display: inline-block;
      width: 120px;
      background: #f8f8f9;
      border-right: 1px solid #e8eaec;
      border-bottom: 1px solid #e8eaec;
      font-weight: 700;
    }
    p {
      padding: 10px;
      flex: 1;
      border-right: 1px solid #e8eaec;
      border-bottom: 1px solid #e8eaec;
    }
    .goOrderNo {
      cursor: pointer;
      color: #2d8cf0;
      &:hover {
        color: #57a3f3;
      }
    }
  }
}
</style>
