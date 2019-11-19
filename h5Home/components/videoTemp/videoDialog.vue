<template>
  <el-dialog
    :visible="dialogVisible"
    :center="true"
    top="35%"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :show-close=false>
    <span>{{contentTxt}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native.prevent="hideDialog" class="cancel">取消</el-button>
        <el-button class="downLoad" v-if="BtnType==1"><a @click="userAgents" href="javascript:;">下载APP</a></el-button>
        <el-button class="downLoad" v-if="BtnType==2"><a @click="nextModule" href="javascript:;">下一章</a></el-button>
        <el-button class="downLoad" v-if="BtnType==3"><a @click="studyCenter" href="javascript:;">返回学习中心</a></el-button>
        <el-button class="downLoad" v-if="BtnType==4"><a @click="myOrder" href="javascript:;">查看我的订单</a></el-button>
      </span>
  </el-dialog>
</template>

<script>
    import {isAndroid} from '~/plugins/vue-validator/validator';
    import {zhugeTrack} from '~/plugins/filter'
    export default {
        name: 'videoDiglog',
    props:['canEventname','dEventname','dialogVisible','userAgent','contentTxt','BtnType'],
        data(){
          return{
            zhugeTrack:zhugeTrack,
            isAndr:''
          }
        },
        mounted(){
          this.isAndr=isAndroid();
       },
        methods:{
          hideDialog(){
            this.$emit('hide',false)
            zhugeTrack(this.canEventname);
          },
      //下载
          userAgents:function(){
            this.$emit('hide',false);
            zhugeTrack(this.dEventname)
            if (isAndroid()) {
              var ifr = document.createElement('iframe');
              ifr.src ='mtjd089f12195://'
              ifr.style.display = 'none';
              document.body.appendChild(ifr);
              setTimeout(function(){
                document.body.removeChild(ifr);
                window.location='https://attachment-center.boxuegu.com/data/attachment/online/apk/bxg.apk';
              }, 5000);
            }else{
              window.location = "BoxueguApp://  ";
              setTimeout(function(){
                window.location='https://itunes.apple.com/cn/app/%E5%8D%9A%E5%AD%A6%E8%B0%B7/id1241182369?mt=8';
              }, 5000);
            }
      },
      //下一章
      nextModule (){
        this.$emit('nextModule');
      },
      //返回学习中心
      studyCenter (){
        window.location.href="/studyCenter"
      },
      myOrder(){
        window.location.href='/orderPage/order'
          }
        }
    }
</script>

<style lang="less">
  @import "../../static/css/variable.less";
  .el-dialog__wrapper{
    z-index:999999!important;
  }
  .el-dialog{
  .border-radius(unit(8/@u,@uu));
    width:80%;
    height:unit(296/@u,@uu);
  .el-dialog__header{
    display:none;
  }
  .el-dialog__body{
    font-size:unit(36/@u,@uu);
    color:#000;
    padding: unit(60/@u,@uu) unit(96/@u,@uu);
    overflow:hidden;
    text-align:center;
      min-height: 100px;
  }
  .el-dialog__footer{
    border-top:1px solid #eee;
    padding:0;
    margin-top:unit(-6/@u,@uu);
  .dialog-footer{
    display:flex;
    flex-flow:row nowrap;
  .el-button{
    flex:1;
    margin:0;
    border:none;
    height:unit(100/@u,@uu);
    font-size:unit(36/@u,@uu);
    border-bottom-right-radius: 0;
    -webkit-border-bottom-right-radius: 0;
    border-top-right-radius:0;
    -webkit-border-top-right-radius:0;
  &:nth-child(2){
     border-bottom-left-radius: 0;
     -webkit-border-bottom-left-radius: 0;
     border-top-left-radius:0;
     -webkit-border-top-left-radius:0;
     border-bottom-right-radius: unit(8/@u,@uu);
     -webkit-border-bottom-right-radius: unit(8/@u,@uu);
   }
  }
  .downLoad{
    background-color:@primaryColor;
    color:#fff;
    a{
      color:#fff;
    }
  }
  .cancel{
    background-color:#fff;
    color:@color9;
  }
  }
  }
  }
</style>
