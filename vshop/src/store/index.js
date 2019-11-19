import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
Vue.use(Vuex)

const state = {
  goodlist: [] // 购物车列表
  // checkAll: true
  // 全选改变的时候提交一次事件
  // 单选改变的时候
}
if (localStorage && localStorage['list']) {
  state.goodlist = JSON.parse(localStorage['list'])
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  logger
})
