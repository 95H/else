<template>
  <div class="submitFile-wrapper">
    <div class="submitFile-header">
      <el-row class="header-wrapper">
        <span class="textOverflow1" :title="companyName">{{companyName}}</span>
        <span>{{reportStatus}}</span>
        <span class="reset-btn header-wrapper-btn" @click="downloadAll">全部下载</span>
      </el-row>
    </div>
    <div class="submitFile-content">
      <div class="upper-wrapper">
        <div class="reason-note">
          <span class="reason-title fl">理由备注：</span>
          <div class="reason-content fl" v-if="showTextArea">
            <el-input type="textarea"
              v-model="documentsRemark.comments"
              :autosize="{ minRows:2, maxRows:2}"
              placeholder="请输入理由备注"
              maxlength="500" :disabled="isRead"></el-input>
              <a href="javascript:;" class="saveBtn" @click="saveMsg" v-if="!isRead">保存</a>
          </div>
          <div class="reason-content fl" v-else>
            <span>{{documentsRemark.comments}}</span>
            <a href="javascript:;" class="blue" @click="showTextArea=true"><i class="el-icon-edit-outline gray"></i> 编辑</a>
          </div>
        </div>
        <div class="attachment">
          <span>项目附件:</span>
          <ul class="attachment-sheet" v-if="tableData.length>0">
            <li class="attachment-item" v-for="(item, index) in tableData" :key="index"
                @mouseenter="changeClassName(true, index)" @mouseleave="changeClassName(false, index)">
              <span><i class="el-icon-document"></i></span>
              <span :title="item.fileName">{{item.fileName}}</span>
              <span>{{item.fileUserName}}</span>
              <span>{{item.createTime}}</span>
              <span @click="downloadFile(item)"><i class="iconfont icon-download"></i></span>
              <span @click="deleteItem(item,index)"><i class="el-icon-circle-check" ref="check"></i></span>
            </li>
          </ul>
          <el-upload
            class="upload-demo"
            action="/api/file/upload"
            :on-progress="loadFile"
            :on-success="uploadFileSuccess"
            :data="upLoadParams" :disabled="isRead">
            <el-button size="small" type="primary" v-if="!isRead">+ 附件上传</el-button>
          </el-upload>
        </div>
      </div>
      <div class="step-condition">
        <el-steps direction="vertical" :active="0">
          <div class= "projectCondition" v-for="(item, index) in workFlowDataList" v-if="workFlowDataList.length" :key="index">
            <el-step :title="`时间：${item.createTime}`" icon= "el-icon-time"></el-step>
            <div class="condition-info">
              <div class="person-icon">
                <i class="iconfont icon-renyuan"></i>
              </div>
              <div class="involved-person">
                <!-- <span>{{projectCondition.manager}}</span>
                <span>项目经理</span> -->
                <div class="person-operate">
                  <span>{{item.userName}}</span>
                  {{taskTypes[item.taskType]}}
                  <p v-if="item.processStateId != ''">审核结果：{{fileterData("processStateId",item.processStateId+'')}}</p>
                  <p v-if="item.remarkContent != ''">备注：{{item.remarkContent}}</p>
                </div>
              </div>
              <!--<div class="project-company">-->
                <!--{{}}-->
              <!--</div>-->
            </div>
          </div>
        </el-steps>
        <div v-if="workFlowDataList.length===0" class="noData">暂无记录</div>
      </div>
    </div>
  </div>
</template>

