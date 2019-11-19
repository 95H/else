<template>
  <div class="onlineOperation">
    <div class="asset-holder">
      <el-form  :model="onlineOperationData" :label-position="labelPosition"
                label-width="130px" class="demo-ruleForm" :rules="assetOwnerRules" ref="assetForm" :disabled="isRead">
        <el-form-item label="资产占有方中文名称：" label-width="130px" prop="name">
          <el-input v-model="onlineOperationData.name" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="资产占有方英文名称：" label-width="130px" prop="possessionEnglishName">
          <el-input v-model="onlineOperationData.possessionEnglishName" maxlength="100"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="经济性质：">
              <el-select v-model="onlineOperationData.economicNature">
                <el-option
                  v-for="item in economicNature"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属行业：">
              <el-select v-model="onlineOperationData.industryOwned">
                <el-option
                  v-for="item in industries"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级主管部门：">
              <el-input v-model="onlineOperationData.competentDepartment" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主管税务机关：">
              <el-input v-model="onlineOperationData.taxAuthority" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="主管工商机关：">
              <el-input v-model="onlineOperationData.businessAuthority" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照号码：" prop="licenseNumber">
              <el-input v-model="onlineOperationData.licenseNumber" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批准机关：">
              <el-input v-model="onlineOperationData.approvalAuthority" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证书号码：" prop="certificateNumber">
              <el-input v-model="onlineOperationData.certificateNumber" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册日期：">
              <el-date-picker
                v-model="onlineOperationData.registrationDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经营期限：">
              <el-date-picker
                v-model="onlineOperationData.operatingPeriod"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                class="modify-background-hook">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开业日期：">
              <el-date-picker
                v-model="onlineOperationData.openingDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="休假日：">
              <el-input v-model="onlineOperationData.daysOff" maxlength="100"></el-input>
              <!--<el-date-picker
                v-model="onlineOperationData.daysOff"
                type="date"
                placeholder="选择日期">
              </el-date-picker>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="财务结账日：">
              <el-input v-model="onlineOperationData.closingDay" maxlength="100"></el-input>
              <!--<el-date-picker
                v-model="onlineOperationData.closingDay"
                type="date"
                placeholder="选择日期">
              </el-date-picker>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会计制度：">
              <el-input v-model="onlineOperationData.accountingSystem" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="asset-holder represent">
      <el-form  :model="onlineOperationData" :label-position="labelPosition"
                label-width="130px" :rules="assetOwnerRules" ref="assetHolderForm" :disabled="isRead">
        <el-row>
          <el-col :span="12">
            <el-form-item label="法定代表人：">
              <el-input v-model="onlineOperationData.legalPerson" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人手机：" prop="legalPersonMobile">
              <el-input v-model="onlineOperationData.legalPersonMobile" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总经理：">
              <el-input v-model="onlineOperationData.generalManager" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总经理手机：" prop="generalManagerMobile">
              <el-input v-model.checkNumber="onlineOperationData.generalManagerMobile" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="财务负责人姓名：">
              <el-input v-model="onlineOperationData.financeName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="财务负责人手机：" prop="financeMobile">
              <el-input v-model="onlineOperationData.financeMobile" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目联系人姓名：" >
              <el-input v-model="onlineOperationData.projectLeaderName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目联系人手机：" prop="projectLeaderMobile">
              <el-input v-model="onlineOperationData.projectLeaderMobile" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人姓名：">
              <el-input v-model="onlineOperationData.contactName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人手机：" prop="contactMobile">
              <el-input v-model="onlineOperationData.contactMobile" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人电话：" prop="contactPhone" class="contact-hook">
              <el-input v-model="onlineOperationData.contactPhone" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人传真：" prop="contactFax">
              <el-input v-model="onlineOperationData.contactFax" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="region">
          <el-col :span="8">
            <el-form-item label="法定地址：">
              <el-select v-model="onlineOperationData.legalAddressProvince" placeholder="请选择" @change="chooseProvince(1, $event, 'legal')" >
                <el-option
                  v-if="address.province.length"
                  v-for="item in address.province"
                  :key= "item.id"
                  :label="item.areaName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="onlineOperationData.legalAddressCity" placeholder="请选择" @change="chooseProvince(2, $event, 'legal')">
                <el-option
                  v-if="address.city.length"
                  v-for="item in address.city"
                  :key= "item.id"
                  :label="item.areaName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="onlineOperationData.legalAddressArea" placeholder="请选择" >
                <el-option
                  v-if="address.area.length"
                  v-for="item in address.area"
                  :key= "item.id"
                  :label="item.areaName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="address">
          <el-col :span="14">
            <el-form-item label="街道：">
              <el-input v-model="onlineOperationData.legalAddressStreet" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮政编码：" prop="legalAddressZipCode">
              <el-input v-model="onlineOperationData.legalAddressZipCode" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="region">
          <el-col :span="8">
            <el-form-item label="办公地址：">
              <el-select v-model="onlineOperationData.officeAddressProvince" placeholder="请选择" @change="chooseProvince(1, $event, 'office')" >
                <el-option
                  v-if="officeAddress.province.length"
                  v-for="item in officeAddress.province"
                  :key= "item.id"
                  :label="item.areaName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="onlineOperationData.officeAddressCity" placeholder="请选择" @change="chooseProvince(2, $event, 'office')">
                <el-option
                  v-if="officeAddress.city.length"
                  v-for="item in officeAddress.city"
                  :key= "item.id"
                  :label="item.areaName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select v-model="onlineOperationData.officeAddressArea" placeholder="请选择" >
                <el-option
                  v-if="officeAddress.area.length"
                  v-for="item in officeAddress.area"
                  :key= "item.id"
                  :label="item.areaName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="address">
          <el-col :span="14">
            <el-form-item label="街道：">
              <el-input v-model="onlineOperationData.officeAddressStreet" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮政编码：" prop="officeAddressZipCode">
              <el-input v-model="onlineOperationData.officeAddressZipCode" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="asset-holder investment">
      <el-form  :model="onlineOperationData" :label-position="labelPosition"
                label-width="130px" :rules="investmentAmountRules" ref="investmentForm" :disabled="isRead">
        <el-row>
          <el-col :span="12">
            <el-form-item label="总资产额："  prop="totalAssets">
              <el-input  v-model="onlineOperationData.totalAssets" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="净资产额：" prop="netAssets">
              <el-input v-model="onlineOperationData.netAssets" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="营业收入：" prop="businessIncome">
              <el-input v-model="onlineOperationData.businessIncome" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税后利润：" prop="postTaxProfit">
              <el-input v-model="onlineOperationData.postTaxProfit" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="investor-list-wrapper">
          <span class="investor-label">主要投资者（股东）：</span>
          <ul class="investor-list">
            <li class="investor-list-item" :class="{forbidUpdate: isRead}"
                v-for="(item, index) in investorInformationData" :key="index" @click="updateData(true, index)">
              <div class="investorInformation">
                <i class="close iconfont icon-shanchu"  :class="{forbidUpdate: isRead}" @click.stop="deleteInvestorInformation(item,index,true)"></i>
                <p><span class="investorInformation-tit">名称：</span><span class="investorInformation-val name textOverflow1" :title="item.name">{{item.name}}</span></p>
                <p><span class="investorInformation-tit">注册资本金额：</span><span class="investorInformation-val textOverflow1" :title="item.registerAmount">{{item.registerAmount ? item.registerAmount : 0}}万元</span></p>
                <p><span class="investorInformation-tit">注册资本出资比例：</span><span class="investorInformation-val textOverflow1" :title="item.registerRatio">{{item.registerRatio ? item.registerRatio : 0}}%</span></p>
                <p><span class="investorInformation-tit">实收资本金额：</span><span class="investorInformation-val textOverflow1" :title="item.actualAmount">{{item.actualAmount ? item.actualAmount : 0}}万元</span></p>
                <p><span class="investorInformation-tit">实收资本出资比例：</span><span class="investorInformation-val textOverflow1" :title="item.actualRatio">{{item.actualRatio ? item.actualRatio : 0}}%</span></p>
              </div>
            </li>
            <li class="investor-list-item" v-if="!isRead">
              <div class="investorInformation add-investorInformation" @click="showDialog(true, 1)">
                <p><span class="investorInformation-tit"><i class="el-icon-plus"></i></span></p>
                <p>添加主要投资人（股东）信息</p>
              </div>
            </li>
            <center-dialog ref= "investorCenterDialog" :dialogTitle="dialogHead" :dialogHeight="'350px'">
              <template slot="dialogContent">
                <el-form :model="investorInformation" :label-width="formLabelWidth" :rules="investorRules"
                         :hide-required-asterisk="true" ref="investorForm" :disabled="isRead">
                  <el-form-item label="名称：" class="necessary-item" prop="name">
                    <el-input v-model="investorInformation.name" maxlength="100"></el-input>
                  </el-form-item>
                  <el-form-item label="注册资本金额：" class="account" prop="registerAmount">
                    <el-input v-model="investorInformation.registerAmount" maxlength="100"></el-input>
                  </el-form-item>
                  <el-form-item label="注册资本比例：" class="rate" prop="registerRatio">
                    <el-input v-model="investorInformation.registerRatio" maxlength="100"></el-input>
                  </el-form-item>
                  <el-form-item label="实收资本金额：" class="account" prop="actualAmount">
                    <el-input v-model="investorInformation.actualAmount" maxlength="100"></el-input>
                  </el-form-item>
                  <el-form-item label="实收资本出资比例：" class="rate" prop="actualRatio">
                    <el-input v-model="investorInformation.actualRatio" maxlength="100"></el-input>
                  </el-form-item>
                </el-form>
                <div class="dialog-footer">
                  <a class="search-btn" @click="addInvestorInformation(true)">保存</a>
                  <a class="reset-btn" @click="showDialog(false)">取消</a>
                </div>
              </template>
            </center-dialog>
          </ul>
        </div>
      </el-form>
    </div>
    <div class="asset-holder investment invest-company">
      <div class="investor-list-wrapper">
        <span class="investor-label">主要长期投资单位 <br> &nbsp;&nbsp;&nbsp;(或异地分支机构)：</span>
        <ul class="investor-list">
          <li class="investor-list-item" v-for="(item, index) in investorCompanyData" :class="{forbidUpdate: isRead}"
              :key="index" @click="updateData(false, index)">
            <div class="investorInformation">
              <i class="close iconfont icon-shanchu"  :class="{forbidUpdate: isRead}" @click.stop="deleteInvestorInformation(item,index,false)"></i>
              <p><span class="investorInformation-tit">名称：</span><span class="investorInformation-val name textOverflow1" :title="item.name">{{item.name}}</span></p>
              <p><span class="investorInformation-tit">地址：</span><span class="investorInformation-val name textOverflow1" :title="item.address">{{item.address}}</span></p>
              <p><span class="investorInformation-tit">注册资金：</span><span class="investorInformation-val textOverflow1" :title="item.registerAmount + '万元'">{{item.registerAmount ? item.registerAmount : 0}}万元</span></p>
              <p><span class="investorInformation-tit">持股比例：</span><span class="investorInformation-val textOverflow1" :title="item.holdRatio">{{item.holdRatio ? item.holdRatio : 0}}%</span></p>
              <p><span class="investorInformation-tit">核算方式：</span><span class="investorInformation-val textOverflow1" :title="item.accountingMode">{{item.accountingMode}}</span></p>
            </div>
          </li>
          <li class="investor-list-item" v-if="!isRead">
            <div class="investorInformation add-investorInformation" @click="showDialog(true, 2)">
              <p><span class="investorInformation-tit"><i class="el-icon-plus"></i></span></p>
              <p>主要长期投资单位（或异地分支机构）</p>
            </div>
          </li>
          <center-dialog ref= "investorCompanyCenterDialog" :dialogTitle="dialogHead" :dialogHeight="'350px'">
            <template slot="dialogContent">
              <el-form :model="investorCompanyInformation" :label-width="formLabelWidth" :rules="investorCompanyRules" ref="investorCompany" :disabled="isRead">
                <el-form-item label="名称：" class="necessary-item" prop="name">
                  <el-input v-model="investorCompanyInformation.name" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="地址：">
                  <el-input v-model="investorCompanyInformation.address" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="注册资金：" class="account necessary-item" prop="registerAmount">
                  <el-input v-model="investorCompanyInformation.registerAmount" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="持股比例：" class="rate necessary-item" prop="holdRatio">
                  <el-input v-model="investorCompanyInformation.holdRatio" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="核算方式：">
                  <el-input v-model="investorCompanyInformation.accountingMode" maxlength="100"></el-input>
                </el-form-item>
              </el-form>
              <div class="dialog-footer">
                <a class="search-btn" @click="addInvestorInformation(false)">保存</a>
                <a class="reset-btn" @click="showDialog(false)">取消</a>
              </div>
            </template>
          </center-dialog>
        </ul>
      </div>
    </div>
    <div class="asset-holder conclusion">
      <el-form   :label-position="labelPosition" label-width="130px" :disabled="isRead">
        <el-row>
          <el-col>
            <el-form-item label="前注册会计师审计结论：" >
              <el-input type="textarea" v-model="onlineOperationData.formerAccountantConclusions" maxlength="250"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="前评估情况：">
              <el-input type="textarea" v-model="onlineOperationData.priorAssessment" maxlength="250"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  import CenterDialog from '../../components/centerDialog.vue';
  import {mapState} from 'vuex';
  var that;
  export default {
    data(){
      const checkNumber= (rule, value, callback)=>{
        if(!value)  return callback();
        if (isNaN(value)) {
          return callback(new Error('请输入数字'));
        }else{
          callback();
        }
      };
      const checkFormat = (rule, value, callback)=>{
        if(!value) return callback();
        if(/^0[\d]+.$/.test(value)){
          return callback(new Error('请确认输入正确'));
        }else if(isNaN(value)){
          return callback(new Error('请确认输入正确'));
        }else{
          callback();
        }
      };
      const checkPhone = (rule, value, callback)=>{
        if(!value) return callback();
        if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))){
          return callback(new Error('确认输入正确格式'));
        }else{
          callback();
        }
      };
      const checkPostCode = (rule, value, callback)=>{
        if(!value) return callback();
        if(!(/^\d{6}$/.test(value))){
          return callback(new Error('确认输入正确格式'));
        }else{
          callback();
        }
      };
      const checkLicenseNumber= (rule, value, callback) =>{
        if(!value) return callback();
        if(!(/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/.test(value))){
          return callback(new Error('请确认输入的格式正确'));
        }else{
          callback();
        }
      };
      const checkRatio = (rule, value, callback)=>{
        if(!value)  return callback();
        if(isNaN(value)) {
          return callback(new Error('请确认比例正确'));
        }else if(value>100 || value < 0){
          return callback(new Error('请确认输入正确'));
        }else{
          callback();
        }
      };
      const checkEnglishName= (rule, value, callback)=>{
        if(!value) callback();
        if(!(/^[a-zA-Z][\s,\.a-zA-Z_\-]+$/.test(value))){
          return callback(new Error('请确认输入正确'));
        }else{
          callback();
        }
      };
      const checkLength = (rule, value, callback) =>{
        if(!value) callback();
        this.strLength(value, 100);
      };
      return {
        address: {
          province: [],
          city: [],
          area: []
        },

        officeAddress: {
          province: [],
          city: [],
          area: []
        },

        investorInformation:{
          name: '',
          registerAmount: '',
          registerRatio: '',
          actualAmount: '',
          actualRatio: ''
        },

        investorCompanyInformation:{
          name: '',
          address: '',
          registerAmount: '',
          holdRatio: '',
          accountingMode: ''
        },

        //定义表单验证规则
        assetOwnerRules: {
          name: [{required: true, message: '名称不能为空', trigger: ['blur']}],
          possessionEnglishName: [{validator:checkEnglishName, trigger: ['blur'] }],
          licenseNumber: [{validator:checkLicenseNumber, trigger: ['blur'] }],
          certificateNumber: [{validator:checkLicenseNumber, trigger: ['blur']}],
          legalPersonMobile: [{validator:checkNumber, trigger: 'blur' }, {validator:checkPhone, trigger: ['blur']}],
          generalManagerMobile: [{validator:checkNumber, trigger: 'blur'}, {validator:checkPhone, trigger: ['blur']}],
          financeMobile: [{validator:checkNumber, trigger: 'blur' }, {validator:checkPhone, trigger: ['blur']}],
          projectLeaderMobile: [{validator:checkNumber, trigger: 'blur'}, {validator:checkPhone, trigger: ['blur']}],
          contactMobile: [{validator:checkNumber, trigger: 'blur' }, {validator:checkPhone, trigger: ['blur']}],
          contactPhone: [{validator:checkNumber, trigger: ['blur'] }],
          contactFax: [{validator:checkNumber, trigger: ['blur'] }],
          legalAddressZipCode: [{validator:checkPostCode, trigger: ['blur'] }],
          officeAddressZipCode: [{validator:checkNumber, trigger: ['blur'] }]
        },

        investorRules: {
          name: [{ required: true, message: '名称不能为空', trigger: ['blur', 'change']}],
          registerAmount: [{validator:checkNumber, trigger: 'change'}, {validator:checkFormat, message: '必须为数字', trigger: ['change', 'blur']}],
          registerRatio: [{validator:checkNumber, trigger: 'change' }, {validator:checkRatio, trigger: ['blur', 'change']}],
          actualAmount: [{validator:checkNumber, trigger: 'change'}, {validator:checkFormat, trigger: ['blur', 'change']}],
          actualRatio: [{validator:checkNumber, trigger: 'change' }, {validator:checkRatio, trigger: ['blur', 'change']}],
        },

        investorCompanyRules: {
          name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
          registerAmount: [
            {required: true, message: '注册资金不能为空', trigger: 'blur' },
            {validator:checkNumber, message: '必须为数字', trigger: ['change', 'blur'],},
            {validator:checkFormat, trigger: 'blur'}
          ],
          holdRatio: [
            {required: true, message: '持有比例不能为空', trigger: 'blur'},
            {validator:checkNumber, message: '必须为数字', trigger: ['change', 'blur']},
            {validator:checkRatio, trigger: ['blur', 'change']}
          ]
        },

        investmentAmountRules: {
          totalAssets: [{validator:checkNumber, trigger: 'change'}, {validator:checkFormat, trigger: 'blur'}],
          netAssets: [{validator:checkNumber, trigger: 'change'}, {validator:checkFormat, trigger: 'blur'}],
          businessIncome: [{validator:checkNumber, trigger: 'change'}, {validator:checkFormat, trigger: 'blur'}],
          postTaxProfit: [{validator:checkNumber, trigger: 'change'}, {validator:checkFormat, trigger: 'blur'}]
        },

        onlineOperationData:{},
        economicNature:[],
        industries: [],
        investorInformationData:[],
        investorCompanyData:[],

        labelPosition: 'right',
        formLabelWidth: '120px',
        dateForm: '',
        dialogHead: '',
        industryInvolved: '',
        workFlag: '',

        isRead: false, //用于判断是否可编辑
        assetOwnerRule: false,
        investmentAmountRule: false,
        uploadData:{
          investorId:"",
          projectId:""
        },
        CancelToken:'',
      }
    },

    computed:{
      ...mapState(['fullPageThis'])
    },
    watch:{
      "$store.state.readonly"(newD,oldD){
        this.isRead = !newD
      },
      "$store.state.investorId"(newD,oldD){
         if(newD){
           var _this = this;
            this.uploadData.investorId=newD;
            this.getUploadStatu(function(){
            _this.$parent.$parent.loading = false;
            _this.$store.state.updateAssetPossession();
          },'reload');
         } 
      }
    },
    created(){
      const _this = this;
      that=this;
      this.uploadData.projectId=this.$store.state.projectId ;
      this.uploadData.investorId=this.$store.state.investorId ;
      this.CancelToken =this.$http.CancelToken;
      this.workFlag = (/projectReportAudit/g.test(this.$route.path)) ? 1 : 0 ;
      //获取页面初始数据
      this.$store.state.updateAssetPossession= function(){
        const {projectId, investorId} = _this.$store.state;
        _this.$http.post("/api/assetownerinformation/selectAssetownerinformation", {projectId, investorId})
        .then(response=>{
          const{result} = response.data;
          _this.isRead = !_this.$store.state.readonly
          _this.showPageInfo(result);
        })
        .catch(err=>{
        // _this.$messageError(err);
        })
      }
      //点击资产占有方信息处的保存按钮
      this.$store.state.saveMsg = ()=>{
        _this.saveInfo();
      }
      this.$store.dispatch('getPossessioBonorumFunction', this.showPageInfo);
     // this.loading = true;
     that.$parent.$parent.uploadFlag = false;
     //that.$parent.$parent.loadTxt='';
     //_this.$parent.$parent.loading = false;
     clearInterval(that.$parent.$parent.timer);
     that.$parent.$parent.timer= '';
     if(this.uploadData.investorId){
        this.getUploadStatu(function(){
        _this.$parent.$parent.loading = false;
        _this.$store.state.updateAssetPossession();
       },'reload');
     }
   

      this.fullPageThis.transportParams = this.transportParams;
    },

    mounted(){
      if(/projectAuditing/g.test(this.$route.path)) this.isRead = true;
    },

    components: {
      CenterDialog
    },

    methods:{

      //页面数据的显示
      showPageInfo(result){
        const {sysAreaTree, childShareholderList, childInvestorList, assetownerinformation, investor} = result;
        this.address.province = [];
        this.address.city = [];
        this.address.area = [];
        this.officeAddress.province = [];
        this.officeAddress.city = [];
        this.officeAddress.area = [];
        this.fullPageThis.assetsId = assetownerinformation.id;
        this.investorInformationData = childShareholderList ;
        this.investorCompanyData = childInvestorList;
        this.onlineOperationData = assetownerinformation;
        for(let key in this.onlineOperationData){
          if(this.onlineOperationData[key] === 0){
            this.onlineOperationData[key] = '';
          }
          if(typeof this.onlineOperationData[key] === 'string'){
            this.onlineOperationData[key].trim();
          }
        }
        this.deleteComma(this.investorInformationData);
        this.deleteComma(this.investorCompanyData);
        this.onlineOperationData.operatingPeriod=this.onlineOperationData.operatingPeriod.split('-');
        this.$set(this.onlineOperationData, 'name', investor.name);
        this.economicNature = window.commonOriginalData.billEconomicNatureId ;
        this.industries = window.commonOriginalData.industryId;
        sysAreaTree.forEach((item, index)=>{
          this.address.province.push(item);
          this.officeAddress.province.push(item);
        })
        const initialProvince = this.address.province.filter(item=> item.id === assetownerinformation.legalAddressProvince);
        const initialCity = initialProvince[0].children;
        const initialArea = initialCity.filter(item => item.id === assetownerinformation.legalAddressCity)[0].children;
        const officeProvince = this.address.province.filter(item=> item.id === assetownerinformation.legalAddressProvince);
        const officeCity = officeProvince[0].children;
        const officeArea = officeCity.filter(item => item.id === assetownerinformation.legalAddressCity)[0].children;
        this.address.city = initialCity;
        this.address.area = initialArea;
        this.officeAddress.city = officeCity;
        this.officeAddress.area = officeArea;
      },

      // 资产占有方保存按钮的功能
      saveInfo(){
        let _this = this;
        delete _this.onlineOperationData.createTime;
        delete _this.onlineOperationData.updateTime;
        _this.onlineOperationData.investorId = _this.$store.state.investorId;
        //assetForm
        _this.$refs['assetHolderForm'].validate((valid)=>{
          if(valid) _this.assetOwnerRule = true;
        })
        _this.$refs['investmentForm'].validate((valid)=>{
          if(valid) _this.investmentAmountRule = true;
        })
        _this.$refs['assetForm'].validate((valid) => {
          if(valid){
            if(_this.assetOwnerRule && _this.investmentAmountRule){
              const {projectId, investorId} = _this.$store.state;
              const pageInfo = JSON.parse(JSON.stringify(_this.onlineOperationData));
              let operatingPeriod = _this.onlineOperationData.operatingPeriod;
              if(_this.onlineOperationData.operatingPeriod instanceof Array){
                operatingPeriod = _this.handelDateFormat(operatingPeriod);
              }
              pageInfo.operatingPeriod = operatingPeriod;
              _this.$http.post('api/assetownerinformation/saveAssetOwnerInformation', {investorId,flag: _this.workFlag, projectId, ...pageInfo})
                .then(response=>{
                  const {investorTree} = response.data;
                  _this.updateProjectNav(investorTree);
                  _this.$messageSuccess('保存成功');
                  _this.assetOwnerRule = false;
                  _this.investmentAmountRule = false;
                })
                .catch(err=>{
                  _this.$messageError(err);
                })
            }
          }else{
            _this.$messageError('请检查格式是否正确');
          }
        });
      },

      handelDateFormat(value){
        const dateArr = [];
        for(let i = 0; i<value.length; i++){
          let date = value[i].split('-');
          date = date.join('.');
          dateArr.push(date);
        }
        return dateArr.join('-');
      },

      showDialog(flag, index){
        if(this.isRead) return;
        if(flag){
          if(isNaN(this.index)){
            for(let key in this.investorInformation){
              this.investorInformation[key] = '';
            }
            for(let name in this.investorCompanyInformation){
              this.investorCompanyInformation[name] = '';
            }
          }
          if(index === 1){
            this.dialogHead = '添加主要投资者（股东）信息';
            this.$refs.investorCenterDialog.showDialog();
          }else{
            this.dialogHead = '添加主要长期投资单位 （或异地分支机构）信息';
            this.$refs.investorCompanyCenterDialog.showDialog();
          }
        }else{
          this.index = undefined;
          this.$refs.investorCenterDialog.closeDialog();
          this.$refs.investorCompanyCenterDialog.closeDialog();
        }
      },

      //更新股东与投资机构数据时的处理
      updateData(flag, index){
        if(this.isRead) return;
        if(flag){
        //股东
          let dialogInvestor = this.investorInformationData[index];
          this.investorInformation = JSON.parse(JSON.stringify(dialogInvestor));//避免点击取消后，由于引用关系导致数据清除
          this.shareHolderId = this.investorInformation.id ;
          this.dialogHead = '修改主要投资者（股东）信息';
          this.$refs.investorCenterDialog.showDialog();
        }else{
        //投资机构
          let dialogCompany = this.investorCompanyData[index]
          this.investorCompanyInformation = JSON.parse(JSON.stringify(dialogCompany));
          this.organizationId = this.investorCompanyInformation.id;
          this.dialogHead = '修改主要长期投资单位 （或异地分支机构）信息';
          this.$refs.investorCompanyCenterDialog.showDialog();
        }
        this.index = index;
      },

      addInvestorInformation(flag){
        if (this.isRead) return;
//      股东部分
        if(flag){
          const shareHolderUrl = 'api/shareholder/saveOrUpdateShareholder' ;
          let {investorId} = this.$store.state;
          const information = {...this.investorInformation};
          delete information.createTime;
          delete information.updateTime;
          if(this.index || this.index === 0){
//          修改股东时发送的请求
            this.$refs['investorForm'].validate((valid) =>{
              if(valid){
                this.$http.post(shareHolderUrl, {id: this.shareHolderId, investorId, ...information})
                .then(response =>{
                  this.$set(this.investorInformationData, this.index, response.data);
                  this.index = '';
                  this.$refs.investorCenterDialog.closeDialog();
                  for(let key in this.investorInformation){
                    this.investorInformation[key] = '';
                  }
                })
                .catch(err=>{
                  this.$messageError(err);
                })
              }else{
                return false;
              }
            })
          }else{
//          新增股东时的请求
            this.$refs['investorForm'].validate((valid) =>{
              if(valid){
                this.$http.post(shareHolderUrl, {investorId, ...information})
                .then(response =>{
                  this.$refs.investorCenterDialog.closeDialog();
                  this.investorInformationData.push(response.data);
                  for(const key in this.investorInformation){
                    this.investorInformation[key] = '';
                  }
                })
                .catch(err=>{
                  this.$messageError(err);
                })
              }else{
                return false;
              }
            });
          }
        }else{
//        资产机构部分investorCompany
          let {projectId, investorId} = this.$store.state;
          const companyInformation = {...this.investorCompanyInformation};
          const organizationUrl = 'api/investors/saveOrUpdateInvestor';
          const {name, accountingMode, address, registerAmount, holdRatio} = companyInformation;
          const params = {name, accountingMode, address, registerAmount, holdRatio};
          if(this.index || this.index === 0){
//          修改当前资产机构信息
            this.$refs['investorCompany'].validate((valid) =>{
              if(valid){
                this.$http.post(organizationUrl, {id: this.organizationId, projectId, flag: this.workFlag, parentId: investorId, ...params})
                .then(response=>{
                  const {investor, investorTree} = response.data;
                  this.$set(this.investorCompanyData, this.index, investor);
                  this.updateProjectNav(investorTree);
                  this.index = '';
                  this.$refs.investorCompanyCenterDialog.closeDialog();
                })
                .catch(err=>{
                  this.$messageError(err);
                })
              }else{
                return false;
              }
            })
          }else{
//          新增资产机构信息
            this.$refs['investorCompany'].validate((valid) => {
              if (valid) {
                this.$http.post(organizationUrl, {projectId, flag: this.workFlag, parentId: investorId, ...params})
                .then(response =>{
                  const {investor, investorTree} = response.data
                  this.investorCompanyData.push(investor) ;
                  this.updateProjectNav(investorTree);
                  for(const key in this.investorCompanyInformation){
                    this.investorCompanyInformation[key] = '';
                  }
                  this.$refs.investorCompanyCenterDialog.closeDialog();
                  this.transportParams(investor.id);
                })
                .catch(err=>{
                  this.$messageError(err);
                })
              } else {
                return false;
              }
            });
          }
        }
      },

      deleteInvestorInformation:function(item, index, flag){
        if(this.isRead) return;
        this.$confirm('此操作将删除该内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(flag){
          //删除股东
            const id = this.investorInformationData[index].id ;
            this.$http.post('api/shareholder/delShareholderStatus', {id})
            .then(response=>{
              this.investorInformationData.splice(index, 1);
              this.$messageSuccess('删除成功');
            })
            .catch(err=>{
              this.$messageError(err);
            })
          }else{
          //删除投资机构
            const id = this.investorCompanyData[index].id ;
            const {projectId} = this.$store.state;
            this.$http.post('api/investors/delInvestorStatus', {projectId, id, flag: this.workFlag})
            .then(response =>{
              this.investorCompanyData.splice(index,1);
              const {investorTree} = response.data;
              this.updateProjectNav(investorTree);
              this.$messageSuccess('删除成功');
            })
            .catch(err=>{
              this.$messageError(err);
            })
          }
        }).catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //三级联动
      chooseProvince(index, event, type){
        if(index === 1){
          const value = event;
          this.address.area = [];
          this.officeAddress.area = [];
          if(type === 'legal'){
            this.onlineOperationData.legalAddressCity = '';
            this.onlineOperationData.legalAddressArea = '';
            const currentProvince = this.address.province.filter((item, index)=>item.id === value) ;
            this.address.city = currentProvince[0].children;
          }else if(type === 'office'){
            this.onlineOperationData.officeAddressCity = '';
            this.onlineOperationData.officeAddressArea = '';
            const Province = this.officeAddress.province.filter((item, index)=>item.id === value) ;
            this.officeAddress.city = Province[0].children;
          }
        }else if(index === 2){
          const value = event;
          if(type === 'legal'){
            this.onlineOperationData.legalAddressArea = '';
            const currentCity = this.address.city.filter((item, index) => item.id === value);
            this.address.area = currentCity[0].children;
          }else if(type === 'office'){
            this.onlineOperationData.officeAddressArea = '';
            const City = this.officeAddress.city.filter((item, index) => item.id === value);
            this.officeAddress.area = City[0].children;
          }
        }
      },

      //去除数字间的逗号
      deleteComma (list) {
        for (let i = 0; i < list.length; i++) {
          for (let key in list[i]) {
            if(typeof list[i][key] === 'string'){
              list[i][key] = list[i][key].replace(/,/g, '');
            }
          }
        }
        return list;
      },

      //更新fullpage中左侧树
      updateProjectNav(investorTree){
        this.fullPageThis.projectNavTree = this.fullPageThis.dataLoop(investorTree, 1);
      },
          /*解析是否完成*/
      getUploadStatu(callBack,type){

        var _this = this;
        var CancelToken = this.CancelToken;
         this.$http.post('/api/xlsUpdateData/getUploadStatus', {
                projectId:this.uploadData.projectId ,
                investorId:this.uploadData.investorId,
                showLoading:false
             },{
               cancelToken: new CancelToken(function executor (c) {
                _this.cancel = c
              })
            }).then(function(res){
             if(res.msg == "初次导入中"||res.msg=="部分导入页面对比中"||res.msg=="部分导入中"||res.msg=="批量修改中"||res.msg=="快捷作价中"||
             res.msg=="台账导入页面对比中"){
                 that.$parent.$parent.uploadFlag = false;
                 _this.$parent.$parent.navPosition =0;
                 _this.$parent.$parent.loading = true;
                 _this.$parent.$parent.showNav();
                 that.getLoadingText(res.msg);
                if(type=='upload'||type=="export"){
                    _this.$messageError('当前股权机构有资产申报表正在操作,请稍后......');
                }

              // if(type=="inspect"||type=="ack"||type=="reload"){
              //     that.getLoadingText();
              //   }

                return;
              }
              
              if(res.data.uploadTotal){
                  that.$http.post('/api/initializationContentController/savaOrUpdateContent',{
                    projectId:that.$store.state.projectId,
                    investorId:that.$store.state.investorId,
                    showLoading:false
                })
              }
            clearInterval(that.timer);
            that.timer = '';
            that.$parent.$parent.uploadFlag = true;
            if(type=="export"||type=="ack"||type=="inspect"){
              callBack&&callBack();
              return;
            }
            if(type=='upload'&&that.tabArr.length<=0){
              that.getSheet();
              callBack&&callBack();
              return
            }
            if(type=='upload'&&that.tabArr.length>0){
              callBack&&callBack();
              return
            }
           //上传的时候需要刷新数
            that.$parent.$parent.getLeftTree(function(){
               that.$parent.$parent.uploadFlag = true;
               callBack&&callBack();
            },function(){
              that.$parent.$parent.uploadFlag = true;
            });

            })
      },

      //传递参数
      transportParams(Id){
        this.$http.post('api/reportDraft/initReportDraft',{
          investorId: Id,
          projectId: this.$store.state.projectId,
          showLoading:false
        })
        .then(res=>{

        })
        .catch(err=>{
          this.$messageError(err);
        })
      },
      /*加载动画的文案 */
      getLoadingText(type){
        this.$parent.$parent.loading  = true;
        this.$parent.$parent.loadTxt = ' ';
        var text ='';
       if(type=="upload"||type=="初次导入中"||type=="部分导入中"||!type){
         text = '<p class = "loading-head-text">正在导入...</p>大约需要2分钟，您可操作其他页面<br/><p class="loading-head-text loading-content">亲，先去忙别的工作吧~</p>';
       }else{
         text = '当前股权机构有资产申报表正在'+type+'，完成后才可操作哦~<br/>亲，先去操作其他页面吧~';
       }
        this.$nextTick(()=>{
          setTimeout(function(){
              var oLoading = document.querySelector('.el-loading-text');
              oLoading.innerHTML = text;
          },100)
        })
      },
      beforeDestroy(){
        this.$parent.$parent.uploadFlag = true;
        if (typeof that.$parent.$parent.cancel === 'function') {
          // 取消请求
            that.$parent.$parent.cancel();
        }
        clearInterval(that.$parent.$parent.timer);
        that.$parent.$parent.timer='';
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
  .onlineOperation{
    width: 1010px;
    margin: auto;
    .asset-holder{
      padding: 10px 83px 10px 45px;
      margin: 0 20px 12px;
      background-color: #F9F9F9;
      border-radius: 2px;
      /deep/ .el-form-item{
        margin-bottom: 0;
        .el-form-item__content{
          .el-form-item__error{
            z-index: 10;
            top: 30%;
            left: initial;
            right: 5px;
          }
        }
      }
      /deep/ .el-input__inner{
        color: #262628;
      }
      /deep/ .el-form-item__label{
        padding-right: 0;
        color: #686868;
      }
      .el-row>.el-col-12:last-child{
        overflow: hidden;
        /deep/ .el-form-item{
          float: right;
          width: 380px;
        }
      }
      .el-col .el-date-editor{
        width: 250px !important;
        /deep/ .el-input__inner{
          padding-left: 5px !important;
          /*width: 250px !important;*/
        }
        /deep/ .el-input__prefix{
          position: absolute;
          left: 225px;
          .el-icon-date{
            color: #C0C0C0;
          }
        }
      }
      .el-col /deep/ .el-input__inner{
        width: 250px ;
        color: #262628;
      }
      .region /deep/ .el-form-item{
        .el-input__inner {
          width: 200px;
          color: #262628;
        }
      }
    }
    .represent{
      /deep/ .el-form{
        .el-row{
          .el-col{
            .contact-hook{
              .el-form-item__content{
                .el-form-item__error{
                  right: 45px;
                }
              }
            }
          }
        }
      }
      /deep/ .el-col-8{
        position: relative;
        .el-form-item{
          &::after{
            display: inline-block;
            height: 25px;
            position: absolute;
            top: 8px;
            right: 0;
            line-height: 25px;
            font-size: 13px;
            color: #686868;
          }
        }
      }
      .el-col-8:first-child{
        z-index: 5;
        .el-form-item{
          width: 335px;
          &::after{
            content: '省';
            display: inline-block;
            width: 25px;
            height: 25px;
            position: absolute;
            top: 8px;
            left: 335px;
            line-height: 25px;
            font-size: 13px;
            color: #686868;
          }
        }
      }
      .el-col-8:nth-child(2){
        z-index: 3;
        .el-form-item{
          margin-right: -25px;
          float: right;
          /deep/ .el-form-item__content{
            margin-left: 0 !important;
          }
          &::after{
            content: '市';
            right: -40px;
          }
        }
        /deep/ .el-input__inner{
          margin-left: 20px;
        }
      }
      .el-col-8:nth-child(3){
        .el-form-item{
          float: right;
          &::after{
            content: '区/县';
            right: -35px;
          }
        }
        /deep/ .el-input__inner{
          margin-left: 20px;

        }
      }
    }
    .address{
      .el-col-14{
        /deep/ .el-input__inner{
          width: 400px;
        }
      }
      .el-col-10{
        /deep/ .el-form-item{
          float: right;
          width: 330px;
        }
        /deep/ .el-input__inner{
          width: 200px;
        }
      }
    }
    .investment{
      .el-row {
        margin-bottom: 10px;
        .el-col-12 /deep/ .el-form-item {
          position: relative;
          &::after {
            content: '万元';
            width: 50px;
            height: 25px;
            line-height: 25px;
            display: inline-block;
            position: absolute;
            top: 8px;
            right: -5px;
            text-align: center;
            font-size: 13px;
            color: #262628;
          }
          .el-form-item__content{
            .el-form-item__error{
              right: initial;
              left: 100px;
            }
          }
        }
        .el-col-12:first-child {
          .el-form-item {
            width: 420px;
            &::after {
              right: 35px;
            }
          }
        }
      }
      .investor-list-wrapper{
        overflow: hidden;
        display: flex;
        .investor-label{
          width: 130px;
          display: inline-block;
          color: #686868;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
        }
        .investor-list{
          flex: 1;
          -ms-flex:1 0 auto;
          overflow: hidden;
          .investor-list-item{
            cursor: pointer;
            float: left;
            margin-right: 25px;
            margin-bottom: 10px;
          }
          .forbidUpdate{
            cursor: not-allowed;
          }
          .investor-list-item:nth-child(3n){
            margin-right: 0;
          }
        }
        /deep/ .el-form{
          margin-bottom: 40px;
          .el-form-item{
            .el-form-item__content{
              .el-form-item__error{
                left: 100px;
                right: initial;
              }
            }
          }
          .account{
            .el-form-item__label{
              position: relative;
              &::after{
                content: '万元';
                position: absolute;
                z-index: 3;
                display: inline-block;
                width: 50px;
                top:2px;
                left:340px;
              }
            }
          }
          .rate{
            .el-form-item__label{
              position: relative;
              &::after{
                content: '%';
                position: absolute;
                z-index: 3;
                display: inline-block;
                width: 50px;
                top:2px;
                left:340px;
              }
            }
          }
          /deep/ .el-input__inner{
            width: 280px;
          }
        }
        .dialog-footer{
          display: flex;
          justify-content: center;
          /deep/ .el-button{
            width: 70px;
            height: 25px;
            position: relative;
            span{
              font-size: 13px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
      .investorInformation{
        width: 220px;
        height: 135px;
        background-color: white;
        font-size: 12px;
        color: #575757;
        margin: auto;
        position: relative;
        padding: 5px 18px 8px 12px;
        border-radius: 2px;
        border: 1px solid #E1E1E1;
        box-sizing: border-box;
        .icon-shanchu{
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 8px;
          color: #C0C0C0;
          cursor: pointer;
          &:hover{
            color:#f09237;
          }
        }
        p{
          line-height: 21px;
          overflow: hidden;
          span{
            float: left;
            color: #6A6A6A;
          }
          .name{
            width: 152px;
          }
          .investorInformation-val{
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(50,50,52,1);
            width: 80px;
          }
        }
      }
      .add-investorInformation{
        text-align: center;
        line-height: 130px;
        border: 1px dashed #e1e1e1;
        border-radius: 2px;
        &:hover{
          border-color: #77C2FD;
          .investorInformation-tit {
            .el-icon-plus {color: #77C2FD}
          }
          p:nth-child(2){color: #77C2FD}
        }
        .investorInformation-tit{
          .el-icon-plus{
            margin: 21px 0 0 75px;
            font-size: 40px;
            color: #e1e1e1;
            cursor: pointer;
          }
        }
        p:nth-child(2){
          width: 110px;
          color: #e1e1e1;
          margin: 0 auto;
        }
      }
    }
    .invest-company{
      padding-top: 20px;
      .investorInformation{
        height: 135px;
      }
    }
    .conclusion {
      padding-top: 20px;
      padding-bottom: 20px;
      .el-row:first-child{
        margin-bottom: 15px;
        /deep/ .el-form-item__label{
          white-space: nowrap;
          margin-left: -14px;
        }
      }
    }
    /deep/ .el-form-item.is-success .el-input__inner{border-color: #E1E1E1 }
  }
</style>

