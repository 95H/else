import api from '@/api'
const communicationPlans = {
  state: {
    page_data: {},
    plan_data: [],
    groups_data: [],
    groups_students: [],
    groups_teacher: [],
    default_teacher: '',
    finish_plan: [],
    detail_data: []
  },

  mutations: {
    plan(state, payload) {
      state.plan_data = payload.result.list || [];
      state.page_data = payload.result ? payload.result : {};
    },
    groups(state, payload) {
      state.groups_data = payload.result || [];
    },
    groupsStudents(state, payload) {
      state.groups_students = payload.result || [];
    },
    groupsTeacher(state, payload) {
      state.groups_teacher = payload.result || [];
      payload.result && payload.result.map(item => {
        if (item.selfFlag) {
          state.default_teacher = item.groupAssistantId
        }
      })
    },
    finishPlan(state, payload) {
      state.finish_plan = payload.result || [];
    },
    detailPlan(state, payload) {
      state.detail_data = payload.result || [];
    }
  },
  actions: {
    async getPlans({
      commit
    }, params) {
      let result = await api.getPlans(params);
      if (result.status === 200) {
        commit('plan', result);
      }
    },
    async getGroupsCurrentLogin({
      commit
    }, params) {
      let result = await api.getGroupsCurrentLogin(params);
      if (result.status === 200) {
        commit('groups', result);
      }
    },
    async getGroupsStudents({
      commit
    }, params) {
      let result = await api.getGroupsStudents(params);
      if (result.status === 200) {
        commit('groupsStudents', result)
      }
    },
    async getTeacher({
      commit
    }, params) {
      let result = await api.getTeacher(params);
      if (result.status === 200) {
        commit('groupsTeacher', result)
      }
    },
    async getFinishPlan({
      commit
    }, params) {
      let result = await api.getFinishPlan(params);
      if (result.status === 200) {
        commit('finishPlan', result)
      }
    },
    async getDetailPlan({
      commit
    }, params) {
      let result = await api.getDetailPlan(params);
      if (result.status === 200) {
        commit('detailPlan', result)
      }
    }
  }
}
export default communicationPlans;
