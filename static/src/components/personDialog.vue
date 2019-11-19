<template>
	<center-dialog ref="centerDialog" dialogTitle="选择人员" @centerCanclePreson="centerCanclePreson" dialogWidth="600px" dialogHeight="450px">
		<div slot="dialogContent">
			<div class="overflowHidden">
				<div class="mechanism fl" :class="{personAcitve:personAcitve}">
					<div>
						<el-input
						  placeholder="请输入人员关键字"
						  v-model="filterText">
						</el-input>
						<el-scrollbar class="el-scrollbar">
							<el-tree
							  class="filter-tree"
							  :data="treeData"
							  :props="defaultProps"
							  default-expand-all
							  :filter-node-method="filterNode"
							  @node-click="selectedPreson"
							  highlight-current
							  :expand-on-click-node=false
							  ref="personTree">
							</el-tree>
						</el-scrollbar>
					</div>
				</div>
				<div class="fr selectedPreson">
					<div class="selected-num"><span class="fr blue pointer" @click="clear">清空</span>已选（{{ selectPersonName?1:0 }}）</div>
					<div class="persons-list">{{ selectPersonName }}</div>
				</div>
			</div>
			<div class="clear text-center">
				<a class="search-btn" @click.stop="surePreson">确定</a>
				<a class="reset-btn" @click.stop="canclePreson">取消</a>
			</div>

		</div>
	</center-dialog>
</template>

<script>
	import centerDialog from '@/components/centerDialog';
	export default {
	  name: 'personDialog',
		components: {
			centerDialog
		},
		data(){
			return {
				treeData: [],
				personAcitve:false,
	        	defaultProps : {
                    children: 'data',
                    label: 'title',
                },
				filterText: '',
				selectPersonName:'',
				selectPersonId:'',
				type:''
			}
		},
		methods:{
			//点击节点
			selectedPreson(data){
				if(!data.isDept){
					this.personAcitve = true;
					this.selectPersonName = data.title;
					this.selectPersonId = data.value;
				}else{
					this.personAcitve = false;
					this.selectPersonName = '';
					this.selectPersonId = '';
				}
			},
			//确定
			surePreson(){
				this.$emit('setPersonId', this.type,this.selectPersonName,this.selectPersonId);
				this.$refs.centerDialog.closeDialog();
			},//取消
			canclePreson(){
				this.$refs.centerDialog.closeDialog();
				this.filterText = '';
			},
			//点击叉关闭页面的回调
			centerCanclePreson(){
				this.filterText = '';
			},
			//搜索
		    filterNode(value, data) {
		        if (!value) return true;
		        return data.title.indexOf(value) !== -1;
		    },
		    //请求接口
			showPersonDialog(chargeAppraiser,id,name){
				let _this = this;
				this.type = chargeAppraiser;
				this.selectPersonId = id;
				this.selectPersonName = name;
				if(_this.treeData.length == 0){
					this.$http.post("/api/sysgroup/getGroupAndUserTree").then(function(res){
		                _this.treeData = res.data;
		                console.log(_this.treeData)
		                //debugger
		            }).catch(function(error){
		                _this.$messageError(error);
		            })
				}
				_this.$refs.centerDialog.showDialog();

			},
			//清空
			clear(){
				this.selectPersonId = '';
				this.selectPersonName = '';
				this.personAcitve = false;
			}
		},
		watch: {
	    	filterText(val) {
	        	this.$refs.personTree.filter(val);
		    }
	   	},
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.mechanism{width: 400px;height:310px;
		.el-input /deep/{height: 28px;width: 390px;
			.el-input__inner{width:100%; margin: 0;}
		}
		.el-scrollbar /deep/{margin: 8px 10px 0 0;height: 284px;border:1px solid #E5E5E5;margin-bottom:0;
			.el-scrollbar__wrap {height: calc(285px + 16px);}
			.filter-tree{padding:10px;}
		}
	}
	.selected-num{ padding: 10px; border-bottom: 1px solid #e6e6e6;font-size: 13px}
	.selectedPreson{width: 150px;height:320px;border:1px solid #E5E5E5;
		.persons-list{padding: 5px 10px;font-size: 13px;}
	}
	.text-center{margin-top: 20px;}
	.personAcitve /deep/{
		.is-current>.el-tree-node__content .el-tree-node__label{color:#145FD2;border-radius:2px;line-height: 16px;}
	}
</style>
