<template>
 <div class="center-body house-case">
    <div class="house-wrap">
        <div class="case-tab-header">
            <span class="iconfont icon-xiangmuxinxi"></span>
            <ul class="menu-list">
                <li v-for="(item,index) in tabList" :key="index" :class="{actived:index==activeNum}" @click="tabChange(index,item)">{{item}}</li>
            </ul>
        </div>
        <div class="case-bd">
            <div class="clear tab-body-hd" v-if="tabList[activeNum]!='结果确定表'">
                <div class="fl tab-left">
                    <span class="h-title">{{tabList[activeNum]}}评估案例</span>
                    <span class="pag" :class="{active:isEnable}">{{aliveTxt}}</span>
                </div>
                <div class="fr tab-right" v-if="$store.state.readonly">
                    <a href="javascript:;" class="btn btn-normal f12" @click="showUpload()">
                        <i class="case-icon"></i>
                        案例上传
                    </a>
                    <a href="javascript:;" class="btn btn-blue" v-if="aliveTxt=='未启用'" @click="showDialog(0)">启用案例</a>
                    <a href="javascript:;" class="btn btn-pink" v-else @click="prohibitCase(1)">禁用案例</a>
                    <a href="javascript:;" class="btn btn-orange"@click="showDialog(2)">删除案例</a>
                </div>
            </div>
            <!--切换tab-->
            <div  class="tab-body">
                <!--成本法-->
                <cost-law :ref="tabContList['成本法']" v-show="tabList[activeNum]=='成本法'&&defaultPage.indexOf('成本法')>-1"></cost-law>
                <!--收益法-->
                <income-law :ref="tabContList['收益法']" v-show="tabList[activeNum]=='收益法'&&defaultPage.indexOf('收益法')>-1"></income-law>
                <!--市场法-->
                <market-law :ref="tabContList['市场法']" v-show="tabList[activeNum]=='市场法'&&defaultPage.indexOf('市场法')>-1"></market-law>
                <!--结果确定表-->
                <ensure-page :ref="tabContList['结果确定表']" v-show="tabList[activeNum]=='结果确定表'"></ensure-page>
                <div class="initPage" v-if = "noDataPage" :style="{height: pageHeight+'px'}">
                    <div class="initPage-content">
                        <p>暂无数据</p>
                        <a @click="showUpload" class="search-btn width120">+ &nbsp;上传案例</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--弹窗上传文件 begin-->
    <el-dialog
      title="导入文件"
      :center="true"
      top="0"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      custom-class="importDeclarationForm"
      :visible.sync="importDeclarationFormVisible"
      @close="closeUpload"
      width="500px">
      <div class="importOpen">
          <div class="importOpen-left"><span>上传文件：</span></div>
          <div class="importOpen-right">
            <el-upload
            action="/api/case/uploadCaseExcel"
            ref="upload"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-success="uploadSuccess"
            :on-change="uploadChange"
            :before-upload="beforeUpload"
            :on-error="uploadError"
            accept="xls,xlsx"
            :file-list="fileList"
            :auto-upload="false">
              <a class="btn btn-default" href="javascript:;" ref="uploadBtn">+ 点击上传</a>
              <a @click.stop="downloadFile" class="btn btn-default w130" :href="downUrl">{{tabList[activeNum]}}模板下载</a>
              <div slot="tip" class="dialogContent">
                <template v-if="tabList[activeNum]=='收益法'">
                    <el-checkbox-group v-model="dialogCaseList">
                      <el-checkbox label="收益法简版"></el-checkbox>
                      <el-checkbox label="收益法租约版"></el-checkbox>
                    </el-checkbox-group>
                </template>
                <template v-if="tabList[activeNum]=='市场法'">
                    <el-checkbox-group v-model="dialogCaseList">
                      <el-checkbox label="市场法住宅"></el-checkbox>
                      <el-checkbox label="市场法办公"></el-checkbox>
                      <el-checkbox label="市场法商业"></el-checkbox>
                    </el-checkbox-group>
                </template>
                <div class="el-upload__tip">
                  <p>上传填写后端数据文件仅支持xls、xlsx格式，切文件大小不能超过200M</p>
                  <p>* 上传文件后会覆盖您已导入的数据，请谨慎操作</p>
                  <p>* 上传的附件文件要和模板一致，否则系统无法读取 上传的文件数据</p>
                </div>
              </div>

            </el-upload>
          </div>
      </div>
      <div slot="footer" class="importOpen-footer">
          <el-button type="primary" @click="submitUpload">开始导入</el-button>
          <el-button @click="importDeclarationFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--弹窗上传文件 end-->
    <!--启用案列 begin-->
   <center-dialog ref="centerDialog" :dialogWidth="'320px'" :dialogHeight="'210px'" :dialogTitle="'提示信息'" :titlePosition="'left'">
     <div slot="dialogContent" class="content-wrapper">
       <!--成本法-->
       <div v-if="tabList[activeNum]=='成本法'" class="dialogContent">
         <p class="tips" v-if="dialogStatus==0">确认启用此成本法评估案例？</p>
         <p class="tips" v-else>确认删除此成本法评估案例？</p>
       </div>
       <!--收益法-->
       <div v-else-if="tabList[activeNum]=='收益法'" class="dialogContent">
         <template v-if="dialogStatus==0">
           <el-radio v-model="radio" label="收益法简版" :disabled="disabledItem('收益法简版')">收益法简版</el-radio>
           <el-radio v-model="radio" label="收益法租约版" :disabled="disabledItem('收益法租约版')">收益法租约版</el-radio>
           <p class="tips" v-if="">确认启用此收益法评估案例？</p>
         </template>
          <template v-else>
            <el-checkbox-group v-model="dialogCaseList">
              <el-checkbox label="收益法简版" :disabled="disabledItem('收益法简版')"></el-checkbox>
              <el-checkbox label="收益法租约版" :disabled="disabledItem('收益法租约版')"></el-checkbox>
            </el-checkbox-group>
            <p class="tips">确认删除此收益法评估案例？</p>
          </template>


       </div>
       <div v-else class="dialogContent market-case">
         <template v-if="dialogStatus==0">
           <el-radio v-model="radio" label="市场法住宅" :disabled="disabledItem('市场法住宅')">市场法住宅</el-radio>
           <el-radio v-model="radio" label="市场法办公" :disabled="disabledItem('市场法办公')">市场法办公</el-radio>
           <el-radio v-model="radio" label="市场法商业" :disabled="disabledItem('市场法商业')">市场法商业</el-radio>
           <p class="tips">确认启用此市场法评估案例？</p>
         </template>
         <template v-else>
           <el-checkbox-group v-model="dialogCaseList">
              <el-checkbox label="市场法住宅" :disabled="disabledItem('市场法住宅')"></el-checkbox>
              <el-checkbox label="市场法办公" :disabled="disabledItem('市场法办公')"></el-checkbox>
              <el-checkbox label="市场法商业" :disabled="disabledItem('市场法商业')"></el-checkbox>
            </el-checkbox-group>
           <p class="tips">确认删除此市场法评估案例？</p>
         </template>

       </div>
       <div class="dialog-footer">
         <span class="search-btn" @click="enableCase()">确认</span>
         <span class="reset-btn" @click="closeDialog()">取消</span>
       </div>
     </div>
   </center-dialog>
    <!--启用案列 end-->

