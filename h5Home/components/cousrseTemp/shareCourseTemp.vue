<template>
    <li class="cl">
      <a href="javascript:;"
         @click="zhugeTrack(zhugeClickName,zhugeObj,courseUrl+'?id='+courseId)" :id="directionId">
        <div class="professionCourses-show-left commonImg">
          <img v-lazy="smallimg_path" alt="" class=""/>
        </div>
        <div class="professionCourses-show-right">
          <div class="courseName">{{courseName}}</div>
          <div class="courseDescription multi-no-wrap">{{money}}</div>
          <div class="countAndMoney cl">
          	<button @click="inviting">马上邀请</button>
          </div>
        </div>
      </a>
    </li>
</template>
<script>
    import {zhugeTrack} from '~/plugins/filter'
    export default {
        name: 'shareCourseTemp',
        props:['zhugeClickName','type','courseType','courseId','directionId','smallimg_path','courseName','money','current_price'],
        data(){
          return{
            zhugeTrack:zhugeTrack,
            zhugeObj:{
                "课程名称":this.courseName,
                "课程ID":this.courseId,
                "收益":this.money
            },
            courseUrl:''
          }
        },
        mounted(){
           if(this.type==0){
             this.courseUrl='/class/detail/'
           }else{
             this.courseUrl='/course/micro/detail/'
           }
        },
        methods:{
          
        }
    }
</script>

<style lang="less">
  @import "../../static/css/variable.less";
  @media (min-width:376px) and (max-width:415px){
    .professionCourses-show li{
      height:unit(230/@u,@uu)!important;
    }
    .professionCourses-show-left img{
      height:unit(230/@u,@uu)!important;
    }
    .professionCourses-show-right .courseDescription{
      margin:unit(44/@u,@uu) 0!important;
    }
  }
  .professionCourses-show {
    padding-bottom:unit(30/@u,@uu);
  li {
    margin-bottom: unit(40/@u,@uu);
    width: 100%;
    height:unit(186/@u,@uu);
    a{
      display:flex;
      flex-flow:row nowrap;
      height:100%;
      >div{
        flex:1;
       }
      .professionCourses-show-left {
        margin-right:unit(30/@u,@uu);
        width:50%;
        img {
          width:100%;
          height:unit(186/@u,@uu);
          min-width:unit(275/@u,@uu);
        .border-radius(6px);
          background:url('/web/images/defaultImg/course_defaultImg.jpg')no-repeat center;
          background-size:cover;
        }
      }
      .professionCourses-show-right {
        width: 100%;
        overflow:hidden;
      .courseName {
        font-size: unit(30/@u,@uu);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color:@color3;
      }
      .courseDescription {
        margin: unit(24/@u,@uu) 0;
        color: @color9;
        font-size: unit(24/@u,@uu);
        word-break: break-all;
        word-wrap: break-word;
        height:unit(56/@u,@uu);
        overflow:hidden;
        -webkit-line-clamp:2;
        line-height: unit(28/@u,@uu);
      }
      .countAndMoney{
        position: relative;
        width:100%;
        top: unit(26/@u,@uu);
      .learnCount{
        float:left;
        font-size:unit(24/@u,@uu);
        color:@color6;
      }
      .money{
        float: right;
        font-size:unit(24/@u,@uu);
        color:@redColor;
      }
      }
      }
    }
  }

  }

</style>
