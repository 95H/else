<template>
  <div class="ordersDetails">
    <Row>
      <Col span="24">
        <Card>
          <div class="order_info_box">
            <h6>订单信息</h6>
            <ul>
              <li v-for="(item, index) in oiList" :key="index">
                <div class="order_info_list">
                  <div class="oi_li">
                    <!--<Col span="6">-->
                      <h5>{{item.title}}</h5>
                    <!--</Col>-->
                    <!--<Col span="6">-->
                      <p>{{item.value}}</p>
                    <!--</Col>-->
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="order_info_box order_info_box2">
            <h6>订单内容</h6>
            <Table
              :columns="oConTable.oConcolumns"
              :data="getDate.orderContents"
              border
            ></Table>
          </div>
          <Divider class="divider"/>
          <div class="order_info_box order_info_box2">
            <h6>支付流水</h6>
            <Table
              :columns="payTable.paycolumns"
              :data="getDate.orderPayments"
              border
            ></Table>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      orderId: '',
      oiList: [
        {
          key: 'itcastUUID',
          title: '购买者(uid)',
          value: '--'
        },
        {
          key: 'userName',
          title: '购买者(用户名)',
          value: '--'
        },
        {
          key: 'userPhone',
          title: '购买者(绑定手机号)',
          value: '--'
        },
        {
          key: 'userEmail',
          title: '购买者(绑定邮箱)',
          value: '--'
        },
        {
          key: 'orderNO',
          title: '订单号',
          value: '--'
        },
        {
          key: 'orderStatus',
          title: '订单状态',
          value: '--'
        },
        {
          key: 'orderTerminal',
          title: '下单终端',
          value: '--'
        },
        {
          key: 'orderTime',
          title: '下单时间',
          value: '--'
        },
        {
          key: 'amountPayable',
          title: '应付金额（元）',
          value: '--'
        },
        {
          key: 'amountPaid',
          title: '实收金额（元）',
          value: '--'
        },
        {
          key: 'distributionStatus',
          title: '分销状态',
          value: '--'
        },
        {
          key: 'finalPaymentTerminal',
          title: '最后支付终端',
          value: '--'
        },
        {
          key: 'finalPaymentMethod',
          title: '最后支付方式',
          value: '--'
        },
        {
          key: 'finalPaymentTime',
          title: '最后支付时间',
          value: '--'
        }
      ],
      finalPaymentTerminal: { //最后支付终端/支付终端
        '0': 'PC官网',
        '1': '微信',
        '2': 'App',
        '3': '移动官网',
        '4': '补录'
      },
      orderTerminal: { //下单终端
        '0': 'PC官网',
        '1': '补录_其他',
        '2': 'App',
        '3': '移动官网',
        '4': '微信内',
        '5': '补录_线下转线上'
      },
      orderStatus: { //订单状态
        '-1': '已关闭',
        '0': '未生效',
        '1': '已生效'
      },
      oConTable: {
        oConcolumns: [
          {
            title: '序号',
            type: 'index',
            width: 100,
            align: 'center'
          },
          {
            title: '学科',
            key: 'subjectName',
            width: 100,
            align: 'left'
          },
          {
            title: '课程ID',
            key: 'courseId',
            width: 100,
            align: 'right'
          },
          {
            title: '课程名称',
            key: 'courseName',
            width: 210,
            align: 'left'
          },
          {
            title: '课程价格（元）',
            key: 'coursePrice',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.coursePrice === 0 ? '--' : params.row.coursePrice.toFixed(2)
                )
              ])
            }
          },
          {
            title: '优惠金额（元）',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.discountAmount === 0 ? '--' : params.row.discountAmount.toFixed(2)
                )
              ])
            }
          },
          {
            title: '订单金额（元）',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.orderAmount === 0 ? '--' : params.row.orderAmount.toFixed(2)
                )
              ])
            }
          },
          {
            title: '冲抵金额（元）',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.offsetAmount === 0 ? '--' : params.row.offsetAmount.toFixed(2)
                )
              ])
            }
          },
          {
            title: '类型',
            width: 100,
            align: 'left',
            render: (h, params) => {
              let typeStr = '';
              if (params.row.discountAmount !== 0) {
                typeStr += "优惠；";
              }
              if (params.row.offsetAmount !== 0) {
                typeStr += "报名费冲抵；";
              }
              return h('div', [
                h(
                  'span',
                  typeStr
                )
              ])
            }
          },
          {
            title: '已支付金额（元）',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.amountPaid === 0 ? '--' : params.row.amountPaid.toFixed(2)
                )
              ])
            }
          },
          {
            title: '实收金额（元）',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.moneyReceived === 0 ? '--' : params.row.moneyReceived.toFixed(2)
                )
              ])
            }
          },
          {
            title: '待支付金额（元）',
            width: 153,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.amountToBePaid === 0 ? '--' : params.row.amountToBePaid.toFixed(2)
                )
              ])
            }
          }
        ]
      },
      payTable: {
        paycolumns: [
          {
            title: '序号',
            type: 'index',
            width: 100,
            align: 'center'
          },
          {
            title: '支付流水ID',
            key: 'id',
            width: 200,
            align: 'right'
          },
          {
            title: '支付流水号',
            key: 'payNO',
            width: 250,
            align: 'right'
          },
          {
            title: '收据号',
            width: 250,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.receiptNO ? params.row.receiptNO : '--'
                )
              ]);
            }
          },
          {
            title: '流水金额（元）',
            key: 'amount',
            width: 150,
            align: 'right',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.amount === 0 ? '--' : params.row.amount.toFixed(2)
                )
              ])
            }
          },
          {
            title: '支付时间',
            key: 'payTime',
            width: 200,
            align: 'right'
          },
          {
            title: '支付方式',
            key: 'paymentMethod',
            width: 150,
            align: 'left'
          },
          {
            title: '支付终端',
            width: 100,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.paymentTerminal ? this.finalPaymentTerminal[params.row.paymentTerminal] : '--'
                )
              ])
            }
          },
          {
            title: '收款账户',
            key: 'bankAccount',
            width: 113,
            align: 'left'
          },
          {
            title: '操作人/审核人',
            key: 'operatorName',
            width: 200,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.operatorName ? params.row.operatorName : '--'
                )
              ])
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.orderId = this.orderId.match('([^&]*)')[0];
     this.fetchOrderDetails({
      orderId: this.orderId
    });
  },
  methods: {
    ...mapActions([
      `getOrderDetails`
    ]),
    fetchOrderDetails(params) {
      this.getOrderDetails(params).then(
        (result) => {
          if (result.status !== 200) {
            this.$Message.error(result.message);
          }
        }
      );
    }
  },
  watch: {
    getDate(obj) { //数据处理
      if (obj) {
        for (let i = 0; this.oiList.length > i; i++) {
          this.oiList[i].value = obj[this.oiList[i].key];
          if (this.oiList[i].key === 'finalPaymentTerminal') { //最后支付终端数据处理
            this.oiList[i].value = this.finalPaymentTerminal[this.oiList[i].value];
          }
          if (this.oiList[i].key === 'orderTerminal') { //下单终端数据处理
            if (this.oiList[i].value === 1 || this.oiList[i].value === 5) {
              this.oiList[i].value = this.orderTerminal[this.oiList[i].value] + `(${(obj.importPerson ? obj.importPerson : '--')})`;
            } else {
              this.oiList[i].value = this.orderTerminal[this.oiList[i].value];
            }
          }
          if (this.oiList[i].key === 'orderStatus') { //订单状态数据处理
            this.oiList[i].value = this.orderStatus[this.oiList[i].value];
          }
          if (this.oiList[i].key === 'distributionStatus') { //订单状态数据处理
            this.oiList[i].value = this.oiList[i].value ? '分销' : '非分销';
          }
          if (this.oiList[i].key === 'amountPayable') { //应付金额
            this.oiList[i].value = this.oiList[i].value === 0 ? '--' : this.oiList[i].value.toFixed(2);
          }
          if (this.oiList[i].key === 'amountPaid') { //已付金额
            this.oiList[i].value = this.oiList[i].value === 0 ? '--' : this.oiList[i].value.toFixed(2);
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      getDate: state => state.orderManagement.detailsData
    })
  }
}
</script>

<style lang="less" scoped>
.ordersDetails{
  min-width: 1200px;
  .order_info_box{
    h6{
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      min-width: 1168px;
      li{
        list-style: none;
        border: 1px solid #ccc;
        border-bottom: none;
        width: 50%;
        .order_info_list{
          .oi_li{
            display: flex;
            text-align: left;
            height: 40px;
            h5,p{
              line-height: 40px;
              padding-left: 10px;
            }
            h5{
              width: 30%;
              background: #e8eaec;
              color: #515a6e;
            }
            p{
              width: 100%;
              color: #515a6e;
            }
          }
        }
      }
      li:nth-child(13){
        border-bottom: 1px solid #ccc;
      }
      li:nth-child(14){
        border-bottom: 1px solid #ccc;
      }
      li:nth-child(2n+2){
        border-left: none;
      }
    }
  }
  .order_info_box2{
    margin-top: 20px;
  }
  .divider{
    margin-top: 40px;
  }
}
</style>


