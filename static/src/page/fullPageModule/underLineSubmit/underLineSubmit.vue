<template>
  <div class="submitFile-wrapper">
    <div class="submitFile-header">
      <span class="textOverflow1 fl" :title="companyName">{{companyName}}</span>
      <!-- <span class="fl">{{reportStatus}}</span> -->
      <div class="btn-box fr">
        <!-- 作业中按钮的显示状态 -->
        <div
          class="fl marginRight5"
          v-if="/projectImplementation|externalOffLineTask/.test(this.$route.path)"
        >
          <a
            class="search-btn fl"
            v-if="!/examineModification/g.test($route.path)"
            @click="openDialog('文件管理','全部下载', isCensorship!= 1 ? '全部删除' : '','submitFileList','fileListFlag')"
          >文件管理</a>
          <a
            class="search-btn fl"
            v-else
            @click="openDialog('文件管理','全部下载', (isCensorship!= 1 || (isCensorship==1 && $store.state.processStateId == 1360)) ? '全部删除': '','submitFileList','fileListFlag')"
          >文件管理</a>
          <!--增加了外审修改的按钮-->
          <div v-if="/externalOffLineTask/.test($route.path)&& isProjectLeader" class="fl">
            <a
              class="search-btn revoke-btn fl modify"
              v-if="isCensorship == 1 && newAuditing.buttonShow && $store.state.processStateId !== 1360"
              @click="revoke"
            >撤回外审修改</a>
            <a
              class="search-btn fl modify"
              v-if="(isCensorship == 1 && $store.state.processStateId == 1360) || (newAuditing.buttonShow && isCensorship != 1 )"
              @click="openDialog('外审修改提交','提交','','submitFileList','sendTrial')"
            >提交外审修改</a>
          </div>
          <div
            v-if="newAuditing.buttonShow && !/externalOffLineTask/.test($route.path) && isProjectLeader"
            class="fl"
          >
            <a class="search-btn revoke-btn fl" v-if="isCensorship == 1" @click="revoke">撤回送审</a>
            <a
              class="search-btn fl"
              v-else
              @click="openDialog('线上送审','提交','','submitFileList','sendTrial')"
            >提交送审</a>
          </div>
        </div>
        <!-- 审核中按钮的显示状态 -->
        <div
          class="fl marginRight5"
          v-if="/projectAuditing|externalOffLineAudit/.test(this.$route.path) && newAuditing.buttonShow"
        >
          <a
            class="search-btn revoke-btn fl"
            :class="{modify:/externalOffLineAudit/g.test($route.path)}"
            @click="revoke"
          >{{/externalOffLineAudit/.test($route.path) ? "撤回外审修改" : "撤回送审"}}</a>
        </div>
        <a class="reset-btn fl" @click="goBack">
          <i class="iconfont icon-back"></i>返回
        </a>
      </div>
    </div>
    <div class="submitFile-content">
      <el-scrollbar>
        <div class="new-dynamic">
          <div class="send-trial" v-if="newAuditing.isShow">
            <!--最新信息展示-->
            <i class="trial-tip">最新</i>
            <div class="trial-top">
              <b :class="filterColor(newAuditing.color)">{{newAuditing.newStatus}}</b>
              <span class="marginLeft10">{{newAuditing.createTime || '--'}}</span>
            </div>
            <div class="trial-bottom">
              <div class="trial-bottom-picture fl">
                <i class="iconfont icon-touxiangweishangchuan"></i>
                <p
                  class="trial-bottom-username marginTop10"
                  :title="filterTaskDefKey(newAuditing.taskDefKey)"
                >{{newAuditing.userName}} / {{filterTaskDefKey(newAuditing.taskDefKey)}}</p>
                <p
                  class="trial-bottom-department"
                  :title="newAuditing.groupName"
                >{{newAuditing.groupName}}</p>
              </div>
              <div class="fl trial-bottom-right">
                <div class="trial-bottom-remarks">
                  <p>
                    备注说明：
                    <span>{{newAuditing.remarkContent || '--'}}</span>
                  </p>
                </div>
                <div class="trial-bottom-file">
                  <p class="fl">附件信息：</p>
                  <ul
                    class="attachment-sheet fl"
                    v-if="newAuditing.procFileArray && newAuditing.procFileArray.length > 0"
                  >
                    <li
                      class="attachment-item fl"
                      v-for="(fileItem,index) in newAuditing.procFileArray"
                      :key="index"
                    >
                      <span>
                        <i class="el-icon-document marginTop5"></i>
                      </span>
                      <span
                        :title="fileItem.fileName"
                        @click="downloadFile(fileItem)"
                      >{{fileItem.fileName}}</span>
                    </li>
                  </ul>
                  <div
                    class="reset-btn fr"
                    v-if="newAuditing.procFileArray && newAuditing.procFileArray.length > 0"
                    @click="downloadAll('0',newAuditing.taskId)"
                  >全部下载</div>
                  <div class="notHaveData" v-else>
                    <i class="el-icon-document"></i>未上传文件
                  </div>
                </div>
              </div>
            </div>

            
            <!-- 审核提交框 -->
            <div
              class="trial-examine"
              v-if="/projectReportAudit/.test(this.$route.path) && newAuditing.taskType == 'SUBMIT' || /externalOffLineAudit/.test($route.path) && newAuditing.taskType == 'SUBMIT'"
            >
              <div class="trial-strip"></div>
              <el-form
                ref="trialSHsubmit"
                :model="trialSHsubmit"
                label-width="90px"
                class="trial-shsubmit"
              >
                <!-- 内审 -->
                <el-form-item label="审核结果：" v-if="/projectReportAudit/.test(this.$route.path)">
                  <el-radio v-model="submitflag" label="0">通过</el-radio>
                  <el-radio v-model="submitflag" label="1">不通过</el-radio>
                </el-form-item>
                <!-- 外审 -->
                <el-form-item label="审核结果：" v-if="/externalOffLineAudit/.test($route.path)">
                  <el-radio
                    v-model="submitflag"
                    v-for="(val, index) in auditBtns"
                    :key="index"
                    :label="val"
                  >{{auditallBtns[val]}}</el-radio>
                </el-form-item>
                <el-form-item label="审核意见：">
                  <el-input
                    v-model="submitContent"
                    type="textarea"
                    placeholder="请输入审核意见"
                    maxlength="500"
                  ></el-input>
                </el-form-item>
                <el-form-item class="trialBtns fjBtns">
                  <el-upload
                    ref="upload"
                    action="api/file/upload"
                    :before-upload="beforeUploadFn"
                    :on-success="underlineaddfileSubmit"
                    :show-file-list="false"
                  >
                    <div class="reset-btn">+ 添加附件</div>
                  </el-upload>
                  <ul class="el-upload-list el-upload-list--text filehx">
                    <li
                      tabindex="0"
                      class="el-upload-list__item is-success"
                      v-for="(fileItem,fileIndex) in auditFiles"
                    >
                      <a class="el-upload-list__item-name" @click="downloadFile(fileItem)">
                        <i class="el-icon-document"></i>
                        {{fileItem.fileName}}
                      </a>
                      <label class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-circle-check"></i>
                      </label>
                      <i class="el-icon-close" @click="fileDelete(fileItem.id,fileIndex)"></i>
                    </li>
                  </ul>
                </el-form-item>
                <el-form-item class="trialBtns">
                  <div class="search-btn fr" @click="confirmSubmissionBtn">确认提交</div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="padding15" v-else>
            <!--线上提交-->
            <!--增加外审修改的提示-->
            <div
              class="noData"
              v-if="/examineModification|externalOffLineAudit/.test($route.path)"
            >{{workFlowDataList.length ? '暂无审核申请，您再等等吧~' : '该机构暂未提交外审修改~'}}</div>
            <div
              class="noData"
              v-else
            >{{workFlowDataList.length ? '亲，暂无审核申请，您再等等吧~' : '亲，该机构暂未送审，抓紧时间完成作业吧~'}}</div>
            <div
              class="marginTop30 text-center"
              v-if="!workFlowDataList.length && !/projectAuditing/g.test($route.path)"
            >
              <a
                class="reset-btn"
                @click="openDialog('文件管理','全部下载','全部删除','submitFileList','fileListFlag')"
              >上传文件</a>
              <a
                class="search-btn"
                v-if="isProjectLeader && /examineModification/.test($route.path)"
                @click="openDialog('外审修改提交','提交','','submitFileList','sendTrial')"
              >立即提交</a>
              <a
                class="search-btn"
                v-else-if="isProjectLeader"
                @click="openDialog('线上送审','提交','','submitFileList','sendTrial')"
              >立即送审</a>
            </div>
          </div>
        </div>
        <el-collapse
          class="expandCollapse"
          v-model="activeExpandCollapse"
          @change="expandCollapseChange"
        >
          <el-collapse-item name="1">
            <template slot="title" v-if="isnotExpandCollapse">
              <span class="shouqitxt">收起项目动态</span>
              <i class="iconfont shouqi icon-shouqi1"></i>
            </template>
            <template slot="title" v-if="isExpandCollapse">
              <span class="shouqitxt">展开项目动态</span>
              <i class="iconfont shouqi icon-zhankai2"></i>
            </template>
            <div class="step-condition">
              <div class="content-title">
                <i class="iconfont icon-xiangmudongtai- green"></i>项目动态
              </div>
              <div class="padding15">
                <el-steps direction="vertical" :active="0">
                  <div
                    v-if="workFlowDataList.length"
                    class="projectCondition marginTop15"
                    v-for="(item, index) in workFlowDataList"
                    :key="index"
                  >
                    <div class="stateClassification">
                      <i></i>
                      <div>{{item.name}}</div>
                      <i></i>
                    </div>
                    <div class="stateListBox">
                      <div v-for="(taskitem,taskindex) in item.usertask" :key="taskindex">
                        <el-step icon="el-icon-time">
                          <template slot="title">
                            <span
                              :class="filterColor(taskitem.color)"
                            >{{fileterData('processStateId',taskitem.processStateId+'') || taskTypes[taskitem.taskType]}}</span>
                            <i>{{taskitem.createTime}}</i>
                          </template>
                        </el-step>
                        <div class="condition-info">
                          <div class="person-icon">
                            <i class="iconfont icon-touxiangweishangchuan"></i>
                          </div>
                          <div class="person-operate">
                            <p>
                              <b>{{taskitem.userName}}</b>
                              / {{filterTaskDefKey(taskitem.taskDefKey)}} 于 {{taskitem.createTime}} 进行了
                              <b
                                :class="filterColor(taskitem.color)"
                              >{{fileterData("processStateId",taskitem.processStateId+'') || taskTypes[taskitem.taskType]}}</b> 操作。
                              <b
                                class="fr"
                                :title="projectInfo.projectName"
                              >{{projectInfo.projectName}}</b>
                              <b>备注说明：{{taskitem.remarkContent || '--'}}</b>
                            </p>
                            <div class="uploadFileBox">
                              <div class="uploadFile" v-if="taskitem.procFileArray.length > 0">
                                <div
                                  v-for="(fileItem,index) in taskitem.procFileArray"
                                  :key="index"
                                  class="fl fileItem"
                                >
                                  <span>
                                    <i class="el-icon-document"></i>
                                  </span>
                                  <span
                                    class="fileTitle blue"
                                    :title="fileItem.fileName"
                                    @click="downloadFile(fileItem)"
                                  >{{fileItem.fileName}}</span>
                                </div>
                              </div>
                              <div
                                class="reset-btn fr"
                                v-if="taskitem.procFileArray.length > 0"
                                @click="downloadAll('1',taskitem.taskId)"
                              >全部下载</div>
                              <div
                                class="nofile"
                                v-if="taskitem.procFileArray.length==0 && taskitem.processStateId!='1354'"
                              >
                                <i class="el-icon-document"></i>未上传文件
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-steps>
                <div v-if="workFlowDataList.length===0" class="noData">暂无项目动态信息</div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="history_file" v-if="historyDocument.length > 0">
          <div class="content-title">
            <i class="orange iconfont icon-xiangmudigao"></i>历史文件
          </div>
          <div class="history_file_list">
            <el-table :data="historyDocument" max-height="160" stripe border>
              <el-table-column label="文件名称">
                <template slot-scope="scope">
                  <i class="el-icon-document fs14"></i>
                  {{scope.row.fileName}}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="userName" label="上传人" width="80"></el-table-column>
              <el-table-column align="center" prop="createTime" label="上传时间" width="170"></el-table-column>
              <el-table-column align="center" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="downloadFile(scope.row)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <center-dialog
      ref="redirectInner"
      dialogTitle="页面跳转提示"
      dialogWidth="320px"
      dialogHeight="150px"
    >
      <template slot="dialogContent">
        <div class="dialog-wrapper">
          <p>外审修改已通过，数据已更新到线上提交中。</p>
          <button class="search-btn redirect" @click="redirectTo">立即前往</button>
        </div>
      </template>
    </center-dialog>
  </div>
