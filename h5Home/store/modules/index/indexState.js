/**
 * Created by admin on 2017/10/20.
 */
import { mapState } from 'vuex';
export default {
  state() {
    return {
      index: {
        "bannerLists": [],
        "openCourse": '',
        "professionCourses": '',
        "microCourses": '',
        "freeMicroCourses": '',
        "coursesInfo": ''
      },
      courseLists: {
        directions: ''
      },
      classifyList: [],
      studyCenterData: {
        onlineCourseLists: [],
        professionCourseLists: []
      },
      videoLists: [],
      courseDetail: {
        "courseDetailInfo": '',
        "courseOnline": '',
        "lecturer": '',
        "haoPingCount": ''
      }
    }
  },
  mutations: {
    getBannerList(state, res) {
      state.index.bannerLists = res.result
    },
    getOpenCourse(state, res) {
      state.index.openCourse = res.resultObject
    },
    getProfessionCourses(state, res) {
      state.index.professionCourses = res.resultObject
    },
    getMicroCourses(state, res) {
      state.index.microCourses = res.resultObject
    },
    getFreeMicroCourses(state, res) {
      state.index.freeMicroCourses = res.resultObject
    },
    getIndexCourseInfo(state, res) {
      state.index.coursesInfo = res.resultObject
    },
    getCourseById(state, res) {
      state.courseDetail.courseDetailInfo = res.resultObject
    },
    getCourseOnline(state, res) {
      state.courseDetail.courseOnline = res.result
    },
    getLecturer(state, res) {
      state.courseDetail.lecturer = res.resultObject
    },
    getGoodCriticizSum(state, res) {
      state.courseDetail.haoPingCount = res.resultObject
    },
    getDirections(state, res) {
      return state.courseLists.directions = res.resultObject
    },
    getVideos(state) {
      state.videoLists = res.resultObject
    },
    getCategorySubject(state, res) {
      state.classifyList = res
    },
    getStudyCourses(state, res) {
      if (res != '') {
        state.studyCenterData.onlineCourseLists = res.result
      } else {
        state.studyCenterData.onlineCourseLists = res
      }
    },
    getMyProfessionCourse(state, res) {
      if (res != '') {
        state.studyCenterData.professionCourseLists = res.result
      } else {
        state.studyCenterData.professionCourseLists = res
      }
    }
  }
}
