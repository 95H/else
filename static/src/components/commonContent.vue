<template>
	<div class="cpr-wrapper" :class="{cprWidth:cprWidth,fixed:this.$store.state.isfixedFlag}">
		<div class="cpr">
			<!--top-->
			<div class="top-title">
				<el-row>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<a class="closetitle iconfont icon-shanchu" @click="close"></a>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light">
							{{commonTitle}}
						</div>
					</el-col>
					<el-col v-if="commonBtn" :span="8">
						<div class="grid-content bg-purple bg-right" v-if="defaultBtnGroup">
							<el-button v-if="extraBtn" type="warning" class="saveBtn fs13 marginRight10" @click="extraParentMethod()">{{extraBtn}}</el-button>
							<el-button type="primary" class="saveBtn fs13" @click="parentMethod()">{{commonBtn}}</el-button>
						</div>
						<div class="grid-content bg-purple bg-right" v-else>
              <p class="collect-wrap clear" v-if="commonTitle=='公司台账导入' && $store.state.showCollectFlag" @click="addBtnHandler"><span class="collect-icon" :class="$store.state.switchIcon ? 'hasCollected' :''"></span><span>{{$store.state.switchIcon ? '已收藏' : '收藏此次模板'}}</span></p>
							<el-button type="primary" class="saveBtn fs13 marginRight10" @click="parentMethod()">{{extraBtn}}</el-button>
							<el-button v-if="extraBtn" class="saveBtn fs13 defaultBtn" @click="extraParentMethod()">{{commonBtn}}</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="cpr-content" ref="scrollbar">
				<el-scrollbar class="el-scrollbar" v-if="isScroll">
					<component ref="child" v-bind:is="componentsType"></component>
				</el-scrollbar>
				<template v-else>
					<component ref="child" v-bind:is="componentsType"></component>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import createproject from "./createProject";
