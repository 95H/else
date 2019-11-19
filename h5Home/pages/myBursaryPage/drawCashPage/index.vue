<template>
	<div class="warp">
		<div class="headWrp">
			<p class="title">提现金额</p>
			<div class="inpWarp">
				<label>￥</label>
				<input type="num" v-model="inpText" v-if="btnActive"/>
				<input type="num" v-model="inpText" disabled v-else/>
			</div>
			<p class="amount" v-if="errorStatus==0">奖励金余额<span>￥{{amount}}</span></p>
			<p class="amount errorTxt" v-if="errorStatus==1">{{errorText}}</p>
			<p class="amount rightTxt" v-if="errorStatus==2">可到账<i>￥{{actualAmount}}</i>(税后)</p>
			<div class="btnWarp">
				<button class="makeBtn" v-bind:class="{ active: isActive }" @click="showDialog">提现至微信余额</button>
			</div>
		</div>
		<div class="contentWarp">
			<h3>提现说明</h3>
			<ul class="ruleList">
				<li class="cl"><span>1.</span><p>单次提现金额需大于10元</p></li>
				<li class="cl"><span>2.</span><p>每个自然月仅可申请提现1次，次月15日前可到账</p></li>
				<li class="cl"><span>3.</span><p>单次提现金额超过800元，需要扣除个人所得税，扣税计算公式如下</p></li>
			</ul>
			<div class="formula">
				<div class="formula_list">
					<p><span>•</span><span>800＜提现金额≤4000，</span></p>
					<p>税金=（提现金额-800）*20%</p>
				</div>
				<div class="formula_list">
					<p><span>•</span><span>4000＜提现金额≤20000，</span></p>
					<p>税金=提现金额*80%*20%</p>
				</div>
				<div class="formula_list">
					<p><span>•</span><span>20000＜提现金额≤50000，</span></p>
					<p>税金=提现金额*80%*30%-2000</p>
				</div>
				<div class="formula_list">
					<p><span>•</span><span>50000＜提现金额，</span></p>
					<p>税金=提现金额*80%*40%-7000</p>
				</div>
			</div>
			<p class="qqNum">4. 如有其它疑问，可联系QQ：2885627736</p>
		</div>
		<!--微信绑定弹窗-->
		<wxBind
			:isActive="diaShow"
			v-on:closeLayer="closeDia"></wxBind>
		<comDialog
			:dialogVisible="dialogVisible"
			:title="titleTxt"
			:contentGery="boxHtmls"
			v-on:saveWithdraw="saveWithdraw"
			v-on:closeDialog="closeDialog"></comDialog>
	</div>
</template>

