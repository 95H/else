<template>
	<div class="center-body">
		<!-- 我的审核 begin -->
		<div class="requiredInformation">
			<!-- 头部导航 begin -->
			<ul class="newSpotItem">
			  <li v-for="(item,index) in tabs" :key="index" :class="{active:index == num}" @click="tabItem(num,index,item.id)">
					{{item.name}}
				</li>
			</ul>
			<!-- 跳转到对应页面 begin -->
			<component v-if='show' ref="child" v-bind:is="componentsType" @isJszxzr="isJszxzr"></component>
		</div>
		<!-- 我的审核 end -->
	</div>
</template>

<script>
	import reportMyAudit from "./reportMyAudit.vue";      //现在的我的审核
	import reportSubord from "./reportSubord.vue";      //下属审核
	export default {
		name: 'reportExamineDetails',
		components: {
	    reportMyAudit
      ,reportSubord
	  },
		data() {
			return {
				num: 0,
				show: true,
				form: {},
				newSpotTaskData: '',
				newProjectNum: '',
				newProjectUser: '',
	      tabs: [
	        { name: "我的审核",id:"reportMyAudit"},
	        /*{ name: "下属审核",id:"reportSubord"}*/
	      ],
	      componentsType: "reportMyAudit"
			};
		},
		created(){
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
				this.componentsType = searchCondition.type;
				this.num = searchCondition.index;
			}
		},
    methods:{
      // 下属审核
      isJszxzr(val){
        let obj = { name: "下属审核",id:"reportSubord"}
        for (let i =0;i<this.tabs.length;i++) {
          if(this.tabs.length<2&&obj.name != this.tabs[0].name) {
            this.tabs.push({ name: "下属审核",id:"reportSubord"})
          }
        }

      },
    	tabItem(num, index, val) {
    		this.componentsType = val;
	      this.num = index;
	      this.$delCookie("searchCondition");
	      this.$emit("tabItem", index);
	    }
		}
	}
</script>

<style scoped="scoped" lang="scss">
.center-body {
	.requiredInformation {
		border-radius: 2px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-top: 0;
		margin-bottom: 10px;
		.junctions-Info{
			padding: 27px 40px;
			.el-row{
				padding-bottom: 18px;
			}
			.el-row:last-child{
				padding-bottom: 0;
			}
			.grid-content{
				p{
					font-size:13px;
					color: #505050;
					span{
						color: #1D1C1E;
					}
					.blue{
						color: #2E68E7;
					}
				}
				p:first-child{
					float:left;
				}
			}
		}
		.newSpotItem {
			margin-top: 10px;
			background: rgba(255, 255, 255, 1);
			font-size: 0;
			border-bottom: solid 1px #ECECEC;
			height: 35px;
			li{
				display: inline-block;
				font-size:13px;
				color: #262628;
				margin-left: 20px;
				line-height: 35px;
				cursor: pointer;
			}
			li.active {
	      border-bottom: solid 6px #145FD2;
	      color: #145FD2;
	    }
		}
	}
}


</style>

