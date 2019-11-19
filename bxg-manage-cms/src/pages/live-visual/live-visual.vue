<template>
  <div class="students_data">
     <Card>
        <h2>{{live_title}}</h2>
          <div class="echarts_box">
              <p class="title">
                <span>直播实际开始于 {{start_time}} - 实际结束于 {{end_time}}</span>
                <span>直播开始人数：{{start_people_num}}人</span>
                <span>最高在线人数：{{max_people_num}}人</span>
                <span>直播结束人数：{{end_people}}人</span>
                <span>平均在线时长：{{average_time}}分钟</span>
              </p>
              <div id="myChart" style="width:4000px;height:350px;"></div>
            </div>
            <Tabs v-model="currentTab">
              <TabPane label="直播详情" name="name1" v-if="hasSomeLiveAccess('resources_lives_statistics_detail')" >
                 <Row>
                  <Col span="24">
                  <Table border :columns="columns1" :data="liveDetails.items"></Table>
                  </Col>
              <Col span="24">
                    <Page placement="top" style="text-align: right;margin:20px 0 10px" 
                   :total="liveDetails.totalCount" 
                   :page-size="pageSize" 
                   @on-change="handleCurrentChange" 
                   @on-page-size-change="handlePageSize"  
                   :current="liveDetails.currentPage" 
                   show-total show-elevator show-sizer></Page>
              </Col>
            </Row>
              </TabPane>
              <TabPane label="用户停留分析" name="name2" v-if="hasSomeLiveAccess('resources_lives_statistics_report')">
              <Row>
                <Col span="24">
                    <Table border :columns="columns2" :data="data2"></Table>
                </Col>
              </Row>
              </TabPane>
          </Tabs>
     </Card>
     <Card class="mt20" v-if="hasSomeLiveAccess('resources_lives_statistics_log')">
       <h2>操作记录</h2>
        <Row>
      <Col span="24">
       <Table style="margin-top: 30px;" border :columns="columns3" :data="liveLog"></Table>
       </Col>
        </Row>
     </Card>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import echarts from "echarts";
