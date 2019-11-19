<template>
	<div class="zlpg-login">
		<div class="zlpg-logo-con">
			<!--<div class="zlpg-logo"></div>-->
			<div class="zlpg-platform"></div>
		</div>
		<div class="carousel-con">
			<el-carousel trigger="click" height="100%" arrow="never" :interval='8000'>
				<el-carousel-item>
					<div class="carousel-img"></div>
				</el-carousel-item>
				<el-carousel-item>
					<div class="carousel-img carousel-img1"></div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="zlpg-login-con">
			<p class="user-login">欢迎使用</p>
			<el-form :model="loginForm" ref="loginForm" class="user-input">
				<input type="text" class="inputName" style="position: absolute; top: -999px;"/>
				<input type="password" class="inputPassword" style="position: absolute; top: -999px;"/>
				<el-form-item prop="loginName" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
					<el-input v-model="loginForm.loginName" maxLength="11" placeholder="请输入用户名" @keyup.native.enter="submitForm" @keyup.native="changeLoginName">
					</el-input>
				</el-form-item>
				<el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
					<el-input class="inputPassword" type="password" v-model="loginForm.password" placeholder="请输入密码" @keyup.native.enter="submitForm"></el-input>
				</el-form-item>
				<el-form-item prop="kaptchaCode" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
					<el-input v-model="loginForm.kaptchaCode" placeholder="请输入验证码" @keyup.native.enter="submitForm" class="kaptchaCode fl"></el-input>
					<img :src="codeImg" class="code-img fr" @click="changeCodeImg" />
				</el-form-item>
				<div>
					<el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
					<a href="javascript:;" class="forgetPoss" @click="forgetPossFun">忘记密码？</a>
				</div>
				<!--<span class="fr">找回密码</span>-->
				<div class="submit-btn" @click="submitForm">登录</div>
			</el-form>
			<!--<div class="text-center">立即注册</div>-->
		</div>
		<div class="login-team">Copyright ©️ 2018 中联资产评估集团有限公司 版权所有 </div>
		<!-- <el-dialog
		title="忘记密码"
		:visible.sync="dialogForgetPoss"
		width="435px"
		:center=true
		custom-class="dialogForget"
		@close="handleClose">
			<el-form class="forgetForm" :model="forgetForm" :rules="forgetRules" label-width="80px" size="mini"  ref="forgetForm">
				<el-form-item label="手机号：" prop="phone">
					<el-input v-model="forgetForm.phone" :disabled="forgetFormPhoneDis" autocomplete="off" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="获取验证码：" prop="code">
					<el-col :span="17">
						<el-input v-model="forgetForm.code" autocomplete="off" placeholder="请输入验证码"></el-input>
					</el-col>
					<el-col :span="1">&nbsp;</el-col>
					<el-col :span="6">
						<div class="search-btn getCodeBtn" :class="{disNoClick:disNoClick}" @click="getCodeFun">{{codeText}}</div>
					</el-col>
				</el-form-item>
				<el-form-item label="新密码：" prop="password">
					<el-input v-model="forgetForm.password" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码：" prop="oPassword">
					<el-input v-model="forgetForm.oPassword" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialogForgetPoss-footer">
				<div class="search-btn" @click="confirmPoss">保存</div>
				<div class="reset-btn" @click="dialogForgetPoss = false">取消</div>
			</span>
		</el-dialog> -->

		<center-dialog ref="forgetPwd" dialogWidth='435px' dialogHeight="300px" dialogTitle="忘记密码">
			<div slot="dialogContent" class="dialogForget">
				<el-form class="forgetForm" :model="forgetForm" :rules="forgetRules" label-width="80px" size="mini"  ref="forgetForm">
					<el-form-item label="手机号：" prop="phone">
						<el-input v-model="forgetForm.phone" :disabled="forgetFormPhoneDis" autocomplete="off" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item label="获取验证码：" prop="code">
						<el-col :span="17">
							<el-input v-model="forgetForm.code" autocomplete="off" placeholder="请输入验证码"></el-input>
						</el-col>
						<el-col :span="1">&nbsp;</el-col>
						<el-col :span="6">
							<div class="search-btn getCodeBtn" :class="{disNoClick:disNoClick}" @click="getCodeFun">{{codeText}}</div>
						</el-col>
					</el-form-item>
					<el-form-item label="新密码：" prop="password">
						<el-input v-model="forgetForm.password" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码：" prop="oPassword">
						<el-input v-model="forgetForm.oPassword" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
					</el-form-item>
				</el-form>
				<div class="text-center">
					<div class="search-btn" @click="confirmPoss">保存</div>
					<div class="reset-btn" @click="closeDialog">取消</div>
				</div>
			</div>
		</center-dialog>
	</div>
