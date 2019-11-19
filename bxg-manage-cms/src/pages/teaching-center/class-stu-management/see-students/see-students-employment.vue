<template>
  <div class="student-micro-container">
    <Row>
      <Col span="24">
        <Card>
          <SimpleTable
            table-height="500"
            :table-loading="tableLoading2"
            :table-columns="tableColumns"
            :table-data="tableData"
            :search-schema="searchSchema"
            :search-info="searchInfo"
            :page-info="pageInfo"
            @searchHandler="searchHandler"
            @clearSearchHandler="clearSearchHandler"
            @changePageNumber="changePageNumber"
            @changePageSize="changePageSize"
          >
          </SimpleTable>
        </Card>
      </Col>
    </Row>

    <WholeProcessModal ref="wholeprocess" />
    <ModuleProcessModal ref="moduleprocess" />

    <PhaseLockModal ref="phaselock" />
  </div>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import SimpleTable from '@/pages/teaching-center/shared/simple-table/simple-table'
import SimpleTableMixin from '@/pages/teaching-center/shared/simple-table/simple-table-mixin'
import { mapState, mapGetters, mapActions } from 'vuex'
import WholeProcessModal from '../../shared/modals/whole-process-modal'
import ModuleProcessModal from '../../shared/modals/module-process-modal'
import PhaseLockModal from './phaselock-modal'

