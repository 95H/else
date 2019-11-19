<template>
    <header class="headbar cl" >
        <div class="headlogo" @click="zhugeTrack('H5_顶部-点击LOGO',{},'/')">
        	<img src="../../static/web/images/common/logo.png">
        </div>
        <div class="searchIcon" v-if="isShow">
        	<a @click="zhugeTrack('H5_顶部-点击搜索',{},'/seachPage/search')">
        		<img src="../../static/web/images/common/search.png">
        	</a>
        </div>
    </header>
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
      right: 0;
	    z-index: 19881121;
      box-shadow:0px 0 7px 3px rgba(0,0,0,0.05);
      -webkit-transform: translateZ(0);
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
	  .searchIcon{
	    float:right;
	    width:unit(36/@u,@uu);
	    height:unit(36/@u,@uu);
		  img{
		    width:100%;
		    height:100%
		  }
	  }
  }
</style>
<script>
import {zhugeTrack} from '~/plugins/filter'
	export default {
		name:'headBar',
		data () {
			return {
				isShow:true,
        		zhugeTrack:zhugeTrack
			}
		},
		mounted () {
			const logState= localStorage.getItem('globalLogin') ? localStorage.getItem('globalLogin'):false;
			this.$store.dispatch('userLogin',logState)
			if(this.$route.path=="/personalPage/personal"){
				this.isShow=false
			}else{
				this.isShow=true
			}
		}
	}
</script>
