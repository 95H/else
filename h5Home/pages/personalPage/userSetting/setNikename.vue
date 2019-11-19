<template>
	<div class="content setnikeName">
		<titleBack titleName="用户名" isShowRight="isHide"></titleBack>
		<div class="setInpt">
			<input type="text" maxlength="20" v-model="userData.nickName" placeholder="请输入用户名">
		</div>
		<div class="userNameHit wordHit" v-if="errorMsg.show">
            <span class="HitWord">{{errorMsg.msg}}</span>
        </div>
		<button class="saveNikename" @click="saveChange" :disabled="disabledState">保存</button>
	</div>
</template>
<style lang="less">
	@import 'userSetting.less';
</style>
<script>
	import {patter2} from '~/plugins/vue-validator/validator';
	import { Toast } from 'mint-ui';
	import axios from 'axios';
	export default {
		name:'setNikeName',
		data () {
			return{
				errorMsg:{
					msg:'',
					show:false
				},
				userData:{},
				disabledState:false
			}
		},
		mounted () {
			axios.get('/online/user/getUserData').then((response) => {
		      	if(response.data.success){
		      		this.userData=response.data.resultObject;
		      	}else{
		      		if(response.data.errorMessage=="尚未登录！"){
		      			window.location='/loginRegister/phoneLogin';
                		window.localStorage.setItem('redirectUrl',window.location.href);
		      		}
		      	}
		    }, (err) => {
		        console.log(err)
		      })
		},
		methods:{
			saveChange(){
				if(this.userData.nickName==""){
					this.errorMsg={
						msg:"用户名不能为空",
						show:true
					}
					return
				}else if(patter2(this.userData.nickName)>20 || patter2(this.userData.nickName)<4){
					this.errorMsg={
						msg:"支持中文、字母、数字、'-'、'_'的组合，4-20个字符",
						show:true
					}
					return
				}else{
					this.errorMsg.show=false;
					this.disabledState=true;
					axios({
						url:'/online/user/checkNickName',
						method:'get',
						params:{
							nickName:this.userData.nickName
						}
					}).then((res) => {
						if (res.data.resultObject) {
							Toast({
							  message:'用户名已存在',
							  duration:2000
							})
							this.disabledState=false;
						}else{
							axios({
								url:'/online/user/updateUser',
								method:'post',
								params:{
									userId:this.userData.uid,
									nickName:this.userData.nickName,
									autograph:this.userData.autograph,
									loginName:this.userData.loginName,
									occupation:this.userData.occupation,
									jobyearId:this.userData.jobyearId,
									target:this.userData.target,
									province:this.userData.province,
									county:this.userData.county,
									city:this.userData.city,
									fullAddress:this.userData.fullAddress
								}
							}).then( (res) => {
								if(res.data.success){
									localStorage.setItem('nickName',this.userData.nickName)
									Toast({
									  message:res.data.resultObject,
									  duration:2000
									})
									setTimeout(function(){
										window.location='/personalPage/personal';
									},1000)
								}else{
									if(res.data.errorMessage== "尚未登录！"){
                    window.location='/loginRegister/phoneLogin';
                    window.localStorage.setItem('redirectUrl',window.location.href);
                  }
                  this.disabledState=false;
								}

							})
						}
					})
				}
			}
		}
	}
</script>
