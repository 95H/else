<template>
	<div class="content setoccupation">
		<titleBack titleName="职业" isShowRight="isHide"></titleBack>
		<ul class="jobsList cl">
			<li class="jobName" v-for="(items,index) in occupationList" :key="index" :id="items.id" @click="changeOccupation(items.id)">
				<a href="javascript:;" :class="[userData.occupation==items.id ? isActive:'']">{{items.value}}</a>
			</li>
		</ul>
	</div>
</template>
<style lang="less">
	@import 'userSetting.less';
</style>
<script type="text/javascript">
	import axios from 'axios';
	import { Toast,Indicator } from 'mint-ui';
	export default {
		name:'setOccupation',
		data() {
			return{
				userData:{},
				occupationList:{},
				isActive:'is-active',

			}
		},
		mounted (){
			axios.get('/online/user/getUserData').then((response) => {
		      	if(response.data.success){
		      		this.userData=response.data.resultObject;
		      		this.occupationList=response.data.resultObject.job;
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
			changeOccupation(id){
				Indicator.open();
				this.userData.occupation=id;
				axios({
					url:'/online/user/updateUser',
					method:'post',
					params:{
						userId:this.userData.uid,
						nickName:this.userData.nickName,
						autograph:this.userData.autograph,
						loginName:this.userData.loginName,
						occupation:id,
						jobyearId:this.userData.jobyearId,
						target:this.userData.target,
						province:this.userData.province,
						county:this.userData.county,
						city:this.userData.city,
						fullAddress:this.userData.fullAddress
					}
				}).then( (res) => {
					Indicator.close();
					if(res.data.success){
						Toast({
						  message:res.data.resultObject,
						  duration:2000
						})
						setTimeout(function(){
							history.go(-1)
						},1000)
					}else{
						if(res.data.errorMessage=="尚未登录！"){
              window.location='/loginRegister/phoneLogin';
              window.localStorage.setItem('redirectUrl',window.location.href);
			      }
					}
				})
			}
		}
	}
</script>
