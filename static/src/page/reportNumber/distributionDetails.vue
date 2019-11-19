<template>
  <div>
    <div class="details-container">
      <div class="details-head">
        <i class="iconfont result-icon">&#xe606;</i>
        <span>报告号结果</span>
      </div>
      <div class="details-body">
        <div class="details-body-head">
          <i class="iconfont info-icon">&#xe615;</i>
          <span>报告信息</span>
        </div>
        <div class="details-body-content">
          <el-row>
            <el-col :span="12">
              <div class="details-table">
                <label class="name">项目名称：</label>
                <span class="data" >{{$store.state.dataObj.basic.projectName}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="details-table">
                <label class="name">项目编号：</label>
                <span class="data" >{{$store.state.dataObj.basic.projectNumber}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="details-table">
                <label class="name">报告类型：</label>
                <span class="data">{{$store.state.dataObj.basic.issueAssetsReport}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="details-table">
                <label class="name">签发人：</label>
                <span class="data">{{$store.state.dataObj.basic.issueName}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="details-table">
                <label class="name">承办单位：</label>
                <span class="data">{{$store.state.dataObj.basic.groupName}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="details-table">
                <label class="name">项目负责人：</label>
                <span class="data">{{$store.state.dataObj.basic.projectLeader}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <reportNumberTree ref="reportNumberTree"></reportNumberTree>
    </div>
  </div>
</template>
<script>
  import reportNumberTree from '@/page/project/projectDistribution/projectProjectReportNumber.vue'
  var that
  export default {
    data() {
      return {
        submitId: [],
      };
    },

    created() {
      that = this;
      this.$store.state.projectId = this.$store.state.dataObj.basic.projectId;
    },

    components:{
      reportNumberTree
    },

    methods: {
      // 进入项目
      extraChildMethod() {
        this.enterProject();
      },

      //蓝色按钮
      childMethod() {
        if(!this.$store.state.showSubmit){
          this.enterProject();
        }else{
          this.$store.state.SubmitReportNumber();
        }
      },

      //进入项目
      enterProject(){
        this.$setCookie('projectId', this.$store.state.dataObj.basic.projectId ,24*60*60);
        this.$store.state.projectId = this.$store.state.dataObj.basic.projectId;
        this.$router.push({
          path: "/zlpg/project/projectCont"
        });
        this.$store.commit("changeShowCommon");
      }

    }
  }

</script>
<style scoped lang="scss">
  .details-container {
    margin: 20px auto 0;
    padding-bottom: 30px;
    width: 760px;
    border: 1px solid #ECECEC;
    .details-head {
      height: 35px;
      line-height: 35px;
      box-sizing: border-box;
      background: #FAFAFA;
      font-size: 13px;
      font-weight: 500;
      color: rgba(38, 38, 40, 1);
      border-bottom: 1px solid rgba(236, 236, 236, 1);
      span{
        font-weight: 700;
      }
    }
    .details-body {
      margin: 15px auto 0;
      width: 723px;
      box-sizing: border-box;
      border: 1px solid rgba(229, 229, 229, 1);
      .details-body-head {
        height: 32px;
        line-height: 32px;
        background: rgba(246, 250, 255, 1);
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        font-size: 13px;
        font-weight: 400;
        color: rgba(38, 38, 40, 1);
        span{
          font-weight: 600;
        }
      }
      .details-body-content {
        display: flex;
        flex-direction: column;
        padding: 20px 45px;
        .details-table {
          overflow: hidden;
          line-height: 36px;
          font-size: 13px;
          & .name {
            color: #777777;
            float: left;
          }
          & .data {
            float: left;
            color: #1D1C1E;
            width: 70%;
          }
        }
      }
    }
    /deep/ .tree-container{
      margin: 15px 18px;
    }
  }
  .result-icon {
    margin: 0 5px 0 17px;
    color: rgba(247, 181, 67, 1);
  }

  .info-icon {
    margin: 10px 5px 9px 17px;
    color: #3a80ec;
  }
  /deep/ .tree {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 30px;
    width: 100%;
  }
  /deep/ .tree-container{
    .btn-times{
      width: 201px;
    }
    .label-container {
      width: 180px;
    }
    .iptStyle {
      right: 294px;
      width: 184px;
    }
    .btnStyle {
      right: 240px;
    }
    .btnCheck {
      color: #3A80EC;
    }
    .btnUnCheck {
      color: #C0C0C0;
    }
  }


</style>
