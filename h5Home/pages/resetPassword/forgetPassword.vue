<template>
	<div class="content">
		<titleBack titleName="忘记密码" isShowRight="isHide"></titleBack>
		<div class="formWarp">
      <div class="loginLogo">
        <router-link :to="{path:'/'}">
          <img src="/web/images/loginRegister/loginLogo.png">
        </router-link>
      </div>
			<div class="inpWarp">
				<div class="usernameBox box">
					<div class="inpBox">
						<input type="text" class="username" autocomplete="new-password" placeholder="请输入手机号或邮箱" v-model="formData.phone" @blur="userNameInvalid" v-on:input="isShowimg">
					</div>
					<div class="error-tips-sec">
	                	<div class="userNameHit wordHit" v-if="errorMsg.userMsg">
	                        <span class="HitWord">{{errorMsg.Usermassge}}</span>
	                    </div>
	                </div>
                </div>
                <div class="imgVertifyCode box" v-if="isShowImgcode">
            		<div class="inpBox">
                		<input type="text" class="imgVertify" maxlength="4" placeholder="请输入图形验证码" autocomplete="new-password" v-model="formData.vcode" @blur="codeInvalid">
            		</div>
                	<img :src='vCodeImg' class="imgCode" @click="getImgcode">
                	<div class="error-tips-sec">
	                    <div class="RverificationCodeHit wordHit" v-if="this.errorMsg.codeMsg.show">
	                        <span class="HitWord">{{errorMsg.codeMsg.msg}}</span>
	                    </div>
                   </div>
	            </div>
			</div>
			<div class="logoBtnWarp">
				<button @click="nextStep" :disabled=isDisabled>下一步</button>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "../loginRegister/loginRegister.less";
</style>
<style lang="less" scoped>
  @import "../../static/css/variable.less";
  .content{
    margin-top:unit(100/@u,@uu);
  }
	.inpWarp{
    margin:unit(50/@u,@uu) auto 0;
	}
</style>
<script>
	import axios from 'axios'
	import { Indicator ,Toast} from 'mint-ui';
	import {errorTips} from '~/plugins/filter'
	import {regPhone,regEmail} from '~/plugins/vue-validator/validator';
	export default {
		name:'forgetPassword',
		data () {
			return {
				formData:{
					phone:'',
					vcode:'',
					vtype:2
				},
				isDisabled:false,
				isShowImgcode:false,
				errorMsg:{
					userMsg:false,
					Usermassge:'',
					codeMsg:{
						msg:'',
						show:false
					}
				},
				vCodeImg:''
			}
		},
		mounted(){
			this.getImgcode()
		},
		methods:{
			isShowimg () {
				if(this.formData.phone.trim().indexOf("@") == "-1"){
					this.isShowImgcode=true
					this.errorMsg.codeMsg.msg="";
					this.errorMsg.codeMsg.show=false;
				}else{
					this.isShowImgcode=false
				}
			},
			userNameInvalid () {  //用户名验证
				if(this.formData.phone.trim()==''){
					this.errorMsg.Usermassge='请输入手机号或邮箱';
					this.errorMsg.userMsg=true;
					return false
				}else if(!regPhone(this.formData.phone) && this.formData.phone.trim().indexOf("@") == "-1"){
					this.errorMsg.Usermassge='手机号不正确';
					this.errorMsg.userMsg=true;
					return false
				}else if(!regEmail(this.formData.phone) && this.formData.phone.trim().indexOf("@") != "-1"){
					this.errorMsg.Usermassge="邮箱格式不正确";
					this.errorMsg.userMsg=true;
					return false;
				}else{
					this.errorMsg.userMsg=false;
					return true;
				}
			},
			codeInvalid () {	//图形验证码
				if(this.formData.vcode.trim()==""){
					this.errorMsg.codeMsg.msg='请输入图形验证码';
					this.errorMsg.codeMsg.show=true;
					return false
				}else{
					this.errorMsg.codeMsg.show=false;
					return true
				}
			},
			getImgcode(){
				let a=Math.random();
				axios.get('/online/verificationCode/vcode',{
					params:{
						t:a
					}
				}).then((res) => {
					this.vCodeImg=res.request.responseURL
				}).catch((res) => {
					Toast({
					  message:'网络连接错误~',
					  duration:2000
					})
				})
			},
			nextStep(){
				if(!this.userNameInvalid()){
					return;
				}else{
					if(this.formData.phone.indexOf('@')=='-1'){ //手机号找回
						if(!this.codeInvalid()){
							return;
						}else{
							this.isDisabled=true;
							Indicator.open();
							axios({
								url:'/online/verificationCode/checkMwCode',
								method:'POST',
								params:{
									phone:this.formData.phone,
									vcode:this.formData.vcode
								}
							}).then((res) => {
								if(res.data.success){
									window.location="/resetPassword/resetForphone?tell="+this.formData.phone+"&vcode="+this.formData.vcode
									Indicator.close();
								}else{
									this.isDisabled=false;
									Indicator.close()
									if(res.data.errorMessage=="验证码错误"){
										this.errorMsg.codeMsg.msg='验证码错误';
										this.errorMsg.codeMsg.show=true;
										return false
									}else{
										this.errorMsg.userMsg=false;
										errorTips(res.data.errorMessage)
									}
								}
							})
						}
					}else{ //邮箱找回
						this.isDisabled=true;
						Indicator.open();
						var data={
							email:this.formData.phone,
							clientType:'MW'
						}
						axios({
							url:'/online/verificationCode/sendemail',
							method:'POST',
							params:data,
							transformRequest: [function (data) {
							    // Do whatever you want to transform the data
							    let ret = ''
							    for (let it in data) {
							      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
							    }
							    return ret
							}]
						}).then((res) => {
							Indicator.close()
							if(res.data.success){
								window.location="/resetPassword/resetForEmail?email="+this.formData.phone
							}else{
								this.isDisabled=false;
								Toast({
								  message:res.data.errorMessage,
								  duration:2000
								})
							}
						})
					}
				}
			}

		}
	}
</script>
