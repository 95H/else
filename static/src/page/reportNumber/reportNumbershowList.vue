<template>
	<div class="report-number-list-con">
		<!-- 搜索 begin -->
		<div class="list-search">
			<div class="search-form">
				<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
					<el-row class="search-term">
						<el-form-item label="报告类型：" prop="name">
							<el-input class="term-input" v-model="form.name" placeholder="请输入报告类型"></el-input>
						</el-form-item>
						<el-form-item label="报告号预览：" prop="numPreview">
							<el-input class="term-input" v-model="form.numPreview" placeholder="请输入报告号预览"></el-input>
						</el-form-item>
						<el-form-item>
							<button class="search-btn" @click="onSubmit">搜索</button>
							<button class="reset-btn" @click="reset(form)">重置</button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!-- 搜索 end -->
		<!-- 表格 begin -->
		<div class="table-card">
			<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" v-on:trclick="trclick">
			</zltable>
		</div>
		<!-- 表格 end -->

		<div class="addReportBtn">
			<button class="search-btn addBtnRefrsh" @click="fieldSurvey" v-if='show'>新增报告号</button>
		</div>
	</div>
</template>
<script>
	import zltable from '../../components/zltable.vue';
	export default {
		name: 'reportnumber',
		data() {
			return {
				show: true,
				form: {
					name: '',
					numPreview: ''
				},
				dataTableHead: [{
						title: "序号",
						type: "index"
					},
					{
						title: "报告类型",
						name: "name",
						width:"200"
					},
					{
						title: "报告号预览",
						name: "numPreview"
					},
					{
						title: "创建日期",
						name: "createTime",
						width:"200"
					},
					{
						title: "id",
						name: "id"
					}

				], //表头数据。title：表头的title。name：接口数据字段。
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
				dataurl: "/api/reportNumSetting/findReportNumSettingList" //表格数据api。
			};
		},
		created() {
			var _this = this;
			//获取当前页面路径，如果是报告号设置管理显示新增报告号按钮
			if(this.$route.path == '/zlpg/reportNumber/reportNumbershowList') {
				this.show = true;
			}
		},
		methods: {
			trclick(row) {
				var _this = this;
				//console.log("点击行的id："+row.id);
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '编辑报告号';
				this.$store.state.extraBtn = '删除';
				this.$store.state.commonBtn = '提交';
				this.$store.state.componentsType = 'reportNumberInfo';
				this.$store.state.dataObj = row;
				//console.log(this.$store.state.dataObj);
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				};
			},
			onSubmit() {
				this.$refs.zltable.refreshPage();
			},
			reset(form) { //重置按钮方法
				this.form.name = '';
				this.form.numPreview = '';
				this.$nextTick(() => {
					this.$refs.form.resetFields();
				});
				this.onSubmit();
			},
			fieldSurvey() {
				var _this = this;
				this.$store.state.dataObj = {
					name: '',
					reportRuleConstant: '',
					rulePage: '',
					startPageNum: '',
					pageRuleConstant: '',
					dateLeft: '',
					dateMiddle: '',
					dateRigth: '',
					previewNum: ''
				};
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '新增报告号';
				this.$store.state.commonBtn = '新增';
				this.$store.state.componentsType = 'reportNumberInfo';
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				};
			}
		},
		watch: {
			//判断当前路由路径,显示新增报告号按钮
			$route(to, from) {
				if(this.$route.path == '/zlpg/reportNumber/reportNumbershowList') {
					this.show = true;
				} else {
					this.show = false;
				}
				//console.log(this.$route.path);
			}
		},
		components: {
			zltable
		}
	}
</script>
<style scoped lang="scss">
	.report-number-list-con {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		/deep/.container {
			border: none !important;
		}
		.list-search /deep/ {
			background: #fff;
			padding: 0 20px;
			border-bottom-right-radius: 2px;
			border-bottom-left-radius: 2px;
			border: 1px solid #ECECEC;
			border-top: none;
			.search-radio {
				border-bottom: 1px dotted rgba(236, 236, 236, 1);
				.el-radio__input.is-checked+.el-radio__label {
					color: #3A80EC;
				}
				.el-radio__input.is-checked .el-radio__inner {
					border-color: #3A80EC;
					background: #3A80EC;
				}
			}
			.search-term {
				padding-top: 15px;
				padding-bottom: 15px;
				.term-input {
					& input {
						height: 25px !important;
						padding: 0 6px;
						border-radius: 4px;
					}
				}
			}
			.search-form {
				.el-form-item {
					margin-bottom: 0;
					margin-right: 20px !important;
				}
				.el-form-item__label {
					color: #686868;
					line-height: 25px;
				}
				.el-form-item__content {
					line-height: 25px;
					.line {
						text-align: center;
					}
				}
				.el-input__icon {
					line-height: 25px;
				}
				.el-button {
					padding: 4px 22px;
					background: #3A80EC;
					span {
						color: #fff;
					}
				}
				.el-button:last-child {
					background: #fff;
					border: 1px solid rgba(58, 128, 236, 1);
					span {
						color: #3A80EC;
					}
				}
				.el-input--suffix .el-input__inner {
					padding-right: 0;
					padding-left: 27px;
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
		/deep/ .addReportBtn {
			position: absolute;
			top: 5px;
			right: 22px;
		}
		/deep/ .addBtnRefrsh {
			width: 85px !important;
		}
	}

	/deep/ .el-form-item__label{
		padding-right: 0 !important;
	}
</style>