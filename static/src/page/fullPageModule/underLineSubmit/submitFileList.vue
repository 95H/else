<template>
  <div class="padding20">
    <div class="fileList marginBottom10" v-if="underLineTrial">
      <div class="fileTitle">
        <i class="iconfont icon-sousuowenjian blue"></i> 审核结果
      </div>
      <div class="fileBox">
        <div class="textateaBox">
          <span>审核结果：</span>
          <el-radio-group v-model="examineResult" v-if="!/projectExternalAudit/.test($route.path)">
            <el-radio :label="0">通过</el-radio>
            <el-radio :label="1">不通过</el-radio>
          </el-radio-group>
          <el-radio-group v-model="examineResult" v-else>
            <el-radio v-for="(val, index) in singleBtns" :key="index" :label="val">{{allBtns[val]}}</el-radio>
          </el-radio-group>
        </div>
        <div class="textateaBox marginTop10">
          <span>审核意见：</span>
          <textarea rows="3" v-model="opinion"></textarea>
        </div>
      </div>
    </div>
    <div class="fileList">
      <div class="fileTitle">
        <i class="orange iconfont icon-xiangmudigao"></i> 文件列表
        <el-checkbox
          v-if="fileListFlag"
          class="fr"
          v-model="myselfFile"
          @change="myselfFileFun"
        >仅自身上传</el-checkbox>
      </div>
      <div class="fileBox">
        <el-table :data="tableData" border>
          <el-table-column label="文件名称">
            <template slot-scope="scope">
              <i class="el-icon-document fs14" style="color:#b0b0b0;"></i>
              {{scope.row.fileName}}
            </template>
          </el-table-column> 
          <el-table-column
            v-if="!underLineTrial"
            align="center"
            prop="createUser"
            label="上传人"
            width="80"
          ></el-table-column>
          <el-table-column
            v-if="!underLineTrial"
            align="center"
            prop="createTime"
            label="上传时间"
            width="170"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <template v-if="$store.state.dataObj.type==='income'">
                <el-button type="text" size="small" @click="downloadFile(scope.row)">下载</el-button>
              </template>
              <!--作业请款下的按钮-->
              <el-button
                v-if="fileListFlag && !/projectAuditing/g.test($route.path)"
                type="text"
                size="small"
                @click="downloadFile(scope.row)"
              >下载</el-button>
              <el-button
                v-if="isProjectLeader && ($store.state.isCensorship != 1 || $store.state.processStateId == 1360) && !/projectAuditing/g.test($route.path) "
                type="text"
                class="orange"
                size="small"
                @click="deleteItem(scope.row,scope.$index)"
              >删除</el-button>
              <el-button
                v-if="($store.state.isCensorship != 1 || $store.state.processStateId == 1360) && !isProjectLeader && !/projectAuditing/g.test($route.path)"
                :disabled="scope.row.createUserId != userId"
                type="text"
                class="orange"
                size="small"
                @click="deleteItem(scope.row,scope.$index)"
              >删除</el-button>
              <!--审核情况下的按钮-->
              <el-button
                v-if="fileListFlag && /projectAuditing/g.test($route.path)"
                type="text"
                size="small"
                @click="downloadFile(scope.row)"
              >下载</el-button>
              <el-button
                v-if="isProjectLeader && /projectAuditing/g.test($route.path)"
                type="text"
                class="orange"
                size="small"
                @click="deleteItem(scope.row,scope.$index)"
              >删除</el-button>
              <el-button
                v-if="!isProjectLeader && /projectAuditing/g.test($route.path)"
                :disabled="scope.row.createUserId != userId"
                type="text"
                class="orange"
                size="small"
                @click="deleteItem(scope.row,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <a href="javascript:;" class="reset-btn marginTop10">+ 添加</a> -->
        <el-upload
          action="/api/file/upload"
          :before-upload="loadFile"
          multiple
          :on-success="uploadFileSuccess"
          :on-error="uploadFileError"
          :show-file-list="false"
          :data="upLoadParams"
        >
          <a
            href="javascript:;"
            class="reset-btn marginTop10"
            v-if="$store.state.isCensorship != 1 ||
           /projectAuditing/.test($route.path) || $store.state.processStateId == 1360"
          >+ 添加</a>
        </el-upload>
      </div>
    </div>
    <div class="fileList marginTop10" v-if="sendTrial|externalSendTrial|income">
      <div class="fileTitle">
        <i class="orange iconfont icon-xiangmudigao"></i> 备注说明
      </div>
      <div class="fileBox">
        <div class="textateaBox">
          <span>备注说明：</span>
          <textarea v-if="$store.state.dataObj.type == 'income'" rows="4" placeholder="请输入备注信息" v-model="remarksContent" :readonly="readonly"></textarea>
          <textarea v-else rows="4" placeholder="请输入备注信息" v-model="remarksContent"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: JSON.parse(this.$getCookie("user")).id, //获取当前登录人的id
      sendTrial: this.$store.state.dataObj.sendTrial, //线下送审状态
      fileListFlag: this.$store.state.dataObj.fileListFlag, //文件管理状态
      income: this.$store.state.dataObj.type === "income", //收益法附件说明
      underLineTrial: this.$store.state.dataObj.underLineTrial, //线下审核状态
      externalSendTrial: this.$store.state.dataObj.externalSendTrial, // 外审修改的线下送审
      isIssure: this.$store.state.dataObj.isIssure,
      extraBtn: this.$store.state.extraBtn,//编辑
      commonBtn: this.$store.state.commonBtn,//保存
      examineResult: "", //审核结果
      opinion: "", //审核意见
      remarksContent: "", //备注说明
      remarksContentId: "", //备注说明id
      myselfFile: false, //仅自身上传
      upLoadParams: {
        fileUrl: "",
        projectId: this.$store.state.projectId,
        investorId: this.$store.state.investorId
      },
      tableData: [],
      isProjectLeader: this.$store.state.dataObj.isProjectLeader, //当前登录人是否是项目负责人
      singleBtns: {},
      allBtns: {
        "1355": "通过",
        "1356": "不通过",
        "1357": "通过",
        "1358": "不通过",
        "1360": "通过",
        "1361": "不通过",
        "1362": "退回到初审",
        "1363": "退回到复审"
      },
      readonly: true
      // disabled:false,
    };
  },
  created() {
    this.fileListArr();
  },
  methods: {
    // 文件列表
    fileListArr() {
      let _this = this;
      var url = /externalOffLineAudit/.test(this.$route.path)
          ? "api/changeInvestors/isChangeExistTask"
          : "/api/projectdocs/findProjectdocsFile",
        data = {};
      if (this.income) {
        url = "/api/incomeFile/findProjectdocsFile";
        data = {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          fileType: this.$store.state.dataObj.sheetName,
          templatedId: this.$store.state.incomeInitId
        };
      } else {
        data = {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          tabFlag:
            this.myselfFile || /projectAuditing/.test(this.$route.path)
              ? "yes"
              : "no",
          taskId: this.$store.state.dataObj.taskId
        };
      }
      this.$http
        .post(url, data)
        .then(res => {
          if (/externalOffLineAudit/.test(_this.$route.path)) {
            _this.singleBtns = res.data.changeExistTask;
            _this.tableData = res.data.projectdocList;
          } else {
            if(this.income){
              this.tableData = res.data.list;
              if(res.data.remark){
                this.remarksContent = res.data.remark.remark;
                this.remarksContentId = res.data.remark.id;
              }
            }else{
              this.tableData = res.data;
            }
          }
        })
        .catch(err => {
          this.$messageError(err);
        });
    },
    // 仅自身上传搜索
    myselfFileFun() {
      this.fileListArr();
    },
    // 第一个按钮的方法
    childMethod() {
      var _this=this;
      if (this.fileListFlag) {
        if (this.tableData.length > 0) {
          window.location.href =
            "/api/documentsRemark/downLoadSubmitFiles?token=" +
            this.$getCookie("token") +
            "&projectId=" +
            this.$store.state.projectId +
            "&investorId=" +
            this.$store.state.investorId;
        } else {
          this.$messageError("无可下载的文件");
        }
      } else if (this.sendTrial) {
        let url = /examineModification/.test(this.$route.path)
          ? "api/changeInvestors/changeSendDownInvestors"
          : "api/investors/sendInvestors";
        let data = /examineModification/.test(this.$route.path)
          ? {
              projectId: this.$store.state.projectId,
              investorIds: this.$store.state.investorId,
              remarksContent: this.remarksContent
            }
          : {
              projectId: this.$store.state.projectId,
              investorIds: this.$store.state.investorId,
              onlineOffline: 0,
              remarksContent: this.remarksContent
            };
        this.$http
          .post(url, data)
          .then(response => {
            this.$messageSuccess(response.msg);
            this.$store.state.getSubmitFileData();
            this.$store.commit("changeShowCommon");
          })
          .catch(error => {
            this.$messageError(error);
          });
      } else if (this.underLineTrial) {
        //审核
        let url = /externalOffLineAudit/.test(this.$route.path)
          ? "api/changeInvestors/downAuditingReport"
          : "/api/investors/underLineReportAuditing";
        let data = /externalOffLineAudit/.test(this.$route.path)
          ? {
              auditingJson: JSON.stringify([
                {
                  taskId: this.$store.state.dataObj.taskId,
                  investorId: this.$store.state.investorId
                }
              ]),
              projectId: this.$store.state.projectId,
              content: this.opinion,
              auditStatus: this.examineResult
            }
          : {
              auditingJson: JSON.stringify([
                {
                  taskId: this.$store.state.dataObj.taskId,
                  investorId: this.$store.state.investorId
                }
              ]),
              projectId: this.$store.state.projectId,
              content: this.opinion,
              flag: this.examineResult,
              onlineOffline: 0
            };
        if (this.examineResult === "") {
          this.$messageWarning("未选择审核结果！");
          return;
        }
        this.$http
          .post(url, data)
          .then(response => {
            this.$messageSuccess("操作成功");
            this.$store.state.getSubmitFileData();
            this.$store.commit("changeShowCommon");
            if (
              /projectExternalAudit/.test(this.$route.path) &&
              response.data
            ) {
              this.$http
                .post("/api/changeInvestors/copyIssueReportDraft", {
                  issueInvestorIds: response.data,
                  showLoading: false
                })
                .then(function(data) {})
                .catch(function(error) {
                  this.$messageError(error);
                });
            }
          })
          .catch(error => {
            this.$messageError(error);
          });
      }else if(this.income){
        // this.readonly =true;
        _this.$http
          .post("/api/incomeFile/saveRemark", {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            templateId:_this.$store.state.incomeInitId,
            fileType: _this.$store.state.dataObj.sheetName,
            remark: _this.remarksContent,
            remarkId: _this.remarksContentId
          })
          .then(function(res) {
            _this.$messageSuccess("保存成功！");
            if(!_this.remarksContentId){
              _this.remarksContentId=res.data.id
            }
          })
          .catch(function(error) {
            _this.maskLoading.close();
            _this.$messageError(error);
          });

      } 
    },
    // 第二个按钮的方法
    extraChildMethod() {
      if (this.fileListFlag) {
        this.$http
          .post("api/projectdocs/delProjectdocsFile", {
            investorId: this.$store.state.investorId
          })
          .then(response => {
            this.$messageSuccess(response.msg);
            this.fileListArr();
          })
          .catch(error => {
            this.$messageError(error);
          });
      }else if(this.income){
        this.readonly=false;
      }
    },
    // 增加遮罩
    loadFile(file) {
      if(file.size===0){
        this.$messageError("上传文件不能为空！");
        return false
      }
      this.maskLoading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
    },
    // 上传文件成功保存入库
    uploadFileSuccess(res) {
      let _this = this;
      if (this.$store.state.dataObj.type === "income") {
        _this.$http
          .post("/api/incomeFile/saveProjectdocs", {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            fileName: res.data.fileName,
            filePath: res.data.fileDir,
            fileType: _this.$store.state.dataObj.sheetName,
            templateId: _this.$store.state.incomeInitId
          })
          .then(function(res) {
            _this.tableData.push(res.data);
            _this.$messageSuccess("上传成功！");
          })
          .catch(function(error) {
            _this.maskLoading.close();
            _this.$messageError(error);
          });
      } else {
        _this.$http
          .post("/api/documentsRemark/saveOrUpdateProjectdocs", {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            fileName: res.data.fileName,
            filePath: res.data.fileDir,
            filetype: "OFFLINEMANUSCRIPT",
            docType: 0,
            taskId: this.$store.state.dataObj.taskId,
            showLoading: false
          })
          .then(function(res) {
            _this.maskLoading.close();
            _this.tableData = res.data;
          })
          .catch(function(error) {
            _this.maskLoading.close();
            _this.$messageError(error);
          });
      }
    },
    // 文件上传失败
    uploadFileError(err) {
      this.maskLoading.close();
      this.$messageError(err);
    },
    // 删除附件
    deleteItem(item, index) {
      let _this = this;
      if (this.isProjectLeader || item.createUserId == _this.userId) {
        _this.$http
          .post("/api/documentsRemark/deleteFileDoc", {
            fileDocId: item.id
          })
          .then(function(res) {
            _this.tableData.splice(index, 1);
            _this.$messageSuccess("删除成功！");
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        _this.$messageError("您没有此文件的删除权限");
      }
    },
    // 下载某个文件
    downloadFile(item) {
      window.location.href =
        "/api/file/downloadFile?token=" +
        this.$getCookie("token") +
        "&docsName=" +
        this.$filename(item.fileName) +
        "&flag=2&alyPath=" +
        item.filePath;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.fileList {
  border: 1px solid #ececec;
  .fileTitle {
    background-color: #fafafa;
    border-bottom: 1px solid #ececec;
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    font-weight: bold;
  }
  .fileBox {
    padding: 10px;
    .el-upload-list {
      display: none;
    }
    .el-table {
      .el-button:hover {
        text-decoration: underline;
      }
      .el-button[disabled] {
        color: #c0c4cc !important;
      }
    }
  }
  .textateaBox {
    position: relative;
    padding-left: 80px;
    span {
      position: absolute;
      top: 5px;
      left: 15px;
      font-size: 13px;
      color: #686868;
    }
    textarea {
      width: 100%;
      padding: 2px 5px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #e1e1e1;
      border-radius: 2px;
      line-height: 20px;
    }
  }
  /deep/ .el-table__empty-text {
    height: 150px;
    line-height: 230px;
    text-align: center;
    font-size: 13px;
    color: #909090;
    background: url(../../../assets/common/nodata.png) no-repeat center;
  }
}
</style>
