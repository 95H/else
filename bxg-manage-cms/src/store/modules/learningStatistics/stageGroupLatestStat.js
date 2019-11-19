import api from '@/api'

function initialState() {
  return {
    // 阶段群当前页最新汇总数据
    stats: [],
    loading: false,
    error: false,

    // 分页信息
    pageInfo: {
      pageNumber: 1,
      pageSize: 10,
      total: 0
      // isLastPage: false
    }
  }
}

export default {
  state: initialState(),

  getters: {
    stageGroupStats(state) {
      return state.stats
    },

    stageGroupPageInfo(state) {
      return state.pageInfo
    },

    stageGroupLoading(state) {
      return state.loading
    },

    stageGroupError(state) {
      return state.error
    }
  },

  mutations: {
    setStageGroupStats(state, resultList) {
      state.stats = resultList
    },

    setStageGroupLoading(state, isLoading) {
      state.loading = isLoading
    },

    setStageGroupError(state, isError) {
      state.error = isError
    },

    setStageGroupPageInfo(state, payload) {
      for (let key in payload) {
        let value = payload[key]
        if (value != null) {
          state.pageInfo[key] = value
        }
      }
    },

    resetStageGroupState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    async fetchStageGroupTotal({ commit }, payload) {
      let data = await api.getTotalStatistics(payload)

      if (data.status == 200) {
        let result = data.result
        return result
      }
    },

    async fetchStageGroupStats({ commit, getters }, payload) {
      let pageInfo = getters.stageGroupPageInfo

      let params = Object.assign({
        pageNumber: pageInfo.pageNumber,
        pageSize: pageInfo.pageSize
      }, payload)

      commit('setStageGroupLoading', true)

      let data = await api.getLatestStats(params)

      if (data.status == 200) {
        let result = data.result

        commit('setStageGroupStats', result.list)
        commit('setStageGroupError', false)

        commit('setStageGroupPageInfo', {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          total: result.total
          // isLastPage: result.isLastPage
        })
      } else {
        commit('setStageGroupStats', [])
        commit('setStageGroupError', true)

        commit('setStageGroupPageInfo', {
          pageNumber: 1,
          pageSize: params.pageSize,
          total: 0
        })
      }

      commit('setStageGroupLoading', false)
    }
  }
}
