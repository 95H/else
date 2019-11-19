<template>
	<!-- 搜索所需条件 begin -->
	<div class="examine">
		<div class="list-search">
			<div class="singleRadio-container" v-if="hackReset">
				<single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="pageOptions.itemsIptOptions">
					<div slot="ipt-date">
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
			<zltable ref='zltable' :dataTableHead="dataTableHead" :dataurl=dataurl :dataSearch="form" v-on:trclick="trclick"></zltable>
		</div>
	<!-- 列表 end -->
	</div>
</template>

<script>
	import zltable from '@/components/zltable.vue';
	export default {
		name: 'seal',
		data() {
			return {
				form: {
					sheetStatus: '1',
					projectName: '',
					projectNumber: '',
					organizer: '',
					projectApply: ''
				},
				pageOptions: {
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
							url:"/api/projectRequest/findSetupAuditPage",
							formData:{
								sheetStatus:"1"
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
							name: '申请人：',
							holder: '请输入申请人',
							key:'createUser',
							input: ''
						}
					],
				},
				hackReset: true,
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
						name: "organizer"
					},
					{
						title: "项目负责人",
						name: "xmFzrNames"
					},
					{
						title: "申请人",
						name: "sqrName"
					},
					{
						title: "状态",
						name: "processStateId",
						_param: "processStateId"
					},
					{
						title: "申请时间",
						name: "submitReviewTime"
					}

				], //表头数据。title：表头的title。name：接口数据字段。
				count: 0,
				val:'1',
				parentDate: [],
				dataurl: "/api/projectRequest/findSetupAuditPage" //表格数据api。
			};
		},
		created() {
			var _this = this;
			this.$store.state.searchInfo = ()=>{
				_this.searchEvent();
			}
		},
		methods: {
			searchEvent() {
				var _this = this;
				let _options = _this.pageOptions.itemsIptOptions;
        this.form.projectName= _options[0].input;
        this.form.projectNumber= _options[1].input;
        this.form.organizer= _options[2].input;
        this.form.projectApply= _options[3].input;
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
				this.$store.state.dataObj = row;
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				};
				this.$store.state.isScroll = false;
			},
			radioEvent(val) { //单选按钮调用接口
				this.form.sheetStatus = val;
				this.pageOptions.itemsIptOptions[0].formData.sheetStatus=val;
				this.$refs.zltable.refreshPage();
			},
			resetEvent() { //重置按钮方法
				var _this = this;
				this.val = '1';
        this.hackReset = false;//销毁组件
        this.$nextTick(() => {
          this.hackReset = true;//重建组件
        });
        this.pageOptions.itemsIptOptions.forEach(item => {
          item.input = '';
        })
        _this.searchList(this.val);
			},
			searchList(status, projectName = '', projectNumber = '', organizer = '' , projectApply = '') {
				var _this = this;
        let data = {
          sheetStatus: status,
          projectName: projectName,
          projectNumber: projectNumber,
          organizer: organizer,
          projectApply: projectApply
        }
        this.$http.post('/api/projectRequest/findSetupAuditPage', data)
          .then(res => {
            this.count = parseInt(res.count); // 总数
            _this.parentDate =  res.data;
          }).catch(error => {
						_this.$messageError(error);
        })
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
		padding-bottom: 40px;
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
</style>
