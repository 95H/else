import api from '@/api'

function initialState() {
  return {
    // 阶段当前页最新汇总数据
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
    stageStats(state) {
      return state.stats
    },

    stagePageInfo(state) {
      return state.pageInfo
    },

    stageLoading(state) {
      return state.loading
    },

    stageError(state) {
      return state.error
    }
  },

  mutations: {
    setStageStats(state, resultList) {
      state.stats = resultList
    },

    setStageLoading(state, isLoading) {
      state.loading = isLoading
    },

    setStageError(state, isError) {
      state.error = isError
    },

    setStagePageInfo(state, payload) {
      for (let key in payload) {
        let value = payload[key]
        if (value != null) {
          state.pageInfo[key] = value
        }
      }
    },

    resetStageState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    async fetchStageTotal({ commit }, payload) {
      let data = await api.getTotalStatistics(payload)

      if (data.status == 200) {
        let result = data.result
        return result
      }
    },

    async fetchStageStats({ commit, getters }, payload) {
      let pageInfo = getters.stagePageInfo

      let params = Object.assign({
        pageNumber: pageInfo.pageNumber,
        pageSize: pageInfo.pageSize
      }, payload)

      commit('setStageLoading', true)

      let data = await api.getLatestStats(params)

      if (data.status == 200) {
        let result = data.result

        commit('setStageStats', result.list)
        commit('setStageError', false)

        commit('setStagePageInfo', {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          total: result.total
          // isLastPage: result.isLastPage
        })
      } else {
        commit('setStageStats', [])
        commit('setStageError', true)

        commit('setStagePageInfo', {
          pageNumber: 1,
          pageSize: params.pageSize,
          total: 0
        })
      }

      commit('setStageLoading', false)
    }
  }
}
