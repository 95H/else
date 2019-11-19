<template>
  <div class="course-student-container">
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
            <Button slot="otherBtn" type="primary" icon="ios-paper-plane-outline" v-if="hasSomeApiAccess('teaching_courses_students_lives_courses_students_data')" @click="exportData">导出</Button>
          </SimpleTable>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import _ from 'lodash'
import SimpleTable from '@/pages/teaching-center/shared/simple-table/simple-table'
import SimpleTableMixin from '@/pages/teaching-center/shared/simple-table/simple-table-mixin'
import { mapGetters, mapActions } from 'vuex'
import api from '@/config/apiconfig'

const math = Math

export default {

  pageInfoKey: {
    pageNumber: 'pageNum'
  },

  components: {
    SimpleTable
  },

  mixins: [ SimpleTableMixin ],

  data() {
    return {
      searchInfo: {
        //学员类型
        studentType: '',
        // 学员检索：用户账号/用户名/UID/昵称
        mark: '',
        // 学籍状态
        stuCourseStatus: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      tableLoading2: 'courseStudents/studentLoading',
      tableData: 'courseStudents/studentData',
      pageInfo: 'courseStudents/studentPageInfo'
    }),

    searchSchema() {
      return {
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
        mark: {
          type: 'input',
          colSpan: '6',
          props: {
            placeholder: '学员UID/昵称/手机号'
          }
        },
        stuCourseStatus: {
          type: 'select',
          colSpan: '6',
          optionList: [
            { value: 1, label: '在读' },
            // { value: -1, label: '休学' },
            { value: 8, label: '退费' }
          ],
          props: {
            placeholder: '学籍状态'
          }
        }
      }
    }
  },

  created() {
    let self = this

    const hasxiangqing = this.hasSomeApiAccess('teaching_courses_students_lives_courses_students_details')

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
        width: 150,
        render(h, params) {
          let type
          if (params.row.studentType === null) {
            type = '内部开通'
          } else if (params.row.studentType === 5) {
            type = '线下转线上'
          } else {
            type = '缴额用户'
          }
          return h('span', type)
        }
      },
      {
        title: 'UID',
        key: 'uid',
        align: 'left',
        width: 100
      },
      {
        title: '昵称',
        key: 'nickName',
        align: 'left',
        width: 120
      },
      {
        title: '手机号',
        key: 'mobile',
        align: 'right',
        width: 120
      },
      {
        title: '报名日期',
        key: 'effeDate',
        align: 'right',
        width: 160
      },
      {
        title: '服务期剩余天数',
        key: 'remainingDays',
        width: 130,
        align: 'right',
      },
      {
        title: '服务截止日期',
        key: 'serviceExpires',
        align: 'right',
        width: 160
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
        title: '直播上课情况',
        align: 'right',
        width: 110,
        render(h, params) {
          let row = params.row
          let liveTotal = row.liveTotal
          let liveViewCount = row.liveViewCount

          return <span>{liveViewCount}/{liveTotal}</span>
        }
      },
      {
        title: '回放观看时长（分钟）',
        key: 'playbackViewTime',
        align: 'right',
        width: 160,
        render(h, params) {
          let row = params.row
          let playbackViewTime = math.round(row.playbackViewTime)

          return <span>{playbackViewTime}</span>
        }
      },
      {
        title: '实际学习进度',
        align: 'right',
        width: 110,
        render() {
          return <span>--</span>
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
            </div>
          )
        }
      }
    ]

    let queryParams = this.$route.query

    this.fetchParams = {
      // 0 就业课, 1 微课, 2 直播课
      courseType: 2,
      courseId: queryParams.courseId
    }

    this.search()
  },

  methods: {
    ...mapActions({
      fetchStudents: 'courseStudents/fetchStudents'
    }),

    exportData() {
      let params = this.resolveParams()

      let paramsStr = _.reduce(params, (result, value, key) => {

        let s = '&'
        if (result === '') {
          s = '?'
        }

        return result + s + key + '=' + value
      }, '')

      window.location.href = `${api.bmfUrl}/export/data${paramsStr}`
    },

    resolveParams() {
      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        this.searchInfo
      )
      return {
        ...searchPageParams,
        ...this.fetchParams
      }
    },

    search() {
      let params = this.resolveParams()

      this.fetchStudents(params)
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
          courseType: 2
        }
      })
    }
  }
}
</script>