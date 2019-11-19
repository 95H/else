<template>
  <div class="latest-statistics-wrap">
    <Row :gutter="10" type="flex">
      <Col span="4">
        <Select placeholder="起止日期"  style="width:100%" v-model="fetch_params.days">
          <Option v-for="(item,index) in dateList" :value="item" :key="index">{{ item }}</Option>
        </Select>
      </Col>
      <Col>
        <Button @click="serchInfo" type="primary" icon="ios-search">搜索</Button>
      </Col>
      <Col>
        <Button @click="clearInfo">清除</Button>
      </Col>
    </Row>
    <Row style="margin-top:20px;" id="table-stage-list">
      <Col span="24">
        <Table :height="baseHeight" border :loading="statistics_loading" :columns="statistics_tit" :data="statistics_list"></Table>
      </Col>
      <Col style="margin-top:20px;" span="24">
        <Page style="text-align: right; padding-bottom: 1px"
              :total="page_list.total"
              :current="fetch_params.pageNumber"
              :page-size="fetch_params.pageSize"
              :page-size-opts="arrPage"
              @on-change="changeCurrent"
              @on-page-size-change="changePageSize"
              :transfer="true"
              show-total show-elevator show-sizer>
        </Page>
      </Col>
    </Row>
  </div>
</template>

<script>
import api from '@/api/index'
import util from '@/util/util'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    type: Number
  },
  data() {
    return {
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      statistics_loading: true,
      dateList :[],
      defaultWeek: '',
      monday_time: null,
      sunday_time: null,
      fetch_params: {
        pageNumber: 1,
        pageSize: 10
      },
      //表格title
      statistics_tit: [
        {
          title: '序号',
          key: 'Num',
          align: 'center',
          width: 70,
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.fetch_params.pageSize * (this.fetch_params.pageNumber - 1)
            )
          }
        },
        {
          title: '学科',
          key: 'mName',
          width: 150,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.mName}>{params.row.mName}</span>
          }
        },
        {
          title: '群名称',
          key: 'gName',
          width: 150,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.gName}>{params.row.gName}</span>
          }
        },
        {
          title: '群学员数据',
          align: 'center',
          children: [
            {
              title: '开始人数（周一）',
              key: 'groupStartAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '结束人数（周日）',
              key: 'groupEndAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '入群人数',
              key: 'groupJoinAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '晋级人数',
              key: 'groupPromotionAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            }
          ]
        },
        {
          title: '老师沟通数据',
          align: 'center',
          children: [
            {
              title: '导师沟通记录次数',
              key: 'tutorCommunicationAmount',
              align: 'center',
              width: 150,
              align: 'right',
              ellipsis: true
            },
            {
              title: '班主任沟通记录次数',
              key: 'teacherCommunicationAmount',
              align: 'center',
              width: 150,
              align: 'right',
              ellipsis: true
            }
          ]
        },
        {
          title: '录播课程活跃度',
          align: 'center',
          children: [
            {
              title: '视频学习人数',
              key: 'videoStudyAmount',
              align: 'center',
              width: 125,
              align: 'right',
              ellipsis: true
            },
            {
              title: '未学习人数',
              key: 'videoNoStudyAmount',
              align: 'center',
              width: 125,
              align: 'right',
              ellipsis: true
            },
            {
              title: '人均学习视频数',
              key: 'videoAverageAmount',
              align: 'center',
              width: 125,
              align: 'right',
              ellipsis: true
            },
            {
              title: '人均学习视频时长（小时）',
              key: 'videoAverageTime',
              align: 'center',
              width: 125,
              align: 'right',
              ellipsis: true
            }
          ]
        },
        {
          title: '直播课程活跃度',
          align: 'center',
          children: [
            {
              title: '参与人次',
              key: 'liveJoinPersonTime',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '参与人数',
              key: 'liveJoinAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '人均参与时长',
              key: 'liveJoinAverageTime',
              align: 'center',
              width: 120,
              align: 'right',
              ellipsis: true
            }
          ]
        },
        {
          title: '问答精灵活跃度',
          align: 'center',
          children: [
            {
              title: '提问总次数',
              key: 'askTotalAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '提问人数',
              key: 'askAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            }
          ]
        },
        {
          title: '学习笔记活跃度',
          align: 'center',
          children: [
            {
              title: '笔记总数量',
              key: 'notesTotalAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            },
            {
              title: '写笔记人数',
              key: 'notesAmount',
              align: 'center',
              width: 100,
              align: 'right',
              ellipsis: true
            }
          ]
        },
        {
          title: '小节测试活跃度',
          align: 'center',
          children: [
            {
              title: '小节测试人次',
              key: 'sectionTestPersonTime',
              align: 'center',
              width: 110,
              align: 'right',
              ellipsis: true
            },
            {
              title: '小节测试人数',
              key: 'sectionTestAmount',
              align: 'center',
              width: 110,
              align: 'right',
              ellipsis: true
            }
          ]
        }
      ]
    }
  },
  created() {
    this.fetchDates();
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  computed: {
    ...mapState({
      page_list: state => state.weekStatistics.page_data,
      statistics_list: state => state.weekStatistics.statistics_data
    })
  },
  methods: {
    ...mapActions([
      'getWeekStatistics'
    ]),
    //获取日期数据
    async fetchDates(){
      let res = await api.getDates()
      if(res.status===200){
        this.dateList = res.result;
        let week = this.dateList[this.dateList.length-1];
        this.defaultWeek = week;
        this.fetch_params.days = week;
        this.monday_time = week.split('~')[0];
        this.sunday_time = week.split('~')[1];
      } else{
        return
      }
      this.fecthWeekStatistics();
    },
    //获取周统计数据列表
    async fecthWeekStatistics() {
      await this.getWeekStatistics({
        type: this.type,
        previousDate: this.monday_time,
        laterDate: this.sunday_time,
        pageNumber:this.fetch_params.pageNumber,
        pageSize:this.fetch_params.pageSize
      })
      this.statistics_loading = false;
    },
    //根据条件查询列表
    serchInfo() {
      this.fetch_params.pageNumber = 1
      this.getWeekStatistics({
        type: this.type,
        previousDate: this.fetch_params.days.split('~')[0] || this.monday_time,
        laterDate: this.fetch_params.days.split('~')[1] || this.sunday_time,
        pageNumber: 1,
        pageSize: this.fetch_params.pageSize
      })
    },
    //清除周列表查询条件
    clearInfo() {
      this.fetch_params.pageNumber = 1;
      this.fetch_params.days = this.defaultWeek;
      this.getWeekStatistics({
        type: this.type,
        previousDate: this.monday_time,
        laterDate: this.sunday_time,
        pageNumber: this.fetch_params.pageNumber,
        pageSize: this.fetch_params.pageSize
      })
    },
    //翻页
    changeCurrent(num) {
      this.fetch_params.pageNumber = num
      let obj = {
        type: this.type,
        previousDate: this.fetch_params.days.split('~')[0] || this.monday_time,
        laterDate: this.fetch_params.days.split('~')[1] || this.sunday_time,
        pageNumber: this.fetch_params.pageNumber,
        pageSize: this.fetch_params.pageSize
      }
      this.getWeekStatistics(obj)
    },
    //改变每页条数
    changePageSize(size) {
      this.fetch_params.pageSize = size
      let obj = {
        type: this.type,
        previousDate: this.fetch_params.days.split('~')[0] || this.monday_time,
        laterDate: this.fetch_params.days.split('~')[1] || this.sunday_time,
        pageNumber: 1,
        pageSize: this.fetch_params.pageSize
      }
      this.getWeekStatistics(obj)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
