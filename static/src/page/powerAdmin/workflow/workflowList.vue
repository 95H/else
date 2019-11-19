<template>
	<div class="zlpg-home">
		<div class="zlpg-home-header">
			<!-- 搜索所需条件 -->
			<div class="list-search">
				<div class="search-form">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="流程名称：">
							<el-input v-model="workflowName" placeholder="请输入流程名称"></el-input>
						</el-form-item>
						<el-form-item>
							<button type="primary" @click="searchTable" class="search-btn">搜索</button>
							<button type="" class="reset-btn" @click="resetTable">重置</button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>

		<div class="stamp-list">
			<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="workflowForm" v-on:trclick="trclick">
				<div slot="tableTop">
					<el-button type="primary" @click="addWorkFlow" size="mini">新增流程</el-button>
				</div>
			</zltable>
		</div>
		<router-view></router-view>

		<!-- 设置流程名称 -->
		<center-dialog ref="centerDialog" dialogTitle="新增流程" dialogWidth="350px" dialogHeight="200px">
			<div slot="dialogContent">
				<el-form ref="workFlowObj" :model="workFlowObj" :rules="workFlowRules" label-width="75px" class="addNode_box">
					<el-form-item label="表单类型：" prop="workType">
						<el-select v-model="workFlowObj.workType" placeholder="请选择表单类型" size="mini">
							<el-option v-for="item in workFlowObj.workTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="流程名称：" prop="workName">
						<el-input placeholder="请输入流程名称" v-model="workFlowObj.workName" size="mini"></el-input>
					</el-form-item>
					<!-- <el-form-item label="流程Key：">
                        <el-input placeholder="请输入流程Key" v-model="workFlowObj.workKey" size="mini"></el-input>
                    </el-form-item> -->
					<el-form-item class="addNodeWorkBtn">
						<el-button type="primary" @click="addNodeWork('workFlowObj')" size="mini">确定</el-button>
						<el-button @click="closeDialog" size="mini">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</center-dialog>
	</div>
</template>

