<template>
  <div class="income-law-wrapper">
    <ul class="income-version clear">
      <li class="versionTab" v-for="(tab, index) in versionTab" :class="{activeTab: activeTab===index}"
          :key="index" @click="checkoutTab(tab, index)">{{tab}}</li>
    </ul>
    <component :is="view" :pageData="pageData" ref="currentComponent" ></component>
    <!--<keep-alive>

    </keep-alive>-->
  </div>
</template>

<script>
  import simpleVersion from './simpleVersion' ;
  import leaseVersion from './leaseVersion';
  export default {
    data() {
      return {
        versionTab: ['收益法简版', '收益法租约版'],
        activeTab: 0,
        view: simpleVersion,
        tabContent: {
          '收益法简版': simpleVersion,
          '收益法租约版': leaseVersion
        },
        pageData: '',
      };
    },
    created() {
      this.$store.state.incomeLawInitData = this.initData;
    },
    methods: {
      checkoutTab(item, index) {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
        this.activeTab = index;
        this.view = this.tabContent[item];
      },
      initData(){
        if(this.activeTab !== 0) {
          this.$refs['currentComponent'].initData();
        }
        this.$http.post('api/case/getCaseDetails', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          sheetName: '',
          ruleType: '收益法',
          dataId: this.$store.state.caseDataId
        }).then(res=> {
          this.pageData = res.data.data;
        }).catch(err=> {
          this.$messageError(err);
        })
      },

      deleteCase(sheetNameList) {
        if(sheetNameList.indexOf('收益法简版') > -1) {
          this.pageData = '';
        }
        this.$refs['currentComponent'].deleteCase(sheetNameList);
      },

      tidyActiveNumFn() {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
        this.activeTab = 0;
        this.view= simpleVersion
        this.$refs['currentComponent'].tidyActiveNumFn();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .income-law-wrapper{
    margin-top: 10px;
    border-top: 1px solid #ECECEC;
    .income-version{
      height: 35px; line-height: 35px; font-size: 13px; color: #262628; border-bottom: 1px solid #ECECEC;
      .versionTab{float: left; margin-right: 20px; cursor: pointer;
        &:hover{color: #145FD2;  }
      }
      .activeTab{color: #145FD2; border-bottom: 2px solid #145FD2;}
    }
    /deep/ .el-scrollbar__wrap{overflow-x: hidden;}
  }
</style>
