import marketRoute from './marketRoute' // 报告号设置管理
export default  [
  // 项目信息
  {
    // name: 'projectInfo',
    path: 'projectInfo',
    component: resolve => require(['@/page/fullPageModule/projectInfo'], resolve)
  },
  // 资产占有方信息
  {
    // name: 'possessioBonorum',
    path: 'possessioBonorum',
    component: resolve => require(['@/page/fullPageModule/possessioBonorum'], resolve)
  },
  // 评估作业任务
  {
    // name: 'evaluateTasks',
    path: 'evaluateTasks',
    component: resolve => require(['@/page/fullPageModule/evaluateTasks'], resolve)
  },
  // 资产基础法
  {
    // name: 'assetBased',
    path: 'assetBased',
    component: resolve => require(['@/page/fullPageModule/assetBased'], resolve)
  },
  // 收益法、市场法
  {
    // name: 'incomeAndMarket',
    path: 'incomeAndMarket/:tabId',
    component: resolve => require(['@/page/fullPageModule/incomeAndMarket'], resolve)
  },
  //收益法
  {
    path:'incomeLaw',
    component: resolve => require(['@/page/fullPageModule/incomeLaw/incomeLaw'], resolve),
  },
  // 市场法
  {
    path: 'marketHome',
    component: resolve => require(['@/page/fullPageModule/market/marketHome'], resolve),
    children : marketRoute,
    redirect : to=>{
      return {path : to.path + '/companyData'}
    }
  },
  // 现场调查任务
  {
    // name: 'fieldInvestigation',
    path: 'fieldInvestigation',
    component: resolve => require(['@/page/fullPageModule/fieldInvestigation'], resolve)
  },
  // 评估报告、评估说明
  {
    // name: 'assessment',
    path: 'assessment/:tabId',
    component: resolve => require(['@/page/fullPageModule/assessment'], resolve)
  },
  // 提交文档【线下作业专有】
  /*{
    name: 'submitFile',
    path: 'submitFile',
    component: resolve => require(['@/page/fullPageModule/submitFile'], resolve)
  },*/
  // 修改后的提交文档
  {
    // name: 'underLineHome',
    path: 'underLineHome',
    component: resolve => require(['@/page/fullPageModule/underLineSubmit/underLineHome'], resolve)
  },
  // 工作底稿
  {
    // name: 'workingManuscript',
    path: 'workingManuscript',
    component: resolve => require(['@/page/fullPageModule/workingManuscript'], resolve)
  },
  // 线下作业、审核详情
  {
    // name: 'underLineHome/underLineSubmit',
    path: 'underLineHome/underLineSubmit/:investorId',
    component: resolve => require(['@/page/fullPageModule/underLineSubmit/underLineSubmit'], resolve)
  },
  // 线下作业、审核详情
  {
    //name: 'externalAuditRecord',
    path: 'externalAuditRecord',
    component: resolve => require(['@/page/project/projectAuditing/projectExternalAudit'], resolve)
  },
  // 线下作业、审核详情
  {
    //name: 'externalAuditApply',
    path: 'externalAuditApply',
    component: resolve => require(['@/page/project/projectAuditing/projectExternalAudit'], resolve)
  }
]
