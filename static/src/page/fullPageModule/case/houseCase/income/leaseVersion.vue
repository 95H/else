<template>
  <div class="lease-version-wrapper">
    <div class="table-head" v-if="showEdit">
      <p class="table-title">收益法租约版</p>
      <edit :editFlag="editFlag" @startEdit="startEdit" @save="save" @cancel="cancel"></edit>
    </div>
    <component :is="view" :style="{height: pageHeight + 'px'}" ref="current" :pageData="pageData" @showEditFlag="showEditFlag"></component>
    <div class="footer-sheet">
      <span v-for="(val, key) in sheet" :key="key" @click="tabClick(key)" :class="activeKey===key ? 'active' : ''">{{key}}</span>
    </div>
  </div>
</template>

<script>
  import edit from '../edit.vue';
  import futureProfit from './futureProfit.vue';
  import profitEvaluate from './profitEvaluate.vue';
  export default {
    data() {
      return {
        sheet: {
          '未来年度净收益表': futureProfit,
          '收益法评估结果表': profitEvaluate
        },
        activeKey: '未来年度净收益表',
        editFlag: false,
        view: futureProfit,
        pageHeight: this.$store.state.cprRightHg-268,
        pageData: '',
        showEdit: false
      };
    },

    components: {
      edit, futureProfit, profitEvaluate
    },

    created() {
      this.initData();
    },

    /*watch: {
      editFlag: {
        handler: function(newVal, oldVal) {
          this.$refs.current['editFlag'] = newVal;
        }
      }
    },*/

    methods: {
      initData() {
        this.$http.post('api/case/getCaseDetails', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          sheetName: '收益法租约版',
          ruleType: '收益法',
          dataId: this.$store.state.caseDataId
        }).then(res=> {
          this.pageData = res.data.data;
        }).catch(err=> {

        })
      },

      startEdit() {
        this.editFlag = true;
        this.$refs.current['startEdit']();
      },

      save() {
        this.editFlag = false;
        this.$refs.current['save']();
      },

      cancel() {
        this.editFlag = false;
        this.$refs.current['cancel']();
      },

      tabClick(key) {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
        this.activeKey = key;
        this.view = this.sheet[key];
      },

      showEditFlag(flag) {
        this.showEdit = !!flag;
      },

      deleteCase(sheetNameList) {
        this.showEdit = false;
        if(sheetNameList.indexOf('收益法租约版') > -1) {
          this.activeKey = '未来年度净收益表';
          this.pageData = '';
        }
      },

      tidyActiveNumFn() {
        this.view = futureProfit;
        this.activeKey = '未来年度净收益表';
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .lease-version-wrapper{margin-top: 15px;
    .table-head{display: flex; align-items: center; margin-bottom: 5px; height: 22px; line-height: 22px;
      .table-title{ color: #262628; font-size: 13px; font-weight: 500;
        &:before{content: ''; width: 6px; height: 6px; border-radius: 3px; background-color: #F09237; display: inline-block; margin:0 10px 3px 0; vertical-align: middle;}
      }
    }
    .footer-sheet{margin-top: 1px; border: 1px solid #E5E5E5; height: 25px; width: 100%; font-size: 13px;
      span{display: inline-block; width: 150px; height: 100%; line-height: 25px; text-align: center; border-right: 1px solid #E5E5E5;
        &:hover{color: #fff; background-color: #5FA9EC; cursor: pointer;}
      }
      .active{
        background-color: #5FA9EC; color: #fff
      }
    }
  }

</style>
