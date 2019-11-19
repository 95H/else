export default  [
	{ 
	    name: 'examineDetails',
	    path: 'examineDetails',
	    component:  resolve => require(['@/page/examine/examineDetails'], resolve)
	},
	{ 
	    name: 'newApproval',
	    path: 'newApproval',
	    component:  resolve => require(['@/page/examine/newApproval'], resolve)
	},
	{ 
	    name: 'reportExamineDetails',
	    path: 'reportExamineDetails',
	    component:  resolve => require(['@/page/examine/reportExamineDetails'], resolve)
	},	
	//-- 外审修改审核
	{ 
	    name: 'externalAudit',
	    path: 'externalAudit',
	    component:  resolve => require(['@/page/examine/externalAudit'], resolve)
	},	
	{ 
	    name: 'junctions',
	    path: 'junctions',
	    component:  resolve => require(['@/page/examine/junctions'], resolve)
	},
	//--工时审核
	{ 
	    name: 'examineWorkAudit',
	    path: 'examineWorkAudit',
	    component:  resolve => require(['@/page/examine/examineWorkAudit'], resolve)
	},
]
