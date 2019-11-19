<template>
	<div class="content discountsClass">
		<titleBack titleName="优惠课程"></titleBack>
		<div class="main">
			<mt-loadmore
					class="scrolling tabPage"
					:bottomMethod="loadBottom"
					:bottom-all-loaded="allLoaded"
					:autoFill="isFull"
					@bottom-status-change="handleTopChange"
					v-bind:class="{classTop:classTop}"
					ref="loadmore">
          <transition-group tag="ul" name="item" class="professionCourses-show cl">
					    <jobCourseTemp v-for="(item,index) in this.getDiscountsClass.items" :key="item.id"
                               :type="item.course_type"
			                         :courseId="item.id"
			                         :smallimg_path='item.recImgPath'
			                         :courseName='item.courseName'
			                         :description='item.description'
			                         :learnd_count='item.studentCount'
			                         :current_price='item.currentPrice'>
			        </jobCourseTemp>
		        </transition-group>
		        <div slot="bottom" class="mint-loadmore-bottom">
				    <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">{{loadingText}}</span>
				    <span v-show="bottomStatus === 'loading'">--上拉加载更多--</span>
			    </div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script>
  import {Toast,Loadmore,Indicator} from 'mint-ui';
  import{mapState,mapMutations} from 'vuex';
  import {zhugeTrack} from '~/plugins/filter'
 	import axios from 'axios'
	export default {
	name: 'discountsClass',
    fetch ({req,store,route}) {
    		var cookieValue="";
    		if (req&&process.server) {
    			cookieValue=req.headers.cookie;
    		}
    		return axios({
    			url:'/coupon/getCouponCourses',
    			method:'get',
    			params:{
    				couponId:route.query.id,
			        pageNumber:1,
			        pageSize:10,
    			},
    			headers:{
    				cookie: cookieValue?cookieValue:''
    			}
    		}).then((res) =>{
    			store.commit('getDiscountsClassList',res.data)
    		})
	    },
		data(){
	      	return{
            zhugeTrack:zhugeTrack,
		        classList:this.$store.state.discountClass.getDiscountsClass,
		        allLoaded:false, //控制是否加载完成
            isFull:false,
            classTop:false, //解决list被加载中样式顶置问题
            bottomStatus:'',//加载中状态值
            loadingText:'上拉加载更多',
            parameter:{
					  couponId:this.$route.query.id,
			  		pageNumber:1,
			  		pageSize:10,
				     }
          }
        },
	    computed:{
	    	...mapState({
	    		getDiscountsClass:function(state){
	    			return state.discountClass.getDiscountsClass
	    		}
	    	})
	    },
	    mounted(){
        zhugeTrack('H5_进入优惠课程列表页');
	    	if(this.parameter.pageSize>=this.getDiscountsClass.totalCount){
	    		this.allLoaded=true;
				this.classTop=false
				this.$refs.loadmore.onBottomLoaded();
				this.loadingText="加载完成"
	    	}
	    },
	    methods:{
	    	...mapMutations(['getDiscountsClassList']),
	     	//加载更多
			loadBottom(){
				if(this.getDiscountsClass.items.length!=0){
					this.classTop=true;
					if(this.parameter.pageSize>=this.getDiscountsClass.totalCount){
						this.parameter.pageSize=this.getDiscountsClass.totalCount;
					}else{
						this.parameter.pageSize+=10;
					}
					this.classListData();
					if(this.parameter.pageSize>=this.getDiscountsClass.totalCount){
						this.allLoaded=true;
						this.classTop=false
						this.$refs.loadmore.onBottomLoaded();
						this.loadingText="加载完成"
					}else{
						this.parameter.pageSize+=10;
					}
				}
			},
			handleTopChange(status) {
		        this.bottomStatus = status;
		    },
		    classListData:function(){
		    	Indicator.open();
		    	axios.get('/coupon/getCouponCourses', {
		    		params:this.parameter
				}).then((res)=>{
					this.$store.commit('getDiscountsClassList',res.data)
					Indicator.close();
				}).catch((error)=>{
				    Indicator.close();
				});
		    },
	    }

	}
</script>
<style lang="less" rel="stylesheet/less">
	@import "discountsClass.less";
	#__nuxt{
	    height:auto !important;
	}
</style>
