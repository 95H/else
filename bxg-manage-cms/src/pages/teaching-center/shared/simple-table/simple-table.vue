<template>
  <SimpleBaseTable
    :table-columns="tableColumns"
    :table-loading="tableLoading"
    :table-height="tableHeight"
    :table-data="tableData"
    :pageInfo="pageInfo"
    @changePageNumber="changePageNumber"
    @changePageSize="changePageSize"
    class="simple-table"
  >
    <Row slot="header" :gutter="10" v-if="searchSchema" style="margin-bottom: -10px;">
      <template v-for="(item, k) in searchSchema">
        <Col :span="item.colSpan || 4" v-if="item.type === 'select'" :style="item.styles" style="margin-bottom:10px;">
          <Select
            clearable
            class="w100"
            :placeholder="item.props && item.props.placeholder || `请选择${item.name}`"
            v-model="searchInfoData[k]"
            @input="searchInfoDataUpdate(searchInfoData, k, item.defaultValue, $event)"
          >
            <Option v-for="option in item.optionList" :value="option.value" :key="option.value" :title="option.label">{{ option.label }}</Option>
          </Select>
        </Col>
        <Col :span="item.colSpan || 4" v-else-if="item.type === 'date' || item.type === 'daterange'" :style="item.styles" style="margin-bottom:10px;">
          <DatePicker
            class="w100"
            :type="item.type"
            v-bind="item.props"
            v-model="searchInfoData[k]"
            @input="searchInfoDataUpdate(searchInfoData, k, item.defaultValue, $event)"
          >
          </DatePicker>
        </Col>
        <Col :span="item.colSpan || 4" v-else-if="item.type === 'input'" :style="item.styles" style="margin-bottom:10px;">
          <Input
            :placeholder="item.props && item.props.placeholder"
            v-model="searchInfoData[k]"
          />
        </Col>
      </template>
      <Button type="primary" icon="md-search" style="margin-right:10px;margin-left:6px;" @click="searchHandler">搜索</Button><Button @click="clearSearchHandler" style="margin-right:10px;">清除</Button><slot name="otherBtn"></slot>
    </Row>
  </SimpleBaseTable>
</template>

<script>
import SimpleBaseTable from './simple-base-table'
// style="width:150px; margin-right: 10px; text-align: left;"
export default {
  name: 'SimpleTable',

  components: {
    SimpleBaseTable
  },

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
      type: String | Number,
      default: 500
    },

    searchInfo: {
      type: Object,
      default: null
    },

    searchSchema: {
      type: Object,
      default: null
    },

    // 需包含pageNumber, pageSize, total三个字段
    pageInfo: {
      type: Object
    },

    isShowPageElevator: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      searchInfoData: this.searchInfo
    }
  },

  methods: {
    changePageNumber(pageNumber) {
      this.$emit('changePageNumber', pageNumber)
    },

    changePageSize(pageSize) {
      this.$emit('changePageSize', pageSize)
    },

    searchHandler() {
      this.$emit('searchHandler')
    },

    clearSearchHandler() {
      this.$emit('clearSearchHandler')
    },

    searchInfoDataUpdate(searchInfoData, key, defaultValue, value) {
      if (!value && defaultValue) {
        value = defaultValue
      }

      let infoCopy = Object.assign({}, searchInfoData, {
        [key]: value
      })

      this.$emit('update:searchInfo', infoCopy)
    }
  }
}
</script>

<style lang="less" scoped>
.simple-table {
  .w100 {
    width: 100%;
  }

  .ivu-select {
    // /deep/ .ivu-select-dropdown {
    //   width: 100%;
    // }

    /deep/ .ivu-select-item {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
