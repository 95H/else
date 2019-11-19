<template>
	<div class="projectApproval-zlpg-content zlpg-content clear">
		<div class="zlpg-content-header-item projectApproval-header ">
			<ul class="list-group-item">
				<li class="title"><span>项目立项</span></li>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane v-for="(item,index) in lxMenu" :label="item.functionName" :name="index+''" :key="index">
						<projectmessage v-if="refresh && activeName=='0' && index=='0' && refreshT"></projectmessage>
						<projectindependent v-if="refresh && activeName=='1' && index=='1' && refreshT"></projectindependent>
						<projectplan v-if="refresh && activeName=='2' && index=='2' && refreshT"></projectplan>
						<projectbudget v-if="refresh && activeName=='3' && index=='3' && refreshT"></projectbudget>
						<projectapprovalhistory v-if="refresh && activeName=='4' && index=='4' && refreshT"></projectapprovalhistory>
					</el-tab-pane>
					<el-tab-pane label="项目编号" name="sixth" v-if="$store.state.ifRevoke == '1069'">
						<projectapprovalnumber v-if="refresh && refreshT"></projectapprovalnumber>
					</el-tab-pane>
					<!-- <el-tab-pane label="独立性自查" name="second">
						<projectindependent v-if="refresh && activeName=='second' && refreshT"></projectindependent>
					</el-tab-pane>
					<el-tab-pane label="项目计划" name="third">
						<projectplan v-if="refresh && activeName=='third' && refreshT"></projectplan>
					</el-tab-pane>
					<el-tab-pane label="项目预算" name="fourth">
						<projectbudget v-if="refresh && activeName=='fourth' && refreshT"></projectbudget>
					</el-tab-pane>
					<el-tab-pane label="审批记录" name="fifth">
						<projectapprovalhistory v-if="refresh && activeName=='fifth' && refreshT"></projectapprovalhistory>
					</el-tab-pane>
					 -->
					<div class="projectAudit" v-if="auditResult != '' && $store.state.isShowAudit=='0' && refresh">
						<div class="top">
							<span class="fw600"><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
						</div>
						<div class="content clearfix">
							<div class="icon"><i class="iconfont" :class="className"></i></div>
							<ul>
								<li><label>审核人员：</label><span>{{auditResult.userName}}</span></li>
								<li><label>审核级别：</label><span>{{auditResult.currentNode}}</span></li>
								<li><label>审核时间：</label><span>{{auditResult.createTime}}</span></li>
								<li><label>审核意见：</label><span>{{auditResult.remarkContent==''?'无':auditResult.remarkContent}}</span></li>
							</ul>
						</div>
					</div>
				</el-tabs>
				<a class="editor btn search-btn" @click="show" v-if="($store.state.ifRevoke=='1077' || $store.state.ifRevoke=='1068' || $store.state.ifRevoke=='1070' || $store.state.ifRevoke=='1079' || $store.state.ifRevoke=='1081' || $store.state.ifRevoke=='') && $store.state.isCreatePerson == '1' && $store.state.isEdit == 'yes'">编辑</a>
				<a class="submit btn search-btn" @click="submitProject" v-if="($store.state.ifRevoke=='1077' || $store.state.ifRevoke=='1068' || $store.state.ifRevoke=='1070' || $store.state.ifRevoke=='1079' || $store.state.ifRevoke=='1081' || $store.state.ifRevoke=='') && $store.state.isCreatePerson == '1' && $store.state.isEdit == 'yes'">立项提交</a>
				<a class="revoke btn search-btn" @click="revokeProject" v-if="$store.state.ifRevoke=='1076' && $store.state.isCreatePerson == '1'">撤销</a>
			</ul>
		</div>
	</div>
