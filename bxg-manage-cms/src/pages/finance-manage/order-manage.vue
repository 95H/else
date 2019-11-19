<template>
  <div class="order_manage">
    <Row>
      <Col span="24">
        <Card>
          <Row :gutter="16">
            <Col span="4">
              <Select v-model="searchData.orderCourseNum" placeholder="订单课程数" class="sel" clearable>
                <Option
                  v-for="item in orderClassList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select v-model="searchData.orderStatus" placeholder="订单状态" class="sel" clearable>
                <Option
                  v-for="item in statusList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select v-model="searchData.payStatus" placeholder="支付状态" class="sel" clearable>
                <Option
                  v-for="item in orderList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select v-model="searchData.payType" placeholder="支付方式" :multiple="true" class="sel">
                <Option v-for="(value, key) in payWayList" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select
                v-model="searchData.orderTerminal"
                placeholder="下单终端"
                :multiple="true"
                class="sel"
              >
                <Option
                  v-for="item in orderTerminalList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select
                v-model="searchData.payTerminal"
                placeholder="支付终端"
                :multiple="true"
                class="sel"
              >
                <Option
                  v-for="item in payTerminalList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="4" class="margin-top-20">
              <Select
                v-model="searchData.actualAmountSection"
                placeholder="已支付金额"
                :multiple="true"
                class="sel"
              >
                <Option
                  v-for="item in paidList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4" class="margin-top-20">
              <Input v-model="searchData.buyer" placeholder="姓名/uid/手机号/身份证号" class="sel"/>
            </Col>
            <Col span="4" class="margin-top-20">
              <Input v-model="searchData.orderInfo" placeholder="订单号/订单内容/课程id" class="sel"/>
            </Col>
            <Col span="4" class="margin-top-20">
              <Select v-model="searchData.dateStauts" class="sel">
                <Option
                  v-for="item in addrecordList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4" class="margin-top-20">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="开始时间至结束时间"
                style="width:100%"
                @on-change="dateChange"
              ></DatePicker>
            </Col>
            <Button
              type="primary"
              icon="ios-search"
              class="search margin-left-10 margin-top-20"
              @click="searchClick"
            >搜索</Button>
            <Button class="clear margin-left-10 margin-top-20" @click="clearClick">清除</Button>
            <Button
              type="primary"
              icon="ios-paper-plane-outline"
              class="export margin-left-10 margin-top-20"
              v-if="hasSomeApiAccess('sales_orders_data')"
              @click="exportClick"
            >导出数据</Button>
          </Row>

          <div class="bt_body">
            <Table
              :loading="loading"
              border
              :columns="table.tableColumns"
              :data="getDateList.listData"
              height="600"
            ></Table>
            <div class="page_box">
              <Page
                :total="getDateList.total"
                show-sizer
                :current="getDateList.pageNum"
                :page-size-opts="[10,20,30,40,100,200]"
                show-elevator
                show-total
                :page-size="getDateList.pageSize"
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"
              />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import apiconfig from '@/config/apiconfig'
