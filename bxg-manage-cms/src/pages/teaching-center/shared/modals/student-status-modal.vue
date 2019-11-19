<template>
  <div class="student-status-modal">
    <TableModal
      v-model="isShowModal"
      modal-width="1000"
      :modal-title="modalTitle"
      :table-loading="tableLoading"
      :table-columns="myStudentsColumns"
      :table-data="myStudentsData"
      :page-info="pageInfo"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    />

    <WholeProcessModal ref="wholeProcessModal"/>
    <ModuleProcessModal ref="moduleProcessModal"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SimpleTableMixin from '../simple-table/simple-table-mixin'
import TableModal from '../table-modal/table-modal'
import WholeProcessModal from './whole-process-modal'
import ModuleProcessModal from './module-process-modal'

export default {
  components: {
    TableModal,
    WholeProcessModal,
    ModuleProcessModal
  },

  mixins: [SimpleTableMixin],

  computed: {
    ...mapState({
      myStudentsData: state => state.myStudents.myStudentsData,
      pageInfo: state => {
        let pageData = state.myStudents.pageData
        let obj = {}
        obj.pageSize = pageData.pageSize
        obj.pageNumber = pageData.pageNum
        obj.total = pageData.total
        return obj
      }
    })
  },

  data() {
    return {
      modalTitle: '',
      isShowModal: false,

      fetchParams: {
        // 由,号连接的id字符串
        stuCourseIds: '',
        menuId: '',
        dataTab: 'DATA',
        typeList: 0
      }
    }
  },

  created() {
    let self = this

    this.myStudentsColumns = [
      {
        title: '序号',
        key: 'Num',
        width: 80,
        align: 'center',
        render: function(h, params) {
          let pageInfo = self.pageInfo
          let pageNumber = pageInfo.pageNumber
          let pageSize = pageInfo.pageSize
          let index = params.index

          return <span>{(pageNumber - 1) * pageSize + index + 1}</span>
        }
      },
      {
        title: 'UID',
        key: 'itcastUUID',
        width: 80,
        align: 'right'
      },
      {
        title: '姓名',
        key: 'realName',
        width: 100
      },
      {
        title: '剩余服务天数',
        key: 'remainServiceDays',
        width: 110,
        align: 'right'
      },
      {
        title: '在本班天数',
        key: 'stayGroupDays',
        width: 100,
        align: 'right'
      },
      {
        title: '整体进度',
        key: 'wholeProcess',
        width: 150,
        render(h, params) {
          const initStateShow = _.partial(self.initStateShow, params.row)

          return (
            <div class="check">
              {params.row.wholeProcess}
              <span class="to-view" {...{ on: { click: initStateShow } }}>
                查看
              </span>
            </div>
          )
        }
      },
      {
        title: '当前视频学习位置',
        key: 'currentVideoPosition',
        width: 340,
        render(h, params) {
          const modulePlanClick = _.partial(self.modulePlanClick, params.row)

          return (
            <div class="check">
              {params.row.currentVideoPosition}
              {params.row.moduleId && (
                <span class="to-view" {...{ on: { click: modulePlanClick } }}>
                  {params.row.currentHomeworkName ? '' : '查看'}
                </span>
              )}
            </div>
          )
        }
      },
      {
        title: `最后一次导师沟通`,
        width: 150,
        render(h, params) {
          let content = params.row.tutorLastContactTime || '-'
          return <span>{content}</span>
        }
      },
      {
        title: `最后一次班主任沟通`,
        width: 150,
        render(h, params) {
          let content = params.row.headTeacherLastContactTime || '-'
          return <span>{content}</span>
        }
      }
    ]

  },

  methods: {
    ...mapActions(['postMyStudents']),

    /**
     *
     * @param params
     *   {
     *     title: 弹窗的标题
     *     courseIds: 课程id由逗号拼接，用于请求参数
     *   }
     */
    showModal(params) {
      this.modalTitle = params.title
      this.fetchParams.menuId = params.menuId
      this.fetchParams.stuCourseIds = params.courseIds
      this.isShowModal = true

      this.resetPageInfo()
      this.fetchStudentsData()
    },

    async fetchStudentsData() {
      let searchPageParams = this.resolveSearchPageParams(this.pageInfo)

      this.tableLoading = true

      await this.postMyStudents({
        ...this.fetchParams,
        ...searchPageParams
      })

      this.tableLoading = false
    },

    initStateShow(row) {
      this.$refs.wholeProcessModal.showModal(row)
    },

    modulePlanClick(row) {
      this.$refs.moduleProcessModal.showModal(row, {
        realName: row.realName,
        userId: row.userId,
        courseId: row.courseId,
        moduleId: row.moduleId
      })
    },

    search() {
      this.fetchStudentsData()
    }
  }
}
</script>

<style lang="less">
.ivu-table-wrapper {
  .to-view {
    margin-left: 20px;
    color: #008bf8;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
