<template>
  <div class="fee-excel-wrapper">
    <div class="table-wrapper">
      <p class="tableTitle">{{tableTitle}}</p>
      <el-table
        :data="feeData"
        border
        :max-height="tableHeight"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="B"
          label="名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="C"
          label="取费计算基础"
          align="center">
        </el-table-column>
        <el-table-column
          prop="D"
          label="取费基数"
          align="center">
          <!--<template slot-scope="scope">
            <el-input v-model="scope.row.baseCost"></el-input>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="E"
          label="费率(%)"
          align="center">
          <!--<template slot-scope="scope">
            <el-input v-model="scope.row.ratio"></el-input>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="F"
          label="金额"
          align="center">
          <!--<template slot-scope="scope">
            <el-input v-model="scope.row.amount"></el-input>
          </template>-->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['currentSheet'],

    computed: {
      tableTitle() {
        this.$http.post('api/case/getCaseDetails', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          sheetName: this.currentSheet,
          ruleType: '成本法',
          dataId: this.$store.state.caseDataId
        }).then(res=> {
          let dataArr = [];
          res.data.data[''].forEach(item=> {
            let {B, C, D, E, F} = item;
            dataArr.push({B, C, D, E, F});
          })
          this.feeData = dataArr;
        }).catch(err=> {
          this.$messageError(err)
        })
        return this.currentSheet;
      }
    },

    data() {
      return {

        feeData: [],
        tableHeight: this.$store.state.cprRightHg-215
      };
    },
    created() {

    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.fee-excel-wrapper{
  margin-top: 10px;
  border-top: 1px dashed #ECECEC;
  .tableTitle{
    height: 22px; line-height: 22px;
    margin-top: 15px;
    color: #262628;
    font-size: 13px;
    margin-bottom: 5px;
    &:before{content: ''; width: 6px; height: 6px; display: inline-block; border-radius: 3px; background-color: #F09237; margin-right: 5px; margin-bottom: 2px;}
  }
  .table-wrapper{margin-bottom: 1px;}
  /deep/ .el-table__body-wrapper{.cell{color: #6A6A6A;}}
  /deep/ .el-input__inner{border: none; text-align: center; background-color: transparent;}
}
</style>
