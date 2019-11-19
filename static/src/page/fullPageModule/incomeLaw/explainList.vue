<template>
  <div class="center-body">
    <!--必填信息-->
    <div class="requiredInformation">
      <div class="top">
        <i class="yuni icon-xiangmuxinxi iconfont"></i>
        <span>{{sheetName}}说明用表</span>
      </div>
      <div class="tablebox">
        <el-table :data="tableData" border style="width: 100%" :span-method="objectSpanMethod">
          <el-table-column
            v-for="(headerD,headerKey) in headerData"
            :resizable="false"
            :prop="headerKey"
            :key="headerKey"
            :label="headerD"
            width="123"
          >
            <template slot-scope="scope">
              <span v-if="sheetName === '税金' && headerKey==='B'">{{ $store.state.commafyNumber(scope.row[headerKey]) }}</span>
              <span v-else-if="sheetName === '营业收支' && scope.row.B==='毛利率' && headerKey!='mergeCell' && headerKey!='A' && headerKey!='B' && headerKey!='C' ">{{ scope.row[headerKey]?$store.state.commafyNumber($accMul(scope.row[headerKey],100)):"" }}</span>
              <span v-else>{{ $store.state.commafyNumber(scope.row[headerKey],4) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 折线图盈利状况预测 -->
    <div class="line-chart requiredInformation" v-if="sheetName==='现金流预测表'">
      <div class="top">
        <i class="yuni icon-xiangmuxinxi iconfont"></i>
        <span>盈利情况预测</span>
        <div class="downloadEcharts fr" @click="downloadechartsIMG">
          <i class="iconfont icon-xiazai2 yuni"></i>下载
        </div>
      </div>
      <div class="lineChart" id="incomeLineChart"></div>
    </div>
  </div>
</template>

<script>
import resultTable from "@/components/incomeLaw/resultTable.vue";
import { sortArr } from "@/components/incomeLaw/incomeTableData.js";
export default {
  name: "explainList",
  components: {
    resultTable
  },
  data() {
    return {
      spanArr: [],
      i: 0,
      tableData: [],
      headerData: {},
      sheetName: this.$store.state.dataObj.sheetName,
      projectId: this.$store.state.dataObj.projectId,
      templateId: this.$store.state.incomeInitId,
      investorId: this.$store.state.dataObj.investorId,
      profitTableData: {} //折现
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getShowExplain();
  },
  methods: {
    //盈利预测表折线图数据
    profitForecast() {
      this.$http
        .post("/api/incomeResultData/profitabilityPredicted", {
          sheetName: "盈利预测表",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          condition: ""
        })
        .then(res => {
          this.profitTableData = res.data;
          this.dataSourse(this.profitTableData);
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    dataSourse(tData) {
      if (tData && tData.data) {
        const arr_series = [];
        tData.data.map((val, index) => {
          (val.name = tData.legend[index]),
            (val.type = "line"),
            (val.stack = "总量"),
            (val.data = val.data);
          return arr_series.push(val);
        });
        var option = {
          title: {
            // text: tData.title
            text: ""
          },
          tooltip: {
            trigger: "axis"
          },
          color:[
          "#A2E9EB","#C2B368","#7C9FEE","#EBA2A2","#C3A2EB","#F7B543","#98C268"
          ],
          legend: {
            data: tData.legend,
            top: 20,
            bottom: 20,
            right: 40,
            align: "left",
            itemGap: 20,            
          },
          grid: {
            left: 40,
            right: 40,
            bottom: 20,
            containLabel: true,           
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: tData.date,            
          },
          yAxis: {
            type: "value"
          },
          series: arr_series
        };
      }
      this.$nextTick(() => {
        console.log(document.getElementById("incomeLineChart").offsetHeight);
        console.log(document.getElementById("incomeLineChart").offsetWidth);
        this.incomeLineChart = this.$echarts.init(
          document.getElementById("incomeLineChart")
        );
        this.incomeLineChart.setOption(option);
      });
    },
    // 点击下载导出echarts图表
    downloadechartsIMG() {
      var mycanvas = $("#incomeLineChart").find("canvas")[0];
      var context = mycanvas.getContext("2d");
      var w = mycanvas.width,
        h = mycanvas.height;
      var data = context.getImageData(0, 0, w, h);
      var compositeOperation = context.globalCompositeOperation;
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, w, h);
      var image = mycanvas.toDataURL("image/jpeg");
      context.clearRect(0, 0, w, h);
      context.putImageData(data, 0, 0);
      context.globalCompositeOperation = compositeOperation;
      var $dechartsIMG = document.createElement("a");
      $dechartsIMG.setAttribute("href", image);
      $dechartsIMG.setAttribute("download", "盈利情况预测图表下载");
      $dechartsIMG.click();
    },
    //获取展示数据 自动生成表格
    getShowExplain() {
      // if (this.sheetName == "现金流预测表") {
      //   this.$http
      //     .post("/api/incomeResultData/assessInfo", {
      //       projectId: this.projectId,
      //       investorId: this.investorId,
      //       templateId: this.$store.state.incomeInitId,
      //       sheetName: "现金流"
      //     })
      //     .then(res => {
      //       this.Farray("headerData", res.data);
      //       this.tableData = res.data.slice(1);
      //       this.profitForecast();
      //     })
      //     .catch(error => {});
      // } else {
        //incomexls/showExplain
        this.$http
          .post("/api/incomexls/showExplain/v2", {
            sheetName: this.sheetName,
            projectId: this.projectId,
            investorId: this.investorId,
            templateId: this.$store.state.incomeInitId
          })
          .then(res => {
            if(this.sheetName === "现金流预测表"){
              this.Farray("headerData", res.data);
              this.tableData = res.data.slice(1);
              this.profitForecast();
            }else{
              this.headerData = res.data.shift();
              if (this.sheetName === "税金") {
                res.data.map((val, index) => {
                  val.B = val.B * 100;
                });
              }
                this.tableData = res.data;
              }
          })
          .catch(error => {});
      // }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //表格合并行
      if (this.sheetName === "现金流预测表") {
        return;
      }
      if (columnIndex === 0) {
        if(!row["mergeCell"]){
          return {
            rowspan: 1,
            colspan: 1
          }
        }
        if (rowIndex > 0) {
          if(row["mergeCell"]===this.tableData[rowIndex-1]["mergeCell"]){
            return {
              rowspan: 0,
              colspan: 1
            };
          }else{
            return {
              rowspan: this.lookupCellNumFun(rowIndex, row, "mergeCell"),
              colspan: 1
            };
          }
        } else {
          return {
            rowspan: this.lookupCellNumFun(rowIndex, row, "mergeCell"),
            colspan: 1
          };
        }
      }
    },
    //查找单元格的个数
    lookupCellNumFun(index, rowData, rulesStr) {
      var i = index,
        num = 0;
      while (i < this.tableData.length) {
        if (!this.tableData[i][rulesStr]) {
          if (this.tableData[i]["mergeCell"] === rowData["mergeCell"]) {
            i++;
            num++;
          } else {
            i = this.tableData.length;
          }
        } else {
          if (this.tableData[i][rulesStr] === rowData[rulesStr]) {
            i++;
            num++;
          } else {
            i = this.tableData.length;
          }
        }
      }
      return num;
    },
    //表头数据处理
    Farray(head, data) {
      let newArr = sortArr;
      var tabhead = data[0];
      this[head] = {};
      for (let i = 0; i < newArr.length; i++) {
        if (tabhead[newArr[i]]) {
          this[head][newArr[i]] = tabhead[newArr[i]];
        }
      }
    },
    childMethod() {
      window.location.href =
        "/api/incomeExcel/exportPlain?token=" +
        this.$getCookie("token") +
        "&projectId=" +
        this.$store.state.projectId +
        "&investorId=" +
        this.$store.state.investorId +
        "&sheetName=" +
        this.$store.state.dataObj.sheetName +
        "&templateId=" +
        this.$store.state.incomeInitId;
    }
  },
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.center-body {
  padding: 20px;
  .requiredInformation {
    min-height: 330px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-top: 0;
    margin-bottom: 10px;
    .top {
      height: 35px;
      background: #fafafa;
      border-radius: 2px 2px 0px 0px;
      border: 1px solid rgba(236, 236, 236, 1);
      border-left: 0;
      border-right: 0;
      line-height: 35px;
      .yuni {
        display: inline-block;
        margin-left: 20px;
        width: 13px;
        height: 13px;
        color: rgba(247, 181, 67, 1);
      }
      span {
        display: inline-block;
        margin-left: 10px;
        font-size: 13px;
        font-weight: 600;
      }
    }
    .tablebox {
      padding: 10px;
      .el-table /deep/ .el-table__header-wrapper thead th {
        text-align: center;
      }
    }
    .el-table /deep/ .el-table__body-wrapper td {
      height: 48px;
      text-align: center;
    }
  }
  .lineChart {
    height: 400px;
    width: 988px;
    margin-bottom: 30px;
  }
  /deep/.center-body .requiredInformation .el-table .el-table__body-wrapper td {
    height: 30px;
  }
  .downloadEcharts {
    padding-right: 20px;
    color: #f09237;
    font-size: 12px;
    cursor: pointer;
    i {
      margin-right: 6px;
      font-size: 12px;
    }
    &:hover{
     text-decoration: underline;
  }
  /deep/ .el-table__empty-block {
    height: 300px;
    background: url(../../../assets/common/nodata.png) no-repeat center;
    .el-table__empty-text {
      margin-top: 100px;
    }
  }
}
}
</style>
