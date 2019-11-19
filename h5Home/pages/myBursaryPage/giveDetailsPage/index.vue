<template>
	<div class="warp">
		<div class="top">
			<div class="applicationNum cl bdB bd1px">
				<p>申请单号：{{detailData.withdrawalSerialNo}}</p>
				<p v-if="detailData.status==0">申请中</p>
				<p v-if="detailData.status==1">已审核</p>
				<p v-if="detailData.status==2" class="errortxt">提现失败</p>
				<p v-if="detailData.status==3">已到账</p>
			</div>
			<div class="bt_list">
				<div class="applicationInfo cl">
					<p>申请提现金额</p>
					<p>{{detailData.amount}}元</p>
				</div>
				<div class="applicationInfo cl">
					<p>应付税金</p>
					<p>{{detailData.taxAmount}}元</p>
				</div>
				<div class="applicationInfo cl">
					<p>可到账金额</p>
					<p>{{detailData.actualAmount}}元</p>
				</div>
			</div>
		</div>
		<div class="center">
			<div class="progress_warp" v-for="(items,index) in detailData.withDrawFlow">
				<div class="present_progress progress_success" v-if="items.step==1">
					<span class="success">●</span>
					<p class="title">提交申请</p>
					<p class="data">{{items.stepTime}}</p>
				</div>
				<div class="present_progress progress_success" v-if="items.step==2">
					<span class="success">●</span>
					<p class="title">审核通过</p>
					<p class="data">{{items.stepTime}}</p>
				</div>
				<div class="present_progress progress_success stepThird" v-if="items.step==3">
					<span class="success">●</span>
					<p class="title">到账</p>
					<p class="data">{{items.stepTime}}</p>
				</div>
				<div class="present_progress progress_success stepThird" v-if="items.step==4">
					<span class="success">●</span>
					<p class="title errortxt">提现失败<span @click="getFaidReason(items.errorCode)"></span></p>
					<p class="dec">{{detailData.amount}}元已经退回到奖励金账户余额</p>
					<p class="data">{{items.stepTime}}</p>
				</div>
			</div>
			<div class="progress_warp" v-if="detailData.withDrawFlow.length==1">
				<div class="present_progress progress_load">
					<span class="success">●</span>
					<p class="title">审核通过</p>
				</div>
				<div class="present_progress progress_load stepThird">
					<span class="success">●</span>
					<p class="title">到账</p>
				</div>
			</div>
			<div class="progress_warp" v-if="detailData.withDrawFlow.length==2">
				<div class="present_progress progress_load stepThird">
					<span class="success">●</span>
					<p class="title">到账</p>
				</div>
			</div>
		</div>
		<div class="bottom_btn" v-if="detailData.status==2" @click="reapplyBtn">重新申请</div>
		<confirmDia
			:dialogVisible="dialogVisible"
			:title="titleTxt"
			:content="boxHtmls"
			v-on:closeDialog="closeDialog"></confirmDia>
		<comDialog
			:dialogVisible="dialogVisible2"
			title="重新申请"
			:contentGery="boxHtmls2"
			v-on:saveWithdraw="makeSure"
			v-on:closeDialog="closeDialog2"></comDialog>
	</div>
</template>

<script>
	import axios from 'axios';
	import {appBaseUrl} from '~/api/apiurl';
	import {errorTips,zhugeTrack,toFixed} from '~/plugins/filter'
	import confirmDia from '../comTemp/confirmDia'
	import comDialog from '../comTemp/comDialog'
	export default {
		name:'giveDetails',
		head:{
			title:'提现记录详情'
		},
		data (){
			return {
				detailData:{
					withDrawFlow:[],
					amount:'',
					taxAmount:'',
					actualAmount:''
				},
				dialogVisible:false,
				dialogVisible2:false,
				titleTxt:'',
				boxHtmls:'',
				boxHtmls2:''
			}
		},
		components:{
			confirmDia,
			comDialog
		},
		beforeMount (){
			this.$indicator.open()
		},
		mounted (){
			axios({
				url:appBaseUrl+'/bxg/distribution/getWithdrawDetail',
				method:'post',
				params:{
					id:this.$route.query.id,
					sign:localStorage.getItem('sign')
				}
			}).then((res) =>{
				if(res.data.status==200){
					this.detailData=res.data.result;
					this.detailData.amount=toFixed(res.data.result.amount,2)
					this.detailData.taxAmount=toFixed(res.data.result.taxAmount,2)
					this.detailData.actualAmount=toFixed(res.data.result.actualAmount,2)
					let stu='';
					switch (this.detailData.status){
						case 0:
							stu='申请中'
							break;
						case 1:
							stu='已审核'
							break;
						case 2:
							stu='提现失败'
							break
						case 3:
							stu='已到账';
							break;
					}
					zhugeTrack('H5_进入提现记录详情页',{
						'提现申请单号':this.detailData.withdrawalSerialNo,
						'申请状态':stu,
						'提现金额':this.detailData.amount
					})
				}else if(res.data.status==401 || res.data.errorMessage=='1001' || res.data.status==403){
					window.localStorage.setItem('redirectUrl',window.location.href);
					window.location='/loginRegister/phoneLogin';
				}else if(res.data.status==400){
					window.location.href='/myBursaryPage'
				}
				this.$indicator.close()
			})
		},
		methods:{
			getFaidReason (code){
				switch (code){
					case 'V2_ACCOUNT_SIMPLE_BAN': //微信未绑卡
						this.titleTxt='微信未实名';
						this.boxHtmls='将账户绑定的微信完成实名(绑定银行卡)'
						this.dialogVisible=true;
						break;
					case 'NAME_MISMATCH': //姓名不一致
						this.titleTxt='姓名不一致';
						this.boxHtmls='请确认实名认证姓名与绑定微信实名姓名（银行卡账户）一致'
						this.dialogVisible=true;
						break;

				}
				zhugeTrack('H5_点击失败原因',{
					'失败原因':this.titleTxt
				})
			},
			reapplyBtn (){
				var code='';
				let stu=""
				this.detailData.withDrawFlow.forEach((value,index,arry) =>{
					if(arry[index].step==4){
						code=arry[index].errorCode
					}
				})
				switch (code){
					case 'V2_ACCOUNT_SIMPLE_BAN': //微信未绑卡
						this.boxHtmls2='请确认绑定微信已完成实名（绑定银行卡）'
						stu="微信未实名"
						this.dialogVisible2=true;
						break;
					case 'NAME_MISMATCH': //姓名不一致
						this.boxHtmls2='请确认实名认证信息与绑定微信一致'
						stu="姓名不一致"
						this.dialogVisible2=true;
						break;
				}
				zhugeTrack('H5_点击重新申请',{
					'失败原因':stu
				})
			},
			closeDialog (val){
				this.dialogVisible=val
			},
			closeDialog2 (val){
				this.dialogVisible2=val
			},
			makeSure (){
				window.location.href='/myBursaryPage/drawCashPage'
			}
		}

	}
</script>

<style lang="less">
	@import "giveDetail.less";
</style>
