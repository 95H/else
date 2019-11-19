<template>
  <div class="refund-online-interchange">
    <Row>
      <Col span="24">
        <Card>
          <Tabs :value="TabsValue">
            <TabPane label="线上互转课程" name="Tabs1" style="padding-bottom:1px;">
              <Row :gutter="10">
                <Col span="1">
                  <span style="display:inline-block;width:70px;text-align:right;line-height:32px;">购买者：</span>
                </Col>
                <Col span="3" >
                  <Input
                    placeholder="uid/手机号"
                    v-model="data1.inputValue1"
                    clearable
                  />
                </Col>
                <Col span="1">
                  <span style="display:inline-block;width:70px;text-align:right;line-height:32px;">订单信息：</span>
                </Col>
                <Col span="3" >
                  <Input
                    placeholder="订单号"
                    v-model="data1.inputValue2"
                    clearable
                  />
                </Col>
                <Col span="4">
                  <span><Button type="primary" icon="ios-search" class="search" @click="t1_searchClick">搜索</Button></span>
                  <span @click="t1_clearInfo" style="margin-right:6px;"><Button >清除</Button></span>
                </Col>
              </Row>
              <Row class="margin-top-20" id="table-stage-list">
                <Table
                  :loading="data1.loading"
                  border
                  :columns="table.tableColumns"
                  :data="data1.listData"
                  height="600"
                ></Table>
                <Row style="margin-top:20px;text-align: right;">
                  <Page
                    :total="data1.getDateList.total"
                    show-sizer
                    :current="data1.getDateList.pageNum"
                    :page-size-opts="[10,20,30,40,100,200]"
                    show-elevator
                    show-total
                    :page-size="data1.getDateList.pageSize"
                    @on-change="t1_pageChange"
                    @on-page-size-change="t1_pageSizeChange"
                  />
                </Row>
              </Row>
            </TabPane>
            <TabPane label="线上互转记录" name="Tabs2">
              <Row :gutter="10" class="row_bottom" type="flex">
                <Col span="2" class="row_bottom_10">
                  <Select
                    v-model="searchData.status"
                    placeholder="状态"
                    :multiple="true"
                    class="sel"
                    clearable
                  >
                    <Option
                      :title="item.label"
                      v-for="item in statusData"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="2" class="row_bottom_10">
                  <Select
                    v-model="searchData.type"
                    placeholder="转移类型"
                    :multiple="true"
                    class="sel"
                    clearable
                  >
                    <Option
                      :title="item.label"
                      v-for="item in refundType"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="4" class="row_bottom_10">
                  <Input v-model="searchData.orderno" placeholder="订单号/订单内容/课程id" class="sel"/>
                </Col>
                <Col span="4" class="row_bottom_10">
                  <Input v-model="searchData.infor" placeholder="姓名/uid/手机号/身份证号" class="sel"/>
                </Col>
                <Col span="2" class="row_bottom_10">
                  <Select
                    v-model="searchData.timer"
                    placeholder="创建时间"
                    :multiple="false"
                    class="sel"
                    clearable
                  >
                    <Option
                      :title="item.label"
                      v-for="item in timeType"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Col>
                <Col span="4" class="row_bottom_10">
                  <DatePicker
                    style="widht:100%;"
                    type="daterange"
                    placeholder="请选择时间"
                    ref="dateStart"
                    split-panels
                    @on-change="dateChange"
                  ></DatePicker>
                </Col>
                <Col class="row_bottom_10">
              
                  <span><Button type="primary" icon="ios-search" class="search" @click="t2_searchClick">搜索</Button></span>
                  <span @click="t2_clearInfo" style="margin-right:6px;"><Button >清除</Button></span>
                  <span>
                    <Button
                      type="primary"
                      icon="ios-paper-plane-outline"
                      class="export"
                      @click="exportClick"
                    >导出数据</Button>
                  </span>
                </Col>
              </Row>
              <Row class="margin-top-20" id="table-stage-list">
                <Table
                  :loading="data2.loading"
                  border
                  :columns="table.tableColumns2"
                  :data="data2.listData"
                  height="600"
                ></Table>
                <Row style="margin-top:20px;text-align: right;">
                  <Page
                    :total="data2.getDateList.total"
                    show-sizer
                    :current="data2.getDateList.pageNum"
                    :page-size-opts="[10,20,30,40,100,200]"
                    show-elevator
                    show-total
                    :page-size="data2.getDateList.pageSize"
                    @on-change="t2_pageChange"
                    @on-page-size-change="t2_pageSizeChange"
                  />
                </Row>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
      <TransferModal :isShowModal.sync="transferModalFlag" @cancleClick="cancleClick"></TransferModal>
    </Row>
  </div>
