<template>
	<div ref="fullpage" class="full_page" :class="{ fixed: isfixed }">
		<!-- 顶部内容 -->
		<div class="full_page_title" v-if="isfixed">
			<h3 class="fs14 fl projectName textOverflow1 marginRight45" :title="this.$store.state.projectInfo.projectName">{{ this.$store.state.projectInfo.projectName }}</h3>
			<span class="marginRight45 fs12 fl"><span :style="fontColor">项目编号：</span>{{ this.$store.state.projectInfo.projectNumber?this.$store.state.projectInfo.projectNumber:'--' }}</span>
			<span class="marginRight45 fs12 fl textOverflow1 maxWidth260" :title="this.$store.state.investorName"><span :style="fontColor">当前机构：</span>{{this.$store.state.investorName}}</span>
			<span class="marginRight45 fs12 fl"><span :style="fontColor">评估基准日：</span>{{ this.$store.state.projectInfo.assessmentBaseDate}}</span>
			<div class="fr button-group-hook">
        <span class="save-hook" @click="examineModification" v-if="$store.state.isSavingFlag">正在保存...</span>
				<div class="change-btn fl" v-if="/projectImplementation/g.test(this.$route.path) && isOnline==2"><i class="iconfont icon-qiehuan"></i>切换至<span class="" @click="isOnlineJob">{{underLineTask?'协同作业':'线上提交'}}</span></div>
				<span href="javascript:;" @click="issuedVersion" class="blue marginRight15 fs12 pointer" v-if="/externalOnLineAudit/g.test(this.$route.path)"><i class="iconfont icon-chakanqianfabanben blue fs12"></i>查看签发版本</span>
				<span class="marginRight5" v-if="!/projectImplementation|examineModification/g.test(this.$route.path)">
            <a href="javascript:;" class="search-btn el-button--warning" @click="openAddOpinion" v-if="/assetBased|incomeLaw|marketHome|assessment/.test(this.$route.path) && btnShow && isSubmit">添加意见</a>
            <template v-if="maxBtnShow && !/externalAuditApply/.test(this.$route.path)">
              <!-- <a href="javascript:;" v-if="isOnline == 0" class="reset-btn" @click="offLineGetValue">审核</a> -->
              <a href="javascript:;" class="reset-btn" @click="offLineGetValue">审核通过</a>
              <!-- <a href="javascript:;" v-if="isOnline != 0 && /projectAuditing/g.test(this.$route.path)" class="reset-btn" @click="offLineGetValue">审核通过</a> -->
            </template>
          </span>
		  <span class="search-btn marginRight0" @click="searchCase" v-if="/assetBased/.test(this.$route.path)&&$store.state.curSheetName=='房屋建筑物'">{{$store.state.caseTxt}}</span>
        <span class="search-btn marginRight0" @click="showQuickPrice" v-if="$store.state.isShowQuickPrice&&/assetBased/.test(this.$route.path)&&$store.state.isProjectLeader">快捷作价</span>
				<span class="search-btn marginRight0 width70" @click="examineModification" v-if="isModifyData && /projectImplementation/g.test(this.$route.path)">外审修改</span>
				<span class="search-btn marginRight0 width100" @click="goBack" v-if="!/examineModification|projectIssuedVersion/g.test(this.$route.path)"><i class="iconfont icon-back"></i>返回列表</span>
				<span class="search-btn marginRight0" @click="takeUp" v-if="!/examineModification|projectIssuedVersion/g.test(this.$route.path)"><i class="iconfont icon-shouqi"></i>收起</span>
				<!-- <template v-if="/examineModification/g.test(this.$route.path)">
            <template v-if="submitRevoke!=0">
              <div class="addTaskBtn" v-if="submitRevoke===1">
                <button class="search-btn modifyExternal" @click="modifyExternal()">外审修改提交</button>
              </div>
              <div class="addTaskBtn" v-if="submitRevoke===2">
                <button class="search-btn modifyExternal" @click="revokeList()">外审修改撤回</button>
              </div>
            </template>
          </template> -->
				<!-- <template v-if="/projectExternalAudit/g.test(this.$route.path)">
            <div class="addTaskBtn">
              <button class="search-btn modifyExternal" @click="revokeList()">外审修改撤回</button>
            </div>
          </template> -->
			</div>
		</div>
		<!-- 主体内容 -->
		<!-- 左侧弹窗 -->
		<div class="full_page_left" :style="{'width': leftWidth}">
			<div class="projectNavTree fl" :style="{'left': navPosition}">
				<div class="navTree">
					<el-scrollbar>
						<!-- <el-tree :data="projectNavTree" default-expand-all ref="tree" show-checkbox :expand-on-click-node="false" :props="defaultDatas"></el-tree> -->
						<zlpg-tree-node ref="zlpgTree" v-for="(item,index) in projectNavTree" :key="index" :node="item" :show-checkbox="true">{{item.name}}</zlpg-tree-node>
					</el-scrollbar>
				</div>
				<div class="nav_bottom" v-if="!/externalOffLineTask|externalOffLineAudit/g.test($route.path)">
					<div class="bmStatus" v-if="/projectImplementation|projectReportAudit/g.test(this.$route.path)">
						<span class="heise">未送审</span>
						<span class="lvse" v-if="/projectImplementation/g.test(this.$route.path)">已送审</span>
						<span class="lvse" v-if="/projectAuditing/g.test(this.$route.path)">已通过</span>
						<span class="zise">已签发</span>
						<span class="huangse" v-if="/projectAuditing/g.test(this.$route.path)">待审核</span>
						<span class="hongse" v-if="isOnline==0 || /projectUnderLineTask/g.test(this.$route.path)">未通过</span>
					</div>
					<div class="bmStatus  bmStatusExternal" v-if="/examineModification|projectExternalAudit/g.test(this.$route.path)">
						<span class="gray">未签发</span>
						<span class="heise">内部签发</span>
						<span class="lvse" v-if="/examineModification/g.test(this.$route.path)">外部签发送审</span>
						<span class="hongse" v-if="/examineModification/g.test(this.$route.path)">未通过</span>
						<span class="huangse" v-if="/projectExternalAudit/g.test(this.$route.path)">待审核</span>
						<span class="lvse" v-if="/projectExternalAudit/g.test(this.$route.path)">已通过</span>
						<span class="hongse" v-if="/projectExternalAudit/g.test(this.$route.path)">已拒绝</span>
						<span class="zise">外部签发通过</span>
					</div>
					<div class="nav_bottom_btn" :class="{smallPadding: /examineModification|projectExternalAudit/g.test($route.path)}">
						<a class="search-btn" @click="downLoadFile('')">导出</a>
						<a class="search-btn" v-if="/projectImplementation/g.test(this.$route.path) && showAudit && !/examineModification/g.test(this.$route.path)" @click="selectedCompany">送审</a>
						<!--  -->
						<template v-if="/projectAuditing/g.test(this.$route.path) && isShowAssignee && !/externalOffLineAudit/g.test(this.$route.path)">
							<a class="search-btn" v-if="/projectExternalAudit/g.test(this.$route.path)" @click="externalAuditBtn(1)">审核</a>
							<a class="search-btn" v-else @click="offLineGetValue('multiple')">审核</a>
						</template>
						<a class="search-btn externalBtn" v-if="/examineModification/g.test(this.$route.path) && showAudit" @click="modifyExternal(1)">外审修改送审</a>
					</div>
				</div>
				<div class="nav_bottom" v-if="/externalOffLineTask|externalOffLineAudit/g.test($route.path)">
					<div class="nav_bottom_btn">
						<a class="search-btn" @click="downLoadFile('')">导出</a>
					</div>
				</div>
			</div>
			<a href="javascript:;" class="nav_btn fl" :class="navFlag ? 'nav_open_btn' : 'nav_close_btn'" @click="showNav" v-if="uploadFlag && !/underLineHome/.test(this.$route.path) || /examineModification|projectIssuedVersion/g.test(this.$route.path)"></a>
		</div>
		<!-- <div class="full_page_content" :style="{'left':contentLeft}"> -->
		<div class="full_page_content" v-if="contentShow">
			<!-- 中间主体内容 -->
			<!-- <div class="full_page_center" :style="{'width': isfixed?fullPageCenterWidth:''}"> -->
			<div class="full_page_center">
				<!-- 作业 -->
				<ul class="fullPageContent-header task-header" v-if="/projectImplementation/g.test(this.$route.path)">
					<li v-for="(tabItem,tabIndex) in fullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex" @click="changeTab(tabItem,tabIndex)" v-if="!underLineTask && !tabItem.wpisShow">
						{{tabItem.label}}
						<div class="text-right marginLeft50 fr" v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag" @click.stop="()=>{}">
							<!--<el-upload class="fl" v-if="tabIndex!=3 && tabIndex!=7 && tabIndex!=8" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-success="uploadFileSuccess" accept=".xlsx,.xls"><a class="search-btn mini-btn">导入</a></el-upload>-->
							<el-upload class="fl" v-if="tabIndex!=1 && tabIndex!=3 && tabIndex!=5 && tabIndex!=7 && tabIndex!=8 " accept=".xlsx,.xls" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadFileSuccess" :before-upload="incomeBeforeUpload">
								<a class="search-btn mini-btn" v-if="btnShow">导入</a>
							</el-upload>
							<!--线上资产tabIndex的1与3，调用上传接口不一样-->
							<el-upload class="fl" v-if="tabIndex==1" accept=".xlsx,.xls" ref="upload" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadPosseSuccess" :disabled="loading" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click="importFile">导入</a>
							</el-upload>
							<a class="search-btn mini-btn" @click="importFile" v-if="tabIndex==3 && tabIndex!=7 && tabIndex!=8 && btnShow">导入</a>
							<!-- <a class="search-btn mini-btn" v-if="(tabIndex==7 && btnShow)|| (tabIndex==8 && btnShow)" @click="createFile">生成</a> -->
							<a class="search-btn mini-btn" v-if="tabIndex!=1 &&  tabIndex!=7 && tabIndex!=8" @click.stop="exportFile">导出</a>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click="saveMsg">保存</a>
						</div>
					</li>
					<li v-for="(tabItem,tabIndex) in underLinefullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex" @click="changeTab(tabItem,tabIndex)" v-if="underLineTask && !tabItem.wpisShow">
						{{tabItem.label}}
						<div class="text-right marginLeft50 fr" v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag">
							<el-upload class="fl" v-if="tabIndex==1" ref="upload" accept=".xlsx,.xls" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-success="uploadPosseSuccess" :on-progress="loadFile" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click="importFile">导入</a>
							</el-upload>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click="saveMsg">保存</a>
						</div>
					</li>
				</ul>
				<!-- 审核 -->
				<ul class="fullPageContent-header header-audit" v-if="/projectReportAudit/g.test(this.$route.path)">
					<li v-for="(tabItem,tabIndex) in underLinefullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex" @click="changeTab(tabItem,tabIndex)" v-if="isOnline==0">
						{{tabItem.label=="线下提交" ? '线下审核' : tabItem.label}}
						<div class="text-right fr marginLeft50" v-if="(hasParams? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag" @click.stop="()=>{}">
							<el-upload class="fl" v-if="tabIndex==1 && btnShow" ref="upload" action="/api/file/uploadAssetsPossessionXls" accept=".xlsx,.xls" :data="upLoadParams" :on-success="uploadPosseSuccess" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn">导入</a>
							</el-upload>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click="saveMsg">保存</a>
						</div>
					</li>
					<li v-for="(tabItem,tabIndex) in fullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex" @click="changeTab(tabItem,tabIndex)" v-if="isOnline!=0">
						{{tabItem.label}}
						<div class="text-right fr marginLeft50" v-if="(hasParams? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag">
							<el-upload class="fl" v-if="tabIndex!=1 && tabIndex!=3 && tabIndex!=5 && tabIndex!=7 && tabIndex!=8" accept=".xlsx,.xls" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-success="uploadFileSuccess" :before-upload="incomeBeforeUpload">
								<a class="search-btn mini-btn" v-if="btnShow">导入</a>
							</el-upload>
							<!--审核页面，tabIndex为1或者3调用接口不同于上方-->
							<el-upload class="fl" v-if="tabIndex == 1" accept=".xlsx,.xls" ref="upload" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-success="uploadPosseSuccess" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click="importFile">导入</a>
							</el-upload>
							<a class="search-btn mini-btn" @click="importFile" v-if="tabIndex==3 && tabIndex!=7 && tabIndex!=8 && btnShow">导入</a>
							<!-- <a class="search-btn mini-btn" v-if="(tabIndex==7 && btnShow)|| (tabIndex==8 && btnShow)" @click="createFile">生成</a> -->
							<a class="search-btn mini-btn" v-if="tabIndex!=1&& tabIndex!=7 && tabIndex!=8" @click.stop="exportFile">导出</a>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click="saveMsg">保存</a>
						</div>
					</li>
				</ul>
				<!--外审修改-->
				<ul class="fullPageContent-header task-header" v-if="/examineModification/g.test(this.$route.path)">
					<li v-for="(tabItem,tabIndex) in fullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : (new RegExp(tabItem.path,'i').test(changeTabFlag) || new RegExp('externalAuditRecord','i').test(changeTabFlag) && tabIndex == 0)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex+ '-onLinefullPageTabs'" @click="changeTab(tabItem,tabIndex)" v-show="isOnLine && !tabItem.wpisShow && onlineTabIndex.indexOf(tabIndex) != -1 && !noData && tabItem.label != '市场法'">
						{{tabIndex == 0 ? "外审修改记录" : tabItem.label}}
						<div class="text-right  fr" :class='{marginLeft50:btnShow}' v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag" @click.stop="()=>{}">
							<!--<el-upload class="fl" v-if="tabIndex!=3 && tabIndex!=7 && tabIndex!=8" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-success="uploadFileSuccess" accept=".xlsx,.xls"><a class="search-btn mini-btn">导入</a></el-upload>-->
							<el-upload class="fl" v-if="tabIndex!=1 && tabIndex!=3 && tabIndex!=5 && tabIndex!=7 && tabIndex!=8 " accept=".xlsx,.xls" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadFileSuccess" :before-upload="incomeBeforeUpload">
								<a class="search-btn mini-btn" v-if="btnShow">导入</a>
							</el-upload>
							<!--线上资产tabIndex的1与3，调用上传接口不一样-->
							<el-upload class="fl" v-if="tabIndex==1" accept=".xlsx,.xls" ref="upload" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadPosseSuccess" :disabled="loading" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click.stop="importFile">导入</a>
							</el-upload>
							<a class="search-btn mini-btn" @click.stop="importFile" v-if="tabIndex==3 && tabIndex!=7 && tabIndex!=8 && btnShow">导入</a>
							<!-- <a class="search-btn mini-btn" v-if="(tabIndex==7 && btnShow)|| (tabIndex==8 && btnShow)" @click="createFile">生成</a> -->
							<a class="search-btn mini-btn" v-if="tabIndex!=1 &&  tabIndex!=7 && tabIndex!=8" @click.stop="exportFile">导出</a>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click.stop="saveMsg">保存</a>
						</div>
					</li>
					<li v-for="(tabItem,tabIndex) in underLinefullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : changeTabFlag.indexOf(tabItem.path) != -1}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex + '-underLinefullPageTabs'" @click="changeTab(tabItem,tabIndex)" v-show="isOffLine && !tabItem.wpisShow && onoffTabIndex.indexOf(tabIndex) != -1">
						{{tabItem.label}}
						<div class="text-right marginLeft50 fr" v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag">
							<el-upload class="fl" v-if="tabIndex==1" ref="upload" accept=".xlsx,.xls" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-success="uploadPosseSuccess" :on-progress="loadFile" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click.stop="importFile">导入</a>
							</el-upload>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click.stop="saveMsg">保存</a>
						</div>
					</li>
				</ul>
				<!--外审修改审核-->
				<ul class="fullPageContent-header task-header" v-if="/projectExternalAudit/g.test(this.$route.path)">
					<li v-for="(tabItem,tabIndex) in fullPageTabs" :class="{'active':hasParams ? new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex : (new RegExp(tabItem.path,'i').test(changeTabFlag) || (new RegExp('externalAuditApply','i').test(changeTabFlag) && tabIndex == 0))}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex+ '-onLinefullPageTabs'" @click="changeTab(tabItem,tabIndex)" v-show="isOnLine && !tabItem.wpisShow && onlineTabIndex.indexOf(tabIndex) != -1 && !noData && tabItem.label != '市场法'">
						{{tabIndex == 0 ? '外审修改申请' : tabItem.label}}
						<div class="text-right  fr" :class='{marginLeft50:btnShow}' v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag" @click.stop="()=>{}">
							<!--<el-upload class="fl" v-if="tabIndex!=3 && tabIndex!=7 && tabIndex!=8" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-success="uploadFileSuccess" accept=".xlsx,.xls"><a class="search-btn mini-btn">导入</a></el-upload>-->
							<el-upload class="fl" v-if="tabIndex!=1 && tabIndex!=3 && tabIndex!=5 && tabIndex!=7 && tabIndex!=8 " accept=".xlsx,.xls" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadFileSuccess">
								<a class="search-btn mini-btn" v-if="btnShow">导入</a>
							</el-upload>
							<!--线上资产tabIndex的1与3，调用上传接口不一样-->
							<el-upload class="fl" v-if="tabIndex==1" accept=".xlsx,.xls" ref="upload" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadPosseSuccess" :disabled="loading" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click="importFile">导入</a>
							</el-upload>
							<a class="search-btn mini-btn" @click="importFile" v-if="tabIndex==3 && tabIndex!=7 && tabIndex!=8 && btnShow">导入</a>
							<!-- <a class="search-btn mini-btn" v-if="(tabIndex==7 && btnShow)|| (tabIndex==8 && btnShow)" @click="createFile">生成</a> -->
							<a class="search-btn mini-btn" v-if="tabIndex!=1 &&  tabIndex!=7 && tabIndex!=8" @click.stop="exportFile">导出</a>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click="saveMsg">保存</a>
						</div>
					</li>
					<li v-for="(tabItem,tabIndex) in underLinefullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex+ '-underLinefullPageTabs'" @click="changeTab(tabItem,tabIndex)" v-show="isOffLine && !tabItem.wpisShow && onoffTabIndex.indexOf(tabIndex) != -1">
						{{tabItem.label}}
						<div class="text-right marginLeft50 fr" v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag">
							<el-upload class="fl" v-if="tabIndex==1" ref="upload" accept=".xlsx,.xls" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-success="uploadPosseSuccess" :on-progress="loadFile" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click="importFile">导入</a>
							</el-upload>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click="saveMsg">保存</a>
						</div>
					</li>
				</ul>
				<!--签发版本-->
				<ul class="fullPageContent-header task-header" v-if="/projectIssuedVersion/g.test(this.$route.path)">
					<li v-for="(tabItem,tabIndex) in fullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : (new RegExp(tabItem.path,'i').test(changeTabFlag) || new RegExp('externalAuditRecord','i').test(changeTabFlag) && tabIndex == 0)}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex+ '-onLinefullPageTabs'" @click="changeTab(tabItem,tabIndex)" v-show="isOnLine && !tabItem.wpisShow && onlineTabIndex.indexOf(tabIndex) != -1 && !noData && tabIndex && tabItem.label != '市场法'">
						{{tabIndex == 0 ? "外审修改记录" : tabItem.label}}
						<div class="text-right  fr" :class='{marginLeft50:btnShow}' v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag" @click.stop="()=>{}">
							<!--<el-upload class="fl" v-if="tabIndex!=3 && tabIndex!=7 && tabIndex!=8" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-success="uploadFileSuccess" accept=".xlsx,.xls"><a class="search-btn mini-btn">导入</a></el-upload>-->
							<el-upload class="fl" v-if="tabIndex!=1 && tabIndex!=3 && tabIndex!=5 && tabIndex!=7 && tabIndex!=8 " accept=".xlsx,.xls" ref="upload" action="/api/file/upload" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadFileSuccess">
								<a class="search-btn mini-btn" v-if="btnShow">导入</a>
							</el-upload>
							<!--线上资产tabIndex的1与3，调用上传接口不一样-->
							<el-upload class="fl" v-if="tabIndex==1" accept=".xlsx,.xls" ref="upload" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-progress="loadFile" :on-success="uploadPosseSuccess" :disabled="loading" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click.stop="importFile">导入</a>
							</el-upload>
							<a class="search-btn mini-btn" @click.stop="importFile" v-if="tabIndex==3 && tabIndex!=7 && tabIndex!=8 && btnShow">导入</a>
							<!-- <a class="search-btn mini-btn" v-if="(tabIndex==7 && btnShow)|| (tabIndex==8 && btnShow)" @click="createFile">生成</a> -->
							<a class="search-btn mini-btn" v-if="tabIndex!=1 &&  tabIndex!=7 && tabIndex!=8" @click.stop="exportFile">导出</a>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click.stop="saveMsg">保存</a>
						</div>
					</li>
					<li v-for="(tabItem,tabIndex) in underLinefullPageTabs" :class="{'active':hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : changeTabFlag.indexOf(tabItem.path) != -1}" :style="{'min-width':tabItem.minWidth}" :key="tabIndex + '-underLinefullPageTabs'" @click="changeTab(tabItem,tabIndex)" v-show="isOffLine && !tabItem.wpisShow && onoffTabIndex.indexOf(tabIndex) != -1 && tabIndex">
						{{tabItem.label}}
						<div class="text-right marginLeft50 fr" v-if="(hasParams ? (new RegExp(tabItem.path,'i').test(changeTabFlag) && hasParams==tabIndex) : new RegExp(tabItem.path,'i').test(changeTabFlag)) && tabItem.btnFlag">
							<el-upload class="fl" v-if="tabIndex==1" ref="upload" accept=".xlsx,.xls" action="/api/file/uploadAssetsPossessionXls" :data="upLoadParams" :on-success="uploadPosseSuccess" :on-progress="loadFile" :before-upload="beforeUpload" :headers="uploadHeaders">
								<a class="search-btn mini-btn" v-if="btnShow" @click.stop="importFile">导入</a>
							</el-upload>
							<a class="save-btn mini-btn" v-if="tabIndex==1 && btnShow" @click.stop="saveMsg">保存</a>
						</div>
					</li>
				</ul>
				<div class="fullPageContent-content" :style="{'width': isfixed?fullPageCenterWidth:''}" v-loading="loading" :element-loading-text='loadTxt' element-loading-spinner="loading-upload-icon">
					<div v-if="noData && !/externalOffLineTask\/underLineHome|externalOffLineAudit\/underLineHome/g.test(this.$route.path)" class="nodata-con">
						<div class="nodata"></div>
						<div class="text-center nodata-centent">该机构未提交外审修改，无需进行审核</div>
					</div>
					<el-scrollbar v-else>
						<template v-if="changeTabCopy">
							<router-view :saveMsg="saveMsg" :key="hasParams"></router-view>
						</template>
					</el-scrollbar>
				</div>
			</div>
			<!-- 右侧意见弹窗 -->
			<div class="full_page_right" v-show="(btnShow&&isSubmit) || isSubmitBtn" :style="{'width':opinionWidth}">
				<div class="opinion_box" :style='{"right":opinionPosition}'>
					<div class="opinion-title">
						<span class="closeBtn" @click="closeOpinion"><i class="iconfont icon-caidan gray fw600"></i></span> 意见清单
						<!--<span class="search-btn export_btn">导出</span>-->
					</div>
					<div class="opinion_content">
						<el-tabs class="fullPage-tabs" v-if="opinionData.length > 0" v-model="tabVal" @tab-click="examineFun">
							<el-tab-pane :label="item.taskName" :name="'opinionData'+index" v-for='(item,index) in opinionData' :key="index">
								<div class="sh_item_box">
									<el-scrollbar ref="shTtmeChilds">
										<div class="sh_itme marginBottom10" v-for='(val,key) in item.reportOpinionList' :key="key">
											<div class="sh_title">
												<i class="sh_item_num fl">{{ key*1+1 }}</i>
												<span class="fs13 fl opinionTitle" :title=val.opinionTitle>{{ val.opinionTitle }}</span>
												<em class="iconfont icon-new orange fl" v-if="val.readStatus===0"></em>
												<a href="javascript:;" class="el-icon-delete fr" @click="showDialog('delOpinion',val.id)"></a>
												<a href="javascript:;" class="sh_title_read fs13 fr" @click="readFun(val)">已读</a>
											</div>
											<div class="sh_content">
												<div class="sh_con_top">
													<img src="../../assets/common/photo.png" width="30" height="30" class="user_face" />
													<h3 class="sh_con_top_tt fs13"><b>{{ val.createUserName }}</b><span class="fr">{{ val.createTime }}</span></h3>
													<p class="fs12 overflowHidden" v-html="val.opinionContent"></p>
												</div>
												<div class="sh_con_bottom">
													<a href="javascript:;" class="blue fs13 underlineCommon textOverflow1" @click="downLoadFile(val)" :title="val.fileName"><i class="iconfont icon-fujianwendang gray" v-if="val.fileName!=''&&val.filePath!=''"></i> {{val.fileName}}</a>
													<div class="sh_btn_box">
														<a href="javascript:;" class="fs13 marginRight10" @click="openReplayDialog(item.reportOpinionList,key)"><i class="iconfont fs12 icon-zhankai gray fl"></i> 展开</a>
														<a href="javascript:;" v-if="btnShow" class="fs13" @click="showRightReply('回复',val)"><i class="iconfont fs14 icon-huifu gray"></i> 回复</a>
													</div>
												</div>
											</div>
										</div>
									</el-scrollbar>
								</div>
							</el-tab-pane>
						</el-tabs>
						<p class="noData" v-else>暂无意见</p>
					</div>
					<div :style="{'height':rightReplyHeight}" class="right_replay_box">
						<div class="right_reply" :style="{'bottom':rightReplyPosition}">
							<p class="fs12">{{rightReplyTitle}}:</p>
							<div id="rightReplyEditorTop" class="toolbar marginTop10"></div>
							<div id="rightReplyEditorBottom" class="fs13"></div>
							<el-upload action="/api/file/upload" ref="opinionUpload" :data="upLoadParams" :on-success="uploadSuccess" accept=".doc,.txt,.pdf,.xls,.docx,.xlsx" :multiple="false" :limit="1" class="clear marginTop10">
								<a class="reset-btn fs12">+附件上传</a>
							</el-upload>
							<div class="text-right marginTop20">
								<a class="search-btn" @click="addOpinion('right')">提交</a>
								<a class="reset-btn" @click="closeOpinionBtn('right')">取消</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a href="javascript:;" v-if="(btnShow&&isSubmit) || isSubmitBtn" class="opinion_btn" title="意见反馈" @click="openOpinion"><i class="iconfont icon-caidanopen white"></i>意见</a>
		</div>
		<!-- 审核通过[线上] -->
		<center-dialog ref="agreeReview" dialogWidth="300px" dialogHeight="194px" titlePosition="left">
			<div slot="dialogContent">
				<div class="del_content text-center">
					<p class="fs13">总意见提出：<i class="orange">{{total}}个</i></p>
					<p class="marginTop8 fs13">未回复意见：<i class="orange">{{notReply}}个</i></p>
					<p class="marginTop20 fs13">确认提交通过审核？</p>
				</div>
				<div class="text-center marginTop20">
					<a class="search-btn" @click="agreeReviewSure">确定</a>
					<a class="reset-btn" @click="closeDialog('agreeReview')">取消</a>
				</div>
			</div>
		</center-dialog>
		<!-- 审核[线下] -->
		<center-dialog ref="offLineExamine" dialogWidth="300px" dialogHeight="267px" titlePosition="left" dialogTitle="审核意见">
			<div slot="dialogContent">
				<div class="del_content">
					<el-input type="textarea" class="fs13" :rows="5" v-model="examineOpinion" placeholder="请输入审核意见"></el-input>
					<el-radio-group v-model="offLineExamineFlag" class="marginTop15">
						<el-radio :label="0">通过</el-radio>
						<el-radio :label="1">不通过</el-radio>
					</el-radio-group>
				</div>
				<div class="text-center marginTop20">
					<a class="search-btn" @click="offLineExamineSure">确定</a>
					<a class="reset-btn" @click="closeDialog('offLineExamine')">取消</a>
				</div>
			</div>
		</center-dialog>
		<!-- 展开意见详情 -->
		<center-dialog class="a-center-dialog" ref="opinionDetail" dialogTitle="意见详情" dialogWidth="800px" dialogHeight="640px" @openOpinionDetail="openOpinion">
			<div slot="dialogContent" class="openReplyBox">
				<el-scrollbar ref="opinionDetailScroll">
					<div if="detailsData.length" v-for='(item,index) in detailsData' :key="index">
						<div><span class="module-type">{{ moduleTypeName[item.moduleType] }}</span></div>
						<div class="openReplyBoxTit" v-if="moduleTypeIndArr.indexOf(index)!=-1">
							<b></b>
							<span>{{['资产基础法','收益法','市场法','评估报告','评估说明'][item.moduleType-1]}}</span>
						</div>
						<div class="sh_itme">
							<div class="sh_title">
								<i class="sh_item_num fl">{{ index*1+1 }}</i>
								<span class="fs13 fl">{{ item.opinionTitle }}</span>
								<a href="javascript:;" class="sh_title_read fs13" @click="readFun(item)">已读</a>
								<em class="iconfont icon-new orange fl" v-if="item.readStatus===0"></em>
							</div>
							<div class="sh_content">
								<div class="sh_con_top">
									<img src="../../assets/common/photo.png" width="30" height="30" class="user_face" />
									<h3 class="sh_con_top_tt fs13"><b>{{ item.createUserName }}</b> 发布：<span class="fr">{{ item.createTime }}</span></h3>
									<p class="fs12 overflowHidden" v-html="item.opinionContent"></p>
								</div>
								<div class="sh_con_bottom">
									<a href="javascript:;" class="blue fs13 fl underlineCommon textOverflow1" @click="downLoadFile(item)" :title="item.fileName"><i class="iconfont icon-fujianwendang gray" v-if="item.fileName!='' && item.filePath!=''"></i> {{item.fileName}}</a>
									<div class="sh_btn_box fr">
										<a href="javascript:;" v-if="btnShow" class="fs13 fl" @click="showOpenReply('回复',item)"><i class="iconfont fs14 icon-huifu gray"></i> 回复</a>
									</div>
								</div>
							</div>
						</div>
						<div class="replayAgain marginTop10 marginBottom10" v-if="item.reply.length">
							<div v-if="item.reply.length" class="sh_title fs13">{{ item.reply[0].opinionTitle}}</div>
							<div class="replayAgain_con" v-for='(val,key) in item.reply' :key="key">
								<div class="sh_content">
									<div class="sh_con_top">
										<img src="../../assets/common/photo.png" width="30" height="30" class="user_face" />
										<h3 class="sh_con_top_tt fs13"><b>{{ val.createUserName }}</b> 回复 <b>{{ val.opinionReplyUserName }}</b>：<span class="fr">{{ val.createTime }}</span></h3>
										<p class="fs12 overflowHidden" v-html="val.opinionContent"></p>
									</div>
									<div class="sh_con_bottom">
										<a href="javascript:;" class="blue fs13 underlineCommon textOverflow1" @click="downLoadFile(val)" :title="val.fileName"><i class="iconfont icon-fujianwendang gray" v-if="val.fileName!='' && val.filePath!=''"></i> {{val.fileName}}</a>
										<div class="sh_btn_box">
											<a href="javascript:;" class="fs13" v-if="btnShow" @click="showOpenReply('回复',val)"><i class="iconfont fs14 icon-huifu gray"></i> 回复</a>
											<a href="javascript:;" class="fs13 marginLeft10" v-if="val.createUserId == loginId" @click="showDialog('delOpinion',val.id)"><i class="el-icon-delete fs16 gray"></i> 删除</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-scrollbar>
				<div class="replayBox" :style="{'height':openReplyHeight}">
					<div class="margin20" :style="{'bottom':openReplyPosition}">
						<div id="openReplyEditorTop" class="toolbar"></div>
						<div id="openReplyEditorBottom" class="fs13"></div>
						<el-upload action="/api/file/upload" ref="opinionUpload" :on-success="uploadSuccess" accept=".doc,.txt,.pdf,.xls,.docx,.xlsx" :multiple="false" :limit="1" class="clear marginTop10">
							<a class="reset-btn fs12">+附件上传</a>
						</el-upload>
						<div class="text-center marginTop20">
							<a class="search-btn" @click="addOpinion('center')">提交</a>
							<a class="reset-btn" @click="closeOpinionBtn('center')">取消</a>
						</div>
					</div>
				</div>
			</div>
		</center-dialog>
		<!-- 删除意见 -->
		<center-dialog ref="delOpinion" dialogWidth="300px" dialogHeight="160px" titlePosition="left">
			<div slot="dialogContent">
				<div class="del_content">确认删除当前意见？</div>
				<div class="text-center">
					<a class="search-btn" @click="delOpinionSure">确定</a>
					<a class="reset-btn" @click="closeDialog('delOpinion')">取消</a>
				</div>
			</div>
		</center-dialog>
	</div>
