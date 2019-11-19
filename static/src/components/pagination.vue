
<template>
	<!--父组件这样传值。绑定方法。 <pagination :pagesize="pagesize" :totalDataNum="totalDataNum" v-on:currentPage="currentPage"></pagination> -->
	<div class="block ">
	    <el-pagination
	    	class=""
	    	@current-change="handerCurrentChange"
		  	background
			layout="prev, pager, next"
			:current-page="page"
		  	:page-size="pagesize"
		  	:total="totalDataNum">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'pagination',
		props: {
			page:{
				type:Number,
				default: 1
			},
			pagesize: Number,
			totalDataNum: Number
		},
		data() {
			return {
				currentPage : this.page || 1
			};
		},
		methods: {
			handerCurrentChange(val) {
				this.$emit('currentPageFn', val,true)
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>

</style>