<script>
	import {isInteger,errorTips,toFixed,zhugeTrack} from '~/plugins/filter';
	import axios from 'axios';
	import {appBaseUrl} from '~/api/apiurl';
	import wxBind from '../comTemp/wxBind';
	import comDialog from '../comTemp/comDialog'
	export default {
		name:'drawCashPage',
		head :{
			title:'奖励金提现'
		},
		data (){
			return{
				inpText:'',
				amount:'',
				isActive:false,
				diaShow:false,
				errorStatus:0,
				errorText:'',
				actualAmount:'',
				boxHtmls:'',
				actualAmount:'',
				boxTitle:'',
				dialogVisible:false,
				titleTxt:'',
				btnActive:true
			}
		},
		components:{
			wxBind,
			comDialog
		},
		watch:{
			inpText:{
				handler:function(){
					if(this.btnActive){
						let _this=this;
						if(!isInteger(this.inpText)){
							this.errorText='输入金额必须是整数';
							this.errorStatus=1
							this.isActive=false
						}else if(this.inpText>0 && this.inpText<=parseInt(this.amount)){
							//符合提现金额要求
							if(this.inpText<10){
								this.errorText='单次提现金额需满￥10';
								this.errorStatus=1
								this.isActive=false
							}else{
								if(this.inpText>800 && this.inpText<=4000){
									this.actualAmount=toFixed(this.inpText-(this.inpText-800)*0.2,2)
								}else if(this.inpText>4000 && this.inpText<=20000){
									this.actualAmount=toFixed(this.inpText-(this.inpText*0.8*0.2),2)
								}else if(this.inpText>20000 && this.inpText<=50000){
									this.actualAmount=toFixed(this.inpText-(this.inpText*0.8*0.3-2000),2)
								}else if(this.inpText>50000){
									this.actualAmount=toFixed(this.inpText-(this.inpText*0.8*0.4-7000),2)
								}else{
									this.actualAmount=toFixed(parseInt(this.inpText),2)
								}
								this.isActive=true
								this.errorStatus=2
								this.boxHtmls='（实际可到账'+this.actualAmount+'元）';
								this.titleTxt='确认提现'+toFixed(parseInt(this.inpText),2)+'元？';
							}

						}else if(this.inpText>parseInt(this.amount)){
							this.errorText='输入金额超过奖励金余额';
							this.errorStatus=1
							this.isActive=false
						}else{
							this.errorStatus=0
							this.isActive=false
						}
					}
				}
			}
		},
		mounted (){
			zhugeTrack('H5_进入奖励金提现页');
			this.$indicator.open()
			axios({
				url:appBaseUrl+'/bxg/distribution/getUserDistributionAccount',
				method:'post',
				params:{
					sign:localStorage.getItem('sign')
				}
			}).then((response) => {
				this.$indicator.close()
		      	if(response.data.status==200){
		      		this.amount=toFixed(response.data.result.balanceAmount,2);
		      	}else if(response.data.status==401 || response.data.errorMessage=='1001' || res.data.status==403){
		      		window.location='/loginRegister/phoneLogin';
			        window.localStorage.setItem('redirectUrl',window.location.href);
		      	}else{
		      		errorTips(response.data.message)
		      	}
		    }, (err) => {
		    	this.$indicator.close()
	     	})
			//查询当月是否有过提现
			axios({
				url:appBaseUrl+'/bxg/distribution/checkUserWhetherCanWithdraw',
				method:'post',
				params:{
					sign:localStorage.getItem('sign')
				}
			}).then((res) =>{
				if(res.data.status==200){
					switch (res.data.result){
						case '5':
							this.errorText='本月已申请提现,请下月申请';
							this.errorStatus=1;
							this.isActive=false;
							this.btnActive=false
							break;
						default:
							this.isActive=false
							this.errorStatus=0;
							this.btnActive=true;
					}
				}
			})
		},
		methods:{
			showDialog (){
				var _this=this
				this.dialogVisible=true;
			},
			saveWithdraw (){
				var _this=this;
				_this.$indicator.open();
				this.dialogVisible=false;
				zhugeTrack('H5_点击提现至微信');
				axios({
					url:appBaseUrl+'/bxg/distribution/saveWithdraw',
					method:'post',
					params:{
						withDrawAmount:parseInt(_this.inpText),
						sign:localStorage.getItem('sign')
					}
				}).then((res) =>{
					_this.$indicator.close();
					if(res.data.status==200){
						switch (res.data.result) {
							case '1':
								//发起成功
								window.location='/myBursaryPage/bringSuccess';
								break;
							case '2':
								//未实名认证
								this.$messagebox.confirm('',{
									message:'请完成实名认证',
									title:'',
									confirmButtonText:'去认证',
									showCancelButton:true
								}).then(() =>{
									//跳转到认证页
									window.localStorage.setItem('redirectUrl',window.location.href)
									window.location='/personalPage/userSetting/realNameAuth?realNameStatus=1'
								}).catch( () =>{

								})
								break;
							case '1':
								//未绑定微信
								this.diaShow=true;
								break;
							case '4':
								//余额不足
								this.errorText='账户余额不足';
								this.errorStatus=1;
								this.isActive=false;
								break;
							case '5':
								this.errorText='本月已申请提现,请下月申请';
								this.errorStatus=1;
								this.isActive=false;
						}
					}else if(res.data.status==401 || res.data.errorMessage=='1001' || res.data.status==403){
						window.location='/loginRegister/phoneLogin';
			       	 	window.localStorage.setItem('redirectUrl',window.location.href);
					}else{
						errorTips(res.data.message)
					}
				}).catch((res)=>{
					_this.$indicator.close();
					errorTips('网络连接错误,请稍后重试~')
				})
			},
			closeDia (val){
				this.diaShow=val
			},
			closeDialog (val){
				this.dialogVisible=val
			}
		}
	}
</script>

<style lang="less">
	@import url("drawCash.less");
	.mint-msgbox{
		.mint-msgbox-title{
			font-weight:normal;
			font-size:unit(36/@u,@uu);
			color: #000;
		}
		.boxContent{
			font-size: unit(26/@u,@uu);
			color:@primaryColor;
		}
	}
</style>
