<template>
	<div class="projectImplementation zlpg-content">
		<div class="projectImplementation-header zlpg-content-header">
			<ul class="list-group">
				<li><span>项目实施</span></li>
				<li v-for="(item,index) in zyMenu" :key="index">
					<router-link tag="button" :to="'/zlpg' + item.functionUrl" :disabled="isOnlineBtn==index" :class="{'is-active':$route.path.split('/')[5] === item.functionUrl.split('/')[4]}">{{item.functionName}}</router-link>
				</li>
				<!-- <li>
					<router-link tag="button" to="/zlpg/project/projectCont/projectImplementation/projectOnlineTask" :disabled="isOnlineBtn==0">协同作业</router-link>
				</li> -->
				<li class="fr button-group-hook">
          			<span  class="save-hook" @click="examineModification" v-if="$store.state.isSavingFlag">正在保存...</span>
					<span class="search-btn marginRight0" v-if="/assetBased/.test(this.$route.path)&&showCaseExit" @click="searchCase">{{$store.state.caseTxt}}</span>
					<span class="search-btn marginRight0 width70" @click="examineModification" v-if="isModifyData">外审修改</span>
          			<span class="search-btn marginRight0" @click="showQuickPrice" v-if="$store.state.isShowQuickPrice&&/assetBased/.test(this.$route.path)&&$store.state.isProjectLeader">快捷作价</span>
					<span class="search-btn marginRight0" @click="spreadFullPage"><i class="iconfont icon-zhankai1"></i>展开</span>
				</li>
			</ul>
		</div>
		<div class="projectImplementation-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import Public from '../../../public.js'
	export default {
		data() {
			return {
				isOnlineBtn: 999,
				isModifyData: false,
				zyMenu: this.$store.state.projectMenu.child[localStorage.getItem('index')].children
			}
		},
		// created(){
		// var _this = this,
		//     postUrl = "/api/investors/";
		// if(/projectReportAudit/g.test(this.$route.path)){
		//     postUrl += "getExamineInvestorTree";
		// }else{
		//     postUrl += "getInvestorTree";
		// }
		// _this.$http.post(postUrl,{
		//     projectId : _this.$store.state.projectId
		// }).then(function(res){
		//     _this.isOnlineBtn = res.data.onlineOffline;
		// }).catch(function(error){
		//     _this.$messageError(error);
		// })
		// },
		mounted() {
			let _this = this;
			Public.$on("onlineOffline", function(data) {
				_this.isOnlineBtn = data;
			})
			Public.$on("isModifyDataBtn", function(data) {
				_this.isModifyData = data;
			})
		},
		computed:{
			showCaseExit(){
				var flag =  false;
				this.$store.state.assetBasedSheetName=="房屋建筑物"?flag = true:flag=false;
				return flag;
			}
		},
		methods: {
			// 展开最大化弹窗
			spreadFullPage() {
				this.$store.state.spreadFullPage();
			},
			examineModification() {
				let routeData = ''
				if(/projectUnderLineTask/g.test(this.$route.path)) {
					routeData = this.$router.resolve({
						path: "/zlpg/project/projectCont/examineModification/externalOffLineTask"
					});
				} else {
					routeData = this.$router.resolve({
						path: "/zlpg/project/projectCont/examineModification/externalOnLineTask"
					});
				}

				window.open(routeData.href);
			},
			showQuickPrice(){
				 this.$store.state.showQuickPrice();
			},
			//只看案例
			searchCase(){
				if(this.$store.state.isSavingFlag) return
				this.$store.state.searchCase();

			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.projectImplementation {
		.projectImplementation-header {
			.list-group {
				background-color: #FAFAFA;
				li {
					margin-left: 20px;
				}
				li:first-child>span {
					position: relative;
				}
				li:first-child>span:after {
					content: "";
					position: absolute;
					right: -14px;
					top: -1px;
					height: 20px;
					width: 2px;
					background: #C8C8C8;
				}
				li:nth-child(2) {
					margin-left: 30px;
				}
				li>button {
					background-color: #fafafa;
					border: none;
					outline: none;
					cursor: pointer;
					&:hover {
						color: #3A80EC;
					}
				}
				li>button.is-active {
					font-weight: normal;
					position: relative;
					line-height: 30px;
					font-weight: bold;
					color: #3A80EC;
					font-size: 13px;
					&:after {
						content: "";
						left: 0;
						position: absolute;
						bottom: 0px;
						width: 100%;
						height: 2px;
						background: #145FD2;
					}
				}
				li>button:disabled {
					cursor: not-allowed;
				}
				li.fr {
					margin: 0 10px 0 0;
				}
        li.button-group-hook{position: relative;}
        .save-hook {
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          color: #98c268;
          margin-right: 30px;
        }
			}
			.icon-zhankai1 {
				font-size: 12px;
				color: #B0CCF7;
				margin-right: 6px;
			}
		}
	}
</style>