export default {
  name: "StudentsData",

  data() {
    const tabMap = {
      'resources_lives_statistics_detail': 'name1',
      'resources_lives_statistics_report': 'name2'
    }

    const tabAccessArr = this.calcApiAccess(Object.keys(tabMap))
    const tabName = tabMap[tabAccessArr[0]]

    return {
      tabName: tabName,
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      live_title: "",
      id: "",
      start_time: "",
      end_time: "",
      start_people_num: 0,
      max_people_num: 0,
      end_people: 0,
      average_time: 0,
      liveDateData: [],
      livePeopleData: [],
      activeBtn: true, //是否选中
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "UID",
          key: "uuid"
        },
        {
          title: "登录账号",
          key: "loginAccount"
        },
        {
          title: "昵称",
          key: "nickName"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "开始时间",
          key: "enterTime"
        },
        {
          title: "退出时间",
          key: "liveTime"
        },
        {
          title: "在线时长(分钟)",
          key: "onlineDuration"
        }
      ],
      data1: [],
      columns2: [
        {
          title: "Web/H5",
          key: "web_h5"
        },
        {
          title: "0~30分钟",
          key: "thirty_minutes"
        },
        {
          title: "31~60分钟",
          key: "sixty_minutes"
        },
        {
          title: "61~90分钟",
          key: "ninety_minutes"
        },
        {
          title: "91~120分钟",
          key: "one_twenty_minutes"
        },
        {
          title: "120分钟以上",
          key: "above_twenty_minutes"
        }
      ],
      data2: [],
      columns3: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "操作记录",
          key: "description"
        },
        {
          title: "操作时间",
          key: "operateTime"
        },
        {
          title: "操作人",
          key: "operator"
        }
      ],
      data3: []
    };
  },
  methods: {
    ...mapActions([
      "fetchLiveDetails",
      "fetchLiveStayAnalysis",
      "fetchDataImaging",
      "fetchBaseData",
      "fetchLiveLog"
    ]),
    handleCurrentChange(num) {
      console.log(num);
      this.currentPage = num;
      this.fetchLiveDetails({
        id: this.id,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    },
    handlePageSize() {
      
    },
    async changeLivebtn() {
      this.activeBtn = true;
      await this.fetchLiveDetails({
        id: this.id,
        currentPage: 1,
        pageSize: 10
      });
      this._initLiveDetails();
    },
    changeUserBtn() {
      this.activeBtn = false;
    },
    async _initState(id) {
      await this.fetchDataImaging({ id }); //202有数据
      this._initDataImg();
      await this.fetchBaseData({ id });
      this._initBaseData();
      await this.fetchLiveDetails({
        id,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this._initLiveDetails();
      await this.fetchLiveStayAnalysis({ id });
      this._initLiveStayAnalysis();
      await this.fetchLiveLog({ id });
      this._initLiveLog();
      await this.drawLine();
    },
    _initDataImg() {
      if (!this.dataImaging) {
        return;
      }
      let arr1 = [];
      let arr2 = [];
      this.dataImaging.forEach(e => {
        arr1.push(e.time.substr(10));
        arr2.push(e.count);
      });
      this.liveDateData = arr1;
      this.livePeopleData = arr2;
    },
    _initLiveLog() {
      let arr = [];
      let newData = {};
      this.liveLog.forEach((e, i) => {
        Object.assign(newData, {
          num: i + 1,
          operation_records: e.description,
          operation_time: e.operateTime,
          operation_people: e.operator
        });
      });
      arr.push(this.liveLog);
      this.data3 = arr;
    },
    _initLiveDetails() {
      let arr = [];
      this.pageTotal = this.liveDetails.items.length;
      this.liveDetails.items.forEach((e, i) => {
        let newData = {};
        Object.assign(newData, {
          num: i + 1,
          uid: e.uuid,
          login: e.loginAccount,
          nickname: e.nickName,
          name: e.name,
          start_time: e.liveTime,
          end_time: e.enterTime,
          online_time: e.onlineDuration
        });
        arr.push(newData);
      });
      this.data1 = arr;
    },
    _initLiveStayAnalysis() {
      let newData = {};
      let arr = [];
      Object.assign(newData, {
        web_h5: this.liveStayAnalysis.client,
        thirty_minutes: this.liveStayAnalysis.interval30,
        sixty_minutes: this.liveStayAnalysis.interval60,
        ninety_minutes: this.liveStayAnalysis.interval90,
        one_twenty_minutes: this.liveStayAnalysis.interval120,
        above_twenty_minutes: this.liveStayAnalysis.interval120Plus
      });
      arr.push(newData);
      this.data2 = arr;
    },
    _initBaseData() {
      //直播基本数据
      this.start_time = this.baseData.startTime;
      this.end_time = this.baseData.endTime;
      this.start_people_num = this.baseData.startCount;
      this.max_people_num = this.baseData.maxConcurrent;
      this.end_people = this.baseData.endCount;
      this.average_time = this.baseData.avgDuration;
      this.live_title = this.baseData.name;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#fff",
        legend: {
          data: ["直播人数"]
        },
        xAxis: {
          boundaryGap: false,
          splitLine: {
            show: true
          },
          axisLabel: {
            margin: 20
          },
          data: this.liveDateData
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          splitLine: {
            show: true
          },
          axisLabel: {
            margin: 10
          }
        },
        series: [
          {
            name: "直播人数",
            type: "line",
            itemStyle: {
              color: "#0a8bcd"
            },
            data: this.livePeopleData
          }
        ],
        axisTick: [
          {
            show: false,
            boundaryGap: true
          }
        ],
        grid: {
          top: "10%",
          left: "1.2%",
          right: "1%",
          bottom: "5%",
          containLabel: true
        },
        tooltip: [
          {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    async pageChange(val) {
      this.currentPage = val;
      await this.fetchLiveDetails({
        id: this.id,
        currentPage: val,
        pageSize: 10
      });
      this._initLiveDetails();
    },
    async pageSizeChange(val) {
      await this.fetchLiveDetails({
        id: this.id,
        currentPage: this.currentPage,
        pageSize: val
      });
      this._initLiveDetails();
    }
  },
  computed: {
    ...mapState({
      liveDetails: state => state.liveku.liveDetails,
      liveStayAnalysis: state => state.liveku.liveStayAnalysis,
      dataImaging: state => state.liveku.dataImaging,
      baseData: state => state.liveku.baseData,
      liveLog: state => state.liveku.liveLog
    })
  },
  watch: {
    $route: {
      handler: async function(val, oldVal) {
        if (this.$route.name === "livevisual_index") {
          this._initState(this.$route.query.liveId);
        }
      }
    }
  },
  mounted() {
    let id = (this.id = this.$route.query.liveId);
    this._initState(id);
  }
};
</script>

<style lang="less" scoped>
.mt20 {
  margin-top: 20px;
}
.students_data {
  padding-bottom: 30px;
  h2 {
    padding-bottom: 10px;
    border-bottom: 1px solid #d7d7d7;
  }
  .echarts_box {
    overflow-x: scroll;
    .title {
      margin: 20px 0;
    }
  }
  .changeBtn_box {
    display: flex;
    position: relative;
    bottom: -1px;
    margin-top: 30px;
    .changeBtn {
      border: 1px solid #d7d7d7;
      width: 87px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
      z-index: 2;
      cursor: pointer;
    }
    .activeBtn {
      background: #fff;
    }
  }
  .table_box {
    .zb_details {
      overflow: hidden;
      border-bottom: 1px solid #d7d7d7;
      padding-bottom: 20px;
      .zb_details_page {
        float: right;
        margin: 20px 0;
      }
    }
  }
}
</style>


