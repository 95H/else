<template>
	<div class="post-con">
		<div class="wrapper-parent">
			<div class="wrapper-leftBox content-shadow">
        <template v-if="treeData.length > 0">
          <template v-for="(item,index) in treeData">
            <div class="postMana-cont">
              <el-button type="primary" class="btn" :class="{selected: item.id == active}" @click="btnClick(item.id,item.rankName,item.id)">{{ item.rankName }}</el-button>
              <div class="postMana-cont-bottom"><i class="el-icon-arrow-down"></i></div>
            </div>
          </template>
        </template>
			</div>
			<div class="wrapper-rightBox">
				<div class="content-shadow">
					<div class="right-container">
						<div style="display:flex;">
							<span class="txt">当前职位名称 ：</span>
							<el-input type="text" class="ipt" v-model="positionIpt"></el-input>
						</div>
						<div class="btn-container">
							<a href="javascript:;" class="search-btn" @click="modify">修改</a>
							<a href="javascript:;" class="reset-btn" @click="deleteFn">删除</a>
						</div>
					</div>
					<div class="right-container">
						<div style="display:flex;">
							<span class="txt">新增职级名称 ：</span>
							<el-input type="text" class="ipt" v-model="addPositionIpt"></el-input>
						</div>
						<div class="btn-container">
							<a href="javascript:;" class="search-btn" @click="addUp('up')">新增上级职级</a>
							<a href="javascript:;" class="search-btn" @click="addDown('down')">新增下级职级</a>
						</div>
					</div>
					<div class="right-container">
						<div style="display:flex;">
							<span class="txt">新增岗位名称 ：</span>
							<el-input type="text" class="ipt" v-model="addPostIpt"></el-input>
						</div>
						<div class="btn-container">
							<a href="javascript:;" class="search-btn" @click="addPost">新增岗位</a>
						</div>
					</div>
					<div class="table-hook">
						<el-table :data="tableData" border style="width: 100%">
							<el-table-column prop="postName" label="岗位名称" align="center" width="379">
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button type="text" class="fs13" @click="tableEdit(scope.$index, scope.row)">修改</el-button>
									<el-button type="text" class="fs13" @click="tableDelete(scope.$index, scope.row.id)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
		<center-dialog ref="centerDialog" dialogWidth='400px' dialogHeight="160px" dialogTitle="修改岗位名称" titlePosition="center">
			<div slot="dialogContent">
				<div class="dialog">
					<span class="redd">*</span><span class="txt">岗位名称 ：</span>
					<el-input class="dialogIpt" type="text" v-model="dialogIpt"></el-input>
				</div>
				<div class="dialog-footer">
					<a href="javascript:;" class="search-btn" @click="dialogConfirm">确定</a>
					<a href="javascript:;" class="reset-btn" @click="dialogCancel">取 消</a>
				</div>
			</div>
		</center-dialog>

	</div>
</template>

