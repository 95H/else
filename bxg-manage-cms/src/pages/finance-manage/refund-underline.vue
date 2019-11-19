<template>
  <div class="Offline-cost">
    <Row>
      <Col span="24">
        <Card>
          <Row :gutter="16">
            <Col span="2">
              <Button type="primary" @click="turnLinelower">转线下</Button>
            </Col>
            <Col span="5">
              <Select v-model="searchData.payType" placeholder="已发起" :multiple="true" class="sel">
                <Option v-for="(item, key) in payWayList" :value="item.value" :key="key">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="5">
              <Select v-model="searchData.orderStatus" placeholder="全部" class="sel" clearable>
                <Option
                  v-for="item in statusList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="5">
              <Input v-model="searchData.orderInfo" placeholder="订单号/订单内容/课程id" class="sel"/>
            </Col>
            <Col span="5">
              <Input v-model="searchData.buyer" placeholder="姓名/uid/手机号/身份证号" class="sel"/>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col span="6" class="margin-top-20">
              <Select v-model="searchData.dateStauts" class="sel">
                <Option
                  v-for="item in addrecordList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6" class="margin-top-20">
              <DatePicker
                v-model="time"
                type="daterange"
                placeholder="开始时间至结束时间"
                style="width:100%"
                @on-change="dateChange"
              ></DatePicker>
            </Col>
            <Col span="8" class="margin-top-20">
              <Button type="primary" @click="searchClick">搜索</Button>
              <Button class="clear" @click="clearClick" >清除</Button>
              <Button type="primary" icon="ios-paper-plane-outline" @click="exportClick">导出数据</Button>
            </Col>
          </Row>
          <Row class="margin-top-20" id="table-stage">
            <Col span="24">
              <Table
                :loading="loading"
                border
                :columns="table.tableColumns"
                :data="getDateList.listData"
              ></Table>
            </Col>
            <Col class="margin-top-20" span="24">
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
                style="text-align: right;"
              ></Page>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <!-- 转线下信息弹窗 -->
    <Modal
        width="55%"
        title="转线下信息"
        v-model="refundaDetailModalFlag"
        class-name="vertical-center-modal"
        :mask-closable="false"
        @on-ok="syncOK"
        @on-cancel="cancel">
        <detailsModal v-if="refundaDetailModalFlag"></detailsModal>
    </Modal>
  </div>
</template>

<script>
import apiconfig from '@/config/apiconfig'
import api from '@/api/index'
import { mapActions, mapState } from 'vuex'
import detailsModal from "./refundunderline-details-modal";
export default {
  components: {
    detailsModal,
  },
  data() {
    const hasorders_detail = this.hasSomeApiAccess('sales_orders_detail') //查看订单内容
    const hasorders_users = this.hasSomeApiAccess('sales_orders_users') //查看购买者UID

    
    const hasrizhi = this.hasSomeApiAccess('messages_push_details')
    const hasshanchu = this.hasSomeApiAccess('messages_push_close')
    return {
      refundaDetailModalFlag:false,
      modelData:[],
      bt_type:"",
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
          label: '课程退学转'
        },
        {
          value: 0,
          label: '多交学费转'
        },
        {
          value: 1,
          label: '预交学费转'
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
         {
          value: 0,
          label: '已发起',
        },
        {
          value: 1,
          label: '已经完成转移',
        },
        {
          value: 2,
          label: '已撤回',
        }
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
      addrecordList: [
        //下单时间
        {
          value: 1,
          label: '创建时间'
        },
        {
          value: 2,
          label: '转移时间'
        }
      ],
      searchData: {
        orderCourseNum: '',
        orderStatus: "",
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
            title: 'OA单号',
            width: 200,
            align: 'left',
            render: (h, params) => {
              let $orderbulmains = null //查看订单内容
              if (hasorders_detail) {
                $orderbulmains = h(
                  'div',
                  {
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
              } else {
                $orderbulmains = h(
                  'div',
                  {
                    style: {
                      color: ''
                    }
                  },
                  params.row.orderContent
                )
              }
              return h('div', [$orderbulmains])
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
              let $xueyuanid = null //查看学员UID
              if (hasorders_users) {
                $xueyuanid = h(
                  'div',
                  {
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
              } else {
                $xueyuanid = h(
                  'div',
                  {
                    style: {
                      color: ''
                    }
                  },
                  params.row.uid
                )
              }
              return h('div', [$xueyuanid])
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
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 200,
             render: (h, params) => {
              let rizhiBtn = '';
              if (hasrizhi) {
                rizhiBtn = h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      //display: !showHstatus == 0 ? 'inline-block' : 'none'
                    },
                    on: {
                      click: () => {
                      //   this.messagepushInfo(params.row)
                           this.refundaDetailModalFlag =true
                      }
                    }
                  },
                  '查看'
                )
              }

              let shanchuBtn = null
              if (hasshanchu) {
                shanchuBtn = h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      // display:
                      //   pushTimeStatus == 1 && showHstatus == 0
                      //     ? 'inline-block'
                      //     : 'none'
                    },
                    on: {
                      click: () => {
                        this.withdraw(params.row)
                      }
                    }
                  },
                  '撤回'
                )
              }

              return h('div', [rizhiBtn, shanchuBtn])
            }
          }
        ],
        
      },
      tablemodelData:{
        totalserverday:"",
        residueserverday:"",
        stairreason:0,
        secondreason:'',
        reamark:"",
        city:"",
        local:'',
        name:"",
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
    // ;(async () => {
    //   //获取支付方式
    //   let result = await api.getPaySystemData()
    //   if (result.status === 200) {
    //     this.payWayList = result.result
    //   }
    // })()
  },
  methods: {
    ...mapActions([`getOrderManagement`]),
    fetchGetOrderManagement(params) {
      //获取订单管理数据
      let data = { ...params }
      console.log(data)
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
      this.loading = true;
      
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
      //进入oa单号详情页
      console.log('详情页')
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
      //进入详情页
      console.log('进入详情页')
    },
    searchClick() {
      //搜索
      this.fetchGetOrderManagement(this.searchData)
    },
    turnLinelower () {
      //转线下的方法
      console.log('转线下')

    },
    clearClick() {
      //清除
      this.searchData.orderCourseNum = ''
      this.searchData.orderStatus = ''
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
      //开始时间的日历
      this.searchData.startDate = nDate[0]
      this.searchData.endDate = nDate[1]
    },
    pageChange(page) {
      //切换页码的方法
      this.searchData.pageNum = page
      this.fetchGetOrderManagement(this.searchData)
    },
    pageSizeChange(pageSize) {
      this.searchData.pageSize = pageSize
      this.fetchGetOrderManagement(this.searchData)
    },
    syncOK() {},
    cancel() {},
    btRadioChange(val){
      if(val==='课程退学退'){
        this.type =1
      }else if(val==='多交学费退'){
        this.type =2
      }else{
        this.type =3
      }
    },
    withdraw(info){
      //撤回
      let id = { id: info.id };
      this.$Modal.confirm({
          //classname:"vertical-center-modal",
          style:{
            'class-name':"vertical-center-modal"
          },
          closable: true,
          title: '提示',
          content: '<Icon type="md-add"/><p>确定撤回学费转移单？</p><p>撤回后，课程解除冻结</p>',
          onOk: () => {
              this.$Message.info('点击了确定');
          },
          onCancel: () => {
              this.$Message.info('点击了取消');
          }
      });
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

</style>


