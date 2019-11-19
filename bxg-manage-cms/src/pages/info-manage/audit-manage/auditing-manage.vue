<template>
  <Card>
    <Row :gutter="10" type='flex'>
      <Col>
        <Button type="primary" style="margin-left:6px;" @click="auditAll(true)" v-if="hasSomeApiAccess('articles_audits_batch_passes')">批量审核</Button>
      </Col>
      <Col span="4">
        <Input placeholder="请输入标题|ID" v-model="searchParams.titleSearch"/>
      </Col>
      <Col span="4">
        <Select clearable placeholder="一级栏目" v-model="searchParams.fistColumn">
          <Option v-for="(item, index) in firstColumnList" :value="item.menuId" :key="index">{{ item.menuName }}
          </Option>
        </Select>
      </Col>
      <!-- <Col span="4">
        <Select clearable placeholder="二级栏目" v-model="searchParams.secondColumn">
          <Option v-for="item in selectContac" :value="item.value" :key="item.id">{{ item.label }}</Option>
        </Select>
      </Col> -->
      <Col span="4">
        <Input placeholder="请输入提交人" v-model="searchParams.submitter"/>
      </Col>
      <Col span="4">
        <DatePicker type="daterange" :value="searchParams.submitTime" placeholder="提交时间" style="width:100%;"
                    @on-change="changeInfoTime"></DatePicker>
      </Col>
      <Col span="4">
        <span @click="searchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button>清除</Button></span>
      </Col>
    </Row>

    <Row style="margin-top:20px;" id="auditing-manage">
      <Col span="24">
        <Table border ref="auditTable" :height="baseHeight" :loading="auditingLoading" :columns="articleTitle"
               :data="auditingList" @on-selection-change="onSelectionChange"/>
      </Col>
      <Col span="24" style="margin-top: 20px;">
        <Page placement="top"
              style="text-align:right; padding-bottom:1px"
              :total="pageTotal"
              :current="pageParams.pageNumber"
              :page-size="pageParams.pageSize"
              :page-size-opts="arrPage"
              @on-change="changeCurrent"
              @on-page-size-change="changePageSize"
              :transfer="true"
              show-total show-elevator show-sizer>
        </Page>
      </Col>
    </Row>

    <ModalLog :isLogModal.sync="isLogModal" :ids="ids"/>
    <ModalAudit :isAuditModal.sync="isAuditModal" :ids="ids" v-on:onLoadInfo="onLoadInfoAudit" v-on:cancelChecked="cancelChecked"/>
  </Card>
</template>

