<template>
  <div class="back_tracking_pay">
    <Row>
      <Col span="24">
        <Card>
          <Row :gutter="10" type="flex">
            <Col span="4">
              <Select placeholder="订单支付状态" v-model="queryData.payStatus" clearable>
                <Option
                  v-for="item in payList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Input v-model="queryData.payInfo" placeholder="姓名/uid/手机号/身份证号"/>
            </Col>
            <Col span="4">
              <Input v-model="queryData.orderInfo" placeholder="订单号/订单内容/课程ID"/>
            </Col>
            <Col span="3">
              <Select placeholder="请选择时间" v-model="queryData.timeType" @on-change="handleChange">
                <Option :value="1" :key="1">下单时间</Option>
                <Option :value="2" :key="2">支付时间</Option>
              </Select>
            </Col>
            <Col span="5">
              <DatePicker
                v-model="dateTime"
                type="daterange"
                placeholder="开始时间至结束时间"
                style="width:100%"
              ></DatePicker>
            </Col>
            <Col>
              <span @click="handleSearch" style="margin: 0 6px;">
                <Button type="primary" icon="md-search">搜索</Button>
              </span>
              <Button @click="handleClear">清除</Button>
            </Col>
          </Row>
          <Row id="table-stage-list">
            <Row style="margin-top:20px">
              <Table
                :loading="loading"
                width="100%"
                :height="baseHeight"
                border
                :columns="columns"
                :data="listData.list"
              ></Table>
            </Row>
            <Row style="margin-top:20px;text-align: right;">
              <Page
                placement="top"
                style="text-align: right;"
                :total="listData.total"
                :page-size="queryData.pageSize"
                @on-change="handleCurrentChange"
                :current="listData.pageNum"
                show-total
                show-elevator
                show-sizer
                @on-page-size-change="handlePageSize"
              ></Page>
            </Row>
          </Row>
        </Card>
      </Col>
    </Row>
    <collection-modal ref="bulumodal" @refreshList="handleSearch"></collection-modal>
  </div>
</template>

