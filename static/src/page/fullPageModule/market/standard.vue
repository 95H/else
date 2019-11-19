<template>
  <div class="standard-box">
    <!-- 财务标准值 -->
    <el-table
      v-if="this.$route.params.id=='finance'"
      :data="standardData"
      border
      height="100%"
      style="width: 100%"
      size="mini"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        prop="recheckPersonName"
        label="财务指标"
        align="center"
        width="180">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.recheckPersonName">
              {{ scope.row.recheckPersonName || "--" }}
          </div>
        </template>      
      </el-table-column>
      <el-table-column
        prop="recheckPersonData"
        label=""
        align="center"
        width="180">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.recheckPersonData">
              {{ scope.row.recheckPersonData  || "--" }}
          </div>
        </template>      
      </el-table-column> 
      <el-table-column
        prop="excellentValue"
        label="优秀值100"
        align="center">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.excellentValue">
              {{ scope.row.excellentValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="goodValue"
        label="良好值80"
        align="center">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.goodValue">
              {{ scope.row.goodValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="meanValue"
        align="center"
        label="平均值60">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.meanValue">
              {{ scope.row.meanValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="lowerValue"
        align="center"
        label="较低值40">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.lowerValue">
              {{ scope.row.lowerValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="badValue"
        align="center"
        label="较差值20">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.badValue">
              {{ scope.row.badValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="weightValue"
        align="center"
        label="权重">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.weightValue">
              {{ scope.row.weightValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
    </el-table>

    <!-- 业务标准值 -->
    <el-table
      v-if="this.$route.params.id=='business'"
      :data="standardData"
      border
      stripe
      height="100%"
      style="width: 100%"
      size="mini"
      :span-method="arraySpanMethod"
    >
      <el-table-column label="指标" width="180" align='center'>
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.recheckPersonName">
              {{ scope.row.recheckPersonName  || "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="" width="180" align='center'>
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.recheckPersonData">
              {{ scope.row.recheckPersonData  || "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="excellentValue"
        label="100"
        align="center">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.excellentValue">
              {{ scope.row.excellentValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="goodValue"
        label="80"
        align="center">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.goodValue">
              {{ scope.row.goodValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="meanValue"
        align="center"
        label="60">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.meanValue">
              {{ scope.row.meanValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="lowerValue"
        align="center"
        label="40">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.lowerValue">
              {{ scope.row.lowerValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="badValue"
        align="center"
        label="20">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.badValue">
              {{ scope.row.badValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
      <el-table-column
        prop="weightValue"
        align="center"
        label="权重">
        <template slot-scope="scope">
          <div class="textOverflow" :title="scope.row.weightValue">
              {{ scope.row.weightValue  || "--" }}
          </div>
        </template>    
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import pagination from '@/components/pagination.vue';
  export default{
    components: {pagination},
    data () {
      return {
        standardData : [],
        financeSpanArr: [],  //合并单元格
        sameRowArr: [],
        idx: 0,
      }
    },
    created () {
      this.getStandardData();
    },
    watch:{
      "$route.params.id" () {
        this.getStandardData();
      },
    },
    mounted(){
      this.$store.state.getStandardData = ()=>{
        this.getStandardData();
      }
    },
    methods: {
      //财务标准值列表数据接口
      getStandardData() {
        let url = 'api/marketTransit/';
        if(this.$route.params.id == "finance"){
          url += "getfinanaList";
        }else{
          url += "getBusinessList";
        }
        this.$http.post(url)
        .then(res=>{
          this.standardData = res.data.tableList;
          //console.log(this.tableList);
          this.getSpanArr(res.data.tableList);
          // this.getSameRowArr(res.data.tableList);
        }).catch(err=>{
          this.$messageError(err);
        })
      },
      //合并单元格
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      	//console.log(rowIndex,columnIndex);
        if (columnIndex === 0) {
          let _row = this.financeSpanArr[rowIndex];
          let _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        };
      },
      //判断id是否相同
      getSpanArr(data) {
      	//console.log(data);
      	this.financeSpanArr = [];
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.financeSpanArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].recheckPersonId === data[i - 1].recheckPersonId) {
              this.financeSpanArr[this.pos] += 1;
              this.financeSpanArr.push(0);
            } else {
              this.financeSpanArr.push(1);
              this.pos = i;
            }
          }
        }
      },
    },
  }
</script>
<style scoped lang="scss">
.standard-box{
  position: absolute;
  left: 15px;
  top: 30px;
  right: 15px;
  bottom: 1px;
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background: #fff;
  }
}

/deep/.el-table--enable-row-hover .el-table__body tr:hover>td{
  background: #fff !important;
}
/deep/ .el-table .el-table__header-wrapper thead th:first-child{
  border-right: none;
  text-align: right;
}
/deep/ .el-table .cell, .el-table th div:first-child{
  padding-right: 0 !important;
}
/deep/ .el-table td div{
  line-height: 18px;
  padding: 3px;
}
/deep/ .el-table--striped .el-table__body tr.el-table__row--striped td{
  background: #fff;
}

</style>
