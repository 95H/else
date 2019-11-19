<template>
	<div class="alyerWarp" v-bind:class="{ active: isActive }" :isActive="isActive">
		<div class="myDialog alertIn">
			<div class="top">
				<img src="/web/images/myBursary/wxLayer.png" class="bg"/>
				<img src="/web/images/myBursary/weixin.jpg" class="wxCode"/>
				<div class="alyerTxt">
					<h3>绑定微信后可提现</h3>
					<p>1. 关注微信服务号：博学谷云课堂</p>
					<p>2. 点击底部菜单完成绑定博学谷账号</p>
				</div>
				<div class="btn" @click="closeDia">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'wxBind',
		props:['isActive'],
		data (){
			return{
				 isClose:this.isActive
			}
		},
		methods:{
			closeDia (){
				this.$emit('closeLayer',false);
			}
		}

	}
</script>

<style lang="less">
	@import "../../../static/css/variable.less";
	.active{
	    display: block !important;
	}
	.alyerWarp{
		top: 0px;
	    right: 0px;
	    bottom: 0px;
	    left: 0px;
	    position:absolute;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 999;
	    display: none;
	    .myDialog{
	    	width:unit(530/@u,@uu);
		    left: 50%;
		    top:unit(215/@u,@uu);
		    position:absolute;
            margin-left:unit(-265/@u,@uu);
		    .top{
		    	width: 100%;
		    	position:relative;
		    	.alyerTxt{
		    		position: absolute;
		    		bottom: unit(151/@u,@uu);
		    		left: 0;
		    		width: 100%;
					h3{
						font-size:unit(36/@u,@uu);
						color: @color3;
						margin-bottom: unit(9/@u,@uu);
						text-align: center;
						width: 100%;
					}
					p{
						font-size:unit(26/@u,@uu);
						color: @color9;
						padding-left:unit(70/@u,@uu);
						line-height: unit(36/@u,@uu);
						user-select:text !important;
						-webkit-user-select:text !important;
					}
		    	}
		    	.bg{
		    		width:100%;
		    		height:100%;
		    	}
		    	.wxCode{
		    		width: unit(280/@u,@uu);
		    		height: unit(280/@u,@uu);
		    		position:absolute;
		    		left:50%;
		    		top:unit(45/@u,@uu);
		    		transform: translateX(-50%);
		    	}
		    	 .btn{
			    	width: 100%;
			    	height:unit(100/@u,@uu);
			    	line-height:unit(100/@u,@uu);
			    	text-align: center;
			    	font-size: unit(36/@u,@uu);
			    	color:@primaryColor;
			    	position: absolute;
			    	bottom: 0;
			    	left: 0;
			    }

		    }

	    }
	}
</style>
