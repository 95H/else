<template>
	<div class="zlpg-content project-list">
		<div class="marginBottom10 dead-list-header-con">
			<div class="zlpg-content-header">
				<ul class="list-group">
					<li v-for="(item,index) in headStatus" v-if="item.jump != '/project/4'" :key="index+'0'" @click="changeTab(item.jump.split('/')[2])" :class="{selected:item.jump.split('/')[2] == active}">{{ item.title }}</li>
					<li v-for="(item,ind) in headStatus" v-if="item.jump == '/project/4'" :key="ind+'1'" class="pv">
						<span @click="selectMechanism">按机构查看</span>
						<div v-show="mechanism" class="mask"></div>
						<div v-show="mechanism" class="pa mechanism">
							<div>
								<el-input placeholder="请输入机构关键字" v-model="filterText">
								</el-input>
								<el-scrollbar class="el-scrollbar">
									<el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="selectedMechanism" ref="tree2">
									</el-tree>
								</el-scrollbar>
							</div>
							<div class="mechanism-btn-group">
								<span class="mechanism-btn search-btn" @click.stop="sureMechanism">确定</span>
								<span class="mechanism-btn mechanism-cancle-btn reset-btn" @click.stop="mechanism=!mechanism">取消</span>
							</div>
						</div>
					</li>
					<div class="fr">
						<a class="list-right el-button--primary marginLeft10 marginRight20" @click="show" v-if="showPower"><img src="../../assets/common/create.png" />快速创建项目</a>
					</div>

				</ul>
			</div>
			<!-- <div class="singleRadio-container" v-if="hackReset"> -->
			<!-- 状态分类 -->
			<!-- <single-radio :singleradiooptions="pageOptions.singleRadioStateOptions" @onradioclick="radioStateEvent"></single-radio> -->
			<!--<single-checkbox :singleradiooptions="pageOptions.singleRadioStateOptions" @onradioclick="radioStateEvent"></single-checkbox>-->
			<!-- 性质分类-->
			<!--<single-radio :singleradiooptions="pageOptions.singleRadioNatureOptions" @onradioclick="radioNatureEvent"></single-radio>-->
			<!-- <single-checkbox :singleradiooptions="pageOptions.singleRadioNatureOptions" @onradioclick="radioNatureEvent"></single-checkbox> -->
			<!-- 等级分类 -->
			<!--<single-radio :singleradiooptions="pageOptions.singleRadioLevelOptions" @onradioclick="radioLevelEvent"></single-radio>-->
			<!-- <single-checkbox :singleradiooptions="pageOptions.singleRadioLevelOptions" @onradioclick="radioLevelEvent"></single-checkbox> -->
			<!-- </div> -->
			<div v-if="!flagSum">
				<div class="search-con pv">
					<div v-for="item in pageOptions.itemsIptOptions" :key="item.name" v-if="item.bool">
						<i>{{item.name}}</i>
						<el-autocomplete v-model="item.input" :placeholder="item.holder" value-key="name" class="inline-input" :fetch-suggestions="querySearch" @focus="OnFocus(item)"></el-autocomplete>
						<!-- <el-scrollbar class="elscrol" v-if="item.inputBool" @mouseleave.native="clearSroll">
	            <p style="width:100%;height:25px;">111</p>
	          </el-scrollbar> -->
					</div>
					<div v-if="recheckPersonName.bool">
						<i>复审人：</i>
						<el-input readonly placeholder="请选择复审人" v-model="recheckPersonName.recheckPersonName" @focus="selectPersons('recheckPerson')"></el-input>
					</div>
					<div v-if="qfPersonName.bool">
						<i>签发人：</i>
						<el-input readonly placeholder="请选择签发人" v-model="qfPersonName.recheckPersonName" @focus="qfPersons('recheckPerson')"></el-input>
					</div>
					<div v-if="branchForm.bool">
						<i>所属部门：</i>
						<el-input readonly placeholder="请选择所属部门" v-model="branchForm.deptName" @focus="brachSelectPersons('dept')"></el-input>
					</div>
					<div v-if="issueAssetsReport.bool">
						<i>报告类型：</i>
						<el-select v-model="issueAssetsReport.value" placeholder="请选择评估报告类型">
							<el-option v-for="(item,i) in objectList.assetReportTypeId" :label="item" :value="i" :key="i"></el-option>
						</el-select>
					</div>
					<div v-if="showAssessment.bool">
						<i>评估对象：</i>
						<!-- <el-input readonly placeholder="请选择评估对象" @focus="assessmentTargetEvent" v-model="showAssessmentTargetName"></el-input> -->
						<el-input readonly placeholder="请选择评估对象" @focus="assessmentTargetEvent" v-model="showAssessmentTargetName" :style="{width: (assessObj.assessmentTarget.id && assessObj.assessmentTarget.id!== '1320' && (ruleForm.assetType.length || assessObj.assessmentTarget.assetType.length)) ? '72px!important' : '160px'}"></el-input>
						<el-input style="width:80px;" readonly v-model="showAssessmentType" v-show="assessObj.assessmentTarget.id && assessObj.assessmentTarget.id!== '1320' && (ruleForm.assetType.length || assessObj.assessmentTarget.assetType.length)"></el-input>
					</div>
					<div v-if="economicBehaviorId.bool">
						<i>经济行为：</i>
						<el-select placeholder="请选择具体经济行为" v-model="economicBehaviorId.value">
							<el-option v-for="(item,i) in objectList.EconomicBehaviorId" :label="item" :value="i" :key="i"></el-option>
						</el-select>
					</div>
					<div v-if="isListedCompany.bool" style="line-height: 25px;">
						<i>是否上市：</i>
						<el-radio-group v-model="isListedCompany.value">
							<el-radio label="1">涉及</el-radio>
							<el-radio label="0">不涉及</el-radio>
						</el-radio-group>
					</div>
					<div class="pa date-and-btn" style="width:35%;padding-left:15px;line-height: 25px;" v-if="createTimeDate.bool">
						<span class="fs13 fl tjTime" style="margin-top: -1px;">提交时间：</span>
						<el-date-picker class="fl" v-model="createTimeDate.dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
					<single-checkbox v-if="singlebox1" style="width:100%;line-height: 42px;margin-top: 0;padding-left:15px;color:#262628" :singleradiooptions="pageOptions.singleRadioNatureOptions" @onradioclick="radioNatureEvent"></single-checkbox>
					<single-checkbox v-if="singlebox2" style="width:100%;line-height: 42px;margin-top: 0;padding-left:15px;color:#262628" :singleradiooptions="pageOptions.singleRadioLevelOptions" @onradioclick="radioLevelEvent"></single-checkbox>
				</div>
				<!-- <transition name="toTop1" class="toTop1"> -->
				<!-- <div class="search-container pv" style="padding:0;margin:0 20px;border-top:2px dotted #ececec;" v-if="actionPageOptions.itemsIptOptions.length > 0 && actionPageShow">
	          <ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt> -->
				<!-- <ipt :itemsiptoptions="actionPageOptions.itemsIptOptions"></ipt> -->
				<!-- <single-radio v-for="item in searchSingle" :key="item.txt" :singleradiooptions="item"></single-radio> -->

				<!-- </div> -->
				<!-- </transition> -->
				<div class="search-container pv" style="padding:0;margin:0 20px;border-top:2px dotted #ececec;height:55px;">
					<div class="pa date-and-btn">
						<div class="text-left  searchBtns">
							<span @click="showScenter">设置筛选条件 >></span>
							<span v-if="keepWidth == 1" @click="keepSpan">保存筛选器</span>
							<span class="searchSpan2" v-if="keepWidth == 2">
	              <i style="color:#3A80EC">保存筛选器</i>
	              <el-input v-model="exploreInput" placeholder="请输入筛选器名称"></el-input>
	              <i class="searchSpan2-in" style="background:#fff;color:#5296FF" @click="exploreSpan">取消</i>
	              <i class="searchSpan2-in" @click.stop="addGroupName">保存</i>
	            </span>
							<div class="searchSpanDiv" @mouseover="selectedListShow" @mouseout="selectedListHide">
								<span class="textOverflow1" :title="groupName">
	                {{groupName}}
	                <img src="../../assets/common/zhankai@2x.png" v-if="selectedShow == 1" style="top:7px">
	                <img src="../../assets/common/zhankai@2x.png" v-if="selectedShow == 2" style="transform:rotate(180deg);top:6px">
	              </span>
								<ul id="keepUlSpan" v-show="keepUlSpanShow">
									<li class="textOverflow1" @click.stop="selectGroupName(item)" v-for="item in keepLiList" :key="item.id" :title="item.groupName">{{item.groupName}}
										<img v-if="item.bool" src="../../assets/common/delete@2x.png" @click.stop="deleteGroupName(item)">
									</li>
								</ul>
							</div>

						</div>
						<div class="text-right searchBtns" style="margin-right:20px;position:absolute;right:0" @click="actionPageHide">
							<span class="searchSpan4">{{actionPageShow?'收起':'展开'}}{{selinputAll.length-1 > 0 ? '更多'+ (selinputAll.length-1) +'个条件': ''}}
	                <img src="../../assets/common/zhankai@2x.png" v-if="spanImg == 1">
	                <img src="../../assets/common/zhankai@2x.png" v-if="spanImg == 2" style="transform:rotate(180deg);top:6px">
	            </span>
							<button class="search-btn" @click.stop="searchEvent">搜索</button>
							<button class="reset-btn" @click.stop="reset">重置</button>
							<!-- <button type="info" class="reset-btn" @click="exportList">导出</button> -->
						</div>
					</div>
				</div>

				<div class="dead-list-contnet overflowHidden">
					<div class="dead-list-contnet-header text-right">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="全部项目" name="all">全部项目</el-tab-pane>
							<el-tab-pane :label="'立项中（' + liXing + '）'" name="setup">立项中（{{liXing}}）</el-tab-pane>
							<el-tab-pane :label="'作业中（' + zuYing + '）'" name="implement">作业中（{{zuYing}}）</el-tab-pane>
							<el-tab-pane :label="'结项中（' + jxIng  + '）'" name="post">结项中（{{jxIng}}）</el-tab-pane>
							<el-tab-pane :label="'已完成（' + yiWing + '）'" name="end">已完成（{{yiWing}}）</el-tab-pane>
						</el-tabs>
						共计{{totalDataNum}}个项目
					</div>
					<div class="dead-list-con" v-for="(item,index) in messageToDeal" :key="index" v-if="messageToDeal.length">
						<div :class="listCardShow == index?'dead-list-header blueHeader':'dead-list-header'" @click="listCardShowOnly(item, index)">
							<div class="dead-list-header-left fl textOverflow1">
								<div class="dead-list-header-title textOverflow1 fl"><span :title="item.projectName" @click.stop="setProjectId(item)">{{ item.projectName }}</span></div>
								<div class="dead-list-header-user-name textOverflow1 fl" :title="item.leaderName"><i class="iconfont icon-renyuan"></i>{{ item.leaderName }}/{{item.projectOwner}}</div>
								<div class="dead-list-headermoney  fl"><i class="textOverflow1" style="color:#F09237" :title="item.projectExpenseExpect">{{item.projectExpenseExpect}}</i><i>万</i></div>
								<div class="dead-list-headerselect textOverflow1 fr">
									<span v-if="item.milstoneStatus == 0"><img src="../../assets/common/bulid@2x.png" alt="立项中"><i style="color:#FFAA29">立项中</i></span>
									<span v-if="item.milstoneStatus == 1 || item.milstoneStatus == 5"><img src="../../assets/common/homework@2x.png" alt="作业中"><i style="color:#83B3FF">作业中</i></span>
									<span v-if="item.milstoneStatus == 4 "><img src="../../assets/common/jxing@2x.png" alt="结项中"><i style="color:#686868">结项中</i></span>
									<span v-if="item.milstoneStatus == 2 || item.milstoneStatus == 3"><img src="../../assets/common/complate@2x.png" alt="已完成"><i style="color:#98C268">已完成</i></span>
								</div>
							</div>

							<div class="fr project-nature">
								<span v-show="item.projectNatureId != 17">{{ commonData.projectNatureId[item.projectNatureId]?commonData.projectNatureId[item.projectNatureId].slice(0,commonData.projectNatureId[item.projectNatureId].length-2):'' }}</span>
								<span v-show="item.isListedCompany==1">上市</span>
								<span v-show="commonData.assessmentTarget[item.assessmentTarget]?commonData.assessmentTarget[item.assessmentTarget].slice(0,commonData.assessmentTarget[item.assessmentTarget].length-2):''">
		              {{ commonData.assessmentTarget[item.assessmentTarget]?commonData.assessmentTarget[item.assessmentTarget].slice(0,commonData.assessmentTarget[item.assessmentTarget].length-2):'' }}
		            </span>
								<span>{{ commonData.projectLevelId[item.projectLevelId] }}级</span>
							</div>
						</div>
						<transition name="toTop" class="toTop">
							<!-- <div class="dead-list-card" v-if="listCardShow == index"> -->
							<div class="dead-list-card" v-if="item.listCardShow">
								<div class="dead-list-card-left">
									<ul class="zlpg-list-content-main1 width160">
										<li class="textOverflow1" :title="item.projectNumber" :class="{gray:item.projectNumber===''}"><span class="circular"></span>{{item.projectNumber || "未分配项目编号"}}</li>
										<li class="textOverflow1" :title="item.projectOwner" :class="{gray:item.projectOwner===''}"><span class="circular"></span>{{item.projectOwner || "未分配承做机构"}}</li>
										<li class="textOverflow1" :title="assessmentMethod(item.assessmentMethodId)" :class="{gray:assessmentMethod(item.assessmentMethodId)===''}"><span class="circular"></span>{{assessmentMethod(item.assessmentMethodId) || "未选择评估方法"}}</li>
									</ul>
									<ul class="zlpg-list-content-main1 width108">
										<li class="textOverflow1" :title="commonData.assessmentObjectiveId[item.assessmentObjectiveId]" :class="{gray:!commonData.assessmentObjectiveId[item.assessmentObjectiveId]}">{{commonData.assessmentObjectiveId[item.assessmentObjectiveId] || "未填写评估目的"}}</li>
										<li class="textOverflow1" :title="commonData.billEconomicNatureId[item.billEconomicNatureId]" :class="{gray:!commonData.billEconomicNatureId[item.billEconomicNatureId]}">{{commonData.billEconomicNatureId[item.billEconomicNatureId]|| "未填写经济性质"}}</li>
										<li class="textOverflow1" :title="commonData.assetReportTypeId[item.assetReportTypeId]" :class="{gray:!commonData.assetReportTypeId[item.assetReportTypeId]}">{{commonData.assetReportTypeId[item.assetReportTypeId] || "未填写报告类型"}}</li>
									</ul>
									<ul class="zlpg-list-content-main1 width146">
										<li class="textOverflow1" :title="milstoneStatus(item.milstoneStatus)">状态：{{ milstoneStatus(item.milstoneStatus)}}</li>
										<li class="textOverflow1" :title="item.createTime.slice(0,10)" :class="{gray:item.createTime===''}">创建时间：{{ item.createTime?item.createTime.slice(0,10): "未创建"}}</li>
										<li class="textOverflow1" :title="item.projectExpenseExpect+'万元' || '未填写合同金额'" :class="{gray:item.projectExpenseExpect===''}">合同金额：{{ item.projectExpenseExpect+'万元' || "未填写合同金额" }}</li>
									</ul>
								</div>
								<div class="dead-list-card-right" v-if="item.currentNode">
									<ul class="zlpg-list-content-main2">
										<li>
											<div>
												<span :class="hendleClassStatu('setupNode',item.currentNode.setupNode)"> 立项 </span>
											</div>
											<div v-for="(step,index) in item.currentNode.setupNode" :key="index">
												<span class="textContent1" :class="{startStatu:step.isChecked === 1,finishStatu:step.isChecked === 2}">
		                      <img src="../../assets/common/unStart-icon.png" v-if="!step.isChecked" alt="">
		                      <img src="../../assets/common/start-icon.png" v-else-if="step.isChecked === 1" alt="">
		                      <img src="../../assets/common/finish-icon.png" v-else alt="">
		                    </span>
												<span class="textContent2">
		                      {{step.auditName}}
		                    </span>
											</div>
										</li>
										<li>
											<div>
												<span :class="hendleClassStatu('jobNode',item.currentNode.jobNode)">作业</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.jobNode.survey,item.currentNode.jobNode.surveysum)">勘察</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.jobNode.survey+"/"+item.currentNode.jobNode.surveysum}}</span>份
												</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.jobNode.job,item.currentNode.jobNode.jobsum)">作业</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.jobNode.job+"/"+item.currentNode.jobNode.jobsum}}</span>份
												</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.jobNode.submit,item.currentNode.jobNode.submitsum)">送审</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.jobNode.submit+"/"+item.currentNode.jobNode.submitsum}}</span>份
												</span>
											</div>
										</li>
										<li>
											<div>
												<span :class="hendleClassStatu('reportNode',item.currentNode.reportNode)">审核</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.reportNode.firstAudit,item.currentNode.reportNode.firstAuditSum)">初审</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.reportNode.firstAudit+"/"+item.currentNode.reportNode.firstAuditSum}}</span>份
												</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.reportNode.secondAudit,item.currentNode.reportNode.secondAuditSum)">复审</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.reportNode.secondAudit+"/"+item.currentNode.reportNode.secondAuditSum}}</span>份
												</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.reportNode.issue,item.currentNode.reportNode.issueSum)">签发</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.reportNode.issue+"/"+item.currentNode.reportNode.issueSum}}</span>份
												</span>
											</div>
										</li>
										<li>
											<div>
												<span :class="hendleClassStatu('finishNode',item.currentNode.finishNode)">结项</span>
											</div>
											<div>
												<span class="textContent1" :class="hendleClassNode(item.currentNode.finishNode.seal,item.currentNode.finishNode.sealSum)">盖章</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.finishNode.seal+"/"+item.currentNode.finishNode.sealSum}}</span>份
												</span>
											</div>
											<div>
												<span class="textContent1" :class="{finishStatu:item.currentNode.finishNode.sendSum}">发送</span>
												<span class="textContent2">
		                      <span class="textOrange">{{item.currentNode.finishNode.sendSum}}</span>份
												</span>
											</div>
											<div>
												<span class="textContent1" :class="{ startStatu:item.currentNode.finishNode.finish === 2,finishStatu:item.currentNode.finishNode.finish === 3}">
		                      <img src="../../assets/common/unStart-icon.png" v-if="item.currentNode.finishNode.finish == 1" alt="">
		                      <img src="../../assets/common/start-icon.png" v-else-if="item.currentNode.finishNode.finish == 2" alt="">
		                      <img src="../../assets/common/finish-icon.png" v-else-if="item.currentNode.finishNode.finish == 3" alt="">
		                    </span>
												<span class="textContent2">项目结项</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</transition>

					</div>
					<div class="white-bg">
						<div class="pagination-con  text-center" v-if="totalDataNum > 10">
							<pagination ref="pagination" :pagesize="pagesize" :totalDataNum="totalDataNum" :page="page" v-on:currentPageFn="currentPageFn"></pagination>
						</div>
						<div class="noData" v-if="totalDataNum  == 0">暂无数据</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 项目汇总 内容-->
		<!-- 123 -->
		<div class="project-summary" v-if="flagSum">
			<project-summary></project-summary>
		</div>
		<center-dialog class="oneDialog" ref="centerDialog" dialogTitle="设置筛选条件" dialogWidth="620px" dialogHeight="430px">
			<div slot="dialogContent" style="margin-top:-10px;">
				<div class="dialogLeft fl">
					<p><i>{{inputAll.length}}</i> 个搜索条件</p>
					<div class="dialogLeftTop">
						<img src="../../assets/common/canSelect@2x.png">
						<span>可选查询条件</span>
					</div>
					<div class="dialogLeftbot">
						<el-scrollbar class="el-scrollbar">
							<!-- <el-checkbox-group v-model="checkedAll"> -->
							<el-checkbox v-model="item.bool" @change="checkChosen(item)" class="elcheckbox" v-for="item in inputAll" :label="item.selectionTab" :key="item.id">{{item.selectionTab}}</el-checkbox>
							<!-- </el-checkbox-group> -->
						</el-scrollbar>
					</div>
				</div>
				<div class="dialogRight fr">
					<!-- <p>最少选 <i>0</i> 个，最多选 <i>8</i> 个，已选 <i>2</i> 个</p> -->
					<p>已选 <i>{{selinputAll.length}}</i> 个</p>
					<div class="dialogRightTop">
						<img src="../../assets/common/allSelect@2x.png" />
						<span>已选查询条件</span>
					</div>
					<div class="dialogRightbot">
						<el-scrollbar class="el-scrollbar">
							<!-- <el-checkbox-group v-model="selinputAll"> -->
							<el-checkbox v-model="item.bool" class="elcheckbox" @change="checkHaveChosen(item)" v-for="item in selinputAll" :label="item.selectionTab" :key="item.id">{{item.selectionTab}}</el-checkbox>
							<!-- </el-checkbox-group> -->
						</el-scrollbar>
					</div>
				</div>
				<div>
					<a class="reset-btn" style="width:100px;height:25px;margin-top:6px;" @click="backScenter">恢复默认筛选</a>
				</div>
				<div class="clear text-center">
					<a class="search-btn" @click="setChosen">设置</a>
					<a class="reset-btn" @click="hideScenter">取消</a>
				</div>
			</div>
		</center-dialog>
		<!-- 部门 -->
		<brach-dialog ref="brachPersonsDialog" v-on:setPersonId="brachPersonsId"></brach-dialog>
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
		<!-- 选择复审人 -->
		<persons-dialog ref="selectPersonsDialog" v-on:setPersonId="setPersonsId"></persons-dialog>
		<!-- 选择签发人 -->
		<persons-dialog ref="qfDialog" v-on:setPersonId="qfPersonsId"></persons-dialog>
	</div>
