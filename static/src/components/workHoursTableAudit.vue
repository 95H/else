
<template>
    <!-- 工时审核
        ******
        *<work-hours-table :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></work-hours-table>
        *workinghoursData单个项目的数据
        *workinghoursFun 提交的回调
    -->
    <div class="workHoursTableAudit">
        <el-table
            class="workHoursTableAudit-table-headShow"
            :class="{isNoData:isNoData}"
            @row-click="rowClick"
            size="mini">
            <el-table-column
            prop="createUserName"
            label="人员"
            align="center"
            width="70">
            </el-table-column>
            <el-table-column
            prop="mileStoneName"
            label="里程碑"
            align="center"
            width="110">
            </el-table-column>
            <el-table-column align="center" label="周一">
                <el-table-column
                prop="onlineMon"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineMon"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="周二">
                <el-table-column
                prop="onlineTues"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineTues"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="周三">
                <el-table-column
                prop="onlineWed"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineWed"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="周四">
                <el-table-column
                prop="onlineThur"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineThur"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="周五">
                <el-table-column
                prop="onlineFri"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineFri"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="周六">
                <el-table-column
                prop="onlineSat"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineSat"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="周日">
                <el-table-column
                prop="onlineSun"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineSun"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
            </el-table-column>
            <el-table-column
            prop="timeSheetSumWeekly"
            label="总计"
            align="center"
            width="45">
            </el-table-column>
            <el-table-column
            prop="jobContentDesc"
            label="备注"
            align="center"
            width="134">
            </el-table-column>
        </el-table>
        <div v-for="(audit,index) in workinghoursData" :key="index" class="table-border">
            <el-table
                :data="audit.projectmilestoneplanDtoList"
                :show-header="showHeader"
                highlight-current-row
                @cell-click="cellClick"
                :span-method="objectSpanMethod"
                @row-click="rowClick"
                style="width: 100%" size="mini">
                <el-table-column
                label="人员"
                align="center"
                width="70">
                <template slot-scope="scope">
                    <span>{{audit.createUserName}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="mileStone"
                label="里程碑"
                align="center"
                width="110">
                </el-table-column>
                <el-table-column
                prop="onlineMon"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineMon"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="onlineTues"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineTues"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="onlineWed"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineWed"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="onlineThur"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineThur"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="onlineFri"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineFri"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="onlineSat"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineSat"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="onlineSun"
                label="线上"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="offlineSun"
                label="线下"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="timeSheetSumWeekly"
                label="总计"
                align="center"
                width="45">
                </el-table-column>
                <el-table-column
                prop="jobContentDesc"
                label="备注"
                align="center"
                width="135">
                </el-table-column>
            </el-table>
            <el-collapse-transition>
                <div class="table-audit" v-show="audit.isShow">
                    <div class="table-audit-child" v-if="audit.projectmilestoneplanDtoList[0].timeSheetStatus===1004">
                        <span class="table-audit-text">工时审核：</span>
                        <el-button class="fs13" type="primary" @click="auditAdopt(index)">通过</el-button>
                        <el-button class="fs13" type="warning" @click="auditRefuse(index)">拒绝</el-button>
                        <span class="table-audit-textInp">审核意见：</span>
                        <el-input placeholder="请输入审核意见" v-model="audit.timeSheetAuditDesc"></el-input>
                    </div>
                    <div class="table-audit-child" v-else>
                        <div class="wirteWorkTime-audit">
                            <div class="wirteWorkTime-audit-content">
                                <div class="wirteWorkTime-audit-content-result">
                                    <div class="wirteWorkTime-audit-content-result-left">
                                        <i class="iconfont" :class="{'icon-daishenhe orange':audit.timeSheetStatus=='1004','icon-yitongguo yitongguo':audit.timeSheetStatus=='1005','icon-yijujue red':audit.timeSheetStatus=='1006','icon-caogao caogao':audit.timeSheetStatus=='1114'}"></i>
                                    </div>
                                    <div class="wirteWorkTime-audit-content-result-right">
                                        <div class="wirteWorkTime-audit-content-result-right-lih">
                                            <el-row :gutter="10">
                                                <el-col :span="12">审核人员：{{audit.auditName}}</el-col>
                                                <el-col :span="12">审核时间：{{audit.projectmilestoneplanDtoList[0].auditTime}}</el-col>
                                            </el-row>
                                        </div>
                                        <div class="wirteWorkTime-audit-content-result-right-lih">
                                            <span class="">审核意见：<span class="">{{audit.projectmilestoneplanDtoList[0].timeSheetAuditDesc==''?'无':audit.projectmilestoneplanDtoList[0].timeSheetAuditDesc}}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <table class="workHoursTotal" v-if="isNoData">
            <colgroup><col width="180"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="135"></colgroup>
            <tbody>
                <tr>
                    <td style="background-color:#F6FAFF;" align="center" rowspan="2"><div class="cell cellHead">每日工时总计</div></td>
                    <td align="center" v-for="(onlineOffline,oInd) in workHoursTotal.onlineOffline" :key="oInd"><div class="cell">{{onlineOffline}}</div></td>
                    <td align="center" rowspan="2"></td>
                </tr>
                <tr>
                    <td align="center" v-for="(total,tInd) in workHoursTotal.total" :colspan="tInd>6?1:2" :key="tInd"><div v-if="tInd<7" class="cell" :class="{'red':total>8,'blue':total<8,'green':total==8}">{{total}}</div><div v-if="tInd==7" class="cell" :class="{'red':total>56,'blue':total<56,'green':total==56}">{{total}}</div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  props: ["workinghoursData", "details"],
  data() {
    return {
      isNoData: true,
      showHeader: false,
      commonData: window.commonData,
      workHoursTotal: {
        onlineOffline: [],
        total: []
      },
      rowObj: "",
      CONSTANT_ADOPT: "adopt",
      CONSTANT_REFUSE: "refuse",
      CONSTANT_TOTAL_ARR: [
        "onlineMon",
        "offlineMon",
        "onlineTues",
        "offlineTues",
        "onlineWed",
        "offlineWed",
        "onlineThur",
        "offlineThur",
        "onlineFri",
        "offlineFri",
        "onlineSat",
        "offlineSat",
        "onlineSun",
        "offlineSun",
        "timeSheetSumWeekly"
      ]
    };
  },
  created() {
    var _this = this;
  },
  methods: {
    //操作合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        if (rowIndex % row.num == 0) {
          return [row.num, 1];
        } else {
          return [0, 0];
        }
      }
    },
    cellClick(row, column, cell, event) {
      cell.parentNode.className = "el-table__row current-row";
      if (this.rowObj && this.rowObj != cell.parentNode) {
        this.rowObj.className = "el-table__row";
      }
      this.rowObj = cell.parentNode;
    },
    ZNumber(str) {
      if (str === "" || str === undefined) {
        return 0;
      } else {
        return parseFloat(str);
      }
    },
    //审核通过
    auditAdopt(index) {
      var objData = {
        flag: this.CONSTANT_ADOPT,
        workingHoursAuditJson: JSON.stringify([
          {
            id: this.workinghoursData[index].projectmilestoneplanDtoList[0]
              .projectId,
            timeSheetAuditDesc: this.workinghoursData[index].timeSheetAuditDesc
          }
        ]),
        createUserId: this.workinghoursData[index].uId
      };
      this.auditWorkhours(objData);
    },
    //审核拒绝
    auditRefuse(index) {
      var objData = {
        flag: this.CONSTANT_REFUSE,
        workingHoursAuditJson: JSON.stringify([
          {
            id: this.workinghoursData[index].projectmilestoneplanDtoList[0]
              .projectId,
            timeSheetAuditDesc: this.workinghoursData[index].timeSheetAuditDesc
          }
        ]),
        createUserId: this.workinghoursData[index].uId
      };
      this.auditWorkhours(objData);
    },
    //审核
    auditWorkhours(param) {
      var _this = this;
      this.$http
        .post("/api/projecttimesheetaudit/updateProjectPta", param)
        .then(function(data) {
          _this.$messageSuccess("提交成功");
          _this.$emit("workinghoursFun");
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    rowClick(row) {
      var index = row.auditInd;
      this.workinghoursData[index].isShow = !this.workinghoursData[index]
        .isShow;
    },
    timeSheet: function(status) {
      switch (status) {
        case 1114:
        case 1006:
          return true;
          break;
        default:
          return false;
      }
    },
    //计算工时总计
    calculateWorkHours() {
      this.workHoursTotal.onlineOffline = [];
      this.workHoursTotal.total = [];
      for (var i = 0; i < this.workinghoursData.length; i++) {
        var projectWorkingsHoursDto = this.workinghoursData[i]
          .projectmilestoneplanDtoList;
        for (let j = 0; j < projectWorkingsHoursDto.length; j++) {
          projectWorkingsHoursDto[j].timeSheetSumWeekly =
            Math.round(
              (this.ZNumber(projectWorkingsHoursDto[j].onlineMon) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineTues) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineWed) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineThur) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineFri) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineSat) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineSun) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineMon) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineTues) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineWed) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineThur) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineFri) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineSat) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineSun)) *
                10
            ) / 10;
          for (let z = 0; z < this.CONSTANT_TOTAL_ARR.length; z++) {
            if (
              typeof projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]] ===
              "string"
            ) {
              this.workHoursTotal.onlineOffline[z] === undefined
                ? (this.workHoursTotal.onlineOffline[z] =
                    0 +
                    this.ZNumber(
                      projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]
                    ))
                : (this.workHoursTotal.onlineOffline[z] += this.ZNumber(
                    projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]
                  ));
            } else {
              this.workHoursTotal.onlineOffline[z] === undefined
                ? (this.workHoursTotal.onlineOffline[z] =
                    0 + projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]])
                : (this.workHoursTotal.onlineOffline[z] +=
                    projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]);
            }
            this.workHoursTotal.onlineOffline[z] =
              Math.round(this.workHoursTotal.onlineOffline[z] * 10) / 10;
          }
        }
      }
      for (let x = 0; x < 8; x++) {
        if (x < 7) {
          this.workHoursTotal.total[x] =
            this.workHoursTotal.onlineOffline[x * 2] +
            this.workHoursTotal.onlineOffline[x * 2 + 1];
          this.workHoursTotal.total[x] =
            Math.round(this.workHoursTotal.total[x] * 10) / 10;
        } else {
          this.workHoursTotal.total[x] = this.workHoursTotal.onlineOffline[
            x * 2
          ];
        }
      }
    }
  },
  watch: {
    //计算线上线下工时
    workinghoursData: {
      handler: function(newD, oldD) {
        if (newD.length > 0) {
          this.isNoData = true;
          this.calculateWorkHours();
        } else {
          this.isNoData = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.workHoursTableAudit {
  margin-top: 10px;
  /deep/ .el-table .el-input > input.el-input__inner {
    padding: 0;
    text-align: center;
  }
  .isNoData {
    /deep/ .el-table__body-wrapper {
      display: none;
    }
  }
  /deep/ tr.current-row > td {
    background: #fff5eb;
  }
  .workHoursTableAudit-table-btns {
    margin-top: 10px;
    text-align: center;
  }
  .table-audit {
    width: 100%;
    .table-audit-child {
      padding: 10px 0;
      vertical-align: middle;
      border-right: 1px solid #e5e5e5;
      border-left: 1px solid #e5e5e5;
      .table-audit-text {
        padding-left: 60px;
        font-size: 13px;
        vertical-align: middle;
      }
      .table-audit-textInp {
        padding-left: 20px;
        font-size: 13px;
        vertical-align: middle;
      }
      .el-button {
        height: 25px;
        padding: 5px 20px;
        vertical-align: middle;
      }
      .el-input {
        width: 300px;
        vertical-align: middle;
      }
    }
    .wirteWorkTime-audit {
      .wirteWorkTime-audit-header {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        background: #fafafa;
        color: #262628;
      }
      .wirteWorkTime-audit-content {
        padding: 10px 20px;
        .wirteWorkTime-audit-content-result {
          height: 60px;
          .wirteWorkTime-audit-content-result-left {
            float: left;
            width: 60px;
            height: 60px;
            > i {
              font-size: 58px;
              &.yitongguo {
                color: #11bf6b;
              }
              &.caogao {
                color: #cecece;
              }
            }
          }
          .wirteWorkTime-audit-content-result-right {
            margin-left: 80px;
            font-size: 13px;
            .wirteWorkTime-audit-content-result-right-lih {
              height: 30px;
              line-height: 30px;
            }
            .auditTime {
              float: right;
            }
          }
        }
      }
    }
  }
  .table-audit:last-child {
    border-bottom: 1px solid #e5e5e5;
  }
  .table-border /deep/ .el-table__body-wrapper {
    tr.el-table__row {
      td {
        border-left: 1px solid #e5e5e5;
      }
      td:last-child {
        border-right: 1px solid #e5e5e5;
      }
    }
    tr:nth-child(n+1){
      td:last-child{
        text-align: left;
      }
    }
  }
  .workHoursTotal {
    width: 100%;
    table-layout: fixed;
    tr {
      border-bottom: 1px solid #e5e5e5;
      td {
        height: 32px;
        padding: 0;
        text-align: center;
        border-right: 1px solid #e5e5e5;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        .cell {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          white-space: normal;
          word-break: break-all;
          line-height: 23px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          color: #f09237;
        }
        .cellHead {
          color: #262628;
        }
      }
      td:first-child {
        border-left: 1px solid #e5e5e5;
      }
    }
  }
}
</style>
