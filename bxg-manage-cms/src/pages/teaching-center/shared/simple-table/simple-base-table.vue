<template>
  <Row>
    <Col span="24">
      <Card :dis-hover="true" :padding="0" :bordered="false">
        <slot name="header"></slot>
        <Row style="margin-top: 20px;">
          <Col span="24">
            <Table border :loading="tableLoading" :columns="tableColumns" :data="tableData" :class="tableClassName" :height="tableH"></Table>
          </Col>
        </Row>
        <Row style="margin-top: 20px;">
          <Col span="24">
            <Page placement="top" show-total show-sizer style="text-align: right; padding-bottom: 1px;" :show-elevator="isShowPageElevator ? true : false" :page-size-opts="[10, 20, 30, 40, 100, 200]" :page-size="pageInfo.pageSize" :current="pageInfo.pageNumber" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'SimpleBaseTable',

  props: {
    tableLoading: {
      type: Boolean,
      default: false
    },

    tableColumns: {
      type: Array
    },

    tableData: {
      type: Array,
      default: []
    },

    tableClassName: {
      type: String,
      default: ''
    },

    tableHeight: {
      type: String | Number
    },

    // 需包含pageNumber, pageSize, total三个字段
    pageInfo: {
      type: Object
    },

    pageSize: {
      type: Number,
      default: 10
    },

    pageNumber: {
      type: Number,
      default: 1
    },

    pageTotal: {
      type: Number,
      default: 0
    },

    isShowPageElevator: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      tableH: this.tableHeight
    }
  },

  methods: {
    changeCurrentPage(pageNumber) {
      this.$emit('changePageNumber', pageNumber)
    },

    changePageSize(pageSize) {
      this.$emit('changePageSize', pageSize)
    }
  }
}
</script>
