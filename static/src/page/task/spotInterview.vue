<template>
	<div class="spotInterview">
		<!-- 现场访谈 -->
		<!--任务信息 begin-->
		<div class="spotInterview-info">
			<div class="top">
				<i class="iconfont icon-renwuxiangqing"></i>
				<span>任务信息</span>
			</div>
			<div class="spotshowInfo">
				<el-row>
					<el-col :span="12">
						<div class="grid-content">
							<p>
								项目名称：
								<span>{{ spotshowInfo.projectName }}</span>
							</p>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content">
							<p>
								项目编号：
								<span>{{ spotshowInfo.projectNumber }}</span>
							</p>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="grid-content">
							<p>
								企业名称：
								<span>{{ spotshowInfo.name }}</span>
							</p>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="grid-content">
							<p>
								企业地址：
								<span>{{ spotshowInfo.address }}</span>
							</p>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="grid-content">
							<p>
								联系人：
								<span>{{ spotshowInfo.contactName }}</span>
							</p>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content">
							<p>
								联系电话：
								<span>{{ spotshowInfo.contactMobile }}</span>
							</p>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="grid-content">
							<p>
								任务负责人：
								<span>{{ spotshowInfo.headUserName }}</span>
							</p>
						</div>
					</el-col>
					<el-col :span="11">
						<div class="grid-content">
							<p>
								任务类型：
								<span>访谈任务</span>
							</p>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="grid-content">
							<p>
								任务状态：
								<span>{{ commonData.taskStatusId[spotshowInfo.taskStatus] }}</span>
							</p>
						</div>
					</el-col>
					<!--<el-col :span="11">-->
						<!--<div class="grid-content">-->
							<!--<p>-->
								<!--<el-radio v-model="interviewRadio" disabled label="2">异常标记</el-radio>-->
							<!--</p>-->
						<!--</div>-->
					<!--</el-col>-->
				</el-row>
				<el-row>
					<el-col :span="24">
						<div class="grid-content">
							<p>
								任务总结：
								<span>{{ spotshowInfo.summary }}</span>
							</p>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 任务信息 end -->
		<!-- 访谈详情 begin -->
		<div class="interview-Info">
			<div class="top">
				<i class="iconfont icon-Shape1"></i>
				<span>访谈详情</span>
			</div>
			<div class="interview-Cont marginTop5">
				<div class="interview-leftList">
					<el-tabs :tab-position="tabPosition">
						<el-tab-pane label="访谈提纲">
							<div class="interview-rightCont">
								<div class="rightCont-tg">
									<div class="tg-tit">访谈提纲</div>
									<div class="tg-cont">
										<div class="noData" v-if="outline.interviewOutline == ''"></div>
										<el-scrollbar>
											<p class="tg-nrtxt">{{outline.interviewOutline}}</p>
										</el-scrollbar>
									</div>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane :label="item.title" v-for="(item,index) in interviewList" :key="index + '1'">
							<div class="interview-rightCont">
								<div class="rightCont-nr">
									<div class="nr-txt">
										<div class="nr-tit">{{item.title}}</div>
										<div class="nr-cont">
											<div class="noData" v-if="item.content == ''"></div>
											<el-scrollbar>{{item.content}}</el-scrollbar>
										</div>
									</div>
									<div class="nr-accessory" v-for="(itemData,indexData) in item.imgmap" :key="indexData + 'itemData'">
										<div class="nr-tits">{{itemData.mainTitle}}</div>
										<div class="nr-imgs">
											<div class="noData" v-if="itemData.subData[0].imgList == 0 && itemData.subData[0].fileList == 0">暂无附件</div>
											<div class="secondary secondaryPicture fl" v-for="(itemP,indexP) in itemData.subData[0].imgList" :key="indexP + 'picture'">
												<img class="sImg" :src="aliYunUrlData + itemP.file_url" alt @click="enlargeImg($event)">
												<span :title="itemP.file_name">{{itemP.file_name}}</span>
												<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
											</div>
											<div class="secondary secondaryFile fl" v-for="(itemF,indexF) in itemData.subData[0].fileList" :key="indexF + 'file'">
												<i :class="filterFileFn(itemF.file_name)"></i>
												<span :key="indexF + 'file2'" :title="itemF.file_name">{{itemF.file_name}}</span>
											</div>
										</div>
									</div>
									<div class="nr-recording">
										<div class="nr-tits">录音</div>
										<div class="nr-record">
											<div class="noData" v-if="item.soundList == 0">暂无录音</div>
											<div v-for="(itemSound,indexSound) in item.soundList" :key="indexSound + 'itemSound'">
												<interview-audio v-bind:mp3="aliYunUrlData + itemSound.file_url" v-bind:audioName="itemSound.file_name"></interview-audio>
											</div>
										</div>
									</div>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</div>
		<!-- 访谈详情 end -->
	</div>
