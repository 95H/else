<template>
  <div class="cash-flow-forecast">
    <div class="income-result" ref="cashFlowForecast">
      <el-scrollbar>
        <div class="tabCont">
          <div class="panel-title-bar clear">
            <div class="fl">
              <i class="orange-circle"></i>计算结果项
            </div>
          </div>
          <div class="lump-cont">
            <el-row>
              <el-col :span="24" v-for="(gum,iguma) in guma" :key="iguma">
                <div class="grid-content lump-mid">
                  <span class="c-green f18 ver-mid">{{gum.A}}</span>&nbsp;&nbsp;&nbsp;
                  <span class="c-orange f26 ver-mid">{{$store.state.commafyNumber(gum.F,4)}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" v-for="(gums,igumb) in gumb" :key="igumb">
                <div class="grid-content lump-small">
                  <p class="c-green f14">{{gums.A}}</p>
                  <p class="f16 mar-top8 c-orange elput3">
                    <span v-if="igumb !== 3">{{$store.state.commafyNumber(gums.F,4)}}</span>
                    <template v-else>
                      <el-input v-if="refreshTrInd!==0"refreshTrInd :disabled="flag[0].isOk" ref="elIpt" :value="$store.state.commafyNumber(gums.F,4)" @blur="inputBlur($event,igumb,gums)"
                        @focus="inputFocus($event,igumb)"></el-input>
                      <i class="colorpu icon-bianji iconfont" v-if="igumb == 3"
                        @click="focusclick($event,0)" v-show="displays"></i>
                    </template>
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5" v-for="(gumt,igumc) in gumc" :key="igumc">
                <div class="grid-content lump-small">
                  <p class="c-light-black f14">{{gumt.A}}</p>
                  <p class="f16 mar-top8">{{$store.state.commafyNumber(gumt.F,4)}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-for="(gumts,igumd) in gumd" :key="igumd">
                <div class="grid-content lump-mid">
                  <span class="c-light-black f14 ver-mid">{{gumts.A}}</span>&nbsp;&nbsp;&nbsp;
                  <span class="f16 ver-mid">
                    <el-input v-if="refreshTrInd!==(igumd+1)" :value="$store.state.commafyNumber(gumts.F,4)" ref="elIpt" @blur="inputBlur($event,igumd,gumts)"
                      @focus="inputFocus($event)"
                      :disabled="flag[igumd+1].isOk"></el-input>
                    <i class="colorpu icon-bianji iconfont"
                      @click="focusclick($event,igumd+1)" v-show="displays"></i>
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <result-table v-if="cashFlowTableData" :tableHeader="cashFlowTableHeader" :tableData="cashFlowTableData">
          </result-table>
        </div>
      </el-scrollbar>
    </div>
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
        cashFlowTableHeader: {}, //现金流预测表
        cashFlowTableData: [], //现金流预测表
        tableData: [],
        calculationResults: {}, //计算结果项
        guma: [],
        gumb: [],
        gumc: [],
        gumd: [],
        focusValue: '',
        displays: true,//编辑小图
        flag: [
          { isOk: true },
          { isOk: true },
          { isOk: true }
        ],
        isOkInd: "",
        refreshTrInd: null,//奇葩问题
        loadDataFlag:false
      };
    },
    mounted() {
      this.tableData = tableData;
      this.getCashFlowTableData();
      this.reckonHg();
      this.monomerReport()
    },
    methods: {
      //当还在请求的阶段 tab禁止
      disableTab() {
        var _this = this;
        document.onkeydown = function(event) {
          if (event.keyCode == 9 && _this.loadDataFlag) {
            return false;
          }
        };
      },
      //编辑小图影藏
      monomerReport(){
        this.displays=this.$store.state.monomerReport
      },
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
      focusclick(e,i) {
        this.isOkInd = i;
        this.flag[i].isOk = false;
        this.$nextTick(()=>{
          e.target.previousElementSibling.children[0].focus();
        })
      },
      //计算高度
      reckonHg() {
        var pageModuleHeight = parseFloat(this.$store.state.oElemHg) - 57,
          tabHeight = 30;
        this.$refs.cashFlowForecast.style.height = pageModuleHeight - tabHeight - 45 + "px";
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
        //   // 计算结果项
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
          this.$forceUpdate();
      },
      //获得焦点
      inputFocus(e, index) {
        e.target.style.cssText += ";border:1px solid #88C6FF";
        this.focusValue = e.target.value;
      },
      //失去焦点
      inputBlur(e, index, gums) {
        var _this = this, val = this.changeToNum(e.target.value),isOkInd=this.isOkInd,focusValue=this.focusValue,gumsF=gums.F;  
        _this.isOkInd="";
        this.disableTab();
        if (this.loadDataFlag) return;
        this.loadDataFlag = true;
        setTimeout(()=>{
          e.target.style.border = "1px solid #fff";
          if(_this.isOkInd!==isOkInd){
            _this.flag[isOkInd].isOk = true;
          }
          if (isNaN(val)) {
            _this.refreshTrInd=isOkInd;
            _this.$nextTick(()=>{
              _this.refreshTrInd=null;
            })
            _this.loadDataFlag = false;
            return;
          }
          if(_this.$store.state.commafyNumber(val,4)==focusValue){
            _this.refreshTrInd=isOkInd;
            _this.$nextTick(()=>{
              _this.refreshTrInd=null;
            })
            _this.loadDataFlag = false;
            return
          }
          this.$store.state.isSavingFlag = true;
          _this.$http
          .post("/api/incomeResultData/moneyFlow", {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            templateId: _this.$store.state.incomeInitId,
            value: val,
            id: gums.id,
            rowSort: gums.rowSort,
            showLoading:false
          })
          .then(res => {
            _this.calculationResults = res.data;
            let arr1 = Object.values(_this.calculationResults);
            _this.guma = arr1[0];
            _this.gumb = arr1[1];
            _this.gumc = arr1[2];
            _this.gumd = arr1[3];
            _this.loadDataFlag = false;
            _this.$store.state.isSavingFlag = false;
            _this.refreshTrInd=isOkInd;
            _this.$nextTick(()=>{
              _this.refreshTrInd=null;
            })
          })
          .catch(error => {
            _this.loadDataFlag = false;
            _this.$store.state.isSavingFlag = false;
            _this.$messageError(error);
          });
        },200)
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
    },
    watch: {
      //重新计算高度
      "$store.state.oElemHg": {
        handler: function (newD, oldD) {
          this.reckonHg();
        }
      },
      "$store.state.reloadIncomeTable"() {
        this.getCashFlowTableData();
      },
      //修改数据后重新赋值
      "$store.state.cashFlowCalculation"(newD,oldD) {
          if(newD!=oldD){
          this.getCashFlowTableData();
          // this.calculationResults = newD.resultList
          // this.cashFlowTableData = newD.ylzkycbList
          // this.Farray("cashFlowTableHeader", newD.template)
          }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
  .cash-flow-forecast {
    width: 100%;
    .income-result {
      .el-scrollbar{
        width: 100%;
      }
      .clear:after {
        content: " ";
        display: block;
        visibility: hidden;
        clear: both;
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

      .c-orange {
        color: #f09237;
      }

      .c-light-black {
        color: #6a6a6a;
      }

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
            text-align: center;
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

    .el-col-5 {
      width: 19.93333%;
    }

    /deep/ .elput3 .el-input__inner {
      color: #f09237 !important;
    }

    .el-input {
      width: 200px;
      height: 16px;
    }

    .lump-small .el-input {
      width: 100px;
      height: 16px;
    }

    /deep/ .el-input.is-disabled .el-input__inner {
      background-color: #fff;
      border-color: #fff;
      color: #f09237;
      text-align: center;
    }

    /deep/ .el-input__inner {
      border: 0;
      font-size: 16px !important;
      height: 16px;
    }

    .colorpu {
      display: inline-block;
      color: #3a80ec;
      cursor: pointer;
      font-size: 14px;
    }
    /deep/.cash-flow-forecast .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #fff;
    color: #000;
    text-align: center;
    }
  }
</style>