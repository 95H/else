<template>
	<div class="center-body">
		<!--必填信息-->
		<div class="requiredInformation">
			<div class="top">
				<img src="../assets/common/must.png" />
				<span>必填信息</span>
			</div>
			<div>
				<el-form :model="ruleForm" :inline="true" :show-message="false" size="mini" label-position="right" :rules="rules" ref="ruleForm" label-width="105px">
					<el-form-item label="项目名称:" prop="projectName">
						<el-input placeholder="请输入项目名称" v-model="ruleForm.projectName"></el-input>
					</el-form-item>
					<el-form-item label="项目简称:" prop="shortName">
						<el-input placeholder="请输入项目简称" v-model="ruleForm.shortName"></el-input>
					</el-form-item>
					<el-form-item label="评估基准日:" prop="assessmentBaseDate">
						<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择评估基准日" v-model="ruleForm.assessmentBaseDate"></el-date-picker>
					</el-form-item>
					<el-form-item label="项目级别:" prop="projectLevelId">
						<el-select v-model="ruleForm.projectLevelId" placeholder="请选择项目级别">
							<el-option v-for="(item,i) in objectList.projectLevelId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目性质:" prop="projectNatureId">
						<el-select v-model="ruleForm.projectNatureId" placeholder="请选择项目性质">
							<el-option v-for="(item,i) in objectList.projectNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上市公司:" prop="isListedCompany">
						<el-radio-group v-model="ruleForm.isListedCompany">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="评估对象:" prop="assessmentTarget">
						<div class="width240">
							<el-input readonly placeholder="请选择评估对象" @focus="assessmentTargetEvent" v-model="showAssessmentTargetName"></el-input>
							<el-input readonly v-model="showAssessmentType" v-if="assessObj.assessmentTarget.id && assessObj.assessmentTarget.id!== '1320' && (ruleForm.assetType.length || assessObj.assessmentTarget.assetType.length)"></el-input>
						</div>
					</el-form-item>
					<el-form-item label="报告类型:" prop="issueAssetsReport">
						<el-select v-model="ruleForm.issueAssetsReport" placeholder="请选择评估报告类型">
							<el-option v-for="(item,i) in objectList.assetReportTypeId" :label="item" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="第一评估师:" prop="chargeAppraiserName">
						<el-input readonly placeholder="请输入第一签字评估师" v-model="ruleForm.chargeAppraiserName" @focus="selectPerson('chargeAppraiser')"></el-input>
					</el-form-item>
					<el-form-item label="第二评估师:" prop="appraiserUserName">
						<el-input readonly placeholder="请输入第二签字评估师" v-model="ruleForm.appraiserUserName" @focus="selectPerson('appraiserUser')"></el-input>
					</el-form-item>
					<el-form-item label="项目负责人:" prop="chargeLeaderName">
						<el-input readonly placeholder="请输入项目名称" v-model="ruleForm.chargeLeaderName" @focus="selectPerson('chargeLeader')"></el-input>
					</el-form-item>
					<el-form-item label="具体经济行为:" prop="economicBehaviorId">
						<el-select placeholder="请选择具体经济行为" v-model="ruleForm.economicBehaviorId">
							<el-option v-for="(item,i) in objectList.EconomicBehaviorId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预期评估费:" prop="evaluationFeeExpect">
						<el-input class="pv" placeholder="请输入预期评估服务费用" v-model="ruleForm.evaluationFeeExpect"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="预期差旅费:" prop="travelExpenseExpect">
						<el-input class="pv" placeholder="请输入预期差旅费" v-model="ruleForm.travelExpenseExpect"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="预期合同价:" prop="projectExpenseExpect">
						<el-input class="pv" placeholder="请输入预期合同价" readonly v-model="contract"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!--选填信息-->
		<div class="optionalmsg">
			<div class="top">
				<img src="../assets/common/optional.png" />
				<span>选填信息</span>
			</div>
			<div>
				<el-form :inline="true" size="mini" label-position="right" ref="form" :model="form" label-width="105px">
					<el-form-item label="承作机构:">
						<el-input readonly v-model="groupName" placeholder="请输入承作机构"></el-input>
					</el-form-item>
					<el-form-item label="更改基准日:">
						<el-radio-group v-model="form.ifChangeBaseDay">
							<el-radio label="1">是</el-radio>
							<el-radio label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="评估目的:">
						<el-select filterable placeholder="请选择评估目的" v-model="form.assessmentObjectiveId">
							<el-option v-for="(item,i) in objectList.assessmentObjectiveId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目联络人:">
						<el-input readonly v-model="contactPersonNames" @focus="contactPersonEvent" placeholder="请选择项目联络人"></el-input>
					</el-form-item>
					<el-form-item label="其他负责人:">
						<el-input readonly v-model="form.projectLeaderName" placeholder="请输入项目其他负责人" @focus="selectPersons('projectLeader')"></el-input>
					</el-form-item>
					<el-form-item label="交易买方:">
						<el-input v-model="form.tradeBuyer" placeholder="请输入交易买方"></el-input>
					</el-form-item>
					<el-form-item label="交易卖方:">
						<el-input v-model="form.tradeSeller" placeholder="请输入交易卖方"></el-input>
					</el-form-item>
					<el-form-item label="经济性质:">
						<el-select placeholder="请选择经济性质" v-model="form.billEconomicNatureId">
							<el-option v-for="(item,i) in objectList.billEconomicNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="涉及股权比例:">
						<el-input class="pv" v-model="form.tradeProportion" placeholder="请输入交易涉及股权比例"></el-input>
						<span class="pa cpr-input">%</span>
					</el-form-item>
					<el-form-item label="控制权转移:">
						<el-radio-group v-model="form.isPowerTransfer">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="经济性质改变:">
						<el-radio-group v-model="form.isNatureChange">
							<el-radio :label="Number(1)">改变</el-radio>
							<el-radio :label="Number(0)">不改变</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="矿权备案部门:">
						<el-input v-model="form.keepOnRecordDepartment" placeholder="请输入矿业权评估报告备案部门"></el-input>
					</el-form-item>
					<el-form-item label="企业数量:">
						<el-input v-model="form.enterpriseNumber" placeholder="请输入企业数量"></el-input>
					</el-form-item>
					<el-form-item label="分布城市数量:">
						<el-input v-model="form.cityNumber" placeholder="请输入分布城市数量"></el-input>
					</el-form-item>
					<el-form-item label="二级长投数量:">
						<el-input v-model="form.longInvestmentNumber" placeholder="请输入二级长投数量"></el-input>
					</el-form-item>
					<el-form-item label="土地使用权:">
						<el-radio-group v-model="form.involveLand">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="矿业权:">
						<el-radio-group v-model="form.involveMining">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="资产总额:">
						<el-input class="pv" v-model="form.totalAssets" placeholder="请输入净资产总额"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="净资产总额:">
						<el-input class="pv" v-model="form.totalNetAsset" placeholder="请输入净资产总额"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="项目背景:" :style="styleAuto">
						<el-input v-model="form.projectBackgroud" placeholder="请输入项目背景" :style="styleObj"></el-input>
					</el-form-item>
					<div class="title">委托方信息:</div>
					<div class="content add-client" v-for="(item , i) in othercompanyJson" :key="i">
						<li>
							<label>{{nameArr[0]}}</label>
							<el-input v-model="item.companyName" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[1]}}</label>
							<el-select placeholder="请选择经济性质" v-model="item.economicNatureId">
								<el-option v-for="(item,i) in objectList.billEconomicNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
							</el-select>
						</li>
						<li>
							<label>{{nameArr[2]}}</label>
							<el-input v-model="item.contactName" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[3]}}</label>
							<el-input v-model="item.contactMobile" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[4]}}</label>
							<el-input v-model="item.competentDepartment" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[5]}}</label>
							<el-input v-model="item.contactTelephone" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[6]}}</label>
							<el-input v-model="item.contactFax" placeholder="请输入"></el-input>
						</li>
						<a @click="deleteClient(i)"><i class="iconfont icon-shanchu1"></i></a>
					</div>
					<div class="add" @click="addClient">+添加</div>
					<div class="title">支付方信息:</div>
					<div class="content add-client" v-for="(item , i) in payerJson" :key="i">
						<li>
							<label>{{nameArr[0]}}</label>
							<el-input v-model="item.billName" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[1]}}</label>
							<el-select placeholder="请选择经济性质" v-model="item.billEconomicNatureId">
								<el-option v-for="(item,i) in objectList.billEconomicNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
							</el-select>
						</li>
						<li>
							<label>{{nameArr[2]}}</label>
							<el-input v-model="item.contactName" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[3]}}</label>
							<el-input v-model="item.contactMobile" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[4]}}</label>
							<el-input v-model="item.competentDepartment" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[5]}}</label>
							<el-input v-model="item.contactTelephone" placeholder="请输入"></el-input>
						</li>
						<li>
							<label>{{nameArr[6]}}</label>
							<el-input v-model="item.contactFax" placeholder="请输入"></el-input>
						</li>
						<a @click="deletePayment(i)"><i class="iconfont icon-shanchu1"></i></a>
					</div>
					<div class="add" @click="addPayment">+添加</div>
					<div class="title">立项申请信息:</div>
					<div class="content add-client projectmsg">
						<el-form-item label-width="129px" label="主要风险评估:" :style="styleLine">
							<el-input type="textarea" v-model="form.majorRisk" :style="styleObjTexra"></el-input>
						</el-form-item>
						<el-form-item label-width="129px" label="项目组人员专业胜任能力及独立性:" :style="styleLine">
							<el-input type="textarea" v-model="form.teamCapibility" :style="styleObjTexra"></el-input>
						</el-form-item>
						<el-form-item label-width="129px" label="重点难点问题:" :style="styleLine">
							<el-input type="textarea" v-model="form.mainProblem" :style="styleObjTexra"></el-input>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<center-dialog ref="assessmentTargetDialog" dialogWidth='500px' dialogHeight="300px" dialogTitle="请选择评估对象" titlePosition="left">
			<div slot="dialogContent">
				<el-radio-group v-model="assessObj.assessmentTarget.id">
					<el-radio :label="index" v-for="(target,index) in objectList.assessmentTarget" :key="index">{{target}}</el-radio>
				</el-radio-group>
				<div class="line"></div>
				<el-checkbox-group v-model="assessObj.assessmentTarget.assetType" v-if="assessObj.assessmentTarget.id !== '1322'">
					<el-checkbox :label="index" v-for="(assetType,index) in objectList.assetType" :disabled="isCheckBoxDisable" :key="index">{{assetType}}</el-checkbox>
				</el-checkbox-group>
				<el-radio-group v-model="ruleForm.assetType" v-else>
					<el-radio :label="index" v-for="(assetType,index) in objectList.assetType" :key="index">{{assetType}}</el-radio>
				</el-radio-group>
				<div class="line"></div>
				<el-button plain @click="hendleAssessmentTarget(false)" size="small">取消</el-button>
				<el-button type="primary" @click="hendleAssessmentTarget(true)" size="small">确定</el-button>
			</div>
		</center-dialog>
		<center-dialog ref="contactPersonDialog" dialogWidth='500px' dialogHeight="400px" dialogTitle="请选择项目联系人" titlePosition="left">
			<div slot="dialogContent" class="dynamicValidateForm">
				<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
					<el-form-item v-for="(item, index) in contactPersonObj.contactPerson" :label="'项目联络人' + '('+list[index]+')'" :key="index" :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
          }">
						<el-input readonly @focus="selectPerson('contactPerson',index)" v-model="contactPersonObj.contactPerson[index].name"></el-input>
						<div class="icon-container">
							<i class="el-icon-delete" @click.prevent="removeDomain(index)"></i>
						</div>
					</el-form-item>
					<el-form-item>
						<div>
							<el-button @click="addDomain" type="primary" v-if="contactPersonObj.contactPerson.length < 5">增加</el-button>
						</div>
					</el-form-item>
					<div v-if="contactPersonObj.contactPerson.length" class="button-container">
						<el-button @click="handlePersonEvent(false)">取消</el-button>
						<el-button type="primary" @click="handlePersonEvent(true)">确认</el-button>
					</div>
				</el-form>
			</div>
		</center-dialog>
		<person-dialog ref="selectPersonDialog" v-on:setPersonId="setPersonId"></person-dialog>	
		<persons-dialog ref="selectPersonsDialog" v-on:setPersonId="setPersonsId"></persons-dialog>
	</div>
