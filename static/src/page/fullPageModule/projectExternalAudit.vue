<template>
  <div class="projectExternalAudit">
    <!-- 最新外审修改 begin -->
    <div class="projectInfo_Overview">
        <div class="projectInfo_OverviewTit">
            <p class="fl"><i class="iconfont icon-xiangmugaikuang marginRight10"></i>最新外审修改</p>
            <div class="addTaskBtn">
              <button class="search-btn addExternalAudit"  @click="addExternalAudit()">+ 添加共审人</button>
              <button class="search-btn externalAuditBtn"  @click="externalAuditBtn()">审核</button>
            </div>
        </div> <!-- v-if='projectInfoAllData.length' -->
        <div class="ExternalAudit_box clearfix">
            <div class="ExternalAudit_radiu clearfix">
              <div class="ExternalAudit_box_sult clearfix">
                <i class="iconfont icon-yitongguo"></i>
              </div>
              <div class="ExternalAudit_box_cont clearfix">
                <div>
                  <p class="fl">
                    <label>项目名称：</label>
                    <span>
                      一汽集团矿产收购项目
                    </span>
                  </p>
                  <p class="fl">
                    <label>申请时间：</label>
                    <span>
                      2018-12-14 17:29:34 
                    </span>
                  </p>
                </div>
                <div class="clearfix">
                    <p class="fl">
                      <label>项目负责人：</label>
                      <span>滑思衡</span>    
                    </p>
                    <p class="fl">
                      <label>共审人：</label>
                      <span>
                        --
                      </span>
                    </p>
                </div>
                <div class="clearfix">
                    <p class="fl">
                      <label>申请理由：</label>
                      <span>详见附件</span>
                    </p>
                </div>
                <div class="clearfix">
                    <p class="fl">
                      <label>审核附件：</label>
                      <span>一汽集团矿产项目.doc</span>
                    </p>
                </div>
              </div>
            </div>
        </div>
        <!-- <div class="noData" v-else>暂无数据</div> -->
    </div>
    <!-- 最新外审修改 end -->


    <!-- 外审修改记录 begin -->
    <div class="projectAudits">
      <div class="top">
          <span><i class="iconfont icon-xiangmudongtai- green marginRight10"></i>外审修改记录</span>
      </div>
      <div class="content">
        <el-steps direction="vertical" :active="0">
          <div class= "projectCondition marginTop15">
            <el-step :title="`时间：2018-05-14 11:13:34`" icon= "el-icon-time"></el-step>
            <div class="condition-info">
              <div class="person-icon">
                <i class="iconfont icon-yitongguo"></i>
              </div>
              <div class="person-operate">
                <p>
                  <b>项目负责人：</b> 滑思衡 <a class="reset-btn" @click="lookInfo()">查看详情>></a>
                  <b class="fr">一汽集团矿产项目</b>
                </p>
                <p>共审人：<b>李明远</b></p>
                <p>申请理由：<b>详见附件</b></p>
              </div>
            </div>
          </div>
          <div class= "projectCondition marginTop15">
            <el-step :title="`时间：2018-05-14 11:13:34`" icon= "el-icon-time"></el-step>
            <div class="condition-info">
              <div class="person-icon">
                <i class="iconfont icon-yitongguo"></i>
              </div>
              <div class="person-operate">
                <p>
                  <b>项目负责人：</b> 滑思衡 <a class="reset-btn" @click="lookInfo()">查看详情>></a>
                  <b class="fr">一汽集团矿产项目</b>
                </p>
                <p>共审人：<b>李明远</b></p>
                <p>申请理由：<b>详见附件</b></p>
              </div>
            </div>
          </div>
        </el-steps>
        <div class="noData">暂无项目动态信息</div>
      </div>
    </div>
     <!-- 外审修改记录 end -->

    <!-- 添加共审人 begin -->
    <center-dialog ref="centerDialog" dialogWidth="320px" dialogHeight="210px" titlePosition="left" dialogTitle="选择共审人">
      <div slot="dialogContent" class="dialogContent">
        <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">
            {{city}}
          </el-checkbox>
        </el-checkbox-group>
        <div class="del_content">确认以上人员参与本次报告外审修改审核？</div>
        <div class="text-center">
            <a class="search-btn" @click="externalAuditSure">确定</a>
            <a class="reset-btn" @click="closeDialog()">取消</a>
        </div>
      </div>
    </center-dialog>
     <!-- 添加共审人 end -->
  </div>
