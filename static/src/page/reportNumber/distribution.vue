<template>
	<div class="distribution-con">
		<div class="container">
			<div class="singleRadio-container" v-if="hackReset">
				<single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
				<div class="btn-container">
					<button class="search-btn" @click="searchEvent">搜索</button>
					<button class="reset-btn" @click="resetEvent">重置</button>
				</div>
			</div>
		</div>
		<div class="table-card marginTop10">
			<zltable ref='zlTable' :dataTableHead="dataTableHead" :dataurl=dataUrl :dataSearch="form" v-on:trclick="trclick"></zltable>
		</div>
	</div>
</template>
<script>
	import PersonnelShowList from '../personnel/PersonnelShowList'
	import MultiSelection from '@/page/common/MultiSelection'
	import zltable from '@/components/zltable.vue';
	var that
	export default {
		components: {
			PersonnelShowList,
			MultiSelection,
			zltable
		},
		data() {
			return {
				//      修改后
				dataTableHead: [{
						title: "项目名称",
						name: "projectName"
					},
					{
						title: "项目编号",
						name: "projectNumber",
						width: "150"
					},
					{
						title: "项目级别",
						name: "projectLevelId",
						_param: 'projectLevelId',
						width: "80"
					},
					{
						title: "项目性质",
						name: "projectNatureId",
						_param: 'projectNatureId',
						width: "100"
					},
					//          {title: "承办单位", name: "groupName"},
					{
						title: "分配状态",
						name: "distributionStatus",
						width: "120"
					},
					{
						title: "分配时间",
						name: "distributionTime",
						width: "150"
					},
					{
						title: "签发时间",
						name: "issueTime",
						width: "150"
					}
				],
				dataUrl: '/api/reportNumAssignment/findReportDistributionList',
				form: {
					tabFlag: 'ALL',
					projectName: '',
					projectNumber: '',
					groupName: '',
					singleradiooption: 'ALL'
				},

				pageOptions: {
					/*tableOptions: [
					  {prop: 'projectName', width: 160, label: '项目名称'},
					  {prop: 'projectNumber', width: 150, label: '项目编号'},
					  {prop: 'projectLevelId', width: 100, label: '项目级别', _param: "projectLevelId"},
					  {prop: 'projectNatureId', width: 100, label: '项目性质', _param: "projectNatureId"},
					  {prop: 'groupName', width: '', label: '承办单位'},
					  {prop: 'distributionStatus', width: 100, label: '分配状态'}
					],*/
					singleRadioOptions: {
						txt: '分配状态：',
						option: [{
								name: '全部',
								label: 'ALL'
							},
							{
								name: '已分配',
								label: 'YFP'
							},
							{
								name: '未分配',
								label: 'WFP'
							},
							{
								name: '部分分配',
								label: 'BFFP'
							}
						]
					},
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key: 'projectName',
							url: '/api/reportNumAssignment/findReportDistributionList',
							formData: {
								tabFlag: 'ALL'
							},
							input: '',
							width: "194px"
						},
						{
							name: '项目编号：',
							holder: '请输入项目编号',
							input: '',
							width: "194px"
						},
						{
							name: '承办单位：',
							holder: '请输入承办单位',
							input: '',
							width: "194px"
						}
					]
				},
				count: 0,
				val: 'ALL',
				hackReset: true,
				parentDate: []
			}
		},

		created() {
			that = this;
			//      that.searchList(that.val);
			this.$store.state.searchInfo = () => {
				this.searchEvent();
			}
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
				this.pageOptions.itemsIptOptions[0].formData.tabFlag = searchCondition.singleradiooption;
				this.form.tabFlag = searchCondition.singleradiooption;
				this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
				this.pageOptions.itemsIptOptions[2].input = searchCondition.groupName;
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.projectNumber = this.pageOptions.itemsIptOptions[1].input;
				this.form.groupName = this.pageOptions.itemsIptOptions[2].input;
				this.form.singleradiooption = searchCondition.singleradiooption;
				this.form.page = searchCondition.page;
			}
		},

		methods: {
			radioEvent(val) {
				/*this.val = val;
				that.searchList(val);*/
				//修改后
				this.form.tabFlag = val;
				this.form.singleradiooption = val;
				this.pageOptions.itemsIptOptions[0].formData.tabFlag = val;
				this.searchEvent();
			},

			resetEvent() {
				this.val = 'ALL';
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = '';
				})
				this.form.tabFlag = this.val;
				this.form.singleradiooption = this.val;
				this.form.page = 1;
				this.form.projectName = "";
				this.form.projectNumber = "";
				this.form.groupName = "";
				this.$refs.zlTable.refreshPage();
				//that.searchList(this.val);
			},

			/*searchList(status, projectName = '', projectNumber = '', groupName = '') {
				let data = {
					tabFlag: status,
					projectName: projectName,
					projectNumber: projectNumber,
					groupName: groupName,
					page: this.form.page
				}
				this.showTable = false;
				this.$nextTick(() => {
					this.showTable = true; //重建组件
				});
				this.$http.post('/api/reportNumAssignment/findReportDistributionList', data)
					.then(res => {
						this.count = parseInt(res.count); // 总数
						that.parentDate = res.data;
					}).catch(err => {
						console.log(err);
					})
			},*/

			searchEvent() {
				let _options = that.pageOptions.itemsIptOptions;
				this.form.projectName = _options[0].input;
				this.form.projectNumber = _options[1].input;
				this.form.groupName = _options[2].input;
				this.$refs.zlTable.refreshPage();
			},

			getDateFormat(oldDate) {
				var date = new Date(oldDate);
				var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				return date.getFullYear() + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			},

			trclick(row) {
				let currentData = row;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '报告号分配详情';
				//按钮名称在projectProjectReportNumber中，因为需要其中返回的内容判断
				this.$store.state.componentsType = 'distributionDetails';
				this.$store.refresh = this.$refs.zlTable.refreshPage;
				this.$store.state.dataObj = {
					basic: currentData
				};
			}
		}
	}
</script>
<style scoped lang="scss">
	.distribution-con {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.container {
			border-top: none;
			.search-container {
				position: relative;
				/*padding-bottom: 35px;*/
				/deep/ .ipt-wrap {
					flex: 7;
				}
				.btn-container {
					flex: 3;
					position: absolute;
					/*top: 55px;*/
					right: 20px;
				}
			}
		}
		.multiSelection-container {
			padding: 0 20px;
		}
		/* 列表头部 */
		.list-head {
			padding-right: 20px;
			height: 35px;
			line-height: 35px;
			font-size: 13px;
			font-weight: 400;
			color: rgba(38, 38, 40, 1);
			background: rgba(249, 249, 249, 1);
			border-radius: 2px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-bottom: none;
			text-align: right
		}
		/deep/ .list-content {
			.el-table__header-wrapper thead {
				font-weight: 600;
			}
			.el-table__header-wrapper .has-gutter {
				font-weight: 600;
			}
		}
		.table-card {
			background: #fff;
			flex: 1;
			-ms-flex: 1 0 auto;
			.table-con,
			.table-comp {
				height: 100%;
				box-sizing: border-box;
			}
		}
	}
</style>