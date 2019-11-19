<template>
	<div ref="examineModification" class="examine-modification">
		<!-- 顶部内容 -->
		<div class="projectImplementation-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		created() {
			this.$store.state.isfixedFlag = true;
		},
		mounted() {
		},
		methods: {}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
</style>