<template>
  <div class="wholeprocess-modal">
    <TableModal
      v-model="isShowModal"
      modal-width="1000"
      :modal-title="modalTitle"
      :table-loading="tableLoading"
      :table-columns="tableColumns"
      :table-data="tableData"
      :search-info="searchInfo"
      :search-schema="searchSchema"
      :pageInfo="pageInfo"
      @searchHandler="searchHandler"
      @clearSearchHandler="clearSearchHandler"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    />

    <ModuleProcessModal ref="moduleProcessModal"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SimpleTableMixin from '../simple-table/simple-table-mixin'
import TableModal from '../table-modal/table-modal'
import ModuleProcessModal from './module-process-modal'

export default {
  components: {
    TableModal,
    ModuleProcessModal
  },

  mixins: [SimpleTableMixin],

  computed: {
    ...mapState({
      expandResult(state) {
        return state.myStudents.processesAll
      }
    }),

    searchSchema() {
      let courseModuleOptions = this.courseModuleOptions

      return {
        // 课程模块
        moduleId: {
          name: '课程模块',
          type: 'select',
          optionList: courseModuleOptions,
          styles: {
            width: '150px',
            marginRight: '10px'
          }
        },

        // 模块状态
        moduleStatus: {
          name: '模块状态',
          type: 'select',
          optionList: this.moduleStatusOptions
        }
      }
    }
  },

  created() {
    this.moduleStatusOptions = [
      {
        value: -1,
        label: '未开始'
      },
      {
        value: 0,
        label: '进行中'
      },
      {
        value: 1,
        label: '已完成'
      }
    ]

    this.tableColumns = [
      {
        title: '序号',
        key: 'Num',
        align: 'center',
        width: 80,
        render: (h, params) => {
          let pageInfo = this.pageInfo

          return h(
            'span',
            params.index + 1 + pageInfo.pageSize * (pageInfo.pageNumber - 1)
          )
        }
      },
      {
        title: '模块名称',
        ellipsis: true,
        key: 'Module_name',
        render(h, params) {
          let Module_name = params.row.Module_name

          return h(
            'span',
            {
              attrs: {
                title: Module_name
              }
            },
            Module_name
          )
        }
      },
      {
        title: '模块进度（已完成/节总量）',
        key: 'Module_plan',
        align: 'right',
        width: 200,
        render: (h, params) => {
          return h('div', [
            h(
              'div',
              {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer'
                },
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modulePlanClick(params.row)
                  }
                }
              },
              params.row.Module_plan
            )
          ])
        }
      },
      {
        title: '模块状态',
        key: 'Module_status',
        width: 120
      }
    ]
  },

  data() {
    return {
      modalTitle: '',
      isShowModal: false,

      tableData: [],

      searchInfo: {
        courseModule: '',
        moduleStatus: ''
      },

      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },

      // 课程模块选项列表
      courseModuleOptions: []
    }
  },

  methods: {
    ...mapActions(['getProcesses']),

    showModal(row = {}) {
      this.realName = row.realName || this.realName 
      this.userId = row.userId || this.userId
      this.courseId = row.courseId || this.courseId
      this.moduleId = row.moduleId || this.moduleId

      // this.currentVideoPosition = row.currentVideoPosition.split('>')[0]

      this.modalTitle = `整体进度-${this.realName}`
      this.isShowModal = true

      this.resetSearchInfo()
      this.resetPageInfo()
      this.fetchTableData(this.userId, this.courseId)
    },

    async fetchTableData(userId, courseId) {
      this.tableLoading = true

      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        this.searchInfo
      )

      await this.getProcesses({
        userId,
        courseId,
        ...searchPageParams
      })

      let expandResult = this.expandResult
      this.pageInfo.total = expandResult.total

      try {
        this._dPlanState(expandResult.list)
      } catch (error) {
        console.log(error)
      }

      this.tableLoading = false
    },

    //
    _dPlanState(expandResultList) {
      let arr = []
      let arr2 = []
      expandResultList.forEach(e => {
        let newData = {}
        let opData = {}
        if (e.moduleStatus == -1) {
          e.moduleStatus = '未开始'
        } else if (e.moduleStatus == 0) {
          e.moduleStatus = '进行中'
        } else if (e.moduleStatus == 1) {
          e.moduleStatus = '已完成'
        }
        Object.assign(opData, {
          value: e.moduleId,
          label: e.moduleName
        })
        Object.assign(newData, {
          id: e.moduleId,
          Module_name: e.moduleName,
          Module_plan: e.moduleProgress,
          Module_status: e.moduleStatus
        })
        arr.push(newData)
        arr2.push(opData)
      })

      this.tableData = arr
      this.courseModuleOptions = arr2
    },

    modulePlanClick(row) {
      this.isShowModuleProcess = true
      this.$nextTick(() => {
        this.$refs.moduleProcessModal.showModal(row, {
          realName: this.realName,
          userId: this.userId,
          courseId: this.courseId,
          moduleId: this.moduleId
        })
      })
    },

    search() {
      this.fetchTableData(this.userId, this.courseId)
    }
  }
}
</script>