</template>

<script>
	import centerDialog from "../../components/centerDialog";
	import zlpgTreeNode from "@/page/fullPageModule/fullPageTreeNode";
	import E from "wangeditor";
	import Public from "../../public.js";
	var that;
	export default {
		name: "fullPage",
		data() {
			return {
        uploadHeaders:{
          token:this.$getCookie('token'),
        },
				xiaoxitop: 0,
				isModifyData: true,
				//附件意见上传
				uploadData: {
					fileDir: "",
					fileName: ""
				},
				opinionModuleType: "",
				opinionModuleChildId: "",
				// 左侧导航
				navPosition: "-350px",
				leftWidth: "25px",
				fontColor:{
					color:"#777777"
				},
				navFlag: true,
				getCheckKeyArr: [],
				contentLeft: "0",
				projectNavTree: [],
				getCheckedObjArr: [],
				showAudit: false,
				isShowAssignee: false,
				// 右侧意见
				isSubmit: false, //意见判断条件
				isSubmitBtn: false, //意见查看
				opinionPosition: "-305px",
				opinionWidth: "0",
				tabVal: "",
				rightReplyPosition: "-275px",
				rightReplyHeight: "0",
				openReplyPosition: "-315px",
				openReplyHeight: "0",
				rightReplyTitle: "",
				taskDefKey: "",
				moduleTypeArr: [], //意见5大模块
				moduleTypeIndArr: [], //意见5大模块对应下表
				opinionDataInd: 0, //右侧意见下标
				uploadFileList: [], //上传文件列表

				// 中间tabs
				upLoadParams: {
					fileUrl: "",
					projectId: '',
					investorId: ''
				},
				fileDetail: {},
				fullPageCenterWidth: /incomeAndMarket|incomeLaw|marketHome|assetBased|workingManuscript/g.test(
						this.$route.path
					) ?
					"auto" : "1200px",
				underLineTask: (/projectUnderLineTask/g.test(this.$route.path)) ?
					true : false,
				isOnLine: (/externalOnLineTask|externalOnLineAudit|IssuedOnLineVersion/g.test(this.$route.path)) ?
					true : false,
				isOffLine: (/externalOffLineTask|externalOffLineAudit|IssuedOffLineVersion/g.test(this.$route.path)) ?
					true : false,
				changeTabFlag: this.$route.path,
				hasParams: this.$route.params.tabId,
				hasParamsInvestorId: this.$route.params.investorId,
				fullPageTabs: [
					//除线下审核外的内容
					/*
	      label：tab的标题
	      path：父标签调用的slot的值，如项目信息“<div slot="projectInfo"></div>”
	      minWidth：tab的样式，考虑到名字字数的不同，通过display:flex有可能会换行，所以可以指定最小宽度
	      btnFlag：是否显示“导入”、“导出”按钮
        */
					//{ label: "外审修改申请", path: "ExternalAuditInfo" },
					{
						label: "项目信息",
						path: "projectInfo"
					},
					{
						label: "资产占有方信息",
						path: "possessioBonorum",
						minWidth: "120px",
						btnFlag: true,
						wpisShow: JSON.parse(this.$getCookie('user')).isExternal
					},
					{
						label: "评估作业任务",
						path: "evaluateTasks",
						minWidth: "100px",
						wpisShow: JSON.parse(this.$getCookie('user')).isExternal
					},
					{
						label: "资产基础法",
						path: "assetBased",
						minWidth: "90px",
						btnFlag: true
					},
					{
						label: "收益法",
						path: "incomeLaw",
						btnFlag: true
					},
					{
						label: "市场法",
						path: "marketHome",
						btnFlag: true
					},
					{
						label: "现场调查任务",
						path: "fieldInvestigation",
						minWidth: "100px"
					},
					{
						label: "评估报告",
						path: "assessment",
						btnFlag: true
					},
					{
						label: "评估说明",
						path: "assessment",
						btnFlag: true
					},
					{
						label: "工作底稿",
						path: "workingManuscript"
					}
				],
				underLinefullPageTabs: [
					//线下审核
					/*
	      label：tab的标题
	      path：父标签调用的slot的值，如项目信息“<div slot="projectInfo"></div>”
	      minWidth：tab的样式，考虑到名字字数的不同，通过display:flex有可能会换行，所以可以指定最小宽度
	      btnFlag：是否显示“导入”、“导出”按钮
          */
					{
						label: "项目信息",
						path: "projectInfo"
					},
					{
						label: "资产占有方信息",
						path: "possessioBonorum",
						minWidth: "120px",
						btnFlag: true,
						wpisShow: JSON.parse(this.$getCookie('user')).isExternal
					},
					{
						label: "评估作业任务",
						path: "evaluateTasks",
						minWidth: "100px",
						wpisShow: JSON.parse(this.$getCookie('user')).isExternal
					},
					{
						label: "现场调查任务",
						path: "fieldInvestigation",
						minWidth: "100px"
					},
					{
						label: "线上提交",
						path: "underLineHome",
						btnFlag: true
					},
					{
						label: "工作底稿",
						path: "workingManuscript"
					}
				],
				isfixed: this.$store.state.isfixedFlag || false,
				isOnline: 2, //判断是线上【1】还是线下【0】
				//资产信息方的具体id值
				assetsId: "",
				commonData: window.commonData,
				opinionData: [], //右侧意见数据
				detailsData: [], //意见详情数据
				moduleType: "", //步骤类型，第几步的中文名字
				loginId: "", //当前登录人id
				deleteOpinionId: "", //删除意见id
				rightReplyEditor: {}, //右侧富文本
				addOpinionEditor: {}, //详情富文本
				moduleTypeName: {
					资产基础法: 1,
					收益法: 2,
					市场法: 3,
					评估报告: 4,
					评估说明: 5
				},
				fullScreenLoading: false,
				offLineExamineFlag: "",
				examineOpinion: "",
				pms: "",
				total: 0, //总意见
				notReply: 0, //未回复意见
				btnShow: "", //按钮是否展示
				maxBtnShow: false, //放大是的送审
				rightEditorCreated: false, //意见编辑器是否被创建，默认没有被创建
				uploadFlag: true,
				changeTreeFlag: true,
				stausFlag: false,
				CancelToken: '',
				cancel: '',
				timer: '',
				loading: false,
				loadTxt: ' ',
				treeArr: [],
				timerOut: '',
				noData: false, //外审修改初始化时不调接口
				typeIndex: '',
				onlineTabIndex: [0, 3, 4, 5, 7, 8, 9], //外审线上需要显示的tab下标,
				onoffTabIndex: [4, 5], //外审线下需要显示的tab下标,
				finishFlag: false,
				changeTabCopy: true,
				submitRevoke: 0, //审核状态
				contentShow: false,
			};
		},
		watch: {
			$route(to, from) {
				this.changeTabFlag = this.$route.path;
				this.hasParams = this.$route.params.tabId;
				this.hasParamsInvestorId = this.$route.params.investorId;
				if(from.path.indexOf("assessment") != -1 && typeof this.$store.state.saveContent === 'function') {
					this.$store.state.saveContent('', '', '', from.params.tabId == "7" ? "reportEvalDirectory/addReportCatalogTreeNode" : "reportDescDirectory/addExplainCatalogTreeNode"); //切换路由执行保存内容的方法
				}
				this.loading = false;
				clearInterval(that.timer);
				clearTimeout(that.timerOut);
				//如果不是“资产基础法、收益法、市场法”则设置宽度为1200，否则不设置
				this.fullPageCenterWidth = /incomeAndMarket|incomeLaw|marketHome|assetBased|workingManuscript/g.test(this.$route.path) ? "auto" : "1200px";
				this.underLineTask = this.isOnline == 0 || (/projectUnderLineTask/g.test(this.$route.path) ? true : false);
				// 清空全局方法，避免污染
				this.$store.state.importFile = function() {};
				this.$store.state.exportFile = function() {};
				this.$store.state.saveMsg = function() {};
				this.$store.state.createFile = function() {};
				this.$store.state.updateAssetPossession = function() {}; //用于点击后更新资产占有方信息
				if(/underLineHome/g.test(this.$route.path)) {
					/*this.navPosition = "0";
					this.leftWidth = "250px";
					this.contentLeft = "249px";
					this.navFlag = false;*/
					this.navPosition = "-350px";
					this.leftWidth = "0";
					this.contentLeft = "0";
					this.navFlag = true;
				} else {
					this.navPosition = "-350px";
					this.leftWidth = "25px";
					this.contentLeft = "0";
					this.navFlag = true;
				}
			},
			"$store.state.investorId" () {
				if(!this.underLineTask && this.opinionWidth != "0") {
					this.closeOpinionBtn('right')
					this.renderRightOpinion();
				}
			},
			"$store.state.moduleChildId" () {
				if(!this.underLineTask && this.opinionWidth != "0") {
					this.renderRightOpinion();
				}
			},
			"$store.state.agreeReviewFlag" () {
				this.findReportOpinionCount();
			},
			"$store.state.auditTree" () {
				console.log('刷新树成功！');
				this.getLeftTree();
			},

		},
		mounted() {
			this.moduleChildId = this.$store.state.moduleChildId;

			let h =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;
			if(this.isfixed) {
				this.$refs.fullpage.style.minHeight = h - 60 + "px";
			} else {
				this.$refs.fullpage.style.minHeight = h - 280 + "px";
			}
			this.$store.state.oElemHg = this.$refs.fullpage.style.minHeight;
			this.$store.state.openAddOpinion = this.openAddOpinion; //添加意见
			this.$store.state.spreadFullPage = this.takeUp; //展开页面最大化
			this.$store.state.showDialog = this.showDialog; //打开审核通过弹窗,
			this.$store.state.offLineGetValue = this.offLineGetValue; // 点击审核获取按钮值【线下】
			this.$store.state.showQuickPrice = this.showQuickPrice;//快捷作价
			this.$store.state.searchCase = this.searchCase;//查看案列
			var isShowPriceCont = false;
			this.$store.state.isShowQuickPrice = JSON.parse(this.$getCookie("projectInfo")).isView!=undefined?isShowPriceCont=true:isShowPriceCont=false;
			// 左侧树的点击事件
			let _this = this;
			_this.$store.state.leftMenuClick = function(node) {
				_this.$store.state.investorName = node.name;
				_this.leftMenuClick(node);
			};
			_this.$store.state.getLeftTree = function(callback1,callback2,flag) {
				_this.getLeftTree(callback1,callback2,flag)
			};
			this.fullPageTabs.forEach((value, index) => {
				if(
					_this.$route.params.tabId &&
					_this.$route.params.tabId == index &&
					new RegExp(value.path).test(_this.$route.path)
				) {
					_this.moduleType = value.label;
				} else if(!_this.$route.params.tabId &&
					new RegExp(value.path).test(_this.$route.path)
				) {
					_this.moduleType = value.label;
				}
			});
		},
		created() {
			const _this = this;
			that = this;
			this.CancelToken = this.$http.CancelToken;
			this.getLeftTree();
			if(JSON.parse(this.$getCookie("user"))) {
				this.loginId = JSON.parse(this.$getCookie("user")).id;
			}
			this.$store.state.hierarchy = true;
			//  线下外审修改时，不出现树
			if(/underLineHome/g.test(this.$route.path)) {
				this.navPosition = "-350px";
				this.leftWidth = "0";
				this.contentLeft = "0";
				this.navFlag = true;
			}

			//判断路径控制显示详情和共审人
			if(/examineModification/g.test(this.$route.path)) {
				this.$store.state.showInfo = true; //显示详情
				this.$store.state.showaddAudit = false; //显示共审人
				this.$store.state.showAuditTitle = false;
			} else {
				this.$store.state.showInfo = false;
				this.$store.state.showaddAudit = true;
				this.$store.state.showAuditTitle = true;
			}

		},
		components: {
			centerDialog,
			zlpgTreeNode
		},
		methods: {
			/*############################# 左侧方法 ##############################*/
			//获取左侧树
			getLeftTree(callback1, callback2,flag) {
				var _this = this,
					postUrl = "/api/investors/",
					dataObj = {
						projectId: _this.$store.state.projectId,
						showLoading: false,
					}
				if(/projectReportAudit|projectIssuedVersion/g.test(this.$route.path)) {
					postUrl += "getExamineInvestorTree"; //审核
				} else if(/examineModification/g.test(this.$route.path)) {
					postUrl = "/api/changeInvestors/getChangeInvestorTree" //外审修改
					dataObj['onlineOffline'] = /externalOnLineTask/g.test(_this.$route.path) ? 1 : 0;
					dataObj['showLoading'] = true;
				} else if(/projectExternalAudit/g.test(this.$route.path)) {
					postUrl = "/api/changeInvestors/getChangeExamineInvestorTree" //线上外审修改申请
				} else {
					postUrl += "getInvestorTree"; //作业
				}
				_this.$http
					.post(postUrl, dataObj)
					.then(function(res) {
						_this.contentShow = true;
						_this.treeArr = [];
						_this.$store.state.isUserShow = res.data.isIssueUserShow; //判断是否显示添加共审人
            _this.$store.state.isProjectLeader = res.data.isProjectLeader;
						_this.projectNavTree = _this.dataLoop(res.data.data, 1);
						if(res.data.isChangeShow == false) {
							_this.isModifyData = false;
						}
						Public.$emit("isModifyDataBtn", res.data.isChangeShow);
						_this.upLoadParams.projectId = _this.$store.state.projectId;
						_this.upLoadParams.investorId = _this.$store.state.investorId;
						_this.isOnline = res.data.onlineOffline;
						_this.underLineTask =
							(res.data.onlineOffline == 0 ? true : false) ||
							(/projectUnderLineTask/g.test(_this.$route.path) ? true : false);
						Public.$emit("onlineOffline", res.data.onlineOffline);
						if(/externalOffLineTask\/underLineHome/g.test(_this.$route.path)) {
							_this.finishFlag = true;
							_this.$store.state.getExternalTree && _this.$store.state.getExternalTree(); //用于判断作业模块下外审修改是否请求树节点状态
						}
						// 判断显示线上作业还是线下作业
						if(
							/projectImplementation/g.test(_this.$route.path) &&
							_this.isOnline != 2
						) {
							if(_this.isOnline == 0) {
								_this.$router.push({
									path: /projectUnderLineTask\//.test(_this.$route.path) ?
										_this.$route.path : "/zlpg/project/projectCont/projectImplementation/projectUnderLineTask/projectInfo"
								});
							} else {
								_this.$router.push({
									path: /projectOnlineTask\//.test(_this.$route.path) ?
										_this.$route.path : "/zlpg/project/projectCont/projectImplementation/projectOnlineTask/projectInfo"
								});
							}
						}
						if(_this.changeTreeFlag) {
							_this.upLoadParams.fileUrl = res.data.data[0].fileUrl;
							//          alert(/projectIssuedVersion|examineModification\/externalOnLineTask|externalOffLineTask\/workingManuscript|projectExternalAudit\/externalOnLineAudit|externalOffLineAudit\/workingManuscript/g.test(_this.$route.path))
							//examineModification/externalOnLineTask线上外审修改 externalOffLineTask/workingManuscript 线下外审修改底稿   projectExternalAudit/externalOnLineAudit线上外审审核底稿  externalOffLineAudit\/workingManuscript线下外审审核底稿
							if(/projectIssuedVersion|examineModification\/externalOnLineTask|externalOffLineTask|projectExternalAudit\/externalOnLineAudit|externalOffLineAudit/g.test(_this.$route.path)) {
								_this.noData = res.data.data[0].disabled;
							} else {
								_this.noData = false;
							}
							_this.authorityFun(res.data.data[0], res.data)
							_this.$store.state.taskId = res.data.data[0].taskId;
							Public.$emit("fileUrl", res.data.data[0].fileUrl);
							// 在以下情况下，避免将investorId值覆盖
							if(!/underLineSubmit/g.test(_this.$route.path)) {
								_this.$store.state.controlBtn = res.data.data[0].submitRevoke;
								_this.$store.state.investorId = res.data.data[0].id;
								_this.$store.state.investorName = res.data.data[0].name;
							}
							_this.$nextTick(function() {
								document.querySelectorAll(".navTree .el-tree-node__label")[0].classList.add("tree-actived");
								document.querySelectorAll(".navTree .el-tree-node__label")[0].parentNode.classList.add("tree_node_actived")
							})
						} else {
							var nodeLists = document.querySelectorAll(".navTree .el-tree-node__label");
							for(var i = 0; i < nodeLists.length; i++) {
								if(nodeLists[i].classList.value.indexOf('tree-actived') != -1) {
									var names = nodeLists[i].innerHTML;
									for(var j = 0; j < _this.treeArr.length; j++) {
										if(names == _this.treeArr[j].name) {
											_this.leftMenuClick(_this.treeArr[j],flag);
											break;
										}
									}
									break;
								}
							}
						}
						_this.$forceUpdate()
						callback1 && callback1();
					})
					.catch(function(error) {
						console.log(error);
						_this.$messageError(error);
						callback2 && callback2();
					});
				_this.$store.dispatch("transmitFullPageThis", this);
			},
			// 循环数据，增加节点层级
			dataLoop(Arr, level) {
				for(let i in Arr) {
					this.$set(Arr[i], 'level', level);
					this.$set(Arr[i], 'checked', '');
					// Arr[i]["level"] = level;
					// Arr[i]["checked"] = "";
					this.treeArr.push(Arr[i]);
					this.dataLoop(Arr[i].children, level + 1);
				}

				return Arr;
			},
			// 打开添加意见弹窗
			openAddOpinion() {
				this.openOpinion();
				this.showRightReply("添加意见");
			},
			//操作权限
			authorityFun(node, data) {
				if(/projectAuditing/g.test(this.$route.path)) {
					this.isSubmit = (this.isOnline == 1);
					this.isSubmitBtn = (this.isOnline == 1 && node.investorStatus != 1000001)
					this.maxBtnShow = (node.examineStatus.indexOf("1001") != -1);
					this.$store.state.maxBtnShow = this.maxBtnShow;
					this.btnShow = !(node.examineStatus.indexOf("1003") != -1);
					this.$store.state.readonly = this.btnShow;
					Public.$emit("maxBtnShow", this.maxBtnShow);
					Public.$emit("readonly", this.btnShow);
					this.$store.state.isNoEditInvestorPower = (node.examineStatus.indexOf("1004") != -1);
					if(data) {
						this.isShowAssignee = data.isShow;
					}
				} else if(/projectImplementation|examineModification/g.test(this.$route.path)) {
					this.isSubmit = (node.investorStatus === 1000002 && this.isOnline == 1);
					this.isSubmitBtn = (node.investorStatus === 1000006 && this.isOnline == 1) || false;
					this.maxBtnShow = (node.sendStatus&&node.sendStatus.indexOf("1001") != -1);
					this.$store.state.maxBtnShow = this.maxBtnShow;
					this.btnShow = !(node.sendStatus&&node.sendStatus.indexOf("1003") != -1); //有只读权限为false   正常为true
					this.$store.state.readonly = this.btnShow;
					Public.$emit("maxBtnShow", this.maxBtnShow);
					Public.$emit("readonly", this.btnShow);
					this.$store.state.isNoEditInvestorPower = (node.sendStatus.indexOf("1004") != -1); //不可新建现场任务和评估任务 true
					if(data) {
						this.showAudit = data.isShow;
					}
				}
			}, // 取消关闭
			closeOpinionBtn(type) {
				if(type === "right") {
					this.rightReplyHeight = "0";
					this.rightReplyPosition = "-275px";
				} else if(type === "center") {
					this.openReplyHeight = "0";
					this.openReplyPosition = "-315px";
				}
				this.closeOpinionUpload(type);
			},
			//上传附件
			uploadSuccess(response, file, fileList) {
				this.uploadData.fileDir = response.data.fileDir;
				this.uploadData.fileName = response.data.fileName;
			},
			//清空回复信息
			closeOpinionUpload(type) {
				if(type === "right") {
					this.rightReplyEditor.txt.html("");
				}
				if(type === "center") {
					this.addOpinionEditor.txt.html("");
				}
				this.clearLoadFileData();
				if(this.$refs.opinionUpload) {
					this.$refs.opinionUpload.clearFiles();
				}
			},
			//清除文件列表中的数据
			clearLoadFileData() {
				this.uploadData.fileDir = "";
				this.uploadData.fileName = "";
			},
			//标记已读
			readFun(item) {
				var _this = this;
				this.$http
					.post("/api/reportOpinionReply/updateReportOpinionReply", {
						id: item.id,
						tabFlag: "READ"
					})
					.then(response => {
						item.readStatus = 1;
					})
					.catch(error => {
						_this.$messageError(error);
					});
			},
			// 添加意见
			addOpinion(type) {
				//新增、回复接口
				let data = {
						projectId: this.$store.state.projectId,
						investorId: this.$store.state.investorId,
						taskDefKey: this.taskDefKey,
						filePath: this.uploadData.fileDir,
						fileName: this.uploadData.fileName
					},
					opinionText;
				if(type == "right") {
					data.opinionContent = this.rightReplyEditor.txt.html();
					opinionText = this.rightReplyEditor.$textElem[0].innerText;
				} else if(type == "center") {
					data.opinionContent = this.addOpinionEditor.txt.html();
					opinionText = this.addOpinionEditor.$textElem[0].innerText;
				}
				if(this.rightReplyTitle == "添加意见") {
					data.parentId = 0;
					data.moduleType = this.moduleTypeName[this.moduleType];
					data.moduleChildId = this.$store.state.moduleChildId;
				} else if(this.rightReplyTitle == "回复") {
					data.parentId = this.parentId;
					data.moduleType = this.opinionModuleType;
					data.moduleChildId = this.opinionModuleChildId;
				}
				if(data.opinionContent != "<p><br></p>" && opinionText.length < 500) {
					this.$http
						.post("/api/reportOpinionReply/saveReportOpinionReply", data)
						.then(response => {
							if(type == "right") {
								this.rightReplyHeight = "0";
								this.rightReplyPosition = "-275px";
							} else if(type == "center") {
								this.openReplyHeight = "0";
								this.openReplyPosition = "-315px";
							}
							this.clearLoadFileData();
							this.closeOpinionUpload(type);
							this.renderRightOpinion();
							if(response.data.parentId == 0) {
								this.$messageSuccess("意见添加成功");
							} else {
								this.$messageSuccess("意见回复成功");
							}
						})
						.catch(error => {
							this.$messageError(error);
						});
				} else if(opinionText.length > 500) {
					this.$messageError("输入的内容超过500个字");
				} else {
					this.$messageError("请输入回复意见");
				}
			},
			// 审核通过【线上,弹窗中的“确定”按钮】
			agreeReviewSure() {
				let params = {};
				this.getChecked();
				if(this.pms == "multiple") {
					params = {
						auditingJson: JSON.stringify(this.getCheckedObjArr),
						projectId: this.$store.state.projectId,
						flag: 0,
						onlineOffline: this.isOnline
					};
				} else {
					params = {
						auditingJson: JSON.stringify([{
							taskId: this.$store.state.taskId,
							investorId: this.$store.state.investorId
						}]),
						projectId: this.$store.state.projectId,
						flag: 0,
						onlineOffline: this.isOnline
					};
				}
				this.$http
					.post("/api/investors/underLineReportAuditing", params)
					.then(res => {
						this.closeDialog("agreeReview");
						this.getLeftTree();
					})
					.catch(error => {
						this.$messageError(error);
					});
			},
			// 点击审核获取按钮值【线下】
			offLineGetValue(pms) {
				var _this = this,
					params = {};
				_this.getChecked();
				if(pms == "multiple") {
					if(!this.getCheckKeyArr.length)
						return this.$messageError("请选择要审核的投资公司");
					_this.pms = pms;
					params = {
						auditingJson: JSON.stringify(_this.getCheckedObjArr)
					};
				} else {
					_this.pms = "";
					params = {
						auditingJson: JSON.stringify([{
							taskId: _this.$store.state.taskId,
							investorId: _this.$store.state.investorId
						}])
					};
				}
				if(_this.isOnline == 0) {
					_this.$http
						.post("/api/investors/underLineReportAuditingPage", params)
						.then(function(res) {
							_this.showDialog("offLineExamine");
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				} else {
					_this.findReportOpinionCount(pms);
					_this.showDialog("agreeReview");
				}
			},
			// 线下审核【弹窗中的‘确定’按钮方法】
			offLineExamineSure() {
				let _this = this,
					params = {};
				_this.getChecked();
				if(_this.pms == "multiple") {
					params = {
						auditingJson: JSON.stringify(_this.getCheckedObjArr),
						projectId: _this.$store.state.projectId,
						flag: _this.offLineExamineFlag,
						content: _this.examineOpinion,
						onlineOffline: _this.isOnline
					};
				} else {
					params = {
						auditingJson: JSON.stringify([{
							taskId: _this.$store.state.taskId,
							investorId: _this.$store.state.investorId
						}]),
						projectId: _this.$store.state.projectId,
						flag: _this.offLineExamineFlag,
						content: _this.examineOpinion,
						onlineOffline: _this.isOnline
					};
				}
				if(this.offLineExamineFlag === "")
					return _this.$messageError("请选择通过或者不通过");
				// if(_this.examineOpinion.length > 500){
				//   _this.$messageError("审核意见不能超过500个字");
				// }else{
				//   _this.$http.post("/api/investors/underLineReportAuditing", params)
				//   .then(function(res) {
				//     _this.getLeftTree();
				//     _this.offLineExamineFlag = "";
				//     _this.examineOpinion = "";
				//     _this.closeDialog("offLineExamine");
				//   })
				//   .catch(function(error) {
				//     _this.$messageError(error);
				//   });
				// }
				_this.strLength(_this.examineOpinion, 250, () => {
					_this.$http.post("/api/investors/underLineReportAuditing", params)
						.then(function(res) {
							_this.getLeftTree();
							if(_this.moduleType === "提交文档") {
								_this.$store.state.getSubmitFileData()
							}
							_this.offLineExamineFlag = "";
							_this.examineOpinion = "";
							_this.closeDialog("offLineExamine");
						})
						.catch(function(error) {
							_this.$messageError(error);
						});
				})
			},
			//意见总数、未回复意见数
			findReportOpinionCount(pms) {
				let _this = this;
				let params = {
					investorId: (pms == 'multiple' ? _this.getCheckKeyArr.join(',') : _this.$store.state.investorId),
					projectId: _this.$store.state.projectId
				}
				_this.$http
					.post("/api/reportOpinionReply/findReportOpinionCount", params)
					.then(function(res) {
						_this.total = res.data.total;
						_this.notReply = res.data.notReply;
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
			},
			//外审修改
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
				if(this.isOnline == 1) {
					routeData = this.$router.resolve({
						path: "/zlpg/project/projectCont/projectAuditing/projectIssuedVersion/IssuedOnLineVersion"
					});
				}
				window.open(routeData.href);
			},
			// 收起
			takeUp() {
				var _this = this;
				this.isfixed = !this.isfixed;
				this.$store.state.isfixedFlag = !this.$store.state.isfixedFlag;
				let h =
					window.innerHeight ||
					document.documentElement.clientHeight ||
					document.body.clientHeight;
				if(this.isfixed) {
					this.$refs.fullpage.style.minHeight = h - 60 + "px";
				} else {
					this.$refs.fullpage.style.minHeight = h - 280 + "px";
				}
				this.$store.commit("setMaxName");
				this.$store.state.oElemHg = this.$refs.fullpage.style.minHeight;
				//需要判断是不是资产基础法的页面
				if(/assetBased/g.test(this.$route.path)) {
					//需要判断是否是汇总表
					if(_this.$store.state.curSheetName.indexOf('汇总') > -1) {
						_this.$store.state.sumTableHgFn();
					} else {
						_this.$nextTick(function() {
							_this.$store.state.tableHgFn();
						})

					}

				}

			},
			// 左侧导航的显隐
			showNav() {
				if(this.navPosition == "0") {
					this.navPosition = "-350px";
					this.leftWidth = "25px";
					this.contentLeft = "0";
					this.navFlag = true;
					setTimeout(() => {
						this.$store.state.hierarchy = true;
					}, 400);
				} else {
					this.navPosition = "0";
					this.leftWidth = "350px";
					this.contentLeft = "249px";
					this.navFlag = false;
					this.$store.state.hierarchy = false;
				}

			},
			// 左侧树 - 获取选中的机构
			getChecked() {
				this.getCheckKeyArr = [];
				this.getCheckedObjArr = [];
				this.getCheckKey(this.projectNavTree);
			},
			// 循环获取数据
			getCheckKey(data) {
				for(let i in data) {
					if(data[i].checked) {
						this.getCheckKeyArr.push(data[i].id);
						this.$store.state.getCheckKeyData = this.getCheckKeyArr;
						//console.log(this.getCheckKeyArr);
						//console.log(this.$store.state.getCheckKeyData);
						this.getCheckedObjArr.push({
							taskId: data[i].taskId,
							investorId: data[i].id
						});
						this.$store.state.getCheckedObjArr = this.getCheckedObjArr;
					}
					this.getCheckKey(data[i].children);
				}
			},

			// 点击左侧树刷新右侧窗口
			leftMenuClick(node,flag) {
				//console.log(node.submitRevoke);
				this.$store.state.controlBtn = node.submitRevoke;
				//console.log(this.$store.state.controlBtn);
				var investorIdTabType = this.$store.state.investorId;
				this.changeTreeFlag = false;
				this.$store.state.fileUrl = node.fileUrl;
				this.noData = node.disabled;
				// this.submitRevoke = node.submitRevoke;
				this.$store.state.taskId = node.taskId;
				this.$store.state.auditData = !this.$store.state.auditData;
				//console.log(this.$store.state.taskId);
				this.$nextTick(() => {
					let nodeList = document.querySelectorAll(".navTree .el-tree-node__label");
					for(let i = 0; i < nodeList.length; i++) {
						if(node.name == nodeList[i].innerHTML) {
							nodeList[i].classList.add("tree-actived");
							nodeList[i].parentNode.classList.add("tree_node_actived")
						} else {
							nodeList[i].classList.remove("tree-actived");
							nodeList[i].parentNode.classList.remove("tree_node_actived")
						}
					}
					if(/assessment/.test(this.$route.path)){
						$(".catalog .el-tree-node__label").removeClass("tree-actived");
						$(".catalog .el-tree-node__label").parent().removeClass("tree_node_actived");
						document.querySelectorAll(".catalog .el-tree-node__label")[0].classList.add("tree-actived");
						document.querySelectorAll(".catalog .el-tree-node__label")[0].parentNode.classList.add("tree_node_actived")
					}
				})
				if(!/underLineSubmit/g.test(this.$route.path)) {
					this.$store.state.investorId = node.id;
				}
				//console.log(this.$store.state.investorId);
				this.authorityFun(node)
				this.upLoadParams.projectId = this.$store.state.projectId;
				this.upLoadParams.investorId = this.$store.state.investorId;
				if((/projectExternalAudit/g.test(this.$route.path) || /examineModification/g.test(this.$route.path))) {
					if(!this.noData && /externalAuditRecord/g.test(this.$route.path)) {
						this.changeTabType();
					} else if(!this.noData && /assetBased/g.test(this.$route.path)) {
						if(investorIdTabType != node.id) {
							this.changeTabType();
						}
					} else if(!this.noData && /incomeAndMarket/g.test(this.$route.path)) {
						this.changeTabType();
					} else if(!this.noData && /assessment/g.test(this.$route.path)) {
						if(!flag){
							if(typeof this.$store.state.saveContent === 'function') {
								this.$store.state.saveContent("", this.$store.state.postPublicFun())
							} else {
								this.$store.state.postPublicFun()
							}
						}
						this.changeTabType();
					} else if(!this.noData && /workingManuscript/g.test(this.$route.path)) {
						this.changeTabType();
					}
				} else {
					if(/possessioBonorum/g.test(this.$route.path)) {
						this.$store.state.updateAssetPossession();
					} else if(/evaluateTasks/g.test(this.$route.path)) {
						this.$store.state.updateList();
						//this.$messageSuccess("评估作业任务");
					} else if(/assetBased/g.test(this.$route.path)) {
						// this.$messageSuccess("资产基础法");
					} else if(/incomeAndMarket/g.test(this.$route.path)) {
						this.$store.state.initIncomeAndMarketData();
					} else if(/fieldInvestigation/g.test(this.$route.path)) {
						// this.$messageSuccess("现场调查任务");
					} else if(/marketHome/g.test(this.$route.path)) {
						// 如果当前是参与对比的公司，切换组织机构树以后跳转到对应比较法的被评估单位
						this.$store.state.fileFlag = "0";
					} else if(/assessment/g.test(this.$route.path)) {
						if(!flag){
							if(typeof this.$store.state.saveContent === 'function') {
								this.$store.state.saveContent('', this.$store.state.postPublicFun())
							} else {
								this.$store.state.postPublicFun()
							}
						}
					} else if(/workingManuscript/g.test(this.$route.path)) {
						this.$store.state.workingManuscript && this.$store.state.workingManuscript();
					} else if(/submitFile/g.test(this.$route.path)) {
						this.$store.state.getSubmitFileData();
					}
				}
			},
			//选择需要送审或者审核的公司
			selectedCompany() {
				const _this = this;
				// if (_this.$store.state.readonly) return;
				this.getChecked();
				if(!this.getCheckKeyArr.length)
					return this.$messageError("请选择要送审的投资公司");
				let projectId = this.getCheckKeyArr.join(",");
				//作业-提交送审
				console.log(_this.getCheckKeyArr.join(","));
				//console.log(this.$store.state.getCheckKeyData.join(","));
				if(/projectImplementation/g.test(this.$route.path)) {
					_this.$http
						.post("api/investors/sendInvestors", {
							projectId: _this.$store.state.projectId,
							investorIds: _this.getCheckKeyArr.join(","),
							onlineOffline: /projectUnderLineTask/.test(_this.$route.path) ?
								0 : /projectOnlineTask/.test(_this.$route.path) ?
								1 : ""
						})
						.then(response => {
							this.getLeftTree();
							this.$store.state.readonly = false;
							if(/submitFile/g.test(this.$route.path)) {
								this.$store.state.getSubmitFileData();
							}
							this.$messageSuccess(response.msg);

						})
						.catch(error => {
							this.$messageError(error);
						});
				}
			},
			// 左侧树导出
			downLoadFile(item) {
				if(!item) {
					this.getChecked();
					if(!this.getCheckKeyArr.length)
						return this.$messageError("未选择股权机构，请确认");
					window.location.href =
						"/api/projectdocs/downloadProjectdocs?token=" +
						this.$getCookie("token") +
						"&type=" +
						(/projectImplementation/.test(this.$route.path) ? (this.underLineTask ? 0 : 1) : this.isOnline) +
						"&investorIds=" +
						this.getCheckKeyArr.join(",");
				} else {
					window.location.href =
						"/api/file/downloadFile?token=" +
						this.$getCookie("token") +
						"&docsName=" +
						this.$filename(item.fileName) +
						"&flag=2&alyPath=" +
						item.filePath;
				}
			},

			/* ########################## 中间方法 #############################*/
			// tab切换
			changeTab(item, index) {
				this.typeIndex = index;
				if((this.typeIndex != 0 && /externalOnLineTask/g.test(this.$route.path) || this.typeIndex == 5 && /externalOffLineTask/g.test(this.$route.path)) && !this.noData) {
					this.changeTabType(this.changeTabCallback, item, index);
				} else {
					this.changeTabCallback(item, index);
				}
			},
			changeTabCallback(item, index) {
				this.$store.state.moduleChildId = "";
				this.closeOpinion();
				let thisPath = '';
				if(this.hasParams || /underLineSubmit/.test(this.$route.path) || /marketHome/.test(this.$route.path)) {
					if(this.hasParamsInvestorId || this.$route.params.id) {
						thisPath = this.$route.path.substring(0, this.$route.path.indexOf(this.$route.path.split('/')[this.$route.path.split('/').length - 3]));
					} else {
						thisPath = this.$route.path.substring(0, this.$route.path.indexOf(this.$route.path.split('/')[this.$route.path.split('/').length - 2]));
					}
				} else {
					thisPath = this.$route.path.substring(0, this.$route.path.indexOf(this.$route.path.split('/')[this.$route.path.split('/').length - 1]));
				}

				this.moduleType = item.label;
				// this.setShTtmeScroll();
				this.xiaoxitop = [
					"资产基础法",
					"收益法",
					"市场法",
					"评估报告",
					"评估说明"
				].indexOf(this.moduleType);
				if(item.path == "marketHome"){
					this.$router.push({
						path: thisPath + item.path
					});
				}else	if(item.path == "assessment" || item.path == "incomeAndMarket") {
					this.fileDetail = null;
					this.$router.push({
						path: thisPath + item.path + "/" + index
					});
				} else if(item.path == "projectInfo" && /externalOnLineAudit/g.test(this.$route.path)) {
					this.$router.push({
						path: "/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOnLineAudit/externalAuditApply"
					});
				} else if(item.path == "projectInfo" && /externalOnLineTask/g.test(this.$route.path)) {
					this.$router.push({
						path: "/zlpg/project/projectCont/examineModification/externalOnLineTask/externalAuditRecord"
					});
				} else {
					this.$router.push({
						path: thisPath + item.path
					});
					if(/externalOffLineTask\/underLineHome/.test(thisPath + item.path)) {
						this.finishFlag = true;
					}
				}
				if(!this.underLineTask && this.opinionWidth != "0") {
					this.setShTtmeScroll();
				}
			},
			// tab切换时调用接口
			changeTabType(callback, item, index) {
				var _this = this;
				if((this.typeIndex != 0 && /externalOnLineTask/g.test(this.$route.path) || this.typeIndex == 5 && /externalOffLineTask/g.test(this.$route.path)) && !this.noData) {
					var dataObj = {
						projectId: _this.$store.state.projectId,
						investorId: _this.$store.state.investorId,
						type: _this.typeIndex,
					}
					this.changeTabCopy = false;
					dataObj['onlineOffline'] = /externalOnLineTask/g.test(_this.$route.path) ? 1 : 0;
					_this.$http.post('/api/changeInvestors/copyInvestorOtherData', dataObj).then(function(data) {
						_this.changeTabCopy = true;
						callback && callback(item, index)
					}).catch(function(error) {
						_this.$messageError(error);
					});
				} else {
					callback && callback(item, index)
				}

			},
			// 导入按钮
			importFile() {
				if(/possessioBonorum/g.test(this.$route.path)) {
					that.upLoadParams.uploadType  = 'all';
					if(this.loading != true) {
						that.navPosition = 0;
						that.showNav();
						that.getUploadStatu(function() {
							that.loading = false;
							clearInterval(that.timer);
						}, 'upload', false);
						return;
					}
					that.$messageError('当前股权机构正在操作,请稍后......');
				}
				delete that.upLoadParams.uploadType;
				this.$store.state.importFile();
			},
			loadFile() {
				// this.maskLoading = this.$loading({
				//   lock: false,
				//   text: "Loading",
				//   spinner: "el-icon-loading",
				//   background: "rgba(0, 0, 0, 0.2)"
				// });
				if(/possessioBonorum/g.test(this.$route.path)) {
					this.loading = true
				}
			},
			/**资产占有方上传成功的回调 */
			uploadPosseSuccess(res, file) {
				var _this = this,
					flag;
				const {
					projectId,
					investorId
				} = _this.$store.state;
				that.stausFlag = false;
				if(/projectAuditing/g.test(this.$route.path)) {
					flag = 1;
				} else if(/projectImplementation/g.test(this.$route.path)) {
					flag = 0;
				}
				_this.$http
					.post("/api/assetownerinformation/completeAssetsPossession", {
						projectId,
						investorId,
						flag: flag,
						assetsId: this.assetsId,
						alyPath: res.data.fileDir,
						filename: res.data.fileName,
						showLoading: false
					})
					.then(response => {})
					.catch(err => {
						_this.loading = false;
						clearInterval(that.timer);
						that.timer = '';
						if(typeof _this.cancel === 'function') {
							// 取消请求
							_this.cancel();
						}
						_this.stausFlag = true;
						_this.loadTxt = '';
						_this.$messageError(err);
						_this.uploadFlag = true;
						return;
					});
				_this.fileDetail = res.data;
				//需要轮询
				//var timer ='';
				clearInterval(that.timer);
				that.timerOut = setTimeout(function() {
					if(_this.stausFlag) {
						_this.stausFlag = false;
						return;
					}
					//如果已经切换页面则不需要请求
					if(that.$route.path != '/zlpg/project/projectCont/projectImplementation/projectOnlineTask/possessioBonorum' &&
						that.$route.path != '/zlpg/project/projectCont/projectAuditing/projectReportAudit/possessioBonorum'
					) return;
					that.timer = '';
					that.getLoadingText('upload');
					that.intervalFn();
				}, 10000)
			},
			//收益法导入前
			incomeBeforeUpload(){
				if((this.typeIndex == '4' || /incomeLaw/g.test(this.$route.path)) && !this.$store.state.incomeInitId){
					this.$messageError("请初始化收益法导入模板")
					return false;
				}
				if(this.typeIndex == '4' || /incomeLaw/g.test(this.$route.path)){
					this.maskLoading = this.$loading({
						lock: true,
						text: "Loading",
						spinner: "el-icon-loading",
						background: "rgba(0, 0, 0, 0.2)"
					});
				}
			},
			//导入成功的回调
			uploadFileSuccess(res, file) {
				// this.loading=false
				// this.maskLoading.close();
				let _this = this;
				const {
					projectId,
					investorId
				} = _this.$store.state;
				_this.loading = false;
				if(_this.typeIndex == '4' || /incomeLaw/g.test(this.$route.path)){
					_this.$http
					.post("/api/incomeExcel/uploadExcel", {
						projectId: _this.$store.state.projectId,
						investorId: _this.$store.state.investorId,
						alyPath: res.data.fileDir,
						isCalculation:"yes",
						condition: _this.$store.state.incomeInitId,
						showLoading:false
					}).then(function(res){
						_this.maskLoading.close();
						_this.$store.commit("reloadIncomeTableFun");
					}).catch(function(error) {
						_this.maskLoading.close();
						_this.$messageError(error)
					});
				}else{
					_this.$http
					.post("/api/projectdocs/parseDocument", {
						projectId: _this.$store.state.projectId,
						investorId: _this.$store.state.investorId,
						docType: 1,
						filetype: _this.$route.params.tabId == 4 ?
							"PRESENTATIONINCOMELAW" : _this.$route.params.tabId == 5 ?
							"PRESENTATIONMARKETLAW" : "",
						fileName: res.data.fileName,
						filePath: res.data.fileDir,
					})
					.then(function(res) {
						let params = {
							fileName: res.data.fileName,
							filePath: res.data.filePath,
							hasFile: true
						};
						Public.$emit("hasFile", params);
						if(/incomeAndMarket/g.test(_this.$route.path)) return;
						_this.$http
							.post("api/initializationContentController/savaOrUpdateContent", {
								projectId: _this.$store.state.projectId,
								investorId: _this.$store.state.investorId,
								showLoading: false
							})
							.then(response => {
								_this.loading = false;
								_this.$messageSuccess("导入成功");
							})
							.catch(err => {
								_this.$messageError(err);
							});
					})
					.catch(function(error) {
						_this.$messageError(error);
					});
				_this.fileDetail = res.data;
				}
			},
			/**循环 */
			intervalFn() {
				clearInterval(that.timer);
				// that.cancel();
				this.timer = setInterval(function() {
					that.getUploadStatu(function() {
						clearInterval(that.timer);
						that.timer = '';
						//需要刷新左边的tree
						that.loading = false;
						that.nums++;
						that.$store.state.updateAssetPossession();
						that.$http.post('/api/investors/findInvestors', {
							projectId: that.$store.state.projectId
						}).then(res => {
							that.transportParams(res.data);
							that.$messageSuccess("导入成功");
						})
						that.sendConnect();

					}, null, true)
				}, 5000)
			},
			/*解析是否完成*/
			getUploadStatu(callBack, type, LeftTreeFlag) {
				var _this = this;
				var CancelToken = this.CancelToken;
				if(!/possessioBonorum/.test(_this.$route.path)) {
					clearInterval(that.timer);
					that.timer = '';
					return;
				}
				this.$http.post('/api/xlsUpdateData/getUploadStatus', {
					projectId: this.$store.state.projectId,
					investorId: this.$store.state.investorId,
					showLoading: false
				}, {
					cancelToken: new CancelToken(function executor(c) {
						_this.cancel = c
					})
				}).then(function(res) {
					if(res.msg == "初次导入中"||res.msg=="部分导入页面对比中"||res.msg=="部分导入中"||res.msg=="批量修改中"||res.msg=="快捷作价中"|| res.msg=="台账导入页面对比中") {
						that.uploadFlag = false;
						that.navPosition = 0;
						that.loading = true;
						that.showNav();
						that.getLoadingText(res.msg);
						if(type == 'upload' || type == "export") {
							that.$messageError('当前股权机构有资产申报表正在'+res.msg+',请稍后......');
						}
						// if(type == "inspect" || type == "ack" || type == "reload") {
						// 	that.getLoadingText(res.msg);
						// }
						return;
					} else if(res.msg == "数据处理完成") {
						//上传的时候需要刷新数
						if(LeftTreeFlag) {
							that.getLeftTree(function() {
								that.uploadFlag = true;
								callBack && callBack();
							}, function() {
								that.uploadFlag = true;
							});
						}

					}

				})
			},
			// 导出按钮
			exportFile() {
				this.$store.state.exportFile(this.fileDetail);
			},
			// 保存按钮
			saveMsg() {
				this.$store.state.saveMsg();
			},
			// 生成报告
			createFile() {
				this.$store.state.createFile();
			},

			/* ########################## 右侧方法 #############################*/
			// 右侧意见的显隐
			openOpinion() {
				this.opinionPosition = "0";
				this.opinionWidth = "305px";
				this.renderRightOpinion();
			},
			closeOpinion() {
				this.opinionPosition = "-305px";
				this.opinionWidth = "0";
			},
			// 切换意见清单
			examineFun(e) {
				var _this = this;
				this.taskDefKey = this.opinionData[e.index].taskDefKey;
				this.opinionDataInd = e.index;
				this.setModuleTypeA(this.opinionDataInd);
				this.$nextTick(function() {
					_this.setShTtmeScroll();
				});
			},
			// 删除意见
			delOpinionSure() {
				//删除意见接口
				this.$http
					.post("/api/reportOpinionReply/updateReportOpinionReply", {
						id: this.deleteOpinionId,
						tabFlag: "DEL"
					})
					.then(response => {
						this.renderRightOpinion();
						this.closeDialog("delOpinion");
					})
					.catch(error => {
						this.$messageError(error);
					});
			},
			// 展开意见详情
			openReplayDialog(val, index) {
				this.detailsData = val;
				this.showDialog("opinionDetail", () => {
					this.addOpinionEditor = new E(
						"#openReplyEditorTop",
						"#openReplyEditorBottom"
					);
					this.addOpinionEditor.customConfig.uploadImgShowBase64 = true; //使用base64上传
					this.addOpinionEditor.customConfig.showLinkImg = false; //隐藏网络图片tab
					this.addOpinionEditor.create();
				});
				this.closeOpinion();
				this.$nextTick(() => {
					this.$refs.opinionDetailScroll.$el.childNodes[0].scrollTop = this.$refs.opinionDetailScroll.$el.childNodes[0].childNodes[0].childNodes[
						index
					].offsetTop;
				});
			},
			// 回复小弹窗显隐
			showRightReply(title, val) {
				this.rightReplyPosition = "0";
				this.rightReplyHeight = "275px";
				this.rightReplyTitle = title;
				if(val) {
					this.parentId = val.id || 0;
					this.opinionModuleType = val.moduleType;
					this.opinionModuleChildId = val.moduleChildId;
				}
			},
			// 展开弹窗回复
			showOpenReply(title, val) {
				this.openReplyPosition = "-20px";
				this.openReplyHeight = "275px";
				this.rightReplyTitle = title;
				this.parentId = val.id;
				this.opinionModuleType = val.moduleType;
				this.opinionModuleChildId = val.moduleChildId;
			},
			// 打开弹窗公共方法
			showDialog(refName, callback) {
				if(refName == "delOpinion") {
					this.deleteOpinionId = callback;
					this.$refs[refName].showDialog();
				} else {
					this.$refs[refName].showDialog(callback);
				}
			},
			// 关闭弹窗
			closeDialog(refName) {
				this.$refs[refName].closeDialog();
			},
			isOnlineJob(val) {
				if(this.underLineTask) {
					this.$router.push({
						path: '/zlpg/project/projectCont/projectImplementation/projectOnlineTask/projectInfo'
					});
				} else {
					this.$router.push({
						path: '/zlpg/project/projectCont/projectImplementation/projectUnderLineTask/projectInfo'
					});
				}
				this.underLineTask = !this.underLineTask;
			},
			//意见页面直接跳转到对应意见
			setShTtmeScroll() {
				if(this.moduleTypeArr.length === 0) {
					return;
				}
				if(!this.underLineTask && this.opinionWidth != "0") {
					var moduleType = this.moduleTypeName[this.moduleType];
					if(moduleType) {
						//取出对应的下表和多个dom元素
						var moduleTypeIndex = this.moduleTypeIndArr[
								this.moduleTypeArr.indexOf(moduleType.toString())
							],
							typeNodes = this.$refs.shTtmeChilds[this.opinionDataInd].$el
							.childNodes[0].childNodes[0].childNodes;
						if(moduleTypeIndex === 0 || moduleTypeIndex) {
							if(moduleType == "1" || moduleType == "2") {
								var len;
								if(this.moduleTypeArr.length > 1) {
									len = this.moduleTypeIndArr[moduleTypeIndex + 1];
								} else {
									len = this.opinionData.length;
								}
								for(let i = moduleTypeIndex; i < len; i++) {
									var list = this.opinionData[this.opinionDataInd].reportOpinionList;
									if(list[i].moduleChildId === this.$store.state.moduleChildId && list[i].moduleType == moduleType) {
										this.$refs.shTtmeChilds[this.opinionDataInd].$el.childNodes[0].scrollTop = typeNodes[i].offsetTop;
										return;
									}
								}
								this.$refs.shTtmeChilds[
										this.opinionDataInd
									].$el.childNodes[0].scrollTop =
									typeNodes[moduleTypeIndex].offsetTop;
							} else {
								this.$refs.shTtmeChilds[
										this.opinionDataInd
									].$el.childNodes[0].scrollTop =
									typeNodes[moduleTypeIndex].offsetTop;
							}
						} else {
							this.$refs.shTtmeChilds[
								this.opinionDataInd
							].$el.childNodes[0].scrollTop = 0;
						}
					} else {
						this.$refs.shTtmeChilds[
							this.opinionDataInd
						].$el.childNodes[0].scrollTop = 0;
					}
					// this.moduleTypeArr     //意见5大模块
					// this.moduleTypeIndArr  //意见5大模块对应下表
					// this.moduleTypeName[this.moduleType]   类型
					// this.$refs.shTtmeChilds[this.opinionDataInd].$el.childNodes[0].scrollTop
				}
			},
			//生成moduleTypeArr ，moduleTypeIndArr
			setModuleTypeA(index) {
				var list = this.opinionData[index].reportOpinionList;
				this.moduleTypeArr = [];
				this.moduleTypeIndArr = [];
				for(let i = 0; i < list.length; i++) {
					if(this.moduleTypeArr.indexOf(list[i].moduleType) == -1) {
						this.moduleTypeArr.push(list[i].moduleType);
						this.moduleTypeIndArr.push(i);
					}
				}
			},
			renderRightOpinion(taskDefKey) {
				let _this = this,
					params = {
						investorId: this.$store.state.investorId,
						projectId: this.$store.state.projectId
					};
				if(taskDefKey) {
					params.taskDefKey = taskDefKey;
				}
				//查询意见接口
				this.$http
					.post("/api/reportOpinionReply/findReportOpinionReply", params)
					.then(response => {
						if(!_this.rightEditorCreated) {
							_this.rightEditorCreated = true;
							// 右侧回复小弹窗
							_this.rightReplyEditor = new E(
								"#rightReplyEditorTop",
								"#rightReplyEditorBottom"
							);
							_this.rightReplyEditor.customConfig.uploadImgShowBase64 = true; //使用base64上传
							_this.rightReplyEditor.customConfig.showLinkImg = false; //隐藏网络图片tab
							_this.rightReplyEditor.customConfig.menus = [
								"fontSize", // 字号
								"italic", // 斜体
								"underline", // 下划线
								"foreColor", // 文字颜色
								"justify", // 对齐方式
								"image", // 插入图片
								"table" // 表格
							];
							_this.rightReplyEditor.create();
						}
						_this.opinionData = response.data;
						if(_this.opinionData.length > 0) {
							_this.taskDefKey = _this.opinionData[0].taskDefKey;
						}
						if(response.data.length) {
							if(_this.tabVal == "" || _this.tabVal == "0") {
								_this.tabVal = "opinionData0";
							}
							_this.detailsData =
								response.data[
									_this.tabVal.substr(_this.tabVal.length - 1, 1)
								].reportOpinionList;
							_this.setModuleTypeA(_this.opinionDataInd);
							_this.$nextTick(function() {
								_this.setShTtmeScroll();
							});
						} else {
							_this.tabVal = "";
						}
					})
					.catch(error => {
						_this.$messageError(error);
					});
			},
			sendConnect() {
				this.$http.post('/api/initializationContentController/savaOrUpdateContent', {
					projectId: that.$store.state.projectId,
					investorId: that.$store.state.investorId,
					showLoading: false
				})
			},
			//文件上传前
			beforeUpload(file) {
				this.getLoadingText('upload');
				this.uploadFlag = false;
				return
			},
			/*加载动画的文案 */
			getLoadingText(type) {
				this.loading = true;
				this.loadTxt = ' ';
				var text = '';
				if(type=="upload"||type=="初次导入中"||type=="部分导入中"||!type){
					text = '<p class = "loading-head-text">正在导入...</p>大约需要2分钟，您可操作其他页面<br/><p class="loading-head-text loading-content">亲，先去忙别的工作吧~</p>';
				}else{
					text = '当前股权机构有资产申报表正在'+type+'，完成后才可操作哦~<br/>亲，先去操作其他页面吧~';
				}
				setTimeout(function() {
					var oLoading = document.querySelector('.el-loading-text');
					oLoading.innerHTML = text;
				}, 100)

			},
			//外审修改提交
			modifyExternal(val) {
				this.getChecked();
				if(!this.getCheckKeyArr.length)
					return this.$messageError("请选择要外审修改送审的投资公司");

				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '外审修改申请';
				this.$store.state.commonBtn = '确认提交';
				this.$store.state.componentsType = 'projectModifyExternal';
				this.$store.state.dataObj = val;
			},
			//审核按钮
			externalAuditBtn(val) {
				this.getChecked();
				if(!this.getCheckKeyArr.length) {
					return this.$messageError("请选择需要审核的投资公司");
				}
				this.$store.commit('changeShowCommon');
				this.$store.state.commonTitle = '外审修改审核';
				this.$store.state.commonBtn = '';
				this.$store.state.componentsType = 'projectExternalAuditMent';
				this.$store.state.dataObj = val;
			},
			//返回上一页
			goBack() {
				this.$store.state.rememberSearchCondition = true;
				this.$router.push({
					path: JSON.parse(this.$getCookie("searchCondition")).dataSearchPath
				});
			},
			/**快捷作价 */
			showQuickPrice(){
			  	let _this = this;
				this.$store.state.getUploadStatu(()=> {
				_this.$store.commit('changeShowCommon');
				_this.$store.state.commonTitle = '快捷作价';
				_this.$store.state.commonBtn = '确认';
				_this.$store.state.componentsType = 'quickPrice';
				}, 'ack');
			},
			/**资产基础法-案列查看*/
			searchCase(){
				if(this.$store.state.isSavingFlag) return
				if(this.$store.state.caseTxt=="只看案例"){
					this.$store.state.caseTxt = "显示全部"
				}else{
					this.$store.state.caseTxt = "只看案例"
				}
				this.$store.state.resetPageData();
				this.$store.state.getSheetData();
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.full_page {
		width: 100%;
		position: relative;
		background: #f6f6f6;
		box-sizing: border-box;
		overflow: hidden;
		/deep/ .a-center-dialog .center-body {
			padding: 0 20px 20px 20px;
		}
		.full_page_title {
			height: 35px;
			line-height: 35px;
			padding: 0 20px;
			box-sizing: border-box;
			background: #fff;
			border-bottom: 1px solid #e5e5e5;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 80;
			transition: all 0.5s ease;
			.projectName {
				margin-right: 20px;
				padding-left: 21px;
				position: relative;
				font-weight: bold;
				max-width: 400px;
				&:before {
					position: absolute;
					content: "";
					width: 6px;
					height: 6px;
					background: #f09237;
					display: block;
					top: 14px;
					left: 10px;
					border-radius: 50%;
				}
			}
			.project-nature {
				margin-right: 10px;
				overflow: hidden;
				span {
					height: 25px;
					padding: 0 10px;
					line-height: 23px;
					text-align: center;
					color: #98c268;
					background: #f1f8e8;
					border: 1px solid #c8deaf;
					border-radius: 2px;
					float: left;
					margin: 5px 10px 5px 0;
					font-size: 12px;
					box-sizing: border-box;
				}
				 :nth-child(2) {
					color: #f09237;
					background: #fff2e5;
					border: 1px solid #ffc68f;
				}
				 :nth-child(3) {
					color: #7c9fee;
					background: #e9f0ff;
					border: 1px solid #bbd0ff;
				}
				 :nth-child(4) {
					color: #50adee;
					background: #e6f5ff;
					border: 1px solid #9bd6ff;
				}
			}
			.icon-shouqi,.icon-back {
				font-size: 12px;
				color: #B0CCF7;
				margin-right: 6px;
			}
      .button-group-hook{position: relative;}
      .save-hook{
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.8);
        font-size: 13px;
        color: #98c268;
        margin-right: 30px;
      }
		}
		.list-group {
			text-align: center;
			height: 34px;
			line-height: 34px;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 80;
			background: #fafafa;
			border: 1px solid #ececec;
			border-bottom: none;
			li {
				float: left;
				font-size: 13px;
				>a {
					font-size: 13px;
					margin-right: 20px;
				}
			}
			.flag {
				float: right;
				margin-right: 20px;
				width: 70px;
				height: 25px;
				background: #3a80ec;
				border-radius: 2px;
				margin-top: 5px;
				color: #fff;
				line-height: 25px;
				text-align: center;
				font-size: 13px;
				cursor: pointer;
			}
			li:first-child>span {
				position: relative;
				margin-left: 20px;
				font-size: 13px;
			}
			li:first-child>span:after {
				content: "";
				position: absolute;
				right: -14px;
				top: 1px;
				height: 20px;
				width: 2px;
				background: #c8c8c8;
			}
			li:nth-child(2) {
				margin-left: 40px;
				margin-right: 20px;
			}
			li:nth-child(2),
			li:nth-child(3) {
				cursor: pointer;
			}
		}
		.change-btn {
			font-size: 13px;
			color: #505050;
			.iconfont {
				color: #c0c0c0;
				font-size: 10px;
				margin-right: 4px;
			}
			span {
				color: #1246c7;
				font-weight: bold;
				margin: 0 12px 0 4px;
				cursor: pointer;
			}
		}
		.selected {
			border-bottom: 2px solid #145fd2;
			color: #145fd2;
		}
		.full_page_left {
			position: absolute;
			left: 0;
			top: 0px;
			bottom: 10px;
			box-sizing: border-box;
			width: auto;
			z-index: 1001;
			transition: all 0.5s ease;
			.projectNavTree {
				overflow: hidden;
				transition: all 0.5s ease;
				box-sizing: border-box;
				border: 1px solid #ececec;
				border-top: none;
				height: 100%;
				position: absolute;
				background: #fff;
				padding-bottom: 110px;
				width: 350px;
				.navTree {
					padding: 10px 5px;
					position: relative;
					bottom: 110px;
					top: 0;
					height: 100%;
					box-sizing: border-box;
				}
				.nav_bottom {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					max-height: 110px;
					overflow: hidden;
					.bmStatusExternal {
						span {
							min-width: 72px;
							text-align: left;
						}
					}
					.bmStatus {
						padding: 5px 10px;
						text-align: center;
						border-bottom: 1px solid #ececec;
						display: flex;
						align-content: flex-start;
						flex-wrap: wrap;
						span {
							font-size: 12px;
							color: #636363;
							padding-left: 15px;
							position: relative;
							margin: 0 12px;
							height: 20px;
							line-height: 20px;
							display: inline-block;
							&:before {
								position: absolute;
								content: "";
								width: 10px;
								height: 10px;
								display: block;
								left: 0;
								top: 5px;
								border-radius: 2px;
							}
						}
						.gray:before {
							background-color: #D3D3D3;
						}
						.heise:before {
							background-color: #29292b;
						}
						.lvse:before {
							background-color: #21cc64;
						}
						.zise:before {
							background-color: #7c9fee;
						}
						.huangse:before {
							background-color: #f5a623;
						}
						.hongse:before {
							background-color: #ff7182;
						}
					}
					.nav_bottom_btn {
						text-align: center;
						padding: 17px 0;
						.externalBtn {
							min-width: 100px;
						}
					}
					.smallPadding {
						padding: 7px 0;
					}
				}
			}
			.nav_btn {
				width: 25px;
				position: absolute;
				height: 47px;
				box-sizing: border-box;
				right: 0;
				top: 0;
				background-repeat: no-repeat;
				background-position: center;
				top: 50%;
				margin-top: -23px;
				z-index: 10;
			}
			.nav_btn:hover {
				opacity: 0.7;
			}
			.nav_open_btn {
				background-image: url(../../assets/common/open_btn.png);
			}
			.nav_close_btn {
				background-image: url(../../assets/common/close_btn.png);
			}
		}
		.full_page_content {
			position: absolute;
			box-sizing: border-box;
			bottom: 1px;
			top: -1px;
			left: 0;
			right: 0;
			overflow: hidden;
			transition: all 0.5s ease;
			width: 100%;
			.full_page_center {
				position: absolute;
				bottom: 0;
				top: 0;
				height: 100%;
				left: 0;
				right: 0;
				margin: auto;
				background-color: #fff;
				border: 1px solid #ececec;
				.fullPageContent-header {
					height: 35px;
					line-height: 35px;
					background: #f6faff;
					border-top: 1px solid #ececec;
					border-bottom: 1px solid #ececec;
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
					display: flex;
					margin: 0 auto;
					text-align: center;
					z-index: 60;
					box-sizing: border-box;
					>li {
						display: inline-block;
						padding: 0 10px;
						font-size: 13px;
						cursor: pointer;
						box-sizing: border-box;
						height: 35px;
						line-height: 35px;
						.mini-btn {
							width: 45px;
							height: 20px;
							text-align: center;
							line-height: 18px;
							font-size: 12px;
							margin: 0 0 0 5px;
							border: 1px solid #3a80ec;
							box-sizing: border-box;
						}
						.save-btn {
							background-color: #f09237;
							display: inline-block;
							color: #fff;
							border-radius: 2px;
							font-weight: 400;
							border-color: #f09237;
							transition: all 0.5s ease;
							&:hover {
								opacity: 0.7;
								transition: all 0.5s ease;
							}
						}
					}
					.active {
						background-color: #fff;
						text-align: left;
						color: #1962d3;
						font-weight: bold;
						height: 35px;
						border-left: 1px solid #ececec;
						border-right: 1px solid #ececec;
					}
				}
				.fullPageContent-content {
					margin: 45px auto 10px;
					background: #fff;
					box-sizing: border-box;
					position: absolute;
					right: 1px;
					left: 0;
					top: 0;
					bottom: 0;
					padding-left: 10px;
					padding-right: 10px;
					.nodata-con {
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						height: 100px;
						.nodata {
							height: 60px;
							margin-bottom: 16px;
							background: url(../../assets/common/nodata.png) no-repeat center;
						}
						.nodata-centent {
							color: #909090;
							font-size: 13px;
						}
					}
				}
			}
			.full_page_right {
				position: absolute;
				right: 0;
				top: 34px;
				bottom: 0;
				transition: all 0.5s ease;
				overflow: hidden;
				.opinion_box {
					width: 305px;
					height: 100%;
					position: relative;
					z-index: 1009;
					border: 1px solid #ececec;
					box-sizing: border-box;
					background: #fff;
					transition: all 0.5s ease;
					.opinion-title {
						height: 40px;
						background: #f6faff;
						border-bottom: 1px solid #e5e5e5;
						position: relative;
						text-align: center;
						line-height: 40px;
						font-size: 14px;
						color: #262628;
						/*padding:0 80px 0 20px;*/
						margin-bottom: 5px;
						.closeBtn {
							position: absolute;
							left: 10px;
							top: 11px;
							cursor: pointer;
							width: 18px;
							height: 18px;
							line-height: normal;
						}
						.export_btn {
							position: absolute;
							right: 10px;
							top: 8px;
						}
					}
					.opinion_content {
						position: absolute;
						left: 0;
						top: 46px;
						width: 100%;
						bottom: 0;
						.sh_item_box {
							position: relative;
							height: 100%;
						}
						.noData {
							height: 100px;
							line-height: 185px;
						}
						.sh_title a.sh_title_read {
							margin-top: 0;
							margin-right: 10px;
							color: #50adee;
						}
					}
					.right_replay_box {
						overflow: hidden;
						position: absolute;
						bottom: 0px;
						height: 275px;
						width: 100%;
						transition: all 0.5s ease;
						border-top: 1px solid #ececec;
						box-sizing: border-box;
						z-index: 2;
						.right_reply {
							padding: 15px 10px;
							background: #fff;
							box-sizing: border-box;
							z-index: 88;
							transition: all 0.5s ease;
							#rightReplyEditorBottom {
								height: 115px;
								border: 1px solid #ccc;
							}
						}
					}
				}
			}
			.opinion_btn {
				width: 40px;
				height: 90px;
				display: block;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -45px;
				z-index: 1001;
				box-sizing: border-box;
				padding: 12px;
				background-color: #5fa9ec;
				color: #fff;
				line-height: 22px;
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
				transition: all 0.3s ease;
				&:hover {
					opacity: .7;
					box-shadow: 0px 2px 5px 0px rgba(188, 221, 251, 1);
					transition: all 0.3s ease;
				}
			}
			.icon-caidan:hover {
				color: #3a80ec !important;
			}
		}
	}

	.fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		min-width: 1200px;
		.full_page_content {
			margin-top: 5px;
			min-width: 1200px;
			top: 36px;
			.full_page_center {
				left: 10px;
				right: 10px;
			}
			.full_page_center,
			.fullPageContent-content {
				min-width: 1200px;
			}
			/*.fullPageContent-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }*/
		}
	}

	.module-type-con {
		border-bottom: 1px solid rgba(152, 194, 104, 1);
		.module-type {
			width: 150px;
			height: 30px;
			background: #98c268;
			border-radius: 15px;
		}
	}

	.sh_itme {
		border: 1px solid #ececec;
		margin-top: 10px;
		margin-right: 1px;
		.sh_title {
			border-bottom: 1px solid #e5e5e5;
			padding: 0 12px;
			background: #f6faff;
			height: 32px;
			line-height: 32px;
			.el-icon-delete {
				&:hover {
					color: #f09237 !important;
				}
			}
			.sh_item_num {
				width: 14px;
				height: 14px;
				text-align: center;
				line-height: 14px;
				font-size: 12px;
				background: #98c268;
				border-radius: 2px;
				margin-top: 9px;
				color: #fff;
			}
			span {
				color: #262628;
				margin: 0 5px;
			}
			a {
				margin-top: 8px;
				color: #c0c0c0;
			}
		}
	}

	.sh_content {
		padding: 10px;
		.sh_con_top {
			padding-left: 40px;
			position: relative;
			padding-bottom: 10px;
			.user_face {
				position: absolute;
				left: 0;
				top: 0;
			}
			.sh_con_top_tt {
				line-height: 30px;
				height: 30px;
				b {
					font-weight: bold;
				}
			}
			p {
				color: #676767;
				line-height: 18px;
				white-space: normal;
				word-break: break-all;
				/deep/ table {
					width: 100%!important;
				}
			}
		}
		.sh_con_bottom {
			border-top: 1px dashed #e5e5e5;
			padding-top: 10px;
			overflow: hidden;
			line-height: 15px;
			display: flex;
			.sh_btn_box {
				.fs13:hover {
					color: #77C2FD
				}
			}
			.underlineCommon {
				flex: 1;
				-ms-flex: 1 0 auto;
			}
		}
	}

	.openReplyBox {
		height: 580px;
		position: relative;
		.openReplyBoxTit {
			height: 30px;
			position: relative;
			padding-top: 10px;
			b {
				position: absolute;
				top: 25px;
				width: 100%;
				height: 1px;
				border-bottom: 1px dashed #cbcbcb;
			}
			span {
				position: absolute;
				left: 50%;
				width: 130px;
				line-height: 30px;
				background: #98c268;
				color: #fff;
				margin-left: -65px;
				text-align: center;
				border-radius: 15px;
			}
		}
		.replayBox {
			position: absolute;
			left: -20px;
			bottom: -20px;
			width: 798px;
			border-top: 2px solid #e5e5e5;
			background-color: #fff;
			transition: all 0.5s ease;
			box-sizing: border-box;
			z-index: 80;
			overflow: hidden;
			.margin20 {
				margin: 20px !important;
			}
			#openReplyEditorBottom {
				border: 1px solid #ccc;
				height: 125px;
			}
		}
		.sh_title a.sh_title_read {
			float: right;
			margin-top: 0;
			color: #50adee;
		}
	}

	.replayAgain {
		position: relative;
		border: 1px solid #e5e5e5;
		&:after,
		&:before {
			position: absolute;
			content: "";
			display: block;
			width: 0;
			height: 0;
		}
		&:before {
			border-bottom: 6px solid #e5e5e5;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			top: -6px;
			left: 20px;
		}
		&:after {
			border-bottom: 4px solid #fafafa;
			border-left: 4px solid transparent;
			border-right: 4px solid transparent;
			top: -4px;
			left: 22px;
		}
		.sh_title {
			background-color: #fafafa;
			border-bottom: 1px solid #e5e5e5;
			padding: 0 12px;
			height: 32px;
			line-height: 32px;
		}
		.replayAgain_con {
			padding: 0 10px;
			.sh_content {
				padding: 10px 0 0 0;
				.sh_con_bottom {
					border-top: none;
					border-bottom: 1px dashed #e5e5e5;
					padding: 0 0 10px 40px;
					display: flex;
					.underlineCommon {
						flex: 1;
						-ms-flex: 1 0 auto;
					}
				}
			}
		}
		.replayAgain_con:last-child {
			.sh_content {
				.sh_con_bottom {
					border-bottom: none;
				}
			}
		}
	}

	.toolbar {
		border: 1px solid #ccc;
		margin-bottom: -1px;
		background-color: #f1f1f1;
	}

	/deep/ .el-tabs__header {
		border-top: 1px solid #ececec;
		background: #fafafa;
		margin-bottom: 0;
		text-align: center;
	}

	/deep/ .is-top {
		border-top: none;
	}

	/deep/ .el-tabs__item {
		font-size: 13px;
	}

	.fullPage-tabs /deep/ .el-tabs__nav {
		margin: 0 auto;
		display: -webkit-inline-box;
		float: none;
	}

	.fullPage-tabs /deep/ .el-tabs__content {
		position: absolute;
		width: 100%;
		top: 41px;
		bottom: 10px;
		padding: 10px 11px 0 10px;
		box-sizing: border-box;
	}

	/deep/ .el-tab-pane {
		overflow: hidden;
		height: 100%;
	}

	/deep/ .el-scrollbar {
		height: 100%;
	}

	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
		.el-scrollbar__view {
			height: 100%;
		}
	}

	/deep/ .el-upload-list {
		float: left;
	}

	/deep/ .el-upload {
		float: left;
		margin-right: 10px;
	}

	/deep/ .el-upload-list__item:first-child {
		margin-top: 0;
	}

	/deep/ .el-upload-list__item-name {
		width: 159px !important;
	}

	.del_content {
		min-height: 52px;
	}

	/deep/ .evaluateBox {
		border: solid 1px #efefef !important;
	}

	.fullPageContent-header /deep/ .el-upload {
		margin-right: 0;
	}

	.fullPageContent-header /deep/ .el-upload-list {
		display: none;
	}

	.fullPageContent-header>li:hover {
		color: #3a80ec;
	}

	.task-header {
		padding-left: 10px;
	}

	.header-audit:first-child:before {
		content: " ";
		width: 20px;
	}

	.opinionTitle {
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/deep/ .el-tabs__item.is-active {
		color: #145FD2 !important;
		font-weight: bold;
	}

	/deep/ .el-tabs__item:hover {
		color: #145FD2 !important;
	}

	/deep/ .el-tabs__active-bar {
		background-color: #145FD2 !important;
	}

	/deep/ .el-tabs__nav-wrap::after {
		height: 1px;
	}

	/deep/ .loading-upload-icon {
		background: url('../../../static/img/loading.gif');
		width: 188px;
		height: 146px;
		display: inline-block;
		transform: scale(.5)
	}

	/deep/ .el-loading-mask {
		z-index: 100 !important;
	}

	/deep/ .el-loading-spinner .el-loading-text {
		color: #50ADEE;
		margin-top: -36px;
		font-size: 13px
	}

	/deep/ .el-loading-spinner {
		top: 30%
	}

	/deep/ .widget-pop-upload .layui-icon-close {
		font-weight: normal !important;
	}

	/deep/ .widget-pop-upload .layui-icon-close:hover:after {
		color: #409EFF;
		border-color: #c6e2ff;
		background: #ecf5ff;
		opacity: 1;
	}

	/deep/ .el-loading-spinner .el-loading-text .loading-head-text {
		margin-bottom: 12px;
		color: #50ADEE;
	}

	/deep/ .loading-content {
		line-height: 30px;
	}

	/deep/ .el-icon-delete {
		&::before {
			&:hover {
				color: #f09237 !important;
			}
		}
	}

	.icon-zhankai {
		display: inline-block;
		transform: rotate(90deg);
	}

	/deep/ .modifyExternal {
		width: 96px;
	}
</style>
