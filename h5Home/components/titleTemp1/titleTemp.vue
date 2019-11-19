<template>
  <!-- titleTemp -->
	<div class="headbar cl" >
		<div class="headWarp">
			    <div class="headlogo">
        		<a href="javascript:;" @click="zhugeTrack('H5_顶部-点击LOGO',{'来源':titleName},'/')"><img src="../../static/web/images/common/logo.png"></a>
	        </div>
	        <p class="headTitle" :class="isShowClassName=='headTitle'?'show':'hide'">{{titleName}}</p>
          <div class="subTitle" :class="isShowClassName=='subTitle'?'show':'hide'">
            <span class="fengexian"></span>
            <span class="subTitle_name">{{titleName}}</span>
          </div>
		</div>
    </div>
</template>
<script>
  import {zhugeTrack} from '~/plugins/filter'
	export default {
		name:'titleTemp',
    props:['titleName','isShowClassName'],
    data(){
      return {
        zhugeTrack:zhugeTrack
      }
    },
    mounted () {
      const logState= localStorage.getItem('globalLogin') ? localStorage.getItem('globalLogin'):false;
      this.$store.dispatch('userLogin',logState)
    }
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../static/css/variable.less';
  .show{
    display:inline-block!important;

  }
  .hide{
    display:none!important;
    span{
      display:none!important;
    }
  }
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
  .headWarp{
    height: 100%;
    width: 100%;
    position: relative;
  .headTitle{
    display:inline-block;
    height: 100%;
    font-size: unit(36/@u,@uu);
    color: #333;
    line-height:unit(100/@u,@uu);
    margin-left:unit(105/@u,@uu);
  }
  .headlogo{
    height:100%;
    vertical-align: middle;
    width:unit(182/@u,@uu);
    height: unit(52/@u,@uu);
    display:inline-block;
  img{
    width:100%;
    height:100%;
    display: block;
  }
  }
  .subTitle{
    display:inline-block;
  span{
    display:inline-block;
    vertical-align: middle;
    margin-top: 4px;
  }
  .fengexian{
    width:unit(2/@u,@uu);
    height:unit(19/@u,@uu);
    margin:0 unit(10/@u,@uu);
    background-color:#d7d7d7;
  }
  .subTitle_name{

  }
  }
  }
  }
</style>
