<template>
	<div class="content">
		<titleBack titleName="注册账号" isShowRight="isShow" rightTitle="register"></titleBack>
		<div class="formWarp">
			<div class="loginLogo">
				<router-link :to="{path:'/'}">
					<img src="/web/images/loginRegister/loginLogo.png">
				</router-link>
			</div>
			<div class="inpWarp">
				<div class="usernameBox box">
					<div class="inpBox">
						<input type="tell" class="userName" maxlength="30" autocomplete="off" placeholder="请输入手机号" v-model="formData.username" @blur="userNameInvalid">
					</div>
                    <div class="errorTips">
                    	<div class="userNameHit wordHit" v-if="errorMsg.userMsg.show">
	                        <span class="HitWord">{{errorMsg.userMsg.msg}}</span>
	                    </div>
                    </div>
                </div>
                <div class="imgVertifyCode box">
                		<div class="inpBox">
	                		<input type="text" class="imgVertify" maxlength="4" placeholder="图形验证码" autocomplete="off" v-model="formData.vcode" @blur="codeInvalid">
                		</div>
	                	<img :src='vCodeImg' class="imgCode" @click="getImgcode">
	                	<div class="errorTips">
		                    <div class="RverificationCodeHit wordHit" v-if="this.errorMsg.codeMsg.show">
		                        <span class="HitWord">{{errorMsg.codeMsg.msg}}</span>
		                    </div>
	                   </div>
	            </div>
	            <div class="verification-code cl box">
	            		<div class="inpBox">
	                    	<input type="text" class="verifCode" maxlength="6" placeholder="请输入动态码" autocomplete="off" v-model="formData.code" @blur="vCodeInvalid">
	            		</div>
	                    <div class="btn-getcode" :class="[vcodeBtn.isDisbale ? isActive: disabled]" @click="getvcode"><span>|</span>{{vcodeBtn.val}}</div>
	                    <div class="errorTips">
		                    <div class="RverificationCodeHit wordHit" v-if="errorMsg.vcodeMsg.show">
		                        <span class="HitWord">{{errorMsg.vcodeMsg.msg}}</span>
		                    </div>
	                    </div>
	            </div>
                <div class="passwordBox box">
                	<div class="inpBox">
                    	<input type="password" class="password" maxlength="18" autocomplete="new-password" placeholder="请输入密码" v-model="formData.password" @blur="passwordInvalid" v-if="!isShowpassword">

                    	<input type="text" class="password" maxlength="18" autocomplete="new-password" placeholder="请输入密码" v-model="formData.password" @blur="passwordInvalid" v-if="isShowpassword">

                    	<div class="chechPassword" @click="showPassword">
							<i class="iconfont"  v-bind:class="{isShow:isShowpassword}">&#xe600;</i>
                    	</div>
                	</div>
                	<div class="errorTips">
                    	<div class="userNameHit wordHit" v-if="errorMsg.passwordMsg.show">
	                        <span class="HitWord">{{errorMsg.passwordMsg.msg}}</span>
	                    </div>
                    </div>
                </div>
			</div>
			<div class="logoBtnWarp">
				<button @click="register">注册</button>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "loginRegister.less";
</style>
<style lang="less" scoped>
  .headbar{
    position:relative;
    top:0;
    left:0;
  }
	.disabled{
		pointer-events: none;
	}
	.isActive{
		pointer-events: normal;
	}
	.isShow{
		color:#38adff!important;
	}
