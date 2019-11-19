<template>
	<div class="center-body">
		<!--必填信息-->
		<div class="requiredInformation">
			<div class="top">
				<img src="../../../../assets/common/must.png" />
				<span>必填信息</span>
			</div>
			<div>
				<el-form :model="ruleForm" :inline="true" :show-message="false" size="mini" label-position="right" :rules="rules" ref="ruleForm" label-width="105px">
					<el-form-item label="项目名称：" prop="projectName">
						<el-input placeholder="请输入项目名称" v-model="ruleForm.projectName" maxlength="100"></el-input>
					</el-form-item>
					<el-form-item label="项目简称：" prop="shortName">
						<el-input placeholder="请输入项目简称" v-model="ruleForm.shortName" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="评估基准日：" prop="assessmentBaseDate">
						<el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择评估基准日" v-model="ruleForm.assessmentBaseDate"></el-date-picker>
					</el-form-item>
					<el-form-item label="项目级别：" prop="projectLevelId">
						<el-select v-model="ruleForm.projectLevelId" placeholder="请选择项目级别">
							<el-option v-for="(item,i) in objectList.projectLevelId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目性质：" prop="projectNatureId">
						<el-select v-model="ruleForm.projectNatureId" placeholder="请选择项目性质">
							<el-option v-for="(item,i) in objectList.projectNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="上市公司：" prop="isListedCompany">
						<el-radio-group v-model="ruleForm.isListedCompany">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="评估对象：" prop="assessmentTarget">
						<div class="width240">
							<el-input readonly placeholder="请选择评估对象" @focus="assessmentTargetEvent" v-model="showAssessmentTargetName" :style="{width: assessObj.assessmentTarget.id && assessObj.assessmentTarget.id!== '1320' && (ruleForm.assetType.length || assessObj.assessmentTarget.assetType.length) ? '85px' : '240px'}"></el-input>
							<el-input readonly v-model="showAssessmentType" v-if="assessObj.assessmentTarget.id && assessObj.assessmentTarget.id!== '1320' && (ruleForm.assetType.length || assessObj.assessmentTarget.assetType.length)" :style="marginLeft"></el-input>
						</div>
					</el-form-item>
					<el-form-item label="报告类型：" prop="issueAssetsReport">
						<el-select v-model="ruleForm.issueAssetsReport" placeholder="请选择评估报告类型">
							<el-option v-for="(item,i) in objectList.assetReportTypeId" :label="item" :value="i" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="第一评估师：" prop="chargeAppraiserName">
						<el-input readonly placeholder="请选择第一签字评估师" v-model="ruleForm.chargeAppraiserName" @focus="selectPerson('chargeAppraiser')"></el-input>
					</el-form-item>
					<el-form-item label="第二评估师：" prop="appraiserUserName">
						<el-input readonly placeholder="请选择第二签字评估师" v-model="ruleForm.appraiserUserName" @focus="selectPerson('appraiserUser')"></el-input>
					</el-form-item>
					<el-form-item label="项目负责人：" prop="chargeLeaderName">
						<el-input readonly placeholder="请选择项目负责人" v-model="ruleForm.chargeLeaderName" @focus="selectPerson('chargeLeader')"></el-input>
					</el-form-item>
					<el-form-item label="评估目的：" prop="assessmentObjectiveId">
						<el-select filterable placeholder="请选择评估目的" v-model="ruleForm.assessmentObjectiveId">
							<el-option v-for="(item,i) in objectList.assessmentObjectiveId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="项目联络人：" prop="contactPersonNames">
						<el-input readonly v-model="contactPersonNames" @focus="contactPersonEvent" placeholder="请选择项目联络人"></el-input>
					</el-form-item>
					<el-form-item label="具体经济行为：" prop="economicBehaviorId">
						<el-select placeholder="请选择具体经济行为" v-model="ruleForm.economicBehaviorId">
							<el-option v-for="(item,i) in objectList.EconomicBehaviorId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<!-- <el-form-item label="预期评估费：" prop="evaluationFeeExpect">
						<el-input class="pv" placeholder="请输入预期评估服务费用" v-model="ruleForm.evaluationFeeExpect" @blur="inputChange('ruleForm.evaluationFeeExpect')"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="预期差旅费：" prop="travelExpenseExpect">
						<el-input class="pv" placeholder="请输入预期差旅费" v-model="ruleForm.travelExpenseExpect" @blur="inputChange('ruleForm.travelExpenseExpect')"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item> -->
					<el-form-item label="现场工作时间：" prop="workDaySite">
						<el-input class="pv" placeholder="请输入现场工作时间" v-model="ruleForm.workDaySite" @blur="inputDayChange('ruleForm.workDaySite')"></el-input>
						<span class="pa cpr-input">天</span>
					</el-form-item>
					<el-form-item label="预期合同价：" prop="projectExpenseExpect">
						<el-input class="pv" placeholder="请输入预期合同价" v-model="ruleForm.projectExpenseExpect" @blur="inputChange('ruleForm.projectExpenseExpect')" maxLength="10"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<!--选填信息-->
		<div class="optionalmsg">
			<div class="top">
				<img src="../../../../assets/common/optional.png" />
				<span>选填信息</span>
			</div>
			<div>
				<el-form :inline="true" size="mini" label-position="right" ref="form" :model="form" label-width="105px">
					<el-form-item label="承作机构：">
						<el-input readonly v-model="groupName" placeholder="请输入承作机构"></el-input>
					</el-form-item>
					<el-form-item label="更改基准日：">
						<el-radio-group v-model="form.ifChangeBaseDay">
							<el-radio label="1">是</el-radio>
							<el-radio label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="其他负责人：">
						<el-input readonly v-model="form.projectLeaderName" @focus="selectPersons('projectLeader')" placeholder="请选择项目其他负责人"></el-input>
					</el-form-item>
					<el-form-item label="交易买方：">
						<el-input v-model="form.tradeBuyer" placeholder="请输入交易买方" maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="交易卖方：">
						<el-input v-model="form.tradeSeller" placeholder="请输入交易卖方" maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="经济性质：">
						<el-select placeholder="请选择经济性质" v-model="form.billEconomicNatureId">
							<el-option label="请选择经济性质" :value="Number(0)"></el-option>
							<el-option v-for="(item,i) in objectList.billEconomicNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="涉及股权比例：">
						<el-input class="pv" v-model="form.tradeProportion" placeholder="请输入交易涉及股权比例" @blur="inputProportionChange('form.tradeProportion')"></el-input>
						<span class="pa cpr-input">%</span>
					</el-form-item>
					<el-form-item label="控制权转移：">
						<el-radio-group v-model="form.isPowerTransfer">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="经济性质改变：">
						<el-radio-group v-model="form.isNatureChange">
							<el-radio :label="Number(1)">改变</el-radio>
							<el-radio :label="Number(0)">不改变</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="矿权备案部门：">
						<el-input v-model="form.keepOnRecordDepartment" placeholder="请输入矿业权评估报告备案部门" maxlength="50"></el-input>
					</el-form-item>
					<el-form-item label="企业数量：">
						<el-input v-model="form.enterpriseNumber" maxlength="4" placeholder="请输入企业数量" @blur="inputNumberChange('form.enterpriseNumber')"></el-input>
					</el-form-item>
					<el-form-item label="分布城市数量：">
						<el-input v-model="form.cityNumber" maxlength="4" placeholder="请输入分布城市数量" @blur="inputNumberChange('form.cityNumber')"></el-input>
					</el-form-item>
					<el-form-item label="二级长投数量：">
						<el-input v-model="form.longInvestmentNumber" maxlength="4" placeholder="请输入二级长投数量" @blur="inputNumberChange('form.longInvestmentNumber')"></el-input>
					</el-form-item>
					<el-form-item label="土地使用权：">
						<el-radio-group v-model="form.involveLand">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="矿业权：">
						<el-radio-group v-model="form.involveMining">
							<el-radio :label="Number(1)">涉及</el-radio>
							<el-radio :label="Number(0)">不涉及</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="资产总额：">
						<el-input class="pv" v-model="form.totalAssets" placeholder="请输入资产总额" @blur="inputChange('form.totalAssets')" maxLength="10"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="净资产总额：">
						<el-input class="pv" v-model="form.totalNetAsset" placeholder="请输入净资产总额" @blur="inputChange('form.totalNetAsset','negative')" maxLength="10"></el-input>
						<span class="pa cpr-input">万元</span>
					</el-form-item>
					<el-form-item label="项目背景：" :style="styleAuto">
						<el-input type="textarea" v-model="form.projectBackgroud" placeholder="请输入项目背景" :style="styleObj" maxlength="500"></el-input>
					</el-form-item>
					<div class="title">集群项目创建：</div>
					<div class="subproject">
						<table-tree v-if="isShowTreeTable" :columns="columns" :tree-structure="true" :data-source="dataSource" v-on:addNodeFun='addNodeFun' v-on:deleteNodeFun='deleteNodeFun' :tableHeader="true" :defaultExpandAll="true"></table-tree>
					</div>
					<div class="add" @click="addSubProject()">+添加</div>
					<div>
						<div class="title">委托方信息：</div>
						<div class="content add-client" v-for="(item , i) in othercompanyJson" :key="i">
							<li>
								<label>{{nameArr[0]}}</label>
								<el-input v-model="item.companyName" placeholder="请输入委托方名称" maxlength="50"></el-input>
							</li>
							<li>
								<label>{{nameArr[1]}}</label>
								<el-select placeholder="请选择经济性质" v-model="item.economicNatureId">
									<el-option label="请选择经济性质" :value="Number(0)"></el-option>
									<el-option v-for="(item,i) in objectList.billEconomicNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
								</el-select>
							</li>
							<li>
								<label>{{nameArr[2]}}</label>
								<el-input v-model="item.contactName" placeholder="请输入姓名"></el-input>
							</li>
							<li>
								<label>{{nameArr[3]}}</label>
								<el-input v-model="item.contactMobile" placeholder="请输入手机" @blur="inputPhoneChange('item.contactMobile',i,othercompanyJson)"></el-input>
							</li>
							<li>
								<label>{{nameArr[4]}}</label>
								<el-input v-model="item.competentDepartment" placeholder="请输入主管部门"></el-input>
							</li>
							<li>
								<label>{{nameArr[5]}}</label>
								<el-input v-model="item.contactTelephone" placeholder="请输入电话" @blur="inputTelPhoneChange('item.contactTelephone',i,othercompanyJson)"></el-input>
							</li>
							<li>
								<label>{{nameArr[6]}}</label>
								<el-input v-model="item.contactFax" placeholder="请输入传真" @blur="inputFaxChange('item.contactFax',i,othercompanyJson)"></el-input>
							</li>
							<a @click="deleteClient(i)"><i class="iconfont icon-shanchu1"></i></a>
						</div>
						<div class="add" @click="addClient">+添加</div>
					</div>
					<div class="title">支付方信息：</div>
					<div class="content add-client" v-for="(item , i) in payerJson" :key="i">
						<li>
							<label>{{nameArr[0]}}</label>
							<el-input v-model="item.billName" placeholder="请输入评估方名称" maxlength="50"></el-input>
						</li>
						<li>
							<label>{{nameArr[1]}}</label>
							<el-select placeholder="请选择经济性质" v-model="item.billEconomicNatureId">
								<el-option label="请选择经济性质" :value="Number(0)"></el-option>
								<el-option v-for="(item,i) in objectList.billEconomicNatureId" :label="item" :value="Number(i)" :key="i"></el-option>
							</el-select>
						</li>
						<li>
							<label>{{nameArr[2]}}</label>
							<el-input v-model="item.contactName" placeholder="请输入姓名"></el-input>
						</li>
						<li>
							<label>{{nameArr[3]}}</label>
							<el-input v-model="item.contactMobile" placeholder="请输入手机" @blur="inputPhoneChange('item.contactMobile',i,payerJson)"></el-input>
						</li>
						<li>
							<label>{{nameArr[4]}}</label>
							<el-input v-model="item.competentDepartment" placeholder="请输入主管部门"></el-input>
						</li>
						<li>
							<label>{{nameArr[5]}}</label>
							<el-input v-model="item.contactTelephone" placeholder="请输入电话" @blur="inputTelPhoneChange('item.contactTelephone',i,payerJson)"></el-input>
						</li>
						<li>
							<label>{{nameArr[6]}}</label>
							<el-input v-model="item.contactFax" placeholder="请输入传真" @blur="inputFaxChange('item.contactFax',i,payerJson)"></el-input>
						</li>
						<a @click="deletePayment(i)"><i class="iconfont icon-shanchu1"></i></a>
					</div>
					<div class="add" @click="addPayment">+添加</div>
					<div class="title">合同附件信息：</div>
					<div class="add-client fileCont">
						<div class="contract-wrapper">
							<span class="title-item">合同附件信息：</span>
						</div>
						<el-upload class="upload-demo" action="/api/file/upload" :on-remove="delFile" :on-success="successFile" :data="fileData" :headers=fileObj :file-list="fileList" :class="fileList.length ? '' : 'no-border'" :before-upload="beforeAvatarUpload">
							<el-button class="dulibtn addFile" v-loading.fullscreen.lock="loading">合同上传</el-button>
						</el-upload>
					</div>
					<div class="title">立项申请信息：</div>
					<div class="content add-client projectmsg">
						<el-form-item label-width="129px" label="主要风险评估：" :style="styleLine">
							<el-input type="textarea" v-model="form.majorRisk" :style="styleObjTexra"></el-input>
						</el-form-item>
						<el-form-item label-width="129px" label="项目组人员专业胜任能力及独立性：" :style="styleLineItem">
							<el-input type="textarea" v-model="form.teamCapibility" :style="styleObjTexra"></el-input>
						</el-form-item>
						<el-form-item label-width="129px" label="重点难点问题：" :style="styleLine">
							<el-input type="textarea" v-model="form.mainProblem" :style="styleObjTexra"></el-input>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</div>
		<center-dialog ref="assessmentTargetDialog" dialogWidth='350px' dialogHeight="300px" dialogTitle="请选择评估对象" titlePosition="left">
			<div slot="dialogContent" class="assessmentTargetDialog">
				<el-radio-group v-model="assessObj.assessmentTarget.id">
					<el-radio :label="index" v-for="(target,index) in objectList.assessmentTarget" :key="index">{{target}}</el-radio>
					<div class="is-active"></div>
				</el-radio-group>
				<el-checkbox-group v-model="assessObj.assessmentTarget.assetType" v-if="assessObj.assessmentTarget.id !== '1322'">
					<el-checkbox :label="index" v-for="(assetType,index) in objectList.assetType" :disabled="isCheckBoxDisable" :key="index">{{assetType}}</el-checkbox>
				</el-checkbox-group>
				<el-radio-group v-model="ruleForm.assetType" v-else>
					<el-radio :label="index" v-for="(assetType,index) in objectList.assetType" :key="index">{{assetType}}</el-radio>
				</el-radio-group>
				<div class="button-container">
					<a class="search-btn" @click="hendleAssessmentTarget('',true)">确 定</a>
					<a class="reset-btn" @click="hendleAssessmentTarget('',false)">取 消</a>
				</div>
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
							<a class="add reset-btn" @click="addDomain" v-if="contactPersonObj.contactPerson.length < 5">+添加</a>
						</div>
					</el-form-item>
					<div v-if="contactPersonObj.contactPerson.length" class="button-container">
						<a class="search-btn" @click="handlePersonEvent(true)">确认</a>
						<a class="reset-btn" @click="handlePersonEvent(false)">取消</a>
					</div>
				</el-form>
			</div>
		</center-dialog>
		<person-dialog ref="selectPersonDialog" v-on:setPersonId="setPersonId"></person-dialog>
		<persons-dialog ref="selectPersonsDialog" v-on:setPersonId="setPersonsId"></persons-dialog>
	</div>
