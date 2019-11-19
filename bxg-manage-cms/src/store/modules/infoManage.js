import api from '@/api'
const infoManage = {
  state: {
    pageTotal: null,
    infoList: [],
    pageTotalLog: null,
    logList: [],
    statisticsList: [],
    pageTotalStat: null,
    auditingList: [],
    pageTotalAuditing: null,
    auditedList: [],
    pageTotalAudited: null
  },
  actions: {
    async getInfoManageList({ commit, state }, params) {
      let res = await api.getInfoManageList(params);
      if (res.status === 200) {
        commit('getInfoList', res.result)
      }
    },

    async getLog({ commit, state }, params) {
      let res = await api.getLog(params);
      if (res.status === 200) {
        commit('getLogList', res.result)
      }
    },

    async getStatistics({ commit, state }, params) {
      let res = await api.getStatistics(params);
      if (res.status === 200) {
        commit('getStatisticsList', res.result)
      }
    },

    async getAuditingManageList({ commit, state }, params) {
      let res = await api.getInfoManageList(params);
      if (res.status === 200) {
        commit('getAuditingManageList', res.result)
      }
    },

    async getAuditedManageList({ commit, state }, params) {
      let res = await api.getInfoManageList(params);
      if (res.status === 200) {
        console.log(res)
        commit('getAuditedManageList', res.result)
      }
    }
  },
  mutations: {
    getInfoList(state, data) {
      state.pageTotal = data.total;
      state.infoList = data.list;
    },

    getLogList(state, data) {
      state.pageTotalLog = data.total;
      state.logList = data.list;
    },

    getStatisticsList(state, data) {
      state.pageTotalStat = data.total;
      state.statisticsList = data.list;
    },

    getAuditingManageList(state, data) {
      state.pageTotalAuditing = data.total;
      state.auditingList = data.list;
    },

    getAuditedManageList(state, data) {
      state.pageTotalAudited = data.total;
      state.auditedList = data.list;
    }
  }
}

export default infoManage;
