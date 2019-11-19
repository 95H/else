import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    addcountA(state) {
      state.count -= 4
    }
  },
  actions: {

  },
  getters: {

  },
});
