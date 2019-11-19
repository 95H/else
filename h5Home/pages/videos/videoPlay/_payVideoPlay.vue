<template>
  <div class="videoPlay">
      <div class="play">
      	<video controls="controls"
      		autoplay id="media"
      		:src="playCode"
      		webkit-playsinline="true"
          x5-playsinline="true"
          playsinline="true"
      		preload="auto"
      		poster="/web/images/defaultImg/defaultVideoImg.jpg"
          :width="videoWidth"
          :height="videoHeight">
					 您的浏览器不支持此视频格式
				</video>
      </div>
      <div class="videoLists" v-if="isEmpty">
      	<div class="videoTitle">{{videoData.moduleName}}</div>
        <el-menu
          class="el-menu-vertical-demo"
          :default-openeds='defaultOpened'
          default-active='0'>
          <el-submenu :index="(index+1).toString()"
          	v-for="(items,index) in videoData.sectionItems"
          	:data-index="index+1"         	
          	:key="index">
            <template slot="title">
              <span>{{items.sectionName}}</span>
            </template>
        	  <el-menu-item  class="cl listWarp"
        	  	ref="list"
        	  	:popper-append-to-body="true"
        	  	:index="index.toString()+'-'+(indexItems+1).toString()"
        	  	v-for="(itemsList,indexItems) in items.pointItems"
        	  	:data-videoId="itemsList.ccVideoId"
        	  	:data-id="itemsList.videoId"
        	  	:data-pointId="itemsList.pointId"
        	  	v-bind:class="[videoInfo.firstvideoid==itemsList.videoId?'isActive':'']"
        	  	@click="videoPlay(itemsList.ccVideoId,itemsList.pointId,itemsList.videoId)"
        	  	:key="indexItems">
	            <div class="videoName">
	              <i class="iconfont" v-bind:class="[videoInfo.firstvideoid==itemsList.videoId?'icon-zanting':'icon-play']"></i>
	              {{itemsList.pointName}}
	            </div>
	          </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="videoLists" v-else><emptyTemp></emptyTemp></div>
      <videoDialogTemp
        :dialogVisible="dialogInfo.dialogVisible"
        v-on:hide="hideDia"
        v-on:nextModule="nextModule"
        :BtnType="dialogInfo.makeBtnType"
        :contentTxt="dialogInfo.dialogTxt"
      ></videoDialogTemp>
      <!-- 课程激活弹框 -->
      <mt-popup
        v-model="popupContractVal"
        :closeOnClickModal="false"
      >
        <div class="class_activate">
          <h6 class="class_activate_title">课程激活提示</h6>
          <p class="class_activate_text">该课程尚未激活，购买课程后需要完<br/>成合同签订才能激活课程</p>
        </div>
        <div @click="goSignClick" class="go_activate">去签订</div>
      </mt-popup>
  </div>
</template>

