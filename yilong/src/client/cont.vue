<template>
	<div class="cont">
		<div class="quanqiu">
			<div class="quanqiu_c">
				<div class="quanqiu_c_c">
					<ul>
						<li>
							<i class="quanqiu_1"></i>
							<span>全球110万家酒店</span>
						</li>
						<li>
							<i class="quanqiu_2"></i>
							<span>订酒店返现金高达20%</span>
						</li>
						<li>
							<i class="quanqiu_3"></i>
							<span>国际酒店8折起</span>
						</li>
						<li>
							<i class="quanqiu_4"></i>
							<span>7×24小时服务</span>
						</li>
				    </ul>
				</div>

			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
export default{
	name:'cont',
}
</script>

<style lang="scss" scoped="" type="text/css">
	@import '../style/base.css';
	.cont{
       .quanqiu{
			width: 100%;
			height: 101px;
			margin-top: 20px;
			.quanqiu_c{
				min-width: 1200px;
				height:101px;
				background:#f7f7f7;
				margin:0 auto;
				border:1px solid #fff;
				.quanqiu_c_c{
					width: 1160px;
					height: 60px;
					margin:20px auto;
					ul{
					width: 1160px;
					height: 60px;
					display: flex;
					li{
						width: 290px;
						height:60px;
						flex: 1;
						line-height: 60px;
						}
						li:hover i{
						    transform:rotate(30deg);
						}
						i{
							display:inline-block;
							width: 60px;
							height:60px;
							margin:0 10px 0 0;
							float:left;
							transition: All 0.2s linear;
						}
						span{
							display:inline-block;
                            font: 16px/60px Microsoft yahei;
                            float: left;
						}
						.quanqiu_1{
							background:url(../static/icon_index.png) -91px -4px no-repeat;
						}
						.quanqiu_2{
							background:url(../static/icon_index.png) -159px -4px no-repeat;
						}
						.quanqiu_3{
							background:url(../static/icon_index.png) -228px -4px no-repeat;
						}
						.quanqiu_4{
							background:url(../static/icon_index.png) -295px -6px no-repeat;
						}
				}
				}
			}
		}
		}
</style>