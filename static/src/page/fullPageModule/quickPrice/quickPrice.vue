<template>
    <div class="center-body quick-price-cont clear">
        <div class="wrap-left">
            <p class="bar-title">详细说明：快捷作价会替换当前评估值，请谨慎操作~ </p>
            <div class="price-box ">
                <p class="b-title">
                    <i class="icon icon-organization"></i>
                    <span class="ver-mid">机构选择</span>
                </p>
                <el-scrollbar :style='{height: scrollHeight + "px"}'>
                    <div class="price-bd heightLimit">
                        <tree-node v-for="(item,index) in organizationTree"
                                   :key="index" :node="item"
                                   :show-checkbox="true">
                        </tree-node>
                    </div>
                </el-scrollbar>
                <p class="footer textOverflow1" :title="tips">{{tips}}</p>
            </div>
        </div>
        <div class="wrap-right">
            <p class="bar-title">计算公式：评估值 = 账面值 = 审计前账面值 + 审计调整 </p>
            <div class="price-box">
                <p class="b-title clear">
                    <i class="icon subject"></i>
                    <span class="ver-mid">科目选择</span>
                    <el-checkbox class='checkAllSubject' v-model="checkAllSubject" @change="selectAllSubject">全选</el-checkbox>
                </p>
                <el-scrollbar :style='{height:scrollHeight + 37 + "px"}'>
                    <div class="price-bd  subjectHeight">
                        <el-collapse accordion>
                            <el-collapse-item v-for="(item,keyVal) in sheetData" :key="keyVal">
                                <template slot="title">
                                    <p class="m-title">
                                        <el-checkbox v-model="item.checkedAll" @change="handleCheckAllChange(item.checkedAll,keyVal,item)" v-if="!item.read">{{keyVal}}</el-checkbox>
                                        <span v-else class="un-opened">{{keyVal}}</span>
                                    </p>
                                </template>
                                <div>
                                    <el-checkbox-group v-model="item.checkItemArr" @change="handleCheckedSheetChange(item,keyVal)">
                                        <template v-for="sheet in item.sheetList">
                                            <el-checkbox :label="sheet.name"  v-if="sheet.state=='Y'" >{{sheet.name}}</el-checkbox>
                                            <span v-else class="un-opened">{{sheet.name}}</span><br/>
                                        </template>
                                    </el-checkbox-group>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        <!--<template v-for="(item,keyVal) in sheetData">
                            <div class="sheet-item">
                                <p class="m-title">
                                    <el-checkbox v-model="item.checkedAll" @change="handleCheckAllChange(item.checkedAll,keyVal,item)" v-if="!item.read">{{keyVal}}</el-checkbox>
                                    <span v-else class="un-opened">{{keyVal}}</span>
                                </p>
                                <div class="sheet-bd">
                                    <el-checkbox-group v-model="item.checkItemArr" @change="handleCheckedSheetChange(item,keyVal)">
                                        <template v-for="sheet in item.sheetList">
                                            <el-checkbox :label="sheet.name"  v-if="sheet.state=='Y'" >{{sheet.name}}</el-checkbox>
                                            <span v-else class="un-opened">{{sheet.name}}</span>
                                        </template>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </template>-->
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <center-dialog ref="centerDialog" :dialogWidth='dialogWidth' :dialogHeight="dialogHeight" :dialogTitle="dialogTitle" :titlePosition="titlePosition">
          <div slot="dialogContent">
            <div class="price-dialog clear">
              <div class="price-dialog-left">
                <p class="bar-title">详细说明：快捷作价会替换当前评估值，请谨慎操作~ </p>
                <div class="price-box">
                  <p class="b-title">
                    <i class="icon icon-organization"></i>
                    <span class="ver-mid">机构选择</span>
                  </p>
                  <el-scrollbar style='height:100%;'>
                    <ul class="organization-list">
                      <li v-for="(item, index) in getCheckKeyArr"
                          class="organization-item textOverflow1" :title="item.name">
                        {{item.name}}
                      </li>
                    </ul>
                  </el-scrollbar>
                </div>
              </div>
              <div class="price-dialog-right">
                <p class="bar-title">计算公式：评估值 = 账面值 = 审计前账面值 + 审计调整 </p>
                <div class="price-box">
                  <p class="b-title">
                    <i class="icon subject"></i>
                    <span class="ver-mid">科目选择</span>
                  </p>
                  <el-scrollbar style='height:393px'>
                    <div class="subjectList-wrap">
                      <div v-for="(item, keyVal) in subjectList" v-if="!item.read">
                        <p class="subject-header">{{keyVal}}</p>
                        <ul class="subjectList clear">
                          <li class="subject-item width112 textOverflow1"
                            v-for="(subjectitem, index) in item.checkItemArr"
                            :title="subjectitem"
                            :key="index">{{subjectitem}}</li>
                        </ul>
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="dialog-footer">
              <a class="search-btn" @click="startCalculate">开始计算</a>
              <a class="reset-btn" @click="cancleCalculate">取消</a>
            </div>
          </div>
        </center-dialog>
    </div>
