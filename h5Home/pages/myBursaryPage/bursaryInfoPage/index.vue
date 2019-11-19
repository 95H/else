<template>
	<div class="warp">
		<div class="amount_warp bdB bd1px">
			<p class="title">赚取奖励金</p>
			<p class="amount"><i>{{bonusAmount}}</i><span>元</span></p>
		</div>
		<div class="amount_info">
			<div class="list_warp cl">
				<p>订单号</p>
				<p>{{infoData.orderId}}</p>
			</div>
			<div class="list_warp cl">
				<p>课程名称</p>
				<p>{{infoData.courseName}}</p>
			</div>
			<div class="list_warp cl">
				<p>购买者</p>
				<p>{{infoData.buyerName}}
					<span v-if="infoData.buyerMobile">{{infoData.buyerMobile}}</span>
					<span v-else>{{infoData.buyerEmail}}</span>
				</p>
			</div>
			<div class="list_warp cl">
				<p>支付时间</p>
				<p>{{infoData.createTime}}</p>
			</div>
			<div class="list_warp cl">
				<p>实际支付</p>
				<p>{{infoData.orderAmount}}元</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {appBaseUrl} from '~/api/apiurl';
	import {errorTips,zhugeTrack,toFixed} from '~/plugins/filter'
	export default {
		name:'bursaryInfo',
		head:{
			title:'奖励金详情'
		},
		data (){
			return {
				infoData:{},
				bonusAmount:''
			}
		},
		mounted (){

			this.$indicator.open();
			axios({
				url:appBaseUrl+'/bxg/distribution/getUserBonusRecordDetail',
				method:'post',
				params:{
					distributionOrderId:this.$route.query.orderId,
					sign:localStorage.getItem('sign')
				}
			}).then((res) =>{
				this.$indicator.close();
				if(res.data.status==200){
					this.infoData =res.data.result;
					this.bonusAmount=toFixed(res.data.result.bonusAmount,2)
					zhugeTrack('H5_进入奖励金详情页',{
						'订单号':res.data.result.orderId,
						'课程名称':res.data.result.courseName,
						'课程id':res.data.result.courseId,
						'奖励金金额':res.data.result.bonusAmount
					})
				}else if(res.data.status==400){
					window.location='/';
				}else if(res.data.status==401 || res.data.errorMessage=='1001' || res.data.status==403){
					window.localStorage.setItem('redirectUrl',window.location.href);
					window.location='/loginRegister/phoneLogin';
				}else {
					errorTips(res.data.message)
				}
			}).catch((res) =>{
				this.$indicator.close();
				errorTips('网络连接错误,请稍后重试~')
			})
		}
	}
</script>

<style lang="less">
	@import 'bursaryInfo.less';
</style>
