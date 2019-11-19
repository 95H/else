import _ from 'lodash'

export default {
  pageInfoKey: 'pageInfo',

  data() {
    return {
      tableLoading: false
    }
  },

  methods: {
    resolveSearchParams(searchInfo = {}) {
      return _.pickBy(searchInfo, (value, key) => {
        return value !== '' && value != null
      })
    },

    resolvePageParams(pageInfo = {}) {
      let p = _.pick(pageInfo, ['pageNumber', 'pageSize'])
      let pageInfoKey = this.$options.pageInfoKey
      let r
      
      if (pageInfoKey) {
        let pageNumberKey = pageInfoKey['pageNumber'] || 'pageNumber'
        let pageSizeKey = pageInfoKey['pageSize'] || 'pageSize'
        r = {}
        r[pageNumberKey] = p.pageNumber
        r[pageSizeKey] = p.pageSize
      } else {
        r = p
      }
      
      return r
    },

    resolveSearchPageParams(pageInfo = {}, searchInfo = {}) {
      let params = this.resolveSearchParams(searchInfo)

      _.assign(params, this.resolvePageParams(pageInfo))

      return params
    },

    searchHandler() {
      this.pageInfo.pageNumber = 1
      this.search()
    },

    resetSearchInfo() {
      let searchInfo = this.searchInfo
      for (let key in searchInfo) {
        searchInfo[key] = ''
      }
    },

    resetPageInfo() {
      let pageInfo = this.pageInfo
      pageInfo.pageNumber = 1
      pageInfo.pageSize = 10
      pageInfo.total = 0
    },

    clearSearchHandler() {
      this.resetSearchInfo()
      // let clearSearchHook = this.clearSearchHook || this.defaultClearSearchHook
      this.clearSearchHook && this.clearSearchHook.call(this)
      this.pageInfo.pageNumber = 1
      this.search()
    },

    changePageNumber(pageNumber) {
      this.pageInfo.pageNumber = pageNumber
      this.search()
    },

    changePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize
      if (this.pageInfo.pageNumber == 1) {
        this.search()
      }
    }
  }
}
/*
 let tableRect = document
        .querySelector('.subject-stat__table')
        .getBoundingClientRect()
      let tableTop = tableRect.top
      let tableHeight = document.documentElement.clientHeight - tableTop
      this.tableHeight = tableHeight - 100
*/
