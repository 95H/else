<template>
  <div class="phaselock-modal">
    <TableModal
      v-model="isShowModal"
      modal-width="1000"
      :modal-title="modalTitle"
      :table-loading="tableLoading"
      :table-columns="tableColumns"
      :table-data="tableData"
      :page-info="pageInfo"
    >
      <Button type="primary" @click="viewLog">查看操作记录</Button>
    </TableModal>
    
    <LockModal v-model="isShowLockModal" :lock-params="lockParams" :lock-status="lockStatus" @refresh-data="refreshData" />
    <PhaseLockLogModal ref="phaseLockLogModal" />
  </div>
</template>

<script>
import _ from 'lodash'
import SimpleTableMixin from '@/pages/teaching-center/shared/simple-table/simple-table-mixin'
import TableModal from '@/pages/teaching-center/shared/table-modal/table-modal'
import api from '@/api'
import LockModal from './lock-modal'
import PhaseLockLogModal from './phaselock-log-modal'

export default {
  components: {
    TableModal,
    LockModal,
    PhaseLockLogModal
  },

  mixins: [ SimpleTableMixin ],
  
  data() {
    return {
      modalTitle: '',
      isShowModal: false,

      tableData: [],

      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },

      isShowLockModal: false,
      isShowLockLogModal: false,

      lockParams: {},
      lockStatus: ''
    }
  },

  created() {
    let self = this

    this.tableColumns = [
      {
        title: '阶段名称',
        key: 'phaseName',
        align: 'left',
        width: 140
      },
      {
        title: '当前阶段作业',
        key: 'phaseHomeworkName',
        align: 'left',
        width: 140
      },
      {
        title: '作业状态',
        key: 'phaseHomeworkStatus',
        align: 'left',
        width: 100,
        render(h, params) {
          let row = params.row
          let phaseHomeworkStatus = row.phaseHomeworkStatus

          let statusTxt = ''

          if (phaseHomeworkStatus == 0) {
            statusTxt = '待批阅'
          } else if (phaseHomeworkStatus == 1) {
            statusTxt = '通过'
          } else if (phaseHomeworkStatus == -1) {
            statusTxt = '未通过'
          }

          return <span>{statusTxt}</span>
        }
      },
      {
        title: '批阅时间',
        key: 'markTime',
        align: 'right',
        width: 100
      },
      {
        title: '批阅人',
        key: 'markUser',
        align: 'left'
      },
      {
        title: '综合评分',
        key: 'score',
        align: 'right'
      },
      {
        title: '解锁状态',
        key: 'lockStatus',
        align: 'left',
        width: 100,
        render(h, params) {
          let row = params.row
          let lockStatus = row.lockStatus

          let statusTxt = ''
          
          if (lockStatus == 1) {
            statusTxt = '已解锁'
          // lockStatus == 0 || lockStatus == null
          } else {
            statusTxt = '未解锁'
          }

          return <span>{statusTxt}</span>
        }
      },
      {
        title: '操作',
        align: "center",
        fixed: 'right',
        width: 120,
        render(h, params) {
          let row = params.row
          let lockStatus = row.lockStatus
          let noBtn = row.noBtn
          
          // noBtn为0表示没有操作按钮, 为1表示有
          let showButton = noBtn == 0 ? false : true
          
          let Button = 'Button'

          return (
            showButton && <Button type="primary" size="small" onClick={_.partial(self.lockClick, row)}>{lockStatus == 1 ? '锁定' : '解锁'}</Button>
          )
        }
      }
    ]
  },

  methods: {
    showModal(data) {
      this.modalTitle = `阶段锁管理-${data.name}`

      this.isShowModal = true
      this.resetPageInfo()

      this.courseId = data.courseId
      this.userId = data.userId
      this.stuCourseId = data.stuCourseId

      this.fetchTableData({
        courseId: this.courseId,
        userId: this.userId
      })
    },

    async fetchTableData(params) {
      this.tableLoading = true

      await api.getPhaseLock(params)
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.result
          }
        })

      this.tableLoading = false
    },

    lockClick(row) {
      let lockParams = this.lockParams
      
      lockParams.courseId = this.courseId
      lockParams.userId = this.userId
      lockParams.phaseId = row.phaseId
      lockParams.stuCourseId = this.stuCourseId

      // 根据锁定状态判断
      this.lockStatus = row.lockStatus

      this.isShowLockModal = true
    },

    viewLog() {
      this.$refs.phaseLockLogModal.showModal({
        stuCourseId: this.stuCourseId
      })
    },

    refreshData() {
      this.fetchTableData({
        courseId: this.courseId,
        userId: this.userId
      })
    }
  }
}
</script>
