export default  [
  {
    // name: 'organization',
    path: 'organization',
    component: resolve => require(['@/page/powerAdmin/organization'], resolve)
  },
  {
    // name: 'powerAdmin',
    path: 'powerAdmin',
    component: resolve => require(['../page/powerAdmin/powerAdmin'], resolve)
  },
  {
    // name: 'post',
    path: 'post',
    component: resolve => require(['../page/powerAdmin/post'], resolve)
  },
  {
    // name: 'role',
    path: 'role',
    component: resolve => require(['../page/powerAdmin/role'], resolve)
  },
  {
    // name: 'menue',
    path: 'menue',
    component: resolve => require(['../page/powerAdmin/menue/menue'], resolve)
  },
  {
    // name: 'workflow',
    path: 'workflow',
    component: resolve => require(['../page/powerAdmin/workflow/workflowList'], resolve)
  },
]
