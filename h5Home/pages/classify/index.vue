<template>
<div class="content classifyPage">
  <headBar titleName="分类"></headBar>
  <div class="tobCont container cl" id="container">
  	<div class="cl scrollWarp">
  		<mt-navbar v-model="selected">
	      <mt-tab-item  :id="index" @click.native="getCategoryInfo(item.menuId,item.menuName)"  v-for="(item,index) in this.classifyList" :key="index">{{item.menuName}}</mt-tab-item>
	    </mt-navbar>
	    <!-- tab-container -->
	    <mt-tab-container v-model="selected" id="tabContainer">
	      <mt-tab-container-item>
	        <span class="jiuyeTitle">就业课</span>
	        <a  class="jobContent" href="javascript:;" @click="zhugeTrack('H5_分类-点击就业班',classifyZhugeObj,'/class/detail/?id='+categoryInfo.careerCourse.courseId)" v-if="categoryInfo.careerCourse!=null">
	          <div  class="jobContent_courseName"><span>{{categoryInfo.careerCourse.courseName}}</span></div>
	          <img :src="categoryInfo.careerCourse.courseImg" alt=""/>
	        </a>
	        <div class="courseLists">
	          <span class="jingpingMicroCourse">提升课</span>
	          <ul class="cl classify-ul jingpingMicroCourse-ul">
	            <li class="is-active"><nuxt-link :to="{path:'/course/micro/',query:{isFree:0}}" @click.native="tagZhugeFun('全部','')">全部</nuxt-link></li>
	            <li v-for="(microCourse,index) in categoryInfo.tagsList" :key="index">
	              <nuxt-link :to="{path:'/course/micro/',query:{isFree:0,tagId:microCourse.id}}" @click.native="tagZhugeFun(microCourse.name)">{{microCourse.name}}</nuxt-link>
	            </li>
	          </ul>
	        </div>
	      </mt-tab-container-item>
	    </mt-tab-container>
  	</div>
  </div>
  <footerBar></footerBar>
</div>
</template>

<script>
  import {zhugeTrack} from '~/plugins/filter'
  import axios from 'axios'
  import {mapMutations,mapState} from 'vuex'
  import {appBaseUrl} from '~/api/apiurl'
  export default {
    name:'classify',
    data(){
      return{
        selected:0,
        categoryInfo:[],
        zhugeTrack:zhugeTrack,
        classifyZhugeObj:{},
        tagZhuObj:[],
        sName:''
      }
    },
    computed:{
       ...mapState({
          classifyList:function(state){
            return state.indexModules.classifyList
          }
       })
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
      
      axios({
        url:appBaseUrl+'/bxg/courseCategory/category/subject',
        method:'POST'
      }).then((data) =>{
        this.$store.commit('getCategorySubject', data.data.resultObject)
        if(this.classifyList.length!=0){
          this.getCategoryInfo(this.classifyList[0].menuId)
        }
      })
      zhugeTrack('H5_进入分类页');
    },
    methods:{

      ...mapMutations([
        'getIndexSubjectAndCourse'
      ]),
      getCategoryInfo:function(subjectId,subjectName){
        this.sName=subjectName;
        axios({
          url:appBaseUrl+'/bxg/courseCategory/getCourseCategoryInfoBySubjectId',
          method:'POST',
          params:{
            subjectId:subjectId
          }
        }).then((data) =>{
          this.categoryInfo=data.data.resultObject;
          if(this.categoryInfo.careerCourse){
            this.classifyZhugeObj={
              '学科':this.categoryInfo.careerCourse.subjectName,
              '课程名称':this.categoryInfo.careerCourse.courseName,
              '课程ID':this.categoryInfo.careerCourse.courseId
            };
          }
        })
      },
      tagZhugeFun:function(tagname){
        zhugeTrack('H5_分类-点击精品微课标签',{ '学科':this.sName,'标签名称':tagname})
      }
    }
  }
</script>
<style lang="less" scoped>
  .classifyPage{
      height: 100%;
  }
</style>
<style lang="less">
@import "../../static/css/variable.less";
html,body{
  background-color:@backgroundColor;
}
#__nuxt{
    height: 100%;
  }
.tobCont{
  .mint-tab-container-item{
    display:block!important;
  }
  margin-top:unit(20/@u,@uu);
  height:100%;
 	.scrollWarp{
 		height: 100%;
 		background: #ffffff;
 	}
  .mint-navbar{
    display:block;
    float:left;
    width:24%;
    height: 100%;
    background: #f5f5f5;
    >a{
      display:block;
     }
   .mint-tab-item{
     height:unit(98/@u,@uu);
     background-color:@backgroundColor;
     .mint-tab-item-label{
       font-size:unit(32/@u,@uu);
       color:@color3;
          white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
     }
     &.is-selected{
        border:none;
        border-left: 3px solid @primaryColor;
        background-color:#fff;
        color: @primaryColor;
      }
   }
  }
  .mint-tab-container{
    float:right;
    width:76%;
    background-color:#fff;
    height: 100%;
    overflow: hidden;
    .mint-tab-container-wrap{
      padding:unit(20/@u,@uu) unit(30/@u,@uu) 0;
      height: 100%;
      overflow-y: scroll;
      img{
        width:100%;
        height:unit(136/@u,@uu);
        .border-radius(unit(8/@u,@uu));
      }
      .jiuyeTitle{
        margin-top:unit(4/@u,@uu);
        margin-bottom:unit(28/@u,@uu);
        display:inline-block;
      }
      .jobContent{
        display:block;
        position:relative;
        .jobContent_courseName{
          width:100%;
          height:unit(136/@u,@uu);
          position:absolute;
          color:#fff;
          text-align:center;
          line-height:unit(136/@u,@uu);
          font-size:unit(32/@u,@uu);
        }
      }
      .courseLists{
      	height: 100%;
        .is-active{
          background-color:@primaryColor;
          border:1px solid @primaryColor!important;
          a{
            color:#fff!important;
          }
        }
        span{
          display:inline-block;
          font-size:unit(32/@u,@uu);
          color:@color3;
        }
        .jingpingMicroCourse{
          margin:unit(35/@u,@uu) 0;
        }
        .classify-ul{
          li{
            display:inline-block;
            margin:unit(38/@u,@uu)  unit(30/@u,@uu)  0 0;
            border:1px solid #ddd;
            .border-radius(unit(8/@u,@uu));
            padding:0 unit(26/@u,@uu);
            color:@color9;
            a{
              color:@color9;
              height:unit(58/@u,@uu);
              line-height:unit(60/@u,@uu);
              font-size:unit(28/@u,@uu);
              display:inline-block;
            }
          }
        }
        .jingpingMicroCourse-ul{
          li{
            margin:0  unit(30/@u,@uu)  unit(30/@u,@uu) 0;
          }
        }
      }
      .jiuyeList{
        margin-top:unit(52/@u,@uu);
      }
    }
  }
}
</style>
