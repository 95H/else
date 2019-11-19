<template>
  <Card>
    <Row :gutter="10" type='flex'>
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
        <DatePicker type="daterange" :value="searchParams.publishTime" placeholder="发布时间" style="width:100%;"
                    @on-change="changePublishTime"></DatePicker>
      </Col>
      <Col span="4">
        <Select clearable placeholder="全部"  v-model="searchParams.status" id="placeholder">
          <Option v-for="item in articleState" :value="item.status" :key="item.id">{{ item.val }}</Option>
        </Select>
      </Col>
      <Col span="4">
        <span @click="searchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button>清除</Button></span>
      </Col>
    </Row>

    <Row style="margin-top:20px;" id="audited-manage">
      <Col span="24">
        <Table border ref="auditTable" :height="baseHeight" :loading="auditedLoading" :columns="articleTitle"
               :data="auditedList"/>
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
    <ModalOut :isOutModal.sync="isOutModal" :ids="ids" v-on:onLoadInfoOutOk="onLoadInfoOutOk"/>
  </Card>
</template>

<script>
  import apiConfig from '@/config/apiconfig'
  import api from '@/api/index'
  import util from '@/util/util'
  import ModalLog from './modal/modal-log'
  import ModalOut from './modal/modal-out'
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'audited-manage',
    components: { ModalLog, ModalOut },
    data() {
      let _this = this
      return {
        isLogModal: false,
        isOutModal: false,
        baseHeight: 0,
        auditedLoading: false,
        arrPage: [10, 20, 30, 40, 100, 200],
        pageParams: {
          pageNumber: 1,
          pageSize: 10
        },

        // 已审核列表，默认查询场景
        auditedScene: 'CHECK_PASS',
        searchParams: {
          titleSearch: '',
          fistColumn: '',
          // secondColumn: '',
          submitter: '',
          publishTime: '',
          publishTimeStart: '',
          publishTimeEnd: '',
          status: ''
        },

        firstColumnList: '',
        arrAudit: [],
        ids: '',

        articleState: [
          {
            id: 4,
            status: 'PUT',
            val: '已上架'
          },
          {
            id: 5,
            status: 'OUT',
            val: '已下架'
          }
        ],

        articleTitle: [
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
            title: '浏览量\n（PV）',
            key: 'pv',
            align: 'right',
            width: 120
          },
          {
            title: '点击量（UV）',
            key: 'uv',
            align: 'right',
            width: 120
          },
          {
            title: '提交人',
            key: 'submitter',
            width: 120
          },
          {
            title: '发布时间',
            key: 'publishTime',
            width: 200,
            align: 'right'
          },
          {
            title: '审核人',
            key: 'publisher',
            width: 120,
          },
          {
            title: '状态',
            key: 'status',
            width: 100,
            render: (h, params) => {
              let type = '';
              if (params.row.status === 'WAIT_CHECK') {
                type = '待审核';
              } else if (params.row.status === 'SAVE') {
                type = '已保存';
              } else if (params.row.status === 'BACK') {
                type = '已退回';
              } else if (params.row.status === 'OUT') {
                type = '已下架';
              } else if (params.row.status === 'PUT') {
                type = '已上架';
              }
              return h(
                'span',
                type
              )
            }
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
              const out = _.partial(
                _this.out,
                params
              )
              const log = _.partial(
                _this.log,
                params
              )
              return (
                <div>
                <Button type='primary' size="small" {...{ on: { click: preview } } } >预览</Button>
              {
                params.row.status === "OUT"
                  ? <Button disabled style = 'margin-left:10px;' type = 'primary' size="small" {...{on: {click: out}}} >下架</Button>
              : <Button style = 'margin-left:10px;' type = 'primary' size="small" {...{on: {click: out}}} >下架</Button>
              }
              <Button style="margin-left:10px;" type="primary" size="small" {...{ on: { click: log } }}>日志</Button>
              </div>
            )
            }
          }
        ]
      }
    },

    activated() {
      this.getAuditedManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: this.auditedScene,
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        submitter: this.searchParams.submitter,
        publishTimeStart: this.searchParams.publishTimeStart,
        publishTimeEnd: this.searchParams.publishTimeEnd,
        status: this.searchParams.status
      }).then(res=>{
        this.auditedLoading = false;
      })
    },

    computed: {
      ...mapState({
        pageTotal: state => state.infoManage.pageTotalAudited,
        auditedList: state => state.infoManage.auditedList
      })
    },

    created() {
      this.fetchFirstColumn()
      this.fetchAuditedManageList();
    },

    mounted() {
      //获取table-height
      this.$nextTick(() => {
        let dom = document.getElementById('audited-manage')
        this.baseHeight = util.baseHeight(dom, 82)
      })
    },

    methods: {
      ...mapActions([
        'getAuditedManageList',
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
      async fetchAuditedManageList() {
        this.auditedLoading = true;
        this.pageParams.pageNumber = 1
        this.pageParams.pageSize = 10
        await this.getAuditedManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditedScene
        })
        this.auditedLoading = false;
      },

      // 点击搜索
      searchInfo() {
        this.auditedLoading = true;
        this.pageParams.pageNumber = 1;
        this.getAuditedManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditedScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          publishTimeStart: this.searchParams.publishTimeStart,
          publishTimeEnd: this.searchParams.publishTimeEnd,
          status: this.searchParams.status
        })
        this.auditedLoading = false;
      },
      // 清除搜索
      clearInfo() {
        this.searchParams = {
          titleSearch: '',
          fistColumn: '',
          // secondColumn: '',
          submitter: '',
          publishTime: '',
          publishTimeStart: '',
          publishTimeEnd: ''
        };
        this.auditedLoading = true;
        this.pageParams.pageNumber = 1;
        this.getAuditedManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditedScene,
        })
        this.auditedLoading = false;
      },
      changeCurrent(num) {
        this.auditedLoading = true;
        this.pageParams.pageNumber = num
        this.getAuditedManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditedScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          publishTimeStart: this.searchParams.publishTimeStart,
          publishTimeEnd: this.searchParams.publishTimeEnd,
          status: this.searchParams.status
        })
        this.auditedLoading = false;
      },
      changePageSize(size) {
        this.auditedLoading = true;
        this.pageParams.pageSize = size
        this.getAuditedManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditedScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          publishTimeStart: this.searchParams.publishTimeStart,
          publishTimeEnd: this.searchParams.publishTimeEnd,
          status: this.searchParams.status
        })
        this.auditedLoading = false;
      },
      changePublishTime(date) {
        this.searchParams.publishTime = [...date]
        this.searchParams.publishTimeStart = date[0]
        this.searchParams.publishTimeEnd = date[1]
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

      // 下架
      out(params) {
        this.ids = params.row.id;
        this.isOutModal = true;
      },
      onLoadInfoOutOk() {
        this.auditedLoading = true;
        this.getAuditedManageList({
          page: this.pageParams.pageNumber,
          size: this.pageParams.pageSize,
          scene: this.auditedScene,
          title: this.searchParams.titleSearch,
          menuIds: this.searchParams.fistColumn,
          submitter: this.searchParams.submitter,
          publishTimeStart: this.searchParams.publishTimeStart,
          publishTimeEnd: this.searchParams.publishTimeEnd
        })
        this.auditedLoading = false;
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
