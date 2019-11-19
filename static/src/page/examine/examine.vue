<template>
    <div class="zlpg-home">
        <div class="zlpg-content">
			<div class="zlpg-content-header">
				<ul class="list-group" >
					<li v-for="(item,key) in routerLink" :key="key">
						<router-link :to="'/zlpg'+item.jump">{{item.title}}</router-link>
					</li>
				</ul>
			</div>
		</div>
        <router-view></router-view>
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
				if(val.title == "审核"){
					this.routerLink = val.list
				}
			})
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.zlpg-home{
	height: 100%;flex-direction:column;display: -webkit-flex;display: flex;
}
</style>