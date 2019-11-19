<template>
	<div class="center-body">
		<!--人员安排及费用-->
		<div class="personal-title title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-renyuananpaijifeiyong"></i>人员安排及费用</span>
			</div>
			<div class="content">
				<el-form :inline="true" size="mini" label-position="right" label-width="105px">
					<div class="add-client" v-for="(item , i) in personalData" :key="i">
						<span class="indexnumber">{{i+1}}</span>
						<li style="margin-left: 56px;">
							<label>{{namePerson[0]}}</label>
							<el-input v-model="item.userName" readonly placeholder="请选择人员" @focus="selectPerson('user',i)"></el-input>
						</li>
						<li>
							<label>{{namePerson[1]}}</label>
							<el-select placeholder="请选择工作内容" v-model="item.jobType">
								<el-option v-for="(item,i) in commonData.roleListId" :label="item" :value="Number(i)" :key="i"></el-option>
							</el-select>
						</li>
						<li>
							<label>{{namePerson[2]}}</label>
							<el-date-picker value-format="yyyy-MM-dd" v-model="item.beginDate" type="date" placeholder="请选择开始日期" @change="beginSet(item.beginDate,i)"></el-date-picker>
						</li>
						<li>
							<label>{{namePerson[3]}}</label>
							<el-date-picker value-format="yyyy-MM-dd" v-model="item.endDate" type="date" placeholder="请选择完成日期" @change="endSet(item.endDate,i)"></el-date-picker>
						</li>
						<li class="pv">
							<label>{{namePerson[4]}}</label>
							<el-input v-model="item.workDaySite" placeholder="请输入现场天数" @blur="inputDayChange('item.workDaySite',i,personalData)"></el-input>
							<span class="pa cpr-input">天</span>
						</li>
						<li class="pv">
							<label>{{namePerson[5]}}</label>
							<el-input v-model="item.laterStageDay" placeholder="请输入后期天数" @blur="inputDayChange('item.laterStageDay',i,personalData)"></el-input>
							<span class="pa cpr-input">天</span>
						</li>
						<li class="pv">
							<label>{{namePerson[6]}}</label>
							<el-input v-model="item.averageReward" placeholder="请输入日报酬标准" @blur="inputChange('item.averageReward',i,personalData)"></el-input>
							<span class="pa cpr-input">元/天</span>
						</li>
						<li class="pv" style="margin-left: 17px;">
							<label>{{namePerson[7]}}</label>
							<el-input v-model="item.rewardSum = (item.workDaySite*1 + item.laterStageDay*1)*item.averageReward*1" readonly placeholder="请输入劳务费金额"></el-input>
							<span class="pa cpr-input">元</span>
						</li>
						<a @click="deletePerson(i)"><i class="iconfont icon-shanchu1"></i></a>
					</div>
					<div class="add reset-btn" @click="addPerson">+添加</div>
				</el-form>
			</div>
		</div>
		<!--差旅费用-->
		<div class="personal-title title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-chalv-"></i>差旅费用</span>
			</div>
			<div class="content">
				<el-form :inline="true" size="mini" label-position="right" label-width="105px">
					<div class="add-client" v-for="(item , i) in travelData" :key="i">
						<span class="indexnumber">{{i+1}}</span>
						<li>
							<label>{{nameTravel[0]}}</label>
							<el-input v-model="item.peopleCount" placeholder="请输入项目人数" @blur="inputDayChange('item.peopleCount',i,travelData)"></el-input>
						</li>
						<li>
							<label>{{nameTravel[1]}}</label>
							<el-input v-model="item.travelPlace" placeholder="请输入项目地点"></el-input>
						</li>
						<li style="margin-left: 17px;">
							<label>{{nameTravel[2]}}</label>
							<el-select placeholder="请选择交通费类别" v-model="item.travelFeeType">
								<el-option v-for="(item,i) in commonData.travelTypeId" :label="item" :value="Number(i)" :key="i"></el-option>
							</el-select>
						</li>
						<li class="pv" style="margin-left: 43px;">
							<label>{{nameTravel[3]}}</label>
							<el-input v-model="item.trafficFee" placeholder="请输入交通费金额" @blur="inputChange('item.trafficFee',i,travelData)"></el-input>
							<span class="pa cpr-input">元</span>
						</li>
						<li class="pv" style="margin-left: 43px;">
							<label>{{nameTravel[4]}}</label>
							<el-input v-model="item.hotelExpense" placeholder="请输入住宿费金额" @blur="inputChange('item.hotelExpense',i,travelData)"></el-input>
							<span class="pa cpr-input">元</span>
						</li>
						<li class="pv" style="margin-left: 17px;">
							<label>{{nameTravel[5]}}</label>
							<el-input v-model="item.cityTrafficFee" placeholder="请输入市内交通费金额" @blur="inputChange('item.cityTrafficFee',i,travelData)"></el-input>
							<span class="pa cpr-input">元</span>
						</li>
						<li class="pv" style="margin-left: 56px;">
							<label>{{nameTravel[6]}}</label>
							<el-input v-model="item.surdryCharge" placeholder="请输入杂费金额" @blur="inputChange('item.surdryCharge',i,travelData)"></el-input>
							<span class="pa cpr-input">元</span>
						</li>
						<li class="pv">
							<label>{{nameTravel[7]}}</label>
							<el-input v-model="item.trvtotal = item.trafficFee*1 + item.hotelExpense*1 + item.cityTrafficFee*1 + item.surdryCharge*1" readonly placeholder="请输入总计金额"></el-input>
							<span class="pa cpr-input">元</span>
						</li>
						<a @click="deleteTravel(i)"><i class="iconfont icon-shanchu1"></i></a>
					</div>
					<div class="add reset-btn" @click="addTravel">+添加</div>
				</el-form>
			</div>
		</div>
		<!--本地费用-->
		<div class="personal-title title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-bendifeiyong"></i>本地费用</span>
			</div>
			<div class="content">
				<el-form :inline="true" size="mini" label-position="right" label-width="105px">
					<div class="add-client" v-for="(item , i) in localData" :key="i">
						<el-form-item :label="nameLocal[0]" :style="marginTop">
							<el-input class="pv" placeholder="请输入加班费金额" v-model="item.overTimePay" @blur="inputChange('item.overTimePay',i,localData)"></el-input>
							<span class="pa epr-input">元</span>
						</el-form-item>
						<el-form-item :label="nameLocal[1]" :style="marginTop">
							<el-input class="pv" placeholder="请输入本地交通费金额" v-model="item.localTrafficFee" @blur="inputChange('item.localTrafficFee',i,localData)"></el-input>
							<span class="pa epr-input">元</span>
						</el-form-item>
						<el-form-item :label="nameLocal[2]">
							<el-input class="pv" placeholder="请输入其他费用金额" v-model="item.otherFeeSum" @blur="inputChange('item.otherFeeSum',i,localData)"></el-input>
							<span class="pa epr-input">元</span>
						</el-form-item>
						<el-form-item :label="nameLocal[3]">
							<el-input class="pv" readonly placeholder="请输入总计金额" v-model="item.total = item.overTimePay*1 + item.localTrafficFee*1 + item.otherFeeSum*1"></el-input>
							<span class="pa epr-input">元</span>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<!--项目总预算-->
		<div class="personal-title title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-bendifeiyong"></i>项目总预算</span>
			</div>
			<div class="content cont">
				<el-form :inline="true" size="mini" label-position="right" label-width="105px">
					<el-form-item label="总计金额：">
						<el-input class="pv" readonly placeholder="请输入总计金额" v-model="totalFree"></el-input>
						<span class="pa epr-input">元</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<person-dialog ref="selectPersonDialog" v-on:setPersonId="setPersonId"></person-dialog>
	</div>