<script>
	var that
	import centerDialog from '@/components/centerDialog.vue';

	export default {
		components: {
			centerDialog
		},
		data() {
			return {
				positionIpt: '',
				addPostIpt: '',
				addPositionIpt: '',
				pId: '',
				id: '',
				active: '',
				dialogIpt: '',
				treeData: [],
				tableData: []
			}
		},
		created() {
			that = this;
			that.initTree();
		},
		methods: {
			initTree() {
				let data = {}
				this.$http.post('/api/sysRank/findList', data)
					.then(res => {
						that.treeData = res.data.sysRankList;
						if(that.treeData.length > 0) {
							that.active = that.treeData[0].id
							that.pId = that.treeData[0].id
							that.id = that.treeData[0].id
							that.positionIpt = that.treeData[0].rankName // 当前职位名称
							that.initTable(that.pId);
						}
					}).catch(err => {
						console.log(err);
					})
			},
			initTable(rankId) {
				let data = {
					rankId: rankId
				}
				this.$http.post('/api/sysPost/findPageList', data)
					.then(res => {
						that.tableData = res.data
					}).catch(err => {
						console.log(err);
					})
			},
			btnClick(pid, name, id) {
				that.pId = pid
				that.active = pid;
				that.id = id;
				that.positionIpt = name // 点击当前职位名称
				that.initTable(that.pId);
			},
			addUp() {
				var addPositionStr = (that.addPositionIpt).replace(/(^\s*)|(\s*$)/g, "")
				if(addPositionStr != '') {
					this.$confirm('确认新增上级职级？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => { // 确认
						this.$http.post('/api/sysRank/saveOrUpdSysRank', {
							rankName: that.addPositionIpt,
							sxType: 'up',
							pId: that.pId
						}).then(res => {
							that.$message({
								type: 'success',
								message: '新增成功'
							});
							that.addPositionIpt = '';
							that.initTree();
						}).catch(err => {
							that.$message({
								type: 'error',
								message: '相同职级，请重新填写'
							});
							console.log(err);
						})
					}).catch(() => { // 取消
						that.$message({
							type: 'info',
							message: '已取消'
						});
						that.addPositionIpt = ''; //
					});
				} else {
					that.$message({
						type: 'error',
						message: '新增职级名称不能为空'
					});
				}

			}, // 新增上职级
			addDown() {
				var addPositionStr = (that.addPositionIpt).replace(/(^\s*)|(\s*$)/g, "")
				if(addPositionStr != '') {
					this.$confirm('确认新增下级职级？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => { // 确认
						this.$http.post('/api/sysRank/saveOrUpdSysRank', {
							rankName: that.addPositionIpt,
							sxType: 'down',
							pId: that.pId
						}).then(res => {
							that.$message({
								type: 'success',
								message: '新增成功'
							});
							that.addPositionIpt = '';
							that.initTree();
							that.initTree();
						}).catch(err => {
							that.$message({
								type: 'error',
								message: '相同职级，请重新填写'
							});
							console.log(err);
						})
					}).catch(() => { // 取消
						that.$message({
							type: 'info',
							message: '已取消'
						});
						that.addPositionIpt = ''; //
					});
				} else {
					that.$message({
						type: 'info',
						message: '新增职级名称不能为空'
					});
				}
			}, // 新增下职级

			addPost() { // 新增岗位
				var addPostStr = (that.addPostIpt).replace(/(^\s*)|(\s*$)/g, "")
				if(addPostStr != '') {
					this.$confirm('确认新增岗位？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => { // 确认
						this.$http.post('/api/sysPost/saveOrUpdSysPost   ', {
							postName: that.addPostIpt,
							rankId: that.pId
						}).then(res => {
							that.initTable(that.pId);
							that.addPostIpt = '';
						}).catch(err => {
							that.$message({
								type: 'error',
								message: '相同岗位，请重新填写'
							});
							console.log(err);
						})
					}).catch(() => { // 取消
						that.$message({
							type: 'info',
							message: '已取消'
						});
					});
				} else {
					that.$message({
						type: 'error',
						message: '新增岗位名称不能为空'
					});
				}
			},
			modify() {
				var positionStr = (that.positionIpt).replace(/(^\s*)|(\s*$)/g, "")
				if(positionStr != '') {
					this.$confirm('确认修改职级名称？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => { // 确认
						this.$http.post('/api/sysRank/saveOrUpdSysRank', {
							rankName: that.positionIpt,
							pId: that.pId,
							id: that.id
						}).then(res => {
							if(res.msg == '此数据已存在，请确认！') {
								that.$message({
									type: 'error',
									message: '相同职级'
								});
							} else {
								that.$message({
									type: 'success',
									message: '修改成功'
								});
								that.initTree();
							}
						}).catch(err => {
							console.log(err);
						})
					}).catch(() => { // 取消
						that.$message({
							type: 'info',
							message: '已取消'
						});
						that.addPositionIpt = ''; //
					});
				}
			},
			deleteFn() {
				this.$confirm('确认删除职级？', '提示', {
					confirmButtonText: '确认',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => { // 确认
					this.$http.post('/api/sysRank/deleteSysRank', {
						rankId: that.pId
					}).then(res => {
						that.$message({
							type: 'success',
							message: '修改成功'
						});
						that.initTree();
					}).catch(err => {
						that.$message({
							type: 'error',
							message: '该职级下有岗位，不能删除，请确认！'
						});
						console.log(err);
					})
				}).catch(() => { // 取消
					that.$message({
						type: 'info',
						message: '已取消'
					});
					that.addPositionIpt = ''; //
				});
			},
			tableEdit(index, row) {
				that.dialogIpt = row.postName;
				that.id = row.id;
				this.$refs.centerDialog.showDialog();
			},
			dialogConfirm() {
				let data = {
					postName: that.dialogIpt,
					rankId: that.pId,
					id: that.id
				}
				this.$http.post('/api/sysPost/saveOrUpdSysPost', data)
					.then(res => {
						that.$message({
							type: 'success',
							message: '修改成功'
						});
						that.initTable(that.pId);
						this.$refs.centerDialog.closeDialog();
					}).catch(err => {
						console.log(err);
					})
			},
			dialogCancel() {
				that.$message({
					type: 'info',
					message: '已取消'
				});
				this.$refs.centerDialog.closeDialog();
			},
			tableDelete(index, id) {
				let data = {
					id: id
				}
				this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http.post('/api/sysPost/deleteSysPost', data)
						.then(res => {
							that.initTable(that.pId);
							that.$message({
								type: 'success',
								message: '删除成功'
							});
						}).catch(err => {
							console.log(err);
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.post-con {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.wrapper-parent {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			background: #fff;
			border: 1px solid #E5E5E5;
			box-sizing: border-box;
			height: 100%;
			margin-top: 10px;
		}
		.wrapper-leftBox {
			width: 220px;
			margin-right: 10px;
		}
		.content-shadow {
			height: 100%;
			box-shadow: 0px 0px 3px 0px rgba(202, 202, 202, 1);
			border-radius: 3px;
			padding: 10px;
			box-sizing: border-box;
			.right-container {
				display: flex;
				margin-bottom: 10px;
				.txt {
					font-size: 13px;
					width: 100px;
					height: 25px;
					line-height: 25px;
				}
				.ipt {
					width: 270px;
				}
				.btn-container {
					margin-left: 10px;
					.btnStyle {
						padding: 0 15px;
						height: 25px;
						line-height: 25px;
						font-size: 13px;
					}
				}
				&:nth-child(2) {
					.btn-container>.search-btn {
						width: 100px;
					}
				}
			}
			.table-hook {
				/deep/ .el-table__header-wrapper {
					font-size: 13px;
				}
			}
		}
		.postMana-cont:last-child .postMana-cont-bottom {
			display: none;
		}
		.el-button.btn {
			width: 200px;
			height: 40px;
			background: #2AB0D4;
			font-size: 13px
		}
		/deep/ .el-button--primary.btn:hover {
			background: #63D2F1 !important;
			border-color: #63D2F1 !important;
		}
		/deep/ .selected {
			background: #63D2F1 !important;
			border-color: #63D2F1 !important;
		}
		.postMana-cont-bottom {
			text-align: center;
			line-height: 30px;
		}
		.postMana-cont-tit:hover,
		.postMana-cont-tit-this {
			background: #63D2F1;
		}
		.active {
			background: #fd7522;
			border: 1px solid #fd7522;
		}
		.postMana-cont-tit {
			background: #2AB0D4;
			color: #fff;
			border-radius: 5px;
			line-height: 40px;
			text-align: center;
			cursor: pointer;
			margin-bottom: 10px;
		}
		.postMana-cont-bottom {
			text-align: center;
			line-height: 30px;
		}
		.wrapper-rightBox {
			flex: 1;
			-ms-flex:1 0 auto;
		}
		.content-shadow {
			box-shadow: 0px 0px 3px 0px rgba(202, 202, 202, 1);
			border-radius: 3px;
			padding: 10px;
			box-sizing: border-box;
		}
		/deep/ .center-body {
			padding: 0 !important;
		}
		.dialog {
			display: flex;
			background: #fff;
			padding: 20px;
			.redd {
				color: red;
				line-height: 25px;
			}
			.txt {
				font-size: 13px;
				height: 25px;
				line-height: 25px;
			}
			.dialogIpt {
				margin-left: 10px;
				width: 260px;
				height: 25px;
				line-height: 25px;
			}
		}
		.dialog-footer {
			display: flex;
			justify-content: center;
			padding: 10px 0 20px 0;
			a {
				margin: 0 5px;
			}
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
	}
</style>