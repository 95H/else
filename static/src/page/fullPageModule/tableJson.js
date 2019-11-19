import currentLiabilities from '@/page/fullPageModule/tableJson/currentLiabilities.js';
//01~32
//51~84
//**对底稿的关联有影响，修改请注意 */
var dataSurfaceAll = [{
  name: '现金',
  type: '01'
}, {
  name: '银行存款',
  type: '02'
}, {
  name: '其他货币资金',
  type: '03'
}, {
  name: '交易性-股票',
  type: '04'
}, {
  name: '交易性-债券',
  type: '05'
}, {
  name: '交易性-基金',
  type: '06'
}, {
  name: '应收票据',
  type: '07'
}, {
  name: '应收账款',
  type: '08'
}, {
  name: '预付账款',
  type: '09'
}, {
  name: '应收利息',
  type: '10'
}, {
  name: '应收股利(利润)',
  type: '11'
}, {
  name: '其他应收款',
  type: '08'
}, {
  name: '材料采购(在途物资)',
  type: '12'
}, {
  name: '原材料',
  type: '13'
}, {
  name: '在库周转材料',
  type: '13'
}, {
  name: '委托加工物资',
  type: '14'
}, {
  name: '产成品(库存商品)',
  type: '13'
}, {
  name: '在产品(自制半成品)',
  type: '12'
}, {
  name: '发出商品',
  type: '15'
}, {
  name: '在用周转材料',
  type: '16'
}, {
  name: '农产品',
  type: '17'
}, {
  name: '消耗性生物资产',
  type: '18'
}, {
  name: '工程施工',
  type: '19'
}, {
  name: '一年到期非流动资产',
  type: '20'
}, {
  name: '其他流动资产',
  type: '20'
}, {
  name: '可出售-股票',
  type: '21'
}, {
  name: '可出售-债券',
  type: '22'
}, {
  name: '可出售-其他',
  type: '23'
}, {
  name: '持有到期投资',
  type: '24'
}, {
  name: '长期应收',
  type: '25'
}, {
  name: '股权投资',
  type: '26'
}, {
  //标红
  name: '投资性房地产',
  type: '27'
}, {
  //标红
  name: '房屋建筑物',
  type: '28'
}, {
  //标红
  name: '构筑物',
  type: '29'
}, {
  //标红
  name: '管道沟槽',
  type: '30'
}, {
  //标红
  name: '机器设备',
  type: '31'
}, {
  //标红
  name: '车辆',
  type: '32'
},{
  name: '职工薪酬',
  type: '33'
},/*{
  name:'审定数',
  type:'34'
},{
  name:'资产负债表',
  type:'35'
},{
  name:'利润表',
  type:'36'
},*/{
  //标红
  name: '电子设备',
  type: '51'
}, {
  name: '土地',
  type: '52'
}, {
  name: '在建(土建)',
  type: '53'
}, {
  name: '在建(设备)',
  type: '54'
}, {
  name: '工程物资',
  type: '55'
}, {
  name: '固定资产清理',
  type: '56'
}, {
  name: '生产性生物资产',
  type: '57'
}, {
  name: '油气资产',
  type: '58'
}, {
  name: '无形-土地',
  type: '59'
}, {
  name: '无形-矿业权',
  type: '60'
}, {
  name: '无形-其他',
  type: '61'
}, {
  name: '开发支出',
  type: '62'
}, {
  name: '商誉',
  type: '63'
}, {
  name: '长期待摊费用',
  type: '64'
}, {
  name: '递延所得税资产',
  type: '65'
}, {
  name: '其他非流动资产',
  type: '66'
}, {
  name: '短期借款',
  type: '67'
}, {
  name: '交易性金融负债',
  type: '68'
}, {
  name: '应付票据',
  type: '69'
}, {
  name: '应付账款',
  type: '70'
}, {
  name: '预收账款',
  type: '71'
},{
  name: '应交税费',
  type: '72'
}, {
  name: '应付利息',
  type: '73'
}, {
  name: '应付股利(利润)',
  type: '74'
}, {
  name: '其他应付款',
  type: '75'
}, {
  name: '一年到期非流动负债',
  type: '76'
}, {
  name: '其他流动负债',
  type: '77'
}, {
  name: '长期借款',
  type: '78'
}, {
  name: '应付债券',
  type: '79'
}, {
  name: '长期应付款',
  type: '80'
}, {
  name: '专项应付款',
  type: '81'
}, {
  name: '预计负债',
  type: '82'
}, {
  name: '递延所得税负债',
  type: '83'
}, {
  name: '其他非流动负债',
  type: '84'
},
  {
    name: '分类汇总'
  },
  {
    name: '流动汇总'
  },
  {
    name: '汇总表'
  },
  {
    name: '交易性金融资产汇总'
  },
  {
    name: '存货汇总'
  },
  {
    name: '非流动资产汇总'
  },
  {
    name: '可供出售金融资产汇总'
  },
  {
    name: '固定资产汇总'
  },
  {
    name: '在建工程汇总'
  },
  {
    name: '无形资产汇总'
  },
  {
    name: '流动负债汇总'
  },
  {
    name: '非流动负债汇总'
  }
];

