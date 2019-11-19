<template>
	<div class="projectDetail-zlpg-content zlpg-content clear">
		<div class="zlpg-content-header projectDetail-header">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<i class="iconfont icon-xiangmuxinxi"></i>
				<el-tab-pane name="first">
					<span class="first-tab-pane" slot="label">基本信息</span>
					<el-scrollbar class="el-scrollbar" :style="{height:height}">
						<projectmessage v-if="activeName == 'first'"></projectmessage>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="独立性自查" name="second">
					<el-scrollbar class="el-scrollbar" :style="{height:height}">
						<projectindependent v-if="activeName == 'second'"></projectindependent>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="项目计划" name="third">
					<el-scrollbar class="el-scrollbar" :style="{height:height}">
						<projectplan v-if="activeName == 'third'"></projectplan>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="项目预算" name="fourth">
					<el-scrollbar class="el-scrollbar" :style="{height:height}">
						<projectbudget v-if="activeName == 'fourth'"></projectbudget>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="审批记录" name="fifth">
					<el-scrollbar class="el-scrollbar" :style="{height:height}">
						<projectapprovalhistory v-if="activeName == 'fifth'"></projectapprovalhistory>
					</el-scrollbar>
				</el-tab-pane>
				<el-tab-pane label="项目编号" name="sixth">
					<el-scrollbar class="el-scrollbar" :style="{height:height}">
						<projectnumber></projectnumber>
					</el-scrollbar>
				</el-tab-pane>
			</el-tabs>
			<div class="projectAudits" v-if="($store.state.sheetStatus=='1' && personFlag == '0' && auditResult != '') || ($store.state.sheetStatus=='2' && auditResult != '') || ($store.state.sheetStatus=='3' && $store.state.isShowAudit == '0' && auditResult != '')">
				<div class="top">
					<span><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
				</div>
				<div class="content">
					<div class="icon"><i class="iconfont" :class="className"></i></div>
					<ul>
						<li><label>审核人员：</label><span>{{auditResult.userName}}</span></li>
						<li><label>审核级别：</label><span>{{auditResult.currentNode}}</span></li>
						<li><label>审核时间：</label><span>{{auditResult.createTime}}</span></li>
						<li><label class="fl">审核意见：</label><span class="auditIdea" :title="auditResult.remarkContent==''?'无':auditResult.remarkContent">{{auditResult.remarkContent==''?'无':auditResult.remarkContent}}</span></li>
					</ul>
				</div>
			</div>
			<!-- $store.state.isShowAudit   0结果 1操作  -->
			<!-- auditResult  有没有审核结果的数据  -->
			<!-- personFlag  0初审 1复审  -->
			<!-- $store.state.sheetStatus  1待审核 2已审核  3全部  -->
			<!-- flag  1操作 0结果 -->
			<div v-if="($store.state.sheetStatus=='1' && personFlag == '1' && flag == '1') || ($store.state.sheetStatus=='1' && personFlag == '0' && flag == '1') || ($store.state.sheetStatus=='3' && $store.state.isShowAudit == '1' && flag == '1')" class="nav-container pa">
				<el-collapse v-model="collapseName">
					<el-collapse-item name="1">
						<div class="body">
							<div class="content">
								<div class="ipt-container container-item">
									<span class="name">审核结果：</span>
									<el-radio-group v-model="form.audit" @change="radioChange">
										<el-radio :label="form.agree">通过</el-radio>
										<el-radio :label="form.disagree">不通过</el-radio>
									</el-radio-group>
									<p class="warnTitle" v-if='titleShow'>注意：本次操作为立项复审</p>
									<el-select v-if="isagree == form.disagree && goBackType == '0'" v-model="returnPerson" placeholder="请选择退回节点" style="margin-left: 10px;" @change="selectChange">
										<el-option v-for="(item,i) in nodeList" :label="item.taskName" :key="i" :value="item.id"></el-option>
									</el-select>
								</div>
								<div class="ipt-container">
									<span class="name">审核意见：</span>
									<el-input v-model="form.idea" class="ipt ipt-50h" type="textarea"></el-input>
								</div>
							</div>
							<div class="btn-container">
								<div class="confirm search-btn" @click="onSubmit" v-if='sureData'>确认提交</div>
								<div class="confirm search-btn" @click="onSubmitData" v-else>确认提交</div>
								<div class="cancel reset-btn" @click="cancelBtn">取消</div>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
	</div>
</template>

