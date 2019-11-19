<template>
	<div class="content setSign">
		<titleBack titleName="个性签名" isShowRight="isHide"></titleBack>
		<div class="texteraWarp">
			<textarea placeholder="说点什么来彰显你的个性吧……" v-model="userData.autograph" ref="count"></textarea>
			<p>{{num}}字</p>
		</div>
		<button @click="saveSign">保存</button>
	</div>
</template>
<style lang="less">
	@import 'userSetting.less';
</style>
<script>
	import axios from 'axios';
	import { Toast,Indicator} from 'mint-ui';
	export default {
		name:'setSign',
		data () {
			return {
				userData:{
					autograph:''
				},
				textLength:30,
				num:''
			}
		},
		watch:{
		    userData:{
		        handler:function(){
		            var _this = this,_sum='';
		            if(this.userData.autograph){
		            	 _sum =this.textLength-this.userData.autograph.length;
		            }else{
		            	_sum=this.textLength-0
		            }
		            _this.$refs.count.setAttribute("maxlength",this.textLength);
		            _this.num= _sum;
		        },
		        deep:true
		    }
		},
		mounted(){
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
			saveSign(){
				Indicator.open();
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
						Indicator.close()
						Toast({
						  message:res.data.resultObject,
						  duration:2000
						})
						setTimeout(function(){
							window.location='/personalPage/personal';
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
