<template>
	<div class="dead-list-contnet">
		<div class="dead-list-contnet-header text-right">
			<slot name="btn"></slot>
			共计{{totalDataNum}}个{{type}}
		</div>
		<div class="dead-list-con" v-for="(item,index) in messageToDeal" :key="index" v-if="messageToDeal.length"
         @click="routerLink(item)" :class="{forbidSkip :item.flag == 2}">
			<div class="dead-list-header">
				<div class="dead-list-header-left fl textOverflow1" v-if="item.flag == 1">
					<div class="dead-list-header-title textOverflow1 fl" :title="item.projectName">{{ item.projectName }}</div>
					<div class="dead-list-header-user-name textOverflow1 fl" :title="item.leaderName"><i class="iconfont icon-renyuan"></i>{{ item.leaderUserName }}</div>
				</div>
        <div class="dead-list-header-left fl textOverflow1" v-if="item.flag == 2">
          <div class="dead-list-header-title textOverflow1 fl" :title="item.projectName">授权通知</div>
        </div>
				<div class="fr project-nature" v-if="item.flag == 1">
					<span>{{ commonData.projectNatureId[item.projectNatureId]?commonData.projectNatureId[item.projectNatureId].slice(0,commonData.projectNatureId[item.projectNatureId].length-2):'' }}</span>
					<span>{{ commonData.projectLevelId[item.projectLevelId] }}级</span>
					<span>{{ commonData.assessmentTarget[item.assessmentTarget]?commonData.assessmentTarget[item.assessmentTarget].slice(0,commonData.assessmentTarget[item.assessmentTarget].length-2):'' }}</span>
					<span>{{ item.isListedCompany==1?"上市":"非上市" }}</span>
				</div>
			</div>
			<div class="dead-list-main">
				<ul class="project-info">
					<li class="shallow width230 textOverflow1" :title="item.userName"><span class="circular"></span>{{item.flag == 1 ? '发起人：' : '授权人：'}}<span class="deep">{{ item.userName }}</span></li>
					<li class="shallow width320">{{item.flag == 1 ? '提交时间：' : '授权时间：'}}<span class="deep">{{ item.createTime }}</span></li>
					<li class="shallow width330">{{ commonData.typeId[item.dataType] }}</li>
				</ul>
				<div class="project-abstract shallow textOverflow1" :title="item.content"><span class="circular"></span>
					<span class="deep">{{ item.content }}</span>
				</div>
				<!--可以使用卡槽的办法-->
				<span class="delete underlineCommon" v-if='/haveDealt/.test($route.path)' v-on:click.stop="deleteItem(item)">
          <i class="el-icon-delete"></i>
          删除
        </span>
			</div>
		</div>
		<div class="noData" v-if="!messageToDeal.length">暂无数据</div>
	</div>
</template>

<script>
	export default {
		name: 'dealtList',

		data() {
			return {
				commonData: window.commonData
			}
		},

		methods: {
			routerLink(data) {
        if(!data.projectId) return;
				this.$store.state.projectId = data.projectId;
				this.$setCookie('projectId', data.projectId, 24 * 60 * 60);
				this.$router.push({
					path: data.linkUrl
				}); 
			},

			deleteItem(item) {
				let _this = this;
				let data = {
					ids: item.messagetoreadId
				}
				_this.$confirm('您是否确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http.post('api/message/setIsRead', data)
						.then(res => {
							_this.$parent.searchList(); //  调用父组件方法
							_this.$messageSuccess('删除成功！')
						})
						.catch(err => {
							_this.$messageError(err)
						})
				}).catch(() => {
					_this.$messageSuccess('已取消删除');
				})

			}
		},

		props: {
			messageToDeal: Array,
			totalDataNum: Number,
			type: String,
			btn: String
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.dead-list-contnet {
		padding-bottom: 15px;
		.dead-list-contnet-header {
			height: 35px;
			line-height: 35px;
			color: #262628;
			border-bottom: 1px solid #ECECEC;
			background: #F9F9F9;
			padding-right: 20px;
			margin-bottom: 21px;
			font-size: 13px;
		}
		.dead-list-con {
			margin: 12px 20px;
			border: 1px solid #E5E5E5;
      cursor: pointer;
			.dead-list-header {
				height: 40px;
				background: #F6FAFF;
				border-bottom: 1px solid #E5E5E5;
				.dead-list-header-left {
					width: 720px;
					height: 40px;
					line-height: 40px;
					.dead-list-header-title {
						max-width: 530px;
						height: 40px;
						line-height: 40px;
						margin: 0 20px;
						font-size: 16px
					}
					.dead-list-header-user-name {
						width: 150px;
						height: 40px;
						line-height: 40px;
						color: #636363;
						font-size: 13px;
						.icon-renyuan {
							color: #CCCCCC;
							font-size: 13px;
							margin-right: 8px;
						}
					}
				}
				.project-nature {
					padding-right: 10px;
					span {
						height: 24px;
						padding: 0 10px;
						line-height: 24px;
						text-align: center;
						color: #98C268;
						background: #F1F8E8;
						border: 1px solid #C8DEAF;
						border-radius: 2px;
						float: left;
						margin: 7px 5px;
						font-size: 12px;
					}
					:nth-child(2) {
						color: #F09237;
						background: #FFF2E5;
						border: 1px solid #FFC68F;
					}
					:nth-child(3) {
						color: #7C9FEE;
						background: #E9F0FF;
						border: 1px solid #BBD0FF;
					}
					:nth-child(4) {
						color: #50ADEE;
						background: #E6F5FF;
						border: 1px solid #9BD6FF;
					}
				}
			}
			.dead-list-main {
				padding: 20px;
				font-size: 13px;
				.project-info {
					overflow: hidden;
					li {
						float: left;
						line-height: 38px;
						.circular {
							width: 6px;
							height: 6px;
							float: left;
							margin: 16px 8px 16px 0;
							background: #F09237;
							border-radius: 100%;
						}
					}
					.width230 {
						width: 230px;
					}
					.width320 {
						width: 320px;
						text-align: center;
					}
					.width320:before {
						content: '';
						width: 2px;
						height: 12px;
						border-right: 2px solid #ECECEC;
						float: left;
						margin-top: 13px;
					}
					.width320:after {
						content: '';
						width: 2px;
						height: 12px;
						border-right: 2px solid #ECECEC;
						float: right;
						margin-top: 13px;
					}
					.width330 {
						width: 330px;
						padding-left: 60px;
					}
				}
				.project-abstract {
					line-height: 38px;
					.circular {
						width: 6px;
						height: 6px;
						float: left;
						margin: 16px 8px 16px 0;
						background: #57BFB2;
						border-radius: 100%;
					}
				}
				.shallow {
					color: #505050;
				}
				.deep {
					color: #1D1C1E;
				}
				.delete {
					color: #f7b543;
					float: right;
					cursor: pointer;
					margin-top: -10px;
					.el-icon-delete {
						color: #f7b543
					}
				}
			}
		}
    .forbidSkip{
      cursor: not-allowed;
    }
		.dead-list-con:hover {
			border: 1px solid #B9E1FC;
		}
	}
</style>
