<template>
  <div class="back_tracking_check">
    <Row>
      <Col span="24">
        <Card>
          <Row :gutter="10">
            <Col span="4">
              <Select placeholder="流水状态" v-model="queryData.status">
                <Option
                  v-for="item in auditStatus"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select placeholder="支付方式" v-model="queryData.payMethod" clearable>
                <Option v-for="(value, key) in svPayMethod" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Select placeholder="收款账户" v-model="queryData.bankAccount" clearable>
                <Option v-for="(value, key) in svBankAccount" :value="key" :key="key">{{ value }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Input v-model="queryData.orderInfo" placeholder="订单号/订单内容/课程ID"/>
            </Col>
            <Col span="4">
              <Input v-model="queryData.paymentId" placeholder="请输入支付流水号"/>
            </Col>
            <Col span="4">
              <Input v-model="queryData.payInfo" placeholder="姓名/uid/手机号/身份证号"/>
            </Col>
          </Row>
          <Row style="margin-top:20px" :gutter="10" type="flex">
            <Col span="4">
              <Select
                placeholder="请选择时间"
                v-model="queryData.timeType"
                @on-change="handleDateChange"
              >
                <Option :value="1" :key="1">补录时间</Option>
                <Option :value="2" :key="2">缴费时间</Option>
                <Option :value="3" :key="3">审核时间</Option>
              </Select>
            </Col>
            <Col span="8">
              <DatePicker
                v-model="dateTime"
                type="daterange"
                placeholder="开始时间至结束时间"
                style="width:100%"
              ></DatePicker>
            </Col>
            <Col>
              <span @click="handleSearch" style="margin-right:6px;">
                <Button type="primary" icon="md-search">搜索</Button>
              </span>
              <Button @click="handleClear" style="margin-right:6px;">清除</Button>
              <Button
                type="primary"
                icon="ios-paper-plane-outline"
                class="export"
                @click="exportClick"
                v-if="hasSomeApiAccess('finances_audits_import_payment_data')" 
              >导出数据</Button>
            </Col>
          </Row>
          <Row id="table-stage-list">
            <Row style="margin-top:20px">
              <Table
                ref="tablebox"
                :loading="loading"
                width="100%"
                :height="baseHeight"
                border
                :columns="columns"
                :data="auditListData.list"
                @on-selection-change="onSelectionChange"
              ></Table>
            </Row>
            <Row style="margin-top:20px" type="flex">
              <Col>
                <Button type="primary" style="margin-right:6px;" @click="handleSelectAll(true,1)" v-if="hasSomeApiAccess('finances_audits_import_payment_batch_passes_patch')">批量通过</Button>
                <Button type="primary" @click="handleSelectAll(true,2)" v-if="hasSomeApiAccess('finances_audits_import_payment_batch_back_patch')">批量驳回</Button>
                <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
              </Col>
              <Col span="18">
                <Page
                  placement="top"
                  style="text-align: right;"
                  :total="auditListData.total"
                  :page-size="queryData.pageSize"
                  @on-change="handleCurrentChange"
                  :current="auditListData.pageNum"
                  show-total
                  show-elevator
                  show-sizer
                  @on-page-size-change="handlePageSize"
                ></Page>
              </Col>
            </Row>
          </Row>
        </Card>
      </Col>
    </Row>
    <payment-modal ref="payment" @refreshList="handleSearch"></payment-modal>
  </div>
</template>

<script>
import api from '@/api/index'
import util from '@/util/util'
import dateUtil from 'iview/src/utils/date'
import { mapActions, mapState, mapMutations } from 'vuex'
import paymentModal from './payment-water-modal'
import apiconfig from '@/config/apiconfig'
export default {
  components: {
    paymentModal
  },
  data() {
    const hascaiorders_details = this.hasSomeApiAccess('finances_audits_import_payment_orders_details');  //查看订单内容
    const hascaistudents_details = this.hasSomeApiAccess('finances_audits_import_payment_students_details');  //查看学员UID
    const hascaicha_details = this.hasSomeApiAccess('finances_audits_import_payment_orders_info');  //查看
    const hascaipasses_patch = this.hasSomeApiAccess('finances_audits_import_payment_passes_patch');  //通过
    const hascaiback_patch = this.hasSomeApiAccess('finances_audits_import_payment_back_patch');  //驳回
    
    return {
      baseHeight: 0,
      loading: true,
      disabled: true,
      auditNum: 0,
      auditArr: [],
      queryData: {
        pageNo: 1,
        pageSize: 10,
        status: 0,
        payMethod: '',
        bankAccount: '',
        orderInfo: '',
        paymentId: '',
        payInfo: '',
        timeType: 1,
        startDate: '',
        endDate: ''
      },
      dateTime: [],
      auditStatus: [
        //
        {
          value: -1,
          label: '审核失败'
        },
        {
          value: 0,
          label: '待审核'
        },
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 2,
          label: '审核驳回'
        }
      ],
      svPayMethod: null,
      svBankAccount: null,
      svLoanCompany: null,
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 62,
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
          title: '收据号',
          key: 'receiptNo',
          align: 'right',
          width: 120
        },
        {
          title: '支付流水ID',
          key: 'paymentId',
          align: 'right',
          width: 120
        },
        {
          title: '流水状态',
          key: 'status',
          align: 'left',
          width: 100,
          render: (h, params) => {
            //0待审核、1审核通过、2审核驳回、-1审核失败
            let text = ''
            if (params.row.status === 0) {
              text = '待审核'
            } else if (params.row.status === 1) {
              text = '审核通过'
            } else if (params.row.status === 2) {
              text = '审核驳回'
            } else {
              text = '审核失败'
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
          title: '支付方式',
          key: 'payMethod',
          width: 150
        },
        {
          title: '收款账户',
          key: 'bankAccount',
          width: 200
        },
        {
          title: '流水金额',
          key: 'amount',
          align: 'right',
          width: 100
        },
        {
          title: '订单内容',
          key: 'courseName',
          width: 200,
          render: (h, params) => {

           let $dinordermains = null; //查看订单内容

            if (hascaiorders_details) {
              $dinordermains =  h(
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
              $dinordermains =  h(
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
            return h("div", [ $dinordermains ]);
          }
        },
        {
          title: '订单金额',
          key: 'orderAmount',
          align: 'right',
          width: 100
        },
        {
          title: 'UID',
          key: 'uid',
          align: 'right',
          width: 100,
          render: (h, params) => {

            let $caistudentid = null; //查看学员UID

            if (hascaistudents_details) {
              $caistudentid =  h(
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
                          from: 'finance-manage_back-tracking-check'
                        }
                      })
                    }
                  }
                },
                params.row.uid
              )
            }else{
              $caistudentid =  h(
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
            return h("div", [ $caistudentid ]);
          }
        },
        {
          title: '补录流水时间',
          key: 'createTime',
          align: 'right',
          width: 200
        },
        {
          title: '补录人',
          key: 'creator',
          width: 200
        },
        {
          title: '缴费时间',
          key: 'paymentTime',
          align: 'right',
          width: 200
        },
        {
          title: '审核时间',
          key: 'auditTime',
          align: 'right',
          width: 200
        },
        {
          title: '审核人',
          key: 'auditor',
          align: 'center',
          width: 120
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 180,
          render: (h, params) => {
            let $seeButton = null; //查看
            let $adoptButton = null; //通过
            let $rejectButton = null; //驳回
            if (hascaicha_details) {
                $seeButton =  h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$refs.payment.modal = true
                      this.getPaymentDetail({
                        id: params.row.id
                      })
                      this.getPaymentlogList({
                        paymentId: params.row.id
                      })
                    }
                  }
                },
                '查看'
              )
            }

            if (hascaipasses_patch) {
                $adoptButton =  h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status !== 0
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$refs.tablebox.objData[
                        params.row._index
                      ]._isChecked = true
                      const title = '审核通过'
                      const content = '<p>确定审核通过选中记录吗？</p>'
                      this.$Modal.confirm({
                        title: title,
                        content: content,
                        closable: false,
                        onOk: () => {
                          this.auditWater([params.row.id], 1)
                        },
                        onCancel: () => {
                          this.$refs.tablebox.objData[
                            params.row._index
                          ]._isChecked = false
                        }
                      })
                    }
                  }
                },
                '通过'
              )
            }

            if (hascaiback_patch) {
                $rejectButton = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status !== 0
                  },
                  on: {
                    click: () => {
                      this.$refs.tablebox.objData[
                        params.row._index
                        ]._isChecked = true
                      const title = '审核驳回'
                      const content = '<p>确定审核驳回选中记录吗？</p>'
                      this.$Modal.confirm({
                        title: title,
                        content: content,
                        closable: false,
                        onOk: () => {
                          this.auditWater([params.row.id], 2)
                        },
                        onCancel: () => {
                          this.$refs.tablebox.objData[
                            params.row._index
                            ]._isChecked = false
                        }
                      })
                    }
                  }
                },
                '驳回'
              )
            }

            return h("div", [ $seeButton, $adoptButton, $rejectButton ]);
            
          }
        }
      ]
    }
  },
  mounted() {
    ;(async () => {
      let result = await api.getSystemData()
      if (result.status === 200) {
        this.svPayMethod = result.result.svPayMethod
        this.svBankAccount = result.result.svBankAccount
        this.svLoanCompany = result.result.svLoanCompany
        this.getListData()
      }
    })()
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions([
      'getAuditCollection',
      'getPaymentDetail',
      'getPaymentlogList'
    ]),
    handleSelectAll(status, num) {
      if(!this.auditArr.length){
         this.$Message.error('没有选择任何数据')
        return false
      }
      if (num === 1) {
        const title = '批量审核通过'
        const content = '<p>确定审核通过选中记录吗？</p>'
        this.$Modal.warning({
          title: title,
          content: content,
          closable: true,
          onOk: () => {
            this.auditWater(this.auditArr, 1)
          }
        })
      }
      if (num === 2) {
        const title = '批量审核驳回'
        const content = '<p>确定审核驳回选中记录吗？</p>'
        this.$Modal.warning({
          title: title,
          content: content,
          closable: true,
          onOk: () => {
            this.auditWater(this.auditArr, 2)
          }
        })
      }
    },
    onSelectionChange(row) {
      this.auditArr.length = 0
      if (!row.length) {
        return false
      }
      for (let i = 0; i < row.length; i++) {
        this.auditArr[i] = row[i].id
      }
    },
    exportClick() {
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
      let urlParams = ''
      for (let i in data) {
        if (data[i] !== '') {
          urlParams += `${i}=${data[i]}&`
        }
      }
      urlParams = urlParams.slice(0, urlParams.length - 1)
      window.location = `${
        apiconfig.bmfUrl
      }/import/payment/export-data?${urlParams}`
    },
    async auditWater(arr, state) {
      let result = await api.postAuditPayment({
        ids: arr,
        status: state
      })
      if (result.status === 200) {
        result.result.forEach(element => {
          if (element.code === 200) {
            this.$Message.success('审核成功')
          } else if (element.code === 201) {
            this.$Message.success('驳回成功')
          } else if (element.code === 202) {
            this.$Message.error('审核失败')
          }
          this.handleSearch()
        })
      } else {
        this.$Message.error('操作失败')
      }
    },
    handleCurrentChange(num) {
      this.loading = true
      this.queryData.pageNo = num
      this.getListData()
    },
    handlePageSize(size) {
      this.loading = true
      this.queryData.pageNo = 1
      this.queryData.pageSize = size
      this.getListData()
    },
    getListData() {
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
      this.getAuditCollection(data).then(() => {
        this.loading = false
      })
    },
    handleDateChange(val) {
      this.dateTime = []
      this.disabled = false
    },
    handleSearch() {
      this.loading = true
      this.getListData()
    },
    handleClear() {
      this.queryData = {
        pageNo: 1,
        pageSize: 10,
        status: '',
        payMethod: '',
        bankAccount: '',
        orderInfo: '',
        paymentId: '',
        payInfo: '',
        timeType: '',
        startDate: '',
        endDate: ''
      }
      this.dateTime = []
      this.$nextTick(() => {
        this.disabled = true
      })
      this.loading = true
      this.getListData()
    }
  },
  computed: {
    ...mapState({
      auditListData: state => state.finance.auditListData
    })
  }
}
</script>

<style lang="less" scoped>
</style>


