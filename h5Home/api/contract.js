import axios from 'axios'
import { noTarget } from './apiurl'
import qs from 'qs'


export default {
  // 我的合同-查看合同
  getSeeContract(data) {
    return axios({
      url: noTarget + `/contract/${data.contractNo}`,
      method: 'get',
      params: {
        sign: data.sign,
        contractNo: data.contractNo
      }
    })
  },
  // 我的合同-列表查询
  getContractList(data) {
    return axios({
      url: noTarget + `/contracts`,
      method: 'get',
      params: {
        pageNum: data.pageNum,
        pageSize: data.pageSize,
        sign: data.sign
      }
    })
  },

  // 我的合同-下载合同
  // getDowncContract(data) {
  //   return axios({
  //     url: noTarget + `/contract/${data.contractNo}/download`,
  //     method: 'get',
  //     params: {
  //       contractNo: data.contractNo,
  //       sign: data.sign
  //     }
  //   })
  // },

  // 我的合同-是否实名认证
  getAutonym(data) {
    return axios({
      url: noTarget + `/authentication/status`,
      method: 'get',
      params: {
        sign: data.sign
      }
    })
  },

  // 我的合同-实名认证
  // getIdentityAutonym(data) {
  //   return axios({
  //     url: noTarget + `/authentication`,
  //     method: 'post',
  //     params: {
  //       sign: data.sign,
  //       stuCourseId: data.stuCourseId,
  //       name: data.name,
  //       idcard: data.idcard,
  //       mobile: data.mobile
  //     }
  //   })
  // },

  // 我的合同-查询课程是否签订合同
  getIsSiganContract(data) {
    return axios({
      url: noTarget + `/course/${data.courseId}/status`,
      method: 'get',
      params: {
        sign: data.sign,
        courseId: data.courseId
      }
    })
  },
  // 我的合同-创建合同
  getGoSign(data) {
    return axios({
      url: noTarget + `/contract/sign`,
      method: 'post',
      params: {
        sign: data.sign,
        stuCourseId: data.stuCourseId,
        mobile: data.mobile,
        code: data.code,
        stuName: data.stuName,
        IDCardNO: data.IDCardNO
      }
    })
  },
  // 我的合同-预览合同
  getPreviewCon(data) {
    return axios({
      url: noTarget + `/contract/preview-app`,
      method: 'post',
      params: {
        sign: data.sign,
        stuCourseId: data.stuCourseId
      }
    })
  }
}