</template>

<script>
	import tableTree from '@/components/tableTree.vue';
	import personDialog from '@/components/personDialog';
	import centerDialog from '@/components/centerDialog.vue';
	import personsDialog from '@/components/personsDialog';
	export default {
		name: 'projectEditorMessage',
		components: {
			personDialog,
			centerDialog,
			personsDialog,
			tableTree
		},
		data() {
			const _this = this;
			// 项目联络人正则验证
			const contactPersonNameRules = (rule, value, callback) => {
				if(_this.contactPersonObj.contactPerson.length && _this.contactPersonObj.contactPerson[0].id) {
					callback();
				}else {
					callback(new Error());
				}
			};
			return {
				index: Math.round(new Date().getTime() / 1000),
				columns: [{
						text: '子项目名称',
						dataIndex: 'projectName',
						type: 'input'
					},
					{
						text: '子项目负责人',
						dataIndex: 'leaderUserNames',
						type: 'person'
					},
					{
						text: '操作',
						width: '60'
					}
				],
				dataSource: [],
				//临时数据
				dynamicValidateForm: {
					domains: [{
						value: ''
					}],
				},
				list: ['首开', '二开', '三开', '四开', '五开'],
				nameArr: ['名称：', '经济性质：', '姓名：', '手机：', '主管部门：', '电话：', '传真：'],
				isShow: true,
				styleObj: {
					width: "600px"
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
				styleLineItem: {
					width: "auto",
					lineHeight: "24px",
					marginBottom: "-1px"
				},
				marginLeft: {
					marginLeft: "5px"
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
					chargeLeaderId: '',
					chargeAppraiserName: '',
					chargeAppraiserId: '',
					appraiserUserName: '',
					appraiserUserId: '',
					economicBehaviorId: '',
// 					evaluationFeeExpect: '',
// 					travelExpenseExpect: '',
					projectExpenseExpect: '',
					id: '',
					contactPersonName: '',
					contactPersonId: '',
					assessmentObjectiveId: '',
					workDaySite:''
				},
				//评估对象
				assessObj: {
					assessmentTarget: {
						id: '',
						name: "",
						assetType: "",
					}, //绑定评估对象数据
					assetTypeList: [], //临时保存部分资产数组
					assetTypehold: '', //临时保存assetType
				},
				ruleFormChild: {},
				groupName: '',
				//选填项
				form: {
					ifChangeBaseDay: '',
					projectLeaderName: '',
					projectLeader: '',
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
					id: ''
				},
				contactPersonObj: {
					contactPerson: [{
						id: '',
						name: ''
					}], //联络人
					contactPersonhold: [],
					contactPersonIndex: 0
				},
				formChild: {},
				othercompanyJson: [],
				payerJson: [],
				//合同列表
				fileObj: {},
				fileList: [],
				jyBtn: true,
				fileData: {
					id: '',
					uploadToAliyun: 'no'
				},
				fileMsg: [],
				//必填项提示
				rules: {
					projectName: [{
						required: true,
						message: '请输入项目名称',
						trigger: 'blur'
					}],
					shortName: [{
						required: true,
						message: '请输入项目简称',
						trigger: 'blur'
					}],
					assessmentBaseDate: [{
						required: true,
						message: '请选择评估基准日',
						trigger: 'blur'
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
						trigger: 'change'
					}],
// 					evaluationFeeExpect: [{
// 						required: true,
// 						message: '请输入预期评估服务费用',
// 						trigger: 'blur'
// 					}],
// 					travelExpenseExpect: [{
// 						required: true,
// 						message: '请输入预期差旅费用',
// 						trigger: 'blur'
// 					}],
					projectExpenseExpect: [{
						required: true,
						message: '请输入预期合同价',
						trigger: 'change'
					}],
					assessmentObjectiveId: [{
						required: true,
						message: '请选择评估目的',
						trigger: 'change'
					}],
					workDaySite: [{
						required: true,
						message: '请输入现场工作时间',
						trigger: 'blur'
					}],
					contactPersonNames :[{
						validator: contactPersonNameRules,
						trigger: 'blur'
					}]
				},
				isShowTreeTable: true,
				loading:false
			}
		},
		created() {
			var _this = this;
			var id = this.$store.state.projectId;
			_this.backData(id);
			this.fileData.id = this.$store.state.projectId,
				this.fileObj = {
					token: _this.$getCookie('token')
				};
		},
		mounted() {
			var _this = this;
			if(JSON.parse(this.$getCookie("user")).groupType == 2) {
				this.groupName = JSON.parse(this.$getCookie("user")).parentGroupName;
			} else if(JSON.parse(this.$getCookie("user")).groupType == 1) {
				this.groupName = JSON.parse(this.$getCookie("user")).groupName;
			}
			this.$store.state.projectRuls = this.projectRuls;
			this.$refs.assessmentTargetDialog.closeDialog = this.hendleAssessmentTarget
		},
		methods: {
			//必填项验证
			projectRuls() {
				let isPassRules = false;
				this.$refs['ruleForm'].validate((valid) => {
					isPassRules = valid
				});
				return isPassRules
			},
			//回显数据
			backData(id) {
				var _this = this;
				this.$http.post('/api/projectRequest/setupFindProjectInfo', {
						projectId: id
					})
					.then((data) => {
						_this.othercompanyJson = data.data.otherCompanyInfoList;
						_this.payerJson = data.data.projectPayerList;
						_this.ruleFormChild = data.data.project;
						_this.formChild = data.data.project;
						_this.dataSource = data.data.colonyProjectList;
						for(var i in _this.ruleForm) {
							_this.ruleForm[i] = _this.ruleFormChild[i];
						}
						for(var i in _this.form) {
							_this.form[i] = _this.formChild[i];
						}
						//处理评估对象数据回显
						_this.assessObj.assessmentTarget.id = _this.ruleForm.assessmentTarget = _this.ruleForm.assessmentTarget + '';
						if(_this.ruleForm.assessmentTarget == '1320') {
							//整体
							_this.assessObj.assessmentTarget.assetType = [];
							_this.assessObj.assetTypeList = [];
							_this.assessObj.assetTypehold = '';
						} else if(_this.ruleForm.assessmentTarget == '1321') {
							//部分
							var str = _this.ruleForm.assetType;
							var arr = str.split(',');
							_this.assessObj.assessmentTarget.assetType = arr;
							_this.assessObj.assetTypeList = arr;
							_this.assessObj.assetTypehold = '';
						} else if(_this.ruleForm.assessmentTarget == '1322') {
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
						for(var i in nameArr) {
							var obj = {};
							obj.name = nameArr[i];
							obj.id = idArr[i];
							arr.push(obj);
						}
						_this.contactPersonObj.contactPerson = arr;
						//合同
						if(data.data.contractDocList) {
							var arr = [];
							for(var i in data.data.contractDocList) {
								var obj = {},
									objlist = {};
								obj.name = data.data.contractDocList[i].fileName;
								obj.url = data.data.contractDocList[i].filePath;
								obj.id = data.data.contractDocList[i].id;
								arr.push(obj);
								objlist.fileName = data.data.contractDocList[i].fileName;
								objlist.filePath = data.data.contractDocList[i].filePath;
								objlist.id = data.data.contractDocList[i].id;
								_this.fileMsg.push(objlist);
							}
							_this.fileList = arr;

						}
						_this.ruleForm.contactPersonName = data.data.contactPersonName;
						_this.ruleForm.contactPersonId = data.data.contactPersonId;
						_this.ruleForm.chargeAppraiserName = data.data.chargeAppraiserName;
						_this.ruleForm.appraiserUserName = data.data.appraiserUserName;
						_this.ruleForm.chargeLeaderName = data.data.chargeLeaderName;
						_this.ruleForm.chargeAppraiserId = data.data.chargeAppraiserList;
						_this.ruleForm.appraiserUserId = data.data.projectAppraiserList;
						_this.ruleForm.chargeLeaderId = data.data.chargeLeaderList;
						_this.form.projectLeader = data.data.projectLeaderIds;
						_this.form.projectLeaderName = data.data.projectLeaderName;
						_this.$store.state.isEditorPerson = data.data.isEditorPerson;
						_this.$store.state.setupProjectJson = _this.ruleForm;
						_this.$store.state.otherProjectJson = _this.form;
						_this.$store.state.otherCompanyJson = _this.othercompanyJson;
						_this.$store.state.payerJson = _this.payerJson;
						_this.$store.state.subProjectJson = _this.dataSource;
						_this.$store.state.contractDocJson = _this.fileMsg;
						_this.$nextTick(() => {
							_this.$refs['ruleForm'].clearValidate(['projectName', 'shortName', 'assessmentBaseDate', 'assessmentTarget', 'projectLevelId', 'projectNatureId', 'issueAssetsReport',
								'isListedCompany', 'chargeLeaderName', 'chargeAppraiserName', 'appraiserUserName', 'economicBehaviorId', 'assessmentObjectiveId', 'workDaySite', 'projectExpenseExpect',
							])
						})
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
			addPayment() {
				this.payerJson.push(this.paymentListArr())
			},
			//点击删除支付方
			deletePayment(index) {
				this.payerJson.splice(index, 1);
			},
			//委托方列表
			clientListArr() {
				return {
					companyName: '',
					economicNatureId: '',
					contactName: '',
					contactMobile: '',
					competentDepartment: '',
					contactTelephone: '',
					contactFax: '',
				}
			},
			//支付方列表
			paymentListArr() {
				return {
					billName: '',
					billEconomicNatureId: '',
					contactName: '',
					contactMobile: '',
					competentDepartment: '',
					contactTelephone: '',
					contactFax: '',
				}
			},
			selectPerson(chargeAppraiser, contactPersonIndex) {
				if(contactPersonIndex) {
					this.contactPersonObj.contactPersonIndex = contactPersonIndex;
					this.$refs.selectPersonDialog.showPersonDialog(chargeAppraiser, this.contactPersonObj[chargeAppraiser][contactPersonIndex + 'id'], this.contactPersonObj[chargeAppraiser][contactPersonIndex + 'name']);
				}
				this.$refs.selectPersonDialog.showPersonDialog(chargeAppraiser, this.ruleForm[chargeAppraiser + 'Id'], this.ruleForm[chargeAppraiser + 'Name']);
			},
			setPersonId(type, name, id) {
				if(type === 'contactPerson') {
					this.contactPersonObj.contactPerson[this.contactPersonObj.contactPersonIndex].id = id;
					this.contactPersonObj.contactPerson[this.contactPersonObj.contactPersonIndex].name = name;
				} else {
					this.ruleForm[type + 'Id'] = id;
					this.ruleForm[type + 'Name'] = name;
				}
			},
			selectPersons(chargeAppraiser) {
				this.$refs.selectPersonsDialog.showPersonDialog(chargeAppraiser, this.form[chargeAppraiser], this.form[chargeAppraiser + 'Name']);
			},
			setPersonsId(type, name, id) {
				this.form[type] = id.join(',');
				this.form[type + 'Name'] = name.join(',');
			},
			//天数输入框验证提示
			inputDayChange(val) {
				var reg = /^[0-9]\d*$/;
				var num = val.split('.');
				if((this[num[0]][num[1]]) && !isNaN(this[num[0]][num[1]])) {
					if(!reg.test(this[num[0]][num[1]])) {
						this.$message({
							showClose: true,
							message: '请输入整数!',
							type: 'error'
						});
						this[num[0]][num[1]] = parseInt(this[num[0]][num[1]]);
						return;
					}
				} else if(isNaN(this[num[0]][num[1]])) {
					this.$message({
						showClose: true,
						message: '请输入整数!',
						type: 'error'
					});
					this[num[0]][num[1]] = '';
					return
				}
			},
			//金额输入框输入验证提示
			inputChange(val,negative) {
				if(negative){
					var reg = /^(-?[1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
				}else{
					var reg = /^([1-9][\d]{0,9}|0)(\.[\d]{1,2})?$/;
				}
				
				var num = val.split('.');
				if((this[num[0]][num[1]]) && !isNaN(this[num[0]][num[1]])) {
					if(!reg.test(this[num[0]][num[1]])) {
						this.$message({
							showClose: true,
							message: '请输入数字且小数点保留两位!',
							type: 'error'
						});
						this[num[0]][num[1]] = parseFloat(this[num[0]][num[1]]);
						this[num[0]][num[1]] = this[num[0]][num[1]].toFixed(2);
						return;
					} else {
						this[num[0]][num[1]] = parseFloat(this[num[0]][num[1]]);
						this[num[0]][num[1]] = this[num[0]][num[1]].toFixed(2);
					}
				} else if(isNaN(this[num[0]][num[1]])) {
					this.$message({
						showClose: true,
						message: '请输入数字且小数点保留两位!',
						type: 'error'
					});
					this[num[0]][num[1]] = '';
				}
			},
			//比例验证
			inputProportionChange(val) {
				var reg = /^(\d{1,2}(\.\d+)?|100)$/;
				var num = val.split('.');
				if((this[num[0]][num[1]]) && !isNaN(this[num[0]][num[1]])) {
					if(!reg.test(this[num[0]][num[1]])) {
						this.$message({
							showClose: true,
							message: '请输入0-100的数!',
							type: 'error'
						});
						return;
					}
				} else if(isNaN(this[num[0]][num[1]])) {
					this.$message({
						showClose: true,
						message: '请输入0-100的数!',
						type: 'error'
					});
					this[num[0]][num[1]] = '';
					return
				}
			},
			//数量输入框的验证提示
			inputNumberChange(val) {
				var reg = /^[0-9]\d*$/;
				var num = val.split('.');
				if((this[num[0]][num[1]]) && !isNaN(this[num[0]][num[1]])) {
					if(!reg.test(this[num[0]][num[1]])) {
						this.$message({
							showClose: true,
							message: '请输入整数!',
							type: 'error'
						});
						this[num[0]][num[1]] = parseInt(this[num[0]][num[1]]);
						return;
					}
				} else if(isNaN(this[num[0]][num[1]])) {
					this.$message({
						showClose: true,
						message: '请输入整数!',
						type: 'error'
					});
					this[num[0]][num[1]] = '';
					return
				}
			},
			//手机号验证
			inputPhoneChange(val, index, arr) {
				var reg = /^1[3|4|5|7|8][0-9]{9}$/;
				var num = val.split('.');
				if((arr[index][num[1]]) && !isNaN(arr[index][num[1]])) {
					if(!reg.test(arr[index][num[1]])) {
						this.$messageError('手机号码格式不正确！');
						arr[index][num[1]] = '';
						return;
					}
				} else if(isNaN(arr[index][num[1]])) {
					this.$messageError('手机号码格式不正确！');
					arr[index][num[1]] = '';
					return;
				}
			},
			//电话号验证
			inputTelPhoneChange(val, index, arr) {
				var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
				var num = val.split('.');
				if(arr[index][num[1]]) {
					if(!reg.test(arr[index][num[1]])) {
						this.$messageError('电话号码格式不正确！');
						arr[index][num[1]] = '';
						return;
					}
				} else if(isNaN(arr[index][num[1]])) {
					this.$messageError('电话号码格式不正确！');
					arr[index][num[1]] = '';
					return;
				}
			},
			//传真号验证
			inputFaxChange(val, index, arr) {
				var reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
				var num = val.split('.');
				if(arr[index][num[1]]) {
					if(!reg.test(arr[index][num[1]])) {
						this.$messageError('传真号码格式不正确！');
						arr[index][num[1]] = '';
						return;
					}
				} else if(isNaN(arr[index][num[1]])) {
					this.$messageError('传真号码格式不正确！');
					arr[index][num[1]] = '';
					return;
				}
			},
			//评估对象
			assessmentTargetEvent() {
				this.$refs.assessmentTargetDialog.showDialog();
				if(!this.assessObj.assessmentTarget.id) {
					this.assessObj.assessmentTarget.id = '1320'
				} else {
					this.assessObj.assessmentTarget.id = this.ruleForm.assessmentTarget + '';
				}
			},
			hendleAssessmentTarget(event, type) {
				const _this = this;
				if(type) {
					const {
						assetType
					} = _this.assessObj.assessmentTarget;
					if(_this.assessObj.assessmentTarget.id === "1320") {
						_this.assessObj.assetTypeList = []
					} else if(_this.assessObj.assessmentTarget.id === "1321") {
						if(assetType.length < 2) {
							return this.$messageError("请选择至少两个评估对象");
						} else {
							_this.assessObj.assetTypeList = [...assetType];
						}
					} else if(_this.assessObj.assessmentTarget.id === "1322" && !_this.ruleForm.assetType) {
						return this.$messageError("请选择至少一个评估对象")
					} else {
						_this.assessObj.assetTypeList = []
					}
					_this.assessObj.assetTypehold = _this.ruleForm.assetType;
					_this.ruleForm.assessmentTarget = _this.assessObj.assessmentTarget.id;
				} else {
					if(_this.ruleForm.assessmentTarget + '' === "1321") {
						const {
							assetTypeList
						} = _this.assessObj;
						_this.assessObj.assessmentTarget.assetType = [...assetTypeList];
					}
					_this.ruleForm.assetType = _this.assessObj.assetTypehold;
					_this.assessObj.assessmentTarget.id = _this.ruleForm.assessmentTarget
				}
				_this.$refs.assessmentTargetDialog.dialogFlag = false
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
					const idList = this.contactPersonObj.contactPerson.map((item, index) => {
						if(item.id) {
							return item.id
						} else {
							return index + 'index'
						}
					});
					if(idList.length !== [...new Set(idList)].length) repetition = true;
					this.contactPersonObj.contactPerson = this.contactPersonObj.contactPerson.filter(item => item.id);
					this.contactPersonObj.contactPersonhold = this.copyContactPerson(this.contactPersonObj.contactPerson);
					var str = this.contactPersonObj.contactPerson;
					//处理数据
					var name = '',
						id = '',
						arrId = [],
						arrName = [];
					for(var i in str) {
						name = str[i].name;
						id = str[i].id;
						arrId.push(id);
						arrName.push(name);
					}
					var personIds = arrId.join(',');
					var personNames = arrName.join(',');
					this.ruleForm.contactPersonId = personIds;
					this.ruleForm.contactPersonName = personNames;
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
			},
			//添加集群项目某一行
			addNodeFun(val) {
				console.log(val);
				val.row.children.push({
					cid: this.index++,
					parentId: val.row.cid,
					projectName: '',
					leaderUserNames: '',
					leaderUserIds: '',
					projectNumber: '',
					children: []
				});
				this.isShowTreeTable = false; //销毁组件
				this.$nextTick(() => {
					this.isShowTreeTable = true; //重建组件
				});
			},
			//添加集群项目最外层
			addSubProject() {
				this.dataSource.push({
					cid: this.index++,
					parentId: '0',
					projectName: '',
					leaderUserNames: '',
					leaderUserIds: '',
					projectNumber: '',
					children: []
				});
				this.isShowTreeTable = false; //销毁组件
				this.$nextTick(() => {
					this.isShowTreeTable = true; //重建组件
				});
			},
			//删除集群项目
			deleteNodeFun(val) {
				var _this = this;
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					_this.getArray(_this.dataSource, val.row.cid);
					this.isShowTreeTable = false; //销毁组件
					this.$nextTick(() => {
						this.isShowTreeTable = true; //重建组件
					});
					this.$message({
						showClose: true,
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
// 					this.$message({
// 						showClose: true,
// 						type: 'info',
// 						message: '已取消删除'
// 					})
				})
			},
			getArray(arr, id) {
				arr.forEach((item, val) => {
					if(item.cid == id) {
						arr.splice(val, 1);
						return;
					} else if(item.children.length > 0) {
						this.getArray(item.children, id);
					}
				})
			},
			//合同上传成功回调
			successFile(response, file, fileList) {
				if(response.code == 200){
					this.loading = false;
				}
				var arr = [];
				this.fileList = fileList;
				for(var i in fileList) {
					var fobj = {};
					if(fileList[i].id) {
						fobj.fileName = fileList[i].name;
						fobj.filePath = fileList[i].url;
						fobj.id = fileList[i].id;
					} else {
						fobj.fileName = fileList[i].response.data.fileName;
						fobj.filePath = fileList[i].response.data.fileDir;
					}
					arr.push(fobj)
				}
				this.$store.state.contractDocJson = arr;
			},
			//合同上传删除回调
			delFile(file, fileList) {
				var arr = [];
				this.fileList = fileList;
				for(var i in fileList) {
					var fobj = {};
					if(fileList[i].id) {
						fobj.fileName = fileList[i].name;
						fobj.filePath = fileList[i].url;
						fobj.id = fileList[i].id;
					} else {
						fobj.fileName = fileList[i].response.data.fileName;
						fobj.filePath = fileList[i].response.data.fileDir;
					}
					arr.push(fobj)
				}
				this.$store.state.contractDocJson = arr;
			},
			beforeAvatarUpload(file){
				this.loading = true;
			}
		},
		computed: {
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
				switch(id) {
					case "1320":
						this.assessObj.assessmentTarget.assetType = Object.keys(this.objectList.assetType);
						return targetName;
					case "1322":
						this.ruleForm.assetType = this.assessObj.assetTypehold;
						return targetName;
					case "1321":
						this.assessObj.assessmentTarget.assetType = [...assetTypeList];
						return targetName;
					default:
						return ""
				}
			},
			showAssessmentType() {
				let assessmentType = '';
				let assessmentId = "";
				switch(this.assessObj.assessmentTarget.id + '') {
					case '1322':
						assessmentType = this.objectList.assetType[this.ruleForm.assetType];
						assessmentId = this.ruleForm.assetType;
						assessmentId = assessmentId.length > 6 ? "" : this.ruleForm.assetType;
						break;
					case '1321':
						assessmentType = [];
						assessmentId = [];
						const newList = this.assessObj.assessmentTarget.assetType.sort((a, b) => a > b)
						newList.forEach(id => {
							assessmentType.push(this.objectList.assetType[id]);
							assessmentId.push(id);
						});
						assessmentType = assessmentType.join(",");
						assessmentId = assessmentId.join(",");
						break;
					case '1320':
						assessmentId = "";
						break;
					default:
						break
				}

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
		.subproject {
			width: 680px;
			margin-left: 25px;
			margin-bottom: 10px;
			/deep/ .el-table__body-wrapper {
				.el-table__row:hover>td {
					background-color: #FFF5EB !important;
				}
				.input:focus {
					outline: none;
					border: 1px solid #88C6FF;
					background-color: #ffffff;
				}
			}
		}
		.cpr-input {
			top: 1px;
			right: 10px;
			font-size: 13px;
		}
		.projectmsg.add-client {
			height: 205px;
			padding-top: 5px;
		}
		.content {
			width: 698px;
			min-height: 125px;
			background: rgba(249, 249, 249, 1);
			margin-left: 12px;
			margin-bottom: 15px;
			padding-top: 15px;
			label {
				width: 105px;
				font-size: 13px;
			}
			li {
				float: left;
				margin-left: 20px;
				line-height: 35px;
			}
			.el-input,
			.el-select {
				width: 150px;
			}
			li:first-child {
				margin-left: 46px;
				.el-input {
					width: 578px;
				}
			}
			a {
				float: right;
				margin-right: 10px;
				margin-top: -24px;
				i {
					color: #ccc;
				}
				i:hover {
					color: #F7B543;
				}
			}
		}
		.fileCont {
			min-height: 18px;
			position: relative;
			width: 680px;
			.upload-demo {
				margin-left: 24px;
				/deep/ .el-upload-list__item {
					margin-top: 0;
				}
			}
			.contract-wrapper {
				background: rgba(249, 249, 249, 1);
				width: 680px;
				margin-left: 24px;
				padding: 15px 0;
				.title-item {
					font-size: 13px;
					margin-left: 10px;
				}
			}
			/deep/ .el-upload-list {
				background: #fff;
				width: 680px;
				border: 1px rgba(220, 220, 220, 1) dashed;
				margin: -12px 24px 0 0;
				padding: 5px 15px;
				box-sizing: border-box;
			}
			.no-border {
				/deep/ .el-upload-list {
					border: 0;
				}
			}
		}
		.addFile {
			font-size: 13px;
			padding: 7px 6px;
			color: #3A80EC;
			border-color: #3A80EC;
			position: absolute;
			top: 9px;
			left: 122px;
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
		/deep/ .el-input:last-child {
			width: 150px;
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
		position: absolute;
		left: 0;
		right: 0;
		bottom: 20px;
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
	
	.assessmentTargetDialog {
		margin-left: -10px;
		.el-radio-group:nth-child(1) {
			width: 100%;
			text-align: center;
			.el-radio {
				margin: 10px 20px;
			}
			/deep/ label.is-checked>span:last-child:after {
				content: '';
				width: 80%;
				height: 5px;
				background-image: url("../../../../../static/img/project_triangle1.png");
				background-position: center;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				display: block;
				position: absolute;
				bottom: -8px;
				left: 25px;
			}
		}
		.el-radio-group:nth-child(2) {
			margin-left: 2px;
		}
		.el-radio-group {
			.el-radio {
				width: 20%;
				margin: 6px 20px 6px 21px;
			}
		}
		.el-checkbox-group {
			margin-left: 2px;
			.el-checkbox {
				width: 20%;
				margin: 5px 20px 5px 21px;
			}
		}
	}
	
	/deep/ .el-date-editor.el-input,
	.el-date-editor.el-select {
		width: 240px;
		font-size: 13px;
	}
	
	.line {
		height: 1px;
		background-color: #000000;
		margin: 5px 0;
	}
</style>