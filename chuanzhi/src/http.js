import Vue from 'vue'
import axios from 'axios'
// queryString 全称 JSON.parse()方法在qs里面
import qs from 'qs'
// 写请求的公共部分
// 请求拦截
// 响应拦截
// axios：基于promise封装的前后端交互工具（获取后台数据）
// 和ajax有一样的作用
// interceptors 是固定不变的，就是axios里面封装的键名
//  request 请求
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.timeout = 4000
// 防止多次发送token到后台
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
// 网页请求超时时间
// interceptors 拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  if (config.method == 'get' || config.method == 'delete') {
    // let token =localStorage.getItem('huanhuan')
    config.headers = {
      'Content-Type': 'application/json;charset=utf8'
      // 'huanhuan': `${token}`
      // 相当于自定义的token
      // 将请求的数据转换为字符串

    }
    config.data = qs.stringify(config.data)
  } else if (config.method == 'post') {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf8',
    }
    config.data = qs.stringify(config.data)
  }
  return config
})
axios.interceptors.response.use(
  response => {
    const data = response.data
    if (data) {
      return data
    } else {
      const err = new Error('获取数据失败')
      throw err
    }
    return response
  },
  error => {
    console.log(error)
    return Promise.reject ('请求失败')
  }
)
export default axios
