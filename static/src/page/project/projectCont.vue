<template>
	<div class="projectContWrap" v-if="refresh && refreshT">
		<el-container class="projectCont_cont">
			<el-header class="projectCont_header">
				<div>
					<div class="projectCont_top clear">
						<p class="projectCont_info"><span class="project-name textOverflow1" :title="projectInfo.projectName">{{ projectInfo.projectName }}</span><span class="project-status-btn">{{ projectStatus(projectInfo.projectStatus) }}</span><span class="project-status-btn" v-if="projectInfo.projectStatus==0">作业中</span></p>
						<el-row class="projectCont_btn">
							<!--<el-dropdown trigger="click">
									<el-button type="primary" size="mini" class="projectCont_newBuildBtn"> + 新建</el-button>
									<el-dropdown-menu slot="dropdown" class="newprojectSele">
											<el-dropdown-item @click.native="fieldSurvey">现场调查任务</el-dropdown-item>
											<el-dropdown-item @click.native="evaluationWork">评估作业任务</el-dropdown-item>
											<el-dropdown-item>变更申请</el-dropdown-item>
									</el-dropdown-menu>
							</el-dropdown>-->
							<div class="marginLeft10 search-btn fl" @click="submit" v-if="$store.state.projectInfo.projectStatus == '0' && $store.state.isCreatePerson == '1' && ($store.state.projectInfo.setupAuditStatus == '' || $store.state.projectInfo.setupAuditStatus == '1077' || $store.state.projectInfo.setupAuditStatus == '1068' || $store.state.projectInfo.setupAuditStatus == '1070') && $store.state.isEdit == 'yes'">立项</div>
							<!--<div @click="editorProject">编辑</div>-->
							<div class="search-btn fl" @click="junctionApply" v-if="show">结项</div>
							<div class="search-btn el-button--warning fl" @click="delProject()" v-if="$store.state.projectInfo.projectStatus == 0 && $store.state.isCreatePerson == '1' && ($store.state.projectInfo.setupAuditStatus == '' || $store.state.projectInfo.setupAuditStatus == '1077' || $store.state.projectInfo.setupAuditStatus == '1070' || $store.state.projectInfo.setupAuditStatus == '1068') && $store.state.isEdit == 'yes'">删除</div>
							<div class="search-btn fl" @click="revoke()" v-if="$store.state.isCreatePerson == '1' && $store.state.projectInfo.setupAuditStatus == '1076'">立项撤销</div>
							<div class="search-btn fl" @click="juncRevoke()" v-if="dataShow">结项撤销</div>
							<div class="backHome reset-btn" @click="goBack"><i class="iconfont icon-back"></i>返回</div>
						</el-row>
					</div>
					<div class="projectCont_personInto">
						<p class="projectCont_photo"></p>
						<div class="projectCont_nameL">
							<p>项目负责人：<span>{{ projectInfo.projectPersonName }}</span></p>
							<p>承作机构：<span>{{ projectInfo.groupName }}</span></p>
						</div>
						<b class="peojectCont_line"></b>
						<div class="projectCont_nameR">
							<!--<p>当前审核人：<span>{{ projectInfo.projectName }}</span></p>-->
							<p>签字评估师：<span>{{ projectInfo.signPerson }}</span></p>
							<p v-if="projectInfo.firstAuditor">项目创建人：<span>{{ projectInfo.firstAuditor }}</span></p>
						</div>
						<b class="peojectCont_line" v-if="projectInfo.secondAuditor || projectInfo.thirdAuditor"></b>
						<div class="projectCont_nameR">
							<p v-if="projectInfo.secondAuditor">复审人：<span>{{ projectInfo.secondAuditor }}</span></p>
							<p v-if="projectInfo.thirdAuditor">签发人：<span>{{ projectInfo.thirdAuditor }}</span></p>
						</div>
					</div>
				</div>
			</el-header>
			<el-footer class="projectCont_footer" v-if="setProjectSuccess">
				<ul>
					<!--<router-link tag="li" :to="'/'+item.urlPrifex+item.jump" v-for='(item,index) in imgMsg' :key='index' @click.native='Topath(index)'>
							<p><img :src='index==ind?item.icon+"1.png":item.icon+"0.png"'></p>
							<span>{{item.title}}</span>-->
					<li v-for='(item,index) in imgMsg' :key='index' @click='Topath(index,item)' :class="{'is-active':$route.path.split('/')[4] === item.functionUrl.split('/')[3]}"><!-- :to="'/zlpg'+(item.children.length>0 ? item.children[0].functionUrl:item.functionUrl)" -->
						<p><img :src='index==ind?item.iconClass+"1.png":item.iconClass+"0.png"'></p>
						<span>{{item.functionName}}</span>
					</li>
				</ul>
			</el-footer>
		</el-container>
		<template v-if="setProjectSuccess">
			<router-view></router-view>
		</template>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				projectInfo: {},
				projectId: '',
				setProjectSuccess:false,
				show: false,
				dataShow: false,
				ind: 0,
				imgMsg: {},
				// [{
				// 		path: "/zlpg/project/projectCont/projectInformation",
				// 		pic: "/static/img/project_zhxx0.png",
				// 		piced: "/static/img/project_zhxx1.png",
				// 		desc: "综合信息"
				// 	},
				// 	//          {
				// 	//          path: "/zlpg/projectCont/projectBusiness",
				// 	//          pic: "../../../static/img/project_sj0.png",
				// 	//          piced: "../../../static/img/project_sj1.png",
				// 	//          desc: "商机"
				// 	//          },
				// 	//          {
				// 	//          path: "/zlpg/projectCont/projectArena",
				// 	//          pic: "../../../static/img/project_jjc0.png",
				// 	//          piced: "../../../static/img/project_jjc1.png",
				// 	//          desc: "竞技场"
				// 	//          },
				// 	{
				// 		path: "/zlpg/project/projectCont/projectApproval",
				// 		pic: "../../../static/img/project_lx0.png",
				// 		piced: "../../../static/img/project_lx1.png",
				// 		desc: "立项"
				// 	},
				// 	{
				// 		path: "/zlpg/project/projectCont/projectImplementation",
				// 		pic: "../../../static/img/project_ss0.png",
				// 		piced: "../../../static/img/project_ss1.png",
				// 		desc: "作业"
				// 	},
				// 	{
				// 		path: "/zlpg/project/projectCont/projectAuditing",
				// 		pic: "../../../static/img/project_sh0.png",
				// 		piced: "../../../static/img/project_sh1.png",
				// 		desc: "审核"
				// 	},
				// 	{
				// 		path: "/zlpg/project/projectCont/projectSchedule",
				// 		pic: "../../../static/img/project_jd0.png",
				// 		piced: "../../../static/img/project_jd1.png",
				// 		desc: "进度"
				// 	},
				// 	{
				// 		path: "/zlpg/project/projectCont/projectPersonnel",
				// 		pic: "../../../static/img/project_ry0.png",
				// 		piced: "../../../static/img/project_ry1.png",
				// 		desc: "人员"
				// 	},
				// 	{
				// 		path: "/zlpg/project/projectCont/projectWorkinghours",
				// 		pic: "../../../static/img/project_gs0.png",
				// 		piced: "../../../static/img/project_gs1.png",
				// 		desc: "工时"
				// 	},
				// 	// {
				// 	// path: "/zlpg/projectCont/projectChange",
				// 	// pic: "../../../static/img/project_bg0.png",
				// 	// piced: "../../../static/img/project_bg1.png",
				// 	// desc: "变更"
				// 	// },
				// 	{
				// 		path: "/zlpg/project/projectCont/projectDistribution",
				// 		pic: "../../../static/img/project_fp0.png",
				// 		piced: "../../../static/img/project_fp1.png",
				// 		desc: "管理"
				// 	}
				// ],
				refresh: true,
				refreshT: this.$store.state.refreshT
			};
		},
		created() {
			this.imgMsg = this.$store.state.projectMenu && this.$store.state.projectMenu.child;
			this.ind = localStorage.getItem('index');
			this.getProjectInfo();
			this.initManuscript();
			this.$store.state.rememberSearchCondition = false;
		},
		mounted() {
			this.projectId = this.$store.state.projectId;
			this.$store.state.refreshProjectInfo = () => {
				this.getProjectInfo();
			}
		},
		methods: {
			getProjectInfo() { //获取项目信息
				let _this = this;
				_this.$http.post("/api/project/getProjectInfo",{projectId: _this.$store.state.projectId}).then(function(data) {
					
					_this.projectInfo = data.data;
					_this.$store.state.projectInfo = data.data;
					//避免外审刷新页面时，值被覆盖
          if(!/underLineSubmit/g.test(_this.$route.path)){
            _this.$store.state.investorId = data.data.investorId;
		  }
					_this.$store.state.isCreatePerson = data.data.isCreatePerson;
					_this.$store.state.taskId = data.data.taskId;
					_this.$store.state.setupAuditStatus = data.data.setupAuditStatus;
					_this.$store.state.isEdit = data.data.isEdit;
					_this.show = _this.$store.state.projectInfo.isJutions;
					_this.dataShow = _this.$store.state.projectInfo.isView;
					_this.$store.state.projectStatus = data.data.projectStatus;
					_this.$store.state.isYyzxzy = data.data.isYyzxzy;
					_this.$setCookie('projectInfo', JSON.stringify(data.data), 24 * 60 * 60);
					_this.$store.state.onlineOffline = data.data.onlineOffline;
					_this.$store.state.changeOnlineOffline = data.data.changeOnlineOffline;
					_this.setProjectSuccess=true;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
			},
			junctionApply() { //点击结项按钮
				//alert(9999);
				var _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '结项申请';
				this.$store.state.commonBtn = '提交';
				this.$store.state.componentsType = 'junctionApply';
				this.$store.state.rejunction = function() {
					_this.show = false;
				}
				this.$store.state.refresh = function() {
					_this.refresh = false; //销毁组件
					_this.$nextTick(() => {
						_this.refresh = true; //重建组件
					});
					_this.getProjectInfo();
				}

			},
			editorProject() {
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '编辑项目';
				this.$store.state.commonBtn = '保存';
				this.$store.state.componentsType = 'editorProject';
				this.$store.state.projectId = this.projectId;
				this.$store.state.refresh = function() {
					_this.refresh = false; //销毁组件
					_this.$nextTick(() => {
						_this.refresh = true; //重建组件
					});
					_this.getProjectInfo();
				}
			},
			//删除项目
			delProject() {
				var _this = this;
				this.$confirm('确认删除该项目吗?', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/projectRequest/setupDelProject', {
							projectId: this.$store.state.projectId
						})
						.then(function(data) {
							_this.$message({
								showClose: true,
								type: 'success',
								message: '删除成功!'
							});
							_this.$router.push({
								path: '/zlpg/project'
							});
						})
						.catch(function(error) {
							_this.$messageError(error);
						});

				}).catch(() => {});
			},
			//提交项目
			submit() {
				var _this = this;
				this.$confirm('确认提交本次立项申请?', '提示', {
					confirmButtonText: '确认提交',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/projectRequest/submitAudit', {
							projectId: _this.projectId
						})
						.then(function(data) {
							_this.$message({
								showClose: true,
								type: 'success',
								message: '提交成功!'
							});
							_this.getProjectInfo();
							_this.refreshT = false;
							_this.refresh = false; //销毁组件
							_this.$nextTick(() => {
								_this.refresh = true; //重建组件
								_this.refreshT = true;
							});
						})
						.catch(function(error) {
							_this.$messageError(error);
						});

				}).catch(() => {});
			},
			Topath(index,item) {
				this.ind = index;
				localStorage.setItem("index", this.ind);
				this.$router.push({
					path : '/zlpg'+(item.children.length>0 ? item.children[0].functionUrl : item.functionUrl)
				})
			},
			//撤销立项操作
			revoke() {
				this.$confirm('要撤销该项目的立项么？', '提示信息', {
					confirmButtonText: '确定撤销',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.revokeData();
				}).catch(() => {});
			},
			//撤销项目
			revokeData() {
				var _this = this;
				_this.$http.post("/api/projectRequest/revokeTask", {
					//项目id
					projectId: this.projectId

				}).then(function(res) {
					//console.log(999);
					_this.$message({
						showClose: true,
						type: 'success',
						message: '撤销成功!'
					});
					_this.refresh = false; //销毁组件
					_this.$nextTick(() => {
						_this.refresh = true; //重建组件
					});
					_this.getProjectInfo();
				})
			},
			//撤销结项操作
			juncRevoke() {
				this.$confirm('要撤销该项目的结项么？', '提示信息', {
					confirmButtonText: '确定撤销',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.juncRevokeData();
				}).catch(() => {});
			},
			//结项撤销项目
			juncRevokeData() {
				var _this = this;
				_this.$http.post("/api/projectfinishaudit/RevokeKnot", {
					//项目id
					projectId: this.projectId,
					//任务Id
					examTaskId: this.$store.state.examTaskId

				}).then(function(res) {
					_this.$message({
						showClose: true,
						type: 'success',
						message: '撤销成功!'
					});

					_this.$store.state.projectInfo.isRevoke = false;
					_this.show = true;
					_this.refresh = false; //销毁组件
					_this.$nextTick(() => {
						_this.refresh = true; //重建组件
					});
					_this.getProjectInfo();
				})
			},
			//返回上一页
			goBack() {
				this.$store.state.rememberSearchCondition = true;
				this.$router.push({
					path: JSON.parse(this.$getCookie("searchCondition")).dataSearchPath
				});
			},

			//初始化底稿
			initManuscript() {
				let data = {
					projectId: this.$store.state.projectId,
					showLoading: false
				}
				this.$http.post('api/reportDraft/saveDraft', data)
					.then(res => {

					})
					.catch(err => {
						this.$messageError(err);
					})
			}
		},
		computed: {
			projectStatus() {
				return function(val) {
					let valArr = ['立项中', '作业中', '已完成', '已终止', '结项中', '审核中'];
					return valArr[val];
				}
			}
		},
		watch: {
			'$store.state.refreshT' () {
				if(this.$store.state.refreshT) {
					this.getProjectInfo();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.newprojectSele {
		width: 135px;
	}

	.projectContWrap {
		position: relative;
		/deep/ .el-tabs__item {
			font-weight: normal;
		}
		.projectCont_cont {
			background: white;
			border-radius: 2px;
			border: 1px solid #ececec;
			padding: 12px 0;
			margin-bottom: 10px;
			.projectCont_header {
				height: auto !important;
				border-bottom: 1px solid rgba(236, 236, 236, 1);
				padding-bottom: 10px;
				.projectCont_top {
					margin-bottom: 10px;
					.projectCont_info {
						float: left;
						margin-top: 3px;
						width: 740px;
						>.project-name {
							float: left;
							max-width: 590px;
							font-size: 16px;
							font-family: PingFangSC-Medium;
							font-weight: 500;
							color: rgba(38, 38, 40, 1);
							line-height: 22px;
						}
						>.project-status-btn {
							margin-left: 8px;
							padding: 1px 12px;
							height: 19px;
							line-height: 19px;
							text-align: center;
							float: left;
							background: rgba(152, 194, 104, 1);
							border-radius: 10px;
							font-size: 13px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #fff;
						}
					}
					.projectCont_btn {
						float: right;
						button {
							height: 26px;
						}
						.projectCont_newBuildBtn {
							width: 135px;
						}
						.backHome {
							border: 1px solid rgba(58, 128, 236, 1);
							color: rgba(58, 128, 236, 1);
							background: #fff;
							.icon-back {
								color: #3A80EC;
								font-size: 12px;
								margin-right: 5px;
							}
						}
					}
				}
				.projectCont_personInto {
					.projectCont_photo {
						width: 52px;
						height: 52px;
						background: url(../../assets/common/blank_photo.png) center no-repeat;
						background-size: contain;
						border-radius: 50%;
						float: left;
					}
					.projectCont_nameL {
						float: left;
						margin-left: 10px;
						margin-top: 4px;
						p {
							font-size: 13px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #505050;
							height: 22px;
							line-height: 22px;
							span {
								color: #1d1c1e;
							}
						}
					}
					.peojectCont_line {
						float: left;
						width: 2px;
						height: 35px;
						background: rgba(236, 236, 236, 1);
						margin: 10px 20px;
					}
					.projectCont_nameR {
						float: left;
						margin-top: 8px;
						p {
							font-size: 13px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #505050;
							height: 22px;
							line-height: 16px;
							span {
								color: #1d1c1e;
							}
						}
					}
				}
			}
			.projectCont_footer {
				height: auto !important;
				margin-top: 10px;
				ul>li:hover {
					span {
						font-size: 13px;
						font-family: PingFangSC-Semibold;
						color: rgba(20, 95, 210, 1);
					}
				}
				ul>li {
					cursor: pointer;
					float: left;
					margin-left: 14px;
					position: relative;
					p {
						width: 56px;
						height: 15px;
						display: block;
						text-align: center;
					}
					span {
						width: 56px;
						text-align: center;
						font-size: 13px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(38, 38, 40, 1);
						line-height: 18px;
						display: inline-block;
						margin-top: 5px;
					}
				}
				ul>li.is-active:after {
					content: "";
					left: 0;
					position: absolute;
					bottom: -13px;
					background-size: 100% 100%;
					width: 52px;
					height: 5px;
					background-image: url("../../../static/img/project_triangle.png");
				}
				ul>li.is-active span {
					font-size: 13px;
					font-family: PingFangSC-Semibold;
					font-weight: 600;
					color: #145FD2;
				}
			}
		}
	}
</style>
