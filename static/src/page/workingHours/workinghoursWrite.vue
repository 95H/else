<template>
	<div class="workinghoursWrite">
		<div class="workinghoursWrite-header">
			<span class="workinghoursWrite-header-time">统计周期：</span>
			<div class="workinghoursWrite-header-timeDome">
				<work-hours-time :workinghoursStart="workinghoursStart" :isTianXie="isTianXie" :workinghoursEnd="workinghoursEnd" @executeFun="executeFun"></work-hours-time>
			</div>
			<span class="workinghoursWrite-header-right-tit">填报人：<span class="workinghoursWrite-header-right-input">{{userName}}</span></span>
		</div>
		<div class="workinghoursWrite-content">
			<fill-in-working-hours :workinghoursData="workinghoursData" :onlineDuration="onlineDuration" @workinghoursFun="workinghoursFun"></fill-in-working-hours>
		</div>
	</div>
</template>

<script>
import workHoursTime from "@/components/workHoursTime";
import fillInWorkingHours from "@/components/fillInWorkingHours";
export default {
  data() {
    return {
      userName: "",
      workinghoursStart: "",
      workinghoursEnd: "",
      weekStatus: "",
      isTianXie: "",
      offlineSumWeekly: 0,
      onlineSumWeekly: 0,
      timeSheetSumWeekly: 0,
      onlineDuration: {},
      workinghoursData: [],
      isWeekStatus: false
    };
  },
  created() {
    var _this = this;
    this.userName = JSON.parse(this.$getCookie("user")).userName;
    this.getWorkH();
  },
  methods: {
    executeFun(data) {
      this.workinghoursStart = data.workinghoursStart;
      this.workinghoursEnd = data.workinghoursEnd;
      this.weekStatus = data.weekStatus;
      this.getWorkH();
    },
    //提交回调
    workinghoursFun() {
      this.workinghoursStart = this.getNowFormatDate(
        new Date(new Date(this.workinghoursStart).getTime() - 604800000)
      );
      this.workinghoursEnd = this.getNowFormatDate(
        new Date(new Date(this.workinghoursEnd).getTime() - 604800000)
      );
      this.weekStatus = "next";
      this.getWorkH();
    },
    getNowFormatDate(date) {
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    //数据请求
    getWorkH() {
      var _this = this;
      this.$http
        .post("/api/projecttimesheetaudit/selectprojecttimesheetauditAll", {
          weekStartDate: this.workinghoursStart,
          weekEndDate: this.workinghoursEnd,
          weekStatus: this.weekStatus,
          pId: ""
        })
        .then(function(data) {
          data.data.length == 0
            ? (_this.workinghoursData = [])
            : (_this.workinghoursData = data.data);
          _this.onlineDuration = data.onlineDuration;
          _this.workinghoursStart = data.mondayDate;
          _this.workinghoursEnd = data.sundayDate;
          (_this.offlineSumWeekly = data.sumTimeWeekly.offlineSumWeekly),
            (_this.onlineSumWeekly = data.sumTimeWeekly.onlineSumWeekly),
            (_this.timeSheetSumWeekly = data.sumTimeWeekly.timeSheetSumWeekly),
            (_this.isTianXie = data.isTianXie);
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    }
  },
  components: {
    workHoursTime,
    fillInWorkingHours
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.workinghoursWrite {
	height: calc( 100% - 10px );
	flex-direction:column;
	display: -webkit-flex;
	display: flex;
	box-sizing: border-box;
  padding: 15px 20px;
  font-size: 13px;
  background: #fff;
  border: 1px solid #ececec;
  margin-top: 10px;
  .workinghoursWrite-header {
    height: 30px;
    line-height: 30px;
    .workinghoursWrite-header-time {
      font-size: 13px;
    }
    .workinghoursWrite-header-timeDome {
      display: inline-block;
    }
    .workinghoursWrite-header-right-tit {
      padding-left: 20px;
      line-height: 30px;
      font-size: 13px;
      .workinghoursWrite-header-right-time {
        color: #ea7f2b;
      }
    }
  }
  .workinghoursWrite-content {
  	flex: 1;
  	-ms-flex:1 0 auto;
    .workinghoursWrite-content-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background: #f6faff;
      margin-top: 10px;
    }
  }
}
</style>
