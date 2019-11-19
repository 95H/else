import api from '@/api'
const financial = {
  state: {
    openClassList: null,
    collectOrderList: null,
    studentInfoF: null,
    courseList: null,
    subjectList: null,
    myCouponsFee: null
  },
  actions: {
    async fetchOpenClassList({ commit, state }, params) {
      let result = await api.getOpenClassList(params);
      if (result.status === 200) {
        commit('getOpenClassList', result.result)
      }
    },
    async fetchCollectOrderList({ commit, state }, params) {
      let result = await api.getCollectOrderList(params);
      if (result.status === 200) {
        commit('getCollectOrderList', result.result)
      }
    },
    async fetchStudentInfoF({ commit, state }, params) {
      let result = await api.getStudentInfoF(params);
      commit('getStudentInfoF', result)
    },
    async fetchCourseList({ commit, state }, params) {
      let result = await api.getCourseList(params);
      if (result.status === 200) {
        commit('getCourseList', result.result)
      }
    },
    async fetchSubjectList({ commit, state }, params) {
      let result = await api.getSubjectList(params);
      if (result.status === 200) {
        commit('getSubjectList', result.result)
      }
    },
    async fetchMyCouponsFee({ commit, state }, params) {
      let result = await api.getMyCouponsFee(params);
      if (result.status === 200) {
        commit('getMyCouponsFee', result.result)
      }
    }
  },
  getters: {},
  mutations: {
    getOpenClassList(state, data) {
      state.openClassList = data;
    },
    getCollectOrderList(state, data) {
      state.collectOrderList = data;
    },
    getStudentInfoF(state, data) {
      state.studentInfoF = data;
    },
    getCourseList(state, data) {
      state.courseList = data;
    },
    getSubjectList(state, data) {
      state.subjectList = data;
    },
    getMyCouponsFee(state, data) {
      state.myCouponsFee = data;
    }
  }
}

export default financial;