</template>
<script>
	import projectindependent from './projectIndependent';
	import projectplan from './projectPlan';
	import projectbudget from './projectBudget';
	import projectmessage from './projectMessage';
	import projectEditor from './projectEditor';
	import projectapprovalhistory from './projectApprovalHistory';
	import projectapprovalnumber from './projectApprovalNumber'
	export default {
		data() {
			return {
				activeName: '0',
				id: this.$store.state.projectId,
				className: '',
				auditResult: {},
				refresh: true,
				refreshT: this.$store.state.refreshT,
				lxMenu : this.$store.state.projectMenu.child[localStorage.getItem('index')].children
			};
		},
		mounted() {
			var _this = this;
			_this.getResult();
		},
		methods: {
			handleClick(tab, event) {
				//	        	console.log(tab);
			},
			show() {
				var _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '编辑立项申请';
				this.$store.state.commonBtn = '保存';
				this.$store.state.componentsType = 'projectEditor';
				this.$store.state.projectId = this.id;
				this.$store.state.refresh = function() {
					_this.activeName = '0';
					_this.refresh = false; //销毁组件
					_this.$store.state.refreshT = false;
					_this.$nextTick(() => {
						_this.$store.state.refreshT = true;
						_this.refresh = true; //重建组件
					});
				};
				this.$store.state.isScroll = false;
			},
			//提交
			submitProject() {
				var _this = this;
				this.$confirm('确认提交本次立项申请?', '提示', {
					confirmButtonText: '确认提交',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/projectRequest/submitAudit', {
							projectId: _this.id
						})
						.then(function(data) {
							_this.$messageSuccess(data.msg);
							_this.activeName = '0';
							_this.refresh = false; //销毁组件
							_this.$store.state.refreshT = false;
							_this.$nextTick(() => {
								_this.$store.state.refreshT = true;
								_this.refresh = true; //重建组件
							});
						})
						.catch(function(error) {
							_this.$messageError(error);
						});

				}).catch(() => {
//					_this.$message({
//						type: 'info',
//						message: '已取消提交'
//					});
				});
			},
			//撤销
			revokeProject() {
				var _this = this;
				this.$confirm('确认撤销本次立项申请?', '提示', {
					confirmButtonText: '确认撤销',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/projectRequest/revokeTask', {
							projectId: _this.id
						})
						.then(function(data) {
							_this.$messageSuccess(data.msg);
							_this.activeName = '0';
							_this.refresh = false; //销毁组件
							_this.$store.state.refreshT = false;
							_this.$nextTick(() => {
								_this.$store.state.refreshT = true;
								_this.refresh = true; //重建组件
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
			getResult() {
				var _this = this;
				this.$http.post('/api/projectRequest/getLatestAuditResults', {
						projectId: _this.id
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
						_this.auditResult = data.data;
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
			}
		},
		components: {
			projectindependent,
			projectplan,
			projectbudget,
			projectmessage,
			projectEditor,
			projectapprovalhistory,
			projectapprovalnumber
		}
	}
</script>
<style lang="scss" scoped>
	.projectApproval-zlpg-content {
		.projectApproval-header {
			.list-group-item {
				position: relative;
				background: rgba(250, 250, 250, 1);
				font-size: 13px;
				border: 1px solid rgba(236, 236, 236, 1);
				li.title {
					float: left;
					span {
						display: inline-block;
						margin-top: 10px;
						margin-left: 20px;
						position:relative;
					}
					span:after {
						content: "";
						position: absolute;
						top:-1px;
						height: 20px;
						width: 2px;
						background: #C8C8C8;
						right:-14px;
					}
				}
				.btn {
					position: absolute;
					right: 0;
					top: 4px;
					width: 70px;
					height: 25px;
					// line-height: 25px;
					text-align: center;
					background: rgba(58, 128, 236, 1);
					border-radius: 2px;
					border: 1px solid rgba(58, 128, 236, 1);
					color: #fff;
					font-size: 13px;
					cursor: pointer;
				}
				.editor {
					right: 85px;
				}
				.submit,.revoke {
					right: 10px;
				}
				.projectAudit {
					/*width: 990px;
					height: 136px;*/
					background: rgba(255, 255, 255, 1);
					padding: 0 15px;
					padding-bottom: 15px;
					.top {
						height: 35px;
						background: #f6faff;
						border-radius: 2px 2px 0px 0px;
						border: 1px solid rgba(236, 236, 236, 1);
						line-height: 35px;
					}
					.content {
						/*overflow: hidden;*/
						padding-top: 20px;
						border: 1px solid rgba(236, 236, 236, 1);
						border-top: 0;
						padding-bottom: 15px;
					}
					.icon-shenhejieguo {
						color: #98C268;
						margin-left: 20px;
						margin-right: 10px;
					}
					.icon-yitongguo {
						font-size: 57px;
						color: #11BF6B;
					}
					.icon-yijujue {
						color: #F76D43;
						font-size: 57px;
					}
					.icon {
						float: left;
						// display: inline-block;
						margin-left: 43px;
					}
					ul {
						margin-left: 112px;
						padding-right: 10px;
						//overflow: hidden;
						li {
							width: 200px;
							float: left;
							line-height: 30px;
							label{
								color: #777777;
							}
							span {
								color: #1D1C1E;
							}
						}
						li:last-child {
							width: 100%;
						}
					}
				}
				/deep/ .el-tabs__item.is-active {
					font-weight: 600;
					color: #145FD2;
				}
				/deep/ .el-tabs__item:hover {
					color: #145FD2;
				}
			}
		}
	}

	/deep/ .el-tabs__item {
		height: 34px;
		line-height: 34px;
		font-size: 13px;
		font-weight: normal;
		color: #262628;
	}

	/deep/ .el-tabs__nav {
		margin-left: 30px;
	}

	/deep/ .el-tabs__nav-wrap::after {
		display: none;
	}
  /deep/ .el-tabs__header::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    z-index: 1;
  }

	/deep/ .el-tabs__active-bar {
		background-color: #145FD2;
		bottom: 1px;
	}

	/deep/ .el-tabs__header {
		margin: 0 0 1px;
	}
	/deep/ .el-tabs__active-bar {
		background-color: #145FD2;
	}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0
}
.clearfix {
  *zoom: 1
}
</style>
