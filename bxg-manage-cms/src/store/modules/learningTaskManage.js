import api from '@/api'
import _ from 'lodash'

function initialState() {
  return {
    // 是否获取数据中
    loading: false,

    error: false,

    // 当前页学习任务列表
    taskList: [],

    // 当前页学习任务对象
    taskObj: {},

    // 分页信息
    pageInfo: {
      current: 1,
      pageSize: 10,
      total: 0
    },

    learningPhaseList: []
  }
}

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    loading(state) {
      return state.loading
    },

    error(state) {
      return state.error
    },

    pageInfo(state) {
      return state.pageInfo
    },

    taskList(state) {
      return state.taskList
    },

    learningPhaseList(state) {
      return state.learningPhaseList
    }
  },

  mutations: {
    // 设置loading值
    setPageTaskLoading(state, isLoading) {
      state.loading = isLoading
    },

    setPageTaskError(state, isError) {
      state.error = isError
    },

    setPageTaskList(state, payload) {
      state.taskList = payload
      state.taskObj = _.reduce(payload, (result, item) => {
        result[item.id] = item

        return result
      }, {})
    },

    setPageInfo(state, payload) {
      _.each(payload, (value, key) => {
        if (value != null) {
          state.pageInfo[key] = value
        }
      })
    },

    setLearningPhaseList(state, payload) {
      state.learningPhaseList = payload
    },

    resetState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    /**
     * 获取当前页学习任务数据
     *
     * @param payload {Object}
     *  {
     *    courseId {number}
     *    studentId {string}
     *    pageNumber {number} 当前页
     *    pageSize {number} 页大小
     *  }
     */
    async fetchPageTasks({ getters, commit }, payload = {}) {
      let pageInfo = getters.pageInfo

      let params = Object.assign({
        pageNumber: pageInfo.current,
        pageSize: pageInfo.pageSize
      }, payload)

      commit('setPageTaskLoading', true)
      commit('setPageTaskError', false)

      let data = await api.getPageLearningTasks(params)
      
      if (data.status == 200) {
        let result = data.result

        commit('setPageTaskList', result.list)
        commit('setPageInfo', {
          current: payload.pageNumber,
          pageSize: payload.pageSize,
          total: result.total
        })
      } else {
        commit('setPageTaskError', data.message)

        commit('setPageTaskList', [])
        commit('setPageInfo', {
          current: payload.pageNumber,
          pageSize: payload.pageSize,
          total: 0
        })
      }

      commit('setPageTaskLoading', false)

      return data
    },

    /**
     * 获取学生课程下的阶段列表
     * @param {*} payload
     *  {
     *    courseId
     *    studentId
     *  }
     */
    async fetchLearningPhases({ commit }, payload) {
      let data = await api.getLearningPhases(payload)

      if (data.status == 200) {
        let result = data.result
        commit('setLearningPhaseList', result)
      }
    },

    /**
     * 布置任务
     *
     * @param {*} payload
     *  {
     *    taskId 选择的任务ID
     *    courseId
     *    studentId
     *  }
     */
    async createTask({ commit, dispatch }, payload) {
      let params = {
        'task-id': payload.taskId,
        'course-id': payload.courseId,
        'student-id': payload.studentId
      }

      let data = await api.postLearningTask(params)

      if (data.status == 201) {
        dispatch('fetchPageTasks', {
          courseId: payload.courseId,
          studentId: payload.studentId
        })
      }

      return data
    },

    /**
     * 终止任务
     * @param {*} payload
     *  {
     *    taskId 任务id
     *    reason 终止原因
     *  }
     */
    async terminateTask({ commit, dispatch }, payload) {
      let data = await api.patchLearningTaskStatus({
        taskId: payload.taskId,
        reason: payload.reason
      })

      if (data.status == 201) {
        dispatch('fetchPageTasks', {
          courseId: payload.courseId,
          studentId: payload.studentId
        })
      }

      return data
    }
  }
}
