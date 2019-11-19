import axios from 'axios'
import { appBaseUrl, noTarget } from './apiurl'
import qs from 'qs'

// 预报名费的接口
// 文档地址: http://app-d.boxuegu.com/swagger-ui.html
export default {
  // 查询预报名费通知信息
  getMessageInfo(id) {
    return axios({
      url: `${appBaseUrl}/bxg/deposit/getMessageInfo/${id}`,
      method: 'get'
    })
  },

  /**
   * 保存预报名费订单
   * @param {*} data
   *   source 下单订单终端：0/PC、1/线下（导入订单）、2/App、3/移动web、4微信内
   */
  saveDeposit(data) {
    let { mobile, messageId, code, source } = data
    
    return axios({
      url: `${appBaseUrl}/bxg/deposit/saveDeposit/${mobile}/${messageId}/${code}/${source}`,
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 
   * @param data
   *   pageNum: 页数
   *   pageSize: 页大小
   *   sign: 用户的sign
   */
  depositList(data) {
    return axios({
      url: `${noTarget}/bxg/deposit/depositList`,
      method: 'post',
      data: qs.stringify(data)
    })
  }
}