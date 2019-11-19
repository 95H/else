import api from '@/api'
const learningCenter = {
    state: {
        studentInfo: {},
        courses: {},
        logs: {},
        questions: {}
    },
    actions: {
        async fetchStudentInfo({ commit, state }, params) {
            let result = await api.getStudentInfo(params);
            if (result.status === 200) {
                commit('getStudentInfo', result.result)
            }
        },
        async fetchCoursesPage({ commit, state }, params) {
            let result = await api.getCoursesPage(params);
            if (result.status === 200) {
                commit('getCoursesPage', result.result)
            }
        },
        async fetchOperationLog({ commit, state }, params) {
            let result = await api.getOperationLog(params);
            console.log(result)
            if (result.status === 200) {
                commit('getOperationLog', result.result)
            }
        },
        async fetchQuestions({ commit, state }, params) {
            let result = await api.getQuestions(params);
            if (result.status === 200) {
                commit('getQuestions', result.result)
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
        getStudentInfo(state, data) {
            state.studentInfo = data;
        },
        getCoursesPage(state, data) {
            state.courses = data
        },
        getOperationLog(state, data) {
            state.logs = data;
        },
        getQuestions(state, data) {
            state.questions = data;
        }
    }

}

export default learningCenter;
