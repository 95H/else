<template>
  <div class="workinghoursQuery">
    <div class="padding020 bgW" v-if="hackReset">
        <single-radio :singleradiooptions="singleradiooptions" @onradioclick="radioEvent"></single-radio>
    </div>
    <div class="select-container padding020">
      <div class="select-box">
        <span class="fs13">统计周期：</span>
        <work-hours-time :workinghoursStart="selectForm.weekBeginDate" :isAdd="isAdd" :isTianXie="isTianXie" :workinghoursEnd="selectForm.weekEndDate" @executeFun="executeFun"></work-hours-time>
        <my-inp :itemsiptoptions="itemsIpt"></my-inp>
        <div class="btnFr">
          <button class="search-btn" @click="search">搜索</button>
          <button class="reset-btn" @click="reset">重置</button>
        </div>
      </div>
    </div>
    <!-- <div class="workingHoursList-table">
        <zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" @trclick="trclick"></zltable>
    </div> -->
    <div class="marginTop10 bg_white">
      <div class="totalCon">共计{{totalDataNum}}条数据</div>
      <div class="userList padding20">
        <el-table border
          @row-click="trclick"
          :data="tableData"
          style="width: 100%" size="mini">
          <el-table-column
            prop="userName"
            label="填报人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称"
            align="center"
            width="260">
            <template slot-scope="scope">
              <table class="projectNameListTable">
                <tr v-for="(projectItem,index) in scope.row.projectName.split(',')" :key="index">
                  <td><div class="cell el-tooltip" style="width:260px;" :title="projectItem">{{projectItem}}</div></td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            prop="timeSheetSumWeekly"
            label="总工时"
            align="center"
            width="100">
            <template slot-scope="scope">
              <table class="projectStatus">
                <tr v-for="(projectItem,index) in scope.row.timeSheetSumWeekly.split(',')" :key="index">
                  <td>{{projectItem}}</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            prop="weekDate"
            label="工作周期"
            align="center"
            width="260">
            <template slot-scope="scope">
              <table class="projectNameListTable">
                <tr v-for="(projectItem,index) in scope.row.weekDate.split(',')" :key="index">
                  <td>{{projectItem}}</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            prop="timeSheetStatus"
            label="工时状态"
            align="center"
            width="100">
            <template slot-scope="scope">
              <table class="projectStatus">
                <tr v-for="(projectItem,index) in scope.row.timeSheetStatus.split(',')" :key="index">
                  <td>{{filterData("timeSheetStatus",projectItem)}}</td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="提交时间"
            align="center"
            width="160">
            <template slot-scope="scope">
              <table class="projectNumListTable">
                <tr v-for="(projectItem,index) in scope.row.createTime.split(',')" :key="index">
                  <td>{{projectItem}}</td>
                </tr>
              </table>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center marginTop20" v-show="totalDataNum > 10">
          <pagination ref="pagination" :pagesize="10" :totalDataNum="totalDataNum" v-on:currentPageFn="currentPageFn"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myInp from "@/page/common/Ipt";
