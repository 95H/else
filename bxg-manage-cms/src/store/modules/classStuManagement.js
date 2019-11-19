import api from '@/api'
const classStuManagement = {
  state: {
    subjectList: [],
    coursesList: [],
    //就业课
    // 分页信息
    employmentPageInfo: {
      // 当前页码
      pageNum: 1,
      // 数据总条数
      total: 0,
      // 每页条数
      pageSize: 10
    },
    employmentCourseStatus:null,//课程状态
    employmentMenuIds:null,//学科id
    employmentCourseIds:null,//课程id
    employmentList:"",
    //微课
    // 分页信息
    smallmentPageInfo: {
      // 当前页码
      pageNum: 1,
      // 数据总条数
      total: 0,
      // 每页条数
      pageSize: 10
    },
    smallCourseStatus:null,//课程状态
    smallMenuIds:null,//学科id
    smallCourseIds:null,//课程id
    smallList:"",
    //直播课
    liveCourse: {}
  },

  mutations: {
    setsubjectList(state, payload) {
      state.subjectList = payload
    },
    setCoursesList(state, payload) {
      state.coursesList = payload
    },
    //就业课
    setemploymentCourseStatus(state, payload) {
      state.employmentCourseStatus = payload
    },
    setemploymentMenuIds(state, payload) {
      state.employmentMenuIds = payload
    },
    setemploymentCourseIds(state, payload) {
      state.employmentCourseIds = payload
    },
    setemploymentList(state, payload) {
      state.employmentList = payload;
    },
    //微课
    setsmallCourseStatus(state, payload) {
      state.smallCourseStatus = payload
    },
    setsmallMenuIds(state, payload) {
      state.smallMenuIds = payload
    },
    setsmallCourseIds(state, payload) {
      state.smallCourseIds = payload
    },
    setsmallList(state, payload) {
      state.smallList = payload
    },
    //直播课
    setLiveList(state, payload) {
      state.liveCourse = payload;
    }
  },
  actions: {
    async fetchStudentCoursesList({ commit }, payload) {
      let data=await api.getCourseList(payload);
      if(data.status===200){
        commit('setCoursesList', data.result)
      }
    },

    async fetchStudentSubjectList({ commit, state }, params) {
      let data = await api.getSubjectList(params);
      if (data.status === 200) {
        commit('setsubjectList', data.result)
      }
    },

    //就业课
    getemploymentCourseStatus({ commit }, payload) {
      commit('setemploymentCourseStatus', payload)
    },
    getemploymentMenuIds({ commit }, payload) {
      commit('setemploymentMenuIds', payload)
    },
    getemploymentCourseIds({ commit }, payload) {
      commit('setemploymentCourseIds', payload)
    },
    async getemploymentList({ commit }, payload) {
      let data=await api.getClassList(payload);
      if(data.status===200){
        commit('setemploymentList', data)
      }
    },
    //微课
    getsmallCourseStatus({ commit }, payload) {
      commit('setsmallCourseStatus', payload)
    },
    getsmallMenuIds({ commit }, payload) {
      commit('setsmallMenuIds', payload)
    },
    getsmallCourseIds({ commit }, payload) {
      commit('setsmallCourseIds', payload)
    },
    async getsmallList({ commit }, payload) {
      let data=await api.getClassList(payload);
      if(data.status===200){
        commit('setsmallList', data)
      }
    },
    //直播课
    async getLiveList({ commit, state }, params) {
      let result = await api.getClassList(params);
      if (result.status === 200) {
        commit('setLiveList', result.result);
      }
      return result;
    }
  }
}
export default classStuManagement;
