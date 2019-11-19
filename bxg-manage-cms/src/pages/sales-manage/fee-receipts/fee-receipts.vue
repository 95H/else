<template>
    <div>
         <Row>
            <Col span="24">
                 <Card>
                     <Row :gutter="10" class="m-b20">
                         <Col span="4">
                          <Select v-model="queryData.depositStatus" placeholder="单据状态" clearable>
                                <Option :value="0">未生效</Option>
                                <Option :value="1">已生效</Option>
                                <Option :value="-1">已关闭</Option>
                                <Option :value="2">已使用</Option>
                            </Select>
                         </Col>
                         <Col span="4">
                          <Select v-model="queryData.paymentStatus" placeholder="支付状态" clearable>
                                <Option :value="0">未支付</Option>
                                <Option :value="1">已支付</Option>
                                <Option :value="-1">已退费</Option>
                            </Select>
                         </Col>
                          <Col span="4">
                          <Select v-model="queryData.paymentMethod" placeholder="支付方式" clearable>
                                <Option :value="'WEIXIN'">微信</Option>
                                <Option :value="'ALIPAY'">支付宝</Option>
                                <Option :value="'TRANSFER'">对公转账</Option>
                                <Option :value="'WALLET'">通联钱包</Option>
                                <Option :value="'POS'">POS机</Option>
                                <Option :value="'YWT'">招行一网通</Option>
                            </Select>
                         </Col>
                         <Col span="4">
                          <Select v-model="queryData.depositTerminal" placeholder="下单终端" clearable>
                                <Option :value="0">PC官网</Option>
                                <Option :value="1">微信</Option>
                                <Option :value="2">App</Option>
                                <Option :value="3">移动官网</Option>
                                <Option :value="4">线下导入</Option>
                            </Select>
                         </Col>
                         <Col span="4">
                         <Select v-model="queryData.paymentTerminal" placeholder="支付终端" clearable>
                                <Option :value="0">PC官网</Option>
                                <Option :value="1">微信</Option>
                                <Option :value="2">App</Option>
                                <Option :value="3">移动官网</Option>
                                <Option :value="4">线下导入</Option>
                            </Select>
                         </Col>
                     </Row>
                     <Row :gutter="10">
                          <Col span="4">
                           <Input v-model="queryData.userAccount" placeholder="用户UID/用户手机号" />
                         </Col>
                         <Col span="4">
                             <Input v-model="queryData.depositInfo" placeholder="单据号/单据内容" />
                         </Col>
                         <Col span="2">
                         <Select v-model="queryData.timeType" placeholder="支付时间" clearable>
                                <Option :value="1">下单时间</Option>
                                <Option :value="2">支付时间</Option>
                            </Select>
                         </Col>
                         <Col v-if="queryData.timeType===1" span="8">
                           <DatePicker
                            type="datetime"
                            v-model="queryData.createTimeStart"
                            format="yyyy-MM-dd HH:mm"
                            placeholder="开始日期"
                            ></DatePicker>
                            <span>-</span>
                             <DatePicker
                            type="datetime"
                            v-model="queryData.createTimeEnd"
                            format="yyyy-MM-dd HH:mm"
                            placeholder="开始日期"
                            ></DatePicker>
                         </Col>
                          <Col v-else-if="queryData.timeType===2" span="8">
                           <DatePicker
                            type="datetime"
                            v-model="queryData.paymentTimeStart"
                            format="yyyy-MM-dd HH:mm"
                            placeholder="开始日期"
                            ></DatePicker>
                            <span>-</span>
                             <DatePicker
                            type="datetime"
                            v-model="queryData.paymentTimeEnd"
                            format="yyyy-MM-dd HH:mm"
                            placeholder="开始日期"

                            ></DatePicker>
                         </Col>
                         <Col span="6">
                           <span @click="handleSearch" style="margin-right:8px;"><Button type="primary" icon="md-search">搜索</Button></span>
                             <span v-if="hasSomeApiAccess('sales_deposits_invoices_data')" @click="handleDataExport" style="margin-right:8px;"><Button type="primary" icon="md-paper-plane">数据导出</Button></span>
                            <Button @click="handleClear">清除</Button>
                         </Col>
                     </Row>
                      <Row class="m-t20" id="table-stage-list">
                        <Col span="24">
                         <Table class="tablebox" :height="baseHeight"  border :columns="columns" :data="pageData.data"></Table>
                        </Col>
                        <Col span="24" class="m-t20">
                             <Page placement="top" style="text-align: right;" :total="pageData.total" :page-size="pageSize" :page-size-opts="arrPage" @on-change="handleCurrentChange" @on-page-size-change="handlePageSize" :current="pageData.pageNum" show-total show-elevator show-sizer></Page>
                        </Col>
                      </Row>
                 </Card>
            </Col>
         </Row>
           <Modal
            width="60%"
            title="预报名费单据详情"
            v-model="detailsModalFlag"
            class-name="vertical-center-modal"
            :mask-closable="false"
            @on-ok="syncOK"
            @on-cancel="cancel">
              <detailsModal v-if="detailsModalFlag" :depositId="depositId" :uid="uid"></detailsModal>
          </Modal>
             <refund-modal
              ref="refundElm"
              :isRefundModal.sync="isRefundModal"
              :refundState="refundState"
              :refundObj="refundObj"
              @handleRefresh="handleRefresh"
              >
          </refund-modal>
          <course-modal
          ref="courseFlag"
          :courses="courses"
          @handleRefresh="handleRefresh"
          >
          </course-modal>
          <history-modal
          ref="historyFlag"
          >

          </history-modal>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dateUtil from "iview/src/utils/date";
