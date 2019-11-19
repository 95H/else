<template>
	<div id="tejiaji">
		<h3>
			<em>更多></em>
			<a href=""><i></i>机票</a>
			<span class="on">北京出发</span>
			<span>上海出发</span>
			<span>广州出发</span>
			<span>杭州出发</span>
			<span>上海出发</span>
			<span>成都出发</span>
		</h3>
		<div class="tejiaji_b">
			<ul>
				<li>
					<a href="">
						<span>
							<b>北京</b>
							<i class="yan"></i>
							<b>烟台</b>
						</span>
						<span class="span_2">
							<b>02月16日</b>
							<em><span>1.4折</span></em>
							<b class="a_price"><s>￥</s>"100"</b>
						</span>
					</a>
				</li>
				<li>
					<a href="">
						<span></span>
						<span></span>
					</a>
				</li>
				<li>
					<a href="">
						<span></span>
						<span></span>
					</a>
				</li>
				<li>
					<a href="">
						<span></span>
						<span></span>
					</a>
				</li>
				<li>
					<a href="">
						<span></span>
						<span></span>
					</a>
				</li>
				<li>
					<a href="">
						<span></span>
						<span></span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'tejiaji'
	}
</script>

<style lang="scss" scoped="" type="text/css">
	#tejiaji{
		width: 1200px;
		height: 150px;
		margin-top: 10px;
		h3{
			width: 1200px;
			height: 28px;
			padding: 10px 0;
			em{
				width: 45px;
				height: 24px;
				position: relative;
				top: 6px;
				float: right;
				color: #555;
				font: 14px/24px Microsoft yahei;
			}
			a{
				width: 65px;
				height: 26px;
				padding-right:20px;
				font: 18px/26px Microsoft yahei;
			    color: #555;
			    float: left;
			    i{
			    	float:left;
			    	width: 24px;
				    height: 24px;
				    overflow: hidden;
				    padding-right: 5px;
				    background:url(../static/icon_index.png) -573px -190px no-repeat;
			    }
			}
			span{
			    	font: 14px/22px Microsoft yahei;
				    color: #555;
				    padding: 1px 10px;
				    margin: 4px 10px 0;
				    border-radius: 12px;
				    cursor: pointer;
				    float: left;
			    }
			    .span_2{
			    	display: block;
    overflow: hidden;
    clear: both;
    margin-left: 20px;
    margin-top: 10px;
    color: #555;
			    }
			    .on{
			    	background: #49f;
  					  color: #fff;
			    }
		}
		.tejiaji_b{
			width:1200px;
			height: 102px;
			overflow:hidden;
			ul{
				position: relative;
			    left: 1px;
			    height: 102px;
			    li{
			    	width: 198px;
				    background: #f4f9ff;
				    border: 1px solid #d8e8fe;
				    height: 98px;
				    float: left;
				    margin: 0 0 0 -1px;
				    a{
				    	display: block;
					    width: 100%;
					    height: 100%;
					    color: #555;
					    span{
					    	display: block;
						    overflow: hidden;
						    clear: both;
					        margin-left: 20px;
					        margin-top: 20px;
					        color: #555;
					        b{
					        	width: 70px;
							    overflow: hidden;
							    height: 30px;
							    text-align: center;
							    font: 14px/30px Microsoft yahei;
							    float: left;
					        }
					        i{
					        	float: left;
					        	margin-top: 5px;
					        	width: 30px;
							    height: 20px;
							    background:url(../static/icon_index.png) -569px -170px no-repeat;
					        }
					        em{
					        	float: left;
							    background: #090;
							    color: #fff;
							    border-radius: 8px;
							    margin: 5px 5px 0;
							    width: 30px;
							    padding: 0 3px;
							    overflow: hidden;
							    text-align: center;
					        }
					    }
				    }
			    }
			}
		}
	}
</style>