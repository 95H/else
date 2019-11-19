import { authApi } from '~/api/index'
import { setCookie, getCookie } from '~/plugins/filter'
import cookie from 'cookie'

export default {
  state() {
    return {
      /**
       * {
       *   userId: '',   博学谷userId
       *   nickName: '', 昵称
       *   avatar: ''    头像url
       * }
       */
      user: null,
      sign: ''
    }
  },

  mutations: {
    // 登录时, 设置用户信息
    // setLoginedUserInfo(state, payload) {
    //   state.userId = payload.userId
    //   state.nickName = payload.nickName
    //   state.avatar = payload.avatar
    // },
    setUser(state, userData) {
      state.user = userData
    },
    
    /**
     * 预报名费，设置用户信息
     */
    setUserByRegisFee(state, userData) {
      if (!state.user) {
        state.user = {}
      }
      
      state.user.userId = userData.userId
      state.user.nickName = userData.name
      
      state.sign = userData.ticket
      setCookie('sign', userData.ticket, 30)
      localStorage.setItem('sign', userData.ticket)
    },

    setSign(state, signValue) {
      state.sign = signValue
    }

  },

  getters: {
    userInfo(state) {
      return state.user
    },

    userSign(state) {
      return state.sign
    }
  },

  actions: {
    nuxtServerInit({ commit, dispatch }, context) {
      return new Promise((resolve) => {
        const cookies = cookie.parse(context.req.headers.cookie || '')
        if (cookies['_uc_t_'] && cookies['sign']) {
          dispatch('fetchUser', cookies['_uc_t_']).then((res) => {
            let data = res.data
            if (data.success) {
              commit('setSign', cookies['sign'])
              resolve(true)
            } else {
              commit('setSign', '')
              resolve(false)
            }
          }).catch(err => {
            commit('setSign', '')
            resolve(false)
          })
        } else {
          commit('setSign', '')
          resolve(false)
        }
      })
    },

    login({ commit }, data) {
      return authApi.login(data)
        .then(res => {
          let data = res.data
          if (data.success) {
            commit('setSign', data.resultObject)
            setCookie('sign', data.resultObject, 30)
            // ...
            localStorage.setItem('sign', data.resultObject)
          }

          return res
        })
    },

    phoneLogin({ commit }, data) {
      return authApi.phoneLogin(data)
        .then(res => {
          let data = res.data
          
          if (data.status == 200) {
            let result = data.result

            let userInfo = {
              userId: result.uid,
              avatar: result.img,
              nickName: result.nickName
            }
            
            commit('setSign', result.sign)
            setCookie('sign', result.sign, 30)
            localStorage.setItem('sign', result.sign)

            commit('setUser', userInfo)
          }

          return res
        })
    },

    logout({ commit }) {
      return authApi.logout()
        .then(res => {
          let data = res.data
          if (data.success) {
            commit('setSign', '')
            setCookie('sign', '', -1)
            localStorage.removeItem('sign')
            
            commit('setUser', null)
          }

          return res
        })
    },
    // utcCookie = ''
    fetchUser({ commit }, sign) {
      return authApi.fetchUser(sign)
        .then(res => {
          let data = res.data

          if (data.success) {       
            let resultObject = data.resultObject
            let userInfo = {
              userId: resultObject.uid,
              avatar: resultObject.img,
              nickName: resultObject.nickName
            }

            commit('setUser', userInfo)
          } else {
            commit('setUser', null)
          }
          
          return res
        })
    }
  }
}