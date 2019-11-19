<template>
  <div class="padding20">
    <div class="fileList">
      <div class="fileTitle">
        <i class="iconfont icon-sousuowenjian blue"></i> 当前状态
      </div>
      <div class="send-trial">
        <div class="trial-left">
          <div class="person-icon fl">
            <i class="iconfont icon-renyuan"></i>
          </div>
          <div class="trial-left-right">
            <p>
              <b>{{thisExamine.userName}}</b> {{filterTaskDefKey(thisExamine.taskDefKey)}}
              <span class="imgStatus"><img :src="filterImg(thisExamine.processStateId)" /></span>
              <!-- <a class="reset-btn fr" v-if="/projectImplementation/.test(this.$route.path)" @click="openDialog('送审详情','撤回','','trialDetail','sendTrial')">查看详情>></a>
              <a href="javascript:;" v-if="!/projectAuditing/.test(this.$route.path)" class="search-btn fr" @click="openDialog('线下审核','确认提交','','submitFileList','underLineTrial')">线下审核</a> -->
            </p>
            <p>审核类型：<span :class="thisExamine.operateType=='2' ? 'blue' : 'red'">{{filterOperateType(thisExamine.operateType)}}</span></p>
            <p>操作时间：{{thisExamine.createTime || '--'}}</p>
            <p>审核意见：{{thisExamine.remarkContent || '--'}}</p>
          </div>
        </div>
        <div class="fileList marginTop10" v-if="thisExamine.operateType != '5'">
          <div class="fileTitle bgWhite">
            <i class="orange iconfont icon-xiangmudigao"></i> 文件列表
          </div>
          <div class="bgWhite">
            <ul class="attachment-sheet" v-if="thisExamine.procFileArray.length > 0">
              <li class="attachment-item" v-for="(fileItem,index) in thisExamine.procFileArray" :key="index">
                <el-row class="text-center">
                  <el-col class="text-left" :span="12"><span class="fileName" :title="fileItem.fileName"><i class="el-icon-document"></i> {{fileItem.fileName}}</span></el-col>
                  <el-col :span="2">{{fileItem.userName}}</el-col>
                  <el-col :span="8">{{fileItem.createTime}}</el-col>
                  <el-col :span="2"><a @click="downloadFile(fileItem)">下载</a></el-col>
                </el-row>
              </li>
            </ul>
            <div class="noData" v-else>暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fileList lastFileList" v-if="showSubmit">
      <div class="fileTitle">
        <i class="iconfont icon-sousuowenjian blue"></i> 报告送审
      </div>
      <div class="send-trial">
        <div class="trial-left">
          <div class="person-icon fl">
            <i class="iconfont icon-renyuan"></i>
          </div>
          <div class="trial-left-right">
            <p>
              <b>{{sendExamine.userName}}</b> 项目负责人
              <span class="fr">时间：{{sendExamine.createTime}}</span>
            </p>
            <p>{{this.$store.state.projectInfo.projectName}}</p>
            <p>备注说明：{{sendExamine.remarkContent}}</p>
          </div>
        </div>
        <div class="fileList marginTop10">
          <div class="fileTitle bgWhite">
            <i class="orange iconfont icon-xiangmudigao"></i> 文件列表
          </div>
          <div class="bgWhite">
            <ul class="attachment-sheet" v-if="sendExamine.procFileArray.length > 0">
              <li class="attachment-item" v-for="(fileItem,index) in sendExamine.procFileArray" :key="index">
                <el-row class="text-center">
                  <el-col class="text-left" :span="12"><span class="fileName" :title="fileItem.fileName"><i class="el-icon-document"></i> {{fileItem.fileName}}</span></el-col>
                  <el-col :span="2">{{fileItem.userName}}</el-col>
                  <el-col :span="8">{{fileItem.createTime}}</el-col>
                  <el-col :span="2"><a @click="downloadFile(fileItem)">下载</a></el-col>
                </el-row>
              </li>
            </ul>
            <div class="noData" v-else>暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        trialDetail : this.$store.state.dataObj,  //查询任务详情中的参数
        thisExamine : {
          procFileArray: [] //避免控制台报错
        },  //当前状态
        sendExamine : {
          procFileArray: []
        },  //报告送审
        showSubmit : this.$store.state.dataObj.showSubmit   //是不是查看的撤回的项目详情
      };
    },
    created() {
      var _this = this;
      if(this.showSubmit){
        if(this.trialDetail.isNewAuditing){
          this.$http.post('/api/documentsRemark/findProjectNewDetail',{
            projectId : this.$store.state.projectId,
            investorId : this.$store.state.investorId,
            taskNodeId : this.trialDetail.taskNodeId,
            tabFlag : /projectImplementation|externalOffLineTask/.test(this.$route.path) ? 'TASK' : 'AUDITING',
          }).then(res=>{
            _this.thisExamine = _this.trialDetail;
            _this.sendExamine = res.data;
          }).catch(err=>{
            _this.$messageError(err);
          })
        }else{
          if(this.trialDetail.trialDetailFlag){
            let url = /examineModification|externalOffLineAudit/.test(this.$route.path) ? '/api/documentsRemark/findChangeProjectDetail' : '/api/documentsRemark/findProjectDetail';
            this.$http.post(url,{
              projectId : this.$store.state.projectId,
              investorId : this.$store.state.investorId,
              taskDefKey : this.trialDetail.taskDefKey,
              taskId : this.trialDetail.taskId,
              procInstId : this.trialDetail.procInstId
            }).then(res=>{
              if(this.trialDetail.isShowBottom){  //如果是点击‘送审’进来的
                this.thisExamine = res.data;
                this.sendExamine = this.trialDetail;
              }else{
                this.thisExamine = this.trialDetail;
                this.sendExamine = res.data;
              }
            }).catch(err=>{
              this.$messageError(err);
            })
          }
        }
      }else{
        this.thisExamine = this.trialDetail;
      }
    },
    methods: {
      // 状态图标
      filterImg(val){
        switch(val){
          case '1354':  //已撤回
            return '../../../../static/img/status1.png'
          case '1067':
          case '1069':  //已通过
          case '1355':
          case '1357':
            return '../../../../static/img/status3.png'
          case '1068':
          case '1070':
          case '1079':  //已拒绝
          case '1356':
          case '1358':
          case '1361':
            return '../../../../static/img/status0.png'
          case '1078': // 已签发
          case '1360':
            return '../../../../static/img/status4.png'
          case '1362':
            return '../../../../static/img/status5.png'
          case '1363':
            return '../../../../static/img/status6.png'
          default:  // 未审核
            return '../../../../static/img/status2.png'
        }
      },
      // 过滤项目人员角色
      filterTaskDefKey(val){
        switch(val){
          case 'usertask1':
            return '项目负责人';
            break;
          case 'usertask2':
            return '部门经理';
            break;
          case 'usertask3':
            return '技术中心复审人员';
            break;
          default:
            return '技术中心签发人员';
            break;
        }
      },
      // 审核类型过滤
      filterOperateType(val){
        switch(val){
          case '0':
            return '待审核';
            break;
          case '1':
            return '送审';
            break;
          case '2':
            return '初审';
            break;
          case '3':
            return '复审';
            break;
          case '4':
            return '签发';
            break;
          case '5':
            return '送审撤回';
            break;
          case '6':
            return '初审撤回';
            break;
          case '7':
            return '复审撤回';
            break;
          case '8':
            return '撤回';
            break;
          case '9':
            return "退回到初审";
            break;
          case '10':
            return "退回到复审";
            break;
        }
      },
      // 第一个按钮的方法
      childMethod(){
        this.$http.post('/api/investors/retractSubmit',{
          investorId : this.$store.state.investorId
        }).then(res=>{
          this.$messageSuccess(res.msg);
          this.$store.state.getSubmitFileData();
          this.$store.commit("changeShowCommon");
        }).catch(err=>{
          this.$messageError(err);
        })
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
  };
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .fileList{ border:1px solid #ECECEC;
    &.lastFileList{ margin:20px 0 0 20px !important; position: relative;
      &::before{
        position:absolute; width:1px; height:20px; top:-20px; left:20px; content:''; background-color:#D1D1D1; display:block;
      }
      .send-trial{ background-color:#F9F9F9;}
    }
    .bgWhite{ background-color:#fff !important;
      .noData{ height:150px; line-height:240px;}
    }
    .fileTitle{
      background-color:#FAFAFA; border-bottom:1px solid #ececec; font-size:13px; height:35px; line-height:35px; padding:0 15px; font-weight:bold;
    }
    .send-trial{ margin:10px; background-color:#F1F8E8; padding:10px 20px; overflow:hidden;
      .trial-left{ width:100%; padding-left:52px; position: relative; box-sizing:border-box; overflow: hidden;
        .person-icon{ position:absolute; left:0; top:0;}
        .trial-left-right{
          .reset-btn,.search-btn{ margin-top:-3px;}
        }
      }
    }
    .person-icon {
      width: 52px;
      height: 52px;
      border-radius: 26px;
      background-color: #ffffff;
      text-align: center;
      line-height: 52px;
      .icon-renyuan {
        color: #e7e7e7;
        font-size: 22px;
      }
    }
    .trial-left-right {
      margin-left:12px;
      font-size:12px;
      color: #6a6a6a;
      > p {
        margin-top: 8px;
        >span.fr{ position: relative;
          &::before{ position:absolute; content:''; display:block; width:4px; height:4px; border-radius:50%;left:-10px; top:4px; background-color:#F09237;}
        }
        b{font-weight:bold;}
        &:first-child {
          color: #1d1c1e;
          margin-top:3px;
        }
        .imgStatus{ position:absolute; right:10px; top:0;}
      }
    }
    .attachment-sheet {
      background-color:#fff;
      padding:10px 15px;
      .attachment-item {
        height:30px;
        display: flex;
        color: #636363;
        &:hover{ background-color:#E9F1FA;}
        .el-row{ width:100%; font-size:12px; line-height:30px;
          .el-col{color:#6A6A6A;
            a{color:#3A80EC;cursor: pointer;
              &:hover{ text-decoration:underline;}
            }
            .fileName{ width:100%; text-overflow:ellipsis; overflow: hidden; white-space:nowrap; display:block;}
          }
        }
      }
    }
  }
</style>
