<template>
	<div class="content loginPage">
		<div class="formWarp">
			<div class="inpWarp">
				<div class="usernameBox box">
					<div class="inpBox">
						<input type="text" class="userName" maxlength="30" autocomplete="new-password" placeholder="请输入手机号或邮箱" v-model="loginData.username">
					</div>
				</div>
				<div class="passwordBox box">
					<div class="inpBox">
						<input type="password" class="password" maxlength="18" autocomplete="new-password" placeholder="请输入密码" v-model="loginData.password">
					</div>
				</div>
			</div>
			<div class="linkWarp cl">
				<router-link :to="{name:'loginRegister-phoneLogin'}" class="phoneCodeLogin">手机验证码登录</router-link>
				<router-link :to="{name:'resetPassword-forgetPassword'}" class="ForgetPassword">忘记密码</router-link>
			</div>
			<div class="logoBtnWarp">
				<button @click="login">登录</button>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "loginRegister.less";
	.cl {
		clear: both;
		&:after {
			content: '';
			height: 0;
			display: block;
			clear: both;
			visibility: hidden;
		}
	}
	
	.loginPage {
		margin-top: 0;
		padding-top: unit(100/@u, @uu);
		.formWarp {
			padding-top: 0;
			width: 90%;
			.inpWarp {
				margin: 0 auto 0;
				.usernameBox,
				.passwordBox {
					.inpBox {
						height: unit(88/@u, @uu);
						box-sizing: border-box;
						input {
							padding: 0 unit(30/@u, @uu);
							background-color: #fff;
						}
					}
				}
				.usernameBox {
					margin-bottom: unit(30/@u, @uu);
				}
				.passwordBox {
					margin-bottom: unit(28/@u, @uu);
				}
			}
			.linkWarp {
				padding: 0 unit(30/@u, @uu);
				.phoneCodeLogin {
					float: left;
					color: #38adff;
					font-size: unit(28/@u, @uu);
				}
				.ForgetPassword {
					float: right;
					color: #333333;
					font-size: unit(28/@u, @uu);
				}
			}
			.logoBtnWarp {
				button {
					height: unit(88/@u, @uu);
					line-height: unit(88/@u, @uu);
					font-size: unit(36/@u, @uu);
					box-sizing: border-box;
					margin-top: unit(60/@u, @uu);
				}
			}
		}
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
	import { Indicator } from 'mint-ui'
	import { appBaseUrl } from '~/api/apiurl'
	export default {
		name: 'login',
		head: {
			title: '登录 - 博学谷'
		},
		data() {
			return {
				loginData: {
					username: '',
					password: '',
				},
				errorMsg: {
					Usermassge: '',
					passwdmassge: ''
				},
				zhugeSid: ''
			}
		},
		mounted() {
			zhugeTrack('H5_进入登录页');
			this.zhugeSid = zhuge.getSid();
			document.title='登录 - 博学谷';
	
			let backUrl = this.$route.query.backurl
			if (backUrl) {
				localStorage.setItem('redirectUrl', backUrl)
			}
			
		},
		methods: {
			userNameInvalid() { //用户名验证
				if(this.loginData.username.trim() == '') {
					this.$toast('请输入手机号或邮箱');
					return false
				} else if(!regPhone(this.loginData.username) && this.loginData.username.trim().indexOf("@") == "-1") {
					this.$toast('请输入正确的手机号或邮箱');
					return false
				} else if(!regEmail(this.loginData.username) && this.loginData.username.trim().indexOf("@") != "-1") {
					this.$toast('请输入正确的手机号或邮箱');
					return false;
				} else {
					return true;
				}
			},
			passwokuser() { //密码验证
				if(this.loginData.password.trim() == '') {
					this.$toast('请输入密码');
					return false
				} else if(this.loginData.password.trim().length < 6) {
					this.$toast('请输入6-18位密码');
					return false
				} else {
					return true;
				}
			},
			login() {
				if(!this.userNameInvalid()) {
					return;
				} else if(!this.passwokuser()) {
					return;
				} else {
					var did = zhuge.getDid();
					var sid = zhuge.getSid();
					var data = {
						username: this.loginData.username,
						password: this.loginData.password,
						loginTerminal: 'mweb',
						additional: did + '@' + sid
					};
					Indicator.open();
					
					// 简单修改之前的代码 2018.9.26
					this.$store.dispatch('login', data)
						.then(res => {
							Indicator.close();
							if (res.data.success) {
								this.$store.dispatch('userLogin', true)
								var redirectUrl = localStorage.getItem('redirectUrl');
								var uId = getCookie('_uc_t_').split(";")[0];
								// 获取用户信息
								this.$store.dispatch('fetchUser').then(response => {
									Indicator.close()

									if(response.data.success) {
										let resultObject = response.data.resultObject
										localStorage.setItem('nickName', resultObject.nickName)
										localStorage.setItem('userId', resultObject.uid)
										if(resultObject.disAuthName) {
											localStorage.setItem('disAuthName', resultObject.disAuthName)
										}
										zhuge.identify(uId, {}, function() {
											if(redirectUrl) {
												window.localStorage.setItem('redirectUrl', '');
												window.location = redirectUrl;
											} else {
												window.location = "/"
											}
										});
									}
								}).catch(err => {})
							} else {
								if(res.data.errorMessage == "此用户未注册") {
									this.$toast('此用户未注册');
								} else if(res.data.errorMessage == "用户名或密码错误") {
									this.$toast('用户名或密码错误');
								} else {
									errorTips(res.data.errorMessage)
								}
							}
						})
						.catch(err => {
							console.log('登录错误', err)
						})
					/*
					axios({
						url: '/online/user/login',
						method: 'POST',
						params: data,
					}).then((res) => {
						Indicator.close();
						if(res.data.success) {
							this.$store.dispatch('userLogin', true)
							/// localStorage.setItem('sign', res.data.resultObject)
							/// setCookie('sign', res.data.resultObject)
							var redirectUrl = window.localStorage.getItem('redirectUrl');
							var uId = getCookie('_uc_t_').split(";")[0];
							axios.get('/online/user/getUserData').then((response) => {
								Indicator.close()
								let resultObject = response.data.resultObject
								let userInfo = {
									userId: resultObject.uid,
									avatar: resultObject.img,
									nickName: resultObject.nickName
								}
								
								if(response.data.success) {
									localStorage.setItem('nickName', resultObject.nickName)
									localStorage.setItem('userId', resultObject.uid)
									// this.$store.commit('setLoginedUserInfo', userInfo)
									// setCookie('userId', resultObject.uid)
									if(resultObject.disAuthName) {
										localStorage.setItem('disAuthName', resultObject.disAuthName)
									}
									zhuge.identify(uId, {}, function() {
										if(redirectUrl) {
											window.localStorage.setItem('redirectUrl', '');
											window.location = redirectUrl;
										} else {
											window.location = "/"
										}
									});
								}
							}, (err) => {
								console.log(err)
							});
						} else {
							if(res.data.errorMessage == "此用户未注册") {
								this.$toast('此用户未注册');
							} else if(res.data.errorMessage == "用户名或密码错误") {
								this.$toast('用户名或密码错误');
							} else {
								errorTips(res.data.errorMessage)
							}
						}
					})
					*/
				}
			}
		}
	}
</script>