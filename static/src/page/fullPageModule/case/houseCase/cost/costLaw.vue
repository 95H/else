<template>
  <div class="cost-wrapper" id="cost_wrapper">
    <vue-scroll @handle-scroll="handleScroll" :style="{height: pageHeight}">
      <keep-alive>
        <component :is="view" :casePageData="casePageData" :currentSheet="currentSheet"  ref="evaluateExcel"></component>
      </keep-alive>
    </vue-scroll>
    <!-- <el-scrollbar :style="{height: pageHeight}" ref="elscrollbar">
      <keep-alive>
        <component :is="view" :casePageData="casePageData" :currentSheet="currentSheet"></component>
      </keep-alive>
    </el-scrollbar> -->
    <scrollTab ref="footer-tab" v-if='tabArr.length' :isSelectM="false" :tabArr = "tabArr" @tabClick="tabClick"></scrollTab>
  </div>
</template>

<script>
  import scrollTab from '@/components/scrollTab2';
  import evaluateExcel from './evaluateExcel.vue';
  import feeExcel from './feeExcel';
  export default {
    data() {
      return {
        casePageData:'',
        sheet: {},
        tabArr: [],
        view: evaluateExcel,
        currentSheet: '',
      };
    },

    components: {
      evaluateExcel, feeExcel, scrollTab
    },

    created() {

    },

    computed: {
      pageHeight() {
        return  this.$store.state.cprRightHg-168 + 'px'
      }
    },

    mounted() {

    },

    methods: {
      tabClick(data) {
        var _this = this;
        var activeNum = 0;
        if(!this.$store.state.caseTabFlag){
          this.$messageError('请先保存！');
          console.log(_this.currentSheet);
          for(var i = 0;i< this.tabArr.length;i++){
              if(this.tabArr[i].name==_this.currentSheet){
                activeNum = i;
                break;
              }
          };
          this.$refs['footer-tab'].active = i;
          return
        }
        this.view = this.sheet[data.name];
        this.currentSheet = data.name;
        if(data.name=='成本法评估值计算表'){
          $('#cost_wrapper .__rail-is-vertical').css('display','block')
        }else{
           $('#cost_wrapper .__rail-is-vertical').css('display','none')
        }
      },

      deleteCase() {
        this.casePageData = '';
      },
      handleScroll(){
        //滚动的时候 需要将下拉框的隐藏
        if(this.$refs.evaluateExcel.handleValueRatio){
            this.$refs.evaluateExcel.handleValueRatio(false);
        }
         if(this.$refs.evaluateExcel.curDateRef){
            var obj = {
              "curDateRef":this.$refs.evaluateExcel.curDateRef
            };
            this.$refs.evaluateExcel.$refs[obj['curDateRef']][0].handleClose();
         }
      },
      tidyActiveNumFn() {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
        this.view = evaluateExcel;
        this.currentSheet = '成本法评估值计算表'
        $('#cost_wrapper .__rail-is-vertical').css('display','block')
      },

      initData(){
        var _this = this;
        this.$http.post('api/case/getCaseDetails', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          sheetName: '',
          ruleType: '成本法',
          dataId: this.$store.state.caseDataId
        }).then(res=> {
          this.casePageData = res.data.data;
          if(!res.data.sheetNameList) return;
          this.tabArr =[];
          res.data.sheetNameList.split(',').forEach(item=> {
            this.tabArr.push({name: item})
          })
          /*for(var i =0;i<res.data.sheetNameList.split(',').length;i++){
            this.tabArr.push({name:res.data.sheetNameList[i]});
          }*/
          this.tabArr.forEach((item)=> {
            if(item.name === '成本法评估值计算表'){
              this.sheet[item.name] = evaluateExcel;
              this.currentSheet = '成本法评估值计算表'
            }else {
              this.sheet[item.name] = feeExcel;
            }
          })
        }).catch(err=> {
          this.$messageError(err);
        })
    },

    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  /deep/ .el-scrollbar__wrap{overflow-x: hidden;}
</style>
