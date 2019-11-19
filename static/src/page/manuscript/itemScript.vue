<template>
	<div class="zlpg-item-manuscript">
		<div class="item-manuscript-head">
			<div class="item-manuscript-select" v-if="hackReset">
				<SingleRadio :singleradiooptions="pageOptions.singleRadioStateOptions" ref="singleRadioStateOptions" @onradioclick="radiolEvent"></SingleRadio>
				<SingleCheckbox :singleradiooptions="pageOptions.singleRadioNatureOptions" ref="singleRadioNatureOptions" @onradioclick="radiolEvent"></SingleCheckbox>
				<SingleCheckbox :singleradiooptions="pageOptions.singleRadioLevelOptions" ref="singleRadioLevelOptions" @onradioclick="radiolEvent"></SingleCheckbox>
			</div>
			<div class="item-search">
				<Ipt :itemsiptoptions='pageOptions.itemsIptOptions'></Ipt>
				<span class="txt">评估目的：</span>
				<el-select v-model="form.assessmentObjectiveId" placeholder="请选择">
					<el-option v-for="item in assessmentObjectiveId" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div class="btnFr">
					<button class="search-btn" @click="search">搜索</button>
					<button class="reset-btn" @click="reset">重置</button>
				</div>
			</div>
		</div>
		<div class="item-manuscript-sheet">
			<Zltable ref='zltable' :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" v-on:trclick="openDetail"></Zltable>
		</div>
	</div>
</template>

