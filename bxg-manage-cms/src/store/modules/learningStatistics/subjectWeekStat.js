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
    setSubjectWeekStats(state, resultList) {
      state.stats = resultList
    },

    setSubjectWeekError(state, isError) {
      state.error = isError
    },

    setSubjectWeekPageInfo(state, payload) {
      for (let key in payload) {
        let value = payload[key]
        if (value != null) {
          state.pageInfo[key] = value
        }
      }
    },

    resetSubjectWeekState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    async fetchWeekSubjectStats({ commit, state }, params) {
      let data = await api.getWeekSubjectStats(params)

      if (data.status == 200) {
        let result = data.result

        commit('setSubjectWeekError', false)
        commit('setSubjectWeekStats', result.list)

        commit('setSubjectWeekPageInfo', {
          total: result.total
        })
      } else {
        commit('setSubjectWeekError', true)
        commit('setSubjectWeekStats', [])

        commit('setSubjectWeekPageInfo', {
          pageNumber: 1,
          total: 0
        })
      }
    }
  }
}
