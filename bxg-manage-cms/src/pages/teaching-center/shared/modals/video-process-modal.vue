<template>
  <div class="video-process-modal">
    <TableModal
      v-model="isShowModal"
      modal-width="1000"
      :modal-title="modalTitle"
      :table-loading="tableLoading"
      :table-columns="tableColumns"
      :table-data="tableData"
      :search-schema="searchSchema"
      :search-info="searchInfo"
      :page-info="pageInfo"
      @searchHandler="searchHandler"
      @clearSearchHandler="clearSearchHandler"
      @changePageNumber="changePageNumber"
      @changePageSize="changePageSize"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SimpleTableMixin from '../simple-table/simple-table-mixin'
import TableModal from '../table-modal/table-modal'

export default {
  components: {
    TableModal
  },

  mixins: [SimpleTableMixin],

  computed: {
    ...mapState({
      videoResult: state => state.stuCondition.videoSchedule
    }),

    searchSchema() {
      let videoStatusOptions = this.videoStatusOptions
      let pointIdsOptions = this.pointIdsOptions

      return {
        // 知识点名称
        pointIds: {
          name: '知识点名称',
          type: 'select',
          optionList: pointIdsOptions,
          styles: {
            width: '150px',
            marginRight: '10px'
          }
        },

        // 节状态
        videoStatus: {
          name: '视频状态',
          type: 'select',
          optionList: videoStatusOptions
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
        pointIds: '',
        videoStatus: ''
      },

      pointIdsOptions: [],

      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  created() {
    this.videoStatusOptions = [
      {
        value: -1,
        label: '未开始'
      },
      {
        value: 1,
        label: '进行中'
      },
      {
        value: 2,
        label: '已完成'
      }
    ]

    this.tableColumns = [
      {
        title: '知识点名称',
        ellipsis: true,
        key: 'knowledge_name',
        render(h, params) {
          let knowledge_name = params.row.knowledge_name

          return h(
            'span',
            {
              attrs: {
                title: knowledge_name
              }
            },
            knowledge_name
          )
        }
      },
      {
        title: '视频状态',
        key: 'video_status',
        width: 100
      },
      {
        title: '视频总时长',
        key: 'video_total_time',
        align: 'right',
        width: 100
      },
      {
        title: '最新观看日期',
        key: 'new_watch_date',
        align: 'right',
        width: 150
      },
      {
        title: '观看总时长',
        key: 'watch_total_time',
        align: 'right',
        width: 100
      },
      {
        title: '播放设备',
        key: 'play_facility',
        width: 100
      },
      {
        title: '播放次数',
        key: 'play_num',
        width: 100,
        align: 'right'
      }
    ]
  },

  methods: {
    ...mapActions(['fetchVideoSchedule']),

    showModal(row, passParams) {
      this.userId = passParams.userId
      this.courseId = passParams.courseId
      this.sectionId = row.id

      this.modalTitle = `视频进度-${row.Knob_name}-${passParams.realName}`

      this.isShowModal = true

      this.resetSearchInfo()
      this.resetPageInfo()
      this.fetchTableData()
    },

    async fetchTableData() {
      this.tableLoading = true

      let fetchParams = {
        userId: this.userId,
        courseId: this.courseId,
        sectionId: this.sectionId
      }

      let searchPageParams = this.resolveSearchPageParams(
        this.pageInfo,
        this.searchInfo
      )

      await this.fetchVideoSchedule({
        ...fetchParams,
        ...searchPageParams
      })

      let videoResult = this.videoResult
      this.pageInfo.total = videoResult.total

      try {
        this._videoPlanDis(videoResult.list, true)
      } catch (error) {
        console.log(error)
      }

      this.tableLoading = false
    },

    _videoPlanDis(videoPlanList, isFirst) {
      let arr = []
      let arr1 = []
      videoPlanList.forEach(e => {
        let newDate = {}
        let videoData = {}
        if (e.videoStatus === -1) {
          e.videoStatus = '未开始'
        } else if (e.videoStatus === 1) {
          e.videoStatus = '进行中'
        } else if (e.videoStatus === 2) {
          e.videoStatus = '已完成'
        }
        Object.assign(videoData, {
          value: e.id,
          label: e.pointName
        })
        Object.assign(newDate, {
          id: e.id,
          knowledge_name: e.pointName,
          video_status: e.videoStatus,
          video_total_time: e.totalSize,
          new_watch_date: e.watchTime,
          watch_total_time: e.watchSize,
          play_facility: e.watchDevice,
          play_num: e.watchCount
        })
        arr.push(newDate)
        arr1.push(videoData)
      })
      this.tableData = arr
      this.pointIdsOptions = arr1
    },

    search() {
      this.fetchTableData()
    }
  }
}
</script>
