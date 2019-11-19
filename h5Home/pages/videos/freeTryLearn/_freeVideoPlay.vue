<template>
  <div class="content freeTryLearn">
    <headBar :titleName="courseName"></headBar>
    <div class="container">
      <div class="play" v-html="playCode"></div>
      <div class="videoLists" v-if="videoData.length!=0">
        <el-menu
          class="el-menu-vertical-demo"
          default-active="0"
          :default-openeds=[0]>
          <el-submenu :index="index" v-for="(item,index) in videoData" :key="index" >
            <template slot="title">
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group :index="secIndex" v-for="(secondItem,secIndex) in item.chapterSons" class="secondItemName" :key=secIndex>
              <template slot="title">{{secondItem.name}}</template>
              <el-menu-item-group :index="thirdIndex"  v-for="(thirdItem,thirdIndex) in secondItem.chapterSons" class="bottomLing" :key=thirdIndex>
                <template slot="title">{{thirdIndex+1}}-{{thirdItem.name}}</template>
                <el-menu-item-group :index="videoIndex" v-for="(videoItem,videoIndex) in thirdItem.videos" :key=videoIndex>
                  <el-menu-item :videoId="videoItem.videoId" class="cl">
                    <div class="videoName" v-if="videoItem.isLearn" @click="dialogShow(videoItem.id)" :class="isCurPlay==videoItem.id?'active_play':''">
                      <i class="iconfont icon-play" v-if="!(isPlay==videoItem.id)"></i><i class="iconfont icon-zanting" v-if="isPlay==videoItem.id"></i>{{videoItem.videoName}}
                    </div>
                    <div class="videoName" v-else @click="dialogShow(videoItem.id)" :class="isCurPlay==videoItem.id?'active_play':''"><i class="iconfont icon-ShapeCopy"></i>{{videoItem.videoName}}</div>
                    <span class="tryLearn" v-if="videoItem.isLearn">试学</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-menu-item-group>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="videoLists" v-else><emptyTemp></emptyTemp></div>
    </div>
    <div class="courseDetailBtn">
      <div class="freeTryLearn"><a href="javascript:;" @click="consultClick" id="bxgzxzx" target="_blank">在线咨询</a></div>
      <div class="signUp" @click="payCourseSignUp">立即报名</div>
    </div>
    <videoDialogTemp BtnType="1" contentTxt='为了方便你的学习，请使用电脑登录博学谷官网或下载博学谷App进行学习' :dialogVisible="dialogVisible" @hide="changeDialog"></videoDialogTemp>
  </div>

</template>

<script>
  import {isAndroid} from '~/plugins/vue-validator/validator';
  import axios from 'axios'
  import { Toast } from 'mint-ui';
  export default {
      name: 'freePlay',
      data(){
        return{
          courseId:this.$route.query.courseId,
          use_start:this.$route.query.useStart,
          videoData:[],
          isPlay:'',
          courseName:'视频列表',
          isCurPlay:'',
          playCode:'',
          dialogVisible: true
        }
      },
      fetch({store,route,req}) {
        return {
          videoData:store.dispatch('getVideos',{courseId:route.query.courseId})
        }
      },
      mounted(){
         axios.get('/video/getvideos',{params:{courseId:this.courseId,isTryLearn:1}}).then((res)=>{
           this.videoData=res.data.resultObject
           this.courseName=this.videoData[0].chapterSons[0].chapterSons[0].videos[0].videoName
        })
       /* if(this.$route.query.isTryLearn==0){
          this.isTryLearn=this.$route.query.isTryLearn
          this.dialogVisible=true;
        }*/
      },
      methods:{
        consultClick(){
          qimoChatClick();
        },
        changeDialog(){
          this.dialogVisible=false
        },
        getVideoInfo:function(vid,id){
          axios.get('/online/vedio/getVidoInfo',{params:{
            video_id:vid,
            width:'',
            height:212,
            autoPlay:false}}).then((res)=>{
               this.playCode=res.data.resultObject.playCode;
               this.isCurPlay=id;
               this.isPlay=id;
          })
        },
        dialogShow:function(id){
          this.dialogVisible=true
          this.isCurPlay=id
        },
        payCourseSignUp:function(){
          this.islogin=localStorage.getItem('globalLogin');
          if(this.islogin=="true"){
            window.location= "/h5/pay/html/pay.html?courseId=" + this.courseId;
          }else{
            window.location='/loginRegister/phoneLogin';
            window.localStorage.setItem('redirectUrl',window.location.href);
          }
        }
      }
  }
</script>

<style lang="less">
@import "../video.less";
.freeTryLearn{
  .el-submenu__title {
    span{
      vertical-align: middle;
      width: 90%;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
    }
  }
}
</style>
