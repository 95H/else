import api from '@/api'
const myStudents = {
  state: {
    pageData: {},
    myStudentsData: [],
    processesAll: [],
    logList: null, //日志
    delStudent: null,
    classStageList: null, //学科下阶段列表
    classStageFlock: null, //阶段下阶段群
    Promoted: null, //学员晋级操作
    groupsData: []
  },
  //异步
  actions: {
    async postMyStudents({
      state, commit
    }, params) {
      let result = await api.postMyStudents(params);
      if (result.status === 200) {
        commit('students', result);
      }
      return state.myStudentsData
    },
    async getProcesses({
      commit
    }, params) {
      let result = await api.getProcesses(params);
      if (result.status === 200) {
        commit('processesAll', result);
      }
    },
    async fetchLogList({ //日志
      commit
    }, params) {
      let result = await api.getLogList(params);
      if (result.status === 200) {
        commit('getLogList', result);
      }
    },
    async fetchDelStudent({ //删除
      commit
    }, params) {
      let result = await api.getDelStudent(params);
      if (result.status === 200) {
        let resultError = {
          result: {
            message: result.message,
            status: result.status
          }
        }
        commit('getDelStudent', resultError);
      } else if (result.status === 403) {
        let resultError = {
          result: {
            message: result.message,
            status: result.status
          }
        }
        commit('getDelStudent', resultError);
      }
    },
    async fetchClassStage({ //学科下阶段
      commit
    }, params) {
      let result = await api.getClassStage(params);
      if (result.status === 200) {
        commit('getClassStage', result);
      }
    },
    async fetchClassStageFlock({ //阶段下阶段群
      commit
    }, params) {
      let result = await api.getClassStageFlock(params);
      if (result.status === 200) {
        commit('getClassStageFlock', result);
      }
    },
    async fetchPromoted({ //晋级
      commit
    }, params) {
      let result = await api.getPromoted(params);
      if (result.status === 200) {
        let resultError = {
          result: {
            message: result.message,
            status: result.status
          }
        }
        commit('getPromoted', resultError);
      } else if (result.status === 403) {
        let resultError = {
          result: {
            message: result.message,
            status: result.status
          }
        }
        commit('getPromoted', resultError);
      }
    },
    async getGroups({
      commit
    }, params) {
      let result = await api.getGroups(params);
      if (result.status === 200) {
        commit('groups', result);
      }
    }
  },
  //同步
  mutations: {
    students(state, payload) {
      let newlist = payload.result ? JSON.parse(JSON.stringify(payload.result.list)) : [];
      newlist && newlist.map(items => {
        items.courseType = items.courseType > 0 ? "就业课" : "微课";
        if (items.contactState == null) {
          items.contactState = "-"
        } else if (items.contactState == 0) {
          items.contactState = "是"
        } else if (items.contactState == 1) {
          items.contactState = "否"
        }
        if (items.censusStatus == null) {
          items.censusStatus = "-"
        } else if (items.censusStatus == -1) {
          items.censusStatus = "休学"
        } else if (items.censusStatus == 1) {
          items.censusStatus = "在读"
        } else if (items.censusStatus == 8) {
          items.censusStatus = "退费"
        }

        if (items.riskEffectStatus == null) {
          items.riskEffectStatus = "-"
        } else if (items.riskEffectStatus == 0) {
          items.riskEffectStatus = "正常"
        } else if (items.riskEffectStatus == 1) {
          items.riskEffectStatus = "预警"
        } else if (items.riskEffectStatus == 2) {
          items.riskEffectStatus = "问题"
        }
        if (items.riskStudyStatus == null) {
          items.riskStudyStatus = "-"
        } else if (items.riskStudyStatus == 0) {
          items.riskStudyStatus = "正常"
        } else if (items.riskStudyStatus == 1) {
          items.riskStudyStatus = "预警"
        } else if (items.riskStudyStatus == 2) {
          items.riskStudyStatus = "问题"
        }
      })
      state.pageData = payload.result ? payload.result : {};
      state.myStudentsData = newlist
    },
    processesAll(state, payload) {
      state.processesAll = payload.result;
    },
    getLogList(state, payload) {
      state.logList = payload.result;
    },
    getDelStudent(state, payload) {
      state.delStudent = payload.result;
    },
    getClassStage(state, payload) {
      state.classStageList = payload.result;
    },
    getClassStageFlock(state, payload) {
      state.classStageFlock = payload.result;
    },
    getPromoted(state, payload) {
      state.Promoted = payload.result;
    },
    groups(state, payload) {
      state.groupsData = payload.result
    }
  }
}

export default myStudents;
