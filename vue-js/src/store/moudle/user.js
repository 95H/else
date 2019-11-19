const user = {
  namespaces: true,
  state: {
    username: 'admin'
  },
  actions: {},
  mutations: {
    updateUser(state, param) {
      console.log(state, param)
    }
  },
  getters: {}
}
export default user
