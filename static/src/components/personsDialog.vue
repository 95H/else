<template>
	<center-dialog ref="centerDialog" dialogTitle="选择人员" @centerCanclePreson="centerCanclePreson" dialogWidth="600px" dialogHeight="450px">
		<div slot="dialogContent">
			<div class="overflowHidden">
				<div class="mechanism fl">
					<div>
						<el-input
						  placeholder="请输入人员关键字"
						  v-model="filterText">
						</el-input>
						<el-scrollbar class="el-scrollbar">
							<el-tree
								show-checkbox
								class="filter-tree"
								:data="treeData"
								:props="defaultProps"
								default-expand-all
								:filter-node-method="filterNode"
								highlight-current
								node-key="value"
								:expand-on-click-node=false
								:check-on-click-node=true
								@node-click="selectedPresons"
								@check="selectedPresons"
								ref="personsTree">
							</el-tree>
						</el-scrollbar>
					</div>
				</div>
				<div class="fr selectedPreson">
					<div class="selected-num"><span class="fr blue pointer" @click="clear">清空</span>已选（{{ selectPersonName.length }}） </div>
					<el-scrollbar>
						<div>
							<div class="persons-list" v-for="(item,index) in selectPersonName" :key="index">{{ item }}</div>
						</div>
					</el-scrollbar>
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
                    disabled: 'isDept',
                },
				filterText: '',
				selectPersonName:[],
				selectPersonId:[],
				type:''
			}
		},
		methods:{
			//点击节点
			selectedPresons(data,node,elem){
				let getCheckedNodesArr = this.$refs.personsTree.getCheckedNodes();
				let selectedPersonsIdArr = [];
				let selectedPersonsNameArr = [];
				getCheckedNodesArr.forEach((item,index)=>{
					if(!item.isDept){
						selectedPersonsIdArr.push(item.value);
						selectedPersonsNameArr.push(item.title)
					}
				})
				this.selectPersonName = selectedPersonsNameArr;
				this.selectPersonId = selectedPersonsIdArr;
			},
			//点击确定
			surePreson(){
				this.$emit('setPersonId', this.type,this.selectPersonName,this.selectPersonId);
				this.$refs.centerDialog.closeDialog();
				this.treeData=[];
			},
			//取消
			canclePreson(){
				this.$refs.centerDialog.closeDialog();
				this.treeData=[];
				this.filterText = '';
			},
			//点击叉关闭页面的回调
			centerCanclePreson(){
				this.treeData=[];
				this.filterText = '';
			},
			//搜索
		    filterNode(value, data) {
		        if (!value) return true;
		        return data.title.indexOf(value) !== -1;
		    },
		    //请求树的接口
			showPersonDialog(chargeAppraiser,id,name){
				let _this = this;
				this.type = chargeAppraiser;
				if(id != ''){
					this.selectPersonId = id.split(',');
					this.selectPersonName = name.split(',');
				}else{
					this.selectPersonId = [];
					this.selectPersonName = [];
				}
				if(_this.treeData.length == 0){
					this.filterText = '';
					this.$http.post("/api/sysgroup/getGroupAndUserTree").then(function(res){
		                _this.treeData = res.data;
		                _this.$refs.personsTree.setCheckedKeys(_this.selectPersonId);
		                //console.log(_this.treeData)
		            }).catch(function(error){
		                _this.$messageError(error);
		            })
				}
				_this.$refs.centerDialog.showDialog();
			},
			//清空
			clear(){
				this.selectPersonId = [];
				this.selectPersonName = [];
				this.$refs.personsTree.setCheckedKeys([]);
			}
		},
		watch: {
	    	filterText(val) {
	        	this.$refs.personsTree.filter(val);
		    }
	   	},
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.mechanism{width: 400px;height:310px;
		.el-input /deep/{height: 26px;width: 390px;
			.el-input__inner{width:100%; margin: 0;}
		}
		.el-scrollbar /deep/{margin: 8px 10px 0 0;height: 285px;border:1px solid #E5E5E5;margin-bottom:0;
			.el-scrollbar__wrap {height: calc(286px + 16px);}
			.filter-tree{padding:10px;}
			.is-current>.el-tree-node__content{background: #fff;}
		}
	}
	.selectedPreson{width: 150px;height:320px;border:1px solid #E5E5E5;
		/deep/ .el-scrollbar{height:  calc(100% - 17px); }
		.persons-list{padding: 5px 10px;font-size: 13px;}
	}
	.selected-num{ padding: 10px; border-bottom: 1px solid #e6e6e6;font-size: 13px}
	.text-center{margin-top: 20px;}
	/*.personAcitve /deep/{
		.is-current>.el-tree-node__content .el-tree-node__label{color:#145FD2;background:#EDF5FF;border-radius:2px;border:1px solid #91BDFF;line-height: 16px;padding: 2px;}
	}*/
</style>
