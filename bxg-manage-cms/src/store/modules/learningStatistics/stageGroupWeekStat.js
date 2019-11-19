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
    setStageGroupWeekStats(state, resultList) {
      state.stats = resultList
    },

    setStageGroupWeekError(state, isError) {
      state.error = isError
    },

    setStageGroupWeekPageInfo(state, payload) {
      for (let key in payload) {
        let value = payload[key]
        if (value != null) {
          state.pageInfo[key] = value
        }
      }
    },

    resetStageGroupWeekState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    async fetchWeekStageGroupStats({ commit, state }, params) {
      let data = await api.getWeekStageGroupStats(params)

      if (data.status == 200) {
        let result = data.result

        commit('setStageGroupWeekError', false)
        commit('setStageGroupWeekStats', result.list)

        commit('setStageGroupWeekPageInfo', {
          total: result.total
        })
      } else {
        commit('setStageGroupWeekError', true)
        commit('setStageGroupWeekStats', [])

        commit('setStageGroupWeekPageInfo', {
          pageNumber: 1,
          total: 0
        })
      }
    }
  }
}
