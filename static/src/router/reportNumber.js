export default  [
  {
    name: 'auditing',
    path: 'auditing',
    component: resolve => require(['../page/reportNumber/auditing'], resolve)
  },
  {
    name: 'reportNumbershowList',
    path: 'reportNumbershowList',
    component: resolve => require(['../page/reportNumber/reportNumbershowList'], resolve)
  },
  {
    name: 'seal',
    path: 'seal',
    component: resolve => require(['../page/reportNumber/seal'], resolve)
  },
  {
    name: 'distribution',
    path: 'distribution',
    component: resolve => require(['../page/reportNumber/distribution'], resolve)
  },
  {    //复审分配
    path: 'reviewAllot',
    component: resolve => require(['../page/reportNumber/reviewAllot'], resolve),
  },
  {    //签发分配
    path: 'issueAllot',
    component: resolve => require(['../page/reportNumber/issueAllot'], resolve),
  },
  {    //自动签发分配管理
    name: 'autoIssue',
    path: 'autoIssue',
    component: resolve => require(['../page/reportNumber/autoIssue/autoIssueHome'], resolve),
    // redirect: {
		// 	name: 'reviewAllot'
		// },
    // children:[
    //   {
    //     name: 'reviewAllot',
    //     path: 'reviewAllot',
    //     component: resolve => require(['../page/reportNumber/autoIssu/reviewAllot'], resolve)
    //   },
    //   {
    //     name: 'issueAllot',
    //     path: 'issueAllot',
    //     component: resolve => require(['../page/reportNumber/autoIssu/issueAllot'], resolve)
    //   }
    // ]
  },
  {   //新增报告核数管理
    name: 'reportCheckNumber',
    path: 'reportCheckNumber',
    component:resolve=>require(['../page/reportNumber/reportCheckNumber'],resolve)
  }

]
