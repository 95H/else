<template>
  <Modal
    :title="title"
    v-model="modal"
    class-name="vertical-center-modal"
    width="800"
    :loading="loading"
    @on-ok="asyncOK"
    @on-cancel="cancel"
  >
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">订单内容</p>
          <Table width="100%" border :columns="columns" :data="orderContent"></Table>
        </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px;">
      <Col span="24">
        <Card>
          <p slot="title">补录支付流水</p>
          <Form ref="formBox" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Row>
              <Col span="12">
                <FormItem label="支付方式" prop="payMethod">
                  <Select
                    ref="paymethod"
                    placeholder="支付方式"
                    v-model="formValidate.payMethod"
                    @on-change="handerPayMethod"
                    :disabled="payMethodFlag"
                  >
                    <Option v-for="(value, key) in svPayMethod" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="收款账户" prop="bankAccount">
                  <Select placeholder="收款账户" v-model="formValidate.bankAccount" filterable>
                    <Option
                      v-for="(value, key) in svBankAccount"
                      :value="key"
                      :key="key"
                    >{{ value }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="贷款公司" prop="loanCompany">
                  <Select
                    placeholder="贷款公司"
                    v-model="formValidate.loanCompany"
                    :disabled="formValidate.payMethod !=='LOAN'"
                  >
                    <Option
                      v-for="(value, key) in svLoanCompany"
                      :value="key"
                      :key="key"
                    >{{ value }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="补录流水金额" prop="amount">
                  <Input placeholder="补录流水金额" v-model="formValidate.amount"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="缴费时间" prop="payTime">
                  <DatePicker
                    v-model="formValidate.payTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="缴费时间"
                    style="width:100%"
                    :options="optionsDate"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="收据号" prop="receiptNo">
                  <Input placeholder="输入收据号" v-model="formValidate.receiptNo"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  </Modal>
</template>
<script>
import api from '@/api/index'
import dateUtil from 'iview/src/utils/date'
export default {
  data() {
    const isNumber = (rule, value, callback) => {
      if (isNaN(value) || value == 0) {
        callback(new Error('只能输入大于0数字'))
      } else {
        callback()
      }
    }
    return {
      title: '订单内容',
      modal: false,
      loading: true,
      payMethodFlag: false,
      orderId: '',
      svPayMethod: null,
      svBankAccount: null,
      svLoanCompany: null,
      orderType: '',
      orderContent: [],
      optionsDate: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now()
        }
      },
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '课程名称',
          key: 'courseName',
          width: 200
        },
        {
          title: '课程价格(元)',
          key: 'totalAmount'
        },
        {
          title: '订单金额',
          key: 'orderAmount'
        },
        {
          title: '实收金额',
          key: 'actualAmount'
        },
        {
          title: '待支付金额(元)',
          key: 'shouldPay'
        }
      ],
      formValidate: {
        payMethod: '',
        bankAccount: 'CMB_JS_417',
        loanCompany: '',
        amount: '',
        receiptNo: '',
        payTime: new Date(),
        orderId: ''
      },
      ruleValidate: {
        payMethod: [
          {
            required: true,
            message: '支付方式必选',
            trigger: 'change'
          }
        ],
        bankAccount: [
          {
            required: true,
            message: '收款账户必选',
            trigger: 'change'
          }
        ],
        amount: [
          {
            required: true,
            message: '补录流水金额必填',
            trigger: 'blur'
          },
          {
            validator: isNumber,
            trigger: 'change'
          }
        ],
        payTime: [
          {
            required: true,
            type: 'date',
            message: '缴费时间必填',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    ;(async () => {
      let result = await api.getSystemData()
      if (result.status === 200) {
        this.svPayMethod = result.result.svPayMethod
        this.svBankAccount = result.result.svBankAccount
        this.svLoanCompany = result.result.svLoanCompany
      }
    })()
  },
  methods: {
    handerPayMethod(val) {
      if (val === 'TRANSFER') {
        this.payMethodFlag = false
      } else {
        this.formValidate.loanCompany = ''
      }
      if (val === 'LOAN') {
        this.formValidate.loanCompany = 'RONG360'
      } else {
        this.formValidate.loanCompany = ''
      }
    },
    async getOrderContent() {
      this.orderContent = []
      this.payMethodFlag = false
      if (!this.orderType) {
        this.formValidate.payMethod = 'TRANSFER'
      } else {
        this.formValidate.payMethod = 'FEE_TRANSFER'
        this.payMethodFlag = true
      }
      let result = await api.getOrderContent({ orderId: this.orderId })
      if (result.status === 200) {
        this.orderContent.push(result.result)
        this.title =
          '订单内容-' +
          result.result.mobile +
          '-' +
          (result.result.userName ? result.result.userName : '--')
      }
    },
    serializeData() {
      this.formValidate.orderId = this.orderId
      let data = Object.assign({}, this.formValidate)
      data.payTime = dateUtil.format(data.payTime, 'yyyy-MM-dd HH:mm:ss')
      for (const key in data) {
        if (data[key] === '' || data[key] === undefined) {
          delete data[key]
        }
      }
      return data
    },
    asyncOK() {
      setTimeout(() => {
        this.loading = false
        this.$refs.formBox.validate(async valid => {
          if (valid) {
            this.loading = true
            let params = this.serializeData()
            let result = await api.postCollectioWater(params)
            if (result.status == 200) {
              this.$Message.success('补录流水操作成功')
              this.$refs.formBox.resetFields()
              this.$emit('refreshList')
            } else {
              this.$Message.error(result.message)
            }
            this.modal = false
          }
        })
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    cancel() {
      this.$refs.formBox.resetFields()
      this.modal = false
    }
  }
}
</script>
