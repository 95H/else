<template>
  <div class="projectExternalAudit">
    <!-- 最新外审修改 begin -->
    <div class="projectInfo_Overview">
        <div class="projectInfo_OverviewTit">
            <div>
              <p class="fl" v-if="showAuditTitle"><i class="iconfont icon-xiangmugaikuang marginRight10"></i>最新外审修改</p>
              <p class="fl" v-else><i class="iconfont icon-xiangmugaikuang marginRight10"></i>最新外审修改审核申请</p>
            </div>
            <div class="project_lookInfo" v-if = 'isNewModifData != "" && this.$store.state.controlBtn == 0' @click="lookInfo()">查看详情</div>
            <div class="addTaskBtn">
              <!-- <button class="search-btn addExternalAudit" v-if='addAuditBtn'  @click="addExternalAudit()">+ 添加共审人</button> --> <!--  -->
              <button class="search-btn addExternalAudit" v-if='this.$store.state.controlBtn == 2' @click="revokeListData()">外审修改撤回</button>
              <button class="search-btn externalAuditBtn" v-if='this.$store.state.controlBtn == 1'  @click="modifyExternal(2)">外审修改送审</button>
              <button class="search-btn" v-if='this.$store.state.controlBtn == 3'  @click="externalAuditBtn()">审核</button>
            </div>
        </div> <!-- v-if='projectInfoAllData.length' -->
        <div class="ExternalAudit_box clearfix" v-if = 'newModifList != ""'>
            <div class="ExternalAudit_radiu clearfix">
              <div class="ExternalAudit_box_sult clearfix">
                <i class="iconfont" :class="newClassName"></i>
              </div>
              <div class="ExternalAudit_box_cont clearfix">
                <div>
                  <p class="fl">
                    <label>项目名称：</label>
                    <span>
                      {{ newModifList.projectName }}
                    </span>
                  </p>
                  <p class="fl">
                    <label>申请时间：</label>
                    <span>
                      {{ newModifList.createTime }}
                    </span>
                  </p>
                </div>
                <div class="clearfix">
                  <p class="fl">
                    <label>项目负责人：</label>
                    <span>
                      {{ newModifList.userName }}
                    </span>
                  </p>
                  <p class="fl">
                    <label>其他负责人：</label>
                    <span>
                      {{ this.newModifData.newDynamicData.newDataMap.otherLeaderName }}
                    </span>
                  </p>
                </div>
                <div class="clearfix">
                    <p class="fl">
                      <label>申请理由：</label>
                      <span>{{ newModifList.content }}</span>
                    </p>
                  <p class="fl">
                    <label>审核人：</label>
                    <span>
                      {{ this.newModifData.newDynamicData.newDataMap.examineName }}
                    </span>
                  </p>
                </div>

              </div>
              <div class="ExternalAudit_box_file">
                  <p>
                    <label>审核附件：</label>
                    <span v-for="(item, index) in newfilename" :key="index" @click="downloadFile(item)">
                      {{ item.fileName }}
                    </span>
                  </p>
              </div>
            </div>
        </div>
        <div class="noData" v-else>暂无数据</div>
    </div>
    <!-- 最新外审修改 end -->


    <!-- 外审修改记录 begin -->
    <div class="projectAudits">
      <div class="top">
          <span v-if="showAuditTitle"><i class="iconfont icon-xiangmudongtai- green marginRight10"></i>外审修改记录</span>
          <span v-else><i class="iconfont icon-xiangmudongtai- green marginRight10"></i>外审修改审核申请记录</span>
      </div>
      <div class="content">
        <el-steps direction="vertical" :active="0" v-if = 'newModifLogging.length>0'>
          <div class= "projectCondition marginTop15" v-for="(item,index) in this.newModifData.dynamicData" :key="index">
            <el-step :title="`时间：${item.createTime}`" icon= "el-icon-time"></el-step>
            <div class="condition-info">
              <div class="person-icon">
                <i class="iconfont" :class="className[item.applyStatus-1]"></i>
              </div>
              <div class="person-operate">
                <p>
                  <b>项目负责人：</b> {{ item.userName }} <a class="reset-btn" @click="lookInfo(item)">查看详情>></a>
                  <b class="fr">{{ item.projectName }}</b>
                </p>
                <p>申请理由：<b>{{ item.content }}</b></p>
              </div>
            </div>
          </div>
        </el-steps>
        <div class="noData" v-else>暂无数据</div>
      </div>
    </div>
     <!-- 外审修改记录 end -->

    <!-- 添加共审人 begin -->
    <center-dialog ref="centerDialog" dialogWidth="320px" dialogHeight="260px" titlePosition="left" dialogTitle="选择共审人">
      <div slot="dialogContent" class="dialogContent">
        <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
          <el-checkbox :disabled="isAbled" v-for="(item, index) in equipments" :label="item.checked" :key="index" v-if='index==1|| index==2'> <!--  v-if='item.taskDefKey=="usertask2" || item.taskDefKey=="usertask3"' -->
            {{item.taskDefKey + ' &nbsp;&nbsp; ' + item.userNames}}
          </el-checkbox>
        </el-checkbox-group>
        <div class="del_content">确认以上人员参与本次报告外审修改审核？</div>
        <div class="text-center" :disabled="isAbled">
            <a class="search-btn" @click="externalAuditSure">确定</a>
            <a class="reset-btn" @click="closeDialog()">取消</a>
        </div>
      </div>
    </center-dialog>
     <!-- 添加共审人 end -->
  </div>
