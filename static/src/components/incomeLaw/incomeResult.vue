<template>
  <div class="income-result">
    <div ref="tabCont" class="tabCont">
      <div class="incomeResult-tabCont" v-show="activeTabNum==0" id="profit">
        <div class="panel-title-bar clear">
          <div class="fl">
            <i class="orange-circle"></i>盈利状况预测表（金额单位：万元）
          </div>
          <div class="fr panel-title-right">
            <i class="icon"></i>
            导出
          </div>
        </div>
        <result-table :tableHeader="cashFlowTableHeader" :tableData="cashFlowTableData"></result-table>
        <div class="panel-title-bar clear">
          <div class="fl">
            <i class="orange-circle"></i>盈利情况预测
          </div>
          <!-- <div class="fr panel-title-right">
                        <i class="icon"></i>
                        下载
          </div>-->
        </div>
        <div class="lineChart" id="incomeLineChart"></div>
      </div>
      <div class="incomeResult-tabCont rate-cont" v-show="activeTabNum==1">
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
                <i class="c-orange">*</i>项需人工填报，请确保数据准确，以便精准计算折现率）
              </span>
            </p>
            <div class="income-form-cont">
              <div class="income-form-item clear">
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 国债利率：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 调整β：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
              </div>
              <div class="income-form-item clear">
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 风险收益率β：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 无杠杆β：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
              </div>
              <div class="income-form-item clear">
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 历史β：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 特性风险系数：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
              </div>
              <div class="income-form-item clear">
                <div class="income-inline">
                  <label>
                    <span class="c-orange">*</span> 债务成本(税后)：
                  </label>
                  <div class="income-input-box">
                    <input type="text" class="income-input">
                  </div>
                </div>
                <div class="income-inline">
                  <label>&nbsp;</label>
                  <div class="income-input-box t-right">
                    <el-button type="primary" size="mini">保存</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="botm-gauge20">
          <!-- <result-table :tableHeader="tableHeader" :tableData="tableData"></result-table> -->
        </div>
      </div>
      <div class="incomeResult-tabCont" v-show="activeTabNum==2">
        <div class="panel-title-bar">
          <div class="fl">
            <i class="orange-circle"></i>现金流预测表（金额单位：万元）
            <span class="font-normal pr subheading">
              <i class="orange-circle"></i>被评估企业：天津原子高科同位素医药有限公司
            </span>
          </div>
          <a class="fr panel-title-right" @click="downLoad" :href="downUrl">
            <i class="icon"></i>
            导出
          </a>
        </div>
        <result-table
          v-if="cashFlowTableData"
          :tableHeader="cashFlowTableHeader"
          :tableData="cashFlowTableData"
        ></result-table>
        <div class="panel-title-bar clear">
          <div class="fl">
            <i class="orange-circle"></i>计算结果项
          </div>
        </div>
        <div class="lump-cont">
          <el-row>
            <el-col :span="24" v-for="(gum,iguma) in guma" :key="iguma">
              <div class="grid-content lump-mid">
                <span class="c-green f18 ver-mid">{{gum.A}}</span>
                <span class="c-orange f26 ver-mid">{{$store.state.commafyNumber(gum.F)}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" v-for="(gums,igumb) in gumb" :key="igumb">
              <div class="grid-content lump-small">
                <p class="c-green f14">{{gums.A}}</p>
                <p class="f16 mar-top8 c-orange elput3">
                  <el-input
                    :disabled="igumb !== 3"
                    :value="$store.state.commafyNumber(gums.F)"
                    @blur="inputBlur($event,igumb,gums,gumb)"
                    @focus="inputFocus($event,igumb)"                    
                  ></el-input>
                </p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" v-for="(gumt,igumc) in gumc" :key="igumc">
              <div class="grid-content lump-small">
                <p class="c-light-black f14">{{gumt.A}}</p>
                <p class="f16 mar-top8">{{$store.state.commafyNumber(gumt.F)}}</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-for="(gumts,igumd) in gumd" :key="igumd">
              <div class="grid-content lump-mid">
                <span class="c-light-black f14 ver-mid">{{gumts.A}}</span>&nbsp;&nbsp;&nbsp;
                <span class="f16 ver-mid">
                  <el-input                     
                      :value="$store.state.commafyNumber(gumts.F)"
                      @blur="inputBlur($event)"
                      @focus="inputFocus($event)"
                      :data-id="gumts.id"
                      :data-rowSort="gumts.rowSort"
                    ></el-input>
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <ul class="item-list clear">
      <li
        v-for="(item,index) in tabs"
        :key="index"
        @click="tabClick(index)"
        :class="{active:index==activeTabNum}"
      >{{item}}</li>
    </ul>
  </div>
</template>
<script>
import tableData from "@/components/incomeLaw/tableData.js";
import resultTable from "@/components/incomeLaw/resultTable.vue";
import { sortArr } from "@/components/incomeLaw/incomeTableData.js";
export default {
  components: {
    resultTable
  },
  data() {
    return {
      activeTabNum: 0,
      tabs: ["盈利预测表", "折现率", "现金流"],
      tableHeader: [
        "项目/年度",
        "2015年",
        "2016年",
        "2017年",
        "2018年1-3月",
        "2018全年",
        "2019年",
        "2020年",
        "2021年",
        "2022年",
        "2022年",
        "2022年",
        "2022年",
        "2022年",
        "2022年",
        "2022年",
        "2022年",
        "2022年",
        "2022年"
      ],
      cashFlowTableHeader: {}, //现金流预测表
      cashFlowTableData: [], //现金流预测表
      tableData: [],
      lineChart: "",
      pieChart: "",
      initPage: {
        panelFlag0: true,
        panelFlag1: true,
        panelFlag2: true
      },
      calculationResults: {}, //计算结果项
      guma: [],
      gumb: [],
      gumc: [],
      gumd: [],
      downUrl: "javascript:;"
    };
  },
  mounted() {
    this.resizePage();
    this.tableData = tableData;
    this.initPage.panelFlag0 = false;
    this.profitForecast();
    this.getCashFlowTableData();
    //去除右边的滚动条
    //document.querySelector('.fullPageContent-content').querySelector('.is-vertical').style.display="none";
  },
  methods: {
    tabClick(index) {
      this.activeTabNum = index;
      switch (index) {
        case 0:
          setTimeout(() => {
            this.lineChart.resize();
          }, 200);
          this.profitForecast();
          this.getCashFlowTableData();
          break;
        case 1:
          if (this.initPage.panelFlag1) {
            this.initPage.panelFlag1 = false;
            setTimeout(() => {
              //   this.getPieCharts();
            }, 200);
          } else {
            setTimeout(() => {
              this.pieChart.resize();
            }, 200);
          }
          break;
        case 2:
          if (this.initPage.panelFlag2) {
            this.initPage.panelFlag2 = false;
          }
          this.getCashFlowTableData();
          break;
      }
    },
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
          console.log(error);
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
            text: tData.title
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: tData.legend
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: tData.date
          },
          yAxis: {
            type: "value"
          },
          series: arr_series
        };
      }
      this.lineChart = this.$echarts.init(
        document.getElementById("incomeLineChart")
      );
      this.lineChart.setOption(option);
      return option;
    },
    //现金流预测数据获取
    getCashFlowTableData() {
      //表头
      this.$http
        .post("/api/incomexls/getTemplate", {
          sheetName: "现金流",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          templateName: "H"
        })
        .then(res => {
          this.Farray("cashFlowTableHeader", res.data);
          //   console.log(this.cashFlowTableHeader);
        })
        .catch(error => {});
      this.$http
        .post("/api/incomeResultData/getMoneyResult", {
          sheetName: "现金流",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          condition: ""
        })
        .then(res => {
          this.cashFlowTableData = res.data;
        })
        .catch(error => {
          this.$messageError(error);
        });
      // 计算结果项
      this.$http
        .post("/api/incomeResultData/moneyFlow", {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
        })
        .then(res => {
          this.calculationResults = res.data;

          let arr1 = Object.values(this.calculationResults);
          this.guma = arr1[0];
          this.gumb = arr1[1];
          this.gumc = arr1[2];
          this.gumd = arr1[3];
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    inputFocus(e, index) {
      e.target.style.border = "0px solid #fff";
    },
    inputBlur(e, index, gums) {
        var id = gums.id,
         sorts = gums.rowSort,
         value = e.target.value;
      this.$http
        .post("/api/incomeResultData/moneyFlow", {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          value: value,
          id: id,
          rowSort: sorts
        })
        .then(res => {
          this.data = res.data;
          console.log(this.data)
        })
        .catch(error => {
          this.$messageError(error);
        });
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
    resizePage() {
      var _this = this;
      var oH = parseInt(_this.$store.state.oElemHg) - 58 - 66;
      this.$refs.tabCont.style.height = oH + "px";
    },
    // getPieCharts() {
    //   var option = {
    //     tooltip: {
    //       trigger: "item",
    //       formatter: "{a} <br/>{b}: {c} ({d}%)",
    //       position: ["20%", "50%"]
    //     },
    //     legend: {
    //       orient: "vertical",
    //       x: "left",
    //       show: false
    //     },
    //     series: [
    //       {
    //         name: "访问来源",
    //         type: "pie",
    //         radius: ["50%", "70%"],
    //         avoidLabelOverlap: false,
    //         label: {
    //           normal: {
    //             show: false,
    //             position: "center"
    //           },
    //           emphasis: {
    //             show: true,
    //             textStyle: {
    //               fontSize: "14",
    //               fontWeight: "bold"
    //             }
    //           }
    //         },
    //         labelLine: {
    //           normal: {
    //             show: false
    //           }
    //         },
    //         data: [
    //           { value: 335, name: "直接访问" },
    //           { value: 310, name: "邮件营销" },
    //           { value: 234, name: "联盟广告" },
    //           { value: 135, name: "视频广告" },
    //           { value: 1548, name: "搜索引擎" }
    //         ]
    //       }
    //     ]
    //   };
    //   this.pieChart = this.$echarts.init(document.getElementById("pieChart"));
    //   this.pieChart.setOption(option);
    // },
    downLoad() {
      // this.$refs.tableReport.html2canvas();
    }
  },
  watch: {
    "$store.state.oElemHg"(newD, oldD) {
      this.resizePage();
      if (this.activeTabNum == 0) {
        this.lineChart.resize();
      }
      if (this.activeTabNum == 1) {
        this.pieChart.resize();
      }
    }
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
  .f18 {
    font-size: 18px;
  }
  .f16 {
    font-size: 16px;
  }
  .f26 {
    font-size: 26px;
  }
  .f14 {
    font-size: 14px;
  }
  .c-green {
    color: #98c765;
  }
  .pr {
    position: relative;
  }
  .ver-mid {
    vertical-align: middle;
  }
  .botm-gauge20 {
    margin-bottom: 20px;
  }
  .t-right {
    text-align: right;
  }
  .c-orange {
    color: #f09237;
  }
  .c-light-black {
    color: #6a6a6a;
  }
  .tabCont {
    overflow-y: scroll;
  }
  .subheading {
    display: inline-block;
    margin-left: 20px;
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
      margin-left: 16px;
      padding-right: 10px;
      .orange-circle {
        width: 6px;
        height: 6px;
        background: #f09237;
        display: block;
        top: 16px;
        left: -12px;
        border-radius: 50%;
        position: absolute;
      }
      .panel-title-right {
        font-size: 12px;
        color: #f09237;
        vertical-align: middle;
        cursor: pointer;
        .icon {
          display: inline-block;
          width: 13px;
          height: 13px;
          background: #ccc;
        }
      }
    }
  }
  .item-list {
    height: 25px;
    line-height: 25px;
    border-top: 1px solid #ececec;
    border-right: 1px solid #ececec;
    li {
      float: left;
      color: #262628;
      cursor: pointer;
      float: left;
      text-align: center;
      width: 112px;
      font-size: 13px;
      border-right: 1px solid #ececec;
      &.active,
      &:hover {
        background: #5fa9ec;
        color: #fff;
      }
    }
  }

  .lineChart {
    border: 1px solid #e5e5e5;
    height: 400px;
    width: 100%;
    margin-bottom: 30px;
  }
  .rate-cont {
    .rate-hd {
      height: 226px;
      width: 100%;
      margin: 10px 0;
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
        float: right;
        border: 1px solid #ececec;
        height: 100%;
        width: 69%;
      }
    }
  }
  .income-form-cont {
    padding: 5px 30px;
    box-sizing: border-box;
    .income-form-item {
      margin-bottom: 10px;
      .income-inline {
        display: inline-block;
        width: 49%;
        label {
          width: 110px;
          text-align: right;
          padding-right: 10px;
          height: 25px;
          line-height: 25px;
          float: left;
          font-size: 13px;
        }
        .income-input-box {
          margin-left: 120px;
          position: relative;
          &.t-right {
            margin-right: -12px;
          }
        }
        .income-input {
          width: 100%;
          border: 1px solid #e1e1e1;
          padding: 5px;
          height: 13px;
          line-height: 13px;
          &:focus {
            border-color: #409eff;
            outline: 0;
          }
        }
      }
    }
  }
  .lump-cont {
    margin-bottom: 20px;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    .el-row {
      &:last-child {
        margin-bottom: 0;
      }
    }
    .grid-content {
      min-height: 36px;
      border-top: 1px solid #e5e5e5;
      border-left: 1px solid #e5e5e5;
      text-align: center;
      &.lump-mid {
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
      }
      &.lump-small {
        height: 80px;
        padding: 18px 0;
        box-sizing: border-box;
      }
      .mar-top8 {
        margin-top: 8px;
      }
    }
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-col-5 {
  width: 19.93333%;
}
/deep/ .elput3 .el-input__inner{
   color: #F09237!important;
}
.el-input {
  width: 50%;
}
/deep/ .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #fff;
    color: #F09237;
    cursor: pointer;
    text-align: center;
}
/deep/ .el-input__inner {
  border: 0;
  font-size: 20px!important;
  padding: 0!important;
}
</style>
