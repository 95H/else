<template>
	<div class="footerLists cl">
		<mt-tabbar v-model="selected" ref="footerLists">
		  <mt-tab-item id="1" @click.native="setClick('首页','1','/')">
		    <i slot="icon" class="iconfont">&#xe622;</i>
		    首页
		  </mt-tab-item>
		  <mt-tab-item id="2" @click.native="setClick('分类','2','/classify')">
		     <i slot="icon" class="iconfont">&#xe61e;</i>
		    分类
		  </mt-tab-item>
		  <mt-tab-item id="3"  @click.native="checkUrl('学习','3','/studyCenter')">
		    <i slot="icon" class="iconfont">&#xe645;</i>
		    学习
		  </mt-tab-item>
		  <mt-tab-item id="4"  @click.native="checkUrl('个人','4','/personalPage/personal')">
		    <i slot="icon" class="iconfont">&#xe620;</i>
		    个人
		  </mt-tab-item>
		</mt-tabbar>
    <div class="white_Box" v-show="isIphoneX"></div>
	</div>
</template>
<style lang="less">
	@import '../../static/css/variable.less';
	.activeClass{
		color: #38adff;
	}
	.footerLists{
    position:fixed;
    left:0;
    bottom:0;
    right: 0;
    left:0;
    width:100%;
    height:unit(106/@u,@uu);
    z-index:100;
    -webkit-transform: translateZ(0);
    .white_Box{
      width: 100%;
      height: unit(40/@u,@uu);
      background: #fff;
      position: absolute;
      bottom: 0;
    }
		.mint-tabbar{
      position:relative;
      width:100%;
      overflow: visible;
      height:unit(106/@u,@uu);
			background: #fefefe;
			border-top: 1px solid #efefef;
			.mint-tab-item{
				padding:5px 0 0  0;
				.mint-tab-item-icon{
					width: 35px;
				    height:30px;
				    margin: 0 auto;
				    line-height: 30px;
				    i{
				    	font-size: unit(48/@u,@uu);
				    	color:#a9a9a9;
				    }
				}
			}
			.is-selected{
				background: none;
				color:@primaryColor;
				.mint-tab-item-label{
					color:@primaryColor
				}
				.mint-tab-item-icon{
					i{
						color: @primaryColor;
					}
				}
			}
			.mint-tab-item-label{
				font-size: unit(20/@u,@uu);
				color: #9d9d9d;
			}
		}
	}
</style>
<script>
//import {zhugeTrack} from '~/plugins/filter'
import { getCookie, isIphoneX } from '~/plugins/filter'
	export default {
		name:'footerBar',
		data (){
			return {
				selected:'',
				islogin:'',
				personalUrl:'',
        tudyCenterUrl:'',
//      zhugeTrack:zhugeTrack
        isIphoneX: false
			}
		},
		watch:{
			"$route":'getRout'
		},
		beforeMount(){
			this.getRout();
		},
		mounted(){
			this.islogin= getCookie('sign') || localStorage.getItem('globalLogin');
      if (isIphoneX() && this.$route.fullPath === '/') {
        this.isIphoneX = true;
        this.$refs.footerLists.$el.style.bottom = '18px'
      }
		},
    	methods:{
    		getRout(){
    			if(this.$route.path=="/"){
				  this.selected="1"
				}else if(this.$route.path=='/classify'){
		          this.selected='2'
		      	}else if(this.$route.path=='/studyCenter'){
		          this.selected='3';
		      	}else if(this.$route.path=="/personalPage/personal"){
		          this.selected="4"
		    	}
    		},
		    setClick(tabName,val,url){
//        this.zhugeTrack('H5-点击底部tab',{'tab名称':tabName});
		    	this.selected=val;
		    	this.$router.push({path:url})
		    },
		    checkUrl(tabName,val,url){
//        this.zhugeTrack('H5-点击底部tab',{'tab名称':tabName});
		    	this.selected=val;
		    	if(this.islogin){
		    		this.$router.push({path:url})
		    	}else{
            window.localStorage.setItem('redirectUrl',url);
		    		this.$router.push({path:'/loginRegister/phoneLogin'})
		    	}
		    }
      }
}
</script>
