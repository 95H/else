import api from '@/api'
const latestStatistics = {
  state: {
    page_data: {},
    statistics_data: [],
    student_process: []
  },
  //异步
  actions: {
    async getLatestStatistics({
      commit
    }, params) {
      let result = await api.getLatestStatistics(params);
      if (result.status === 200) {
        commit('statistics', result);
      }
    }
  },
  //同步
  mutations: {
    statistics(state, payload) {
      state.statistics_data = payload.result.list || [];
      state.page_data = payload.result ? payload.result : {};
    }
  }
}
export default latestStatistics;
