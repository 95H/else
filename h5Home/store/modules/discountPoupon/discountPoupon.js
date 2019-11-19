export default {
  state() {
    return {
      getDiscountPoupon: ''
    }
  },
  mutations: {
    getDiscounPoList(state, res) {
      state.getDiscountPoupon = res.resultObject
    }
  }
}