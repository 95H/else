<template>
  <div class="assetBased" id="assetBased" v-loading="loading"
    :element-loading-text='loadTxt'
    element-loading-spinner="loading-upload-icon">
    <!-- 上传 -->
    <!-- <div v-show=false><el-upload
        class="upload-demo"
        action="/api/xls/uploadExcel"
        :limit="1"
        :data="uploadData"
        :headers="uploadHeaders"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList">
        <el-button size="small" ref="uploadBtn" type="primary">导入</el-button>
    </el-upload></div> -->
    <!-- 导入弹窗 -->
    <el-dialog
    top="0"
    :modal-append-to-body="false"
    custom-class="importOpenDialog"
    :before-close="importOpenClose"
    :visible.sync="dialogVisible"
    width="748px">
        <ul class="importOpen">
            <li class="balanceSheet">
              <div class="importOpen-tit">从科目余额表导入</div>
              <div class="importOpen-icon"><img src="/static/img/balanceSheet-icon.png"/></div>
              <div class="importOpen-content">上传文件内容为科目余额表；<br/>需注意：上传填写后端数据文件 仅支持xls、xlsx格式，切文件大小不能超过50M</div>
              <div class="importOpen-btn">
                <el-button type="warning" @click="importBalanceSheet">导入余额表</el-button>
              </div>
            </li>
            <li class="declarationForm">
              <div class="importOpen-tit">从资产申报表导入</div>
              <div class="importOpen-icon"><img src="/static/img/declarationForm-icon.png"/></div>
              <div class="importOpen-content">上传文件内容为资产申报表；<br/>需注意：上传填写后端数据文件 仅支持xls、xlsx格式，切文件大小不能超过200M</div>
              <div class="importOpen-btn">
                 <el-button type="primary" @click="importFileFn()">导入申报表</el-button>
              </div>
            </li>
            <li class="standingBook">
              <div class="importOpen-tit">从公司台账导入</div>
              <div class="importOpen-icon"><img src="/static/img/standingBook.png"/></div>
              <div class="importOpen-content">上传文件内容为公司台账表；<br/>需注意：上传填写后端数据文件 仅支持xls、xlsx格式，切文件大小不能超过200M</div>
              <div class="importOpen-btn">
                <el-button  @click="importStandingBook()">导入台账</el-button>
              </div>
            </li>
        </ul>

    </el-dialog>
    <!-- 申报表导入 -->
    <!-- <el-dialog
    title="导入资产申报表"
    :center="true"
    top="0"
    :modal-append-to-body="false"
    custom-class="importDeclarationForm"
    :visible.sync="importDeclarationFormVisible"
    @close="closeDialog"
    width="500px">
      <div class="importOpen">
          <div class="importOpen-left"><span>上传资产申报表：</span></div>
          <div class="importOpen-right">
            <el-upload
            class="upload-demo"
            action="/api/file/uploadAssetsPossessionXls"
            ref="upload"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-error="uploadError"
            :on-remove="uploadRemove"
            :on-success="uploadSuccess"
            :on-change="uploadChange"
            :before-upload="beforeUpload"
            accept="xls,xlsx"
            :file-list="fileList"
            :auto-upload="false">
              <el-button class="clear" size="small" ref="uploadBtn">+ 上传资产申报表</el-button>
              <div slot="tip" class="el-upload__tip">
                <p>上传填写后端数据文件仅支持xls、xlsx格式，切文件大小不能超过50M</p>
                <p>* 上传文件后会覆盖您已导入的数据，请谨慎操作</p>
                <p>* 上传的附件文件要和模板一致，否则系统无法读取 上传的文件数据 <a class="el-upload-tip-down" href="/api/file/downloadFile?docsName=资产基础法测算表模板v1.13.xlsx&alyPath=&flag=1">点此下载资产申报表模板</a></p>
              </div>
            </el-upload>
          </div>
      </div>
      <div slot="footer" class="importOpen-footer">
          <el-button type="primary" @click="submitUpload">开始导入</el-button>
          <el-button @click="importDeclarationFormVisible = false">取消</el-button>
      </div>
    </el-dialog> -->

    <div class="assetBased-table" v-for="(item,index) in tabArr" :key="index" v-if="tabArr.length>0&&item.name==curTableName">
      <template v-if="item.name == '统计计算'">
        <ul class="statistic" :style="{height:statisticHeight+'px'}">
          <li class="statistic_item" v-for="(item,index) in statisticJson" @click="statisticFun(item,index)" :class="{'actived':actived==index+1}">
            <div class="statistic_title"><p>字段名称：</p>{{item.smallTitle}}</div>
            <div class="statistic_val"><p>当前数值：</p>{{item.val || '--'}}</div>
            <div class="statistic_note"><p>描述说明：</p>{{item.note}}</div>
          </li>
        </ul>
      </template>
      <template v-if="item.name == '项目综合信息' && !/openRelationDetail/.test($route.path)">
        <el-scrollbar :style="{height: statisticHeight +'px'}">
          <div class="project-wrapper" >
            <p class="project-title">项目信息</p>
            <ul class="projectInfo-wrapper clear">
              <li class="projectInfo-item" v-for="(value, keyVal) in projectInfoObj" :class="{activeItem: activeKey === keyVal}" :key="keyVal" @click="selectValue(projectInfoData[keyVal], keyVal, true)">
                <span class="project-label">{{value}}</span>
                <span class="textOverflow1 project-content" :title="projectInfoData[keyVal]">{{projectInfoData[keyVal]}}</span>
              </li>
            </ul>
            <p class="project-title">资产占有方信息</p>
            <ul class="assetPossess-wrapper">
              <li class="assetPossess-item" v-for="(assetItem, assetKey) in assetPossessObj" :class="{activeItem: activeKey === assetKey}" :key="assetKey" @click="selectValue(projectInfoData[assetKey], assetKey)">
                <span class="project-label">{{assetItem}}</span>
                <span class="textOverflow1 project-content" :title="projectInfoData[assetKey]">{{projectInfoData[assetKey]}}</span>
              </li>
            </ul>
          </div>
        </el-scrollbar>
      </template>
      <template v-if="item.name == '项目综合信息' && /openRelationDetail/.test($route.path)">
        <el-scrollbar :style="{height: statisticHeight +'px'}">
          <div class="openRelationDetail-wrapper">
            <p class="project-title">项目信息</p>
            <ul class="projectInfo-wrapper">
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>项目名称：</label><span style="width: 85%;" class="textOverflow1" :title="projectInfoData.projectName">{{projectInfoData.projectName}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>委托方名称：</label><span style="width: 85%;">{{projectInfoData.mergerOfPrincipals}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>评估对象：</label><span>{{projectInfoData.assessmentObjectDesc}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>评估基准日：</label><span>{{projectInfoData.assessmentBaseDate}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>价值类型：</label><span>{{projectInfoData.valuetype}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>经济行为：</label><span>{{projectInfoData.economicBehaviorId}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>经济性质：</label><span>{{projectInfoData.economicNatureOne}}</span>
                  </li>
                </el-col>
              </el-row>
            </ul>
            <p class="project-title asset-title">资产占有方信息</p>
            <ul class="assetPossess-wrapper">
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>资产占有方名称：</label><span style="width: 85%;">{{projectInfoData.investorName}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>资产占有方经济性质：</label><span style="width: 85%;">{{projectInfoData.economicNature}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>法定代表人：</label><span>{{projectInfoData.legalPerson}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>法定地址：</label><span>{{projectInfoData.detailedAddress}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>注册资本：</label><span>{{projectInfoData.registeredCapital}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>统一社会信用代码：</label><span>{{projectInfoData.licenseNumber}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>成立日期：</label><span>{{projectInfoData.registrationDate}}</span>
                  </li>
                </el-col>
                <el-col :span="12">
                  <li>
                    <label>营业期限：</label><span>{{projectInfoData.operatingPeriod}}</span>
                  </li>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <li>
                    <label>评估范围：</label><span>{{projectInfoData.assessmentRangeDesc}}</span>
                  </li>
                </el-col>
              </el-row>
              <!--<li class="assetPossess-item" v-for="(assetItem, assetKey) in assetPossessObj" :class="{activeItem: activeKey === assetKey}" :key="assetKey" @click="selectValue(projectInfoData[assetKey], assetKey)">
                <span class="project-label">{{assetItem}}</span>
                <span class="textOverflow1 project-content" :title="projectInfoData[assetKey]">{{projectInfoData[assetKey]}}</span>
              </li>-->
            </ul>
          </div>
        </el-scrollbar>
      </template>
      <template v-else-if="parseInt(item.type)">
          <table-more :tableHeader="tableData[item.type]" :curSheetName="item.name" :nums="nums" :sheetNameBool="item.name==curTableName" :tableBodyData="tableCacheData[item.name]" :sheetName="curTableName" :customDisplay="customDisplay"></table-more>
      </template>
      <template v-else-if="!parseInt(item.type) && item.name==curTableName && item.name !== '统计计算' && item.name !== '项目综合信息'">
        <div>
          <summary-table :classoptions="sortsummary.classOptions"
                         :showdata="sortsummary.tableData"
                         :rangenumber="sortsummary.rangeNumber"
                         :summarytablespecial="sortsummary.summarytablespecial"
                         :flowsummaryspecial="sortsummary.flowsummaryspecial"
                         :fixedassetsspecial="sortsummary.fixedassetsspecial"
                         :taxonomySumBotmData="sortsummary.taxonomySumBotmData"
                         :theadData="sortsummary.theadData"
                         :investorId="uploadData.investorId"
                         :projectId="uploadData.projectId"
                         :customDisplay="customDisplay"
                         @summaryMethodFun="summaryMethod">
          </summary-table>
        </div>
      </template>
    </div>
    <div class="assetBased-foot" v-if="tabArr.length>0">
      <scroll-tab :tabArr="tabArr" :isSelectM="true" :width="width" @tabClick="tabClick" ref="scrollTab" :isFullPart="true"></scroll-tab>
    </div>
    <div v-else class="noData">暂无数据，请导入数据</div>
    <!--导出模板-->
    <center-dialog ref="exportDialog" dialogWidth='400px' dialogHeight="222px" dialogTitle="导出类型选择" titlePosition="center">
			<div slot="dialogContent" class="export-cont ">
        <div class="clear">
          <div class="fl export-box orange-box"  @click="exportReport(1)">
            <p><img src="/static/img/data_export.png"/></p>
            <p class="orange-text">纯数值导出</p>
          </div>
          <div class="fr export-box blue-box"  @click="exportReport(2)">
            <p><img src="/static/img/formula_export.png"/></p>
            <p class="blue-text">带公式导出</p>
          </div>
        </div>
        <p class="export-cont-fd"><el-checkbox v-model="draftsCheck">含草稿列数据</el-checkbox></p>
			</div>
		</center-dialog>
    <!--数据对比页面 -->
    <compare-page ref="comPage"
    :combinationId="uploadData"
    :compareFullData="compareFullData"
    :compareType="compareType"
    @reloadPage="reloadPage"
    @sendConnect="sendConnect">
    </compare-page>
  </div>
</template>

<script>
  import tableMore from '@/components/tableMore';
  import scrollTab from '@/components/scrollTab2.vue';
  import summaryTable from '@/components/summaryTable' // 汇总表格
  import tableDataJson from '@/page/fullPageModule/tableJson.js';
  import tableSummaryJson from '@/page/fullPageModule/tableSummaryJson.js';
  import centerDialog from "@/components/centerDialog.vue";
  import comparePage from "@/components/partialImport/comparePage"
  import Public from '../../public.js'
  var that;

  export default {
    props:["customDisplay"],
    components: {tableMore, scrollTab, summaryTable,centerDialog,comparePage},
    data() {
      return {
        //tableHeader:[],
        //tabArr: tableDataJson.dataSurface,//tab的列表
        nums:0,
        tabArr:[],
        width: "100%",
        curTableName: '',//当前显示的table的
        tableData: '',//所有的列表数据
        tableLoadObj: {}, //所有表格加载的状态tab切换的时候不需要再次加载数据
        tableCacheData: {},//表格的数据
        tableRows: [],
        // 汇总 =====================================================================
        sortsummary: {
          classOptions: '',
          flowsummaryspecial: false,
          summarytablespecial: false,
          fixedassetsspecial: false,
          rangeNumber: '',
          tableData: [],
          taxonomySumBotmData:[],
          theadData:[]
        },
        balanceSheetRefresh:false,  //余额表刷新
        dialogVisible:false,  //导入弹窗
        importDeclarationFormVisible:false,
        //文件导入
        loading:false,
        fileList:[],
        uploadHeaders:{
            token:this.$getCookie('token'),
        },
        uploadData:{
            investorId:"",
            projectId:""
        },
        timer:'',
        loadTxt:"",
        stausFlag:false,
        CancelToken:'',
        cancel:'',
        fullData:[], //全部数据
        groupId:'',
        compareFullData:'',//对比页面数据
        actived : 0,
        statisticHeight : window.screen.availHeight - 230,
        statisticJson : [],   //“统计计算”数据展示
        firstLoadSheet:false,//页面第一次加载
        draftsCheck:false,//含草稿列数据(导出)
         //项目综合信息展示
        projectInfoData:{},
        activeKey: '',  //用于判断选中
        projectInfoObj: {projectName:'项目名称：',mergerOfPrincipals: '委托方名称：', assessmentObjectDesc: '评估对象：',
        assessmentBaseDate:'评估基准日：', valuetype:'价值类型：', economicBehaviorId:'经济行为：', economicNatureOne:'经济性质：',},
        assetPossessObj: {
          investorName:'资产占有方名称：', economicNature:'资产占有方经济性质：', legalPerson:'法定代表人：', detailedAddress:'法定地址：', registeredCapital:'注册资本：', licenseNumber :'统一社会信用代码：',
          registrationDate:'成立日期：', operatingPeriod:'营业期限：',  assessmentRangeDesc:'评估范围：'
        },
        compareType:''//对比类型 台账对比or部分导入对比
      };
    },
    watch:{
      "$store.state.investorId"(newD,oldD){
        if(newD){
          this.uploadData.investorId=newD;
          that.reloadPage();
        }
      }
    },
    created() {
      var _this = this;
      that=this;
      this.$store.state.getUploadStatu = this.getUploadStatu; // 将当前页面获取状态方法存到全局
      this.$store.state.intervalFn = this.intervalFn; // 不断轮询页面状态
      this.CancelToken =this.$http.CancelToken;
      this.uploadData.projectId=this.$store.state.projectId ;
      this.uploadData.investorId=this.$store.state.investorId ;
      this.tableData = tableDataJson.tableHead;
      this.getGroupId();
     // this.curTableName = tableDataJson.dataSurface[0].name;//默认显示第一个
      this.tableLoadObj[this.curTableName] = true;
     // this.loading = true;
      that.$parent.$parent.uploadFlag = false;
      clearInterval(that.timer);
      that.timer = '';
      if(this.customDisplay && this.customDisplay.investorId){
        this.uploadData.projectId=this.customDisplay.projectId ;
        this.uploadData.investorId=this.customDisplay.investorId ;
        this.getUploadStatu(function(){
          _this.loading = false;
          _this.getSheet();
        },'reload');
      }else if( this.uploadData.investorId){
        this.getUploadStatu(function(){
          _this.loading = false;
          _this.getSheet();
        },'reload');
      }

      // //千分位转换
      // this.$store.state.commafyNumber = function(nums){
      //    if(isNaN(nums)||nums=='') return nums;
      //    var digit = Number(nums).toFixed(2);
      //    return digit.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
      // }
    },
    mounted(){
      document.querySelector('.fullPageContent-content').querySelector('.is-vertical').style.display="none";
      var _this = this;

      /**加载第三方导账工具 */
     //this.loadFile('http://pg.cailian.net:8888/source/js/widgetReport.js');
    // this.loadFile('http://pgtest.cailian.net:8888/source/js/widgetReport.js');
     //this.loadFile('http://192.168.0.59:8888/source_local/js/widgetReport.js');
      //导入导出
      this.importAndExport();
     /**以下方法只需要加载一次 */
      if(this.$store.state.loadFile) return;
       /*上传成功的回调 */
      Public.$on('uploadSuccess',(response, file, fileList, subjectData)=>{
        that.uploadSuccess(response, file, fileList, subjectData)
      });
      /*上传前 */
      Public.$on('beforeUpload',()=>{
        that.beforeUpload()
      });
      /**上传失败*/
      Public.$on('uploadError',(err, file, fileList)=>{
        that.uploadError(err, file, fileList)
      });
      if((/pg.cailian.net/g.test(window.location.href)&&window.location.href.indexOf('test-pg')<=-1)||/pgtest.cailian.net/g.test(window.location.href)){
        this.loadFile('https://edi.cailian.net/source/js/widgetReport.js');
      } else if(/test-pg.cailian.net/g.test(window.location.href)){
        this.loadFile('https://test-edi.cailian.net/source/js/widgetReport.js');
      }else{
         this.loadFile('https://test-edi.cailian.net/source/js/widgetReport.js');
        //this.loadFile('http://192.168.0.2:8091/source/js/widgetReport.js');
        //this.loadFile('http://127.0.0.1:8091/source/js/widgetReport.js');
      }

    /**数据对比 */
     // this.$refs.comPage.showDialog();
    },
    methods: {
      reloadPage(){
          that.loadText ='';
          that.loading = false;
          // clearInterval(that.timer);
          // that.timer='';
          that.firstLoadSheet = false;
          if (typeof that.cancel === 'function') {
              // 取消请求
               that.cancel();
            }
          that.$store.state.hierarchy = false;
          that.getUploadStatu(function(){
            that.loading = false;
            that.getSheet(null);
            that.sortsummary.classOptions='';
            that.nums++;
            setTimeout(function(){
              that.$store.state.hierarchy = false;
            },403);
          },'inspect');


          if( that.$refs.scrollTab){
            that.$refs.scrollTab.radio='1';
            that.$refs.scrollTab.searchVal="";
            that.$refs.scrollTab.initMarginLeft();
          }

      },
      openPartImport(){
        this.$store.commit("changeShowCommon");
        this.$store.state.commonTitle = "资产申报表导入";
        this.$store.state.extraBtn="提交";
        this.$store.state.commonBtn = "取消";
        this.$store.state.componentsType = "partImport"; //现场勘查
        this.$store.state.defaultBtnGroup = false;
      },
      // 统计计算选择方法
      statisticFun(item,index){
        if(this.customDisplay.checkedBG){
          this.actived = index+1;
          this.$store.state.CheckedTable={
            tableName:this.$store.state.curSheetName,
            id:item.id,
            val:item.val,
            key:item.key,
            type: '3'
          }
        }
      },
      getGroupId(){
          var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(',');
          var groupId ='';
          if(groupIdArr[0]==''&&groupIdArr[1]){
            groupId = groupIdArr[1];
          }else{
            groupId = groupIdArr[0];
          };
          this.groupId = groupId;
          //localStorage.setItem("sheet_groupId",groupId);
      },
      /*导入申报表 */
      importFileFn(){
        this.dialogVisible=false;
        this.openPartImport();


        // this.importDeclarationFormVisible=true;
        // if(this.$refs.upload){
        //   this.$refs.upload.clearFiles();
        // }
        // this.fileList=[];
      },

      // 导入台账()
      importStandingBook() {
        this.dialogVisible=false;
        this.$store.commit("changeShowCommon");
        this.$store.state.commonTitle = "公司台账导入";
        this.$store.state.extraBtn="提交";
        this.$store.state.commonBtn = "取消";
        this.$store.state.componentsType = "standingBook"; //现场勘查
        this.$store.state.defaultBtnGroup = false;
      },

      /*加载动画的文案 */
      getLoadingText(type){
        that.loading  = true;
        that.loadTxt = ' ';
        var text ='';
       if(type=="upload"||type=="初次导入中"||type=="部分导入中"||!type){
         text = '<p class = "loading-head-text">正在导入...</p>大约需要2分钟，您可操作其他页面<br/><p class="loading-head-text loading-content">亲，先去忙别的工作吧~</p>';
       }else{
         text = '当前页面正在'+type+'，完成后才可操作哦~<br/>亲，先去操作其他页面吧~';
       }
        that.$parent.$parent.uploadFlag = false;
        that.$parent.$parent.navPosition =0;
        that.$parent.$parent.showNav();
        setTimeout(() => {
            that.$store.state.hierarchy = false;
        }, 401);
        setTimeout(function(){
            var oLoading = document.querySelector('.el-loading-text');
            oLoading.innerHTML = text;
        },100)

      },
      //上传
      importAndExport(){
          var _this=this;
          // 导入
          this.$store.state.importFile=function(){
            if(that.loading) {
               that.$messageError('当前股权机构正在操作,请稍后......');
               return
            }
            _this.$parent.$parent.navPosition =0;
            _this.$parent.$parent.showNav();

            _this.getUploadStatu(function(){
                _this.loading = false;
              // _this.getSheet();
                _this.dialogVisible=true;
                clearInterval(that.timer);
              },'upload');
          }
          // 导出
          this.$store.state.exportFile=function(){
             if(that.loading) {
                that.$messageError('当前股权机构正在操作,请稍后......');
                return
             }
             _this.getUploadStatu(function(){
              that.draftsCheck = false;
              that.$refs.exportDialog.showDialog();
               //window.location.href = "/api/xlsUpdateData/exportExcel?token="+_this.$getCookie("token") +"&projectId="+_this.uploadData.projectId+"&investorId="+_this.uploadData.investorId;
             },'export')
          }
      },
       /*导出
      *type 1数值导出 2公式导出
      *1不带公式不带草稿,2带公式不带草稿,3不带公式带草稿,4带公式带草稿
      */
      exportReport(type){
        //不带公式不带草稿
        if(!this.draftsCheck&&type==1){
           window.location.href = "/api/xlsUpdateData/exportExcel?token="+this.$getCookie("token") +"&projectId="+this.uploadData.projectId+"&investorId="+this.uploadData.investorId+"&formula="+1;
        }
        //不带公式带草稿
        if(this.draftsCheck&&type==1){
           window.location.href = "/api/xlsUpdateData/exportExcel?token="+this.$getCookie("token") +"&projectId="+this.uploadData.projectId+"&investorId="+this.uploadData.investorId+"&formula="+3;
        }
        //带公式不带草稿
        if(!this.draftsCheck&&type==2){
           window.location.href = "/api/xlsUpdateData/exportExcel?token="+this.$getCookie("token") +"&projectId="+this.uploadData.projectId+"&investorId="+this.uploadData.investorId+"&formula="+2;
        }
         //带公式带草稿
        if(this.draftsCheck&&type==2){
           window.location.href = "/api/xlsUpdateData/exportExcel?token="+this.$getCookie("token") +"&projectId="+this.uploadData.projectId+"&investorId="+this.uploadData.investorId+"&formula="+4;
        }
        // console.log(window.location.href);
        //this.$refs.exportDialog.closeDialog();
      },
      //关闭弹出的回调
      importOpenClose(done){
        var _this=this;
        if(this.balanceSheetRefresh){
          this.getSheet(function(){
            _this.balanceSheetRefresh=false;
            _this.nums++;
            done();
          });
        }else{
          done();
        }
      },
      //导入余额表
      importBalanceSheet(){
        var _this = this;
        this.balanceSheetRefresh=false;
        localStorage.setItem("sheet_projectId",this.$store.state.projectId);
        localStorage.setItem("sheet_investorId",this.$store.state.investorId);
        this.getGroupId();
        var zIndex =  $('.v-modal').css('zIndex');
        $('.v-modal').css({'zIndex':Number(zIndex)+20,'opacity':0});
        new widgetReport({
            external:true,
            sheetProjectId:_this.$store.state.projectId,
            sheetInvestorId:_this.$store.state.investorId,
            groupId:_this.groupId,
            callBack:function(){
              _this.dialogVisible=false;
              _this.getSheet();
              _this.sendConnect();
               that.nums++;
             // _this.importDeclarationFormVisible = false;
          }}).init();
          //需要关闭遮罩
          $('#widget_pop_upload_close').off('click').click(function(){
              layer.closeAll();
              $('.v-modal').css({'zIndex':zIndex,'opacity':.3})
          })
      },
      //关闭清空上传文件
      closeDialog(){
        this.importDeclarationFormVisible=false;
      },
      //开始导入
      submitUpload(){
        if(this.fileList.length===0){
          this.$messageWarning("请选择导入文件");
          return
        }
        this.$refs.upload.submit();
        this.dialogVisible=false;
        this.importDeclarationFormVisible = false;
      },
      //文件成功之后
      uploadSuccess(response, file, fileList, subjectData){
        var _this=this,flag;
        if(/projectAuditing/g.test(this.$route.path)){
          flag=1;
        }else if(/projectImplementation/g.test(this.$route.path)){
          flag=0;
        }
        if(subjectData && subjectData.length>0){
          this.$http.post("/api/xls/partialUploadExcel", {
              alyPath: response.data.fileDir,
              projectId: _this.uploadData.projectId,
              investorId:_this.uploadData.investorId,
              condition:JSON.stringify(subjectData),
              isCalculation:_this.$store.state.formulaChecked,
              fileName: response.data.fileName,
              showLoading:false,

          })
          .then(function(data) {})
          .catch(function(error) {
            _this.loading = false;
            clearInterval(that.timer);
            that.timer='';
            if (typeof _this.cancel === 'function') {
              // 取消请求
              _this.cancel();
            }
            _this.stausFlag = true;
            _this.loadTxt = '';
            _this.$messageError(error);
            _this.$parent.$parent.uploadFlag = true;
            _this.$store.state.hierarchy = false;
            return;
          });
        }else{
          _this.$http.post('/api/assetownerinformation/completeAssetsPossession', {
            projectId:_this.uploadData.projectId ,
            investorId:_this.uploadData.investorId,
            alyPath: response.data.fileDir,
            flag:flag,
            filename : response.data.fileName,
            showLoading:false,
            specilRequest:true
          })
          .then(response=>{

          }).catch(function (error) {
            _this.loading = false;
              clearInterval(that.timer);
              that.timer='';
              if (typeof _this.cancel === 'function') {
                // 取消请求
                _this.cancel();
              }

            _this.stausFlag = true;
            _this.loadTxt = '';
            _this.$messageError(error);
            _this.$parent.$parent.uploadFlag = true;
            _this.$store.state.hierarchy = false;
            return;
          });
        }

        //需要轮询
        //var timer ='';
        clearInterval(that.timer);
        setTimeout(function(){
          if( _this.stausFlag){
             _this.stausFlag = false;
            return;
          }
          //如果已经切换页面则不需要请求
          if(that.$route.path!='/zlpg/project/projectCont/projectImplementation/projectOnlineTask/assetBased'&&
             that.$route.path!='/zlpg/project/projectCont/projectAuditing/projectReportAudit/assetBased'&&
             that.$route.path!='/zlpg/project/projectCont/examineModification/externalOnLineTask/assetBased'&&
             that.$route.path!='/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOnLineAudit/assetBased'
          ) return;
           that.timer ='';
           that.getLoadingText('upload');
           that.intervalFn();

        },10000)

      },
      /**循环 */
      intervalFn(){
        clearInterval(that.timer);

       // that.cancel();
        this.timer = setInterval(function(){
          that.getUploadStatu(function(){
            clearInterval(that.timer);
             that.timer = '';
            //需要刷新左边的tree
               that.loading = false;
               that.getSheet(null, that.$store.state.tipsFlag ? '':'done');
               that.nums++;


          }); },5000)
      },
      /*解析是否完成*/
      getUploadStatu(callBack,type){
        var _this = this;
        var CancelToken = this.CancelToken;
        if(
          // that.$route.path!='/zlpg/project/projectCont/projectImplementation/projectOnlineTask/assetBased'&&
          // that.$route.path!='/zlpg/project/projectCont/projectAuditing/projectReportAudit/assetBased'&&
          // that.$route.path!='/zlpg/project/projectCont/examineModification/externalOnLineTask/assetBased'&&
          // that.$route.path!='/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOnLineAudit/assetBased'&&
          // that.$route.path!='/zlpg/project/projectCont/projectImplementation/projectOnlineTask/assessment/7'&&
          // that.$route.path!='/zlpg/project/projectCont/projectImplementation/projectOnlineTask/assessment/8'&&
          // that.$route.path!='/zlpg/project/projectCont/projectAuditing/projectReportAudit/assessment/7'&&
          // that.$route.path!='/zlpg/project/projectCont/projectAuditing/projectReportAudit/assessment/8'&&
          !/assetBased/.test(that.$route.path) &&
          !/assessment/.test(that.$route.path) &&
          !/openRelationDetail/.test(that.$route.path)
        ) {
           clearInterval(that.timer);
           that.timer ='';
           return;
        }
         this.$store.state.hierarchy = false;
         this.$parent.$parent.uploadFlag = false;
         this.$http.post('/api/xlsUpdateData/getUploadStatus', {
                projectId:_this.uploadData.projectId || _this.$route.query.projectId,
                investorId:_this.uploadData.investorId,
                showLoading:false
             },{
               cancelToken: new CancelToken(function executor (c) {
                _this.cancel = c
              })
            }).then(function(res){
              //上传的状态
              if(res.msg=="初次导入中"||res.msg=="部分导入中"||res.msg=="批量修改中"||res.msg=="快捷作价中"||res.msg=="台账导入中"){
                 that.$parent.$parent.uploadFlag = false;
                 that.loading = true;
                 _this.$parent.$parent.navPosition =0;
                 _this.$parent.$parent.showNav();
                 setTimeout(() => {
                     _this.$store.state.hierarchy = false;
                  }, 401);
                 that.getLoadingText(res.msg);
                if(type=='upload'||type=="export"){
                    _this.$messageError('当前股权机构有资产申报表正在'+res.msg+',请稍后......');
                }
                //如果侧边栏打开的话 需要关闭侧边栏
                if(type=="allImp"){
                  _this.$store.commit("changeShowCommon");
                }

                return;
              }

            //导入成功
            // if(res.data.allImportTips&&res.data.allImportTips.uploadTotal){
            //   that.$message({
            //     showClose: true,
            //     message: '恭喜你,您已导入'+res.data.uploadSuccessTotal+'实际应导入'+res.data.uploadTotal,
            //     type: 'success'
            //   });
            // }
            //快捷作价
            if(res.data.quickPriceTips){
                _this.$messageSuccess('由'+res.data.quickPriceTips+'发起的快捷计算已完成');
            }
            //弹出数据对比的组件
            clearInterval(that.timer);
            that.timer = '';
          //  _this.$store.state.hierarchy = true;
            that.$parent.$parent.uploadFlag = true;

            if(res.msg=="部分导入页面对比中"){
                that.loading = false;
                that.compareType = "部分导入对比页面"
                that.$refs.comPage.showDialog();
                that.compareFullData = JSON.parse(res.data.partImportParm);
                that.sortsummary.classOptions='';

              return;
            }
            //台账导入中
            if(res.msg=="台账导入页面对比中"){
                that.loading = false;
                that.compareType = "台账导入对比页面";
                that.$refs.comPage.showDialog();
                //需要对科目进行处理
                var arrFullData = JSON.parse(res.data.accountImportParm);
                var arrComData = [];
                for(var i =0 ;i<arrFullData.length;i++){
                    var obj = {};
                    obj.sheetName =  arrFullData[i].sheetName.split('~')[0];
                    arrComData.push(obj);
                }
                that.compareFullData = arrComData;
                that.sortsummary.classOptions='';
                return;
            }
            //第一次导入,需要请求宋少磊的接口
            if(res.data.uploadTotal){
               that.sendConnect();
            }
            //数据处理完成
            if(type=="export"||type=="ack"||type=="inspect"||type=="allImp"){
               callBack&&callBack();
               that.loading = false;
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
            if(_this.customDisplay && _this.customDisplay.investorId){   //作为组件
              callBack&&callBack();

            }else{
              that.$parent.$parent.getLeftTree(function(){
                that.$parent.$parent.uploadFlag = true;
                callBack&&callBack();
              },function(){
                that.$parent.$parent.uploadFlag = true;

              });
            }

          })
      },
      //文件失败之后
      uploadError(err, file, fileList){
        this.$messageError(err);
        this.loading = false;
        this.$parent.$parent.uploadFlag = true;

      },
      //文件上传前
      beforeUpload(file){
        this.getLoadingText('upload');
        this.$store.state.hierarchy = false;
        this.$parent.$parent.uploadFlag = false;
        return
      },
      //文件列表删除时
      uploadRemove(file, fileList){
        this.fileList=fileList;
      },
      //文件列表新增时
      uploadChange(file, fileList){
        var typeStr=file.name.substr(file.name.lastIndexOf(".")+1).toLowerCase() ;
        if(typeStr ==="xls" || typeStr ==="xlsx"){
          var fileSize = file.size/1024; //转换kb
          if(fileSize>204800){
            fileList.shift();
            this.$messageWarning('导入文件不能大于200M');
            return;
          }
          if(fileList.length>1){
            fileList.shift();
          }
          this.fileList=fileList;
        }else{
          fileList.shift();
          this.$messageWarning('导入文件仅支持xls、xlsx格式');
          return;
        }
      },
      getSheet(callback,type){
          var tableTabName = tableDataJson.dataSurface;
          var _this = this,selectItem=null;
           _this.curTableName ='';
              this.$http.post('/api/xlsUpdateData/getSheetSort',{
                projectId:_this.uploadData.projectId || _this.$route.query.projectId,
                investorId:_this.uploadData.investorId
              }).then(function(data){
                // 如果是报告说明中自定义关联数据打开的弹窗，则添加一个统计页签
                if(_this.customDisplay && _this.customDisplay.investorId){
                  data.data.push({sheetName:"统计计算",isChecked:true,status:1})
                  data.data.push({sheetName:"项目综合信息",isChecked:true,status:1})
                }
                _this.tabArr = [];
                if(data.data.length===0){
                  _this.tabArr = tableDataJson.dataSurface;
                }else{
                  for(var i =0;i<data.data.length;i++){
                    for(var j=0;j<tableTabName.length;j++){
                      if(data.data[i].sheetName==tableTabName[j].name){
                        data.data[i].type=tableTabName[j].type;
                        data.data[i].name=data.data[i].sheetName;
                        if(data.data[i].status==1){
                          data.data[i].isChecked = true;
                        }
                        _this.tabArr.push(data.data[i]);
                      }
                    }
                    // 数据关联中打开窗口后定位到指定sheet
                    if(_this.customDisplay && data.data[i].sheetName==_this.customDisplay.selectName){
                      selectItem=data.data[i];
                      _this.$nextTick(()=>{
                        _this.$refs.scrollTab.setTab(selectItem,false)
                      })
                    }
                  }
                }
                if(type){
                    _this.$messageSuccess('导入文件上传成功');
                }

                _this.fullData = _this.tabArr;
                _this.tabClick(_this.tabArr[0]);
                _this.curTableName = _this.tabArr[0].name;
                _this.$store.state.caseTxt = "只看案例";
                _this.$store.state.curSheetName =  _this.curTableName;
                _this.$store.state.assetBasedSheetName =  _this.$store.state.curSheetName;
                _this.$store.state.tipsFlag = false; // 请求完成后将值重置
                // for(var i = 0;i<_this.tabArr.length;i++){
                //   if(_this.tabArr[i].status==1){
                //     _this.tabClick(_this.tabArr[i]);
                //     _this.curTableName = _this.tabArr[i].name;
                //     _this.$store.state.curSheetName =  _this.curTableName;
                //     break;
                //   }
                // }
                callback && callback()
            }).catch(function (error) {
              _this.$messageError(error);
        });
      },
      /**默认展示第一条数据 */
      showFirstData(){
        var _this  = this;
        for(var i = 0;i<_this.tabArr.length;i++){
          if(_this.tabArr[i].status==1){
             _this.$refs.scrollTab.initMarginLeft();
             _this.$refs.scrollTab.active = i;
            if(_this.tabArr[i].name== _this.curTableName) return;
            _this.tabClick(_this.tabArr[i]);
            _this.curTableName = _this.tabArr[i].name;
            _this.$store.state.caseTxt = "只看案例";
            _this.$store.state.curSheetName =  _this.curTableName;
            _this.$store.state.assetBasedSheetName = _this.$store.state.curSheetName;
            break;
          }
        }
      },
      getUnChecked(){
         var hideSheetNames ='';
          for(var i = 0;i<this.tabArr.length;i++){
          if(!this.tabArr[i].isChecked){
            hideSheetNames+=this.tabArr[i].name+',';
          }
        }
        hideSheetNames = hideSheetNames.substring(0, hideSheetNames.length - 1);
        return hideSheetNames;
      },
      //处理选中
      //0表示隐藏 值为 1 表示显示
      checkedSheet(item,idx){
       console.log(item);
       //需要获取当前没有被勾选的科目
       var hideSheetNames = this.getUnChecked();
       var _this = this;
       var haveNextItem = false;
       console.log(hideSheetNames);
        //勾选
        if(item.isChecked){
           _this.setSheetState(hideSheetNames,function(){
              _this.tabArr[idx].status = 1;

           })
        }else{
          //去掉勾选的操作
          //如果去掉勾选的科目是当前显示的科目
          if(item.name==this.$store.state.curSheetName){
            for(var i =idx+1; i<_this.tabArr.length;i++){
              if(this.tabArr[i]&&this.tabArr[i].status==1){
                this.setSheetState(hideSheetNames,function(){
                  _this.tabArr[idx].status = 0;
                  _this.$refs.scrollTab.setTab(_this.tabArr[i])
                  //_this.$refs.scrollTab.tabClick(_this.tabArr[i],i);
                })
                haveNextItem = true;
                break;
              }
            }

            if(!haveNextItem){
              for(var i = idx-1;i<_this.tabArr.length;i--){
                if(this.tabArr[i]&&this.tabArr[i].status==1){
                   this.setSheetState(hideSheetNames,function(){
                    _this.tabArr[idx].status = 0;
                    _this.$refs.scrollTab.setTab(_this.tabArr[i])
                    //_this.$refs.scrollTab.tabClick(_this.tabArr[i],i);
                 })
                  break;
                }
              }
            }
          }else{
              _this.setSheetState(hideSheetNames,function(){
                _this.tabArr[idx].status = 0;
                for(var i = 0;i<_this.tabArr.length;i++){
                if(_this.tabArr[i].name==_this.$store.state.curSheetName){
                    _this.$refs.scrollTab.setTab(_this.tabArr[i],'onlyScroll');
                    break;
                }
              }
              })
          }
        }


      },
      /**展示全部 */
      showAll(){
        //需要默认展示第一条数据
        var _this = this;
        this.tabArr =  this.fullData;
        this.$refs.scrollTab.active = 0;
        if(this.tabArr[0].name== this.curTableName) return;
        this.tabClick(_this.tabArr[0]);
        this.curTableName = this.tabArr[0].name;
        this.$store.state.caseTxt = "只看案例";
        this.$store.state.curSheetName =  this.curTableName;
        this.$store.state.assetBasedSheetName = this.$store.state.curSheetName;
        this.curTableName = this.tabArr[0].name;
         _this.$refs.scrollTab.initMarginLeft();

      },
      /**展示有数据部分 */
      showPart(){
        var _this = this;
        var arr = [];
        for(var i=0;i<this.tabArr.length;i++){
          if(this.tabArr[i].count>0){
            arr.push(_this.tabArr[i]);
          }
        }
        this.tabArr = arr;
        this.$refs.scrollTab.active = 0;
        if(this.tabArr[0].name== this.curTableName) return;
        this.tabClick(_this.tabArr[0]);
        this.curTableName = this.tabArr[0].name;
        this.$store.state.caseTxt = "只看案例";
        this.$store.state.curSheetName =  this.curTableName;
        this.$store.state.assetBasedSheetName = this.$store.state.curSheetName;
        this.curTableName = this.tabArr[0].name;
         _this.$refs.scrollTab.initMarginLeft();
      },
      /**展示自定义数据 */
      showCustom(){
          var _this = this;
          var checkedFlag = false;
          this.tabArr =  this.fullData;
          for(var i =0;i<this.tabArr.length;i++){
            if(this.tabArr[i].isChecked){
              checkedFlag = true;
              break;
            }
          }
          this.ensurePageCheck(checkedFlag);
          //需要默认展示第一条数据
          this.showFirstData();
      },
      /*保证页面有一条数据勾选 */
      ensurePageCheck(flag){
        if(!flag){
             this.$set(this.tabArr[0],'isChecked',true);
             this.$set(this.tabArr[0],'status',1);
             var hideSheetNames = this.getUnChecked();
             this.setSheetState(hideSheetNames)
        }
      },
      updateSheetState(name,count){
        var idx = 0;
        for(var i =0 ;i<this.tabArr.length;i++){
          if(this.tabArr[i].name==name){
           // this.tabArr[i].count = count;
            this.$set(this.tabArr[i],'count',count);
            idx = i;
          }
        }
        //需要判断tab是不是2
        if(this.$refs.scrollTab.radio=="2"&&count==0){
           //this.tabArr[idx].isChecked = false;
          // this.$set(this.tabArr[idx],'isChecked',false);
           this.showPart()
        }
      },
      setSheetState(hideSheetNames,callBack){
        var _this = this;
        this.$http.post("/api/xlsUpdateData/setSheetState",{
            projectId:_this.uploadData.projectId,
            investorId:_this.uploadData.investorId,
            hideSheetNames:hideSheetNames//未勾选的科目
        }).then(function(res){
            if(res.data){
              callBack&&callBack();
            }
        }).catch(function(error){
          _this.$messageError(error);
        })
           //callBack&&callBack();
      },
      /**重置 */
      reset(){
        var _this = this;
        this.$refs.scrollTab.isRefresh=true;
        if(this.$refs.scrollTab.radio==3){
          this.setSheetState('',function(){
            for(var i =0 ;i<_this.tabArr.length;i++){
              _this.$refs.scrollTab.isRefresh = false;
              _this.$set(_this.tabArr[i],"isChecked",true);
              _this.$set(_this.tabArr[i],"status",1)
            }
            _this.showFirstData();
          })
        }else{
          this.setSheetState('',function(){
            for(var i =0 ;i<_this.tabArr.length;i++){
              if(_this.tabArr[i].count>0){
                _this.$refs.scrollTab.isRefresh = false;
                _this.$set(_this.tabArr[i],"isChecked",true);
                _this.$set(_this.tabArr[i],"status",1)
              }
            }
            _this.showFirstData();
          })
        }

      },
      tabClick(val) {
        //切换科目的时候需要判断状态  that.firstLoadSheet
        if(that.firstLoadSheet){
           that.getUploadStatu(function(){
            that.changeTabSheet(val);
           },'ack')
            return;
        }
         that.firstLoadSheet = true;
         that.changeTabSheet(val);
      },
      changeTabSheet(val){
        //如果tab项已经加载过数据的话则不需要再次加载了
        this.curTableName = val.name;//当前切换的tab名称
        this.$store.state.curSheetName = val.name;
        this.$store.state.caseTxt = "只看案例";
        this.$store.state.assetBasedSheetName = this.$store.state.curSheetName;
        this.$store.state.moduleChildId = val.name;
        // 统计计算查询接口
        if(val.name == "统计计算"){   //统计计算
          this.$http.post('/api/reportRelation/findSpecialFieldList',{
            projectId : this.$store.state.projectId,
            investorId : this.$store.state.investorId
          }).then(res => {
            this.statisticJson = res.data;
            console.log(this.statisticJson);
          }).catch(err => {
            this.$messageError(err);
          })
        }else if (val.name == "项目综合信息") {
          this.$http.post('api/reportRelation/findProjectInfoList', {
            projectId : this.$store.state.projectId,
            investorId :  /openRelationDetail/.test(this.$route.path) ? this.$route.query.investorId :this.$store.state.investorId
          }).then(res=>{
            this.projectInfoData = res.data;
          }).catch(err=>{
            this.$messageError(err);
          })
        }else if (!val.type) {
          that.summaryMethod(1, val.name);
        }
        if (this.tableLoadObj[val.name]) return;
        this.tableLoadObj[val.name] = true;

        // 切换sheet页签时删除选中的内容【报告说明中数据关联相关】
        if(this.customDisplay && this.customDisplay.investorId){
          this.$store.state.CheckedTable = null;
        }
      },
      summaryMethod(investorId, sheetName) { // 汇总调用接口
        let data = {
          //this.uploadData.investorId
          investor_id: that.uploadData.investorId,
          sheet_name: sheetName,
          project_id:that.uploadData.projectId || that.$route.query.projectId
        }
        this.$http.post('/api/xls/summary/data_get', data)
          .then(res => {
            // res.data.length=0;
          var flag = res.data.length
          that.matchTable(sheetName);
          that.sumONDataTableFn(sheetName,flag,res);
          that.setTableData(sheetName)
          // that.sortsummary.tableData = res.data;
          //that.sortsummary.taxonomySumBotmData=tableSummaryJson.taxonomySumBotmData;

          }).catch(err => {
            that.matchTable(sheetName);
            that.sumONDataTableFn(sheetName,null,null);
            that.$messageError(err);
          console.log(err);
        });
      },
      //减值数据处理
      setTableData(sheetName){
        var _this=this;
        switch(sheetName){
          case "存货汇总":
          case "固定资产汇总":
          case "在建工程汇总":
          case "可供出售金融资产汇总":
          case "无形资产汇总":
          for (var i = 0; i < this.sortsummary.tableData.length; i++) {
            var isEdit=false,arr=[];
            for (var key in this.sortsummary.tableData[i]) {
              if(isEdit){
                arr.push(key)
              }else{
                if((typeof this.sortsummary.tableData[i][key])==="string" && this.sortsummary.tableData[i][key].indexOf("减：")!=-1){
                  isEdit=true
                }
              }
            }
            this.sortsummary.tableData[i].isEditJ=arr;
          }
          break;
        }
      },
       /*匹配表格 */
      matchTable(sheetName){
        that.sortsummary.flowsummaryspecial = false
        that.sortsummary.fixedassetsspecial = false
        that.sortsummary.summarytablespecial = false
        if (sheetName == '分类汇总') { // 完成
          this.sortsummary.classOptions = 'sortsummary'
          this.sortsummary.rangeNumber = 'A-L'
        }else if(sheetName == '流动汇总'){
          this.sortsummary.classOptions = 'flowsummary'
          this.sortsummary.rangeNumber = 'A-I'
          this.sortsummary.flowsummaryspecial = true
        } else if (sheetName == '汇总表') {
          this.sortsummary.classOptions = 'summarytable'
          this.sortsummary.rangeNumber = 'A-G'
          this.sortsummary.summarytablespecial = true
        } else if (sheetName == '交易性金融资产汇总') {
          this.sortsummary.classOptions = 'flowsummary'
          this.sortsummary.rangeNumber = 'A-G'
        } else if (sheetName == '存货汇总') { // 完成
          this.sortsummary.classOptions = 'inventorysummary'
          this.sortsummary.rangeNumber = 'A-G'
        } else if (sheetName == '非流动资产汇总') { // 完成
          this.sortsummary.classOptions = 'unCurrentAssets'
          this.sortsummary.rangeNumber = 'A-G'
        } else if (sheetName == '可供出售金融资产汇总') { // 完成
          this.sortsummary.classOptions = 'financialAssets'
          this.sortsummary.rangeNumber = 'A-H'
        }else if (sheetName == '固定资产汇总') {
          this.sortsummary.classOptions = 'fixedAssets'
          this.sortsummary.rangeNumber = 'A-L'
          this.sortsummary.fixedassetsspecial = true
        }else if (sheetName == '在建工程汇总') {
          this.sortsummary.classOptions = 'buildProject'
          this.sortsummary.rangeNumber = 'A-G'
        }else if (sheetName == '无形资产汇总') { // 完成
          this.sortsummary.classOptions = 'intangibleAssets'
          this.sortsummary.rangeNumber = 'A-G'
        }else if (sheetName == '流动负债汇总') { // 完成
          this.sortsummary.classOptions = 'currentLiabilities'
          this.sortsummary.rangeNumber = 'A-G'
        }else if (sheetName == '非流动负债汇总') {
          this.sortsummary.classOptions = 'unCurrentLiabilities'
          this.sortsummary.rangeNumber = 'A-G'
        }
      },
      sumONDataTableFn(sheetName,flag,res){
         that.sortsummary.theadData = [];

        for(var i= 0;i<tableSummaryJson.dataSurface.length;i++){
            if(sheetName==tableSummaryJson.dataSurface[i].name){
              if(flag<=0){
                that.sortsummary.tableData = tableSummaryJson.tableData[tableSummaryJson.dataSurface[i].sumType];
                //that.sortsummary.tableData.splice(0,1);
              }
              that.sortsummary.theadData = tableSummaryJson.tableData[tableSummaryJson.dataSurface[i].sumType];//表头

              //console.log(that.sortsummary.theadData);
            }
        };
        if(flag>0){
          //如果是分类汇总的话需要增加可以编辑的选项 isEdit
          if(sheetName=="分类汇总"){
              for(var j = 0;j<res.data.length;j++){
                if(54<j&&j<71){
                  res.data[j].isEdit= true;
                }
              }
          }
          that.sortsummary.tableData = res.data;
        }
        //处理千分列
        var cloumArr = [];

        var tableHeadObj = that.sortsummary.theadData[0];
        for(var item in tableHeadObj){
            if(item=='thousandColumn'){
               cloumArr = (tableHeadObj[item]).split(';');
            }
          }

        for(var i=0;i<that.sortsummary.tableData.length;i++){
          for(var item in tableHeadObj){
            if(cloumArr.indexOf(item)>-1){
              that.sortsummary.tableData[i][item]=this.$store.state.commafyNumber(that.sortsummary.tableData[i][item]);
            }
          }
        }
        this.sortsummary.taxonomySumBotmData=tableSummaryJson.taxonomySumBotmData;
      },

      /**加载文件 */
      loadFile(url){
        var _this = this;
        var tempUrl = url.split('/');
        // 文件后缀名
        var fileType = tempUrl[tempUrl.length - 1].substring(tempUrl[tempUrl.length - 1].lastIndexOf('.'));
        // 文件名称
        var fileName = tempUrl[tempUrl.length - 1].substring(0, tempUrl[tempUrl.length - 1].lastIndexOf('.'));
        //防止重复加载外部资源
       if(this.$store.state.loadFile) return;
       if(fileType == '.js'){
            var target = document.createElement("script");
            target.setAttribute("charset", "utf-8");
            target.setAttribute("type", "text/javascript");
            target.setAttribute("async","true");
            target.setAttribute("src",url);
            document.getElementsByTagName("head")[0].appendChild(target);
            this.$store.state.loadFile = fileName;
          }
      },
      /** */
      sendConnect(){
        this.$http.post('/api/initializationContentController/savaOrUpdateContent',{
            projectId:that.uploadData.projectId,
            investorId:that.uploadData.investorId,
            showLoading:false
        })
      },

      //  综合信息获取关联值
      selectValue(val, key, flag) {
        this.activeKey = key;
        this.$store.state.CheckedTable={
          tableName:this.$store.state.curSheetName,
          id: key,
          val:val,
          key:'',
          type: flag ? '1' : '2'
        }
        // this.$store.state.CheckedTable.val = val;
      }
    },
    beforeDestroy(){
       this.$parent.$parent.uploadFlag = true;
      //  Public.$off('beforeUpload');
      //  Public.$off('uploadSuccess');
      //  Public.$off('uploadError');
       if (typeof that.cancel === 'function') {
          // 取消请求
            that.cancel();
        }

       clearInterval(that.timer);
       this.timer='';
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .assetBased{
  	/*height: 100%;*/
    /deep/ .importOpenDialog{
      top:50%;
      transform: translate(0,-50%);
      .el-dialog__header{
        padding: 0;
        .el-dialog__headerbtn{
          top: -40px;
          right: 0;
          width: 27px;
          height:27px;
          line-height: 27px;
          background: #fff;
          border-radius: 14px;
          background: #fff;
          i.el-dialog__close{
            color:#0883E4;
          }
          i.el-dialog__close:hover{
            color:#F09237;
          }
        }
      }
      /deep/ .el-dialog__body{
        padding: 0;
      }
      .importOpen{
        width: 100%;
        padding: 32px 32px;
        display: flex;
        box-sizing: border-box;
        background: #F6F6F6;
        >li:nth-child(3){
          margin-right: 0;
        }
        >li{
          flex:1;
          margin-right: 16px;
          border-radius:3px;
          background: #fff;
          border:1px solid #EDEDED;
          .importOpen-tit{
            padding-top: 28px;
            font-size:16px;
            font-weight:400;
            text-align: center;
          }
          .importOpen-icon{
            width: 100%;
            padding: 17px 0 11px 0;
            text-align:center;
            img{
              display: inline-block;
              width: 110px;
              height: 110px;
            }
          }
          .importOpen-content{
            width: 170px;
            margin: 0 auto;
            font-weight:400;
            color:#6A6A6A;
            font-size:12px;
            line-height:17px;
          }
          .importOpen-btn{
            margin-top: 15px;
            margin-bottom: 26px;
            text-align: center;
          }
        }
        .balanceSheet{
          .importOpen-tit{
            color:#EA7F2B;
          }
          .importOpen-btn{
            .el-button{
              background:#F09237;
              border-radius:4px;
              span{
                color:#fff;
                font-size: 14px;
              }
            }
            .el-button:hover{
              box-shadow:0px 5px 8px 0px rgba(240,146,55,0.5);
            }
          }
        }
        .declarationForm{
          .importOpen-tit{
            color:#0883E4;
          }
          .importOpen-btn{
            .el-button{
              background:#0883E4;
              border-radius:4px;
              span{
                color:#fff;
                font-size: 14px;
              }
            }
            .el-button:hover{
              box-shadow:0px 5px 8px 0px rgba(169,214,252,1);
            }
          }
        }
        .standingBook{
          .importOpen-tit{color:#9BC36C;}
          .importOpen-btn{
            .el-button{background:#9BC36C;border-radius:4px;width: 112px;
              span{color:#fff;font-size: 14px;}
            }
            .el-button:hover{
              box-shadow:0px 5px 8px 0px rgba(212,231,188,1);
            }
          }
        }
      }
    }
    // /deep/ .importDeclarationForm{
    //   top:50%;
    //   transform: translate(0,-50%);
    //   .el-dialog__header{
    //     padding: 4px 0;
    //     background:#F6FAFF;
    //     border-bottom:1px solid #E5E5E5;
    //     .el-dialog__title{
    //       font-size:14px;
    //       font-family:PingFangSC-Medium;
    //       font-weight:bold;
    //       color:#262628;
    //     }
    //   }
    //   .el-dialog__headerbtn{
    //     top: 10px;
    //     right: 10px;
    //   }
    //   .importOpen{
    //     padding: 0 6px;
    //     display: flex;
    //     .importOpen-left{
    //       line-height: 25px;
    //     }
    //     .importOpen-right{
    //       flex:1;
    //       .el-upload{
    //         float: none;
    //         .el-button{
    //           height: 25px;
    //           padding: 0 10px;
    //           border-radius:2px;
    //           border:1px solid #3A80EC;
    //           color:#3A80EC;
    //         }
    //         .el-button:hover{
    //           color: #409EFF;background: #ecf5ff;opacity: .7;
    //         }
    //       }
    //       .el-upload__tip{
    //         border: 1px dashed #DCDCDC;
    //         p{
    //           padding-top: 5px;
    //           padding-left: 10px;
    //           line-height: 25px;
    //           font-size: 12px;
    //         }
    //         p:nth-child(2){
    //           color:#F09237;
    //         }
    //         p:nth-child(3){
    //           color:#F09237;
    //         }
    //         .el-upload-tip-down{
    //           color:#3A80EC;
    //         }
    //         .el-upload-tip-down:hover{
    //           text-decoration:underline;
    //         }
    //       }
    //       .el-upload-list{
    //         margin-top: 7px;
    //         height:50px;
    //       }
    //     }
    //   }
    //   .importOpen-footer{
    //     .el-button{
    //       padding: 0;
    //       border-radius:2px;
    //       width: 70px;
    //       height: 25px;
    //     }
    //     .el-button:last-child{
    //       margin-left: 14px;
    //       color: #3A80EC;
    //       border: 1px solid #3A80EC
    //     }
    //     .el-button:hover:last-child{
    //       color: #409EFF;
    //       background-color: #ecf5ff;
    //       opacity: .7;
    //     }
    //   }
    // }
    .statistic{
      border-left:1px solid #ececec;
      border-right:1px solid #ececec;
      border-top:1px solid #ececec;
      padding:10px 10px 0;
      box-sizing:border-box;
      /*overflow-y:auto;*/
      .statistic_item{
        margin-bottom:10px; display:flex; align-items:top; box-sizing:border-box; border:1px solid #E5E5E5; min-height:30px; font-size:12px; padding:5px 0; cursor: pointer; transition:all ease 0.3s;
        &:hover,&.actived{ border-color:#91BDFF; background-color:#EDF5FF; transition:all ease 0.3s;
          .statistic_title,.statistic_note,.statistic_val,p{ color:#145FD2; border-color:#145FD2; transition:all ease 0.3s;}
        }
        p{ color:#6A6A6A; transition:all ease 0.3s;}
        .statistic_title{ width:150px; padding:0 15px; box-sizing:border-box; transition:all ease 0.3s;}
        .statistic_val{ width:200px; padding:0 15px; box-sizing:border-box; transition:all ease 0.3s; border-left:1px solid #E5E5E5;}
        .statistic_note{ border-left:1px solid #E5E5E5; padding:0 15px; flex:1; transition:all ease 0.3s;}
      }
    }
    .project-wrapper{
      padding: 20px;
      .project-title{
        box-sizing: border-box;
        padding: 8px 0;
        font-size: 13px;
        color: #262628;
        &:before{
          content: '';
          width: 6px;
          height: 6px;
          background-color: #F09237;
          border-radius: 3px;
          display: inline-block;
          margin-right: 5px;
          margin-bottom: 3px;
          vertical-align: middle;
        }
      }
      .projectInfo-item, .assetPossess-item{
        font-size: 13px;
        float: left;
        width: 480px;
        box-sizing: border-box;
        padding: 12px 20px ;
        border: 1px solid #E5E5E5;
        margin-bottom: 10px;
        display: flex;
        margin-right: 10px;
        &:nth-child(2n){margin-right: 0;}
        &:hover, &.activeItem{color: #145FD2; border:1px solid #91BDFF;background:rgba(237,245,255,1); cursor: pointer;
          .project-label{color: #145FD2;}
        }
      }
      .project-label{color: #6A6A6A;  display: inline-block;}
      .project-content{width: 70%; display: inline-block; line-height: 17px;}
    }
    .openRelationDetail-wrapper{
      height: 100%;
      border: 1px solid #ececec;
      .project-title{background: #f6faff;height: 30px;line-height: 30px;border-bottom: 1px solid #e5e5e5;font-size: 13px; padding: 0 20px;
        &:before{  content: '';  width: 6px;  height: 6px;  background-color: #F09237;  border-radius: 3px;  display: inline-block;  margin-right: 5px;  margin-bottom: 3px;  vertical-align: middle;
        }
      }
      .asset-title{border-top: 1px solid #e5e5e5;}
      .projectInfo-wrapper,.assetPossess-wrapper{padding: 20px;
        li{margin: 15px 0;}}
    }
    /*.assetBased-table{
    	width: 100%;
    	position: absolute;
    	top: 0;
    	bottom: 30px;
    }
    .assetBased-foot{
    	width: 100%;
    	position: absolute;
    	bottom: 0;
    }*/
  }

  /deep/ .loading-upload-icon{background:url('../../../static/img/loading.gif');width: 188px;height: 146px;display:inline-block;transform: scale(.5)}
  /deep/ .el-loading-mask{z-index: 100 !important;}
  /deep/ .el-loading-spinner .el-loading-text{color: #50ADEE;margin-top:-36px;font-size: 13px}
  /deep/ .el-loading-spinner{top:30%}
  /deep/ .widget-pop-upload .layui-icon-close{font-weight: normal !important;}
  /deep/ .widget-pop-upload .layui-icon-close:hover:after{color: #409EFF;border-color: #c6e2ff;background: #ecf5ff;opacity: 1;}
  /deep/ .el-loading-spinner .el-loading-text .loading-head-text{margin-bottom:12px;color: #50ADEE;}
  /deep/ .loading-content{line-height: 30px;}
  /deep/ .el-dialog__headerbtn .el-dialog__close{color:#0883E4 !important;
            &:hover{color:#F09237!important;}
        }
  /deep/ .el-scrollbar__wrap{overflow-x: hidden;}
.export-cont{padding-left:10px;padding-right:10px;
  .export-box{border-radius:5px;cursor: pointer;display: inline-block;border: 1px solid #EDEDED;padding: 14px;text-align:center;width:160px;height:128px;box-sizing:border-box;
    .orange-text{color:#F3A85F;font-size:13px;margin-top:10px;}
    .blue-text{color:#3FABFF;font-size:13px;margin-top:10px;}
  }
  .orange-box:hover{border: 1px solid #F3A85F;}
  .blue-box:hover{border: 1px solid #3FABFF;}
  .export-cont-fd{margin:6px 0;}
}
///deep/ .fullPageContent-content>.el-scrollbar{}
</style>
