<template>
	<div>
		<div class="auditingContainer">
			<div class="projectProjectAuditing-zlpg-content zlpg-content clear" style="width:100%;">
				<div class="zlpg-content-header projectProjectAuditing-header">
					<div :class="isActive">
						<!--使用指令v-link进行导航-->
						<el-tabs v-model="activeName1">
							<!--<span class="title">立项申请</span>-->
							<el-tab-pane label="基本信息" name="first" :style="{height:'100%'}">
								<projectmessage v-if="refresh && activeName1=='first'"></projectmessage>
							</el-tab-pane>
							<el-tab-pane label="独立性自查" name="second">
								<projectindependent v-if="refresh && activeName1=='second'"></projectindependent>
							</el-tab-pane>
							<el-tab-pane label="项目计划" name="third">
								<projectplan v-if="refresh && activeName1=='third'"></projectplan>
							</el-tab-pane>
							<el-tab-pane label="项目预算" name="fourth">
								<projectbudget v-if="refresh && activeName1=='fourth'"></projectbudget>
							</el-tab-pane>
							<el-tab-pane label="审批记录" name="fifth">
								<projectapprovalhistory v-if="refresh && activeName1=='fifth'"></projectapprovalhistory>
							</el-tab-pane>
							<el-tab-pane label="项目编号" name="sixth">
								<projectnumber v-if="refresh"></projectnumber>
							</el-tab-pane>
							<a class="revoke btn search-btn" @click="revoke" v-if="$store.state.isCreatePerson !='1' && $store.state.setupAuditStatus == '1067' && $store.state.isYyzxzy == '1'">撤销</a>
							<a class="editor btn search-btn" @click="show" v-if="$store.state.isCreatePerson !='1'">编辑</a>
						</el-tabs>
					</div>
				</div>
			</div>
		</div>
		<div class="projectAudits" v-if="($store.state.sheetStatus=='1' && personFlag == '0' && auditResult != '') || ($store.state.sheetStatus=='2' && auditResult != '') || ($store.state.sheetStatus=='3' && $store.state.isShowAudit == '0' && auditResult != '')">
			<div class="box">
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
		</div>
		<div v-if="($store.state.sheetStatus=='1' && personFlag == '1' && flag == '1') || ($store.state.sheetStatus=='1' && personFlag == '0' && flag == '1') || ($store.state.sheetStatus=='3' && $store.state.isShowAudit == '1' && flag == '1')" class="nav-container">
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
							<el-button class="confirm search-btn" @click="onSubmit">确认提交</el-button>
							<el-button class="cancel reset-btn" @click="cancelBtn">取消</el-button>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>
