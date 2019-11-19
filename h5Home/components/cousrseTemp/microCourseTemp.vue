<template>
  <a href="javascript:;"
     @click="zhugeTrack(zhugeClickName,zhugeObj,courseRouter+'?id='+courseId)">
    <li class="cl">
      <div class="commonImg">
        <img v-lazy="smallimg_path" alt="" class=""/>
      </div>
      <div class="">
        <div class="courseName">{{courseName}}</div>
        <div class="countAndMoney cl">
          <div class="learnCount">{{learnd_count}}人学习</div>
          <div class="money" v-if="isFree==1&&current_price=='0'">免费</div>
          <div class="money" v-else>￥{{current_price,2| toFixed}}</div>
        </div>
      </div>
    </li>
  </a>
</template>

<script>
  import {zhugeTrack} from '~/plugins/filter'
  export default {
    name: 'microCourseTemp',
    props:['zhugeClickName','courseType','courseRouter','name','courseId','subjectId','smallimg_path','courseName','learnd_count','current_price','isFree'],
    data(){
      return{
        zhugeTrack:zhugeTrack,
        zhugeObj:{
          "课程类型":this.courseType,
          "课程名称":this.courseName,
          "课程ID":this.courseId,
          "学科":this.subjectId,
          "学习人数":this.learnd_count,
          "课程价格":this.current_price
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../static/css/variable.less";
  @media (min-width:376px) and (max-width:415px){
    .microCourse-show .commonImg img{
      height:unit(230/@u,@uu)!important;
    }
  }
  .microCourse-show{
    padding-right:0;
    a{
      width:50%;
      float:left;
      overflow: hidden;
    li{
      margin-bottom:unit(30/@u,@uu);
      margin-right:unit(30/@u,@uu);
      .commonImg{
        overflow:hidden;
        width:100%;
        height:auto;
        img{
          width:100%;
          display:block;
          margin:0 auto;
          .border-radius(6px);
          height:unit(187/@u,@uu);
          background:url('/web/images/defaultImg/course_defaultImg.jpg')no-repeat center;
          background-size:cover;
        }
    }
    .courseName{
      width:100%;
      font-size:unit(32/@u,@uu);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color:@color3;
      margin-top:unit(8/@u,@uu);
    }
    .countAndMoney{
      margin-top:unit(8/@u,@uu);
    .learnCount{
      float:left;
      font-size:unit(26/@u,@uu);
      color:@color6;
    }
    .money{
      float:right;
      font-size:unit(26/@u,@uu);
      color:@redColor;
    }
    }
    }
    }

  }

</style>
