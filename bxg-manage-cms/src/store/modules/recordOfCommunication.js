import api from '@/api'
const recordOfCommunication = {
  state: {
    nowTaskData: '',
    newStageData: [],
    newTaskData: [],
    saveTaskData: {},
    changeTaskData: {},
    submitData: {},
    communication_teacher: [],
    default_teacher: '',
    relevance_data: []
  },
  mutations: {
    communication(state, payload) {
      state.nowTaskData = payload.result;
    },
    newStage(state, payload) {
      state.newStageData = payload.result;
    },
    newTask(state, payload) {
      state.newTaskData = payload.result;
    },
    SaveTask(state, payload) {
      state.saveTaskData = payload;
    },
    changeTask(state, payload) {
      state.changeTaskData = payload;
    },
    submitCommunication(state, payload) {
      state.submitData = payload;
    },
    communicationTeacher(state, payload) {
      payload.result && payload.result.map(item => {
        if (item.selfFlag) {
          state.default_teacher = item.groupAssistantId
        }
      })
      state.communication_teacher = payload.result || [];
    },
    relevance(state, payload) {
      state.relevance_data = payload.result;
    }
  },
    //异步
    actions: {
      async getOfCommunication({
        commit
      }, params) {
        let result = await api.getOfCommunication(params);
        commit('communication', result);
      },
      async getChooseStage({
        commit
      }, params) {
        let result = await api.getChooseStage(params);
        commit('newStage', result);
      },
      async getChooseTask({
        commit
      }, params) {
        let result = await api.getChooseTask(params);
        commit('newTask', result);
      },
      async postSaveTask({
        commit
      }, params) {
        let result = await api.postSaveTask(params);
        commit('SaveTask', result);
        return result
      },
      async postChangetask({
        commit
      }, params) {
        let result = await api.postChangetask(params);
        commit('changeTask', result);
        return result
      },
      async postSubmit({
        commit
      }, params) {
        let result = await api.postSubmit(params);
        commit('submitCommunication', result);
        return result
      },
      async getCommunicationTeacher({
        commit
      }, params) {
        let result = await api.getCommunicationTeacher(params);
        commit('communicationTeacher', result);
      },
      async getRelevance({
        commit
      }, params) {
        let result = await api.getRelevance(params);
        commit('relevance', result);
      }
    }
}

export default recordOfCommunication;