</template>
<script>
import sheetData from "@/page/fullPageModule/quickPrice/sheetData"
import centerDialog from "@/components/centerDialog.vue";
import TreeNode from "@/page/fullPageModule/fullPageTreeNode";
    export default{
        name:'quickPrice',
        components:{
            centerDialog,
            TreeNode
        },
        data() {
            return{
                sheetData:{},
                organizationTree: [], // 树节点的数据
                getCheckKeyArr: [], // 选中的树节点
                investorIds: '', // 快捷作价传的参数——股权机构标识集合
                sheets: '', // 快捷作价传的参数——页签集合
                groupId: '',
                dialogWidth:'800px',
                dialogHeight:'600px',
                dialogTitle:'信息确认',
                titlePosition:'center',
                tips: '注：灰色机构是已签发机构或未进行数据导入机构，无法进行快捷作价',
                checkAllSubject: false,
                dataObj: {}, // 页面操作时存储的数据——{id值：{机构，科目}}
                scrollHeight: window.screen.availHeight - 270,
                subjectList: {}
                /*organizationList: [],
                subjectList: []*/
            }
        },

        created() {
            let _this = this;
            _this.$store.state.onlineOffline = 0; // 用于控制树组件中空隙
            _this.$store.state.tipsFlag = false; // 用于判断快捷作价模块异步计算后的提示信息
//            this.scrollHeight = this.$store.state.cprRightHg - 157 ;
            this.$http.post('api/investors/getInvestorTrees', {
                projectId: _this.$store.state.projectId,
                flag: /examineModification|projectExternalAudit/g.test(_this.$route.path) ? 0 : 1
            }).then(res=> {
                _this.organizationTree = _this.dataLoop(res.data, 1)
            }).catch(err=> {
                _this.$messageError(err);
            })
        },

        mounted() {
            let _this = this;
            _this.sheetData = sheetData;
            // 重置sheetData
            this.resetSheetData();
            this.setFullCheckSheet();
        },
        watch:{
            sheetData:{
                 handler: function(newD, oldD) {
                      this.sheetData = newD;
                      for(let key in this.sheetData) {
                          if(!this.sheetData[key].checkedAll) {
                              this.checkAllSubject = false;
                              return;
                          }else if(key === '非流动负债') {
                              this.checkAllSubject = true;
                          }
                      }
                 },
                 deep: true
            }
        },
        methods:{
            integrationData() {
                var _this = this;
                for(var item in this.sheetData){
                  _this.checkVal(_this.sheetData[item].sheetList,item);
                }
            },

            checkVal(data,item) {
                var arr = [];
                for(var i =0;i<data.length;i++){
                    if(data[i].state=='Y'){
                        arr.push(data[i].name);
                    }
                }
                this.$set(this.sheetData[item],'checkItemArr',arr);
                this.$set(this.sheetData[item],'fullCheckSheet',arr);
            },

            handleCheckAllChange(isCheck,name,item) {
                if(isCheck) {
                    this.checkVal(item.sheetList,name)
                }else {
                    this.$set(this.sheetData[name],'checkItemArr',[]);
                }
            },

            // 设置每个科目的全选，避免一一点击后，全选没有被勾选
            setFullCheckSheet() {
                for(let key in this.sheetData) {
                  let arr = [];
                  this.sheetData[key]['sheetList'].forEach((item, index)=> {
                    if(item.state=='Y'){
                      arr.push(item.name);
                    }
                  })
                  this.$set(this.sheetData[key],'fullCheckSheet',arr);
                }
            },

            handleCheckedSheetChange(item,name) {
                let checkedCount = item.checkItemArr.length;
                if(item.checkItemArr.length==item.fullCheckSheet.length) {
                    if(item.fullCheckSheet.length) {
                      this.$set(this.sheetData[name],'checkedAll',true);
                    }else {
                      this.$set(this.sheetData[name],'checkedAll',false);
                    }
                }else {
                    this.$set(this.sheetData[name],'checkedAll',false);
                }
            },

            //确认
            childMethod() {
                //关闭右侧栏
               // this.$store.commit('changeShowCommon');
               //打开弹窗
                let subjectArr = [];
                this.getCheckKeyArr = [];
                this.subjectList = {};
                this.getCheckKey(this.organizationTree)
                this.getSubjectList(this.sheetData)
                subjectArr = Object.keys(this.subjectList);
                if(this.getCheckKeyArr.length && subjectArr.length) {
                    this.$refs.centerDialog.showDialog();
                }else {
                    this.$messageError('请确认已选择机构与科目！')
                }
            },

            selectAllSubject() {
                for(let key in this.sheetData) {
                    this.sheetData[key].checkedAll = this.checkAllSubject;
                    this.handleCheckAllChange(this.sheetData[key].checkedAll, key, this.sheetData[key])
                }
            },

            // 开始快捷作价
            startCalculate() {
                let _this = this;
                _this.investorIds = '';
                _this.sheets = '';
                _this.groupId = ''
                let groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(',');
                if(groupIdArr[0]==''&&groupIdArr[1]){
                    this.groupId = groupIdArr[1];
                }else{
                    this.groupId = groupIdArr[0];
                }
                for(let i= 0; i< this.getCheckKeyArr.length; i++) {
                    this.investorIds += this.getCheckKeyArr[i].id
                    if(i< this.getCheckKeyArr.length-1) {
                        this.investorIds += ',';
                    }
                }
                for(let key in _this.subjectList) {
                     _this.subjectList[key].checkItemArr.forEach((item, index) => {
                        _this.sheets += item + ','
                     })
                }
                _this.sheets = _this.sheets.substring(0, _this.sheets.length-1);
                this.$http.post('api/xlsUpdateData/quicklyEvaluate', {
                    projectId: _this.$store.state.projectId,
                    investorIds: _this.investorIds,
                    groupId: _this.groupId,
                    sheets: _this.sheets
                }).then(res=> {
                  _this.$refs.centerDialog.closeDialog();
                  _this.$store.commit('changeShowCommon');
                  this.$store.state.getUploadStatu();
                  _this.$store.state.tipsFlag = true;
                  this.$store.state.intervalFn();
                }).catch(err=> {
                    this.$messageError(err);
                })
            },

            // 取消快捷作价
            cancleCalculate() {
                this.$refs.centerDialog.closeDialog();
            },

            // 处理树节点缩进
            dataLoop(Arr, level, defaultArr) {
                for(let i in Arr){
                    Arr[i]['level'] = level;
                    if(Arr[i].children && Arr[i].children.length){
                        this.dataLoop(Arr[i].children, level+1, defaultArr);
                    }
                }
                return Arr;
            },

            // 循环获取选中的树节点
            getCheckKey(data){
                for(let i in data){
                    if(data[i].checked){
                        this.getCheckKeyArr.push(data[i]);
                    }
                    data[i].children && this.getCheckKey(data[i].children);
                }
            },

            // 重置sheetData
            resetSheetData() {
                for(let key in this.sheetData) {
                    this.$set(this.sheetData[key], 'checkedAll', false)
                    this.$set(this.sheetData[key], 'checkItemArr', [])
                    this.$set(this.sheetData[key], 'fullCheckSheet', [])
                }
            },

            // 获取确认页面的科目列表
            getSubjectList(sheetData) {
                for(let key in sheetData) {
                    if(sheetData[key].checkItemArr.length){
                        this.subjectList[key] = sheetData[key]
                    }
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
*{box-sizing: border-box;}
.ver-mid{vertical-align: middle;}
.c-orange{color:#F09237;}
.quick-price-cont{font-size:13px;
    .wrap-left{float:left;width:400px;}
    .wrap-right{float:right;width:345px;}
    .bar-title{border:1px solid #FFC68F;background:#FFF2E5;color:#F09237;height:25px;line-height:25px;padding-left:17px;margin-bottom:10px;}
    .price-box{border:1px solid #ECECEC;color:#262628;
        .b-title{border-bottom:1px solid #ECECEC;height:35px;line-height:35px;color:#262628;font-weight:bold;padding-left:17px;margin-bottom:10px;background-color:rgba(250,250,250,1) }
        .icon{width:15px;height:15px;display:inline-block;vertical-align: middle;}
        .m-title{background:#FFF;  height:30px; line-height: 30px; padding-left: 15px;
          box-sizing: border-box;
          /deep/ .el-checkbox__label{color: #262628; font-weight: 600;}
        }
        .checkAllSubject{float: right; margin-right: 10px; text-align: right;}
        .icon-organization{background: url("../../../../static/img/organization.png") no-repeat}
        .subject{background: url("../../../../static/img/subject.png") no-repeat}
    }
    /*.heightLimit {height: 385px;}*/
    /*.subjectHeight{height: 421px;}*/
    .price-bd{padding: 10px;font-size:13px;
      .un-opened{display: inline-block;width: 167px;color:#A1A1A1;font-size: 13px;margin-bottom:4px; margin-left: 24px;}
    }
    .sheet-item{
        .m-title{height: 35px;line-height: 35px;background: #F6FAFF;padding-left:20px;}
        .un-opened{display: inline-block;width: 167px;color:#A1A1A1;font-size: 13px;margin-bottom:4px}
    }
    .sheet-bd{margin:11px 0 11px 20px;}
    .footer{color: #F29C4A; text-align: center; margin-bottom: 10px; padding: 5px;}
    /deep/ .el-collapse{
      border: 1px solid #E5E5E5;
      .el-collapse-item__header{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #E5E5E5;
        color: #262628;
        font-weight: bold;
        .el-collapse-item__arrow{
          line-height: 30px;
          margin-right: 10px;
        }
        .el-icon-arrow-right::before{
          content: "\E60E";
        }
      }
      .el-collapse-item__content{
        padding: 10px 15px;
      }
    }
}
.price-dialog{
    .price-dialog-left{float: left;width:340px;
      .organization-list{height: 410px;}
    }
    .price-dialog-right{float:right;width:410px;
      .subjectList-wrap{padding: 0 15px; /*height: 410px;*/ &>div{margin-bottom: 5px;}}
      /*.price-box{height: 440px;}*/
    }
    .subject-header{height: 35px; line-height: 35px; background:rgba(246,250,255,1); padding: 0 15px; margin-bottom: 1px;}
    .subjectList{padding: 10px 0; background:rgba(251,250,250,1)}
    .subject-item{float: left; color: #262628; font-size: 13px; padding: 5px 15px; margin-right: 21px;}
    .subject-item:nth-child(3n) {margin-right: 0;}
    .organization-list{padding: 15px 10px; padding-top: 0;
      .organization-item{padding: 3px 10px;
        &:hover{background:rgba(251,250,250,1);}
      }
    }
}
.dialog-footer{margin-top: 10px; text-align: center;}
/*/deep/.el-checkbox+.el-checkbox{margin-left:0;margin-bottom:4px}*/
/deep/.el-checkbox{margin-right: 10px}
/deep/.el-checkbox-label{font-size: 12px;}
/deep/ .el-scrollbar__wrap{overflow-x: hidden;}

</style>
