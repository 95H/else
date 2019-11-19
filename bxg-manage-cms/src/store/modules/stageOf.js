import api from '@/api'
const stageOf = {
  state: {
    stageOfData: {
      pageLists: {},
      list: []
    }
  },
  //异步
  actions: {
    async getStageOf({
      commit,
      payload
    }, params) {
      let result = await api.getStageOf(params);
      commit('stageOfList', result);
    }
  },
  //同步
  mutations: {
    stageOfList(state, payload) {
      let newlist = payload.result ? JSON.parse(JSON.stringify(payload.result.list)) : [];
      newlist && newlist.map((items, idx) => {
        items.subAssistant = items.subAssistant ? items.subAssistant.split(",") : items.subAssistant;
        items.subTeacher = items.subTeacher ? items.subTeacher.split(",") : items.subTeacher;
        items.highRiskEffectNumber = items.highRiskEffectNumber ? items.highRiskEffectNumber.split(",") : items.highRiskEffectNumber;
        items.highRiskStudyNumber = items.highRiskStudyNumber ? items.highRiskStudyNumber.split(",") : items.highRiskStudyNumber;
      })
      state.stageOfData.pageLists = payload.result ? payload.result : {};
      state.stageOfData.list = newlist;
    }
  }
}

export default stageOf;