<script>
  import {isAndroid} from '~/plugins/vue-validator/validator';
  import{mapMutations,mapState} from 'vuex';
  import {appBaseUrl} from '~/api/apiurl'
  import axios from 'axios'
  import { Toast, Popup } from 'mint-ui';
  import { zhugeTrack } from '~/plugins/filter'
  export default {
    name: 'freePlay',
    head() {
      return {
        script: [
          { src: "/lib/wxShare.min.js", type: 'text/javascript' }
        ]
      }
    },
    data(){
    return{
      courseId:this.$route.query.courseId,
      use_start:this.$route.query.useStart,
      moduleId:this.$route.query.moduleId,
      courseName:'视频列表',
      autoplay:false,
      videoData:{
      	sectionItems:[]
      },
      videoInfo:{
      	isCurPlay:'',
      	isCurPointId:'',
      	firstvideoid:'',
      },
      curVideoInfo:{
      	curId:'',
      	sectionId:''
      },
      videoWidth:'',
      videoHeight:'100%',
      playCode:'',
      isShowVideo:false,
      isEmpty:true,
      nextMoudleId:'',
      phaseHomeworkId:'',
      defaultOpened:['1'],
      activeIndex:'0',
      dialogInfo:{
      	dialogTxt:'',
      	makeBtnType:'',
      	dialogVisible:false
      },
      isTryLearn:this.$route.query.isTryLearn,
      popupContractVal: false, //弹出激活合同的弹窗
    }
  },
  mounted(){
  	let video = document.getElementById("media");
  	let clientWith =window.screen.width
  	this.videoWidth=clientWith;//设置视频宽度为手机屏幕的宽度
  	const _this =this;// 保存this指向,视频监听事件会导致this指向发生改变,获取不到当前实例
  	//解决微信中 不自动加载视频问题
  	document.addEventListener("WeixinJSBridgeReady", function () {
  		_this.$indicator.close();
        video.play();
    }, false);
  	//监听视频开始播放
  	video.addEventListener('play',function(){
  		//更新视频状态
  		_this.updataVideo(1,_this.curVideoInfo.curId,_this.curVideoInfo.sectionId)
  	})
  	//监听播放完成
  	video.addEventListener("ended",function(){
  		var videoDomList =_this.$refs.list;
  		videoDomList.forEach((curr,index,arr) =>{
  			if(curr.$attrs['data-id']==_this.curVideoInfo.curId){
  				//判断当前播放视频是否是最后一个视频
  				if((index+1)<videoDomList.length){
  					//如果当前播放视频为当前节最后一个视频
  					let list = arr[index].$el.parentNode.childNodes
  					list.forEach((curr,index,list) =>{
  						if(curr.getAttribute('data-id')==_this.curVideoInfo.curId){
  							var muneIndex=list[index].parentNode.parentNode.getAttribute('data-index')
  							if((index+1) >= list.length){
										_this.defaultOpened.push((parseInt(muneIndex)+1).toString())
								}else{
									_this.defaultOpened=muneIndex.split()
								}
  						}
  					})
  					_this.videoInfo.isCurPointId=arr[index+1].$attrs['data-pointId'];
  					_this.videoInfo.isCurPlay=arr[index+1].$attrs['data-videoId'];
  					_this.videoInfo.firstvideoid=arr[index+1].$attrs['data-id'];
  					_this.getVideo(_this.videoInfo.isCurPlay,_this.videoInfo.isCurPointId);
  				}else{
  					video.setAttribute('height','1')
						video.setAttribute('width','1')
						_this.playCode='';
						_this.$indicator.open();
						video.pause()
  					//当前节最后一个视频
            if(_this.nextMoudleId){ //存在下一个模块
              setTimeout(function(){
								 	_this.$indicator.close();
							 	 _this.dialogInfo={
			              dialogVisible:true,
			              dialogTxt:"恭喜你学习完本章课程,请跳转到下章继续学习!",
			              makeBtnType:2
			            }
							 },1000)
            }else{//最后一个模块
              if(_this.phaseHomeworkId) {
              	setTimeout(function(){
								 	_this.$indicator.close();
								 	 _this.dialogInfo={
				              dialogVisible:true,
				              dialogTxt:"请到web端完成阶段作业",
				              makeBtnType:3
				            }
								 },1000)
              }else{
              	setTimeout(function(){
								 	_this.$indicator.close();
								 	 	_this.dialogInfo={
		                  dialogVisible:true,
		                  dialogTxt:"恭喜你学习完课程所有内容!",
		                  makeBtnType:3
		                }
								 },1000)
              }
            }
  				}
  			}
  		})
      _this.updataVideo(2,_this.curVideoInfo.curId,_this.curVideoInfo.sectionId);

    })
  	//获取视频目录
  	this.$indicator.open()
    axios({
    	url:appBaseUrl+'/coursePlay/getCourseKnowledgeTree',
    	method:'POST',
    	params:{
    		studentId:localStorage.getItem('userId')||'',
    		moduleId:this.moduleId,
    		courseId:this.courseId,
  		  sign:localStorage.getItem('sign')
    	}
    }).then(res => {
    	if(res.data.status==200){
    			this.videoData=res.data.result
    			this.videoData.sectionItems=res.data.result.sectionItems
    			var firstVideo=res.data.result.sectionItems[0].pointItems[0];
    			this.videoInfo={
    				firstvideoid:firstVideo.videoId,
    				isCurPlay:firstVideo.ccVideoId,
    				isCurPointId:firstVideo.pointId,
    			}
    			this.nextMoudleId=res.data.result.nextModuleId;
    			this.phaseHomeworkId=res.data.result.phaseHomeworkId;
    			var videoList = document.getElementsByClassName('listWarp');
    			this.getVideo(this.videoInfo.isCurPlay,this.videoInfo.isCurPointId)
    			if(this.videoData.length==0){
    				this.isEmpty=false
    			}
        this.$indicator.close()
    	}else if(res.data.status==401 || res.data.status==403){
    		window.localStorage.setItem('redirectUrl','/studyCenter');
    		window.location.href="/loginRegister/phoneLogin"
    	}else if (res.data.status == 402) {
        // 去签订
        this.popupContractVal = true
      } else{
    		this.$indicator.close()
    		this.isEmpty=false
    	}
    }).catch((res) =>{
    	 this.$indicator.close()
    	 this.isEmpty=false
    })
  },
  methods:{
    goSignClick() {
      zhugeTrack('H5_课程中心_去激活')
      sessionStorage.setItem('isPayPage', true)
      this.$router.push({
        path: `/contract`,
        query: {
          courseId: this.courseId
        }
      })
    },
    dialogShow:function(id){
      this.dialogInfo.dialogVisible=true
      this.videoInfo.isCurPlay=id
    },
    nextModule() {
    	window.location.href="/videos/videoPlay/payVideoPlay?moduleId="+this.nextMoudleId+'&courseId='+this.courseId
    },
    hideDia (val) {
    	 this.dialogInfo.dialogVisible=val
    },
    getVideo (id,pointId){
      let video = document.getElementById("media");
    	axios({
				url:appBaseUrl+'/bxg/video/getVideoH5Url',
				method:'POST',
				params:{
					ccVideoId:id,
					pointId:pointId,
					sign:localStorage.getItem('sign')
				}
			}).then(res =>{
				if(res.data.status==200){
          if(res.data.result.ccVideoH5Url){
            this.playCode=res.data.result.ccVideoH5Url;
            video.setAttribute('height','100%')
						video.setAttribute('width','100%')
            var protocolStr=document.location.protocol;
            if(protocolStr=="http:"){
              this.playCode=this.playCode.replace('https','http')
            }
            this.curVideoInfo={
              curId:res.data.result.moduleVideoId,
              sectionId:res.data.result.sectionId
            }
          }else{
            //this.playCode=''
            video.pause();
						video.setAttribute('height','1')
						video.setAttribute('width','1')
						 this.$indicator.open();
						 setTimeout(function(){
						 	_this.$indicator.close();
						 	 _this.dialogInfo={
		              dialogVisible:true,
		              dialogTxt:"暂时无法播放,请到APP中观看学习",
		              makeBtnType:1
		            }
						 },1000)
          }
          let _this=this
          if(this.playCode!=''){
          	 _this.$indicator.open();
          	 //解决 IOS QQ浏览器 无法监听 video canplaythrough事件
          	 var timer = setInterval(function() {
							  var duration = video.duration
							  if(duration>0 && duration) {
							    _this.$indicator.close();
							    video.play()
							  }else{
							  	return
							  }
							  clearInterval(timer)
							}, 1000)
          	  //解决 安卓微信内置浏览器 无法获取到video时长
          	  video.addEventListener("canplaythrough", function(){
	              video.play()
	              _this.$indicator.close();
	            })
          }else{
          	video.pause()
          }
				}else if(res.data.status==403 || res.data.status==401){
							window.localStorage.setItem('redirectUrl','/studyCenter');
    					window.location.href="/loginRegister/phoneLogin"
				}else{
						this.$toast('视频获取失败~')
				}
			}).catch((res)=>{
						this.$toast('视频获取失败~')
			})
    },
    videoPlay (id,pointId,videoId){
    	this.videoInfo.firstvideoid=videoId;
      this.getVideo(id,pointId)
    },
    updataVideo (status,videoId,sectionId){
    	axios({
    		url:appBaseUrl+'/coursePlay/updateVideoStatus',
    		method:'POST',
    		params:{
    			studentId:localStorage.getItem('userId'),
    			courseId:this.courseId,
    			sectionId:sectionId,
    			videoId:videoId,
    			studyStatus:status,
  			  sign:localStorage.getItem('sign')
    		}
    	}).then(res=>{
    		 if(res.data.status==200){
    		 		//视频更新成功
    		 }else if(res.data.status==401 || res.data.status==403){
    		 		window.localStorage.setItem('redirectUrl','/studyCenter');
    				window.location.href="/loginRegister/phoneLogin"
    		 }else{
    		 		//this.$toast('操作失败~')
    		 }
    	})
    }
  }
}
</script>

<style lang="less">
  @import "../video.less";
  @import "../../../static/css/variable.less";
  .videoName{
    width:100%!important;
  }
  .videoPlay{
    .el-dialog{
      z-index: 10000;
    }
  }
  .mint-popup{
    width: unit(630/@u, @uu);
    height: unit(366/@u, @uu);
    border-radius: unit(22/@u, @uu);
    .class_activate{
      text-align: center;
      .class_activate_title{
        font-size: unit(36/@u, @uu);
        color: #333;
        margin-top: unit(60/@u, @uu);
      }
      .class_activate_text{
        font-size: unit(32/@u, @uu);
        color: #666;
        margin-top: unit(28/@u, @uu);
        line-height: unit(45/@u, @uu);
      }
    }
    .go_activate{
      width: 100%;
      line-height: unit(100/@u, @uu);
      background: #38ADFF;
      text-align: center;
      height: unit(100/@u, @uu);
      color: #fff;
      position: relative;
      bottom: unit(-50/@u, @uu);
      border-radius: 0 0 unit(22/@u, @uu) unit(22/@u, @uu);
    }
  }
</style>
