<template>
	<div class="zlpg-home">
		<div class="zlpg-content">
			<div class="zlpg-content-header">
				<ul class="list-group">
					<li v-for="(item,key) in routerLink" :key="key">
						<router-link :to="'/zlpg'+item.jump">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="zlpg-home-content">
			<router-view></router-view>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				routerLink: [],
			}
		},
		created() {
			this.$store.state.queryUserSysFunction.forEach((val, key) => {
				if(val.title == "系统") {
					this.routerLink = val.list
				}
			})
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.zlpg-home {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		.zlpg-content-header>.list-group a:hover {
			color: #145FD2;
		}
		.zlpg-home-content {
			flex: 1;
			-ms-flex:1 0 auto;
		}
		.nav-container {
			background: #fff;
			border-bottom: 1px solid rgba(236, 236, 236, 1);
		}
	}
</style>