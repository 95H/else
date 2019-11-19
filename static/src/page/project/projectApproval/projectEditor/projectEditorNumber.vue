<template>
	<div class="project-number">
		<div class="content">
			<div class="top">
				<span class="fw600">集群项目编号<i class="iconfont icon-lixiangshenqingxinxi fl"></i></span>
			</div>
			<div class="subproject">
				<table-tree v-if="isShowTreeTable" :columns="columns" :tree-structure="true" :data-source="dataSource" :tableHeader="true" :defaultExpandAll="true" treeType="btn" v-on:operationNodeFun='operationNodeFun' v-on:editorNumberFun='editorNumberFun'></table-tree>
			</div>
		</div>
		
	</div>
</template>

<script>
	import tableTree from '@/components/tableTree.vue';
	export default {
		name: 'projectNumber',
		components: {
			tableTree
		},
		data(){
			return {
				columns: [{
						text: '项目名称',
						dataIndex: 'projectName',
						type: 'text'
					},
					{
						text: '项目编号',
						dataIndex: 'projectNumber',
						type: 'inputspan'
					},
					{
						text: '操作',
						width: '60'
					}
				],
				dataSource:[],
				isShowTreeTable: true,
				startNumber:'',
				afterNumber:'',
				isfirst:true,
			}
		},
		created(){
			var _this = this;
			this.$http.post('/api/project/getProjectColonyById',{
				projectId:this.$store.state.projectId
			})
			.then(function(data){
				if(data.data.length){
					_this.startNumber = data.data[0].projectNumber;
				}
				_this.dataSource = data.data;
				_this.$store.state.dataSource = data.data;
			});
		},
		mounted(){
//			this.$store.state.projectNumber = this.startNumber;
		},
		methods:{
			operationNodeFun(val){
				var index = val.row.projectNumber.indexOf('-');
				if(index > 0){
					var num = val.row.projectNumber.substring(0,index);
					num = this.startNumber;
				}else{
					val.row.projectNumber = this.startNumber;
				}
			},
			//编辑项目编号
			editorNumberFun(val){
				var _this = this;
				if(val.row.projectNumber.length>10){
					this.$message({
						type: 'info',
						message: '项目编号只能10位以内!'
					});
				}else{
					this.getArr(_this.dataSource,val.row.projectNumber);
				}
			},
			// getArr(arr,num){
			// 	arr.forEach((item,val) => {
			// 		var index = item.projectNumber.indexOf('-');
			// 		if(item.projectNumber != num){
			// 			item.projectNumber = num+item.projectNumber.substring(index);
			// 		}
			// 		if(item.children.length > 0) {
			// 			this.getArr(item.children, num);
			// 		}
			// 	})
			// }
			getArr(arr,num){
				if(this.isfirst){
					this.getArrItem(this.dataSource,this.startNumber);
					this.isfirst=false;
				}
				arr.forEach((item,val) => {
					// var index = item.projectNumber.indexOf('-');
					if(item.projectNumber != num){
						item.projectNumber = num+item.projectNumberItem
					}
					if(item.children.length > 0) {
						this.getArr(item.children, num);
					}
				})
			},
			getArrItem(arr,num){
				arr.forEach((item,val) => {
					var index = item.projectNumber.indexOf('-');
					if(item.projectNumber){
						item.projectNumberItem = item.projectNumber.substring(index,item.projectNumber.length);
					}
					if(item.projectNumber) {
						this.getArrItem(item.children, num);
					}
				})
			}
		}
	}
	
</script>

<style scoped lang="scss">
	.project-number {
		padding: 15px 20px;
		background: #fff;
		min-height: 400px;
		.content {
			border:1px solid rgba(229,229,229,1);
			.subproject {
				padding: 15px 20px;
				/deep/ .el-table .el-table__header-wrapper thead th {
					background: #F4F4F4;
				}
			}
			.top {
				background:rgba(246,250,255,1);
				height: 30px;
				line-height: 30px;
				border-bottom: 1px solid rgba(229,229,229,1);
				font-size: 13px;
			}
		}
		.iconfont {
			font-size: 13px;
			margin-right: 10px;
			margin-left: 20px;
		}
		.icon-lixiangshenqingxinxi {
			color: #7C9FEE;
			font-weight: normal;
		}
	}
</style>