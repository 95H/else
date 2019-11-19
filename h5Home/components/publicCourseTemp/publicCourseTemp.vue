<template>
  <div class="publicCourse-show">
    <a :href="'/liveVideo/mobile.html?courseId='+openCourse.id+'&roomId='+openCourse.direct_id+'&planId=null'">
      <img  v-lazy="openCourse.live_course_mobile_img" class="" alt=""/>
      <div class="timeAndCourseName cl">
        <!--broadcastState：直播状态 1:直播中  2:未开始-->
        <div v-if="openCourse.broadcastState==2">
          <div class="courseName"><i class="iconfont icon-zhibo"></i>{{openCourse.courseName}}</div>
          <div class="time">{{openCourse.formatStartTime}}</div>
        </div>
        <div v-else>
          <div class="courseName living"><i class="iconfont icon-zhibo"></i>{{openCourse.courseName}}</div>
          <div class="time">正在直播</div>
        </div>
      </div>
      <div class="image-overlay"></div>
    </a>
  </div>
</template>

<script>
    export default {
        name: 'publicCourse',
        props:['openCourse']
    }
</script>

<style lang="less">
  @import "../../static/css/variable.less";
  .publicCourse-show{
    position:relative;
    width:100%;
    height:unit(390/@u,@uu);
    .border-radius(unit(8/@u,@uu));
    overflow:hidden;
    img{
      width:100%;
      height:100%;
      margin:0 auto;
      display:block;
      background:url('/web/images/defaultImg/course_defaultImg.jpg')no-repeat center;
      background-size:cover;
    }
  .image-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    filter: alpha(opacity=50);
    opacity:1;
    background-image: -webkit-linear-gradient(to bottom, rgba(225, 225, 225, 0) 50%, rgba(0, 0, 0, 0.8) 100%);
    background-image: -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
  .timeAndCourseName{
    position:absolute;
    bottom:unit(28/@u,@uu);
    width:100%;
    padding:0 unit(30/@u,@uu);
    font-size:unit(28/@u,@uu);
    color:#eee;
    z-index:1;
  .courseName{
    float:left;
  i{
    color:#eee;
    font-size:unit(28/@u,@uu);
    margin-right:unit(10/@u,@uu);
  }
  &.living{
    color:@primaryColor;
    i{
      color:@primaryColor;
    }
   }
  }
  .time{
    float:right;
  }
  }
  }
</style>
