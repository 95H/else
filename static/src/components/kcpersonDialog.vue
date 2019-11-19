<template>
  <div>
    <!-- 勘查弹窗 -->
    <center-dialog
      ref="centerDialog"
      :dialogWidth="kcdialogWidth"
      :dialogHeight="kcdialogHeight"
      :dialogTitle="kcdialogTitle"
      :titlePosition="kctitlePosition"
      @centerCanclePreson="centerCanclePreson"
    >
      <div slot="dialogContent">
        <el-select
          v-model="kcval"
          placeholder="请选择设备类别"
          class="kcdialogSelect marginBottom10"
          v-if="kcLB"
        >
          <el-option
            :label="kcitem.kcName"
            :value="kcitem.kcId"
            v-for="(kcitem,kcindex) in machineCategoryData"
            :key="kcindex + '1'"
          ></el-option>
        </el-select>
        <el-table :data="headUserData" border style="width: 100%" class="kcTable" height="220">
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-radio
                :label="scope.row.projectUserId"
                v-model="templateRadio"
                @change.native="getTemplateRow(scope.$index,scope.row)"
              >&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <div>{{scope.row.source == ''? scope.row.projectUserName : scope.row.projectUserName + '（新增）'}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="kcOther marginTop10 paddingTop10">
          <p>其他：</p>
          <el-input
            type="input"
            v-model="kcPeople.kcOtherName"
            placeholder="请选择"
            maxlength="100"
            @focus="selectPerson('kcOther')"
          ></el-input>
        </div>
        <div class="clear kcselectPeopleBtns text-center marginTop15">
          <div class="search-btn" @click.stop="kcDetermineBtn">确定</div>
          <div class="reset-btn" @click.stop="kcCancelBtn">取消</div>
        </div>
      </div>
    </center-dialog>
    <person-dialog ref="selectPersonDialog" v-on:setPersonId="setPersonId"></person-dialog>
  </div>
</template>

<script>
import centerDialog from "@/components/centerDialog.vue";
import personDialog from "@/components/personDialog";
export default {
  name: "kcpersonDialog",
  props: ["tableInfo", "kctype", "thisid"],
  components: {
    centerDialog,
    personDialog
  },
  data() {
    return {
      headUserData: [], //勘查任务负责人
      templateRadio: "", //勘查任务负责人单选
      kcdialogWidth: "400px", //勘查弹窗宽度
      kcdialogHeight: "384px", //勘查弹窗高度
      kcdialogTitle: "选择人员", //勘查弹窗标题
      kctitlePosition: "center", //勘查弹窗标题位置
      kcLB: false, //是否显示设备类别选择框
      kcval: "", //勘查设备类别下拉框
      machineCategoryData: [
        //设备类别值
        { kcName: "通用设备", kcId: "GENERALEQUIPMENT" },
        { kcName: "进口设备", kcId: "IMPORTEDEQUIPMENT" },
        { kcName: "工业锅炉", kcId: "INDUSTRIALBOILER" },
        { kcName: "电梯、起重设备", kcId: "LIFTINGEQUIPMENT" },
        { kcName: "压力容器", kcId: "PRESSUREVESSEL" }
      ],
      kcPeople: {
        kcOtherName: "",
        kcOtherId: ""
      },
      headUserThisId: "",
      fieldUser: {}
    };
  },
  methods: {
    openDialog() {
      if (this.$store.state.kcseleName == "GENERALEQUIPMENT") {
        this.kcLB = true;
        this.kcdialogHeight = "420px";
      } else {
        this.kcLB = false;
        this.kcdialogHeight = "384px";
      }
      var _this = this, projectTypeId;
      if (this.kctype == "tablemore") {
        projectTypeId = this.tableInfo.projectId;
      } else if (this.kctype == "newfieldSurvey") {
        projectTypeId = this.thisid;
      }
      // 任务负责人
      this.$http
        .post("/api/project/getProjectUsers", {
          projectId: projectTypeId
        })
        .then(function(data) {
          _this.headUserData = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
      this.$refs.centerDialog.showDialog();
    },
    // 勘察任务负责人弹窗取消按钮
    kcCancelBtn() {
      this.$refs.centerDialog.closeDialog();
      this.kcval = "";
      this.templateRadio = "";
      this.kcPeople.kcOtherName = "";
      this.kcPeople.kcOtherId = "";
    },
    //点击弹窗右上角关闭按钮页面的回调
    centerCanclePreson() {
      this.kcval = "";
      this.templateRadio = "";
      this.kcPeople.kcOtherName = "";
      this.kcPeople.kcOtherId = "";
    },
    // 任务负责人其他（新增）
    selectPerson(kcOther) {
      this.$refs.selectPersonDialog.showPersonDialog(kcOther);
    },
    setPersonId(type, name, id) {
      this.kcPeople[type + "Id"] = id;
      this.kcPeople[type + "Name"] = name;
      this.templateRadio = "";
      this.headUserThisId = id;
    },
    //勘察任务负责人选取选中数据
    getTemplateRow(index, row) {
      this.templateSelection = row;
      if (this.templateRadio != "") {
        this.kcPeople.kcOtherName = "";
        this.kcPeople.kcOtherId = "";
      }
      this.headUserThisId = this.templateSelection.projectUserId;
    },
    // 勘察任务负责人弹窗确定按钮
    kcDetermineBtn() {
      var _this = this;
      // 拼取对应字段
      var kcsheetNameObj = {
        现金: "CASHCHECK",
        房屋建筑物: "HOUSE0",
        投资性房地产: "HOUSE1",
        构筑物: "STRUCTURE0",
        管道沟槽: "STRUCTURE1",
        应收账款: "CREDITOR0",
        预付账款: "CREDITOR1",
        其他应收款: "CREDITOR2",
        银行存款: "BANKREGULATION",
        车辆: "VEHICLE",
        土地: "PARCELSTATUS0",
        "无形-土地": "PARCELSTATUS1",
        "材料采购(在途物资)": "INVENTORY0",
        原材料: "INVENTORY1",
        在库周转材料: "INVENTORY2",
        委托加工物资: "INVENTORY3",
        "产成品(库存商品)": "INVENTORY4",
        "在产品(自制半成品)": "INVENTORY5",
        发出商品: "INVENTORY6",
        在用周转材料: "INVENTORY7",
        农产品: "INVENTORY8",
        消耗性生物资产: "INVENTORY9",
        工程施工: "INVENTORY10",
        电子设备: "LARGEQUIPMENT",
        机器设备: "JQ"
      };
      //英文大写
      var kcsheetName = kcsheetNameObj[this.tableInfo.sheetName],
        kcisJQ = false;
      if (kcsheetName == "JQ" && this.kctype == "tablemore") {
        if (this.kcval == "") {
          this.$messageError("请选择设备类别");
        } else if (this.templateRadio == "" && this.kcPeople.kcOtherName == "") {
          this.$messageError("请选择勘查人员");
        }
        kcjobType = this.kcval;
        kcsheetName = this.kcval;
        kcisJQ = true;
      } else if (this.kctype == "tablemore" && kcsheetName != "JQ") {
        if (this.templateRadio == "" && this.kcPeople.kcOtherName == "") {
          this.$messageError("请选择勘查人员");
        }
        kcisJQ = false;
        var kcjobType = kcsheetName.replace(/[0-9]/gi, "");
      }
      var jobdata = JSON.stringify([{type: kcsheetName, jobType: kcjobType, len: 1, ids: this.tableInfo.id}]);
      if ((this.kctype == "tablemore" && kcisJQ && this.kcval != "" && (this.templateRadio != "" || this.kcPeople.kcOtherName != "")) || (this.kctype == "tablemore" && !kcisJQ && (this.templateRadio != "" || this.kcPeople.kcOtherName != ""))) {
        this.$http
          .post("/api/fieldinvestigation/createJob", {
            projectId: this.tableInfo.projectId,
            investorId: this.tableInfo.investorId,
            type: 2,
            headUserId: this.headUserThisId,
            interviewee: "",
            interviewOutline: "",
            jobData: jobdata,
            surveyRemarks: ""
          })
          .then(function(data) {
            _this.$refs.centerDialog.closeDialog();
            _this.$messageSuccess("分配成功");
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else if (this.kctype == "newfieldSurvey") {
        if (this.templateRadio != "" && this.kcPeople.kcOtherName == "") {  //选择表格里的人员
          this.fieldUser = this.templateSelection;
          this.$emit("field-user", this.fieldUser);
          _this.$refs.centerDialog.closeDialog();
        } else if (this.templateRadio == "" && this.kcPeople.kcOtherName != "") {  //选择其他
          this.fieldUser.projectUserName = this.kcPeople.kcOtherName;
          this.fieldUser.projectUserId = this.kcPeople.kcOtherId;
          this.$emit("field-user", this.fieldUser);
          _this.$refs.centerDialog.closeDialog();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.kcTable {
  min-height: 225px;
  /deep/ .el-table__empty-block {
    height: 190px;
  }
  /deep/ .el-table__body-wrapper {
    table {
      tr {
        td:first-child {
          .cell {
            text-align: center;
            padding-right: 0;
            padding-left: 16px;
          }
        }
      }
    }
  }
}
.kcOther {
  display: flex;
  border-top: 1px solid #ececec;
  padding-top: 10px;
  p {
    width: 46px;
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(104, 104, 104, 1);
    line-height: 25px;
  }
}
.kcdialogSelect {
  width: 100%;
}
.kcselectPeopleBtns {
  .search-btn {
    position: unset;
  }
}
</style>


