<template>
  <div class="incomeTablesModule">
    <div class="incomeTablesModule-checkboxs" v-if="getTableType===1">
      <div class="incomeTablesModule-checkboxs-right">
        <span
          v-if="!checkList.checkboxListRight.noEnclosureNotation"
          class="pointer"
          @click="openDialog()"
        >
          <i class="iconfont icon-fujianshuoming hov"></i>附件说明
        </span>
        <!-- v-if="showPower" -->
        <span v-if="!checkList.checkboxListRight.noExplain" @click="show" class="pointer">
          <i class="iconfont icon-chakanshuoming hov"></i>查看说明
        </span>
        <!-- <el-checkbox v-model="displayFormula">显示公式</el-checkbox> -->
      </div>
      <div class="incomeTablesModule-checkboxs-button">
        <el-checkbox
          v-model="checkedAll"
          @change="setCheckedAllFun"
          v-if="checkList.checkboxList.length>0"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedList" @change="setCheckedFun">
          <el-checkbox
            v-for="(check,index) in checkList.checkboxList"
            :key="index"
            :label="check.label"
          >{{check.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="incomeTablesModule-tables">
      <income-table
        v-if="getTableType===1"
        :checkList="checkList"
        :checkedList="checkedList"
        :displayFormula="displayFormula"
        :sheetName="incomeTableName"
      ></income-table>
      <table-more
        class="table-more"
        v-else-if="getTableType===2"
        ref="tableMore"
        :tableHeader="checkList.tableHeader"
        :curSheetName="incomeTableName"
        :sheetNameBool="true"
        :sheetName="incomeTableName"
        :customDisplay="customDisplay"
      ></table-more>
      <discount-calculation-table v-else-if="getTableType===3"></discount-calculation-table>
      <cash-flow-forecast v-else-if="getTableType===4"></cash-flow-forecast>
    </div>
  </div>
</template>
<script>
import Public from "@/public.js";
import { checkData } from "@/components/incomeLaw/incomeTableData.js";
import incomeTable from "@/components/incomeLaw/incomeTable.vue"; //普通表
import tableMore from "@/components/incomeLaw/tableMoreIncome"; //长投
import discountCalculationTable from "@/page/fullPageModule/incomeLaw/discountCalculationTable"; //折现率计算表
import cashFlowForecast from "@/page/fullPageModule/incomeLaw/cashFlowForecast"; //现金流预测表
export default {
  components: {
    incomeTable,
    tableMore,
    discountCalculationTable,
    cashFlowForecast,
  },
  props: ["incomeTableName"],
  data() {
    return {
      checkData: checkData,
      checkList: [],
      checkedList: [], //选中
      checkedAll: true, //全选
      viewNotes: true, //查看说明
      uploadForm: true, //上传表格
      displayFormula: true, //显示公式
      customDisplay: {
        investorId: this.$store.state.investorId,
        projectId: this.$store.state.projectId,
        disabled: false, //是否可编辑   true不能编辑  false能编辑   默认可编辑
        disoperation: false, //是否可操作   true不能操作  false能操作   默认可操作
        checkedBG: false //表格有选中色块   true有选中色块   false无选中色块   默认无选中色块
      }
      // checkData
    };
  },
  created() {},
  mounted() {
    this.setCheckedAllFun(this.checkedAll);
    this.$store.state.setChaKanShuoMingShow=()=>{
      this.show()
    }
    this.$store.state.setDisplayFormula=(bol)=>{
      this.displayFormula=bol;
    }
  },
  methods: {
    //全选
    setCheckedAllFun(val) {
      if (val) {
        this.checkedList = this.checkList.checkboxList.map(item => {
          return item.label;
        });
      } else {
        this.checkedList = [];
      }
    },
    //选中
    setCheckedFun(val) {
      if (val.length === this.checkList.checkboxList.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    show() {
      let _this = this;
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "说明列表";
      this.$store.state.commonBtn = "导出";
      this.$store.state.componentsType = "explainList";
      if(this.getTableType===4)this.$store.state.cprWidth = true;
      this.$store.state.dataObj = {
        sheetName: this.incomeTableName,
        projectId: this.$store.state.projectId,
        investorId: this.$store.state.investorId,
      }; //需要传递的参数
      this.$store.state.refresh = function() {
        _this.changeTab(_this.active);
      };
    },
    openDialog() {
      this.$store.commit("changeShowCommon"); //固定
      this.$store.state.commonTitle = "表单上传"; //弹框名称
      this.$store.state.commonBtn = "保存"; //按钮名称 （没有按钮传空）
      this.$store.state.extraBtn = "编辑"; //第二个按钮名称 （没有不传）
      this.$store.state.componentsType = "submitFileList"; //要调用组件的名称
      this.$store.state.dataObj = {
        type: "income",
        sheetName: this.incomeTableName
      }; //需要传递的参数
    }
  },
  watch: {
    incomeTableName: {
      handler: function(newD, oldD) {
        this.checkList = this.checkData[newD];
        if (newD != oldD) {
          this.checkedAll = true;
          this.setCheckedAllFun(this.checkedAll);
          this.displayFormula = true;
        }
      },
      immediate: true
    },
    "$store.state.oElemHg": {
      handler: function(newD, oldD) {
        if (this.$refs.tableMore) {
          this.$refs.tableMore.reckonHg();
        }
      }
    }
  },
  computed: {
    getTableType() {
      switch (this.incomeTableName) {
        case "长投":
          this.$store.state.setCalculateShow( false , this.incomeTableName )
          return 2;
          break;
        case "折现率计算表":
          this.$store.state.setCalculateShow( true , this.incomeTableName )
          return 3;
          break;
        case "现金流预测表":
        this.$store.state.setCalculateShow( true , this.incomeTableName )
          return 4;
          break;
        default:
          this.$store.state.setCalculateShow( false , this.incomeTableName )
          return 1;
          break;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.incomeTablesModule {
  .incomeTablesModule-checkboxs {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    overflow: hidden;
    /deep/ .el-checkbox + .el-checkbox {
      margin-left: 10px;
    }
    .incomeTablesModule-checkboxs-button {
      .el-checkbox-group {
        display: inline-block;
        margin-left: 10px;
      }
    }
    .incomeTablesModule-checkboxs-right {
      float: right;
      > span {
        font-size: 12px;
        color: #f09237;
        margin-right: 10px;
        i{
            font-size: 12px;
            color: #F09237;
            margin-right: 6px;
        }
      }
      .pointer:hover{
        border-bottom: 1px solid #F09237; 
      }
      > * {
        margin-right: 0;
      }
      .pointer {
        cursor: pointer;
      }
    }
  }
  .incomeTablesModule-tables {
    padding: 0 10px 10px 10px;
    .table-more {
      padding-top: 10px;
    }
  }
}
</style>