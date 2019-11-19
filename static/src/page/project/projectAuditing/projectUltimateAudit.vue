<template>
  <div class="projectUltimateAudit">
    <!-- 项目信息 -->
    <div class="projectInfo_Overview">
        <div class="projectInfo_OverviewTit">
            <p class="fl"><i class="iconfont icon-xiangmugaikuang marginRight10"></i>项目信息</p>
        </div>
        <div class="projectInfo_OverviewCont" v-if='projectInfoAllData.length'>
            <div>
                <p class="fl">
                  <label>项目名称：</label>
                	<span>
                		{{projectInfoAllData[0].projectName}}
                	</span>
                </p>
                <p class="fl">
                  <label>评估基准日：</label>
                	<span>
                		{{projectInfoAllData[0].assessmentBaseDate}}
                	</span>
                </p>
            </div>
            <div>
                <p class="fl">
                  <label>来源途径：</label>
                	<span>
                		{{commonData.projectSourceId[projectInfoAllData[0].SourceFromId]}}
                	</span>
                </p>
                <p class="fl">
                  <label>项目级别：</label>
                	<span>
                    {{commonData.projectLevelId[projectInfoAllData[0].projectLevelId]}}
                		<!--{{commonData.projectSourceId[projectInfoAllData[0].projectLevelId]}}-->
                	</span>
                </p>
            </div>
            <div>
                <p class="fl">
                  <label>评估对象：</label>
                	<span>
                		{{projectInfoAllData[0].assessmentTarget}}
                	</span>
                </p>
                <p class="fl">
                  <label>评估报告类型：</label>
                	<span>
                		{{commonData.assetReportTypeId[projectInfoAllData[0].issueAssetsReport]}}
                	</span>
                </p>
            </div>
            <div>
                <p class="fl">
                  <label>项目性质：</label>
                	<span>
                		{{commonData.projectNatureId[projectInfoAllData[0].projectNatureId]}}
                	</span>
                </p>
                <p class="fl">
                  <label>资产总额：</label>
                	<span class="assetsAccount">
                		{{projectInfoAllData[0].totalAssets ? projectInfoAllData[0].totalAssets : 0}}
                	</span>
                </p>
            </div>
            <div>
                <p class="fl">
                  <label>最新提交结项时间：</label>
                	<span>
                		{{projectInfoAllData[0].createTime}}
                	</span>
                </p>
            </div>
        </div>
        <div class="noData" v-else>暂无数据</div>
    </div>

    <!-- 审核信息 -->

    <div class="optionalmsg" v-if='show'>
        <div class="top">
            <p class="fl"><i class="iconfont icon-xiangmugaikuang marginRight10"></i>项目信息</p>
        </div>
        <div class="auditing-info">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="审核结果：" prop="auditStatus">
                <el-radio-group v-model="ruleForm.auditStatus">
                  <el-radio :label="ruleForm.agree">通过</el-radio>
                  <el-radio :label="ruleForm.disagree">不通过</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="审核意见：" prop="remarks">
                <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入审核意见"></el-input>
              </el-form-item>
              <el-form-item>
                <button class="search-btn" @click.stop="submitForm('ruleForm')">确认提交</button>
              </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 审核结果 -->
    <div class="projectAudits" v-if='dataShow'>
        <div class="top">
            <span><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
        </div>

        <!-- 未审核 -->
        <!-- <div class="projectInfo_OverviewCont">
            <div class="Nojunction">
                <div class="Nojunction-title">该项目暂未审核</div>
            </div>
            <div class="beginJunctionBtn NoBtn" @click="fieldSurvey">
                开始审核
            </div>
        </div> -->

        <!-- 已审核 -->
        <div class="content">
            <div class="icon"><i class="iconfont" :class="className"></i></div>
            <ul>
              <li><label>审核人员：</label><span>{{projectInfoAllData[0].auditName}}</span></li>
              <li><label>审核级别：</label><span>{{auditLevel}}</span></li>
              <li><label>审核意见：</label><span>{{projectInfoAllData[0].comments}}</span></li>
              <li><label>审核时间：</label><span>{{projectInfoAllData[0].submitStatus}}</span></li>
            </ul>
        </div>
    </div>

  </div>
