/**
* 电子合同
* */
import api from '@/api';
const electronicContract = {
  state: {
    getDate: {
      listData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  actions: {
    //电子合同数据
    async getElectronicContractList({ commit, state }, params) {
      let result = await api.getElectronicContractList(params);
      if (result.status === 200) {
        commit('getDate', result.result);
      }
    }
  },
  getters: {

  },
  mutations: {
    //电子合同数据
    getDate(state, data) {
      state.getDate = {
        listData: data.list,
        pageNum: data.pageNum,
        pageSize: data.pageSize,
        total: data.total
      }
    }
  }

}

export default electronicContract;
