import axios from 'axios'
axios.defaults.baseURL = "http://192.168.39.213:7002"
axios.interceptors.request.use(config => {
  return config
})
axios.interceptors.response.use(config => {
    // switch (config.status) {
    // console.log(config.status)
    // switch()
    return config.data
  }, error => {
    // console.log(error.response.status)
    // if () {
    //   switch (config.status)
    //   case 401:
    //   break;
    //   default:
    // }
    console.log('错误')
    return error.response.status
  })
export default {
  install(Vue, options) {
    Vue.prototype.$axios = axios
  }
}