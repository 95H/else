<template>
	<div class="cpr-wrapper" :class="{cprWidth:cprWidthOther,fixed:this.$store.state.isfixedFlag}">
		<div class="cpr">
			<!--top-->
			<div class="top-title">
				<el-row>
					<el-col :span="8">
						<div class="grid-content bg-purple">
							<a class="closetitle iconfont icon-shanchu" @click="close"></a>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="grid-content bg-purple-light">
							{{commonTitleOther}}
						</div>
					</el-col>
					<el-col v-if="commonBtnOther" :span="8">
						<div class="grid-content bg-purple bg-right">
							<el-button v-if="extraBtnOther" type="warning" class="saveBtn fs13 marginRight10" @click="extraParentMethod()">{{extraBtnOther}}</el-button>
							<el-button type="primary" class="saveBtn fs13" @click="parentMethod()">{{commonBtnOther}}</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="cpr-content" ref="scrollbar">
				<el-scrollbar class="el-scrollbar">
					<component ref="child" v-bind:is="componentsTypeOther"></component>
				</el-scrollbar>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import fieldinvestigationCommon from "@/components/fieldinvestigationCommon"; //新建现场调查任务
	import reportCheckNumberInfo from "@/page/reportNumber/reportCheckNumberInfo";//报告核数
	import sealInfo from "@/page/reportNumber/sealInfo"; //盖章
	export default {
		name: 'commonContentOther',
		components: {
			fieldinvestigationCommon,
			reportCheckNumberInfo,
			sealInfo
		},
		data() {
			return {

			};
		},
		mounted() {
			let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			this.$el.style.height = h - 36 + 'px';
			this.$refs.scrollbar.style.height = h - 76 + 'px';
		},
		methods: {
			close() {
				this.$store.commit('changeShowCommonOther');
			},
			extraParentMethod() {
				this.$refs.child.extraChildMethod();
			},
			parentMethod() {
				this.$refs.child.childMethod();
			}
		},
		computed: mapState([
			'commonTitleOther',
			'commonBtnOther',
			'componentsTypeOther',
			'extraBtnOther',
			'cprWidthOther'
		])
	}
</script>

<style scoped="scoped" lang="scss">
	.cpr-wrapper {
		position: absolute;
		width: 800px;
		right: 0;
		top: -10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 4px 0px rgba(203, 203, 203, 0.5);
		z-index: 1111;
		overflow: hidden;
		.cpr {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			.top-title {
				width: 100%;
				overflow: hidden;
			}
			.cpr-content {
				width: 100%;
			}
			.el-scrollbar {
				width: 100%;
				height: calc(100% + 17px);
			}
			.saveBtn {
				height: 25px;
				padding: 0 20px;
				background: rgba(58, 128, 236, 1);
				border-radius: 2px;
				line-height: 25px;
				margin-right: 20px;
				margin-left: 0;
				span {
					color: #fff;
					font-size: 13px;
				}
			}
			.closetitle {
				margin-left: 20px;
				cursor: pointer;
				color: #C0C0C0;
			}
			.closetitle:hover {
				color: #F09237;
			}
			.center-body {
				padding: 20px;
				.requiredInformation {
					width: 760px;
					min-height: 330px;
					background: rgba(255, 255, 255, 1);
					border-radius: 2px;
					border: 1px solid rgba(236, 236, 236, 1);
					border-top: 0;
					margin-bottom: 10px;
					.top {
						height: 35px;
						background: #fafafa;
						border-radius: 2px 2px 0px 0px;
						border: 1px solid rgba(236, 236, 236, 1);
						border-left: 0;
						border-right: 0;
						line-height: 35px;
						img {
							display: inline-block;
							margin-left: 20px;
						}
						span {
							display: inline-block;
							margin-left: 10px;
							font-size: 13px;
							font-weight: 600;
						}
					}
				}
				.optionalmsg {
					width: 760px;
					min-height: 1080px;
					background: rgba(255, 255, 255, 1);
					border-radius: 2px;
					border: 1px solid rgba(236, 236, 236, 1);
					border-top: 0;
					margin-bottom: 10px;
					.top {
						height: 35px;
						background: #fafafa;
						border-radius: 2px 2px 0px 0px;
						border: 1px solid rgba(236, 236, 236, 1);
						border-left: 0;
						border-right: 0;
						line-height: 35px;
						img {
							display: inline-block;
							width: 12px;
							height: 12px;
							margin-left: 20px;
						}
						span {
							display: inline-block;
							margin-left: 10px;
							font-size: 13px;
							font-weight: 600;
						}
					}
				}
				.cpr-input {
					top: 1px;
					right: 10px;
				}
				.content {
					width: 711px;
					min-height: 125px;
					background: rgba(249, 249, 249, 1);
					margin-left: 24px;
					margin-bottom: 15px;
					padding-top: 15px;
					label {
						width: 105px;
						font-size: 13px;
					}
					.el-input,
					.el-select {
						width: 150px;
					}
					li:first-child {
						margin-left: 55px;
						.el-input {
							width: 578px;
						}
					}
					a {
						float: right;
						margin-right: 10px;
						margin-top: -34px;
						i {
							color: #ccc;
						}
					}
				}
				.add {
					cursor: pointer;
					clear: both;
					width: 62px;
					height: 25px;
					line-height: 25px;
					text-align: center;
					font-size: 13px;
					color: rgba(58, 128, 236, 1);
					border-radius: 2px;
					border: 1px solid rgba(58, 128, 236, 1);
					margin-left: 24px;
				}
				.title {
					font-size: 13px;
					font-weight: 600;
					color: rgba(38, 38, 40, 1);
					margin-left: 24px;
				}
			}
			.el-form-item--mini.el-form-item,
			.el-form-item--small.el-form-item {
				line-height: 28px;
				width: 345px;
			}
			.el-form-item--mini.el-form-item:nth-child(28) {
				width: auto;
			}
			.el-input,
			.el-select {
				width: 240px;
				font-size: 13px;
			}
			.el-form-item--mini.el-form-item,
			.el-form-item--small.el-form-item {
				margin-bottom: -6px;
				margin-top: 10px;
			}
			.el-radio+.el-radio {
				margin-left: 13px;
			}
		}
		.el-row {
			height: 40px;
			background: rgba(246, 250, 255, 1);
			border: 1px solid rgba(229, 229, 229, 1);
			&:last-child {
				margin-bottom: 0;
			}
		}
		.bg-purple-light {
			font-size: 14px;
			font-weight: 600;
			color: rgba(38, 38, 40, 1);
			text-align: center;
		}
		.bg-right {
			text-align: right;
		}
		.grid-content {
			height: 40px;
			line-height: 40px;
		}
		.row-bg {
			padding: 10px 0;
		}
	}
	.cprWidth {
		width: 1030px;
	}
	.fixed{
		  position: fixed;
    	top: 34px;
    	right: 10px;
	}
</style>