</template>
<script>
import centerDialog from "../../../components/centerDialog";
export default {
    data() {
      return {
        className: ['icon-yitongguo','icon-yijujue','icon-yichehui'],
        newClassName: '',
        showInfo: this.$store.state.showInfo || false,
        showaddAudit: this.$store.state.showaddAudit || false,
        showAuditTitle: this.$store.state.showAuditTitle || false,
        projectInfoAllData: [],
        commonData: window.commonData,
        processStateId:'',
        newProcessStateId: '',
        revokeBtn: '',   //判断是否显示外审修改撤回
        revokeBtnTitle: '',   //头部判断是否显示外审修改撤回
        newfilename: [],         //最新附件
        isAbled: false,  //禁用
        checked: [],  //默认选中
        hackReset: true,    //销毁组件
        newModifData: {
          newDynamicData: {},
        },
        isNewModifData: '',    //判断详情
        newModifLogging: [],  //外审修改记录
        jointTrialId: '',
        jointTrialDataId: '',   //给后台传的共审人去除最后一个,的值
        equipments: [],  //共审人列表数据
        checkedData: [],  //所以选中的数据
        checkUserId: '',  //给后台传的选中的人员id
        checkAuditType: '',  //给后台传的选中的auditType
        newProcInstId: '',     //点击详情的时候传的参数
        newModifList: '',
        addAuditBtn: this.$store.state.isUserShow || false      //添加共审人按钮是否显示
      }
    },
    components: {
      centerDialog
    },
    watch: {
      "$store.state.auditData"() {
        this.newModifInfo();
        setTimeout(() => {
          this.$store.state.auditData = true;   //刷新外审数据
        },100);

      },
      /*"$store.state.auditTree"() {
        this.newModifInfo();
      },*/
    },
    created(){
      var _this=this;
      //获取页面初始数据
      //console.log(_this.$store.state.controlBtn);
      // this.$store.state.auditLogging = function() {
        _this.newModifInfo();
      // }
    },
    methods: {
      //审核按钮
      externalAuditBtn(val) {
        //console.log(val);
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '外审修改审核';
       /* if(this.$store.state.addAuditBtn == true){
          this.$store.state.commonBtn = '添加共审人';
        }else{
          this.$store.state.commonBtn = '';
        }*/
        this.$store.state.componentsType = 'projectExternalAuditMent';
        this.$store.state.dataObj = this.newModifList;
        //this.$store.state.dataObj = this.newProcInstId;
      },
      //送审按钮
      modifyExternal(val) {
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '外审修改申请';
        this.$store.state.commonBtn = '确认提交';
        this.$store.state.componentsType = 'projectModifyExternal';
        this.$store.state.dataObj = val;
      },
      //添加共审人
      addExternalAudit() {
        this.$refs.centerDialog.showDialog();
        this.externalAuditList();   //共审人列表接口
      },
      handleCheckedCitiesChange(value) {
        this.checkUserId = '';
        this.checkAuditType = '';
        this.checkedData = [];
        value.forEach((item) => {
          //console.log(item);
          this.checkUserId = item.userIds;
          this.checkAuditType = item.taskDefKey;
          this.checkedData.push({
            userIds: this.checkUserId,
            taskDefKey: this.checkAuditType
          })
        })
      },
      // 添加共审人取消--关闭弹窗
      closeDialog() {
        this.$refs.centerDialog.closeDialog();
        this.checked = [];
      },
      externalAuditList() {   //共审人列表接口
        var _this = this;
        _this.$http.post('/api/changeInvestors/findCoTrialPerson',{
          investorId: _this.$store.state.investorId
        }).then(function (data) {
          _this.equipments = data.data;
          _this.equipments.forEach((value, index) => {
            if(value.taskDefKey == "usertask3"){
              value.taskDefKey = "复审人";
            }
            if(value.taskDefKey == "usertask2"){
              value.taskDefKey = "初审人";
            }
            //判断接口是否有选中，如果有选中禁用
            if(value.checked == true){
              _this.isAbled = false;
            }
          });
          //console.log(_this.equipments);
        }).catch(function (error) {
          _this.$messageError(error);
        });
      },
      //添加共审人确认接口
      externalAuditSure() {
        var _this = this;
        if(_this.checked.length == 0){
          this.$messageError('请选择共审人！');
          return false;
        }else{
          let dataJson = {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            taskId: _this.$store.state.taskId,
            distributionJson: JSON.stringify(_this.checkedData)
          }
          _this.$http.post('/api/changeInvestors/saveCoTrialPerson',dataJson)
          .then(function (data) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: '共审人添加成功!'
            });
            setTimeout(() => {
              _this.$refs.centerDialog.closeDialog();
            }, 2000);

            _this.externalAuditList();   //刷新共审人列表
            //this.checked = true;
            //this.isAbled = false;
          }).catch(function (error) {
            _this.$messageError(error);
          });
        }
      },
      //线上送审接口
      revokeListData() {
        var _this = this;
        _this.$confirm('确认撤回外审修改申请？', '提示信息', {
          confirmButtonText: '确定撤回',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.revokeList();
        }).catch(() => {
          /*this.$message({
            type: 'info',
            message: '已取消操作'
          }); */
        });
      },
      revokeList() {
        var _this = this;
        _this.$http.post('/api/changeInvestors/revokeChangeInvestors',{
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId
        })
        .then(function (data) {
          //console.log(data.data);
          _this.$store.state.controlBtn = 1;
          _this.$store.state.auditTree = !_this.$store.state.auditTree;   //刷新左侧树
          _this.$store.state.auditData = !_this.$store.state.auditData;   //刷新外审数据
          _this.$message({
            showClose: true,
            type: 'success',
            message: '项目撤回成功!'
          });
        }).catch(function (error) {
          _this.$messageError(error);
        });
      },
      newModifInfo() {   //外审修改信息接口
        var _this = this;
        //console.log('请求成功!');
        _this.$http.post('/api/changeInvestors/findUpdateDataList',{
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId
        }).then(function (data) {
          if(data.data){
            // _this.$set(_this,"newModifData",data.data);
            // _this.$set(_this,"newfilename",data.data.newDynamicData.projectdocsFile);
            // _this.$set(_this,"newModifLogging",data.data.dynamicData);
            // _this.$set(_this,"newModifList",data.data.newDynamicData.newDataMap);
            // _this.$set(_this,"newProcessStateId",data.data.newDynamicData.newDataMap.remarkState);
            // _this.$set(_this,"newProcInstId",data.data.newDynamicData.newDataMap.procInstId);
            _this.isNewModifData = data;
            _this.newModifData = data.data;
            _this.newfilename = _this.newModifData.newDynamicData.projectdocsFile || [];
            _this.newModifLogging = _this.newModifData.dynamicData;
            _this.newModifList = _this.newModifData.newDynamicData.newDataMap;
            _this.newProcessStateId = _this.newModifData.newDynamicData.newDataMap.remarkState || {};
            _this.newProcInstId = _this.newModifData.newDynamicData.newDataMap.procInstId;
            _this.revokeBtnTitle = _this.newModifList.isWithdraw;
            // _this.adoptData(_this.processStateId);
            _this.newAdoptData(_this.newProcessStateId);
          }else{
            //console.log(9999);
            _this.newfilename = [];
            _this.newModifLogging = [];
            _this.newModifList = '';
            _this.newProcessStateId = '';
            _this.newProcInstId = '';
            _this.revokeBtnTitle = '';
            _this.isNewModifData = '';
          }
        }).catch(function (error) {
            _this.$messageError(error);
        });
      },
      adoptData(item) {  //返回通过结果
        //console.log(item);
        var _this = this;
        //debugger
        switch(item) {
          case 1:
            _this.className = 'icon-yitongguo';
            break;
          case 2:
            _this.className = 'icon-yijujue';
            break;
          case 3:
            _this.className = 'icon-yichehui';
            break;
        }
      },
      newAdoptData(item) {  //返回通过结果
        //console.log(item);
        var _this = this;
        switch(item) {
          case "1354":
            _this.newClassName = 'icon-yichehui';
            break;
          case "1355":
            _this.newClassName = 'icon-chushentongguo';
            break;
          case "1356":
            _this.newClassName = 'icon-chushenjujue';
            break;
          case "1357":
              _this.newClassName = 'icon-fushentongguo';
              break;
          case "1358":
            _this.newClassName = 'icon-yijujue1';
            break;
          case "1359":
            _this.newClassName = 'icon-daishenhe';
            break;
          case "1360":
            _this.newClassName = 'icon-sanshentongguo';
            break;
          case "1361":
            _this.newClassName = 'icon-yijujue2';
            break;
        }
      },
      //查看详情
      lookInfo(item) {
        //console.log(item);
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '外审修改审核详情';
        /*if(!item){
          if(this.revokeBtnTitle == 0){
            this.$store.state.commonBtn = '';
          }else{
            this.$store.state.commonBtn = '外审修改撤回';
          }
        }else {
          //debugger
          this.revokeBtn = item.isWithdraw;
          if(this.revokeBtn == 0){
            this.$store.state.commonBtn = '';
          }else{
            this.$store.state.commonBtn = '外审修改撤回';
          }
        }*/
        this.$store.state.componentsType = 'projectExternalAuditInfo';
        if(!item){
          this.$store.state.dataObj = this.newModifList;
          this.$store.state.commonBtn = '查看共审人';
        }else{
          this.$store.state.dataObj = item;
        }
      },
      // 下载某个文件
      downloadFile(item) {
        window.location.href =
          "/api/file/downloadFile?token=" +
          this.$getCookie("token") +
          "&docsName=" +
          this.$filename(item.fileName) +
          "&flag=2&alyPath=" +
          item.filePath;
      }

    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
