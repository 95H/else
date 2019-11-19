<template>
	<div class="rolebody">
		<div class="rolehead">
			<span class="roleStyle">角色名称 ：</span>
			<el-input v-model="form.roleName" class="ipt"  placeholder="请输入角色名称"></el-input>
			<a class="search-btn" @click="searchEvent">查询</a>
		</div>
		<div class="rolebody-wrapper">
			<div class="roletable">
				<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" v-on:trclick="trclick">
					<div slot="tableTop">
						<a href="javascript:;" class="search-btn" @click="roleEvent('',$event)">新增角色</a>
					</div>
				</zltable>
			</div>
		</div>
	</div>
</template>

<script>
	var that
	import zltable from '../../components/zltable'
	import pagination from '@/components/pagination'
	import roleModify from '@/page/powerAdmin/roleModify'

	export default {
		components: {
			pagination,
			roleModify,
			zltable
		},
		data() {
			return {
				dialogTitle: '',
				dataTableHead: [{
						title: "角色姓名",
						name: "roleName",
            width: '260px'
					},
					{
						title: "角色描述",
						name: "depict"
					},
					{
						title: "创建人",
						name: "userName",
            width: '180px'
					},
					{
						title: "创建时间",
						name: "createTime",
            width: '180px'
					}
				],
				dataurl: '/api/sysrole/findPageList',
				form: {
					roleName: ''
				},
				commonBtn: '',
				extraBtn: '',
				judge: ''
			}
		},
		created() {
			that = this;
		},
		methods: {
			trclick(row) {
				that.roleEvent(row);
			},
			searchEvent() { // 搜索输入框事件
				this.$refs.zltable.refreshPage();
			},
			roleEvent(row) { // 新增角色按钮事件
				var _this = this;
				if(row) {
					var id = row.id;
					var roleName = row.roleName
					var depict = row.depict;
					that.dialogTitle = '修改角色'
					that.commonBtn = '删除';
					that.extraBtn = '保存';
//					that.dialogTitle = '查看角色';
//					/* 由于现在不同公司的人员互通，所以暂时关闭修改权限，后面处理好人员信息后再次开通 */
//					// that.dialogTitle = '修改角色';
//					// that.commonBtn = '删除';
//					// that.extraBtn = '保存';
					that.judge = false;
				} else {
					that.dialogTitle = '新增角色';
					that.commonBtn = '取消';
					that.extraBtn = '保存';
					that.judge = true;
				}

				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = that.dialogTitle;
				this.$store.state.componentsType = 'roleModify';
				this.$store.state.commonBtn = that.commonBtn;
				this.$store.state.extraBtn = that.extraBtn;
				this.$store.state.dataObj = {
					id: id,
					roleName: roleName,
					depict: depict,
					judge: that.judge
				};
				this.$store.state.refresh = function() {
					_this.$refs.zltable.refreshPage();
				}
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
			display: flex;
			align-items: center;
			background-color: #fff;
			padding: 13px 0;
			.roleStyle {
				margin-left: 20px;
			}
			.search-btn {
				margin-left: 20px;
			}
		}
		.rolebody-wrapper {
			/*padding-bottom: 10px;*/
			height: calc(100% - 10px);
			margin-top: 10px;
			background: #fff;
			box-sizing: border-box;
			.roletable,
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
					position: relative;
					.rolehead {
						position: relative;
						margin-left: 10px;
						height: 25px;
						.el-form {
							position: absolute;
							top: -8px;
							left: 220px;
							line-height: 25px;
							.el-form-item {
								margin-bottom: 0;
								.search-btn {
									line-height: 22px;
									font-size: 13px;
								}
							}
						}
					}
					/deep/ .txt {
						padding: 0 0 0 15px;
					}
					/deep/ .ipt-wrap .ipt-container .el-input[data-v-76acdfad] {
						width: 200px;
						padding: 1px 0 0 10px;
						margin-top: 0;
					}
				}
			}
		}
	}

	.el-table {
		text-align: center;
		line-height: 16px
	}

	/deep/ .el-table .cell {
		text-align: center;
		line-height: 16px;
	}

	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.newSe {
		/deep/ .el-dialog {
			width: 500px;
			height: 400px;
		}
		/deep/ .el-dialog__title {
			font-size: 14px !important;
			color: #fff;
		}
		/deep/ .el-dialog__headerbtn {
			top: 7px;
			.el-dialog__close {
				color: #fff;
			}
		}
		/deep/ .el-dialog__header {
			background: #2AB0D4 !important;
			padding: 4px 20px 4px;
		}
		/deep/ .el-dialog__body {
			position: relative;
			box-sizing: border-box;
			background-color: #F8F8F8;
			height: 320px;
			padding: 20px 20px;
			/*overflow: auto;*/
			box-sizing: border-box;
			.newContain {
				height: 70px;
			}
			.name {
				width: 66px;
				height: 25px;
				line-height: 25px;
				text-align: right;
				margin-right: 10px;
				font-size: 13px;
			}
			.redd {
				color: red;
				line-height: 25px;
			}
			.nameIpt {
				width: 200px;
				height: 25px;
				line-height: 25px;
			}
			/*/deep/ .el-scrollbar{height: 100%;}*/
			/deep/ .center-inp {
				position: absolute;
				overflow: hidden;
			}
			/deep/ .tree-inner {
				position: absolute;
				top: 72px;
				width: 440px;
				box-sizing: border-box;
				height: 200px;
				overflow: auto;
				border-left: 1px solid #ccc;
				border-right: 1px solid #ccc;
				border-radius: 3px;
				padding: 10px;
				box-shadow: 0 0 3px 0 rgba(202, 202, 202, 1);
				.auth {
					height: 29px;
					border-bottom: 1px solid #F2F2F2;
					vertical-align: baseline;
					span {
						display: block;
						background: #fff;
						width: 120px;
						padding: 8px 15px;
						font-weight: normal;
						text-align: left;
					}
				}
				/deep/ .el-tree {
					background-color: #F8F8F8;
					border-bottom: 1px solid #ccc;
				}
			}
		}
		/deep/ .el-dialog__footer {
			height: 60px;
			border-top: 1px solid #ccc;
			text-align: center !important;
			/deep/ .dialog-footer {
				position: absolute;
				bottom: 10px;
				margin-top: 15px;
				left: 158px;
			}
			/deep/ .el-button {
				background: #fff;
				border: none;
			}
			/deep/ .el-button--primary {
				background: #fff !important;
				color: #606266;
			}
		}
	}

	.newContain {
		/*padding:0 20px;*/
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
	/*.right{width: 59%;margin-left: 5px}
    li{height: 40px;line-height: 40px;margin-bottom: 2px;
    /deep/ .el-input .el-input__inner{height: 40px !important;}
    }*/

	.pagination-container {
		margin-top: 30px;
		padding-bottom: 20px;
		background: #fff;
		display: flex;
		justify-content: center;
	}

	.roleStyle {
		font-size: 13px;
		line-height: 25px;
	}

	.ipt {
		width: 120px;
		vertical-align: top;
	}

	.dialog-footer {
		display: flex;
		justify-content: center;
		.confirm {
			margin-right: 25px;
		}
		.g {
			margin-top: 11px;
			color: #979797;
		}
		.cancel {
			margin-left: 25px;
		}
	}
</style>
