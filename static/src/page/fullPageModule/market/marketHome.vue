<template>
  <div class="marketHome" v-loading="loading" element-loading-text='正在进行模版导入，请稍候...' element-loading-spinner="loading-upload-icon">
    <div class="market-left fl">
      <div class="listed-company company-box">
        <div class="company-way" @click="listedFun(1)">
          上市公司比较法
          <span class="way-status" v-if="isListedEnable">已启用</span>
          <i class="fr" :class="addCaseId == 'listed' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </div>
        <div class="company-sub-menu" :class="{'hidden':companyHidden}">
          <div class="company-item" :class="{'on':/assessOverview|standard/.test(this.$route.path) && (!this.$route.query.way || this.$route.query.way=='listed')}" @click.stop="goDetail($event,'assessOverview')" :to="mainPath + 'assessOverview'" type="1" id="1">总览</div>
          <div class="company-item current-company"  @click.stop="goDetail($event,'companyData')" :class="{'on':/companyData|reportForm/.test(this.$route.path) && (!this.$route.query.way || this.$route.query.way=='listed') && isCompany}" :title="leftMenu.currentCompany && leftMenu.currentCompany.companyName" id="listed" type="0" :to="mainPath + 'companyData'">【被评估单位】{{leftMenu.currentCompany && leftMenu.currentCompany.companyName}}</div>
          <div class="company-list">
            <vue-scroll>
              <div class="company-item" v-for="(item,index) in leftMenu.comparison" :id="item.id" :title="item.companyName" @click.stop="goDetail($event,'companyData',true)" :key="index">
                <el-checkbox :label="item.id" @change="selectCompany($event,item)" @click.native.stop v-model="item.isSelected" :isSelected="item.isSelected"></el-checkbox>
                {{item.companyName}}
                <i class="el-icon-close deleteCompany" :id="item.id" @click.stop="deleteDialog($event)"></i>
              </div>
            </vue-scroll>
          </div>
          <a class="add-company company-item" v-if="this.$store.state.readonly" @click="showDialog('addCaseDialog')"><i class="el-icon-plus"></i> 添加案例</a>
        </div>
      </div>
      <div class="trade-company company-box">
        <div class="company-way" @click="listedFun(2)">
          交易案例比较法
          <span class="way-status" v-if="isTradeEnable">已启用</span>
          <i class="fr" :class="addCaseId == 'trade' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
        </div>
        <div class="company-sub-menu" :class="{'hidden':!companyHidden}">
          <div class="company-item" :class="{'on':/assessOverview|standard/.test(this.$route.path) && this.$route.query.way=='trade'}" @click.stop="goDetail($event,'assessOverview')" type="2" id="0" :to="mainPath + 'assessOverview'">总览</div>
          <div class="company-item current-company" @click.stop="goDetail($event,'companyData')" :class="{'on':/companyData|reportForm/.test(this.$route.path) && this.$route.query.way=='trade' && isCompany}" :title="leftMenu.currentCompany && leftMenu.currentCompany.companyName" id="trade" type="0" :to="mainPath + 'companyData'">【被评估单位】{{leftMenu.currentCompany && leftMenu.currentCompany.companyName}}</div>
          <div class="company-list">
            <vue-scroll>
              <div class="company-item" v-for="(item,index) in leftMenu.transaction" :id="item.id" type="3" :title="item.companyName" @click.stop="goDetail($event,'companyData')" :key="index">
                <el-checkbox :label="item.id" @change="selectCompany($event,item)" @click.native.stop v-model="item.isSelected" :isSelected="item.isSelected"></el-checkbox>
                {{item.companyName}}
                <i class="el-icon-close deleteCompany" :id="item.id" @click.stop="deleteDialog($event)"></i>
              </div>
            </vue-scroll>
          </div>
          <a class="add-company company-item" v-if="this.$store.state.readonly" @click="showDialog('addCaseDialog')"><i class="el-icon-plus"></i> 添加案例</a>
        </div>
      </div>
    </div>
    <div class="market-right fl">
      <div class="market-right-title">
        <ul class="fl" v-if="/companyData|reportForm/.test(this.$route.path)">
          <router-link tag="li" :to="mainPath+'companyData?way='+addCaseId" :class="{cur:/companyData/.test(this.$route.path)}">公司数据</router-link>
          <span v-if="this.$store.state.tableExist && reportFromHidden">
            <router-link tag="li" :to="mainPath+'reportForm/assets?way='+addCaseId" :class="{cur:this.$route.params.id == 'assets'}">资产负债表</router-link>
            <router-link tag="li" :to="mainPath+'reportForm/profit?way='+addCaseId" :class="{cur:this.$route.params.id == 'profit'}">利润表</router-link>
            <router-link tag="li" :to="mainPath+'reportForm/other?way='+addCaseId" :class="{cur:this.$route.params.id == 'other'}">附表</router-link>
          </span>
        </ul>
        <ul class="fl" v-if="/assessOverview|standard/.test(this.$route.path)">
          <router-link tag="li" :to="mainPath+'assessOverview?way='+addCaseId" :class="{cur:/assessOverview/.test(this.$route.path)}">评估总览</router-link>
          <router-link tag="li" :to="mainPath+'standard/finance?way='+addCaseId" :class="{cur:this.$route.params.id == 'finance'}">财务标准值</router-link>
          <router-link tag="li" :to="mainPath+'standard/business?way='+addCaseId" :class="{cur:this.$route.params.id == 'business'}">业务标准值</router-link>
        </ul>
        <div class="fr">
          <!-- 暂时不做启用功能，如需开发，将 && false 删除调试即可 -->
          <div class="fl" v-if="/assessOverview/.test(this.$route.path)">
            <!-- 上市公司比较法是否启用 -->
            <el-checkbox v-if="this.$store.state.fileFlag == '1'" v-model="isListedEnable" @change="changeEnable">将此方法用于报告生成</el-checkbox>
            <!-- 交易案例比较法是否启用 -->
            <el-checkbox v-if="this.$store.state.fileFlag == '2'" v-model="isTradeEnable" @change="changeEnable">将此方法用于报告生成</el-checkbox>
          </div>
          <a class="search-btn fr" v-if="reportFromHidden && this.$store.state.readonly" @click="uploadFileDialog">导入报表</a>
        </div>
      </div>
      <div class="market-right-content">
        <vue-scroll>
          <div class="right-content">
            <div class="current-company">被评估单位：{{leftMenu.currentCompany && leftMenu.currentCompany.companyName}}</div>
            <router-view />
          </div>
        </vue-scroll>
      </div>
    </div>

    <!-- 添加案例弹窗 -->
    <center-dialog ref="addCaseDialog" dialogWidth='350px' dialogHeight="170px" dialogTitle="添加案例" titlePosition="center">
			<div class="text-center" slot="dialogContent">
				<el-form ref="addCaseForm" :model="addCaseForm" label-width="80px" :rules="addCaseNode">
					<el-form-item label="案例名称：" prop="companyName">
        		<el-input placeholder="请输入案例名称" v-model="addCaseForm.companyName" maxLength="30"></el-input>
					</el-form-item>
					<div class="margin0 text-center">
    				<a href="javascript:;" class="search-btn" @click="addCaseFun()">保存</a>
    				<a href="javascript:;" class="reset-btn" @click="closeDialog('addCaseDialog')">取消</a>
					</div>
				</el-form>
			</div>
		</center-dialog>
    <!-- 删除公司案例弹窗 -->
    <center-dialog ref="deleteCaseDialog" dialogWidth='300px' dialogHeight="155px" dialogTitle="提示" titlePosition="center">
      <div class="text-center" slot="dialogContent">
				<el-form ref="addCaseForm" :model="addCaseForm" label-width="80px" :rules="addCaseNode">
          <p class="deleteTitle">确定删除该案例？</p>
					<div class="margin0 text-center">
    				<a href="javascript:;" class="search-btn" @click="deleteCaseFun()">确定</a>
    				<a href="javascript:;" class="reset-btn" @click="closeDialog('deleteCaseDialog')">取消</a>
					</div>
				</el-form>
			</div>
    </center-dialog>
  </div>
