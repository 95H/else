<template>
	<div class="workinghoursQuery">
		<div class="p20 bgW" v-if="hackReset">
			<!-- 作业类型 -->
			<single-radio :singleradiooptions="pageOptions.jobClassify" @onradioclick="radioStateEvent"></single-radio>
			<!-- 状态分类 -->
			<!-- <single-radio :singleradiooptions="pageOptions.statusClassify" @onradioclick="radioStatusClassify"></single-radio> -->
			<single-checkbox :singleradiooptions="pageOptions.statusClassify" @onradioclick="radioStatusClassify"></single-checkbox>
			<!-- 资产类型 -->
			<!-- <single-radio :singleradiooptions="pageOptions.taskClassify" @onradioclick="radioTaskClassify"></single-radio> -->
			<single-checkbox :singleradiooptions="pageOptions.taskClassify" @onradioclick="radioTaskClassify"></single-checkbox>
		</div>
		<div class="p20 displayIbP container">
			<ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
			<div class="btnFr">
				<button class="search-btn" @click="search">搜索</button>
				<button class="reset-btn" @click="reset">重置</button>
			</div>
		</div>
		<div class="workingHoursList-table">
			<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" @trclick="trclick"></zltable>
		</div>

		<div class="addTaskBtn">
			<button class="search-btn addBtnRefrsh" @click="assessTrclick()" v-if='assessShow'>&nbsp;+ &nbsp;新建评估任务</button>
		</div>
	</div>
</template>

