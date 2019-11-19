<template>
	<div class="searchPage" id="searchPage">
		<div class="searchInp" id="searchInp">
			<div class="inpWarp">
				<i class="iconfont searchIcon">&#xe62e;</i>
				<input type="text" placeholder="搜索" v-model="keywords" @keyup.13="searchCourse('0','全部课程',false)" v-on:input="showIcon"
               v-on:focus="searchInpFocus"
               v-on:blur="searchInpBlur">
				<i class="iconfont close" v-if="closeShow" @click="clearValue">&#xe618;</i>
			</div>
			<router-link :to="{path:'/'}" class="cancelBtn">取消</router-link>
		</div>
    <div class="courseList">
      <div class="maskLayer" v-if="showList"></div>
      <div class="defaultKey" v-if="defaultKey">
        <h3>热门搜索</h3>
        <div class="keyList cl">
          <span v-for="(items,index) in defaultKeyWords" :key="index" @click="defaultSearch(items,false)">{{items}}</span>
        </div>
      </div>
      <div class="listWarp" v-if="sxTab || controlList">
        <div class="flList" @click="showfn">
          <div class="title bdB bd1px">
            <p class="total">共{{this.totalCourseCount}}门课程</p>
						<span>
							{{courseType}}
							<i class="iconfont" v-html="iconState.down" v-if="showList==false"></i>
							<i class="iconfont" v-html="iconState.up" v-else></i>
						</span>
          </div>
          <ul class="list" v-if="showList">
            <li class="bdB bd1px" v-for="(items,index) in courseTypeList" @click.stop="searchCourse(index,items,true)" v-if="items!=''">{{items}}</li>
          </ul>
        </div>
      </div>

      <div class="coursesWarp">
        <div class="searchResultWarp" v-if="serchList.itemList.length!=0">
          <mt-loadmore
            class="scrolling"
            :bottomMethod="loadBottom"
            :bottom-all-loaded="allLoaded"
            :autoFill="isFull"
            @bottom-status-change="handleTopChange"
            v-bind:class="{classTop:classTop}"
            v-if="!defaultKey"
            ref="loadmore">
            <div>
              <div class="courseWarp cl" v-for="(items,index) in serchList.itemList" v-if="items.courseBelong==1">
                <router-link :to="{path:'/course/courseDetail',query:{id:items.id}}">
                  <div class="courseImg">
                    <img :src="items.recImgPath">
                    <span>就业课</span>
                  </div>
                  <div class="courseInfo">
                    <h3 v-html="items.courseName"></h3>
                    <p class="text" v-html="items.description"></p>
                    <span>￥{{items.currentPrice}}</span>
                  </div>
                </router-link>
              </div>
              <div class="courseWarp cl" v-for="(items,index) in serchList.itemList" v-if="items.courseBelong==2">
                <router-link :to="{path:'/course/courseDetail',query:{id:items.id}}">
                  <div class="courseImg">
                    <img :src="items.recImgPath">
                    <span>职业路线</span>
                  </div>
                  <div class="courseInfo">
                    <h3 v-html="items.courseName"></h3>
                    <p class="text" v-html="items.description"></p>
                  </div>
                </router-link>
              </div>
              <div class="courseWarp cl" v-for="(items,index) in serchList.itemList" v-if="items.courseBelong==3">
                <router-link :to="{path:'/course/courseDetail',query:{id:items.id}}">
                  <div class="courseImg">
                    <img :src="items.recImgPath">
                    <span>提升课</span>
                  </div>
                  <div class="courseInfo">
                    <h3 v-html="items.courseName"></h3>
                    <p class="text" v-html="items.description"></p>
                    <span>￥{{items.currentPrice}}</span>
                  </div>
                </router-link>
              </div>
              <div class="courseWarp cl" v-for="(items,index) in serchList.itemList" v-if="items.courseBelong==4">
                <router-link :to="{path:'/course/courseDetail',query:{id:items.id}}">
                  <div class="courseImg">
                    <img :src="items.recImgPath">
                    <span>免费课</span>
                  </div>
                  <div class="courseInfo">
                    <h3 v-html="items.courseName"></h3>
                    <p class="text" v-html="items.description"></p>
                    <span>免费</span>
                  </div>
                </router-link>
              </div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-if="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">{{loadingText}}</span>
              <span v-if="bottomStatus === 'loading'">加载中...</span>
            </div>
          </mt-loadmore>
        </div>
        <div v-else-if="!defaultKey && serchList.itemList.length==0">
          <emptyTemp imgUrl="/web/images/defaultImg/searchNoData.png"></emptyTemp>
        </div>
      </div>
    </div>
	</div>
</template>
<style lang="less">
	@import "search.less";
  html,body{
    background-color:#fff!important;
  }
