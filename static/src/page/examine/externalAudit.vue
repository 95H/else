<template>
	<div class="examine">
		<div class="container">
			<div class="singleRadio-container" v-if="hackReset">
				<single-radio :singleradiooptions="examineResultOptions" @onradioclick="examineResultEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="selectOpinion"></ipt>
				<el-button type="primary" class="search-btn" @click="onSubmit">搜索</el-button>
				<el-button class="reset-btn" @click="resetTable">重置</el-button>
			</div>
		</div>
		<div class="table-card">
			<div class="table-con">
				<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="tableSelect" v-on:trclick="trclick"></zltable>
			</div>
		</div>
	</div>
</template>

<script>
	import zltable from '../../components/zltable.vue';
	import Public from '../../public.js'
	export default {
		name: 'examineDetails',
		data() {
			return {
				examineResultOptions: {
					txt: '审核结果',
					option: [{
							name: '待审核',
							label: '0'
						},
						{
							name: '已审核',
							label: '1'
						},
						{
							name: '全部',
							label: '2'
						},
					]
				},
				selectOpinion: [{
						name: '项目名称：',
						holder: '请输入项目名称',
						key: 'projectName',
						url:'/api/changeInvestors/findExamineList',
						formData:{
							tabFlag: "0",
						},
						input: ''
					},
					{
						name: '项目编号：',
						holder: '请输入项目编号',
						input: ''
					},
					{
						name: '项目负责人：',
						holder: '请输入申请人',
						key: 'createUser',
						input: ''
					}
				],
				tableSelect: {
					tabFlag: "0",
					projectName: '',
					projectNumber: '',
					reportNumber: '',
					applicant: ""
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName",
						width: "200px"
					},
					{
						title: "项目编号",
						name: "projectNumber",
						width: "150px"
					},
					{
						title: "项目性质",
						name: "projectNatureId",
						width: "150",
						_param: "projectNatureId"
					},
					{
						title: "项目级别",
						name: "projectLevelId",
						width: "75",
						_param: "projectLevelId"
					},
					{
						title: "项目负责人",
						name: "userName",
						width: "100"
					},
					{
						title: "状态",
						name: "auditingStatus",
						width: "120"
					},
					{
						title: "申请日期",
						name: "applyTime"
					}
				], //表头数据。title：表头的title。name：接口数据字段。
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
				dataurl: "/api/changeInvestors/findExamineList", //表格数据api。
				hackReset: true
			};
		},
		created() {
			this.defaultSelectOpinion = JSON.parse(JSON.stringify(this.$data.selectOpinion));
			this.defaultTableSelect = JSON.parse(JSON.stringify(this.$data.tableSelect));
			for(let i=0;i<this.$store.state.projectMenu.child.length;i++){
				if(this.$store.state.projectMenu.child[i].functionName == '审核'){
					localStorage.setItem("index", i);
				}
			}
			this.$store.state.searchInfo = ()=>{
				this.onSubmit();
			}
			this.goBack()
		},
		methods: {
			//返回回显
			goBack(){
				let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
				if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
					this.selectOpinion[0].formData.tabFlag = searchCondition.tabFlag;
					this.tableSelect.tabFlag = searchCondition.tabFlag;
					this.examineResultOptions.value= searchCondition.tabFlag;
					this.selectOpinion[0].input = searchCondition.projectName;
					this.selectOpinion[1].input = searchCondition.projectNumber;
					this.selectOpinion[2].input = searchCondition.applicant;
					this.tableSelect.projectName = searchCondition.projectName;   //項目名称
					this.tableSelect.projectNumber = searchCondition.projectNumber;  //項目编号
					this.tableSelect.applicant = searchCondition.applicant;  //项目负责人
					this.tableSelect.page = searchCondition.page;
				}
			},
			examineResultEvent(val) {
				this.tableSelect.tabFlag = val;
				this.selectOpinion[0].formData.tabFlag = val;
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			onSubmit() {
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			getSearchVal() {
				this.tableSelect.projectName = this.selectOpinion[0].input;
				this.tableSelect.projectNumber = this.selectOpinion[1].input;
				this.tableSelect.applicant = this.selectOpinion[2].input;
			},
			trclick(row) {
				this.$setCookie('projectId', row.id, 24 * 60 * 60);
				this.$store.state.projectId = row.id;
				this.$store.state.isfixedFlag = true;
				if(row.onlineOffline == 1){
					this.$router.push({
						path: '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOnLineAudit'
					})
				}else if(row.onlineOffline == 0){
					this.$router.push({
						path: '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOffLineAudit'
					})
				}
			},
			resetTable() {
				this.examineResultOptions.value= "";
				this.tableSelect.tabFlag=this.examineResultOptions.option[0].label;
				this.tableSelect.page = 1;
				this.hackReset = false;
				this.$nextTick(() => {
					this.hackReset = true //重建组件
				})
				this.selectOpinion.forEach(item => {
					item.input = ''
				})
				// $data用在此处，页面输入框不会置空，且vue文档中不推荐使用$data
				//this.$data.selectOpinion = Object.assign(this.$data.selectOpinion,this.defaultSelectOpinion);
				this.$data.tableSelect = Object.assign(this.$data.tableSelect, this.defaultTableSelect);
				this.$refs.zltable.refreshPage();
			}
		},
		components: {
			zltable
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.examine {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
	}

	.reportList {
		background-color: #fff;
		border-top: 1px solid #ebeef5;
	}

	.el-form-item {
		margin-bottom: 0px;
	}

	.search-row {
		border: 1px solid rgba(236, 236, 236, 1);
		background: #fff;
		padding: 0 30px;
		border-bottom-right-radius: 2px;
		border-bottom-left-radius: 2px;
	}
	.table-card {
		background: #fff;
		margin-top: 10px;
		flex: 1;
		-ms-flex:1 0 auto;
		.table-con,
		.table-comp {
			height: 100%;
			box-sizing: border-box;
		}
	}
</style>
