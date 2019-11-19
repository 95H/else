<template>
	<div class="warp">
		<div class="headTitle clearfix">
			<p>排名</p>
			<p>用户</p>
			<p>奖励金</p>
		</div>
		<div class="ringingWarp container">
			<div class="listWarp"  v-if="ringingList.length!=0">
				<div class="list bd1px bdB clearfix" v-for="(items,index) in ringingList" :key="index">
					<p class="ranking" v-if="index==0"><span class="top1"></span></p>
					<p class="ranking" v-if="index==1"><span class="top2"></span></p>
					<p class="ranking" v-if="index==2"><span class="top3"></span></p>
					<p class="ranking" v-if="index>2"><span>{{index+1}}</span></p>
					<p class="phoneNum" v-if="items.userMobile">{{items.userMobile}}</p>
					<p class="phoneNum" v-else>{{items.userEmail}}</p>
					<p class="amount">{{toFixed(items.totalAmount,2)}}元</p>
				</div>
			</div>
      <div class="empty" v-show="isShowEmpty">
        <emptyTemp></emptyTemp>
      </div>
		</div>
    <div class="bottom"  v-if="ringingList.length!=0">
      <em></em><span>{{myRinging}}</span><em></em>
    </div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {zhugeTrack,toFixed} from '~/plugins/filter';
	import {appBaseUrl} from '~/api/apiurl';
	export default {
		name:'myBursaryPage',
		head:{
			title:'排行榜'
		},
		data (){
			return {
			  isShowEmpty:false,
				ringingList:[],
				myRinging:'',
				toFixed:toFixed
			}
		},
		mounted (){
      zhugeTrack('H5_进入排行榜页');
			this.$indicator.open();
			//排行榜列表
			axios({
				url:appBaseUrl+'/bxg/distribution/getDistributionBonusRank',
				method:'post',
				params:{
					sign:localStorage.getItem('sign')
				}
			}).then((res) =>{
				this.$indicator.close();
				if(res.data.status==200){
					this.ringingList=res.data.result;
					if(res.data.result.length==0){
            this.isShowEmpty=true;
          }
				}else if(res.data.status==401 || res.data.errorMessage=='1001' || res.data.status==403){
					window.localStorage.setItem('redirectUrl',window.location.origin+'/myBursaryPage');
					window.location='/loginRegister/phoneLogin';
				}else{
          this.isShowEmpty=true;
					this.$toast(res.data.message);
				}
			})
			//查询当前用户排名
			axios({
				url:appBaseUrl+'/bxg/distribution/getUserBonusRank',
				method:'post',
				params:{
					sign:localStorage.getItem('sign')
				}
			}).then((res) =>{
				this.$indicator.close();
				if(res.data.status==200){
					this.myRinging=res.data.message
				}else if(res.data.status==401 || res.data.errorMessage=='1001' || res.data.status==403){
					window.localStorage.setItem('redirectUrl',window.location.origin+'/myBursaryPage');
					window.location='/loginRegister/phoneLogin';
				}else{
					this.$toast(res.data.message);
				}
			})
		}
	}
</script>
<style lang="less">
	@import "rankingList.less";
	@media screen and (max-width: 321px) {
		.headTitle p{
			&:nth-child(1){
                width: 25%;
            }
            &:nth-child(2){
                width: 35% !important;
            }
            &:nth-child(3){
                width: 40% !important;
            }
		}
        p.ranking{
           width: 25% !important;
        }
       p.amount{
           width: 40% !important;
       }
       p.phoneNum{
           width: 35% !important;
       }

	}
</style>
