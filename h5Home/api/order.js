import axios from 'axios'
import { appBaseUrl } from './apiurl'
import qs from 'qs'

// 文档地址: http://app-d.boxuegu.com/swagger-ui.html#/order-controller
export default {
  // 查看订单价格明细 
  // NOTE: 预报名费新增需求 
  getOrderDetail(orderNo, sign) {
    return axios({
      url: appBaseUrl + 'bxg/order/getOrderPriceDetail',
      method: 'get',
      params: {
        orderNo,
        sign
      }
    })
  }
}