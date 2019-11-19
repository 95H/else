import axios from 'axios'
import { onlineUrl } from './apiurl'

// 学习反馈的接口
export default {
  // 查询学习反馈信息
  getStudyFeedBack(id) {
    return axios({
      url: `${onlineUrl}/study/learnFeedback/getStudyFeedBack`,
      method: 'get',
      params: {
        id
      }
    })
  }
}