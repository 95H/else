import api from '@/api'
import subjectLatestStat from './learningStatistics/subjectLatestStat'
import stageLatestStat from './learningStatistics/stageLatestStat'
import stageGroupLatestStat from './learningStatistics/stageGroupLatestStat'
import subjectWeekStat from './learningStatistics/subjectWeekStat'
import stageWeekStat from './learningStatistics/stageWeekStat'
import stageGroupWeekStat from './learningStatistics/stageGroupWeekStat'

/**
 * 学习过程管理（数据）
 */
export default {
  namespaced: true,

  state: {
    latestDateList: [],

    weekDateList: []
  },

  getters: {
    latestDateList(state) {
      return state.latestDateList
    }
  },

  mutations: {
    setLatestDateList(state, payload) {
      state.latestDateList = payload
    },

    setWeekDateList(state, payload) {
      state.weekDateList = payload
    }
  },

  actions: {
    async fetchLatestDateList({ commit }) {
      let data = await api.getLatestDateList()

      if (data.status == 200) {
        commit('setLatestDateList', data.result)
        return data.result
      }

      throw new Error(`fetchLatestDateList error: ${JSON.stringify(data)}`)
    },

    async fetchWeekDateList({ commit }) {
      let data = await api.getWeekDateList()

      if (data.status == 200) {
        commit('setWeekDateList', data.result)
        return data.result
      }

      throw new Error(`fetchWeekDateList error: ${JSON.stringify(data)}`)
    }
  },

  modules: {
    // 学科最新汇总数据
    subjectLatestStat,
    // 阶段最新汇总数据
    stageLatestStat,
    // 阶段群最新汇总数据
    stageGroupLatestStat,
    // 学科周汇总数据
    subjectWeekStat,
    // 阶段周汇总数据
    stageWeekStat,
    // 阶段群周汇总数据
    stageGroupWeekStat
  }
}
