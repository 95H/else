<template>
  <Card>
    <Row>
      <span @click="addArticle" style="margin-right:6px;" v-if="hasSomeApiAccess('articles_list_post')">
        <Button type="primary">
          <Icon type="md-add"/>添加文章
        </Button>
      </span>
      <span @click="bactchComint(true)" style="margin-right:6px;" v-if="hasSomeApiAccess('articles_list_batch_submit')">
        <Button type="primary">批量提交</Button>
      </span>
    </Row>
    <Row :gutter="10" type='flex' style="margin-top:20px;">
      <Col span="4" >
        <Input placeholder="请输入标题/ID" v-model="searchParams.titleSearch"/>
      </Col>
      <Col span="4">
        <Select clearable placeholder="一级栏目" v-model="searchParams.fistColumn">
          <Option v-for="(item, index) in firstColumnList" :value="item.menuId" :key="index">{{ item.menuName }}</Option>
        </Select>
      </Col>
      <!-- <Col span="4">
        <Select clearable placeholder="二级栏目" v-model="searchParams.secondColumn">
          <Option v-for="item in selectContac" :value="item.value" :key="item.id">{{ item.label }}</Option>
        </Select>
      </Col> -->
      <Col span="4">
        <DatePicker type="daterange" :value="searchParams.createTime" placeholder="创建时间" style="width:100%;" @on-change="changeInfoTime"></DatePicker>
      </Col>
      <Col span="4">
        <Select clearable placeholder="全部"  v-model="searchParams.subStatus" id="placeholder">
          <Option v-for="item in articleState" :value="item.status" :key="item.id">{{ item.val }}</Option>
        </Select>
      </Col>
      <Col span="4" >
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button >清除</Button></span>
      </Col>
    </Row>

    <Row style="margin-top:20px;" id="table-info-list">
      <Col span="24">
        <Table border ref="submitTable" :height="baseHeight" :loading="informatLoading" :columns="articleTitle" :data="infoList" @on-selection-change="onSelectionChange"/>
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

    <ModalRecall :isRecallModal.sync="isRecallModal" :ids="ids" v-on:onloadInfo="onloadInfoRecall"/>
    <ModalSubmit :isSubmitModal.sync="isSubmitModal" :ids="ids" :all="all" v-on:cancelChecked="cancelChecked" v-on:onloadInfo="onloadInfoSubmit"/>
    <ModalLog :isLogModal.sync="isLogModal" :ids="ids"/>
  </Card>
</template>

