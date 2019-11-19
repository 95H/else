<template>
	<div class="projectbudget-zlpg-content projectapproval">
		<!--人员安排及费用-->
		<div class="projectbudget-item">
			<div class="personal-title title">
				<div class="top fw600">
					<span>人员安排及费用<i class="iconfont icon-renyuananpaijifeiyong fl"></i></span>
				</div>
				<div class="table" style="border-bottom: 0; padding-bottom: 0;">
					<div class="title-item"><i></i>计划人员</div>
					<el-table :data="personalData" :summary-method="getSummaries" border stripe style="width: 100%" :show-summary="showSummary">
						<el-table-column :prop="item.name" v-for="(item,index) in personalTableHead" :label="item.title" :width="item.width"
						 :key="index" :formatter="dateFormat">

						</el-table-column>
					</el-table>
				</div>
				<div class="table newTable">
					<div class="title-item"><i></i>新增人员</div>
					<el-table :data="pmData" :summary-method="getSummaries" border stripe style="width: 100%" :show-summary="showSummary">
						<el-table-column :prop="item.name" v-for="(item,index) in personalTableHead" :label="item.title" :width="item.width"
						 :key="index" :formatter="dateFormat">

						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!--差旅费用-->
		<div class="projectbudget-item">
			<div class="personal-title title">
				<div class="top fw600">
					<span>差旅费用<i class="iconfont icon-chalv- fl"></i></span>
				</div>
				<div class="table">
					<el-table :data="travelData" :summary-method="getSummaries" :dataTableHead="travelTableHead" border stripe style="width: 100%"
					 :show-summary="showSummary">
						<el-table-column :prop="item.name" v-for="(item,index) in travelTableHead" :label="item.title" :width="item.width"
						 :key="index">

						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!--本地费用-->
		<div class="projectbudget-item">
			<div class="personal-title title">
				<div class="top fw600">
					<span>本地费用<i class="iconfont icon-bendifeiyong fl"></i></span>
				</div>
				<div class="table">
					<el-table :data="localData" :dataTableHead="localTableHead" border stripe style="width: 100%" :show-summary="false">
						<el-table-column :prop="item.name" v-for="(item,index) in localTableHead" :label="item.title" :width="item.width"
						 :key="index">

						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!--项目费用总计-->
		<div class="projectbudget-item">
			<div class="personal-title title">
				<div class="top fw600">
					<span>项目费用总计<i class="iconfont icon-bendifeiyong fl"></i></span>
				</div>
				<div class="table">
					<div class="totalbox">项目费用总计：<span class="total" :style="projectTotalSum == ''?emptyStyle : ''">{{projectTotalSum == '' ? '0'+"元" : projectTotalSum+"元"}}</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "projectbudget",
		data() {
			return {
				emptyStyle: {
					color: '#000',
					'font-size': '13px'
				},
				personalData: [],
				travelData: [],
				localData: [],
				pmData: [],
				personalTableHead: [{
						title: "姓名",
						name: "userName",
						width: "60px"
					},
					{
						title: "工作内容",
						name: "jobContent",
						width: "100px"
					},
					{
						title: "开始日期",
						name: "beginDate",
						width: "100px"
					},
					{
						title: "结束日期",
						name: "endDate",
						width: "100px"
					},
					{
						title: "现场(天)",
						name: "workDaySite",
						width: "80px"
					},
					{
						title: "后期(天)",
						name: "laterStageDay",
						width: "80px"
					},
					{
						title: "日报酬标准",
						name: "averageReward",
						width: "100px"
					},
					{
						title: "劳务费金额(元)",
						name: "rewardSum",
						width: "110px"
					},
					{
						title: "新增日期",
						name: "createTime",
						width: "100px"
					},
					{
						title: "负责任务",
						name: "source",
						width: "120px"
					},
					{
						title: "添加申请人",
						name: "createName",
						width: "100px"
					}
				],
				travelTableHead: [{
						title: "人数",
						name: "peopleCount",
						width: "100px"
					},
					{
						title: "地点",
						name: "travelPlace",
						width: "128px"
					},
					{
						title: "交通类别",
						name: "travelFeeContent",
						width: "120px"
					},
					{
						title: "交通费金额(元)",
						name: "trafficFee",
						width: "120px"
					},
					{
						title: "住宿费(元)",
						name: "hotelExpense",
						width: "120px"
					},
					{
						title: "市内交通费(元)",
						name: "cityTrafficFee",
						width: "120px"
					},
					{
						title: "杂费(元)",
						name: "surdryCharge",
						width: "120px"
					},
					{
						title: "合计(元)",
						name: "total",
						width: "126px"
					}
				],
				localTableHead: [{
						title: "加班费(元)",
						name: "overTimePay",
						width: "238px"
					},
					{
						title: "本地交通费(元)",
						name: "localTrafficFee",
						width: "238px"
					},
					{
						title: "其他费用(元)",
						name: "otherFeeSum",
						width: "238px"
					},
					{
						title: "合计(元)",
						name: "total",
						width: "240px"
					}
				],
				showSummary: true,
				projectTotalSum: ""
			};
		},
		mounted() {
			var _this = this;
			this.$http
				.post("/api/project/getProjectConstInfo", {
					projectId: this.$store.state.projectId
				})
				.then(function(data) {
					_this.personalData = data.data.projectMemberBudgetList;
					_this.travelData = data.data.projectTravelBudgetList;
					_this.localData = data.data.projectLocalBudget;
					_this.projectTotalSum = data.data.projectTotalSum;
					_this.pmData = data.data.pmList;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		methods: {
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = "合计";
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						if (
							column.property == "workDaySite" ||
							column.property == "laterStageDay"
						) {
							sums[index] += "天";
						} else if (column.property == "rewardSum") {
							sums[index] += "元";
						} else if (
							column.property == "travelPlace" ||
							column.property == "averageReward" ||
							column.property == "beginDate" ||
							column.property == "endDate" ||
							column.property == "jobContent" ||
							column.property == "travelFeeContent" ||
							column.property == "source" || 
							column.property == "createTime"
						) {
							sums[index] = "";
						} else {
							sums[index] += "元";
						}
					} else {
						sums[index] = "";
					}
				});

				return sums;
			},
			dateFormat(row, column, cellValue, index) {
				console.log(cellValue);
				const dataMsg = row[column.property];
				if(column.property == "beginDate"){
					return dataMsg.slice(0,10);
				}else if(column.property == "endDate"){
					return dataMsg.slice(0,10);
				}else if(column.property == "createTime"){
					return dataMsg.slice(0,10);
				}else if(column.property == "averageReward"){
					if(dataMsg){
						return dataMsg+'元/日'
					}else {
						return ""
					}
				}else{
					return dataMsg
				}
			}
		}
	};
