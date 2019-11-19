<template>
  <div class="content">
    <headBar titleName="热门公开直播课" isShowClassName="subTitle"></headBar>
    <div class="containerOnlyHeader publicCourse-wrap">
      <img src="/web/images/publicCourse/publicBgImg.jpg" alt="" class="bgImg"/>
      <div class="publicCourseList">
        <publicCourseTemp v-for="(item,index) in this.openCourse" :key="index" :openCourse="item"></publicCourseTemp>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState,mapMutations} from 'vuex'
    export default {
        name: 'publicCourse',
        fetch({store}){
          return axios({
            url:'/online/live/getOpenCourse',
            method:'get'
          }).then((res) => {
            store.commit('getOpenCourse',res.data)
          })
        },
        computed:{
          ...mapState({
              openCourse:function(state){
                return state.indexModules.index.openCourse
              }
          })
        },
        methods:{
          ...mapMutations(['getOpenCourse'])
        }
    }
</script>

<style lang="less">
  @import "../../static/css/variable.less";
  .content{
    padding-bottom:0;
  .bgImg{
    width:100%;
    height:unit(200/@u,@uu);
  }
  .publicCourseList{
    background-color:#fff;
    padding:unit(30/@u,@uu);
    .publicCourse-show{
      margin-bottom:unit(30/@u,@uu);
      &:last-child{
         margin-bottom:unit(90/@u,@uu);
       }
    }
  }
  }
</style>
