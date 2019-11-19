<template>
  <div class="refund_manage">
   <Card>
     <div class="refund_header">
        <Row :gutter="10" class="row_bottom" type="flex">
            <Col class="row_bottom_10 col2">
            <Button type="primary" class="bt_btn" @click="startrefundClick">发起退费</Button>
            </Col>
            <Col span="4" class="row_bottom_10">
               <Select v-model="searchData.status" placeholder="状态" :multiple="true" class="sel" clearable >
                  <Option
                    :title="item.label"
                    v-for="item in statusData"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" class="row_bottom_10">
               <Select v-model="searchData.types" placeholder="退费类型" :multiple="false" class="sel" clearable >
                  <Option
                    :title="item.label"
                    v-for="item in refundType"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" class="row_bottom_10">
              <Input v-model="searchData.orderno" placeholder="订单号/订单内容/课程id" class="sel" />
            </Col>
            <Col span="4" class="row_bottom_10">
              <Input v-model="searchData.infor" placeholder="姓名/uid/手机号/身份证号" class="sel" />
            </Col>
            <Col span="2" class="row_bottom_10">
               <Select v-model="searchData.timer" placeholder="创建时间" :multiple="false" class="sel" clearable >
                  <Option
                    :title="item.label"
                    v-for="item in timeType"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" class="row_bottom_10">
            <div class="choose_date_box">
              <DatePicker type="daterange" placeholder="请选择时间" ref="dateStart" split-panels @on-change="dateChange"></DatePicker>
            </div>
            </Col>
            <Col span="4" class="row_bottom_10">
              <Button type="primary" icon="ios-search" class="search" @click="searchClick">搜索</Button>
              <Button class="clear" @click="clearClick">清除</Button>
               <Button type="primary" icon="ios-paper-plane-outline" class="export"   @click="exportClick">导出数据</Button>
            </Col>
        </Row>

     </div>
      <div class="refund_body" id="table-stage-list">
        <Table border :columns="table.tableColumns" :data="tableData" :height="baseHeight" :loading="tloading"></Table>
        <div class="page_box">
          <Page :total="totalPage" show-sizer :current="currentPage" :page-size-opts="[10,20,30,40,100,200]" show-elevator show-total :page-size="pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange" />
        </div>
      </div>
   </Card>
   <!-- 发起退费弹窗 -->
    <Modal v-model="btOrderModel" title="发起退费" :mask-closable="false" width="700" :styles="{top:'50px'}" @on-visible-change="moduleChange" @on-ok="syncOK"
        @on-cancel="cancel">
        <div class="model_box">
          <div class="student_box">
            <Input v-model="memberinfo" placeholder="请输入学员uid/手机号/邮箱" style="width: 200px" class="sel" />
            <Button type="primary" class="demand_stuinfo" @click="inquireInfo">查询学员订单</Button>
            <p class="red_content">{{message}}</p>
          </div>
          <div class="tb_content">
              <Table border :columns="table.modelColumns" :data="modelData" :height="200" :loading="tloading"></Table>
          </div>
          <div class="bt_type_box">
            <!-- <Form ref="" :model="" :rules="" inline>
              <FormItem label="退费类型">
                <RadioGroup class="bt_type_group" @on-change="btRadioChange" v-model="bt_type">
                  <Radio label="课程退学退" ></Radio>
                  <Radio label="多交学费退" ></Radio>
                  <Radio label="预交学费退" ></Radio>
                </RadioGroup>
              </FormItem>
            </Form> -->
            <h6>退费类型:</h6>
            <RadioGroup class="bt_type_group" @on-change="btRadioChange" v-model="bt_type" >
              <Radio label="课程退学退" ></Radio>
              <div class="promptBox">
                <Icon type="ios-help-circle-outline" />
                <div class="prompt" >
                  <p>课程退学：</p>
                  <p>课程服务期开始的订单可选择课程退学</p>
                </div>
              </div>
              <Radio label="多交学费退" ></Radio>
              <div class="promptBox">
                <Icon type="ios-help-circle-outline" />
                <div class="prompt" >
                  <p>多交学费：</p>
                  <p>支付状态为支付超额，可选择多交学费</p>
                </div>
              </div>
              <Radio label="预交学费退" ></Radio>
              <div class="promptBox">
                <Icon type="ios-help-circle-outline" />
                <div class="prompt">
                  <p>预交学费：</p>
                  <p>报名费、课程服务期未开始的订单可选择</p>
                </div>
              </div>
            </RadioGroup>
          </div>
           <div class="freeTotal bt_bottom" v-if="type==1">
            <Row>
             <Col span="8"><span class="inferTitle">已交学费:</span><span>1000元</span></Col>
             <Col span="8"><span class="inferTitle">应交学费:</span><span>1000元</span></Col>
             </Row>
           </div>
          <div class="serverTotal bt_bottom" v-if="type==1">
              <Row>
              <Col span="8"><span class="inferTitle">总服务期:</span><Input v-model="tablemodelData.totalserverday" style="width:60px" placeholder="" class="sel" /> 天</Col>
              <Col span="8"><span class="inferTitle">剩服务期:</span><Input v-model="tablemodelData.residueserverday" style="width:60px" placeholder="" class="sel" /> 天</Col>
              </Row>
           </div>
          <div class="refundTotal bt_bottom">
              <Row>
              <Col span="8"><span class="inferTitle">退费金额:</span><span>10000元</span></Col>
              </Row>
           </div>
          <div class="refundReason bt_bottom" v-if="type==1||type==3">
              <Row>
              <Col span="2">
                 <span style="font-weight:600">退费原因:</span>
              </Col>
              <Col span="13" style="margin-left:6px;">
                  <Cascader :data="reasondata"></Cascader>
               </Col>
              </Row>
           </div>
           <div class="otherReason bt_bottom" v-if="type==1||type==3">
              <Row>
              <Col span="15">
                <Input v-model="tablemodelData.reamark" type="textarea" :rows="2" class="remark_inp" style="width:95.4%;"  placeholder="选择其他，请填写具体原因" @on-change="wordsChange" />
              </Col>
              </Row>
           </div>
          <div class="chargeInfer bt_bottom">
              <Row>
              <Col span="2">
                 <span style="font-weight:600">收款信息:</span>
              </Col>
              <Col span="13" style="margin-left:6px;">
                <Cascader :data="reasondata"></Cascader>
              </Col>
              </Row>
           </div>
           <div>
           <div class="bt_bottom">
             <Row>
                <Col span="8"><Input v-model="tablemodelData.name" style="width:50%;margin-left:60px" placeholder="姓名" class="sel" /></Col>
                <Col span="8"><Input v-model="tablemodelData.bank" style="width:200px;" placeholder="开户银行" class="sel" /></Col>
             </Row>
           </div>
          <div class="bt_bottom">
             <Row>
                <Col span="8"><Input v-model="tablemodelData.Unionpay" style="width:50%;margin-left:60px" placeholder="银行银联号" class="sel" /></Col>
                <Col span="8"><Input v-model="tablemodelData.account" style="width:200px" placeholder="账号" class="sel" /></Col>
             </Row>
           </div>
           <div class="confirm_infor">
             <span>退费订单状态为已支付或支付超额，则发起退费后，学员学习中心的课程冻结，无法继续学习（或者签订协议）</span>
           </div>
          <!-- <div class="btn_box">
              <Button class="sub" type="primary" @click="subClick" :loading="sloading">提交</Button>
              <Button @click="cancleClick">取消</Button>
          </div> -->

           </div>
      </div>
          
    </Modal>
    <!-- 退费单信息弹窗 -->
    <Modal
        width="60%"
        title="退费单信息"
        v-model="refundaDetailModalFlag"
        class-name="vertical-center-modal"
        :mask-closable="false"
        @on-ok="syncOK"
        @on-cancel="cancel">
          <detailsModal v-if="refundaDetailModalFlag"></detailsModal>
    </Modal>
    <!-- 撤回信息弹窗 -->
    <Modal
      v-model="recallModal"
      title="提示"
      @on-ok="recallOk"
      @on-cancel="recallCancel">
      <h3 style="text-align: center" >确定撤回退费单？</h3>
      <p class="margin-top-20 red" style="text-align: center">撤回退费单后，课程解除冻结</p>
    </Modal>
     
  </div>

