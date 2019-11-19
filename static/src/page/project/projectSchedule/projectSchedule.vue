<template>
  <div class="container">
    <div class="nav-container">
      <nav-list :navoptions="pageOptions.tabOptions"></nav-list>
    </div>
    <template v-if="Object.keys(tableData).length == 0">
      <div class="noData">暂无数据</div>
    </template>
    <template v-else>
      <div class="chart-container">
        <div class="chart-layout" v-if="showList">
          <div class="left">
            <div class="chart-title">里程碑信息</div>
            <div class="chart-list-title" v-for="(item,index) in tableData.list" :key="index"> <!-- 循环 -->
              <h3 class="title" :title = 'item.mileStone'><img src="../../../assets/common/project.png" alt="">  {{item.mileStone}}</h3>
              <p class="dateStyle"><img src="../../../assets/common/project_time.png" alt=""> 计划开始日期：<span>{{item.beginDate}}</span></p>
              <p class="dateStyle"><img src="../../../assets/common/project_time.png" alt=""> 计划完成日期：<span>{{item.endDate}}</span></p>
              <p class="dateStyle"><img src="../../../assets/common/project_time.png" alt=""> 实际开始日期：<span>{{item.beginDateActual}}</span></p>
              <p class="dateStyle"><img src="../../../assets/common/project_time.png" alt=""> 实际完成日期：<span>{{item.endDateActual}}</span></p>
            </div>
          </div>
          <div class="middle">
            <div class="chart-operation">操作</div>
            <div class="operation-container" v-for="(item,index) in tableData.list" :key="index">
              <el-button class="btnClass" type="primary" :disabled="btnFlag=='false'" @click="btnEvent(item,index)" v-if="item.beginDateActual == ''">开始</el-button>
              <el-button class="btnClass" type="warning" :disabled="btnFlag=='false'" @click="btnEvent(item,index)" v-if="item.beginDateActual != '' && item.endDateActual == ''">结束</el-button>
              <el-button class="btnClass" type="success" disabled v-if="item.beginDateActual != '' && item.endDateActual != ''">已完成</el-button>
            </div>
          </div>
          <div class="right">
            <div class="right_border" :style="'width:'+ width +'px'">
              <div class="date-container">
                <div class="yearMonth" v-for="(item,index) in yearMonths" :style="'min-width:'+item.width+'px'" :key="index">{{ item.width<60 ? (item.width<40 ? '' : (item.data.split("-")[1]+'月')) : item.data }}</div>
              </div>
              <div class="m-container" v-if="showList">
                <div class="m-content" v-for="(item,index) in tableData.basic.monthAndDays" :key="index">{{ item }}</div>
              </div>
              <div style="display:flex;flex-direction:column" v-if="showList">
                <div class="line-container" v-for="(tableDataItem,index) in tableData.list" :key="index">
                  <div v-for="(item,itemIndex) in 2" :key="itemIndex">
                    <div class="date-line-container">
                      <div class="date-line" v-for="(line,i) in tableData.basic.days" :key="i"></div>
                      <div class="color-style" v-if="itemIndex == 0" :style="{background:'#5FA9EC',left:((getDay(tableData.beginMinTime, tableDataItem.beginDate))*20)+'px',width:((getDay(tableDataItem.beginDate, tableDataItem.endDate)+1)*20)+'px'}"></div>
                      <div class="color-style" v-if="itemIndex == 1" :style="{background:'#F09237',left:((getDay(tableData.beginMinTime, tableDataItem.beginDateActual))*20)+'px',width:tableDataItem.endDateActual != '' ? (((getDay(tableDataItem.beginDateActual, tableDataItem.endDateActual)+1)*20)+'px') : (tableDataItem.beginDateActual != '' ? (((getDay(tableDataItem.beginDateActual, nowDate)+1)*20)+'px') : 0)}"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pageOptions: {
          tabOptions: [
            {label: '项目进度', href: 'projectSchedule', name: 'first'}
          ]
        },
        showList: false,
        // hackReset: true,
        width: 0,
        tableData: {},
        yearMonths: [],
        monthsAcross: [],
        daysAcross: [],
        btnFlag : 'false',
        nowDate : new Date().getFullYear()+'-'+ (new Date().getMonth()>9 ? (new Date().getMonth()+1) : (0+(new Date().getMonth()+1))) +'-'+new Date().getDate()
      }
    },
    created() {
      this.tableMethod();
    },
    methods: {
      getDay(date1, date2) {  //date1:小日期   date2:大日期
        var sdate = new Date(date1);
        var now = new Date(date2);
        var days = now.getTime() - sdate.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        return day;
      },
      getMonth(date1, date2) {
        var startMonth = new Date(date2).getMonth() + 1;
        var endMonth = new Date(date1).getMonth() + 1;
        var intervalMonth = ((new Date(date2).getFullYear() * 12 + startMonth) - (new Date(date1).getFullYear() * 12 + endMonth)) + 1;
        return intervalMonth;
      },
      dataHandle() {

        let _this = this;
        _this.yearMonths = [];
        this.showList = true;
        // let this.tableData = this.tableData;
        let beginTimes = this.tableData.beginMinTime.split('-');
        let startYear = parseInt(beginTimes[0]); // 年
        let startMonths = parseInt(beginTimes[1]); // 月
        let pos = 0;
        let len = this.getMonth(this.tableData.beginMinTime, this.tableData.endMaxTime);
        for (var i = 0; i < len; i++) {
          if (startMonths > 12) {
            startYear += 1;
            startMonths = 1;
          }
          startMonths < 10 ? pos = 0 : pos = '';
          _this.yearMonths.push({data: startYear + '-' + pos + startMonths});
          startMonths++;
        }

        this.tableData.basic.days.forEach((item, index) => {
          if (parseInt(item) === 1 && index !== 0 && index < (this.tableData.basic.days.length-1)) {
            _this.monthsAcross.push(index);
          }else if(index == (this.tableData.basic.days.length-1)){
            _this.monthsAcross.push(this.tableData.basic.days.length);
          }
        });

        this.monthsAcross.forEach((item, index) => {
          if (index === 0) {
            _this.yearMonths[index].width = item * 20
          } else {
            _this.yearMonths[index].width = (_this.monthsAcross[index] - _this.monthsAcross[index - 1]) * 20;
          }
        });

        // if(this.tableData.basic.days.length < 35){
        //   this.yearMonths[this.yearMonths.length - 1].width = (this.tableData.basic.days.length - (this.monthsAcross.length<1 ? 0 :this.monthsAcross[this.monthsAcross.length - 1])) * 20;
        // }

        // 总长度累加
        this.width = 0;

        this.yearMonths.forEach(item => {
          _this.width += item.width;
        });
        // 循环具体数据
        // this.tableData.list.forEach((item, index) => {
        //   this.colorStyle.push({});
        //   if (item.beginDate != '' && item.endDate != '') {
        //     // if (!this.colorStyle[index].background) {
        //     //   this.colorStyle[index].background = [];
        //     // }
        //     if (!this.colorStyle[index].left) {
        //       this.colorStyle[index].left = [];
        //     }
        //     if (!this.colorStyle[index].width) {
        //       this.colorStyle[index].width = [];
        //     }

        //     // this.colorStyle[index].background.push('#5FA9EC');
        //     this.colorStyle[index].left.push((this.getDay(this.tableData.beginMinTime, item.beginDate)) * 20);
        //     this.colorStyle[index].width.push((parseInt((this.getDay(item.beginDate, item.endDate)) + 1) * 20));
        //   } else {
        //     // if (!this.colorStyle[index].background) {
        //     //   this.colorStyle[index].background = [];
        //     // }
        //     if (!this.colorStyle[index].left) {
        //       this.colorStyle[index].left = [];
        //     }
        //     if (!this.colorStyle[index].width) {
        //       this.colorStyle[index].width = [];
        //     }
        //     // this.colorStyle[index].background.push('');
        //     this.colorStyle[index].left.push(0)
        //     this.colorStyle[index].width.push(0)
        //   }
        //   if (item.beginDateActual != '' && item.endDateActual != '') {
        //     // if (!this.colorStyle[index].background) {
        //     //   this.colorStyle[index].background = [];
        //     // }
        //     if (!this.colorStyle[index].left) {
        //       this.colorStyle[index].left = [];
        //     }
        //     if (!this.colorStyle[index].width) {
        //       this.colorStyle[index].width = [];
        //     }
        //     // this.colorStyle[index].btn = '已完成';
        //     // this.colorStyle[index].btnClass = 'limegreen';
        //     // this.colorStyle[index].background.push('#F76D43')
        //     this.colorStyle[index].left.push((this.getDay(this.tableData.beginMinTime, item.beginDateActual)) * 20)
        //     this.colorStyle[index].width.push((parseInt((this.getDay(item.beginDateActual, item.endDateActual)) + 1) * 20));

        //   } else {
        //     // if (!this.colorStyle[index].btn) {
        //     //   this.colorStyle[index].btn = '';
        //     // }
        //     // if (!this.colorStyle[index].btnState) {
        //     //   this.colorStyle[index].btnState = [];
        //     // }
        //     // if (!this.colorStyle[index].btnClass) {
        //     //   this.colorStyle[index].btnClass = '';
        //     // }

        //     // //操作按钮状态
        //     // if (item.beginDateActual == '') {
        //     //   this.colorStyle[index].btn = '开始';
        //     //   this.colorStyle[index].btnState=[]
        //     //   this.colorStyle[index].btnState.push(1);
        //     //   this.colorStyle[index].btnClass = '#3A80EC';
        //     // } else if (item.beginDateActual != '' && item.endDateActual == '') {
        //     //   this.colorStyle[index].btn = '结束';
        //     //   this.colorStyle[index].btnState=[]
        //     //   this.colorStyle[index].btnState.push(2);
        //     //   this.colorStyle[index].btnClass = '#F09237';
        //     // } else{
        //     //   this.colorStyle[index].btn = '已完成';
        //     //   this.colorStyle[index].btnClass = 'limegreen';
        //     // }

        //     // if (!this.colorStyle[index].background) {
        //     //   this.colorStyle[index].background = [];
        //     // }
        //     if (!this.colorStyle[index].left) {
        //       this.colorStyle[index].left = [];
        //     }
        //     if (!this.colorStyle[index].width) {
        //       this.colorStyle[index].width = [];
        //     }
        //     // this.colorStyle[index].background.push('')
        //     this.colorStyle[index].left.push(0)
        //     this.colorStyle[index].width.push(0)
        //   }
        // });
        // this.$forceUpdate()
      },
      tableMethod() {
        let _this = this;
        this.$http.post('/api/projectmilestoneplan/selectMilepost', {
          projectId : this.$store.state.projectId
        }).then(res => {
          if(res.data.list.length > 0){
            _this.tableData = res.data;
            _this.dataHandle();
            _this.$forceUpdate();
            _this.btnFlag = res.data.flag;
          }
        }).catch(err => {
          _this.$messageError(err);
        })
      },
      //操作按钮 状态改变
      btnEvent(item,index) {
        this.$http.post('/api/projectmilestoneplan/updateMilestone',{
          type: item.beginDateActual == '' ? 1 : (item.beginDateActual != '' && item.endDateActual == '') ? 2 : 0,
          milestoneId: item.id,  //里程碑ID
          projectId : this.$store.state.projectId
        }).then(res => {
          this.tableMethod();
          // if (this.colorStyle[index].btn == '开始') {
          //   this.colorStyle[index].btn = '结束';
          //   this.colorStyle[index].btnState=[]
          //   this.colorStyle[index].btnState.push(2);
          //   this.colorStyle[index].btnClass = '#F09237';
          //   this.colorStyle[index].background.push('#F76D43')
          // }
          // else if (this.colorStyle[index].btn == '结束'){
          //   this.colorStyle[index].btn = '已完成';
          //   this.colorStyle[index].btnClass = 'limegreen';
          // }
          this.$forceUpdate();
        }).catch(err => {
          this.$messageError(err);
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*  */
  .nav-container {
    border-bottom: 1px solid rgba(236, 236, 236, 1);
    background: #fafafa;
  }

  .titleName {
    font-size: 13px;
    font-weight: 400;
    color: rgba(38, 38, 40, 1);
    padding-right: 10px;
    margin-right: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(38, 38, 40, 1);
    border-right: 2px solid #C8C8C8;
  }

  .chart-container {
    padding: 15px 20px;
    background: #fff;
    .chart-layout {
      display: flex;
      flex-direction: row
    }
  }

  /* 左 */
  .left {
    width: 240px;
    .chart-title {
      width: 240px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      border: 1px solid rgba(243, 243, 243, 1);
      box-sizing: border-box;
    }
    .chart-list-title {
      padding: 10px 15px;
      line-height:25px;
      width: 240px;
      height: 150px;
      border-left: 1px solid rgba(243, 243, 243, 1);
      border-bottom: 1px solid rgba(243, 243, 243, 1);
      box-sizing: border-box;
      .title {
        width: 209px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(106, 106, 106, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
      }
      .dateStyle {
        margin-left:20px;
        font-size: 13px;
        color: rgba(106, 106, 106, 1);
      }
      img{ float:left; margin:5px 5px 0 0;}
    }
  }

  .middle {
    .chart-operation {
      width: 100px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      border: 1px solid rgba(243, 243, 243, 1);
      box-sizing: border-box;
      border-left: 0;
    }
    .operation-container {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 150px;
      border: 1px solid rgba(243, 243, 243, 1);
      box-sizing: border-box;
      border-top: 0;
      .btn {
        display: block;
        width: 58px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        background: red;
      }
    }
  }

  /* 右 */
  .right {
    max-width: 700px; /*  */
    box-sizing: border-box;
    border-right: 1px solid rgba(243, 243, 243, 1);
    border-top: 1px solid rgba(243, 243, 243, 1);
    overflow: auto;
    .right_border{
      border-bottom: 1px solid rgba(243, 243, 243, 1);
      // border-top: 1px solid rgba(243, 243, 243, 1);
      .date-container {
        display: flex;
        flex-direction: row;
        .yearMonth {
          height: 40px;
          box-sizing: border-box;
          line-height: 40px;
          text-align: center;
          // border-top: 1px solid rgba(243, 243, 243, 1);
          border-bottom: 1px solid rgba(243, 243, 243, 1);
          border-right: 1px solid rgba(243, 243, 243, 1);
          font-size: 13px;
          font-weight: 400;
          color: rgba(38, 38, 40, 1);
          &:last-child {
            border-right: 0;
          }
        }
      }
      .m-container {
        display: flex;
        flex-direction: row;
        .m-content {
          max-width:140px;
          min-width: 140px;
          width:140px;
          height: 28px;
          box-sizing: border-box;
          line-height: 28px;
          text-indent: 2px;
          border-right: 1px solid rgba(243, 243, 243, 1);
          font-size: 12px;
          font-weight: 400;
          color: rgba(38, 38, 40, 1);
          &:last-child {
            border-right: 0;
          }
        }
      }
      .line-container {
        height: 150px;
        display: flex;
        flex-direction: column;
        /*border-top: 1px solid rgba(243, 243, 243, 1);*/
        box-sizing: border-box;
        margin-left:-1px;
        .date-line-container {
          position: relative;
          display: flex;
          flex-direction: row;
          .date-line {
            max-width:20px;
            min-width: 20px;
            width:20px;
            height: 75px;
            border-top: 1px solid rgba(243, 243, 243, 1);
            border-left: 1px solid rgba(243, 243, 243, 1);
            // border-bottom: 1px solid rgba(243, 243, 243, 1);
            box-sizing: border-box;
          }
          .color-style {
            position: absolute;
            top: 30px;
            width: 20px;
            height: 12px;
          }
        }
        &:last-child {
          border-top: 0;
        }
      }
    }
  }

  .btnClass {
    padding: 0;
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    border-radius:3px;
  }

  // .rw {
  //   background: #F76D43
  // }

  // .xm {
  //   background: #5FA9EC
  // }

</style>