<script>
	import zltable from '@/components/zltable.vue';
	export default {
		name: 'assessTask',
		data() {
			return {
				hackReset: true,
				assessShow: false,
				isExternalPower: '',
				pageOptions: {
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key: 'projectName',
							url: '/api/jobassignment/findJobList',
							formData: {
								taskType: 1,
								taskStatus: '',
								jobType: '',
							},
							input: ''
						},
						{
							name: '任务人：',
							holder: '请输入任务负责人',
							key: 'createUser',
							input: ''
						},
						{
							name: '承作机构：',
							holder: '请输入承作机构',
							key: 'groupName',
							input: ''
						}
					],
					jobClassify: {
						txt: '作业类型：',
						option: [
							// {name:'全部',label:"all"},
							{
								name: '我分配的',
								label: 1
							},
							{
								name: '我作业的',
								label: 2
							}
						]
					},
					statusClassify: {
						txt: '状态分类：',
						option: [],
						optionId: [],
						optionIdOld: []
					},
					taskClassify: {
						txt: '资产类型：',
						option: [],
						optionId: [],
						optionIdOld: []
					}
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName"
					},
					{
						title: "任务人",
						name: "projectLeaderUserName",
						width: "120",
						dataType: 'object'
					},
					{
						title: "承作机构",
						name: "groupName",
						width: "120"
					},
					{
						title: "状态",
						name: "taskStatus",
						_param: "taskStatusId",
						width: "120"
					},
					{
						title: "资产类型",
						name: "jobType",
						_param: "jobTypeId",
						width: "120"
					},
					{
						title: "负责公司",
						name: "companyName",
						dataType: "Array"
					}
				],
				form: {
					taskType: 1,
					taskStatus: '',
					jobType: '',
					projectName: '',
					taskUserName: '',
					headName: ''
				},
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
				dataurl: "/api/jobassignment/findJobList" //表格数据api。
			};
		},
		created() {
			let _this = this;
			//获取当前页面路径，如果是评估任务显示评估任务按钮
			if(this.$route.path == '/zlpg/task/assessTask') {
				this.assessShow = true;
			}

			//全选-状态分类
			commonOriginalData.taskStatusId.forEach(function(val, key) {
				//console.log(val);
				if(val.name != '已拒绝') {
					_this.pageOptions.statusClassify.option.push({
						name: val.name,
						id: val.id
					}, )
					_this.pageOptions.statusClassify.optionId.push(val.id);
					_this.pageOptions.statusClassify.optionIdOld.push(val.id);
				}

			})
			this.form.taskStatus = _this.pageOptions.statusClassify.optionId.join(',');
			this.pageOptions.itemsIptOptions[0].formData.taskStatus = this.form.taskStatus;
			//console.log(this.nature);

			//全选-资产类型
			commonOriginalData.jobTypeId.forEach(function(val, key) {
				//console.log(val);
				_this.pageOptions.taskClassify.option.push({
					name: val.name,
					id: val.id
				}, )
				_this.pageOptions.taskClassify.optionId.push(val.id);
				_this.pageOptions.taskClassify.optionIdOld.push(val.id);
			})
			this.form.jobType = _this.pageOptions.taskClassify.optionId.join(',');
			this.pageOptions.itemsIptOptions[0].formData.jobType = this.form.jobType;
			//console.log(this.level);

			if(JSON.parse(this.$getCookie("user"))) {
				this.isExternalPower = JSON.parse(this.$getCookie("user")).isExternal;
				if(this.isExternalPower == true) {
					this.assessShow = false;
					this.form.taskType = 2;
					this.pageOptions.itemsIptOptions[0].formData.taskType = this.form.taskType;
					this.pageOptions.jobClassify.option.splice(0, 1);
				}
			}
			this.$store.state.searchInfo = () => {
				this.search();
			}
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path) {
				this.pageOptions.itemsIptOptions[0].formData.taskType = searchCondition.taskType;
				this.form.taskType = searchCondition.taskType;
				this.pageOptions.statusClassify.optionId = searchCondition.taskStatus.split(",");
				this.pageOptions.taskClassify.optionId = searchCondition.jobType.split(",");
				this.form.taskStatus = searchCondition.taskStatus;
				this.form.jobType = searchCondition.jobType;
				this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.headName;
				this.pageOptions.itemsIptOptions[2].input = searchCondition.taskUserName;
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.headName = this.pageOptions.itemsIptOptions[1].input;
				this.form.taskUserName = this.pageOptions.itemsIptOptions[2].input;
				this.form.page = searchCondition.page;
			}
		},
		methods: {
			search() {
				this.form.singleradiooption = this.form.taskType;
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.headName = this.pageOptions.itemsIptOptions[1].input;
				this.form.taskUserName = this.pageOptions.itemsIptOptions[2].input;
				this.$refs.zltable.refreshPage();
			},
			reset() {
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.form.taskType = this.pageOptions.jobClassify.option[0].label;
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = '';
				})
				this.form.singleradiooption = this.form.taskType;
				this.form.projectName = "";
				this.form.headName = "";
				this.form.taskUserName = "";
				this.form.page = 1;
				this.pageOptions.statusClassify.optionId = this.pageOptions.statusClassify.optionIdOld.map(item=>{
					return item
				});
				this.pageOptions.taskClassify.optionId = this.pageOptions.taskClassify.optionIdOld.map(item=>{
					return item
				});
				this.form.taskStatus = this.pageOptions.statusClassify.optionId.join(',');
				this.form.jobType = this.pageOptions.taskClassify.optionId.join(',');
				this.$refs.zltable.refreshPage();
			},
			trclick(row) {
				//console.log(row.taskStatus);
				this.$store.state.projectId = row.projectId;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '评估作业任务详情';
				if(row.taskStatus == '1184' && this.form.taskType == 2) {
					this.$store.state.commonBtn = '开始工作';
					//this.$store.state.extraBtn = '开始工作';
				} else if(row.taskStatus == '1185' || this.form.taskType == 1) {
					this.$store.state.commonBtn = '进入项目';
				}
				this.$store.state.componentsType = 'assessTaskInfo';
				this.$store.state.dataObj = row;
			},
			radioStateEvent(val) {
				this.form.taskType = val;
				this.pageOptions.itemsIptOptions[0].formData.taskType = val;
				this.page = 1;
				this.search();
			},
			radioStatusClassify(val, arr) {
				if(arr) {
					this.form.taskStatus = arr.join(',');
				} else if(val) {
					this.form.taskStatus = this.pageOptions.statusClassify.optionId.join(',');
				} else {
					this.form.taskStatus = '';
				}
				this.pageOptions.itemsIptOptions[0].formData.taskStatus = this.form.taskStatus;
				this.page = 1;
				this.search();
			},
			radioTaskClassify(val, arr) {
				if(arr) {
					this.form.jobType = arr.join(',');
				} else if(val) {
					this.form.jobType = this.pageOptions.taskClassify.optionId.join(',');
				} else {
					this.form.jobType = '';
				}
				this.pageOptions.itemsIptOptions[0].formData.jobType = this.form.jobType;
				this.page = 1;
				this.search();
			},
			//新建评估作业任务
			assessTrclick() {
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '新建评估作业任务';
				this.$store.state.commonBtn = '';
				this.$store.state.componentsType = 'newSpotTask';
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				}
			}
		},
		watch: {
			//判断当前路由路径，显示新建现场任务或新建评估任务
			$route(to, from) {
				if(this.$route.path == '/zlpg/task/assessTask') {
					this.assessShow = true;
				} else {
					this.assessShow = false;
				}
				//console.log(this.$route.path);
			}
		},
		components: {
			zltable
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.workinghoursQuery {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.search-btn,
		.reset-btn {
			padding: 0;
			width: 70px;
			height: 25px;
			border-radius: 2px;
			font-size: 13px;
			font-weight: 400;
			cursor: pointer;
		}
		.workinghoursQuery-header-time {
			font-size: 13px;
		}
		.p20 {
			padding: 0 20px;
		}
		.btnFr {
			padding-left: 21px;
			vertical-align: top;
		}
		/deep/ .ipt-wrap {
			height: 25px;
		}
		.displayIbP {
			padding-top: 15px;
			border: 1px solid #ECECEC;
			border-top: none;
			>* {
				display: inline-block;
			}
		}
		/deep/ .workHoursTime {
			vertical-align: top;
		}
		/* 头部 */
		.bgW {
			background: #fff;
			border-left: 1px solid #ECECEC;
			border-right: 1px solid #ECECEC;
		}
		.workingHoursList-table {
			margin-top: 10px;
			background: #fff;
			flex: 1;
			-ms-flex: 1 0 auto;
			.table-comp {
				height: 100%;
				box-sizing: border-box;
			}
		}
		.singeRadio {
			height: 42px;
			border-bottom: none;
		}
		.singeRadio:last-child {
			border-bottom: 1px dotted rgba(236, 236, 236, 1);
		}
		/deep/ .ipt-container {
			float: left !important;
		}
	}
	
	/deep/ .ipt-wrap {
		.ipt-container {
			float: left !important;
			.txt,
			.el-input,
			.searchInp {
				padding-top: 0 !important;
				margin-top: 0 !important;
			}
		}
	}
	
	/deep/ .container {
		height: auto;
		background: #fff;
	}
	
	/deep/ .multiSelection-container {
		padding: 0 20px;
	}
	
	/deep/ .addTaskBtn {
		position: absolute;
		top: 5px;
		right: 18px;
	}
	
	/deep/ .singeCheckbox:last-child {
		border-bottom: 2px dotted #ececec;
	}
	
	/deep/ .addBtnRefrsh {
		width: 115px !important;
	}
	
	/deep/ .el-input {
		width: 185px !important;
	}
</style>