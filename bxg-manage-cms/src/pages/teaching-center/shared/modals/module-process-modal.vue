<template>
  <div class="module-process-modal">
    <TableModal
      v-model="isShowModal"
      modal-width="1000"
      :modal-title="modalTitle"
      :table-loading="tableLoading"
      :table-columns="tableColumns"
      :table-data="tableData"
      :search-info="searchInfo"
      :search-schema="searchSchema"
      :page-info="pageInfo"
      @searchHandler="searchHandler"
      @clearSearchHandler="clearSearchHandler"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    />
    
    <VideoProcessModal ref="videoProcessModal"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SimpleTableMixin from '../simple-table/simple-table-mixin'
import TableModal from '../table-modal/table-modal'
import VideoProcessModal from './video-process-modal'

export default {
  components: {
    TableModal,
    VideoProcessModal
  },

  mixins: [SimpleTableMixin],

  computed: {
    ...mapState({
      moduleResult(state) {
        return state.stuCondition.moduleSchedule
      }
    }),

    searchSchema() {
      let searchInfo = this.searchInfo
      let sectionStatusOptions = this.sectionStatusOptions
      let sectionNameOptions = this.sectionNameOptions

      return {
        // 节名称
        sectionIds: {
          name: '节名称',
          type: 'select',
          optionList: sectionNameOptions,
          styles: {
            width: '150px',
            marginRight: '10px'
          }
        },

        // 节状态
        sectionStatus: {
          name: '节状态',
          type: 'select',
          optionList: sectionStatusOptions
        }
      }
    }
  },

  data() {
    return {
      modalTitle: '',
      isShowModal: false,

      tableData: [],

      searchInfo: {
        sectionId: '',
        sectionStatus: ''
      },

      sectionNameOptions: [],

      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  created() {
    this.sectionStatusOptions = [
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
        title: '节名称',
        ellipsis: true,
        key: 'Knob_name',
        render(h, params) {
          let Knob_name = params.row.Knob_name

          return h(
            'span',
            {
              attrs: {
                title: Knob_name
              }
            },
            Knob_name
          )
        }
      },
      {
        title: '视频进度（已完成/视频总量）',
        key: 'Video_plan',
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
                    this.videoPlanClick(params.row)
                  }
                }
              },
              params.row.Video_plan
            )
          ])
        }
      },
      {
        title: '小节测试（正确率）',
        key: 'Knob_test',
        width: 146,
        align: 'right'
      },
      {
        title: '节状态',
        key: 'Knob_status',
        width: 120
      }
    ]
  },

  methods: {
    ...mapActions(['fetchModuleSchedule']),

    showModal(row, passParams) {
      let moduleName = row.currentModuleName
        ? row.currentModuleName
        : row.Module_name
      this.realName = row.realName ? row.realName : passParams.realName

      this.userId = row.userId || passParams.userId
      this.courseId = row.courseId || passParams.courseId
      this.moduleId = row.moduleId || row.id || passParams.moduleId

      this.modalTitle = `模块进度-${moduleName}-${this.realName}`
      this.isShowModal = true

      this.resetSearchInfo()
      this.resetPageInfo()
      this.fetchTableData({
        userId: this.userId,
        courseId: this.courseId,
        moduleId: this.moduleId
      })
    },

    async fetchTableData(params) {
      this.tableLoading = true

      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        this.searchInfo
      )

      await this.fetchModuleSchedule({
        ...params,
        ...searchPageParams
      })

      let moduleResult = this.moduleResult
      this.pageInfo.total = moduleResult.total
      try {
        this._moduleStateD(moduleResult.list)
      } catch (error) {
        console.log(error)
      }

      this.tableLoading = false
    },

    _moduleStateD(moduleResultList) {
      let arr = []
      let arr1 = []
      moduleResultList.forEach(e => {
        let newData = {}
        let moduleData = {}
        if (e.sectionStatus === -1) {
          e.sectionStatus = '未开始'
        } else if (e.sectionStatus === 0) {
          e.sectionStatus = '进行中'
        } else if (e.sectionStatus === 1) {
          e.sectionStatus = '已完成'
        }
        Object.assign(moduleData, {
          value: e.id,
          label: e.sectionName
        })
        Object.assign(newData, {
          id: e.id,
          Knob_name: e.sectionName,
          Video_plan: e.videoProcess,
          Knob_test: e.accuracy,
          Knob_status: e.sectionStatus
        })
        arr.push(newData)
        arr1.push(moduleData)
      })
      this.tableData = arr
      this.sectionNameOptions = arr1
    },

    videoPlanClick(row) {
      this.$refs.videoProcessModal.showModal(row, {
        realName: this.realName,
        userId: this.userId,
        courseId: this.courseId
      })
    },

    search() {
      this.fetchTableData({
        userId: this.userId,
        courseId: this.courseId,
        moduleId: this.moduleId
      })
    }
  }
}
</script>
