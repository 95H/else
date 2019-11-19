<template>
<div class="realNameAuth">
  <!--尚未实名认证-->
  <div class="noRealNameAuth" v-if="isAuth==1">
    <section class="realNameAuth-ImgWrap">
      <img src="~/assets/realNameAtuh/noRealNameAuth.png" alt=""/>
      <span>尚未认证</span>
    </section>
    <div class="realNameAuth-form">
      <mt-field label="真实姓名" placeholder="请填写身份证上的姓名" v-model="realname" :disableClear="true"></mt-field>
      <mt-field label="身份证号" placeholder="请填写正确的身份证号" v-model="IdCardNo" :disableClear="true"></mt-field>
    </div>
    <div class="realNameAuth-btn" @click="submitRealNameAuth">提交</div>
    <div class="realNameAuth-hint">请确认实名认证姓名与微信绑定银行卡姓名一致，如不一致则无法提现奖励金</div>
  </div>
  <!--已完成实名认证-->
  <div class="completeRealNameAuth" v-else>
    <section class="realNameAuth-ImgWrap">
      <img src="~/assets/realNameAtuh/realNameSuccess.png" alt=""/>
      <span>已完成实名认证</span>
    </section>
    <div class="realNameAuth-form">
      <div class="name">真实姓名：{{realname}}</div>
      <div class="idcard">身份证号：{{hidePartIDCard(IdCardNo)}}</div>
    </div>
    <nuxt-link class="realNameAuth-btn" :to="{path:'/myBursaryPage'}">我的奖励金</nuxt-link>
  </div>
</div>

</template>

<script type="text/ecmascript-6">
  import {zhugeTrack} from '~/plugins/filter';
  import { Indicator ,Toast} from 'mint-ui';
  import {appBaseUrl} from '~/api/apiurl'
  import {checkCardId} from '~/plugins/vue-validator/validator';
  import axios from 'axios'
    export default {
        name: 'realNameAuth',
        head:{
          title:'实名认证'
        },
        data(){
          return{
            zhugeTrack:zhugeTrack,
            isAuth:this.$route.query.realNameStatus,
            realname:'',
            IdCardNo:'',
          }
        },
        mounted(){
          if(this.isAuth==0){
            this.getAuthInfo();
            zhugeTrack('H5_进入实名认证页面',{"类型":'已认证'})
          }else{
            localStorage.removeItem('disName');
            localStorage.removeItem('disIDCard');
            zhugeTrack('H5_进入实名认证页面',{"类型":'未认证'})
          }
        },
        methods:{
          getAuthInfo(){
            axios({
              url:appBaseUrl+'/bxg/onlineUser/getBaseUserInfo',
              method:'post',
              params:{
                user_id:localStorage.getItem('userId'),
                sign:localStorage.getItem('sign')
              }
            }).then(res=>{
            	if(res.data.success){
            		if(res.data.resultObject.disIDCard){
	                this.realname=res.data.resultObject.disName;
	                this.IdCardNo=res.data.resultObject.disIDCard;
	              }
            	}else{
            		if(res.data.errorMessage=="1001"){
            			window.localStorage.setItem('redirectUrl',window.location.href);
                  window.location='/loginRegister/phoneLogin';
            		}
            	}
              
            }).catch(err=>{
              console.log(err)
            })
          },
          submitRealNameAuth(){
            var realNameReg=/^[\u4e00-\u9fa5]{2,7}$/;
            if(this.realname.trim()=='' || this.IdCardNo.trim()==''){
              Toast({
                message:'姓名或身份证号不能为空',
                duration:2000
              })
            }else if(!realNameReg.test(this.realname.trim())){
              Toast({
                message:'真实姓名请输入2-7个汉字',
                duration:2000
              })
            }else if(!checkCardId(this.IdCardNo.trim())){
              Toast({
                message:'身份证号格式错误',
                duration:2000
              })
            }else{
              Indicator.open();
              //调用实名认证接口
              axios({
                url:appBaseUrl+'/user/saveRealNameAuthentication',
                method:'POST',
                params:{
                  name:this.realname,
                  idcard:this.IdCardNo,
                  sign:localStorage.getItem('sign')
                }
              }).then(res=>{
                Indicator.close();
                if(res.data.status==200){
                  let message='';
                  if(res.data.result==1){
                    message='认证成功'
                    zhugeTrack('H5_完成实名认证');
                    setTimeout(function(){
                      let redirUrl=localStorage.getItem('redirectUrl');
                      if(redirUrl!='/personalPage/userSetting/userSetting' && redirUrl!=''){
                        window.location.href=redirUrl;
                        localStorage.setItem('redirectUrl','');
                      }else{
                        window.location="/personalPage/userSetting/userSetting";
                      }
                    },2000)
                  }else if(res.data.result==2){
                    message='姓名和身份证号不匹配,请重新输入'
                  }else if(res.data.result==3){
                    message='用户已经认证过'
                  }else if(res.data.result==4){
                    message='当前身份证已被实名认证'
                  }
                  Toast({
                    message:message,
                    duration:2000
                  })
                }else if(res.data.status==401){
                	window.localStorage.setItem('redirectUrl',window.location.href);
                  window.location='/loginRegister/phoneLogin';
                }
              }).catch(err=>{
                  console.log(err)
              })
            }
          },
          hidePartIDCard(cardNo){
            if(cardNo){
              cardNo=cardNo.replace(/^(\d{6})(?:\d+)(\d{4})$/,"$1********$2");
              return cardNo
            }
          }
        }
    }
