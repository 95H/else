<template>
	<div class="projectAuditing">
		<div class="projectAuditing-content zlpg-content">
			<div class="zlpg-content-header">
				<ul class="list-group">
					<li><span>项目审核</span></li>
					<!-- <li v-for="(item,index) in routerLink" :key="index"><router-link :to="'/zlpg'+item.jump">{{item.title}}</router-link></li> -->
					<li v-for="(item,index) in shMenu" :key="index">
						<router-link :to="'/zlpg' + item.functionUrl" :class="{'is-active':$route.path.split('/')[5] === item.functionUrl.split('/')[4]}" v-if="item.functionUrl !='/project/projectCont/projectAuditing/projectExternalAudit'">{{item.functionName}}</router-link>
						<a href="javaScript:;" :class="{'is-active':$route.path.split('/')[5] === item.functionUrl.split('/')[4]}" v-if="item.functionUrl =='/project/projectCont/projectAuditing/projectExternalAudit' && $store.state.changeOnlineOffline != 2" @click="externalAudit">{{item.functionName}}</a>
					</li>
					<!-- <li><router-link to="/zlpg/project/projectCont/projectAuditing/projectExternalAudit">外审修改审核</router-link></li> -->
					<!-- <li><router-link to="/zlpg/project/projectCont/projectAuditing/projectReportAudit">报告审核</router-link></li>
                    <li><router-link to="/zlpg/project/projectCont/projectAuditing/projectChangeAudit">变更审核</router-link></li>
                    <li><router-link to="/zlpg/project/projectCont/projectAuditing/projectWorkingHourAudit">工时审核</router-link></li>
                    <li><router-link to="/zlpg/project/projectCont/projectAuditing/projectUltimateAudit">结项审核</router-link></li> -->
					<li class="fr" v-if='/projectReportAudit/g.test(this.$route.path) || /projectExternalAudit/g.test(this.$route.path)'>
            <span class="save-hook" @click="examineModification" v-if="$store.state.isSavingFlag">正在保存...</span>
						<span href="javascript:;" @click="issuedVersion" class="blue marginRight15 fs12" v-if="/externalOnLineAudit/g.test(this.$route.path)"><i class="iconfont icon-chakanqianfabanben blue fs12"></i>查看签发版本</span>
						<span class="search-btn el-button--warning" @click="openAddOpinion" v-if="(/assetBased|incomeLaw|incomeAndMarket|assessment/.test(this.$route.path)) && readonly">添加意见</span>
						<!-- <span v-if="isOnline == 0 && maxBtnShow" class="reset-btn marginRight5" @click="offLineGetValue">审核</span> -->
						<span v-if="isOnline == 1 && maxBtnShow && !/externalAuditApply/.test(this.$route.path)" class="reset-btn marginRight5" @click="showDialog('agreeReview')">审核通过</span>
						<span href="javascript:;" class="search-btn marginRight0 width70" @click="examineModification" v-if="/projectImplementation/g.test(this.$route.path)">外审修改</span>
						<span class="search-btn marginRight0" @click="spreadFullPage"><i class="iconfont icon-zhankai1"></i>展开</span>
					</li>
				</ul>
			</div>
			<div class="projectAuditing-content-content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	import Public from '../../../public.js'
	export default {
		data() {
			return {
				isOnline: 999,
				routerLink: [],
				maxBtnShow: false,
				readonly: false,
				shMenu: this.$store.state.projectMenu.child[localStorage.getItem('index')].children
			}
		},
		mounted() {
			this.$store.state.queryUserSysFunction.forEach((val, key) => {
				if(val.title == "项目") {
					val.list.forEach((item, index) => {
						if(item.title == "审核") {
							this.routerLink = item.children
						}
					})
				}
			})
			Public.$on("onlineOffline", (val) => {
				this.isOnline = val;
			})
			Public.$on("maxBtnShow", (val) => {
				this.maxBtnShow = val;
			})
			Public.$on("readonly", (val) => {
				this.readonly = val;
			})
		},
		methods: {
			// 打开添加意见弹窗
			openAddOpinion() {
				this.$store.state.openAddOpinion();
			},
			//外审修改审核线上还是线下
			externalAudit() {
				if(this.$store.state.changeOnlineOffline == 1) {
					this.$router.push({
						path: '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOnLineAudit'
					})
				} else if(this.$store.state.changeOnlineOffline == 0) {
					this.$router.push({
						path: '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOffLineAudit'
					})
				}
			},
			//外审修改线上还是线下
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
			//查看签发版本
			issuedVersion() {
				let routeData = ''
				if(this.$store.state.onlineOffline == 1) {
					routeData = this.$router.resolve({
						path: "/zlpg/project/projectCont/projectAuditing/projectIssuedVersion/IssuedOnLineVersion"
					});
				}
				window.open(routeData.href);
			},
			// 展开最大化弹窗
			spreadFullPage() {
				this.$store.state.spreadFullPage();
			},
			// 打开弹窗公共方法
			showDialog(name) {
				this.$store.state.agreeReviewFlag = !this.$store.state.agreeReviewFlag;
				this.$store.state.showDialog(name);
			},
			offLineGetValue() {
				this.$store.state.offLineGetValue();
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
	.projectAuditing {
		.projectAuditing-content {
			.list-group {
				background: #FAFAFA;
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
				li>a.is-active:after {
					bottom: 2px;
				}
				li.fr {
					margin: 0 10px 0 0;
				}
				.icon-zhankai1 {
					font-size: 12px;
					color: #B0CCF7;
					margin-right: 6px;
				}
        .save-hook {
          font-size: 13px;
          color: #98c268;
          margin-right: 30px;
        }
			}
		}
	}
</style>
