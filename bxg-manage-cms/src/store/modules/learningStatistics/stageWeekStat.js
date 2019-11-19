import api from '@/api'

function initialState() {
  return {
    stats: [],
    // loading: false,
    error: false,
    pageInfo: {
      pageNumber: 1,
      pageSize: 10,
      total: 0
    }
  }
}

export default {
  state: initialState(),

  mutations: {
    setStageWeekStats(state, resultList) {
      state.stats = resultList
    },

    setStageWeekError(state, isError) {
      state.error = isError
    },

    setStageWeekPageInfo(state, payload) {
      for (let key in payload) {
        let value = payload[key]
        if (value != null) {
          state.pageInfo[key] = value
        }
      }
    },

    resetStageWeekState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    async fetchWeekStageStats({ commit, state }, params) {
      let data = await api.getWeekStageStats(params)

      if (data.status == 200) {
        let result = data.result

        commit('setStageWeekError', false)
        commit('setStageWeekStats', result.list)

        commit('setStageWeekPageInfo', {
          total: result.total
        })
      } else {
        commit('setStageWeekError', true)
        commit('setStageWeekStats', [])

        commit('setStageWeekPageInfo', {
          pageNumber: 1,
          total: 0
        })
      }
    }
  }
}
