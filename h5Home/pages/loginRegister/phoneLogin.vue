<template>
	<div class="content loginPage">
		<div class="formWarp">
			<div class="inpWarp">
				<div class="usernameBox box">
					<div class="inpBox">
						<input type="text" class="userName" maxlength="11" autocomplete="new-password" placeholder="请输入手机号" v-model="loginData.userName">
					</div>
				</div>
				<div class="phoneCodeWarp box">
					<div class="inpBox cl">
						<input type="text" class="phoneCodeVal" placeholder="请输入短信验证码" autocomplete="off" v-model="loginData.code">
						<div class="codeWarp" :class="[vcodeBtn.isDisbale ? 'isActive' : 'disabled']" @click="getPhoneCode">
							<p>{{vcodeBtn.val}}</p>
						</div>
					</div>
				</div>
			</div>
			<router-link :to="{name:'loginRegister-login'}" class="Accountlogin">账号密码登录</router-link>
			<div class="logoBtnWarp">
				<button @click="login">登录</button>
				<router-link :to="{name:'loginRegister-userAgreement'}">未注册手机验证后自动登录，注册即同意<span>《用户协议》</span></router-link>
			</div>
		</div>
	</div>
</template>
<style lang="less">
  @import "phoneLogin.less";
	.loginPage {
		margin-top: unit(0/@u, @uu);
		padding-top: unit(100/@u, @uu);
	}
	
	.disabled {
		pointer-events: none;
	}
	
	.isActive {
		pointer-events: normal;
	}
	
	html,
	body {
		background-color: #fff!important;
	}
</style>
<script>
	import { regPhone, regEmail, noempty } from '~/plugins/vue-validator/validator';
	import { getCookie, setCookie, errorTips, zhugeTrack } from '~/plugins/filter'
	import axios from 'axios'
	import { Indicator } from 'mint-ui';
	import { appBaseUrl } from '~/api/apiurl'
	export default {
		name: 'phoneLogin',
		head: {
			title: '登录 - 博学谷'
		},
		data() {
			return {
				loginData: {
					userName: '',
					code: '',
					rememberMe: 'true',
					loginTerminal: 'mweb',
					additional: ''
				},
				errorMsg: {
					Usermassge: '',
					passwdmassge: ''
				},
				vcodeBtn: {
					val: '获取验证码',
					isDisbale: true,
					time: 90
				},
			}
		},
		mounted() {
			zhugeTrack('H5_进入登录页');
			document.title='登录 - 博学谷';
		},
		methods: {
			usernameReg() { //用户名验证
				if(this.loginData.userName.trim() == '') {
					this.$toast('请输入手机号');
					return false
				} else if(!regPhone(this.loginData.userName)) {
					this.$toast('请输入正确的手机号');
					return false
				} else {
					return true;
				}
			},
			phoneCodeReg() { //密码验证
				if(this.loginData.code.trim() == '') {
					this.$toast('请输入短信验证码');
					return false
				} else if(this.loginData.code.trim().length == 4) {
					this.$toast('请输入正确的验证码');
					return false
				} else {
					return true;
				}
			},
			getPhoneCode() { //获取动态码
				if(!this.usernameReg()) {
					return;
				} else {

					this.vcodeBtn.isDisbale = false;
					let data = {
						phone: this.loginData.userName,
						vtype: 1
					}
					Indicator.open();

					axios({
						url: '/online/verificationCode/sendMobileCode',
						params: data,
						method: 'post'
					}).then((res) => {
						Indicator.close();
						if(res.data.success) {
							let time = 90;
							this.vcodeBtn.val = time + 's';
							let timer = setInterval(() => {
								time--
								this.vcodeBtn.val = time + 's';
								if(time == 0) {
									this.vcodeBtn.val = "获取验证码";
									time = 90;
									this.vcodeBtn.isDisbale = true;
									clearInterval(timer);
								}
							}, 1000)
						} else {
							this.vcodeBtn.isDisbale = true;
							if(res.data.errorMessage == "验证码错误") {
								errorTips('图形验证码错误');
								this.errorMsg.codeMsg.show = true;
							} else {
								errorTips(res.data.errorMessage)
							}
						}

					}).catch((res) => {
						errorTips('网络连接错误~')
						this.vcodeBtn.isDisbale = true;
					})
				}

			},
			login() {
				if(!this.usernameReg()) {
					return;
				} else if(!this.phoneCodeReg()) {
					return;
				} else {
					let did = zhuge.getDid();
					let sid = zhuge.getSid();
					this.loginData.additional = did + '@' + sid;
					Indicator.open();
					
					// 简单修改之前的代码
					this.$store.dispatch('phoneLogin', this.loginData)
						.then(res => {
							Indicator.close();
							if(res.data.status == 200) {
								this.$store.dispatch('userLogin', true)
								let result = res.data.result

								var redirectUrl = window.localStorage.getItem('redirectUrl');
								localStorage.setItem('nickName', result.nickName);
								localStorage.setItem('userId', result.uid);
								if(result.realName) { //实名认证的名字
									localStorage.setItem('disAuthName', result.realName)
								}

								//诸葛身份验证
								zhuge.identify(result.itcastUUID, {}, function() {
									if(redirectUrl) {
										window.localStorage.setItem('redirectUrl', '');
										window.location = redirectUrl;
									} else {
										window.location = "/"
									}
								});
							} else {
								errorTips(res.data.message)
							}
						}).catch(err => {})


					/*
					axios({
						url: 'online/user/loginAndRegisterByCode',
						method: 'GET',
						params: this.loginData,
					}).then((res) => {
						Indicator.close();
						if(res.data.status == 200) {
							this.$store.dispatch('userLogin', true)
							let result = res.data.result
							let userInfo = {
								userId: result.uid,
								avatar: result.img,
								nickName: result.nickName
							}
							/// this.$store.commit('setLoginedUserInfo', userInfo)
							/// localStorage.setItem('sign', result.sign)
							/// setCookie('sign', result.sign)
							var redirectUrl = window.localStorage.getItem('redirectUrl');
							localStorage.setItem('nickName', result.nickName);
							localStorage.setItem('userId', result.uid);
							/// setCookie('userId', result.uid)
							if(result.realName) { //实名认证的名字
								localStorage.setItem('disAuthName', result.realName)
							}
							//诸葛身份验证
							zhuge.identify(result.itcastUUID, {}, function() {
								if(redirectUrl) {
									window.localStorage.setItem('redirectUrl', '');
									window.location = redirectUrl;
								} else {
									window.location = "/"
								}
							});
						} else {
							errorTips(res.data.message)
						}
					}, (err) => {
						console.log(err)
					})

					*/
				}
			}
		}
	}
</script>