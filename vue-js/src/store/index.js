import Vue from 'vue'
import Vuex from 'vuex'
import user from './moudle/user'

Vue.user(Vuex)
export default new Vuex.Store({
  state: {
    count: 1,
    count2: 2,
    count3: 3
  },
  mutations: {
    add(state) {
      state.count += 5
    },
    except(state) {
      state.count2 *= 2
    },
    minucount(state, param) {
      // state.count3 += param;
      state.count3 += param.a + param.b
    },
    minucount(state, params) {
      state.count += params
    }
  },
  actions: {
    except({ commit }) {
      commit('except')
    },
    expect({ commit }) {
      commit('except')
    }
  },
  modules: {
    user
  }
})
