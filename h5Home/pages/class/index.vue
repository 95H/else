<template>
  <div class="jobCoursePage">
    <headBar :titleName="titleName" isShowClassName="subTitle"></headBar>
    <div class="containerOnlyHeader">
      <div class="jobcourseType">
        <ul class="courseType_ul cl">
          <li><a :class="is_active==-1?'is_active':''"  @click.prevent.stop="changeData(-1,-1,'全部')">全部</a></li>
          <li v-for="(item,index) in this.directions" :key="index">
            <a :class="is_active==index?'is_active':''"  @click.prevent.stop="changeData(item.id,index,item.name)">
              {{item.name}}
            </a></li>
        </ul>
      </div>
      <div class="jobCourse">
        <transition-group tag="ul" name="item" class="professionCourses-show cl">
          <jobCourseTemp v-for="(item,index) in this.professionCourses" :key="index"
                         zhugeClickName="H5-课程列表页-点击课程"
                         courseType="就业班"
                         :type="item.course_type"
                         :courseId="item.id"
                         :directionId="item.directionId"
                         :smallimg_path='item.smallimg_path'
                         :courseName='item.courseName'
                         :description='item.description'
                         :learnd_count='item.learnd_count'
                         :current_price='item.current_price'>
          </jobCourseTemp>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'
    import  {mapMutations,mapState,mapGetters } from 'vuex'
    import {zhugeTrack} from '~/plugins/filter'
    export default {
      name: 'jobCourse',
      scrollToTop: true,
      data(){
      return{
        titleName:'就业班',
        is_active:-1,
        lists:[],
        zhugeTrack:zhugeTrack
      }
    },
      fetch({store}) {
          function getProfess(){
            return axios({
              url:'/course/getProfessionCourses',
              method:'get',
              params:{
                clientType:'mweb'
              }
            })
          };
          function getDire(){
            return axios({
              url:'/course/getDirections',
              method:'get',
              params:{
                courseType:0,
                isFree:0,
                professionData:[]
              }
            })
          };
          return axios.all([getProfess(),getDire()]).then((res) => {
              store.commit('getProfessionCourses',res[0].data);
              store.commit('getDirections',res[1].data)
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
        this.lists=this.professionCourses;
        zhugeTrack('H5-进入课程列表页',{'类型':'就业班'});
      },
      computed:{
        ...mapState({
          professionCourses:function(state){
            return state.indexModules.index.professionCourses
          },
          directions:function(state){
            return state.indexModules.courseLists.directions
          }
        }),
      },
      methods:{
        ...mapMutations(['getProfessionCourses','getDirections']),
        changeData:function(directionId,index,tagName){
          zhugeTrack('H5-课程列表页-点击分类',{'分类名称':tagName});
          this.is_active=index;
          let newArr={
            resultObject:[]
          };
          if(directionId==-1){
            newArr.resultObject=this.lists;
          }else{
            newArr.resultObject = this.lists.filter(function(item){
              return item.directionId === directionId;
            });
          }
          this.$store.commit('getProfessionCourses',newArr);
        }
      }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import "../../static/css/variable.less";
  @media screen and (max-width:360px){
 		  .courseType_ul{
		    padding-left:unit(26/@u,@uu) !important;
		    padding-bottom:unit(26/@u,@uu) !important;
				li{
				    font-size:unit(24/@u,@uu) !important;
				    margin-top:unit(26/@u,@uu) !important;
				    height:unit(54/@u,@uu) !important;
				  a{
				    font-size:unit(24/@u,@uu) !important;
					  .border-radius(unit(8/@u,@uu))!important;
            line-height:unit(54/@u,@uu) !important;
            margin-right:unit(26/@u,@uu) !important;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
				  }
		  	}
  	}
  }
  .content{
   margin-bottom:0;
  /* overflow-y:auto;*/
  }
  .containerOnlyHeader{
    background: #fff;
  }

  .jobcourseType{
    position:fixed;
    z-index:3;
    width:100%;
    background:url('/web/images/publicCourse/jiuyuBg.jpg')no-repeat center;
    background-size:cover;
  .courseType_ul{
    padding-left:unit(30/@u,@uu);
    padding-bottom:unit(30/@u,@uu);
    position: relative;
    z-index:1;
  li{
    text-align:center;
    font-size:unit(28/@u,@uu);
    margin-top:unit(30/@u,@uu);
    width:25%;
    height:unit(58/@u,@uu);
    float: left;
  a{
    outline: none;
    display:block;
    height:100%;
    font-size:unit(28/@u,@uu);
    box-sizing: border-box;
    padding:0;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  .border-radius(unit(8/@u,@uu));
    line-height:unit(58/@u,@uu);
    border:1px solid #fff;
    color:#eee;
    margin-right:unit(30/@u,@uu);
  &.is_active{
     background-color:@primaryColor;
     border:1px solid @primaryColor;
   }
  }
  }

  }
  }
  .jobCourse{
    background-color:#fff;
    padding:unit(30/@u,@uu);
    margin-top: unit(203/@u,@uu);
    /*  position:relative;
      top:unit(200/@u,@uu);
      overflow-y: scroll;*/
  }
</style>
