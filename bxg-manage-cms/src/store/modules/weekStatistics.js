import api from '@/api'
const weekStatistics = {
  state: {
    page_data: {},
    statistics_data: []
  },
  //异步
  actions: {
    async getWeekStatistics({
      commit
    }, params) {
      let result = await api.getWeekStatistics(params);
      if (result.status === 200) {
        commit('statisticsWeek', result);
      }
    }
  },
  //同步
  mutations: {
    statisticsWeek(state, payload) {
      state.statistics_data = payload.result.list || [];
      state.page_data = payload.result ? payload.result : {};
    }
  }
}
export default weekStatistics;