<script>
	import projectindependent from '../projectApproval/projectIndependent';
	import projectplan from '../projectApproval/projectPlan';
	import projectbudget from '../projectApproval/projectBudget';
	import projectmessage from '../projectApproval/projectMessage';
	import projectapprovalhistory from '../projectApproval/projectApprovalHistory';
	import projectnumber from '../projectApproval/projectEditor/projectEditorNumber';
	export default {
		data() {
			return {
				activeName1: 'first',
				dataShow: true,
				titleShow: false,
				form: {
					audit: '',
					idea: '',
					disagree: '',
					agree: ''
				},
				className: '',
				auditResult: '',
				refresh: true,
				isagree: '',
				returnPerson: '',
				nodeList: '',
				nodeId: '',
				collapseName: ["1"],
				height: '',
				id: this.$store.state.projectId,
				taskId: this.$store.state.taskId,
				goBackType: '',
				flag: '',
				isActive: '',
				projectTask: '',
				projectTaskid: '',
				personFlag: "", //初审人0，复审人1
			};
		},
		mounted() {
			var _this = this;
			this.getResult();
			if(this.flag == '0' && this.$store.state.isShowAudit == '0') {
				this.isActive = 'del-padding';
			} else {
				this.isActive = 'add-padding';
			}
			_this.$http.post('/api/projectRequest/getActivityInfo ', {
					projectId: this.$store.state.projectId
				})
				.then(function(data) {
					//console.log(data.data.noteList);
					_this.projectTask = data.data.noteList;
					_this.flag = data.data.flag;
					if(_this.flag == '1') {
						_this.form.audit = data.data.agree;
						_this.form.disagree = data.data.disagree;
						_this.form.agree = data.data.agree;
					}
				})
				.catch(function(error) {
					//        _this.$messageError(error);
				});

			_this.$http.post("/api/projectRequest/judgeIsYyzx")
	 			.then(function(data) {
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
		watch: {
			'collapseName' () {
				this.isActive = this.collapseName.length > 0 ? 'add-padding' : 'del-padding';
			},
			'$store.state.taskId'(newD){
				this.taskId=newD;
			}
		},
		methods: {
			radioChange(val) {
				var _this = this;
				this.isagree = val;
				if(_this.taskId != ''){
					_this.projectTaskid = _this.taskId;
				}else{
					_this.projectTaskid = _this.projectTask[0].remarks.split(',')[0];
				}
				if(this.isagree == this.form.disagree) {
					//获取审核不通过的节点
					this.$http.post('/api/projectreport/refuseRetMap', {
							taskId: _this.projectTaskid
						})
						.then(function(data) {
							_this.goBackType = data.data.goBackType;
							if(_this.goBackType == '0') {
								_this.nodeList = data.data.returnProcessTaskList;
							}
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				}
			},
			selectChange(val) {
				this.nodeId = val;
			},
			handleClick(tab, event) {
				//	        	console.log(tab, event);
			},
			show() {
				var _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '编辑立项申请';
				this.$store.state.commonBtn = '保存';
				this.$store.state.componentsType = 'projectEditor';
				this.$store.state.projectId = this.id;
				this.$store.state.refresh = function() {
					_this.activeName1 = 'first';
					_this.refresh = false; //销毁组件
					_this.$store.state.refreshT = false;
					_this.$nextTick(() => {
						_this.$store.state.refreshT = true;
						_this.refresh = true; //重建组件
					});
				};
				this.$store.state.isScroll = false;
			},
			revoke(){
				var _this = this;
				this.$confirm('确认撤销本次立项审核?', '提示', {
					confirmButtonText: '确认撤销',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/project/revokeApproval', {
							projectId: _this.id,
							taskId: _this.taskId,
							jumpNode: "usertask2",
							taskType: "AUDITOR"
						})
						.then(function(data) {
							_this.$messageSuccess(data.msg);
							_this.activeName1 = 'first';
							_this.refresh = false; //销毁组件
							_this.$store.state.refreshT = false;
							_this.$nextTick(() => {
								_this.refresh = true; //重建组件
								_this.$store.state.refreshT = true;
								_this.getResult();
								_this.dataShow = true;
								_this.form.idea="";
							});
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
			onSubmit() {
				var _this = this;
				var num = '';
				if(this.$store.state.dataSource.length) {
					num = this.$store.state.dataSource[0].projectNumber;
				}

				if(_this.taskId != ''){
					_this.projectTaskid = _this.taskId;
				}else{
					/*_this.projectTaskid = _this.projectTask[_this.projectTask.length-1].remarks.split(',')[0];*/
					_this.projectTaskid = _this.projectTask[0].remarks.split(',')[0];
					 console.log(_this.projectTaskid);
					/*_this.projectTask.forEach(function(val, key) {
						console.log(val[val.length-1]);
						_this.projectTaskid = val.remarks.split(',')[0];
	        });*/
				}


				if(!num) {
					this.$messageError('请填写项目编号！');
					return;
				} else {
					if(this.form.audit == this.form.disagree && this.goBackType == '0') {
						if(this.returnPerson == '') {
							this.$messageError('请选择退回节点！');
							return;
						}
					}
					this.$confirm('确认提交本次审核意见?', '提示', {
						confirmButtonText: '确认提交',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						//之前的审核接口
						/*this.$http.post('/api/projectRequest/auditRequest', {
								projectId: this.$store.state.projectId,
								projectNumber: num,
								majorRisk: _this.form.idea,
								setupAuditStatus: _this.form.audit,
								returnNodeId: _this.returnPerson
							})*/
							//现在的审核接口
							this.$http .post("/api/projectRequest/repeatAuditRequest", {
									projectId: _this.$store.state.projectId,
									projectNumber: num,
									majorRisk: _this.form.idea,
									setupAuditStatus: _this.form.audit,
									returnNodeId: _this.returnPerson,
									taskId: _this.projectTaskid
								})
							.then(function(data) {
								_this.$message({
									showClose: true,
									type: 'success',
									message: '提交成功!'
								});
								_this.activeName1 = 'first';
								_this.refresh = false; //销毁组件
								_this.$store.state.refreshT = false;
								_this.$nextTick(() => {
									_this.refresh = true; //重建组件
									_this.$store.state.refreshT = true;
									_this.getResult();
									_this.dataShow = false;
								});
							})
							.catch(function(error) {
								_this.$messageError(error);
							});

					}).catch(() => {
						//						_this.$message({
						//							type: 'info',
						//							message: '已取消提交'
						//						});
					});
				}

			},
			getResult() {
				var _this = this;
				this.$http.post('/api/projectRequest/getLatestAuditResults', {
						projectId: this.$store.state.projectId
					})
					.then(function(data) {
						switch(data.data.processStateId) {
							case '1069':
								_this.className = 'icon-yitongguo';
								break;
							case '1067':
								_this.className = 'icon-yitongguo';
								break;
							case '1068':
								_this.className = 'icon-yijujue';
								break;
							case '1070':
								_this.className = 'icon-yijujue';
								break;
						}
						/*if(_this.$store.state.projectInfo.flag) {
						  let key = _this.$store.state.projectInfo.jutions_auditStatus;
						  let currentNode = window.commonData.processStateId[key];
						  _this.auditResult = {
						    userName: _this.$store.state.projectInfo.userName,
						    createTime: _this.$store.state.projectInfo.createTime,
						    currentNode,
						    remarkContent: _this.$store.state.projectInfo.remarkContent
						  }
						}*/
						_this.auditResult = data.data;
						_this.$store.state.refreshProjectInfo();
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
			},
			//取消按钮
			cancelBtn() {
				if(/examineDetails/g.test(this.$route.path)){
					this.$store.commit('changeShowCommon');
				}else{

				}
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
	}
</script>
<style lang="scss" scoped>
	.auditingContainer {
		display: flex;
		box-sizing: border-box;
		padding: 10px 20px;
		background: #fff;
		.projectProjectAuditing-header {
			.el-tabs {
				border: 1px solid rgba(229, 229, 229, 1);
				position: relative;
				/deep/ .el-tabs__header {
					padding-left: 85px;
					border-bottom: 1px solid #e4e7ed;
					box-sizing: border-box;
					background-color: rgba(246, 250, 255, 1);
					margin-bottom: 0;
					.el-tabs__nav-wrap:after {
						height: 0
					}
					.el-tabs__item {
						height: 32px;
						line-height: 32px;
						font-size: 13px;
					}
					.el-tabs__item:hover {
						color: #145FD2;
					}
					.is-active {
						color: #145FD2;
						font-weight: 600;
						font-size: 13px;
					}
					.el-tabs__active-bar {
						background-color: #145FD2;
					}
				}
				/deep/ .el-tabs__header:before {
					content: "立项信息";
					display: block;
					position: absolute;
					height: 20px;
					line-height: 20px;
					left: 10px;
					top: 6px;
					font-size: 13px;
					padding-right: 10px;
					border-right: 1px solid #C8C8C8;
					cursor: text;
				}
				/deep/ .el-tabs__content {
					position: static;
					.title {
						.top {
							background-color: #fafafa;
						}
					}
				}
			}
		}
	}
	/*.nav-container{display:flex;padding-left:10px;background:#F6FAFF;height: 35px;line-height: 35px;color:rgba(38,38,40,1);font-size: 13px;}*/
	/*.titleName{padding-right: 10px;border-right: 1px solid #C8C8C8}*/
	/* .title{width:160px;height:13px;padding-right: 10px;border-right: 1px solid #C8C8C8;font-size: 13px;color:rgba(38,38,40,1);}*/

	.zlpg-content .zlpg-content-header {
		height: 100%!important;
		.el-scrollbar {
			/deep/ .el-scrollbar__wrap {
				overflow-x: hidden;
			}
		}
	}

	.add-padding {
		padding-bottom: 186px;
	}

	.del-padding {
		padding-bottom: 0;
	}

	.btn {
		position: absolute;
		right: 0;
		top: 3px;
		width: 70px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		background: rgba(58, 128, 236, 1);
		border-radius: 2px;
		border: 1px solid rgba(58, 128, 236, 1);
		color: #fff;
		font-size: 13px;
		cursor: pointer;
	}

	.editor {
		right: 10px;
	}
	.revoke {
		right: 85px;
	}
	.nav-container {
		position: fixed;
		bottom: 0px;
		width: 989px;
		padding: 0 20px;
		z-index: 9;
		border-bottom: none;
		background: rgba(255, 255, 255, 0);
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
				border-right: 1px dotted #ECECEC;
				padding: 0 20px;
				padding-top: 20px;
			}
			.ipt-container {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 10px;
				.ipt {
					width: 720px;
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
				margin: 45px 0 0 15px;
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
		/deep/ .el-tabs__nav-scroll {
			background-color: #f6faff;
		}
	}

	.projectAudits {
		width: 989px;
		position: absolute;
		bottom: 0;
		background: rgba(255, 255, 255, 1);
		margin-bottom: 15px;
		margin-left: 20px;
		.box {
			padding: 20px;
			border: 1px solid rgba(229, 229, 229, 1);
		}
		.top {
			height: 35px;
			background: #f6faff;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			line-height: 35px;
			.iconfont {
				font-size: 13px;
			}
			span {
				font-size: 13px;
			}
		}
		.content {
			border: 1px solid rgba(229, 229, 229, 1);
			border-top: 0;
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

	/deep/ .el-collapse-item__header {
		height: 10px;
		background: #F6FAFF;
	}

	/deep/ .el-collapse-item__arrow {
		margin-right: 50%;
		line-height: 10px;
	}

	/deep/ .el-collapse-item__arrow::before {
		content: '∧';
		color: #fff;
		background: #5296FF;
		padding: 0 10px;
	}

	/deep/ .el-collapse-item__arrow.is-active {
		transform: rotate(180deg);
	}

	/deep/ .nav-container .nav-style {
		height: 40px;
		line-height: 40px;
		.el-tabs__nav-scroll {
			padding-left: 20px;
		}
		/*padding-left: 20px;*/
	}

	/deep/ .warnTitle{
		color: #f00;
		margin-left: 20px;
		font-weight: bold;
		margin-bottom: 3px;
	}
</style>