</template>

<script>
	import centerDialog from '@/components/centerDialog'
	export default {
		data() {
			return {
				login: '登陆',
				loginForm: {
					loginName: "", // 13811111117 18612708882 13501018885
					password: '', //111111
					kaptchaCode: "" //1111
				},
				rememberPassword: false,
				codeImg: 'api/getKaptcha?a=' + new Date().getMilliseconds(),
				//忘记密码
				// dialogForgetPoss:false,
				forgetForm:{
					phone:"",
					code:"",
					password:"",
					oPassword:""
				},
				forgetRules:{
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator:(rule, value, callback)=>{
							if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(value))){
								callback(new Error('请输入正确的手机号'));
							}else{
								callback();
							}
						}, trigger: 'blur' }
					],
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
					],
					oPassword: [
						{ required: true, message: '请输入确认密码', trigger: 'blur' },
					],
				},
				forgetFormPhoneDis:false,    //手机号是否能修改
				codeText:"点击获取",   //验证码
				disNoClick:false,   //验证码
			};
		},
		components : { centerDialog },
		created() {
			if(localStorage.getItem('logInfo')) {
				let logInfo = JSON.parse(localStorage.getItem('logInfo'));
				this.loginForm = {
					loginName: logInfo.loginName,
					password: logInfo.password,
					kaptchaCode: ""
				}
				this.rememberPassword = true;
			}
		},
		methods: {
			//忘记密码
			forgetPossFun(){
				// this.dialogForgetPoss=true;
				if(this.loginForm.loginName){
					this.forgetForm.phone=this.loginForm.loginName;
				}
				this.$refs.forgetPwd.showDialog();
			},
			// 关闭弹窗
			closeDialog(){
				this.$refs.forgetPwd.closeDialog();
			},
			//获取验证码
			getCodeFun(){
				var _this=this;
				if(!this.forgetForm.phone){
					this.$messageWarning("请输入手机号");
					return
				}
				if(this.disNoClick) return;
				_this.$http.post('/api/login/sendRegCode', {
					phone:this.forgetForm.phone
				})
				.then(function(data) {
					if(data.data){
						_this.forgetFormPhoneDis=true;
						_this.timeInterval()
						_this.$messageSuccess("发送验证码成功！");
					}else{
						_this.$messageError(data.msg);
					}
				})
				.catch(function(error){
					_this.$messageError(error);
					// _this.timeInterval()
				})
			},
			//验证码定时器
			timeInterval(){
				var _this=this,num=59;
				this.codeText="剩余 60 s";
				this.disNoClick=true;
				var timeOut=setInterval(function(){
					if(num<0){
						_this.codeText="重新获取";
						_this.disNoClick=false;
						clearInterval(timeOut)
					}else{
						_this.codeText="剩余 "+(num--)+" s";
					}
				},1000)
			},
			//确认密码修改
			confirmPoss(){
				var _this=this;
				this.$refs["forgetForm"].validate((valid) => {
					if(!valid)return;
					if(this.forgetForm.password!=this.forgetForm.oPassword){
						this.$messageWarning("两次输入密码不同");
						return
					}
					_this.$http.post('/api/login/updatePwdBycode', {
						phone:this.forgetForm.phone,
						code:this.forgetForm.code,
						password:hex_md5(this.forgetForm.password)
					})
					.then((data) => {
						window.localStorage.removeItem("logInfo");
						this.loginForm.password = '';
						// _this.dialogForgetPoss=false;
						this.$messageSuccess(data.msg);
						this.closeDialog();
					})
					.catch(function(error){
						_this.$messageError(error);
					})
				})
				// if(!this.forgetForm.phone){
				// 	this.$messageWarning("请输入手机号");
				// 	return
				// }else if(!this.forgetForm.code){
				// 	this.$messageWarning("请输入验证码");
				// 	return
				// }
				// else if(!this.forgetForm.password){
				// 	this.$messageWarning("请输入新密码");
				// 	return
				// }
				// hex_md5(this.loginForm.password);

			},
			//关闭时清空
			handleClose(){
				this.forgetForm={
					phone:"",
					code:"",
					password:"",
					oPassword:""
				}
				this.forgetFormPhoneDis=false;
				this.$refs["forgetForm"].clearValidate()
			},
			changeLoginName() {
				let logInfo = JSON.parse(localStorage.getItem('logInfo'));
				if(logInfo && this.loginForm.loginName == logInfo.loginName) {
					this.loginForm.password = logInfo.password;
				} else {
					this.loginForm.password = '';
				}
			},
			submitForm() {
				let _this = this;
				let password;
				let logInfo = JSON.parse(localStorage.getItem('logInfo'));
				if(logInfo && this.loginForm.loginName == logInfo.loginName && this.loginForm.password == logInfo.password) {
					password = this.loginForm.password;
				} else {
					password = hex_md5(this.loginForm.password);
				}
				if(!this.loginForm.loginName){
					this.$messageWarning("请输入手机号");
					return
				}
				this.$refs['loginForm'].validate((valid) => {
					if(valid) {
						_this.$http.post('/api/login', {
								loginName: _this.loginForm.loginName,
								password: password,
								kaptchaCode: _this.loginForm.kaptchaCode // qmpvr28
							})
							.then(function(data) {
								_this.$setCookie('token', data.data.token, 24 * 60 * 60);
								let isExternal = false;
								if(data.data.user.sysroles && data.data.user.sysroles.length){
									for(let i=0;i<data.data.user.sysroles.length;i++){
										if(data.data.user.sysroles[i].roleCode == 'WPZJ'){
											isExternal = true;
										}
									}
								}
								let userData = {
									"groupNum":data.data.user.groupNum,
									"userName":data.data.user.userName,
									"roleName":data.data.user.roleName,
									"groupName":data.data.user.sysgroup.groupName,
									"groupIds":data.data.user.groupIds,
									"id":data.data.user.id,
									"groupType":data.data.user.sysgroup.groupType,
									"isExternal":isExternal
								}
								if(userData.groupType == 2){
									userData.parentGroupName = data.data.user.parentGroup.groupName
								}
								_this.$setCookie('user', JSON.stringify(userData), 24 * 60 * 60);
								if(_this.rememberPassword) {
									localStorage.setItem('logInfo', JSON.stringify({
										loginName: _this.loginForm.loginName,
										password
									}));
								} else {
									localStorage.removeItem('logInfo');
								}
								_this.$http.post('/api/queryUserSysFunction').then(function(res) {
									// sessionStorage.setItem('queryUserSysFunction', JSON.stringify(res.data));
									//_this.$setCookie('queryUserSysFunction', JSON.stringify(res.data) ,24*60*60);
									_this.$store.state.queryUserSysFunction = res.data;
									_this.$store.state.groupId = '';
									_this.$store.state.projectMenu = undefined; //重新登陆需要重置projectMenu的值，否则会影响新用户的权限
									// if(_this.$store.state.queryUserSysFunction.length) {
									// 	_this.$router.options.routes.forEach(function(item, index) {
									// 		if(item.path == '/zlpg') {
									// 			item.children.forEach(function(value, ind) {
									// 				_this.$store.state.queryUserSysFunction.forEach(function(val, key) {
									// 					if('/' + value.name == val.jump) {
									// 						if(val.list && val.list.length) {
									// 							var routerArr = val.list[0].jump.split('/');
									// 							if(value.name != "home" && value.name != "project") {
									// 								value.redirect.name = routerArr[routerArr.length - 1]
									// 							}
									// 						}
									// 					}
									// 				})
									// 			})
									// 		}
									// 	})
									// }
									// 【项目菜单】
									_this.$http.post('/api/sysfunction/functionChildList', {
										id: function() {
											for(let i in res.data) {
												if(res.data[i].jump == '/project') {
													return res.data[i].id
												}
											}
										}()
									}).then(res => {
										_this.$store.state.projectMenu = res.data;
										// 跳转到主页
										_this.commonDataHandle(function() {
											_this.$router.push({
												path: '/zlpg'
											})
										});
									}).catch(err => {
										_this.$messageError(err);
									})
								}).catch(function(error) {
									_this.$messageError(error);
								});
							})
							.catch(function(error) {
								_this.loginForm.kaptchaCode = '';
								_this.$messageError(error);
							});
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},
			commonDataHandle: function(callback) {
				var _this = this;
				this.$http.post("/api/projects/findXmSx").then(function(data) {
						if(data.code == 200) {
							var common = {};
							for(const key in data.data) {
								common[key] = {};
								var item = data.data[key];
								for(var i = 0; i < item.length; i++) {
									common[key][item[i].id] = item[i].name;
								}
							}
							window.commonOriginalData = data.data;
							window.commonData = common;
							callback()
						}
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
			},
			changeCodeImg: function() {
				this.codeImg = "api/getKaptcha?a=" + new Date().getMilliseconds();
				this.loginForm.kaptchaCode = '';
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.zlpg-login {
		width: 100%;
		height: 100%;
		position: relative;
		.zlpg-logo-con {
			height: 62px;
			padding: 16px 50px;
			box-sizing: border-box;
			border-bottom: 2px solid #DCDCDC;
			.zlpg-logo {
				width: 30px;
				height: 30px;
				background: #fff url(../../assets/common/biglogo.png) no-repeat center;
				background-size: 30px 28px;
				float: left;
			}
			.zlpg-platform {
				width: 105px;
				height: 24px;
				background: url(../../assets/common/platform-black.png) no-repeat center;
				background-size: 105px 24px;
				float: left;
			}
		}
		.carousel-con {
			margin: 0 50px 0;
			height: calc(100% - 140px);
			min-height: 500px;
			.el-carousel,
			.el-carousel__container {
				height: 100%;
			}
			.carousel-img {
				background: url(../../assets/common/bg0.png) no-repeat center;
				height: 100%;
				background-size: cover;
			}
			.carousel-img1 {
				background: url(../../assets/common/bg1.png) no-repeat center;
				height: 100%;
				background-size: cover;
			}
			/deep/ .el-carousel__button {
				width: 8px;
				height: 8px;
				border-radius: 100%;
				margin: 0 6px;
			}
			/deep/ .is-active .el-carousel__button {
				background-color: #3A80EC;
			}
		}
		.zlpg-login-con {
			width: 300px;
			/*height: 58%;*/
			height: 416px;
			background: #fff;
			position: absolute;
			top: 50%;
			/*top:320px;*/
			right: 12%;
			/*max-width:365px;min-height: 380px;*/
			transform: translateY(-50%);
			z-index: 111;
			border-radius: 8px;
			.user-login {
				line-height: 100px;
				font-size: 24px;
				text-align: center;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: rgba(58, 128, 236, 1);
			}
			.user-input /deep/ {
				width: calc(100% - 50px);
				margin: 0 auto;
				height: calc(100% - 100px);
				.el-form-item {
					height: 14%;
				}
				.el-form-item__content,
				.el-input {
					height: 100%;
					line-height: 100%!important;
					position: relative
				}
				.el-input__inner {
					width: 100%;
					height: 100%!important;
					padding-left: 47px!important;
					font-size: 14px!important;
					position: relative
				}
				.el-input__inner:-webkit-autofill {
					box-shadow: 0 0 0 1000px #fff inset;
				}
				.el-form-item:nth-child(5) {
					.el-input__inner {
						padding-left: 20px !important;
					}
				}
				.submit-btn {
					display: block;
					height: 38px;
					line-height: 38px;
					color: #fff;
					text-align: center;
					font-size: 14px;
					cursor: pointer;
					border-radius: 5px;
					margin-top: 20px;
					margin-bottom: 20px;
					/*background: -webkit-linear-gradient(right, #338BF8 , #91BEF2);
					background: -moz-linear-gradient(right, #338BF8 , #91BEF2);
				    background: -o-linear-gradient(right, #338BF8 , #91BEF2);
				    background: -ms-linear-gradient(right, #338BF8 , #91BEF2);
				    background: linear-gradient(to right, #338BF8 , #91BEF2);*/
					background: rgba(58, 128, 236, 1);
				}
				.submit-btn:hover {
					background: rgba(58, 128, 236, 0.8);
				}
				.el-form-item .el-input:before {
					content: '';
					display: block;
					width: 17px;
					height: 18px;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 20px;
					margin: auto;
					z-index: 1;
					background-size: contain;
					background-repeat: no-repeat;
					background-position: center;
				}
				.el-form-item:nth-child(3) .el-input:before {
					background-image: url("../../assets/common/account.png");
				}
				.el-form-item:nth-child(4) .el-input:before {
					background-image: url("../../assets/common/password.png");
				}
			}
			.kaptchaCode /deep/ {
				width: 60%;
			}
			.code-img {
				width: 40%;
				height: 100%;
				border-radius: 5px;
				cursor: pointer;
			}
			.forgetPoss{
				float: right;
				line-height: 19px;
				color:#3A86EA;
				font-size: 12px;
				cursor: pointer;
			}
		}
		.login-team {
			width: 100%;
			text-align: center;
			color: #383838;
			font-size: 12px;
			line-height: 62px;
		}

	}
	/deep/ .dialogForget{
		.el-dialog__header{
			padding: 0;
			height: 40px;
			line-height: 40px;
			.el-dialog__title{
				font-size:14px;
				font-weight:500;
			}
			.el-dialog__headerbtn{
				top: 12px;
    			right: 12px;
			}
		}
		.forgetForm{
			padding: 0 12px;
			/deep/ .el-form-item{
				margin-bottom: 15px;
				.getCodeBtn{
					vertical-align: middle;
				}
				.disNoClick{
					background: #C0C0C0;
					color:#fff;
					border-color:#C0C0C0;
				}
			}
		}
		/deep/ .el-dialog__footer{
			padding: 0 0 28px 0;
		}
	}

/deep/ input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
</style>
