import api from '@/api'
import _ from 'lodash'
import { commonState, queryAction } from '../common'

function initialState() {
  return {
    ...commonState(),
    // phaseList
    phaseList: [],
    // courseModule
    courseModuleList: [],
    // classList
    classList: []
  }
}

export default {
  namespaced: true,
  
  state: initialState(),

  getters: {
    studentData(state) {
      return state.data
    },

    studentPageInfo(state) {
      return state.pageInfo
    },

    studentLoading(state) {
      return state.loading
    },

    studentError(state) {
      return state.error
    }
  },

  mutations: {
    fetchStudentsRequest(state) {
      state.loading = true
    },

    fetchStudentsSuccess(state, result) {
      state.error = false
      state.data  = result.list
      state.pageInfo.total = result.total

      state.loading = false
    },

    fetchStudentsError(state) {
      state.error = true
      state.data  = []
      state.pageInfo.pageNumber = 1
      state.pageInfo.total = 0

      state.loading = false
    },

    resetStageWeekState(state) {
      let s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },

    setPhaseList(state, phaseList) {
      state.phaseList = phaseList
    },

    setCourseModuleList(state, courseModuleList) {
      state.courseModuleList = courseModuleList
    },

    setClassList(state, classList) {
      state.classList = classList
    }
  },

  actions: {
    fetchStudents: queryAction(api.getCourseStudent, 'fetchStudentsRequest', 'fetchStudentsSuccess', 'fetchStudentsError'),

    fetchConditionList({ commit, state }, params) {
      api.getOptionsList(params)
        .then(res => {
          if (res.status == 200) {
            let result = res.result
            
            let phaseList = _.map(result.phaseVo, (obj) => {
              return {
                label: obj.phaseName,
                value: obj.phaseId
              }
            })

            let courseModuleList = _.map(result.moduleVo, (obj) => {
              return {
                label: obj.moduleName,
                value: obj.moduleId
              }
            })
            
            let classList = _.map(result.gradeVo, (obj) => {
              return {
                label: obj.gradeName,
                value: obj.gradeId
              }
            })

            commit('setPhaseList', phaseList)
            commit('setCourseModuleList', courseModuleList)
            commit('setClassList', classList)
          }
        })
        .catch(err => {})
    }
  }
}
