import axios from "axios"
import qs from "qs"
axios.defaults.timeout = 0

// http request 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
//http response 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)
//check http状态码
function checkStatus(response) {
  if (response && ((response.status >= 200 && response.status < 300) || response.status === 304 || response.status === 400)) {
    return response.data
  }
  return {
    status: -404,
    msg: "网络异常"
  }
}
//check apiCode码
function checkCode(res) {
  return res
}

export default {
  post(url, data) {
    return axios({
      method: "post",
      url,
      data: qs.stringify(data, { allowDots: true })
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  put(url, data) {
    return axios({
      method: "put",
      url,
      data: qs.stringify(data, { allowDots: true })
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  patch(url, data) {
    return axios({
      method: "patch",
      url,
      data: qs.stringify(data, { allowDots: true })
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  get(url, params) {
    return axios({
      method: "get",
      url,
      params
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  delete(url, params) {
    return axios({
      method: "delete",
      url,
      params
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  }
}
