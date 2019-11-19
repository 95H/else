<template>
	<div class="content jobyear">
		<titleBack titleName="工作年限" isShowRight="isHide"></titleBack>
		<div class="selectWarp">
			<label>工作年限</label>
			<div class="optionWarp">
				<p class="curSelect" @click="optionsShow">
					<span>{{currSecelt}}</span>
					<i class="iconfont" v-html="iconState.down" v-if="isShow==false"></i>
					<i class="iconfont" v-html="iconState.up" v-else></i>
				</p>
				<ul class="directionList" v-if="isShow">
					<li v-for="(items,index) in options"
						:key="items.id"
						v-bind:class="[items.value==currSecelt?active:'']"
						 @click="changeJobyear(items.id)">{{items.value}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import 'userSetting.less';
	.jobyear{
    overflow:inherit;
		.is-active{
			background:@primaryColor;
			color: #ffffff;
		}
	}
</style>
<script type="text/javascript">
import axios from 'axios'
import { Indicator } from 'mint-ui';
import {errorTips} from '~/plugins/filter';
export default {
	name:'jobyear',
	data(){
		return{
			options:[],
			currSecelt:'',
			userData:{},
			active:'is-active',
			isShow:false,
			iconState:{
				up:'&#xe607;',
				down:'&#xe603;'
			}
		}
	},
	mounted (){
		axios.get('/online/user/getUserData').then((response) => {
	      	if(response.data.success){
	      		this.userData=response.data.resultObject;
	      		this.options=response.data.resultObject.jobyear;
	      		for(var i=0;i<this.options.length;i++){
	      			if (this.options[i].id==response.data.resultObject.jobyearId) {
	      				this.currSecelt=this.options[i].value
	      			}
	      		}
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
		optionsShow(){
			this.isShow=this.isShow?false:true
		},
		changeJobyear(id){
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
					jobyearId:id,
					target:this.userData.target,
					province:this.userData.province,
					county:this.userData.county,
					city:this.userData.city,
					fullAddress:this.userData.fullAddress
				}
			}).then( (res) => {
				Indicator.close()
				if(res.data.success){
					for(var i=0;i<this.options.length;i++){
		      			if (id==this.options[i].id) {
		      				this.currSecelt=this.options[i].value
		      				this.isShow=false
		      			}
		      		}
		      		errorTips('修改成功~');
		      		setTimeout(function(){
		      			window.location="/personalPage/userSetting/userSetting";
		      		},2000)

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
