<template>
	<div id="zhuce">
		<header>
			<div class="logo"></div>
		</header>
		<div class="container">
			<h1>
				<label>注册新会员</label>
				<span>已有艺龙账号,</span>
				<a href="">直接登录</a>
			</h1>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'zhuce'
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../style/base.css';
	#zhuce{
		width: 100%;
		height: 100%;
		background: #e8eff6;
		overflow: hidden;
		header{
			width: 1000px;
			height:50px;
			padding: 25px 0;
			margin: 0 auto;
			.logo{
				width: 113px;
				height:48px;
				background:red;
				background:url(../static/myelong_login.png) 0 0 no-repeat;
				img{
					width: 113px;
					height: 48px;
				}
			}
		}
		.container{
			width: 940px;
			height:612px;
			background-color: #fff;
            padding: 36px 30px;
            margin: 0 auto;
            h1{
            	color: #555;
    			white-space: nowrap;
    			display: block;
                font-size: 20px;
                label{
                	font-size: 24px;
				    font-family: Microsoft YaHei, SimHei, Arial, Helvetica, sans-serif;
				    display: inline-block;
				    margin-right: 20px;
				    cursor: default;
                }
                span{
                	font-size: 14px;
				    font-weight: normal;
				    color: #555;
				    white-space: nowrap;
                }
                a{
                	font-size: 14px;
				    font-weight: normal;
				    color: #36c;
                }
            }
		}
	}
</style>