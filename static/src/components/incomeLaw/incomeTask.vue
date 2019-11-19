<template>
  <div class="income-task">
    <div class="income-task-hd clear">
      <div class="income-task-hd-title fl">收益法
        <el-popover
          placement="right-start"
          width="200"
          trigger="hover"
          popper-class="income-task-hd-title-explain">
          <ul class="income-task-hd-title-explain-child">
            <li v-for="(item,index) in $store.state.incomeTemplateName.split(',')" style="line-height: 30px;font-size: 13px;">{{index+1}}、{{item}}</li>
          </ul>
          <i slot="reference" class="el-icon-info"></i>
        </el-popover>
      </div>
      <div class="income-task-hd-sheetName fl">{{sheetName}}</div>
      <div class="income-hd-right fr">
        <template v-if="calculateShow">
          <span @click="show" class="pointer" v-if="sheetName==='现金流预测表'">
            <i class="iconfont icon-chakanshuoming"></i>查看说明
          </span>
          <!-- <el-checkbox class="pr10" v-model="displayFormula" @change="setDisplayFormulaFun">显示公式</el-checkbox> -->
        </template>
        <el-button type="primary" :disabled="!$store.state.readonly" size="mini" v-show="calculateShow" @click="calculateFun">计算</el-button>
        <!-- <el-button  type="primary" size="mini">数据导入</el-button> -->
        <el-button type="primary" :disabled="!$store.state.readonly" size="mini" @click="updataTeml">模板修改</el-button>
      </div>
    </div>
    <div class="income-task-bd">
      <div class="income-tabcon">
        <income-tables></income-tables>
      </div>
    </div>
  </div>
</template>
<script>
import Public from "@/public.js";
import incomeResult from "@/components/incomeLaw/incomeResult";
import incomeTables from "@/components/incomeLaw/incomeTables";
export default {
  components: {
    incomeResult,
    incomeTables
  },
  data() {
    return {
      calculateShow: false,
      displayFormula: true,
      sheetName: "资产负债表",
    };
  },
  mounted() {
    var _this = this;
    this.$store.state.setCalculateShow=(bol, sheetName)=>{
      _this.calculateShow = bol ? true : false;
      _this.sheetName = sheetName;
    }
    //去除右边的滚动条
    document
      .querySelector(".fullPageContent-content")
      .querySelector(".is-vertical").style.display = "none";
    this.$store.state.exportFile = function() {
      window.location.href =
        "/api/incomeExcel/exportExcelZ?token=" +
        _this.$getCookie("token") +
        "&projectId=" +
        _this.$store.state.projectId +
        "&investorId=" +
        _this.$store.state.investorId;
    };
  },
  methods: {
    //模板
    updataTeml() {
      this.$emit("updataTeml");
    },
    //计算
    calculateFun() {
        if(this.sheetName=='现金流预测表'){
            this.$http
        .post("/api/incomexls/cashFormula", {
          sheetName: "现金流",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
        })
        .then(res => {
          this.$store.state.cashFlowCalculation = res.data;
        })
        .catch(error => {
          this.$messageError(error);
        });
        }else if(this.sheetName=='折现率计算表'){
             this.$http
        .post("/api/incomexls/cashFormula", {
          sheetName: "折现率计算表",
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
        })
        .then(res => {
        this.$store.state.calculateBtn(res.data)
        })
        .catch(error => {
          this.$messageError(error)
        });
        }
    },
    show() {
      this.$store.state.setChaKanShuoMingShow()
    },
    setDisplayFormulaFun(bol) {
      this.$store.state.setDisplayFormula(bol)
    }
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.income-task {
  border: 1px solid #ececec;
  .income-task-hd {
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    border-bottom: 1px solid #ececec;
    padding: 0 20px;
    border-right: 1px solid #ececec;
    .income-task-hd-title {
      position: relative;
      .el-icon-info{
        margin-left: 6px;
        color: #F09237;
        cursor: pointer;
      }
    }
    .income-task-hd-title::after {
      content: "";
      position: absolute;
      right: -14px;
      top: 8px;
      height: 20px;
      width: 2px;
      background: #c8c8c8;
    }
    .income-task-hd-sheetName {
      margin-left: 26px;
    }
    .pr10 {
      padding-right: 10px;
    }
    .title-bar {
      margin-right: 30px;
    }
    .income-hd-left {
      height: 35px;
    }
    .income-hd-right {
      span {
        font-size: 12px;
        color: #f09237;
        margin-right: 10px;
        i {
          font-size: 12px;
          color: #f09237;
          margin-right: 6px;
        }
      }
    }
    .s-title {
      &:after {
        content: "";
        position: absolute;
        right: -16px;
        top: 8px;
        height: 20px;
        width: 2px;
        background: #c8c8c8;
      }
    }
    .list-menu {
      display: inline-block;
      li {
        float: left;
        position: relative;
        height: 35px;
        &.active {
          border-bottom: 2px solid #145fd2;
        }
      }
      .item {
        margin-right: 15px;
        cursor: pointer;
      }
    }
  }
}
/deep/.el-button--mini {
  padding: 5px 15px;
}
</style>
