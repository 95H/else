<template>
	<div class="workinghoursQuery">
		<div class="p20 bgW" v-if="hackReset">
			<!-- 作业类型 -->
			<single-radio :singleradiooptions="pageOptions.jobClassifyType" @onradioclick="radioStateType"></single-radio>
			<!-- 状态分类 -->
			<!-- <single-radio :singleradiooptions="pageOptions.statusClassify" @onradioclick="radioStatusClassify"></single-radio> -->
			<single-checkbox :singleradiooptions="pageOptions.statusClassify" @onradioclick="radioStatusClassify"></single-checkbox>
			<!-- 任务类型 -->
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
			<button class="addReportNumber search-btn addBtnRefrsh" @click="sceneClick()" v-if='spotShow'>&nbsp; + &nbsp;新建现场任务</button>
		</div>
	</div>
</template>

<script>
	import zltable from "@/components/zltable.vue";
	export default {
		name: "spotTask",
		data() {
			return {
				hackReset: true,
				spotShow: true,
				isExternalPower: '',
				pageOptions: {
					itemsIptOptions: [{
							name: "项目名称：",
							holder: "请输入项目名称",
							key: 'projectName',
							url: '/api/fieldinvestigation/fieldInvestigationList',
							formData: {
								jobType: 1,
								jobStatus: "",
								taskType: ""
							},
							input: "",
							width: "190px"
						},
						{
							name: "承作机构：",
							holder: "请输入承作机构",
							key: 'groupName',
							input: "",
							width: "190px"
						},
						{
							name: "任务人：",
							holder: "请输入任务负责人",
							key: 'createUser',
							input: "",
							width: "190px"
						}
					],
					jobClassifyType: {
						txt: "作业类型：",
						option: [
							// {name:'全部',label:"all"},
							{
								name: "我分配的",
								label: 1
							},
							{
								name: "我作业的",
								label: 2
							}
						]
					},
					statusClassify: {
						txt: "状态分类：",
						option: [],
						optionId: [],
						optionIdOld: []
					},
					taskClassify: {
						txt: "任务类型：",
						option: [{
								name: "现场访谈",
								id: 1
							},
							{
								name: "实地调查",
								id: 2
							}
						],
						optionId: [1, 2]
					}
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName",
						width: "140"
					},
					{
						title: "负责公司",
						name: "name",
						width: "120"
					},
					{
						title: "任务类型",
						name: "jobType",
						width: "120"
					},
					{
						title: "任务人",
						name: "userName"
					},
					{
						title: "承作机构",
						name: "groupName"
					},
					{
						title: "任务内容（科目数量：个）",
						name: "content",
						width: "220"
					},
					{
						title: "状态",
						name: "taskStatus",
						_param: "taskStatusId"
					}
				],
				form: {
					projectName: "",
					groupName: "",
					headName: "",
					jobType: 1, //作頁類型
					jobStatus: "", //狀態分類
					taskType: "" //任務類型
				},
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
				dataurl: "/api/fieldinvestigation/fieldInvestigationList", //表格数据api。
			};
		},
		created() {
			let _this = this;

			//获取当前页面路径，如果是评估任务显示评估任务按钮
			if(this.$route.path == '/zlpg/task/spotTask') {
				this.spotShow = true;
			}

			//全选-状态分类
			commonOriginalData.taskStatusId.forEach(function(val, key) {
				_this.pageOptions.statusClassify.option.push({
					name: val.name.slice(0, val.name.length),
					id: val.id
				});
				_this.pageOptions.statusClassify.optionId.push(val.id);
				_this.pageOptions.statusClassify.optionIdOld.push(val.id);
			});
			this.form.jobStatus = _this.pageOptions.statusClassify.optionId.join(",");
			this.pageOptions.itemsIptOptions[0].formData.jobStatus = this.form.jobStatus;
			//console.log(this.form.jobStatus);

			//全选-任务类型
			this.form.taskType = _this.pageOptions.taskClassify.optionId.join(",");
			this.pageOptions.itemsIptOptions[0].formData.taskType = this.form.taskType;
			//console.log(this.form.taskType);
			this.$nextTick(() => {
				this.node = this.$refs.zltable.tableData;
				const tableNode = this.$refs.zltable.$el.querySelector('.zltable .el-table__body-wrapper tbody');
				const tdNodes = tableNode.getElementsByClassName('.el-table__row');
				//console.log(tdNodes);
			})
			this.$store.state.resetFun = function() {
				_this.reset()
			}

			if(JSON.parse(this.$getCookie("user"))) {
				this.isExternalPower = JSON.parse(this.$getCookie("user")).isExternal;
				if(this.isExternalPower == true) {
					this.spotShow = false;
					this.form.jobType = 2;
					this.pageOptions.itemsIptOptions[0].formData.jobType = this.form.jobType;
					this.pageOptions.jobClassifyType.option.splice(0, 1);
				}
			}

			this.$store.state.searchInfo = () => {
				this.search();
			}
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path) {
				this.pageOptions.itemsIptOptions[0].formData.projectStatus = searchCondition.jobType;
				this.form.jobType = searchCondition.jobType;
				this.pageOptions.statusClassify.optionId = searchCondition.jobStatus.split(",");
				this.pageOptions.taskClassify.optionId = searchCondition.taskType.split(",");
				this.form.jobStatus = searchCondition.jobStatus;
				this.form.taskType = searchCondition.taskType;
				this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.groupName;
				this.pageOptions.itemsIptOptions[2].input = searchCondition.headName;
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.groupName = this.pageOptions.itemsIptOptions[1].input;
				this.form.headName = this.pageOptions.itemsIptOptions[2].input;
				this.form.page = searchCondition.page;
			}
		},
		methods: {
			search() {
				this.form.singleradiooption = this.form.jobType;
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.groupName = this.pageOptions.itemsIptOptions[1].input;
				this.form.headName = this.pageOptions.itemsIptOptions[2].input;
				this.$refs.zltable.refreshPage();
			},
			reset() {
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.activity = this.pageOptions.jobClassifyType.option[0].label;
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = "";
				});
				this.form.projectName = "";
				this.form.groupName = "";
				this.form.headName = "";
				this.form.jobType = 1;
				this.pageOptions.taskClassify.optionId = [1, 2];
				this.form.taskType = "1,2";
				this.form.page = 1;
				this.pageOptions.statusClassify.optionId = this.pageOptions.statusClassify.optionIdOld.map(item => {
					return item
				});
				this.form.jobStatus = this.pageOptions.statusClassify.optionId.join(",")
				this.$refs.zltable.refreshPage();
			},
			trclick(row) {
				this.$store.commit("changeShowCommon");
				this.$store.state.commonTitle = "现场作业任务详情";
				if(row.taskStatus == "1184" && this.form.jobType == "2") { // 我作业的待接受
					this.$store.state.commonBtn = "接受"; // 第一个按钮
					this.$store.state.extraBtn = '拒绝'; //第二个按钮
				} else if(row.taskStatus == "1184" && this.form.jobType == "1") { //我分配的待接受
					this.$store.state.commonBtn = "进入项目";
				} else if(row.taskStatus == "1185" || row.taskStatus == "1186") { // 进行中已完成
					this.$store.state.commonBtn = "进入项目";
				} else if(row.taskStatus == "1187") { // 已拒绝
					this.$store.state.commonBtn = "";
				}
				if(row.fiType == 1) {
					this.$store.state.componentsType = "spotInterview"; //现场访谈
				} else if(row.fiType == 2) {
					this.$store.state.componentsType = "spotTaskInfo"; //现场勘查
				}
				this.$store.state.dataObj = row;
				this.$store.state.taskworkType = "task";
			},
			// 新建现场调查任务
			sceneClick() {
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '新建现场调查任务';
				this.$store.state.commonBtn = '分配';
				this.$store.state.componentsType = 'newFieldSurvey';
				this.$store.state.dataObj = {
					listType: "task"
				};
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				}
			},
			radioStateType(val) {
				this.form.projectName = val;
				this.form.jobType = val;
				this.pageOptions.itemsIptOptions[0].formData.jobType = val;
				this.page = 1;
				this.search();
			},
			radioStatusClassify(val, arr) {
				if(arr) {
					this.form.jobStatus = arr.join(",");
				} else if(val) {
					this.form.jobStatus = this.pageOptions.statusClassify.optionId.join(",");
				} else {
					this.form.jobStatus = "";
				}
				this.pageOptions.itemsIptOptions[0].formData.jobStatus = this.form.jobStatus;
				this.page = 1;
				this.search();
			},
			radioTaskClassify(val, arr) {
				if(arr) {
					this.form.taskType = arr.join(",");
				} else if(val) {
					this.form.taskType = this.pageOptions.taskClassify.optionId.join(",");
				} else {
					this.form.taskType = "";
				}
				this.pageOptions.itemsIptOptions[0].formData.taskType = this.form.taskType;
				this.page = 1;
				this.search();
			},
		},
		watch: {
			//判断当前路由路径，显示新建现场任务或新建评估任务
			$route(to, from) {
				if(this.$route.path == '/zlpg/task/spotTask') {
					this.spotShow = true;
				} else {
					this.spotShow = false;
				}
				//console.log(this.$route.path);
			}
		},
		components: {
			zltable
		}
	};
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
			vertical-align: top;
		}
		/deep/ .ipt-wrap {
			height: 25px;
		}
		.displayIbP {
			padding-top: 15px;
			border: 1px solid #ececec;
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
			border-left: 1px solid #ececec;
			border-right: 1px solid #ececec;
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
			border-bottom: 2px dotted rgba(236, 236, 236, 1);
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
	
	/deep/ .singeCheckbox:last-child {
		border-bottom: 2px dotted #ececec;
	}
	
	/deep/ .addTaskBtn {
		position: absolute;
		top: 5px;
		right: 22px;
	}
	
	/deep/ .addBtnRefrsh {
		width: 115px !important;
	}
</style>