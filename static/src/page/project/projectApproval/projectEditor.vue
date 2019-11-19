<template>
	<div class="projectEditor-zlpg-content clear">
		<div class="projectEditor-header">
			<div class="tab-content">
				<el-tabs class="tab-top" v-model="activeName1" @tab-click="handleClick">
					<i class="iconfont icon-xiangmuxinxi"></i>
					<el-tab-pane name="first">
						<span class="first-tab-pane" slot="label">项目信息</span>
						<el-scrollbar class="el-scrollbar" :style="{height:height}">
							<projecteditormessage></projecteditormessage>
						</el-scrollbar>
					</el-tab-pane>
					<el-tab-pane label="独立性自查" name="second">
						<el-scrollbar class="el-scrollbar" :style="{height:height}">
							<projecteditorindependent></projecteditorindependent>
						</el-scrollbar>
					</el-tab-pane>
					<el-tab-pane label="项目计划" name="third">
						<el-scrollbar class="el-scrollbar" :style="{height:height}">
							<projecteditorplan></projecteditorplan>
						</el-scrollbar>
					</el-tab-pane>
					<el-tab-pane label="项目预算" name="fourth">
						<el-scrollbar class="el-scrollbar" :style="{height:height}">
							<projecteditorbudget></projecteditorbudget>
						</el-scrollbar>
					</el-tab-pane>
					<el-tab-pane label="项目编号" name="fifth" v-if="$store.state.isEditorPerson == '1'">
						<el-scrollbar class="el-scrollbar" :style="{height:height}">
							<projectnumber></projectnumber>
						</el-scrollbar>
					</el-tab-pane>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import projecteditorindependent from './projectEditor/projectEditorIndependent';
	import projecteditorplan from './projectEditor/projectEditorPlan';
	import projecteditorbudget from './projectEditor/projectEditorBudget';
	import projecteditormessage from './projectEditor/projectEditorMessage';
	import projectnumber from "./projectEditor/projectEditorNumber";
	export default {
		name: 'projectEditor',
		data() {
			return {
				activeName1: 'first',
				height: ''
			};
		},
		created() {
			this.height = window.innerHeight - 136 + 'px';
		},
		components: {
			projecteditorindependent,
			projecteditorplan,
			projecteditorbudget,
			projecteditormessage,
			projectnumber
		},
		methods: {
			handleClick(tab, event) {
				//				console.log(tab);
			},
			childMethod() {
				var _this = this;
				var projectRuls = this.$store.state.projectRuls;
				var independentRuls = this.$store.state.independentRuls;
				var planRuls = this.$store.state.planRuls;
				var milepostRuls = this.$store.state.milepostRuls;
				var personRuls = this.$store.state.personRuls;
				var travelRuls = this.$store.state.travelRuls;
				//	      		console.log(projectRuls);
				//项目基本信息必填项限制
//				for(var i in this.projectRuls) {
//					//	      			|| this.projectRuls[i] == undefined
//					if(this.projectRuls[i] == '') {
//						this.$message({
//							showClose: true,
//							message: '请填写项目基本信息的必填项!',
//							type: 'error'
//						});
//						this.$messageError('请填写项目基本信息的必填项！');
//						this.activeName1 = 'first';
//						return;
//					}
//				}
				//独立性自查必填项限制
				//	      		console.log(independentRuls);
        if(!projectRuls()){
          this.activeName1 = 'first';
          return _this.$messageError('请输入必填项');
        }
				for(var i in independentRuls) {
					if(independentRuls[i].answer == '') {
						this.$message({
							showClose: true,
							message: '请填写独立性自查的必填项!',
							type: 'error'
						});
						this.activeName1 = 'second';
						return;
					} else if(independentRuls[i].answer == '0') {
						this.$message({
							showClose: true,
							message: '独立性自查未能通过,请重新确认事项!',
							type: 'error'
						});
						this.activeName1 = 'second';
						return;
					}
				}
				//项目计划评估方法必填项限制
				//				console.log(planRuls);
				if(planRuls.ifAssetBasedMethod == false && planRuls.ifIncomeMethod == false && planRuls.ifMarketMethod == false) {
					this.$message({
						showClose: true,
						message: '请至少选择一个评估方法!',
						type: 'error'
					});
					this.activeName1 = 'third';
					return;
				}
				//项目计划里程碑时间必填项限制
				//				console.log(milepostRuls);
				if(milepostRuls.length) {
					for(var i in milepostRuls) {
						if(milepostRuls[i].beginDate == '' || milepostRuls[i].endDate == '') {
							this.$message({
								showClose: true,
								message: '请填写里程碑开始和结束时间!',
								type: 'error'
							});
							this.activeName1 = 'third';
							return;
						}
					}
				}
				
				//项目预算人员安排人员必填项限制
				if(personRuls.length){
					for(var i in personRuls) {
						if(personRuls[i].userName == '') {
							this.$message({
								showClose: true,
								message: '请选择人员!',
								type: 'error'
							});
							this.activeName1 = 'fourth';
							return;
						}
					}
				}
				//项目预算差旅费用必填项限制
				if(travelRuls.length){
					for(var i in travelRuls) {
						if(travelRuls[i].peopleCount == '') {
							this.$message({
								showClose: true,
								message: '请填写项目人数!',
								type: 'error'
							});
							this.activeName1 = 'fourth';
							return;
						}
					}
				}
				var setupProjectJson = JSON.stringify(_this.$store.state.setupProjectJson);
				var otherProjectJson = JSON.stringify(_this.$store.state.otherProjectJson);
				var otherCompanyJson = JSON.stringify(_this.$store.state.otherCompanyJson);
				var payerJson = JSON.stringify(_this.$store.state.payerJson);
				var contractDocJson = JSON.stringify(_this.$store.state.contractDocJson);
				var projectSelfJson = JSON.stringify(_this.$store.state.projectSelfJson);
				var selfSurveyDocsJson = JSON.stringify(_this.$store.state.selfSurveyDocsJson);
				var projectPlanJson = JSON.stringify(_this.$store.state.projectPlanJson);
				var milestonePlanJson = JSON.stringify(_this.$store.state.milestonePlanJson);
				var memberBudgetJson = JSON.stringify(_this.$store.state.memberBudgetJson);
				var travelBudgetJson = JSON.stringify(_this.$store.state.travelBudgetJson);
				var localBudgetJson = JSON.stringify(_this.$store.state.localBudgetJson);
				var requiredProjectPlan = JSON.stringify(_this.$store.state.requiredProjectPlan);
				var cache = [];
				var subProjectJson = JSON.stringify(_this.$store.state.subProjectJson, function(key, value) {
				    if (typeof value === 'object' && value !== null) {
				        if (cache.indexOf(value) !== -1) {
				            return;
				        }
				        cache.push(value);
				    }
				    return value;
				});
				//项目编号不能为空限制
				if(this.$store.state.isEditorPerson == '1'){
					var num = "";
					if(_this.$store.state.dataSource.length) {
						num = _this.$store.state.dataSource[0].projectNumber;
					}
					if(!num) {
						this.$messageError("请填写项目编号！");
						this.activeName1 = 'fifth';
						return;
					}
				}
				console.log(travelBudgetJson);
				this.$confirm('确认编辑并保存此项目?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/projectRequest/saveAllSetupProjectInfo', {
							setupProjectJson: setupProjectJson,
							otherProjectJson: otherProjectJson,
							otherCompanyJson: otherCompanyJson,
							payerJson: payerJson,
							contractDocJson: contractDocJson,
							subProjectJson: subProjectJson,
							projectSelfJson: projectSelfJson,
							selfSurveyDocsJson: selfSurveyDocsJson,
							projectPlanJson: projectPlanJson,
							milestonePlanJson: milestonePlanJson,
							memberBudgetJson: memberBudgetJson,
							travelBudgetJson: travelBudgetJson,
							localBudgetJson: localBudgetJson,
							requiredProjectPlan: requiredProjectPlan,
							projectNumber: num,
							pId: _this.$store.state.projectId
						})
						.then(function(data) {
							_this.$message({
								type: 'success',
								message: data.msg,
								showClose: true
							});
							_this.$store.state.refresh();
							_this.$store.commit('changeShowCommon');
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				}).catch(() => {
//					this.$message({
//						type: 'info',
//						message: '已取消保存',
//						showClose: true
//					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.projectEditor-zlpg-content {
		.projectEditor-header {
			.el-tabs {
				margin: 20px;
				border-radius: 2px;
				border: 1px solid rgba(236, 236, 236, 1);
			}
			.icon-xiangmuxinxi {
				color: #F7B543;
				margin-right: 10px;
				position: absolute;
				left: 25px;
				top: -33px;
				z-index: 1;
			}
		}
	}

	/deep/ .el-tabs__header {
		margin-bottom: 5px
	}

	/deep/ .el-tabs__nav-scroll {
		background: rgba(250, 250, 250, 1);
		border-radius: 2px 2px 0 0;
		padding-left: 55px
	}

	/deep/ .el-tabs__content {
		overflow: visible
	}

	/deep/ .el-scrollbar__wrap {
		overflow-y: scroll;
		overflow-x: hidden;
	}
	/deep/ .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px!important;
        background-color: #e4e7ed;
        z-index: 1;
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
</style>
