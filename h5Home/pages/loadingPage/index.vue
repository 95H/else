<template>
	<div class="loadWarp">
		<div class="load_Img">
			<img src="/web/images/myBursary/loading1.gif"/>
			<p>登录中...</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {appBaseUrl} from '~/api/apiurl'
	import {getCookie,setCookie} from '~/plugins/filter'
	export default {
		name :'loadingPage',
		data(){
			return{

			}
		},
		mounted(){
			axios({
				url:appBaseUrl+'/bxg/onlineUser/getCurrentUser',
				method:'get',
				params:{
					sign:this.$route.query.sign
				}
			}).then((res) =>{
				if(res.data.success){
					let resultData=res.data.resultObject;
					localStorage.setItem('sign',this.$route.query.sign)
					setCookie('sign',this.$route.query.sign)
					setCookie('userId', resultData.id)
					localStorage.setItem('userId',resultData.id)
					localStorage.setItem('nickName',resultData.name)
					localStorage.setItem('globalLogin',true)
					var _this=this
					setTimeout(function(){
						window.location.href=_this.$route.query.location_url
					},300)
				}else{
					window.location.href='/'
				}
			})
		}
	}
</script>

<style lang="less">
	body{
		background: #3fb39d !important;
		position: relative;
		.loadWarp{
			width: 100%;
			height: 100%;
			background: #3fb39d !important;
			.load_Img{
				width:12.5rem;
				height:9.375rem;
				position: absolute;
				top: 45%;
				left: 50%;
				transform: translate(-50%,-50%);
	            -ms-transform: translate(-50%,-50%);
	            -webkit-transform: translate(-50%,-50%);
	            -o-transform: translate(-50%,-50%);
	            -moz-transform: translate(-50%,-50%);
				img{
					width: 100%;
					height: 100%;
				}
				p{
					position: absolute;
					top: 50%;
					left: 50%;
					margin-top:2.5rem;
					transform: translate(-50%,-50%);
		            -ms-transform: translate(-50%,-50%);
		            -webkit-transform: translate(-50%,-50%);
		            -o-transform: translate(-50%,-50%);
		            -moz-transform: translate(-50%,-50%);
		            color: #FFFFFF;
				}
			}
		}
	}
</style>