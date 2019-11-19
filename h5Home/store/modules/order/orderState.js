/**
 * Created by admin on 2017/11/14.
 */
import axios from 'axios'
export default {
  state() {
    return {
      orderLists: {
        upPayOrderLists: [],
        doneOrderLists: [],
        invalidOrderLists: []
      }
    }
  },
  mutations: {
    getupPayOrderLists(state, res) {
      state.orderLists.upPayOrderLists = res.resultObject
    },
    getdoneOrderLists(state, res) {
      state.orderLists.doneOrderLists = res.resultObject
    },
    getinvalidOrderLists(state, res) {
      state.orderLists.invalidOrderLists = res.resultObject
    }
  }
}