</div>

</template>

<script>
import costLaw from '@/page/fullPageModule/case/houseCase/cost/costLaw'
import marketLaw from '@/page/fullPageModule/case/houseCase/marketLaw/marketLaw'
import ensurePage from '@/page/fullPageModule/case/houseCase/ensurePage'
import incomeLaw from '@/page/fullPageModule/case/houseCase/income/incomeLaw'
import centerDialog from '@/components/centerDialog'
export default {
    components:{costLaw,marketLaw,ensurePage,incomeLaw,centerDialog},
    data() {
      return {
        tabList:[],
        fullTabList:["成本法","收益法","市场法","结果确定表"],
        tabContList:{
            "成本法":"costLaw",
            "收益法":"incomeLaw",
            "市场法":"marketLaw",
            "结果确定表":"ensurePage"
        },
        activeNum:this.$store.state.curCaseActiveNum||0,
        isEnable:false,//图标
        aliveTxt:'',//启用or未启用

        importDeclarationFormVisible:false,
        uploadHeaders:{
            token:this.$getCookie('token'),
        },
        uploadData:{   //文件上传时附带的额外参数
            investorId:this.$store.state.investorId,
            projectId:this.$store.state.projectId,
            caseSheetName:'',
            xlsSheetName:this.$store.state.curSheetName,
            dataId:"",
            ruleType:""
        },
        fileList:[],
        loading:'',
        loadList:{},//加载过数据的模块
        allCaseEnable:[],//是否启用案列
        defaultPage:[],//显示默认视图(用于判断当前案列是否需要加载数据)
        noDataPage:false,//显示暂无数据页面
        radio: '', // 选择的案例类型
        pageHeight: window.screen.availHeight-300, // 初始页面的高度
        dialogStatus:'',//启用案列的操作
        dialogCaseList:[],//收益法删除案列
        incomeLawCaseList:["收益法简版","收益法租约版"],//用于删除案列时候的计算
        marketCaseList:["市场法住宅","市场法办公","市场法商业"],//用于删除案列时候的计算
        useCaseObj:{},//当前法启用的是哪个模块的案列
        importSheetNameObj:{},//各个法导入的数据
        downUrl:'',//下载链接
        priceRule:{//作价规则
          "3":"成本法",
          "8":"收益法",
          "9":"市场法"
        }

      }
    },
    mounted(){
        var _this = this;
        var initDataFlag  = false;
        this.aliveTxt = '未启用';
        this.$store.state.showUpload = this.showUpload;//上传
        this.$store.state.updateCaseFlag = false;
        this.$store.state.resultDataUpdateRow = '';
        //console.log(_this.$refs[''+_this.tabContList[this.tabList[this.activeNum]]]);

        //自动添加menu(tab切换标签)

        console.log(_this.priceRule[_this.$store.state.curCaseInfo.ruleType]+"-------------------");
        this.tabList = [];
        this.tabList.push(_this.priceRule[_this.$store.state.curCaseInfo.ruleType]);
        this.tabList.push('结果确定表');
        this.$store.state.caseTabItem = this.tabContList[this.priceRule[this.$store.state.curCaseInfo.ruleType]];
        this.activeNum = 0;
        //需要判断是否有数据
         this.getXlsCaseInfoList();
         this.caseEnableFn();
        if(this.defaultPage.indexOf(this.tabList[this.activeNum])<=-1){
            this.noDataPage = true;
          return;
        }

        this.$nextTick(()=>{
          console.log(_this.$store.state.curCaseInfo.xlsCaseInfoList)
          this.$refs[this.$store.state.caseTabItem].initData();

        })

    },
    methods: {
      //分解当前数据信息
      getXlsCaseInfoList(){
          var xlsCaseInfoList = this.$store.state.curCaseInfo.xlsCaseInfoList;//当前选中数据的案列信息
          var _this = this;
          this.defaultPage = [];
          this.allCaseEnable =[];
          this.$store.state.allCaseEnable = [];
          this.noDataPage = false;
          this.useCaseObj = {};
          this.importSheetNameObj={};
          for(var i =0;i<xlsCaseInfoList.length;i++){
            if(xlsCaseInfoList[i].enableSheetName!=''){
              this.allCaseEnable.push(this.fullTabList[xlsCaseInfoList[i].ruleType-1]);//启用案列
              this.useCaseObj[this.fullTabList[xlsCaseInfoList[i].ruleType-1]] = xlsCaseInfoList[i].enableSheetName;//当前启用的案列

            };
           if(xlsCaseInfoList[i].importSheetName!=''){
             //当前有数据的案列
              var str = xlsCaseInfoList[i].importSheetName;
              var dataStrArr=str.split(",");
              this.importSheetNameObj[this.fullTabList[xlsCaseInfoList[i].ruleType-1]] = dataStrArr;
           }
            this.defaultPage.push(this.fullTabList[xlsCaseInfoList[i].ruleType-1]);//选中的数据含有哪些案列
          }
          this.$store.state.allCaseEnable = this.allCaseEnable;//启用的案列 在结果确认表需要用到
      },
      caseEnableFn(){
         //判断当前的tab是否启用案列
        if(this.allCaseEnable.indexOf(this.tabList[this.activeNum])>-1){
            this.aliveTxt = '已启用';
            this.isEnable = true;
            if(this.tabList[this.activeNum]!='成本法'){
              this.aliveTxt +=this.useCaseObj[this.tabList[this.activeNum]];
            }
        }else{
            this.aliveTxt = '未启用';
            this.isEnable = false;
        }
      },
      /**没有数据的案列不能直接启用和删除*/
      disabledItem(item){
          if(this.importSheetNameObj[this.tabList[this.activeNum]]&&this.importSheetNameObj[this.tabList[this.activeNum]].indexOf(item)<=-1){
            return true;
          }
          return false;
      },
      //更新页面
      initPage(item){
        //判断是否需要加载数据
        if(this.tabList[this.activeNum]!="结果确定表"){
           if(this.defaultPage.indexOf(this.tabList[this.activeNum])<=-1){
              this.noDataPage = true;
              return;
          }
        }

        if(this.defaultPage.length==0&&this.tabList[this.activeNum]=="结果确定表"){
            this.$refs[this.$store.state.caseTabItem].noDataFn();
           return
        }
        //需要判断否加载过数据
        //if(this.loadList.item) return
        this.$nextTick(()=>{
          this.$refs[this.$store.state.caseTabItem].initData();
        })
        //this.loadList.item = true;
      },
      //切换的时候需要判断当前是否有需要保存的数据
      tabChange(idx,item){
        if(!this.$store.state.caseTabFlag){
            this.$messageError("请先保存当前数据");
            return;
          }
        //如果切换的是相同的页签
        if(idx==this.activeNum) return;

        this.noDataPage = false;
        this.activeNum = idx;
        // this.view = this.tabContList[item];
        this.$store.state.caseTabItem = this.tabContList[item];

        this.caseEnableFn();
        this.initPage(item);
        if(item=="结果确定表") return;
        this.$refs[''+this.$store.state.caseTabItem].tidyActiveNumFn();

      },
      closeUpload(){
         this.$refs.upload.clearFiles();
         this.dialogCaseList =[];
      },
      submitUpload(){
        if(this.fileList.length===0){
          this.$messageWarning("请选择导入文件");
          return
        }
        if(this.tabList[this.activeNum]!='成本法'&&this.dialogCaseList.length==0){
          this.$messageWarning("请选择导入的模板哦");
          return
        }
        this.tabList[this.activeNum]=='成本法'?this.uploadData.caseSheetName='成本法':this.uploadData.caseSheetName=this.dialogCaseList.join(',');
        this.$refs.upload.submit();
      },
      /*显示上传弹窗 */
      showUpload(){
          var _this = this;
          this.fileList = [];
          this.dialogCaseList =[];
          this.downUrl = "/api/file/downloadFile?docsName=房屋建筑物"+this.tabList[this.activeNum]+"案例导入模板.xlsx&alyPath=&flag=1";
          //先判断当前页面是否有未保存的数据
          if(!this.$store.state.caseTabFlag){
            this.$messageError("请先保存当前数据");
            return;
          }
          this.importDeclarationFormVisible = true;
          this.uploadData.dataId =this.$store.state.caseDataId;
          this.uploadData.ruleType = this.tabList[this.activeNum];
          console.log(_this.uploadData);
      },
      /*下载模板 */
      downloadFile(){

      },
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
      beforeUpload(){
         this.loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            fullscreen: true,
            background: "rgba(0, 0, 0, 0.8)"
          });
      },
      /*上传失败 */
      uploadError(err, file, fileList){
        this.$messageError(err);
        this.loading = false;
      },
      /**上传成功 */
      uploadSuccess(response, file){
        var _this = this;
        this.loading.close();
        //需要清除获取数据的状态
        if(response.code==200){
          this.$messageSuccess('上传成功');
          this.importDeclarationFormVisible = false;
          this.$store.state.addCaseIconFn(_this.tabList[_this.activeNum],_this.uploadData.caseSheetName);
          this.getXlsCaseInfoList();
          this.$refs[''+_this.$store.state.caseTabItem].initData(_this.uploadData.caseSheetName);
          this.fileList =[];
          if(response.data){
            this.$store.state.resultDataUpdateRow = response.data;
          }
        }else{
          this.$messageError(response.msg);
          this.importDeclarationFormVisible = false;
        }
      },
      /**禁用案列 */
      prohibitCase(status){
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
         this.dialogStatus = status;
        this.$confirm('确认禁用此案例？', '提示',  {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          closeOnClickModal:false,
          type: 'warning'
        }).then(()=> {
          this.requestCase();
        }).catch(err=> {

        })
      },
      /**
       * 启用(删除)案例
       * status:0启用 1禁用 2删除
       * */
      showDialog(status) {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
        if(this.noDataPage){
          this.$messageError('请先上传案例');
          return;
        }

      //  if(status==2&&this.aliveTxt=="未启用"){
      //     this.$messageError('您还没有启用案例哦');
      //     return;
      //  };
       this.dialogStatus = status;
       this.$refs.centerDialog.showDialog();
      },

      // 请求接口(启用与删除)
      requestCase() {
        var sheetName = '';
        var _this = this;
        //需要区分是启用还是删除

        if(this.dialogStatus==0){
            sheetName = this.radio;
        }else{
          sheetName = this.dialogCaseList.join(',');
        }
        this.$http.post('api/case/updateEnableOrDelete', {
          dataId: this.$store.state.caseDataId,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          ruleType: this.tabList[this.activeNum],
          sheetNameList:sheetName==''?'成本法评估值计算表':sheetName,
          status:this.dialogStatus
        }).then(res=> {
          var enableSheetName = sheetName;
          enableSheetName==''?enableSheetName="成本法":enableSheetName=sheetName;
          switch (_this.dialogStatus) {
            case 0:
               _this.$store.state.addCaseIconFn(_this.tabList[_this.activeNum],enableSheetName,'启用');
              break;
            case 1:
               _this.$store.state.addCaseIconFn(_this.tabList[_this.activeNum],enableSheetName,'禁用');
              break;
             case 2:
               _this.$store.state.addCaseIconFn(_this.tabList[_this.activeNum],enableSheetName,'删除');
                //需要删除选中的案列
               //_this.$store.state.defaultCaseList = _this.dialogCaseList;
               _this.$refs[''+_this.$store.state.caseTabItem].deleteCase(_this.dialogCaseList);
              break;
          }

          _this.getXlsCaseInfoList();
          _this.caseEnableFn();
          // 启用后绑定案例与外部的值
          if(res.data) {
            _this.$store.state.resultDataUpdateRow = res.data;
          }
          if(_this.defaultPage.indexOf(_this.tabList[_this.activeNum])<=-1){
              _this.noDataPage = true;
              //需要将activeNum归置为0
              _this.$refs[''+_this.$store.state.caseTabItem].tidyActiveNumFn();

          }
          _this.closeDialog();
        }).catch(err=> {
          _this.$messageError(err);
        })
      },

      //确认 启用or删除案列
      enableCase() {
        //启用
        if(this.dialogStatus==0){
            if(this.tabList[this.activeNum]!='成本法'&&this.radio==''){
                this.$messageError('请选择一种案例哦');
                return
              }
        }
        //删除
        if(this.dialogStatus==2){
          if(this.tabList[this.activeNum]!='成本法'&&this.dialogCaseList.length==0){
                this.$messageError('请选择一种案例哦');
                return
              }
        }
        this.requestCase()


      },
      //取消
      closeDialog(){
        this.$refs.centerDialog.closeDialog();
        this.radio = '';
        this.dialogStatus = '';
        this.dialogCaseList = [];
      }

    },
    beforeDestroy(){
      //需要判断当前是不是有需要保存的东西
      // if(!this.$store.state.caseTabFlag){
      //       this.$messageError("请先保存当前数据");
      //       return;
      //     }

      //需要清空当前侧边栏的数据

      this.$store.state.curCaseActiveNum ='';
      this.$store.state.caseTabItem = 'costLaw';
      this.$store.state.caseTabFlag = true;
      if(this.$store.state.resultDataUpdateRow) {
        this.$store.state.getTotalNum();
        this.$store.state.UpdateCaseRow(this.$store.state.resultDataUpdateRow)
      }
      this.$store.state.curCaseInfo = '';
    }
}
</script>
<style  rel="stylesheet/scss" lang='scss' scoped>
.case-icon{display: inline-block;width: 13px;height:13px;background:url('../../../../../static/img/case-icon.png') no-repeat;}
.house-wrap{border:1px solid #ECECEC;
    .tab-body{padding:0 20px 20px;}
    .tab-body-hd{margin-top: 9px;padding:0 20px;
        .tab-left{
            .h-title{color: #29292B;font-size: 14px;vertical-align: middle;font-weight: bold}
            .pag{vertical-align: middle;border: 1px solid #C3C3C3;font-size: 12px;margin-left:5px;padding: 2px 4px;border-radius:3px;color: #c3c3c3;
              &.active{color:#11BF6B;border-color:#11BF6B}
            }
        }
    }

}
.house-case{
/deep/.importDeclarationForm{top:50%;transform: translate(0,-50%);
      .el-dialog__header{padding: 4px 0;background:#F6FAFF;border-bottom:1px solid #E5E5E5;
        .el-dialog__title{
          font-size:14px;font-family:PingFangSC-Medium;font-weight:bold;color:#262628;
        }
      }
      .el-dialog__headerbtn{top: 10px;right: 10px;}
      .importOpen{padding: 0 6px;display: flex;
        .importOpen-left{line-height: 25px;}
        .importOpen-right{flex:1;
          .el-upload{float: none;margin-bottom:8px;
            .el-button{height: 25px;padding: 0 10px;border-radius:2px;border:1px solid #3A80EC;color:#3A80EC;}
            .el-button:hover{color: #409EFF;background: #ecf5ff;opacity: .7;}
          }
          .el-upload__tip{border: 1px dashed #DCDCDC;
            p{padding-top: 5px;padding-left: 10px;line-height: 25px;font-size: 12px;}
            p:nth-child(2){color:#F09237;}
            p:nth-child(3){color:#F09237;}
            .el-upload-tip-down{color:#3A80EC;}
            .el-upload-tip-down:hover{text-decoration:underline;}
          }
          .el-upload-list{margin-top: 7px;height:50px;}
        }
      }
      .importOpen-footer{
        .el-button{padding: 0;border-radius:2px;width: 70px;height: 25px;}
        .el-button:last-child{margin-left: 14px;color: #3A80EC;border: 1px solid #3A80EC}
        .el-button:hover:last-child{color: #409EFF;background-color: #ecf5ff;opacity: .7;}
      }
    }

 }

</style>
<style lang='scss'>
.case-tab-header{padding:0 18px;height: 35px;line-height: 35px;border-bottom:1px solid #ECECEC;
    .icon-xiangmuxinxi{font-size: 13px;vertical-align: middle;color: #F7B543;}
    .menu-list{ display: inline-block;
        li{display: inline-block;cursor: pointer;margin:0 15px;font-size:13px;color:#262628;height: 35px;line-height: 35px;
            &.actived{color:#145FD2;border-bottom:2px solid #145FD2;}
        }
    }
}
.house-case{
    .initPage{
        position: relative;
        background: url('../../../../assets/common/nodata.png') no-repeat center;
        .initPage-content{
            p{font-size: 13px; color: rgba(144,144,144,1);}
            line-height: 38px;
            width: 120px; height: 70px; text-align: center; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;
            transform: translateY(60px);
        }
    }
     .importDeclarationForm{top:50%;transform: translate(0,-50%);
      .el-dialog__header{padding: 4px 0;background:#F6FAFF;border-bottom:1px solid #E5E5E5;
        .el-dialog__title{
          font-size:14px;font-family:PingFangSC-Medium;font-weight:bold;color:#262628;
        }
      }
      .el-dialog__headerbtn{top: 10px;right: 10px;}
      .importOpen{padding: 0 6px;display: flex;
        .importOpen-left{line-height: 25px;}
        .importOpen-right{flex:1;
          .el-upload{float: none;margin-bottom:8px;
            .el-button{height: 25px;padding: 0 10px;border-radius:2px;border:1px solid #3A80EC;color:#3A80EC;}
            .el-button:hover{color: #409EFF;background: #ecf5ff;opacity: .7;}
          }
          .el-upload__tip{border: 1px dashed #DCDCDC;
            p{padding-top: 5px;padding-left: 10px;line-height: 25px;font-size: 12px;}
            p:nth-child(2){color:#F09237;}
            p:nth-child(3){color:#F09237;}
            .el-upload-tip-down{color:#3A80EC;}
            .el-upload-tip-down:hover{text-decoration:underline;}
          }
          .el-upload-list{margin-top: 7px;height:50px;}
        }
      }
      .importOpen-footer{
        .el-button{padding: 0;border-radius:2px;width: 70px;height: 25px;}
        .el-button:last-child{margin-left: 14px;color: #3A80EC;border: 1px solid #3A80EC}
        .el-button:hover:last-child{color: #409EFF;background-color: #ecf5ff;opacity: .7;}
      }
    }
    .f12{font-size:12px !important;}
    .w130{width:130px !important;}
    .w40{width:40px !important;}
    .btn-group{margin-left:10px;}
    .btn{display: inline-block;text-align:center;font-size: 13px;color: #fff;width:70px;height: 25px;line-height:25px;border-radius:2px;cursor: pointer;
        &:hover{opacity: .7;}
        &+.btn{margin-left: 8px;}
        &.btn-normal{color: #3A80EC; }
        &.btn-blue{background: #3A80EC;border:1px solid #3A80EC;}
        &.btn-orange{background:#F09237;border:1px solid #F09237;}
        &.btn-pink{background: #ed6f58;border: 1px solid #ed6f58;}
        &.min-btn{width:40px;height: 20px;line-height:20px;font-size:12px;}
        &.btn-default{border:1px solid  #3A80EC;color: #3A80EC;
            &:hover{background:#ecf5ff}
        }
    }
    .content-wrapper{
      text-align: center;
      .dialogContent{height: 80px;
        .tips{margin:15px 0 30px 0;}
        .dialog-footer{margin-top: 15px; }
        &.market-case{
          /deep/ .el-radio+.el-radio{margin-left: 4px;}
          /deep/ .el-radio__label, /deep/.el-checkbox__label{padding-left: 5px;}
          /deep/ .el-checkbox+.el-checkbox{margin-left: 8px;}
        }
      }
    }
 }

 table.case-table{width:100%;background: #e5e5e5;
    *{box-sizing: border-box;}
    th{color:#262628;font-size: 13px;}
    td{font-size: 12px;height: 26px;color: #9d9b9b;background:#fff;
      .cell{color: #9d9b9b !important;}
      .input-edit{color: #262626;background:transparent;border: 1px solid #fff;text-align: center;position: absolute;left: 0;top: 0;width: 100%;height: 100%;padding: 0 4px 1px;border-radius: 0;
        // box-shadow: 1px 1px 20px rgba(0,0,0,.15);
        &.disabled{border:none;box-shadow:none;text-overflow: ellipsis;white-space: nowrap;color: #9d9b9b;cursor: no-drop;}
      }
    }
    tr th,tr td{border: 1px solid #e5e5e5;text-align: center;position: relative;vertical-align: middle;}
    thead tr{background: #f6faff;height: 30px;}
    tbody td:first-child{border-left: 0;}
    // tbody tr{height: 21px;}
}
</style>

