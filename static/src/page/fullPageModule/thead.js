export default {
	"numB": {label: "序号", minWidth: 80,width: 80}, 
	"createTime": {
	  "label": "立项日期", "minWidth": 200, "width": 200, "align": "right", "search": {
	    "isShow": false, "type": "daterange", "label": "立项日期", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true
	},
	"projectNumber": {
	  "label": "项目编号", "minWidth": 116, "width": 116, "align": "right", "search": {
	    "isShow": false, "type": "suminput", "label": "项目编号", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"projectLevelName": {
	  "label": "项目等级", "minWidth": 116, "width": 116, "align": "right", "search": {
	    "isShow": false, "type": "suminput", "label": "项目等级", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true
	},
	"reportNumber": {
	  "label": "报告号", "minWidth": 116, "width": 116, "align": "right", "search": {
	    "isShow": false, "type": "suminput", "label": "报告号", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true
	},
	"projectName": {
	  "label": "项目名称", "minWidth": 265, "width": 265, "align": "right", "search": {
	    "isShow": false, "type": "suminput", "label": "项目名称", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"economicBehaviorName": {
	  "label": "经济行为", "minWidth": 116, "width": 116, "align": "right", "search": {
	    "isShow": false, "type": "suminput", "label": "经济行为", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"projectNatureName": {
	  "label": "项目性质", "minWidth": 116, "width": 116, "align": "right",  "search": {
	    "isShow": false, "type": "suminput", "label": "项目性质", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"assessmentRangeDesc": {
	  "label": "评估范围", "minWidth": 116, "width": 116, "align": "center", "search": {
	    "isShow": false, "type": "suminput", "label": "项目编号", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true, "selected": true
	},
	"isListedCompany": {
	  "label": "是否涉及上市公司", "minWidth": 200, "width": 200, "align": "left", "search": {
	    "isShow": false, "type": "selectSingle", "label": "是否涉及上市公司", termArr:['是','否']
	  }, "isFilter": true
	},
	"totalAssets": {
	  "label": "账面总资产额(万元)", "minWidth": 200, "width": 200, "align": "left", "search": {
	    "isShow": false, "type": "numbers", "label": "账面总资产额(万元)", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true, "isThousands":true
	},
	"assessmentMethodName": {
	  "label": "评估方法", "minWidth": 116, "width": 116, "align": "left", "search": {
	    "isShow": false, "type": "suminput", "label": "评估方法", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"bidAmount": {
	  "label": "预期合同价(万元)", "minWidth": 200, "width": 200, "align": "left", "search": {
	    "isShow": false, "type": "numbers", "label": "总合同额(万元)", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true, "isThousands":true
	},
	"travelExpenseExpect": {
	  "label": "差旅费", "minWidth": 116, "width": 116, "align": "left", "search": {
	    "isShow": false, "type": "numbers", "label": "差旅费", "placeholder": "", title1: "包含", title2: "包含"
	  }, "isFilter": true, "isThousands":true
	},
	"leaderUserName": {
	  "label": "项目负责人", "minWidth": 120, "width": 120, "align": "left", "search": {
	    "isShow": false, "type": "suminput", "label": "项目经理", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"concatName": {
	"label": "项目联络人", "minWidth": 120, "width": 120, "align": "left", "search": {
	  "isShow": false, "type": "suminput", "label": "项目联络人", "placeholder": "", title: "包含"
	}, "isFilter": true
	},
	"userName1": {
	  "label": "报告初审人", "minWidth": 120, "width": 120, "align": "left", "search": {
	    "isShow": false, "type": "suminput", "label": "报告初审人", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"userName2": {
	  "label": "报告复审人", "minWidth": 120, "width": 120, "align": "left", "search": {
	   "last": "true", "isShow": false, "type": "suminput", "label": "报告复审人", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
	"userName3": {
	  "label": "报告签发人", "minWidth": 120, "width": 120,"align": "left", "search": {
	    "last": "true", "isShow": false, "type": "suminput", "label": "报告签发人", "placeholder": "", title: "包含"
	  }, "isFilter": true
	},
}