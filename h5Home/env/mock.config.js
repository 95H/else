/**
 * 是否开启mock, 默认全局
 */
module.exports.mockEnable = false

// 首页需要mock的接口名
let mockIndexUrls = {
  // 首页的banner
  '/bbs/banner/getBannerList': 1,
  // 首页的课程
  '/bxg/index/course': 1
}

/**
 * 需要mock的url列表
 * 默认为全部接口mock
 * @type {Array}
 */
module.exports.mockUrlsList = [
  // ...mockIndexUrls
]

module.exports.mockOptions = {
  targetHost: 'https://www.easy-mock.com',
  targetPath: '/mock/5b9ce365c97c69315f3d7c35/boxueguh5'
}