</template>
<script>
import centerDialog from '@/components/centerDialog';
import Public from '../../../public.js'
export default {
  data(){
    return {
      // tradeExportData: false,    //案例
      // listedExportData: false,   //上市
      loading : false,
      delEvent:'',//删除案例id
      isCompany : false,   //是否是被评估单位【默认是】
      isListedEnable : false,  //上市公司比较法是否被启用【启用后会将信息插入评估报告、说明中】
      isTradeEnable : false,  //交易案例比较法是否被启用【启用后会将信息插入评估报告、说明中】
      companyHidden : this.$route.query.way=="trade" ? true : false,   //比较法下面的内容是否显示
      reportFromHidden : true,  //上市公司比较法中参与对比的公司是否显示报表
      leftMenu : {},
      addCaseForm : {  //添加案例
        companyName : ''
      },
      addCaseNode: {  //添加案例校验
        companyName: [
          { required: true, message: "请输入案例名称", trigger: "blur" }
        ]
      },
      addCaseId : this.$route.query.way || 'listed',    //上市公司比较法还是交易案例比较法的状态
      isCompanyDetail : true,     //公司详情还是比较法详情【判断右侧显示的顶部菜单和内容】,默认公司详情
      mainPath : '/zlpg/project/projectCont/projectImplementation/projectOnlineTask/marketHome/'
    }
  },
  components : { centerDialog },
  created(){
    // 来回切换路由导致的fileFlag异常问题【主要是模版导入】
    this.$store.state.fileFlag = "0";
    this.$store.state.companyId = this.$route.query.way || "listed";
    this.$nextTick(()=>{
      this.isCompany = true;
    })
    this.getLeftMenu();
    this.$store.state.tableExist = false;  //注册全局变量判断报表的显隐【报表没有数据则不显示】
    if(/projectReportAudit/.test(this.$route.path)){
      this.mainPath = '/zlpg/project/projectCont/projectAuditing/projectReportAudit/marketHome/';
    }
    // 文件导出
    this.$store.state.exportFile = this.exportMarketFile;
  },
  mounted(){
    /*上传前 */
    Public.$on('marketBeforeUpload',()=>{
      this.beforeUpload();
    });
    /*上传成功的回调 */
    Public.$on('marketUploadSuccess',(response, file, fileList)=>{
      this.uploadSuccess(response, file, fileList)
    });
    /*上传失败*/
    Public.$on('marketUploadError',(err, file, fileList)=>{
      this.uploadError(err, file, fileList)
    });
  },
  methods:{
    // 文件导出
    exportMarketFile(){
      // if(this.tradeExportData == false || this.listedExportData == false){
      //   this.$messageError('暂无文件可以导出');
      //   return
      // }else{
        window.location.href = "/api/marketTransit/exportMarket?token=" + this.$getCookie("token") + "&projectId=" + this.$store.state.projectId + "&investorId=" + this.$store.state.investorId + "&caseType=" + (this.addCaseId=="trade" ? '2' : '1');
      // }
    },
    //文件上传前
    beforeUpload(file){
      this.loading = true;
    },
    // 上传成功回调
    uploadSuccess(response, file, fileList){
      this.loading = false;
      if(response.code==1){
        this.$messageError(response.msg)//文件上传不匹配
        return;
      }
      this.$messageSuccess(response.msg);
      if(/assessOverview|standard/.test(this.$route.path)){
        this.getLeftMenu();
        this.$store.state.getbusslist();
      }else{
        this.$store.state.getCompanyData();
      }
    },
    //文件失败之后
    uploadError(err, file, fileList){
      console.log(err);
      this.$messageError("文件上传失败，请重新上传");
      this.loading = false;
    },
    getLeftMenu(){
      this.$http.post('/api/marketTransit/getTree',{
        projectId:this.$store.state.projectId,
        investorId:this.$store.state.investorId
      }).then(res => {
        this.leftMenu = res.data;
        this.isListedEnable = res.data.listUse == '0' ? false : true;
        this.isTradeEnable = res.data.tradeUse == '0' ? false : true;
        // this.tradeExportData = res.data.tradeExport;
        // this.listedExportData = res.data.listedExport;
      }).catch(err => {
        this.$messageError(err);
      })
    },
    // 两种比较法的切换
    listedFun(val){
      if(val == 1){   //上市公司比较法
        this.companyHidden = false;
        this.addCaseId = 'listed';
      }else{    //交易案例比较法
        this.companyHidden = true;
        this.addCaseId = 'trade';
      }
    },
    // 是否将当前方法插入报告
    changeEnable(val){
      // if(this.addCaseId == 'listed'){
      //   // this.isListedEnable = val;
      //   console.log(val?"上市法启用":"上市法禁用");
      // }else{
      //   // this.isTradeEnable = val;
      //   console.log(val?"案例法启用":"案例法禁用");
      // }
      this.$http.post('/api/marketTransit/judgeIsUse',{
        projectId:this.$store.state.projectId,
        investorId:this.$store.state.investorId,
        caseType:this.addCaseId == "trade" ? "2" : "1",
        flag : val ? "1" : "0"
      }).then(res=>{
        this.$messageSuccess(res.msg);
      }).catch(err=>{
        // 请求失败将选中状态还原
        this.isListedEnable = !val;
        this.isTradeEnable = !val;
        this.$messageError(err);
      })
    },
    // 勾选对比公司
    selectCompany(val,item){
      const _this = this;
      this.$http.post('/api/marketTransit/updateIsSelect',{
        id:item.id,
        isSelected:val,
        assessmentBaseDate : this.$store.state.projectInfo.assessmentBaseDate
      }).then(res => {
        this.$messageSuccess(res.msg);
        if(/assessOverview/.test(this.$route.path)){
          this.$store.state.getbusslist();
        }
        if(/companyData/.test(this.$route.path) && this.$store.state.fileFlag=="0"){
          this.$store.state.getCompanyData();
        }
      }).catch(err => {
        // 接口请求失败，将选中状态还原
        item.isSelected = !val;
        this.$messageError(err);
      })
    },
    /* 跳转参与比较的公司详情 
      event ：当前的dom对象
      path ：对应的跳转路由
      flag ：true【报表不显示】，false【报表显示】。目前只有上市公司比较法中的报表不显示
    */
    goDetail(event,path,flag){
      // 判断是评估总览还是公司数据
      this.$store.state.fileFlag = event.target.getAttribute('type');
      this.$store.state.companyId = event.target.id; //具体公司，便于导入列表
      // 判断是否是被评估公司【与路由一起做回显】
      if(this.$store.state.fileFlag == '0'){
        this.isCompany = true;
      }else{
        this.isCompany = false;
      }
      // 判断报表是否显示
      if(flag){
        this.reportFromHidden = false;
      }else{
        this.reportFromHidden = true;
      }
      // 路由跳转 way：上市公司比较法【listed】,交易案例比较法【trade】
      this.$router.push({
        path : this.mainPath + path,
        query : { way : this.addCaseId}
      })
      $(".company-item").removeClass("on");
      $(event.currentTarget).addClass("on");
    },
    // 添加案例确定按钮 
    addCaseFun(){
      this.$refs.addCaseForm.validate(valid => {
        if (valid) {
          let params ={
            companyName:this.addCaseForm.companyName,
            caseType:this.addCaseId == "trade" ? "2" : "1",
            projectId:this.$store.state.projectId,
            investorId:this.$store.state.investorId,
            assessmentBaseDate : this.$store.state.projectInfo.assessmentBaseDate
          }
          this.$http.post('/api/marketTransit/saveCompany',params
          ).then(res => {
            this.getLeftMenu();
            this.addCaseForm.companyName = '';
            // 如果在总览页面，则重新渲染
            if(/assessOverview/.test(this.$route.path)){
              this.$store.state.getbusslist();
            }
            this.closeDialog("addCaseDialog");
          }).catch(err => {
            this.$messageError(err);
          })
        }
      });
    },
    // 打开导入文件弹窗
    uploadFileDialog(){
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "公司报表";
      this.$store.state.commonBtn="导入";
      this.$store.state.componentsType = "marketFile";
    },
    // 打开居中弹窗
    showDialog(refName){
      this.$refs[refName].showDialog();
    },
    // 关闭弹窗
    closeDialog(refName){
      this.$refs[refName].closeDialog();
      if(refName == "addCaseDialog"){
        this.addCaseForm.companyName = '';
      }
    },
    //打开删除案例弹窗
    deleteDialog(){
      this.delEvent = event;
      this.showDialog("deleteCaseDialog");
    },
    deleteCaseFun(){
      this.$http.post('/api/marketTransit/deleteCompanyById',{
        id : this.delEvent.target.id,
        assessmentBaseDate : this.$store.state.projectInfo.assessmentBaseDate
      }).then(res => {
        this.getLeftMenu();
        // 如果当前处于总览页面，则进行页面的重新渲染
        if(/assessOverview/.test(this.$route.path)){
          this.$store.state.getbusslist();
        }
        if(this.delEvent.target.id == this.$store.state.companyId){
          this.$router.push({
            path : "assessOverview",
            query : { way : this.addCaseId }
          });
        }
        this.closeDialog('deleteCaseDialog');
        this.$messageSuccess("删除成功！");
      }).catch(err => {
        this.$messageError(err);
      })
    }
  },
  watch:{
    $route(){
      this.$nextTick(()=>{
        this.$store.state.exportFile = this.exportMarketFile;
      })
    },
    '$route.query.way'(){
      // 通过路由参数的变化判断左侧菜单的显示状态
      if(this.$route.query.way == "trade"){
        this.companyHidden = true;
      }else{
        this.companyHidden = false;
      }
    },
    // 切换两种方法中的内容发出请求
    "$store.state.fileFlag"(){
      if(/assessOverview|standard/.test(this.$route.path))return;
      if(this.$store.state.fileFlag == '0'){
        $(".company-item").removeClass("on");
        this.$router.push({
          path : this.mainPath + "companyData",
          query : { way : this.addCaseId }
        })
        this.isCompany = true;
      }else{
        this.isCompany = false;
      }
    },
    // 切换组织机构数统一跳转到总览首页或者公司详情页面，防止某写情况公司未导入报表造成的错误
    "$store.state.investorId" () {
      this.getLeftMenu();
      if(/assessOverview|standard/.test(this.$route.path)){
        this.$router.push({
          path : this.mainPath + "assessOverview",
          query : { way : this.addCaseId }
        })
      }else{
        this.$router.push({
          path : this.mainPath + "companyData",
          query : { way : this.addCaseId }
        })
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .marketHome{ height:100%; position: relative; padding-left:210px;
    .market-left{ position: absolute; left:0; top:0; width:200px; height:100%;
      .component-btn{ height:35px; line-height:35px; width:200px; background:#3A80EC; text-align:center; display:block; font-size:14px; color:#fff; border-radius:2px; border:none;
        &.is-active{background:rgba(58,128,236,1);box-shadow:0px 3px 5px 1px rgba(89,122,172,1) inset;opacity:0.7;}
      }
      .company-box{ box-sizing:border-box; border-radius:2px; margin-bottom:5px;
        .company-way{ width:200px; height:30px; line-height:30px; box-sizing:border-box; padding:0 12px; border:1px solid #EDEDED; color:#262628; font-size:12px; font-weight:bold; cursor: pointer; transition:all 0.3s ease; border-top-left-radius:2px; border-top-right-radius: 2px;
          .way-status{ font-size:12px; padding:0 4px; border:1px solid #F09237; color:#F09237; border-radius:2px; font-weight:normal; margin-left:5px;}
          i{ height:100%; position:relative; line-height:30px;}
        }
        &.listed-company{
          .company-item.on{ background-color:#E2EFFF; color:#3A80EC;
            .company-name{color:#3A80EC;}
          }
          .company-way{ border-color:#A3C7FF; background-color:#E2EFFF; color:#3A80EC; transition:all 0.3s ease;
            i{ color:#3A80EC;}
          }
          span.company-name{
            &:hover{ color:#3A80EC}
          }
          .is-select{ background-color:#E2EFFF;}
          .add-company{ color:#3A80EC;
            i{ color:#3A80EC; }
          }
        }
        &.trade-company{
          .company-item.on{ background-color:#F1F8E8; color:#7DA452;
            .company-name{color:#7DA452;}
          }
          .company-way{ border-color:#B0C19D; background-color:#F1F8E8; color:#7DA452; transition:all 0.3s ease;
            i{color:#7DA452;}
          }
          span.company-name{
            &:hover{ color:#7DA452}
          }
          .is-select{ background-color:#F1F8E8;}
          .add-company{ color:#7DA452;
            i{ color:#7DA452; }
          }
        }
        .company-sub-menu{ border-bottom-left-radius:2px; border-bottom-right-radius:2px;
          &.hidden{ height:0;}
          .company-item{ padding:0 15px; cursor: pointer; display:block; font-size:13px; height:30px; line-height:30px; box-sizing:border-box; border:1px solid #ECECEC; border-top:none; width:100%; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;position:relative;
            &:hover .deleteCompany{
              display:block;
            }
            &.current-company{ padding:0 10px;}
            /deep/ .el-checkbox__label{ display:none;}
            span.company-name{ font-size:12px; padding-left:3px;}
          }
          .company-list{ overflow: hidden;
            // /deep/ .el-scrollbar__bar.is-horizontal{ display:none;}
            &.company-hidden{ position:absolute; left:0; top:0; right:0; bottom:0;}
          }
          .add-company{ display:flex; justify-content:center; align-items:center;}
        }
      }
    }
    .market-right{ border:1px solid #ECECEC; box-sizing:border-box; width:100%; height:100%;
      .market-right-title{height:35px; box-sizing:border-box; border-bottom:1px solid #ECECEC;background-color:#F6FAFF; padding:0 15px; line-height:35px;
        ul{ margin-top:-1px; height:35px;
          li{ float:left; padding:0 15px; color:#262628; cursor:pointer; font-size:13px; height:35px; box-sizing:border-box; border:1px solid transparent;
            &.cur{ background-color:#fff; border-color:#ECECEC; border-bottom:none; height:36px; color:#3A80EC; font-weight:bold; }
          }
        }
        /deep/ .el-checkbox__label{ padding-left:3px;}
        .search-btn{ margin:5px 0 0 15px;}
      }
      .market-right-content{ left:210px; right:0; position:absolute; top:50px; bottom:15px; box-sizing:border-box;
        .right-content{ padding:0 15px 1px; position: relative;height: 100%;}
        .current-company{ color:#3A80EC; font-weight:bold; font-size:15px; margin-bottom:15px;}
      }
    }
    .deleteCompany{
      position:absolute;
      right:7px;
      top:8px;
      font-weight:700;
      display:none;
      &:hover{
        color:#f09237
      }
    }
    .deleteTitle{
      margin-top:10px;
      margin-bottom:20px;
      font-size:16px;
    }
  }
</style>