<script>
import api from '@/api/index'
import util from '@/util/util'
import apiConfig from '@/config/apiconfig'
import ModalRecall from './modal/modal-recall'
import ModalSubmit from './modal/modal-submit'
import ModalLog from './modal/modal-log'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'inof-list',
  components:{
    ModalSubmit,
    ModalRecall,
    ModalLog
  },

  data () {
    const hasplist_preview = this.hasSomeApiAccess('articles_list_preview');  //预览
    const hasplist_put = this.hasSomeApiAccess('articles_list_put');  //修改
    const hasplist_back = this.hasSomeApiAccess('articles_list_back');  //撤销
    const hasplist_submit = this.hasSomeApiAccess('articles_list_submit');  //提交
    const hasplist_logs = this.hasSomeApiAccess('articles_list_logs');  //日志

    let _this = this
    return {
      isRecallModal: false,
      isSubmitModal: false,
      isLogModal: false,
      all: false,
      ids:'',
      baseHeight: 0,
      informatLoading: true,
      arrPage:[10,20,30,40,100,200],

      pageParams:{
        pageNumber: 1,
        pageSize: 10
      },

      searchParams:{
        titleSearch:'',
        fistColumn:'',
        // secondColumn: '',
        createTime: '',
        createTimeStart: '',
        createTimeEnd: '',
        subStatus: ''
      },

      firstColumnList: '',
      arrSubmit:[],
      tabIndex:'',

      articleState:[
        {
          id: 0,
          status: '',
          val: '全部'
        },
        {
          id: 1,
          status: 'WAIT_CHECK',
          val: '待审核'
        },
        {
          id: 2,
          status: 'SAVE',
          val: '已保存'
        },
        {
          id: 3,
          status: 'BACK',
          val: '已退回'
        },
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
          type: 'selection',
          width: 60,
          align: 'center',
          render(h, params) {
            _this.$refs.submitTable&&(_this.$refs.submitTable.objData[0]._isDisabled = true);
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
            return <span title={params.row.title}>{params.row.title}</span>
          }
        },
        {
          title: '一级栏目',
          key: 'menuName',
          width: 100
        },
        // {
        //   title: '二级栏目',
        //   key: 'tagNames',
        //   width: 100
        // },
        {
          title: '浏览量（PV）',
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
          title: '创建时间',
          key: 'createTime',
          align: 'right',
          width: 200
        },
        {
          title: '提交人',
          key: 'submitter',
          width: 100,
        },
        {
          title: '提交时间',
          key: 'submitTime',
          width: 200,
          align: 'right'
        },
        {
          title: '状态',
          key: 'status',
          width: 100,
          render: (h, params) => {
            let type = '';
            if (params.row.status === 'WAIT_CHECK') {
              _this.$refs.submitTable&&(_this.$refs.submitTable.objData[params.row._index]._isDisabled = true);
              type = '待审核';
            } else if (params.row.status === 'SAVE') {
              type = '已保存';
            } else if (params.row.status === 'BACK') {
              type = '已退回';
            } else if (params.row.status === 'OUT') {
              type = '已下架';
            } else if (params.row.status === 'PUT') {
              _this.$refs.submitTable&&(_this.$refs.submitTable.objData[params.row._index]._isDisabled = true);
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
          menuId: 'menuId',
          tagIds: 'tagIds',
          modifierId: 'modifierId',
          submitterId: 'submitterId',
          fixed: 'right',
          width: 278,
          render(h, params) {
            let Button = 'Button'
            const preview = _.partial(
              _this.preview,
              params
            )
            const modifi = _.partial(
              _this.modifi,
              params
            )
            const recall  = _.partial(
              _this.recall ,
              params
            )
            const submits = _.partial(
              _this.submits,
              params
            )
            const log = _.partial(
              _this.log,
              params
            )
            return (
              //现在的
              <div>
                { hasplist_preview && <Button type="primary" size="small" {...{ on: { click: preview } }}>预览</Button>}

                {
                  hasplist_put && (params.row.status==="PUT"|| params.row.status==="WAIT_CHECK"
                  ? <Button disabled style="margin-left:10px;" type="primary" size="small" {...{ on: { click: modifi } }}>修改</Button>
                  : <Button style="margin-left:10px;" type="primary" size="small" {...{ on: { click: modifi } }}>修改</Button>)
                }
                {
                  hasplist_back && (params.row.status==="WAIT_CHECK"
                  ? <Button style="margin-left:10px;" type="primary" size="small" {...{ on: { click: recall } }}>撤回</Button>
                  : <Button disabled style="margin-left:10px;" type="primary" size="small" {...{ on: { click: recall } }}>撤回</Button>)
                }
                {
                  hasplist_submit && (params.row.status==="PUT" || params.row.status==="WAIT_CHECK"
                  ? <Button disabled style="margin-left:10px;" type="primary" size="small" {...{ on: { click: submits } }}>提交</Button>
                  : <Button style="margin-left:10px;" type="primary" size="small" {...{ on: { click: submits } }}>提交</Button>)
                }

                { hasplist_logs && <Button style="margin-left:10px;" type="primary" size="small" {...{ on: { click: log } }}>日志</Button>}
              </div>

            )
          }
        }
      ]
    }
  },

  // beforeRouteLeave(to, from, next) {
  //   let keepAlivePaths = {
  //     'add-article': 1,
  //     'update-article': 1,
  //   }

  //   if (keepAlivePaths[to.name]) {
  //     from.meta.keepAlive = true
  //   } else {
  //     from.meta.keepAlive = false
  //   }
  //   next()
  // },

  created(){
    this.fecthManageList();
    this.fecthFirstColumn();
  },

  mounted(){
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-info-list");
      this.baseHeight = util.baseHeight(dom, 82);
    });
  },

  activated() {
    // this.$store.commit("removeTag", 'add-article');
    // this.$store.commit("closePage", 'add-article');
    // this.$store.commit("removeTag", 'update-article');
    // this.$store.commit("closePage", 'update-article');
    this.pageParams.pageNumber = 1;
    this.getInfoManageList({
      page: 1,
      size: this.pageParams.pageSize,
      scene: 'LIST',
      title: this.searchParams.titleSearch,
      menuIds: this.searchParams.fistColumn,
      submitTimeStart: this.searchParams.subTime,
      status: this.searchParams.subStatus,
    }).then(res=>{
      this.mentor_loading = false;
    })
  },

  computed: {
    ...mapState({
      pageTotal: state => state.infoManage.pageTotal,
      infoList: state => state.infoManage.infoList
    })
  },

  methods: {
    ...mapActions([
      'getInfoManageList',
      'getFirstColumn',
      'getLog'
    ]),

    //获取资讯列表
    async fecthManageList() {
      this.pageParams.pageNumber = 1
      this.pageParams.pageSize = 10
      await this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST'
      })
      this.informatLoading = false;
    },

    async fecthFirstColumn(){
      await api.getFirstColumn().then(res => {
          if (res.status === 200) {
            this.firstColumnList=res.result;
          }
        })
    },

    addArticle() {
      console.log('新增')
      this.$router.push({
        name: 'add-article',
        query: {
          active: 'addArticle'
        }
      })
    },

    bactchComint(status) {
      if(!this.arrSubmit.length){
         this.$Message.error('没有选择任何数据')
        return false
      }
      this.isSubmitModal = true;
      this.all = true;
    },

    changeInfoTime(date) {
      this.searchParams.createTime = [...date];
      this.searchParams.createTimeStart = date[0];
      this.searchParams.createTimeEnd = date[1]
    },

    onSelectionChange(row) {
      this.arrSubmit.length = 0;
      if (!row.length) {
        return false
      }
      for (let i = 0; i < row.length; i++) {
        this.arrSubmit[i] = row[i].id
      }
      this.ids = this.arrSubmit.join(',');
    },

    chooseSubTime(time) {
      this.searchParams.subTime = time;
    },

    serchInfo() {
      this.pageParams.pageNumber = 1;
      this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST',
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        createTimeStart: this.searchParams.createTimeStart,
        createTimeEnd: this.searchParams.createTimeEnd,
        status: this.searchParams.subStatus,
      })
    },

    clearInfo() {
      this.searchParams = {
        titleSearch: '',
        fistColumn: '',
        subTime: '',
        subStatus: ''
      };
      this.pageParams.pageNumber = 1;
      this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST'
      })
    },

    changeCurrent(num) {
      this.pageParams.pageNumber = num
      this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST',
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        createTimeStart: this.searchParams.createTimeStart,
        createTimeEnd: this.searchParams.createTimeEnd,
        status: this.searchParams.subStatus,
      })
    },

    changePageSize(size) {
      this.pageParams.pageSize = size
      this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST',
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        createTimeStart: this.searchParams.createTimeStart,
        createTimeEnd: this.searchParams.createTimeEnd,
        status: this.searchParams.subStatus,
      })
    },

    preview(params) {
      api.getPreview({
        id:params.row.id
      }).then(res=>{
        if(res.status===200){
            //保存预览
              let { a, b, c } = res.result
              //https://online-dev.boxuegu.com/articles/9?a=9&b=1550454271088&c=C94284D9B6E2C95E8E305673757050E7

              window.open(
                `${apiConfig.newsUrl}/news/${a}?a=${a}&b=${b}&c=${c}`,
                '_blank'
              )
        }
      })
    },

    modifi(params) {
      this.$router.push({
        name: 'update-article',
        query: {
          active: 'updateArticle',
          id: params.row.id
        }
      })
    },

    recall(params) {
      this.isRecallModal = true;
      this.ids = params.row.id
    },

    submits(params) {
      this.tabIndex = params.row._index;
      this.all = false;
      this.$refs.submitTable.objData[params.row._index]._isChecked = true;
      this.isSubmitModal = true;
      this.ids = params.row.id
    },

    log(params){
      this.ids = params.row.id;
      this.getLog({
        id: params.row.id,
        page: 1,
        size: 10
      })
      this.isLogModal = true
    },

    cancelChecked(){
      this.$refs.submitTable.objData[this.tabIndex]._isChecked = false;
    },

    onloadInfoSubmit(){
      this.pageParams.pageNumber = 1
      this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST',
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        status: this.searchParams.subStatus,
      })
    },

    onloadInfoRecall(){
      this.getInfoManageList({
        page: this.pageParams.pageNumber,
        size: this.pageParams.pageSize,
        scene: 'LIST',
        title: this.searchParams.titleSearch,
        menuIds: this.searchParams.fistColumn,
        status: this.searchParams.subStatus,
      })
    }
  },
  watch:{

  }
}
</script>

<style lang="less" scope>
#placeholder{
  /deep/ .ivu-select-placeholder{
    color:#515a6e;
  }
}
</style>