</style>
<script>
	import axios from 'axios'
	import { Indicator,Toast,Loadmore} from 'mint-ui';
  import {zhugeTrack} from '~/plugins/filter'
	export default {
		name:'searchPage',
		data () {
			return{
        zhugeTrack:zhugeTrack,
				searchVal:"",
				defaultKeyWords:[
					'Spring',
					'js',
					'JavaScript',
					'Ajax',
					'Python',
					'HDFS',
					'Node.js',
					'Java',
					'linux'
				],
				sxTab:false,
				showList:false, //控制下拉列表
				defaultKey:true, //默认显示关键词
				showResult:false,//搜索结果
				closeShow:false,
				allLoaded:false, //控制是否加载完成
				isFull:false,
				classTop:false, //解决list被加载中样式顶置问题
				bottomStatus:'',//加载中状态值
				loadingText:'上拉加载更多',
				courseType:'全部课程',
				totalCourseCount:'',
				controlList:false,
				courseTypeList:['全部课程','就业课','','提升课','免费课'],
				searchData:{
					pageNumber:1,
			      	keyword:'',
			      	searchCourseBelong:0,
			      	pageSize:20,
			      	clientType:'mweb'
				},
				keywords:'',
				listData:{},
				iconState:{
					up:'&#xe607;',
					down:'&#xe603;'
				},
				serchList:{
					itemList:[]
				}
			}
		},
    mounted(){
			// 站长统计
			(function(){
				var bp = document.createElement('script');
				var curProtocol = window.location.protocol.split(':')[0];
				if (curProtocol === 'https'){
					bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
				}
				else{
					bp.src = 'http://push.zhanzhang.baidu.com/push.js';
				}
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(bp, s);
			})();
			// 360站长
			(function(){
				var bp2 = document.createElement('script');
				bp2.src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?a1be134f1c91461a03d8a77a63cd7a78":"https://jspassport.ssl.qhimg.com/11.0.1.js?a1be134f1c91461a03d8a77a63cd7a78";
				bp2.id = "sozz"
				var s2 = document.getElementsByTagName("script")[0];
				s2.parentNode.insertBefore(bp2, s2);
			})();
		
      zhugeTrack('进入搜索结果页')
    },
		methods:{
      searchInpFocus:function(){
        document.getElementById('searchPage').style.marginTop="44px";
        document.getElementById('searchInp').style.position="absolute";
        document.getElementById('searchInp').style.top="44px";
      },
      searchInpBlur:function(){
        document.getElementById('searchPage').style.marginTop="0px";
        document.getElementById('searchInp').style.position="fixed";
        document.getElementById('searchInp').style.top="0px";
      },
			//加载更多
			loadBottom(){
				if(this.serchList.itemList.length!=0){
					this.classTop=true;
					if(this.searchData.pageSize>=this.totalCourseCount){
						this.searchData.pageSize=this.totalCourseCount;
					}else{
						this.searchData.pageSize+=20;
					}
					this.getResult();
					if(this.searchData.pageSize>=this.totalCourseCount){
						this.allLoaded=true;
						this.classTop=false;
						this.$refs.loadmore.onBottomLoaded();
						this.loadingText="加载完成"
					}else{
						this.searchData.pageSize+=20;
					}
				}
			},
			handleTopChange(status) {
		        this.bottomStatus = status;
		    },
			showIcon(){
				if(this.keywords!=""){
					this.closeShow=true;
				}else{
					this.closeShow=false;
				}
			},
			clearValue(){
				this.keywords="";
				this.closeShow=false;
			},
			showfn(){
				this.showList=this.showList?false:true
			},
			getResult(bool){
				axios({
					url:'/search/courseSearch',
					method:'get',
					params:this.searchData
				}).then((res) =>{
					Indicator.close();
					if(res.data.success){
						this.defaultKey=false;
						this.listData=res.data.resultObject;
						this.serchList.itemList=res.data.resultObject.courses.items;
						this.totalCourseCount=res.data.resultObject.totalCourseCount;
						if(this.serchList.itemList.length!=0){
							this.sxTab=true;
							this.controlList=bool
						}else{
							this.sxTab=false;
							this.controlList=bool
						}
					}else{
						Toast({
						  message:res.data.errorMessage,
						  duration:2000
						})
					}
				})
			},
			defaultSearch(defaultkey,bool){
        zhugeTrack('H5_点击搜索热词',{"热词名称":defaultkey});
				localStorage.setItem('keywords',defaultkey);
				this.keywords=defaultkey;
				this.searchData.pageSize=20;
				this.searchData.keyword=localStorage.getItem('keywords');
				this.defaultKey=false;
				Indicator.open();
				this.getResult(bool);
			},
			searchCourse(id,type,bool){
        if(type!="全部课程"){
          zhugeTrack('H5_搜索页课程分类',{"课程分类":type});
        }
				this.showList=false;
				if(this.keywords!=""){
					this.allLoaded=false;
					this.searchData.keyword=this.keywords;
					localStorage.setItem('keywords',this.keywords)
				}else{
					this.keywords=localStorage.getItem('keywords')
					this.searchData.keyword=localStorage.getItem('keywords')
				}
				Indicator.open();
				this.courseType=type;
				this.searchData.searchCourseBelong=id;
				this.searchData.pageSize=20;
				this.getResult(bool);
			}
		}
	}
</script>