import newFieldSurvey from "./newFieldSurvey"; // 新建现场调查任务
import PersonnerDetails from "@/page/personnel/PersonnerDetails";
import writeWorkDetails from "@/page/workingHours/writeWorkDetails";
import newEvaluationWork from "./newEvaluationWork"; // 新建评估作业任务
import workflow from "@/page/powerAdmin/workflow/workflow";
import junctionsInfo from "@/page/examine/junctionsInfo";
import junctionApply from "@/page/examine/junctionApply";
import sealInfo from "@/page/reportNumber/sealInfo";
import reportNumberInfo from "@/page/reportNumber/reportNumberInfo";
import projectEditor from "@/page/project/projectApproval/projectEditor";
import examineInfo from "@/page/examine/examineInfo";
import projectAuditlay from "@/page/project/projectAuditing/projectAuditLay";
import sendNew from "../page/send/sendNew"; // 新建发送
import distributionDetails from "@/page/reportNumber/distributionDetails";
import sendDetails from "@/page/send/sendDetails"; // 发送
import spotTaskInfo from "@/page/task/spotTaskInfo"; // 现场勘查任务
import assessTaskInfo from "@/page/task/assessTaskInfo"; // 评估任务
import newSpotTask from "@/page/task/newSpotTask"; //新建现场调查任务
import editorProject from "./editorProject";
import projectDetail from "@/page/project/projectInformation/projectDetail";
import MenuDetail from "@/page/powerAdmin/menue/menuDetail.vue"; // 新建菜单
import spotInterview from "@/page/task/spotInterview"; // 现场访谈任务
import roleModify from "@/page/powerAdmin/roleModify";
import manuscriptDetail from "@/page/manuscript/manuscriptDetail";
import submitFileList from "@/page/fullPageModule/underLineSubmit/submitFileList"; //文件管理【线下送审】
import trialDetail from "@/page/fullPageModule/underLineSubmit/trialDetail"; //送审详情
import projectExternalAuditInfo from "@/page/project/projectAuditing/projectExternalAuditInfo"; //外审修改审核详情
import projectExternalAuditMent from "@/page/project/projectAuditing/projectExternalAuditMent"; //外审修改审核
import projectModifyExternal from "@/page/project/projectAuditing/projectModifyExternal"; //外审修改审核
import addIssue from "@/page/reportNumber/autoIssue/addIssue"; //新增、编辑分配行业【自动签发分配管理】
import tableModule from "@/components/tableModule"; //报告、说明中的自定义关联弹窗
import partImport from "./partialImport/partImport"; //资产申报表导入
import explainList from "@/page/fullPageModule/incomeLaw/explainList"; //收益法 查看说明
import quickPrice from "@/page/fullPageModule/quickPrice/quickPrice"; //快捷作价
import marketFile from "@/page/fullPageModule/market/uploadFile"; // 市场法导入
import standingBook from "@/page/fullPageModule/standingBook/standingBook"; // 台账导入
import dataExport from "@/page/project/dataExport"; // 项目汇总导出
import dataQuote from '@/page/fullPageModule/incomeLaw/dataQuote/dataQuote';
import houseCase from '@/page/fullPageModule/case/houseCase/houseCase' //房屋案列
import fullPageDetail from "@/page/fullPageModule/market/fullPageDetail"; //市场法
export default {
  name: "commonContent",
  components: {
    createproject,
    newFieldSurvey,
    PersonnerDetails,
    writeWorkDetails,
    newEvaluationWork,
    workflow,
    junctionsInfo,
    junctionApply,
    sealInfo,
    reportNumberInfo,
    projectEditor,
    examineInfo,
    projectAuditlay,
    distributionDetails,
    sendDetails,
    spotTaskInfo,
    sendDetails,
    sendNew,
    distributionDetails,
    editorProject,
    assessTaskInfo,
    newSpotTask,
    projectDetail,
    MenuDetail,
    spotInterview,
    roleModify,
    manuscriptDetail,
    submitFileList,
    trialDetail,
    projectExternalAuditInfo,
    projectExternalAuditMent,
    projectModifyExternal,
    addIssue,
    tableModule,
    partImport,
    explainList,
    quickPrice,
    marketFile,
    standingBook,
    dataExport,
    dataQuote,
    fullPageDetail,
    houseCase
  },
  data() {
    return {
      isScroll: this.$store.state.isScroll
    };
  },
  mounted() {
    var _this = this;
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.$el.style.height = h - 36 + "px";
    this.$refs.scrollbar.style.height = h - 76 + "px";
    this.$store.state.cprRightHg = h - 76;
  },
  methods: {
    close() {
      //案列模块需要保存数据
      if(!this.$store.state.caseTabFlag&&this.componentsType == 'houseCase'){
          this.$messageError('请先保存页面数据，再操作');
          return;
      }
      this.$store.commit("changeShowCommon");
    },
    extraParentMethod() {
      this.$refs.child.extraChildMethod();
    },
    parentMethod() {
      this.$refs.child.childMethod();
    },
    addBtnHandler() {
      this.$refs.child.addBtnHandler();
    }
  },
  computed: mapState([
    "commonTitle",
    "commonBtn",
    "componentsType",
    "extraBtn",
    "cprWidth",
    "defaultBtnGroup"
  ])
};
</script>