</template>

<script>
	import personsDialog from '@/components/personsDialog';
	import brachDialog from '@/components/brachDialog';
	import centerDialog from '@/components/centerDialog';
	import pagination from '@/components/pagination.vue';
	import projectSummary from "@/page/project/projectSummary";
	export default {
		components: {
			pagination,
			centerDialog,
			personsDialog,
			brachDialog,
			projectSummary
		},
		data() {
			return {
				getRehearingId: [], //传给后台的复审人id
				getRehearingData: [], //传给后台的复审人值
				qfRehearingId: [], //传给后台的复审人id
				qfRehearingData: [], //传给后台的复审人值
				tempObj: {},
				inputLoading: false,
				ruleForm: {
					assetType: "", //必填项字段
					assessmentTarget: ''
				},
				// 部门
				branchForm: {
					value: '',
					bool: false,
					dept: '',
					deptName: ''
				},
				// 复审人
				recheckPersonName: {
					bool: false,
					value: '',
					recheckPerson: '',
					recheckPersonName: ''
				},
				qfPersonName: {
					bool: false,
					value: '',
					recheckPerson: '',
					recheckPersonName: ''
				},
				createTimeDate: {
					dateArr: [],
					bool: false,
					value: ''
				},
				dialogFlag: false, //弹出框
				flagSum: false, //项目汇总显示隐藏切换
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
				singlebox1: false,
				singlebox2: false,
				objectList: commonData,
				// 报告类型
				issueAssetsReport: {
					bool: false,
					value: ''
				},
				economicBehaviorId: {
					bool: false,
					value: ''
				},
				isListedCompany: {
					bool: false,
					value: ''
				},
				// 评估对象
				showAssessment: {
					bool: false,
					value: ''
				},
				keepLiList: [],
				groupName: '选择筛选器',
				keepUlSpanShow: false,
				selectedShow: 1,
				setBool: false,
				selinputAll: [],
				inputAll: [],
				checkedAll: [],
				exploreInput: '',
				keepWidth: 1,
				actionPageShow: false,
				spanImg: 1,
				liXing: 0,
				zuYing: 0,
				jxIng: 0,
				yiWing: 0,
				activeName: 'all',
				listCardShow: -1,
				page: 1,
				pagesize: 10,
				headStatus: [],
				options: [],
				active: 0,
				actionPageOptions: {
					itemsIptOptions: []
				},
				searchSingle: [],
				pageOptions: {
					singleRadioStateOptions: {
						txt: '状态分类：',
						option: [{
								name: '全部',
								label: 'all'
							}, {
								name: '立项中',
								label: 'setup'
							},
							{
								name: '作业中',
								label: 'implement'
							},
							{
								name: '结项中',
								label: 'post'
							},
							{
								name: '已完成',
								label: 'end'
							}
						]
					},
					singleRadioNatureOptions: {
						txt: '性质分类：',
						option: [],
						optionId: [],
						optionIdOld: []
					},
					singleRadioLevelOptions: {
						txt: '等级分类：',
						option: [],
						optionId: [],
						optionIdOld: []
					},
					itemsIptOptions: [{
							name: '项目名称：',
							holder: '请输入项目名称',
							key: 'projectName',
							url: "/api/projects/getProjectListByStatus",
							formData: {
								projectStatus: "all",
								findType: 0
							},
							input: '',
							width: '160px',
							bool: true,
							inputBool: false
						},
						{
							name: '项目编号：',
							holder: '请输入项目编号',
							input: '',
							width: '160px',
							bool: true,
							inputBool: false,
							key: 'projectNumber',
							url: "/api/projects/getProjectListByStatus"
						},
						{
							name: '项目经理：',
							holder: '请输入项目经理',
							input: '',
							width: '160px',
							bool: true,
							inputBool: false,
							key: 'createUser',
							url: "/api/project/smartTips"
						},
						// {
						//   keyWord: 'RehearingPerson',
						// 	name: '复审人：',
						// 	holder: '请输入复审人',
						// 	input: '',
						// 	width: '160px',
						//   bool: false,
						//   inputBool:false,
						//   key: 'RehearingPerson',
						//   url:"/api/projects/getProjectListByStatus",
						// 	formData:{
						// 		projectStatus:"all",
						// 		findType:0
						// 	}
						// },
						// {
						//   keyWord: 'signPerson',
						// 	name: '签发人：',
						// 	holder: '请输入签发人',
						// 	input: '',
						// 	width: '160px',
						//   bool: false,
						//   inputBool:false,
						//   key: 'signPerson',
						//   url:"/api/projects/getProjectListByStatus",
						// 	formData:{
						// 		projectStatus:"all",
						// 		findType:0
						// 	}

						// },
						{
							keyWord: "linkPerson",
							name: '联络人：',
							holder: '请输入联络人',
							input: '',
							width: '160px',
							bool: false,
							inputBool: false,
							key: 'createUser',
							url: "/api/project/smartTips",
							formData: {
								projectStatus: "all",
								findType: 0
							}
						}
					]
				},
				dateArr: [],
				totalDataNum: 0,
				messageToDeal: {},
				state: 'all',
				nature: 0,
				level: 0,
				hackReset: true,
				commonData: window.commonData,
				flag: true,
				groupId: '',
				mechanism: false,
				filterText: '',
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				isExternalPower: '',
				showPower: true,
				searchConditionData: {},
			};
		},
		created() {
			let _this = this;
			if(/usertask/g.test(this.$store.state.status)) {
				this.$store.state.status = "";
			}
			commonOriginalData.projectNatureId.forEach(function(val, key) {
				_this.pageOptions.singleRadioNatureOptions.option.push({
					name: val.name.slice(0, val.name.length - 2),
					id: val.id
				}, )
				_this.pageOptions.singleRadioNatureOptions.optionId.push(val.id);
				_this.pageOptions.singleRadioNatureOptions.optionIdOld.push(val.id);
			})
			this.nature = _this.pageOptions.singleRadioNatureOptions.optionId.join(',');
			this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = this.nature;
			commonOriginalData.projectLevelId.forEach(function(val, key) {
				_this.pageOptions.singleRadioLevelOptions.option.push({
					name: val.name + '级',
					id: val.id
				}, )
				_this.pageOptions.singleRadioLevelOptions.optionId.push(val.id);
				_this.pageOptions.singleRadioLevelOptions.optionIdOld.push(val.id);
			})
			this.level = _this.pageOptions.singleRadioLevelOptions.optionId.join(',');
			this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = this.level;
			if(JSON.parse(this.$getCookie("user"))) {
				this.isExternalPower = JSON.parse(this.$getCookie("user")).isExternal;
				if(this.isExternalPower == true) {
					this.showPower = false;
				}
			}
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
			if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path) {
				this.pageOptions.itemsIptOptions[0].formData.projectStatus = searchCondition.singleradiooption;
				this.state = searchCondition.singleradiooption;
				this.pageOptions.singleRadioNatureOptions.optionId = searchCondition.projectNatureIds.split(",");
				this.pageOptions.singleRadioLevelOptions.optionId = searchCondition.projectLevelIds.split(",");
				this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
				this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
				this.pageOptions.itemsIptOptions[2].input = searchCondition.leaderName;
				// this.pageOptions.itemsIptOptions[3].input = searchCondition.userName;
				// this.pageOptions.itemsIptOptions[4].input = searchCondition.contantPerson;
				// this.dateArr = [searchCondition.startTime,searchCondition.endTime];
				this.page = searchCondition.index;
				this.active = searchCondition.findType;
			}
			// 获取筛选组
			this.getSelectGroup();
		},
		mounted() {
			let _this = this;
			_this.$refs.assessmentTargetDialog.closeDialog = _this.hendleAssessmentTarget
			this.$store.state.queryUserSysFunction.forEach((val, key) => {
				if(val.title == "项目") {
					this.headStatus = val.list;
					if(this.headStatus.length) {
						if(!this.$store.state.rememberSearchCondition) {
							this.active = this.headStatus[0].jump.split('/')[2];
						}
						this.changeTab(this.active, 'reset');
					}
				}
			});
			_this.activeName = _this.state;
			this.$store.state.searchInfo = () => {
				_this.searchList();
			}
		},
		methods: {
			// //选择人员--多选
			selectPersons(chargeAppraiser) {
				// this.recheckPersonName[chargeAppraiser] = []
				this.$refs.selectPersonsDialog.showPersonDialog(chargeAppraiser, this.recheckPersonName[chargeAppraiser], this.recheckPersonName[chargeAppraiser + 'Name']);
			},
			qfPersons(chargeAppraiser) {
				// this.qfPersonName[chargeAppraiser] = []
				this.$refs.qfDialog.showPersonDialog(chargeAppraiser, this.qfPersonName[chargeAppraiser], this.qfPersonName[chargeAppraiser + 'Name']);
			},
			// 部门
			//选择部门--多选
			brachSelectPersons(brachAppraiser) {
				// this.branchForm[brachAppraiser] = []
				this.$refs.brachPersonsDialog.showPersonDialog(brachAppraiser, this.branchForm[brachAppraiser], this.branchForm[brachAppraiser + 'Name']);
			},
			brachPersonsId(type, name, id) {
				this.getCheckId = [];
				this.getCheckId.push(id);
				this.branchForm[type] = id.join(',');
				this.branchForm[type + 'Name'] = name.join(',');
				this.branchForm.value = this.branchForm[type]
			},
			setPersonsId(type, name, id) {
				this.getRehearingId = [];
				//判断是否选中人员
				if(id != '') {
					this.listShow = true;
					this.getRehearingId.push(id);
					this.getRehearingData.push(name);
				}
				this.recheckPersonName[type] = id.join(',');
				this.recheckPersonName[type + 'Name'] = name.join(',');
				this.recheckPersonName.input = this.recheckPersonName[type + 'Name']
				this.recheckPersonName.value = this.recheckPersonName[type]
			},
			qfPersonsId(type, name, id) {
				this.qfRehearingId = [];
				//判断是否选中人员
				if(id != '') {
					this.listShow = true;
					this.qfRehearingId.push(id);
					this.qfRehearingData.push(name);
				}
				this.qfPersonName[type] = id.join(',');
				this.qfPersonName[type + 'Name'] = name.join(',');
				this.qfPersonName.input = this.qfPersonName[type + 'Name']
				this.qfPersonName.value = this.qfPersonName[type]
			},
			OnFocus(item) {
				this.tempObj = item;
			},
			querySearch(str, callback) {
				let _this = this
				if(this.tempObj.url) {
					let data;
					if(this.tempObj.key == 'projectName') {
						data = {
							projectStatus: this.activeName,
							showLoading: false,
							findType: 0,
							projectName: this.tempObj.input,
							// RehearingPerson:
						}
						if(this.nature) {
							data.projectNatureIds = this.nature
						}
						if(this.level) {
							data.projectLevelIds = this.level
						}
					} else if(this.tempObj.key == 'createUser') {
						data = {
							showLoading: false,
							createUser: this.tempObj.input
						}
					} else {
						data = {
							projectStatus: this.activeName,
							showLoading: false,
							findType: this.$store.state.groupId ? '4' : this.active
						}
						data[_this.tempObj.key] = this.tempObj.input
					}
					if(this.tempObj.input) {
						_this.$http.post(this.tempObj.url, data)
							.then(res => {
								let arr = []
								for(let i = 0; i < res.data.length; i++) {
									if(res.data[i].smartInfo) {
										arr.push({
											name: res.data[i].smartInfo
										})
									} else {
										if(res.data[i][_this.tempObj.key]) {
											arr.push({
												name: res.data[i][_this.tempObj.key]
											})
										}
									}
								}
								callback(arr)
							}).catch(error => {
								_this.$messageError(error);
							})
					}
				}

			},
			clearSroll() {
				for(let i = 0; i < this.pageOptions.itemsIptOptions.length; i++) {
					this.pageOptions.itemsIptOptions[i].inputBool = false
				}
			},
			hendleAssessmentTarget(event, type) {
				const _this = this;
				if(type) {
					const {
						assetType
					} = _this.assessObj.assessmentTarget;
					if(_this.assessObj.assessmentTarget.id === "1320") {
						_this.ruleForm.assetTypeList = []
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
					if(_this.ruleForm.assessmentTarget === "1321") {
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
			//评估对象
			assessmentTargetEvent() {
				//  this.assessObj = {
				// 		assessmentTarget: {
				// 			id: '',
				// 			name: "",
				// 			assetType: "",
				// 		}, //绑定评估对象数据
				// 		assetTypeList: [], //临时保存部分资产数组
				// 		assetTypehold: '', //临时保存assetType
				// 	}
				this.$refs.assessmentTargetDialog.showDialog();
				if(!this.assessObj.assessmentTarget.id) {
					this.assessObj.assessmentTarget.id = '1320'
				}
			},
			// 获取筛选组
			getSelectGroup() {
				let _this = this
				this.$http.post('/api/project/selectGroup', {})
					.then(res => {
						if(res.code == 200) {
							for(let i = 0; i < res.data.length; i++) {
								res.data[i].bool = true
							}
							_this.keepLiList = res.data
							_this.keepLiList.unshift({
								groupName: '默认',
								id: -1,
								bool: false
							})
						}
					}).catch(error => {
						_this.$messageError(error);
					})
			},
			// 选择筛选器
			selectGroupName(item) {
				let _this = this
				if(item.id != -1) {
					_this.$http.post('/api/project/getSelectionTab', {
							id: item.id
						})
						.then(res => {
							if(res.code == 200) {
								let canData = JSON.parse(res.data.screeningConditions)
								_this.selinputAll = []
								_this.inputAll = canData.select
								for(let i = 0; i < this.inputAll.length; i++) {
									if(_this.inputAll[i].bool == false) {
										_this.inputAll[i].flag = 0
									} else {
										_this.inputAll[i].flag = 1
										_this.selinputAll.push(_this.inputAll[i])
									}
								}
								_this.sortSelInput(_this.selinputAll)
								_this.setChosen()
								if(_this.selinputAll.length > 1) {
									_this.actionPageShow = true
									_this.spanImg = 2
								} else {
									_this.actionPageShow = false
									_this.spanImg = 1
								}
								_this.setBool = true
								_this.dataCallback(canData)
								_this.searchList()
								_this.groupName = item.groupName
							}
						}).catch(error => {
							_this.$messageError(error);
						})
				} else {
					_this.actionPageOptions.itemsIptOptions = []
					_this.actionPageShow = false
					_this.spanImg = 1
					_this.setBool = false
					_this.$http.post('/api/project/getSelectionTab', {
							id: ''
						})
						.then(res => {
							if(res.code == 200) {
								_this.inputAll = res.data
								for(let i = 0; i < _this.inputAll.length; i++) {
									if(_this.inputAll[i].flag == 0) {
										_this.inputAll[i].bool = false
									} else {
										_this.inputAll[i].bool = true
									}
								}
								_this.selinputAll = []
								_this.setChosen()
								_this.searchList()
							}
						}).catch(error => {
							_this.$messageError(error);
						})

				}
				_this.keepUlSpanShow = false
			},
			dataCallback(canData) {
				let _this = this
				// 项目名称
				this.pageOptions.itemsIptOptions[0].input = canData.value.projectName
				// 项目编号
				this.pageOptions.itemsIptOptions[1].input = canData.value.projectNumber
				// 项目经理
				this.pageOptions.itemsIptOptions[2].input = canData.value.leaderName
				// 联络人
				this.pageOptions.itemsIptOptions[3].input = canData.value.contantPerson
				// 报告类型
				this.issueAssetsReport.value = canData.value.issueAssetsReport
				// 经济行为
				this.economicBehaviorId.value = canData.value.economicBehaviorId
				// 上市
				this.isListedCompany.value = canData.value.isListedCompany
				// 提交时间
				this.createTimeDate.dateArr = []
				if(canData.value.createTimeDate.length > 0) {
					this.createTimeDate.dateArr.push(new Date(canData.value.createTimeDate[0]))
					this.createTimeDate.dateArr.push(new Date(canData.value.createTimeDate[1]))
				}
				// 复审人
				this.recheckPersonName['recheckPerson'] = canData.value.recheckPersonName.recheckPerson
				this.recheckPersonName['recheckPersonName'] = canData.value.recheckPersonName.recheckPersonName
				this.recheckPersonName.value = canData.value.recheckPersonName.recheckPerson
				// 签发人
				this.qfPersonName['recheckPerson'] = canData.value.qfPersonName.recheckPerson
				this.qfPersonName['recheckPersonName'] = canData.value.qfPersonName.recheckPersonName
				this.qfPersonName.value = canData.value.qfPersonName.recheckPerson
				// 所属部门
				this.branchForm['dept'] = canData.value.branchForm.dept
				this.branchForm['deptName'] = canData.value.branchForm.deptName
				this.branchForm['value'] = canData.value.branchForm.dept
				// 评估对象
				this.assessObj.assessmentTarget.id = canData.value.assessObj.id
				this.ruleForm.assetType = canData.value.assessObj.assetType
				this.assessObj.assessmentTarget.assetType = canData.value.assessObj.assetType
				this.assessObj.assetTypeList = canData.value.assessObj.assetType.split(',')
				this.assessObj.assetTypehold = canData.value.assessObj.assetType
				// assessObj.assessmentTarget.id && assessObj.assessmentTarget.id!== '1320' && (ruleForm.assetType.length || assessObj.assessmentTarget.assetType.length)
				// 等级分类
				if(canData.value.singlebox1) {
					this.singlebox1 = false; //销毁组件
					this.$nextTick(() => {
						_this.singlebox1 = true; //重建组件
					});
				}
				if(canData.value.singlebox2) {
					this.singlebox2 = false
					this.$nextTick(() => {
						_this.singlebox2 = true
					});
				}
				_this.pageOptions.singleRadioNatureOptions.optionId = []
				_this.pageOptions.singleRadioNatureOptions.optionIdOld = []
				this.nature = canData.value.projectNatureIds
				this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = this.nature;
				let natureArr = this.nature.split(',')
				// 11
				for(let q = 0; q < natureArr.length; q++) {
					_this.pageOptions.singleRadioNatureOptions.optionId.push(natureArr[q])
					_this.pageOptions.singleRadioNatureOptions.optionIdOld.push(natureArr[q])
				}
				// 等级
				_this.pageOptions.singleRadioLevelOptions.optionId = []
				_this.pageOptions.singleRadioLevelOptions.optionIdOld = []
				this.level = canData.value.projectLevelIds
				this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = this.level;
				let levelArr = this.level.split(',')
				for(let p = 0; p < levelArr.length; p++) {
					_this.pageOptions.singleRadioLevelOptions.optionId.push(levelArr[p])
					_this.pageOptions.singleRadioLevelOptions.optionIdOld.push(levelArr[p])
				}
				// projectNatureIds:this.nature,
				//     projectLevelIds:this.level
			},
			// 添加筛选器
			addGroupName() {
				let _this = this
				let str = ''
				let obj = {
					value: {
						projectName: this.pageOptions.itemsIptOptions[0].input,
						projectNumber: this.pageOptions.itemsIptOptions[1].input,
						leaderName: this.pageOptions.itemsIptOptions[2].input,
						// 联络人
						contantPerson: this.pageOptions.itemsIptOptions[3].input,
						// 报告类型
						issueAssetsReport: this.issueAssetsReport.value,
						// 经济行为
						economicBehaviorId: this.economicBehaviorId.value,
						// 上市
						isListedCompany: this.isListedCompany.value,
						// 提交时间
						createTimeDate: this.createTimeDate.dateArr,
						recheckPersonName: {
							recheckPerson: this.recheckPersonName['recheckPerson'],
							recheckPersonName: this.recheckPersonName['recheckPersonName']
						},
						// 签发人
						qfPersonName: {
							recheckPerson: this.qfPersonName['recheckPerson'],
							recheckPersonName: this.qfPersonName['recheckPersonName']
						},
						// 所属部门
						branchForm: {
							dept: this.branchForm['dept'],
							deptName: this.branchForm['deptName']
						},
						// 评估对象
						assessObj: {
							id: this.assessObj.assessmentTarget.id,
							assetType: this.ruleForm.assetType
						},
						// 等级分类
						projectNatureIds: this.nature,
						projectLevelIds: this.level,
						singlebox1: this.singlebox1,
						singlebox2: this.singlebox2
					},
					select: this.inputAll
				}
				str += JSON.stringify(obj)
				// console.log(str)
				if(str != '' && this.selinputAll.length > 0) {
					this.$http.post('/api/project/updateSelectionUser', {
							groupName: _this.exploreInput,
							ids: str
						})
						.then(res => {
							if(res.code == 200) {
								// 更新筛选组
								_this.setBool = false
								_this.getSelectGroup()
								_this.keepWidth = 1
								_this.$message({
									message: '保存成功',
									type: 'success'
								})
							}
						}).catch(error => {
							_this.$messageError(error);
						})
				} else {
					_this.$message({
						message: '筛选条件或筛选器名称不能为空',
						type: 'warning'
					})
				}

			},
			// 删除筛选器
			deleteGroupName(item) {
				let _this = this
				this.$http.post('/api/project/deleteSelectionUser', {
						id: item.id
					})
					.then(res => {
						if(res.code == 200) {
							// 更新筛选组
							_this.getSelectGroup()
							_this.groupName = '选择筛选器'
							_this.$message({
								message: '删除成功',
								type: 'success'
							})
						}
					}).catch(error => {
						_this.$messageError(error);
					})
			},
			selectedListShow() {
				this.selectedShow = 2
				this.keepUlSpanShow = true
			},
			selectedListHide() {
				this.selectedShow = 1
				this.keepUlSpanShow = false
			},
			// 设置筛选条件
			setChosen() {
				let _this = this
				this.singlebox1 = false
				this.singlebox2 = false
				// 重置
				_this.pageOptions.singleRadioNatureOptions.option = []
				_this.pageOptions.singleRadioNatureOptions.optionIdOld = []
				_this.pageOptions.singleRadioNatureOptions.optionId = []
				commonOriginalData.projectNatureId.forEach(function(val, key) {
					_this.pageOptions.singleRadioNatureOptions.option.push({
						name: val.name.slice(0, val.name.length - 2),
						id: val.id
					}, )
					_this.pageOptions.singleRadioNatureOptions.optionId.push(val.id);
					_this.pageOptions.singleRadioNatureOptions.optionIdOld.push(val.id);
				})
				_this.nature = _this.pageOptions.singleRadioNatureOptions.optionId.join(',');
				_this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = _this.nature;
				_this.pageOptions.singleRadioLevelOptions.option = []
				_this.pageOptions.singleRadioLevelOptions.optionId = []
				_this.pageOptions.singleRadioLevelOptions.optionIdOld = []
				commonOriginalData.projectLevelId.forEach(function(val, key) {
					_this.pageOptions.singleRadioLevelOptions.option.push({
						name: val.name + '级',
						id: val.id
					}, )
					_this.pageOptions.singleRadioLevelOptions.optionId.push(val.id);
					_this.pageOptions.singleRadioLevelOptions.optionIdOld.push(val.id);
				})
				_this.level = _this.pageOptions.singleRadioLevelOptions.optionId.join(',');
				_this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = _this.level;
				//
				this.createTimeDate.dateArr = []
				this.createTimeDate.bool = false
				this.assessObj.assessmentTarget.id = 1320
				this.recheckPersonName.bool = false
				this.recheckPersonName.value = ''
				this.recheckPersonName.recheckPersonName = ''

				this.qfPersonName.bool = false
				this.qfPersonName.value = ''
				this.qfPersonName.recheckPersonName = ''

				this.branchForm.bool = false
				this.branchForm.deptName = ''
				this.branchForm.value = ''

				this.recheckPersonName['recheckPerson'] = []
				this.qfPersonName['recheckPerson'] = []
				this.branchForm['dept'] = []
				this.showAssessment.bool = false
				this.ruleForm = {
					assetType: "", //必填项字段
					assessmentTarget: ''
				}
				this.assessObj.assessmentTarget.id = ''
				this.assessObj.assessmentTarget.assetType = ''
				this.assessObj.assetTypeList = []
				this.assessObj.assetTypehold = ''
				// this.showAssessment.value = ''
				this.issueAssetsReport.bool = false
				this.issueAssetsReport.value = ''
				this.economicBehaviorId.bool = false
				this.economicBehaviorId.value = ''
				this.isListedCompany.bool = false
				this.isListedCompany.value = ''

				for(let z = 3; z < this.pageOptions.itemsIptOptions.length; z++) {
					this.pageOptions.itemsIptOptions[z].bool = false
					this.pageOptions.itemsIptOptions[z].input = ''
				}
				for(let qsi = 0; qsi < 3; qsi++) {
					this.pageOptions.itemsIptOptions[qsi].input = ''
				}
				if(this.selinputAll.length > 0) {
					this.setBool = true
					for(let i = 0; i < this.selinputAll.length; i++) {
						// 提交时间
						if(this.selinputAll[i].englishWord == 'currentTime') {
							this.createTimeDate.bool = this.selinputAll[i].bool
						}
						// 复审人
						if(this.selinputAll[i].englishWord == 'RehearingPerson') {
							this.recheckPersonName.bool = this.selinputAll[i].bool
						}
						// 签发人

						if(this.selinputAll[i].englishWord == 'signPerson') {
							this.qfPersonName.bool = this.selinputAll[i].bool
						}
						// 部门
						if(this.selinputAll[i].englishWord == 'department') {
							this.branchForm.bool = this.selinputAll[i].bool
						}
						// 评估对象
						if(this.selinputAll[i].englishWord == "evaluateType") {
							this.showAssessment.bool = this.selinputAll[i].bool
						}
						// 报告类型
						if(this.selinputAll[i].englishWord == "reportType") {
							this.issueAssetsReport.bool = this.selinputAll[i].bool
						}
						// 经济行为
						if(this.selinputAll[i].englishWord == "economicBehavior") {
							this.economicBehaviorId.bool = this.selinputAll[i].bool
						}
						// 是否上市
						if(this.selinputAll[i].englishWord == "isMark") {
							this.isListedCompany.bool = this.selinputAll[i].bool
						}
						// 项目性质
						if(this.selinputAll[i].englishWord == "projectType") {
							_this.singlebox1 = this.selinputAll[i].bool
						}
						// 等级分类
						if(this.selinputAll[i].englishWord == "projectLevel") {
							_this.singlebox2 = this.selinputAll[i].bool
						}
						for(let j = 0; j < this.pageOptions.itemsIptOptions.length; j++) {
							if(this.selinputAll[i].englishWord == this.pageOptions.itemsIptOptions[j].keyWord) {
								this.pageOptions.itemsIptOptions[j].bool = this.selinputAll[i].bool
							}
						}
					}
				}
				if(_this.selinputAll.length > 1) {
					_this.actionPageShow = true
					_this.spanImg = 2
					document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '' : ''
				} else {
					_this.actionPageShow = false
					_this.spanImg = 1
					document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '35px' : ''
				}
				// console.log(this.showAssessment.value)
				this.groupName = '选择筛选器'
				this.setBool = true
				this.hideScenter()
			},
			checkChosen(item) {
				this.setBool = false
				let _this = this
				if(item.bool) {
					let ass = false
					for(let i = 0; i < _this.selinputAll.length; i++) {
						if(_this.selinputAll[i].id == item.id) {
							ass = true
							break
						}
					}
					if(!ass) {
						this.selinputAll.push(item)
					}
				} else {
					for(let i = 0; i < _this.selinputAll.length; i++) {
						if(_this.selinputAll[i].id == item.id) {
							_this.selinputAll.splice(i, 1)
						}
					}
				}
				this.sortSelInput(_this.selinputAll)
			},
			// 排序
			sortSelInput(arr) {
				// let am =
				for(let i = 0; i < arr.length - 1; i++) {
					let bool = true
					for(let j = 0; j < arr.length - 1; j++) {
						if(arr[j].id > arr[j + 1].id) {
							let temp = arr[j]
							arr[j] = arr[j + 1]
							arr[j + 1] = temp
							bool = false
						}
					}
					if(bool) {
						break
					}
				}
				return arr
			},
			checkHaveChosen(item) {
				this.setBool = false
				let _this = this
				for(let i = 0; i < this.selinputAll.length; i++) {
					if(this.selinputAll[i].id == item.id) {
						this.selinputAll.splice(i, 1)
					}
				}
				this.sortSelInput(_this.selinputAll)
			},
			exportList() {
				window.open('/api/project/getProjectInfoForXms?token=' + this.$getCookie("token"))
			},
			keepSpan() {
				this.keepWidth = 2
				this.exploreInput = ''
			},
			exploreSpan() {
				this.keepWidth = 1
			},
			actionPageHide() {
				this.actionPageShow = !this.actionPageShow
				if(this.actionPageShow) {
					document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '' : ''
				} else {
					document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '35px' : ''
				}
				if(this.spanImg == 1) {
					this.spanImg = 2
				} else {
					this.spanImg = 1
				}
			},
			hideScenter() {
				this.$refs.centerDialog.closeDialog()
			},
			backScenter() {
				this.$http.post('/api/project/getSelectionTab', {
						id: ''
					})
					.then(res => {
						if(res.code == 200) {
							this.inputAll = res.data
							for(let i = 0; i < this.inputAll.length; i++) {
								if(this.inputAll[i].flag == 0) {
									this.inputAll[i].bool = false
								} else {
									this.inputAll[i].bool = true
								}
							}
							this.selinputAll = []
						}
					}).catch(error => {
						_this.$messageError(error);
					})
			},
			showScenter() {
				this.keepWidth = 1
				this.$refs.centerDialog.showDialog()
				let _this = this;
				if(!this.setBool) {
					this.backScenter()
				}

			},
			handleClick(tab, event) {
				let _this = this
				// this.allNumCount()
				let val = this.activeName
				this.state = val;
				this.pageOptions.itemsIptOptions[0].formData.projectStatus = val;
				this.$store.state.status = '';
				this.page = 1;
				this.totalDataNum = 0;
				this.searchList();
			},
			listCardShowOnly(item, index) {
				for(let i = 0; i < this.messageToDeal.length; i++) {
					if(item.id == this.messageToDeal[i].id) {
						this.messageToDeal[i].listCardShow = !(this.messageToDeal[i].listCardShow)
						break
					}
				}
				if(this.listCardShow == index) {
					this.listCardShow = -1
				} else {
					this.listCardShow = index
				}
			},
			setProjectId(item) {
				this.$store.state.projectId = item.id;
				this.$setCookie('projectId', item.id, 24 * 60 * 60);
				this.$router.push({
					path: '/zlpg/project/projectCont/projectInformation'
				});
			},
			changeTab(index, isReset) {
				//切换项目汇总flag
				if(index == 6) {
					this.flagSum = true;
				} else {
					this.flagSum = false;
				}
				this.active = index;
				if(this.$store.state.rememberSearchCondition && isReset != 'reset' || !this.$store.state.rememberSearchCondition && isReset == 'reset') {
					this.$delCookie("searchCondition");
					this.$store.state.rememberSearchCondition = false;
				}
				//123
				//项目汇总不会重置列表
				if(index != this.headStatus.length) {
					this.reset();
				}
				//this.reset();
			},
			selectMechanism() {
				let _this = this;
				this.filterText = '';
				this.$http.post('/api/sysgroup/sysGroupTreeByRole', {})
					.then(response => {
						this.treeData = response.data;
					}).catch(error => {
						_this.$messageError(error);
					})
				this.mechanism = true;
			},
			selectedMechanism(data) {
				this.groupId = data.id;
			},
			sureMechanism() {
				this.$store.state.groupId = this.groupId;
				this.$setCookie('groupId', this.groupId, 24 * 60 * 60);
				this.changeTab(this.active);
				this.mechanism = false;
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			show() {
				let _this = this;
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '创建项目';
				this.$store.state.commonBtn = '创建';
				this.$store.state.componentsType = 'createproject';
				this.$store.state.refresh = function() {
					_this.changeTab(_this.active);
					if(_this.active == 6) {
						_this.flagSum = false;
						_this.$nextTick(()=>{
							_this.flagSum = true;
						})
					}
				};
			},
			radioStateEvent(val) {
				this.activeName = val
				this.state = val;
				this.pageOptions.itemsIptOptions[0].formData.projectStatus = val;
				this.$store.state.status = '';
				this.page = 1;
				this.totalDataNum = 0;
				this.searchList();
			},
			radioNatureEvent(val, arr) {
				if(arr) {
					this.nature = arr.join(',');
				} else if(val) {
					this.nature = this.pageOptions.singleRadioNatureOptions.optionId.join(',');
				} else {
					this.nature = '';
				}
				this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = this.nature;
				this.page = 1;
				this.totalDataNum = 0;
				this.searchList();
				// this.allNumCount()
			},
			radioLevelEvent(val, arr) {
				if(arr) {
					this.level = arr.join(',');
				} else if(val) {
					this.level = this.pageOptions.singleRadioLevelOptions.optionId.join(',');
				} else {
					this.level = '';
				}
				this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = this.level;
				this.page = 1;
				this.totalDataNum = 0;
				this.searchList();
			},
			searchEvent() { // 搜索按钮事件
				this.page = 1;
				this.searchList();
			},
			reset() {
				let _this = this
				_this.pageOptions.singleRadioNatureOptions = {
					txt: '性质分类：',
					option: [],
					optionId: [],
					optionIdOld: []
				}
				_this.pageOptions.singleRadioLevelOptions = {
					txt: '等级分类：',
					option: [],
					optionId: [],
					optionIdOld: []
				}
				commonOriginalData.projectNatureId.forEach(function(val, key) {
					_this.pageOptions.singleRadioNatureOptions.option.push({
						name: val.name.slice(0, val.name.length - 2),
						id: val.id
					}, )
					_this.pageOptions.singleRadioNatureOptions.optionId.push(val.id);
					_this.pageOptions.singleRadioNatureOptions.optionIdOld.push(val.id);
				})
				this.nature = _this.pageOptions.singleRadioNatureOptions.optionId.join(',');
				this.pageOptions.itemsIptOptions[0].formData.projectNatureIds = this.nature;
				commonOriginalData.projectLevelId.forEach(function(val, key) {
					_this.pageOptions.singleRadioLevelOptions.option.push({
						name: val.name + '级',
						id: val.id
					}, )
					_this.pageOptions.singleRadioLevelOptions.optionId.push(val.id);
					_this.pageOptions.singleRadioLevelOptions.optionIdOld.push(val.id);
				})
				this.level = _this.pageOptions.singleRadioLevelOptions.optionId.join(',');
				this.pageOptions.itemsIptOptions[0].formData.projectLevelIds = this.level;
				this.singlebox1 = false
				this.$nextTick(() => {
					for(let i = 0; i < this.selinputAll.length; i++) {
						if(this.selinputAll[i].englishWord == "projectType") {
							this.singlebox1 = this.selinputAll[i].bool
						}
					}
				})
				this.singlebox2 = false
				this.$nextTick(() => {
					for(let j = 0; j < this.selinputAll.length; j++) {
						if(this.selinputAll[j].englishWord == "projectLevel") {
							this.singlebox2 = this.selinputAll[j].bool
						}
					}
				})
				this.createTimeDate.dateArr = []
				// _this.setChosen()
				this.flag = false;
				this.$store.state.status = '';
				this.resetEvent(true);
			},
			resetEvent(flag) { // 重置按钮事件
				if(this.$store.state.status && this.flag) {
					this.state = this.$store.state.status;
				} else {
					let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
					if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path && !flag) {
						this.state = searchCondition.singleradiooption;
						this.nature = this.pageOptions.singleRadioNatureOptions.optionId.join(',');
						this.level = this.pageOptions.singleRadioLevelOptions.optionId.join(',');
					} else {
						this.state = 'all';
						this.nature = this.pageOptions.singleRadioNatureOptions.optionIdOld.join(',');
						this.level = this.pageOptions.singleRadioLevelOptions.optionIdOld.join(',');
						this.pageOptions.singleRadioNatureOptions.optionId = this.pageOptions.singleRadioNatureOptions.optionIdOld.map(item => {
							return item
						});
						this.pageOptions.singleRadioLevelOptions.optionId = this.pageOptions.singleRadioLevelOptions.optionIdOld.map(item => {
							return item
						});

						// 重置
						let _this = this
						this.recheckPersonName['recheckPerson'] = []
						this.qfPersonName['recheckPerson'] = []
						this.branchForm['dept'] = []
						this.assessObj.assessmentTarget.id = 1320
						this.recheckPersonName.value = ''
						this.recheckPersonName.recheckPersonName = ''

						this.qfPersonName.value = ''
						this.qfPersonName.recheckPersonName = ''

						this.branchForm.deptName = ''
						this.branchForm.value = ''

						this.assessObj.assessmentTarget.id = ''
						this.assessObj.assessmentTarget.assetType = ''
						this.assessObj.assetTypeList = []
						this.assessObj.assetTypehold = ''
						this.ruleForm.assetType = ''
						// this.showAssessment.value = ''
						this.issueAssetsReport.value = ''
						this.economicBehaviorId.value = ''
						this.isListedCompany.value = ''
						for(let j = 3; j < this.pageOptions.itemsIptOptions.length; j++) {
							this.pageOptions.itemsIptOptions[j].input = ''
						}

						// 重置end
						this.page = 1;
						this.dateArr = [];
						this.pageOptions.itemsIptOptions.forEach(item => {
							item.input = '';
						});
					}
				}
				this.totalDataNum = 0;
				this.hackReset = false; //销毁组件
				this.$nextTick(() => {
					this.hackReset = true; //重建组件
				});
				this.groupName = '选择筛选器'
				this.searchList();
			},
			getNowFormatDate(date) {
				var seperator1 = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
			},
			searchList(flag) { //请求列表接口
				this.actionPageShow = true
				this.spanImg = 2
				document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '' : ''
				let startTime;
				let endTime;
				if(this.createTimeDate.dateArr && this.createTimeDate.dateArr.length > 0) {
					startTime = this.getNowFormatDate(new Date(this.createTimeDate.dateArr[0])) + " 00:00:00"
					endTime = this.getNowFormatDate(new Date(this.createTimeDate.dateArr[1])) + " 00:00:00"
				} else {
					startTime = ''
					endTime = ''
				}
				// this.secondSearchList(startTime,endTime)
				this.searchConditionData = {
					singleradiooption: this.state,
					projectNatureIds: this.nature,
					projectLevelIds: this.level,
					projectName: this.pageOptions.itemsIptOptions[0].input,
					projectNumber: this.pageOptions.itemsIptOptions[1].input,
					leaderName: this.pageOptions.itemsIptOptions[2].input,
					// 复审人，
					// RehearingPerson: this.pageOptions.itemsIptOptions[3].input,
					// 签发人
					// signPerson:this.pageOptions.itemsIptOptions[3].input,
					startTime: startTime,
					endTime: endTime,
					// 联络人
					contantPerson: this.pageOptions.itemsIptOptions[3].input,
					// 复审人，
					RehearingPerson: this.recheckPersonName.value,
					// 签发人
					signPerson: this.qfPersonName.value,
					// 所属部门
					department: this.branchForm.value,
					// 报告类型
					reportType: this.issueAssetsReport.value,
					// 评估对象
					// evaluateType: this.showAssessment.value,
					assessmentTarget: this.assessObj.assessmentTarget.id,
					assetType: this.ruleForm.assetType,
					// 经济行为
					economicBehavior: this.economicBehaviorId.value,
					// 是否上市
					isMark: this.isListedCompany.value,
					index: this.page,
					dataSearchPath: this.$route.path,
					findType: this.active
				}
				this.$setCookie('searchCondition', JSON.stringify(this.searchConditionData), 24 * 60 * 60);
				let _this = this;
				this.$http.post('/api/projects/getProjectListByStatus', {
					page: this.page,
					rows: this.pagesize,
					findType: this.$store.state.groupId ? '4' : this.active,
					projectStatus: this.state,
					projectNatureIds: this.nature,
					projectLevelIds: this.level,
					projectName: this.pageOptions.itemsIptOptions[0].input,
					projectNumber: this.pageOptions.itemsIptOptions[1].input,
					leaderName: this.pageOptions.itemsIptOptions[2].input,
					// 复审人，
					// RehearingPerson: this.pageOptions.itemsIptOptions[3].input,
					// 签发人
					// signPerson:this.pageOptions.itemsIptOptions[3].input,
					// 联络人
					contantPerson: this.pageOptions.itemsIptOptions[3].input,
					// 复审人，
					RehearingPerson: this.recheckPersonName.value,
					// 签发人
					signPerson: this.qfPersonName.value,
					// 所属部门
					department: this.branchForm.value,
					// 报告类型
					reportType: this.issueAssetsReport.value,
					// 评估对象
					// evaluateType: this.showAssessment.value,
					assessmentTarget: this.assessObj.assessmentTarget.id,
					assetType: this.ruleForm.assetType,
					// 经济行为
					economicBehavior: this.economicBehaviorId.value,
					// 是否上市
					isMark: this.isListedCompany.value,
					// userName: this.pageOptions.itemsIptOptions[3].input,
					// contantPerson: this.pageOptions.itemsIptOptions[4].input,
					startTime: startTime,
					endTime: endTime,
					groupId: this.$store.state.groupId,
					year: this.$store.state.year,
				}).then(response => {
					_this.messageToDeal = response.data;
					for(let i = 0; i < _this.messageToDeal.length; i++) {
						_this.messageToDeal[i].listCardShow = false
					}
					// 第二次
					if(_this.selinputAll.length > 1) {
						_this.actionPageShow = true
						_this.spanImg = 2
						document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '' : ''
					} else {
						_this.actionPageShow = false
						_this.spanImg = 1
						document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '35px' : ''
					}

					_this.totalDataNum = response.count * 1;
					if(response.data.length > 0) {
						_this.liXing = response.data[0] ? response.data[0].setUpCount : '0';
						_this.zuYing = response.data[0] ? response.data[0].ingCount : '0';
						_this.jxIng = response.data[0] ? response.data[0].postCount : '0';
						_this.yiWing = response.data[0] ? response.data[0].endCount : '0';
					} else {
						_this.liXing = 0
						_this.zuYing = 0
						_this.jxIng = 0
						_this.yiWing = 0
					}
				}).catch(error => {
					_this.liXing = 0
					_this.zuYing = 0
					_this.jxIng = 0
					_this.yiWing = 0
					_this.messageToDeal = []
					_this.actionPageShow = true
					_this.spanImg = 2
					document.querySelector('.search-con') ? document.querySelector('.search-con').style.height = '' : ''
					_this.$messageError(error);
				})
			},
			currentPageFn(val) { //点击分页
				this.page = val;
				this.searchList()
			},
			hendleClassStatu(nodeType, node) {
				let className = 'textContent ';
				switch(nodeType) {
					case 'setupNode':
						if(node[0].isChecked === 0) break;
						if(node[2].isChecked === 2) {
							className += 'finishStatu';
							break;
						}
						className += 'projectUnderway';
						break;
					case 'jobNode':
						if(node.job === 0 && node.survey === 0 && node.submit === 0) break;
						if(node.job === node.jobsum && node.survey === node.surveysum && node.submit === node.submitsum && node.jobsum !== 0 && node.surveysum !== 0 && node.submitsum !== 0) {
							className += 'finishStatu';
							break;
						}
						className += 'projectUnderway';
						break;
					case 'reportNode':
						if(node.issue === 0 && node.secondAudit === 0 && node.firstAudit === 0) break;
						if(node.issue === node.issueSum && node.secondAudit === node.secondAuditSum && node.firstAudit === node.firstAuditSum && node.issueSum !== 0 && node.secondAuditSum !== 0 && node.firstAuditSum !== 0) {
							className += 'finishStatu';
							break;
						}
						className += 'projectUnderway';
						break;
					case 'finishNode':
						if(node.seal === 0 && node.send === 0 && node.finish === 1) break;
						if(node.finish === 3) {
							className += 'finishStatu';
							break;
						}
						className += 'projectUnderway';
						break;
					default:
						break
				}
				return className
			},
			hendleClassNode(finish, total) {
				if(finish === 0) return '';
				if(finish < total) return 'startStatu';
				if(finish === total) return 'finishStatu'
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
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
				switch(this.assessObj.assessmentTarget.id) {
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
							assessmentId.push(id)
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
			assessmentMethod() {
				return function(val) {
					if(val) {
						let valArr = val.split(',');
						let strArr = [];
						for(let i in valArr) {
							strArr.push(commonData.assessmentMethodId[valArr[i]]);
						}
						return strArr.join();
					} else {
						return '';
					}
				}

			},
			milstoneStatus() {
				return function(val) {
					let valArr = ['立项中', '作业中', '已完成', '已终止', '结项中', '审核中'];
					return valArr[val];
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.project-list {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
	}

	.list-group {
		border: none!important;
		border-bottom: 1px solid #ececec!important;
		li {
			margin-left: 20px!important;
		}
		li:hover {
			color: #145FD2;
		}
	}

	.list-right {
		margin-right: 20px!important;
	}

	.singleRadio-container {
		.singeRadio {
			height: 34px;
		}
	}

	.search-con {
		font-size: 0;
		padding: 0 20px 10px 20px;
		overflow: hidden;
		>div {
			margin-top: 10px;
			display: inline-block;
			width: 25%;
			position: relative;
			box-sizing: border-box;
			vertical-align: top;
			box-sizing: border-box;
			.el-radio {
				position: relative;
				top: -4px;
			}
			/deep/ .el-input {
				width: 160px;
			}
			i {
				font-size: 13px;
				display: inline-block;
				width: 80px;
				text-align: right;
			}
		}
	}

	.search-container {
		display: block;
		.singeRadio {
			display: inline-block;
		}
		/deep/ .el-col-2 {
			width: 92px!important;
		}
		/deep/ .el-col-22 {
			width: 134px!important;
		}
		.tjTime {
			line-height: 25px;
		}
		.searchBtns {
			height: 40px;
			line-height: 55px;
			display: inline-block;
			margin-bottom: 15px!important;
			.searchSpanDiv {
				display: inline-block;
				width: 120px;
				position: relative;
				height: 25px;
				top: 7.3px;
				span {
					text-align: left;
					position: absolute;
					padding-left: 19px;
					padding-right: 19px;
					top: 0;
					img {
						position: absolute;
						width: 10px;
						height: 11px;
						top: 5px;
						right: 10px;
					}
				}
				#keepUlSpan {
					position: absolute;
					width: 119px;
					padding: 0;
					margin: 0;
					height: 25px;
					top: 26px;
					z-index: 9999;
					li:hover {
						background: rgba(244, 244, 244, 1);
					}
					li:active {
						background-color: #E0ECFF !important;
					}
					li {
						cursor: pointer;
						box-sizing: border-box;
						height: 25px;
						padding: 0;
						margin: 0;
						width: 100%;
						font-size: 13px;
						border: 1px solid rgba(225, 225, 225, 1);
						border-top: none;
						line-height: 25px;
						padding-left: 19px;
						position: relative;
						background-color: #fff;
						padding-right: 20px;
						img:active {
							border: 1px solid rgba(225, 225, 225, 1)
						}
						img {
							width: 7px;
							height: 7px;
							position: absolute;
							top: 9px;
							right: 10px;
						}
					}
				}
			}
			span {
				box-sizing: border-box;
				width: 119px;
				text-align: center;
				line-height: 24px;
				vertical-align: baseline;
				display: inline-block;
				font-size: 13px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(38, 38, 40, 1);
				height: 25px;
				background: rgba(255, 255, 255, 1);
				border-radius: 2px;
				border: 1px solid rgba(225, 225, 225, 1);
				cursor: pointer;
			}
			span:active {
				background-color: #E0ECFF !important
			}
			span:hover {
				background-color: #E0ECFF !important
			}
			.searchSpan2 {
				text-align: left;
				padding: 0 7px 0 10px;
				width: 322px;
				background: rgba(246, 250, 255, 1);
				position: relative;
				.searchSpan2-in {
					float: right;
					font-size: 12px;
					font-family: PingFangSC-Regular;
					width: 45px;
					height: 19px;
					background: rgba(82, 150, 255, 1);
					color: #fff;
					border-radius: 2px;
					margin-top: 2px;
					margin-left: 5px;
					line-height: 19px;
					text-align: center;
				}
				.el-input {
					position: absolute;
					width: 135px!important;
					top: -2px;
					left: 80px;
				}
				/deep/ .el-input__inner {
					width: 135px!important;
					height: 19px!important;
					background: rgba(255, 255, 255, 1);
					border-radius: 2px;
					border: 1px solid rgba(225, 225, 225, 1)
				}
			}
			.searchSpan4 {
				box-sizing: border-box;
				width: 145px;
				position: relative;
				padding-right: 20px;
				img {
					position: absolute;
					top: 7px;
					right: 10px;
					width: 10px;
					height: 11px;
				}
			}
			button {
				vertical-align: baseline;
				line-height: 24px;
			}
		}
		.date-and-btn {
			// left: 270px;
			bottom: 0;
			width: 100%;
		}
	}

	.dead-list-header-con {
		background: #fff;
		border: 1px solid #ECECEC;
	}
	.project-summary {
		flex: 1;
		.sumAll{
			height: calc( 100% - 20px );
		}
	}
	.dead-list-contnet {
		padding-bottom: 15px;
		border: 1px solid #ECECEC;
		background: #fff;
		flex: 1;
		-ms-flex: 1 0 auto;
		/deep/ .el-tabs__content {
			display: none;
		}
		/deep/ .el-tabs--top {
			display: inline-block;
			float: left;
			height: 40px;
			margin-left: 20px;
			margin-top: -2px;
		}
		/deep/ .el-tabs__item {
			height: 40px;
			font-size: 13px;
		}
		/deep/ .el-tabs__nav-wrap::after {
			z-index: -2;
		}
		/deep/ .el-tabs__active-bar {
			bottom: 1px;
		}
		.dead-list-contnet-header {
			height: 35px;
			line-height: 35px;
			color: #262628;
			border-bottom: 1px solid #ECECEC;
			background: #F9F9F9;
			padding-right: 20px;
			margin-bottom: 15px;
			font-size: 13px;
		}
		.dead-list-con {
			margin: 12px 20px;
			border: 1px solid #E5E5E5;
			// cursor: pointer;
			.dead-list-header:hover {
				background-color: #F6FAFF;
			}
			.dead-list-header {
				height: 40px;
				background: #fff;
				// border-bottom: 1px solid #E5E5E5;
				cursor: pointer;
				.dead-list-header-left {
					width: 710px;
					height: 40px;
					line-height: 40px;
					.dead-list-header-title {
						// max-width: 520px;
						height: 40px;
						line-height: 40px;
						margin: 0 20px;
						// font-size: 16px
						font-size: 14px;
						font-family: PingFangSC-Medium;
						font-weight: 500;
						color: rgba(58, 128, 236, 1);
						width: 210px;
						span {
							display: inline-block;
							height: 100%;
						}
						span:hover {
							text-decoration: underline;
						}
					}
					.dead-list-header-user-name {
						width: 150px;
						height: 40px;
						line-height: 40px;
						color: #636363;
						font-size: 13px;
						margin-left: 17px;
						.icon-renyuan {
							color: #CCCCCC;
							font-size: 13px;
							margin-right: 8px;
						}
					}
					.dead-list-headermoney {
						font-size: 13px;
						font-family: PingFangSC-Semibold;
						font-weight: 600;
						color: #636363;
						margin-left: 53px;
						margin-top: -1px;
						i {
							vertical-align: middle;
							display: inline-block;
						}
						i:first-child {
							max-width: 50px;
						}
					}
					.dead-list-headerselect {
						height: 40px;
						margin-top: -1px;
						span {
							display: block;
							width: 100%;
							height: 100%;
							font-size: 13px;
							font-family: PingFangSC-Medium;
							font-weight: 500;
							margin-right: 40px;
							i {
								vertical-align: middle;
								display: inline-block;
								margin-left: 5px;
							}
							img {
								vertical-align: middle;
								width: 13px;
								height: 13px;
							}
						}
					}
				}
				.project-nature {
					width: 250px;
					padding-right: 10px;
					text-align: right;
					line-height: 40px;
					span {
						height: 24px;
						padding: 0 10px;
						line-height: 24px;
						text-align: center;
						color: #98C268;
						background: #F1F8E8;
						border: 1px solid #C8DEAF;
						border-radius: 2px;
						// float: right;
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
			.dead-list-card {
				border-top: 1px solid #E5E5E5;
				height: 160px;
				padding: 0 20px;
				font-size: 13px;
				overflow: hidden;
				.dead-list-card-left {
					height: 100%;
					overflow: hidden;
					float: left;
					.zlpg-list-content-main1 {
						float: left;
						margin-top: 20px;
						li {
							font-size: 13px;
							font-family: "PingFangSC-Regular";
							font-weight: 400;
							color: rgba(99, 99, 99, 1);
							line-height: 34px;
							.circular {
								width: 6px;
								height: 6px;
								float: left;
								margin: 14px 8px 14px 0;
								background: #F09237;
								border-radius: 100%;
							}
						}
						li:nth-child(2) {
							padding: 12px 0;
							.circular {
								background: #57BFB2;
							}
						}
						li:nth-child(3) .circular {
							background: #7C9FEE;
						}
					}
					.width223 {
						width: 223px;
					}
					.width175 {
						width: 175px;
						padding-left: 16px;
						border-left: 1px solid rgba(236, 236, 236, 1);
						border-right: 1px solid rgba(236, 236, 236, 1);
					}
					.width108 {
						width: 108px;
						padding-left: 16px;
						border-left: 1px solid rgba(236, 236, 236, 1);
						border-right: 1px solid rgba(236, 236, 236, 1);
					}
					/*.width160{width: 130px}*/
					.width146 {
						margin-left: 16px;
						width: 146px;
					}
				}
				.dead-list-card-right {
					width: 486px;
					height: 160px;
					overflow: hidden;
					float: right;
					.zlpg-list-content-main2 {
						overflow: hidden;
						margin-top: 17px;
						li {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 8px;
							div {
								display: flex;
								span {
									width: 45px;
									height: 20px;
									text-align: center;
									line-height: 18px;
									border-radius: 2px;
									font-size: 13px;
									font-family: "PingFangSC-Regular";
									font-weight: 400;
								}
								.textContent {
									height: 25px;
									line-height: 25px;
									background: rgba(185, 185, 185, 1);
									color: rgba(255, 255, 255, 1);
								}
								.textContent1 {
									border-radius: 2px 0px 0px 2px;
									background: rgba(185, 185, 185, 1);
									color: rgba(255, 255, 255, 1);
									img {
										vertical-align: middle
									}
								}
								.textOrange {
									color: rgba(240, 146, 55, 1);
								}
								.textContent2 {
									width: 85px;
									background: rgba(255, 255, 255, 1);
									overflow: hidden;
									text-overflow: ellipsis;
									border-radius: 0px 2px 2px 0px;
									border: 1px solid rgba(225, 225, 225, 1);
									box-sizing: border-box;
									color: rgba(38, 38, 40, 1);
								}
								.projectUnderway {
									background: rgba(92, 179, 240, 1);
								}
								.startStatu {
									background: rgba(80, 173, 238, 1);
								}
								.finishStatu {
									background: rgba(152, 194, 104, 1);
								}
							}
						}
					}
				}
			}
		}
		.dead-list-con:hover {
			border: 1px solid #B9E1FC;
		}
	}

	.mechanism {
		width: 400px;
		height: 335px;
		box-shadow: 0px 2px 7px 0px rgba(203, 202, 202, 0.5);
		z-index: 1110;
		background: #fff;
		top: 35px;
		left: 0;
		.el-input /deep/ {
			height: 35px;
			background: #F6FAFF;
			.el-input__inner {
				width: 200px;
				margin: 5px;
			}
		}
		.el-scrollbar /deep/ {
			margin: 10px;
			height: 250px;
			border: 1px solid #E5E5E5;
			margin-bottom: 0;
			.el-scrollbar__wrap {
				height: calc(250px + 17px);
			}
			.filter-tree {
				padding: 10px;
			}
			.is-current * {
				background: none;
			}
			.is-current>.el-tree-node__content {
				background: #EDF5FF;
				.el-tree-node__label {
					color: #145FD2;
					border-radius: 2px;
					line-height: 16px;
					padding: 2px;
				}
			}
		}
		.mechanism-btn-group {
			text-align: center;
			.mechanism-btn {
				width: 70px;
				height: 25px;
				line-height: 23px;
				display: inline-block;
				color: #fff;
				background: #3A80EC;
				text-align: center;
				border-radius: 2px;
				margin: 5px;
			}
			.mechanism-cancle-btn {
				background: none;
				border: 1px solid #3A80EC;
				color: #606266;
			}
		}
	}

	.blueHeader {
		background-color: #F6FAFF!important;
	}

	// 动画
	@keyframes identifier {
		from {
			height: 0;
		}
		to {
			height: 160px;
		}
	}

	@keyframes against {
		from {
			height: 160px;
		}
		to {
			height: 0
		}
	}

	@keyframes identifier1 {
		from {
			height: 0;
		}
		to {
			height: 55px;
		}
	}

	@keyframes against1 {
		from {
			height: 55px;
		}
		to {
			height: 0
		}
	}

	.toTop-enter-active {
		animation: identifier .4s;
	}

	.toTop-leave-active {
		animation: against .4s;
	}

	.toTop1-enter-active {
		animation: identifier1 .2s;
	}

	.toTop1-leave-active {
		animation: against1 .2s;
	}

	// 弹出框
	.dialogLeft {
		width: 275px;
		p {
			margin-bottom: 7px;
			font-size: 12px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			i {
				color: #FF8D05
			}
		}
		.dialogLeftTop {
			width: 100%;
			height: 32px;
			background: rgba(250, 250, 250, 1);
			border: 1px solid rgba(229, 229, 229, 1);
			border-bottom: none;
			padding-top: 8px;
			padding-left: 20px;
			box-sizing: border-box;
			img {
				width: 10px;
				height: 14px;
			}
			span {
				margin-left: 3px;
				position: relative;
				top: -2px;
				font-size: 13px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(38, 38, 40, 1);
			}
		}
		.dialogLeftbot {
			box-sizing: border-box;
			width: 100%;
			height: 235px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(229, 229, 229, 1);
			.el-scrollbar {
				height: 100%;
			}
			.elcheckbox {
				display: block;
				margin-top: 13px;
				margin-left: 0!important;
			}
			/deep/ .el-scrollbar__wrap {
				padding-top: 3px;
				padding-left: 20px;
				padding-bottom: 13px;
				height: 234px;
				width: 291px;
			}
		}
	}

	.dialogRight {
		width: 275px;
		p {
			margin-bottom: 7px;
			font-size: 12px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			i {
				color: #FF8D05
			}
		}
		.dialogRightTop {
			width: 100%;
			height: 32px;
			background: rgba(250, 250, 250, 1);
			border: 1px solid rgba(229, 229, 229, 1);
			border-bottom: none;
			padding-top: 8px;
			padding-left: 20px;
			box-sizing: border-box;
			img {
				width: 13px;
				height: 12px;
			}
			span {
				margin-left: 3px;
				position: relative;
				top: -2px;
				font-size: 13px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(38, 38, 40, 1);
			}
		}
		.dialogRightbot {
			box-sizing: border-box;
			width: 100%;
			height: 235px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(229, 229, 229, 1);
			.elcheckbox {
				display: block;
				margin-top: 13px;
				margin-left: 0!important;
			}
			/deep/ .el-scrollbar__wrap {
				padding-top: 3px;
				padding-left: 20px;
				height: 234px;
				padding-bottom: 13px;
				width: 291px;
			}
		}
	}

	.text-center {
		margin-top: 11px;
	}

	// 评估对象
	.assessmentTargetDialog {
		.button-container {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 20px;
			text-align: center;
		}
		margin-left: -10px;
		.el-radio-group:nth-child(1) {
			width: 100%;
			text-align: center;
			.el-radio {
				margin: 10px 20px;
			}
			/deep/ label.is-checked:after {
				content: '';
				width: 80%;
				height: 5px;
				background-image: url("../../../static/img/project_triangle1.png");
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
</style>
