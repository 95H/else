<template>
	<div class="content">
		<titleBack titleName="忘记密码" isShowRight="isHide"></titleBack>
		<div class="formWarp">
            <div class="inpWarp">
                <div class="successDiv">
                	<div class="successImg">
                		<img src="/web/images/loginRegister/success.png">
                	</div>
	                <p class="tips">重置密码邮件已发送成功</p>
	                <p class="timeout">已发送至{{$route.query.email}}</p>
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
  .formWarp{
    width:100%;
  }
</style>
<script>
	import axios from 'axios';
	export default {
		name:'resetForEmail',
		data (){
			return {
				isSuccess:true
			}
		},
	}
</script>
