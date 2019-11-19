<template>
	<div class="zlpg-content">
		<div class="zlpg-content-header">
			<ul class="list-group">
				<!--使用指令v-link进行导航-->
				<li>
					<router-link class="is-active" to="itemScript">项目底稿</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>
<style rel="stylesheet/scss" lang='scss' scoped>
.zlpg-content {
	height: 100%;
	flex-direction: column;
	display: -webkit-flex;
	display: flex;
	.zlpg-content-header {
		width: 100%;
		height: 35px;
		.list-group {
			li {
				a {
					position: relative;
				}
				a.is-active {
					display: block;
					color: #145FD2;
					font-weight: 600;
				}
				a.is-active:after {
					content: "";
					left: 0;
					position: absolute;
					bottom: 0px;
					width: 100%;
					height: 2px;
					background: #145FD2;
				}
			}
		}
	}
}
</style>
