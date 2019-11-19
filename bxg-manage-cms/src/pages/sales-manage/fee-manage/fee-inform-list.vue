<template>
  <div class="fee-inform">
    <Row>
      <Col span="24">
        <Form ref="searchParams" :model="searchParams" :rules="searchRule" inline>
          <FormItem>
            <Select v-model="searchParams.templateName" style="width:200px;" clearable filterable placeholder="请选择模板名称">
              <Option v-for="(item, index) in templateData.templateNames" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem  prop="mobile">
            <Input v-model="searchParams.mobile" placeholder="手机号" style="width: 200px;margin-left:-2px" />
          </FormItem>
          <FormItem >
            <Input v-model="searchParams.creatorName" placeholder="发送人" style="width: 100px;margin-left:-2px" />
          </FormItem>
          <FormItem >
            <DatePicker
              placeholder="发送时间"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm"
              @on-change="sendTimes"
              style="width: 200px;margin-left:-2px"></DatePicker>
          </FormItem>
          <FormItem >
            <Select v-model="searchParams.status" style="width:200px;margin-left:-2px" clearable placeholder="时效状态">
              <Option v-for="item in searchType" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </FormItem>
          <Button type="primary" style="margin-left:-2px" icon="ios-search" @click="search">搜索</Button>
          <Button type="primary" style="margin-left:6px" @click="exportData" v-if="hasSomeApiAccess('sales_deposits_messages_data')">导出数据</Button>
        </Form>
      </Col>
      </Row>
      <Row id="table-stage-list">
        <Col span="24" class="margin-top-20">
          <Table border :height="baseHeight" :columns="tabListTitle" :data="listData.list"></Table>
        </Col>
        <Col class="margin-top-20" span="24">
          <Page placement="top" style="text-align: right;padding-bottom: 1px"
                :total="listData.total"
                :page-size="pageSize"
                :page-size-opts="arrPage"
                @on-change="handleCurrentChange"
                @on-page-size-change="handlePageSize"
                :current="pageNumber"
                :transfer="true"
                show-elevator show-sizer  >
          </Page>
        </Col>
      </Row>
  </div>
</template>

<script>
import apiconfig from '@/config/apiconfig'
import { mapActions, mapState } from 'vuex'
import util from '@/util/util'
export default {
  name: 'fee-inform-list',
  data() {

    const hasmessages_links = this.hasSomeApiAccess('sales_deposits_messages_links');  //预报名费通知-复制链接

    const phoneReg = (rule, value, callback) => {
      let RegPhone = /^1\d{10}$/
      if (value == '') {
        callback()
      } else if (RegPhone.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机号！'))
      }
    }
    return {
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      searchParams: {
        templateName: '',
        mobile: '',
        creatorName: '',
        status: '',
        startTimeStr: '',
        endTimeStr: '',
        pageNumber: 1,
        pageSize: 10
      },
      searchRule: {
        mobile: [{ validator: phoneReg, trigger: 'blur' }]
      },
      searchType: [
        {
          key: 0,
          value: '已失效'
        },
        {
          key: 1,
          value: '未失效'
        }
      ],
      tabListTitle: [
        //表头
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              params.index + (this.pageNumber - 1) * this.pageSize + 1
            )
          }
        },
        {
          title: '模板名称',
          key: 'templateName',
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
          title: '剩余时长',
          key: 'remainingTime',
          align: 'right',
          width: 125
        },
        {
          title: '用户类型',
          key: 'userType', //新用户（0），老用户（1）
          width: 100,
          align: 'left',
          render: (h, params) => {
            return h(
              'span',
              {
                props: {}
              },
              params.row.userType === 0 ? `新用户` : `老用户`
            )
          }
        },
        {
          title: '手机号',
          key: 'mobile',
          align: 'right',
          width: 125
        },
        {
          title: 'UID',
          key: 'itcastUUID',
          align: 'right',
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              {
                props: {}
              },
              params.row.itcastUUID ? params.row.itcastUUID : `--`
            )
          }
        },
        {
          title: '是否短信通知',
          key: 'isSmsNotice',
          align: 'left',
          width: 120,
          render: (h, params) => {
            return h(
              'span',
              {
                props: {}
              },
              params.row.isSmsNotice ? `是` : `否`
            )
          }
        },
        {
          title: '发送人',
          key: 'creatorName',
          align: 'left',
          width: 200
        },
        {
          title: '发送时间',
          key: 'createTime',
          align: 'right',
          width: 160
        },
        {
          title: '时效状态',
          key: 'status', //已失效（0），未失效（1）
          align: 'left',
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              {
                props: {}
              },
              params.row.status ? `未失效` : `已失效`
            )
          }
        },
        {
          title: '链接地址',
          key: 'paymentUrl',
          fixed: 'right',
          width: 100,
          render: (h, params) => {
          let $copylianjieButton = null; //预报名费通知-复制链接
          if (hasmessages_links) {
              $copylianjieButton = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status === 0 ? true : false
                  },
                  attrs: {
                    'data-clipboard-text': params.row.paymentUrl
                  },
                  class: 'tag-read',
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
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
                    }
                  }
                },
                '复制链接'
              )
          }

          return h("div", [ $copylianjieButton ]);
            
          }
        }
      ]
    }
  },
  mounted() {
    this.fetchListData({
      pageNumber: 1,
      pageSize: 10
    })
    this.fetchTemplateData()
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions([
      `getDepositInformationList`,
      `getDepositInformationTemplate`
    ]),
    fetchListData(params) {
      //获取列表数据
      this.getDepositInformationList(params)
    },
    fetchTemplateData(params) {
      //获取列表数据
      this.getDepositInformationTemplate(params)
    },
    handleCurrentChange(num) {
      //翻页
      this.searchParams.pageNumber = num
      this.searchParams.pageSize = this.pageSize
      this.fetchListData(this.searchParams)
    },
    handlePageSize(size) {
      //改变每页条数
      this.searchParams.pageNumber = this.pageNumber
      this.searchParams.pageSize = size
      this.fetchListData(this.searchParams)
    },
    search() {
      // 搜索
      this.searchParams.pageNumber = 1
      this.searchParams.pageSize = 10
      this.fetchListData(this.searchParams)
    },
    sendTimes(e) {
      //获取时间控件的时间
      this.searchParams.startTimeStr = e[0]
      this.searchParams.endTimeStr = e[1]
    },
    exportData() {
      let exportParams = {
        ...this.searchParams
      }
      exportParams.pageNumber = this.pageNumber
      exportParams.pageSize = this.pageSize
      let urlParams = ''
      for (let i in exportParams) {
        urlParams += `${i}=${exportParams[i]}&`
      }
      urlParams = urlParams.slice(0, urlParams.length - 1)
      window.location = `${
        apiconfig.bmfUrl
      }/depositMessage/exportData?${urlParams}`
    }
  },
  computed: {
    ...mapState({
      listData: state => state.feeManage.informationData,
      templateData: state => state.feeManage.informationTemplate,
      pageNumber: state => state.feeManage.informationDataPage.pageNum,
      pageSize: state => state.feeManage.informationDataPage.pageSize
    })
  },
  watch: {}
}
</script>

<style scoped lang="less">
.fee-inform /deep/ .ivu-form-item{
  margin-bottom: 0 !important;
}
</style>
