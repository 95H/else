<template>
	<div class="projectmessage-zlpg-content projectapproval">
		<!--项目基本信息-->
		<div class="project-title title">
			<div class="top fw600">
				<span>项目基本信息<i class="iconfont icon-xiangmuxinxi fl"></i></span>
			</div>
			<div class="content">
				<ul>
					<li class="width0">
						<label>项目名称：</label><span style="width: 85%;">{{showData(projectMessage.projectName)}}</span>
					</li>
					<li class="width0">
						<label>项目简称：</label><span style="width: 85%;">{{showData(projectMessage.shortName)}}</span>
					</li>
					<li>
						<label>承作机构：</label><span>{{showData(datalist.organizer)}}</span>
					</li>
					<li>
						<label>是否涉及上市公司：</label><span>{{showData(isFun(projectMessage.isListedCompany))}}</span>
					</li>
					<li>
						<label>项目性质：</label><span>{{showData(commonData.projectNatureId[projectMessage.projectNatureId])}}</span>
					</li>
					<li>
						<label>项目级别：</label><span>{{showData(commonData.projectLevelId[projectMessage.projectLevelId])}}</span>
					</li>
					<li>
						<label>项目主要负责人：</label><span>{{showData(datalist.chargeLeaderName)}}</span>
					</li>
					<li>
						<label>项目其他负责人：</label><span class="specialMsg1">{{showData(datalist.projectLeaderName)}}</span>
					</li>
					<li>
						<label>第一签字评估师：</label><span>{{showData(datalist.chargeAppraiserName)}}</span>
					</li>
					<li>
						<label>第二签字评估师：</label><span>{{showData(datalist.appraiserUserName)}}</span>
					</li>
					<li>
						<label>项目联络人：</label><span>{{showData(datalist.contactPersonName)}}</span>
					</li>
					<li>
						<label>评估目的：</label><span>{{showData(commonData.assessmentObjectiveId[projectMessage.assessmentObjectiveId])}}</span>
					</li>
					<li>
						<label>评估对象：</label><span>{{showDataNull(projectMessage.assessmentTargetName)}}{{assessObj}}</span>
					</li>
					<li>
						<label>评估基准日：</label><span>{{showData(projectMessage.assessmentBaseDate)}}</span>
					</li>
					<li>
						<label>是否更改基准日：</label><span>{{showData(isFun(projectMessage.ifChangeBaseDay))}}</span>
					</li>
					<li>
						<label>交易买方：</label><span>{{showData(projectMessage.tradeBuyer)}}</span>
					</li>
					<li>
						<label>经济性质：</label><span>{{showData(commonData.billEconomicNatureId[projectMessage.billEconomicNatureId])}}</span>
					</li>
					<li>
						<label>交易卖方：</label><span>{{showData(projectMessage.tradeSeller)}}</span>
					</li>
					<li>
						<label>具体经济行为：</label><span>{{showData(commonData.EconomicBehaviorId[projectMessage.economicBehaviorId])}}</span>
					</li>
					<li>
						<label>交易涉及股权比例：</label><span>{{!projectMessage.tradeProportion ? '' : projectMessage.tradeProportion+'%'}}</span>
					</li>
					<li>
						<label>是否涉及控制权转移：</label><span>{{showData(isFun(projectMessage.isPowerTransfer))}}</span>
					</li>
					<li>
						<label>经济性质是否改变：</label><span>{{showData(isFun(projectMessage.isNatureChange))}}</span>
					</li>
					<li>
						<label>矿业权评估报告备案部门：</label><span>{{showData(projectMessage.keepOnRecordDepartment)}}</span>
					</li>
					<!-- <li>
						<label>预期评估服务费：</label><span>{{!projectMessage.evaluationFeeExpect ? '--' : projectMessage.evaluationFeeExpect+'万元'}}</span>
					</li>
					<li>
						<label>预期差旅费：</label><span>{{!projectMessage.travelExpenseExpect ? '--' : projectMessage.travelExpenseExpect+'万元'}}</span>
					</li> -->
					<li>
						<label>现场工作时间：</label><span>{{projectMessage.workDaySite=='' ? '--':projectMessage.workDaySite+'天'}}</span>
					</li>
					<li>
						<label>预期合同价：</label><span>{{!projectMessage.projectExpenseExpect ? '--' : projectMessage.projectExpenseExpect+'万元'}}</span>
					</li>
					<li class="width0">
						<label>项目背景：</label><span style="width: 81%;">{{showData(projectMessage.projectBackgroud)}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!--资产规模和范围-->
		<div class="asset-title title">
			<div class="top fw600">
				<span>资产规模和范围<i class="iconfont icon-zichanguimohefanwei fl"></i></span>
			</div>
			<div class="content">
				<ul>
					<li>
						<label>企业数量：</label><span>{{!projectMessage.enterpriseNumber ? '--' : projectMessage.enterpriseNumber+'家'}}</span>
					</li>
					<li>
						<label>分布城市数量：</label><span>{{!projectMessage.cityNumber ? '--' : projectMessage.cityNumber+'座'}}</span>
					</li>
					<li>
						<label>二级长投数量：</label><span>{{!projectMessage.longInvestmentNumber ? '--' : projectMessage.longInvestmentNumber+'个'}}</span>
					</li>
					<li>
						<label>评估报告类型：</label><span>{{showData(commonData.assetReportTypeId[projectMessage.issueAssetsReport])}}</span>
					</li>
					<li>
						<label>是否涉及土地使用权：</label><span>{{showData(isFun(projectMessage.involveLand))}}</span>
					</li>
					<li>
						<label>是否涉及矿业权：</label><span>{{showData(isFun(projectMessage.involveMining))}}</span>
					</li>
					<li>
						<label>资产总额：</label><span>{{!projectMessage.totalAssets ? '--' : projectMessage.totalAssets+'万元'}}</span>
					</li>
					<li>
						<label>净资产总额：</label><span>{{!projectMessage.totalNetAsset ? '--' : projectMessage.totalNetAsset+'万元'}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!--集群项目信息-->
		<div class="asset-title title">
			<div class="top fw600">
				<span>集群项目信息<i class="iconfont icon-zichanguimohefanwei fl"></i></span>
			</div>
			<div class="content jqpadding">
				<div class="subproject">
					<table-tree v-if="isShowTreeTable" :columns="columns" :tree-structure="true" :data-source="dataSource" :tableHeader="true" :defaultExpandAll="true" treeType="false"></table-tree>
				</div>
			</div>
		</div>
		<!--委托方信息-->
		<div class="milestone-title title">
			<div class="top fw600">
				<span>委托方信息<i class="iconfont icon-weituofangxinxi fl"></i></span>
			</div>
			<div class="content">
				<div class="milestone-item" v-for="(item,i) in clientList" :key="i">
					<ul>
						<li>
							<label>委托方名称：</label><span>{{showData(clientList[i].companyName)}}</span>
						</li>
						<li>
							<label>经济性质：</label><span>{{showData(commonData.billEconomicNatureId[clientList[i].economicNatureId])}}</span>
						</li>
						<li>
							<label>主管部门：</label><span>{{showData(clientList[i].competentDepartment)}}</span>
						</li>
						<li>
							<label>姓名：</label><span>{{showData(clientList[i].contactName)}}</span>
						</li>
						<li>
							<label>手机：</label><span>{{showData(clientList[i].contactMobile)}}</span>
						</li>
						<li>
							<label>电话：</label><span>{{showData(clientList[i].contactTelephone)}}</span>
						</li>
						<li>
							<label>传真：</label><span>{{showData(clientList[i].contactFax)}}</span>
						</li>
					</ul>
				</div>
				<!--<div class="isActive" v-if="clientList.length==0">-->
					<!--暂无信息-->
				<!--</div>-->
        <div class="noData" v-if="clientList.length==0">暂无数据</div>
			</div>
		</div>
		<!--评估费支付方信息-->
		<div class="milestone-title title">
			<div class="top fw600">
				<span>评估费支付方信息<i class="iconfont icon-pinggufeizhifufangxinxi fl"></i></span>
			</div>
			<div class="content">
				<div class="milestone-item" v-for="(item,i) in payerList" :key="i">
					<ul>
						<li>
							<label>支付方名称：</label><span>{{showData(payerList[i].billName)}}</span>
						</li>
						<li>
							<label>经济性质：</label><span>{{showData(commonData.billEconomicNatureId[payerList[i].billEconomicNatureId])}}</span>
						</li>
						<li>
							<label>主管部门：</label><span>{{showData(payerList[i].competentDepartment)}}</span>
						</li>
						<li>
							<label>姓名：</label><span>{{showData(payerList[i].contactName)}}</span>
						</li>
						<li>
							<label>手机：</label><span>{{showData(payerList[i].contactMobile)}}</span>
						</li>
						<li>
							<label>电话：</label><span>{{showData(payerList[i].contactTelephone)}}</span>
						</li>
						<li>
							<label>传真：</label><span>{{showData(payerList[i].contactFax)}}</span>
						</li>
					</ul>
				</div>
				<!--<div class="isActive" v-if="payerList.length==0">-->
					<!--暂无信息-->
				<!--</div>-->
        <div class="noData" v-if="payerList.length==0">暂无数据</div>
			</div>
		</div>
		<!--合同附件信息-->
		<div class="file-title title">
			<div class="top fw600">
				<span>合同附件信息<i class="iconfont icon-zichanguimohefanwei fl"></i></span>
			</div>
			<div class="content fileCont">
				<ul v-if="contractDocList.length!='0'">
					<li v-for="(item,i) in contractDocList" :key="i">
						<span>{{contractDocList[i].fileName}}</span>
						<a class="underlineCommon" @click="downFile(contractDocList[i].id)">下载</a>
					</li>
				</ul>
        <div class="noData" v-if="contractDocList.length==0">暂无数据</div>
			</div>
		</div>
		<!--立项申请信息-->
		<div class="approval-title title">
			<div class="top fw600">
				<span>立项申请信息<i class="iconfont icon-lixiangshenqingxinxi fl"></i></span>
			</div>
			<div class="content">
				<ul class="textIndet">
					<li>
						<label>主要风险评估：</label><span>{{showData(projectMessage.majorRisk)}}</span>
					</li>
					<li>
						<label>项目组人员专业胜任能力及独立性：</label><span>{{showData(projectMessage.teamCapibility)}}</span>
					</li>
					<li>
						<label>重点难点问题：</label><span>{{showData(projectMessage.mainProblem)}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import tableTree from "@/components/tableTree.vue";
	export default {
		name: "projectmessage",
		components: {
			tableTree
		},
		data() {
			return {
				//项目基本信息
				projectMessage: "",
				datalist: "",
				clientList: "",
				payerList: "",
				commonData: window.commonData,
				assessObj: "",
				columns: [{
						text: "项目名称",
						dataIndex: "projectName",
						type: "text",
            width: '320'
					},
					{
						text: "项目负责人",
						dataIndex: "leaderUserNames",
						type: "text"
					},
          {
            text: "项目编号",
            dataIndex: "projectNumber",
            type: "text"
          }
				],
				dataSource: [],
				isShowTreeTable: true,
				contractDocList: ""
			};
		},
		created() {
//			console.log(this.contractDocList.length);
		},
		mounted() {
			var _this = this;
			this.$http
				.post("/api/projectRequest/setupFindProjectInfo", {
					projectId: this.$store.state.projectId,
					auditStatus: this.$store.state.auditStatus
				})
				.then(function(data) {
					_this.clientList = data.data.otherCompanyInfoList;
					_this.payerList = data.data.projectPayerList;
					_this.projectMessage = data.data.project;
					if(_this.projectMessage.assessmentTargetDetails) {
						_this.assessObj =
							"(" + _this.projectMessage.assessmentTargetDetails + ")";
					} else {
						_this.assessObj = "";
					}
					_this.datalist = data.data;
					_this.dataSource = data.data.subProjectList;
					_this.contractDocList = data.data.contractDocList;
					_this.$store.state.ifRevoke = data.data.projectSetupRequest.setupAuditStatus;
					_this.$store.state.isShowAudit = data.data.isShowAudit;
					_this.$store.state.isYyzxzr = data.data.isYyzxzr;
					_this.$store.state.projectInfo.setupAuditStatus = data.data.projectSetupRequest.setupAuditStatus;
					_this.$store.state.projectInfo.projectStatus = data.data.project.projectStatus;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		methods: {
		  //回显数据
		  showData(data){
		    return data ? data : '--'
      },
      showDataNull(data){
		    return data == 'null' ? '--' : data
      },
			showDataUndefind(data){
			  return data == 'undefind' ? '--' : data
			},
			//回显处理项目中的是和否选项
			isFun(item) {
				var ismsg = "";
				switch(item) {
					case 1:
						ismsg = "是";
						break;
					case 0:
						ismsg = "否";
						break;
					case "":
						ismsg = "";
						break;
					case "1":
						ismsg = "是";
						break;
					case "0":
						ismsg = "否";
						break;
				}
				return ismsg;
			},
			downFile(id) {
				var _this = this;
				for(var i in this.contractDocList) {
					if(this.contractDocList[i].id == id) {
						window.location.href =
							"/api/file/downloadFile?token=" +
							this.$getCookie("token") +
							"&docsName=" +
							this.$filename(this.contractDocList[i].fileName) +
							"&alyPath=" +
							this.contractDocList[i].filePath +
							"&flag=" +
							2;
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.projectmessage-zlpg-content {
		padding:15px 15px 12px;
		/*border-bottom: 1px solid #ECECEC;*/
		.title {
			border: 1px solid rgba(229, 229, 229, 1);
			margin-bottom: 12px;
			/*font-weight: 600;*/
			&:last-child{ margin-bottom:0;}
      /deep/ .el-table__empty-block{
        padding: 15px 20px;
        width: 100% !important;
        box-sizing: border-box;
        .el-table__empty-text{
          height: 100px;
          line-height: 180px;
          text-align: center;
          font-size: 13px;
          color: #909090;
          background: url(../../../assets/common/nodata.png) no-repeat center;
        }
      }
		}
		.content.jqpadding {
			padding: 15px 20px;
		}
		.milestone-title {
			height: auto;
			.milestone-item {
				background: rgba(249, 249, 249, 1);
				margin-bottom: 15px;
				ul {
					padding: 10px 24px;
				}
				li {
					width: 50%;
					line-height: 33px;
				}
				li:first-child {
					width: 100%;
				}
			}
      .milestone-item:last-child{margin-bottom: 0}
			.content {
				padding: 16px 18px;
			}
		}
		.plan-title {
			height: 230px;
		}
		.content {
			font-size: 13px;
			line-height: 25px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			overflow: hidden;
			padding: 28px 40px;
			ul {
				overflow: hidden;
				li {
					float: left;
					width: 50%;
					margin-bottom: 3px;
					label {
						float: left;
						color: #777777;
					}
					span {
						float: left;
						color: #1D1C1E;
						display: inline-block;
						word-wrap:break-word;
					}
					.specialMsg {
						width: 70%;
					}
					.specialMsg1 {
						width: 66%;
					}
				}
				.width0 {
					width: 100%;
				}
			}
			.textIndet {
				overflow: hidden;
    		li{
    			float: left;
					margin-bottom: 8px;
    			label {
    				width: 100%;
						float: left;
						color: #505050;
					}
					span {
						float: left;
						color: #1D1C1E;
						display: inline-block;
						text-indent: 12px;
					}
    		}

			}
			.subproject {
				/deep/ .el-table th,
				.el-table tr {
					background: #f4f4f4;
					padding: 3px 0;
					text-align: center;
					.cell {
						font-size: 13px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(38, 38, 40, 1);
					}
				}
			}
			.isActive {
				text-align: center;
				color: #909399;
				font-size: 13px;
			}
      .noData{
        height: 100px;
        line-height: 180px;
      }
		}
		.approval-title {
			.content {
				li {
					width: 100%;
				}
			}
		}
		.fileCont {
      padding: 15px 20px;
			ul {
				border: 1px dashed #dcdcdc;
				padding: 0 66px;
				li {
					width: 100%;
					a {
						float: right;
						color: #5fa9ec;
						cursor: pointer;
					}
				}
			}
		}
		.top {
			background: rgba(246, 250, 255, 1);
			height: 30px;
			line-height: 30px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			font-size: 13px;
		}
		.iconfont {
			font-size: 13px;
			margin-right: 10px;
			margin-left: 20px;
		}
		.icon-xiangmuxinxi {
			color: #f7b543;
			font-weight: normal;
		}
		.icon-zichanguimohefanwei {
			color: #98c268;
			font-weight: normal;
		}
		.icon-weituofangxinxi {
			color: #7c9fee;
			font-weight: normal;
		}
		.icon-pinggufeizhifufangxinxi {
			color: #57bfb2;
			font-weight: normal;
		}
		.icon-lixiangshenqingxinxi {
			color: #7c9fee;
			font-weight: normal;
		}
	}
</style>