</script>

<style lang="less">
  @import "../../../static/css/variable.less";
  html,body{
    background-color:@backgroundColor;
  }
.realNameAuth{
  height:100%;
.completeRealNameAuth{
    .mint-field-core{
      color:#333;
      font-size:unit(32/@u,@uu);
    }
    .mint-cell-wrapper{
      padding:0px;
      border-bottom:none!important;
    .mint-cell-title{
      width:auto;
      margin-right:unit(20/@u,@uu);
    }
  }
    .realNameAuth-form{
      background-color:#fff;
      height:unit(166/@u,@uu);
      padding:unit(30/@u,@uu);
      font-size:unit(32/@u,@uu);
      .idcard{
        margin-top:unit(30/@u,@uu);
       }
    }
  }

  .completeRealNameAuth{
    .realNameAuth-ImgWrap{
      >img{
         display:block;
         margin:auto;
         width:unit(222/@u,@uu);
         height:unit(136/@u,@uu);
       }
    }
  }
  .realNameAuth-ImgWrap{
    width:100%;
    background-color:#fff;
    padding:unit(48/@u,@uu) 0;
    >img{
        display:block;
        margin:auto;
        width:unit(175/@u,@uu);
        height:unit(134/@u,@uu);
     }
     >span{
        display:block;
        font-size:unit(36/@u,@uu);
        margin-top:unit(20/@u,@uu);
        text-align:center;
      }
  }
  .realNameAuth-form{
    margin:unit(20/@u,@uu) 0 unit(60/@u,@uu);
    .mint-cell{
      min-height:unit(70/@u,@uu);
    }
    .mint-field{
      padding-left:unit(30/@u,@uu);
      height:unit(100/@u,@uu);
      .mint-cell-wrapper{
        padding:0px;
        border-bottom:1px solid #f3f3f3;
        .mint-cell-title{
          width:auto;
          margin-right:unit(20/@u,@uu);
        }
      }
      &:last-child{
        .mint-cell-wrapper{
          border-bottom:none;
        }
      }
    }
  }
  .realNameAuth-btn{
    display:block;
    width:unit(600/@u,@uu);
    height:unit(74/@u,@uu);
    line-height:unit(74/@u,@uu);
    background-color:@primaryColor;
    .border-radius(unit(37/@u,@uu));
    margin:auto;
    font-size:unit(32/@u,@uu);
    color:#fff;
    text-align:center;
  }
  .realNameAuth-hint{
    font-size:unit(26/@u,@uu);
    margin:unit(40/@u,@uu) auto 0;
    width:unit(600/@u,@uu);
  }
}
</style>
