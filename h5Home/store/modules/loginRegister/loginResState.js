import axios from 'axios';
import { appBaseUrl } from '~/api/apiurl';
import { Indicator, Toast } from 'mint-ui';
import { setCookie, getCookie } from '~/plugins/filter';
export default {
  state() {
    return {
      loginStateFun: {
        getState() {
          return localStorage.getItem("globalLogin")
        }
      },
      loginState: '',
      errorState: true,
      errorMasg: ''
    }
  },
  mutations: {
    setState(state, logindata) {
      state.loginStateFun.globalLogin = logindata
      localStorage.setItem("globalLogin", logindata);
    },
    getLoginState(state, bool) {
      state.loginState = bool
    },
    getErrorTips(state, bool, res) {
      state.errorState = bool;
      state.errorMasg = res
    }
  },
  actions: {
    userLogin(context, logindata) {
      context.commit('setState', logindata)
    }
  }
}