</template>

<script>
	import interviewAudio from "./interviewAudio.vue";
	import BigImg from "./bigImg.vue";

	export default {
		data() {
			return {
				commonData: window.commonData,
				tabPosition: "left",
				spotshowInfo: [],
				interviewRadio: "",
				showImg: false,
				imgSrc: "",
				interviewList: {},
				outline: {},
				aliYunUrlData: ""
			};
		},
		methods: {
			filterFileFn(val) {
				return this.$filterSuffix(val);
			},
			enlargeImg(e) {
				this.showImg = true;
				this.imgSrc = e.currentTarget.src;
			},
			viewImg() {
				this.showImg = false;
			},
			childMethod() {
				var _this = this;
				if(this.$store.state.commonBtn == "接受") {
					// 接受
					this.$http
						.post("/api/fieldinvestigation/updateTask", {
							id: this.$store.state.dataObj.fId,
							taskStatus: "1185"
						})
						.then(function(data) {
							_this.$store.state.resetFun();
							_this.$store.state.projectId = _this.$store.state.dataObj.pId;
							_this.$store.commit("changeShowCommon");
							if(_this.$store.state.taskworkType == "task") {
								// 接受后进入项目
								_this.$router.push({
									path: "/zlpg/project/projectCont"
								});
							}
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				} else if(this.$store.state.commonBtn == "进入项目") {
					_this.$store.state.projectId = _this.$store.state.dataObj.pId;
					_this.$router.push({
						path: "/zlpg/project/projectCont"
					});
					_this.$store.commit("changeShowCommon");
				}
			},
			extraChildMethod() {
				var _this = this;
				if(this.$store.state.extraBtn == "拒绝") {
					// 拒绝
					this.$http
						.post("/api/fieldinvestigation/updateTask", {
							id: this.$store.state.dataObj.fId,
							taskStatus: "1187"
						})
						.then(function(data) {
							_this.$store.state.resetFun();
							_this.$store.commit("changeShowCommon");
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				}
			}
		},
		mounted() {
			var _this = this;
			// 详情顶部任务信息
			this.$http
				.post("/api/fieldinvestigation/getJobInfo", {
					id: this.$store.state.dataObj.fId
				})
				.then(function(data) {
					_this.spotshowInfo = data.data;
					if(_this.spotshowInfo.exception == 1) {
						_this.interviewRadio = "1";
					} else {
						_this.interviewRadio = "2";
					}
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
			// 访谈详情列表
			this.$http
				.post("/api/fieldinvestigation/fieldInvestigationInfo", {
					investigationId: this.$store.state.dataObj.fId
				})
				.then(function(data) {
					_this.interviewList = data.data.investigainterviewList;
					_this.outline = data.data.interviewOutline;
					_this.aliYunUrlData = data.data.aliYunUrl;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		components: {
			interviewAudio,
			BigImg
		}
	};
</script>

<style lang="scss" scoped>
	.spotInterview {
		padding: 20px;
		.spotInterview-info {
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
				i {
					color: #f7b543;
					margin-left: 16px;
				}
				span {
					display: inline-block;
					margin-left: 10px;
					font-size: 13px;
					font-weight: 600;
				}
			}
			.spotshowInfo {
				padding: 27px 40px;
				.el-row {
					padding-bottom: 18px;
					.el-col {
						margin-left: 13px;
					}
				}
				.el-row:last-child {
					padding-bottom: 0;
				}
				.grid-content {
					p {
						font-size: 13px;
						color: #777777;
						span {
							color: #1d1c1e;
						}
						.blue {
							color: #2e68e7;
						}
					}
				}
			}
		}
		.interview-Info {
			min-height: 450px;
			width: 760px;
			.top {
				height: 35px;
				background: #fafafa;
				border-radius: 2px 2px 0px 0px;
				border: 1px solid rgba(236, 236, 236, 1);
				line-height: 35px;
				i {
					color: #98c268;
					margin-left: 16px;
				}
				span {
					display: inline-block;
					margin-left: 10px;
					font-size: 13px;
					font-weight: 600;
				}
			}
			.interview-Cont {
				.interview-leftList /deep/ {
					height: 100%;
					.el-tabs {
						height: 100%;
						display: flex;
						width: 760px;
						.el-tabs__header {
							margin-right: 0;
							width: 80px;
							height: auto;
							border: 1px solid rgba(229, 229, 229, 1);
							background: rgba(248, 248, 248, 1);
							.el-tabs__nav-wrap {
								margin-right: 0;
								.el-tabs__nav {
									width: 80px;
									border-bottom: 1px solid rgba(229, 229, 229, 1);
									.el-tabs__active-bar {
										width: 0;
										height: 0 !important;
										position: unset;
									}
									.el-tabs__item {
										height: 25px;
										line-height: 25px;
										padding: 0 10px;
										border-bottom: 1px solid rgba(229, 229, 229, 1);
										text-align: inherit;
										font-size: 12px;
										font-family: PingFangSC-Regular;
										font-weight: 400;
										color: rgba(38, 38, 40, 1);
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									.el-tabs__item:last-child {
										border-bottom: none;
									}
									.el-tabs__item.is-active,
									.el-tabs__item:hover {
										background: rgba(95, 169, 236, 1);
										color: #fff;
										font-size: 12px;
										font-family: PingFangSC-Medium;
										font-weight: 500;
									}
								}
							}
							.el-tabs__nav-wrap.is-left {
								height: auto;
							}
							.el-tabs__nav-wrap::after {
								position: unset;
							}
						}
						.el-tabs__content {
							flex: 1;
							.interview-rightCont {
								.rightCont-tg {
									.tg-tit {
										height: 23px;
										background: rgba(246, 250, 255, 1);
										border: 1px solid rgba(229, 229, 229, 1);
										border-left: none;
										text-align: center;
										line-height: 23px;
										font-size: 12px;
										font-family: PingFangSC-Medium;
										font-weight: 500;
										color: rgba(38, 38, 40, 1);
									}
									.tg-cont {
										height: 374px;
										padding: 15px 0;
										font-size: 13px;
										font-family: PingFangSC-Regular;
										font-weight: 400;
										color: rgba(103, 103, 103, 1);
										line-height: 25px;
										border-right: 1px solid rgba(229, 229, 229, 1);
										border-bottom: 1px solid rgba(229, 229, 229, 1);
										word-wrap: break-word;
										.noData {
											height: 370px;
										}
										.el-scrollbar {
											height: 374px;
											padding: 0 30px;
										}
										.tg-nrtxt {
											white-space: pre-wrap;
										}
									}
								}
								.rightCont-nr {
									.nr-tits {
										height: 23px;
										background: rgba(246, 250, 255, 1);
										border: 1px solid rgba(229, 229, 229, 1);
										border-top: none;
										border-left: none;
										text-align: center;
										line-height: 23px;
										font-size: 12px;
										font-family: PingFangSC-Medium;
										font-weight: 500;
										color: rgba(38, 38, 40, 1);
									}
									.nr-txt {
										.nr-tit {
											height: 23px;
											background: rgba(246, 250, 255, 1);
											border: 1px solid rgba(229, 229, 229, 1);
											border-left: none;
											text-align: center;
											line-height: 23px;
											font-size: 12px;
											font-family: PingFangSC-Medium;
											font-weight: 500;
											color: rgba(38, 38, 40, 1);
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											padding: 0 15px;
										}
										.nr-cont {
											height: 150px;
											padding: 15px 0;
											font-size: 13px;
											font-family: PingFangSC-Regular;
											font-weight: 400;
											color: rgba(103, 103, 103, 1);
											line-height: 25px;
											border-right: 1px solid rgba(229, 229, 229, 1);
											border-bottom: 1px solid rgba(229, 229, 229, 1);
											word-wrap: break-word;
											.noData {
												height: 147px;
											}
											.el-scrollbar {
												height: 150px;
												padding: 0 30px;
											}
										}
									}
									.nr-recording {
										.nr-record {
											border-right: 1px solid rgba(229, 229, 229, 1);
											border-bottom: 1px solid rgba(229, 229, 229, 1);
											padding: 5px 0;
											>div {
												padding: 5px 0;
											}
											.noData {
												height: 104px;
												line-height: 194px;
											}
										}
									}
									.nr-accessory {
										.nr-imgs {
											padding: 16px 0;
											border-right: 1px solid #e5e5e5;
											border-bottom: 1px solid #e5e5e5;
											height: auto;
											display: table;
											width: 100%;
											box-sizing: border-box;
											.secondary {
												margin: 6px 9px;
												span {
													display: inline-block;
													text-align: center;
													overflow: hidden;
													text-overflow: ellipsis;
													white-space: nowrap;
													width: 116px;
													font-size: 13px;
													font-family: PingFangSC-Regular;
													font-weight: 400;
													color: rgba(38, 38, 40, 1);
													line-height: 26px;
												}
												span:hover {
													color: #3a80ec;
												}
											}
											.secondaryPicture {
												.sImg {
													width: 70px;
													height: 50px;
													cursor: zoom-in;
													display: block;
													margin: 4px auto;
												}
											}
											.noData {
												height: 104px;
												line-height: 194px;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
