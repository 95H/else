<template>
	<div id="footers">
		<footer>
			<div class="foot_t">
				<dl class="dl_1">
					<dt>{{franchise}}</dt>
				    <dd v-for="(coop,item) in cooperation" :key="item"><a href="">{{coop.text}}</a></dd>
				</dl>
				<dl class="dl_2">
					<dt>{{about}}</dt>
				    <dd v-for="(coop2,item) in cooperation" :key="item"><a href="">{{coop2.text}}</a></dd>
				</dl>
				<dl class="dl_3">
					<dt>艺龙APP下载</dt>
				    <dd><i class="wei_1"></i></dd>
				</dl>
				<dl class="dl_4">
					<dt>艺龙官方微信</dt>
				    <dd><i class="wei_2"></i></dd>
				</dl>
				<dl class="dl_5">
					<dt>艺龙官方小程序</dt>
				    <dd><i class="wei_3"></i></dd>
				</dl>
			</div>
			<div class="foot_c">
				 © 2000 - 2017 北京艺龙信息技术有限公司, eLong, Inc or its affiliates. All Rights Reserved. 
				 <a href="">京ICP证010011号</a>
				 <a href="">
				 	<i class="gunan"></i>
				 京公网安备11010502026059号</a>
				 <a href="">
				 	<i class="gunan_2"></i>
				 	经营执照
				 </a>
			</div>
			<div class="foot_b">
				<a href="" class="a_1"></a>
				<a href="" class="a_2"></a>
				<a href="" class="a_3"></a>
				<a href="" class="a_4"></a>
				<a href="" class="a_5"></a>
				<a href="" class="a_6"></a>
			</div>
		</footer>
	</div>
</template>

<script>
	export default{
		name:'footers',
		data() {
			return {
				franchise:'加盟合作',
				cooperation:[{text:'酒店加盟'},{text:'开放平台'},{text:'代理合作'},{text:'广告服务'},{text:'商家中心'}],
				about:'关于艺龙',
				elong:[{text:'酒店大全'},{text:'国际酒店'},{text:'旅行保险'},{text:'校园招聘'},{text:'联系我们'}],
				
				
			}
		},
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../../style/base.css';
#footers{
	footer{
		width: 100%;
		height: 252px;
		padding: 20px 0px;
		margin-top: 20px;
		border-top: 1px solid #eee;
		min-width: 1000px;
		overflow: hidden;
		.foot_t{
			width:1000px;
			height: 148px;
			margin:0 auto;
			font-size: 12px;

			.dl_1,.dl_2{
				width: 18%;
				height: 148px;
				padding-left: 20px;
				float: left;
				padding-left: 2%;
			}
			.dl_3,.dl_4,.dl_5{
				height: 138px;
				width: 18%;
				padding-left: 20px;
				float: left;
				padding-left: 1.5%;
			}
			dt{
				border-left: 3px solid #5D96C7;
			    padding: 0 0 0 10px;
			    height: 18px;
			    font: 18px/1 Microsoft Yahei;
			    margin-bottom: 10px;
			}
			.wei_1{
				width: 100px;
				height: 100px;
				display: inline-block;
				background:url(../../static/jinglin.png) -259px -56px no-repeat;
			}
			.wei_2{
				width: 100px;
				height: 100px;
				display: inline-block;
				background:url(../../static/jinglin.png) -362px -58px no-repeat;
			}
			.wei_3{
				width: 100px;
				height: 100px;
				display: inline-block;
				background:url(../../static/jinglin.png) -155px -56px no-repeat;
			}
			dd{
				margin-left: 12px;
				padding-left: 14px;
			    line-height: 24px;
			}
			a{
				color: #333;
			}
			a:hover{
				color: red;
			}
		}
		.foot_c{
			width: 100%;
			height:27px;
			margin:20px 0;
			text-align: center;
			font-size:12px;
			color:#333;
			.gunan{
				width: 20px;
				height: 20px;
				display:inline-block;
				background:url(../../static/anbei.png);
			}
			.gunan_2{
				width: 22px;
				height: 27px;
				display:inline-block;
			}
			a{
				color: #333;
			}
		}
		.foot_b{
			width:100%;
			height:37px;
			text-align:center;
			.a_1{
				display:inline-block;
				width: 80px;
				height:37px;
				background:url(../../static/jinglin.png) -329px -436px no-repeat;
			}
			.a_2{
				display:inline-block;
				width: 60px;
				height:37px;
				background:url(../../static/jinglin.png) -331px -482px no-repeat;
			}
			.a_3{
				display:inline-block;
				width: 92px;
				height:37px;
				background:url(../../static/jinglin.png) -473px -436px no-repeat;
			}
			.a_4{
				display:inline-block;
				width: 92px;
				height:37px;
				background:url(../../static/jinglin.png) -565px -436px no-repeat;
			}
			.a_5{
				display:inline-block;
				width: 92px;
				height:37px;
				background:url(../../static/jinglin.png) -657px -436px no-repeat;
			}
			.a_6{
				display:inline-block;
				width: 83px;
				height:37px;
				background:url(../../static/jinglin.png) -393px -477px no-repeat;
			}
		}
	}
	}
</style>
