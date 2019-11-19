import api from '@/api'

/**
 * 用户管理公共部分
 */
export default {
  state: {
    //获取工作年限列表
    jobYearsList: [],
    //获取注册来源列表
    registerResourcesList: [],
    //所有省份列表
    provincesList: []
  },
  mutations: {
    setJobYears(state, payload) {
      state.jobYearsList = payload[0]
    },
    setRegisterResources(state, payload) {
      state.registerResourcesList = payload[0]
    },
    setProvinces(state, payload) {
      state.provincesList = payload
    }
  },

  actions: {
    //获取工作年限列表
    async getJobYears({ commit }, payload) {
      let data = await api.getJobYears(payload)
      commit('setJobYears', data.result)
    },
    //获取注册来源列表
    async getRegisterResources({ commit }) {
      let data = await api.getRegisterResources();
      commit('setRegisterResources', data.result)
    },
    //所有省份列表
    async getProvinces({ commit }) {
      let data = await api.getProvinces();
      commit('setProvinces', data.result)
    },
  }
}
