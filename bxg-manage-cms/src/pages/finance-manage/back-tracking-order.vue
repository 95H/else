<template>
  <div class="back_tracking_order">
    <Card>
      <div class="bt_header">
        <div class="bt_header_l">
          <Row :gutter="10" class="row_bottom" type="flex">
            <Col class="row_bottom_10 col2">
            <Button type="primary" class="bt_btn" v-if="hasSomeApiAccess('sales_imports_orders_post')" @click="btHandleClick">补录订单</Button>
            </Col>
            <Col span="4" class="row_bottom_10">
            <Select v-model="searchData.menuId" placeholder="学科" :multiple="true" class="sel" clearable @on-change="subjectChange">
                  <Option
                    :title="item.label"
                    v-for="item in subjectListSe"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" class="row_bottom_10">
            <Select v-model="searchData.courseId" placeholder="课程名称" class="sel" :multiple="true" :filterable="true">
                  <Option
                    v-for="item in courseListSe"
                    :value="item.value"
                    :key="item.value"
                    :title="item.label"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" class="row_bottom_10">
            <Select v-model="searchData.orderStatus" placeholder="订单支付状态" class="sel" :multiple="true">
                  <Option
                    v-for="item in orderList"
                    :value="item.value"
                    :key="item.value"
                    :title="item.label"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" class="row_bottom_10">
            <Input v-model="searchData.mark" placeholder="姓名/uid/手机号/身份证号" class="sel" />
            </Col>
            <Col span="4" class="row_bottom_10">
            <Input v-model="searchData.orderMark" placeholder="订单号" class="sel" />
            </Col>
            <Col span="4" class="row_bottom_10">
            <Input v-model="searchData.creator" placeholder="补录人" class="sel" />
            </Col>
            <Col span="4" class="row_bottom_10">
            <Select v-model="searchData.dateStauts" placeholder="补录时间" class="sel">
                  <Option
                    v-for="item in addrecordList"
                    :value="item.value"
                    :key="item.value"
                    :title="item.label"
                  >{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6" class="row_bottom_10">
            <div class="choose_date_box">
              <DatePicker type="daterange" placeholder="请选择时间" ref="dateStart" split-panels @on-change="dateChange"></DatePicker>
              <!-- <DatePicker
                    type="date"
                    placeholder="结束时间"
                    style="width: 200px"
                    ref="dateEnd"
                    @on-change="dateChangeEnd"
                  ></DatePicker> -->
            </div>
            </Col>
            <Col span="8">
            <div class="bt_header_r">
              <Button type="primary" icon="ios-search" class="search" @click="searchClick">搜索</Button>
              <Button class="clear" @click="clearClick">清除</Button>
              <Button type="primary" icon="ios-paper-plane-outline" class="export" v-if="hasSomeApiAccess('sales_imports_orders_data')"  @click="exportClick">导出数据</Button>
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <div class="bt_body" id="table-stage-list">
        <Table border :columns="table.tableColumns" :data="table.tableData" :height="baseHeight" :loading="tloading"></Table>
        <div class="page_box">
          <Page :total="totalPage" show-sizer :current="currentPage" :page-size-opts="[10,20,30,40,100,200]" show-elevator show-total :page-size="pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange" />
        </div>
      </div>
    </Card>
    <Modal v-model="btOrderModel" title="补录订单" :footer-hide="true" :mask-closable="false" width="700" :styles="{top:'50px'}" @on-visible-change="moduleChange">
      <div class="model_box">
        <div class="student_box">
          <Input v-model="bterM" placeholder="请输入学员uid/手机号/邮箱" style="width: 200px" class="sel" />
          <Button type="primary" class="demand_stuinfo" @click="inquireInfo">查询学员信息</Button>
          <p class="red_content">学员贷款支付或线下班级转线上，姓名及身份证号必填</p>
        </div>
        <div class="student_info_box">
          <ul>
            <li class="stu_li" v-for="(item, index) in stuInfo" :key="index">
              <div class="student_item">
                <span class="student_item_l" :style="item.text==='真实姓名'?{height:'40px'}:''">{{item.text}}</span>
                <span v-show="item.text==='绑定手机号'" class="student_item_r">{{item.mobile}}</span>
                <span v-show="item.text==='绑定邮箱'" class="student_item_r">{{item.email}}</span>
                <Input v-show="item.text==='真实姓名' && isHasInfo" v-model="item.name" placeholder="请输入真实姓名" style="width: 150px" class="stu_inp" :disabled="userDisabled" />
                <Input v-show="item.text==='身份证号' && isHasInfo" v-model="item.idcard" placeholder="请输入身份证号" style="width: 150px" class="stu_inp" :disabled="userDisabled" />
                <span v-show="item.text==='UID'" class="student_item_r">{{item.uid}}</span>
                <span v-show="item.text===''" class="student_item_r"></span>
              </div>
            </li>
            <p class="red_id_card" v-show="isIdError">请输入正确的身份证号</p>
            <p class="red_id_card" v-show="isNameError">请输入正确的真实姓名</p>
            <p class="red_id_card" v-show="!stuInfo[0].mobile && isEmpty">无此学员号信息</p>
          </ul>
          <div class="bt_type_box">
            <h6>补录类型:</h6>
            <RadioGroup class="bt_type_group" @on-change="btRadioChange" v-model="bt_type">
              <Radio label="其他"></Radio>
              <Radio label="线下在读班级转线上"></Radio>
            </RadioGroup>
          </div>
          <div class="select_box">
            <Select v-model="seSubject.seSubjectModule" style="width:120px" placeholder="学科" class="select" clearable @on-change="seSubjectChange">
                <Option
                  v-for="item in seSubject.seSubjectList"
                  :value="item.value"
                  :key="item.value"
                  :title="item.label"
                >{{ item.label }}</Option>
              </Select>
            <Select v-model="seClass.seClassModule" style="width:150px" placeholder="课程名称" class="select" :filterable="true" :label-in-value="true" @on-change="seClassChange">
                <Option
                  v-for="item in seClass.seClassList"
                  :key="item.value"
                  :value="item.value"
                  :title="item.label"
                >{{ item.label }}</Option>
              </Select>
            <Select v-model="seApply.seApplyModule" style="width:100px" placeholder="报名费" class="select" :disabled="bt_type!=='其他'" not-found-text="暂无报名费">
                <Option
                  v-for="item in seApply.seApplyList"
                  :value="item.value"
                  :key="item.value"
                  :title="item.label"
                >{{ item.label }}</Option>
              </Select>
            <Select style="width:200px" placeholder="优惠券" class="select" :value="seDiscounts.seDiscountsModule" :disabled="bt_type!=='其他'" not-found-text="暂无优惠券" @on-change="couponChange">
                <Option
                  v-for="item in seDiscounts.seDiscountsList"
                  :value="item.value"
                  :key="item.value"
                  :title="item.label"
                >{{ item.label }}</Option>
              </Select>
          </div>
          <div class="transfer_box">
            <span>订单应支付金额:</span>
            <Input v-if="bt_type !== '其他'" v-model="transferPrice" placeholder="请输入转移费用金额" style="width: 200px" class="transfer_inp" @on-blur="transferInpBlur" />
            <span v-else class="transfer_txt">{{transferPriceT}}</span>
          </div>
          <div class="class_server">
            <span>课程服务期：</span> {{classServer == '' ? '':classServer+'天'}}
          </div>
          <div class="remark_box">
            <span>备注</span>
            <Input v-model="reamark" type="textarea" :rows="4" class="remark_inp" placeholder="如是线下班级转线上，如发生学员手机号与EMS内手机号不一致需要填写" @on-change="wordsChange" />
            <div class="remark_hint">
              <p v-show="isRedWords" class="red_words">您已超出100字了</p>
              <p class="hundred_words">{{words + '字'}}</p>
            </div>
            <p class="red_plan">支付流水信息需要财务审核，可在订单详情内查看最新进度</p>
          </div>
        </div>
        <div class="btn_box">
          <Button class="sub" type="primary" @click="subClick" :loading="sloading">提交</Button>
          <Button @click="cancleClick">取消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import util from '@/util/util.js'
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex'
  import configapi from '@/config/apiconfig'
  import api from '@/api'
  export default {
    data() {

      const hasbulorders_detail = this.hasSomeApiAccess('sales_imports_orders_detail');  //查看订单内容
      const hasbulorders_users = this.hasSomeApiAccess('sales_imports_orders_users');  //查看学员UID
      
      return {
        baseHeight: 0,
        totalPage: 1,
        currentPage: 1,
        pageSize: 10,
        subjectListSe: [],
        courseListSe: [],
        userId: '',
        userDisabled: false,
        orderList: [{
            value: '0',
            label: '未支付'
          },
          {
            value: '1',
            label: '部分支付'
          },
          {
            value: '2',
            label: '支付完成'
          },
          {
            value: '-1',
            label: '已退费'
          }
        ],
        addrecordList: [{
            value: '1',
            label: '补录时间'
          },
          {
            value: '2',
            label: '支付时间'
          }
        ],
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
              title: '订单支付状态',
              key: 'orderStatus',
              width: 120,
              align: 'left'
            },
            {
              title: '补录类型',
              key: 'btType',
              width: 100,
              align: 'left'
            },
            {
              title: '课程ID',
              key: 'classId',
              width: 80,
              align: 'right'
            },
            {
              title: '学科',
              key: 'subject',
              width: 150,
              align: 'left'
            },
            {
              title: '订单内容',
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
              title: '订单号',
              key: 'orderNum',
              width: 200,
              align: 'right'
            },
            {
              title: 'UID',
              key: 'uid',
              width: 100,
              align: 'right',
              render: (h, params) => {

              let $xueyuanid = null; //查看学员UID
              if(hasbulorders_users){
                $xueyuanid = h(
                    'div', {
                      style: {
                        color: '#2d8cf0',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          this.uidHandle(params)
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
              title: '姓名',
              key: 'name',
              width: 100,
              align: 'left'
            },
            {
              title: '补录人',
              key: 'bter',
              width: 150,
              align: 'left'
            },
            {
              title: '补录时间',
              key: 'btTime',
              width: 150,
              align: 'right'
            },
            {
              title: '课程价格',
              key: 'classPrice',
              width: 100,
              align: 'right'
            },
            {
              title: '优惠金额',
              key: 'discounts',
              width: 100,
              align: 'right'
            },
            {
              title: '订单金额',
              key: 'orderPrice',
              width: 100,
              align: 'right'
            },
            {
              title: '冲抵金额',
              key: 'chargePrice',
              width: 100,
              align: 'right'
            },
            {
              title: '已付金额',
              key: 'paidPrice',
              width: 100,
              align: 'right'
            },
            {
              title: '待支付金额',
              key: 'unpaidPrice',
              width: 100,
              align: 'right'
            },
            {
              title: '实收金额',
              key: 'realityPrice',
              width: 100,
              align: 'right'
            },
            {
              title: '最后支付时间',
              key: 'lastPayTime',
              width: 150,
              align: 'right'
            }
          ],
          tableData: []
        },
        btOrderModel: false,
        bterM: '',
        stuInfo: [{
            text: '绑定手机号',
            mobile: '',
            value: 'mobile'
          },
          {
            text: '绑定邮箱',
            email: '',
            value: 'email'
          },
          {
            text: '真实姓名',
            name: '',
            value: 'name'
          },
          {
            text: '身份证号',
            idcard: '',
            value: 'idcard'
          },
          {
            text: 'UID',
            uid: '',
            value: 'uid'
          },
          {
            text: '',
            error: ''
          }
        ],
        bt_type: '其他',
        seSubject: {
          seSubjectList: [],
          seSubjectModule: ''
        },
        seClass: {
          seClassList: [],
          seClassModule: ''
        },
        seApply: {
          seApplyList: [

          ],
          seApplyModule: ''
        },
        seDiscounts: {
          seDiscountsList: [

          ],
          seDiscountsModule: ''
        },
        transferPrice: '',
        transferPriceT: '',
        classServer: '',
        reamark: '',
        words: 100,
        isHasInfo: true, //点击查询是否有信息
        isRedWords: false, //是否超出备注的字数
        isIdError: false, //身份证号是否错误
        isNameError: false, //姓名是否输入
        isEmpty: false, //查询是否为空
        searchData: {
          menuId: '',
          courseId: '',
          orderStatus: '',
          dateStauts: '1',
          mark: '',
          orderMark: '',
          creator: '',
          startDate: '',
          endDate: ''
        },
        tloading: true,
        sloading: false,
        transferServer: ''
      }
    },
    methods: {
      ...mapActions([
        'fetchCollectOrderList',
        'fetchStudentInfoF',
        'fetchCourseList',
        'fetchSubjectList',
        'fetchMyCouponsFee'
      ]),
      orderConHandle(num) {
        this.$router.push(`/orders-details/${num}`)
      },
      searchClick() {
        this.currentPage = 1
        let obj = {}
        Object.assign(obj, this.searchData)
        for (let k in obj) {
          if (!obj[k] && obj[k] != '0' || !obj[k].length) {
            obj[k] = null
          }
          if (k === 'menuId' || k === 'courseId' || k === 'orderStatus') {
            if (obj[k]) obj[k] = obj[k].join(',')
          }
        }
        Object.assign(obj, {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        })
        this._initState(obj)
      },
      exportClick() {
        let obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        Object.assign(obj, this.searchData)
        let href
        for (let k in obj) {
          if (obj[k]) {
            if (k === 'menuId' || k === 'courseId' || k=== 'orderStatus') {
              !obj[k].length ? obj[k] = '' : obj[k] = obj[k].join(',')
            }
            href = `${k}=${obj[k]}&` + href;
          }
        }
        href = href.split('undefined')[0].slice(0, href.lastIndexOf('&'))
        window.location.href = `${
          configapi.bmfUrl
        }/import/order/export/data?${href}`
      },
      clearClick() {
        for (let k in this.searchData) {
          if (k === 'dateStauts') {
            this.searchData[k] = '1'
          } else {
            this.searchData[k] = ''
          }
        }
        this.$refs.dateStart.handleClear()
        this.currentPage = 1
        this._initState()
        this._courseState({
          mark: '2'
        })
      },
      subjectChange(val) {
        this._courseState({
          menuIds: val.length ? val.join(',') : null,
          mark: '2'
        })
      },
      seSubjectChange(val) {
        if (this.bt_type !== '其他') {
          this._courseState({
            menuIds: val,
            mark: '1',
            courseType: '0,1'
          })
        } else {
          this._courseState({
            menuIds: val,
            mark: '1',
          })
        }
      },
      async seClassChange(val) {
        if (!val || !this.userId) {
          return false
        }
        //if (!this.stuInfo.userId) return
        await this.fetchMyCouponsFee({
          studentId: this.userId,
          courseId: val.value
        })
        let deposit = this.myCouponsFee
        let courses = deposit.detail[0].courses[0]
        let obj = {
          label: courses.entryFee ? courses.entryFee + '元' : '',
          value: courses.depositId ? courses.depositId : ''
        }

        //报名费
        if (!obj.label) {
          this.seApply.seApplyList = []
        } else {
          this.seApply.seApplyList[0] = obj
          this.seApply.seApplyModule = obj.value
        }

        //服务期
        this.courseList.forEach(item => {
          if (val.value === item.courseId) {
            if (this.bt_type === '其他') {
              this.classServer = item.servicePeriodDays
            } else {
              this.classServer = ''
            }
            if (this.stuInfo[4].uid) sessionStorage.setItem('qClassServer', item.servicePeriodDays)
          }
        })
        if (this.transferServer) {
          let obj = {
            courseId: this.seClass.seClassModule,
            money: this.transferServer
          }
          if (this.bt_type !== '其他') this._transferServer(obj)
        }
        //应付金额
        this.transferPriceT = courses.amount
        //优惠券
        this.seDiscounts.seDiscountsList = [];
        if (courses.currentCoupon) {
          this.seDiscounts.seDiscountsList = [{
            label: '不使用优惠券',
            value: -1
          }]
        }
        courses.coupons.forEach(e => {
          let newData = {}
          Object.assign(newData, {
            label: `-${e.value}元(${e.name})`,
            value: e.id
          })
          this.seDiscounts.seDiscountsList.push(newData)
        })
        this.seDiscounts.seDiscountsModule = courses.currentCoupon
      },
      async couponChange(coupons) {
        //优惠券选择,用于切换优惠卷时，请求后台获取最新的“应付金额”
        if (!coupons) {
          return false
        }
        this.seDiscounts.seDiscountsModule = coupons
        let coupon = coupons ? coupons : null
        this.fetchMyCouponsFee({
          studentId: this.userId,
          courseId: this.seClass.seClassModule,
          couponId: coupon
        }).then(() => {
          let deposit = this.myCouponsFee
          let courses = deposit.detail[0].courses[0]
          //应付金额
          this.transferPriceT = courses.amount
          //优惠券
          this.seDiscounts.seDiscountsList = [{
            label: '不使用优惠券',
            value: -1
          }]
          courses.coupons.forEach(e => {
            let newData = {}
            Object.assign(newData, {
              label: `-${e.value}元(${e.name})`,
              value: e.id
            })
            this.seDiscounts.seDiscountsList.push(newData)
          })
          this.seDiscounts.seDiscountsModule = courses.currentCoupon
        })
      },
      btHandleClick() {
        this.btOrderModel = true
        this._subjectState({
          mark: '1'
        })
        this._courseState({
          mark: '1'
        })
      },
      btRadioChange(val) {
        let qClassServer = sessionStorage.getItem('qClassServer')
        let xClassServer = sessionStorage.getItem('xClassServer')
        if (val === '其他') {
          !qClassServer ?
            this.classServer = '' :
            this.classServer = qClassServer
            this._courseState({
              mark: '1'
            })
            this.seClass.seClassModule = ''
            this.seSubject.seSubjectModule = ''
        } else {
          !xClassServer ?
            this.classServer = '' :
            this.classServer = xClassServer
            this._courseState({
              mark: '1',
              courseType: '0,1'
            })
            this.seClass.seClassModule = ''
            this.seSubject.seSubjectModule = ''
        }
      },
      transferInpBlur(event) {
        this.transferServer = event.target.value
        let obj = {
          courseId: this.seClass.seClassModule,
          money: this.transferServer
        }
        if (this.stuInfo[4].uid) {
          this._transferServer(obj)
        } else {
          this.$Message.error('学员信息不能为空')
        }
      },
      async _transferServer(obj) {
        let result = await api.getServicePeriod(obj)
        if (result.status === 200 || result.status === 201) {
          this.classServer = result.result.servicePeriodDay
          sessionStorage.setItem('xClassServer', this.classServer)
        } else if (result.status === 404) {
          this.$Message.error(result.message)
        }
      },
      wordsChange() {
        if (this.reamark.length < 100 && this.reamark.length >= 0) {
          this.words = (100 - this.reamark.length);
          this.isRedWords = false
        } else {
          this.words = 0
          this.isRedWords = true
        }
      },
      uidHandle(params) {
        this.$router.push({
          name: 'student_info',
          query: {
            userId: params.row.userId,
            uuid: params.row.uid,
            from: 'sales-manage_back-tracking-order'
          }
        })
      },
      async subClick() {
        if (!this.userId) {
          this.$Message.error('学员信息不能为空')
          return
        }
        //如果姓名和身份证号都有输入判断，否则不判断
        if (this.stuInfo[2].name || this.stuInfo[3].idcard) {
          if (!this.stuInfo[2].name) {
            this.isNameError = true
            this.isIdError = false
            return
          } else {
            if (this.stuInfo[2].name.length < 2) {
              this.isNameError = true
              this.isIdError = false
              return
            } else if (this.stuInfo[2].name.length > 10) {
              this.isNameError = true
              this.isIdError = false
              return
            }
          }
          if (!util.checkCardId(this.stuInfo[3].idcard)) {
            this.isIdError = true
            this.isNameError = false
            return
          }
        }
        if (this.reamark.length >= 100) {
          this.isRedWords = true
          return
        }
        this.isRedWords = false
        this.isIdError = false
        this.isNameError = false
        let obj = {
          uid: this.stuInfo[4].uid,
          name: this.stuInfo[2].name,
          idcard: this.stuInfo[3].idcard,
          courseId: this.seClass.seClassModule,
          depositId: this.bt_type !== '其他' ?
            null :
            this.seApply.seApplyModule,
          couponId: this.bt_type !== '其他' ?
            null :
            this.seDiscounts.seDiscountsModule,
          orderType: this.bt_type === '其他' ? '0' : '1',
          orderPrice: this.bt_type === '其他' ? this.transferPriceT : this.transferPrice,
          servicePeriodDay: this.classServer,
          remark: this.reamark
        }
        for (let k in obj) {
          if (
            k === 'uid' ||
            k === 'courseId' ||
            k === 'orderType' ||
            k === 'orderPrice'
          ) {
            if (k === 'orderPrice') {
              if (!obj[k]) {
                this.$Message.error('请输入金额')
                return
              }
            }
            if (!obj[k] && typeof obj[k] !== 'number') {
              this.$Message.error('请选择课程')
              return
            }
          }
          if (!obj[k]) {
            delete obj[k]
          }
        }
        this.sloading = true
        if (this.sloading) {
          let result = await api.getCOSave(obj)
          if (result.status === 200) {
            this.$Message.success('补录订单成功！')
            this.btTimer = setTimeout(() => {
              this.currentPage = 1
              this._initState({
                pageNum: this.currentPage,
                pageSize: this.pageSize
              })
              this.btOrderModel = false
              this.sloading = false
            }, 1000)
          } else {
            this.sloading = false
            this.$Message.error(result.message)
          }
        }
      },
      cancleClick() {
        this.btOrderModel = false
      },
      async inquireInfo() {
        if (!this.bterM) {
          this.$Message.error('请输入学员信息')
          return
        }
        await this.fetchStudentInfoF({
          mark: this.bterM
        })
        let state = this.studentInfoF
        if (state.status === 404 || !state.result) {
          this.isEmpty = true
          this.stuInfo.forEach(e => {
            e[e.value] = ''
          })
          this._clearSelect()
        } else if (state.status === 200) {
          let result = state.result
          this.userId = result.userId
          this.userDisabled = result.name || result.idcard ? true : false
          this.stuInfo.forEach((e, i) => {
            e[e.value] = result[e.value]
          })
          this._clearSelect()
        }
      },
      _clearSelect() {
        this.seSubject.seSubjectModule = ''
        this.seClass.seClassModule = ''
        this.seApply.seApplyModule = ''
        this.seDiscounts.seDiscountsModule = ''
        this.classServer = ''
        this.transferPriceT = ''
        this.transferPrice = ''
        this.transferServer = ''
        sessionStorage.removeItem('xClassServer')
        sessionStorage.removeItem('qClassServer')
      },
      moduleChange(val) {
        if (!val) {
          this.stuInfo.forEach(e => {
            e[e.value] = ''
          })
          this.bterM = ''
          this.bt_type = '其他'
          this.seDiscounts.seDiscountsList = ''
          this.seApply.seApplyList = ''
          this.reamark = ''
          this.isRedWords = false
          this.isIdError = false
          this.isNameError = false
          this.isEmpty = false
          this.sloading = false
          this.userDisabled = false
          this.words = 100
          this._clearSelect()
        }
      },
      dateChange(nDate, date) {
        this.searchData.startDate = nDate[0]
        this.searchData.endDate = nDate[1]
      },
      pageChange(page) {
        this.currentPage = page
        this._pageChange()
      },
      pageSizeChange(pageSize) {
        this.pageSize = pageSize
        this._pageChange()
      },
      _pageChange() {
        let obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        }
        Object.assign(obj, this.searchData)
        for (let k in obj) {
          if (!obj[k] && obj[k] != '0') {
            obj[k] = null
          }
          if (k === 'menuId' || k === 'courseId' || k === 'orderStatus') {
            if (obj[k]) obj[k] = obj[k].join(',')
          }
        }
        this._initState(obj)
      },
      async _initState(
        obj = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          dateStauts: this.searchData.dateStauts
        }
      ) {
        await this.fetchCollectOrderList(obj)
        let result = this.collectOrderList
        if (!result) return
        this.totalPage = result.total
        let arr = []
        result.list.forEach((e, i) => {
          let newData = {}
          if (e.payStatus === 0) {
            e.payStatus = '未支付'
          } else if (e.payStatus === 1) {
            e.payStatus = '部分支付'
          } else if (e.payStatus === 2) {
            e.payStatus = '支付完成'
          } else if (e.payStatus === -1) {
            e.payStatus = '已退费'
          }
          Object.assign(newData, {
            orderStatus: e.payStatus,
            btType: e.orderType == 0 ? '其他' : '线下转线上',
            classId: e.courseId,
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
        this.table.tableData = arr
        this.tloading = false
      },
      async _subjectState(status) {
        await this.fetchSubjectList(status)
        let result = this.subjectList
        if (!result) return
        let arr = []
        result.forEach(e => {
          let newData = {}
          Object.assign(newData, {
            label: e.menuName,
            value: e.menuId
          })
          arr.push(newData)
        })
        if (status.mark === '2') {
          this.subjectListSe = arr
        } else {
          this.seSubject.seSubjectList = arr
        }
      },
      async _courseState(state) {
        await this.fetchCourseList(state)
        let result = this.courseList
        if (!result) return
        let arr = []
        result.forEach(e => {
          let newData = {}
          if (state.mark === '1') {
            Object.assign(newData, {
              label: e.courseId + '-' + e.courseName + '-' + e.coursePrice,
              value: e.courseId
            })
          } else {
            Object.assign(newData, {
              label: e.courseId + '-' + e.courseName,
              value: e.courseId
            })
          }
          arr.push(newData)
        })
        if (state.mark === '2') {
          this.courseListSe = arr
        } else {
          this.seClass.seClassList = arr
        }
      }
    },
    computed: {
      ...mapState({
        collectOrderList: state => state.financial.collectOrderList,
        servicePeriod: state => state.financial.servicePeriod,
        studentInfoF: state => state.financial.studentInfoF,
        courseList: state => state.financial.courseList,
        subjectList: state => state.financial.subjectList,
        myCouponsFee: state => state.financial.myCouponsFee
      })
    },
    created() {
      this._initState()
      this._subjectState({
        mark: '2'
      }) //包含（已启用、已禁用）
      this._courseState({
        mark: '2'
      })
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
  .col2 {
    margin-right:-10px;
  }

  .row_bottom_10 {
    margin-bottom: 10px;
  }

  .back_tracking_order {
    // min-width: 1200px;
    .bt_header {
      .bt_header_l {
        .choose_date_box {
          span {
            display: block;
            line-height: 30px;
            margin: 0 10px;
          }
        }
        .bt_btn {
          height: 32px;
          margin-right: 10px;
        }
        .sel {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .bt_header_r {
        .search,
        .clear,
        .export {
          margin-bottom: 10px;
        }
        .clear,
        .export {
          margin-left: 6px;
        }
      }
    }
    .bt_body {
      margin-top: 10px;
      .page_box {
        margin: 20px 0 10px 0;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .model_box {
    .student_box {
      position: relative;
      .demand_stuinfo {
        margin-left: 40px;
      }
      .red_content {
        position: absolute;
        width: 200px;
        color: red;
        right: 80px;
        top: -2px;
      }
    }
    .student_info_box {
      margin-top: 20px;
      ul {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        .stu_li {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          border: 1px solid #ccc;
          border-bottom: none;
          width: 330px;
          .student_item {
            display: flex;
            height: 40px;
            line-height: 40px;
            position: relative;
            .student_item_l {
              display: block;
              height: 40px;
              width: 100px;
              background: #eee;
              text-align: left;
              padding-left: 10px;
            }
            .student_item_r {
              display: block;
              width: 200px;
              text-align: left;
              padding-left: 10px;
            }
          }
        }
        .stu_li:nth-child(5),
        .stu_li:nth-child(6) {
          border-bottom: 1px solid #ccc;
        }
        .stu_li:nth-child(2n + 2) {
          border-left: none;
        }
        .red_id_card {
          color: red;
          position: absolute;
          left: 437px;
          bottom: 12px;
        }
      }
      .bt_type_box {
        margin-top: 30px;
        display: flex;
        .bt_type_group {
          margin-left: 10px;
        }
      }
      .select_box {
        margin-top: 30px;
        .select {
          margin-right: 20px;
        }
      }
      .transfer_box,
      .class_server,
      .remark_box {
        margin-top: 20px;
        span {
          font-weight: 600;
        }
        .transfer_txt {
          font-weight: normal;
        }
      }
      .remark_box {
        position: relative;
        .remark_inp {
          margin-top: 10px;
        }
        .remark_hint {
          display: flex;
          margin-top: 5px;
          .hundred_words {
            color: #ccc;
            text-align: right;
            flex: 1;
          }
          .red_words {
            color: red;
            text-align: left;
            flex: 1;
          }
        }
        .red_plan {
          color: red;
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

  .model_box /deep/ .stu_inp .ivu-input {
    text-align: left;
    height: 36px;
    margin-top: 2px;
    margin-left: 4px;
    width: 220px;
    border: 1px solid #eee;
    border-radius: none;
    padding-left: 10px;
  }

  .model_box /deep/ ul.ivu-select-dropdown-list,
  .back_tracking_order /deep/ ul.ivu-select-dropdown-list {
    max-width: 100px;
    li {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .back_tracking_order /deep/ .ivu-tag-text {
    max-width: 100px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .back_tracking_order /deep/ .ivu-tag .ivu-icon-ios-close {
    top: -8px;
  }

  .back_tracking_order /deep/ .ivu-date-picker {
    width: 100%;
  }
  // .back_tracking_order /deep/ .ivu-btn-icon-only{
  //   padding: 0 13px 0;
  //   font-size: 19px;
  // }
</style>


