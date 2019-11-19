import api from '@/api'
const stuCondition = {
  state: {
    stu_communication: {},
    classModule_list: null,
    videoSchedule: null,
    moduleSchedule: null,
    phaseWorkData: null,
    phaseId: null,
    studyTrack: null,
    studyFeedback: null,
    studyNote: null,
    studentsAsk: null,
    askDetails: null,
    expandInfo: null,
    expandPlan: null,
    studyDetails: null,
    notStudentObj: {},
    addList: [],
    modulesList:null,
  },
  actions: {
    async fetchStuDynamic({ commit, state }, params) {
      let result = await api.getStuDynamic(params);
      if (result.status === 200) {
        commit('getStuDynamic', result.result)
      }
    },
    async fetchClassModule({ commit, state }, params) {
      let result = await api.getClassModule(params);
      if (result.status === 200) {
        commit('getClassModule', result.result)
      }
    },
    async fetchVideoSchedule({ commit, state }, params) {
      let result = await api.getVideoSchedule(params);
      if (result.status === 200) {
        commit('getVideoSchedule', result.result)
      }
    },
    async fetchModuleSchedule({ commit, state }, params) {
      let result = await api.getModuleSchedule(params);
      if (result.status === 200) {
        commit('getModuleSchedule', result.result)
      }
    },
    async fetchPhaseWork({ commit, state }, params) {
      let result = await api.getPhaseWork(params);
      if (result.status === 200) {
        commit('getPhaseWork', result.result)
      }
    },
    async fetchClassPhaseWork({ commit, state }, params) {
      let result = await api.getClassPhaseWork(params);
      if (result.status === 200) {
        commit('getClassPhaseWork', result.result)
      }
    },
    async fetchModulesList({ commit, state }, params) {
      let result = await api.getModulesList(params);
      if (result.status === 200) {
        commit('getModulesList', result.result)
      }
    },
    async fetchStudyTrack({ commit, state }, params) {
      let result = await api.getStudyTrack(params);
      if (result.status === 200) {
        commit('getStudyTrack', result.result)
      }
    },
    async fetchStudyFeedback({ commit, state }, params) {
      let result = await api.getStudyFeedback(params);
      if (result.status === 200) {
        commit('getStudyFeedback', result.result)
      }
    },
    async fetchStudyNote({ commit, state }, params) {
      let result = await api.getStudyNote(params);
      if (result.status === 200) {
        commit('getStudyNote', result.result)
      }
    },
    async fetchStudentsAsk({ commit, state }, params) {
      let result = await api.getStudentsAsk(params);
      if (result.status === 200) {
        commit('getStudentsAsk', result.result)
      }
    },
    async fetchAskDetails({ commit, state }, params) {
      let result = await api.getAskDetails(params);
      if (result.status === 200) {
        commit('getAskDetails', result.result)
      }
    },
    async fetchExpandInfo({ commit, state }, params) {
      let result = await api.getExpandInfo(params);
      if (result.status === 200) {
        commit('getExpandInfo', result.result)
      }
    },
    async fetchExpandPlan({ commit, state }, params) {
      let result = await api.getExpandPlan(params);
      if (result.status === 200) {
        commit('getExpandPlan', result.result)
      }
    },
    async fetchStudyDetails({ commit, state }, params) {
      let result = await api.getStudyDetails(params);
      if (result.status === 200) {
        commit('getStudyDetails', result.result)
      }
    },
    async fecthWaitStudents({ commit }, params) {
      let result = await api.getWaitStudents(params)
      if (result.status === 200) {
        commit('getWaitStudents', result.result)
      }
    }
  },
  getters: {
    /*  doneTodos(state, getters) {
        return {
            itcastUuid: state.StudentInfo.itcastUuid
        }
     } */
  },
  mutations: {
    getStuDynamic(state, data) {
      state.stu_communication = data;
    },
    getClassModule(state, data) {
      state.classModule_list = data;
    },
    getVideoSchedule(state, data) {
      state.videoSchedule = data;
    },
    getModuleSchedule(state, data) {
      state.moduleSchedule = data;
    },
    getPhaseWork(state, data) {
      state.phaseWorkData = data;
    },
    getClassPhaseWork(state, data) {
      state.phaseId = data;
    },
    getModulesList(state, data) {
      state.modulesList = data;
    },
    getStudyTrack(state, data) {
      state.studyTrack = data;
    },
    getStudyFeedback(state, data) {
      state.studyFeedback = data;
    },
    getStudyNote(state, data) {
      state.studyNote = data;
    },
    getStudentsAsk(state, data) {
      state.studentsAsk = data;
    },
    getAskDetails(state, data) {
      state.askDetails = data;
    },
    getExpandInfo(state, data) {
      state.expandInfo = data;
    },
    getExpandPlan(state, data) {
      state.expandPlan = data;
    },
    getStudyDetails(state, data) {
      state.studyDetails = data;
    },
    getWaitStudents(state, data) {
      state.notStudentObj = data
    },
    addStudet(state, data) {
      state.addList.push(data);
    }
  }

}

export default stuCondition;
