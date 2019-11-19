import api from '@/api'
const feeManage = {
  state: {
    pageData: {
      data: []
    },
    newTemplateList: {},
    templateSearchData: {},
    informationData: {},
    informationTemplate: {},
    informationDataPage: {
      pageNum: 1,
      pageSize: 10
    }
  },
  actions: {
    //预报名费模板
    async getDepositManageList({ commit, state }, params) {
      let result = await api.getDepositManageList(params);
      if (result.status === 200) {
        commit('listData', result.result);
      }
    },
    async getDepositTemplateName({ commit, state }, params) {
      let result = await api.getDepositTemplateName(params);
      if (result.status === 200) {
        commit('templateListData', result);
      }
    },
    async getDepositTemplateSearchData({ commit, state }, params) {
      let result = await api.getDepositTemplateSearchData(params);
      if (result.status === 200) {
        commit('templateSearch', result.result);
      }
    },
    //预报名费消息
    async getDepositInformationList({ commit, state }, params) {
      let result = await api.getDepositInformationList(params);
      if (result.status === 200) {
        commit('InformationList', result.result);
      }
    },
    async getDepositInformationTemplate({ commit, state }, params) {
      let result = await api.getDepositInformationTemplate(params);
      if (result.status === 200) {
        commit('InformationTemplateData', result.result);
      }
    }
  },
  getters: {

  },
  mutations: {
    //预报名费模板
    listData(state, data) {
      state.pageData = {
        data: data.list,
        pageNumber: data.pageNumber,
        total: data.total
      }
    },
    templateListData(state, data) {
      state.newTemplateList = data;
    },
    templateSearch(state, data) {
      state.templateSearchData = data;
    },
    //预报名费消息
    InformationList(state, data) {
      state.informationData = data;
      state.informationDataPage.pageNum = data.pageNum;
      state.informationDataPage.pageSize = data.pageSize;
    },
    InformationTemplateData(state, data) {
      state.informationTemplate = data;
    }
  }

}

export default feeManage;
