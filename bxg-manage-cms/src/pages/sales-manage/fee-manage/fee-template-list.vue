<template>
  <div>
    <Row id="table-stage-list">
     <Col span="24">
       <Form :model="searchForm" >
         <span @click="show_pop_up">
          <Button type="primary" v-if="hasSomeApiAccess('sales_deposits_templates_post')"><Icon type="md-add" />新建模板</Button>
         </span>
         <Select v-model="searchForm.name" clearable filterable style="width:200px;margin-left:6px" placeholder="模板名称">
           <Option v-for="(item, index) in searchData.templateNames" :value="item" :key="index">{{ item }}</Option>
         </Select>
         <Select v-model="searchForm.amount" clearable style="width:200px;margin-left:6px" filterable placeholder="金额">
           <Option v-for="(item, index) in searchData.templateAmounts" :value="item" :key="index">{{ item }}</Option>
         </Select>
         <Select v-model="searchForm.expiresTime" clearable style="width:200px;margin-left:6px" filterable placeholder="时效">
           <Option v-for="(item, index) in searchData.templateExpiresTimes" :value="item" :key="index">{{ item}}</Option>
         </Select>
         <Input v-model="searchForm.creatorName" placeholder="创建人" style="width: 200px;margin-left:6px" />
         <Button type="primary" @click="search" icon="ios-search" style="margin-left:6px">搜索</Button>
       </Form>

     </Col>
    </Row>
     <Row id="table-stage-list">
        <Col span="24" class="margin-top-20">
          <Table border :height="baseHeight" :row-class-name="rowClassName" :columns="tabListTitle" :data="pageData.data"></Table>
        </Col>
        <Col class="margin-top-20" span="24">
          <Page placement="top" style="text-align: right;padding-bottom: 1px"
                :total="pageData.total"
                :page-size="pageSize"
                :page-size-opts="arrPage"
                @on-change="handleCurrentChange"
                @on-page-size-change="handlePageSize"
                :current="pageData.pageNumber"
                :transfer="true"
                show-elevator show-sizer  >
          </Page>
        </Col>
      </Row>
      <Modal
        v-model="disableModal"
        title="信息"
        @on-ok="disableOk"
        :loading="loading"
        @on-cancel="disableCancel">
        <h3 style="text-align: center" v-if="forbidden.status == 1">是否禁用该模板</h3>
        <h3 style="text-align: center" v-if="forbidden.status !== 1">是否启用该模板</h3>
        <p class="margin-top-20 red" style="text-align: center" v-if="forbidden.status == 1">禁用后，该模板将不能发送给学员！（不影响已发送数据）</p>
      </Modal>
      <Modal
      v-model="newsModal"
      :title="sendTitile"
      @on-ok="newsOk"
      :loading="loading"
      :footer-hide="!sendState"
      @on-cancel="newsCancel">
        <Form ref="newsformItem" :model="newsformItem" :rules="ruleNewsFormItem" :label-width="80" inline class="margin-top-20" v-if="sendState">
          <FormItem label="手机号" prop="phone">
            <Input v-model="newsformItem.phone"></Input>
          </FormItem>
          <FormItem>
            <Checkbox  v-model="newsformItem.note" value="">发送短信</Checkbox>
          </FormItem>
        </Form>
        <div v-if="!sendState">
          <p id="sendContent">
            {{sendContent}}
            <Button type="text" class="tag-read" style="color: #57a3f3;" data-clipboard-target="#sendContent" @click="copyFn">复制</Button>
          </p>

        </div>
      </Modal>
    </Row>
    <new-template
      ref="newTemplate"
      @refreshData="refreshData"></new-template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import newTemplate from './new-template'
