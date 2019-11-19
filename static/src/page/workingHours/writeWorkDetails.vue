<template>
	<div class="wirteWorkTime">
		<div class="wirteWorkTime-header">
			<span class="wirteWorkTime-header-time">统计周期：</span>
			<div class="wirteWorkTime-header-timeDome">
				<span>{{workTimeStr}}</span>
			</div>
			<!-- <div class="wirteWorkTime-header-right">
					<span class="wirteWorkTime-header-right-tit">填报人：<span class="wirteWorkTime-header-right-input">你好</span></span>
					<span class="wirteWorkTime-header-right-tit">本周总工时：<span class="wirteWorkTime-header-right-time">{{timeSheetSumWeekly+"h"}}</span></span>
					<span class="wirteWorkTime-header-right-tit">线上工时：<span class="wirteWorkTime-header-right-time">{{onlineSumWeekly+"h"}}</span></span>
					<span class="wirteWorkTime-header-right-tit">线下工时：<span class="wirteWorkTime-header-right-time">{{offlineSumWeekly+"h"}}</span></span>
			</div> -->
		</div>
		<div class="wirteWorkTime-content">
			<work-hours-table-details :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></work-hours-table-details>
		</div>
	</div>
</template>

<script>
import workHoursTableDetails from "@/components/workHoursTableDetails";
export default {
  data() {
    return {
      workTimeStr:
        this.$store.state.dataObj.weekBeginDate.substr(0, 10) +
        " 至 " +
        this.$store.state.dataObj.weekEndDate.substr(0, 10),
      offlineSumWeekly: 0,
      onlineSumWeekly: 0,
      timeSheetSumWeekly: 0,
      workinghoursData: [],
      pName: "",
      details: true
    };
  },
  created() {
    var _this = this;
    this.getWorkH();
  },
  methods: {
    //提交回调
    workinghoursFun() {
      this.getWorkH();
    },
    ZNumber(str) {
      if (str === "" || str === undefined) {
        return 0;
      } else {
        return parseFloat(str);
      }
    },
    childMethod() {
      //右侧按钮事件统一命名
      this.$store.state.projectId = this.$store.state.dataObj.projectId;
      this.$router.push({
        path:
          "/zlpg/project/projectCont/projectWorkinghours/projectWorkinghoursWrite"
      });
      this.$store.commit("changeShowCommon");
    },
    //数据请求
    getWorkH() {
      var _this = this;
      this.$http
        .post("/api/projecttimesheetaudit/timeDetail", {
          weekBeginDate: this.$store.state.dataObj.weekBeginDate,
          weekEndDate: this.$store.state.dataObj.weekEndDate,
          createUserId: this.$store.state.dataObj.uId,
          pId: this.$store.state.dataObj.projectId,
          tabFlag: this.$store.state.dataObj.tabFlag //未审核unapproved  已通过isPassed  未通过isRefuse  草稿draft  全部all
        })
        .then(function(data) {
          _this.workinghoursData = data.data;
          _this.calculateWorkHours();
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },

    //计算工时总计
    calculateWorkHours() {
      this.onlineSumWeekly = 0;
      this.offlineSumWeekly = 0;
      this.timeSheetSumWeekly = 0;
      for (var i = 0; i < this.workinghoursData.length; i++) {
        var projectWorkingsHoursDto = this.workinghoursData[i]
          .projectmilestoneplanDtoList;
        for (let j = 0; j < projectWorkingsHoursDto.length; j++) {
          this.onlineSumWeekly +=
            Math.round(
              (this.ZNumber(projectWorkingsHoursDto[j].onlineMon) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineTues) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineWed) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineThur) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineFri) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineSat) +
                this.ZNumber(projectWorkingsHoursDto[j].onlineSun)) *
                10
            ) / 10;
          this.offlineSumWeekly +=
            Math.round(
              (this.ZNumber(projectWorkingsHoursDto[j].offlineMon) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineTues) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineWed) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineThur) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineFri) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineSat) +
                this.ZNumber(projectWorkingsHoursDto[j].offlineSun)) *
                10
            ) / 10;
          this.timeSheetSumWeekly +=
            Math.round(
              this.ZNumber(projectWorkingsHoursDto[j].timeSheetSumWeekly) * 10
            ) / 10;
        }
      }
      console.log(this.offlineSumWeekly);
    }
  },
  components: {
    workHoursTableDetails
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.wirteWorkTime {
  padding: 15px 20px;
  font-size: 13px;
  .wirteWorkTime-header {
    height: 30px;
    line-height: 30px;
    .wirteWorkTime-header-time {
      font-size: 13px;
    }
    .wirteWorkTime-header-timeDome {
      display: inline-block;
    }
    .wirteWorkTime-header-right {
      float: right;
    }
    .wirteWorkTime-header-right-tit {
      padding-right: 20px;
      line-height: 30px;
      font-size: 13px;
      .wirteWorkTime-header-right-time {
        color: #ea7f2b;
      }
    }
  }
  .wirteWorkTime-content {
    .wirteWorkTime-content-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background: #f6faff;
    }
  }
}
</style>