</template>

<script>
import api from '@/api/index'
import util from '@/util/util.js'
import apiconfig from '@/config/apiconfig'
import { mapActions, mapState } from 'vuex'
import TransferModal from './transfer-modal.vue'
export default {
  components: {
    TransferModal
  },
  data() {
    return {
      TabsValue: 'Tabs1',
      // 线上互转课程数据
      // 线上互转弹窗
      transferModalFlag: false,
      data1: {
        inputValue1: '',
        inputValue2: '',
        listData: [
          {
            courseName: 'Java基础在线体验班',
            courseId: 1112,
            orderNo: '190325156G4m75945Uh7',
            uid: 280974,
            name:"张三",
            createTime:"2018-05-21 15:22:13",
            orderAmount:14980,
            actualAmount:14980,
            payTime:"2018-06-01 20:25:12",
            payStatus:2,
            courseAuthority:1
          }
        ],
        loading: false,
        getDateList: {
          pageNum: 1,
          pageSize: 10,
          total: 1
        }
      },
      data2: {
        inputValue1: '',
        inputValue2: '',
        listData: [
          {
            oa:'oa123123132',
            state:1,
            transferType:1,
            // 转出订单
            transferOrderContent:'Java基础在线体验班',
            // 转入订单
            transferIntoOrderContent:'Go语言在线体验班',
            transferIntoOrderAmount: 14980,
            transferAmount: 14980,
            uid: 280974,
            createTime: '2018-07-05 16:22:10',
            founder: '张三',
            transferTime: '2018-07-08 13:21:12',
            auditor: '李四'
          }
        ],
        loading: false,
        getDateList: {
          pageNum: 1,
          pageSize: 10,
          total: 1
        }
      },
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
      
      // 线上互转记录
      searchData:{
        status:0,
        type:'',
        orderno:"",
        infor:'',
        timer:0
      },
      statusData: [{
          value: 0,
          label: '已发起'
        },
        {
          value: 1,
          label: '已完成转移'
        },
        {
          value: 2,
          label: '已撤回'
        }
      ],
      refundType: [{
            value: 0,
            label: '课程退学转'
          },
          {
            value: 1,
            label: '多交学费转'
          },
          {
            value: 2,
            label: '预交学费转'
          }
        ],
        // 
      timeType: [{
          value: 0,
          label: '创建时间'
        },
        {
          value: 1,
          label: '转移时间'
        },
      ],

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
                  (this.data1.getDateList.pageNum - 1) *
                    this.data1.getDateList.pageSize +
                  1
              )
            }
          },
          {
            title: '订单内容',
            key: 'courseName',
            width: 220,
            align: 'left',
            render: (h, params) => {
              return h('span', params.row.courseName)
            }
          },
          {
            title: '课程id',
            key: 'courseId',
            width: 100,
            align: 'center'
          },
          {
            title: '订单号',
            key: 'orderNo',
            align: 'left',
            width: 200
          },
          {
            title: 'UID',
            key: 'uid',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.uid)
            }
          },
           {
            title: '姓名',
            key: 'name',
            width: 110,
            align: 'center'
          },
          {
            title: '下单时间',
            key: 'createTime',
            width: 150,
            align: 'center' //需要处理
          },
          {
            title: '订单金额（元）',
            key: 'orderAmount',
            width: 130,
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.orderAmount.toFixed(2))
            }
          },
          {
            title: '实收金额（元）',
            key: 'actualAmount',
            width: 130,
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.actualAmount.toFixed(2))
            }
          },
          {
            title: '最后支付时间',
            key: 'payTime',
            width: 150,
            align: 'center'
          },
          {
            title: '订单支付状态',
            key: 'payStatus',
            width: 110,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', this.payStatusChange(params.row.payStatus))
              ])
            }
          },
          {
            title: '课程权限',
            key: 'courseAuthority',
            width: 110,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('span', 
                  params.row.payStatus ? "已开通" : "未开通"
                )
              ])
            }
          },
          {
            title: '操作',
            key: 'status',
            fixed: 'right',
            width: 100,
            render: (h, params) => {
              let $transferButton = null; //线上互转
              $transferButton = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.transferModalFlag = true
                    }
                  }
                },
                '线上互转'
              )
              return $transferButton;
            }
          }
        ],
        tableColumns2: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h(
                'span',
                params.index +
                  (this.data1.getDateList.pageNum - 1) *
                    this.data1.getDateList.pageSize +
                  1
              )
            }
          },
          {
            title: 'OA单号',
            key: 'oa',
            width: 150,
            align: 'right'
          },
          {
            title: '状态',
            key: 'state',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let state = ''
              switch(params.row.state){
                case 0:
                  state = '已发起'
                  break
                case 1:
                  state = '已完成转移'
                  break
                case 2:
                  state = '已撤回'
                  break
              }
              return h('span', state)
            }
          },
          {
            title: '转移类型',
            key: 'transferType',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let transferType = ''
              switch(params.row.transferType){
                case 0:
                  transferType = '课程退学转'
                  break
                case 1:
                  transferType = '多交学费转'
                  break
                case 2:
                  transferType = '预交学费转'
                  break
              }
              return h('span', transferType)
            }
          },
          {
            title: '转出订单内容',
            key:'transferOrderContent',
            align: 'left',
            width: 200
          },
          {
            title: '转入订单内容',
            key:'transferIntoOrderContent',
            align: 'left',
            width: 200
          },
          {
            title: '转入订单金额（元）',
            key:'transferIntoOrderAmount',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span', params.row.transferIntoOrderAmount.toFixed(2))
            }
          },
          {
            title: '转移金额（元）',
            key:'transferAmount',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span', params.row.transferAmount.toFixed(2))
            }
          },
          {
            title: '学员uid',
            key: 'uid',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.uid)
            }
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            width: 150
          },
          {
            title: '创建人',
            key: 'founder',
            align: 'center',
            width: 100
          },
          {
            title: '转移成功时间',
            key: 'transferTime',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('span', params.row.transferTime?params.row.transferTime: '--')
            }
          },
          {
            title: '审核人',
            key: 'auditor',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('span', params.row.auditor?params.row.auditor: '--')
            }
          },
          {
            title: '操作',
            key: 'status',
            fixed: 'right',
            width: 150,
            render: (h, params) => {

              let $prohibitButton = null; //预报名费模板-禁用
              let $noticeButton = null; //预报名费模板-发送通知
              $prohibitButton = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.refundaDetailModalFlag =true
                    }
                  }
                },
                '查看'
              )
              $noticeButton =  h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled:
                      params.row.courseStatus === '1'
                        ? params.row.status === 1
                          ? false
                          : true
                        : true
                  },
                  on: {
                    click: () => {
                      this.newsModal = !this.newsModal
                      this.newsformItem.id = params.row.id
                      // this.sendTitile = `发送短信`
                    }
                  }
                },
                '撤回'
              )
              return h("div", [ $prohibitButton, $noticeButton ]);
            }
          }
        ]
      }
    }
  },
  methods: {
    // 线上互转课程方法
    // 点击搜索
    t1_searchClick(){

    },
    // 清除
    t1_clearInfo(){

    },
    // 分页切换
    t1_pageChange(){

    },
    t1_pageSizeChange(){

    },
    payStatusChange(payStatus) {
      //支付状态改变
      for (let i = 0; this.orderList.length > i; i++) {
        if (this.orderList[i].value === payStatus) {
          return this.orderList[i].label
        }
      }
    },
    // 关闭线上弹窗
    cancleClick(){
      this.btOrderModel =false
    },



    //线上互转记录方法
    // 点击搜索
    t2_searchClick(){

    },
    // 点击清除
    t2_clearInfo(){

    },
    // 分页切换
    t2_pageChange(){

    },
    t2_pageSizeChange(){

    },
    // 时间切换
    dateChange(){

    },
    // 导出数据
    exportClick(){

    },
  },
  computed: {
    modalShow: {
      get() {
        return this.isShowModal
      },

      set(val) {
        this.$emit('update:isShowModal', val)
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    //获取table-height
    this.$nextTick(() => {
      let dom = document.getElementById('table-stage-list')
      this.baseHeight = util.baseHeight(dom, 82)
    })
  }
}
</script>

<style lang="less" scoped >

</style>