</template>

<script>
import CenterDialog from "../../../components/centerDialog.vue";
export default {
  data() {
    return {
      selectNews: "",
      commonData: window.commonData,
      upLoadParams: {
        fileUrl: "", //this.$store.state.fileUrl
        projectId: this.$store.state.projectId,
        investorId: this.$store.state.investorId
      },
      workFlowDataList: [],
      taskTypes: {
        SUBMIT: "报告送审",
        AUDITOR: "审核",
        TURNTODO: "转办",
        GOBACK: "退回"
      },
      companyName: "",
      reportStatus: "",
      newAuditing: {
        procFileArray: []
      },
      projectInfo: JSON.parse(this.$getCookie("projectInfo")),
      isCensorship: 0, //项目是否送审
      investorStage: 0, //与isCensorship一起判断撤回按钮是否可以点击
      isProjectLeader: true, //当前登录人是否是当前项目的项目负责人
      taskId: "",
      procInstId: "",
      historyDocument: [], //历史文件
      trialSHsubmit: {
        //待审核提交
        submitflag: "",
        submitContent: ""
      },
      submitflag: "", //审核结果,
      submitContent: "", // 审核意见
      auditBtns: {}, //审核意见按钮
      auditFiles: [], //审核附件
      auditallBtns: {
        "1355": "通过",
        "1356": "不通过",
        "1357": "通过",
        "1358": "不通过",
        "1360": "通过",
        "1361": "不通过",
        "1362": "退回到初审",
        "1363": "退回到复审"
      },
      activeExpandCollapse: ["1"], //展开收起
      isExpandCollapse: false,
      isnotExpandCollapse: true
    };
  },
  created() {
    var _this = this;
    _this.getSubmitFileData();
    _this.$store.state.getSubmitFileData = function() {
      _this.getSubmitFileData();
    };
  },

  mounted() {},

  components: {
    CenterDialog
  },

  methods: {
    // 返回
    goBack() {
      let _this = this;
      //外审修改审核页面倒退
      if (/examineModification|externalOffLineAudit/.test(_this.$route.path)) {
        this.$router.push({
          path: /externalOffLineAudit/.test(this.$route.path)
            ? "/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOffLineAudit/underLineHome"
            : "/zlpg/project/projectCont/examineModification/externalOffLineTask/underLineHome"
        });
      } else {
        this.$router.push({
          path: /projectImplementation/.test(this.$route.path)
            ? "/zlpg/project/projectCont/projectImplementation/projectUnderLineTask/underLineHome"
            : "/zlpg/project/projectCont/projectAuditing/projectReportAudit/underLineHome"
        });
      }
    },
    // 格式化数据
    fileterData(id, val) {
      return window.commonData[id][val];
    },
    // 过滤项目人员角色
    filterTaskDefKey(val) {
      switch (val) {
        case "usertask1":
          return "项目负责人";
          break;
        case "usertask2":
          return "部门经理";
          break;
        case "usertask3":
          return "技术中心复审人员";
          break;
        default:
          return "技术中心签发人员";
          break;
      }
    },
    // 操作类型颜色
    filterColor(val) {
      switch (val) {
        case 1:
          return "green";
          break;
        case 2:
          return "red";
          break;
        case 3:
          return "gray";
          break;
        default:
          return "orange";
          break;
      }
    },
    // 项目动态筛选
    changeStatus() {
      this.getSubmitFileData();
    },
    // 打开弹窗
    openDialog(title, oneBtn, twoBtn, commponentName, objName, dataObj, flag) {
      this.$store.commit("changeShowCommon"); //固定
      this.$store.state.commonTitle = title; //
      if (dataObj && dataObj.withDrawStatus == "1") {
        this.$store.state.commonBtn = "撤回";
      } else {
        this.$store.state.commonBtn = oneBtn;
      }
      if (this.isProjectLeader) {
        //全部删除
        this.$store.state.extraBtn = twoBtn; //第二个按钮名称 （没有不传）
        this.$store.state.dataObj["isProjectLeader"] = true;
      }
      this.$store.state.componentsType = commponentName; //要调用组件的名称
      if (commponentName != "trialDetail") {
        this.$store.state.dataObj[objName] = true;
        this.$store.state.dataObj["taskId"] = this.taskId;
        if (/externalOffLineAudit/g.test(this.$route.path)) {
          this.$store.state.dataObj["isIssure"] = this.newAuditing.isIssure;
        }
      } else {
        //送审详情
        this.$store.state.dataObj = dataObj;
        // 点击项目状态为撤回的项目详情
        if (!this.$store.state.dataObj.procInstId) {
          this.$store.state.dataObj["procInstId"] = this.procInstId;
        }
        if (flag) {
          //如果是最新动态点击进入的
          this.$store.state.dataObj["isNewAuditing"] = true;
        }
        if (dataObj.processStateId == "1354") {
          this.$store.state.dataObj["showSubmit"] = false;
        } else {
          this.$store.state.dataObj["showSubmit"] = true;
        }
        this.$store.state.dataObj[objName] = true;
        this.$store.state.dataObj["isShowBottom"] =
          dataObj.taskType == "SUBMIT" ? true : false;
      }
    },
    // 撤回送审
    revoke() {
      let url = /externalOffLineTask|externalOffLineAudit/.test(
        this.$route.path
      )
        ? "/api/changeInvestors/retractSubmit"
        : "/api/investors/retractSubmit";
      let thistabFlag;
      if (/projectAuditing/.test(this.$route.path)) {
        //审核
        thistabFlag = "AUDITING";
      } else if (/projectImplementation/.test(this.$route.path) || /externalOffLineTask/.test(this.$route.path)) {
        //作业
        thistabFlag = "TASK";
      }
      this.$http
        .post(url, {
          investorId: this.$store.state.investorId,
          tabFlag: thistabFlag
        })
        .then(res => {
          this.$messageSuccess(res.msg);
          this.getSubmitFileData();
        })
        .catch(err => {
          this.$messageError(err);
        });
    },
    // 获取基础数据
    getSubmitFileData() {
      let _this = this;
      // 增加外审修改接口
      let url = /examineModification|externalOffLineAudit/.test(
        _this.$route.path
      )
        ? "/api/documentsRemark/findChangeDocumentsRemarkList"
        : "/api/documentsRemark/findDocumentsRemarkList";
      _this.$http
        .post(url, {
          projectId: _this.$store.state.projectId,
          investorId: _this.$route.params.investorId,
          auditingType: this.selectNews,
          buttonType: /projectImplementation|externalOffLineTask/.test(
            this.$route.path
          )
            ? "TASK"
            : "AUDITING"
        })
        .then(function(res) {
          _this.workFlowDataList = res.data.findTaskNodeInfo;
          _this.companyName = res.data.investor.name;
          _this.procInstId = res.data.investor.procInstId;
          _this.reportStatus = res.data.statusContent;
          _this.newAuditing = res.data.newAuditing;
          _this.isCensorship = res.data.investor.isCensorship;
          _this.investorStage = res.data.investor.investorStage;
          _this.isProjectLeader = res.data.isProjectLeader;
          _this.taskId = res.data.taskId;
          _this.historyDocument = res.data.historyDocument || [];
          _this.$store.state.investorId = res.data.investor.id;
          _this.$store.state.isCensorship = res.data.investor.isCensorship;
          _this.$store.state.processStateId = res.data.investor.processStateId;
          if (
            /externalOffLineAudit/g.test(_this.$route.path) &&
            _this.$store.state.processStateId == 1360
          ) {
            _this.$refs.redirectInner.showDialog();
          }
          _this.auditOptionFunc();
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 全部下载
    downloadAll(val, ids) {
      var thisTaskId;
      if (val == "0") {
        //上面最新动态的全部下载
        thisTaskId = this.newAuditing.taskId;
      } else if (val == "1") {
        //下面全部动态的全部下载
        thisTaskId = ids;
      } else {
        this.$messageError("无可下载的文件");
      }
      window.location.href =
        "/api/documentsRemark/downLoadAllFiles?token=" +
        this.$getCookie("token") +
        "&projectId=" +
        this.$store.state.projectId +
        "&investorId=" +
        this.$store.state.investorId +
        "&taskId=" +
        thisTaskId;
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
    },

    redirectTo() {
      let _this = this;
      _this.$router.push({
        path:
          "/zlpg/project/projectCont/projectAuditing/projectReportAudit/underLineHome/underLineSubmit/" +
          _this.$route.params.investorId
      });
    },
    //提交审核审核意见
    auditOptionFunc() {
      var _this = this;
      _this.$http
        .post("/api/changeInvestors/isChangeExistTask", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          tabFlag: "yes",
          taskId: _this.taskId
        })
        .then(function(res) {
          _this.auditBtns = res.data.changeExistTask;
          _this.auditFiles = res.data.projectdocList;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 提交审核上传附件回调
    underlineaddfileSubmit(resData) {
      var _this = this;
      _this.tryHideFullScreenLoading();
      _this.$http
        .post("/api/documentsRemark/saveOrUpdateProjectdocs", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          fileName: resData.data.fileName,
          filePath: resData.data.fileDir,
          filetype: "OFFLINEMANUSCRIPT",
          docType: 0,
          taskId: _this.taskId
        })
        .then(function(res) {
          _this.auditFiles = res.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 提交审核
    confirmSubmissionBtn() {
      var _this = this;
      var url = /externalOffLineAudit/.test(this.$route.path)
        ? "api/changeInvestors/downAuditingReport"
        : "/api/investors/underLineReportAuditing";
      var data = /externalOffLineAudit/.test(this.$route.path)
        ? {
            auditingJson: JSON.stringify([
              {
                taskId: _this.taskId,
                investorId: _this.$store.state.investorId
              }
            ]),
            projectId: _this.$store.state.projectId,
            content: _this.submitContent,
            auditStatus: _this.submitflag
          }
        : {
            auditingJson: JSON.stringify([
              {
                taskId: _this.taskId,
                investorId: _this.$store.state.investorId
              }
            ]),
            content: _this.submitContent,
            projectId: _this.$store.state.projectId,
            flag: _this.submitflag,
            onlineOffline: 0
          };
      if (_this.submitflag == "") {
        _this.$messageError("请选择审核结果");
      } else {
        this.$http
          .post(url, data)
          .then(function() {
            _this.getSubmitFileData();
            _this.submitflag = "";
            _this.submitContent = "";
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      }
    },
    // 展开收起项目动态
    expandCollapseChange(val) {
      if (val.length == 0) {
        this.isnotExpandCollapse = false;
        this.isExpandCollapse = true;
      } else {
        this.isnotExpandCollapse = true;
        this.isExpandCollapse = false;
      }
    },
    // 删除审核回显上传的文件
    fileDelete(val, item) {
      var _this = this;
      this.$http
        .post("/api/documentsRemark/deleteFileDoc", {
          fileDocId: val
        })
        .then(function() {
          _this.auditFiles.splice(item, 1);
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    beforeUploadFn() {
      this.showFullScreenLoading();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.submitFile-wrapper {
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-right: 1px;
  .submitFile-header {
    overflow: hidden;
    height: 35px;
    position: relative;
    background-color: #fafafa;
    border-radius: 2px;
    display: flex;
    align-items: center;
    border: 1px solid #ececec;
    padding: 0 10px;
    span:first-child {
      height: 20px;
      line-height: 20px;
      color: #262628;
      font-size: 14px;
      font-weight: 900;
      margin-right: 10px;
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
    .btn-box {
      position: absolute;
      right: 10px;
      top: 6px;
      .reset-btn {
        i {
          color: #3a80ec;
          font-size: 12px;
          margin-right: 5px;
        }
      }
      .revoke-btn {
        background-color: #f09237 !important;
        border-color: #f09237;
      }
      .modify {
        width: 90px !important;
      }
    }
  }
  .submitFile-content {
    .person-icon {
      width: 52px;
      height: 52px;
      border-radius: 26px;
      background-color: #ffffff;
      text-align: center;
      line-height: 52px;
      i {
        font-size: 52px;
        color: #d0e5ff;
      }
    }
    .person-operate,
    .trial-left-right {
      .red {
        color: #ec2f38 !important;
      }
      .orange {
        color: #ed8939 !important;
      }
      .gray {
        color: #c0c2be !important;
      }
      margin-left: 12px;
      font-size: 12px;
      color: #6a6a6a;
      width: 100%;
      .uploadFileBox {
        display: flex;
        .reset-btn {
          width: 80px;
        }
        .uploadFile {
          margin-top: 4px;
          position: relative;
          line-height: 18px;
          display: inline-block;
          flex: 1;
          margin-right: 30px;
          span i {
            font-size: 16px;
            color: #b0b0b0;
            margin-top: 5px;
          }
          > div {
            height: 18px;
            line-height: 18px;
            position: relative;
            padding-left: 5px;
            &:hover {
              background-color: #e9f1fa;
            }
          }
          .fileItem {
            font-weight: bold;
            height: 25px;
            line-height: 25px;
            position: relative;
            padding-right: 40px;
            width: 40%;
            padding-bottom: 4px;
            .fileTitle {
              width: 250px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              display: inline-block;
              line-height: 13px;
            }
            a.downLoadBtn {
              position: absolute;
              right: 5px;
              top: 0;
              font-weight: normal;
              &:hover {
                text-decoration: underline;
              }
            }
            &:nth-child(odd) {
              border-right: 1px solid #e2e2e2;
            }
            &:nth-child(even) {
              margin-left: 2%;
            }
            .blue {
              color: #3a80ec !important;
            }
          }
        }
        .nofile {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #b0b0b0;
          i {
            font-size: 16px;
            color: #b0b0b0;
            margin-right: 5px;
          }
        }
      }
      > p {
        margin-top: 8px;
        b {
          font-weight: bold;
          &.fr {
            position: relative;
            max-width: 300px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-indent: 10px;
            margin-top: 6px;
            line-height: 12px;
            &::before {
              position: absolute;
              content: "";
              display: block;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              left: 0;
              top: 4px;
              background-color: #f09237;
            }
          }
        }
        &:first-child {
          color: #1d1c1e;
          margin-top: 0;
          line-height: 24px;
          b:last-child {
            font-weight: normal;
            display: block;
            border-bottom: 1px dashed #e2e2e2;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
        }
        .reset-btn,
        .search-btn {
          height: 20px;
          line-height: 18px;
          font-size: 12px;
          margin-left: 10px;
          width: 80px;
        }
        .modify {
          width: 90px;
        }
      }
    }
    .content-title {
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      background-color: #f6faff;
      border-bottom: 1px solid #ececec;
      font-size: 13px;
      font-weight: bold;
      i {
        margin-right: 5px;
        font-weight: normal;
      }
      .el-radio + .el-radio {
        margin-left: 15px;
      }
    }
    font-size: 13px;
    padding: 10px;
    position: absolute;
    top: 37px;
    left: 0;
    right: 0;
    bottom: 0;
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    .attachment-sheet {
      flex: 1;
      .attachment-item {
        height: 25px;
        display: flex;
        color: #636363;
        font-size: 12px;
        line-height: 25px;
        width: 46%;
        cursor: pointer;
        padding-bottom: 4px;
        &:hover {
          background-color: #e9f1fa;
        }
        > span {
          display: inline-block;
          &:first-child {
            margin-right: 5px;
            i {
              font-size: 16px;
              color: #b0b0b0;
            }
          }
          &:nth-child(2) {
            width: 350px;
            color: rgba(58, 128, 236, 1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .attachment-item:nth-child(odd) {
        border-right: 1px solid #e2e2e2;
        padding-right: 2%;
      }
      .attachment-item:nth-child(even) {
        margin-left: 2%;
      }
    }
    .new-dynamic {
      border: 1px solid #ececec;
      .notHaveData {
        line-height: 24px;
        height: 100px;
        text-align: center;
        color: #b0b0b0;
        i {
          color: #b0b0b0;
          margin-right: 6px;
        }
      }
      .noData {
        line-height: 180px;
        height: 100px;
      }
      .send-trial {
        padding: 10px 0;
        overflow: hidden;
        align-items: center;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 5px 0px rgba(189, 189, 189, 0.5);
        position: relative;
        .trial-tip {
          font-size: 14px;
          line-height: 24px;
          color: #fff;
          width: 6em;
          background: #f09237;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
          transform-origin: right bottom;
          transform: translate(-29.29%, -100%) rotate(-45deg);
          text-indent: 0;
          text-align: center;
        }
        .trial-top {
          text-align: center;
          width: 100%;
          border-bottom: 1px dashed #ececec;
          padding: 24px 0 10px 0;
          b {
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
          }
          span {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(38, 38, 40, 1);
          }
        }
        .trial-bottom {
          padding-top: 10px;
          display: flex;
          width: 100%;
          .trial-bottom-picture {
            border-right: 1px dashed #ececec;
            width: 20%;
            > i {
              font-size: 64px;
              color: #d0e5ff;
              margin-left: 46px;
              margin-top: 20px;
              display: inline-block;
            }
            .trial-bottom-username {
              font-size: 15px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: #262628;
              width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .trial-bottom-department {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(38, 38, 40, 1);
            }
            > p {
              margin-left: 46px;
              line-height: 26px;
            }
          }
          .trial-bottom-right {
            flex: 1;
            padding: 20px;
            .trial-bottom-remarks {
              border-bottom: 1px dashed #ececec;
              width: 100%;
              padding-top: 6px;
              padding-bottom: 26px;
              p {
                font-size: 12px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(106, 106, 106, 1);
                span {
                  font-size: 12px;
                  font-family: PingFangSC-Regular;
                  font-weight: 400;
                  color: rgba(38, 38, 40, 1);
                  line-height: 26px;
                  border-bottom: 1px solid #e1e1e1;
                  padding-bottom: 3px;
                }
              }
            }
            .trial-bottom-file {
              width: 100%;
              padding: 26px 0;
              display: flex;
              > p {
                font-size: 12px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(106, 106, 106, 1);
                line-height: 26px;
                width: 72px;
              }
              .reset-btn {
                width: 80px;
              }
            }
          }
        }
        .trial-examine {
          .trial-strip {
            position: relative;
            width: 100%;
            height: 4px;
            background: repeating-linear-gradient(
              45deg,
              #f0f0f0 10px,
              #f0f0f0 20px,
              #58c 20px,
              #58c 30px,
              #f0f0f0 30px,
              #f0f0f0 40px,
              #e55 40px,
              #e55 50px
            );
          }
          .trial-shsubmit {
            padding: 26px 46px;
            > div {
              display: block;
              clear: both;
              width: 100%;
            }
            .trialBtns {
              width: auto;
              .reset-btn,
              .search-btn {
                padding: 0 4px;
                width: 82px;
              }
            }
            .fjBtns {
              /deep/ .el-form-item__content {
                > div {
                  .el-upload-list__item-name {
                    width: auto !important;
                  }
                  .el-upload,
                  .el-upload-list {
                    float: none;
                  }
                }
              }
              .filehx {
                width: 100%;
                .el-upload-list__item-name {
                  width: auto !important;
                }
              }
            }
            .el-form-item {
              margin-bottom: 6px;
              /deep/ .el-form-item__label {
                text-align: left;
              }
              &:nth-child(2) {
                /deep/ .el-form-item__label {
                  line-height: 22px;
                }
              }
            }
          }
        }
      }
      .send-trial::after {
        width: 20px;
        height: 20px;
        content: "";
        left: -10px;
        top: 80px;
        position: absolute;
        display: block;
        background: #fff;
        border-radius: 20px;
        box-shadow: -1px 1px 3px 1px rgba(189, 189, 189, 0.5) inset;
      }
    }
    .history_file {
      margin-top: 12px;
      border: 1px solid #ececec;
      .history_file_list {
        padding: 10px;
        position: relative;
        /deep/ .el-table__header {
          th {
            background-color: #f9f9f9 !important;
          }
        }
        &:before {
          display: block;
          content: "";
          width: 2px;
          top: 10px;
          bottom: 10px;
          left: 50%;
          margin-left: -1px;
          background-color: #e2e2e2;
          position: absolute;
        }
        > ul {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }
    }
    /*展开收起*/
    .expandCollapse {
      width: 100%;
      margin-top: 10px;
      cursor: pointer;
      .shouqitxt {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(58, 128, 236, 1);
        line-height: 24px;
      }
      .shouqi {
        font-size: 12px;
        margin-left: 10px;
        color: #3a80ec;
      }
      /deep/ .el-collapse-item {
        .el-collapse-item__header {
          text-align: center;
          height: 28px;
          line-height: 28px;
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #3a80ec;
          cursor: pointer;
          .el-collapse-item__arrow {
            display: none;
          }
        }
      }
    }
    .step-condition {
      margin-top: 12px;
      border: 1px solid #ececec;
      .projectCondition {
        display: flex;
        clear: both;
        position: relative;
        border-bottom: 1px dashed #e2e2e2;
        &:last-child {
          border-bottom: none;
        }
        &:last-child .condition-info {
          margin-bottom: 0;
        }
        .stateClassification {
          width: 30px;
          display: flex;
          flex-direction: column;
          margin: 10px 22px 10px 0;
          i {
            flex: 1;
            border-left: 1px solid #7c9fee;
            margin-left: 15px;
            position: relative;
            &:first-child::after {
              content: "";
              display: inline-block;
              width: 6px;
              height: 6px;
              background: rgba(127, 161, 239, 1);
              position: absolute;
              bottom: 0px;
              left: -3px;
              border-radius: 50%;
            }
            &:last-child::after {
              content: "";
              display: inline-block;
              width: 6px;
              height: 6px;
              background: rgba(127, 161, 239, 1);
              position: absolute;
              top: 0px;
              left: -3px;
              border-radius: 50%;
            }
          }
          > div {
            width: 10px;
            height: 100px;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #82a4ef;
            background: #e9f0ff;
            border-radius: 15px;
            border: 1px solid #7c9fee;
            line-height: 25px;
            display: inline-block;
            padding: 40px 10px 0 10px;
            margin: 10px 0;
          }
        }
        .stateListBox {
          flex: 1;
          > div {
            &:first-child {
              margin-top: 0 !important;
              /deep/ .el-step__head {
                &::before {
                  content: "";
                  display: inline-block;
                  width: 2px;
                  height: 0;
                  background-color: #e1e1e1;
                  position: absolute;
                  top: -37px;
                  left: 9px;
                }
              }
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
          /deep/ .el-step__title {
            span {
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
            }
            i {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(38, 38, 40, 1);
              margin-left: 6px;
            }
          }
          /deep/ .el-step__head {
            position: relative;
            &::before {
              content: "";
              display: inline-block;
              width: 2px;
              height: 24px;
              background-color: #e1e1e1;
              position: absolute;
              top: -26px;
              left: 9px;
            }
            &::after {
              content: "";
              display: inline-block;
              width: 2px;
              height: 5px;
              background-color: #e1e1e1;
              position: absolute;
              top: 23px;
              left: 9px;
            }
          }
          .condition-info {
            position: relative;
            margin: 4px 0 30px 0;
            display: flex;
            background-color: #f9f9f9;
            padding: 10px 24px;
            align-items: flex-start;
            .person-icon i {
              font-size: 52px;
              color: #d0e5ff;
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
  /*弹窗样式*/
  .dialog-wrapper {
    p {
      font-size: 13px;
      line-height: 26px;
    }
    .redirect {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
