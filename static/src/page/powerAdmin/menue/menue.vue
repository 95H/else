<template>
	<div class="rolebody">
		<div class="rolehead">
      <!--<ipt :itemsiptoptions="pageOptions.itemsIptOptions">
        <div slot="ipt-date">
          <div class="btn-container">
            <button class="search-btn" @click="onSubmit">查询</button>
          </div>
        </div>
      </ipt>-->
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="功能菜单名：">
					<el-input v-model="formInline.functionName" placeholder="请输入功能菜单名"></el-input>
				</el-form-item>
				<el-form-item label="菜单URL：">
					<el-input v-model="formInline.functionUrl" placeholder="请输入菜单URL"></el-input>
				</el-form-item>
				<el-form-item label="功能菜单：">
					<el-select v-model="formInline.functionType" placeholder="请选择">
						<el-option v-for="item in functionMenu" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<a href="javascript:;" @click="onSubmit" class="search-btn">查询</a>
				</el-form-item>
			</el-form>
		</div>
		<div class="rolebody-wrapper">
			<Zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="formInline" @trclick="trclick">
				<div slot="tableTop">
					<a href="javascript:;" class="search-btn newBtn" @click="addMenu">新增菜单</a>
				</div>
			</Zltable>
		</div>
	</div>
</template>

<script>
	import CenterDialog from '../../../components/centerDialog.vue';
	import Zltable from '@/components/zltable.vue';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				dataTableHead: [{
						title: "菜单名",
						name: "functionName",
						width: "150"
					},
					{
						title: "菜单URL",
						name: "functionUrl"
					},
					{
						title: "菜单类型",
						name: "functionType",
						width: "100"
					},
					{
						title: "排序",
						name: "sort",
						width: "80"
					},
					{
						title: "上级名称",
						name: "parentfunctionName",
						width: "100"
					},
					{
						title: "创建时间",
						name: "createTime",
            width: "180"
					}
				],

				functionMenu: [{
						value: '',
						label: '请选择'
					},
					{
						value: 1,
						label: '菜单'
					},
					{
						value: 2,
						label: '功能'
					}
				],

				formInline: {
					functionName: '',
					functionUrl: '',
					functionType: ''
				},

				menuData: {
					parentId: '',
					functionName: '',
					iconClass: '',
					sort: '',
					depict: '',
					functionType: '',
					functionUrl: ''
				},

				dataurl: 'api/sysfunction/findFunctionPage',
				parentMenuData: [],
			}
		},

		computed: {
			...mapState(['menuTableData'])
		},

		mounted() {
			this.$store.dispatch('getMenuZltable', this.$refs.zltable.refreshPage);
		},

		components: {
			CenterDialog,
			Zltable
		},

		methods: {
			//新增菜单
			addMenu() {
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '新增菜单';
				this.$store.state.commonBtn = '保存';
				this.$store.state.extraBtn = '取消';
				this.$store.state.componentsType = 'MenuDetail';
				this.$store.state.dataObj = {
					functionType: 1,
					parentId: '',
					functionName: '',
					functionUrl: '',
					sort: '',
					depict: ''
				};
				//增加状态标识，用于判断增加还是修改
				this.$store.dispatch('addDialogFlag');
			},

			//获取表格数据
			getTableData() {
				this.$http.post('api/sysfunction/findFunctionPage')
					.then(response => {
						const {
							count,
							data
						} = response;
						this.menuTableData = data;
						this.$store.dispatch('getMenuTable', data);
					})
					.catch(err => {
						this.$messageError(err);
					})
			},

			trclick(row) {
				const {
					id
				} = row;
				this.$http.post('api/sysfunction/findSysFunctionId', {
						id
					})
					.then(response => {
						this.$store.commit('changeShowCommon');
						this.$store.state.commonTitle = '修改菜单';
						this.$store.state.commonBtn = '保存';
						// this.$store.state.extraBtn = '删除';
						this.$store.state.componentsType = 'MenuDetail';
						this.$store.dispatch('updateDialogFlag');
						this.$store.state.dataObj = response.data;
						this.$store.state.dataObj['isReadonly'] = true
					})
					.catch(err => {
						this.$messageError(err);
					})
			},

			//表格查询
			onSubmit() {

				this.$http.post('api/sysfunction/findFunctionPage', { ...this.formInline
					})
					.then(response => {
						this.$refs.zltable.refreshPage();
					})
					.catch(err => {
						this.$messageError(err);
					});
			}

		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.rolebody {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.rolehead {
			background-color: #fff;
			display: flex;
			align-items: center;
			/deep/ .el-form {
				height: 60px;
				.el-form-item {
					margin: 10px 5px;
					&:first-child {
						margin-left: 20px;
					}
				}
			}
		}
		.rolebody-wrapper {
			flex: 1;
			-ms-flex:1 0 auto;
			margin-top: 10px;
			background: #fff;
			box-sizing: border-box;
			.table-comp {
				height: 100%;
				box-sizing: border-box;
			}
			.roleheadout {
				padding: 10px;
				background: #fff;
				box-sizing: border-box;
				height: 100%;
				.roleheadin {
					background: #F8F8F8;
					.rolehead {
						position: relative;
						margin-left: 10px;
						height: 27px;
						.el-form {
							position: absolute;
							top: -8px;
							line-height: 25px;
							.el-form-item {
								margin-bottom: 0;
							}
							.el-button {
								padding: 5px 20px;
								font-size: 13px;
							}
							.search-btn {
								line-height: 22px;
							}
							.newBtn.search-btn {
								width: 95px;
							}
						}
					}
				}
			}
			.dialog-in {
				/deep/ .el-dialog__wrapper {
					.el-dialog {
						width: 500px;
						.el-dialog__body {
							padding: 10px 20px;
							.newContain {
								.el-form-item {
									margin-bottom: 0;
									width: 400px;
								}
							}
						}
					}
				}
			}
		}
	}

	.newContain {
		overflow: hidden;
		.left {
			float: left;
			margin-top: 2px;
			width: 150px;
			li {
				background-color: #ffffff;
				padding: 5px 15px;
				margin-bottom: 2px;
				margin-right: 2px;
				.redd {
					color: red;
				}
			}
		}
		.right {
			float: left;
			width: 310px;
			li {
				background-color: #ffffff;
				height: 24px;
				margin-bottom: 2px;
			}
		}
	}

	.btablepage {
		border: 1px solid #E5E5E5;
		position: relative;
		width: 100%;
		height: 41px;
		font-size: 12px;
		text-align: center;
		.pages {
			margin-top: 5px;
		}
	}

	.el-table th {
		text-align: center !important;
	}

	.el-table {
		text-align: center;
	}

	/deep/ .el-table .cell {
		text-align: center;
		line-height: 16px;
	}
</style>
