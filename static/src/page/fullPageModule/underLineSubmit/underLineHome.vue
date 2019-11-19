<template>
  <div class="wrapper">
    <div>
      <header>
        <span v-if="/projectImplementation|externalOffLineTask/.test($route.path)" class="table_title"><i class="iconfont icon-xiangmuxinxi"></i>项目主页</span>
        <span v-else class="icon_con">审核主页</span>
      </header>
      <div class="content_wrapper">
        <tableTree
          :columns="columns"
          :tree-structure="true"
          :data-source="dataSource"
          :defaultExpandAll="true"
          :tableHeader="true"
          treeType="enter"
          @enterDetail="enterDetail">
        </tableTree>
      </div>
    </div>
  </div>
</template>

<script>

import Public from "../../../public.js";
import tableTree from '@/components/tableTree.vue';
export default {
  data() {
    return {
      columns: [
        {
          text: '机构',
          dataIndex: 'name',
          type: 'text',
          width: '320px'
        },
        {
          text: '审核情况',
          dataIndex: 'statusList',
          type: 'text',
        },
        {
          text: '操作',
          type: 'text',
          width: '110px'
        },
      ],

      dataSource: [],
    };
  },
  created() {
    let _this = this;
    _this.$store.state.getExternalTree = ()=>{
      _this.getTableTree();
    }
    if(/examineModification/g.test(_this.$route.path) && _this.$parent.$parent.finishFlag){
      _this.getTableTree();//  当外审作业时，打开新的页面执行一次
    }else if(/projectImplementation|projectAuditing/g.test(_this.$route.path)){
      _this.getTableTree();
    }

  },

  methods: {
    enterDetail(value){
      let _this = this;
      this.$store.state.projectId = value.row.projectId;
      this.$store.state.investorId = value.row.investorId;
      //外审修改页面跳转
      if(/examineModification|externalOffLineAudit/g.test(_this.$route.path)){
        this.$router.push({
          path: /externalOffLineAudit/.test(_this.$route.path) ?  '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOffLineAudit/underLineHome/underLineSubmit/' + value.row.investorId : '/zlpg/project/projectCont/examineModification/externalOffLineTask/underLineHome/underLineSubmit/' + value.row.investorId
        })
        if(!/projectAuditing/.test(_this.$route.path)){
          this.changeTabType(value.row.changeInvestorId);
        }
      }else{
        this.$router.push({
          path: /projectImplementation/.test(_this.$route.path) ? '/zlpg/project/projectCont/projectImplementation/projectUnderLineTask/underLineHome/underLineSubmit/' + value.row.investorId : '/zlpg/project/projectCont/projectAuditing/projectReportAudit/underLineHome/underLineSubmit/' + value.row.investorId
        })
      }
    },

    changeTabType(investorId) {
      let _this = this;
      _this.$http.post('/api/changeInvestors/copyInvestorOtherData', {
        projectId: _this.$store.state.projectId,
        investorId,
        onlineOffline: 0,
        type: 4
      }).then(function(data) {

      }).catch(function(error) {
        _this.$messageError(error);
      });
    },

    getTableTree(){
      let _this = this;
      let data = {projectId: _this.$store.state.projectId};
      _this.$http.post('api/investors/findInvestorsStatus', data)
        .then(res=>{
          _this.dataSource = res.data;
          _this.$store.state.hasTreeInfo = false;
        })
        .catch(err=>{
          _this.$messageError(err);
        })
    }
  },

  components: {
    tableTree
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .wrapper{
    header{ padding: 10px 34px 12px; background-color: #FAFAFA; border: 1px solid #ECECEC ; border-bottom:  none;
      .icon_con{font-size: 13px; font-weight: 500; color: #262628; position: relative;
        &:before{content: ''; display: inline-block; width: 13px; height: 13px;
          background: url("../../../../static/img/project_sh2.png") center no-repeat;
          position: absolute; left: -18px; top: 3px;
        }
      }
      .table_title{font-size: 13px; font-weight: 500; color: #262628;
        .icon-xiangmuxinxi{font-size: 13px; color: #f7b543; margin:0 10px 0 -20px;}
      }
    }
    .content_wrapper{
      /deep/ .el-table__header-wrapper{ .has-gutter{ th .cell{text-align: center;}}}
    }
  }

  .content_wrapper{
    padding: 10px;
    border: 1px solid #ECECEC;
  }
</style>
