<template>
	<div class="junctions">
		<div class="container">
			<div class="singleRadio-container" v-if="hackReset">
				<single-radio :singleradiooptions="pageOptions.jobClassify" @onradioclick="radioStateEvent"></single-radio>
			</div>
			<div class="search-container">
					<ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
					<span class="txt fs13" style="width:auto;">提交时间：</span>
					<el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="marginRight20">
					</el-date-picker>
					<button class="search-btn" @click="search">搜索</button>
					<button class="reset-btn" @click="reset">重置</button>
			</div>
		</div>
		<div class="junctions-table">
			<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" @trclick="trclick"></zltable>
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
				dateArr: [],
				pageOptions: {
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key: 'projectName',
							url:'/api/projectfinishaudit/findReviewPageList',
							formData:{
								auditStatus:'DSH'
							},
							input: ''
						},
						{
							name: '申请人：',
							holder: '请输入申请人',
							key: 'createUser',
							input: ''
						}
					],
					jobClassify: {
						txt: '审核结果：',
						option: [
							// {name:'全部',label:"all"},
							{
								name: '待审核',
								label: 'DSH'
							},
							{
								name: '已审核',
								label: 'YSH'
							},
							{
								name: '全部',
								label: 'ALL'
							}
						]
					}
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName"
					},
					{
						title: "项目编号",
						name: "projectNumber",
						width: "200"
					},
					{
						title: "结项类型",
						name: "nodeTypeId",
						_param: "nodeTypeId",
						width: "120"
					},
					{
						title: "项目进度",
						name: "processStateId",
						_param: "processStateId",
						width: "120"
					},
					{
						title: "申请人",
						name: "userName",
						width: "120"
					},
					{
						title: "状态",
						name: "nowStatus",
						width: "120"
					},
					{
						title: "申请日期",
						name: "createTime",
						width: "200"
					}
				],
				form: {
					projectName: '',
					shortName: '',
					projectUserName: '',
					createStartTime: '',
					createEndTime: '',
					groupId: '',
					year: '',
					auditStatus: 'DSH'
				},
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
				dataurl: "/api/projectfinishaudit/findReviewPageList" //表格数据api。  
			};
		},
		created() {
			let _this = this;
			this.goBack();
			this.$store.state.searchInfo = ()=>{
				_this.search();
			}
		},
		methods: {
			//返回回显
			goBack(){
				let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
				if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
					this.pageOptions.itemsIptOptions[0].formData.auditStatus = searchCondition.auditStatus;
					this.form.auditStatus = searchCondition.auditStatus;
					this.pageOptions.jobClassify.value= searchCondition.auditStatus;
					this.dateArr=[searchCondition.createStartTime,searchCondition.createEndTime]
					this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
					this.pageOptions.itemsIptOptions[1].input = searchCondition.projectUserName;
					this.form.projectName = searchCondition.projectName;   //項目名称
					this.form.projectUserName = searchCondition.projectUserName;  //申请人
					this.form.createStartTime = searchCondition.createStartTime;  //申请人
					this.form.createEndTime = searchCondition.createEndTime;  //申请人
					this.form.page = searchCondition.page;
				}
			},
			search() {
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.projectUserName = this.pageOptions.itemsIptOptions[1].input;
				this.form.createStartTime = this.dateArr && this.dateArr[0] ? this.dateArr[0] : '';
				this.form.createEndTime = this.dateArr && this.dateArr[1] ? this.dateArr[1] : '';
				this.$refs.zltable.refreshPage();
			},
			reset() {
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.form.auditStatus = this.pageOptions.jobClassify.option[0].label;
				this.pageOptions.jobClassify.value= "";
				this.form.page = 1;
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = '';
				});
				this.dateArr = [];
				this.search();
			},
			trclick(row) {
				let _this = this;
				this.$store.state.projectId = row.projectId;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '结项审核';
				this.$store.state.commonBtn = '进入项目';
				this.$store.state.componentsType = 'junctionsInfo';
				this.$store.state.dataObj = row;
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				}
			},
			radioStateEvent(val) {
				this.form.auditStatus = val;
				this.pageOptions.itemsIptOptions[0].formData.auditStatus = val;
				this.page = 1;
				this.search();
			}
		},
		components: {
			zltable
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.junctions{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
		.junctions-table {
			margin-top: 10px;
			background: #fff;
			flex: 1;
			-ms-flex:1 0 auto;
			.table-comp {
				height: 100%;
				box-sizing: border-box;
			}
		}
		
	/deep/ .searchInp {
		width: 156px !important;
	}
	
</style>