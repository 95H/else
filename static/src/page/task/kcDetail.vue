<template>
	<div class="kcDetailBox">
		<!-- 现场勘查 -->
		<div class="requiredInformation">
			<div class="top">
				<i class="iconfont icon-renwuxiangqing"></i>
				<span>任务信息</span>
			</div>
			<div class="junctions-Info">
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
								<span>勘查任务</span>
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
								<!--<el-radio v-model="taskRadio" disabled label="2">异常标记</el-radio>-->
							<!--</p>-->
						<!--</div>-->
					<!--</el-col>-->
				</el-row>
			</div>
		</div>
		<div class="surveyInfo">
			<div class="top">
				<i class="iconfont icon-Shape1"></i>
				<span>勘察详情</span>
			</div>
			<div>
				<!-- 横向导航 -->
				<scroll-tab :tabArr="tabArr" :width="width" @tabClick="tabClick"></scroll-tab>
				<!-- 对应页面 begin -->
				<component class="spotTask clear" ref="child" v-bind:is="componentsType" :componentsType="componentsType" :leftListArr="leftListArr" :tabArr="tabArr" v-on:top-Info="topInfoFn"></component>
			</div>
		</div>
	</div>
</template>

<script>
	import scrollTab from "@/components/scrollTab.vue";
	import CASHCHECK from "./cashCheck"; //现金盘点
	import BANKREGULATION from "./bankRegulation"; //银行调节
	import CREDITOR from "./CREDITOR"; //可疑债权
	import GENERALEQUIPMENT from "./GENERALEQUIPMENT"; //通用设备
	import HOUSE from "./HOUSE"; //房屋
	import IMPORTEDEQUIPMENT from "./IMPORTEDEQUIPMENT"; //进口设备
	import INDUSTRIALBOILER from "./INDUSTRIALBOILER"; //工业锅炉
	import INVENTORY from "./INVENTORY"; //存货盘点
	import LARGEQUIPMENT from "./LARGEQUIPMENT"; //大型电子设备
	import LIFTINGEQUIPMENT from "./LIFTINGEQUIPMENT"; //电梯、起重设备
	import PARCELSTATUS from "./PARCELSTATUS"; //宗地状况
	import PRESSUREVESSEL from "./PRESSUREVESSEL"; //压力容器
	import STRUCTURE from "./STRUCTURE"; //构筑物
	import VEHICLE from "./VEHICLE"; //车辆

	export default {
		data() {
			return {
				commonData: window.commonData,
				spotshowInfo: [],
				taskRadio: "",
				topNavData: {},
				tabArr: [],
				width: "698",
				componentsType: "",
				leftListArr: []
			};
		},
		methods: {
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
			},
			tabClick(val) {
				this.componentsType = val;
				if(
					this.tabArr.length > 1 &&
					this.$store.state.dataObj.listType == "manuscript"
				) {
					this.leftListArr = this.dData[val];
				}
			},
			topInfoFn: function(data) {
				this.spotshowInfo = data;
				this.spotshowInfo.name = this.spotshowInfo.investorName;
				this.spotshowInfo.address = this.spotshowInfo.officeAddressStreet;
				this.spotshowInfo.headUserName = this.spotshowInfo.userName;
			}
		},
		mounted() {
			var _this = this;
			if(this.$store.state.dataObj.listType != "manuscript") {
				this.width = "698";
				// 详情顶部任务信息
				this.$http
					.post("/api/fieldinvestigation/getJobInfo", {
						id: this.$store.state.dataObj.fId
					})
					.then(function(data) {
						_this.spotshowInfo = data.data;
						if(_this.spotshowInfo.exception == 1) {
							_this.taskRadio = "1";
						} else {
							_this.taskRadio = "2";
						}
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
				//顶部滑动导航列表
				this.$http
					.post("/api/fieldinvestigation/fieldInvestigationInfo", {
						investigationId: this.$store.state.dataObj.fId
					})
					.then(function(data) {
						_this.$store.state.topList = data.data.types;
						for(var i in data.data.types) {
							_this.tabArr.push({
								name: data.data.types[i],
								id: i
							});
						}
						_this.componentsType = _this.tabArr[0].id;
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
			} else {
				this.width = "660";

				function getshowCNameFn(k) {
					switch(k) {
						case "CASHCHECK":
							return "现金盘点";
							break;
						case "BANKREGULATION":
							return "银行调节";
							break;
						case "CREDITOR":
							return "可疑债权";
							break;
						case "INVENTORY":
							return "存货盘点";
							break;
						case "HOUSE":
							return "房屋";
							break;
						case "STRUCTURE":
							return "构筑物";
							break;
						case "PARCELSTATUS":
							return "宗地状况";
							break;
						case "GENERALEQUIPMENT":
							return "通用设备";
							break;
						case "VEHICLE":
							return "车辆";
							break;
						case "LARGEQUIPMENT":
							return "大型电子设备";
							break;
						case "IMPORTEDEQUIPMENT":
							return "进口设备";
							break;
						case "INDUSTRIALBOILER":
							return "工业锅炉";
							break;
						case "LIFTINGEQUIPMENT":
							return "电梯、起重设备";
							break;
						case "PRESSUREVESSEL":
							return "压力容器";
							break;
					}
				}
				if(
					this.$store.state.dataObj.fieldKCY != undefined &&
					this.$store.state.dataObj.listType == "manuscript"
				) {
					this.$http
						.post("/api/fieldinvestigation/surveyType/list", {
							ywId: this.$store.state.dataObj.dataTRInfo.id,
							relationCode: this.$store.state.dataObj.fieldKCY
						})
						.then(function(data) {
							_this.dData = data.data;
							for(var i in data.data) {
								var showCName = getshowCNameFn(i);
								_this.tabArr.push({
									name: showCName,
									id: i
								});
							}
							if(_this.tabArr[0]) {
								_this.componentsType = _this.tabArr[0].id;
								_this.leftListArr = data.data[_this.tabArr[0].id];
							}
							_this.$emit("setKcData", JSON.stringify(data.data));
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				}
			}
		},
		components: {
			scrollTab,
			CASHCHECK,
			BANKREGULATION,
			CREDITOR,
			GENERALEQUIPMENT,
			HOUSE,
			IMPORTEDEQUIPMENT,
			INDUSTRIALBOILER,
			INVENTORY,
			LARGEQUIPMENT,
			LIFTINGEQUIPMENT,
			PARCELSTATUS,
			PRESSUREVESSEL,
			STRUCTURE,
			VEHICLE
		}
	};
</script>

<style lang="scss" scoped>
	.kcDetailBox {
		.requiredInformation {
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
			.junctions-Info {
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
						color: #505050;
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
		.surveyInfo {
			min-height: 450px;
			// width: 760px;
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
		}
	}

	.el-form-item {
		margin-bottom: 10px;
	}

	.el-form-item:first-child {
		margin-bottom: 0;
	}

	.clear {
		clear: both;
	}

	.spotTask {
		display: flex;
		// width: 760px;
	}
</style>