</template>
<script>
export default {
    data() {
        return {
          show:false,
          dataShow: false,
          className: '',
          projectInfoAllData: [],
          commonData: window.commonData,
          ruleForm: {
            auditStatus: '',
            remarks: '',
            disagree: '',
            agree: ''
          },
          rules: {
            auditStatus: [
                { required: true, message: '请选择审核结果', trigger: 'change' }
            ]
          },
          processStateId:'',
          auditLevel: '',
        }
    },
    created(){
      var _this=this;
      _this.junctionInfo();
      /*setTimeout(() => {
        _this.passData();
      }, 2000);  */
    },

    computed:{
      isThrough() {
        return this.ruleForm.auditStatus === this.ruleForm.agree ? 1 : 2 ;
      }
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
                if(_this.projectInfoAllData[0].nowStatus == '待审核'){
                    _this.show = true;
                    _this.passData();
                }else{
                    _this.dataShow = true;
                    _this.show = false;
                }
            }

        }).catch(function (error) {
            _this.$messageError(error);
        });
      },

      passData() {    //通过不通过接口
        var _this = this;

        _this.$http.post("/api/projectfinishaudit/judgeProjectStatus",{
                    //任务Id
          examTaskId: _this.$store.state.examTaskId
        }).then(function(res){
              //console.log(res);
            _this.ruleForm.auditStatus = res.data.agree;
            _this.ruleForm.disagree = res.data.disagree;
            _this.ruleForm.agree = res.data.agree;
        }).catch(function (error) {
            //_this.$messageError(error);
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

      fieldSurvey() {
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '结项审核';
        this.$store.state.commonBtn = '';
        this.$store.state.componentsType = 'junctionsInfo';
        this.$store.state.dataObj = this.projectInfoAllData[0];
        //console.log('我打印的',this.projectInfoAllData);
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
                  _this.sealConfir(_this.isThrough);
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

      sealConfir(isThrough) {
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
              //单选按钮组
              isThrough
          }).then(function(res){
              _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '结项审核提交成功!'
              });
              _this.junctionInfo();
              _this.show = false;
              _this.dataShow = true;
              _this.$store.state.refreshProjectInfo();
          }).catch(function (error) {
              _this.$messageError(error);
          });
    },

    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
// 项目信息
.projectUltimateAudit{
	.beginJunctionBtn{
		background: #3A80EC;
		color: #fff;
		font-size: 13px;
		border-radius:2px;
		height: 25px;
    line-height: 25px;
    margin-top: 5px;
    padding: 0 10px;
    text-align: center;
	}
	.NoBtn{
		max-width: 70px;
		margin: 0 auto;
	}
	.Nojunction{
		text-align: center;
	}
	.Nojunction-title{
		font-size:13px;
		color:rgba(99,99,99,1);
	}
}
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
    .projectInfo_OverviewCont {
        padding: 24px 40px;
        >div {
            clear: both;
            line-height: 31px;
            height: 31px;
            p {
                width: 50%;
                font-size:13px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                overflow: hidden;
                label{
                  color: #777777;
                  float: left;
                }
                span {
                  float: left;
                  width: 70%;
                  color: #1D1C1E;
                }
                .assetsAccount{&:after{content:'万元'}}
            }
        }
    }

}

.optionalmsg {
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-top: 0;
    margin-bottom: 10px;
    margin-top: 10px;
    .top {
        height: 35px;
        background: #f6faff;
        border-radius: 2px 2px 0px 0px;
        border: 1px solid rgba(236, 236, 236, 1);
        border-left: 0;
        border-right: 0;
        line-height: 35px;
        font-size: 13px;
        padding-left: 20px;
        i {
            color: #98C268;
        }
        span {
            display: inline-block;
            margin-left: 10px;
            font-size: 13px;
            font-weight: 600;
        }
    }
    .auditing-info{
        padding: 20px 20px;
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
    }
    .content {
        overflow: hidden;
        border: 1px solid rgba(236, 236, 236, 1);
        border-top: 0;
        padding: 15px 0;
    }
    .icon-shenhejieguo {
        color: #98C268;
        margin-left: 20px;
        margin-right: 10px;
    }
    .icon-yitongguo {
        font-size: 57px;
        color: #11BF6B;
    }
    .icon-yijujue {
        color: #F76D43;
        font-size: 57px;
    }
    .icon {
        float: left;
        display: inline-block;
        margin-left: 43px;
    }
    ul {
        margin-left: 112px;
        overflow: hidden;
        li {
            width: 200px;
            float: left;
            line-height: 30px;
            font-size: 13px;
        }
        li:last-child {
            width: 100%;
        }
    }
}

/deep/ .el-form-item {
    margin-bottom: 7px;
}

/deep/ .noData{
    padding-left: 47%;
    text-align: left;
}
</style>
