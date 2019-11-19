import api from '@/api'
const roleManagement = {
  state: {
    pageData: {
      data: [],
      pageNum: 0,
      total: 0
    },
    resourceList: []
  },
  actions: {
    async getRolManagementList({ commit, state }, params) {
      let result = await api.getRolManagementList(params);
      commit('getList', result);
      return result
    },
    async getRolResourceList({ commit, state }, params) {
      let result = await api.getRolResourceList(params);
      commit('getResourceList', result);
      return result
    },
  },
  getters: {

  },
  mutations: {
    getList(state, data) {
      state.pageData = {
        data: data.items,
        pageNum: data.currentPage,
        total: data.totalCount
      }
    },
    getResourceList(state, data) {
      state.resourceList = data
    }

  }
};

export default roleManagement;