var tableHeadAll = {
  '01': [
    {
      //现金
      "operation":{label:"操作",minWidth:60, prospecting: true,fixed:true},
      "check": {label: "", minWidth: 80,fixed:true},
      "numB": {label: "序号", minWidth: 60,fixed:true},
      "ruleType": {
        "label": "作价规则", "minWidth": 188, "align": "center", "search": {
          "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "规则调整",
          "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
        }, "isFilter": true, "selected": true, fixed:true,
      },
      "B": {
        "label": "存放部门（单位）", "align": "left", "minWidth": 188, "search": {
          "isShow": false, "type": "selectInput", "label": "存放部门（单位）", "placeholder": "", title: "包含"
        }, "isFilter": true, fixed:true,"footLabel": ["合计"]
      },
      "C": {
        "label": "币种", "minWidth": 80, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "币种", placeholder: '', title: "包含", options: [{
            value: '人民币',
            label: '人民币'
          }]
        }, "isFilter": true
      },
      // "name":{"label":"币种","minWidth":300,"align":"center","search":{"isShow":false,"type":"checkbox","label":"币种"},"isFilter":true},
      "D": {
        "label": "外币账面金额", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "外币账面金额", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "E": {
        "label": "评估基准日汇率%", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "评估基准日汇率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "F": {
        "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "G": {
        "label": "审计调整", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "H": {
        "label": "账面价值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "I": {
        "label": "评估价值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "J": {
        "label": "增值率%", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "XS": {
        "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
          "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "L": {
        "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "M": {
        "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "N": {
        "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "O": {
        "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "P": {
        "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
          "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
        }, "isFilter": true
      }
    }
  ],
  '02': [
    {
      //银行存款
      "operation":{label:"操作",minWidth:60,confirmationRequests:true, prospecting: true,fixed:true },
      "check": {label: "", minWidth: 80,fixed:true},
      "numB": {label: "序号", minWidth: 60,fixed:true},
      "ruleType": {
        "label": "作价规则", "minWidth": 188, "align": "center", "search": {
          "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
          "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
        }, "isFilter": true, "selected": true, fixed:true
      },
      "B": {
        "label": "开户银行", "align": "left", "minWidth": 188, "search": {
          "isShow": false, "type": "selectInput", "label": "开户银行", "placeholder": "请输入开户银行", title: "包含"
        }, "isFilter": true, "footLabel": ["合计"],fixed:true
      },
      "C": {"label": "账号", "minWidth": 260, "align": "left", "search": {"isShow": false, "type": "selectInput", "label": "账号", placeholder: '请输入账号', title: "包含"}, "isFilter": true},
      "D": {
        "label": "币种", "minWidth": 80, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "币种", placeholder: '请选择', title: "包含", options: [{
            value: '人民币',
            label: '人民币'
          }]
        }, "isFilter": true
      },
      "E": {
        "label": "外币账面金额", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "外币账面金额", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "F": {
        "label": "评估基准日汇率%", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "评估基准日汇率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "G": {
        "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "H": {
        "label": "审计调整", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "I": {
        "label": "账面价值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "J": {
        "label": "评估价值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "K": {
        "label": "增值率%", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "XS": {
        "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
          "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "M": {
        "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "N": {
        "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "O": {
        "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "P": {
        "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "Q": {
        "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
          "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
        }, "isFilter": true
      }
    }
  ],
  '03': [
    {
      //其他货币资金
      "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true },
      "check": {label: "", minWidth: 80,fixed:true},
      "numB": {label: "序号", minWidth: 60,fixed:true},
      "ruleType": {
        "label": "作价规则", "minWidth": 188, "align": "center", "search": {
          "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
          "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
        }, "isFilter": true, "selected": true, fixed:true
      },
      "B": {
        "label": "名称及内容", "align": "left", "minWidth": 188, "search": {
          "isShow": false, "type": "selectInput", "label": "名称及内容", "placeholder": "名称及内容", title: "包含"
        }, "isFilter": true, "footLabel": ["合计"],fixed:true
      },
      "C": {"label": "用途", "minWidth": 180, "align": "left", "search": {"isShow": false, "type": "selectInput", "label": "用途", placeholder: '请输入用途', title: "包含"}, "isFilter": true},
      "D": {
        "label": "币种", "minWidth": 80, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "币种", placeholder: '请选择', title: "包含", options: [{
            value: '人民币',
            label: '人民币'
          }]
        }, "isFilter": true
      },
      "E": {
        "label": "外币账面金额", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "外币账面金额", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "F": {
        "label": "评估基准日汇率%", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "评估基准日汇率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "G": {
        "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "H": {
        "label": "审计调整", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "I": {
        "label": "账面价值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "J": {
        "label": "评估价值", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true
      },
      "K": {
        "label": "增值率%", "minWidth": 160, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "L": {"label": "备注", "minWidth": 160, "align": "left", "search": {"isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"}, "isFilter": true},
      "XS": {
        "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
          "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
        }, "isFilter": true
      },
      "N": {
        "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "O": {
        "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "P": {
        "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "Q": {
        "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
        }, "isFilter": true
      },
      "R": {
        "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
          "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
        }, "isFilter": true
      }

    }

  ],
  '04': [
    {
    //交易性-股票
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 4, label: "收盘价作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "股票名称", "minWidth": 188, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "股票名称", placeholder: '请输入股票名称', title: "包含"
      }, "isFilter": true,fixed:true
    },
    "D": {
      "label": "投资日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "持股数量", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "持股数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "成本", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "基准日收盘价/股", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "基准日收盘价/股", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }
  ],
  '05': [
    {
    //交易性-债券
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "债券名称", "minWidth": 188, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "债券名称", placeholder: '请输入债券名称', title: "包含"
      }, "isFilter": true,fixed:true
    },
    "D": {
      "label": "发行日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发行日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "投资日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "票面利率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "票面利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "成本", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }
  ],
  '06': [
    {
    //交易性-基金
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 4, label: "收盘价作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "基金发行单位", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "基金发行单位", "placeholder": "请输入基金发行单位", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "基金名称", "minWidth": 188, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "基金名称", placeholder: '请输入基金名称', title: "包含"
      }, "isFilter": true,fixed:true
    },
    "D": {
      "label": "基金类型", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "基金类型", placeholder: '请输入基金类型', title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "投资日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "基金份额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "基金份额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "成本", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "基准日净值/份", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "基准日净值/份", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }
  }
  ],
  '07': [
    {
    //应收票据
    "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "出票日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "出票日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "到期日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到期日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "票面利率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "票面利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "备注", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }
  ],
  '08': [
    {
    //应收账款、其他应收款
    "operation":{label:"操作",minWidth:60,confirmationRequests:true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "欠款单位名称（结算对象）", "align": "left", "minWidth": 220, "search": {
        "isShow": false, "type": "selectInput", "label": "欠款单位名称（结算对象）", "placeholder": "", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：坏账准备","减：评估风险损失","净额"],fixed:true
    },
    "C": {
      "label": "业务内容", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", placeholder: '请输入业务内容', title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "发生日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "账龄", "minWidth": 80, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账龄", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "1年以内金额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "1年以内金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "1~2年金额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "1~2年金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "2~3年金额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "2~3年金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "3~4年金额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "3~4年金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "4~5年金额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "4~5年金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "5年以上金额", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "5年以上金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "账龄总数与审计前账面值差异", "minWidth": 230, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账龄总数与审计前账面值差异", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "N": {
      "label": "预计不可收回金额", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "预计不可收回金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "O": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "P": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "Q": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "R": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "U": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "V": {
      "label": "草稿栏2", "minWidth":120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "W": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "X": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Y": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }
  ],
  '09': [
    {
    //预付账款
    "operation":{label:"操作",minWidth:60, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "收款单位名称（结算对象）", "align": "left", "minWidth": 218, "search": {
        "isShow": false, "type": "selectInput", "label": "收款单位名称（结算对象）", "placeholder": "", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：坏账准备","减：评估风险损失","净额"],fixed:true
    },
    "C": {
      "label": "业务内容", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "请输入业务内容", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "发生日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "账龄", "minWidth": 100, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账龄", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "坏账准备", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "坏账准备", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }
  ],
  '10': [
    {
    //应收利息
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "欠款单位名称（结算对象）", "align": "left", "minWidth": 214, "search": {
        "isShow": false, "type": "selectInput", "label": "欠款单位名称（结算对象）", "placeholder": "请输入欠款单位名称（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "本金", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "本金", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "利息所属期间", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "利息所属期间", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "利息率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "利息率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }
  }
  ],
  '11': [
    {
    //应收股利（利润）
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "股利所属期间", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "股利所属期间", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }
  ],
  '12': [
    {
    //材料采购（在途物资）
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel":["合计","减：存货跌价准备","小计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "计量单位", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "LL": {"label": "审计前账面值", "align": "center", colspan: 3},
    "G": {
      "label": "审计调整", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "HH": {"label": "账面价值", "align": "center", colspan: 3},
    "KK": {"label": "评估价值", "align": "center", colspan: 3},
    "N": {
      "label": "增值率%", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "O": {
      "label": "备注", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Q": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏4", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true ,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：存货跌价准备","小计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "计量单位", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "E": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "F": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "审计调整", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "H": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "账面价值"
    },
    "I": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "J": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "L": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "M": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "N": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "O": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Q": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }
  }
  ],
  '13': [
    {
    //原材料、在库周转材料、产成品(库存商品)
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：存货跌价准备","小计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "计量单位", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "DD": {"label": "审计前账面值", "align": "center", colspan: 3},
    "G": {
      "label": "审计调整", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "HH": {"label": "账面价值", "align": "center",  colspan: 3},
    "KK": {"label": "评估价值", "align": "center",  colspan: 3},
    "N": {
      "label": "增值率%", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "O": {
      "label": "备注", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "存放地点", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "存放地点", placeholder: '请输入存放地点', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60,  isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true ,fixed:true },
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true },
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：存货跌价准备","小计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "计量单位", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "E": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "F": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "H": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "账面价值"
    },
    "I": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "J": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "L": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "M": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "N": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "O": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "P": {
      "label": "存放地点", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "存放地点", placeholder: '请输入存放地点', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '14': [
    {
    //委托加工物资
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "加工单位名称", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "加工单位名称", "placeholder": "加工单位名称", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "计量单位", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "EE": {"label": "审计前账面值", "align": "center", colspan: 3},
    "H": {
      "label": "审计调整", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "II": {"label": "账面价值", "align": "center", colspan: 3},
    "LL": {"label": "评估价值", "align": "center", colspan: 3},
    "O": {
      "label": "增值率%", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "备注", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "加工单位名称", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "加工单位名称", "placeholder": "加工单位名称", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "计量单位", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "F": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "H": {
      "label": "审计调整", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "I": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "账面价值"
    },
    "J": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "L": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "M": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "N": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "O": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "P": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '15': [
    {
    //发出商品
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true },
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true },
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "商品名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "商品名称", "placeholder": "请输入商品名称", title: "包含"
      }, "isFilter": true, "footLabel":["合计","减：存货跌价准备","小计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "对方单位名称", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "对方单位名称", "placeholder": "对方单位名称", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "计量单位", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "EE": {"label": "审计前账面值", "align": "center", colspan: 3},
    "H": {
      "label": "审计调整", "align": "center", "minWidth": 160, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "II": {"label": "账面价值", "align": "center", colspan: 3},
    "LL": {"label": "评估价值", "align": "center", colspan: 3},
    "O": {
      "label": "增值率%", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "备注", "minWidth": 160, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true ,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true },
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true },
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "商品名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "商品名称", "placeholder": "请输入商品名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：存货跌价准备","小计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "对方单位名称", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "对方单位名称", "placeholder": "对方单位名称", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "计量单位", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "F": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "H": {
      "label": "审计调整", "align": "right", "minWidth": 160, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,isNoShow: true,"isThousands":true
    },
    "I": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "账面价值"
    },
    "J": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "L": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "M": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "N": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "O": {
      "label": "增值率%", "minWidth": 160, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "P": {
      "label": "备注", "minWidth": 160, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '16': [
    {
    //在用周转材料
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "启用日期", "minWidth": 110, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "请输入启用日期", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "D":{
      "label": "原始入账价值", "minWidth": 180, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原始入账价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "E":{
      "label": "计量单位", "minWidth": 180, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "FF": {"label": "审计前账面值", "align": "center", colspan: 2},
    "H": {
      "label": "审计调整", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, rowspan: 2,"isThousands":true
    },
    "II": {"label": "账面价值", "align": "center",colspan: 2},
    "K":{
      "label": "实际数量", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "", title1: "包含", title2: "包含"
      }, rowspan: 2
    },
    "LL":{"label": "评估价值", "align": "center",colspan: 3},
    "O": {
      "label": "增值率%", "minWidth": 100, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "备注", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "启用日期", "minWidth": 110, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "请输入启用日期", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true,isNoShow: true
    },
    "D": {
      "label": "原始入账价值", "minWidth": 180, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原始入账价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "E": {
      "label": "计量单位", "minWidth": 180, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "H": {
      "label": "审计调整", "align": "right", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, isNoShow: true,"isThousands":true
    },
    "I": {
      "label": "数量", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "账面价值"
    },
    "J": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "实际数量", "align": "right", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "", title1: "包含", title2: "包含"
      }, isNoShow: true
    },
    "L": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "M": {
      "label": "成新率%", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "N": {
      "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      },"isThousands":true, "subHead": "评估价值"
    },
    "O": {
      "label": "增值率%", "minWidth": 100, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "增值率%", placeholder: '请输入增值率%', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "P": {
      "label": "备注", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '17': [
    {
    //农产品
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "计量单位", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "DD": {"label": "审计前账面值", "align": "center",colspan: 2},
    "F": {
      "label": "审计调整","minWidth": 180,  "align": "center", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title: "包含", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "GG": {"label": "账面价值", "align": "center",colspan: 2},
    "I": {
      "label": "实际数量", "type": "range", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "请输入调整后账面值", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "JJ": {"label": "评估价值", "align": "center", colspan: 3},
    "M": {
      "label": "增值率%", "minWidth": 100, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "N": {
      "label": "备注", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Q": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏4", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  },
    {
      "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
      "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
      "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
      "ruleType": {
        "label": "作价规则", "minWidth": 188, "align": "center", "search": {
          "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
          "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
        }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
      },
      "B": {
        "label": "名称及规格型号", "align": "left", "minWidth": 188, "search": {
          "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
        }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
      },
      "C": {
        "label": "计量单位", "minWidth": 180, "align": "right", "search": {
          "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "D": {
        "label": "数量", "minWidth": 100, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true, "subHead": "审计前账面值"
      },
      "E": {
        "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
      },
      "F": {
        "label": "审计调整","minWidth": 180, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title: "包含", title1: "包含", title2: "包含"
        }, "isFilter": true, isNoShow: true,"isThousands":true
      },
      "G": {
        "label": "数量", "minWidth": 100, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true, "subHead": "账面价值"
      },
      "H": {
        "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
      },
      "I": {
        "label": "实际数量", "align": "right", "minWidth": 120, "search": {
          "isShow": false, "type": "range", "label": "调整后账面值", "placeholder": "请输入调整后账面值", title1: "包含", title2: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "J": {
        "label": "单价", "minWidth": 100, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
      },
      "K": {
        "label": "成新率%", "minWidth": 130, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true, "subHead": "评估价值"
      },
      "L": {
        "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
          "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
      },
      "M": {
        "label": "增值率%", "minWidth": 100, "align": "right", "search": {
          "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "N": {
        "label": "备注", "minWidth": 180, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "XS": {
        "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
          "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "P": {
        "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "Q": {
        "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "R": {
        "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "S": {
        "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
          "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
        }, "isFilter": true, isNoShow: true
      },
      "T": {
        "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
          "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
        }, "isFilter": true, isNoShow: true
      }

    }],
  '18': [
    {
    //消耗性生物资产
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "冠高", "align": "center", "minWidth": 80, "search": {
        "isShow": false, "type": "range", "label": "冠高", "placeholder": "冠高", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "胸径", "align": "center", "minWidth": 80, "search": {
        "isShow": false, "type": "range", "label": "胸径", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "计量单位", "minWidth": 100, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "FF": {"label": "审计前账面值", "align": "center",colspan: 2},
    "H": {
      "label": "审计调整", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "II": {"label": "账面价值", "align": "center",colspan: 2},
    "K": {
      "label": "实际数量", "type": "range", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "LL": {"label": "评估价值", "align": "center", colspan: 3},
    "O": {
      "label": "增值率%", "minWidth": 100, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "备注", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称及规格型号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称及规格型号", "placeholder": "请输入名称及规格型号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "冠高", "align": "left", "minWidth": 80, "search": {
        "isShow": false, "type": "range", "label": "冠高", "placeholder": "冠高", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "胸径", "align": "left", "minWidth": 80, "search": {
        "isShow": false, "type": "range", "label": "冠高", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "计量单位", "minWidth": 100, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "请输入计量单位", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "数量", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "H": {
      "label": "审计调整", "minWidth": 130, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "I": {
      "label": "数量", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "账面价值"
    },
    "J": {
      "label": "金额", "align": "right", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "实际数量", "minWidth": 100, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "L": {
      "label": "单价", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "M": {
      "label": "成新率%", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "N": {
      "label": "金额", "minWidth": 80, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "O": {
      "label": "增值率%", "minWidth": 100, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "P": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }


  }],
  '19': [
    {
    //工程施工
    "operation":{label:"操作",minWidth:60, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "项目及内容", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "项目及内容", "placeholder": "请输入项目及内容", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：存货跌价准备","小计"],fixed:true
    },
    "C": {
      "label": "开工日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "开工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "预计完工日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "预计完工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "工程形象进度", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "工程形象进度", "placeholder": "", title: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "合同造价", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "合同造价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计前账面值", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值 ", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "调整后账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "评估价值", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "增值率%", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "备注", "minWidth": 100, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '20': [
    {
    //一年到期非流动资产
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "项目及内容", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "项目及内容", "placeholder": "请输入项目及内容", title: "包含"
      }, "isFilter": true,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "结算内容", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "结算内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 180, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '21': [
    {
    //可出售-股票
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"},{value:4,label:"收盘价作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "股票性质", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "股票性质", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "投资日期", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "持股数量", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "持股数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "持股比例%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "持股比例%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "基准日市价", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "基准日市价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "取得成本", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "取得成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "审计调整", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "账面价值", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "评估价值", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "增值率%", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "T": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '22': [
    {
    //可出售-债券
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "债券种类", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "债券种类", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "发行日期", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "发行日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "到期日", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "票面利率%", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "票面利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "成（面值）", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "成（面值）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "评估价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "增值率%", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '23': [
    {
    //可出售-其他
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"},{value: 4, label: "收盘价作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "金融资产名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "金融资产名称", "placeholder": "", title: "包含"
      }, "isFilter": true,fixed:true
    },
    "D": {
      "label": "投资日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "持有数量", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "持有数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "基准日市价", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "基准日市价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "成本", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "评估价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "增值率%", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '24': [
    {
    //持有到期投资
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true,footLabel:["合计","减：持有至到期投资减值准备","净额"],fixed:true
    },
    "C": {
      "label": "投资类别", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "投资类别", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "投资日期", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "到期日", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "票面利率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "票面利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "投资成本", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "投资成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "评估价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "备注", "minWidth": 100, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '25': [
    {
    //长期应收
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "欠款单位名称（结算对象）", "align": "left", "minWidth": 215, "search": {
        "isShow": false, "type": "selectInput", "label": "欠款单位名（结算对象）", "placeholder": "欠款单位名（结算对象）", title: "包含"
      }, "isFilter": true,footLabel:["合计","减：坏账准备","减：评估风险损失","净额"],fixed:true
    },
    "C": {
      "label": "业务内容", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "发生日期", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '26': [
    {
    //股权投资
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"},{value:7,label:'股权比例作价'}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "被投资单位名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
      }, "isFilter": true,footLabel:["合计","减：长期股权投资减值准备","净额"],fixed:true
    },
    "C": {
      "label": "投资日期", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "协议投资期限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "协议投资期限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "持股比例%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "持股比例%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "投资成本", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "投资成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "评估价值", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '27': [
    {
    //投资性房地产
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "资产编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "资产编号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,footLabel:["合计","减：投资性房地产减值准备","净额"],fixed:true
    },
    "C": {
      "label": "权证编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "权证编号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "证载权利人", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "E": {
      "label": "房屋名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "房屋名称", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "F": {
      "label": "无法办证原因", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "无法办证原因", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "房屋用途", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "房屋用途", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "具体位置", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "具体位置", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "对应土地证号", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "对应土地证号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "J": {
      "label": "来源（外购、自建、自用转入、存货转入等）", "align": "center", "minWidth": 330, "search": {
        "isShow": false, "type": "selectSingle", "label": "来源", "termArr":['外购','自建','自用转入','存货转入'],
      }, "isFilter": true, rowspan: 2
    },
    "K": {
      "label": "结构", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectSingle", "label": "结构", "termArr":['砖混','钢混','框架','砖木','简易'],
      }, "isFilter": true, rowspan: 2
    },
    "L": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "M": {
      "label": "计量单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "N": {
      "label": "建筑面积", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建筑面积", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "O": {
      "label": "成本单价（元/m2）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "成本单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "KK": {"label": "审计前账面值", "align": "center",colspan: 2},
    "MM": {"label": "审计调整", "align": "center",colspan: 2},
    "OO": {"label": "账面价值", "align": "center",colspan: 2,},
    "QQ": {"label": "评估价值", "align": "center", colspan: 3},
    "Y": {
      "label": "增值率%", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "评估单价（元/m2）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "评估单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AA": {
      "label": "备注", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AC": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AD": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AE": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AF": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AG": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },

    "AI": {
      "label": "基准造价（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AJ": {
      "label": "层数修正系数（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AK": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AL": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AM": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AN": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AO": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AP": {
      "label": "其他因素修正", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AQ": {
      "label": "修正后单方造（含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AR": {
      "label": "修正后单方造（不含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AS": {
      "label": "建安工程造（含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AT": {
      "label": "建安工程造（不含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AU": {
      "label": "建设单位管理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, rowspan: 2
    },
    "AV": {
      "label": "可行性研究费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true, rowspan: 2
    },
    "AW": {
      "label": "招投标代理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, rowspan: 2
    },
    "AX": {
      "label": "环境影响评价费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true, rowspan: 2
    },
    "AY": {
      "label": "勘察设计费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"前期费用",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, rowspan: 2
    },
    "AZ": {
      "label": "工程监理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, rowspan: 2
    },
    "BA": {
      "label": "其他前期费用（按造价）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"前期费用",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true, rowspan: 2
    },
    "BB": {
      "label": "其他前期费用（按建筑面积）", "align": "center", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BC": {
      "label": "前期费（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BD": {
      "label": "前期费（不含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BE": {
      "label": "建设年限", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"年限调整",tab2:"update",defaultVal:'2'
      }, "isFilter": true, rowspan: 2
    },
    "BF": {
      "label": "利率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "利率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"利率%调整",tab2:"update",defaultVal:'0.0475'
      }, "isFilter": true, rowspan: 2
    },
    "BG": {
      "label": "资金成本", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BH": {
      "label": "重置全价", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BI": {
      "label": "设计使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BJ": {
      "label": "已使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BK": {
      "label": "年限调整", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BL": {
      "label": "尚可使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BM": {
      "label": "成新率%", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "资产编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "资产编号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,footLabel:["合计","减：投资性房地产减值准备","净额"],fixed:true
    },
    "C": {
      "label": "权证编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "权证编号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "D": {
      "label": "证载权利人", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "E": {
      "label": "房屋名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "房屋名称", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "F": {
      "label": "无法办证原因", "align": "left", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "无法办证原因", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "G": {
      "label": "房屋用途", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "房屋用途", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "H": {
      "label": "具体位置", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "具体位置", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "I": {
      "label": "对应土地证号", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "对应土地证号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "J": {
      "label": "来源（外购、自建、自用转入、存货转入等）", "align": "left", "minWidth": 330, "search": {
        "isShow": false,"type": "selectSingle", "label": "来源", "termArr":['外购','自建','自用转入','存货转入'],
      }, "isFilter": true, isNoShow: true
    },
    "K": {
      "label": "结构", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectSingle", "label": "结构", "termArr":['砖混','钢混','框架','砖木','简易'],
      }, "isFilter": true, isNoShow: true
    },
    "L": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "M": {
      "label": "计量单位", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "N": {
      "label": "建筑面积", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建筑面积", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "O": {
      "label": "成本单价（元/m2）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "成本单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "P": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "Q": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "R": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "S": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "T": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "U": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "V": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "W": {
      "label": "成新率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率% ", "placeholder": ""
      }, "isFilter": true, "subHead": "评估价值"
    },
    "X": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "Y": {
      "label": "增值率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "评估单价（元/m2）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "评估单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AA": {
      "label": "备注", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AC": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AD": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AE": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AF": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AG": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },

    "AI": {
      "label": "基准造价（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AJ": {
      "label": "层数修正系数（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true,isNoShow: true
    },
    "AK": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AL": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AM": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AN": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true,isNoShow: true
    },
    "AO": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true,isNoShow: true
    },
    "AP": {
      "label": "其他因素修正", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AQ": {
      "label": "修正后单方造（含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AR": {
      "label": "修正后单方造（不含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AS": {
      "label": "建安工程造（含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AT": {
      "label": "建安工程造（不含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AU": {
      "label": "建设单位管理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, isNoShow: true
    },
    "AV": {
      "label": "可行性研究费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true,isNoShow: true
    },
    "AW": {
      "label": "招投标代理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true,isNoShow: true
    },
    "AX": {
      "label": "环境影响评价费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true,isNoShow: true
    },
    "AY": {
      "label": "勘察设计费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"前期费用",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, isNoShow: true
    },
    "AZ": {
      "label": "工程监理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true,isNoShow: true
    },
    "BA": {
      "label": "其他前期费用（按造价）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"前期费用",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true,isNoShow: true
    },
    "BB": {
      "label": "其他前期费用（按建筑面积）", "align": "right", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BC": {
      "label": "前期费（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BD": {
      "label": "前期费（不含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BE": {
      "label": "建设年限", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"年限调整",tab2:"update",defaultVal:'2'
      }, "isFilter": true,  isNoShow: true
    },
    "BF": {
      "label": "利率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "利率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"利率调整%",tab2:"update",defaultVal:'0.0475'
      }, "isFilter": true, isNoShow: true
    },
    "BG": {
      "label": "资金成本", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BH": {
      "label": "重置全价", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BI": {
      "label": "设计使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BJ": {
      "label": "已使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BK": {
      "label": "年限调整", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BL": {
      "label": "尚可使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BM": {
      "label": "成新率%", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true
    },
  }],
  '28': [
    {
    //房屋建筑物
    "operation":{label:"操作",minWidth:140, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"},{value: 8, label: "收益法作价"},{value: 9, label: "市场法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "权证编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "权证编号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "建筑物名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "建筑物名称", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "位置", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "位置", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "对应土地证号", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "对应土地证号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "结构", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "结构", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "檐高（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "檐高（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "层高（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "层高（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "总层数", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "总层数", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "J": {
      "label": "所在层数", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "所在层数", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "K": {
      "label": "朝向", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "朝向", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "L": {
      "label": "吊车吨位", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "吊车吨位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "M": {
      "label": "跨度（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "跨度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "N": {
      "label": "柱距（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "柱距（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "O": {
      "label": "使用单位", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "开工年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "开工年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "Q": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "计量单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "建筑  面积/容积", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "建筑  面积/容积", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "成本单价（元/m2）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成本单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "UU": {"label": "审计前账面值", "minWidth": 200, "align": "center",  colspan: 2},
    "WW": {"label": "审计调整", "align": "center",  colspan: 2},
    "YY": {"label": "账面价值", "align": "center",  colspan: 2,},
    "AAA": {"label": "评估价值", "align": "center",  colspan: 3,},
    "AD": {
      "label": "增值率%", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AE": {
      "label": "评估单价（元/m2）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "评估单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AF": {
      "label": "备注", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AG": {
      "label": "现场勘察简单记录", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "现场勘察简单记录", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AH": {
      "label": "证载权利人", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AJ": {
      "label": "草稿栏1", "minWidth":120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AK": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AL": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AM": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AN": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },

    "AP": {
      "label": "基准造价（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AQ": {
      "label": "层数修正系数（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）",  "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AR": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AS": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AT": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AU": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AV": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AW": {
      "label": "其他因素修正", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AX": {
      "label": "修正后单方造价（含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AY": {
      "label": "修正后单方造价（不含税）", "align": "center", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AZ": {
      "label": "建安工程造价（含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BA": {
      "label": "建安工程造价（不含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BB": {
      "label": "建设单位管理费率%", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, rowspan: 2
    },
    "BC": {
      "label": "可行性研究费率%", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true, rowspan: 2
    },
    "BD": {
      "label": "招投标代理费率%", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, rowspan: 2
    },
    "BE": {
      "label": "环境影响评价费率%", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true, rowspan: 2
    },
    "BF": {
      "label": "勘察设计费率%", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率%",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, rowspan: 2
    },
    "BG": {
      "label": "工程监理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, rowspan: 2
    },
    "BH": {
      "label": "其他前期费用率%（按造价）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用率%（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"前期费用率%",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true, rowspan: 2
    },
    "BI": {
      "label": "其他前期费用率%（按建筑面积）", "align": "center", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用率%（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BJ": {
      "label": "前期费用（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费用（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BK": {
      "label": "前期费用（不含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费用（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BL": {
      "label": "建设年限", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限", "tabTitle": "年限调整", "tab1": "range", title1: "包含", title2: "包含",defaultVal:'2',tab2:'update'
      }, "isFilter": true, rowspan: 2
    },
    "BM": {
      "label": "利率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "利率%", "tabTitle": "利率调整%", "tab1": "range", title1: "包含", title2: "包含",defaultVal:'0.0475',tab2:'update'
      }, "isFilter": true, rowspan: 2
    },
    "BN": {
      "label": "资金成本", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BO": {
      "label": "重置全价", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BP": {
      "label": "设计使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BQ": {
      "label": "已使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BR": {
      "label": "年限调整", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BS": {
      "label": "尚可使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BT": {
      "label": "成新率%", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },

  }, {
    "operation":{label:"操作",minWidth:140, isNoShow: true, prospecting: true ,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"},{value: 8, label: "收益法作价"},{value: 9, label: "市场法作价"},{value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "权证编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "权证编号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,"footLabel": ["合计"],fixed:true, standingBookShow: true
    },
    "C": {
      "label": "建筑物名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "建筑物名称", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true, standingBookShow: true
    },
    "D": {
      "label": "位置", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "位置", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "E": {
      "label": "对应土地证号", "align": "left", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "对应土地证号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "F": {
      "label": "结构", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "结构", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "G": {
      "label": "檐高（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "檐高（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "H": {
      "label": "层高（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "层高（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "I": {
      "label": "总层数", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "总层数", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "J": {
      "label": "所在层数", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "所在层数", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "K": {
      "label": "朝向", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "朝向", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "L": {
      "label": "吊车吨位", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "吊车吨位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "M": {
      "label": "跨度（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "跨度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "N": {
      "label": "柱距（m）", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "柱距（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "O": {
      "label": "使用单位", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "P": {
      "label": "开工年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "开工年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "Q": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "R": {
      "label": "计量单位", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "S": {
      "label": "建筑  面积/容积", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "建筑  面积/容积", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "T": {
      "label": "成本单价（元/m2）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成本单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true, standingBookShow: true
    },
    "U": {
      "label": "原值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "V": {
      "label": "净值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "W": {
      "label": "原值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "X": {
      "label": "净值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "Y": {
      "label": "原值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "Z": {
      "label": "净值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "AA": {
      "label": "原值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "AB": {
      "label": "成新率%", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率% ", "placeholder": ""
      }, "isFilter": true, "subHead": "评估价值", standingBookShow: true
    },
    "AC": {
      "label": "净值", "align": "right", "minWidth": 160, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "AD": {
      "label": "增值率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "AE": {
      "label": "评估单价（元/m2）", "right": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "评估单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true, standingBookShow: true
    },
    "AF": {
      "label": "备注", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "AG": {
      "label": "现场勘察简单记录", "align": "left", "minWidth": 180, "search": {
        "isShow": false, "type": "selectInput", "label": "现场勘察简单记录", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "AH": {
      "label": "证载权利人", "align": "left", "minWidth": 150, "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AJ": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AK": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AL": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AM": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AN": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },

    "AP": {
      "label": "基准造价（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AQ": {
      "label": "层数修正系数（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）",  "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AR": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AS": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AT": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AU": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AV": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AW": {
      "label": "其他因素修正", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AX": {
      "label": "修正后单方造价（含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AY": {
      "label": "修正后单方造价（不含税）", "align": "right", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AZ": {
      "label": "建安工程造价（含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BA": {
      "label": "建安工程造价（不含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BB": {
      "label": "建设单位管理费率%", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, isNoShow: true
    },
    "BC": {
      "label": "可行性研究费率%", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true, isNoShow: true
    },
    "BD": {
      "label": "招投标代理费率%", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, isNoShow: true
    },
    "BE": {
      "label": "环境影响评价费率%", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true,isNoShow: true
    },
    "BF": {
      "label": "勘察设计费率%", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率%",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, isNoShow: true
    },
    "BG": {
      "label": "工程监理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, isNoShow: true
    },
    "BH": {
      "label": "其他前期费用率%（按造价）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用率%（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"前期费用率%",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true, isNoShow: true
    },
    "BI": {
      "label": "其他前期费用率%（按建筑面积）", "align": "right", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用率%（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BJ": {
      "label": "前期费用（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费用（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BK": {
      "label": "前期费用（不含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "前期费用（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BL": {
      "label": "建设年限", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限", "tabTitle": "年限调整", "tab1": "range", title1: "包含", title2: "包含",defaultVal:'2',tab2:'update'
      }, "isFilter": true, isNoShow: true
    },
    "BM": {
      "label": "利率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "利率%", "placeholder": "","tab1": "range", title1: "包含", title2: "包含",defaultVal:'0.0475',tab2:'update',"tabTitle": "利率%调整",
      }, "isFilter": true, isNoShow: true
    },
    "BN": {
      "label": "资金成本", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BO": {
      "label": "重置全价", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BP": {
      "label": "设计使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BQ": {
      "label": "已使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BR": {
      "label": "年限调整", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BS": {
      "label": "尚可使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BT": {
      "label": "成新率%", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true
    },
  }],
  '29': [
    {
    //构筑物
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称", "placeholder": "请输入名称", title: "包含"
      }, "isFilter": true, rowspan: 2,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "结构", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "结构", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "使用单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "长度（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "长度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "宽度（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "宽度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "计量单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "面积体积m2或m3", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "面积体积m2或m3", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "JJ": {"label": "审计前账面值", "align": "center", colspan: 2},
    "LL": {"label": "审计调整", "align": "center", colspan: 2,},
    "NN": {"label": "账面价值", "align": "center", colspan: 2,},
    "PP": {"label": "评估价值", "align": "center", colspan: 3},
    "S": {
      "label": "增值率%", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "评估单价（元/m2）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "评估单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "U": {
      "label": "备注", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AA": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AC": {
      "label": "基准造价（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AD": {
      "label": "层数修正系数（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AE": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AF": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AG": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AH": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AI": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AJ": {
      "label": "其他因素修正", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AK": {
      "label": "修正后单方造价（含税）", "align": "center", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AL": {
      "label": "修正后单方造价（不含税）", "align": "center", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AM": {
      "label": "建安工程造价（含税）", "align": "center", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AN": {
      "label": "建安工程造价（不含税）", "align": "center", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AO": {
      "label": "建设单位管理费率%", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, rowspan: 2
    },
    "AP": {
      "label": "可行性研究费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true, rowspan: 2
    },
    "AQ": {
      "label": "招投标代理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, rowspan: 2
    },
    "AR": {
      "label": "环境影响评价费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true, rowspan: 2
    },
    "AS": {
      "label": "勘察设计费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率%",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, rowspan: 2
    },
    "AT": {
      "label": "工程监理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, rowspan: 2
    },
    "AU": {
      "label": "其他前期费用率%（按造价）", "minWidth": 240, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用率%（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"费用率%",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true, rowspan: 2
    },
    "AV": {
      "label": "其他前期费用率%（按建筑面积）", "align": "center", "minWidth": 260, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用率%（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AW": {
      "label": "前期费用（含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AX": {
      "label": "前期费用（不含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AY": {
      "label": "建设年限", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限","tab1": "range", title1: "包含", title2: "包含",tabTitle:"年限调整",tab2:"update",defaultVal:'2'
      }, "isFilter": true, rowspan: 2
    },
    "AZ": {
      "label": "利率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "利率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"利率调整%",tab2:"update",defaultVal:'0.0475'
      }, "isFilter": true, rowspan: 2
    },
    "BA": {
      "label": "资金成本", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BB": {
      "label": "重置全价", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BC": {
      "label": "设计使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BD": {
      "label": "已使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BE": {
      "label": "年限调整", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BF": {
      "label": "尚可使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BG": {
      "label": "成新率%", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称", "placeholder": "请输入名称", title: "包含"
      }, "isFilter": true, isNoShow: true,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "结构", "align": "left", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "结构", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "使用单位", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "长度（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "长度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "G": {
      "label": "宽度（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "宽度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "H": {
      "label": "计量单位", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "I": {
      "label": "面积体积m2或m3", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "面积体积m2或m3", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "J": {
      "label": "原值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "K": {
      "label": "净值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "L": {
      "label": "原值", "align": "right", "minWidth":140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "M": {
      "label": "净值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "N": {
      "label": "原值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "O": {
      "label": "净值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "P": {
      "label": "原值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "Q": {
      "label": "成新率%", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率% ", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "R": {
      "label": "净值", "align": "right", "minWidth": 140, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "S": {
      "label": "增值率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "评估单价（元/m2）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "评估单价（元/m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "U": {
      "label": "备注", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AA": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AC": {
      "label": "基准造价（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AD": {
      "label": "层数修正系数（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AE": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AF": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AG": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AH": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AI": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AJ": {
      "label": "其他因素修正", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AK": {
      "label": "修正后单方造价（含税）", "align": "right", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AL": {
      "label": "修正后单方造价（不含税）", "align": "right", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AM": {
      "label": "建安工程造价（含税）", "align": "right", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AN": {
      "label": "建安工程造价（不含税）", "align": "right", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AO": {
      "label": "建设单位管理费率%", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, isNoShow: true
    },
    "AP": {
      "label": "可行性研究费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true, isNoShow: true
    },
    "AQ": {
      "label": "招投标代理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, isNoShow: true
    },
    "AR": {
      "label": "环境影响评价费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true, isNoShow: true
    },
    "AS": {
      "label": "勘察设计费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率%",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, isNoShow: true
    },
    "AT": {
      "label": "工程监理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, isNoShow: true
    },
    "AU": {
      "label": "其他前期费用率%（按造价）", "minWidth": 240, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用率%（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"费用率%",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true,isNoShow: true
    },
    "AV": {
      "label": "其他前期费用率%（按建筑面积）", "align": "right", "minWidth": 260, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用率%（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AW": {
      "label": "前期费用（含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AX": {
      "label": "前期费用（不含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AY": {
      "label": "建设年限", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限","tab1": "range", title1: "包含", title2: "包含",tabTitle:"年限调整",tab2:"update",defaultVal:'2'
      }, "isFilter": true, isNoShow: true
    },
    "AZ": {
      "label": "利率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "利率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"利率调整%",tab2:"update",defaultVal:'0.0475'
      }, "isFilter": true, isNoShow: true
    },
    "BA": {
      "label": "资金成本", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BB": {
      "label": "重置全价", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BC": {
      "label": "设计使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BD": {
      "label": "已使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BE": {
      "label": "年限调整", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BF": {
      "label": "尚可使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BG": {
      "label": "成新率%", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true
    },
  }],
  '30': [
    {
    //管道沟槽
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称", "placeholder": "请输入名称", title: "包含"
      }, "isFilter": true, rowspan: 2,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "使用单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "长度（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "长度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "漕深（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "漕深（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "沟宽*沟厚（mm*mm） 管径*壁厚（mm*mm）", "align": "center", "minWidth": 360, "search": {
        "isShow": false, "type": "selectInput", "label": "沟宽*沟厚（mm*mm） 管径*壁厚（mm*mm）", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "材质", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "材质", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "绝缘方式", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "绝缘方式", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "JJ": {"label": "审计前账面值", "align": "center",  colspan: 2},
    "LL": {"label": "审计调整", "align": "center",  colspan: 2},
    "NN": {"label": "账面价值", "align": "center",  colspan: 2},
    "PP": {"label": "评估价值", "align": "center",  colspan: 3},
    "S": {
      "label": "增值率%", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "备注", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AB": {
      "label": "基准造价（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AC": {
      "label": "层数修正系数（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AD": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AE": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AF": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AG": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AH": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2,limits:true
    },
    "AI": {
      "label": "其他因素修正", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, rowspan: 2
    },
    "AJ": {
      "label": "修正后单方造价（含税）", "align": "center", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AK": {
      "label": "修正后单方造价（不含税）", "align": "center", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AL": {
      "label": "建安工程造价（含税）", "align": "center", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AM": {
      "label": "建安工程造价（不含税）", "align": "center", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AN": {
      "label": "建设单位管理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, rowspan: 2
    },
    "AO": {
      "label": "可行性研究费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true, rowspan: 2
    },
    "AP": {
      "label": "招投标代理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, rowspan: 2
    },
    "AQ": {
      "label": "环境影响评价费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true, rowspan: 2
    },
    "AR": {
      "label": "勘察设计费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率%",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, rowspan: 2
    },
    "AS": {
      "label": "工程监理费率%", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, rowspan: 2
    },
    "AT": {
      "label": "其他前期费用率%（按造价）", "minWidth": 228, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用率%（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"费用率%",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true, rowspan: 2
    },
    "AU": {
      "label": "其他前期费用率%（按建筑面积）", "align": "center", "minWidth": 254, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用率%（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AV": {
      "label": "前期费用（含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AW": {
      "label": "前期费用（不含税）", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AX": {
      "label": "建设年限", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"年限调整",tab2:"update",defaultVal:'2'
      }, "isFilter": true, rowspan: 2
    },
    "AY": {
      "label": "利率%", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "利率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"利率调整%",tab2:"update",defaultVal:'0.0475'
      }, "isFilter": true, rowspan: 2
    },
    "AZ": {
      "label": "资金成本", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BA": {
      "label": "重置全价", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BB": {
      "label": "设计使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BC": {
      "label": "已使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BD": {
      "label": "年限调整", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BE": {
      "label": "尚可使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "BF": {
      "label": "成新率%", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称", "placeholder": "请输入名称", title: "包含"
      }, "isFilter": true, isNoShow: true,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "使用单位", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "长度（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "长度（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "漕深（m）", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "漕深（m）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "沟宽*沟厚（mm*mm） 管径*壁厚（mm*mm）", "align": "center", "minWidth": 360, "search": {
        "isShow": false, "type": "selectInput", "label": "沟宽*沟厚（mm*mm） 管径*壁厚（mm*mm）", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "G": {
      "label": "材质", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "selectInput", "label": "材质", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "H": {
      "label": "绝缘方式", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "绝缘方式", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "I": {
      "label": "建成年月", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "建成年月", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "J": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "K": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "L": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "M": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "N": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "O": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "P": {
      "label": "原值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "Q": {
      "label": "成新率%", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率% ", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "R": {
      "label": "净值", "align": "right", "minWidth": 100, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "S": {
      "label": "增值率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "备注", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AB": {
      "label": "基准造价（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "基准造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AC": {
      "label": "层数修正系数（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "层数修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AD": {
      "label": "檐高、层高修正系数（±5）", "minWidth": 220, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "檐高、层高修正系数（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AE": {
      "label": "跨度修正（±5）", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "跨度修正（±5）","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AF": {
      "label": "屋面、楼面修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "屋面、楼面修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AG": {
      "label": "内（外）粉修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "内（外）粉修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AH": {
      "label": "水电卫、暖通修正（±5）", "minWidth": 200, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "水电卫、暖通修正（±5）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true,limits:true
    },
    "AI": {
      "label": "其他因素修正", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他因素修正","tab1": "range", title1: "包含", title2: "包含",tabTitle:"修正系数",tab2:"update"
      }, "isFilter": true, isNoShow: true
    },
    "AJ": {
      "label": "修正后单方造价（含税）", "align": "right", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AK": {
      "label": "修正后单方造价（不含税）", "align": "right", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "修正后单方造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AL": {
      "label": "建安工程造价（含税）", "align": "right", "minWidth": 220, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AM": {
      "label": "建安工程造价（不含税）", "align": "right", "minWidth": 240, "search": {
        "isShow": false, "type": "range", "label": "建安工程造价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AN": {
      "label": "建设单位管理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "建设单位管理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率%",tab2:"update",defaultVal:'0.60'
      }, "isFilter": true, isNoShow: true
    },
    "AO": {
      "label": "可行性研究费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "可行性研究费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率%",tab2:"update",defaultVal:'0.14'
      }, "isFilter": true,isNoShow: true
    },
    "AP": {
      "label": "招投标代理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "招投标代理费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率%",tab2:"update",defaultVal:'0.05'
      }, "isFilter": true, isNoShow: true
    },
    "AQ": {
      "label": "环境影响评价费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "环境影响评价费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率%",tab2:"update",defaultVal:'0.04'
      }, "isFilter": true, isNoShow: true
    },
    "AR": {
      "label": "勘察设计费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "勘察设计费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率%",tab2:"update",defaultVal:'2.28'
      }, "isFilter": true, isNoShow: true
    },
    "AS": {
      "label": "工程监理费率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "工程监理费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率%",tab2:"update",defaultVal:'1.40'
      }, "isFilter": true, isNoShow: true
    },
    "AT": {
      "label": "其他前期费用率%（按造价）", "minWidth": 228, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "其他前期费用率%（按造价）", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"费用率%",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true, isNoShow: true
    },
    "AU": {
      "label": "其他前期费用率%（按建筑面积）", "align": "right", "minWidth": 254, "search": {
        "isShow": false, "type": "range", "label": "其他前期费用率%（按建筑面积）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AV": {
      "label": "前期费用（含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AW": {
      "label": "前期费用（不含税）", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "前期费用（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AX": {
      "label": "建设年限", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "建设年限", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"年限调整",tab2:"update",defaultVal:'2'
      }, "isFilter": true, isNoShow: true
    },
    "AY": {
      "label": "利率%", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "利率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"利率调整%",tab2:"update",defaultVal:'0.0475'
      }, "isFilter": true, isNoShow: true
    },
    "AZ": {
      "label": "资金成本", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BA": {
      "label": "重置全价", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "重置全价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BB": {
      "label": "设计使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "设计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BC": {
      "label": "已使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BD": {
      "label": "年限调整", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BE": {
      "label": "尚可使用年限", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "BF": {
      "label": "成新率%", "align": "right", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true
    },
  }],
  '31': [
    {
    //机器设备
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 5, label: "二手作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "设备编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "设备编号", "placeholder": "请输入设备编号", title: "包含"
      }, "isFilter": true, rowspan: 2,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "设备名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "设备名称", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "规格型号", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "使用单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "生产厂家", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "生产厂家", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "计量单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "数量", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "购置日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "J": {
      "label": "启用日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "KK": {"label": "审计前账面值", "align": "center",  colspan: 2},
    "MM": {"label": "审计调整", "align": "center",  colspan: 2},
    "OO": {"label": "账面价值", "align": "center",  colspan: 2},
    "QQ": {"label": "评估价值", "align": "center",  colspan: 3},
    "T": {
      "label": "增值率%", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "备注", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AA": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AC": {
      "label": "经济年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "经济年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AD": {
      "label": "已使用年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AE": {
      "label": "年限调整", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AF": {
      "label": "尚可使用年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AG": {
      "label": "成新率%", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AH": {
      "label": "购置价格（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "购置价格（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AII": {"label": "购置价格（不含税）", "align": "center",  colspan: 2},
    "AKK": {"label": "运杂费", "align": "center",  colspan: 2},
    "AMM": {"label": "设备基础费", "align": "center",  colspan: 2},
    "AOO": {"label": "安装调试费", "align": "center",  colspan: 2},
    "AQ": {
      "label": "小计", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "ARR": {"label": "建设单位管理费", "align": "center",  colspan: 2},
    "ATT": {"label": "工程监理费", "align": "center",  colspan: 2},
    "AVV": {"label": "环境评价费", "align": "center",  colspan: 2},
    "AXX": {"label": "可行性研究费", "align": "center",  colspan: 2},
    "AZZ": {"label": "勘察费设计费", "align": "center",  colspan: 2},
    "BBB": {"label": "招投标代理费", "align": "center",  colspan: 2},
    "BDD": {"label": "联合试运转费", "align": "center",  colspan: 2},
    "BFF": {"label": "其他费", "align": "center",  colspan: 2},
    "BH": {
      "label": "小计", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BII": {"label": "资金成本", "align": "center",  colspan: 2},
    "BK": {
      "label": "重置全价(取整)", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BLL": {"label": "增值税", "align": "center",  colspan: 3},
    "BO": {
      "label": "重置全价(取整)", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)",  title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BP": {
      "label": "离岸价原币(FOB)", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "离岸价原币(FOB)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BQQ": {"label": "国际运费", "align": "center",  colspan: 2},
    "BSS": {"label": "运输保险费", "align": "center",  colspan: 2},
    "BUU": {"label": "基准日美元汇率", "align": "center",  colspan: 2},
    "BW": {
      "label": "到岸价(CIF)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "到岸价(CIF)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BXX": {"label": "银行财务费", "align": "center",  colspan: 2},
    "BZZ": {"label": "外贸手续费", "align": "center",  colspan: 2},
    "CBB": {"label": "关税", "align": "center",  colspan: 2},
    "CDD": {"label": "消费税", "align": "center",  colspan: 2},
    "CFF": {"label": "增值税", "align": "center",  colspan: 2},
    "CHH": {"label": "商检费", "align": "center",  colspan: 2},
    "CJJ": {"label": "其他费", "align": "center",  colspan: 2},
    "CL":  {
      "label": "进口设备(抵岸价)", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "进口设备(抵岸价)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "CM": {
      "label": "是否进口", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "selectSingle", "label": "是否进口", termArr:['是','否']
      }, "isFilter": true, rowspan: 2,isSelect:true,options:[{value:'是',label:'是'},{value:'否',label:'否'}]
    },
    "CN": {
      "label": "二手价", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "二手价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "CO": {
      "label": "询价记录", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "询价记录", "placeholder": "", title: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 5, label: "二手作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "设备编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "设备编号", "placeholder": "请输入设备编号", title: "包含"
      }, "isFilter": true, isNoShow: true,"footLabel": ["合计"],fixed:true, standingBookShow: true
    },
    "C": {
      "label": "设备名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "设备名称", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true, standingBookShow: true
    },
    "D": {
      "label": "规格型号", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "E": {
      "label": "使用单位", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "F": {
      "label": "生产厂家", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "生产厂家", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "G": {
      "label": "计量单位", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "H": {
      "label": "数量", "align": "right", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "I": {
      "label": "购置日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "J": {
      "label": "启用日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "K": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "L": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "M": {
      "label": "原值", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "N": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "O": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "P": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "Q": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "R": {
      "label": "成新率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率% ", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值", standingBookShow: true
    },
    "S": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "T": {
      "label": "增值率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "U": {
      "label": "备注", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AA": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AC": {
      "label": "经济年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "经济年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AD": {
      "label": "已使用年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AE": {
      "label": "年限调整", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AF": {
      "label": "尚可使用年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AG": {
      "label": "成新率%", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AH": {
      "label": "购置价格（含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "购置价格（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AI": {
      "label": "进口货物增值税率%", "align": "right", "minWidth": 180, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "进口货物增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "设备购置价（不含税）"
    },
    "AJ": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "设备购置价（不含税）"
    },
    "AK": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"运杂费率",tab2:"update",defaultVal:'1.00'
      }, "isFilter": true,"isThousands":true, "subHead": "运杂费"
    },
    "AL": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "运杂费"
    },
    "AM": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"基础费率",tab2:"update",defaultVal:'2.00'
      }, "isFilter": true,"isThousands":true, "subHead": "设备基础费"
    },
    "AN": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "设备基础费"
    },
    "AO": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"调试费率",tab2:"update",defaultVal:'5.00'
      }, "isFilter": true,"isThousands":true, "subHead": "安装调试费"
    },
    "AP": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "安装调试费"
    },
    "AQ": {
      "label": "小计", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AR": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率",tab2:"update",defaultVal:'1.07'
      }, "isFilter": true,"isThousands":true, "subHead": "建设单位管理费"
    },
    "AS": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "建设单位管理费"
    },
    "AT": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率",tab2:"update",defaultVal:'1.70'
      }, "isFilter": true,"isThousands":true, "subHead": "工程监理费"
    },
    "AU": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "工程监理费"
    },
    "AV": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率",tab2:"update",defaultVal:'0.07'
      }, "isFilter": true,"isThousands":true, "subHead": "环境评价费"
    },
    "AW": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "环境评价费"
    },
    "AX": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率",tab2:"update",defaultVal:'0.30'
      }, "isFilter": true,"isThousands":true, "subHead": "可行性研究费"
    },
    "AY": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "可行性研究费"
    },
    "AZ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率",tab2:"update",defaultVal:'3.10'
      }, "isFilter": true,"isThousands":true, "subHead": "勘察费设计费"
    },
    "BA": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "勘察费设计费"
    },
    "BB": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率",tab2:"update",defaultVal:'0.10'
      }, "isFilter": true,"isThousands":true, "subHead": "招投标代理费"
    },
    "BC": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "招投标代理费"
    },
    "BD": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"运转费率",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true,"isThousands":true, "subHead": "联合试运转费"
    },
    "BE": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "联合试运转费"
    },
    "BF": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"其他费率",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "BG": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "BH": {
      "label": "小计", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BI": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"成本费率",tab2:"update",defaultVal:'4.35'
      }, "isFilter": true,"isThousands":true, "subHead": "资金成本"
    },
    "BJ": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "资金成本"
    },
    "BK": {
      "label": "重置全价(取整)", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BL": {
      "label": "交通运输业增值税率%", "align": "right", "minWidth": 200, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "交通运输业增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "增值税"
    },
    "BM": {
      "label": "服务业增值税率%", "align": "right", "minWidth": 180, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "服务业增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "增值税"
    },
    "BN": {
      "label": "增值税", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "增值税", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "增值税"
    },
    "BO": {
      "label": "重置全价(取整)", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)",  title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BP": {
      "label": "离岸价原币(FOB)", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "离岸价原币(FOB)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BQ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"国际运费率",tab2:"update",defaultVal:'3.00'
      }, "isFilter": true,"isThousands":true, "subHead": "国际运费"
    },
    "BR": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "国际运费"
    },
    "BS": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"保险费率",tab2:"update",defaultVal:'0.40'
      }, "isFilter": true,"isThousands":true, "subHead": "运输保险费"
    },
    "BT": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "运输保险费"
    },
    "BU": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"汇率费率",tab2:"update",defaultVal:'6.3393'
      }, "isFilter": true,"isThousands":true, "subHead": "基准日美元汇率"
    },
    "BV": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "基准日美元汇率"
    },
    "BW": {
      "label": "到岸价(CIF)", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到岸价(CIF)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BX": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"财务费率",tab2:"update",defaultVal:'0.15'
      }, "isFilter": true,"isThousands":true, "subHead": "银行财务费"
    },
    "BY": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "银行财务费"
    },
    "BZ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"手续费率",tab2:"update",defaultVal:'1.00'
      }, "isFilter": true,"isThousands":true, "subHead": "外贸手续费"
    },
    "CA": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "外贸手续费"
    },
    "CB": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"关税费率",tab2:"update",defaultVal:'10.00'
      }, "isFilter": true,"isThousands":true, "subHead": "关税"
    },
    "CC": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "关税"
    },
    "CD": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"消费税费率",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true,"isThousands":true, "subHead": "消费税"
    },
    "CE": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "消费税"
    },
    "CF": {
      "label": "进口货物增值税率%", "align": "right", "minWidth": 180, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "进口货物增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "增值税"
    },
    "CG": {
      "label": "增值税", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "增值税", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "增值税"
    },
    "CH": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"商检费率",tab2:"update",defaultVal:'0.30'
      }, "isFilter": true,"isThousands":true, "subHead": "商检费"
    },
    "CI": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "商检费"
    },
    "CJ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%", "tab1": "range", title1: "包含", title2: "包含",tabTitle:"其他费率",tab2:"update",defaultVal:'0.00'
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "CK": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额",  title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "CL":  {
      "label": "进口设备(抵岸价)", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "进口设备(抵岸价)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "CM": {
      "label": "是否进口", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "selectSingle", "label": "是否进口", termArr:['是','否']
      }, "isFilter": true, isNoShow: true,isSelect:true,options:[{value:'是',label:'是'},{value:'否',label:'否'}]
    },
    "CN": {
      "label": "二手价", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "二手价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "CO": {
      "label": "询价记录", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "询价记录", "placeholder": "", title: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true
    },
  }],
  '32': [
    {
    //车辆
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 5, label: "二手作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "资产编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "资产编号", "placeholder": "请输入资产编号", title: "包含"
      }, "isFilter": true, rowspan: 2,"footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "车辆牌号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "车辆牌号", "placeholder": "请输入车辆牌号", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "车辆名称及规格型号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "车辆名称及规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "E": {
      "label": "使用单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "生产厂家", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "生产厂家", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "计量单位", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "selectSingle", "label": "计量单位", termArr:['辆']
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "数量", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "购置日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "J": {
      "label": "启用日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "k": {
      "label": "已行驶里程（公里）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已行驶里程（公里）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": false, rowspan: 2
    },
    "KK": {"label": "审计前账面值", "align": "center",colspan: 2},
    "MM": {"label": "审计调整", "align": "center",colspan: 2},
    "OO": {"label": "账面价值", "align": "center",colspan: 2},
    "QQ": {"label": "评估价值", "align": "center", colspan: 3},
    "U": {
      "label": "增值率%", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "备注", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "证载权利人", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AA": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AB": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AC": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AE": {
      "label": "购置价（含税）", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "购置价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AF": {
      "label": "购置税", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "购置税","tab1": "range", title1: "包含", title2: "包含",tabTitle:"税率调整%",tab2:"update",regType:'1',placeholder2:'请输入大于或为0的数值'
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AG": {
      "label": "牌照费和其它费", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "牌照费和其它费", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AH": {
      "label": "重置价（不含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "重置价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AI": {
      "label": "经济使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "经济使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AJ": {
      "label": "已使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AK": {
      "label": "年限调整", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AL": {
      "label": "尚可使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AM": {
      "label": "年限成新率%", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "年限成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AN": {
      "label": "规定里程", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "规定里程", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AO": {
      "label": "里程成新率%", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "里程成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AP": {
      "label": "最终成新率%", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "最终成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AQ": {
      "label": "二手价", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "二手价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AR": {
      "label": "查价/询价记录", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "查价/询价记录", "placeholder": "", title: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },
  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 5, label: "二手作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "资产编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "资产编号", "placeholder": "请输入资产编号", title: "包含"
      }, "isFilter": true, rowspan: 2,isNoShow: true,"footLabel": ["合计"],fixed:true, standingBookShow: true
    },
    "C": {
      "label": "车辆牌号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "车辆牌号", "placeholder": "请输入车辆牌号", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true, standingBookShow: true
    },
    "D": {
      "label": "车辆名称及规格型号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "车辆名称及规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true, standingBookShow: true
    },
    "E": {
      "label": "使用单位", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "F": {
      "label": "生产厂家", "align": "left", "minWidth": 130, "search": {
        "isShow": false, "type": "selectInput", "label": "生产厂家", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "G": {
      "label": "计量单位", "align": "right", "minWidth": 130, "search": {
        "isShow": false, "type": "selectSingle", "label": "计量单位", "placeholder": "",termArr:['辆']
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "H": {
      "label": "数量", "align": "right", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "I": {
      "label": "购置日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "J": {
      "label": "启用日期", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "K": {
      "label": "已行驶里程（公里）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "已行驶里程（公里）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "L": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "M": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "N": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "O": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "P": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "Q": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "R": {
      "label": "原值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "S": {
      "label": "成新率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率% ", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值", standingBookShow: true
    },
    "T": {
      "label": "净值", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "U": {
      "label": "增值率%", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,isNoShow: true, standingBookShow: true
    },
    "V": {
      "label": "备注", "align": "left", "minWidth": 120, "search": {
        "isShow": false, "type": "selectInput", "label": "备注", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "W": {
      "label": "证载权利人", "align": "left", "minWidth": 150, "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AA": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AB": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AC": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AE": {
      "label": "购置价（含税）", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "购置价（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AF": {
      "label": "购置税", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "购置税","tab1": "range", title1: "包含", title2: "包含",tabTitle:"税率调整%",tab2:"update",regType:'1',placeholder2:'请输入大于或为0的数值'
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AG": {
      "label": "牌照费和其它费", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "牌照费和其它费", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AH": {
      "label": "重置价（不含税）", "align": "right", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "重置价（不含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AI": {
      "label": "经济使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "经济使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AJ": {
      "label": "已使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AK": {
      "label": "年限调整", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AL": {
      "label": "尚可使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AM": {
      "label": "年限成新率%", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "年限成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AN": {
      "label": "规定里程", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "规定里程", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AO": {
      "label": "里程成新率%", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "里程成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AP": {
      "label": "最终成新率%", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "最终成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AQ": {
      "label": "二手价", "align": "right", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "二手价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AR": {
      "label": "查价/询价记录", "align": "left", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "查价/询价记录", "placeholder": "", title: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true
    }
  }],
  '51': [
    {
    //电子设备
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 5, label: "二手作价"}, {value: 6, label: "特殊作价"},{value:10,label:"成本法快捷版作价"}]
      }, "isFilter": true, "selected": true,rowspan: 2, fixed:true
    },
    "B": {
      "label": "设备编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "设备编号", "placeholder": "请输入设备编号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "设备名称", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "设备名称", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "规格型号", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "使用单位", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "生产厂家", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "生产厂家", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "计量单位", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "数量", "minWidth": 100, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "购置日期", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "J": {
      "label": "启用日期", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "KK": {"label": "审计前账面值", "align": "center",colspan: 2},
    "MM": {"label": "审计调整", "align": "center",colspan: 2},
    "OO": {"label": "账面价值", "align": "center",colspan: 2},
    "QQQ": {"label": "评估价值", "align": "center", colspan: 3},
    "T": {
      "label": "增值率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏4", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AA": {
      "label": "草稿栏5", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AC": {
      "label": "经济年限", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "经济年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AD": {
      "label": "已使用年限", "minWidth": 130, "align": "center", "align": "center", "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AE": {
      "label": "年限调整", "minWidth": 130, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AF": {
      "label": "尚可使用年限", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AG": {
      "label": "成新率%", "minWidth": 100, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AH": {
      "label": "购置价格（含税）", "minWidth": 180, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "购置价格（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "AII":{"label": "购置价格（不含税）", "align": "center",colspan: 2},
    "AKK":{"label": "运杂费", "align": "center",colspan: 2},
    "AMM":{"label": "设备基础费", "align": "center",colspan: 2},
    "AOO":{"label": "安装调试费", "align": "center",colspan: 2},
    "AQ": {
      "label": "小计", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "ARR":{"label": "建设单位管理费", "align": "center",colspan: 2},
    "ATT":{"label": "工程监理费", "align": "center",colspan: 2},
    "AVV":{"label": "环境评价费", "align": "center",colspan: 2},
    "AXX":{"label": "可行性研究费", "align": "center",colspan: 2},
    "AZZ":{"label": "勘察费设计费", "align": "center",colspan: 2},
    "BBB":{"label": "招投标代理费", "align": "center",colspan: 2},
    "BDD":{"label": "联合试运转费", "align": "center",colspan: 2},
    "BFF":{"label": "其他费", "align": "center",colspan: 2},
    "BH": {
      "label": "小计", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "小计","tab1": "range", title1: "包含", title2: "包含",tabTitle:"费率调整%",tab2:"update",regType:'1',placeholder2:'请输入大于或为0的数值'
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BII":{"label": "资金成本", "align": "center",colspan: 2},
    "BK": {
      "label": "重置全价(取整)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BLL":{"label": "增值税", "align": "center",colspan: 3},
    "BO": {
      "label": "重置全价(取整)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BP": {
      "label": "离岸价原币(FOB)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "离岸价原币(FOB)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BQQ":{"label": "国际运费", "align": "center",colspan: 2},
    "BSS":{"label": "运输保险费", "align": "center",colspan: 2},
    "BUU":{"label": "基准日美元汇率", "align": "center",colspan: 2},
    "BW": {
      "label": "到岸价(CIF)", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到岸价(CIF)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "BXX":{"label": "银行财务费", "align": "center",colspan: 2},
    "BZZ":{"label": "外贸手续费", "align": "center",colspan: 2},
    "CBB":{"label": "关税", "align": "center",colspan: 2},
    "CDD":{"label": "消费税", "align": "center",colspan: 2},
    "CFF":{"label": "增值税", "align": "center",colspan: 2},
    "CHH":{"label": "商检费", "align": "center",colspan: 2},
    "CJJ":{"label": "其他费", "align": "center",colspan: 2},
    "CL": {
      "label": "进口设备(抵岸价)", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "进口设备(抵岸价)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "CM": {
      "label": "是否进口", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "selectSingle", "label": "是否进口", termArr:['是','否']
      }, "isFilter": true, rowspan: 2,isSelect:true,options:[{value:'是',label:'是'},{value:'否',label:'否'}]
    },
    "CN":  {
      "label": "二手价", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "二手价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "CO":  {
      "label": "询价记录", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "询价记录", "placeholder": "", title: "包含", "last": "true"
      }, "isFilter": true, rowspan: 2
    },
  },{
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 3, label: "成本法作价"}, {value: 5, label: "二手作价"}, {value: 6, label: "特殊作价"},{value:10,label:"成本法快捷版作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "设备编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "设备编号", "placeholder": "请输入设备编号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true, standingBookShow: true
    },
    "C": {
      "label": "设备名称", "minWidth": 188, "left": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "设备名称", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true, standingBookShow: true
    },
    "D": {
      "label": "规格型号", "minWidth": 130, "left": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "E": {
      "label": "使用单位", "minWidth": 130, "left": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "F": {
      "label": "生产厂家", "minWidth": 130, "left": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "生产厂家", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "G": {
      "label": "计量单位", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "计量单位", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "H": {
      "label": "数量", "minWidth": 100, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "I": {
      "label": "购置日期", "minWidth": 130, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "J": {
      "label": "启用日期", "minWidth": 130, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "启用日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "K": {
      "label": "原值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "L": {
      "label": "净值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值", standingBookShow: true
    },
    "M": {
      "label": "原值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "N": {
      "label": "净值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整", standingBookShow: true
    },
    "O": {
      "label": "原值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "P": {
      "label": "净值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值", standingBookShow: true
    },
    "Q": {
      "label": "原值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "R": {
      "label": "成新率%", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值", standingBookShow: true
    },
    "S": {
      "label": "净值", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值", standingBookShow: true
    },
    "T": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "U": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", 'placeholder': '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true, standingBookShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AA": {
      "label": "草稿栏5", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AC": {
      "label": "经济年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "经济年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AD": {
      "label": "已使用年限", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "已使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AE": {
      "label": "年限调整", "align": "center", "minWidth": 130, "search": {
        "isShow": false, "type": "range", "label": "年限调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AF": {
      "label": "尚可使用年限", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AG": {
      "label": "成新率%", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "AH": {
      "label": "购置价格（含税）", "align": "center", "minWidth": 180, "search": {
        "isShow": false, "type": "range", "label": "购置价格（含税）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AI": {
      "label": "进口货物增值税率%", "align": "right", "minWidth": 180, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "进口货物增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "设备购置价（不含税）"
    },
    "AJ": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "设备购置价（不含税）"
    },
    "AK": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"运杂费率",tab2:"update",defaultVal: '1.00',
      }, "isFilter": true,"isThousands":true, "subHead": "运杂费"
    },
    "AL": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "运杂费"
    },
    "AM": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"基础费率",tab2:"update",defaultVal: '2.00',
      }, "isFilter": true,"isThousands":true, "subHead": "设备基础费"
    },
    "AN": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "设备基础费"
    },
    "AO": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"调试费率",tab2:"update",defaultVal: '5.00',
      }, "isFilter": true,"isThousands":true, "subHead": "安装调试费"
    },
    "AP": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "安装调试费"
    },
    "AQ": {
      "label": "小计", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "AR": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"管理费率",tab2:"update",defaultVal: '1.07',
      }, "isFilter": true,"isThousands":true, "subHead": "建设单位管理费"
    },
    "AS": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "建设单位管理费"
    },
    "AT": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"监理费率",tab2:"update",defaultVal: '1.70',
      }, "isFilter": true,"isThousands":true, "subHead": "工程监理费"
    },
    "AU": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "工程监理费"
    },
    "AV": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"评价费率",tab2:"update",defaultVal: '0.07',
      }, "isFilter": true,"isThousands":true, "subHead": "环境评价费"
    },
    "AW": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "环境评价费"
    },
    "AX": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"研究费率",tab2:"update",defaultVal: '0.30',
      }, "isFilter": true,"isThousands":true, "subHead": "可行性研究费"
    },
    "AY": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "可行性研究费"
    },
    "AZ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"设计费率",tab2:"update",defaultVal: '3.10',
      }, "isFilter": true,"isThousands":true, "subHead": "勘察费设计费"
    },
    "BA": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "勘察费设计费"
    },
    "BB": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"代理费率",tab2:"update",defaultVal: '0.10',
      }, "isFilter": true,"isThousands":true, "subHead": "招投标代理费"
    },
    "BC": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "招投标代理费"
    },
    "BD": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"运转费率",tab2:"update",defaultVal: '0.00',
      }, "isFilter": true,"isThousands":true, "subHead": "联合试运转费"
    },
    "BE": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "联合试运转费"
    },
    "BF": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"其他费率",tab2:"update",defaultVal: '0.00',
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "BG": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "BH": {
      "label": "小计", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "小计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BI": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"成本费率",tab2:"update",defaultVal: '4.35',
      }, "isFilter": true,"isThousands":true, "subHead": "资金成本"
    },
    "BJ": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "资金成本"
    },
    "BK": {
      "label": "重置全价(取整)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BL": {
      "label": "交通运输业增值税率%", "align": "right", "minWidth": 200, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "交通运输业增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "增值税"
    },
    "BM": {
      "label": "服务业增值税率%", "align": "right", "minWidth": 180, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "交通运输业增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "增值税"
    },
    "BN": {
      "label": "增值税", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "增值税", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "增值税"
    },
    "BO": {
      "label": "重置全价(取整)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "重置全价(取整)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BP": {
      "label": "离岸价原币(FOB)", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "离岸价原币(FOB)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BQ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"国际运费率",tab2:"update",defaultVal: '3.00',
      }, "isFilter": true,"isThousands":true, "subHead": "国际运费"
    },
    "BR": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "国际运费"
    },
    "BS": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"保险费率",tab2:"update",defaultVal: '0.40',
      }, "isFilter": true,"isThousands":true, "subHead": "运输保险费"
    },
    "BT": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "运输保险费"
    },
    "BU": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"汇率费率",tab2:"update",defaultVal: '6.3393',
      }, "isFilter": true,"isThousands":true, "subHead": "基准日美元汇率"
    },
    "BV": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "基准日美元汇率"
    },
    "BW": {
      "label": "到岸价(CIF)", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到岸价(CIF)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "BX": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"财务费率",tab2:"update",defaultVal: '0.15',
      }, "isFilter": true,"isThousands":true, "subHead": "银行财务费"
    },
    "BY": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "银行财务费"
    },
    "BZ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"手续费率",tab2:"update",defaultVal: '1.00',
      }, "isFilter": true,"isThousands":true, "subHead": "外贸手续费"
    },
    "CA": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "外贸手续费"
    },
    "CB": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"关税费率",tab2:"update",defaultVal: '10.00',
      }, "isFilter": true,"isThousands":true, "subHead": "关税"
    },
    "CC": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "关税"
    },
    "CD": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"消费税费率",tab2:"update",defaultVal: '0.00',
      }, "isFilter": true,"isThousands":true, "subHead": "消费税"
    },
    "CE": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "消费税"
    },
    "CF": {
      "label": "进口货物增值税率%", "align": "right", "minWidth": 180, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "进口货物增值税率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "增值税"
    },
    "CG": {
      "label": "增值税", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "增值税", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "增值税"
    },
    "CH": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"商检费率",tab2:"update",defaultVal: '0.30',
      }, "isFilter": true,"isThousands":true, "subHead": "商检费"
    },
    "CI": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "商检费"
    },
    "CJ": {
      "label": "费率%", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "tab", "label": "费率%","tab1": "range", title1: "包含", title2: "包含",tabTitle:"其他费率",tab2:"update",defaultVal: '0.00',
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "CK": {
      "label": "金额", "align": "right", "minWidth": 120, "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "其他费"
    },
    "CL": {
      "label": "进口设备(抵岸价)", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "range", "label": "进口设备(抵岸价)", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "CM": {
      "label": "是否进口", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "selectSingle", "label": "是否进口", termArr:['是','否']
      }, "isFilter": true, isNoShow: true,isSelect:true,options:[{value:'是',label:'是'},{value:'否',label:'否'}]
    },
    "CN":  {
      "label": "二手价", "align": "center", "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "二手价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "CO":  {
      "label": "询价记录", "align": "center", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "询价记录", "placeholder": "", title: "包含", "last": "true"
      }, "isFilter": true, isNoShow: true,
    },
  }],
  '52': [
    {
    //土地
    "operation":{label:"操作",minWidth:60, rowspan: 2, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "土地权证编号", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "土地权证编号", "placeholder": "", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "宗地名称", "minWidth": 188, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "宗地名称", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "土地位置", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "土地位置", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "E": {
      "label": "取得日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "用地性质", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "用地性质", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "准用年限", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "准用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "开发程度", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "开发程度", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "I": {
      "label": "面积（m2）", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "面积（m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "JJ": {"label": "审计前账面值", "align": "center",colspan: 2},
    "LL": {"label": "审计调整", "align": "center",colspan: 2},
    "NN": {"label": "账面价值", "align": "center",colspan: 2},
    "PP": {"label": "评估价值", "align": "center",colspan: 2},
    "R": {
      "label": "增值率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": ""
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "证载权利人", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true, prospecting: true,fixed:true  },
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "土地权证编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "土地权证编号", "placeholder": "请输入土地权证编号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "宗地名称", "minWidth": 188, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "宗地名称", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "D": {
      "label": "土地位置", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "土地位置", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "取得日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "用地性质", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "用地性质", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "G": {
      "label": "准用年限", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "准用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "H": {
      "label": "开发程度", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "开发程度", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "I": {
      "label": "面积（m2）", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "面积（m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "J": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "K": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "L": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "M": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "N": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "O": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "P": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "Q": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "R": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "证载权利人", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Z": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },

  }],
  '53': [
    {
    //在建（土建）
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "项目名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "项目名称", "placeholder": "请输入项目名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "结构", "minWidth": 100, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "结构", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "建筑面积/容积", "minWidth": 150, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "建筑面积/容积", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "开工日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "开工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "预计完工日期", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "预计完工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "G": {
      "label": "形象进度", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "形象进度", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "H": {
      "label": "付款比例", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "付款比例", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "I": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "增减值", "minWidth": 130, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "N": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "T": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "U": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '54': [
    {
    //在建（设备）
    "operation":{label:"操作",minWidth:60, rowspan: 2,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "项目名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "项目名称", "placeholder": "请输入项目名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "规格型号", "minWidth": 130, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "数量", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, rowspan: 2
    },
    "E": {
      "label": "计量单位", "minWidth": 130, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "开工日期", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "开工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, rowspan: 2
    },
    "G": {
      "label": "预计完工日期", "align": "center", "isFilter": true, "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "预计完工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, rowspan: 2
    },
    "HHHH": {"label": "审计前账面值", "align": "center", colspan: 4},
    "L": {
      "label": "审计调整", "align": "center", "isFilter": true, "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, rowspan: 2,"isThousands":true
    },
    "MMMM": {"label": "账面价值", "align": "center",  colspan: 4},
    "QQQQ": {"label": "评估价值", "align": "center", colspan: 4},
    "U": {
      "label": "增减值", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "V": {
      "label": "增值率%", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Z": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AA": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AB": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "AC": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true,  isNoShow: true, fixed:true
    },
    "B": {
      "label": "项目名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "项目名称", "placeholder": "请输入项目名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "规格型号", "minWidth": 130, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "规格型号", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "数量", "align": "right", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, isNoShow: true
    },
    "E": {
      "label": "计量单位", "minWidth": 130, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "开工日期", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "开工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, isNoShow: true
    },
    "G": {
      "label": "预计完工日期", "align": "center", "isFilter": true, "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "预计完工日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, isNoShow: true
    },
    "H": {
      "label": "设备费", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "设备费", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "I": {
      "label": "资金成本", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "J": {
      "label": "安装费及其他", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "安装费及其他", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "K": {
      "label": "合计", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "合计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "L": {
      "label": "审计调整", "align": "right", "isFilter": true, "minWidth": 150, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, isNoShow: true,"isThousands":true
    },
    "M": {
      "label": "设备费", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "设备费", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "N": {
      "label": "资金成本", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "O": {
      "label": "安装费及其他", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "安装费及其他", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "P": {
      "label": "合计", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "合计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "Q": {
      "label": "设备费", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "设备费", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "R": {
      "label": "资金成本", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "资金成本", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "S": {
      "label": "安装费及其他", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "安装费及其他", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "T": {
      "label": "合计", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "合计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "U": {
      "label": "增减值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "V": {
      "label": "增值率%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "Y": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Z": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "AA": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "AB": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "AC": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '55': [
    {
    //工程物资
    "operation":{label:"操作",minWidth:60, rowspan: 2,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "名称", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称", "placeholder": "", title: "包含"
      }, "isFilter": true, "footLabel": ["合计","减：工程物资减值准备","净额"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "工程项目", "minWidth": 150, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "工程项目", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "计量单位", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "EE": {"label": "审计前账面值", "align": "center", colspan: 3},
    "H": {
      "label": "审计调整", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, rowspan: 2,"isThousands":true
    },
    "II": {"label": "账面价值", "align": "center", colspan: 3},
    "L": {
      "label": "实际数量", "align": "center", "isFilter": true, "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "", title1: "包含", title2: "包含"
      }, rowspan: 2
    },
    "MM": {"label": "评估价值", "align": "center",colspan: 2},
    "O": {
      "label": "增减值", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "P": {
      "label": "增值率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Q": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": false, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "名称", "placeholder": "", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：工程物资减值准备","净额"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "工程项目", "minWidth": 150, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "工程项目", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "计量单位", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "数量", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "审计前账面值"
    },
    "F": {
      "label": "单价", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "H": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "I": {
      "label": "数量", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "J": {
      "label": "单价", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "L": {
      "label": "实际数量", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "实际数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "M": {
      "label": "单价", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "单价", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "N": {
      "label": "金额", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "O": {
      "label": "增减值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "P": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Q": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": false, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '56': [
    {
    //固定资产清理
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "待处理资产名称", "align": "left", "minWidth": 200, "search": {
        "isShow": false, "type": "selectInput", "label": "待处理资产名称", "placeholder": "请输入待处理资产名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "增减值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '57': [
    {
    //生产性生物资产
    "operation":{label:"操作",minWidth:60, rowspan: 2,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "种类", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "种类", "placeholder": "请输入种类", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：生产性生物资产减值准备","净额"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "群别", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "群别", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "使用单位", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "E": {
      "label": "计量单位", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "数量", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "购置日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "HH": {"label": "审计前账面值", "align": "center", colspan: 2},
    "JJ": {"label": "审计调整", "align": "center", colspan: 2},
    "LL": {"label": "账面价值", "align": "center", colspan: 2},
    "NNN": {"label": "评价估值", "align": "center", colspan: 3},
    "Q": {
      "label": "增值率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": false, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "T": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "种类", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "种类", "placeholder": "请输入种类", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：生产性生物资产减值准备","净额"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "群别", "minWidth": 188, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "群别", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "D": {
      "label": "使用单位", "minWidth": 188, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "E": {
      "label": "计量单位", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "数量", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "G": {
      "label": "购置日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "购置日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "H": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "I": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "J": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "K": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "L": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "M": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "N": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "O": {
      "label": "成新率%", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "P": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "Q": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": false, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "T": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '58': [
    {
    //油气资产
    "operation":{label:"操作",minWidth:60, rowspan: 2,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "类别", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "类别", "placeholder": "请输入类别", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：生产性生物资产减值准备","净额"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "矿区（或油田）", "minWidth":188, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "矿（或油田）", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "D": {
      "label": "使用单位", "minWidth":188, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2,fixed:true
    },
    "E": {
      "label": "计量单位", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "F": {
      "label": "数量", "align": "center", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "G": {
      "label": "形成日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "形成日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "H": {
      "label": "来源（购入、自行建造）", "minWidth": 210, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "来（购入、自行建造）", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "II": {"label": "审计前账面值", "align": "center",colspan: 2},
    "KK": {"label": "审计调整", "align": "center",colspan: 2},
    "MM": {"label": "账面价值", "align": "center",colspan: 2},
    "OOO": {"label": "评估价值", "align": "center", colspan: 3},
    "R": {
      "label": "增值率%", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": false, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "U": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "V": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "W": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "X": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Y": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "类别", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "类别", "placeholder": "请输入类别", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：生产性生物资产减值准备","净额"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "矿（或油田）", "minWidth": 188, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "矿（或油田）", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "D": {
      "label": "使用单位", "minWidth": 188, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "使用单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true,fixed:true
    },
    "E": {
      "label": "计量单位", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "计量单位", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "F": {
      "label": "数量", "align": "right", "minWidth": 100, "search": {
        "isShow": false, "type": "range", "label": "数量", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "G": {
      "label": "形成日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "形成日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "H": {
      "label": "来（购入、自行建造）", "minWidth": 210, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "来（购入、自行建造）", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "I": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "J": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "K": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "L": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计调整"
    },
    "M": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "N": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "O": {
      "label": "原值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "P": {
      "label": "成新率%", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "成新率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, "subHead": "评估价值"
    },
    "Q": {
      "label": "净值", "minWidth": 100, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "净值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "评估价值"
    },
    "R": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": false, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "U": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "V": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "W": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "X": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Y": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '59': [
    {
    //无形-土地
    "operation":{label:"操作",minWidth:60, prospecting: true,fixed:true },
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "土地权证编号", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "土地权证编号", "placeholder": "请输入土地权证编号", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "宗地名称", "minWidth": 188, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "宗地名称", "placeholder": "", title: "包含"
      }, "isFilter": true,fixed:true
    },
    "D": {
      "label": "土地位置", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "土地位置", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "取得日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "用地性质", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "用地性质", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "土地用途", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "土地用途", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "H": {
      "label": "准用年限", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "准用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "I": {
      "label": "开发程度", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "开发程度", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "面积（m2）", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "面积（m2）", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "原始入账价值", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原始入账价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "审计调整", "align": "right", "minWidth": 140, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "N": {
      "label": "账面价值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "O": {
      "label": "评估价值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "P": {
      "label": "增减值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "Q": {
      "label": "增值率%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "备注", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "证载权利人", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "证载权利人", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "U": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "V": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "W": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "X": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Y": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '60': [
    {
    //无形-矿业权
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "名称、种类（探矿权/采矿权）", "align": "left", "minWidth": 250, "search": {
        "isShow": false, "type": "selectInput", "label": "名称、种（探矿权/采矿权）", "placeholder": "请输入名称、种（探矿权/采矿权）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "勘查（采矿）许可证编号", "minWidth": 240, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "勘（采矿）许可证编号", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "取得方式", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "取得方式", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "取得日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "剩余有效年限", "minWidth": 150, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "剩余有效年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "勘查开发阶段", "minWidth": 150, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "勘查开发阶段", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "H": {
      "label": "核定（批准）生产规模", "minWidth": 200, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "核定（批准）生产规模", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "I": {
      "label": "原始入账价值", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原始入账价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "N": {
      "label": "增减值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "O": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含",
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "T": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "U": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "V": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '61': [
    {
    //无形-其他
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "内容或名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "内容或名称", "placeholder": "请输入内容或名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "取得日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "法定/预计使用年限", "minWidth": 200, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "法定/预计使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "专利号或注册号", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "专利号或注册号", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "类型/类别", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "类型/类别", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "原始入账价值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "原始入账价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "尚可使用年限", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "尚可使用年限", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "评估价值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "增减值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "N": {
      "label": "增值率%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "T": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "U": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '62': [
    {
    //开发支出
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "内容或名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "内容或名称", "placeholder": "请输入内容或名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "增减值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '63': [
    {
    //商誉
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "内容或名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "内容或名称", "placeholder": "请输入内容或名称", title: "包含"
      }, "isFilter": true,"footLabel": ["合计","减：商誉减值准备","净额"],fixed:true
    },
    "C": {
      "label": "取得日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "增减值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '64': [
    {
    //长期待摊费用
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "费用名称或内容", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "费用名称或内容", "placeholder": "请输入费用名称或内容", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "形成日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "形成日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "原始发生额", "minWidth": 150, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "原始发生额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "预计摊销月数", "minWidth": 150, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "预计摊销月数", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "尚存受益月数", "minWidth": 200, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "尚存受益月数", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "增减值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增减值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "L": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true",  "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '65': [
    {
    //递延所得税资产
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed: true
    },
    "B": {
      "label": "内容或名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "内容或名称", "placeholder": "请输入内容或名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "取得日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '66': [
    {
    //其他非流动资产
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "内容或名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "内容或名称", "placeholder": "请输入内容或名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "取得日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "取得日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '67': [
    {
    //短期借款
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "放款银行或机构名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "放款银行或机构名称", "placeholder": "请输入放款银行或机构名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "到期日", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "月利率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "月利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "币种", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "selectInput", "label": "币种", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "外币金额", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "外币金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "外币基准日汇率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "外币基准日汇率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '68': [
    {
    //交易性金融负债
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "业务内容", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '69': [
    {
    //应付票据
    "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象））", "placeholder": "户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "到期日", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "票面利率%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "票面利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '70': [
    {
    //应付账款
    "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "业务内容", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '71': [
    {
    //预收账款
    "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "业务内容", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    },

  }],
  '33':[
    {
    //职工薪酬
    "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "结算内容", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "结算内容", "placeholder": "请输入结算内容", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '72': [
    {
    //应交税费
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "征税机关", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "征税机关", "placeholder": "请输入征税机关", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "税费种类", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "税费种类", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '73': [
    {
    //应付利息
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "本金", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "本金", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "利息所属期间", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "利息所属期间", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "利息率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "利息率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "增值率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '74': [
    {
    //应付股利（利润
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "投资单位名（股东）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "投资单位名（股东）", "placeholder": "请输入投资单位名（股东）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "利润所属期间", "minWidth": 150, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "利润所属期间", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '75': [
    {
    //其他应付款
    "operation":{label:"操作",minWidth:60,confirmationRequests:true,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "业务内容", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '76': [
    {
    //一年到期非流动负债
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "结算项目", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "结算项目", "placeholder": "请输入结算项目", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "到期日", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "票面月利率%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "票面月利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '77': [
    {
    //其他流动负债
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "结算内容", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "结算内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '78': [
    {
    //长期借款
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "放款银行或机构名称", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "放款银行或机构名称", "placeholder": "请输入放款银行或机构名称", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "到期日", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "月利率%", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "月利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "F": {
      "label": "币种", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "币种", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "外币金额", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "外币金额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "外币基准日汇率%", "minWidth": 180, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "外币基准日汇率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }


  }],
  '79': [
    {
    //应付债券
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "债券发行单位", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "债券发行单位", "placeholder": "请输入债券发行单位", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "债券种类", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "债券种类", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "D": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "E": {
      "label": "到期日", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "到期日", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "F": {
      "label": "票面利率%", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "票面利率%", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "G": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "J": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "K": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "P": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "Q": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '80': [
    {
    //长期应付款
    "operation":{label:"操作",minWidth:60, rowspan: 2,fixed:true},
    "check": {label: "", minWidth: 80, rowspan: 2,fixed:true},
    "numB": {label: "序号", minWidth: 60, rowspan: 2,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, rowspan: 2, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "center", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], rowspan: 2,fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, rowspan: 2
    },
    "D": {
      "label": "业务内容", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "EEE": {"label": "审计前账面值", "align": "center", colspan: 3},
    "H": {
      "label": "审计调整", "align": "center", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "III": {"label": "账面价值", "align": "center", colspan: 3},
    "L": {
      "label": "评估价值", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2,"isThousands":true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "center", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "center", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, rowspan: 2
    }

  }, {
    "operation":{label:"操作",minWidth:60, isNoShow: true,fixed:true},
    "check": {label: "", minWidth: 80, isNoShow: true,fixed:true},
    "numB": {label: "序号", minWidth: 60, isNoShow: true,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, isNoShow: true, "selected": true, fixed:true
    },
    "B": {
      "label": "户（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户（结算对象）", "placeholder": "请输入户（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"], isNoShow: true,fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true, isNoShow: true
    },
    "D": {
      "label": "业务内容", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "业务内容", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "E": {
      "label": "初始额", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "初始额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "F": {
      "label": "利息及汇率净损失", "minWidth": 180, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "利息及汇率净损失", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "G": {
      "label": "合计", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "合计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "审计前账面值"
    },
    "H": {
      "label": "审计调整", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "I": {
      "label": "初始额", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "初始额", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "J": {
      "label": "利息及汇率净损失", "minWidth": 180, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "利息及汇率净损失", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "K": {
      "label": "合计", "minWidth": 120, "align": "right", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "合计", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true, "subHead": "账面价值"
    },
    "L": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true,"isThousands":true
    },
    "M": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "O": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "P": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "Q": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "R": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    },
    "S": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true", "isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true, isNoShow: true
    }

  }],
  '81': [
    {
    //专项应付款
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（或结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（或结算对象）", "placeholder": "请输入户名（或结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '82': [
    {
    //预计负债
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "结算内容", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "结算内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '83': [
    {
    //递延所得税负债
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "内容", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "内容", "placeholder": "请输入内容", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "E": {
      "label": "审计调整", "align": "right", "minWidth": 120, "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "J": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }],
  '84': [
    {
    //其它非流动负债
    "operation":{label:"操作",minWidth:60,fixed:true},
    "check": {label: "", minWidth: 80,fixed:true},
    "numB": {label: "序号", minWidth: 60,fixed:true},
    "ruleType": {
      "label": "作价规则", "minWidth": 188, "align": "center", "search": {
        "isShow": false, "type": "tab", "label": "作价规则", "placeholder": "", "tab1": "checkbox", "check": [], "tabTitle": "系数调整",
        "rule": [{value: 2, label: "账面比例作价"}, {value: 6, label: "特殊作价"}]
      }, "isFilter": true, "selected": true, fixed:true
    },
    "B": {
      "label": "户名（结算对象）", "align": "left", "minWidth": 188, "search": {
        "isShow": false, "type": "selectInput", "label": "户名（结算对象）", "placeholder": "请输入户名（结算对象）", title: "包含"
      }, "isFilter": true, "footLabel": ["合计"],fixed:true
    },
    "C": {
      "label": "发生日期", "minWidth": 120, "align": "center", "type": "input", "search": {
        "isShow": false, "type": "range", "label": "发生日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
      }, "isFilter": true
    },
    "D": {
      "label": "结算内容", "minWidth": 120, "align": "left", "type": "input", "search": {
        "isShow": false, "type": "selectInput", "label": "结算内容", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "E": {
      "label": "审计前账面值", "minWidth": 150, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "F": {
      "label": "审计调整", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "G": {
      "label": "账面价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "H": {
      "label": "评估价值", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
      }, "isFilter": true,"isThousands":true
    },
    "I": {
      "label": "备注", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "备注", placeholder: '请输入备注', title: "包含"
      }, "isFilter": true
    },
    "XS": {
      "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
        "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
      }, "isFilter": true
    },
    "K": {
      "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "L": {
      "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "M": {
      "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "N": {
      "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
        "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
      }, "isFilter": true
    },
    "O": {
      "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
        "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
      }, "isFilter": true
    }

  }]
}

var dataSurface = currentLiabilities.tableType.concat(dataSurfaceAll);
var tableHead = Object.assign(currentLiabilities.tableHead,tableHeadAll);

export default {
  //"currentLiabilities":currentLiabilities,   //流动负债
  dataSurface,//表类型
  tableHead//表头
}
