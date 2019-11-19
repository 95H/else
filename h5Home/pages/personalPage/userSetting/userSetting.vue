<template>
	<div class="content userSetting">
		<titleBack titleName="个人设置" isShowRight="isHide"></titleBack>
		<mt-cell
		  title="用户名"
		  is-link
      @click.native="personalZhuge('H5_个人设置-点击用户名','/personalPage/userSetting/setnikeName')"
		  :value="nickName" class="setnikeName">
		</mt-cell>
		<div class="cellWarp">
			<mt-cell
			  title="账号"
        @click.native="personalZhuge('H5_个人设置-点击修改密码','/resetPassword/forgetPassword')"
			  is-link
			  value="修改密码">
			</mt-cell>
			<mt-cell
			  title="个性签名"
        @click.native="personalZhuge('H5_个人设置-点击个性签名','/personalPage/userSetting/setSign')"
			  is-link
			  value="" style="border:none;">
			</mt-cell>
		</div>
		<div class="cellWarp">
			<mt-cell
			  title="职业"
        @click.native="personalZhuge('H5_个人设置-点击职业','/personalPage/userSetting/setOccupation')"
			  is-link
			  value="">
			</mt-cell>
			<mt-cell
			  title="工作年限"
        @click.native="personalZhuge('H5_个人设置-点击工作年限','/personalPage/userSetting/jobyear')"
			  is-link
			  value="">
			</mt-cell>
			<mt-cell
			  title="学习方向"
        @click.native="personalZhuge('H5_个人设置-点击学习方向','/personalPage/userSetting/studyDirection')"
			  is-link
			  value="" style="border:none;">
			</mt-cell>
      <mt-cell
        title="实名认证"
        @click.native="personalZhuge('H5_个人设置-点击实名认证','/personalPage/userSetting/realNameAuth?realNameStatus='+realNameStatus,realNameStatus)"
        is-link
        :class="realNameStatus ? 'realNameColor' : 'realNameColor9'"
        :value="realNameAuth" style="border:none;">
      </mt-cell>
		</div>
	</div>
</template>
<style lang="less">
	@import 'userSetting.less';
	.userSetting{
		.cellWarp{
			width: 100%;
			margin: unit(20/@u,@uu) 0;
			background: #ffffff;
			.mint-cell{
				padding:0;
				margin-left: unit(30/@u,@uu);
				border-bottom: 1px solid #f5f5f5;
				.is-link{
					margin-right: unit(62/@u,@uu) !important;
				}
			}
      .realNameColor{
        .mint-cell-value{
          span{
            color:#ff544c!important;
          }
        }
      }
      .realNameColor9{
        .mint-cell-value{
          span{
            color:#999!important;
          }
        }
      }
		}
		.mint-cell{
			padding:0 unit(32/@u,@uu);
			background: #ffffff;
			height: unit(100/@u,@uu);

			.mint-cell-wrapper{
				background-image: none;
				padding: 0;
				.mint-cell-title{
					.mint-cell-text{
						color: @color3;
						font-size: unit(32/@u,@uu)
					}
				}
				.is-link{
					margin-right: unit(32/@u,@uu);
					span{
						font-size: unit(32/@u,@uu);
						color: #999999;
					}
				}
				.mint-cell-value{
					max-width: 50%;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    overflow: hidden;
				    span{
				    	max-width: 100%;
					    display: inline-block;
					    overflow: hidden;
					    text-overflow: ellipsis;
				    }
				}
			}
			.mint-cell-allow-right:after{
				width:unit(16/@u,@uu);
				height: unit(16/@u,@uu);
			}
		}
		.setnikeName{
			margin: unit(20/@u,@uu) 0;
		}
	}
</style>
<script>
import {zhugeTrack} from '~/plugins/filter'
import axios from 'axios'
import {appBaseUrl} from '~/api/apiurl'
export default {
	name:'userSetting',
	data(){
		return{
      zhugeTrack:zhugeTrack,
			nickName:'',
      realNameAuth:'',
      realNameStatus:false
		}
	},
	mounted(){
    zhugeTrack("进入个人设置页");
		this.nickName=localStorage.getItem('nickName');
    this.getBaseUserInfo();
	},
	methods:{
    personalZhuge:function(clickname,skipurl,realNameStatus){
      if(realNameStatus==1){
        localStorage.setItem('redirectUrl','/personalPage/userSetting/userSetting');
      }
      zhugeTrack(clickname,{},skipurl)
    },
    getBaseUserInfo(uid){
      axios({
        url:appBaseUrl+'/bxg/onlineUser/getBaseUserInfo',
        method:'post',
        params:{
          user_id:localStorage.getItem('userId'),
          sign:localStorage.getItem('sign')
        }
      }).then(res=>{
        if(res.data.errorMessage!="1001"){
          this.realNameAuth=res.data.resultObject.distributionAuthentication?'已认证':'未认证';
          this.realNameStatus=res.data.resultObject.distributionAuthentication?0:1;
        }else{
          window.localStorage.setItem('redirectUrl',window.location.href);
          window.location='/loginRegister/phoneLogin';
        }
      }).catch(err=>{
        console.log(err)
      })
    }
	}
}
</script>