import api from '@/api/index'
import util from '@/util/util'
export default {
  name: 'fee-template-list',
  components: {
    newTemplate
  },
  data() {

    const hasstatus_put = this.hasSomeApiAccess('sales_deposits_templates_status_put');  //预报名费模板-禁用
    const hasmessgae_post = this.hasSomeApiAccess('sales_deposits_templates_messgae_post');  //预报名费模板-发送通知

    const phoneReg = (rule, value, callback) => {
      let RegPhone = /^1\d{10}$/
      if (value == '') {
        callback(new Error('请输入手机号！'))
      } else if (RegPhone.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机号！'))
      }
    }
    return {
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      disableModal: false,
      newsModal: false,
      loading: true, // 一定要设置为true，否则第一次提交表单，modal还是会被隐藏
      pageNumber: 1,
      pageSize: 10,
      forbidden: {
        //禁用参数
        id: Number,
        status: Number
      },
      newsformItem: {
        //发送消息
        id: '',
        phone: '',
        note: true
      },
      sendState: true,
      sendContent: String,
      sendTitile: `发送通知`,
      ruleNewsFormItem: {
        //手机号校验
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneReg, trigger: 'blur' }
        ]
      },
      searchForm: {
        //搜索
        name: '',
        amount: '',
        expiresTime: '',
        creatorName: '',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      },
      tabListTitle: [
        // 表格
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index + (this.pageNumber - 1) * this.pageSize + 1
            )
          }
        },
        {
          title: '课程ID',
          key: 'courseId',
          align: 'right',
          width: 100
        },
        {
          title: '预报名费名称',
          key: 'name',
          align: 'left',
          width: 300
        },
        {
          title: '预报名费金额',
          key: 'amount',
          align: 'right',
          width: 125
        },
        {
          title: '失效时长',
          key: 'expiresTime',
          align: 'right',
          width: 150
        },
        {
          title: '备注',
          key: 'description',
          align: 'left',
          width: 200,
          render: (h, params) => {
            return h(
              'span',
              {
                props: {},
                attrs: {
                  title: params.row.description
                },
                style: {
                  display: '-webkit-box',
                  width: '163px',
                  height: '36px',
                  overflow: 'hidden',
                  'text-overflow': 'ellipsis',
                  '-webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': '2'
                }
              },
              params.row.description
            )
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'right',
          width: 150
        },
        {
          title: '创建人',
          key: 'creatorName',
          align: 'left',
          width: 200
        },
        {
          title: '生成链接数',
          key: 'linkCount',
          align: 'right',
          width: 100
        },
        {
          title: '发送短信数',
          key: 'smsCount',
          align: 'right',
          width: 100
        },
        {
          title: '支付成功数',
          key: 'payCount',
          align: 'right',
          width: 100
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
                    disabled: params.row.courseStatus === '1' ? false : true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.disableModal = !this.disableModal
                      this.forbidden.id = params.row.id
                      this.forbidden.status = params.row.status
                    }
                  }
                },
                params.row.status ? '禁用' : '开启'
              )
          }

          if (hasmessgae_post) {
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
                      this.sendTitile = `发送短信`
                    }
                  }
                },
                '发送通知'
              )
          }

          return h("div", [ $prohibitButton, $noticeButton ]);

          }
        }
      ]
    }
  },
  mounted() {
    this.fetchListData({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    })
    this.fetchTemplateData()
    this.fetchTemplateSearchData()
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions([
      'getDepositManageList',
      'getDepositTemplateName',
      'getDepositTemplateSearchData',
      'getDepositInformationList'
    ]),
    fetchListData(params) {
      //获取模板列表数据
      this.getDepositManageList(params)
    },
    fetchTemplateData(params) {
      //预报名费模板名称数据
      this.getDepositTemplateName(params)
    },
    fetchTemplateSearchData(params) {
      //获取搜索数据
      this.getDepositTemplateSearchData(params)
    },
    refreshData() {
      //预报名费模板名称数据
      this.fetchListData({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      })
    },
    copyFn() {
      var clipboard = new this.Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$Message.success('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$Message.error('复制失败，可能浏览器不支持')
        // 释放内存
        clipboard.destroy()
      })
    },
    rowClassName(row, index) {
      if (row.courseStatus !== '1') {
        return 'demo-table-info-row'
      }
      return ''
    },
    handleCurrentChange(num) {
      //翻页
      this.pageNumber = num
      this.searchForm.pageNumber = num
      this.fetchListData(this.searchForm)
    },
    handlePageSize(size) {
      //改变每页条数
      this.pageSize = size
      this.searchForm.pageSize = size
      console.log(this.searchForm)
      this.fetchListData(this.searchForm)
    },
    show_pop_up() {
      //新建模板
      this.$refs.newTemplate.newTemplate(this.templateListName)
    },
    disableOk() {
      // 禁用确定
      this.loading = true
      this.setStatusFn({
        id: this.forbidden.id,
        status: this.forbidden.status === 1 ? 0 : 1
      }).then(res => {
        if (res.status === 200) {
          this.loading = false
          let msg = this.forbidden.status === 1 ? '禁用成功' : '开启成功'
          this.$Message.success(msg)
          this.fetchListData({
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          })
          this.disableModal = false
        } else {
          this.$Message.error(res.message, 1000)
          this.loading = false
        }
      })
    },
    disableCancel() {},
    newsOk() {
      //发送消息
      setTimeout(() => {
        this.loading = false
        this.$refs.newsformItem.validate(valid => {
          if (valid) {
            this.sendNewsFn({
              id: this.newsformItem.id,
              mobile: this.newsformItem.phone,
              smsFlag: this.newsformItem.note
            }).then(res => {
              if (res.status === 200) {
                this.sendContent = res.result
                this.$Message.success('短信已发送成功！')
                this.fetchListData({
                  pageNumber: this.pageNumber,
                  pageSize: this.pageSize
                })
                this.getDepositInformationList({
                  pageNumber: 1,
                  pageSize: 10
                })
                this.sendState = false
                this.sendTitile = `信息`
                this.$refs.newsformItem.resetFields()
              } else {
                this.$Message.error(res.message, 1000)
                this.loading = false
              }
            })
            this.loading = true
          }
        })
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    newsCancel() {
      //消息弹窗关闭
      if (this.sendState) {
        this.$refs.newsformItem.resetFields()
      }
      this.sendState = true
    },
    search() {
      // 搜索
      this.pageNumber = 1
      this.searchForm.pageNumber = 1
      this.pageSize = 10
      this.searchForm.pageSize = 10
      this.fetchListData(this.searchForm)
    },
    async setStatusFn(params) {
      //搜索数据接口
      let result = await api.setDepositManageStatus(params)
      return result
    },
    async sendNewsFn(params) {
      //禁用数据接口
      let result = await api.sendNewsDepositManage(params)
      return result
    }
  },
  computed: {
    ...mapState({
      pageData: state => state.feeManage.pageData,
      templateListName: state => state.feeManage.newTemplateList,
      searchData: state => state.feeManage.templateSearchData
    })
  }
}
</script>

<style lang="less">
#sendContent {
  padding: 40px 20px;
}
.ivu-table .demo-table-info-row td {
  background-color: #fefefe;
  color: #d7d7d7;
}
#table-stage-list /deep/ .demo-table-info-row .ivu-table-cell{
  button{
    span{
      line-height: normal;
    }
  }
  span{
    line-height:36px;
  }
}
</style>

