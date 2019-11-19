<template>
	<div class="headbar cl" >
        <div class="headlogo">
        	<router-link :to="{path:'/'}">
        		<img src="../../static/web/images/common/logo.png">
        	</router-link>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
	@import '../../static/css/variable.less';
	.headbar{
	    width:100%;
	    height:unit(100/@u,@uu);
	    background:#ffffff;
	    line-height:unit(100/@u,@uu);
	    padding:0 unit(30/@u,@uu);
	    position: fixed;
	    left: 0;
	    top: 0;
	    z-index: 100;
      box-shadow:0px 0 7px 3px rgba(0,0,0,0.05);
	  .headlogo{
	    float:left;
	    height:100%;
	    width:unit(182/@u,@uu);
	    height: unit(52/@u,@uu);
		  img{
		    width:100%;
		    height:100%
		  }
	  }
    }
</style>
<script>
	export default {
		name:'Logo',
		mounted () {
			const logState= localStorage.getItem('globalLogin') ? localStorage.getItem('globalLogin'):false;
			this.$store.dispatch('userLogin',logState)
		}
	}
</script>