<script>
import dateUtil from 'iview/src/utils/date'
import util from '@/util/util'
import collectionModal from './collection-running-water-modal'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  components: {
    collectionModal
  },
  data() {
    const haspayorders_details = this.hasSomeApiAccess('finances_import_payment_orders_details');  //查看订单内容
    const haspaystudents_details = this.hasSomeApiAccess('finances_import_payment_students_details');  //查看学员UID
    const haspaypayment_post = this.hasSomeApiAccess('finances_import_payment_import_payment_post');  //补入流水
    return {
      baseHeight: 0,
      loading: true,
      queryData: {
        pageNo: 1,
        pageSize: 10,
        payStatus: '',
        payInfo: '',
        orderInfo: '',
        timeType: 1,
        startDate: '',
        endDate: ''
      },
      dateTime: [],
      payList: [
        //支付状态：0未支付、1部分支付、2支付完成、-1已退费
        {
          value: 0,
          label: '未支付'
        },
        {
          value: 1,
          label: '部分支付'
        }
        /*  {
          value: 2,
          label: '支付完成'
        },
        {
          value: -1,
          label: '已退费'
        } */
      ],
      columns: [
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index +
                (this.queryData.pageNo - 1) * this.queryData.pageSize +
                1
            )
          }
        },
        {
          title: '课程id',
          key: 'courseId',
          align: 'right',
          width: 100
        },
        {
          title: '订单内容',
          key: 'courseName',
          align: 'left',
          width: 200,
          render: (h, params) => {

            let $payOrderButton = null; //查看订单内容

            if (haspayorders_details) {
                $payOrderButton = h(
                  'strong',
                  {
                    props: {},
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    },
                    on: {
                      click: () => {
                        this.$router.push(`/orders-details/${params.row.orderNo}`)
                      }
                    }
                  },
                  params.row.courseName
                )
            }else{
                $payOrderButton = h(
                  'strong',
                  {
                    props: {},
                    style: {
                      color: '',
                    }
                  },
                  params.row.courseName
                )
            }

            return h("div", [ $payOrderButton ]);

          }
        },
        {
          title: '订单号',
          key: 'orderNo',
          align: 'right',
          width: 200
        },
        {
          title: 'UID',
          key: 'uid',
          align: 'right',
          width: 100,
          render: (h, params) => {
            let $studentsid = null; //查看学员UID
            if (haspaystudents_details) {
                $studentsid =  h(
                'strong',
                {
                  props: {},
                  style: {
                    color: '#2d8cf0',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'student_info',
                        query: {
                          uuid: params.row.uid,
                          userId: params.row.studentId,
                          from: 'finance-manage_back-tracking-pay'
                        }
                      })
                    }
                  }
                },
                params.row.uid
              )
            }else{
               $studentsid =  h(
                'strong',
                {
                  props: {},
                  style: {
                    color: '',
                  }
                },
                params.row.uid
              )
            }

            return h("div", [ $studentsid ]);        

          }
        },
        {
          title: '姓名',
          key: 'userName',
          width: 100
        },
        {
          title: '订单来源',
          key: 'channel',
          width: 120
        },
        {
          title: '下单时间',
          key: 'createTime',
          align: 'right',
          width: 160
        },
        {
          title: '课程价格',
          key: 'totalAmount',
          align: 'right',
          width: 100
        },
        {
          title: '订单金额',
          key: 'orderAmount',
          align: 'right',
          width: 100
        },
        {
          title: '实收金额',
          key: 'actualAmount',
          align: 'right',
          width: 100
        },
        {
          title: '待支付金额',
          key: 'shouldPay',
          align: 'right',
          width: 100
        },
        {
          title: '最后支付时间',
          key: 'payTime',
          align: 'right',
          width: 160
        },
        {
          title: '订单支付状态', //支付状态：0未支付、1部分支付、2支付完成、-1已退费
          key: 'payStatus',
          align: 'center',
          width: 120,
          render: (h, params) => {
            let text = ''
            if (params.row.payStatus === 0) {
              text = '未支付'
            } else if (params.row.payStatus === 1) {
              text = '部分支付'
            } else if (params.row.payStatus === 2) {
              text = '支付完成'
            } else {
              text = '已退费'
            }
            return h(
              'span',
              {
                props: {}
              },
              text
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          render: (h, params) => {
            let $payflowingwaterButton = null; //补入流水
            if (haspaypayment_post) {
              $payflowingwaterButton =  h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$refs.bulumodal.modal = true
                      this.$refs.bulumodal.orderId = params.row.orderId
                      this.$refs.bulumodal.orderType = params.row.orderType
                      this.$refs.bulumodal.getOrderContent()
                    }
                  }
                },
                '补录流水'
              )
            }
            return h("div", [ $payflowingwaterButton ]);
          }
        }
      ]
    }
  },
  mounted() {
    let query = this.serializeData()
    this.getCollectionOrder(query).then(() => {
      this.loading = false
    })
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions(['getCollectionOrder']),
    handleChange(val) {
      this.dateTime = []
    },
    handleSearch() {
      this.loading = true
      let query = this.serializeData()
      this.getCollectionOrder(query).then(() => {
        this.loading = false
      })
    },
    handleCurrentChange(num) {
      this.loading = true
      this.queryData.pageNo = num
      let query = this.serializeData()
      this.getCollectionOrder(query).then(() => {
        this.loading = false
      })
    },
    handlePageSize(size) {
      this.loading = true
      this.queryData.pageNo = 1
      this.queryData.pageSize = size
      let query = this.serializeData()
      this.getCollectionOrder(query).then(() => {
        this.loading = false
      })
    },
    serializeData() {
      let [startDate, endDate] = this.dateTime
      if (startDate && endDate) {
        this.queryData.startDate = dateUtil.format(startDate, 'yyyy-MM-dd')
        this.queryData.endDate = dateUtil.format(endDate, 'yyyy-MM-dd')
      }
      let data = Object.assign({}, this.queryData)
      for (const key in data) {
        if (data[key] === '' || data[key] === undefined) {
          delete data[key]
        }
      }
      return data
    },
    handleClear() {
      this.queryData = {
        pageNo: 1,
        pageSize: 10,
        payStatus: '',
        payInfo: '',
        orderInfo: '',
        timeType: '',
        startDate: '',
        endDate: ''
      }
      this.dateTime = []

      this.loading = true
      let query = this.serializeData()
      this.getCollectionOrder(query).then(() => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState({
      listData: state => state.finance.listData
    })
  }
}
</script>

<style lang="less" scoped>
</style>