</template>

<script>
  import util from '@/util/util.js'
  import detailsModal from "./refund-details-modal";
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  import configapi from '@/config/apiconfig'
  import api from '@/api'
  export default {
    components: {
      detailsModal,
    },
    data() {
        const hasstatus_put = this.hasSomeApiAccess('sales_deposits_templates_status_put');  //查看
        const hasmessgae_post = this.hasSomeApiAccess('sales_deposits_templates_status_put');  //撤回
        const hasbulorders_detail = this.hasSomeApiAccess('sales_imports_orders_detail');  //查看订单内容
        const hasbulorders_users = this.hasSomeApiAccess('sales_imports_orders_users');  //查看学员UID
   
       return {
        baseHeight:0,
        totalPage: 1,
        currentPage: 1,
        pageSize: 10,
        tloading:false,
        btOrderModel:false,//弹窗是否展示
        refundaDetailModalFlag:false,
        recallModal:false,//撤回弹窗
        memberinfo:'', //学员信息
        bt_type:"",
        datalist:[],
        sloading:false,
        reamark:"",
        type:1,
        message:"",
        tableData:[],
        modelData:[],
        statusData: [{
            value: '0',
            label: '已发起'
          },
          {
            value: '1',
            label: '已撤回'
          },
          {
            value: '2',
            label: '已退费'
          }
        ],
        refundType: [{
            value: '0',
            label: '课程退学退'
          },
          {
            value: '1',
            label: '多交学费退'
          },
          {
            value: '2',
            label: '预交学费退'
          }
        ],
        timeType: [{
            value: '0',
            label: '创建时间'
          },
          {
            value: '1',
            label: '退费时间'
          },
        ],
        refundreason:[
         {
            value: '0',
            label: '个人原因'
          },
          {
            value: '1',
            label: '公司原因'
          },
        
        ],
        reasondata:[
          {
              value: 0,
              label: '个人原因', 
              children: [
                  {
                      value: 0,
                      label: '个人_不想学/没有兴趣/学不会'
                  },
                  {
                      value: 1,
                      label: '个人_报名其他机构'
                  },
                  {
                      value: 2,
                      label: '个人_考研/升本/其他考试'
                  },
                   {
                      value: 3,
                      label: '个人_生病/怀孕'
                  },
                  {
                      value: 4,
                      label: '个人_资金困难/资金困难贷款未通过'
                  },
                  {
                      value: 5,
                      label: '个人_自学'
                  },
                   {
                      value: 6,
                      label: '家庭_家人不支持'
                  },
                   {
                      value: 7,
                      label: '家庭_家人患病'
                  },
                   {
                      value: 8,
                      label: '家庭_家里有事'
                  },
                   {
                      value: 9,
                      label: '学校_学校补助没有'
                  },
                   {
                      value: 10,
                      label: '学校_学校合作其他培训机构'
                  },
                   {
                      value: 11,
                      label: '学校_学校要返校学习及考试'
                  },
                   {
                      value: 12,
                      label: '工作_找到工作'
                  },
                   {
                      value: 13,
                      label: '工作_不打算从事IT行业'
                  },
                  {
                      value: 14,
                      label: '工作_公司安排有变化'
                  },
                  {
                      value: 15,
                      label: '其他'
                  },
              ]
          },{
            value: 1,
            label: '公司原因', 
            children: [
                  {
                      value: 0,
                      label: '课程取消'
                  },
                  {
                      value: 1,
                      label: '课程调整'
                  },
                  {
                      value: 2,
                      label: '其他教学服务不满意'
                  },
                   {
                      value: 3,
                      label: '其他'
                  },
              ] 
          }
        ],
        searchData:{
          status:'0',
          types:'-1',
          orderno:'',
          infor:'',
          timer:0
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
          bank:"",
          Unionpay:'',
          account:""

        },
        table: {
          tableColumns: [{
              title: '序号',
              key: 'num',
              width: 60,
              align: 'center',
              render: (h, params) => {
                return h(
                  'span',
                  params.index + 1 + this.pageSize * (this.currentPage - 1)
                )
              }
            },
            {
              title: 'OA单号',
              key: 'orderNo',
              width: 200,
              align: 'left'
            },
            {
              title: '状态',
              key: 'payStatus',
              width: 100,
              align: 'left'
            },
            {
              title: '退费类型',
              key: 'refundtype',
              width: 100,
              align: 'left'
            },
            {
              title: '退费订单号',
              key: 'orderNo',
              width: 200,
              align: 'left'
            },
            {
              title: '退费订单内容',
              key: 'orderContent',
              width: 200,
              align: 'left',
              render: (h, params) => {

              let $orderbulmains = null; //查看订单内容
                  if(hasbulorders_detail){
                    $orderbulmains =  h(
                      'div', {
                        style: {
                          color: '#2d8cf0',
                          cursor: 'pointer'
                        },
                        on: {
                          click: () => {
                            this.orderConHandle(params.row.orderNum)
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
              title: '退费金额',
              key: 'orderNum',
              width: 120,
              align: 'right'
            },
            {
              title: '退费学员uid',
              key: 'uid',
              width: 110,
              align: 'center',
              render: (h, params) => {

              let $xueyuanid = null; //查看学员UID
              $xueyuanid = h(
                    'div', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.uidHandle(params.row.uid,params.row.userId)
                        }
                      }
                    },
                    params.row.uid
                  )
              // if(hasorders_users){
              //   $xueyuanid = h(
              //       'div', {
              //         style: {
              //           color: '#2d8cf0',
              //           cursor: 'pointer'
              //         },
              //         on: {
              //           click: () => {
              //             this.uidHandle(params.row.uid,)
              //           }
              //         }
              //       },
              //       params.row.uid
              //     )
              // }else{
              //   $xueyuanid = h(
              //       'div', {
              //         style: {
              //           color: '',
              //         }
              //       },
              //       params.row.uid
              //     )
              // }
              return h('div', [ $xueyuanid ]);
              }
            },
            {
              title: '退费单创建时间',
              key: 'btTime',
              width: 150,
              align: 'center'
            },
            {
              title: '退费单创建人',
              key: 'bter',
              width: 150,
              align: 'left'
            },
            {
              title: '退费打款时间',
              key: 'btTime',
              width: 150,
              align: 'center'
            },
            {
              title: '退费人',
              key: 'name',
              width: 80,
              align: 'center'
            },
            {
          title: '操作',
          key: 'status',
          fixed: 'right',
          width: 150,
          render: (h, params) => {

          let $prohibitButton = null; //预报名费模板-禁用
          let $noticeButton = null; //预报名费模板-发送通知

          if (hasstatus_put) {
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
          }

          if (hasmessgae_post) {
              $noticeButton =  h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.recallModal =!this.recallModal
                      console.log('params.row',params.row)
                   
                     
                    }
                  }
                },
                '撤回'
              )
          }

          return h("div", [ $prohibitButton, $noticeButton ]);

          }
        }
        ],
    
        
         modelColumns: [{
              title: '选择',
              key: 'nums',
              width: 100,
              align: 'center',
              render: (h, params) => {
                   console.log(params,'params')
                return h(
                  'Radio',
                  {
                    props:{
                      value :params.row.tag
                    },
                    on:{
                      input:()=>{
                        this.modelData.map(item=>{
                          this.$set(item,'tag',false)
                        })
                        console.log('this.table.modelData',this.modelData)
                        console.log('params.index',params.index)
                        this.modelData[params.index].tag = true
                        if(this.modelData[params.index].orderType==-1){
                              this.type=3
                              this.bt_type = '预交学费退'
                        }else if(this.modelData[params.index].orderType==0){
                              this.type=1
                              this.bt_type = '课程退学退'
                        }
                      

                      }

                    }
                  }
           
                )
              }
         
            },
            {
              title: '类型',
              key: 'orderType',
              width: 100,
              align: 'left'
            },
            {
              title: '订单内容/单据内容',
              key: 'orderContent',
              width: 140,
              align: 'left'
            },
            {
              title: '订单支付状态',
              key: 'orderStatus',
              width: 120,
              align: 'right'
            },
            {
              title: '服务期是否开始',
              key: 'isstart',
              width: 150,
              align: 'left'
            },
            {
              title: '订单金额',
              key: 'orderAmount',
              width: 200,
              align: 'left',
            },
            {
              title: '实收金额',
              key: 'orderNum',
              width: 120,
              align: 'right'
            },
            {
              title: '最后支付时间',
              key: 'endTime',
              width: 150,
              align: 'right',
            },
          ],
        },
       }
    },
    methods: {
     ...mapActions([
        'getrefundmanageOrderList',
        'getStudentInfoList',
      ]),
      startrefundClick(){
        this.btOrderModel =true

      },
      dateChange(){

      },
      // 搜索
      searchClick(){

      },
      // 清除
      clearClick(){

      },
      // 导出数据
      exportClick(){

      },
      //弹窗
      moduleChange(){

      },
      // 分页
      pageChange(page){
        this.currentPage = page
         this._pageChange()

      },
      pageSizeChange(){
        this.pageSize = pageSize
        this._pageChange()
      },
      _pageChange(){
        let obj = {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
          Object.assign(obj, this.searchData)
       
          for (let k in obj) {
            if (!obj[k] && obj[k] != '0') {
              obj[k] = null
            }
            if (k === 'status') {
              if (obj[k]) obj[k] = obj[k].join(',')
            }
          }
             console.log('obj',obj)
          this._initState(obj)
      },
     async inquireInfo(){
        if (!this.memberinfo) {
            this.$Message.error('请输入学员信息')
            return
          }
        
        await this.getStudentInfoList({
            buyer: this.memberinfo
          })
           let state = this.studentInfo
        if (state.status === 404 || !state.result) {
          // this.isEmpty = true
          // this.stuInfo.forEach(e => {
          //   e[e.value] = ''
          // })
          // this._clearSelect()
        } else if (state.status === 200) {
          let result = state.result
          // console.log('result.length',result.length)
          if( result.list.length==0){
            this.message = '查询无可退费的订单信息，请重新输入！'
          }
          let member = [];
          if(result.list.length>0){
             this.message = '学员姓名_uid_15101080951'
             result.list.forEach((e, i) => {
                  let newInfo = {}
                  Object.assign(newInfo, {
                        orderType:e.payStatus,
                        orderContent:e.orderContent,
                        orderStatus:e.payStatus,
                        isstart:e.orderStauts,
                        orderAmount:e.paidAmount,
                        orderNum:e.paidAmount,
                        endTime:e.paidAmount
                  })
                member.push(newInfo)
                })
                this.modelData = member
                console.log('member==>',this.modelData)
          }
        }
      },
      btRadioChange(val){
        if(val==='课程退学退'){
          this.type =1
        }else if(val==='多交学费退'){
          this.type =2
        }else{
          this.type =3
        }
      },
      // 取消弹窗
      cancleClick(){
         this.btOrderModel =false
      },
      // 提交弹窗
      subClick(){

      },
      syncOK() {},
      cancel() {},
      recallOk(){},
      recallCancel(){},//撤回弹窗取消
      wordsChange(){
      },
      async _initState(
        obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          dateStauts: this.searchData.dateStauts
        }
      ){
        await this.getrefundmanageOrderList(obj)
        let result = this.refundOrderlist
        // console.log("result",result)
        if (!result) return
        this.totalPage = result.total
                let arr = []
        result.list.forEach((e, i) => {
          let newData = {}
          if (e.payStatus === 0) {
            e.payStatus = '已发起'
          } else if (e.payStatus === 1) {
            e.payStatus = '已撤回'
          } else if (e.payStatus === 2) {
            e.payStatus = '已退费'
          } 
          Object.assign(newData, {
            orderNo: e.orderNo,
            payStatus: e.payStatus,
            refundtype: e.payStatus,
            subject: e.menuName,
            orderContent: e.courseName,
            orderNum: e.orderNo,
            uid: e.uid,
            name: e.name,
            bter: e.creator,
            btTime: e.createTime,
            classPrice: e.coursePrice,
            discounts: e.discountAmount,
            orderPrice: e.orderAmount,
            chargePrice: e.chargeAgainstAmount,
            paidPrice: e.paidAmount,
            unpaidPrice: e.nonPayment,
            realityPrice: e.actualAmount,
            lastPayTime: e.payTime ? e.payTime : '-',
            userId: e.userId
          })
          arr.push(newData)
        })
        console.log('arr===>',arr)
        this.tableData = arr
        this.tloading = false
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

    },
    computed: {
      ...mapState({
        refundOrderlist: state => state.refundManagement.refundOrderlist,
        studentInfo:state => state.refundManagement.studentInfo,
      })
    },
    created() {
       this._initState()

    },
    mounted() {
     //获取table-height
      this.$nextTick(()=> {
        let dom = document.getElementById("table-stage-list");
        this.baseHeight = util.baseHeight(dom, 82);
      })
    }
  }
