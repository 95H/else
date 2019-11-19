<template>
  <div class="PersonnerDetails">
    <div class="PersonnerDetails-header">
        <div class="PersonnerDetails-header-tit">
          <i class="PersonnerDetails-header-tit-icon"></i>人员信息
        </div>
        <div class="PersonnerDetails-header-cont">
          <div class="PersonnerDetails-header-cont-row">
            <span><span>人员姓名：</span>{{$store.state.dataObj.userName}}</span>
            <span><span>所属机构：</span>{{$store.state.dataObj.groupName}}</span>
          </div>
          <div class="PersonnerDetails-header-cont-row">
            <span><span>所属部门：</span>{{$store.state.dataObj.deptName}}</span>
            <span><span>最早释放日期：</span>{{$store.state.dataObj.endDate}}</span>
          </div>
        </div>
    </div>
    <div class="PersonnerDetails-content">
      <div class="PersonnerDetails-content-header">
        <span class="PersonnerDetails-header-time fs13">统计周期：</span>
        <div class="PersonnerDetails-header-timeDome">
            <work-hours-time :workinghoursStart="workinghoursStart" :isTianXie="isTianXie" :workinghoursEnd="workinghoursEnd" @executeFun="executeFun"></work-hours-time>
        </div>
        <div class="PersonnerDetails-header-right">
            <span class="PersonnerDetails-header-right-tit">本周总工时：<span class="PersonnerDetails-header-right-time">{{(timeSheetSumWeekly || 0)+"h"}}</span></span>
            <span class="PersonnerDetails-header-right-tit">线上工时：<span class="PersonnerDetails-header-right-time">{{(onlineSumWeekly || 0)+"h"}}</span></span>
            <span class="PersonnerDetails-header-right-tit">线下工时：<span class="PersonnerDetails-header-right-time">{{(offlineSumWeekly || 0)+"h"}}</span></span>
        </div>
      </div>
      <div class="PersonnerDetails-content-table">
          <personnel-work-hours-table-details :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></personnel-work-hours-table-details>
      </div>
    </div>
  </div>
</template>
<script>
  import workHoursTime from "@/components/workHoursTime";
  import personnelWorkHoursTableDetails from "@/components/personnelWorkHoursTableDetails";
  export default {
    data() {
      return {
        workinghoursStart:"",
        workinghoursEnd:"",
        weekStatus:"",
        isTianXie:true,
        workinghoursData:[],
        offlineSumWeekly:"",
        onlineSumWeekly:"",
        timeSheetSumWeekly:"",
      }
    },
    components: {
      workHoursTime,
      personnelWorkHoursTableDetails
    },
    // mounted() {
    //     console.log(this.$store.state.dataObj);
    //     this.getPersonnerWorkHours()
    // },
    created(){
      this.getPersonnerWorkHours()
    },
    methods:{
      workinghoursFun(){

      },
      executeFun(data){
        this.workinghoursStart=data.workinghoursStart;
        this.workinghoursEnd=data.workinghoursEnd;
        this.weekStatus=data.weekStatus;
        this.getPersonnerWorkHours();
      },
      getPersonnerWorkHours(){
        var _this=this,urlPath = '',params={};
        if(/projectPersonnel/g.test(_this.$route.path)){
          urlPath = "/api/projectuser/findProjectUserDetail";
          params = {
            weekStartDate:_this.workinghoursStart,
            weekEndDate:_this.workinghoursEnd,
            weekStatus:_this.weekStatus,
            userId : _this.$store.state.dataObj.userId,
            pId : _this.$store.state.dataObj.setupProjectId
          }
        }else{
          urlPath = "/api/projectuser/findUserAllTime";
          params = {
            weekStartDate:_this.workinghoursStart,
            weekEndDate:_this.workinghoursEnd,
            weekStatus:_this.weekStatus,
            userId : _this.$store.state.dataObj.userId
          }
        }
        this.$http.post(urlPath,params).then(function (res) {
            _this.workinghoursData=res.data.resultProject;
            _this.workinghoursStart=res.data.mondayDate;
            _this.workinghoursEnd=res.data.sundayDate;
            _this.offlineSumWeekly = res.data.sumTimeWeekly.offlineSumWeekly;
            _this.onlineSumWeekly = res.data.sumTimeWeekly.onlineSumWeekly;
            _this.timeSheetSumWeekly = res.data.sumTimeWeekly.timeSheetSumWeekly;
        }).catch(function (error) {
            _this.$messageError(error);
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
  .PersonnerDetails{
    padding: 20px;
    .PersonnerDetails-header{
      .PersonnerDetails-header-tit{
        position: relative;
        padding-left: 42px;
        height: 36px;
        line-height: 36px;
        font-size:13px;
        font-family:PingFangSC-Medium;
        font-weight:600;
        color:rgba(38,38,40,1);
        background: #fafafa;
        border:1px solid #ECECEC;
        .PersonnerDetails-header-tit-icon{
          position: absolute;
          top: 50%;
          left: 20px;
          transform:translateY(-50%);
          vertical-align: middle;
          width: 12px;
          height:14px;
          padding-right: 10px;
          background: url(../../../static/img/project_ry1.png) no-repeat;
        }
      }
      .PersonnerDetails-header-cont{
        height: 100px;
        padding-left: 89px;
        padding-top: 12px;
        border:1px solid #ECECEC;
        border-top:none;
        .PersonnerDetails-header-cont-row{
          padding-top: 15px;
          >span{
            display: inline-block;
            font-size: 13px;
            font-family:PingFangSC-Regular;
            >span{
              color: #686868;
            }
          }
          span:first-child{
            width: 415px;
          }
        }
      }
    }
    .PersonnerDetails-content{
      margin-top: 10px;
      .PersonnerDetails-content-header{
        height: 30px;
        line-height:30px;
        padding: 0 20px;
        color: #686868;
        .PersonnerDetails-header-timeDome{
            display: inline-block;
        }
        .PersonnerDetails-header-right{
            float: right;
            .PersonnerDetails-header-right-tit{
                padding-left: 20px;
                line-height: 30px;
                font-size:13px;
                color: #686868;
                .PersonnerDetails-header-right-time{
                    color:#EA7F2B;
                }
            }
        }
      }

    }
  }

</style>