<script>
import Public from "../../public.js";
export default {
  data() {
    return {
      showTextArea: true,
      commonData: window.commonData,
      documentsRemark: "",
      upLoadParams: {
        fileUrl: "", //this.$store.state.fileUrl
        projectId: this.$store.state.projectId,
        investorId: this.$store.state.investorId
      },
      tableData: [],
      workFlowDataList: [],
      taskTypes: {
        SUBMIT: "送审",
        AUDITOR: "审核",
        TURNTODO: "转办",
        GOBACK: "退回"
      },
      projectCondition: {
        manager: "",
        progress: []
      },
      companyName: "",
      reportStatus: ""
    };
  },
  created() {
    var _this = this;
    _this.getSubmitFileData({
      projectId: _this.$store.state.projectId,
      investorId: _this.$store.state.investorId
    });
    _this.$store.state.getSubmitFileData = function() {
      _this.getSubmitFileData({
        projectId: _this.$store.state.projectId,
        investorId: _this.$store.state.investorId
      });
    };
  },

  mounted() {
    let _this = this;
    Public.$on("fileUrl", function(data) {
      _this.upLoadParams.fileUrl = data;
    });
    // _this.getFindProjcectWorkflow()
  },

  computed: {
    isRead() {
      return !this.$store.state.readonly;
    }
  },

  methods: {
    //获取线下提交文档流程数据
    // getFindProjcectWorkflow(){
    //   let _this = this;
    //   const investorId = _this.$store.state.investorId;
    //   _this.$http.post("/api/documentsRemark/findProjcectWorkflow",{investorId}).then((response)=>{
    //    if(response.data.length){
    //      const progress = [];
    //      response.data.forEach((item,index)=>{
    //        if(!progress[index]) {progress.push({})};
    //        progress[index].userName = item.userName;
    //        progress[index].createTime = item.createTime;
    //        progress[index].taskType = _this.taskTypes[item.taskType];
    //        progress[index].remarkState = _this.commonData.processStateId[item.remarkState]
    //      });
    //      _this.projectCondition.progress = progress;
    //    }
    //   }).catch(function(error){
    //     _this.$messageError(error);
    //   })
    // },
    // 格式化数据
    fileterData(id, val) {
      return window.commonData[id][val];
    },
    // 获取基础数据
    getSubmitFileData(params, cb) {
      let _this = this;
      _this.$http
        .post("/api/documentsRemark/findDocumentsRemarkList", params)
        .then(function(res) {
          _this.documentsRemark = res.data.documentsRemark;
          _this.showTextArea = res.data.documentsRemark.comments ? false : true;
          _this.tableData = res.data.resultList;
          _this.workFlowDataList = res.data.findTaskNodeInfo;
          _this.companyName = res.data.investor.name;
          _this.reportStatus = res.data.statusContent;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 保存备注
    saveMsg() {
      let _this = this;
      if (_this.documentsRemark.comments != "") {
        _this.$http
          .post("/api/documentsRemark/insertDocumentsRemark", {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            comments: _this.documentsRemark.comments
          })
          .then(function(res) {
            _this.showTextArea = false;
            _this.$messageSuccess("保存成功！");
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        _this.$messageError("备注理由不能为空，请输入后提交");
      }
    },
    // 鼠标滑过切换最右侧图标样式
    changeClassName(flag, index) {
      if (flag) {
        this.$refs.check[index].className = "el-icon-circle-close-outline";
      } else {
        this.$refs.check[index].className = "el-icon-circle-check";
      }
    },
    // 删除附件
    deleteItem(item, index) {
      let _this = this;
      if (_this.isRead) {
        _this.$messageError("不能执行此操作！");
        return;
      }
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
    },

    //增加遮罩
    loadFile(){
      this.maskLoading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
    },

    // 上传文件成功保存入库
    uploadFileSuccess(res) {
      this.maskLoading.close();
      let _this = this;
      _this.$http
        .post("/api/documentsRemark/saveOrUpdateProjectdocs", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          fileName: res.data.fileName,
          filePath: res.data.fileDir,
          filetype: "OFFLINEMANUSCRIPT",
          docType: 0
        })
        .then(function(res) {
          _this.tableData = res.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    downloadAll() {
      window.location.href =
        "/api/documentsRemark/downLoadAllFiles?token=" +
        this.$getCookie("token") +
        "&projectId=" +
        this.$store.state.projectId +
        "&investorId=" +
        this.$store.state.investorId;
    },
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
.submitFile-wrapper {
  background-color: #ffffff;
  .submitFile-header {
    border-radius: 2px;
    .header-wrapper {
      overflow: hidden;
      height: 35px;
      background-color: #fafafa;
      position: relative;
      display: flex;
      align-items: center;
      border-radius: 2px;
      border: 1px solid #ececec;
      span {
        float: left;
        // display: inline-block;
      }
      span:first-child {
        height: 20px;
        line-height: 20px;
        color: #262628;
        font-size: 14px;
        font-weight: 900;
        margin: 0 10px 0 22px;
        max-width: 50%;
      }
      span:nth-child(2) {
        width: 70px;
        height: 19px;
        text-align: center;
        line-height: 19px;
        background: #98c268;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 400;
        color: #ffffff;
      }
      span:nth-child(3) {
        cursor: pointer;
        float: right;
        margin-right: 10px;
        position: absolute;
        right: 0;
        color: #3a80ec;
        font-size: 12px;
        width: 68px;
        height: 20px;
        border: 1px solid #3a80ec;
        border-radius: 2px;
        text-align: center;
        line-height: 20px;
      }
      span.header-wrapper-btn{
        height: auto;
        margin-right: 20px !important;
      }
    }
  }
  .submitFile-content {
    font-size: 13px;
    .upper-wrapper {
      padding: 16px 20px 15px 19px;
      border-left: 1px solid #ececec;
      border-right: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
      .reason-note {
        overflow: hidden;
        padding-left: 65px;
        position: relative;
        color: #505050;
        span:first-child {
          color: #636363;
        }
        .reason-title {
          position: absolute;
          left: 0;
          top: 0;
          line-height: 30px;
        }
        .reason-content {
          width: 100%;
          box-sizing: border-box;
          min-height: 50px;
          line-height: 20px;
          padding-top: 5px;
          padding-right: 55px;
          position: relative;
          /deep/ .el-textarea__inner {
            font-size: 13px;
            font-family: "微软雅黑";
            padding: 2px 5px;
          }
          a {
            position: absolute;
            right: 0;
            top: 5px;
            width: 45px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border-radius: 2px;
            font-size: 12px;
            &.saveBtn {
              background-color: #f09237;
              color: #fff;
            }
          }
          a.blue:hover{
            text-decoration: underline;
          }
          .el-icon-edit-outline{
            font-size: 14px;
          }
        }
      }
      .reason-edit {
        display: flex;
        float: left;
        margin: 0 32px 8px 0;
        .el-textarea__inner {
          width: 500px;
        }
        span:nth-child(2) {
          cursor: pointer;
          display: inline-block;
          width: 40px;
          height: 40px;
          text-align: center;
          color: #3a80ec;
          margin-left: 8px;
        }
        .el-icon-edit-outline {
          color: #d1d1d1;
        }
        .saveBtn {
          cursor: pointer;
          background-color: #f09237;
          display: inline-block;
          color: #fff;
          border-radius: 2px;
          font-weight: 400;
          width: 45px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 12px;
          margin: 0 0 0 5px;
        }
      }
      .attachment {
        margin-top: 12px;
        span:first-child {
          color: #636363;
        }
        .attachment-sheet {
          margin-top: 8px;
          padding: 2px 10px;
          border: 1px dashed #ececec;
          .attachment-item {
            height: 30px;
            display: flex;
            color: #636363;
            &:hover {
              color: #3a80ec;
              background-color: #f6faff;
              > span:nth-child(5) {
                .icon-download {
                  cursor: pointer;
                  color: #3a80ec;
                }
              }
            }
            > span {
              display: inline-block;
              line-height: 30px;
              &:first-child {
                margin: 0 8px 0 12px;
              }
              &:nth-child(2) {
                width: 380px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              &:nth-child(3) {
                width: 180px;
                text-align: center;
              }
              &:nth-child(4) {
                width: 200px;
                text-align: center;
              }
              &:nth-child(5) {
                margin: -2px 12px 0 50px;
                .icon-download {
                  font-size: 20px;
                }
              }
              &:nth-child(6) {
                .el-icon-circle-check {
                  color: #20c34b;
                  font-size: 15px;
                }
                .el-icon-circle-close-outline {
                  cursor: pointer;
                  color: #d1d1d1;
                  font-size: 15px;
                }
              }
            }
          }
        }
        /deep/ .upload-demo {
          overflow: hidden;
          margin-top: 8px;
          .el-button--primary {
            background-color: white !important;
            border: 1px solid #3a80ec;
            color: #3a80ec;
            width: 85px;
            height: 25px;
            position: relative;
            span {
              position: absolute;
              left: 10px;
              top: 6px;
            }
          }
          .el-button--small {
            font-size: 13px;
          }
        }
        /deep/ .el-upload-list {
          display: none;
        }
      }
    }
    .step-condition {
      padding: 23px;
      margin-top: 12px;
      border: 1px solid #ececec;
      .projectCondition {
        /deep/ .el-step__title {
          font-size: 12px;
          color: #575757;
        }
        /deep/ .el-step__head {
          position: relative;
          &::before {
            content: "";
            display: inline-block;
            width: 2px;
            height: 10px;
            background-color: #e1e1e1;
            position: absolute;
            top: -15px;
            left: 9px;
          }
          &::after {
            content: "";
            display: inline-block;
            width: 2px;
            height: 20px;
            background-color: #e1e1e1;
            position: absolute;
            top: 28px;
            left: 9px;
          }
        }
        /deep/ .el-step__icon {
          width: 20px;
          height: 20px;
          background-color: #50adee;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
          .el-icon-time {
            font-size: 12px;
            color: white;
          }
        }
        /deep/ .el-step__line {
          left: 9px;
          height: 20px;
        }
        .condition-info {
          position: relative;
          margin: 35px 0 25px 0;
          display: flex;
          background-color: #f9f9f9;
          padding: 10px 24px;
          align-items: flex-start;
          .person-icon {
            width: 52px;
            height: 52px;
            border-radius: 26px;
            background-color: #ffffff;
            text-align: center;
            line-height: 52px;
            .icon-renyuan {
              color: #e7e7e7;
              font-size: 22px;
            }
          }
          .involved-person {
            margin-left: 12px;
            font-size: 12px;
            min-height: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            > span:first-child {
              font-weight: 700;
            }
            > span:nth-child(2) {
              color: #6a6a6a;
            }
            .person-operate {
              color: #6a6a6a;
              > span:first-child {
                color: #1d1c1e;
                font-weight: 800;
              }
              > span:nth-child(2) {
                color: #ed8939;
              }
              > p {
                margin-top: 8px;
                span {
                  color: #20c34b;
                  font-weight: 700;
                }
              }
            }
          }
          .project-company {
            position: absolute;
            right: 24px;
            margin-top: 5px;
            font-size: 13px;
            color: #262628;
            &::before {
              content: "";
              display: inline-block;
              width: 4px;
              height: 4px;
              background-color: #f09237;
              border-radius: 2px;
              position: absolute;
              top: 6px;
              left: -15px;
            }
          }
        }
      }
    }
  }
}
</style>