</script>

<style lang="scss">
	.projectbudget-zlpg-content {
		padding: 15px 15px 12px;
		/*border-bottom: 1px solid #ECECEC;*/
		.projectbudget-item {
			.title {
				margin-bottom: 12px;
			}

			&:last-child .title {
				margin-bottom: 0;
			}

			.table {
				padding: 15px 20px;
				/*padding-top: 0;*/
				border: 1px solid rgba(229, 229, 229, 1);

				.totalbox {
					text-align: center;
					line-height: 37px;

					.total {
						color: #f09237;
						font-size: 24px;
						font-weight: 600;
					}
				}

				.title-item {
					padding: 0 0 10px 0;
					color: #262628;
					font-weight: 600;			
					font-size: 13px;

					i {
						display: inline-block;
						width: 6px;
						height: 6px;
						border-radius: 50%;
						background-color: #F09237;
						margin-right: 10px;
						margin-bottom: 2px;
					}
				}
			}

			.newTable {
				border-top: 0;
			}

			.top {
				background: rgba(246, 250, 255, 1);
				border: 1px solid rgba(229, 229, 229, 1);
				font-size: 13px;
				text-align: left;
				height: 30px;
				line-height: 30px;
				border-bottom: 0;
			}

			.content {
				font-size: 13px;
				line-height: 25px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				overflow: hidden;
				padding: 15px 21px;
			}

			.iconfont {
				font-size: 13px;
				margin-right: 10px;
				margin-left: 20px;
			}

			.icon-renyuananpaijifeiyong {
				color: #57bfb2;
				font-weight: normal;
			}

			.icon-bendifeiyong {
				color: #5fa9ec;
				font-weight: normal;
			}

			.icon-chalv- {
				color: #c3a2eb;
				font-weight: normal;
			}

			.el-table {
				thead {
					tr {
						height: 32px;
						line-height: 32px;
						font-size: 13px;

						th {
							background-color: #f4f4f4;

							.cell {
								font-size: 13px;
								font-family: PingFangSC-Regular;
								font-weight: 400;
								color: rgba(38, 38, 40, 1);
							}
						}
					}
				}

				tr {
					cursor: pointer;
				}

				td,
				th {
					height: 30px;
					line-height: 30px;
					color: #6a6a6a;
					text-align: center;
					padding: 0;
					margin: 0;
				}
			}
		}

		/deep/ .el-table__empty-block {
			padding: 15px 20px;
			width: 100% !important;
			box-sizing: border-box;

			.el-table__empty-text {
				height: 100px;
				line-height: 180px;
				text-align: center;
				font-size: 13px;
				color: #909090;
				background: url(../../../assets/common/nodata.png) no-repeat center;
			}
		}
	}
</style>
