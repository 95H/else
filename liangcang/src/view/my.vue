<template>
	<div id="my">
		<div class="myheader">良仓</div>
		<div class="mymessige">
			<div class="mymessigecode"><input type="text" placeholder="输入验证码"><button>获取验证码</button></div>
			<div class="mymessigeiphone"><input type="text" placeholder="输入手机号"></div>
			<div class="mymessigeradio"><input type="checkbox">自动登录</div>
			<div class="mymessigelogin">登录</div>
			<div class="mymessigehref" @click="tologin()">用已有账号登录></div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"my",
		data(){
			return{
				
			}
		},
		methods:{
			tologin(){
				this.$router.push({ path: '/login'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.myheader{
		width: 100%;
		height: 1.066667rem;
		background-color: #24272F;
		text-align: center;
		font-size: .4rem;
		color: white;
		line-height: 1.066667rem;
	}
	.mymessige{
		width: 90%;
		height: 6.666667rem;
		margin:0 auto;
		.mymessigecode{
			width: 100%;
			margin-top: .666667rem;
			margin-bottom: .666667rem;
			input{
				width: 60%;
				height: .666667rem;
				border:none;
				border-bottom:1px solid #A0A0A0; 
				margin-right: .4rem;
			}
			button{
				background-color: white;
				width: 25%;
				height: .666667rem;
				border:1px solid #A0A0A0; 
				border-radius: .133333rem;
				font-size: .36rem;
			}
		}
		.mymessigeiphone{
			width: 100%;
			input{
				width: 90%;
				height: .666667rem;
				border: none;
				border-radius: .066667rem;
				border-bottom:1px solid #A0A0A0; 
			}
		}
		.mymessigeradio{
			width: 100%;
			font-size: .466667rem;
			margin: .4rem 0;
		}
		.mymessigelogin{
			width: 100%;
			height: .96rem;
			background-color: #000;
			text-align: center;
			line-height: .96rem;
			color: white;
			font-size: .466667rem;
		}
		.mymessigehref{
			width: 100%;
			height: .96rem;
			text-align: center;
			line-height: .96rem;
			font-size: .36rem;
			padding-top: .4rem;
		}
	}
</style>