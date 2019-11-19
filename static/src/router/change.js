export default  [
    {
      name: 'changeshowprojectlist',
      path: 'changeshowprojectlist',
      component: resolve => require(['@/page/change/changeshowlist'], resolve)
    },
    {
      name: 'changeshowreportlist',
      path: 'changeshowreportlist',
      component: resolve => require(['@/page/change/changeshowlist'], resolve)
    }
]