import workHoursTime from "@/components/workHoursTime";
import pagination from "../../components/pagination.vue";
export default {
  data() {
    return {
      isTianXie: true,
      isAdd: true,
      itemsIpt: [{ name: "填报人：", holder: "请输入填报人名称",key:'createUser', input: "" }],
      singleradiooptions: {
        txt: "工时状态：",
        option: [
          {name:'全部',label:"all"},
          { name: "待审核", label: "unapproved" },
          { name: "已通过", label: "isPassed" },
          { name: "未通过", label: "isRefuse" },
          { name: "草稿", label: "draft" },
        ]
      },
      selectForm: {
        tabFlag: "all",
        weekBeginDate: "",
        weekEndDate: "",
        createUserName: "",
        page: 1,
        pagesize: 10,
        weekStatus: ""
      },
      tableData: [],
      totalDataNum: 0,
      hackReset: true
    };
  },
  created() {
    this.setDate();
    this.getTableData();
  },
  methods: {
    executeFun(data) {
      this.selectForm.weekBeginDate = data.workinghoursStart;
      this.selectForm.weekEndDate = data.workinghoursEnd;
      this.selectForm.weekStatus = data.weekStatus;
      this.getTableData();
    },
    filterData(id, val) {
      return window.commonData[id][val];
    },
    currentPageFn(val) {
      this.selectForm.page = val;
      this.getTableData();
    },
    getTableData() {
      this.$http
        .post("/api/projecttimesheetaudit/selectProjectPtqs", this.selectForm)
        .then(res => {
          this.tableData = res.result;
          this.totalDataNum = Number(res.count);
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    radioEvent(val) {
      this.selectForm.tabFlag = val;
      this.currentPageFn(1);
    },
    search() {
      this.selectForm.createUserName = this.itemsIpt[0].input;
      this.currentPageFn(1);
    },
    reset() {
      this.hackReset = false; //销毁组件
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
      this.selectForm.tabFlag = "all";
      this.itemsIpt[0].input = "";
      this.selectForm.createUserName = this.itemsIpt[0].input;
      this.setDate();
      this.currentPageFn(1);
    },
    //设置初始时间（上周时间）
    setDate() {
      var monDate = this.getFirstDayOfWeek();
      this.selectForm.weekBeginDate = this.getNowFormatDate(
        new Date(new Date(monDate).getTime() - 604800000)
      );
      this.selectForm.weekEndDate = this.getNowFormatDate(
        new Date(new Date(monDate).getTime() - 86400000)
      );
    },
    trclick(row) {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "工时详情";
      // this.$store.state.commonBtn = '进入项目';
      this.$store.state.componentsType = "writeWorkDetails";
      this.$store.state.cprWidth = true;
      row["weekBeginDate"] = this.selectForm.weekBeginDate;
      row["weekEndDate"] = this.selectForm.weekEndDate;
      row["tabFlag"] = this.selectForm.tabFlag;
      this.$store.state.dataObj = row;
    },
    getFirstDayOfWeek() {
      var day = new Date(),
        oneDay = 86400000;
      switch (day.getDay()) {
        case 0:
          return this.getNowFormatDate(new Date(day.getTime() - oneDay * 6));
          break;
        case 1:
          return this.getNowFormatDate(day);
          break;
        case 2:
          return this.getNowFormatDate(new Date(day.getTime() - oneDay));
          break;
        case 3:
          return this.getNowFormatDate(new Date(day.getTime() - oneDay * 2));
          break;
        case 4:
          return this.getNowFormatDate(new Date(day.getTime() - oneDay * 3));
          break;
        case 5:
          return this.getNowFormatDate(new Date(day.getTime() - oneDay * 4));
          break;
        case 6:
          return this.getNowFormatDate(new Date(day.getTime() - oneDay * 5));
          break;
      }
    },
    getNowFormatDate(date) {
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  components: {
    myInp,
    workHoursTime,
    pagination
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.workinghoursQuery {
	height: calc( 100% - 10px );
	flex-direction:column;
	display: -webkit-flex;
	display: flex;
  .btnFr {
    padding-left: 20px;
    vertical-align: top;
  }
  /deep/ .ipt-wrap {
    height: 25px;
    padding-left: 20px;
  }
  .select-container {
    background:#fff;
    border: 1px solid #ececec;
    border-top: none;
    .select-box{ border-top:2px dotted #ececec; padding:10px 0;
      > *{ display: inline-block;}
    }
  }
  /* 头部 */
  .bgW {
    background: #fff;
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;
  }
  .workingHoursList-table {
    margin-top: 10px;
    background: #fff;
  }
  .bg_white {
    background-color: #fff !important;
    border: 1px solid #ececec;
    flex: 1;
    -ms-flex:1 0 auto;
    .totalCon {
      height: 35px;
      line-height: 35px;
      background: rgba(249, 249, 249, 1);
      border-radius: 2px;
      border-bottom: 1px solid rgba(236, 236, 236, 1);
      font-size: 13px;
      color: #262628;
      text-align: right;
      padding-right: 20px;
    }
  }
}
.userList {
  /deep/ .el-table__empty-block {
    height: 300px;
    background: url(../../assets/common/nodata.png) no-repeat center;
    .el-table__empty-text {
      margin-top: 100px;
      font-size: 13px;
    }
  }
  .el-table {
    thead {
      tr {
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        th {
          background-color: #f6faff;
        }
      }
    }
    tr {
      cursor: pointer;
    }
    td,
    th {
      height: 30px;
      line-height: 23px;
      color: #6a6a6a;
      text-align: center;
      padding: 0;
      margin: 0;
      .projectNameListTable,
      .projectNumListTable,
      .projectStatus {
        margin: 0 -10px 0 -10px;
        width: 260px;
        tr {
          background-color: transparent;
          td {
            border-right: none;
          }
          &:last-child td {
            border-bottom: none;
          }
        }
      }
      .projectNumListTable {
        width: 160px;
      }
      .projectStatus {
        width: 100px;
      }
    }
    .el-table__empty-block {
      height: 300px;
      background: url(../../assets/common/nodata.png) no-repeat center;
      .el-table__empty-text {
        margin-top: 100px;
        font-size: 13px;
      }
    }
  }
}
</style>
