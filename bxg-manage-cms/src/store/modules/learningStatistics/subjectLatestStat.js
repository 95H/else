import api from '@/api'

function initialState() {
  return {
    // 学科当前页最新汇总数据
    stats: [],
    loading: false,
    error: false,

    // 分页信息
    pageInfo: {
      pageNumber: 1,
      pageSize: 10,
      total: 0
    }

    // totalStat: {
    //   menuName: '汇总',
    //   groupAmount: 0,
    //   totalAmount: 0,
    //   suspensionAmount: 0,
    //   lossAmount: 0,
    //   riskEffectAmount: 0,
    //   overReferenceDayAmount: 0,
    //   overMaxDayAmount: 0,
    //   teacherNoCommunicationAmount: 0,
    //   tutorNoCommunicationAmount: 0
    // }
  }
}

export default {
  state: initialState(),

  getters: {
    subjectStats(state) {
      return state.stats
    },

    subjectPageInfo(state) {
      return state.pageInfo
    },

    subjectLoading(state) {
      return state.loading
    },

    subjectError(state) {
      return state.error
    }
  },

  mutations: {
    setSubjectStats(state, resultList) {
      state.stats = resultList
    },

    setSubjectLoading(state, isLoading) {
      state.loading = isLoading
    },

    setSubjectError(state, isError) {
      state.error = isError
    },

    setSubjectPageInfo(state, payload) {
      for (let key in payload) {
        let value = payload[key]
        if (value != null) {
          state.pageInfo[key] = value
        }
      }
    },
    
    resetSubjectState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    async fetchSubjectTotal({ commit }, payload) {
      let data = await api.getTotalStatistics(payload)

      if (data.status == 200) {
        let result = data.result
        return result
      }
    },

    async fetchSubjectStats({ commit, getters }, payload) {
      let pageInfo = getters.subjectPageInfo

      let params = Object.assign({
        pageNumber: pageInfo.pageNumber,
        pageSize: pageInfo.pageSize
      }, payload)

      commit('setSubjectLoading', true)

      let data = await api.getLatestStats(params)

      if (data.status == 200) {
        let result = data.result

        commit('setSubjectStats', result.list)
        commit('setSubjectError', false)
        commit('setSubjectPageInfo', {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          total: result.total
        })
      } else {
        commit('setSubjectStats', [])
        commit('setSubjectError', true)
        commit('setSubjectPageInfo', {
          pageNumber: 1,
          pageSize: params.pageSize,
          total: 0
        })
      }

      commit('setSubjectLoading', false)
    }
  }
}
