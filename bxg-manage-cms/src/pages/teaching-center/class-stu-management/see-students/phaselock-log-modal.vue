<template>
  <div class="phaselock-modal">
    <TableModal
      v-model="isShowModal"
      modal-width="1000"
      modal-title="操作记录"
      :table-columns="tableColumns"
      :table-data="tableData"
      :page-info="pageInfo"
    >
    </TableModal>
  </div>
</template>

<script>
import SimpleTableMixin from '@/pages/teaching-center/shared/simple-table/simple-table-mixin'
import TableModal from '@/pages/teaching-center/shared/table-modal/table-modal'
import api from '@/api'

export default {
  components: {
    TableModal
  },

  mixins: [ SimpleTableMixin ],

  data() {
    return {
      isShowModal: false,

      tableData: [],

      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  created() {
    this.tableColumns = [
      {
        title: '操作时间',
        key: 'createTime',
        align: 'right',
        width: 140
      },
      {
        title: '操作人',
        key: 'operator',
        align: 'left',
        width: 120
      },
      {
        title: '操作内容',
        key: 'desc',
        align: 'left'
      },
      {
        title: '原因',
        key: 'reason',
        align: 'left'
      }
    ]
  },

  methods: {
    showModal(data) {
      this.resetPageInfo()

      this.isShowModal = true

      this.fetchTableData(data)
    },

    async fetchTableData(params) {
      this.tableLoading = true
      
      await api.getPhaseLockLog(params)
        .then(res => {
          if (res.status == 200) {
            let result = res.result
            this.tableData = result.list
            this.pageInfo.total = result.total
          }
        })

      this.tableLoading = false
    }
  }
}
</script>
