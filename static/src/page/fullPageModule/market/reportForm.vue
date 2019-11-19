
<template>
  <div class="reportForm">
    <!-- 资产负债表 -->
    <fiexd-table ref="sheetRef" v-if="this.$route.params.id=='assets'" :tableHead="sheetData.tableHead" :tableData="sheetData.tableData" className="assets"></fiexd-table>
    <!-- 利润表 -->
    <fiexd-table ref="sheetRef" v-if="this.$route.params.id=='profit'" :tableHead="sheetData.tableHead" :tableData="sheetData.tableData" className="profit"></fiexd-table>
    <!-- 附表 -->
    <fiexd-table ref="sheetRef" v-if="this.$route.params.id=='other'" :tableHead="sheetData.tableHead" :tableData="sheetData.tableData" className="other"></fiexd-table>
  </div>
</template>
<script>

import fiexdTable from '@/page/fullPageModule/market/fiexdTable'
import tableGroup from '@/page/fullPageModule/market/table-group'
export default {
  data(){
    return {
      sheetData : [],
    }
  },
  components:{ fiexdTable,tableGroup },
  created(){
    this.getFromData();
  },
  mounted(){
    this.$store.state.getFromData = ()=>{
      this.getFromData();
    }
  },
  watch:{
    $route(){
      this.getFromData();
    },
  },
  methods:{
    // 三个报表
    getFromData(){
      let url = '/api/marketTransit/';
        if(this.$route.params.id == 'assets'){
          url += "getBalanceSheet";  //资产负债表
        }else if(this.$route.params.id == 'profit'){
          url += "getStatemen";   //利润表
        }else{
          url += "getSchedule";  //附表
        }
      this.$http.post(url,{
        projectId : this.$store.state.projectId,
        investorId : this.$store.state.investorId,
        caseType : this.$route.query.way == 'trade' ? '2' : '1',
        companyId : !/listed|trade/.test(this.$store.state.companyId) ? this.$store.state.companyId : ""
      }).then(res => {
        this.sheetData = res.data;
        // 数据预处理，增加宽度、固定列、对齐方式
        for(let i=0;i<this.sheetData.tableHead.length;i++){
          this.sheetData.tableHead[i].width = '120px';
          if(i == 0 || i == 1){
            this.sheetData.tableHead[i].flex = 'left';
            this.sheetData.tableHead[0].width = '50px';
            this.sheetData.tableHead[1].width = '180px';
            this.sheetData.tableHead[1].align = 'left';
          }else if(i==6 || i==7){
            this.sheetData.tableHead[i].flex = 'right';
          }
        }
        // 判断是否显示固定列
        this.$nextTick(() => {
          this.$refs.sheetRef && this.$refs.sheetRef.resetTable();
        })
      }).catch(err => {
        this.sheetData = [];  //请求失败将数据清空，防止请求失败时显示错误数据
        this.$messageError(err);
      })
    },
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
.reportForm{ position:absolute;left:15px;top:30px; right:15px; bottom:15px;}
</style>

