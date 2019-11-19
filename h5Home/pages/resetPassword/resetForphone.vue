<template>
	<div class="content">
		<titleBack titleName="忘记密码" isShowRight="isHide"></titleBack>
		<div class="formWarp">
			<div class="inpWarp">
				<p class="userCount">账号为:{{$route.query.tell}}</p>
				<div class="verification-code cl box">
	            		<div class="inpBox">
	                    	<input type="text" class="verifCode" maxlength="6" placeholder="请输入动态验证码" autocomplete="new-password" v-model="formData.code" @blur="vCodeInvalid">
	            		</div>
	                    <div class="btn-getcode" :class="[vcodeBtn.isDisbale ? isActive: disabled]" @click="getvcode"><span>|</span>{{vcodeBtn.val}}</div>
	                    <div class="error-tips-sec">
		                    <div class="RverificationCodeHit wordHit" v-if="errorMsg.codeMsg.show">
		                        <span class="HitWord">{{errorMsg.codeMsg.msg}}</span>
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
                	<div class="error-tips-sec">
                    	<div class="userNameHit wordHit" v-if="errorMsg.passwordMsg.show">
	                        <span class="HitWord">{{errorMsg.passwordMsg.msg}}</span>
	                    </div>
                    </div>
                </div>
			</div>
			<div class="logoBtnWarp">
				<button @click="nextStep" :disabled=enbled>提交</button>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "../loginRegister/loginRegister.less";
	.inpWarp{
		margin-top: 0 !important;
	}
	.disabled{
		pointer-events: none;
	}
	.isActive{
		pointer-events: normal;
	}
	.isShow{
		color:@primaryColor !important;
	}
</style>
<script>
	import {regPhone,regEmail,noempty} from '~/plugins/vue-validator/validator';
	import {getCookie,errorTips,setCookie,zhugeTrack} from '~/plugins/filter'
	import {Indicator} from 'mint-ui';
	import axios from 'axios'
	export default {
		name:'resetForphone',
		data () {
			return {
				formData:{
					username:'',
					password:'',
					code:'',
					vcode:''
				},
				disabled:'disabled',
				isActive:'isActive',
				enbled:false,
				isShowpassword:false,
				inputType:'password',
				vcodeBtn:{
					val:'获取动态码',
					isDisbale:true,
					time:90
				},
				errorMsg:{
					passwordMsg:{
						msg:'',
						show:false
					},
					codeMsg:{
						msg:'',
						show:false
					},
				}
			}
		},
		mounted () {
			this.formData.username=this.$route.query.tell;
			this.formData.vcode=this.$route.query.vcode
		},
		methods:{
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
			vCodeInvalid () { //动态码
				if(this.formData.code.trim()==""){
					this.errorMsg.codeMsg.msg='请输入动态验证码';
					this.errorMsg.codeMsg.show=true;
					return false
				}else if(this.formData.code.trim().length < 6){
					this.errorMsg.codeMsg.msg='动态验证码错误';
					this.errorMsg.codeMsg.show=true;
					return false
				}else{
					this.errorMsg.codeMsg.show=false;
					return true
				}
			},
			getvcode () { //获取动态码
				var _self=this;
				_self.vcodeBtn.isDisbale=false;
				var data={
					phone:this.formData.username,
					vcode:this.formData.vcode,
					vtype:2
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
						errorTips(res.data.errorMessage)
					}

				}).catch((res) => {
					_self.vcodeBtn.isDisbale=true;
					errorTips('网络连接错误~')
				})
			},
			showPassword () {
				if(!this.isShowpassword){
					this.isShowpassword=true;
				}else{
					this.isShowpassword=false;
				}
			},
			nextStep () {
				if(!this.vCodeInvalid()){
					return
				}else if(!this.passwordInvalid()){
					return
				}else{
					Indicator.open();
					axios({
						url:'/online/user/resetUserPassword',
						method:'POST',
						params:this.formData,
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
							axios({
								url:'/online/user/login',
								method:'post',
								params:{
									username:this.formData.username,
									password:this.formData.password,
									loginTerminal:'mweb'
								}
							}).then((res)=>{//sign不正确
								if(res.data.success){
									this.$store.dispatch('userLogin',true)
									localStorage.setItem('sign',res.data.resultObject)
									setCookie('sign',res.data.resultObject)
									var uId = getCookie('_uc_t_').split(";")[0];
									axios.get('/online/user/getUserData').then((response) => {
										if(response.data.success) {
											localStorage.setItem('nickName', response.data.resultObject.nickName)
											localStorage.setItem('userId', response.data.resultObject.uid)
											if(response.data.resultObject.disAuthName) {
												localStorage.setItem('disAuthName', response.data.resultObject.disAuthName)
											}
											zhuge.identify(uId, {}, function() {
												window.location="/resetPassword/successPhone"
											});
										}
									}, (err) => {
										console.log(err)
									});
								}else{
									Indicator.close();
									errorTips(res.data.errorMessage)
								}
							})
						}else{
							Indicator.close();
							if(res.data.errorMessage=="动态码不正确！"){
								this.errorMsg.codeMsg.msg='动态验证码错误';
								this.errorMsg.codeMsg.show=true;
							}else {
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