// 外审修改审核
.projectInfo_Overview {
  height: auto;
  margin-top: 10px;
  background:rgba(255,255,255,1);
  border-radius:2px;
  border:1px solid rgba(236,236,236,1);
  .projectInfo_OverviewTit {
    background: rgba(246,250,255,1);
    height:35px;
    line-height: 35px;
    border-radius:2px 2px 0px 0px;
    border-bottom:1px solid rgba(236,236,236,1);
    padding: 0 10px 0 20px;
    position: relative;
    >div{
      p {
        font-size:13px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(38,38,40,1);
        i {
            color: #98C268;
        }
      }
    }
  }
  .ExternalAudit_box {
    padding: 11px;
    .ExternalAudit_radiu{
      background: #F1F8E8;
      border-radius: 3px;
      padding: 15px 70px;
      position: relative;
    }
    .ExternalAudit_box_sult{
      display: inline;
      position: absolute;
      top: 44.7%;
      right: 3.5%;
      transform: translate(-50%,-50%);
      i{
        font-size: 70px;
        color: #B1B1B1;
      }
      .icon-yitongguo , .icon-sanshentongguo , .icon-fushentongguo , .icon-chushentongguo{
        color: #11BF6B;
      }
    }
    .ExternalAudit_box_cont {
      p {
        width: 50%;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        overflow: hidden;
        padding-bottom: 9px;
        color: #262628;
        label{
          float: left;
        }
        span {
          float: left;
          width: 70%;
        }
      }
    }
    .ExternalAudit_box_file {
      p {
        width: 100%;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        overflow: hidden;
        padding-bottom: 9px;
        color: #262628;
        label{
          float: left;
        }
        span {
          float: left;
          margin-right: 30px;
          cursor: pointer;
          color: #50ADEE
        }
      }
    }

  }

}

