<template>
  <div class="center-body">
    <!--盖章详情上方信息展示-->
    <div class="requiredInformation" v-if="!/projectProjectSeal/.test(this.$route.path)">
      <div class="sealInformation">
        <span
          class="sealInfo-title textOverflow1"
          :title="this.$store.state.dataObj.projectName"
        >{{this.$store.state.dataObj.projectName}}</span>
        <div class="fr sealInfo-nature">
          <span>{{ commonData.projectNatureId[this.$store.state.dataObj.projectNatureId] }}</span>
          <span>{{ commonData.projectLevelId[this.$store.state.dataObj.projectLevelId] }}级</span>
          <span>{{ commonData.assessmentTarget[this.$store.state.dataObj.assessmentTarget] }}</span>
          <span>{{ this.$store.state.dataObj.isListedCompany == 1 ? "上市" : "非上市" }}</span>
        </div>
      </div>
      <div class="junctions-Info">
        <ul>
          <li>
            <p class="fl">
              <i class="fl">委托方：</i>
              <span
                class="fl"
                :title="this.$store.state.dataObj.otherCompanys"
              >{{this.$store.state.dataObj.otherCompanys}}</span>
            </p>
            <p class="fl">
              <i class="fl">项目负责人：</i>
              <span
                class="fl"
                :title="this.$store.state.dataObj.projectLeader"
              >{{this.$store.state.dataObj.projectLeader}}</span>
            </p>
          </li>
          <li>
            <p class="fl">
              <i class="fl">第一签字评估师：</i>
              <span
                class="fl"
                :title="this.$store.state.dataObj.firstAppraiser"
              >{{this.$store.state.dataObj.firstAppraiser}}</span>
            </p>
            <p class="fl">
              <i class="fl">第二签字评估师：</i>
              <span
                class="fl"
                :title="this.$store.state.dataObj.secondAppraiser"
              >{{this.$store.state.dataObj.secondAppraiser}}</span>
            </p>
          </li>
          <li>
            <p class="fl">
              <i class="fl">核数状态：</i>
              <span
                class="fl"
                :title="sealInfoDatas.auditorStatus"
              >{{sealInfoDatas.auditorStatus}}</span>
            </p>
            <p class="fl">
              <i class="fl">盖章状态：</i>
              <span
                class="fl"
                :title="sealInfoDatas.sealStatus"
              >{{sealInfoDatas.sealStatus}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 盖章信息 -->
    <div class="sealTreeInfoBox">
      <div class="sealTreeList">
        <zlpg-tree-node
          ref="zlpgTree"
          v-for="(item,index) in dataSource"
          :key="index"
          :node="item"
          :show-checkbox="false"
        >{{item.name}}</zlpg-tree-node>
      </div>
      <div class="sealInfoList">
        <div class="sealInfoList-top">
          <p class="fl">
            <i :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</i>
            <span
              class="investorIcon"
              :class="{'dgzIcon':sealInfoDatas.investorStage == '未签发','ygzIcon':sealInfoDatas.investorStage == '已签发'}"
            >{{sealInfoDatas.investorStage}}</span>
            <span
              class="sealstatusIcon"
              v-if="sealInfoDatas.sealStatusId != '' || sealInfoDatas.sealStatusId != 1382"
              :class="{dhsIcon: sealInfoDatas.sealStatusId == 1386,dgzIcon: sealInfoDatas.sealStatusId == 1387,hsjjIcon: sealInfoDatas.sealStatusId == 1388,ygzIcon: sealInfoDatas.sealStatusId == 1389,gzjjIcon: sealInfoDatas.sealStatusId == 1390}"
            >{{getStatusFn(sealInfoDatas.sealStatusId)}}</span>
          </p>
          <p class="fr fsNum">
            <i class="iconfont fs14 fl">&#xe671;</i>盖章份数：
            <span class="fr" :title="sealInfoDatas.amount ? sealInfoDatas.amount : '--'">{{sealInfoDatas.amount ? sealInfoDatas.amount : "--"}}</span>
          </p>
        </div>
        <div class="sealInfoList-info">
          <div>
            <p class="fl">
              <i>立项号</i>
              <span
                :title="sealInfoDatas.projectNumber ? sealInfoDatas.projectNumber : '--'"
              >{{sealInfoDatas.projectNumber ? sealInfoDatas.projectNumber : "--"}}</span>
            </p>
            <p class="fl">
              <i>报告号</i>
              <span
                :title="sealInfoDatas.reportNumber ? sealInfoDatas.reportNumber : '--'"
              >{{sealInfoDatas.reportNumber ? sealInfoDatas.reportNumber : "--"}}</span>
            </p>
          </div>
          <div>
            <p class="fl">
              <i>初审人</i>
              <span
                :title="sealInfoDatas.firstAuditName ? sealInfoDatas.firstAuditName : '--'"
              >{{sealInfoDatas.firstAuditName ? sealInfoDatas.firstAuditName : "--"}}</span>
            </p>
            <p class="fl">
              <i>初审时间</i>
              <span
                :title="sealInfoDatas.firstAuditTime ? sealInfoDatas.firstAuditTime : '--'"
              >{{sealInfoDatas.firstAuditTime ? sealInfoDatas.firstAuditTime : "--"}}</span>
            </p>
          </div>
          <div>
            <p class="fl">
              <i>复审人</i>
              <span
                :title="sealInfoDatas.secondAuditName ? sealInfoDatas.secondAuditName : '--'"
              >{{sealInfoDatas.secondAuditName ? sealInfoDatas.secondAuditName : "--"}}</span>
            </p>
            <p class="fl">
              <i>复审时间</i>
              <span
                :title="sealInfoDatas.secondAuditTime ? sealInfoDatas.secondAuditTime : '--'"
              >{{sealInfoDatas.secondAuditTime ? sealInfoDatas.secondAuditTime : "--"}}</span>
            </p>
          </div>
          <div>
            <p class="fl">
              <i>签发人</i>
              <span
                :title="sealInfoDatas.thirdAuditName ? sealInfoDatas.thirdAuditName : '--'"
              >{{sealInfoDatas.thirdAuditName ? sealInfoDatas.thirdAuditName : "--"}}</span>
            </p>
            <p class="fl">
              <i>签发时间</i>
              <span
                :title="sealInfoDatas.thirdAuditTime ? sealInfoDatas.thirdAuditTime : '--'"
              >{{sealInfoDatas.thirdAuditTime ? sealInfoDatas.thirdAuditTime : "--"}}</span>
            </p>
          </div>
          <div>
            <p class="fl">
              <i>核数人</i>
              <span
                :title="sealInfoDatas.auditorName ? sealInfoDatas.auditorName : '--'"
              >{{sealInfoDatas.auditorName ? sealInfoDatas.auditorName : "--"}}</span>
            </p>
            <p class="fl">
              <i>核数时间</i>
              <span
                :title="sealInfoDatas.auditorTime ? sealInfoDatas.auditorTime : '--'"
              >{{sealInfoDatas.auditorTime ? sealInfoDatas.auditorTime : "--"}}</span>
            </p>
          </div>
          <div>
            <p class="fl">
              <i>盖章人</i>
              <span
                :title="sealInfoDatas.sealName ? sealInfoDatas.sealName : '--'"
              >{{sealInfoDatas.sealName ? sealInfoDatas.sealName : "--"}}</span>
            </p>
            <p class="fl">
              <i>盖章时间</i>
              <span
                :title="sealInfoDatas.sealTime ? sealInfoDatas.sealTime : '--'"
              >{{sealInfoDatas.sealTime ? sealInfoDatas.sealTime : "--"}}</span>
            </p>
          </div>
        </div>
        <div class="sealInfoList-strip"></div>
        <!--附件-->
        <div class="sealInfoList-fileList">
          <div class="sealInfoList-bgfile sealInfoList-file" v-if="reportFileList.length">
            <p class="fl">报告附件</p>
            <template v-if="reportFileList.length > 0">
              <ul class="fl">
                <li class="fl" v-for="(rItem,rIndex) in reportFileList" :key="rIndex">
                  <span>
                    <i class="el-icon-document marginTop5"></i>
                  </span>
                  <span :title="rItem.fileName" @click="downloadOneFile(rItem)">{{rItem.fileName}}</span>
                </li>
              </ul>
              <div class="reset-btn fr" @click="downloadAll">全部下载</div>
            </template>
            <div class="notHaveData" v-else>
              <i class="el-icon-document"></i>未上传文件
            </div>
          </div>
          <div
            class="sealInfoList-ylfile sealInfoList-file marginBottom0"
            v-if="previewFileList.length"
          >
            <p class="fl">预览附件</p>
            <template v-if="previewFileList.length>0">
              <ul class="fl">
                <li class="fl" v-for="(pItem,pIndex) in previewFileList" :key="pIndex">
                  <span>
                    <i class="el-icon-document marginTop5"></i>
                  </span>
                  <span :title="pItem.name" @click="previewthisFile(pItem, sealisStatus)">{{pItem.name}}</span>
                </li>
              </ul>
            </template>
            <div class="notHaveData" v-else>
              <i class="el-icon-document"></i>未上传文件
            </div>
          </div>
          <div class="sealInfoList-table">
            <p>操作记录</p>
            <el-table :data="sealInfoListtable" border stripe style="width: 100%">
              <el-table-column prop="operation" label="操作状态" width="150"></el-table-column>
              <el-table-column prop="userName" label="操作人" width="100"></el-table-column>
              <el-table-column prop="createTime" label="操作时间" width="150"></el-table-column>
              <el-table-column prop="remarkContent" label="备注说明"></el-table-column>
            </el-table>
          </div>
          <div class="sealInfoList-buttons">
            <div v-if="sealisStatus.isHszy && !sealisStatus.isExamine">
              <span
                class="byBtn"
                @click="auditorSealExamineFunc(sealisStatus.taskId,1,!sealisStatus.buttonStatus)"
                :class="{isActive: !sealisStatus.buttonStatus}"
              >核数通过</span>
              <span
                class="refuseBtn"
                @click="auditorSealExamineFunc(sealisStatus.taskId,0,!sealisStatus.buttonStatus)"
                :class="{isActive: !sealisStatus.buttonStatus}"
              >核数拒绝</span>
            </div>
            <div v-if="sealisStatus.isGzzy && !sealisStatus.isExamine">
              <span
                class="byBtn"
                @click="auditorSealExamineFunc(sealisStatus.taskId,1,!sealisStatus.buttonStatus)"
                :class="{isActive: !sealisStatus.buttonStatus}"
              >盖章通过</span>
              <span
                class="refuseBtn"
                @click="auditorSealExamineFunc(sealisStatus.taskId,0,!sealisStatus.buttonStatus)"
                :class="{isActive: !sealisStatus.buttonStatus}"
              >盖章拒绝</span>
            </div>
            <span
              v-if="sealisStatus.isProjectleader && !sealisStatus.isExamine"
              class="search-btn sealSubmitBtn"
              @click="submitGZ(!sealisStatus.buttonStatus)"
              :class="{isActive: !sealisStatus.buttonStatus}"
            >提交盖章</span>
            <span
              v-if="sealisStatus.isProjectleader && sealisStatus.isExamine || sealisStatus.isHszy && sealisStatus.isExamine"
              class="refuseBtn"
              @click="sealwithdraw(!sealisStatus.buttonStatus)"
              :class="{isActive: !sealisStatus.buttonStatus}"
            >撤回</span>
            <span
              class="export-btn"
              v-if="sealisStatus.isProjectleader"
              @click="exportFormFunc(sealisStatus.file)"
            >
              <i class="iconfont icon-daochu"></i>导出申请单
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--提交弹窗-->
    <center-dialog
      ref="subcenterDialog"
      dialogWidth="380px"
      :dialogHeight=dHeight
      dialogTitle="提示信息"
      titlePosition="left"
    >
      <div slot="dialogContent">
        <div class="subSealDiv">
          <p class="marginBottom10" v-if="/projectProjectSeal/.test(this.$route.path)">
            <span>盖章打印份数：</span>
            <el-input
              v-model="fsGZ"
              placeholder="请输入盖章打印份数"
            ></el-input>
          </p>
          <p class="marginBottom10">
            <span>备注说明：</span>
            <el-input v-model="descriptionGZ" placeholder="请输入备注说明"></el-input>
          </p>
        </div>
        <!--盖章申请提交-->
        <p v-if="/projectProjectSeal/.test(this.$route.path)" class="subTip">确认提交
          <span :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</span> 报告盖章申请？
        </p>
        <!--核数通过提交-->
        <p v-if="/reportCheckNumber/.test(this.$route.path)" class="subTip">确认完成
          <span :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</span> 报告核数？
        </p>
        <!--盖章通过提交-->
        <p v-if="/seal/.test(this.$route.path)" class="subTip">确认完成
          <span :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</span> 报告盖章？
        </p>
        <div class="text-center">
          <div class="search-btn" @click="subConfirm">确认提交</div>
          <div class="reset-btn" @click="subCancel">取消</div>
        </div>
      </div>
    </center-dialog>
    <!--撤回弹窗-->
    <center-dialog
      ref="wdcenterDialog"
      dialogWidth="300px"
      dialogHeight="140px"
      dialogTitle="提示信息"
      titlePosition="left"
    >
      <div slot="dialogContent">
        <p class="subTip marginTop0" v-if="/projectProjectSeal/.test(this.$route.path)">
          确认撤回
          <span :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</span> 报告盖章申请？
        </p>
        <p class="subTip marginTop0" v-if="/reportCheckNumber/.test(this.$route.path)">
          确认撤回
          <span :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</span> 报告核数？
        </p>
        <p class="subTip marginTop0" v-if="/seal/.test(this.$route.path)">
          确认撤回
          <span :title="sealInfoDatas.investorName">{{sealInfoDatas.investorName}}</span> 报告盖章？
        </p>
        <div class="text-center">
          <div class="search-btn" @click="subwithDraw">确认撤回</div>
          <div class="reset-btn" @click="subCancel">取消</div>
        </div>
      </div>
    </center-dialog>
  </div>
</template>

<script>
import zlpgTreeNode from "@/page/fullPageModule/fullPageTreeNode";
import centerDialog from "@/components/centerDialog.vue";
export default {
  name: "sealInfo",
  props: ["thisProjectId", "thisInvestorId"],
  data() {
    return {
      id: this.$store.state.projectId,
      sealInfoDatas: {}, //详情具体信息
      reportFileList: [], //报告附件
      previewFileList: [], //预览附件
      sealisStatus: {}, //详情里的状态
      treeprojectId: "", //projectId
      treeinvestorId: "", //investorId
      fsGZ: "", //提交盖章份数
      descriptionGZ: "", //备注说明
      sealInfoListtable: [], //操作记录
      dataSource: [], //树
      thisflag: "", //通过拒绝
      thistaskId: "", //taskId
      treeArr: [], //树arr
      dHeight: "", //弹窗高度
      commonData: window.commonData
    };
  },
  created() {
    this.sealTreeFunc();
  },
  mounted() {
    var _this = this;
    _this.$store.state.sealNodeClick = function(node) {
      _this.sealNodeClick(node);
    };
    if (/projectProjectSeal/.test(this.$route.path)) {
      _this.sealInfoFunc(_this.thisProjectId, _this.thisInvestorId);
      _this.dHeight = "234px";
    } else {
      _this.sealInfoFunc(_this.$store.state.dataObj.projectId, _this.$store.state.dataObj.investorId);
      _this.dHeight = "200px";
    }
  },
  methods: {
    // 进入项目
    childMethod() {
      this.$router.push({
        path: "/zlpg/project/projectCont"
      });
      this.$store.commit("changeShowCommonOther");
    },
    //获取接口返回的状态值
    getStatusFn(k) {
      switch (k) {
        case 1386:
          return "待核数";
          break;
        case 1387:
          return "待盖章";
          break;
        case 1388:
          return "核数拒绝";
          break;
        case 1389:
          return "已盖章";
          break;
        case 1390:
          return "盖章拒绝";
          break;
      }
    },
    // 循环数据，增加节点层级
    dataLoop(Arr, level) {
      for (let i in Arr) {
        this.$set(Arr[i], "level", level);
        this.$set(Arr[i], "checked", "");
        this.treeArr.push(Arr[i]);
        this.dataLoop(Arr[i].children, level + 1);
      }
      return Arr;
    },
    //详情信息
    sealInfoFunc(projectId, investorId) {
      var _this = this;
      this.$http
        .post("/api/reportseal/reportSealDetil", {
          projectId: projectId,
          investorId: investorId
        })
        .then(function(data) {
          _this.sealisStatus = data.data;
          _this.sealInfoDatas = data.data.investor;
          _this.reportFileList = data.data.fileDownList; //报告附件
          _this.previewFileList = data.data.fileUpList; //预览附件
          _this.sealInfoListtable = data.data.findTaskNodeInfo; //操作记录
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 树接口
    sealTreeFunc() {
      var _this = this;
      if (!/projectProjectSeal/.test(this.$route.path)) {
        this.treeprojectId = this.$store.state.dataObj.projectId;
      } else {
        this.treeprojectId = this.thisProjectId;
      }
      this.$http
        .post("/api/investors/findReportSealTree", {
          projectId: this.treeprojectId
        })
        .then(function(data) {
          _this.dataSource = _this.dataLoop(data.data.findReportSealTree, 1);
          if(document.querySelectorAll(".sealTreeList .tree_node_actived").length === 0) {
            _this.$nextTick(function() {
              document.querySelectorAll(".sealTreeList .el-tree-node__label")[0].parentNode.classList.add("tree_node_actived");
            });
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    //点击树
    sealNodeClick(node) {
      this.$store.state.projectId = node.projectId;
      this.$store.state.investorId = node.investorId;
      let nodeList = document.querySelectorAll(
        ".sealTreeList .el-tree-node__label"
      );
      for (let i = 0; i < nodeList.length; i++) {
        if (node.name == nodeList[i].innerHTML) {
          nodeList[i].classList.add("tree-actived");
          nodeList[i].parentNode.classList.add("tree_node_actived");
        } else {
          nodeList[i].classList.remove("tree-actived");
          nodeList[i].parentNode.classList.remove("tree_node_actived");
        }
      }
      this.sealInfoFunc(node.projectId, node.investorId);
    },
    // 下载某个文件
    downloadOneFile(item) {
      window.location.href =
        "/api/file/downloadFile?token=" +
        this.$getCookie("token") +
        "&docsName=" +
        this.$filename(item.fileName) +
        "&flag=2&alyPath=" +
        item.filePath;
    },
    //全部下载
    downloadAll() {
      window.location.href =
        "/api/documentsRemark/downLoadSubmitFiles?token=" +
        this.$getCookie("token") +
        "&projectId=" +
        this.$store.state.projectId +
        "&investorId=" +
        this.$store.state.investorId;
    },
    //预览附件
    previewthisFile(item,tip) {
      var _this = this;
      if (item.type == 1 || item.type == 2) {
        let routeData = this.$router.resolve({
          path: "/filePreview",
          query: { projectId: tip.projectId, investorId: tip.investorId, type: item.type }
        });
        window.open(routeData.href, "_blank");
      } else if (item.type == 3) {
        if(!/projectProjectSeal/.test(this.$route.path)) {
          this.$http
            .post("/api/project/getProjectInfo", {
              projectId: tip.projectId
            })
            .then(function(data) {
              _this.$setCookie('projectInfo', JSON.stringify(data.data), 24 * 60 * 60);
            })
            .catch(function(error) {
              _this.$messageError(error);
            });
        }
        let routeData = this.$router.resolve({
         path: "/openRelationDetail",
         query:{tabName: "资产负债表",type : 3,projectId: tip.projectId,investorId: tip.investorId,getLeftTree:""}
        });
        window.open(routeData.href, "_blank");
      }
    },
    //弹窗取消
    subCancel() {
      this.$refs.subcenterDialog.closeDialog();
      this.$refs.wdcenterDialog.closeDialog();
      this.fsGZ = "";
      this.descriptionGZ = "";
    },
    // 导出申请单
    exportFormFunc(item) {
      var _this = this;
      window.location.href =
        "/api/file/downloadFile?token=" +
        this.$getCookie("token") +
        "&docsName=" +
        this.$filename(item.name) +
        "&flag=1&alyPath=";
    },
    // 提交盖章
    submitGZ(item) {
      if (item) return;
      this.$refs.subcenterDialog.showDialog();
    },
    //确认提交
    subConfirm() {
      var _this = this;
      if (/projectProjectSeal/.test(this.$route.path)) {  //提交盖章申请
        if(isNaN(_this.fsGZ)) {
          _this.$messageError("盖章份数只能为数字");
        } else {
          this.$http
            .post("/api/reportseal/sendAuditorSeal", {
              projectId: _this.sealisStatus.projectId,
              investorId: _this.sealisStatus.investorId,
              amount: _this.fsGZ,
              comments: _this.descriptionGZ
            })
            .then(function(data) {
              _this.$refs.subcenterDialog.closeDialog();
              _this.sealInfoFunc(_this.sealisStatus.projectId, _this.sealisStatus.investorId);
              _this.sealTreeFunc();
              _this.$messageSuccess("盖章申请提交成功");
              _this.fsGZ = "";
              _this.descriptionGZ = "";
            })
            .catch(function(error) {
              _this.$messageError(error);
            });
        }
      } else {
        this.$http
          .post("/api/reportseal/auditorSealExamine", {   //核数和盖章的通过拒绝
            investorId: _this.sealisStatus.investorId,
            flag: _this.thisflag,
            content: _this.descriptionGZ,
            taskId: _this.thistaskId
          })
          .then(function(data) {
            _this.$refs.subcenterDialog.closeDialog();
            _this.sealInfoFunc(_this.sealisStatus.projectId, _this.sealisStatus.investorId);
            _this.sealTreeFunc();
            _this.$store.state.searchInfo();
            if (/reportCheckNumber/.test(_this.$route.path)) {
              _this.$messageSuccess("核数提交成功");
            } else if (/projectProjectSeal/.test(_this.$route.path)) {
              _this.$messageSuccess("盖章提交成功");
            }
            _this.descriptionGZ = "";
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      }
    },
    //撤回
    sealwithdraw(item) {
      if (item) return;
      this.$refs.wdcenterDialog.showDialog();
    },
    //确认撤回
    subwithDraw() {
      var _this = this;
      this.$http
        .post("/api/reportseal/retractSubmit ", {
          investorId: _this.sealisStatus.investorId
        })
        .then(function(data) {
          _this.$refs.wdcenterDialog.closeDialog();
          _this.sealInfoFunc(_this.sealisStatus.projectId, _this.sealisStatus.investorId);
          _this.sealTreeFunc();
          _this.$store.state.searchInfo();
          _this.$messageSuccess("盖章申请撤回成功");
          _this.descriptionGZ = "";
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    //核数&盖章-通过&拒绝
    auditorSealExamineFunc(thistaskid, thistype, item) {
      if (item) return;
      this.thisflag = thistype;
      this.thistaskId = thistaskid;
      this.$refs.subcenterDialog.showDialog();
    }
  },
  components: {
    zlpgTreeNode,
    centerDialog
  }
};
</script>

<style type="text/scss" scoped="scoped" lang="scss">
.center-body {
  padding: 20px;
  /* 盖章详情上方信息展示 */
  .requiredInformation {
    margin-bottom: 15px;
    .sealInformation {
      height: 40px;
      background: rgba(246, 250, 255, 1);
      border-radius: 2px 2px 0px 0px;
      border: 1px solid rgba(229, 229, 229, 1);
      .sealInfo-title {
        width: 620px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(38, 38, 40, 1);
        line-height: 40px;
        margin-left: 20px;
        display: inline-block;
      }
      .sealInfo-nature {
        max-width: 400px;
        margin-right: 10px;
        span {
          height: 24px;
          padding: 0 10px;
          line-height: 24px;
          text-align: center;
          color: #98c268;
          background: #f1f8e8;
          border: 1px solid #c8deaf;
          border-radius: 2px;
          float: left;
          margin: 8px 5px;
          font-size: 12px;
        }
        :nth-child(2) {
          color: #f09237;
          background: #fff2e5;
          border: 1px solid #ffc68f;
        }
        :nth-child(3) {
          color: #7c9fee;
          background: #e9f0ff;
          border: 1px solid #bbd0ff;
        }
        :nth-child(4) {
          color: #50adee;
          background: #e6f5ff;
          border: 1px solid #9bd6ff;
        }
      }
    }
    .junctions-Info {
      border-radius: 0px 0px 2px 2px;
      border: 1px solid rgba(229, 229, 229, 1);
      border-top: none;
      padding: 20px 60px;
      ul {
        li {
          display: inline-block;
          width: 100%;
          &::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            display: inline-block;
            float: left;
            margin-top: 15px;
            margin-right: 10px;
          }
          &:first-child::before {
            background: #f09237;
          }
          &:nth-child(2)::before {
            background: #57bfb2;
          }
          &:nth-child(3)::before {
            background: #7c9fee;
          }
          p {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            line-height: 36px;
            width: 49%;
            i {
              color: #636363;
              display: inline-block;
            }
            span {
              color: #262628;
              max-width: 340px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
            }
            &:last-child {
              width: 46%;
              border-left: 1px solid #ececec;
              padding-left: 3%;
            }
          }
        }
      }
    }
  }
  /* 盖章信息 */
  .sealTreeInfoBox {
    display: flex;
    width: 968px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 0px 2px 2px;
    border: 1px solid rgba(229, 229, 229, 1);
    padding: 10px;
    /* 树 */
    .sealTreeList {
      width: 235px;
      background: white;
      border-radius: 2px;
      border: 1px solid #ececec;
      padding: 15px 15px 15px 0;
    }
    .sealInfoList {
      flex: 1;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 5px 0px rgba(189, 189, 189, 0.5);
      border: 1px solid rgba(229, 229, 229, 1);
      margin-left: 10px;
      position: relative;
      &::after {
        width: 20px;
        height: 20px;
        content: "";
        left: -10px;
        top: 48px;
        position: absolute;
        display: block;
        background: #fff;
        border-radius: 20px;
        box-shadow: inset -1px 0px 0px 0px rgba(189, 189, 189, 0.5);
      }
      .sealInfoList-top {
        border-bottom: 1px dashed #ececec;
        height: 56px;
        line-height: 56px;
        padding: 0 40px;
        p:first-child {
          width: 480px;
          &::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            display: inline-block;
            float: left;
            margin-top: 25px;
            margin-right: 10px;
            background: rgba(240, 146, 55, 1);
          }
          i {
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: #29292b;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            margin-right: 5px;
            float: left;
          }
          .investorIcon {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            border-radius: 3px;
            padding: 0 7px;
            line-height: 18px;
            height: 18px;
            border: 1px solid #f09237;
            max-width: 56px;
            margin-left: 5px;
            color: #f09237;
          }
          .sealstatusIcon {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            line-height: 18px;
            height: 18px;
            border-radius: 3px;
            padding: 0 3px;
            max-width: 56px;
          }
          .dhsIcon {
            border: 1px solid #3a80ec !important;
            color: #3a80ec !important;
          }
          .dgzIcon {
            border: 1px solid #f09237 !important;
            color: #f09237 !important;
          }
          .hsjjIcon {
            border: 1px solid #f86f45 !important;
            color: #f86f45 !important;
          }
          .ygzIcon {
            border: 1px solid #11bf6b !important;
            color: #11bf6b !important;
          }
          .gzjjIcon {
            border: 1px solid #f84545 !important;
            color: #f84545 !important;
          }
        }
        .fsNum {
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: #636363;
          i {
            color: rgba(228, 116, 116, 1);
            margin-right: 8px;
            display: inline-block;
          }
          span {
            color: #262628;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 50px;
            display: inline-block;
          }
        }
      }
      .sealInfoList-info {
        padding: 30px 6%;
        display: inline-block;
        width: 88%;
        > div {
          display: inline-block;
          margin-bottom: 8px;
          width: 100%;
          &:last-child {
            margin-bottom: 0;
          }
          p {
            line-height: 30px;
            width: 300px;
            &:last-child {
              margin-left: 18px;
            }
            i {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(106, 106, 106, 1);
              width: 50px;
              margin-right: 10px;
              display: inline-block;
            }
            span {
              font-size: 12px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: #262628;
              width: 210px;
              display: inline-block;
              border-bottom: 1px solid #e1e1e1;
            }
          }
        }
      }
      .sealInfoList-strip {
        position: relative;
        width: 100%;
        height: 4px;
        background: repeating-linear-gradient(
          45deg,
          #f0f0f0 10px,
          #f0f0f0 20px,
          #58c 0,
          #58c 30px,
          #f0f0f0 0,
          #f0f0f0 40px,
          #e55 0,
          #e55 50px
        );
      }
      .sealInfoList-fileList {
        .sealInfoList-file {
          margin: 22px 40px;
          display: flex;
          border-bottom: 1px dashed #ececec;
          padding-bottom: 20px;
          > p {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(106, 106, 106, 1);
            line-height: 26px;
            width: 72px;
          }
          ul {
            flex: 1;
            li {
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
              &:nth-child(odd) {
                border-right: 1px solid #e2e2e2;
                padding-right: 2%;
              }
              &:nth-child(even) {
                margin-left: 2%;
              }
            }
          }
          .reset-btn {
            width: 80px;
          }
          .notHaveData {
            line-height: 24px;
            text-align: center;
            color: #b0b0b0;
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            i {
              color: #b0b0b0;
              margin-right: 6px;
            }
          }
        }
        .sealInfoList-table {
          padding: 20px 40px;
          p {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(106, 106, 106, 1);
            line-height: 30px;
          }
        }
        .sealInfoList-buttons {
          text-align: center;
          margin-bottom: 20px;
          .isActive {
            cursor: not-allowed;
            opacity: 0.4;
          }
          .refuseBtn {
            margin-left: 16px;
          }
          .export-btn {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(58, 128, 236, 1);
            line-height: 23px;
            margin-left: 26px;
            cursor: pointer;
            .icon-daochu {
              font-size: 12px;
              margin-right: 6px;
              color: #3a80ec;
            }
          }
        }
      }
    }
  }
  /* 提交盖章弹窗 */
  /deep/ .centerDialog {
    .subSealDiv {
      p {
        width: 100%;
        display: inline-block;
        span {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #686868;
          float: left;
          display: inline-block;
          width: 100px;
          text-align: right;
          line-height: 25px;
        }
        .el-input {
          float: left;
          width: 70%;
        }
      }
    }
    .subTip {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #262628;
      margin: 20px;
      text-align: center;
      span {
        max-width: 140px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 12px;
        color: #F09237;
        cursor: pointer;
      }
    }
  }
}
</style>
