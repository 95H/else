export default  [
  {  // 公司数据
    path: 'companyData',
    component: resolve => require(['@/page/fullPageModule/market/companyData'], resolve)
  },{   //资产负债表['assets']、利润表['profit']
    path: 'reportForm/:id',
    component: resolve => require(['@/page/fullPageModule/market/reportForm'], resolve)
  },{   //评估总览
    path: 'assessOverview',
    component: resolve => require(['@/page/fullPageModule/market/assessOverview'], resolve)
  },{   //财务标准值['finance']、业务标准值['business']
    path: 'standard/:id',
    component: resolve => require(['@/page/fullPageModule/market/standard'], resolve)
  }
]
