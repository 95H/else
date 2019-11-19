<template>
  <div class="income-result">
    <div ref="tabCont" class="tabCont">
      <el-scrollbar>
        <div class="incomeResult-tabCont rate-cont">
          <div class="rate-hd clear">
            <div class="rate-hd-left">
              <p class="panel-title-bar">
                <i class="orange-circle"></i>基准日当期折现率为：
              </p>
              <div class="pie-charts" id="pieChart"></div>
            </div>
            <div class="rate-hd-right">
              <p class="panel-title-bar">
                <i class="orange-circle"></i>
                填报相关数据
                <span class="font-normal">
                  （注：标
                  <i class="c-orange">*</i>{{artificial}}
                </span>
              </p>
              <div class="income-form-cont">
                <div class="income-form-item clear">
                  <div class="income-inline" v-for="(item,index) in this.baseData" :key="index">
                    <label>
                      <span class="c-orange">*</span>
                      <span>{{item.A}}:</span>
                    </label>
                    <div class="income-input-box">
                      <el-input
                        type="text"
                        :value="$store.state.commafyNumber(item.F,4)"
                        class="income-input"
                        @focus="inputFocus($event)"
                        @blur="inputBlur($event,item)"
                      ></el-input>
                    </div>
                  </div>
                  <div class="income-inline lastBtn">
                    <label>&nbsp;</label>
                    <div class="income-input-box t-right">
                      <el-button type="primary" :disabled="!$store.state.readonly" size="mini"  @click="keepClick(baseData)">保存</el-button> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="botm-gauge20">
            <result-table v-if="fillinData" :tableHeader="tableHeader" :tableData="fillinData"></result-table>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import tableData from "@/components/incomeLaw/tableData.js";
