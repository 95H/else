import api from '@/api'

/**
 * 涉及学员，学科，课程等一些公共接口
 */
export default {
  namespaced: true,

  state: {
    // 显示的学科列表当前页数据
    subjectList: [],
    //所有课程列表
    coursesList: []
  },

  getters: {
    subjectList(state) {
      return state.subjectList
    }
  },

  mutations: {
    setSubjectList(state, payload) {
      state.subjectList = payload
    },
    //设置课程列表
    setCoursesList(state, payload) {
      state.coursesList = payload
    }
  },

  actions: {
    // 获取学科列表
    async fetchSubjects({ commit }, payload) {
      let data = await api.getSubjects(payload)
      commit('setSubjectList', data.result)
    },
    // 获取课程列表
    async getCoursesList({ commit },payload) {
      let data = await api.coursesList(payload);
      commit('setCoursesList', data.result)
    },

    /**
     * 获取当学科下的学习阶段
     *
     * @param payload {Object}
     *  {
     *    pageNumber {number} 当前页
     *    pageSize {number} 页大小
     *  }
     */
    async fetchStagesBySubjectId({ commit }, payload) {

    }
  }
}
