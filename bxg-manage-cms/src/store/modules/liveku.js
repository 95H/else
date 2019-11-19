import api from '@/api'
const liveku = {
  state: {
    livekuData: {
      items: []
    },
    menus: [],
    course: [],
    teachers: [],
    playbackObj: {},
    liveDetailData: {},
    liveDetails: {},
    liveLog: []
  },
  actions: {
    async fetchLiveList({
      commit,
      state
    }, params) {
      let result = await api.fetchLiveList(params);
      commit('getLiveKu', result)
    },
    async fetchMenus({
      commit,
      state
    }) {
      let result = await api.fetchMenus();
      if (result.status === 200) {
        commit('getMeunus', result.result)
      }
    },
    async fetchTeachers({
      commit,
      state
    }, params) {
      let result = await api.fetchTeachers(params);
      if (result.status === 200) {
        commit('getTeachers', result.result)
      }
    },
    async fetchLiveDetails({
      commit,
      state
    }, params) {
      let result = await api.fetchLiveDetails(params);
      commit('getLiveDetails', result)
    },
    async fetchLiveStayAnalysis({
      commit,
      state
    }, params) {
      let result = await api.fetchLiveStayAnalysis(params);
      commit('getLiveStayAnalysis', result)
    },
    async fetchDataImaging({
      commit,
      state
    }, params) {
      let result = await api.fetchDataImaging(params);
      commit('getDataImaging', result)
    },
    async fetchBaseData({
      commit,
      state
    }, params) {
      let result = await api.fetchBaseData(params);
      commit('getBaseData', result)
    },
    async getLiveCourse({
      commit,
      state
    }, params) {
      let result = await api.getLiveCourse(params);
      commit('getLiveCourseData', result)
    },
    async getPlaybackData({
      commit,
      state
    }, params) {
      let result = await api.getPlaybackData(params);
      commit('playback', result)
      return result;
    },
    async fetchLiveLog({
      commit,
      state
    }, params) {
      let result = await api.fetchLiveLog(params);
      commit('getLiveLog', result)
      return result;
    }

  },
  getters: {

  },
  mutations: {
    getLiveKu(state, data) {
      state.livekuData = data;
    },
    getMeunus(state, data) {
      state.menus = data;
    },
    getTeachers(state, data) {
      state.teachers = data;
    },
    getLiveDetails(state, data) {
      state.liveDetails = data;
    },
    getLiveStayAnalysis(state, data) {
      state.liveStayAnalysis = data;
    },
    getDataImaging(state, data) {
      state.dataImaging = data;
    },
    getBaseData(state, data) {
      state.baseData = data;
    },
    getLiveCourseData(state, data) {
      state.course = data.result;
      state.baseData = data;
    },
    playback(state, data) {
      state.playbackObj = data
    },
    getLiveLog(state, data) {
      state.liveLog = data;
    }
  }
}

export default liveku;