<style scoped="scoped" lang="scss">
	.cpr-wrapper {
		position: absolute;
		width: 800px;
		right: 0;
		top: -10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 4px 0px rgba(203, 203, 203, 0.5);
		z-index: 1110;
		.cpr {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			.top-title {
				width: 100%;
				overflow: hidden;
			}
			.cpr-content {
				width: 100%;
			}
			.el-scrollbar {
				width: 100%;
				height: calc(100% + 17px);
			}
			.saveBtn {
				height: 25px;
				padding: 0 10px;
				min-width: 75px;
				background: rgba(58, 128, 236, 1);
				border-radius: 2px;
				line-height: 25px;
				margin-right: 20px;
				margin-left: 0;
				span {
					color: #fff;
					font-size: 13px;
				}
			}
			.defaultBtn{background: #fff;border-color:#3a80ec;color:#3a80ec;
				&:hover{background: #E0ECFF;opacity: .7;}
			}
			.closetitle {
				margin-left: 20px;
				cursor: pointer;
				color: #C0C0C0;
			}
			.closetitle:hover {
				color: #F09237;
			}
			.center-body {
				padding: 20px;
				.requiredInformation {
					width: 760px;
					min-height: 330px;
					background: rgba(255, 255, 255, 1);
					border-radius: 2px;
					border: 1px solid rgba(236, 236, 236, 1);
					border-top: 0;
					margin-bottom: 10px;
					.top {
						height: 35px;
						background: #fafafa;
						border-radius: 2px 2px 0px 0px;
						border: 1px solid rgba(236, 236, 236, 1);
						border-left: 0;
						border-right: 0;
						line-height: 35px;
						img {
							display: inline-block;
							margin-left: 20px;
						}
						span {
							display: inline-block;
							margin-left: 10px;
							font-size: 13px;
							font-weight: 600;
						}
					}
				}
				.optionalmsg {
					width: 760px;
					min-height: 1080px;
					background: rgba(255, 255, 255, 1);
					border-radius: 2px;
					border: 1px solid rgba(236, 236, 236, 1);
					border-top: 0;
					margin-bottom: 10px;
					.top {
						height: 35px;
						background: #fafafa;
						border-radius: 2px 2px 0px 0px;
						border: 1px solid rgba(236, 236, 236, 1);
						border-left: 0;
						border-right: 0;
						line-height: 35px;
						img {
							display: inline-block;
							width: 12px;
							height: 12px;
							margin-left: 20px;
						}
						span {
							display: inline-block;
							margin-left: 10px;
							font-size: 13px;
							font-weight: 600;
						}
					}
				}
				.cpr-input {
					top: 1px;
					right: 10px;
				}
				.content {
					width: 711px;
					min-height: 125px;
					background: rgba(249, 249, 249, 1);
					margin-left: 24px;
					margin-bottom: 15px;
					padding-top: 15px;
					label {
						width: 105px;
						font-size: 13px;
					}
					.el-input,
					.el-select {
						width: 150px;
					}
					li:first-child {
						margin-left: 55px;
						.el-input {
							width: 578px;
						}
					}
					a {
						float: right;
						margin-right: 10px;
						margin-top: -34px;
						i {
							color: #ccc;
						}
					}
				}
				.add {
					cursor: pointer;
					clear: both;
					width: 62px;
					height: 25px;
					line-height: 25px;
					text-align: center;
					font-size: 13px;
					color: rgba(58, 128, 236, 1);
					border-radius: 2px;
					border: 1px solid rgba(58, 128, 236, 1);
					margin-left: 24px;
				}
				.title {
					font-size: 13px;
					font-weight: 600;
					color: rgba(38, 38, 40, 1);
					margin-left: 24px;
				}
			}
			.el-form-item--mini.el-form-item,
			.el-form-item--small.el-form-item {
				line-height: 28px;
				width: 345px;
			}
			.el-form-item--mini.el-form-item:nth-child(28) {
				width: auto;
			}
			.el-input,
			.el-select {
				width: 240px;
				font-size: 13px;
			}
			.el-form-item--mini.el-form-item,
			.el-form-item--small.el-form-item {
				margin-bottom: -6px;
				margin-top: 10px;
			}
			.el-radio+.el-radio {
				margin-left: 13px;
			}
		}
		.el-row {
			height: 40px;
			background: rgba(246, 250, 255, 1);
			border: 1px solid rgba(229, 229, 229, 1);
			&:last-child {
				margin-bottom: 0;
			}
		}
		.bg-purple-light {
			font-size: 14px;
			font-weight: 600;
			color: rgba(38, 38, 40, 1);
			text-align: center;
		}
		.bg-right {
			text-align: right;
		}
		.grid-content {
			height: 40px;
			line-height: 40px;
		}
    .collect-wrap{display: inline-block; margin-left: -50px; margin-right: 10px; cursor: pointer;
      span{vertical-align: middle;}
    }
    .collect-icon{display: inline-block; width: 13px; height:13px; background: url("../../static/img/unCollect.png") no-repeat center;}
    .hasCollected{background: url("../../static/img/collected.png") no-repeat center;}
		.row-bg {
			padding: 10px 0;
		}
	}

	/deep/ .el-scrollbar__view {
		position: relative;
		height: 100%;
	}

	.cprWidth {
		width: 1030px;
	}
	.fixed{
		  position: fixed;
    	top: 34px;
    	right: 10px;
	}
</style>
