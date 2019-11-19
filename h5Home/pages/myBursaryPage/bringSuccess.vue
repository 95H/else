<template>
	<div class="warp2">
		<img class="successImg" src="../../static/web/images/myBursary/success.png"/>
		<p>提现申请成功</p>
		<div class="lookPresentRecord">
      <router-link :to="{path:'/myBursaryPage',query:{index:2}}"><button @click="lookPresentRecord">查看提现记录</button></router-link>
		</div>
	</div>
</template>

<script>
	import {zhugeTrack} from '~/plugins/filter';
	export default {
		name:'bringSuccess',
		head:{
			title:'奖励金提现'
		},
		mounted (){
			zhugeTrack('H5_进入提现申请成功页');
		},
		methods: {
			lookPresentRecord(){

			}
		}
	}
</script>

<style lang="less">
	@import "bringSuccess.less";
</style>