import api from '@/api/index'
import { mapActions, mapState } from 'vuex'
export default {
  data() {

    const hasorders_detail = this.hasSomeApiAccess('sales_orders_detail');  //查看订单内容
    const hasorders_users = this.hasSomeApiAccess('sales_orders_users');  //查看购买者UID
    return {
      time: [],
      loading: true,
      totalPage: 100,
      currentPage: 1,
      pageSize: 10,
      orderClassList: [
        //订单课程数
        {
          value: 1,
          label: '单课程'
        },
        {
          value: 2,
          label: '多课程'
        }
      ],
      statusList: [
        //订单状态
        {
          value: -1,
          label: '已关闭'
        },
        {
          value: 0,
          label: '未生效'
        },
        {
          value: 1,
          label: '已生效'
        }
      ],
      orderList: [
        //支付状态
        {
          value: -1,
          label: '已退费'
        },
        {
          value: 0,
          label: '未支付'
        },
        {
          value: 1,
          label: '部分支付'
        },
        {
          value: 2,
          label: '支付完成'
        }
      ],
      payWayList: [
        //支付方式
      ],
      orderTerminalList: [
        //下单终端
        {
          value: 0,
          label: 'PC官网'
        },
        {
          value: 1,
          label: '补录-其他'
        },
        {
          value: 2,
          label: 'App'
        },
        {
          value: 3,
          label: '移动官网'
        },
        {
          value: 4,
          label: '微信'
        },
        {
          value: 5,
          label: '补录-线下转线上'
        }
      ],
      payTerminalList: [
        //支付终端
        {
          value: 0,
          label: 'PC官网'
        },
        {
          value: 1,
          label: '微信'
        },
        {
          value: 2,
          label: 'App'
        },
        {
          value: 3,
          label: '移动官网'
        },
        {
          value: 4,
          label: '补录'
        }
      ],
      paidList: [
        //已支付金额
        {
          value: 0,
          label: '0元'
        },
        {
          value: 1,
          label: '0-200元'
        },
        {
          value: 2,
          label: '200-500元'
        },
        {
          value: 3,
          label: '500-2000元'
        },
        {
          value: 4,
          label: '大于2000元'
        }
      ],
      addrecordList: [
        //下单时间
        {
          value: 1,
          label: '创建时间'
        },
        {
          value: 2,
          label: '支付时间'
        }
      ],
      searchData: {
        orderCourseNum: '',
        orderStatus: 1,
        payStatus: 2,
        payType: '',
        orderTerminal: '',
        payTerminal: '',
        actualAmountSection: '',
        buyer: '',
        orderInfo: '',
        dateStauts: 1,
        startDate: '',
        endDate: '',
        pageNum: 1,
        pageSize: 10
      },
      table: {
        tableColumns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h(
                'span',
                params.index +
                  (this.getDateList.pageNum - 1) * this.getDateList.pageSize +
                  1
              )
            }
          },
          {
            title: '订单内容',
            width: 200,
            align: 'left',
            render: (h, params) => {
              let $orderbulmains = null; //查看订单内容
              if(hasorders_detail){
                $orderbulmains =  h(
                  'div', {
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.orderConHandle(params.row.orderNo)
                      }
                    }
                  },
                  params.row.orderContent
                )
              }else{
                $orderbulmains =  h(
                  'div', {
                    style: {
                      color: '',
                    }
                  },
                  params.row.orderContent
                )
              }
              return h('div', [ $orderbulmains ]);
            }
          },
          {
            title: '课程ID',
            key: 'courseIds',
            width: 80,
            align: 'right'
          },
          {
            title: '订单号',
            key: 'orderNo',
            width: 210,
            align: 'right'
          },
          {
            title: '购买者(uid)',
            width: 100,
            align: 'right',
            render: (h, params) => {
              let $xueyuanid = null; //查看学员UID
              if(hasorders_users){
                $xueyuanid = h(
                    'div', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.uidHandle(params.row.uid, params.row.userId)
                        }
                      }
                    },
                    params.row.uid
                  )
              }else{
                $xueyuanid = h(
                    'div', {
                      style: {
                        color: '',
                      }
                    },
                    params.row.uid
                  )
              }
              return h('div', [ $xueyuanid ]);
            }
          },
          {
            title: '购买者(姓名)',
            key: 'name',
            width: 110,
            align: 'left'
          },
          {
            title: '分销状态',
            width: 90,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h(
                  'span',
                  params.row.distributionStatus === 0 ? '非分销' : '分销'
                )
              ])
            }
          },
          {
            title: '下单时间',
            key: 'createTime',
            width: 150,
            align: 'right' //需要处理
          },
          {
            title: '下单终端',
            key: 'orderTerminal',
            width: 100,
            align: 'left'
          },
          {
            title: '总价',
            key: 'totalAmount',
            width: 90,
            align: 'right'
          },
          {
            title: '优惠金额',
            key: 'discountAmount',
            width: 90,
            align: 'right'
          },
          {
            title: '订单金额',
            key: 'orderAmount',
            width: 90,
            align: 'right'
          },
          {
            title: '冲抵金额',
            key: 'chargeAgainstAmount',
            width: 90,
            align: 'right'
          },
          {
            title: '类型',
            key: 'type',
            width: 80,
            align: 'right'
          },
          {
            title: '已付金额',
            key: 'paidAmount',
            width: 90,
            align: 'right'
          },
          {
            title: '实收金额',
            key: 'actualAmount',
            width: 90,
            align: 'right'
          },
          {
            title: '待支付金额',
            key: 'nonPayAmount',
            width: 100,
            align: 'right'
            // render: (h, params) => {
            //   return h('div', [
            //     h(
            //       'span',
            //       params.row.nonPayAmount === 0 ? '0' : params.row.nonPayAmount.toFixed(2)
            //     )
            //   ])
            // }
          },
          {
            title: '最后支付方式',
            key: 'payType',
            width: 110,
            align: 'left'
          },
          {
            title: '最后支付终端',
            key: 'payTerminal',
            width: 110,
            align: 'left'
          },
          {
            title: '最后支付时间',
            key: 'payTime',
            width: 150,
            align: 'right'
          },
          {
            title: '订单支付状态',
            key: 'payStatus',
            width: 110,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h('span', this.payStatusChange(params.row.payStatus))
              ])
            }
          },
          {
            title: '订单状态',
            key: 'orderStauts',
            width: 90,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h('span', this.orderStautsChange(params.row.orderStauts))
              ])
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.fetchGetOrderManagement({
      payStatus: 2,
      orderStatus: 1,
      dateStauts: 1,
      pageNum: 1,
      pageSize: 10
    })
    ;(async () => {
      //获取支付方式
      let result = await api.getPaySystemData()
      if (result.status === 200) {
        this.payWayList = result.result
      }
    })()
  },
  methods: {
    ...mapActions([`getOrderManagement`]),
    fetchGetOrderManagement(params) {
      //获取订单管理数据
      let data = { ...params }
      for (let key in data) {
        if (
          key === 'payType' ||
          key === 'orderTerminal' ||
          key === 'payTerminal' ||
          key === 'actualAmountSection'
        ) {
          if (data[key].length > 0) {
            data[key] = data[key].join(',')
          } else {
            data[key] = null
          }
        } else {
          data[key] = data[key] !== '' ? data[key] : null
        }
      }
      this.loading = true
      this.getOrderManagement(data).then(
        //接口异常处理
        result => {
          this.loading = false
          if (result.status !== 200) {
            this.$Message.error(result.message)
          }
        }
      )
    },
    orderConHandle(orderId) {
      //进入订单详情页
      this.$router.push(`/orders-details/${orderId}`)
    },
    payStatusChange(payStatus) {
      //支付状态改变
      for (let i = 0; this.orderList.length > i; i++) {
        if (this.orderList[i].value === payStatus) {
          return this.orderList[i].label
        }
      }
    },
    orderStautsChange(payStatus) {
      //订单状态改变
      for (let i = 0; this.statusList.length > i; i++) {
        if (this.statusList[i].value === payStatus) {
          return this.statusList[i].label
        }
      }
    },
    uidHandle(uuid, userId) {
      //进入学籍卡
      this.$router.push({
        name: 'student_info',
        query: {
          uuid: uuid,
          userId: userId,
          from: 'sales-manage_order-manage'
        }
      })
    },
    searchClick() {
      //搜索
      this.fetchGetOrderManagement(this.searchData)
    },
    clearClick() {
      //清除
      this.searchData.orderCourseNum = ''
      this.searchData.orderStatus = 1
      this.searchData.payStatus = 2
      this.searchData.payType = ''
      this.searchData.orderTerminal = ''
      this.searchData.payTerminal = ''
      this.searchData.actualAmountSection = ''
      this.time = []
      this.searchData.startDate = ''
      this.searchData.endDate = ''
      this.searchData.buyer = ''
      this.searchData.orderInfo = ''
      this.searchData.dateStauts = 1
      this.searchData.pageNum = 1
      this.searchData.pageSize = 10
      this.fetchGetOrderManagement(this.searchData)
    },
    exportClick() {
      //导出
      let exportParams = {
        ...this.searchData
      }
      let urlParams = ''
      for (let i in exportParams) {
        if (
          i === 'payType' ||
          i === 'orderTerminal' ||
          i === 'payTerminal' ||
          i === 'actualAmountSection'
        ) {
          !exportParams[i].length
            ? (exportParams[i] = '')
            : (exportParams[i] = exportParams[i].join(','))
        }
        if (exportParams[i] !== '') {
          urlParams += `${i}=${
            exportParams[i] === '' ? null : exportParams[i]
          }&`
        }
      }
      urlParams = urlParams.slice(0, urlParams.length - 1)
      window.location = `${apiconfig.bmfUrl}/order/export/data?${urlParams}`
    },
    dateChange(nDate) {
      //开始时间
      this.searchData.startDate = nDate[0]
      this.searchData.endDate = nDate[1]
    },
    pageChange(page) {
      this.searchData.pageNum = page
      this.fetchGetOrderManagement(this.searchData)
    },
    pageSizeChange(pageSize) {
      this.searchData.pageSize = pageSize
      this.fetchGetOrderManagement(this.searchData)
    }
  },
  computed: {
    ...mapState({
      getDateList: state => state.orderManagement.getDate
    })
  },
  watch: {
    getDateList(obj) {
      this.searchData.pageNum = obj.pageNum
      this.searchData.pageSize = obj.pageSize
    }
  }
}
</script>

<style lang="less" scoped>
.order_manage {
  min-width: 1200px;
  .bt_header {
    display: flex;
    .bt_header_l {
      display: flex;
      flex-wrap: wrap;
      .choose_date_box {
        display: flex;
        span {
          display: block;
          line-height: 30px;
          margin: 0 10px;
        }
      }
      .bt_btn {
        height: 32px;
      }
      .sel {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    .bt_header_r {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      .search,
      .clear,
      .export {
        margin-bottom: 10px;
      }
      .clear {
        margin-left: 10px;
      }
    }
  }
  .bt_body {
    margin-top: 20px;
    .page_box {
      margin: 20px 0 10px 0;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>