</style>
<script>
	import {regPhone,regEmail,noempty} from '~/plugins/vue-validator/validator';
	import {errorTips,zhugeTrack,setCookie,getCookie} from '~/plugins/filter'
	import {Indicator} from 'mint-ui';
	import axios from 'axios'
	import { fetch} from '~/api/apiurl'
	export default {
		name:'register',
		data () {
			return {
				formData:{
					username:'',
					password:'',
					vcode:'',
					code:'',
					registType:2
				},
				vCodeImg:'',
				isShowpassword:false,
				errorMsg:{
					userMsg:{
						msg:'',
						show:false
					},
					passwordMsg:{
						msg:'',
						show:false
					},
					codeMsg:{
						msg:'',
						show:false
					},
					vcodeMsg:{
						msg:'',
						show:false
					}
				},
				vcodeBtn:{
					val:'获取动态码',
					isDisbale:true,
					time:90
				},
				disabled:'disabled',
				isActive:'isActive'
			}
		},
		mounted(){
			this.getImgcode();
      zhugeTrack('H5_进入注册页');
		},
		methods:{
			userNameInvalid () {  //用户名验证
				if(this.formData.username.trim()==''){
					this.errorMsg.userMsg.msg='手机号不能为空';
					this.errorMsg.userMsg.show=true;
					return false
				}else if(!regPhone(this.formData.username)){
					this.errorMsg.userMsg.msg='手机号不正确';
					this.errorMsg.userMsg.show=true;
					return false
				}else{
					this.errorMsg.userMsg.show=false;
					return true;
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
			vCodeInvalid () { //动态码
				if(this.formData.code.trim()==""){
					this.errorMsg.vcodeMsg.msg='请输入动态验证码';
					this.errorMsg.vcodeMsg.show=true;
					return false
				}else if(this.formData.code.trim().length < 6){
					this.errorMsg.vcodeMsg.msg='动态验证码错误';
					this.errorMsg.vcodeMsg.show=true;
					return false
				}else{
					this.errorMsg.vcodeMsg.show=false;
					return true
				}
			},
			passwordInvalid () { //密码验证
				if(this.formData.password.trim()==''){
					this.errorMsg.passwordMsg.msg='密码不能为空';
					this.errorMsg.passwordMsg.show=true;
					return false
				}else if(this.formData.password.trim().length < 6 ){
					this.errorMsg.passwordMsg.msg='请输入6-18位密码';
					this.errorMsg.passwordMsg.show=true;
					return false
				}else{
					this.errorMsg.passwordMsg.show=false;
					return true;
				}
			},
			getvcode () { //获取动态码
				if(!this.userNameInvalid()){
					return;
				} else if(!this.codeInvalid){
					return;
				}else{
					var _self=this;
					_self.vcodeBtn.isDisbale=false;
					var data={
						phone:this.formData.username,
						vcode:this.formData.vcode,
						vtype:1
					}
					axios({
						url:'/online/verificationCode/sendmessage',
						params: data,
						method:'post'
					}).then((res) => {
						if(res.data.success){
							_self.vcodeBtn.val=this.vcodeBtn.time+'s';
							var timer = setInterval(function(){
								_self.vcodeBtn.time--
								_self.vcodeBtn.val=_self.vcodeBtn.time+'s';
								if(_self.vcodeBtn.time==0){
									_self.vcodeBtn.val="获取动态码";
									_self.vcodeBtn.time=90;
									_self.vcodeBtn.isDisbale=true;
									clearInterval(timer);
								}
							},1000)
						}else{
							_self.vcodeBtn.isDisbale=true;
							if(res.data.errorMessage=="验证码错误"){
								this.errorMsg.codeMsg.msg='图形验证码错误';
								this.errorMsg.codeMsg.show=true;
							}else{
								errorTips(res.data.errorMessage)
							}
						}

					}).catch((res) => {
						errorTips('网络连接错误~')
						_self.vcodeBtn.isDisbale=true;
					})
				}

			},
			showPassword () {
				if(!this.isShowpassword){
					this.isShowpassword=true;
				}else{
					this.isShowpassword=false;
				}
			},
			register () {
				if(!this.userNameInvalid()){
					return;
				}else if(!this.codeInvalid()){
					return;
				}else if(!this.vCodeInvalid()){
					return;
				}else if(!this.passwordInvalid()){
					return;
				}else{
					var data={
						username:this.formData.username,
						password:this.formData.password,
						code:this.formData.code,
						vcode:this.formData.vcode,
						registType:this.formData.registType,
						userOrigin:'mobile_web'
					}
					Indicator.open();
					axios({
						url:'/online/user/phoneRegist',
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
						if(res.data.success){
              var did=zhuge.getDid();
              var sid=zhuge.getSid();
							axios({
								url:'/online/user/login',
								method:'POST',
								params:{
									username:this.formData.username,
									password:this.formData.password,
                  loginTerminal:'mweb',
                  additional:did+'@'+sid
								}
							}).then((res) => {
								Indicator.close()
								if(res.data.success){
									this.$store.dispatch('userLogin',true);
									localStorage.setItem('globalLogin',true)
									localStorage.setItem('sign',res.data.resultObject)
									setCookie('sign',res.data.resultObject)
                  var uId=getCookie('_uc_t_').split(";")[0];
                  var redirectUrl=window.localStorage.getItem('redirectUrl');
                  axios.get('/online/user/getUserData').then((response) => {
                    Indicator.close()
                    if(response.data.success){
                      localStorage.setItem('nickName',response.data.resultObject.nickName)
                      localStorage.setItem('userId',response.data.resultObject.uid)
                      if(response.data.resultObject.disAuthName){
                        localStorage.setItem('disAuthName',response.data.resultObject.disAuthName)
                      }
                      zhuge.identify(uId,{}, function(){
                        if(redirectUrl){
                          window.localStorage.setItem('redirectUrl','');
                          window.location=redirectUrl;
                        }else{
                          window.location="/"
                        }
                      });
                    }
                  }, (err) => {
                    console.log(err)
                  });
								}else{
									errorTips(res.data.errorMessage)
								}
							})
						}else{
							Indicator.close()
							if(res.data.errorMessage=='动态码不正确！'){
								this.errorMsg.vcodeMsg.msg='动态验证码错误';
								this.errorMsg.vcodeMsg.show=true;
							}else if(res.data.errorMessage=="此用户已注册"){
								this.errorMsg.userMsg.msg='此用户已注册';
								this.errorMsg.userMsg.show=true;
							}else if(res.data.errorMessage=="动态码超时，请重新发送！"){
								this.errorMsg.vcodeMsg.msg='动态码过期，请重新发送！';
								this.errorMsg.vcodeMsg.show=true;
							}else if(res.data.errorMessage=='验证码错误'){
								this.errorMsg.codeMsg.msg='图形验证码错误';
								this.errorMsg.codeMsg.show=true;
							}else{
								this.errorMsg.vcodeMsg.show=false;
								this.errorMsg.userMsg.show=false;
								this.errorMsg.codeMsg.show=false;
								errorTips(res.data.errorMessage)
							}
						}
					})
				}
			}
		}
	}
</script>