<script>
	import createproject from '../../../components/createProject'
	import centerDialog from '../../../components/centerDialog';
	import zltable from '../../../components/zltable';
	export default {
		data() {
			return {
				workFlowObj: {
					workName: "",
					workKey: "",
					workType: "",
					workTypeList: window.commonOriginalData.formId
				},

				showProject: false,
				radio: '1',
				workflowName: "",
				workflowForm: {
					processName: ''
				},
				dataTableHead: [{
						title: "表单类型",
						name: "formId",
						width: "200px",
						_param: "formId"
					},
					{
						title: "流程名称",
						name: "processName"
					},
					// {
					//     title:"流程KEY",name:"processKey",width:"100px"
					// },
					{
						title: "创建时间",
						name: "createTime",
						width: "200px"
					},
					{
						title: "发布时间",
						name: "publishTime",
						width: "200px"
					},
					{
						title: "版本号",
						name: "versionNum",
						width: "120"
					}

				], //表头数据。title：表头的title。name：接口数据字段。
				dataurl: "/api/processDefinition/findPageList", //表格数据api。
				workFlowRules: {
					workType: [{
						required: true,
						message: '请选择表单类型',
						trigger: 'blur'
					}],
					workName: [{
						required: true,
						message: '请输入流程名称',
						trigger: 'blur'
					}]
				}
			};
		},
		components: {
			centerDialog,
			zltable
		},
		watch: {
			//执行人搜索
			filterText(val) {
				this.$refs.treeData.filter(val);
			}
		},
		created() {
			var _this = this;

			// 清空数据之用
			// this.defaultAddOrEditForm = JSON.parse(JSON.stringify(this.$data.addOrEditForm));
			this.defaultWorkFlowObj = JSON.parse(JSON.stringify(this.$data.workFlowObj))
		},
		methods: {
			//新增流程
			addWorkFlow: function() {
				this.$refs.centerDialog.showDialog();
			},
			// 关闭弹窗
			closeDialog() {
				this.$refs.centerDialog.closeDialog();
			},
			// getPinYin:function(){
			//     var _this = this;
			//     _this.$http.post("/api/processDefinition/chinaToEn",{
			//         chinaStr : _this.workFlowObj.workName
			//     }).then(function(res){
			//         _this.workFlowObj.workKey = res.data;
			//     })
			// },
			// 右侧弹窗设置
			rightDialog() {
				this.$store.commit('changeShowCommon'); //固定
				this.$store.state.componentsType = 'workflow'; //要调用组件的名称
			},
			// 新增流程
			addNodeWork: function(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.$http.post("/api/processDefinition/initProcess", {
							formId: _this.workFlowObj.workType,
							processName: _this.workFlowObj.workName,
							processKey: _this.workFlowObj.workKey
						}).then(function(res) {
							_this.workJsonData = res.data;
							_this.workFlowFlag = true;
							_this.setWorkFlag = false;
							_this.workId = res.data.id;
							_this.$refs.zltable.refreshPage();
							_this.$data.workFlowObj = Object.assign(_this.$data.workFlowObj, _this.defaultWorkFlowObj);
							_this.closeDialog();
							_this.rightDialog();
							_this.$store.state.commonTitle = '新增流程'; //弹框名称
							_this.$store.state.commonBtn = '发布'; //按钮名称 （没有按钮传空）
							_this.$store.state.extraBtn = '删除'; //第二个按钮名称 （没有不传）
							_this.$store.state.dataObj = { //需要传递的参数
								workJsonData: _this.workJsonData
							}
							_this.$store.state.refresh = function() {
								_this.$refs.zltable.refreshPage();
							};
						})
					} else {
						return false
					}
				})
			},
			trclick(row) {
				var _this = this;
				_this.$http.post("/api/processDefinition/findProcessById", {
					id: row.id
				}).then(function(res) {
					_this.rightDialog();
					if(res.data.isPublish == "0") {
						_this.$store.state.commonTitle = "编辑流程"; //弹框名称
						_this.$store.state.commonBtn = '发布'; //按钮名称 （没有按钮传空）
						_this.$store.state.extraBtn = '删除'; //第二个按钮名称 （没有不传）
					} else {
						_this.$store.state.commonTitle = "查看流程"; //弹框名称
					}
					_this.$store.state.refresh = function() {
						_this.$refs.zltable.refreshPage();
					};
					_this.$store.state.dataObj = { //需要传递的参数
						workJsonData: res.data
					}
				})
			},
			showfun() {
				this.showProject = true;
			},
			searchTable() {
				this.workflowForm.processName = this.workflowName;
				this.$refs.zltable.refreshPage();
			},
			resetTable() {
				this.workflowForm.processName = '';
				this.$refs.zltable.refreshPage();
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.zlpg-home {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.zlpg-home-header {
			width: 100%;
			border-radius: 2px;
			background: #fff;
			.list-group {
				line-height: 34px;
				border-bottom: 1px solid rgba(236, 236, 236, 1);
				overflow: hidden;
				li {
					float: left;
					margin-left: 30px;
					a {
						position: relative;
						font-size: 13px;
						color: rgba(38, 38, 40, 1);
						font-weight: 400;
					}
					a.is-active {
						display: block;
						color: #145FD2;
					}
					a.is-active:after {
						content: "";
						left: 0;
						position: absolute;
						bottom: -1px;
						width: 100%;
						height: 2px;
						background: #145FD2;
					}
				}
				.list-right {
					float: right;
					cursor: pointer;
					height: 27px;
					background: rgba(58, 128, 236, 1);
					border-radius: 2px;
					line-height: 27px;
					font-size: 13px;
					color: rgba(255, 255, 255, 1);
					text-align: right;
					padding: 0 9px 0 12px;
					margin-top: 4px;
					margin-right: 4px;
					p {
						width: 13px;
						height: 13px;
						background: #145FD2;
						border-radius: 3px;
						line-height: 11px;
						text-align: center;
						padding-left: 2px;
						font-size: 17px;
						color: #fff;
						float: left;
						margin-top: 8px;
						margin-right: 7px;
						opacity: .6;
					}
				}
			}
			.list-search {
				padding: 0 30px;
				.search-radio {
					padding: 13px 0 10px 0;
					border-bottom: 1px solid rgba(236, 236, 236, 1);
					.search-radio-title {
						font-size: 14px;
						color: #686868;
						float: left;
						padding: 0 12px 0 0;
						line-height: 18px;
					}
					.el-radio__input.is-checked+.el-radio__label {
						color: #3A80EC;
					}
					.el-radio__input.is-checked .el-radio__inner {
						border-color: #3A80EC;
						background: #3A80EC;
					}
				}
				.search-form {
					padding: 13px 0;
					.el-input__inner {
						height: 25px !important;
						padding: 0 6px;
						max-width: 135px;
						min-width: 135px;
						border-radius: 2px;
					}
					.el-form-item {
						margin-bottom: 0;
					}
					.el-form-item__label {
						color: #686868;
						line-height: 25px;
					}
					.el-form-item__content {
						line-height: 25px;
					}
					.el-input__icon {
						line-height: 25px;
					}
					.el-input__prefix {
						right: 0 !important;
					}
				}
			}
		}
		.stamp-list {
			flex: 1;
			-ms-flex:1 0 auto;
			background: #fff;
			margin-top: 10px;
			border-radius: 2px;
			.table-comp{
				height: 100%;
				box-sizing: border-box;
			}
			.stamp-list-header {
				height: 35px;
				background: rgba(249, 249, 249, 1);
				border-bottom: 1px solid rgba(236, 236, 236, 1);
				p {
					font-size: 13px;
					color: #262628;
					text-align: right;
					line-height: 35px;
					padding-right: 20px;
				}
			}
			.stamp-list-conter {
				padding: 25px 20px 30px 25px;
				background: #fff;
				.el-table th {
					background: #F6FAFF;
					color: #262628;
					font-weight: 400;
					font-size: 13px;
					padding: 4px 0;
				}
				.el-table td,
				.el-table th {
					text-align: center;
				}
				.el-table td {
					border: 1px solid #ebeef5;
					border-top: none;
					border-right: none;
					color: #6A6A6A;
					font-size: 12px;
					padding: 3px 0;
				}
				.el-table td:last-child {
					border-right: 1px solid #ebeef5;
				}
				.el-table th.is-leaf {
					border: 1px solid #ebeef5;
					border-right: none;
				}
				.el-table th:last-child {
					border-right: 1px solid #ebeef5 !important;
				}
			}
		}
	}

	.table-con {
		background: #fff;
		margin-top: 10px;
	}
	/*此处应用的样式*/

	/deep/ .el-form-item__content,
	/deep/ .el-form-item__label {
		line-height: 30px;
		padding: 0;
	}

	/deep/ .el-form-item {
		margin-bottom: 15px;
	}

	.addNode_box /deep/ .el-input__inner {
		height: 30px !important;
	}

	.addNode_item .addNode_input {
		height: 30px;
		line-height: 28px;
		box-sizing: border-box;
		padding: 0 10px;
		border: 1px solid #E1E1E1;
		width: 100%;
		font-size: 13px;
		border-radius: 3px;
		display: block;
	}

	.addNode_item .el-form-item__content {
		padding-left: 75px;
	}

	/deep/.addNodeWorkBtn .el-form-item__content {
		margin-left: 90px!important;
	}

	.addNode_item .el-form-item__label {
		text-align: left;
	}

	/deep/.el-select,
	.el-select--mini {
		width: 100%;
	}
</style>
