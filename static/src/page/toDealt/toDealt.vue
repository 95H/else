<template>
	<div class="to-dealt-content">
		<div class="container zlpg-content">
			<!-- 导航模块 begin -->
			<div class="zlpg-content-header not-border">
				<ul class="list-group">
					<li class="selected" v-for="(item,index) in pageOptions.tabOptions" :key="index">{{ item.label }}</li>
				</ul>
			</div>
			<!-- 导航模块 end -->
			<!-- 单选模块 begin -->
			<div class="singleRadio-container" v-if="hackReset">
				<single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
			</div>
			<!-- 单选模块 end -->
			<!-- 搜索模块 begin -->
			<div class="search-container">
				<ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
				<span class="txt fs13" style="width:auto;">提交时间：</span>
				<el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="marginRight20">
				</el-date-picker>
				<button class="search-btn" @click="searchEvent">搜索</button>
				<button class="reset-btn" @click="resetEvent">重置</button>
			</div>
			<!-- 搜索模块 end -->
		</div>
		<div class="white-bg">
			<dealt-list :messageToDeal="messageToDeal" :totalDataNum="totalDataNum" :type="type"></dealt-list>
			<div class="pagination-con text-center" v-if="totalDataNum > 10">
				<pagination ref="pagination" :pagesize="pagesize" :page="page" :totalDataNum="totalDataNum" v-on:currentPageFn="currentPageFn"></pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import dealtList from '../../components/dealtList';
	import pagination from '@/components/pagination.vue';
	export default {
		components: {
			dealtList,
			pagination
		},
		data() {
			return {
				pageOptions: {
					tabOptions: [{
						label: '我的待办',
						href: 'toDealt',
						name: 'first'
					}],
					singleRadioOptions: {
						txt: '任务类型：'
					},
					itemsIptOptions: [{
							name: '内容关键字：',
							holder: '请输入内容关键字',
							input: '',
							width: '155px'
						},
						{
							name: '发起人：',
							key: 'createUser',
							holder: '请输入发起人名称',
							input: '',
							width: '155px'
						}
					]
				},
				val: 1,
				messageToDeal: [],
				hackReset: true,
				page: 1,
				pagesize: 10,
				totalDataNum: 0,
				type: '待办',
				dateArr: [],
				isExternalPower: '',
				showPower: true
			};
		},
		created() {
			let dealtOption = [{
				name: "全部",
				label: 0
			}];
			commonOriginalData.typeId.forEach(function(val, key) {
				if(val.name != "竞技场" && val.name != "项目变更" && val.name != "报告变更" && val.name != "报告作废") {
					dealtOption.push({
						name: val.name,
						label: val.id
					})
				}
			})
			this.pageOptions.singleRadioOptions.option = dealtOption;
			this.val = dealtOption[0].label;

			if(JSON.parse(this.$getCookie("user"))) {
				this.isExternalPower = JSON.parse(this.$getCookie("user")).isExternal;
				if(this.isExternalPower == true) {
					this.showPower = false;
					this.pageOptions.singleRadioOptions.option.splice(0, 2);
					this.pageOptions.singleRadioOptions.option.splice(-2, 2);
				}
			}
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path) {
				this.val = searchCondition.singleradiooption;
				this.pageOptions.itemsIptOptions[0].input = searchCondition.content;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.userName;
				this.dateArr = [searchCondition.startTime, searchCondition.endTime];
				this.page = searchCondition.index;
			}
		},
		mounted() {
			this.searchList();
		},
		methods: {
			radioEvent(val) { // 单选按钮事件
				this.val = val;
				this.page = 1;
				this.totalDataNum = 0; //销毁组件
				this.searchList();
			},
			searchEvent() { // 搜索按钮事件
				this.page = 1
				this.totalDataNum = 0;
				this.searchList();
			},
			resetEvent() { // 重置按钮事件
				this.page = 1
				this.totalDataNum = 0;
				this.val = this.pageOptions.singleRadioOptions.option[0].label;
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.dateArr = [];
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = '';
				})
				this.searchList();
			},
			searchList() { //请求列表接口content,userName，startTime，endTime，type，dataType，handleOrRead
				this.searchConditionData = {
					singleradiooption: this.val,
					content: this.pageOptions.itemsIptOptions[0].input,
					userName: this.pageOptions.itemsIptOptions[1].input,
					startTime: this.dateArr && this.dateArr[0] ? this.dateArr[0] : '',
					endTime: this.dateArr && this.dateArr[1] ? this.dateArr[1] : '',
					index: this.page,
					dataSearchPath: this.$route.path
				}
				this.$setCookie('searchCondition', JSON.stringify(this.searchConditionData), 24 * 60 * 60);
				let _this = this;
				this.$http.post('/api/message/findMessageList', {
					page: this.page,
					rows: this.pagesize,
					dataType: this.val,
					handleOrRead: 1,
					content: this.pageOptions.itemsIptOptions[0].input,
					userName: this.pageOptions.itemsIptOptions[1].input,
					startTime: this.dateArr && this.dateArr[0] ? this.dateArr[0] : '',
					endTime: this.dateArr && this.dateArr[1] ? this.dateArr[1] : ''
				}).then(response => {
					_this.totalDataNum = response.count * 1;
					_this.messageToDeal = response.data;
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			currentPageFn(val) { //点击分页
				this.page = val;
				this.searchList()
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.to-dealt-content {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
	}
	
	.zlpg-content .zlpg-content-header .list-group li:hover {
		color: #145FD2;
	}
	
	.list-group {
		border: none!important;
		border-bottom: 1px solid #ececec!important;
		li {
			margin-left: 20px!important;
		}
	}
	
	.white-bg {
		margin-top: 10px;
		background: #fff;
		border: 1px solid #ECECEC;
		padding-bottom: 20px;
		flex: 1;
		-ms-flex: 1 0 auto;
	}
</style>