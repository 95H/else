<template>
  <div class="table-modal">
    <SimpleModal :title="modalTitle" :width="modalWidth" v-model="isShowModal">
      <slot></slot>
      <SimpleTable
        :table-columns="tableColumns"
        :table-loading="tableLoading"
        :table-data="tableData"
        :table-height="tableHeight"
        :search-info="searchInfo"
        :search-schema="searchSchema"
        :page-info="pageInfo"
        :isShowPageElevator="false"
        @searchHandler="searchHandler"
        @clearSearchHandler="clearSearchHandler"
        @changePageNumber="changePageNumber"
        @changePageSize="changePageSize"
      >
      </SimpleTable>
      <div slot="footer" slot-scope="slotScope">
        <Button type="primary" size="large" @click="slotScope.cancel">关闭</Button>
      </div>
    </SimpleModal>
  </div>
</template>

<script>
import SimpleTable from '../simple-table/simple-table'
import SimpleModal from '../simple-modal/simple-modal'

let tableHeight

if (document.documentElement.clientHeight > 700) {
  tableHeight = 500
} else {
  tableHeight = 430
}

export default {

  props: {
    // 弹窗是否显示
    value: {
      type: Boolean,
      required: true
    },

    // modal标题
    modalTitle: {
      type: String,
      default: ''
    },

    // modal宽度
    modalWidth: {
      type: Number | String,
      default: 800
    },

    tableLoading: {
      type: Boolean,
      default: false
    },

    // table列
    tableColumns: {
      type: Array,
      required: true
    },

    tableData: {
      type: Array,
      default: []
    },

    //
    searchInfo: {
      type: Object,
      default: null
    },

    searchSchema: {
      type: Object,
      default: null
    },

    //
    pageInfo: {
      type: Object,
      required: null
    }
  },

  components: {
    SimpleModal,
    SimpleTable
  },

  computed: {
    // 是否显示弹窗
    isShowModal: {
      get() {
        return this.value
      },

      set() {
        this.$emit('input', false)
      }
    }
  },

  data() {
    return {
      tableHeight: tableHeight
    }
  },

  methods: {
    searchHandler() {
      this.$emit('searchHandler')
    },

    clearSearchHandler() {
      this.$emit('clearSearchHandler')
    },

    changePageNumber(pageNumber) {
      this.$emit('changePageNumber', pageNumber)
    },

    changePageSize(pageSize) {
      this.$emit('changePageSize', pageSize)
    }
  }
}
</script>