<script>
	import projectindependent from "../project/projectApproval/projectIndependent";
	import projectplan from "../project/projectApproval/projectPlan";
	import projectbudget from "../project/projectApproval/projectBudget";
	import projectmessage from "../project/projectApproval/projectMessage";
	import projectapprovalhistory from "../project/projectApproval/projectApprovalHistory";
	import projectnumber from "../project/projectApproval/projectEditor/projectEditorNumber";
	export default {
		name: "examineInfo",
		data() {
			return {
				activeName: "first",
				sureData: false,
				row: this.$store.state.dataObj,
				form: {
					audit: "",
					idea: "",
					disagree: "",
					agree: ""
				},
				returnPerson: "",
				collapseName: ["1"],
				className: "",
				auditResult: "",
				isagree: "",
				nodeList: "",
				nodeId: "",
				height: "",
				goBackType:'',
				flag:'',
				titleShow: false,
				personFlag: "", //初审人0，复审人1
			};
		},
		mounted() {
			var _this = this;
			this.$store.state.isScroll = false;
	    this.height = (/examineDetails/g.test(this.$route.path))
	        ? window.innerHeight - 328 + "px"
	        : window.innerHeight - 150 + "px";

	    this.height = (/newApproval/g.test(this.$route.path))
	        ? window.innerHeight - 328 + "px"
	        : window.innerHeight - 150 + "px";
			//获取通过与不通过code
			this.$http
				.post("/api/projectRequest/getActivityInfo ", {
					projectId: this.row.projectId
				})
				.then(function(data) {
					_this.flag = data.data.flag;
					if(_this.flag == '1'){
						_this.form.audit = data.data.agree;
						_this.form.disagree = data.data.disagree;
						_this.form.agree = data.data.agree;
					}
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
			//获取审核结果
			this.$http
				.post("/api/projectRequest/getLatestAuditResults", {
					projectId: this.row.projectId
				})
				.then(function(data) {
					if(data.data) {
						switch(data.data.processStateId) {
							case "1069":
								_this.className = "icon-yitongguo";
								break;
							case "1067":
								_this.className = "icon-yitongguo";
								break;
							case "1068":
								_this.className = "icon-yijujue";
								break;
							case "1070":
								_this.className = "icon-yijujue";
								break;
						}
						_this.auditResult = data.data;
					}
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		created() {
			var _this = this;
			if(_this.row.auditApply){
				_this.sureData = false;
			}else{
				_this.sureData = true;
			}

			_this.$http.post("/api/projectRequest/judgeIsYyzx")
	 			.then(function(data) {
          //  初审的时候显示
					// if((data.data.isYyzxzrByTime == 1 || data.data.isYyzxzr == 1 )&& _this.row.TASK_DEF_KEY_ == "usertask2"){
					if(data.data.isYyzxzr == 1 || data.data.isYyzxzrByTime == 1) { 
						_this.personFlag  = "1"; //复审人权限
						_this.titleShow = true;
					} else {
						_this.personFlag = "0"; //初审人权限
					}
	 			})
	 			.catch(function(error) {
	 				_this.$messageError(error);
	 		});
		},
		watch:{
	    'collapseName'(){
	      this.height = this.collapseName.length>0 ? window.innerHeight-328 + "px" : window.innerHeight-150 + "px"
	    }
	  },
		methods: {
			handleClick(tab, event) {
				//				console.log(this.activeName);
			},
			 radioChange(val) {
			 	var _this = this;
			 	this.isagree = val;
			 	if(this.isagree == this.form.disagree) {
			 		//获取审核不通过的节点
			 		this.$http
			 			.post("/api/projectreport/refuseRetMap", {
			 				taskId: this.row.taskId
			 			})
			 			.then(function(data) {
			 				_this.goBackType = data.data.goBackType;
			 				if(_this.goBackType == '0'){
			 					_this.nodeList = data.data.returnProcessTaskList;
			 				}
			 			})
			 			.catch(function(error) {
			 				_this.$messageError(error);
			 			});
			 	} else if(this.isagree == this.form.agree) {
			 		_this.nodeList = "";
			 	}
			 },
			selectChange(val) {
				this.nodeId = val;
			},
			// 进入项目
			childMethod() {
				var _this = this;
				_this.$store.commit("changeShowCommon");
        _this.setProjectId(this.row.projectId);
        // 进入项目按存钮localStorage存菜单下标
        for(let i=0;i<this.$store.state.projectMenu.child.length;i++){
					if(this.$store.state.projectMenu.child[i].functionName == '审核'){
						localStorage.setItem("index", i);
					}
				}
			},
			// 撤销
			extraChildMethod(){
				var _this = this;
				this.$confirm('确认撤销本次立项审核?', '提示', {
					confirmButtonText: '确认撤销',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/project/revokeApproval', {
							projectId: _this.row.projectId,
							taskId: _this.row.taskId,
							jumpNode: "usertask2",
							taskType: "AUDITOR"
						})
						.then(function(data) {
							_this.$messageSuccess(data.msg);
							_this.$store.state.refresh();
							_this.$store.commit("changeShowCommon");
						})
						.catch(function(error) {
							_this.$messageError(error);
						});

				}).catch(() => {
//					_this.$message({
//						type: 'info',
//						message: '已取消撤销'
//					});
				});
			},
			setProjectId(id) {
				this.$store.state.projectId = id;
				this.$setCookie("projectId", id, 24 * 60 * 60);
				this.$router.push({
					path: "/zlpg/project/projectCont/projectAuditing/projectProjectAudit"
				});
			},
			onSubmit() {
				var _this = this;
				var num = "";
				if(this.$store.state.dataSource.length) {
					num = this.$store.state.dataSource[0].projectNumber;
				}
				if(!num) {
					this.$messageError("请填写项目编号！");
					return;
				} else {
					if(this.isagree == this.form.disagree && this.goBackType == '0') {
						console.log(this.nodeId);
						if(this.nodeId == "") {
							this.$messageError("请选择退回节点！");
							return;
						}
					}
					this.$confirm("确认提交本次审核意见?", "提示", {
							confirmButtonText: "确认提交",
							cancelButtonText: "取消",
							type: "warning"
						})
						.then(() => {
							this.$http   /*/projectRequest/auditRequest*/
								.post("/api/projectRequest/auditRequest", {
									projectId: _this.row.projectId,
									projectNumber: num,
									majorRisk: _this.form.idea,
									setupAuditStatus: _this.form.audit,
									returnNodeId: _this.nodeId
								})
								.then(function(data) {
									_this.$message({
										showClose: true,
										type: "success",
										message: "提交成功!"
									});
									_this.$store.state.refresh();
									_this.$store.commit("changeShowCommon");
								})
								.catch(function(error) {
									_this.$messageError(error);
								});
						})
						.catch(() => {
							//          _this.$message({
							//            type: "info",
							//            message: "已取消提交"
							//          });
						});
				}
			},
			//复审的时候调这个接口
			onSubmitData() {
				var _this = this;
				var num = "";
				if(this.$store.state.dataSource.length) {
					num = this.$store.state.dataSource[0].projectNumber;
				}
				if(!num) {
					this.$messageError("请填写项目编号！");
					return;
				} else {
					if(this.isagree == this.form.disagree && this.goBackType == '0') {
						//console.log(this.nodeId);
						if(this.nodeId == "") {
							this.$messageError("请选择退回节点！");
							return;
						}
					}
					this.$confirm("确认提交本次审核意见?", "提示", {
							confirmButtonText: "确认提交",
							cancelButtonText: "取消",
							type: "warning"
						})
						.then(() => {
							this.$http   /*/projectRequest/auditRequest*/
								.post("/api/projectRequest/repeatAuditRequest", {
									projectId: _this.row.projectId,
									projectNumber: num,
									majorRisk: _this.form.idea,
									setupAuditStatus: _this.form.audit,
									returnNodeId: _this.nodeId,
									taskId: _this.row.taskId
								})
								.then(function(data) {
									_this.$message({
										showClose: true,
										type: "success",
										message: "提交成功!"
									});
									_this.$store.state.refresh();
									_this.$store.commit("changeShowCommon");
								})
								.catch(function(error) {
									_this.$messageError(error);
								});
						})
						.catch(() => {
							//          _this.$message({
							//            type: "info",
							//            message: "已取消提交"
							//          });
						});
				}
			},
			//取消按钮
			cancelBtn() {
				this.$store.commit("changeShowCommon");
			}
		},
		components: {
			projectindependent,
			projectplan,
			projectbudget,
			projectmessage,
			projectapprovalhistory,
			projectnumber
		}
	};
</script>

<style lang="scss" scoped>
	.nav-container {
		left: 0;
		bottom: 0;
		width: 760px;
		padding: 0 20px;
		z-index: 5;
  	border-bottom: none;
		.nav-style {
			width: 100%;
			height: 35px;
			box-sizing: border-box;
			line-height: 35px;
			background: rgba(250, 250, 250, 1);
			border: 1px solid rgba(236, 236, 236, 1);
		}
		.body {
			display: flex;
			background: #fff;
			padding: 20px 10px;
			border: 1px solid #ececec;
			border-top: none;
			.content {
				border-right: 1px dotted #ececec;
				padding: 0 20px;
			}
			.ipt-container {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 10px;
				.ipt {
					width: 510px;
				}
				.ipt-25h {
					height: 25px;
				}
				.ipt-50h {
					height: 50px;
				}
				.name {
					width: 75px;
					font-size: 13px;
					font-weight: 400;
					color: rgba(104, 104, 104, 1);
					text-align: right;
				}
			}
			.container-item {
				justify-content: flex-start;
			}
			.btn-container {
				display: flex;
				flex-direction: column;
				margin: 22px 0 0 18px;
				& .confirm,
				& .cancel {
					margin: 0 0 10px 0;
					padding: 0;
					width: 70px;
					height: 25px;
				}
				.confirm {
					background: rgba(58, 128, 236, 1);
					font-size: 13px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
				}
				.cancel {
					border: 1px solid rgba(58, 128, 236, 1);
					font-size: 13px;
					font-weight: 400;
					color: rgba(58, 128, 236, 1);
				}
			}
		}
	}

	.zlpg-content-header {
		.el-tabs {
			margin: 20px;
			border-radius: 2px;
			border: 1px solid rgba(236, 236, 236, 1);
		}
		.icon-xiangmuxinxi {
			color: #f7b543;
			margin-right: 10px;
			position: absolute;
			left: 25px;
			top: -33px;
			z-index: 1;
		}
	}

	/deep/ .el-tabs__header {
		margin-bottom: 5px;
	}

	/deep/ .el-tabs__nav-scroll {
		background: rgba(250, 250, 250, 1);
		border-radius: 2px 2px 0 0;
		padding-left: 55px;
	}

	/deep/ .el-tabs__content {
		overflow: visible;
	}

	/deep/ .el-collapse-item__header {
		height: 10px;
		background: #f6faff;
	}

	/deep/ .el-collapse-item__arrow {
		margin-right: 50%;
		line-height: 10px;
	}

	/deep/ .el-collapse-item__arrow::before {
		content: "∧";
		color: #fff;
		background: #5296ff;
		padding: 0 10px;
	}

	/deep/ .el-collapse-item__arrow.is-active {
		transform: rotate(180deg);
	}

	/deep/ .nav-container .nav-style {
		height: 40px;
		line-height: 40px;
		padding-left: 10px;
	}

	/deep/ .el-scrollbar__wrap {
		overflow-y: scroll;
		overflow-x: hidden;
	}

	/deep/ .el-tabs__nav-wrap::after {
		height: 1px;
	}

	/deep/ .el-tabs__item.is-active {
		color: #145fd2;
		font-family: PingFangSC-Medium;
		font-weight: 500;
	}

	/deep/ .el-tabs__active-bar {
		background-color: #145fd2;
	}

	/deep/ .el-tabs__item {
		font-weight: normal;
	}

	/deep/ .el-tabs__item:hover {
		color: #145fd2;
	}

	.projectAudits {
		width: 760px;
		height: 136px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(229, 229, 229, 1);
		border-top: 0;
		margin-bottom: 15px;
		margin-left: 20px;
		.top {
			height: 35px;
			background: #f6faff;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-left: 0;
			border-right: 0;
			line-height: 35px;
			.iconfont {
				font-size: 13px;
			}
			span {
				font-size: 13px;
			}
		}
		.content {
			overflow: hidden;
			padding-top: 20px;
		}
		.icon-shenhejieguo {
			color: #98c268;
			margin-left: 20px;
			margin-right: 10px;
		}
		.icon-yitongguo {
			font-size: 57px;
			color: #11bf6b;
		}
		.icon-yijujue {
			color: #f76d43;
			font-size: 57px;
		}
		.icon {
			float: left;
			// display: inline-block;
			margin-left: 43px;
		}
		ul {
			overflow: hidden;
			font-size: 13px;
			li {
				float: left;
				line-height: 30px;
				margin-left: 32px;
				.auditIdea {
					display: inline-block;
					width: 500px;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			li:last-child {
				width: 100%;
			}
		}
	}

	/deep/ .el-tabs__item.is-active {
		font-weight: 700;
		color: #145FD2;
	}

	/deep/ .el-tabs__item:hover {
		color: #145FD2;
	}

	/deep/ .el-tabs__active-bar {
		background-color: #145FD2;
	}
	/deep/ .warnTitle{
		color: #f00;
		margin-left: 20px;
		font-weight: bold;
	}
</style>
