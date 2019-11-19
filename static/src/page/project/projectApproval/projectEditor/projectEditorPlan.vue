<template>
	<div class="center-body">
		<!--必填信息-->
		<div class="requiredInformation">
			<div class="top">
				<img src="../../../../assets/common/must.png" />
				<span>必填信息</span>
			</div>
			<div>
				<el-form :model="ruleForm" :inline="true" :show-message="false" size="mini" label-position="right" :rules="rules" ref="ruleForm" label-width="105px">
					<el-form-item label="评估方法选择：" class="modeth">
						<div>
							<el-checkbox v-model="ruleForm.ifAssetBasedMethod" class="modethLeft">资产基础法：</el-checkbox>
							<el-input class="textStyle" type="textarea" resize="none" v-model="ruleForm.assetBasedMethod" maxlength="500" placeholder="请输入资产基础法内容"></el-input>
						</div>
						<div>
							<el-checkbox v-model="ruleForm.ifIncomeMethod" class="modethLeft">收益法：</el-checkbox>
							<el-input class="textStyle" type="textarea" resize="none" v-model="ruleForm.incomeMethod" maxlength="500" placeholder="请输入收益法内容"></el-input>
						</div>
						<div>
							<el-checkbox v-model="ruleForm.ifMarketMethod" class="modethLeft">市场法：</el-checkbox>
							<el-input class="textStyle" type="textarea" resize="none" v-model="ruleForm.marketMethod" maxlength="500" placeholder="请输入市场法内容"></el-input>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!--选填信息-->
		<div class="optionalmsg">
			<div class="top">
				<img src="../../../../assets/common/optional.png" />
				<span>选填信息</span>
			</div>
			<div>
				<el-form :inline="true" size="mini" label-position="right" ref="form" :model="form" label-width="105px">
					<el-form-item label="评估对象：" :style="styleAuto">
						<el-input type="textarea" v-model="form.assessmentObjectDesc" maxlength="500" placeholder="请输入评估对象" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="评估范围：" :style="styleAuto">
						<el-input type="textarea" v-model="form.assessmentRangeDesc" maxlength="500" placeholder="请输入评估范围" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="评估目的：" :style="styleAuto">
						<el-input type="textarea" v-model="form.assessmentObjectiveDesc" maxlength="500" placeholder="请输入评估目的" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="资产分布：" :style="styleAuto">
						<el-input type="textarea" v-model="form.assessmentNature" maxlength="500" placeholder="请输入资产分布情况和特点" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="价值类型：">
						<el-input placeholder="请输入价值类型" v-model="form.valuetype"></el-input>
					</el-form-item>
					<el-form-item label="出具初稿时间：">
						<el-date-picker value-format="yyyy-MM-dd" v-model="form.firstVersionDate" type="date" placeholder="请选择完成日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="审核日期：">
						<el-date-picker value-format="yyyy-MM-dd" v-model="form.auditDate" type="date" placeholder="请选择审核日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="出报告日期：">
						<el-date-picker value-format="yyyy-MM-dd" v-model="form.reportDate" type="date" placeholder="请选择客户要求出报告日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="项目备案日期：" :style="styleAuto">
						<el-date-picker value-format="yyyy-MM-dd" v-model="form.fileDate" type="date" placeholder="请选择项目备案日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="需搜集资料：" :style="styleAuto">
						<el-input v-model="form.majorInfo" placeholder="请输入需搜集资料" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="协助配合事项：" :style="styleAuto">
						<el-input v-model="form.cooperationItem" placeholder="请输入需协助配合事项" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="外聘专家控制：" :style="styleAuto">
						<el-input v-model="form.externalExpert" placeholder="请输入外聘专家使用控制" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="项目风险控制：" :style="styleAuto">
						<el-input v-model="form.riskControl" placeholder="请输入项目主要风险及控制方法" :style="styleObj"></el-input>
					</el-form-item>
					<el-form-item label="报告出具体例：" :style="styleAuto">
						<el-input v-model="form.reportStylistic" placeholder="请输入报告出具体例" :style="styleObj"></el-input>
					</el-form-item>
					<div class="title">项目计划：</div>
					<div class="content add-client" v-for="(item , i) in projectPlan" :key="i">
						<span>{{i+1}}</span>
						<li>
							<label>{{nameArr[0]}}</label>
							<el-input v-model="item.mileStone" :readonly="item.status == '2' ? 'readonly':false" placeholder="请输入里程碑"></el-input>
						</li>
						<li>
							<label>{{nameArr[1]}}</label>
							<el-input v-model="item.mileStoneDesc" :readonly="item.status == '2' ? 'readonly':false" placeholder="请输入里程碑描述"></el-input>
						</li>
						<li style="margin-left: 5px;">
							<label>{{nameArr[2]}}</label>
							<el-date-picker value-format="yyyy-MM-dd" :readonly="item.status == '2' ? 'readonly':false" v-model="item.beginDate" type="date" placeholder="请选择开始日期" @change="beginSet(item.beginDate,i)"></el-date-picker>
						</li>
						<li style="margin-left: 25px;">
							<label>{{nameArr[3]}}</label>
							<el-date-picker value-format="yyyy-MM-dd" :readonly="item.status == '2' ? 'readonly':false" v-model="item.endDate" type="date" placeholder="请选择完成日期" @change="endSet(item.endDate,i)"></el-date-picker>
						</li>
						<a @click="deletePlan(i,item)" v-if="item.status == '1' || item.status == ''"><i class="iconfont icon-shanchu1"></i></a>
					</div>
					<div class="add" @click="addPlan()">+添加</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'projectEditorPlan',
		data() {
			return {
				beginDate:'',
				endDate:'',
				nameArr: ['里程碑：', '里程碑描述：', '开始日期：', '完成日期：'],
				styleObj: {
					width: "600px"
				},
				styleObjTexra: {
					width: "550px"
				},
				styleAuto: {
					width: "auto"
				},
				//必填项
				ruleForm: {
					ifAssetBasedMethod: '',
					assetBasedMethod: '',
					ifIncomeMethod: '',
					incomeMethod: '',
					ifMarketMethod: '',
					marketMethod: ''
				},
				ruleFormList: {},
				form: {
					firstVersionDate: '',
					auditDate: '',
					reportDate: '',
					fileDate: '',
					majorInfo: '',
					cooperationItem: '',
					externalExpert: '',
					riskControl: '',
					reportStylistic: '',
					assessmentObjectiveDesc: '',
					assessmentObjectDesc: '',
					assessmentRangeDesc: '',
					assessmentNature: '',
					valuetype: ''
				},
				formList: {},
				//里程碑
				projectPlan: [],
				projectPlanList: [],
				//必填项提示
				rules: {
					assetBasedMethod: [{
						required: true,
						message: '请输入资产基础法',
						trigger: 'blur'
					}],
					incomeMethod: [{
						required: true,
						message: '请输入收益法',
						trigger: 'blur'
					}],
					marketMethod: [{
						required: true,
						message: '请输入市场法',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			var _this = this;

		},
		mounted() {
			var _this = this;
			this.$http.post('/api/projectRequest/setupFindPlanInfo', {
					projectId: this.$store.state.projectId
				})
				.then(function(data) {
					if(data.data.projectPlan) {
						_this.formList = data.data.projectPlan;
						_this.ruleForm = { ..._this.formList
						};
						const Methodlist = ['ifAssetBasedMethod', 'ifIncomeMethod', 'ifMarketMethod'];
						Methodlist.forEach(item => _this.ruleForm[item] === "1" ? _this.ruleForm[item] = true : _this.ruleForm[item] = false);
						for(var i in _this.form) {
							_this.form[i] = _this.formList[i];
						}
						_this.form.firstVersionDate = _this.formList.firstVersionDate.slice(0, 10);
						_this.form.auditDate = _this.formList.auditDate.slice(0, 10);
						_this.form.reportDate = _this.formList.reportDate.slice(0, 10);
						_this.form.fileDate = _this.formList.fileDate.slice(0, 10);

					}

					_this.projectPlanList = data.data.projectMilestonePlanList;
					for(var i in _this.projectPlan) {
						_this.projectPlan[i] = _this.projectPlanList[i];
					}
					if(_this.projectPlanList.length) {
						for(var i in _this.projectPlanList) {
							var obj = {};
							obj.mileStone = _this.projectPlanList[i].mileStone;
							obj.mileStoneDesc = _this.projectPlanList[i].mileStoneDesc;
							obj.beginDate = _this.projectPlanList[i].beginDate.slice(0, 10);
							obj.endDate = _this.projectPlanList[i].endDate.slice(0, 10);
							obj.id = _this.projectPlanList[i].id;
							obj.status = _this.projectPlanList[i].status;
							_this.projectPlan.push(obj);
						}
					}
					_this.$store.state.milestonePlanJson = _this.projectPlan;
					_this.$store.state.milepostRuls = _this.projectPlan;
					_this.$store.state.projectPlanJson = _this.form;
					_this.$store.state.requiredProjectPlan = _this.ruleForm;
					_this.$store.state.planRuls = _this.ruleForm;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		methods: {
			//点击添加里程碑
			addPlan() {
				this.projectPlan.push(this.planListArr());
			},
			//点击删除里程碑
			deletePlan(index, item) {
				//				console.log(item); return;
				this.projectPlan.splice(index, 1);
			},
			//里程碑
			planListArr() {
				return {
					mileStone: '',
					mileStoneDesc: '',
					beginDate: '',
					endDate: '',
					status: ''
				}
			},
			//天数输入框验证提示
			inputDayChange(val) {
				var reg = /^[0-9]\d*$/;
				var num = val.split('.');
				if((this[num[0]][num[1]]) && !isNaN(this[num[0]][num[1]])) {
					if(!reg.test(this[num[0]][num[1]])) {
						this.$message({
							showClose: true,
							message: '请输入整数!',
							type: 'error'
						});
						this[num[0]][num[1]] = parseInt(this[num[0]][num[1]]);
						return;
					}
				} else if(isNaN(this[num[0]][num[1]])) {
					this.$message({
						showClose: true,
						message: '请输入整数!',
						type: 'error'
					});
					this[num[0]][num[1]] = '';
					return
				}
			},
			beginSet(val,index) {
				this.beginDate = new Date(val).getTime();
				if(this.endDate){
					if(this.beginDate > this.endDate){
						this.$messageError('开始时间不能小于完成时间，请重新选择开始时间');
						this.projectPlan[index].beginDate = '';
						return;
					}
				}
			},
			endSet(val,index){
				this.endDate = new Date(val).getTime();
				if(this.beginDate){
					if(this.beginDate > this.endDate){
						this.$messageError('完成时间不能大于开始时间，请重新选择完成时间');
						this.projectPlan[index].endDate = ''
						return;
					}
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.center-body {
		padding: 20px;
		.requiredInformation {
			min-height: 275px;
			background: rgba(255, 255, 255, 1);
			border-radius: 2px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			margin-bottom: 10px;
			.modeth {
				div {
					margin-bottom: 5px;
				}
				margin-left: 15px;
				.el-input {
					width: 500px;
					margin-left: 40px;
				}
			}
			.modethLeft {
				margin-left: 15px;
			}
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
			.textStyle {
				width: 537px;
				margin-left: 115px;
				margin-top: -53px;
			}
		}
		.optionalmsg {
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
			.add-client {
				height: 80px;
				span {
					float: left;
					height: 95px;
					width: 14px;
					background: rgba(152, 194, 104, 1);
					color: #fff;
					margin-top: -15px;
					line-height: 95px;
					text-align: center;
					font-size: 13px;
				}
			}
		}
		.cpr-input {
			top: 1px;
			right: 10px;
		}
		.content {
			width: 698px;
			background: rgba(249, 249, 249, 1);
			margin-left: 12px;
			margin-bottom: 15px;
			padding-top: 15px;
			label {
				width: 105px;
				font-size: 13px;
			}
			li {
				float: left;
				margin-bottom: 10px;
				margin-left: 13px;
			}
			li:first-child {
				margin-left: 43px;
			}
			li:nth-child(2) {
				margin-left: 17px;
			}
			/*li:nth-child(3){
				margin-left: 5px;
			}
			li:nth-child(4){
				margin-left: 42px;
			}*/
			a {
				float: right;
				margin-right: 10px;
				margin-top: -13px;
				i {
					color: #ccc;
				}
				i:hover {
					color: #F7B543;
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
			margin-left: 13px;
			margin-bottom: 10px;
		}
		.title {
			font-size: 13px;
			font-weight: 600;
			color: rgba(38, 38, 40, 1);
			margin-left: 24px;
			padding: 10px 0;
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
		min-height: 40px;
		line-height: 40px;
	}
	
	.row-bg {
		padding: 10px 0;
	}
	/deep/ .el-date-editor.el-input,
	.el-date-editor.el-select {
		width: 240px;
		font-size: 13px;
	}
</style>