import resultTable from "@/components/incomeLaw/resultTable.vue";
import Public from "@/public.js";
export default {
  components: {
    resultTable
  },
  data() {
    return {
      artificial:'项需人工填报，请确保数据准确，以便精准计算折现率）',
      tableHeader: [],
      tableData: [],
      fillinData: [],
      discountData: "",
      baseData: [],
      lineChart: "",
      pieChart: "",
      baseValue:'',
      aa: 6,
      panelFlag0: true,
      calculationResults: {}, //计算结果项
      downUrl: "javascript:;"
    };
  },
  mounted() {
    var _this = this;
    this.pieChart = this.$echarts.init(document.getElementById("pieChart"));
    this.$store.state.calculateBtn = data => {
      _this.Farray("tableHeader", data.result);
      data.result.shift();
      _this.fillinData = data.result;
      _this.baseData = data.base;
      _this.discountData = data.discountRateFindData;
      _this.getPieCharts();
    };

    this.resizePage();
    this.tableData = tableData;
    this.panelFlag0 = false;
    this.getDiscountData();
  },
  methods: {
     //将千分位转为数字
      changeToNum(value) {
        var val = value.replace(/\s+/g, "");
        var pane = "";
        if (val != "") {
          var numArr = (String(val) || "").split(",");
          for (var i = 0; i < numArr.length; i++) {
            pane += numArr[i];
          }
        } else {
          pane = val;
        }
        return pane;
      },
    //折现率计算表数据
    getDiscountData() {
      //表头
      this.$http
        .post("/api/incomeResultData/discountRateFindData", {
          sheetName: "折现率计算表",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          condition: ""
        })
        .then(res => {
          this.Farray("tableHeader", res.data.result);
          res.data.result.shift();
          this.fillinData = res.data.result;
          this.baseData = res.data.base;
          this.discountData = res.data.discountRateFindData;
          this.getPieCharts();
        })
        .catch(error => {});
    },
    inputFocus(e){
      this.baseValue = e.target.value;
    },
    inputBlur(e,item){
      item.F=e.target.value
    },
    keepClick(datas) {
      this.$http
        .post("/api/incomeResultData/discountRateUpdateDate", {
          sheetName: "折现率计算表",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          condition: "",
          dataStr: JSON.stringify(datas)
        })
        .then(res => {
          console.log(res.data)
          res.data.result.shift();
          this.fillinData = res.data.result;
          this.baseData = res.data.base;
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    Farray(head, data) {
      let newArr = ["A", "F"];
      var tabhead = data[0];
      this[head] = {};
      for (let i = 0; i < newArr.length; i++) {
        if (tabhead[newArr[i]]) {
          this[head][newArr[i]] = tabhead[newArr[i]];
        }
      }
    },
    //表头数据处理
    // Farray(head, data) {
    //   let newArr = ["A", "F"];
    //   var tabhead = data[0];
    //   this[head] = {};
    //   for (let i = 0; i < newArr.length; i++) {
    //     if (tabhead[newArr[i]]) {
    //       this[head][newArr[i]] = tabhead[newArr[i]];
    //     } else {
    //       return;
    //     }
    //   }
    // },
    resizePage() {
      var _this = this;
      var pageModuleHeight = parseFloat(this.$store.state.oElemHg) - 57,
        tabHeight = 30;
      this.$refs.tabCont.style.height =
        pageModuleHeight - tabHeight - 45 + "px";
    },
    getPieCharts() {
      var option = {
        tooltip: {
          trigger: "item",
          show: false,
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["60%", "75%"], //这里是控制环形内半径和外半径
            avoidLabelOverlap: true,
            hoverAnimation: false, //此处查了好久属性//控制鼠标放置在环上时候的交互
            label: {
              normal: {
                show: true,
                position: "center",
                padding: [30, 0, 0, 0],
                textStyle: {
                  fontSize: "26",
                  fontWeight: "bold"
                }
              }
            },
            data: [
              {
                value: this.$store.state.commafyNumber(this.discountData * 100),
                name:
                  this.$store.state.commafyNumber(this.discountData * 100) + "%"
              },
              {
                value:
                  100 -
                  this.$store.state.commafyNumber(this.discountData * 100),
                name: ""
              }
            ]
          }
        ],
        color: ["#F7B543", "#7C9FEE"]
      };
      this.pieChart.setOption(option);
    },
    downLoad() {
      // this.$refs.tableReport.html2canvas();
    }
  },
  watch: {
    "$store.state.oElemHg"(newD, oldD) {
      this.resizePage();
    },
    "$store.state.reloadIncomeTable"() {
      this.getDiscountData();
    },
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.income-result {
  width: 100%;
  .clear:after {
    content: " ";
    display: block;
    visibility: hidden;
    clear: both;
  }
  .font-normal {
    font-weight: normal;
    .c-orange {
      vertical-align: middle;
    }
  }
  .botm-gauge20 {
    margin-bottom: 20px;
  }
  .t-right {
    text-align: right;
  }
  .incomeResult-tabCont {
    height: 100%;
    margin: 0 9px;
    .panel-title-bar {
      color: #262628;
      font-size: 13px;
      position: relative;
      font-weight: bold;
      height: 38px;
      line-height: 38px;
      margin-left: 22px;
      padding-right: 10px;
      .orange-circle {
        width: 6px;
        display: block;
        height: 6px;
        background: rgb(240, 146, 55);
        position: absolute;
        left: -14px;
        top: 16px;
        border-radius: 13px;
      }
      .font-normal {
        .c-orange {
          color: #f09237;
        }
      }
    }
  }
  .rate-cont {
    .rate-hd {
      height: 226px;
      width: 100%;
      margin: 10px 0;
      display: flex;
      .rate-hd-left {
        float: left;
        border: 1px solid #ececec;
        height: 100%;
        width: 30%;
        .pie-charts {
          width: 100%;
          height: 188px;
        }
      }
      .rate-hd-right {
        // float: right;
        border: 1px solid #ececec;
        height: 100%;
        margin-left: 10px;
        // width: 85%;
      }
    }
  }
  .income-form-cont {
    padding: 5px 20px;
    box-sizing: border-box;
    .income-form-item {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .lastBtn{
       margin-left: 49%;
       margin-top: -7px;
      }
      .income-inline {
        display: inline-block;
        width: 49%;
        margin-bottom: 15px;
        display: flex;
        // justify-content: space-between;
        label {
          width: 150px;
          text-align: right;
          height: 25px;
          line-height: 25px;
          font-size: 13px;
          font-weight: 400;
          margin-right: 5px;
          .c-orange {
            color: #f09237;
          }
        }
        .income-input-box {
          height: 25px;
          flex: 1;
        }
        .income-input {
          height:25px;
          background:rgba(255,255,255,1);
          border-radius:2px;
          width: 100%;
          &:focus {
            border-color: #409eff;
            outline: 0;
          }
        }
      }
    }
  }
}
/deep/.el-input .el-input__inner{
  color: #6A6A6A;
  height: 25px!important;
  font-size: 13px;
  cursor: pointer;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 5px 15px;
}
.income-result .income-form-cont .income-form-item{
  // margin-top: 10px;
  margin-right: 30px;
}
</style>