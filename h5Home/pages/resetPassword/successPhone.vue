<template>
	<div class="content">
		<titleBack titleName="忘记密码" isShowRight="isHide"></titleBack>
		<div class="formWarp">
            <div class="inpWarp">
                <div class="successDiv">
                	<div class="successImg">
                		<img src="/web/images/loginRegister/success.png">
                	</div>
	                <p class="tips">修改成功</p>
	                <p class="timeout">{{timeout}}秒后将自动跳转到首页</p>
	                <router-link :to="{path:'/'}">
	                	进入首页
	                </router-link>
            	</div>
        	</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "../loginRegister/loginRegister.less";
</style>
<script>
	export default {
		name:'successPhone',
		data(){
			return {
				timeout:10,
			}
		},
		mounted () {
			this.returnPage()
		},
		methods:{
			returnPage () {
				var _self=this
				var timer =setInterval(function(){
					_self.timeout--;
					if(_self.timeout==0){
						clearInterval(timer);
						window.location="/";
					}
				},1000)
			}
		}
	}
</script>
