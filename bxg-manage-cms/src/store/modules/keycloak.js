import axios from 'axios'
const state = {
  keycloak: {},
  authenticated: false
}

let resourceRoles = {}

const getters = {
  accessSet(state, getters) {
    return function(client = 'bxg-admin-api-dist') {
      const resourceAccess = state.keycloak.tokenParsed.resource_access
      // console.log(resourceAccess['bxg-admin-api-dist'])
      // 'bxg-admin-api-dist' 句芒后台 权限集合
      // 'bxg-live-api-dist'  直播  权限集合
      // 'bxg-admin-auth-api-dist' 句芒后台权限服务 权限集合
      if (resourceRoles[client]) {
        return resourceRoles[client]
      }

      const roles = resourceAccess[client] && resourceAccess[client]['roles']
      const accessSet = resourceRoles[client] = new Set(roles || [])

      return accessSet
    }
  }
}

const mutations = {
  setKeyCloak(state, keycloak) {
    if (state.authenticated) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          name: keycloak.tokenParsed.name,
          mail: keycloak.tokenParsed.preferred_username
        })
      )
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        keycloak.token
      }`
      state.keycloak = keycloak
    }
  },
  setAuthenticated(state, authenticated) {
    state.authenticated = authenticated
  }
}
export default {
  state,
  getters,
  mutations
}