</template>
<script>
import centerDialog from "../../components/centerDialog";
const cityOptions = ['初审人 滑思衡', '复审人 沈东东'];
export default {
    data() {
      return {
        className: '',
        projectInfoAllData: [],
        commonData: window.commonData,
        processStateId:'',
        auditLevel: '',
        checkedCities1: [],
        cities: cityOptions
      }
    },
    components: {
      centerDialog
    },
    created(){
      var _this=this;
      //_this.junctionInfo();
      /*setTimeout(() => {
        _this.passData();
      }, 2000);  */
    },
    methods: {
      junctionInfo() {   //项目中的列表接口
      	var _this = this;
        _this.$http.post('/api/projectfinishaudit/findReviewPageList',{
            shortName: '',
            projectUserName: '',
            createStartTime: '',
            createEndTime: '',
            groupId: '',
            year: '',
            auditStatus: 'ALL',
            page: 1,
            pagesize: 10,
            projectId: this.$store.state.projectId
        }).then(function (data) {
            //console.log(data.data);
            if(data.data.length){
                _this.projectInfoAllData = data.data;
                _this.$store.state.examTaskId = _this.projectInfoAllData[0].examTaskId;
                _this.processStateId = _this.projectInfoAllData[0].processStateId;
                _this.auditLevel = window.commonData.processStateId[_this.processStateId];
                _this.adoptData(_this.processStateId);
            }

        }).catch(function (error) {
            _this.$messageError(error);
        });
      },
      adoptData(item) {  //返回通过结果
        var _this = this;
        switch(item) {
          case 1069:
              _this.className = 'icon-yitongguo';
              break;
          case 1067:
              _this.className = 'icon-yitongguo';
              break;
          case 1068:
              _this.className = 'icon-yijujue';
              break;
          case 1070:
              _this.className = 'icon-yijujue';
              break;
          case 1078:
              //debugger
              _this.className = 'icon-yitongguo';
              break;
          case 1080:
              _this.className = 'icon-yitongguo';
              break;
          case 1079:
              _this.className = 'icon-yijujue';
              break;
          case 1081:
              _this.className = 'icon-yijujue';
              break;
        }

      },
      //查看详情
      lookInfo() {
        /*this.$store.state.projectId = row.projectId;*/
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '外审修改审核详情';
        this.$store.state.commonBtn = '';
        this.$store.state.componentsType = 'projectExternalAuditInfo';
      },
      //审核按钮
      externalAuditBtn() {
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '外审修改审核';
        this.$store.state.commonBtn = '添加共审人';
        this.$store.state.componentsType = 'projectExternalAuditMent';
      },
      //添加共审人
      addExternalAudit() {
        this.$refs.centerDialog.showDialog();
      },
      // 添加共审人确认
      externalAuditSure() {
        //添加共审人确认接口
        this.$http
          .post("/api/reportOpinionReply/updateReportOpinionReply", {
            id: this.deleteOpinionId,
            tabFlag: "DEL"
          })
          .then(response => {
            //this.renderRightOpinion();
          })
          .catch(error => {
            this.$messageError(error);
          });
      },
      // 添加共审人取消--关闭弹窗
      closeDialog() {
        this.$refs.centerDialog.closeDialog();
      },
      handleCheckedCitiesChange(value) {
        console.log(value);
        /*let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;*/
      },
      submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交结项审核？', '提示信息', {
              confirmButtonText: '确定提交',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
                _this.sealConfir();
              }).catch(() => {
                /*this.$message({
                  type: 'info',
                  message: '已取消操作'
                });*/
            });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

      sealConfir() {
        var _this = this;
        this.$http.post("/api/projectfinishaudit/examineProject",{
            //审批项目ID
            pfaId: this.projectInfoAllData[0].pfaId,
            //任务Id
            examTaskId: this.$store.state.examTaskId,
            //申请人Id
            applyUserId: this.projectInfoAllData[0].userId,
            //审批状态
            auditStatus: this.ruleForm.auditStatus,
            //审核意见
            comments: this.ruleForm.remarks,
            //项目Id
            projectId: this.$store.state.projectId,              
        }).then(function(res){
            _this.$message({
                showClose: true,
                type: 'success',
                message: '结项审核提交成功!'
            });
            _this.junctionInfo();
        }).catch(function (error) {
            _this.$messageError(error);
        });
      },

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
    >p:first-child {
      font-size:13px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(38,38,40,1);
      i {
          color: #98C268;
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
        color: #11bf6b;
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
    color: #F76D43;
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
/deep/ .addExternalAudit {
  width: 95px !important;
  background: #fff;
  border-color: #3A80EC;
  color: #3A80EC;
}
/deep/ .externalAuditBtn {
  background: #3A80EC;  
}

.dialogContent{
  .del_content{
    font-size: 13px;
    padding-bottom: 20px;
    padding-top: 3px;
    text-align: center;
  }
  .el-checkbox-group{
    text-align: center;
    label{
      display: block !important;
      margin-bottom: 10px;
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0;
    }
  }
}


</style>