.projectAudits {
  background: rgba(255, 255, 255, 1);
  .top {
    height: 35px;
    background: #f6faff;
    border-radius: 2px 2px 0px 0px;
    border: 1px solid rgba(236, 236, 236, 1);
    line-height: 35px;
    font-size: 13px;
    margin-top: 10px;
    span{
      padding-left: 23px;
    }
  }
  .content {
    overflow: hidden;
    border: 1px solid rgba(236, 236, 236, 1);
    border-top: 0;
    padding: 11px;
    /deep/ .projectCondition {
      &:last-child .condition-info{ margin-bottom:0;}
      /deep/ .el-step__title {
        font-size: 12px;
        color: #575757;
      }
      /deep/ .el-step__head {
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 1px;
          height: 10px;
          background-color: #e1e1e1;
          position: absolute;
          top: -15px;
          left: 9px;
        }
        &::after {
          content: "";
          display: inline-block;
          width: 1px;
          height:15px;
          background-color: #e1e1e1;
          position: absolute;
          top: 25px;
          left: 9px;
        }
      }
      /deep/ .el-step__icon {
        width: 20px !important;
        height: 20px;
        background-color: #50adee;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        .el-icon-time {
          font-size: 12px;
          color: white;
        }
      }
      /deep/ .el-step__line {
        left: 9px;
        height: 20px;
      }
      .condition-info {
        position: relative;
        margin: 20px 0 10px 0;
        display: flex;
        background-color: #f9f9f9;
        padding: 13px 24px;
        align-items: flex-start;
        .person-icon {
          i{
            font-size: 50px;
            color: #11BF6B;
            margin-left: 25px;
          }
          .icon-yitongguo , .icon-sanshentongguo , .icon-fushentongguo , .icon-chushentongguo{
            font-size: 50px;
            color: #11BF6B;
          }
          .icon-yijujue {
            color: #F86F45;
            font-size: 50px;
          }
          .icon-yichehui {
            color: #B1B1B1;
            font-size: 50px;
          }
        }
        .person-operate{
          margin-left: 40px;
          font-size: 12px;
          color: #6a6a6a;
          width: 100%;
          p{
            color: #1d1c1e;
            margin-top: 8px;
            a{
              height: 20px;
              line-height: 18px;
              font-size: 12px;
              margin-left: 10px;
              width: 80px;
            }
            b.fr{
              position: relative;
              max-width: 300px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              text-indent: 10px;
              font-weight: bold;
            }
            b.fr:before{
              position: absolute;
              content: '';
              display: block;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              left: 0;
              top: 4px;
              background-color: #F09237;
            }
          }
          p:first-child{
            margin-top: 3px;
          }
        }
        .project-company {
          position: absolute;
          right: 24px;
          margin-top: 5px;
          font-size: 13px;
          color: #262628;
          &::before {
            content: "";
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: #f09237;
            border-radius: 2px;
            position: absolute;
            top: 6px;
            left: -15px;
          }
        }
      }
    }
  }
  .icon-shenhejieguo {
    color: #98C268;
    margin-left: 20px;
    margin-right: 10px;
  }
  .icon-yitongguo {
    font-size: 50px;
    color: #11BF6B;
  }
  .icon-yijujue {
    color: #F86F45;
    font-size: 50px;
  }
}

/deep/ .el-form-item {
  margin-bottom: 7px;
}

/deep/ .noData{
  padding-left: 47%;
  text-align: left;
}
/deep/.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0
}
/deep/.clearfix {
  *zoom: 1
}

/deep/ .addTaskBtn {
  position: absolute;
  top: -2px;
  right: 18px;
}
/deep/ .project_lookInfo{
  position: absolute;
  top: -2px;
  right: 20px;
  color: #3A80EC;
  font-size: 12px;
  cursor: pointer;
}
/deep/ .addExternalAudit {
  width: 95px !important;
}
/deep/ .externalAuditBtn {
  background: #3A80EC;
  width: 100px;
}

.dialogContent{
  .del_content{
    font-size: 13px;
    padding-bottom: 20px;
    padding-top: 25px;
    text-align: center;
  }
  .el-checkbox-group{
    text-align: center;
    padding-top: 15px;
    label{
      display: block !important;
      margin-bottom: 10px;
    }
    .el-checkbox+.el-checkbox{
      margin-left: -11px;
    }
  }
}


</style>
