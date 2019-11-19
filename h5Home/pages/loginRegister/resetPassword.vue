<template>
	<div class="content">
		<titleBack titleName="重置密码" isShowRight="isHide"></titleBack>
		<div class="formWarp">
			<div class="loginLogo">
				<img src="/web/images/loginRegister/loginLogo.png">
			</div>
			<div class="inpWarp">
				<p class="userCount">账号:{{emailAdrees}}</p>
				<div class="usernameBox box">
					<div class="inpBox">
						<input type="password" class="password" maxlength="18" placeholder="请输入新密码" autocomplete="new-password" v-model="regData.newpassword" @blur="passwordInvalid">
					</div>
					<div class="errorTips">
	                	<div class="userNameHit wordHit" v-if="errorMsg.newMsg.show">
	                        <span class="HitWord">{{errorMsg.newMsg.msg}}</span>
	                    </div>
	                </div>
                </div>
                <div class="passwordBox box">
                	<div class="inpBox">
                    	<input type="password" class="password" maxlength="18" placeholder="请再次输入新密码" autocomplete="new-password" v-model="regData.reFer" @blur="reFerReg">
                	</div>
                	<div class="errorTips">
	                	<div class="userNameHit wordHit" v-if="errorMsg.refMsg.show">
	                        <span class="HitWord">{{errorMsg.refMsg.msg}}</span>
	                    </div>
	                </div>
                </div>
			</div>
			<div class="logoBtnWarp">
				<button :disabled=isDisabled @click="resetFun">提交</button>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "loginRegister.less";
</style>
<script>
  import {errorTips} from '~/plugins/filter'
	import axios from 'axios'
	export default {
		name:'resetPassword',
		data () {
			return {
				formData:{
					password:'',
					vcode:''
				},
				emailAdrees:'',
				regData:{
					newpassword:'',
					reFer:''
				},
				errorMsg:{
					newMsg:{
						msg:'',
						show:false
					},
					refMsg:{
						msg:'',
						show:false
					}
				},
				isDisabled:false
			}
		},
		mounted (){
			const eml=this.$route.query.vcode;
			const index=eml.indexOf('!');
			this.emailAdrees=eml.substring(0,index);
			this.formData.vcode=eml;
		},
		methods :{
			passwordInvalid () { //密码验证
				if(this.regData.newpassword.trim()==''){
					this.errorMsg.newMsg.msg='密码不能为空';
					this.errorMsg.newMsg.show=true;
					return false
				}else if(this.regData.newpassword.trim().length < 6 ){
					this.errorMsg.newMsg.msg='请输入6-18位密码';
					this.errorMsg.newMsg.show=true;
					return false
				}else{
					this.errorMsg.newMsg.show=false;
					return true;
				}
			},
			reFerReg () {
				if(this.regData.reFer.trim()==''){
					this.errorMsg.refMsg.msg='密码不能为空';
					this.errorMsg.refMsg.show=true;
					return false
				}else if(this.regData.reFer.trim() !=this.regData.newpassword.trim()){
					this.errorMsg.refMsg.msg='两次输入不一致';
					this.errorMsg.refMsg.show=true;
					return false
				}else{
					this.errorMsg.refMsg.show=false;
					return true;
				}
			},
			resetFun () {
				if(!this.passwordInvalid()){
					return
				}else if(!this.reFerReg){
					return
				}else{
					this.formData.password=this.regData.newpassword;
					axios({
						url:'/online/user/resetPasswordByEmail4H5',
						method:'POST',
						params:this.formData
					}).then((res) => {
			            if(res.data.success){
			              this.$store.dispatch('userLogin',true)
			              window.location="/"
			            }else{
			              errorTips(res.data.errorMessage)
			            }
					})
				}
			}
		}
	}
</script>