</template>

<script>
	import personDialog from '@/components/personDialog';
	import centerDialog from '@/components/centerDialog.vue';
	import personsDialog from '@/components/personsDialog';
	export default {
		name: 'createproject',
		components: {
			personDialog,
			centerDialog,
			personsDialog
		},
		data() {
			return {
				//临时数据
				dynamicValidateForm: {
					domains: [{
						value: ''
					}],
				},
				list: ['首开', '二开', '三开', '四开', '五开'],
				nameArr:['名称:','经济性质:','姓名:','手机:','主管部门:','电话:','传真:'],
				isShow: true,
				styleObj: {
					width: "621px"
				},
				styleObjTexra: {
					width: "550px"
				},
				styleAuto: {
					width: "auto"
				},
				styleLine: {
					width: "auto",
					lineHeight: "24px",
					marginBottom: "4px"
				},
				objectList: commonData,
				//必填项
				ruleForm: {
					projectName: '',
					shortName: '',
					assessmentBaseDate: '',
					projectLevelId: '',
					assessmentTarget: '',
					assetType: '',
					projectNatureId: '',
					issueAssetsReport: '',
					isListedCompany: '',
					chargeLeaderName: '',
					chargeLeaderId:'',
					chargeAppraiserName: '',
					chargeAppraiserId:'',
					appraiserUserName: '',
					appraiserUserId:'',
					economicBehaviorId: '',
					evaluationFeeExpect: '',
					travelExpenseExpect: '',
					projectExpenseExpect: '',
					id:''
				},
				//评估对象
				assessObj:{
					assessmentTarget: {
						id: '1321',
						name: "",
						assetType: [],
					}, //绑定评估对象数据
					assetTypeList: [], //临时保存部分资产数组
					assetTypehold: '', //临时保存assetType
				},
				ruleFormChild:{},
				groupName: '',
				//选填项
				form: {
					ifChangeBaseDay: '',
					assessmentObjectiveId: '',
					contactPersonName:'',
					contactPersonId:'',
					projectLeaderName: '',
					projectLeader:'',
					tradeBuyer: '',
					tradeSeller: '',
					billEconomicNatureId: '',
					tradeProportion: '',
					isPowerTransfer: '',
					isNatureChange: '',
					keepOnRecordDepartment: '',
					enterpriseNumber: '',
					cityNumber: '',
					longInvestmentNumber: '',
					involveLand: '',
					involveMining: '',
					totalAssets: '',
					totalNetAsset: '',
					projectBackgroud: '',
					majorRisk: '',
					teamCapibility: '',
					mainProblem: '',
					id:''
				},
				contactPersonObj:{
					contactPerson: [{
						id: '',
						name: ''
					}], //联络人
					contactPersonhold: [],
					contactPersonIndex: 0
				},
				formChild:{},
				othercompanyJson: [],
				payerJson: [],
				//必填项提示
				rules: {
					projectName: [{
							required: true,
							message: '请输入项目名称',
							trigger: 'blur'
						},
						//{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
					],
					shortName: [{
						required: true,
						message: '请输入项目简称',
						trigger: 'blur'
					}],
					assessmentBaseDate: [{
						//						type: 'date',
						required: true,
						message: '请选择评估基准日',
						//						trigger: 'change'
					}],
					assessmentTarget: [{
						required: true,
						message: '请输入评估对象',
						trigger: 'blur'
					}],
					projectLevelId: [{
						required: true,
						message: '请选择项目级别',
						trigger: 'change'
					}],
					projectNatureId: [{
						required: true,
						message: '请选择项目性质',
						trigger: 'change'
					}],
					issueAssetsReport: [{
						required: true,
						message: '请选择报告类型',
						trigger: 'change'
					}],
					isListedCompany: [{
						required: true,
						message: '请选择是否涉及上市公司',
						trigger: 'change'
					}],
					chargeLeaderName: [{
						required: true,
						message: '请输入项目负责人',
						trigger: 'blur'
					}],
					chargeAppraiserName: [{
						required: true,
						message: '请输入第一签字评估师',
						trigger: 'blur'
					}],
					appraiserUserName: [{
						required: true,
						message: '请输入第二签字评估师',
						trigger: 'blur'
					}],
					economicBehaviorId: [{
						required: true,
						message: '请输入具体经济行为',
						trigger: 'blur'
					}],
					evaluationFeeExpect: [{
						required: true,
						message: '请输入预期评估服务费用',
						trigger: 'blur'
					}],
					travelExpenseExpect: [{
						required: true,
						message: '请输入预期差旅费用',
						trigger: 'blur'
					}],
					projectExpenseExpect: [{
						required: true,
						message: '请输入预期合同价',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			var _this = this;
			var id = this.$store.state.projectId;
			_this.backData(id);
		},
		mounted() {
			this.groupName = JSON.parse(this.$getCookie("user")).groupName;
		},
		methods: {
			//点击保存
			childMethod() {
				var _this = this;
				this.$refs['ruleForm'].validate((valid) => {
					var setupprojectJson = JSON.stringify(this.ruleForm);
					var otherProjectJson = JSON.stringify(this.form);
					var othercompanyJson = JSON.stringify(this.othercompanyJson);
					var payerJson = JSON.stringify(this.payerJson);
					if(valid) {
						this.$confirm('确认编辑此项目？', '提示', {
							confirmButtonText: '确定编辑',
							cancelButtonText: '取消',
							type: 'success'
						}).then(() => {
							this.$http.post('/api/projectRequest/setupSaveSetupRequest', {
									setupProjectJson: setupprojectJson,
									otherProjectJson: otherProjectJson,
									otherCompanyJson: othercompanyJson,
									payerJson: payerJson
								})
								.then(function(data) {
									_this.$message({
										type: 'success',
										message: '编辑项目成功'
									});
									_this.$store.state.refresh();
									_this.$store.commit('changeShowCommon');
								})
								.catch(function(error) {
									_this.$messageError(error);
								});
						}).catch(() => {
							_this.$message({
								type: 'info',
								message: '已取消编辑'
							});
						});
					} else {
						return false;
					}
				});
			},
			//回显数据
			backData(id){
				console.log(id);
				var _this = this;
				this.$http.post('/api/projectRequest/setupFindProjectInfo',{
					projectId: id
				})
				.then(function(data){
//					console.log(data);	
					_this.othercompanyJson = data.data.otherCompanyInfoList;
					_this.payerJson = data.data.projectPayerList;
					_this.ruleFormChild = data.data.project
					_this.formChild = data.data.project;
					
					for(var i in _this.ruleForm){
						_this.ruleForm[i] = _this.ruleFormChild[i];
					}
					for(var i in _this.form){
						_this.form[i] = _this.formChild[i];
					}
					
					//处理评估对象数据回显
					_this.assessObj.assessmentTarget.id = _this.ruleForm.assessmentTarget;
					if(_this.ruleForm.assessmentTarget == '1320'){
						//整体
						_this.assessObj.assessmentTarget.assetType = [];
						_this.assessObj.assetTypeList = [];
						_this.assessObj.assetTypehold = '';
					}else if(_this.ruleForm.assessmentTarget == '1321'){
						//部分
						var str = _this.ruleForm.assetType;
						var a = str.slice(0,str.length-1);
						var arr = a.split(',');
						console.log(arr);
						_this.assessObj.assessmentTarget.assetType = arr;
						_this.assessObj.assetTypeList = arr;
						_this.assessObj.assetTypehold = '';
					}else if(_this.ruleForm.assessmentTarget == '1322'){
						//单项
						_this.assessObj.assessmentTarget.assetType = _this.ruleForm.assetType;
						_this.assessObj.assetTypeList = [];
						_this.assessObj.assetTypehold = _this.ruleForm.assetType;
					}
					//处理项目联络人的数据回显
					var nameStr = data.data.contactPersonName;
					var idStr = data.data.contactPersonId;
					var nameArr = nameStr.split(',');
					var idArr = idStr.split(',');  
					var arr = [];
					for(var i in nameArr){
						console.log(idArr[i]);
						var obj = {};
						obj.name = nameArr[i];
						obj.id = idArr[i];
						arr.push(obj);
					}
					_this.contactPersonObj.contactPerson = arr; 
					_this.form.contactPersonName = data.data.contactPersonName;
					_this.form.contactPersonId = data.data.contactPersonId;
					
					_this.ruleForm.chargeAppraiserName = data.data.chargeAppraiserName;
					_this.ruleForm.appraiserUserName = data.data.appraiserUserName;
					_this.ruleForm.chargeLeaderName = data.data.chargeLeaderName;
					_this.ruleForm.chargeAppraiserId = data.data.chargeAppraiserList;
					_this.ruleForm.appraiserUserId = data.data.projectAppraiserList;
					_this.ruleForm.chargeLeaderId = data.data.chargeLeaderList;
					_this.form.contactPersonName = data.data.contactPersonName;
					_this.form.projectLeader = data.data.projectLeaderIds;
					_this.form.projectLeaderName = data.data.projectLeaderName;
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
			},
			//点击添加委托方
			addClient() {
				this.othercompanyJson.push(this.clientListArr());
			},
			//点击删除委托方
			deleteClient(index) {
				this.othercompanyJson.splice(index, 1);
			},
			//点击添加支付方
			addPayment(){
				this.payerJson.push(this.paymentListArr())
			},
			//点击删除支付方
			deletePayment(index) {
				this.payerJson.splice(index, 1);
			},
			//委托方列表
			clientListArr() {
				return {
				    companyName:'',
				    economicNatureId:'',
				    contactName:'',
				    contactMobile:'',
				    competentDepartment:'',
				    contactTelephone:'',
				    contactFax:''
			    }
			},
			//支付方列表
			paymentListArr() {
				return {
				    billName:'',
				    billEconomicNatureId:'',
				    contactName:'',
				    contactMobile:'',
				    competentDepartment:'',
				    contactTelephone:'',
				    contactFax:''
			    }
			},
			selectPerson(chargeAppraiser,contactPersonIndex){
				if(contactPersonIndex) {
					this.contactPersonObj.contactPersonIndex = contactPersonIndex;
					this.$refs.selectPersonDialog.showPersonDialog(chargeAppraiser, this.contactPersonObj[chargeAppraiser][contactPersonIndex + 'id'], this.contactPersonObj[chargeAppraiser][contactPersonIndex + 'name']);
				}
				this.$refs.selectPersonDialog.showPersonDialog(chargeAppraiser,this.ruleForm[chargeAppraiser+'Id'],this.ruleForm[chargeAppraiser+'Name']);
			},
			setPersonId(type,name,id){
				if(type === 'contactPerson') {
					//					if(isPerson) {
					//						//            this.$messageError("该联络人已存在");
					//						return
					//					} else {
					this.contactPersonObj.contactPerson[this.contactPersonObj.contactPersonIndex].id = id;
					this.contactPersonObj.contactPerson[this.contactPersonObj.contactPersonIndex].name = name;
					//					}
				} else {
					this.ruleForm[type + 'Id'] = id;
					this.ruleForm[type + 'Name'] = name;
				}
			},
			selectPersons(chargeAppraiser) {
				this.$refs.selectPersonsDialog.showPersonDialog(chargeAppraiser, this.form[chargeAppraiser], this.form[chargeAppraiser + 'Name']);
			},
			setPersonsId(type, name, id) {
				//如果选择人员不在同一个对象里
				//if(type == "afsdfs"){
				//this.aaa[type+'Id'] = id;
				//this.aaa[type+'Name'] = name;
				//}else{
				this.form[type] = id.join(',');
				this.form[type + 'Name'] = name.join(',');
				//}

			},
			//输入框输入验证提示
			inputChange(val){
				var reg = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
				var num = val.split('.');
				if(!reg.test(this[num[0]][num[1]])){
					this.$messageError('请输入只能是数字且小数点保留两位！');
					this[num[0]][num[1]] = parseFloat(this[num[0]][num[1]]);
                    this[num[0]][num[1]] = this[num[0]][num[1]].toFixed(2);
					return;
				}else{
					this[num[0]][num[1]] = parseFloat(this[num[0]][num[1]]);
                    this[num[0]][num[1]] = this[num[0]][num[1]].toFixed(2);
				}
			},
			//评估对象
			assessmentTargetEvent() {
				this.$refs.assessmentTargetDialog.showDialog();
				if(!this.assessObj.assessmentTarget.id) {
					this.assessObj.assessmentTarget.id = '1320'
				}else{
					this.assessObj.assessmentTarget.id = this.assessmentTarget;
				}
			},
			hendleAssessmentTarget(type) {
				const _this = this
				if(type) {
					const {
						assetType
					} = _this.assessObj.assessmentTarget
					_this.assessObj.assetTypehold = _this.ruleForm.assetType
					_this.ruleForm.assessmentTarget = _this.assessObj.assessmentTarget.id
					if(_this.assessObj.assessmentTarget.id === "1321") {
						_this.assessObj.assetTypeList = [...assetType]
					} else {
						_this.assessObj.assetTypeList = []
					}
				} else {
					if(_this.ruleForm.assessmentTarget === "1321") {
						const {
							assetTypeList
						} = _this.assessObj;
						_this.assessObj.assessmentTarget.assetType = [...assetTypeList];
					}
					_this.ruleForm.assetType = _this.assessObj.assetTypehold;
					_this.assessObj.assessmentTarget.id = _this.ruleForm.assessmentTarget
				}
				_this.$refs.assessmentTargetDialog.closeDialog()
			},
			contactPersonEvent() {
				if(!this.contactPersonObj.contactPerson.length) {
					this.contactPersonObj.contactPerson = [{
						id: '',
						name: ''
					}]
				}
				this.$refs.contactPersonDialog.showDialog();
			},
			//联络人
			handlePersonEvent(type) {
				if(type) {
					let repetition = false
					const idList = this.contactPersonObj.contactPerson.map(item => item.id);
					if(idList.length !== [...new Set(idList)].length) repetition = true;
					this.contactPersonObj.contactPerson = this.contactPersonObj.contactPerson.filter(item => item.id);
					this.contactPersonObj.contactPersonhold = this.copyContactPerson(this.contactPersonObj.contactPerson);
					var str = this.contactPersonObj.contactPerson;
					var name='',id='',arrId=[],arrName=[];
					for(var i in str){
						name=str[i].name;
						id=str[i].id;
						arrId.push(id);
						arrName.push(name)
//						this.form.contactPersonId = id;
					}
					var personIds = arrId.join(',');
					var personNames = arrName.join(',');
					console.log(personIds);
					this.form.contactPersonId = personIds;
					this.form.contactPersonName = personNames;
					if(repetition) return this.$messageError("请选择不同的联络人");
				} else {
					this.contactPersonObj.contactPersonhold = this.contactPersonObj.contactPersonhold.filter(item => item.id)
					this.contactPersonObj.contactPerson = this.copyContactPerson(this.contactPersonObj.contactPersonhold)
				}
				this.$refs.contactPersonDialog.closeDialog()

			},
			copyContactPerson(target) {
				const newObject = [];
				if(!target.length) {
					return newObject
				} else {
					target.forEach((item, index) => {
						newObject[index] = { ...item
						}
					})
					return newObject
				}
			},
			//表单方法
			removeDomain(index) {
				this.contactPersonObj.contactPerson.splice(index, 1)
				if(this.contactPersonObj.contactPerson.length === 0) {
					this.contactPersonObj.contactPersonIndex = 0
				}
			},
			addDomain() {
				this.contactPersonObj.contactPerson.push({
					id: '',
					name: ''
				});
			}
		},
		computed:{
			//计算预期合同价
			contract(){
				return this.ruleForm.projectExpenseExpect = (this.ruleForm.evaluationFeeExpect*100+this.ruleForm.travelExpenseExpect*100)/100;
			},
			showAssessmentTargetName() {
				const {
					id
				} = this.assessObj.assessmentTarget;
				const {
					assetTypeList
				} = this.assessObj;
				const {
					assessmentTarget
				} = this.objectList;
				const targetName = this.assessObj.assessmentTarget.name = assessmentTarget[id];
			
				if(id === "1320") {
					this.assessObj.assessmentTarget.assetType = Object.keys(this.objectList.assetType);
					return targetName
				}
				if(id === "1322") {
					this.ruleForm.assetType = this.assessObj.assetTypehold
				}
				this.assessObj.assessmentTarget.assetType = [...assetTypeList];
				return targetName
			},
			showAssessmentType() {
				let assessmentType = '';
				let assessmentId = "";
				switch(this.assessObj.assessmentTarget.id) {
					case '1322':
						assessmentType = this.objectList.assetType[this.ruleForm.assetType];
						assessmentId = this.ruleForm.assetType;
						assessmentId = assessmentId.length > 6 ? "" : this.ruleForm.assetType;
						break;
					case '1321':
						const newList = this.assessObj.assessmentTarget.assetType.sort((a, b) => a > b)
						newList.forEach(id => {
							assessmentType += this.objectList.assetType[id] + ',';
							assessmentId += id + ","
						});
						break;
					case '1320':
						assessmentId = "";
						break;
					default:
						break
				}
				//		    if(this.ruleForm.assessmentTarget.id !== '1322'){
				//          if(this.ruleForm.assessmentTarget.id === "1320"){assessmentId = ""}else {
				//            const newList = this.ruleForm.assessmentTarget.assetType.sort((a,b)=> a>b)
				//            newList.forEach(id =>{
				//              assessmentType+= this.objectList.assetType[id]+',';
				//              assessmentId+= id+","
				//            });
				//          }
				//        } else {
				//        }
				this.ruleForm.assetType = assessmentId;
				return assessmentType
			},
			isCheckBoxDisable() {
				return this.assessObj.assessmentTarget.id * 1 === 1320
			},
			contactPersonNames() {
				let pesonNames = '';
				this.contactPersonObj.contactPerson.forEach((person, index) => {
					if(index + 1 === this.contactPersonObj.contactPerson.length || !person.name) {
						pesonNames += person.name
					} else {
						pesonNames += person.name + ","
					}
				})
				return pesonNames
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.center-body {
		padding: 20px;
		.requiredInformation {
			min-height: 330px;
			background: rgba(255, 255, 255, 1);
			border-radius: 2px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			margin-bottom: 10px;
			input[type=number]::-webkit-inner-spin-button {
			  -webkit-appearance: none;
			}
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
		.projectmsg.add-client {
			height: 205px;
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
			li {
				float: left;
				margin-bottom: 10px;
				margin-left: 30px;
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
			padding: 10px 0;
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
		min-height: 40px;
		line-height: 40px;
	}
	.row-bg {
		padding: 10px 0;
	}
	.width240 {
		width: 240px;
		overflow: hidden;
		/deep/ .el-input {
			width: 120px;
			display: block;
			float: left
		}
	}
	.dynamicValidateForm {
		.el-form {
			/deep/ .el-form-item {
				height: 25px;
			}
			/deep/ .el-form-item__content {
				height: 25px;
				.el-input {
					margin-right: 10px;
					height: 25px;
					.el-input__inner {
						height: 25px !important;
						// display: inline
					}
				}
			}
			/deep/ .el-form-item__label {
				width: 25% !important;
				height: 25px !important;
				margin-top: 5px
			}
			/deep/ .el-form-item__content {
				margin-left: 0 !important;
			}
		}
	}
	.button-container {
		margin-top: 50px;
		text-align: center;
	}

	.icon-container {
		display: inline;
		font-size: 20px;
		.el-icon-delete {
			vertical-align: middle;
		}
		.el-icon-delete:hover {
			cursor: pointer
		}
	}
	.line {
		height: 1px;
		background-color: #000000;
		margin: 5px 0;
	}
	
</style>