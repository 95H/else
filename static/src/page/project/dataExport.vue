<template>
	<div class="data-export">
		<div class="data-export-info">
			<div class="top">
				<i class="iconfont icon-renwuxiangqing"></i>
				<span>公司列表</span>
			</div>
			<div class="checkbox-group">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				<el-checkbox-group v-model="checkList" @change="handleCheckedChange">
					<el-checkbox v-for="(item,index) in tabArr" :label="item.sheetGroupId" :title="item.name" :key="index" class="textOverflow1">{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</div>
				
		</div>	
	</div>
</template>

<script>
	export default {
		data(){
			return {
				checkAll: false,
				isIndeterminate: false,
				tabArr: this.$store.state.dataObj.tabArr,
				checkList: [],
				checkAllList: []
			}
		},
		created(){
			this.checkAllList = this.$store.state.dataObj.tabArr.map((item)=>{
				return item.sheetGroupId
			})
		},
		methods: {
			//项目汇总导出
			childMethod() {
				if(this.checkList.length){
					window.location.href = "/api/project/exportPjCollect?token=" + this.$getCookie("token") + "&sheetGroupIds=" + this.checkList.join(',') + "&year=" + this.$store.state.dataObj.year;
					this.$store.commit('changeShowCommon');
					this.$messageSuccess("正在导出,请稍后。")
				}else{
					this.$messageError("请至少选择一个公司！")
				}
			},
			handleCheckAllChange(val) {
        this.checkList = val ? this.checkAllList : [];
        this.isIndeterminate = false;
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkAllList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkAllList.length;
      }
		}
	}
</script>

<style lang="scss" scoped>
	.data-export {
		padding: 20px;
		.data-export-info {
			background: rgba(255, 255, 255, 1);
			border-radius: 2px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			margin-bottom: 10px;
			.top {
				height: 35px;
				background: #fafafa;
				border-radius: 2px 2px 0px 0px;
				border: 1px solid rgba(236, 236, 236, 1);
				border-left: 0;
				border-right: 0;
				line-height: 35px;
				i {
					color: #f7b543;
					margin-left: 16px;
				}
				span {
					display: inline-block;
					margin-left: 10px;
					font-size: 13px;
					font-weight: 600;
				}
			}
			.checkbox-group{
				padding: 20px;
				.el-checkbox{
					line-height: 24px;
					width: 220px;
					margin-left: 0px;
					margin-right: 18px;
				}
			}
			
		}
	}
</style>