import detailsModal from "./details-modal";
import refundModal from "./refund-modal";
import courseModal from "./course-modal";
import historyModal from "./history-modal";
import api from "@/api/index";
import util from '@/util/util'
import url from "@/config/apiconfig.js";
export default {
  name: "fee-receipts",
  components: {
    detailsModal,
    refundModal,
    courseModal,
    historyModal
  },
  data() {

    const hasinvoices_detail = this.hasSomeApiAccess('sales_deposits_invoices_detail');  //查看单据内容
    const hasinvoices_refunds = this.hasSomeApiAccess('sales_deposits_invoices_refunds_post');  //退费
    const hascourses_put = this.hasSomeApiAccess('sales_deposits_invoices_courses_put');  //更换课程
    const hascourses_logs = this.hasSomeApiAccess('sales_deposits_invoices_courses_logs');  //更换历史
    const hasinvoices_xiangqing = this.hasSomeApiAccess('sales_deposits_invoices_refunds');  //退费详情
    
    return {
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      detailsModalFlag: false,
      isRefundModal: false,
      refundState: "",
      refundObj: {},
      courses: {},
      depositId: "",
      uid: "",
      pageNum: 1,
      pageSize: 10,
      queryData: {
        depositStatus: "", //单据状态
        paymentStatus: "", //支付状态
        paymentMethod: "", //支付方式
        depositTerminal: "", //下单终端
        userAccount: "", //用户uid，用户名以及用户登录名
        depositInfo: "", //单据号/单据内容
        timeType: "", //支付类型时间
        createTimeStart: "", //创建时间
        createTimeEnd: "", //创建结束
        paymentTimeStart: "", //开始支付
        paymentTimeEnd: "" //结束支付
      },
      columns: [
        {
          title: "序号",
          type: "",
          align: "center",
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index + (this.pageNum - 1) * this.pageSize + 1
            )
          }
        },
        {
          title: "单据内容",
          key: "depositName",
          width: 300,
          render: (h, params) => {
            let bill;
            if (hasinvoices_detail) {
              bill= h(
                "strong",
                {
                  props: {},
                  style: {
                    color: "#2d8cf0",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.depositId = params.row.id;
                      this.uid = params.row.uid;
                      this.detailsModalFlag = true;
                    }
                  }
                },
                params.row.depositName
              )
            } else {
              bill = h(
                "strong",
                {
                  props: {},
                  style: {
                    color: "",
                  }
                },
                params.row.depositName
              )
            }
            
            return h("div", [
              bill
            ]);
          }
        },
        {
          title: "单据号",
          key: "serialNo",
          align: "right",
          width: 180
        },
        {
          title: "用户UID",
          key: "uid",
          align: "right",
          width: 100
        },
        {
          title: "用户手机号",
          key: "mobile",
          align: "right",
          width: 110
        },
        {
          title: "下单终端",
          key: "depositTerminalDesc",
          width: 100
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "right",
          width: 150
        },
        {
          title: "预报名费金额",
          key: "amount",
          align: "right",
          width: 120,
          render: (h, params) => {
            return h(
              "span",
              {
                props: {}
              },
              params.row.amount ? params.row.amount : 0
            );
          }
        },
        {
          title: "支付方式",
          key: "paymentMethodDesc",
          width: 100
        },
        {
          title: "支付终端",
          key: "paymentTerminalDesc",
          width: 100
        },
        {
          title: "支付时间",
          key: "paymentTime",
          align: "right",
          width: 200
        },
        {
          title: "支付状态",
          key: "paymentStatusDesc",
          width: 100
        },
        {
          title: "尾款订单号",
          key: "associatedOrderId",
          align: "right",
          width: 180
        },
        {
          title: "归属人",
          key: "userName",
          width: 180
        },
        {
          title: "单据状态",
          key: "depositStatusDesc",
          width: 100,
          render: (h, params) => {
            return h(
              "div",
              {
                class: `ivu-tag-dot ivu-tag-${
                  params.row.depositStatus == 1
                    ? "primary"
                    : params.row.depositStatus == 2
                      ? "success"
                      : params.row.depositStatus == 0
                        ? "error"
                        : "warning"
                }`
              },
              [
                h("span", {
                  class: "ivu-tag-dot-inner",
                  props: {}
                }),
                h(
                  "span",
                  {
                    class: "ivu-tag-text",
                    props: {}
                  },
                  params.row.depositStatusDesc
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 230,
          render: (h, params) => {
            if (
              params.row.paymentStatus === 1 &&
              params.row.depositStatus === 1
            ) {
              
              let $tuifeiButton = null; //退费
              let $kechengButton = null; //更换课程
              let $lishiButton = null; //更换历史
              
              if (hasinvoices_refunds) {
                  $tuifeiButton = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                        // disabled:
                        //   this.keycloak.roles.indexOf("财务") > -1 ? false : true
                      },
                      style: {
                        marginRight: "10px"
                      },
                      // class:
                        // this.keycloak.roles.indexOf("财务") > -1 ? `` : `hide`,
                      on: {
                        click: () => {
                          this.isRefundModal = !this.isRefundModal;
                          this.refundState = "refund";
                          this.refundObj = {
                            uid: params.row.uid,
                            depositId: params.row.id,
                            amount: params.row.amount
                          };
                        }
                      }
                    },
                    "退费"
                  )
              }
              if(hascourses_put){
                  $kechengButton = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "10px"
                      },
                      on: {
                        click: () => {
                          this.$refs.courseFlag.modal = true;
                          this.courses = {
                            depositId: params.row.id,
                            beforeCourseId: params.row.courseId,
                            courseName: params.row.courseName
                          };
                          this.$refs.courseFlag.getQueryCondition4ChangeCourse();
                        }
                      }
                    },
                    "更换课程"
                  )
              }
              if(hascourses_logs){
                  $lishiButton = h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.$refs.historyFlag.modal = true;
                          this.$refs.historyFlag.getCourselogs(params.row.id);
                        }
                      }
                    },
                    "更换历史"
                  )
              }
              return h("div", [ $tuifeiButton, $kechengButton, $lishiButton ]);

            } else if (
              params.row.paymentStatus === -1 &&
              params.row.depositStatus === -1
            ) {

              let $tuifeixianqButton = null; //退费详情

              if (hasinvoices_xiangqing) {
                  $tuifeixianqButton = h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        this.isRefundModal = !this.isRefundModal;
                        this.refundState = "refundDetails";
                        this.$refs.refundElm.refundDetailFn({
                          uid: params.row.uid,
                          depositId: params.row.id
                        });
                      }
                    }
                  },
                  "退费详情"
                )
              }
              return h("div", [ $tuifeixianqButton ]);

            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      marginRight: "10px"
                    }
                  },
                  "--"
                )
              ]);
            }
          }
        }
      ]
    };
  },
  mounted() {
    this.fetchListData({
      pageNum: this.pageNum,
      pageSize: this.pageSize
    });
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions(["getDepositList"]),
    fetchListData(params) {
      this.getDepositList(params);
    },
    handleRefresh() {
      this.fetchListData({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      });
    },
    syncOK() {},
    cancel() {},
    handleSearch() {
      let params = this.felterQuery(this.queryData);
      if (params.createTimeStart) {
        params.createTimeStart = dateUtil.format(
          params.createTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.createTimeEnd) {
        params.createTimeEnd = dateUtil.format(
          params.createTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeStart) {
        params.paymentTimeStart = dateUtil.format(
          params.paymentTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeEnd) {
        params.paymentTimeEnd = dateUtil.format(
          params.paymentTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      this.fetchListData(params);
    },
    felterQuery(obj) {
      let query = Object.assign(
        {
          pageNum: (this.pageNum = 1),
          pageSize: this.pageSize
        },
        obj
      );
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          const val = query[key];
          if (val === "" || val === undefined) {
            delete query[key];
          }
        }
      }
      return query;
    },
    handleDataExport() {
      let params = this.felterQuery(this.queryData);
      if (params.createTimeStart) {
        params.createTimeStart = dateUtil.format(
          params.createTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.createTimeEnd) {
        params.createTimeEnd = dateUtil.format(
          params.createTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeStart) {
        params.paymentTimeStart = dateUtil.format(
          params.paymentTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeEnd) {
        params.paymentTimeEnd = dateUtil.format(
          params.paymentTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      let queryString = "";
      for (let item in params) {
        queryString += `${item}=${params[item]}&`;
      }
      queryString = queryString.slice(0, queryString.length - 1);
      window.location = `${
        url.bmfUrl
      }/deposit/exportDepositData?${queryString}`;
    },
    handleClear() {
      this.queryData = {
        depositStatus: "", //单据状态
        paymentStatus: "", //支付状态
        paymentMethod: "", //支付方式
        depositTerminal: "", //下单终端
        userAccount: "", //用户uid，用户名以及用户登录名
        depositInfo: "", //单据号/单据内容
        timeType: "", //支付类型时间
        createTimeStart: "", //创建时间
        createTimeEnd: "", //创建结束
        paymentTimeStart: "", //开始支付
        paymentTimeEnd: "" //结束支付
      };
      this.fetchListData({
        pageNum: (this.pageNum = 1),
        pageSize: (this.pageSize = 10)
      });
    },
    handleCurrentChange(num) {
      this.pageNum = num;
      let params = Object.assign({}, this.queryData);
      if (params.createTimeStart) {
        params.createTimeStart = dateUtil.format(
          params.createTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.createTimeEnd) {
        params.createTimeEnd = dateUtil.format(
          params.createTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeStart) {
        params.paymentTimeStart = dateUtil.format(
          params.paymentTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeEnd) {
        params.paymentTimeEnd = dateUtil.format(
          params.paymentTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      params = Object.assign(
        {
          pageNum: num,
          pageSize: this.pageSize
        },
        params
      );
      this.fetchListData(params);
    },
    handlePageSize(size) {
      this.pageSize = size;
      let params = Object.assign({}, this.queryData);
      if (params.createTimeStart) {
        params.createTimeStart = dateUtil.format(
          params.createTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.createTimeEnd) {
        params.createTimeEnd = dateUtil.format(
          params.createTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeStart) {
        params.paymentTimeStart = dateUtil.format(
          params.paymentTimeStart,
          "yyyy-MM-dd HH:mm"
        );
      }
      if (params.paymentTimeEnd) {
        params.paymentTimeEnd = dateUtil.format(
          params.paymentTimeEnd,
          "yyyy-MM-dd HH:mm"
        );
      }
      params = Object.assign(
        {
          pageNum: this.pageNum,
          pageSize: size
        },
        params
      );
      this.fetchListData(params);
    }
  },
  computed: {
    ...mapState({
      pageData: state => state.feeReceipts.pageData,
      keycloak: state => state.keycloak.keycloak.realmAccess
    })
  },
  watch: {
    "queryData.timeType": {
      handler(val, oldVal) {
        if (val === 1) {
          this.queryData.paymentTimeStart = "";
          this.queryData.paymentTimeEnd = "";
        } else {
          this.queryData.createTimeStart = "";
          this.queryData.createTimeEnd = "";
        }
      }
      // deep: true
    }
  }
};
</script>

<style lang="less">
.m-b20 {
  margin-bottom: 20px;
}
.m-t20 {
  margin-top: 20px;
}
.Options {
  width: 227px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tablebox {
  .ivu-tag-success,
  .ivu-tag-primary,
  .ivu-tag-error,
  .ivu-tag-warning {
    background: transparent !important;
  }
  .ivu-tag-dot-inner {
    width: 10px !important;
    height: 10px !important;
    margin-right: 4px !important;
  }
  .ivu-tag-dot {
    border: none !important;
    padding: 0 !important;
  }
}
</style>

