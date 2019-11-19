import api from '@/api'
const stageGroup = {
  state: {
    pageData: {
      pageNum: 1,
      total:18,
      pageSize: 10
    },
    stageGroupData: [],
    searchData:{},
    rolesData:[]
  },
  mutations: {
    addStageGroup(state, data) {
    },
    getStageGroup(state, data) {
      state.stageGroupData = data;
    },
    getRoles(state, data) {
      state.rolesData = data.result[0];
    }
  },
  actions: {
    //添加阶段群
    async addStageGroup({commit}, params) {
      let result = await api.postAddGroups(params);
      if(result.status===200){
        commit('addStageGroup', result);
      }
    },
    //获取阶段群
    async getStageGroup({commit}, params) {
      let result = await api.getStageOf(params);
      if(result.status===200){
        commit('getStageGroup', result);
      }
    },
    //获取角色
    async getRoles({commit}, params) {
      let result = await api.getRoles(params);
      if(result.status===200){
        commit('getRoles', result);
      }
    },
  },
}

export default stageGroup;
