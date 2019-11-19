/**
 * 电子合同
 * */
import api from '@/api';
const orderManagement = {
  state: {
    getDate: {
      listData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    },
    detailsData: {
      orderContents: [],
      orderPayments: []
    }
  },
  actions: {
    //获取订单管理列表
    async getOrderManagement({ commit, state }, params) {
      let result = await api.getOrderManagement(params);
      if (result.status === 200) {
        console.log(result.result);
        commit('getDate', result.result);
      }
      return result;
    },
    //获取订单详情
    async getOrderDetails({ commit, state }, params) {
      let result = await api.getOrderDetails(params);
      if (result.status === 200) {
        commit('getDetailsData', result.result);
      }
      return result;
    }
  },
  getters: {

  },
  mutations: {
    //订单管理
    getDate(state, data) {
      state.getDate = {
        listData: data.list,
        pageNum: data.pageNum,
        pageSize: data.pageSize,
        total: data.total
      }
    },
    getDetailsData(state, data) {
      state.detailsData = data
    }
  }

}

export default orderManagement;
