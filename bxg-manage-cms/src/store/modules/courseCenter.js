import api from '@/api'
import _ from 'lodash'

function initialTaskState() {
  return {
    // 学习任务当前页相关信息
    pageTaskInfo: {
      loading: false,
      // 当前任务的phaseId
      // phaseId: 0,
      // 当前任务列表
      taskList: [],
      // 当前任务Obj
      taskObj: {},
      // 学习任务所属的学习阶段
      phaseId: null,

      pageInfo: {
        current: 1,
        total: 0,
        pageSize: 10
      }
    }
  }
}

function initialPhaseState() {
  return {
    // 所有的学习阶段
    allPhases: {}
  }
}

export default {
  namespaced: true,

  state: {
    ...initialPhaseState(),
    ...initialTaskState()
  },

  getters: {
    phaseItem(state) {
      return (phaseId) => {
        return state.allPhases[phaseId]
      }
    },
    
    taskItem(state) {
      return (taskId) => {
        return state.pageTaskInfo.taskObj[taskId]
      }
    },

    pageTaskLoading(state) {
      return state.pageTaskInfo.loading 
    },

    pageTaskList(state) {
      return state.pageTaskInfo.taskList
    },

    pageTaskPageInfo(state) {
      return state.pageTaskInfo.pageInfo
    }
  },

  mutations: {
    /**
     * 学习阶段相关
     */
    addToAllPhases(state, payload = []) {
      payload.reduce((result, item) => {
        result[item.id] = item

        return result
      }, state.allPhases)
    },

    opPatchPhaseItem(state, payload) {
      let phaseId = payload.stageId
      let phaseItem = state.allPhases[phaseId]

      phaseItem.phaseName = payload.name
      phaseItem.referenceStuDays = payload.referenceStuDays
      phaseItem.maxStuDays = payload.maxStuDays
    },

    deletePhaseItem(state, payload) {
      let phaseId = payload.phaseId
      delete state.allPhases[phaseId]
    },

    //------ 学习任务相关 ------ 
    
    /**
     * @param {number} payload 
     */
    setPageTaskPhaseId(state, phaseId) {
      state.pageTaskInfo.phaseId = phaseId
    },

    setPageTaskLoading(state, payload) {
      state.pageTaskInfo.loading = payload
    },

    setPageTaskList(state, payload) {
      state.pageTaskInfo.taskList = payload
      state.pageTaskInfo.taskObj = _.reduce(payload, (result, item) => {
        result[item.id] = item

        return result
      }, {})
    },

    setTaskPageInfo(state, payload = {}) {
      _.each(payload, (value, key) => {
        state.pageTaskInfo.pageInfo[key] = value
      })
    },
    
    // 修改整个学习任务
    opPatchTaskItem(state, payload) {
      let taskItem = state.pageTaskInfo.taskObj[payload.taskId]
      taskItem.taskName = payload.name
      taskItem.taskRemark = payload.remark
      taskItem.attachPath = payload.attachPath
    },

    // 修改学习任务状态
    patchTaskItemStatus(state, payload) {
      let taskItem = state.pageTaskInfo.taskObj[payload.taskId]
      taskItem.status = payload.toStatus
    },
    
    resetPhase(state) {
      const s = initialPhaseState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },

    resetTask(state) {
      const s = initialTaskState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },

  actions: {
    // 创建一个学习阶段
    async createPhase({ commit }, payload) {
      let data = await api.postPhaseCreation(payload)

      return data
    },

    // 更改一个学习阶段
    async updatePhaseItem({ commit }, payload) {
      let data = await api.patchPhaseById(payload)
      
      return data
    },

    // 删除一个学习阶段
    async deletePhaseItem({ commit }, payload) {
      let data = await api.deletePhaseById({ stageId: payload.phaseId })
      
      if (data.status == 200) {
        commit('deletePhaseItem', payload.phaseId)
      }

      return data
    },

    // 创建一个学习任务
    async createTask({ commit, dispatch }, formData) {
      let data = await api.postTaskCreation(formData)
      
      return data
    },

    // 获取当前页学习任务数据
    async fetchPageTasks({ getters, commit, state }, payload = {}) {
      commit('setPageTaskLoading', true)
      
      let pageInfo = getters.pageTaskPageInfo
      
      if (!payload.pageSize) {
        payload.pageSize = pageInfo.pageSize
      }

      if (!payload.pageNumber) {
        payload.pageNumber = pageInfo.current
      }

      payload.phaseId = state.pageTaskInfo.phaseId

      let data = await api.getTasks(payload)

      if (data.status == 200) {
        let result = data.result
        commit('setPageTaskLoading', false)
        commit('setPageTaskList', result.list)
        commit('setTaskPageInfo', { total: result.total })
      }

      return data
    },
    
    // 修改一个学习任务
    async updateTaskItem({ commit, dispatch }, payload) {
      let item = payload.item
      let originItem = _.clone(payload.originItem)

      commit('opPatchTaskItem', item)

      let data = await api.patchTaskById(item)

      if (data.status != 200) {
        commit('opPatchTaskItem', originItem)
      }

      return data
    },

    // 启用or禁用一个学习任务
    async patchPhaseStatus({ commit }, payload) {
      let taskId = payload.taskId
      let data = await api.patchTaskStatus({ taskId })

      // 直接修改taskItem
      if (data.status == 200) {
        commit('patchTaskItemStatus', payload)
      }

      return data
    },

    // 删除一个学习任务
    async deleteTaskItem({ getters, commit, dispatch }, payload) {
      let data = await api.deleteTaskById(payload)
      
      if (data.status == 200) {
        dispatch('fetchPageTasks')
      }

      return data
    },

    // 上移or下移一个学习任务
    async moveTaskItem({ commit, dispatch }, payload) {
      let moveType = payload.moveType
      let taskId = payload.taskId
      let pageInfo = payload.pageInfo
      
      commit('setPageTaskLoading', true)

      let data = await api.patchTaskSort({
        taskId,
        moveType
      })

      commit('setPageTaskLoading', false)

      if (data.status == 200) {
        dispatch('fetchPageTasks', {
          pageNumber: pageInfo.pageNumber,
          pageSize: pageInfo.pageSize
        })
      }

      return data
    }
  }
}
