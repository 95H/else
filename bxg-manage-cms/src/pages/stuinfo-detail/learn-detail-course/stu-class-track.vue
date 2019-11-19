<template>
  <div class="track">
    <div
      style="width:100%;"
    >
      <div class="date_box">
        <DatePicker @on-change="startDate" :options="startTimeOption" class="d_piker" type="date" placeholder="开始日期" v-model="start_date" style="width: 200px"></DatePicker>
        <span>至</span>
        <DatePicker @on-change="endDate"  :options="endTimeOption" class="d_piker" type="date" placeholder="结束日期" v-model="end_date" style="width: 200px"></DatePicker>
        <Button @click="searchClick" class="searchBtn" type="primary" icon="ios-search"></Button>
        <Button @click="clearSearchClick" class="clearBtn" type="primary">清除</Button>
      </div>
      <div id="table-stage-list">
        <Table class="module_table" :height="baseHeight" border :loading="loading" :columns="columns1" :data="data1"></Table>
        <div class="module_page_box">
          <Page placement="top"
            class="module_page"
            show-elevator
            show-sizer
            :total="total"
            :current="current"
            @on-page-size-change="modulePageSizeChange"
            @on-change="modulePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import util from '@/util/util'
export default {
  name: 'stuClassTrack',
  data() {
    return {
      baseHeight: 0,
      loading: true,
      current:1,
      total: 100,
      columns1: [
        {
          title: '日期',
          key: 'Date',
          width:120,
          align:"right",
        },
        {
          title: '剩余服务（天）',
          key: 'Surplus_serve',
          width:150,
          align:"right",
        },
        {
          title: '整体进度',
          key: 'Entirety_plan',
          width:120,
          align:"right",
        },
        {
          title: '学习位置',
          key: 'Study_location',
        },
        {
          title: '昨日学习位置',
          key: 'Yesday_location'
        },
        {
          title: '视频学习',
          key: 'Video_study'
        },
        {
          title: '小节测试&阶段作业',
          key: 'Knobble_test',
          type: 'html'
        },
        {
          title: '直播串讲',
          key: 'Construe'
        }
      ],
      data1: [],
      start_date: '',
      end_date: '',
      pageSize: 10,
      startTimeOption: {},
      endTimeOption: {},
      
    }
  },
  methods: {
    
    ...mapActions([
      "fetchStudyTrack"
    ]),
    async clearSearchClick() {
      let uInfo = this.$route.query
      this.start_date = ""
      this.end_date = ""
      this.startTimeOption = {}
      this.endTimeOption = {}
      await this.fetchStudyTrack({
        courseId: uInfo.courseId,
        studentId: uInfo.userId
      })
      let trackResult = this.$store.state.stuCondition.studyTrack
      try {
        this._dState(trackResult)
      } catch (error) {
        console.log(error)
      }
    },
    async _initState() {
      let uInfo = this.$route.query
      await this.fetchStudyTrack({
        courseId: uInfo.courseId,
        studentId: uInfo.userId
      })
      let trackResult = this.$store.state.stuCondition.studyTrack
      this.loading = trackResult ? false : true
      this.total = trackResult.total
      
      try {
        this._dState(trackResult)
      } catch (error) {
        console.log(error)
      }
    },
    _dState(trackResult) {
      let arr = []
      trackResult.list.forEach(e => {
        let newDate = {}
        Object.assign(newDate, {
          Date: e.date,
          Surplus_serve: e.remainingDays,
          Entirety_plan: e.process,
          Study_location: e.position,
          Yesday_location: e.yestodayPosition,
          Video_study: e.learnedVideos,
          Knobble_test: e.paperDesc,
          Construe: e.liveDesc
        })
        arr.push(newDate)
      })
      this.data1 = arr
    },
    async searchClick() {
      let uInfo = this.$route.query
      await this.fetchStudyTrack({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        startTime: this.start_date,
        endTime: this.end_date
      })
      let trackResult = this.$store.state.stuCondition.studyTrack
      this.total = trackResult.total
      try {
        this._dState(trackResult)
      } catch (error) {
        console.log(error)
      }
    },
    startDate(start_date, type) {
      this.endTimeOption = {
        disabledDate(end_date) {
          return end_date < new Date(start_date)
        }
      }
    },
    endDate(end_date, type) {
      this.startTimeOption = {
        disabledDate(start_date) {
          return start_date > new Date(end_date)
        }
      }
    },
    //页码改变
    async modulePageChange(page) {
      let uInfo = this.$route.query
      this.current=page;
      await this.fetchStudyTrack({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        pageNumber: page
      })
      let trackResult = this.$store.state.stuCondition.studyTrack
      try {
        this._dState(trackResult)
      } catch (error) {
        console.log(error)
      }
    },
    //显示条数改变
    async modulePageSizeChange(pageSize) {
      let uInfo = this.$route.query
      this.pageSize = pageSize
      await this.fetchStudyTrack({
        courseId: uInfo.courseId,
        studentId: uInfo.userId,
        pageNumber: 1,
        pageSize: pageSize
      })
      let trackResult = this.$store.state.stuCondition.studyTrack
      try {
        this._dState(trackResult)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this._initState()
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })


    this.start_date = ''
    this.end_date = ''
    this.startDate(this.start_date)
    this.endDate(this.end_date)

  },
  computed: {
    ...mapState({
      studyTrack: state => state.stuCondition.studyTrack,
    })
  },
}
</script>

<style lang="less" scoped>
.track{
  .date_box{
    display: flex;
    justify-content: flex-end;
    .d_piker+.d_piker{
      margin-left: 10px;
    }
    span{
      display: block;
      margin:0 5px;
      line-height: 32px;
    }
  }
  .module_table{
    margin-top: 20px;
  }
  .module_page_box{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
//iview
.track /deep/ .ivu-btn-icon-only{
  font-size: 18px;
  margin-top: 1px;
  height: 30px;
  padding: 0 8px 0;
  margin-left: 10px;
}
.clearBtn{
  height: 30px;
  margin-top: 2px;
  margin-left: 10px;
}
</style>


