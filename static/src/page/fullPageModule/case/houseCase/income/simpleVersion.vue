<template>
  <div class="simple-version-wrapper">
    <div class="table-head" v-if="showEdit">
      <p class="table-title">收益法简版</p>
      <edit :editFlag="editFlag" @startEdit="startEdit" @save="save" @cancel="cancel"></edit>
    </div>
    <component  :is="view" :style="{height: pageHeight}" ref="currentComponent" :pageData="pageData" @showEditFlag="showEditFlag"></component>
    <div class="footer-sheet">
      <span v-for="(val, key) in sheet" :key="key" @click="tabClick(key)" :class="activeKey===key ? 'active' : ''">{{key}}</span>
    </div>
  </div>
</template>

<script>
  import edit from '../edit.vue';
  import objectiveRent from './objectiveRent.vue';
  import profitCalculate from './profitCalculate.vue';
  import scrollTab from '@/components/scrollTab2';
  export default {
    props: ['pageData', 'sheetNameList'],

    data() {
      return {
        sheet: {
          '客观租金确定过程表' : objectiveRent,
          '收益法测算过程表' : profitCalculate
        },
        tabArr: [
          {name: '客观租金确定过程表', count: 0},
          {name: '收益法测算过程表', count: 1},
        ],

        activeKey: '客观租金确定过程表',
        editFlag: false,
        view: objectiveRent,
        showEdit: false,
      };
    },
    computed: {
      pageHeight() {
        return this.$store.state.cprRightHg-268 + 'px';
      }
    },

    components: {
      edit, objectiveRent, scrollTab, profitCalculate
    },

    created() {
      // this.$http.post('api/case/getCaseDetails', {
      //   projectId: this.$store.state.projectId,
      //   investorId: this.$store.state.investorId,
      //   sheetName: '',
      //   ruleType: '收益法',
      //   dataId: this.$store.state.caseDataId
      // }).then(res=> {
      //   this.pageData = res.data.data;
      // }).catch(err=> {
      //   this.$messageError(err);
      // })
    },
    methods: {
      startEdit() {
        this.editFlag = true;
        this.$refs.currentComponent['startEdit']();
      },

      initData(){
        this.$http.post('api/case/getCaseDetails', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          sheetName: '收益法简版',
          ruleType: '收益法',
          dataId: this.$store.state.caseDataId
        }).then(res=> {
          this.pageData = res.data.data;
        }).catch(err=> {

        })
      },

      save() {
        this.editFlag = false;
        this.$refs.currentComponent['save']();
      },

      cancel() {
        this.editFlag = false;
        this.$refs.currentComponent['cancel']();
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
        if(sheetNameList.indexOf('收益法简版') > -1) {
          this.activeKey = '客观租金确定过程表';
          this.$parent.pageData = '';
        }
      },

      tidyActiveNumFn() {
        this.view = objectiveRent;
        this.activeKey = '客观租金确定过程表';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
  .simple-version-wrapper{
    margin-top: 15px;
    .table-head{display: flex; align-items: center; margin-bottom: 5px; height: 22px; line-height: 22px;
      .table-title{ color: #262628; font-size: 13px; font-weight: 500;
        &:before{content: ''; width: 6px; height: 6px; border-radius: 3px; background-color: #F09237; display: inline-block; margin:0 10px 3px 0; vertical-align: middle;}
      }
    }
    .footer-sheet{ margin-top: 1px; border: 1px solid #E5E5E5; height: 25px; width: 100%; font-size: 13px;
      span{display: inline-block; width: 150px; height: 100%; line-height: 25px; text-align: center; border-right: 1px solid #E5E5E5;
        &:hover{color: #fff; background-color: #5FA9EC; cursor: pointer;}
      }
      .active{
        background-color: #5FA9EC; color: #fff
      }
    }
    /deep/ .el-scrollbar__wrap{overflow-x: hidden;}
  }
</style>