</template>

<script>
	import personDialog from '@/components/personDialog';
	export default {
		name: 'projectEditorPlan',
		components: {
			personDialog
		},
		data() {
			return {
				namePerson: ['姓名：', '工作内容：', '开始日期：', '完成日期：', '现场天数：', '后期天数：', '报酬标准：', '劳务费金额：'],
				nameTravel: ['项目人数：', '项目地点：', '交通费类别：', '交通费：', '住宿费：', '市内交通费：', '杂费：', '总计金额：'],
				nameLocal: ['加班费：', '本地交通费：', '其他费用：', '总计金额：'],
				//人员安排及费用
				personalData: [],
				personalDataList: [],
				//差旅费用
				travelData: [],
				travelDataList: [],
				//本体费用
				localData: [{
					overTimePay: '',
					localTrafficFee: '',
					otherFeeSum: '',
					total: ''
				}],
				commonData: window.commonData,
				id: this.$store.state.projectId,
				index: '',
				marginTop:{
					marginTop:'10px'
				}
			}
		},
		created() {
			var _this = this;
		},
		mounted() {
			var _this = this;
			this.$http.post('/api/projectRequest/setupFindBudgetInfo', {
					projectId: this.id
				})
				.then(function(data) {
					_this.personalDataList = data.data.projectMemberBudgetList;
					_this.travelDataList = data.data.projectTravelBudgetList;

					if(data.data.projectLocalBudget.length) {
						_this.localData = data.data.projectLocalBudget;
					}
					//处理人员安排的数据
					for(var i in _this.personalData) {
						_this.personalData[i] = _this.personalDataList[i];
					}
					if(_this.personalDataList.length) {
						for(var i in _this.personalDataList) {
							var obj = {};
							obj.userName = _this.personalDataList[i].userName;
							obj.userId = _this.personalDataList[i].userId;
							obj.jobType = _this.personalDataList[i].jobType;
							obj.beginDate = _this.personalDataList[i].beginDate.slice(0, 10);
							obj.endDate = _this.personalDataList[i].endDate.slice(0, 10);
							obj.workDaySite = _this.personalDataList[i].workDaySite;
							obj.laterStageDay = _this.personalDataList[i].laterStageDay;
							obj.averageReward = _this.personalDataList[i].averageReward;
							obj.rewardSum = _this.personalDataList[i].rewardSum;
							obj.id = _this.personalDataList[i].id;
							obj.puId = _this.personalDataList[i].puId;
							obj.status = _this.personalDataList[i].status;
							_this.personalData.push(obj);
						}
					}
					//处理差旅费用的数据
					for(var i in _this.travelData) {
						_this.travelData[i] = _this.travelDataList[i];
					}
					if(_this.travelDataList.length) {
						for(var i in _this.travelDataList) {
							var obj = {};
							obj.peopleCount = _this.travelDataList[i].peopleCount;
							obj.travelPlace = _this.travelDataList[i].travelPlace;
							obj.travelFeeType = _this.travelDataList[i].travelFeeType;
							obj.trafficFee = _this.travelDataList[i].trafficFee;
							obj.hotelExpense = _this.travelDataList[i].hotelExpense;
							obj.cityTrafficFee = _this.travelDataList[i].cityTrafficFee;
							obj.surdryCharge = _this.travelDataList[i].surdryCharge;
							obj.trvtotal = _this.travelDataList[i].trvtotal;
							obj.id = _this.travelDataList[i].id;
							obj.status = _this.travelDataList[i].status; 
							_this.travelData.push(obj);
						}
					}
					_this.$store.state.memberBudgetJson = _this.personalData;
					_this.$store.state.personRuls = _this.personalData;
					_this.$store.state.travelBudgetJson = _this.travelData;
					_this.$store.state.travelRuls = _this.travelData; 
					_this.$store.state.localBudgetJson = _this.localData;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		methods: {
			//点击添加人员安排及费用
			addPerson() {
				this.personalData.push(this.personListArr());
			},
			//点击添加差旅费用
			addTravel() {
				this.travelData.push(this.travelListArr());
			},
			//点击删除人员安排及费用
			deletePerson(index) {
				this.personalData.splice(index, 1);
			},
			//点击删除差旅费用
			deleteTravel(index) {
				this.travelData.splice(index, 1);
			},
			//人员安排及费用
			personListArr() {
				return {
					userName: '',
					jobType: '',
					beginDate: '',
					endDate: '',
					workDaySite: '',
					laterStageDay: '',
					averageReward: '',
					rewardSum: '',
					sortNumber: '1'
				}
			},
			//差旅费用
			travelListArr() {
				return {
					peopleCount: '',
					travelPlace: '',
					travelFeeType: '',
					trafficFee: '',
					hotelExpense: '',
					cityTrafficFee: '',
					surdryCharge: '',
					trvtotal: ''
				}
			},
			selectPerson(chargeAppraiser, index) {
				this.index = index;
				this.$refs.selectPersonDialog.showPersonDialog(chargeAppraiser);
			},
			setPersonId(type, name, id) {
				this.personalData[this.index][type + 'Id'] = id;
				this.personalData[this.index][type + 'Name'] = name;
			},
			//金额输入框输入验证提示
			inputChange(val, index, arr) {
				var reg = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
				var num = val.split('.');
				if((arr[index][num[1]]) && !isNaN(arr[index][num[1]])) {
					if(!reg.test(arr[index][num[1]])) {
						this.$messageError('请输入数字且小数点保留两位！');
						arr[index][num[1]] = parseFloat(arr[index][num[1]]);
						arr[index][num[1]] = arr[index][num[1]].toFixed(2);
						return;
					}else {
						arr[index][num[1]] = parseFloat(arr[index][num[1]]);
						arr[index][num[1]] = arr[index][num[1]].toFixed(2);
					}
				} else if(isNaN(arr[index][num[1]])){
					this.$messageError('请输入数字且小数点保留两位！');
					arr[index][num[1]] = '';
					return;
				}
			},
			//天数输入框验证提示
			inputDayChange(val, index, arr) {
				var reg = /^[0-9]\d*$/;
				var num = val.split('.');
				if((arr[index][num[1]]) && !isNaN(arr[index][num[1]])) {
					if(!reg.test(arr[index][num[1]])) {
						this.$messageError('请输入整数！');
						arr[index][num[1]] = parseInt(arr[index][num[1]]);
						return;
					}
				} else if(isNaN(arr[index][num[1]])) {
					this.$messageError('请输入整数！');
					arr[index][num[1]] = '';
				}
			},
			beginSet(val,index) {
				this.beginDate = new Date(val).getTime();
				if(this.endDate){
					if(this.beginDate > this.endDate){
						this.$messageError('开始时间不能小于完成时间，请重新选择开始时间');
						this.projectPlan[index].beginDate = '';
						return;
					}
				}
			},
			endSet(val,index){
				this.endDate = new Date(val).getTime();
				if(this.beginDate){
					if(this.beginDate > this.endDate){
						this.$messageError('完成时间不能大于开始时间，请重新选择完成时间');
						this.projectPlan[index].endDate = ''
						return;
					}
				}
			}
		},
		computed: {
			totalFree() {
				var total = 0;
				var rewardSum = 0;
				var travelTotal = 0;
				for(var i in this.personalData) {
					rewardSum += this.personalData[i].rewardSum;
				}
				for(var i in this.travelData) {
					travelTotal += this.travelData[i].trvtotal;
				}
				return total = (rewardSum * 100 + travelTotal * 100 + this.localData[0].total * 100)/100;
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.center-body {
		padding: 20px;
		.title {
			min-height: 70px;
			background: rgba(255, 255, 255, 1);
			border-radius: 2px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			margin-bottom: 10px;
		}
		.top {
			height: 35px;
			background: #fafafa;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-left: 0;
			border-right: 0;
			line-height: 35px;
			span {
				font-size: 13px;
			}
		}
		.cont {
			margin: 15px 25px;
			background: rgba(249, 249, 249, 1);
			.el-form-item--mini.el-form-item {
				margin-top: 18px;
			}
		}
		.content {
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
				margin-left: 13px;
				margin-bottom: 10px;
				margin-top: 10px;
			}
			.add-client {
				position: relative;
				margin-right: 15px;
				margin-top: 15px;
				background: rgba(249, 249, 249, 1);
				margin-left: 12px;
				margin-bottom: 15px;
				overflow: hidden;
				label {
					width: 105px;
					font-size: 13px;
				}
				li {
					float: left;
					margin-top: 11px;
					margin-left: 30px;
				}
				.indexnumber {
					float: left;
					height: 171px;
					width: 14px;
					background: rgba(152, 194, 104, 1);
					color: #fff;
					margin-top: -15px;
					line-height: 171px;
					text-align: center;
					font-size: 13px;
				}
				.el-input,
				.el-select {
					width: 220px;
				}
				a {
					position: absolute;
					top: 72px;
					right: 1px;
					cursor: pointer;
				}
				.cpr-input {
					font-size: 13px;
					top: 6px;
					right: 10px;
				}
			}
		}
		.iconfont {
			font-size: 13px;
			margin-left: 20px;
			margin-right: 10px;
			font-weight: 400;
		}
		.icon-renyuananpaijifeiyong {
			color: #57BFB2;
		}
		.icon-shanchu1 {
			color: #C0C0C0;
		}
		.icon-shanchu1:hover {
			color: #F7B543;
		}
		.icon-chalv- {
			color: #C3A2EB;
		}
		.icon-bendifeiyong {
			color: #7EA0EF;
		}
		.epr-input {
			font-size: 13px;
			top: 2px;
			right: 10px;
		}
	}
	/deep/ .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
		margin-bottom: 10px;
	}
</style>