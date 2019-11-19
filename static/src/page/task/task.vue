<template>
  <div class="zlpg-home">
		<div class="zlpg-content">
			<div class="zlpg-content-header">
				<ul class="list-group">
					<li v-for="(item,key) in routerLink" :key="key"><router-link :to="'/zlpg'+item.jump">{{item.title}}</router-link></li>
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
  data () {
		return {
			routerLink:[],
		}
	},
	created(){
		this.$store.state.queryUserSysFunction.forEach((val,key)=>{
			if(val.title == "任务"){
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
	.zlpg-home-header {
		width: 100%;
		height: 35px;
		.list-group /deep/ {
			line-height: 34px;
			border: 1px solid #ECECEC;
			overflow: hidden;
			background: #fff;
			li {
				float: left;
				margin-left: 30px;
				a {
					position: relative;
				}
				a.is-active {
					display: block;
					color: #145FD2;
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
	.zlpg-home-content {
		flex: 1;
		-ms-flex:1 0 auto;
		.search-btn,
		.reset-btn {
			padding: 0;
			width: 70px;
			height: 25px;
			border-radius: 2px;
			font-size: 13px;
			font-weight: 400;
			cursor: pointer
		}
		.p20 {
			padding: 0 20px;
		}
		.btnFr {
			float: right;
		}
		/* 头部 */
		.container {
			background: #fff;
		}
	}
}
</style>