<script>
  import apiConfig from '@/config/apiconfig'
  import api from '@/api/index'
  import util from '@/util/util'
  import ModalLog from './modal/modal-log'
  import ModalAudit from './modal/modal-audit'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'auditing-manage',
    components: { ModalLog, ModalAudit },
    data() {

    const hashpreview = this.hasSomeApiAccess('articles_audits_preview');  //预览
    const hashpasses = this.hasSomeApiAccess('articles_audits_passes');  //审核
    const hashlogs = this.hasSomeApiAccess('articles_audits_logs');  //日志

      let _this = this
      return {
        isLogModal: false,
        isAuditModal: false,
        baseHeight: 0,
        auditingLoading: false,
        arrPage: [10, 20, 30, 40, 100, 200],
        pageParams: {
          pageNumber: 1,
          pageSize: 10
        },

        // 待审核列表，默认查询场景
        auditingScene: 'CHECK_WAIT',
        searchParams: {
          titleSearch: '',
          fistColumn: '',
          // secondColumn: '',
          submitter: '',
          submitTime: '',
          submitTimeStart: '',
          submitTimeEnd: ''
        },

        firstColumnList: '',
        arrAudit: [],
        ids: '',
        allAudit: false,
        tabIndex:'',

        articleTitle: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            render(h, params) {
              _this.$refs.auditTable&&(_this.$refs.auditTable.objData[0]._isDisabled = true);
            }
          },
          {
            title: 'ID',
            key: 'id',
            width: 80
          },
          {
            title: '标题',
            key: 'title',
            minWidth: 200,
            ellipsis: true,
            render(h, params) {
              return <span title = { params.row.title} >{ params.row.title } </span>
            }
          },
          {
            title: '一级栏目',
            key: 'menuName',
            width: 200
          },
          // {
          //   title: '二级栏目',
          //   key: 'contactState',
          //   width: 100
          // },
          {
            title: '提交人',
            key: 'submitter',
            width: 120
          },
          {
            title: '提交时间',
            key: 'submitTime',
            width: 200,
            align: 'right'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 178,
            render(h, params) {
              let Button = 'Button'
              const preview = _.partial(
                _this.preview,
                params
              )
              const audit = _.partial(
                _this.audit,
                params
              )
              const log = _.partial(
                _this.log,
                params
              )
              return (
                <div>
                  {hashpreview && <Button type='primary' size="small" {...{ on: { click: preview } } } >预览</Button> }
                  {hashpasses && <Button style = 'margin-left:10px;' type = 'primary' size="small" {...{on: {click: audit}}} >审核</Button> }
                  {hashlogs && <Button style="margin-left:10px;" type="primary" size="small" {...{ on: { click: log } }}>日志</Button> }
                </div>
              )
            }
          }
        ]
      }
    },

    activated() {
      this.getAuditingManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: this.auditingScene,
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        submitter: this.searchParams.submitter,
        submitTimeStart: this.searchParams.submitTimeStart,
        submitTimeEnd: this.searchParams.submitTimeEnd
      }).then(res=>{
        this.auditedLoading = false;
      })
    },

    computed: {
      ...mapState({
        pageTotal: state => state.infoManage.pageTotalAuditing,
        auditingList: state => state.infoManage.auditingList
      })
    },

    created() {
      this.fetchFirstColumn()
      this.fetchAuditingManageList();
    },

    mounted() {
      //获取table-height
      this.$nextTick(() => {
        let dom = document.getElementById('auditing-manage')
        this.baseHeight = util.baseHeight(dom, 82)
      })
    },

    methods: {
      ...mapActions([
        'getAuditingManageList',
        'getFirstColumn',
        'getLog'
      ]),

      // 获取一级分类学科筛选列表
      async fetchFirstColumn() {
        await api.getFirstColumn().then(res => {
          if (res.status === 200) {
            this.firstColumnList = res.result
          }
        })
      },

      //获取资讯列表
      async fetchAuditingManageList() {
        this.auditingLoading = true;
        this.pageParams.pageNumber = 1
        this.pageParams.pageSize = 10
        await this.getAuditingManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditingScene
        })
        this.auditingLoading = false;
      },

      // 点击搜索
      searchInfo() {
        this.auditingLoading = true;
        this.pageParams.pageNumber = 1;
        this.getAuditingManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditingScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          submitTimeStart: this.searchParams.submitTimeStart,
          submitTimeEnd: this.searchParams.submitTimeEnd
        })
        this.auditingLoading = false;
      },
      // 清除搜索
      clearInfo() {
        this.searchParams = {
          titleSearch: '',
          fistColumn: '',
          // secondColumn: '',
          submitter: '',
          submitTime: '',
          submitTimeStart: '',
          submitTimeEnd: ''
        };
        this.auditingLoading = true;
        this.pageParams.pageNumber = 1;
        this.getAuditingManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditingScene
        })
        this.auditingLoading = false;
      },
      changeCurrent(num) {
        this.auditingLoading = true;
        this.pageParams.pageNumber = num
        this.getAuditingManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditingScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          submitTimeStart: this.searchParams.submitTimeStart,
          submitTimeEnd: this.searchParams.submitTimeEnd
        })
        this.auditingLoading = false;
      },
      changePageSize(size) {
        this.auditingLoading = true;
        this.pageParams.pageSize = size
        this.getAuditingManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditingScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          submitTimeStart: this.searchParams.submitTimeStart,
          submitTimeEnd: this.searchParams.submitTimeEnd
        })
        this.auditingLoading = false;
      },
      changeInfoTime(date) {
        this.searchParams.submitTime = [...date]
        this.searchParams.submitTimeStart = date[0]
        this.searchParams.submitTimeEnd = date[1]
      },

      // 预览
      preview(params) {
        api.getPreview({
          id: params.row.id
        }).then(res => {
          if (res.status === 200) {
            //保存预览
            let { a, b, c } = res.result
            window.open(
              `${apiConfig.newsUrl}/news/${a}?a=${a}&b=${b}&c=${c}`,
              '_blank'
            )
          }
        })
      },

      // 审核相关
      onSelectionChange(row) {
        this.arrAudit.length = 0
        if (!row.length) {
          return false
        }
        for (let i = 0; i < row.length; i++) {
          this.arrAudit[i] = row[i].id
        }
        this.ids = this.arrAudit.join(',');
      },
      audit(params) {
        this.$refs.auditTable.objData[params.row._index]._isChecked = true
        this.ids = params.row.id;
        this.isAuditModal = true

        this.tabIndex = params.row._index;
        this.allAudit = false;
      },
      auditAll(status) {
        if (!this.arrAudit.length) {
          this.$Message.error('没有选择任何数据')
          return false
        }
        this.isAuditModal = true
        this.allAudit = true;
      },
      cancelChecked(){
        this.$refs.auditTable.objData[this.tabIndex]._isChecked = false;
      },

      onLoadInfoAudit() {
        this.auditingLoading = true;
        this.getAuditingManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditingScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          submitTimeStart: this.searchParams.submitTimeStart,
          submitTimeEnd: this.searchParams.submitTimeEnd
        })
        this.auditingLoading = false;
      },

      // 查看日志
      log(params) {
        this.ids = params.row.id;
        this.getLog({
          id: params.row.id,
          page: 1,
          size: 10
        })
        this.isLogModal = true
      }
    }
  }
</script>
