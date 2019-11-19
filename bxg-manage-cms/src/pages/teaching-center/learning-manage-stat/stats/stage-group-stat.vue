<template>
  <div class="stage-group-stat-container">
    <SimpleTable
      table-height="590"
      :table-columns="columns"
      :table-loading="stageGroupLoading"
      :table-data="stageGroupStats"
      :search-schema="searchSchema"
      :search-info="searchInfo"
      :page-info="pageInfo"
      @searchHandler="searchHandler"
      @clearSearchHandler="clearSearchHandler"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    >
    </SimpleTable>

    <StudentStatusModal ref="studentStatusModal"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import _ from 'lodash'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SimpleTableMixin from '../../shared/simple-table/simple-table-mixin'
import SimpleTable from '../../shared/simple-table/simple-table'
import StudentStatusModal from '../../shared/modals/student-status-modal'

export default {
  components: {
    SimpleTable,
    StudentStatusModal
  },

  mixins: [SimpleTableMixin],

  data() {
    let self = this

    return {
      //
      dateOptions: {},

      searchInfo: {
        // 和后端字段保持一致方便处理
        dateCondition: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      dateList: 'learningStatistics/latestDateList',
      stageGroupLoading: 'learningStatistics/stageGroupLoading',
      stageGroupError: 'learningStatistics/stageGroupError',
      stageGroupStats: 'learningStatistics/stageGroupStats',
      pageInfo: 'learningStatistics/stageGroupPageInfo'
    }),

    searchSchema() {
      let searchInfo = this.searchInfo

      return {
        // 日期
        dateCondition: {
          name: '日期',
          type: 'date',
          props: {
            'start-date': this.startDate,
            placeholder: '请选择日期',
            options: this.dateOptions
          }
        }
      }
    }
  },

  beforeCreate() {
    // iview日期选择控件问题
    // 手动设置默认取昨天的时间
    this.startDate = dayjs()
      .subtract(1, 'days')
      .toDate()
  },

  async created() {
    let self = this

    this.searchInfo.dateCondition = this.startDate

    this.fetchParams = {
      dataType: 3
    }

    const haschakan = this.hasSomeApiAccess('teaching_students_process_data_statistics_groups_latest_details')

    // 表格columns数据
    this.columns = [
      {
        title: '序号',
        key: 'id',
        align: 'center',
        width: 80,
        render(h, params) {
          let pageInfo = self.pageInfo
          let pageNumber = pageInfo.pageNumber
          let pageSize = pageInfo.pageSize

          let index = params.index
          let len = self.stageGroupStats.length

          // 每页最后一条数据
          if (index + 1 == len) {
            return null
          }

          return <span>{(pageNumber - 1) * pageSize + index + 1}</span>
        }
      },
      {
        title: '学科',
        key: 'menuName',
        align: 'left',
        ellipsis: true,
        width: 140,
        render(h, params) {
          let row = params.row
          let menuName = row.menuName

          let index = params.index
          let len = self.stageGroupStats.length

          // 每页最后一条数据
          if (index + 1 == len) {
            return null
          }

          return <span title={menuName}>{menuName}</span>
        }
      },
      {
        title: '阶段名称',
        key: 'stageName',
        align: 'left',
        ellipsis: true,
        width: 200,
        render(h, params) {
          let row = params.row
          let stageName = row.stageName

          let index = params.index
          let len = self.stageGroupStats.length

          // 每页最后一条数据
          if (index + 1 == len) {
            return <span class="col-menu--last">{stageName}</span>
          }

          return <span title={stageName}>{stageName}</span>
        }
      },
      {
        title: '群名称',
        key: 'groupName',
        align: 'left',
        ellipsis: true,
        width: 200,
        render(h, params) {
          let row = params.row
          let groupName = row.groupName

          return <span title={groupName}>{groupName}</span>
        }
      },
      {
        title: '总人数',
        key: 'totalAmount',
        align: 'right',
        width: 120
      },
      {
        title: '休学人数',
        key: 'suspensionAmount',
        align: 'right',
        width: 140,
        render(h, params) {
          let row = params.row
          let suspensionAmount = row.suspensionAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'

          if (suspensionAmount && index + 1 != len) {
            showIcon = true
          }

          return (
            <div class="td-cell">
              <span class="cell-txt">{suspensionAmount}</span>
              {showIcon ? (
                <Icon
                  class="cell-viewicon"
                  type="md-search"
                  size="18"
                  onClick={_.partial(
                    self.suspensionClick,
                    row
                  )}
                />
              ) : null}
            </div>
          )
        }
      },
      {
        title: '失联人数',
        key: 'lossAmount',
        align: 'right',
        width: 140,
        render(h, params) {
          let row = params.row
          let lossAmount = row.lossAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'

          if (lossAmount && index + 1 != len) {
            showIcon = true
          }

          return (
            <div class="td-cell">
              <span class="cell-txt">{lossAmount}</span>
              {showIcon ? (
                <Icon
                  class="cell-viewicon"
                  type="md-search"
                  size="18"
                  onClick={_.partial(
                    self.lossClick,
                    row
                  )}
                />
              ) : null}
            </div>
          )
        }
      },
      {
        title: '学习效果高风险人数',
        key: 'riskEffectAmount',
        align: 'right',
        width: 150,
        render(h, params) {
          let row = params.row
          let normalEffectAmount = row.normalEffectAmount
          let warnEffectAmount = row.warnEffectAmount
          let riskEffectAmount = row.riskEffectAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'
          let Tooltip = 'Tooltip'

          if (index + 1 != len) {
            showIcon = true
          }

          const riskEffectClick = _.partial(self.riskEffectClick, row)
          
          return (
            <div class="td-cell">
              {riskEffectAmount}
              {showIcon ? (
                <Tooltip
                  content="Right Center text"
                  placement="right"
                  theme="light"
                >
                  <Icon class="cell-viewicon" type="md-alert" size="18" />
                  <div slot="content" class="stage">
                    <p class="blue">学习效果高风险评估：</p>
                    <p class="t-d20">
                      正常：{normalEffectAmount}&emsp;人
                    </p>
                    <p class="t-d20">
                      预警：{warnEffectAmount}&emsp;人
                    </p>
                    <p class="t-d20">
                      问题：{riskEffectAmount}&emsp;人
                      { haschakan && (riskEffectAmount ? 
                        <span
                          class="blue look"
                          {...{ on: { click: riskEffectClick } }}
                        >
                          查看
                        </span>
                      : null) }
                    </p>
                  </div>
                </Tooltip>
              ) : null}
            </div>
          )
        }
      },
      {
        title: '学习状态高风险人数',
        key: 'riskStateAmount',
        align: 'right',
        width: 150,
        render(h, params) {
          let row = params.row
          let normalStateAmount = row.normalStateAmount
          let warnStateAmount = row.warnStateAmount
          let riskStateAmount = row.riskStateAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'
          let Tooltip = 'Tooltip'

          if (index + 1 != len) {
            showIcon = true
          }

          const riskStateClick = _.partial(self.riskStateClick, row)
          return (
            <div class="td-cell">
              {riskStateAmount}
              {showIcon ? (
                <Tooltip
                  content="Right Center text"
                  placement="right"
                  theme="light"
                >
                  <Icon class="cell-viewicon" type="md-alert" size="18" />
                  <div slot="content" class="stage">
                    <p class="blue">学习状态高风险评估：</p>
                    <p class="t-d20">
                      正常：{normalStateAmount}&emsp;人
                    </p>
                    <p class="t-d20">
                      预警：{warnStateAmount}&emsp;人
                    </p>
                    <p class="t-d20">
                      问题：{riskStateAmount}&emsp;人
                      { haschakan && (riskStateAmount ?
                        <span
                          class="blue look"
                          {...{ on: { click: riskStateClick } }}
                        >
                          查看
                        </span>
                      : null) }
                    </p>
                  </div>
                </Tooltip>
              ) : null}
            </div>
          )
        }
      },
      {
        title: '超过参考时长人数',
        key: 'overReferenceDayAmount',
        align: 'right',
        width: 150,
        render(h, params) {
          let row = params.row
          let overReferenceDayAmount = params.row.overReferenceDayAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'

          if (overReferenceDayAmount && index + 1 != len) {
            showIcon = true
          }

          return (
            <div class="td-cell">
              <span class="cell-txt">{overReferenceDayAmount}</span>
              {showIcon ? (
                <Icon
                  class="cell-viewicon"
                  type="md-search"
                  size="18"
                  onClick={_.partial(
                    self.overReferenceClick,
                    row
                  )}
                />
              ) : null}
            </div>
          )
        }
      },
      {
        title: '超过最长时长人数',
        key: 'overMaxDayAmount',
        align: 'right',
        width: 150,
        render(h, params) {
          let row = params.row
          let overMaxDayAmount = row.overMaxDayAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'

          if (overMaxDayAmount && index + 1 != len) {
            showIcon = true
          }

          return (
            <div class="td-cell">
              <span class="cell-txt">{overMaxDayAmount}</span>
              {showIcon ? (
                <Icon
                  class="cell-viewicon"
                  type="md-search"
                  size="18"
                  onClick={_.partial(
                    self.overMaxDayClick,
                    row
                  )}
                />
              ) : null}
            </div>
          )
        }
      },
      {
        title: '超过2周班主任无沟通记录人数',
        key: 'teacherNoCommunicationAmount',
        align: 'right',
        width: 200,
        render(h, params) {
          let row = params.row
          let teacherNoCommunicationAmount = row.teacherNoCommunicationAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'

          if (teacherNoCommunicationAmount && index + 1 != len) {
            showIcon = true
          }

          return (
            <div class="td-cell">
              <span class="cell-txt">{teacherNoCommunicationAmount}</span>
              {showIcon ? (
                <Icon
                  class="cell-viewicon"
                  type="md-search"
                  size="18"
                  onClick={_.partial(
                    self.teacherNoCommunicationClick,
                    row
                  )}
                />
              ) : null}
            </div>
          )
        }
      },
      {
        title: '超过2周导师无沟通记录人数',
        key: 'tutorNoCommunicationAmount',
        align: 'right',
        width: 200,
        render(h, params) {
          let row = params.row
          let tutorNoCommunicationAmount = row.tutorNoCommunicationAmount

          let showIcon = false
          let index = params.index
          let len = self.stageGroupStats.length

          let Icon = 'Icon'

          if (tutorNoCommunicationAmount && index + 1 != len) {
            showIcon = true
          }

          return (
            <div class="td-cell">
              <span class="cell-txt">{tutorNoCommunicationAmount}</span>
              {showIcon ? (
                <Icon
                  class="cell-viewicon"
                  type="md-search"
                  size="18"
                  onClick={_.partial(
                    self.tutorNoCommunicationClick,
                    row
                  )}
                />
              ) : null}
            </div>
          )
        }
      }
    ]

    let searchParams = this.preSearch(this.searchInfo)

    try {
      // 获取日期选项列表
      let dateList = await this.fetchDateList()
      let dateSet = new Set(dateList)

      this.dateOptions.disabledDate = date => {
        let dateStr = this.formatDate(date)

        return !dateSet.has(dateStr)
      }
    } catch (e) {
      console.log(e)
    }

    // 获取阶段群汇总数据
    let totalStats = await this.fetchStageGroupTotal({
      ...searchParams,
      ...this.fetchParams
    })
    totalStats.stageName = '汇总'
    this.totalStats = totalStats

    this.search()
  },

  watch: {
    stageGroupError(val) {
      if (val) {
        this.$Message.error('请求出错，请刷新重试')
      }
    }
  },

  methods: {
    ...mapMutations({
      resetState: 'learningStatistics/resetStageGroupState'
    }),

    ...mapActions({
      fetchDateList: 'learningStatistics/fetchLatestDateList',
      fetchStageGroupTotal: 'learningStatistics/fetchStageGroupTotal',
      fetchStageGroupStats: 'learningStatistics/fetchStageGroupStats'
    }),

    preSearch(searchInfo) {
      let dateCondition = this.formatDate(searchInfo.dateCondition)
      return { dateCondition }
    },

    clearSearchHook() {
      this.searchInfo.dateCondition = this.dateList[this.dateList.length - 1]
    },

    resolveParams() {
      let searchInfo = this.preSearch(this.searchInfo)
      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        searchInfo
      )

      return {
        ...searchPageParams,
        ...this.fetchParams
      }
    },

    async search() {
      let params = this.resolveParams()
      await this.fetchStageGroupStats(params)

      this.stageGroupStats.push(this.totalStats)
    },

    showStudentStatusModal(menuId, courseIds, title) {
      this.$refs.studentStatusModal.showModal({ menuId, courseIds, title })
    },

    formatDate(date) {
      if (date) {
        return dayjs(date).format('YYYY-MM-DD')
      }
      return date
    },

    suspensionClick(row) {
      let suspensionIds = row.suspensionIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, suspensionIds, '休学人数')
    },

    lossClick(row) {
      let lossIds = row.lossIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, lossIds, '失联人数')
    },

    riskEffectClick(row) {
      let riskEffectIds = row.riskEffectIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, riskEffectIds, '学习效果高风险人数')
    },

    riskStateClick(row) {
      let riskStateIds = row.riskStateIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, riskStateIds, '学习状态高风险人数')
    },

    overReferenceClick(row) {
      let overReferenceDayIds = row.overReferenceDayIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, overReferenceDayIds, '超过参考时长人数')
    },

    overMaxDayClick(row) {
      let overMaxDayIds = row.overMaxDayIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, overMaxDayIds, '超过最长时长人数')
    },

    teacherNoCommunicationClick(row) {
      let teacherNoCommunicationIds = row.teacherNoCommunicationIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, teacherNoCommunicationIds, '超过2周班主任无沟通记录人数')
    },

    tutorNoCommunicationClick(row) {
      let tutorNoCommunicationIds = row.tutorNoCommunicationIds
      let subjectId = row.subjectId

      this.showStudentStatusModal(subjectId, tutorNoCommunicationIds, '超过2周导师无沟通记录人数')
    }
  }
}
</script>

<style lang="less" scoped>
.stage-group-stat-container {
  /deep/ tr:last-child td:nth-child(-n + 3) {
    border-right: 0;
  }

  /deep/ .col-menu--last {
    position: relative;
    left: -10px;
  }

  /deep/ .td-cell {
    .cell-txt {
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      line-height: 20px;
    }

    .cell-viewicon {
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      color: #2d8cf0;

      &:hover {
        cursor: pointer;
        color: #57a3f3;
      }
    }
  }

  /deep/ .ivu-tooltip-inner .blue {
    color: #2d8cf0;
  }

  /deep/ .ivu-tooltip-inner .t-d20 {
    text-indent: 26px;
  }

  /deep/ .ivu-tooltip-inner .look {
    margin-left: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
