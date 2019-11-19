<template>
	<div class="headers">
		<div class="container">
			<header>
				<div class="head_c">
					<div class="head_l"></div>
					<div class="head_r">
						<div class="head_r_l">
							<span><a href="">里程商城</a></span>
							<span>|</span>
							<span><a href="">在线客服</a></span>
							<span>|</span>
							<span><a href="">Englis</a></span>
							<span class="sanjiao"></span>
						</div>
						<div class="head_r_r">
							<a href="" class="a_1">
								<i class="i_1"></i>
								<em>小程序</em>
								<em>体验更轻盈</em>
								<div class="a_1_w"></div>
							</a>
							<a href="" class="a_2">
								<i class="i_2"></i>
								<em>手机版</em>
								<em>专享五折起</em>
								<div class="a_2_w"></div>
							</a>
							<a href="" class="a_3">
								<i class="i_3"></i>
								<em class="em_1">7x24客服电话</em>
								<em class="em_2">4009-333-333</em>
								<div class="a_3_w">
									<p>国内：4009-333-333</p>
									<p>香港：852-8131-8883<br />
									852-8131-8983</p>
									<p>海外：86-10-6432-9999</p>
								</div>
							</a>
						</div>
					</div>
				</div>
			</header>
			<nav>
				<div class="nav_c">
					<div class="nav_l">
						<ul>
							<li v-for="names in name">
								<router-link :to="names.path">{{ names.alias }}</router-link>
							</li>
						</ul>
						<div class="bazhe"></div>
						<div class="hongbao"></div>
						<div class="yuding"></div>
					</div>
					<div class="nav_r">
						<router-link to="/Denglu">登录</router-link>
						<span>|</span>
						<router-link to="/Zhuce">注册</router-link>
						<div class="none">
							<div class="none_t">登录</div>
							<ul>
								<li>
									<b></b>
									<a href=""></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			<div class="nav_view">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'headers',
		components:{},
		data(){
			return {
				name:{}
			}
		},
		methods:{},
		mounted(){
			this.name=this.$router.options.routes[1].children;
			console.log(this.$router.options.routes[1].children);
		}
	}
</script>

<style  lang="scss" scoped="" type="text/css">
@import '../../style/base.css';
	.headers{
		width:100%;
		clear: float;
		.container{
			width: 100%;
			// height:115px;
			header{
				width: 90%;
				height: 50px;
				padding-top: 12px;
				margin: 0 auto;
				display:flex;
					justify-content:space-between;
					position:relative;
				.head_l{
					width:130px;
					height: 48px;
					background:url(../../static/jinglin.png) -658px 0px no-repeat;
				}
				.head_r{
					width: 860px;
					height:42px;
				     display:flex;
					justify-content:space-between;
					position:absolute;
					right: 0;
					top: 10px;
					.head_r_l{
						width: 350px;
						height: 21px;
						span{
							display:inline-block;
							font-size: 12px;
							color:#999;
							line-height: 20px;
							margin-left: 3px;
							margin-top: 8px;
							a{
								text-decoration: none;
								color:#999;
							}
						}
						span:hover{
							color: red;
						}
						a:hover{
							color: red;
						}
						.sanjiao{
							width: 11px;
							height: 8px;
							background:url(../../static/jinglin.png) -357px -773px no-repeat;
						}
					}
					.head_r_r{
						position:relative;
						i{
							display:inline-block;
							width: 42px;
							height: 42px;
							float:left;
						}
						.i_1{
							background:url(../../static/jinglin.png) -127px -763px no-repeat;
						}
						.i_2{
							background:url(../../static/com_icon01.gif) no-repeat;
						}
						.i_3{
							background:url(../../static/jinglin.png) -42px -762px no-repeat;
						}
						em{
							display:inline-block;
							font: 14px/18px Microsoft yahei;
							padding: 0 0 0 10px;
						}
						.a_1 em{
							color: #09bb07;
						}
						.a_2 em{
							color: #ff6a6a;
						}
						.a_3 .em_1{
							color:#999;
						}
						.a_3 .em_2{
							color:#2064c8;
						}
						.a_1_w{
							width: 237px;
							height: 114px;
							background:url(../../static/jinglin.png) -397px -174px no-repeat;
							position:absolute;
							top: 60px;
							display:none;
							z-index: 5;
						}
						.a_1:hover .a_1_w{
							display:block;
						}
						.a_2_w{
							width: 217px;
							height: 92px;
							border: 1px solid #999;
							background:url(../../static/jinglin.png) -465px -56px no-repeat;
							position:absolute;
							top: 60px;
							display:none;
							z-index: 5;
						}
						.a_2:hover .a_2_w{
							display:block;
						}
						.a_3_w{
							width: 170px;
							height: 115px;
							background:#fff;
							border: 1px solid #999;
							position:absolute;
							top: 60px;
							font-size:12px;
							color:#999;
							text-align: center;
							line-height:25px;
							display:none;
							z-index: 5;

						}
						.a_3_w p{
							margin-top: 5px;
						}
						.a_3:hover .a_3_w{
							display:block;
						}
					}
					.head_r_r a{
						display:inline-block;
						width:150px;
						height: 42px;
						margin-right: 10px;
					}
				}
			}
			nav{
				width: 100%;
				margin-top: 13px;
				background:#2064c8;
				.nav_c{
					width: 90%;
					height: 40px;
					margin:0 auto;
					display:flex;
					justify-content:space-between;
					.nav_l{
						width: 483px;
						height: 40px;
						ul{
							display:flex;
							li{
								flex:1;
								text-align:center;
								line-height:40px;
								font-size:12px;
								border-right: 1px solid #3774ce;
								a{
									color: #fff;
								}
								.router-link-active{
									display:block;
									color:#fff;
									background:#003679;
								}
							}
						}
						.bazhe{
							width:21px;
							height: 20px;
							background:url(../../static/jinglin.png) -511px 0 no-repeat;
							position:absolute;
							top: 65px;
							left: 250px;
						}
						.hongbao{
							width:39px;
							height:19px;
							background:url(../../static/jinglin.png) -589px 0 no-repeat;
							position:absolute;
							top: 65px;
							left: 320px;
						}
						.yuding{
							width:39px;
							height:20px;
							background:url(../../static/jinglin.png) -540px 0 no-repeat;
							position:absolute;
							top: 65px;
							left: 450px;
						}
					}
					.nav_r{
						width: 120px;
						height: 40px;
						background:#003679;
						text-align:center;
						position:relative;
						span{
							color:#fff;
						}
						a{
							color:#fff;
							font-size:14px;
							line-height:40px;
							margin:0 auto;
						}
						a:hover{
							color: #d7f54f;
						}
							.none{
						width:208px;
						height: 280px;
						background:#fff;
						border:1px solid #ccc;
						position:absolute;
						right: 0;
						 display: none;
						.none_t{
							width:180px;
							height:34px;
							margin:13px auto;
							background:#f80;
							line-height: 34px;
						    text-align: center;
						    font: 18px/34px Microsoft YaHei;
						    color: #fff;
						    border-radius: 3px;
						}
			}
					}
				}
			}
			.nav_view{
				width: 100%;
			}
		}
	}
</style>