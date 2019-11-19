<template>
	<div class="zhinan">
		<div class="zhinan_c">
			<div class="zhinan_title">
				<h2><a href="">旅游指南</a></h2>
			</div>
			<div class="zhinan_bottom">
				 <div class="zhinan_b_l">
					<ul class="controls">
						<li>
							<router-link to="/zhinan_a">
							<span class="zhinan_span"></span>
							<a href="">市郊民宿 吃热气腾腾的火锅盆</a>
						</router-link>
					    </li>
						<li>
							<router-link to="/zhinan_b">
								<span class="zhinan_span"></span>
								<a href="">盘点江浙泸亲子酒店</a>
							</router-link>
						</li>
						<li>
							<router-link to="/zhinan_c">
								<span class="zhinan_span"></span>
								<a href="">泸沽湖客栈的正确打开方式</a>
							</router-link>
						</li>
						<li>
							<router-link to="/zhinan_d">
								<span class="zhinan_span"></span>
								<a href="">这个冬天去惠斯勒滑雪</a>
							</router-link>
						</li>
					</ul>
					<ol class="contents">
						<li class="item active">
							<router-link to="/zhinan_a">
								<img src="../static/17121251.jpg" height="320" width="600">
							</router-link>
						</li>
						<li class="item">
							<router-link to="/zhinan_b">
								<img src="../static/17121252.jpg" height="320" width="600">
							</router-link>
						</li>
						<li class="item">
							<router-link to="/zhinan_c">
								<img src="../static/17121253.jpg" height="320" width="600">
							</router-link>
						</li>
						<li class="item">
							<router-link to="/zhinan_d">
								<img src="../static/17121254.jpg" height="320" width="600">
							</router-link>
						</li>
					</ol>
				</div>
				<div class="zhinan_b_r">
					<ul>
						<li class="li_l">
							<router-link to="/menghuanjiaqi">
								<img src="../static/17121256.jpg">
								<p><a href=" ">菲律宾 9座岛屿梦幻假期</a></p>
							</router-link>
						</li>
						<li class="li_r">
							<router-link to="/beijingshendan">
								<img src="../static/17121255.jpg">
								<p><a href="">今冬北京 圣诞情浓</a></p>
							</router-link>
						</li>
					</ul>
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'zhinan',
		component:{},
		data(){
			return {

			}
		},
		mounted(){
			let list = document.querySelectorAll(".controls li");
			let contents = document.querySelectorAll(".contents .item");
			for(let i = 0;i<list.length;i++){
                list[i].onmouseover = function(){
					for(let j = 0;j<list.length;j++){
						list[j].className = "";
                        contents[j].className = "item";
					}
					    this.className = "active";
                        contents[i].className = "item active";   
				}
			}
	}
}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../style/base.css';
	.zhinan{
		width: 100%;
		height: 274px;
		margin-top: 20px;
		.zhinan_c{
			width: 1200px;
			height:274px;
			margin:0 auto;
			.zhinan_title{
				width: 1200px;
				height:42px;
				h2{
					display: block;
					width: 1200px;
					height:30px;
					padding: 5px 0;
					border-bottom: 2px solid #77cc11;
					font-size: 100%;
					font-weight: normal;
					font: 24px/30px Microsoft yahei;
					a{
						color: #77cc11;
					}
				}
			}
		}
		.zhinan_bottom{
			width: 1200px;
			height:222px;
			padding-top: 10px;
			overflow: hidden;
			.zhinan_b_l{
				width: 580px;
				height:220px;
				float:left;
				position: relative;
				ul{
					width: 220px;
					height:230px;
					float:left;
					position:absolute;
					top: 0;
					left: 0;
					li{
						height: 54px;
					    line-height: 54px;
					    width: 232px;
					    position: relative;
					    a{
					    	width: 200px;
						    overflow: hidden;
						    height: 57px;
						    font: 14px/57px Microsoft yahei;
						    color: #555;
						    padding: 0 10px;
						    display: block;
						    overflow: hidden;
						    border-bottom: 1px solid #ccc;
					    }
					}
				}
				ol{
					width: 350px;
					height: 220px;
					float:left;
					position:absolute;
					top: 0;
					left:220px;
					li{
						width: 350px;
    					height: 220px;
    					display:none;
    					.zhinan_span{
    						width:12px;
    						height:19px;
    						background:url(../static/icon_index.png) -547px -1px no-repeat;
    					}
    					img{
    						width: 350px;
    					    height: 220px;
    					}
					}
					.active{
						display:block;
					}
				}
			}
			.controls li:hover{
				background:#89ca00;
			}
			.zhinan_b_r{
				width: 600px;
				height:222px;
				float:right;

				ul{
					width:100%;
					height:100%;
					li{
						width:290px;
						height:222px;
						overflow:hidden;
						img{
								width:337.5px;
								height: 180px;
							}
							p{
								height: 40px;
							    font: 14px/40px Microsoft yahei;
							    background: #f7f7f7;
							    color: #555;
							    margin-bottom: 1px;
							    color:#37e;
							    padding:0 5px;
								}
								a{
									display:block;
								}
								a:hover{
									color:red;
									border-bottom:2px solid green;
								}
					}
						.li_l{
							float:left;
							border-bottom:2px solid green;
						}
						.li_r{
							float:right;
						}
				}
			}
		}
	}
</style>