</script>

<style lang="less" scoped>
.refund_manage{
  .refund_header{
    .row_bottom{
      .row_bottom_10{
        margin-bottom: 10px;
      }
    }
  }
  .refund_body{
    .page_box{
        margin: 20px 0 10px 0;
        display: flex;
        justify-content: flex-end;
    }
  }

}
.model_box{
  .student_box{
    margin-bottom: 20px;
    .demand_stuinfo{
      margin-left: 20px;
    }
    .red_content {
    position: absolute;
    width: 230px;
    color: red;
    right: 80px;
    top: 75px;
  }
  }
  .bt_bottom{
      margin-bottom: 20px;
      .inferTitle{
        font-weight: 600;
        margin-right: 5px;
     
      }
  }
  .otherReason{
    margin-left: 60px;
  }
  .confirm_infor{
    color:red;
  }
  .bt_type_box {
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    .bt_type_group {
      padding-left:8px;
      .ivu-radio-wrapper{
        margin-right:0;
      }
      
      .promptBox{
        display: inline-block;
        position: relative;
        margin-right: 10px;
        i{
          font-size:16px;
        }
        &:hover {
          .prompt{
            display: block;
          }
        }
        .prompt{
          display: none;
          width:250px;
          padding:10px;
          box-shadow: 0 0 5px -1px rgba(0,0,0,.5);
          position: absolute;
          top:0;left:18px;
          color:#333;
          background:#fff;
          z-index:1;
          border-radius: 5px;
          p:nth-of-type(1){
            font-weight: bold;
          }
        }
      }
    }
  }
    .btn_box {
      margin-top: 40px;
      display: flex;
      justify-content: flex-end;
      .sub {
        margin-right: 20px;
      }
    }
}







  // .back_tracking_order /deep/ .ivu-btn-icon-only{
  //   padding: 0 13px 0;
  //   font-size: 19px;
  // }
</style>