export default {

  pageInfoKey: {
    pageNumber: 'pageNum'
  },

  components: {
    SimpleTable,
    WholeProcessModal,
    ModuleProcessModal,
    PhaseLockModal
  },

  mixins: [ SimpleTableMixin ],

  data() {
    return {
      searchInfo: {
        // 阶段Id
        phaseIds: '',
        // 模块Id
        moduleIds: '',
        // 班级Id
        gradeIds: '',
        // 学籍状态
        stuCourseStatus: '',
        // 学员检索：用户账号/用户名/UID/昵称
        mark: '',
        //
        dateCondition: '',
        //学员类型
        studentType: ''
      }
    }
  },

  computed: {
    ...mapState({
      phaseList(state) {
        return state.courseStudents.phaseList
      },

      courseModuleList(state) {
        return state.courseStudents.courseModuleList
      },

      classList(state) {
        return state.courseStudents.classList
      }
    }),

    ...mapGetters({
      tableLoading2: 'courseStudents/studentLoading',
      tableData: 'courseStudents/studentData',
      pageInfo: 'courseStudents/studentPageInfo'
    }),

    searchSchema() {
      let searchInfo = this.searchInfo
      let phaseList = this.phaseList
      let courseModuleList = this.courseModuleList
      let classList = this.classList

      return {
        phaseIds: {
          type: 'select',
          colSpan: '6',
          optionList: phaseList,
          props: {
            placeholder: '请选择课程阶段'
          }
        },
        moduleIds: {
          type: 'select',
          colSpan: '6',
          optionList: courseModuleList,
          props: {
            placeholder: '请选择课程模块'
          }
        },
        gradeIds: {
          type: 'select',
          colSpan: '6',
          optionList: classList,
          props: {
            placeholder: '请选择课程班级'
          }
        },
        stuCourseStatus: {
          type: 'select',
          colSpan: '6',
          optionList: [
            { value: 1, label: '在读' },
            { value: -1, label: '休学' },
            { value: 8, label: '退费' }
          ],
          props: {
            placeholder: '请选择学籍状态'
          }
        },

        dateCondition: {
          type: 'daterange',
          colSpan: '6',
          props: {
            placeholder: '课程生效时间'
          }
        },

        mark: {
          type: 'input',
          colSpan: '6',
          props: {
            placeholder: '用户账号/用户名/用户UUID'
          }
        },

        studentType: {
          type: 'select',
          colSpan: '6',
          props: {
            placeholder: '学员类型'
          },
          optionList: [
            { value: 0, label: '内部开通' },
            { value: 5, label: '线下转线上' },
            { value: 2, label: '缴额用户' }
          ],
        },
      }
    }
  },

  created() {
    let self = this

    const hasweizhi = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_modules_processes')
    const hasjindu = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_processes')
    const hasxiangqing = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details')
    const hasjieduansuo = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_phases')

    this.tableColumns = [
      {
        title: '序号',
        key: 'id',
        align: 'center',
        width: 60,
        render(h, params) {
          let pageInfo = self.pageInfo
          return h('span', params.index + 1 + pageInfo.pageSize * (pageInfo.pageNumber - 1))
        }
      },
      {
        title: '学员类型',
        key: 'studentType',
        align: 'left',
        width: 100,
        render(h, params) {
          let studentTypeTxt = ''
          let studentType = params.row.studentType

          if (studentType === null) {
            studentTypeTxt = '内部开通'
          } else if (studentType === 5) {
            studentTypeTxt = '线下转线上'
          } else {
            studentTypeTxt = '缴额用户'
          }
          return <span>{studentTypeTxt}</span>
        }
      },
      {
        title: 'UID',
        key: 'uid',
        align: 'right',
        width: 80
      },
      {
        title: '姓名',
        key: 'name',
        align: 'left',
        width: 120
      },
      {
        title: '课程生效时间',
        key: 'effeDate',
        align: 'right',
        width: 150
      },
      {
        title: '剩余服务（天）',
        key: 'remainingDays',
        align: 'right',
        width: 130
      },
      {
        title: '服务截止日期',
        key: 'serviceExpires',
        align: 'right',
        width: 150
      },
      {
        title: '学习天数',
        key: 'learnedDays',
        align: 'right',
        width: 100
      },
      {
        title: '学籍状态',
        key: 'stuCourseStatus',
        align: 'left',
        width: 100,
        render(h, params) {
          let statusTxt = ''
          let stuCourseStatus = params.row.stuCourseStatus

          if (stuCourseStatus == 1) {
            statusTxt = '在读'
          } else if (stuCourseStatus == -1) {
            statusTxt = '休学'
          } else if (stuCourseStatus == 8) {
            statusTxt = '退费'
          }

          return <span>{statusTxt}</span>
        }
      },
      {
        title: '整体进度',
        key: 'totalProgress',
        align: 'right',
        width: 120,
        render(h, params) {
          let row = params.row
          let totalProgress = row.totalProgress

          let Icon = 'Icon'

          return (
            <div class="td-cell">
              <span class="cell-txt">{totalProgress}%</span>
              {hasjindu && <span class="to-view" onClick={_.partial(self.viewWholeProcess, row)}>查看</span>}
            </div>
          )
        }
      },
      {
        title: '当前学习位置（模块：已完成/总节）',
        key: 'currentLearnPosition',
        align: 'left',
        width: 260,
        render(h, params) {
          let row = params.row
          // 没试卷才可以查看
          let currentHomeworkName  = row.currentHomeworkName
          let currentLearnPosition = row.currentLearnPosition

          return (
            <div class="td-cell">
              <span class="cell-txt">{currentLearnPosition}</span>
              { hasweizhi && (currentHomeworkName == null &&
                <span class="to-view" onClick={_.partial(self.viewModuleProcess, row)}>查看</span>)
              }
            </div>
          )
        }
      },
      {
        title: "操作",
        key: "action",
        align: "center",
        fixed: 'right',
        width: 200,
        render(h, params) {
          let Button = 'Button'
          let row = params.row

          return (
            <div>
              {hasxiangqing && <Button type="primary" size="small" style="margin-right: 10px;" onClick={_.partial(self.learnDetailClick, row)}>学习详情</Button>}
              {hasjieduansuo && <Button type="primary" size="small" onClick={_.partial(self.phaseLockClick, row)}>阶段锁管理</Button>}
            </div>
          )
        }
      },
    ]

    let queryParams = this.$route.query

    this.fetchParams = {
      // 0 就业课, 1 微课
      courseType: queryParams.courseType,
      courseId: queryParams.courseId
    }

    this.fetchConditionList({ courseId: queryParams.courseId })

    this.search()
  },

  methods: {
    ...mapActions({
      fetchStudents: 'courseStudents/fetchStudents',
      fetchConditionList: 'courseStudents/fetchConditionList'
    }),

    formatDate(date) {
      if (date) {
        return dayjs(date).format('YYYY-MM-DD')
      }
      return date
    },

    resolveParams() {
      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        _.omit(this.searchInfo, 'dateCondition')
      )
      
      let params = {
        ...searchPageParams,
        ...this.fetchParams
      }

      let dateCondition = this.searchInfo.dateCondition

      if (dateCondition) {
        let startDate = this.formatDate(dateCondition[0])
        let endDate = this.formatDate(dateCondition[1])

        _.assign(params, {
          startDate,
          endDate
        })
      }

      return params
    },

    search() {
      let params = this.resolveParams()
      
      this.fetchStudents(params)
    },

    viewWholeProcess(row) {
      let data = {
        realName: row.name,
        userId: row.userId,
        courseId: row.courseId,
        moduleId: row.currentModuleId
      }

      this.$refs.wholeprocess.showModal(data)
    },

    viewModuleProcess(row) {
      let data = {
        realName: row.name,
        userId: row.userId,
        courseId: row.courseId,
        moduleId: row.currentModuleId,
        currentModuleName: row.currentModuleName
      }

      this.$refs.moduleprocess.showModal(data)
    },

    learnDetailClick(row) {
      let courseId = row.courseId
      let stuCourseId = row.stuCourseId
      let userId = row.userId

      this.$router.push({
        name: 'stuinfo_detail',
        query: {
          courseId: courseId,
          userId: userId,
          stuCourseId: stuCourseId,
          from: 'class-stu-manage_employment_see-students'
        }
      })
    },

    phaseLockClick(row) {
      this.$refs.phaselock.showModal({
        courseId: row.courseId,
        userId: row.userId,
        stuCourseId: row.stuCourseId,
        name: row.name
      })
    }
  }
}
</script>

<style lang="less" scoped>
.student-employment-container {
  /deep/ .ivu-table-wrapper {
    .td-cell {
      display: flex;
      width: 100%;
      white-space: nowrap;
    }

    .cell-txt {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      // white-space: nowrap;
    }

    .to-view {
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      color: #008bf8;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
