<template>
	<!-- 搜索所需条件 begin -->
	<div class="examine">
		<div class="list-search">
			<div class="singleRadio-container" v-if="hackReset">
				<!-- 审核级别 -->
        <single-radio :singleradiooptions="pageOptions.auditStatus" @onradioclick="radioStateEvent"></single-radio>
        <!-- 我的审核 -->
				<single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="pageOptions.itemsIptOptions">
          <div slot="ipt-date">
            <div class="timeData">
              <span class="txt fs13" style="width:auto;">申请时间：</span>
              <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="marginRight20">
              </el-date-picker>
            </div>
            <div class="btn-container">
              <button class="search-btn" @click="searchEvent">搜索</button>
              <button class="reset-btn" @click="resetEvent">重置</button>
            </div>
          </div>
				</ipt>
			</div>
		</div>
		<!-- 列表 begin -->
		<div class="table-card marginTop10">
			<zltable  v-if="hackReset" ref='zltable' :dataTableHead="dataTableHead" :dataurl=dataurl :dataSearch="form" v-on:trclick="trclick"></zltable>
		</div>
	<!-- 列表 end -->
	</div>
</template>

<script>
	import zltable from '@/components/zltable.vue';
	export default {
		name: 'myAudit',
		data() {
			return {
				dateArr: [],
				auditStatusData: '',
				form: {
					sheetStatus: '1',
					auditStatus: '',
					projectName: '',
					projectNumber: '',
					organizer: '',
					projectApply: '',
					auditApply: '',
					startTime: '',
					endTime: ''
				},
				pageOptions: {
					auditStatus: {
						txt: '审核级别：',
						option: [{
								name: '复审',
								label: 'usertask3'
							},
							{
								name: '初审',
								label: 'usertask2'
							}
						]
					},
					singleRadioOptions: {
						txt: '审核分类：',
						option: [{
								name: '待审核',
								label: '1'
							},
							{
								name: '已审核',
								label: '2'
							},
							{
								name: '全部',
								label: '3'
							}
						]
					},
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key:'projectName',
							url:'/api/projectRequest/findSetupAuditList',
							formData:{
								sheetStatus:'1',
								auditStatus:''
							},
							input: ''
						},
						{
							name: '项目编号：',
							holder: '请输入项目编号',
							input: ''
						},
						{
							name: '承作机构：',
							holder: '请输入承作机构',
							key:'groupName',
							input: ''
						},
						{
							name: '审核人：',
							holder: '请输入审核人',
							key:'createUser',
							input: ''
						},
						{
							name: '申请人：',
							holder: '请输入申请人',
							key:'createUser',
							input: ''
						}
					],
				},
				hackReset: false,
				dataTableHead: [{
						title: "项目名称",
						name: "projectName"
					},
					{
						title: "项目编号",
						name: "projectNumber"
					},
					{
						title: "承做机构",
						name: "groupName"
					},
					/*{
						title: "项目负责人",
						name: "xmFzrNames"
					},*/
					{
						title: "申请人",
						name: "projectApply"
					},
					{
						title: "审核人",
						name: "auditApply"
					},
					{
						title: "状态",
						name: "processStateId",
						_param: "processStateId"
					},
					{
						title: "申请时间",
						name: "createTime"
					}

				], //表头数据。title：表头的title。name：接口数据字段。
				count: 0,
				val:'1',
				dataurl: "/api/projectRequest/findSetupAuditList" //表格数据api。
			};
		},

		created() {
			var _this = this;
			_this.$store.state.sheetStatus = "1";
			_this.$http.post("/api/projectRequest/judgeIsYyzx")
	 			.then(function(data) {
					if (data.data.isYyzxzrByTime==0&&data.data.isYyzxzr == 1) {
						_this.$emit('isYyzxzr',1)
					}
					if(data.data.isYyzxzr == 1){
						_this.$store.state.status = _this.pageOptions.auditStatus.option[0].label;
					}else{
						_this.$store.state.status = _this.pageOptions.auditStatus.option[1].label;
					}
					_this.form.auditStatus = _this.$store.state.status;
					_this.$store.state.auditStatus = _this.$store.state.status;
					_this.pageOptions.itemsIptOptions[0].formData.auditStatus = _this.form.auditStatus;
					_this.goBack();
					_this.hackReset = true;
	 			})
	 			.catch(function(error) {
	 				_this.$messageError(error);
	 		});
			this.$store.state.searchInfo = ()=>{
				this.searchEvent();
			}
		},
		methods: {
			//返回回显
			goBack(){
				let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
				if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
					this.pageOptions.itemsIptOptions[0].formData.sheetStatus = searchCondition.sheetStatus;
					this.form.sheetStatus = searchCondition.sheetStatus;
					this.pageOptions.singleRadioOptions.value= searchCondition.sheetStatus;
					this.pageOptions.itemsIptOptions[0].formData.auditStatus = searchCondition.auditStatus;
					this.form.auditStatus = searchCondition.auditStatus;
					this.pageOptions.auditStatus.value= searchCondition.auditStatus;
					this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
					this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
					this.pageOptions.itemsIptOptions[2].input = searchCondition.organizer;
					this.pageOptions.itemsIptOptions[3].input = searchCondition.auditApply;
					this.pageOptions.itemsIptOptions[4].input = searchCondition.projectApply;
					this.dateArr=[searchCondition.startTime,searchCondition.endTime];
					this.form.projectName = searchCondition.projectName;   //項目名称
					this.form.projectNumber = searchCondition.projectNumber;  //項目编号
					this.form.organizer = searchCondition.organizer;  //承作机构
					this.form.auditApply = searchCondition.auditApply;  //审核人
					this.form.projectApply = searchCondition.projectApply;  //申请人
					this.form.startTime = searchCondition.startTime;  //申请人
					this.form.endTime = searchCondition.endTime;  //申请人
					this.form.page = searchCondition.page;
				}
			},
			searchEvent() {
				var _this = this;
				let _options = _this.pageOptions.itemsIptOptions;
        this.form.projectName= _options[0].input;
        this.form.projectNumber= _options[1].input;
        this.form.organizer= _options[2].input;
        this.form.auditApply= _options[3].input;
        this.form.projectApply= _options[4].input;
        this.form.startTime = this.dateArr && this.dateArr[0] ? this.dateArr[0] : '';
				this.form.endTime = this.dateArr && this.dateArr[1] ? this.dateArr[1] : '';
				this.$refs.zltable.refreshPage();
			},
			trclick(row) {
				let _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '立项审核';
				this.$store.state.commonBtn = '进入项目';
				if(row.processStateId == '1067' && row.isYyzxzy == '1'){
					this.$store.state.extraBtn = '撤销';
				}
				this.$store.state.componentsType = 'examineInfo';
				this.$store.state.projectId = row.projectId;
				this.$store.state.taskId = row.taskId;
				this.$store.state.dataObj = row;
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				};
				this.$store.state.isScroll = false;
			},
			radioEvent(val) { //单选按钮调用接口
				this.form.sheetStatus = val;
				this.$store.state.sheetStatus = val;
				this.pageOptions.itemsIptOptions[0].formData.sheetStatus = val;
				this.$refs.zltable.refreshPage();
			},
			radioStateEvent(val) {
				this.form.auditStatus = val;
				this.$store.state.auditStatus = val;
				this.pageOptions.itemsIptOptions[0].formData.auditStatus = val;
				this.$refs.zltable.refreshPage();
			},
			resetEvent() { //重置按钮方法
				var _this = this;
				this.val = '1';
				this.pageOptions.singleRadioOptions.value="";
				this.form.sheetStatus="1";
				this.pageOptions.auditStatus.value="";
				this.form.auditStatus=_this.$store.state.status;
				this.form.page=1;
				this.hackReset = false;//销毁组件
				this.$nextTick(() => {
					this.hackReset = true;//重建组件
				});
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = '';
				});
				this.dateArr = [];
				this.searchEvent();
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

.list-search /deep/ {
	background: #fff;
	border-bottom-right-radius: 2px;
	border-bottom-left-radius: 2px;
	.search-container {
		position: relative;
		.btn-container {
			position: absolute;
			right: 20px;
			top: 55px;
		}
	}
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

.seal-title {
	background: #fff;
	padding-left: 30px;
	height: 34px;
	line-height: 33px;
	font-size: 13px;
	border: solid 1px #ececec;
	border-bottom: none;
}
/deep/ .ipt-wrap .ipt-container{
	margin-right: 19px !important;
}
/deep/ .ipt-wrap .ipt-container:nth-child(4n) {
  margin-right: 0 !important;
}
/deep/ .timeData{
	padding-top: 15px;
	span{
		color: #686868;
	}
}
</style>
