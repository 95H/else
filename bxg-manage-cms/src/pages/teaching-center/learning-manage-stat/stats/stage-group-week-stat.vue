<template>
  <div class="stage-group-week-stat-container">
    <SimpleTable
      table-height="580"
      :table-columns="columns"
      :table-loading="tableLoading"
      :table-data="tableData"
      :search-schema="searchSchema"
      :search-info="searchInfo"
      :page-info="pageInfo"
      @searchHandler="searchHandler"
      @clearSearchHandler="clearSearchHandler"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    >
      <!-- <Row slot="header" type="flex" justify="end">
        <Col span="3">
          <Select placeholder="请选择日期范围" v-model="searchInfo.dateRangeCondition">
            <Option v-for="option in dateRangeOptionList" :value="option.value" :key="option.value">{{ option.label }}</Option>
          </Select>
        </Col>
        <Button type="primary" icon="md-search" style="margin-right: 5px; margin-left: 15px;" @click="searchHandler">搜索</Button>
        <Button @click="clearSearchHandler">清除</Button>
      </Row> -->
    </SimpleTable>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import _ from 'lodash'
import { mapState, mapMutations, mapActions } from 'vuex'
import SimpleTableMixin from '../../shared/simple-table/simple-table-mixin'
import SimpleTable from '../../shared/simple-table/simple-table'

export default {
  components: {
    SimpleTable
  },

  computed: {
    ...mapState({
      tableData: state => state.learningStatistics.stageGroupWeekStat.stats,
      weekDateList: state => state.learningStatistics.weekDateList,
      pageInfo: state => state.learningStatistics.stageGroupWeekStat.pageInfo
    }),

    searchSchema() {
      let searchInfo = this.searchInfo
      let weekDateList = this.weekDateList

      return {
        // 日期范围
        dateRangeCondition: {
          name: '日期范围',
          type: 'select',
          colSpan: '6',
          optionList: this.dateRangeOptionList,
          defaultValue: weekDateList[weekDateList.length - 1],
          props: {
            placeholder: '请选择日期范围'
          }
        }
      }
    }
  },

  mixins: [SimpleTableMixin],

  data() {
    return {
      tableLoading: false,

      dateRangeOptionList: [],

      searchInfo: {
        dateRangeCondition: ''
      }
    }
  },

  async created() {
    let self = this

    this.columns = [
      {
        title: '序号',
        key: 'id',
        align: 'center',
        width: 80,
        render(h, params) {
          let pageInfo = self.pageInfo
          return h('span', params.index + 1 + pageInfo.pageSize * (pageInfo.pageNumber - 1))
        }
      },
      {
        title: '学科',
        key: 'mName',
        ellipsis: true,
        width: 140,
        render(h, params) {
          let row = params.row
          let mName = row.mName

          return h('span',
            {
              attrs: {
                title: mName
              }
            }, mName)
        }
      },
      {
        title: '阶段名称',
        key: 'sName',
        ellipsis: true,
        width: 200,
        render(h, params) {
          let row = params.row
          let sName = row.sName

          return h('span',
            {
              attrs: {
                title: sName
              }
            }, sName)
        }
      },
      {
        title: '群名称',
        key: 'gName',
        ellipsis: true,
        width: 200,
        render(h, params) {
          let row = params.row
          let gName = row.gName

          return h('span',
            {
              attrs: {
                title: gName
              }
            }, gName)
        }
      },
      {
        title: '群学员数据',
        align: 'center',
        children: [
          {
            title: '开始人数（周一）',
            key: 'groupStartAmount',
            align: 'right',
            width: 136
          },
          {
            title: '结束人数（周日）',
            key: 'groupEndAmount',
            align: 'right',
            width: 136
          },
          {
            title: '入群人数',
            key: 'groupJoinAmount',
            align: 'right',
            width: 120
          },
          {
            title: '晋级人数',
            key: 'groupPromotionAmount',
            align: 'right',
            width: 120
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
            align: 'right',
            width: 146
          },
          {
            title: '班主任沟通记录次数',
            key: 'teacherCommunicationAmount',
            align: 'right',
            width: 146
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
            align: 'right',
            width: 120
          },
          {
            title: '未学习人数',
            key: 'videoNoStudyAmount',
            align: 'right',
            width: 120
          },
          {
            title: '人均学习视频数',
            key: 'videoAverageAmount',
            align: 'right',
            width: 136
          },
          {
            title: '人均学习视频时长（小时）',
            key: 'videoAverageTime',
            align: 'right',
            width: 188
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
            align: 'right',
            width: 120
          },
          {
            title: '参与人数',
            key: 'liveJoinAmount',
            align: 'right',
            width: 120
          },
          {
            title: '人均参与时长',
            key: 'liveJoinAverageTime',
            align: 'right',
            width: 120
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
            align: 'right',
            width: 120
          },
          {
            title: '提问人数',
            key: 'askAmount',
            align: 'right',
            width: 120
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
            align: 'right',
            width: 120
          },
          {
            title: '写笔记人数',
            key: 'notesAmount',
            align: 'right',
            width: 120
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
            align: 'right',
            width: 120
          },
          {
            title: '小节测试人数',
            key: 'sectionTestAmount',
            align: 'right',
            width: 120
          }
        ]
      }
    ]

    await this.fetchWeekDateList()

    let weekDateList = this.weekDateList

    _.reduce(
      weekDateList,
      (optionList, value, key) => {
        optionList.push({ value: value, label: value })
        return optionList
      },
      this.dateRangeOptionList
    )

    this.searchInfo.dateRangeCondition = weekDateList[weekDateList.length - 1]

    this.fetchTableData()
  },

  beforeDestroy() {
    this.resetState()
  },

  methods: {
    ...mapMutations({
      resetState: 'learningStatistics/resetStageGroupWeekState'
    }),

    ...mapActions({
      fetchWeekStageGroupStats: 'learningStatistics/fetchWeekStageGroupStats',
      fetchWeekDateList: 'learningStatistics/fetchWeekDateList'
    }),

    async fetchTableData() {
      this.tableLoading = true

      let params = this.resolveParams()

      await this.fetchWeekStageGroupStats(params)

      this.tableLoading = false
    },

    preSearch(searchInfo) {
      let dateRangeCondition = this.searchInfo.dateRangeCondition

      let dateRangeArr = dateRangeCondition.split('~')
      let previousDate = dateRangeArr[0]
      let laterDate = dateRangeArr[1]

      return { previousDate, laterDate }
    },

    resolveParams() {
      let searchInfo = this.preSearch(this.searchInfo)

      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        searchInfo
      )

      return searchPageParams
    },

    clearSearchHook() {
      let weekDateList = this.weekDateList
      this.searchInfo.dateRangeCondition = weekDateList[weekDateList.length - 1]
    },

    search() {
      this.fetchTableData()
    }
  }
}
</script>
