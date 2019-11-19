<template>
    <!--*用法
        <work-hours-time :workinghoursStart="workinghoursStart" :workinghoursEnd="workinghoursEnd" @executeFun="executeFun"></work-hours-time>
        *workinghoursStart  周一时间
        *workinghoursEnd    周日时间
        *isAdd   是否计算上下周时间
        *isTianXie   下一周是否可以点击
        *executeFun   上一周和下一周执行的事件
    -->
    <div class="workHoursTime">
      <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="getLastWeek"></el-button><el-input :disabled="true" size="mini" v-model="workinghoursTime"></el-input><el-button type="primary" size="mini" icon="el-icon-arrow-right" :disabled="!hasTianXie" @click="getNextWeek"></el-button>
    </div>
</template>

<script>
export default {
  props: ["workinghoursStart", "workinghoursEnd", "isTianXie", "isAdd"],
  data() {
    return {
      workinghoursTime: "",
      startTime: "",
      startEnd: "",
      hasTianXie: this.isTianXie
    };
  },
  created() {
    var _this = this;
    this.startTime = this.workinghoursStart;
    this.startEnd = this.workinghoursEnd;
    this.setWorkTime();
    if (
      new Date(this.workinghoursEnd + " 23:59:59").getTime() >
      new Date().getTime()
    ) {
      this.hasTianXie = false;
    } else {
      this.hasTianXie = true;
    }
  },
  methods: {
    //上周
    getLastWeek() {
      if (this.isAdd) {
        this.startTime = this.getTime(this.startTime, "LAST");
        this.startEnd = this.getTime(this.startEnd, "LAST");
        this.setWorkTime();
      }
      this.$emit("executeFun", {
        workinghoursStart: this.startTime,
        workinghoursEnd: this.startEnd,
        weekStatus: "front"
      });
    },
    //下周
    getNextWeek() {
      if (this.isAdd) {
        this.startTime = this.getTime(this.startTime, "NEXT");
        this.startEnd = this.getTime(this.startEnd, "NEXT");
        this.setWorkTime();
      }
      this.$emit("executeFun", {
        workinghoursStart: this.startTime,
        workinghoursEnd: this.startEnd,
        weekStatus: "next"
      });
    },
    setWorkTime() {
      if (!this.startTime) {
        this.workinghoursTime = "";
      } else {
        this.workinghoursTime =
          this.startTime.substr(0, 10) + " 至 " + this.startEnd.substr(0, 10);
      }
    },
    getTime(time, type) {
      var Y, M, D, h, m, s;
      if (type === "LAST") {
        var date = new Date(new Date(time).getTime() - 604800000);
      } else if (type === "NEXT") {
        var date = new Date(new Date(time).getTime() + 604800000);
      }
      Y = date.getFullYear() + "-";
      M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    }
  },
  watch: {
    workinghoursStart: function(newD, oldD) {
      this.startTime = this.workinghoursStart;
      this.startEnd = this.workinghoursEnd;
      this.setWorkTime();
    },
    workinghoursEnd: function() {
      if (
        new Date(this.workinghoursEnd + " 23:59:59").getTime() >
        new Date().getTime()
      ) {
        this.hasTianXie = false;
      } else {
        this.hasTianXie = true;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.workHoursTime {
  /deep/ .el-input {
    width: 180px;
    height: 25px;
    vertical-align: middle;
    margin: 0 -1px;
    .el-input__inner {
      vertical-align: top;
      border-radius: 0;
      text-align: center;
      padding: 0 !important;
    }
  }
  /deep/ .el-input.is-disabled .el-input__inner {
    color: #636363;
    border-color: #e1e1e1;
  }
  /deep/ .el-button {
    height: 25px;
    width: 30px;
    box-sizing: border-box;
    border-radius: 0px;
    vertical-align: middle;
    padding: 3px 5px;
    font-size: 17px;
    background: #fff !important;
    border: 1px solid #e1e1e1 !important;
    i {
      color: #a9a9a9;
    }
  }
  /deep/ .el-button:hover {
    background: #5fa9ec !important;
    border-color: #5fa9ec !important;
    i {
      color: #fff;
    }
  }
  /deep/ .el-button[disabled]:hover {
    background: #fff !important;
    border-color: #e1e1e1 !important;
    i {
      color: #a9a9a9;
    }
  }
}
</style>
