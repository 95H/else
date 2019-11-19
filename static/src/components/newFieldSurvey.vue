<template>
  <div class="fieldSurveyWrap">
    <el-container class="fieldSurveyBox">
      <el-form
        :model="fieldSurveyForm"
        :rules="newFieldSurveyrules"
        ref="fieldSurveyForm"
        label-width="110px"
        size="mini"
        class="fieldSurvey_Main"
        :inline="true"
        :show-message="false"
      >
        <!-- 项目信息 -->
        <div>
          <p>
            <i class="iconfont icon-renwuxiangqing"></i>项目信息
          </p>
          <div class="fieldSurvey_top2" v-if="$store.state.dataObj.listType == 'task'">
            <el-form-item label="项目名称：" class="fl" prop="projectId">
              <el-select
                filterable
                v-model="fieldSurveyForm.projectId"
                placeholder="请选择项目名称"
                @change="projectSel"
                value-key="id"
              >
                <el-option
                  :label="item.projectName"
                  :value="item"
                  v-for="(item,ind) in projectOpt"
                  :key="ind + '0'"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="fl" v-show="projectShow">
              <p class="fl">
                <b>项目编号：</b>
                <span>{{projectObj.projectNumber}}</span>
              </p>
              <p class="fl">
                <b>项目负责人：</b>
                <span>{{projectObj.userName}}</span>
              </p>
            </div>
          </div>
          <div class="fieldSurvey_top" v-else>
            <div>
              <p>
                项目名称：
                <span>{{ workinfoshowData.projectName }}</span>
              </p>
              <p>
                项目编号：
                <span>{{ workinfoshowData.projectNumber }}</span>
              </p>
            </div>
            <div>
              <p>
                企业名称：
                <span>{{ workinfoshowData.name }}</span>
              </p>
            </div>
            <div>
              <p>
                联系人姓名：
                <span>{{ workinfoshowData.contactName }}</span>
              </p>
              <p>
                联系人手机：
                <span>{{ workinfoshowData.contactPhone }}</span>
              </p>
            </div>
            <div>
              <p>
                联系人电话：
                <span>{{ workinfoshowData.contactMobile }}</span>
              </p>
              <p>
                联系人传真：
                <span>{{ workinfoshowData.contactFax }}</span>
              </p>
            </div>
            <div>
              <p>
                办公地址：
                <span>{{ workinfoshowData.address }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 现场调查任务编辑 -->
        <div>
          <p>
            <i class="iconfont icon-renwuxiangqing"></i>现场调查任务编辑
          </p>
          <div class="fieldSurvey_bottom">
            <el-form-item
              v-if="$store.state.dataObj.listType == 'task'"
              label="企业名称："
              class="marginBottom10"
              prop="investorId"
            >
              <el-select
                v-model="seleObj"
                placeholder="请选择企业名称"
                class="allw"
                :disabled="$store.state.dataObj.listType == 'task' && !fieldSurveyForm.projectId"
                value-key="id"
                @change="companyChange"
              >
                <el-option
                  :label="item.name"
                  :value="item"
                  v-for="(item,i) in companyName"
                  :key="i + '1'"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务负责人：" class="marginBottom10" prop="headUserId">
              <el-input
                readonly
                v-model="fieldSurveyForm.headUserName"
                type="input"
                placeholder="请选择任务负责人"
                class="halfw"
                @focus="selePeople"
                :disabled="$store.state.dataObj.listType == 'task' && !fieldSurveyForm.projectId"
              ></el-input>
            </el-form-item>
            <el-form-item label="调查类型：" class="marginBottom10" prop="type">
              <el-select
                v-model="fieldSurveyForm.type"
                placeholder="请选择调查类型"
                class="halfw"
                v-on:change="indexSelect($event)"
                :disabled="$store.state.dataObj.listType == 'task' && !fieldSurveyForm.projectId"
              >
                <el-option
                  :label="item.key"
                  :value="item.val"
                  v-for="(item,indexs) in projectData.type"
                  :key="indexs + '3'"
                  v-if="!item.isHide"
                ></el-option>
              </el-select>
            </el-form-item>
            <div v-if="showFT">
              <el-form-item label="访谈对象：" class="marginBottom10">
                <el-input
                  v-model="fieldSurveyForm.interviewee"
                  placeholder="请输入访谈对象"
                  class="allw"
                  maxlength="100"
                ></el-input>
              </el-form-item>
              <el-form-item label="访谈提纲：" class="marginBottom0">
                <el-input
                  type="textarea"
                  v-model="fieldSurveyForm.interviewOutline"
                  placeholder="请输入访谈提纲"
                  class="allw"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </div>
            <div v-if="showKC">
              <el-form-item label="勘察内容：" class="marginBottom10 kcDetail">
                <div class="fl marginRight50">
                  <el-button
                    v-for="(item1,index1) in btnData.left"
                    :key="index1 + 'item1'"
                    type="text"
                    @click="listNewBtn(item1.type,item1.name)"
                  >
                    {{item1.name}}
                    <span>选择</span>
                    <span :class="{gray:!numData[item1.type]}">
                      （已选：
                      <i
                        :class="{gray:!numData[item1.type]}"
                      >{{numData[item1.type] ? numData[item1.type] : 0}}</i>个）
                    </span>
                  </el-button>
                </div>
                <div class="fl">
                  <el-button
                    v-for="(item2,index2) in btnData.right"
                    :key="index2 + 'item2'"
                    type="text"
                    @click="listNewBtn(item2.type,item2.name)"
                  >
                    {{item2.name}}
                    <span>选择</span>
                    <span :class="{gray:!numData[item2.type]}">
                      （已选：
                      <i
                        :class="{gray:!numData[item2.type]}"
                      >{{numData[item2.type] ? numData[item2.type] : 0}}</i>个）
                    </span>
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="勘察备注：" class="marginBottom0">
                <el-input
                  type="textarea"
                  v-model="fieldSurveyForm.surveyRemarks"
                  placeholder="请输入勘察备注"
                  class="allw"
                  maxlength="500"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </el-container>
    <kcperson-Dialog
      ref="kcDialog"
      :tableInfo="tableInfo"
      :kctype="kctype"
      :thisid="ids"
      v-on:field-user="fieldUserFn"
    ></kcperson-Dialog>
  </div>
</template>
<script>
import kcpersonDialog from "@/components/kcpersonDialog";
export default {
  components: {
    kcpersonDialog
  },
  data() {
    return {
      showFT: false,
      showKC: false,
      projectShow: false,
      projectOpt: [],
      companyName: [],
      headUserData: [],
      workinfoshowData: [],
      projectObj: {},
      btnData: {
        left: [
          { name: "现金盘点", type: "CASHCHECK" },
          { name: "房屋", type: "HOUSE" },
          { name: "构筑物", type: "STRUCTURE" },
          { name: "可疑债权", type: "CREDITOR" },
          { name: "通用设备", type: "GENERALEQUIPMENT" },
          { name: "电梯、起重设备", type: "LIFTINGEQUIPMENT" },
          { name: "压力容器", type: "PRESSUREVESSEL" }
        ],
        right: [
          { name: "银行调节", type: "BANKREGULATION" },
          { name: "车辆", type: "VEHICLE" },
          { name: "宗地", type: "PARCELSTATUS" },
          { name: "存货盘点", type: "INVENTORY" },
          { name: "进口设备", type: "IMPORTEDEQUIPMENT" },
          { name: "大型电子设备", type: "LARGEQUIPMENT" },
          { name: "工业锅炉", type: "INDUSTRIALBOILER" }
        ]
      },
      fieldSurveyForm: {
        projectId: "", //项目名称
        investorId: "", //企业名称
        headUserId: "", //任务负责人
        headUserName: "", //任务负责人
        type: "", //调查类型
        interviewee: "", //访谈对象
        interviewOutline: "", //访谈提纲
        jobData: [], // 勘查内容
        surveyRemarks: "" //勘查备注
      },
      projectData: {
        type: [
          { key: "现场访谈", val: "1", isHide: false },
          { key: "实物勘察", val: "2", isHide: false }
        ]
      },
      numData: {},
      seleObj: {},
      ids: "",
      newFieldSurveyrules: {
        projectId: [{ required: true, message: "", trigger: "change" }],
        investorId: [{ required: true, message: "", trigger: "change" }],
        headUserId: [{ required: true, message: "", trigger: "change" }],
        type: [{ required: true, message: "", trigger: "change" }]
      },
      tableInfo: "",
      kctype: "newfieldSurvey"
    };
  },
  methods: {
    // 分配
    childMethod() {
      var _this = this;
      this.$refs["fieldSurveyForm"].validate(valid => {
        if (valid) {
          this.$confirm("确认分配本次现场调查任务？", "提示信息", {
            confirmButtonText: "确认分配",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "分配成功!"
              });
              var arr = [],
                nums = 0;
              for (var i in _this.$store.state.fieldID) {
                for (var j = 0; j < _this.$store.state.fieldID[i].length; j++) {
                  if (_this.$store.state.fieldID[i][j]) {
                    if (_this.$store.state.fieldID[i][j].ids != undefined) {
                      arr.push(_this.$store.state.fieldID[i][j]);
                      nums += _this.$store.state.fieldID[i][j].len;
                    }
                  }
                }
              }
              _this.fieldSurveyForm.jobData = JSON.stringify(arr);
              if (_this.$store.state.dataObj.listType == "task") {
                //菜单--任务
                _this.fieldSurveyForm.projectId =
                  _this.fieldSurveyForm.projectId.id;
              } else {
                //项目--作业
                _this.fieldSurveyForm.projectId = _this.ids;
                _this.fieldSurveyForm.investorId =
                  _this.$store.state.investorId;
              }
              if (nums == 0 && _this.fieldSurveyForm.type == 2) {
                _this.$messageError("未选择勘查内容");
              } else {
                _this.$http
                  .post(
                    "/api/fieldinvestigation/createJob",
                    _this.fieldSurveyForm
                  )
                  .then(function(data) {
                    _this.$store.commit("changeShowCommon");
                    _this.$store.state.resetFun();
                  })
                  .catch(function(error) {
                    _this.$messageError(error);
                  });
              }
            })
            .catch(() => {
              _this.$message({
                type: "info",
                message: "已取消分配"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 调查类型切换
    indexSelect(event) {
      if (event == 1) {
        this.showFT = true;
        this.showKC = false;
      } else {
        this.showKC = true;
        this.showFT = false;
      }
    },
    // 勘查内容弹窗打开
    listNewBtn(val, k) {
      this.$store.commit("changeShowCommonOther");
      this.$store.state.commonTitleOther = "现场调查任务资产选择";
      this.$store.state.commonBtnOther = "取消";
      this.$store.state.extraBtnOther = "确定";
      this.$store.state.componentsTypeOther = "fieldinvestigationCommon";
      this.$store.state.cprWidthOther = true;
      if (this.$store.state.dataObj.listType == "task") {
        this.$store.state.fieldinvestigationObj = {
          company: this.seleObj.name,
          subject: k,
          type: val,
          projectId: this.ids,
          investorId: this.fieldSurveyForm.investorId
        };
      } else {
        this.$store.state.fieldinvestigationObj = {
          company: this.seleObj.name,
          subject: k,
          type: val,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId
        };
      }
    },
    //选择项目名称带出项目编号和项目负责人
    projectSel(val) {
      this.projectObj = val;
      this.projectShow = true;
      this.ids = val.id;
      this.selectFuncs();
      this.newInfoFunc(this.ids);
      // 清空表单
      this.seleObj = {};
      this.fieldSurveyForm.investorId = "";
      this.fieldSurveyForm.headUserId = "";
      this.fieldSurveyForm.headUserName = "";
      this.fieldSurveyForm.type = "";
      this.fieldSurveyForm.interviewee = "";
      this.fieldSurveyForm.interviewOutline = "";
      this.fieldSurveyForm.surveyRemarks = "";
      this.showFT = false;
      this.showKC = false;
    },
    // 企业名称选择
    companyChange(val) {
      this.fieldSurveyForm.investorId = val.id;
      this.selectTypeFunc(this.fieldSurveyForm.investorId);
      this.fieldSurveyForm.headUserId = "";
      this.fieldSurveyForm.headUserName = "";
      this.fieldSurveyForm.type = "";
      this.showFT = false;
      this.showKC = false;
    },
    selectFuncs() {
      var _this = this;
      //企业名称
      this.$http
        .post("/api/fieldinvestigation/getInvestor", {
          id: this.ids
        })
        .then(function(data) {
          _this.companyName = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
      // 任务负责人
      this.$http
        .post("/api/project/getProjectUsers", {
          projectId: this.ids
        })
        .then(function(data) {
          _this.headUserData = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    newInfoFunc(id) {
      var _this = this;
      //新建信息展示
      this.$http
        .post("/api/fieldinvestigation/getProjectInfo", {
          id: id
        })
        .then(function(data) {
          _this.workinfoshowData = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    selectTypeFunc(investorId) {
      var _this = this;
      //调查类型
      this.$http
        .post("/api/fieldinvestigation/judgeKc", {
          investorId: investorId
        })
        .then(function(data) {
          if (data.data == "N") {
            _this.projectData.type[1].isHide = true;
          } else {
            _this.projectData.type[1].isHide = false;
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    selePeople() {
      this.$refs.kcDialog.openDialog();
    },
    fieldUserFn(thisUserItem) {
      this.fieldSurveyForm.headUserId = thisUserItem.projectUserId;
      this.fieldSurveyForm.headUserName = thisUserItem.projectUserName;
    }
  },
  mounted() {
    var _this = this;
    this.$store.state.fieldID = {};
    this.$store.state.monitorFieldIDFun = function() {
      for (var i in _this.$store.state.fieldID) {
        if (_this.$store.state.fieldID[i].length > 1) {
          var nums = 0;
          for (var k = 0; k < _this.$store.state.fieldID[i].length; k++) {
            if (_this.$store.state.fieldID[i][k]) {
              nums += _this.$store.state.fieldID[i][k].len * 1;
            }
          }
          _this.$set(_this.numData, i, nums);
        } else {
          _this.$set(_this.numData, i, _this.$store.state.fieldID[i][0].len);
        }
      }
    };
    if (this.$store.state.dataObj.listType == "task") {
      //项目名称
      this.$http
        .post("/api/project/getProjectInfoByLogin")
        .then(function(data) {
          _this.projectOpt = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    } else {
      this.ids = this.$store.state.projectId;
      this.selectFuncs();
      this.newInfoFunc(this.$store.state.investorId);
      this.selectTypeFunc(this.$store.state.investorId);
    }
  }
};
</script>
<style lang="scss" scoped>
.fieldSurveyWrap {
  .fieldSurveyBox {
    width: 800px;
    background: rgba(255, 255, 255, 1);
    .fieldSurvey_Main {
      margin: 20px;
      > div {
        height: auto;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        border: 1px solid rgba(236, 236, 236, 1);
        > p {
          height: 35px;
          background: #fafafa;
          border-radius: 2px 2px 0px 0px;
          border-bottom: 1px solid rgba(236, 236, 236, 1);
          line-height: 36px;
          font-size: 13px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(38, 38, 40, 1);
          > i {
            color: #f7b543;
            margin-left: 17px;
            margin-right: 10px;
          }
        }
        .fieldSurvey_top {
          padding: 15px 35px;
          display: inline-block;
          width: 688px;
          > div {
            width: 100%;
            height: 30px;
            clear: both;
            > p {
              float: left;
              width: 50%;
              line-height: 34px;
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #777777;
              span {
                color: #1d1c1e;
              }
            }
          }
          > div:last-child > p {
            width: 100%;
          }
        }
        .fieldSurvey_top2 {
          padding: 10px 40px;
          display: inline-block;
          .el-form-item /deep/ {
            margin: 0;
            line-height: 40px;
            .el-form-item__content {
              line-height: 40px;
            }
          }
          p {
            line-height: 40px;
            margin-left: 20px;
            width: 150px;
            b {
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(99, 99, 99, 1);
            }
            span {
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #1d1c1e;
            }
          }
        }
        .fieldSurvey_bottom {
          padding: 15px 35px;
          display: inline-block;
          width: 688px;
          .kcDetail {
            width: 100%;
            > div {
              > div {
                width: auto;
                .el-button {
                  display: block;
                  margin-left: 0;
                  border: none;
                  font-size: 13px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(38, 38, 40, 1);
                  span:first-child {
                    color: #3a80ec;
                  }
                  span:last-child {
                    color: #88b855;
                    i {
                      color: #88b855;
                    }
                  }
                  span.gray {
                    color: #909090;
                  }
                }
              }
            }
          }
          .allw {
            width: 566px;
          }
          .halfw {
            width: 220px;
          }
        }
      }
      > div:last-child {
        margin-top: 12px;
      }
    }
  }
}

.field-fade-in-active,
.field-fade-out-active {
  transition: all 0.5s ease;
}
.field-fade-in-enter,
.field-fade-out-active {
  width: 0;
}
</style>