<script>
	import Zltable from '@/components/zltable.vue';

	export default {
		data() {
			return {
				page: 1,
				pagesize: 10,
				options: [],
				active: 0,
				hackReset: true,
				projectStatus: {
					'': '全部',
					0: '立项中',
					1: '作业中',
					4: '结项中',
					2: '已完成'
				},
				pageOptions: {
					singleRadioStateOptions: {
						txt: '状态分类：',
						option: [{
								name: '全部',
								label: ''
							},
							{
								name: '立项中',
								label: '0'
							},
							{
								name: '作业中',
								label: '1'
							},
							{
								name: '结项中',
								label: '4'
							},
							{
								name: '已完成',
								label: '2'
							}
						],
						//              option: [
						//                {name: '立项中', label: '1012'},
						//                {name: '作业中', label: '1013'},
						//                {name: '结项中', label: '1014'},
						//                {name: '已完成', label: '1015'}
						//              ]
					},
					singleRadioNatureOptions: {
						txt: '性质分类：',
						option: [],
						optionId: [],
						optionIdOld: []
					},
					singleRadioLevelOptions: {
						txt: '等级分类：',
						option: [],
						optionId: [],
						optionIdOld: []
					},
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key: 'projectName',
							url: '/api/reportDraft/findPageList',
							formData: {
								projectStatus: '',
								projectNatureId: '17,18,19,20,21,22',
								projectLevelId: '23,24,25'
							},
							input: '',
							width: '194px'
						},
						{
							name: '立项编号：',
							holder: '请输入立项编号',
							input: '',
							width: '194px'
						}
					]
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName"
					},
					{
						title: "项目编号",
						name: "projectNumber",
						width: "90"
					},
					{
						title: "项目性质",
						name: "projectNatureId",
						width: "100",
						_param: "projectNatureId"
					},
					{
						title: "项目级别",
						name: "projectLevelId",
						width: "80",
						_param: "projectLevelId"
					},
					{
						title: "评估目的",
						name: "assessmentObjectiveId",
						width: "120",
						_param: "assessmentObjectiveId"
					},
					{
						title: "评估方法",
						name: "assessmentMethodId",
						width: "160",
						_param: 'assessmentMethodId'
					},
					{
						title: "项目状态",
						name: "projectStatus",
						width: '80',
						_param: 'projectStatus'
					},
					{
						title: "立项时间",
						name: "createTime",
						width: '140'
					}
				],
				form: {
					projectName: '', //项目名称
					projectNumber: '', //项目编号
					assessmentObjectiveId: '', //评估目的
					//            procStage:'1012',//状态分类
					projectStatus: '', //状态分类
					projectNatureId: '17,18,19,20,21,22', //项目性质
					projectLevelId: '23,24,25', //项目等级
				},
				dataurl: "/api/reportDraft/findPageList", //表格数据api。
				assessmentObjectiveId: [],
				commonData: window.commonData
			}
		},
		components: {
			Zltable
		},
		created() {
			let _this = this;
			this.$store.state.status = "";
			commonOriginalData.projectNatureId.forEach(function(val, key) {
				_this.pageOptions.singleRadioNatureOptions.option.push({
					name: val.name.slice(0, val.name.length - 2),
					id: val.id
				}, )
				_this.pageOptions.singleRadioNatureOptions.optionId.push(val.id);
				_this.pageOptions.singleRadioNatureOptions.optionIdOld.push(val.id);
			})
			this.nature = _this.pageOptions.singleRadioNatureOptions.optionId
			commonOriginalData.projectLevelId.forEach(function(val, key) {
				_this.pageOptions.singleRadioLevelOptions.option.push({
					name: val.name + '级',
					id: val.id
				}, )
				_this.pageOptions.singleRadioLevelOptions.optionId.push(val.id);
				_this.pageOptions.singleRadioLevelOptions.optionIdOld.push(val.id);
			})
			this.level = _this.pageOptions.singleRadioLevelOptions.optionId
			this.assessmentObjectiveId = this.setassessmentObjectiveId()
			window.commonData.projectStatus = this.projectStatus;
			this.$store.state.searchInfo = () => {
				this.search();
			}
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
				this.pageOptions.itemsIptOptions[0].formData.projectStatus = searchCondition.singleradiooption;
				this.form.projectStatus = searchCondition.singleradiooption;
				this.form.singleradiooption = searchCondition.singleradiooption;
				this.pageOptions.singleRadioNatureOptions.optionId = searchCondition.projectNatureId.split(",");
				this.pageOptions.singleRadioLevelOptions.optionId = searchCondition.projectLevelId.split(",");
				this.form.projectNatureId = searchCondition.projectNatureId;
				this.form.projectLevelId = searchCondition.projectLevelId;
				this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
				this.form.projectName = searchCondition.projectName;
				this.form.projectNumber = searchCondition.projectNumber;
				this.form.assessmentObjectiveId = searchCondition.assessmentObjectiveId;
				this.form.page = searchCondition.page;
			}
		},
		methods: {
			radiolEvent() {
				this.search()
			},
			search() {
				this.form.projectName = this.pageOptions.itemsIptOptions[0].input;
				this.form.projectNumber = this.pageOptions.itemsIptOptions[1].input;
				this.form.projectStatus = this.$refs.singleRadioStateOptions.value;
				this.form.singleradiooption = this.$refs.singleRadioStateOptions.value;
				this.pageOptions.itemsIptOptions[0].formData.projectStatus = this.form.projectStatus;
				this.form.projectNatureId = this.$refs.singleRadioNatureOptions.checked.join(",");
				this.pageOptions.itemsIptOptions[0].formData.projectNatureId = this.form.projectNatureId;
				this.form.projectLevelId = this.$refs.singleRadioLevelOptions.checked.join(",");
				this.pageOptions.itemsIptOptions[0].formData.projectLevelId = this.form.projectLevelId;
				this.$refs.zltable.refreshPage();
			},
			reset() {
				
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.pageOptions.itemsIptOptions.forEach(item => {
					item.input = '';
				})
				this.form.projectStatus = '';
				this.form.singleradiooption = '';
				this.pageOptions.singleRadioNatureOptions.optionId = this.pageOptions.singleRadioNatureOptions.optionIdOld.map(item=>{
					return item
				});
				this.form.projectNatureId = this.pageOptions.singleRadioNatureOptions.optionId.join(",");
				this.pageOptions.singleRadioLevelOptions.optionId = this.pageOptions.singleRadioLevelOptions.optionIdOld.map(item=>{
					return item
				});
				this.form.projectLevelId = this.pageOptions.singleRadioLevelOptions.optionId.join(",");
				this.form.projectName = "";
				this.form.projectNumber = "";
				this.form.assessmentObjectiveId = '';
				this.$refs.zltable.refreshPage();
			},
			//打开右侧弹出框
			openDetail(row) {
				this.$store.state.cprWidth = true;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '底稿详情'; //弹框名称
				this.$store.state.commonBtn = '进入项目'; //按钮名称 （没有按钮传空）
				this.$store.state.componentsType = 'manuscriptDetail'; //要调用组件的名称
				this.$store.state.projectId = row.id;
				this.$setCookie('projectId', row.id, 24 * 60 * 60);
			},
			setassessmentObjectiveId() {
				return Object.keys(window.commonData.assessmentObjectiveId).map(key => {
					return {
						value: key,
						label: window.commonData.assessmentObjectiveId[key]
					}
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.zlpg-item-manuscript {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.item-manuscript-head {
			background-color: #FFFFFF;
			border: 1px solid #ECECEC;
			.item-manuscript-select {
				padding: 0 20px;
			}
			.item-search {
				border-top: 2px dotted #ececec;
				margin: 0 21px;
				overflow: hidden;
				display: flex;
				align-items: center;
				/deep/ .ipt-wrap {
					float: left;
				}
				.txt {
					font-size: 13px;
					color: #686868;
				}
				.btnFr {
					float: left;
					margin-left: 20px;
					button {
						border-radius: 2px;
					}
				}
			}
		}
		.item-manuscript-sheet {
			margin-top: 10px;
			background-color: #fff;
			flex: 1;
			-ms-flex: 1 0 auto;
			.table-comp {
				height: 100%;
				box-sizing: border-box;
			}
		}
	}
</style>