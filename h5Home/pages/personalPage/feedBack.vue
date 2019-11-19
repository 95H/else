<template>
	<div class="content feedBack">
		<titleBack titleName="意见反馈" isShowRight="isHide"></titleBack>
		<div class="texteraWarp">
			<textarea placeholder="感谢你为我们提出宝贵的意见和建议"  v-model="formData.fb_context" ref="count"></textarea>
			<p>{{textLength}}字</p>
		</div>
		<div class="inputWarp">
			<input type="text" placeholder="请输入你的手机号，方便日后联系。" maxlength="11" v-model="formData.fb_phone"/>
		</div>
		<button @click="fd_save" :disabled="disabledState">保存</button>
	</div>
</template>
<style lang="less">
	@import 'userSetting/userSetting.less';
</style>
<script>
	import axios from 'axios'
	import {regPhone,filteremoji} from '~/plugins/vue-validator/validator';
	import { Toast,Indicator} from 'mint-ui';
	import {appBaseUrl} from '~/api/apiurl'
  import {zhugeTrack} from '~/plugins/filter'
	export default {
		name:'feedBack',
		data(){
			return {
        zhugeTrack:zhugeTrack,
				formData:{
					user_id:'',
					fb_phone:'',
					fb_context:'',
					sign:'',
				},
				textLength:'400',
				disabledState:false

			}
		},
		watch:{
		    formData:{
		        handler:function(){
		            var _this = this;
		            var _sum = 400;
		            _this.$refs.count.setAttribute("maxlength",_sum);
		            _this.textLength= _sum- _this.$refs.count.value.length;
		        },
		        deep:true
		    }
		},
		mounted (){
			axios.get('/online/user/getUserData').then((response) => {
		      	if(response.data.success){
		      		this.formData.user_id=response.data.resultObject.uid
		      	}
		    }, (err) => {
	        	console.log(err)
	      })
		},
		methods:{
			watchChange(val){
				this.textLength=this.textLength-val.length;
			},
			fd_save(){
				this.formData.sign=localStorage.getItem('sign');
				if(this.formData.user_id==""){
					Toast({
					  message:"未登录,请先登录",
					  duration:2000
					});
					setTimeout(function(){
						window.location="/loginRegister/phoneLogin";
            			window.localStorage.setItem('redirectUrl',window.location.href);
					})
				}else if(this.formData.fb_context==""){
					Toast({
					  message:"请输入反馈内容",
					  duration:2000
					});
				}else if(filteremoji(this.formData.fb_context)){
					Toast({
					  message:"不支持特殊字符提交",
					  duration:2000
					});
				}else if(this.formData.fb_phone!="" && !regPhone(this.formData.fb_phone)){
					Toast({
					  message:"手机号格式不正确",
					  duration:2000
					});
					return
				}else{
					Indicator.open();
					this.disabledState=true
					axios({
						url:appBaseUrl+'/bxg/fb/addfb',
						method:'post',
						params:this.formData
					}).then((res) =>{
						Indicator.close();
						if(res.data.success){
              zhugeTrack('H5_意见反馈-点击保存');
							Toast({
							  message:res.data.resultObject,
							  duration:2000
							});
							setTimeout(function(){
								window.location='/personalPage/personal';
								this.disabledState=false
							},2000)
						}else{
							this.disabledState=false
			              if(res.data.errorMessage==1001){
			                window.location='/loginRegister/phoneLogin';
			                window.localStorage.setItem('redirectUrl',window.location.href);
			              }else{
			                Toast({
			                  message:res.data.errorMessage,
			                  duration:2000
			                });
			              }
						}
					})
				}
			}
		}

	}
</script>
