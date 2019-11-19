/**
 * 电子合同
 * */
import api from '@/api';
const refundManagement = {
  state: {
    refundOrderlist:null,
    studentInfo:null,
  },
  actions: {
    //获取退费管理列表
    async getrefundmanageOrderList({ commit, state }, params) {
      let result = await api.getCollectOrderList(params);
      if (result.status === 200) {
        commit('getrefundOrderList', result.result)
      }
    },
    // 查询学员信息
    async getStudentInfoList({ commit, state }, params) {
      let result = await api.getOrderManagement(params);
      commit('getStudentInfo', result)
    },
  
  },
  getters: {

  },
  mutations: {
    //订单管理
    getrefundOrderList(state, data) {
      state.refundOrderlist = data;
    },
    //学员信息
    getStudentInfo(state, data) {
      state.studentInfo = data;
    },
  }

}

export default refundManagement;
