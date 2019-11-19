<template>
	<div class="bottom">
		<div class="bottom_c">
			<ul>
				<!-- <li><router-link class="li_1" to="/jiudianyuding">酒店预订</router-link></li>
				<li><router-link to="/jipiaochaxun">机票查询</router-link></li>
				<li><router-link to="/jiudiantuangou">酒店团购</router-link></li>
				<li><router-link to="/remenchengshi">热门城市</router-link></li>
				<li><router-link to="/hezuohuoban">合作伙伴</router-link></li>
				<li><router-link to="/changjianjiudian">常见酒店</router-link></li> -->

				<li class="top_1">
					<a href="" class="li_1">酒店预订</a>
					<div class="bottom_1"></div>
				</li>
				<li>
					<a href="">机票查询</a>
					<div class="bottom_2"></div>
				</li>
				<li>
					<a href="">酒店团购</a>
					<div class="bottom_3"></div>
				</li>
				<li>
					<a href="">热门城市</a>
					<div class="bottom_4"></div>
				</li>
				<li>
					<a href="">合作伙伴</a>
					<div class="bottom_5"></div>
				</li>
				<li>
					<a href="">常见酒店</a>
					<div class="bottom_6"></div>
				</li>

			</ul>
		</div>
		<div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'bottom'
	}
</script>

<style lang="scss" scoped="" type="text/css">
@import '../style/base.css';
	.bottom_c{
		background: #7c8fa2;
	    height: 40px;
	    line-height: 40px;
	    min-width: 1000px;
	    ul{
	    	width: 1000px;
	    	height:40px;
	    	display: flex;
	    	margin: 0 auto;
	    	text-align: center;
	    	font-size: 12px;
	    	li{
	    		flex:1;
	    		a{display:block;
	    			color:#fff;
	    		}
	    		a:hover{
	    			background:#8da1b5;
	    		}
	    		.li_1{
	    			color:#333;
	    			background:#c0d2e4;
	    		}
	    	}
	    }
	}
</style>