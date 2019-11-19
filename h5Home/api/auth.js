import axios from 'axios'
import { apiBaseUrl } from './apiurl'
import qs from 'qs'

export default {
  // 账号密码登录
  login(data) {
    return axios({
      url: '/online/user/login',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取手机验证码
   * 
   * @param data
   *   phone: '17610123661'
   *   vtype: 1   
   * 
   */
  getMobileCode(data) {
    return axios({
      url: '/online/verificationCode/sendMobileCode',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  // 手机验证码登录
  phoneLogin(data) {
    return axios({
      url: '/online/user/loginAndRegisterByCode',
      method: 'get',
      params: data
    })
  },

  // 登出
  logout() {
    return axios({
      url: '/online/user/logout',
			method:'get'
    })
  },

  // 获取用户信息
  // api的接口验证用户取的是cookie中的_uc_t_  utcCookie
  // portal的接口是取的是传递参数sign值
  fetchUser(utcCookie) {
    let options = {
      url: '/online/user/getUserData',
      method: 'get'
    }
    
    if (utcCookie) {
      let uct = utcCookie
      uct = uct.split(';').join('%3B')
      
      Object.assign(options, { headers: { Cookie: `_uc_t_=${uct};` } })
    }
    
    return axios(options)
  }
}