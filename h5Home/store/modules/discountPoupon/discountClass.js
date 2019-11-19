import { mapState } from 'vuex';
export default {
  state() {
    return {
      getDiscountsClass: ''
    }
  },
  mutations: {
    getDiscountsClassList(state, res) {
      state.getDiscountsClass = res.resultObject
    }
  }
}
