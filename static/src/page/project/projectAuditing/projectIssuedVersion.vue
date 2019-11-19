<template>
	<div>
		<router-view></router-view>
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