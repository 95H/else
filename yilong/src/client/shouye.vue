<template>
	<div id="shouye">
		<div class="lunbo">
			<!-- 轮播页面 -->
			<lunbos></lunbos>
		</div>
		<div class="gexinhua">
			<div class="gexinhua_c">
				<div class="gexinhua_c_l">
					<i class="gexinhua_i"></i>
					<a href="">登录</a>
					<em>展示你的个性化内容</em>
				</div>
			</div>
		</div>
		<div class="huadong">
			<div class="huadong_box">
			<!-- 图片滑动页面 -->
				<theme></theme>
			</div>
		</div>
		<div class="guonei">
			<div class="guonei_box">
				<!-- 目的地指数 -->
				<div class="mudi">
					<h2>
						<a href="">目的地指数</a>
						<span>覆盖全球75万家酒店,你想住的,我们都有</span>
					</h2>
		        </div>
		    <div class="guonei_a">
		    	<!-- 国内页面 -->
		    	<guonei></guonei>
		    </div>
		    <div class="guonei_b">
		    	<!-- 海外页面 -->
		    	<haiwai></haiwai>
		    </div>
			</div>
		</div>
		<div class="chaozhi">
			<div class="chaozhi_box">
				<!-- 超值特价票 -->
				<!-- <div class="chaozhi_title"> -->
					<!-- <h2><a href="">超值特价票</a></h2> -->
				<!-- </div> -->
				<!-- <div class="chaozhi_a"> -->
					<!-- 机票页面 -->
					<!-- <tejiaji></tejiaji> -->
				<!-- </div> -->
				<!-- <div class="chaozhi_b"> -->
				<!-- 火车票页面 -->
				<!-- <tejiahuo></tejiahuo> -->
			<!-- </div> -->
			<ticket></ticket>
			</div>
		</div>
		<div class="zhinan">
			<div class="zhinan_box">
				<!-- 指南页面 -->
				<zhinan></zhinan>
			</div>
		</div>
				<cont></cont>
	</div>
</template>

<script type="text/javascript">
import lunbos from './lunbo'
import zhinan from './zhinan'
import theme from './theme'
import cont from './cont'
import guonei from './guonei'
import haiwai from './haiwai'
// import tejiaji from './tejiaji'
// import tejiahuo from './tejiahuo'
import ticket from './ticket'


	export default{
		name:'shouye',
		components:{
			lunbos,
			zhinan,
			theme,
			guonei,
			haiwai,
			// tejiaji,
			// tejiahuo,
			ticket,
			cont
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../style/base.css';
	#shouye{
		width: 100%;
		.lunbo{
			width:100%;
			height: 380px;
		}
		.gexinhua{
			width: 100%;
			height: 32px;
			margin: 20px 0;
			font-size: 14px;
			text-align: center;
			.gexinhua_c{
				width: 1200px;
				height:32px;
				margin:0 auto;
				.gexinhua_c_l{
					width: 183px;
				height: 20px;
				padding: 5px 20px;
				border: 1px solid #ccc;
				color: #555;
				border-radius: 20px;
				.gexinhua_i{
					display: inline-block;
					width: 14px;
					height:14px;
					background:url(../static/icon_index.png) -583px -16px no-repeat;
				}
				}
			}
		}
		.huadong{
			width:100%;
			height:260px;
			.huadong_box{
				width:1200px;
				height: 100%;
				margin:0 auto;
			}
		}
		.guonei{
			width:100%;
			height:566px;
			.guonei_box{
				width:1200px;
				height: 566px;
				margin: 0 auto;
				.mudi{
					width: 1200px;
					height: 46px;
					margin:0 auto;
					h2{
						width:100%;
						height: 34px;
						padding:5px 0;
						border-bottom: 2px solid #f55;
						font-size:100%;
						margin-top: 20px;
						a{
							font: 24px/30px Microsoft yahei;
    						color: #f55;
    						padding-right: 10px;
    						}
    						span{
    							    font: 14px/30px Microsoft yahei;
    								color: #999;
						}
					}
				}
				.guonei_a{
					width:100%;
					height:250px;
				}
				.guonei_b{
					width: 100%;
					height: 250px;
					margin-top: 20px;
				}
			}
		}
		.chaozhi{
			width: 100%;
			height: 372px;
			margin-top: 20px;
			.chaozhi_box{
				width:1200px;
				height:372px;
				margin:0 auto;
				.chaozhi_title{
					width:100%;
					height:42px;
					h2{
						height:30px;
						border-bottom: 2px solid #49f;
    					padding: 5px 0;
					    a{
					    	font: 24px/30px Microsoft yahei;
						    color: #49f;
						    padding-right: 10px;
					    }
					}
				}
				.chaozhi_a{
					height:150px;
					background:yellow;
				}
				.chaozhi_b{
					height:150px;
					background:pink;
					margin-top:20px;
				}
			}
		}
		.zhinan{
			width:100%;
			height:306px;
			.zhinan_box{
				width:1200px;
				height:100%;
				margin:0 auto;

			}
		}
	}
</style>