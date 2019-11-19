var checkData={
    "资产负债表":{
        noEditor:["mergeCell","A"], //不可编辑
        alignLeft:["A"],    //文字居左
        permilArr:["A"], //非数值计算
        tablesWidth:{mergeCell:80,},  //宽度
        floatLeft:["mergeCell","A"],   //左侧浮动单元格
        mergeCellKey:["mergeCell"],   //需要合并的单元格
        checkboxList:[{name:"流动资产",label:"流动资产"},{name:"非流动资产",label:"非流动资产"},{name:"资产总计",label:"资产总计"},{name:"流动负债",label:"流动负债"},{name:"非流动负债",label:"非流动负债"},{name:"负债合计",label:"负债合计"},{name:"股东权益统计",label:"股东权益统计"}],
        checkboxListRight:{
            noExplain:true
        },
    },
    "利润表":{
        noEditor:["A"],
        alignLeft:["A"],
        permilArr:["A"],
        tablesWidth:{},
        floatLeft:["A"],
        mergeCellKey:[],
        checkboxList:[],
        checkboxListRight:{
            noExplain:true
        },
    },
    "现金流量表":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["A"],
        tablesWidth:{mergeCell:80,A:240},
        floatLeft:["mergeCell","A"],
        mergeCellKey:["mergeCell"],
        checkboxList:[{name:"经营活动产生现金流量",label:"经营活动产生现金流量"},{name:"投资活动产生现金流量",label:"投资活动产生现金流量"},{name:"筹资活动产生现金流量",label:"筹资活动产生现金流量"},{name:"汇率变动",label:"汇率变动"},{name:"净增加额",label:"净增加额"},{name:"补充信息",label:"补充信息"}],
        checkboxListRight:{
            noExplain:true
        },
    },
    "长投":{
        noEditor:["A"],
        alignLeft:["A"],
        tableHeader:[{
            "check": {label: "", minWidth: 80,fixed:true},
            "numB": {label: "序号", minWidth: 60,fixed:true},
            "B": {
            "label": "被投资单位名称", "align": "center", "minWidth": 188, "search": {
                "noReplace":true, "isShow": false, "type": "selectInput", "label": "被投资单位名称", "placeholder": "请输入被投资单位名称", title: "包含"
            }, "isFilter": true,footLabel:["合计","减：长期股权投资减值准备","净额"],fixed:true
            },
            "C": {
            "label": "投资日期", "align": "center", "minWidth": 120, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "投资日期", "placeholder": "", title1: "包含", title2: "包含",inputType:'date'
            }, "isFilter": true
            },
            "D": {
            "label": "协议投资期限", "align": "center", "minWidth": 150, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "协议投资期限", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true
            },
            "E": {
            "label": "持股比例%", "align": "right", "minWidth": 120, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "持股比例%", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true,"isThousandsTwo":true
            },
            "F": {
            "label": "投资成本", "align": "right", "minWidth": 150, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "投资成本", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true,"isThousands":true
            },
            "G": {
            "label": "审计前账面值", "align": "right", "minWidth": 150, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "审计前账面值", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true,"isThousands":true
            },
            "H": {
            "label": "审计调整", "align": "right", "minWidth": 130, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "审计调整", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true,"isThousands":true
            },
            "I": {
            "label": "账面价值", "align": "right", "minWidth": 130, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "账面价值", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true,"isThousands":true
            },
            "J": {
            "label": "评估价值", "align": "right", "minWidth": 130, "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "评估价值", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true,"isThousands":true
            },
            "K": {
            "label": "增值率%", "minWidth": 120, "align": "right", "search": {
                "noReplace":true, "isShow": false, "type": "range", "label": "增值率%", "placeholder": "", title1: "包含", title2: "包含"
            }, "isFilter": true
            },
            "M": {
            "label": "备注", "minWidth": 120, "align": "left", "search": {
                "noReplace":true, "isShow": false, "type": "selectInput", "label": "备注", "placeholder": '请输入备注', title: "包含"
            }, "isFilter": true
            },
            "XS": {
            "label": "账面值系数", "minWidth": 120, "align": "right", "search": {
                "noReplace":true, "isShow": false, "type": "tab", "label": "账面值系数", "placeholder": "", "tabTitle": "系数调整", "tab1": "range", title1: "包含", title2: "包含"
            }, "isFilter": true
            },
            "N": {
            "label": "草稿栏1", "minWidth": 120, "align": "left", "search": {
                "noReplace":true, "isShow": false, "type": "selectInput", "label": "草稿栏1", "placeholder": "", title: "包含"
            }, "isFilter": true
            },
            "O": {
            "label": "草稿栏2", "minWidth": 120, "align": "left", "search": {
                "noReplace":true, "isShow": false, "type": "selectInput", "label": "草稿栏2", "placeholder": "", title: "包含"
            }, "isFilter": true
            },
            "P": {
            "label": "草稿栏3", "minWidth": 120, "align": "left", "search": {
                "noReplace":true, "isShow": false, "type": "selectInput", "label": "草稿栏3", "placeholder": "", title: "包含"
            }, "isFilter": true
            },
            "Q": {
            "label": "草稿栏4", "minWidth": 150, "align": "left", "search": {
                "noReplace":true, "isShow": false, "type": "selectInput", "label": "草稿栏4", "placeholder": "", title: "包含"
            }, "isFilter": true
            },
            "R": {
            "label": "草稿栏5", "minWidth": 200, "align": "left", "search": {
                "noReplace":true, "last": "true","isShow": false, "type": "selectInput", "label": "草稿栏5", "placeholder": "", title: "包含"
            }, "isFilter": true
            }
        }],
        checkboxList:[],
        checkboxListRight:{},
    },
    "溢余":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["A"],
        floatLeft:["mergeCell","A"], 
        tablesWidth:{mergeCell:80,},
        mergeCellKey:["mergeCell"],
        checkboxList:[{name:"流动资产",label:"流动资产"},{name:"非流动资产",label:"非流动资产"},{name:"资产总计",label:"资产总计"},{name:"流动负债",label:"流动负债"},{name:"非流动负债",label:"非流动负债"},{name:"负债合计",label:"负债合计"},{name:"股东权益统计",label:"股东权益统计"}],
        checkboxListRight:{
            noExplain:true
        },
    },
    "非经营性损益":{
        noEditor:["mergeCell","A"],
        alignLeft:["mergeCell","A"],
        permilArr:["A"],
        floatLeft:["mergeCell","A"],
        tablesWidth:{mergeCell:80,},
        mergeCellKey:["mergeCell"],
        // checkboxList:[],
        checkboxList:[{name:"营业收入",label:"营业收入"},{name:"营业利润",label:"营业利润"},{name:"利润总额",label:"利润总额"},{name:"净利润",label:"净利润"}],
        checkboxListRight:{
            noExplain:true
        },
    },
    "营运资金":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["A"],
        floatLeft:["mergeCell","A"], 
        tablesWidth:{mergeCell:80,},
        mergeCellKey:["mergeCell"],
        checkboxList:[{name:"合计",label:"合计"},{name:"完全成本",label:"完全成本"},{name:"非付现成本",label:"非付现成本"},{name:"付现成本",label:"付现成本"},{name:"最低现金保有量",label:"最低现金保有量"},{name:"营运资本",label:"营运资本"},{name:"周转",label:"周转"}],
        checkboxListRight:{},
    },
    "营业收支":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["mergeCell","A","B","C"],
        tablesWidth:{mergeCell:80,},
        floatLeft:["mergeCell","A","B","C"],
        mergeCellKey:["mergeCell"],
        checkboxList:[{name:"营业收支",label:"营业收支"},{name:"其他业务收入",label:"其他业务收入"},{name:"产品明细",label:"产品明细"}],
        addProject:true,
        checkboxListRight:{},
    },
    "生产成本":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["mergeCell","A","B","C"],
        tablesWidth:{mergeCell:80,}, 
        floatLeft:["mergeCell","A","B","C"],
        mergeCellKey:["mergeCell"],
        checkboxList:[{name:"成本合计",label:"成本合计"},{name:"其他合计",label:"其他合计"},{name:"产品明细",label:"产品明细"}],
        addProject:true,
        checkboxListRight:{},
    },
    "税金":{
        noEditor:[],
        alignLeft:["A"], 
        permilArr:["A","B","C"],
        floatLeft:["A"], 
        mergeCellKey:[], 
        checkboxList:[],
        tablesWidth:{mergeCell:80,},
        checkboxListRight:{},
    },
    "销售费用":{
        noEditor:["mergeCell"],
        alignLeft:["A"],
        checkboxList:[{name:"销售合计",label:"销售合计"},{name:"费用详细",label:"费用详细"}],
        permilArr:["A"],
        mergeCellKey:["mergeCell"],
        tablesWidth:{mergeCell:80,},
        floatLeft:["mergeCell","A"],
        checkboxListRight:{},
    },
    "管理费用":{
        noEditor:["mergeCell"],
        alignLeft:["A"], 
        permilArr:["A"], 
        tablesWidth:{mergeCell:80,},
        floatLeft:["mergeCell","A"], 
        mergeCellKey:["mergeCell"], 
        checkboxList:[{name:"管理合计",label:"管理合计"},{name:"费用详细",label:"费用详细"}],
        checkboxListRight:{},
    },
    "研发费用":{
        noEditor:["mergeCell"],
        alignLeft:["A"], 
        permilArr:["A"],
        tablesWidth:{mergeCell:80,},
        floatLeft:["mergeCell","A"], 
        mergeCellKey:["mergeCell"], 
        checkboxList:[{name:"研发合计",label:"研发合计"},{name:"费用详细",label:"费用详细"}],
        checkboxListRight:{},
    },
    "财务费用":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["A"], 
        floatLeft:["mergeCell","A"],
        mergeCellKey:["mergeCell"],
        checkboxList:[{name:"短期借款",label:"短期借款"},{name:"一年内长借",label:"一年内到期的长期借款"},{name:"长期借款",label:"长期借款"},{name:"应付债券",label:"应付债券"},{name:"长期应付款",label:"长期应付款"},{name:"其他",label:"其他应付款"},{name:"财务费用",label:"财务费用"}],
        tablesWidth:{mergeCell:200},
        checkboxListRight:{},
    },
    "资本性支出":{
        noEditor:["mergeCell"],
        alignLeft:["A"], 
        permilArr:["A"],
        tablesWidth:{mergeCell:80,}, 
        floatLeft:["mergeCell","A"],
        mergeCellKey:["mergeCell"], 
        checkboxList:[{name:"合计",label:"合计"},{name:"费用详细",label:"费用详细"}],
        checkboxListRight:{},
    },
    "折旧":{
        noEditor:["mergeCell","A","B"],
        alignLeft:["A"],  
        permilArr:["A"],
        floatLeft:["mergeCell","A","B"],   //左侧浮动单元格
        mergeCellKey:["mergeCell","C"],   //需要合并的单元格 
        checkboxList:[{name:"房屋建筑物",label:"房屋及建筑物"},{name:"机器设备",label:"设备"},{name:"运输设备",label:"运输设备"},{name:"电子设备",label:"电子设备"},{name:"其他",label:"其他"},{name:"固定资产合计",label:"固定资产合计"}],
        tablesWidth:{mergeCell:80,},
        checkboxListRight:{},
    },
    "摊销":{
        noEditor:["mergeCell","A"],
        alignLeft:["A"],
        permilArr:["A"],
        floatLeft:["mergeCell","A"],
        mergeCellKey:["mergeCell","B"],
        checkboxList:[{name:"摊销合计",label:"摊销合计"},{name:"土地摊销费用",label:"土地摊销费用"},{name:"软件摊销费用",label:"软件摊销费用"},{name:"长期摊销费用",label:"长期摊销费用"},{name:"其他摊销费用",label:"其他摊销费用"}],
        checkboxListRight:{},
        tablesWidth:{mergeCell:80,},
    },
    "折现率计算表":{
        checkboxList:[],
        checkboxListRight:{
            noExplain:true,
            noEnclosureNotation:true
        },
    },
    "现金流预测表":{
        checkboxList:[],
        checkboxListRight:{
            noEnclosureNotation:true
        },
    }
}  
var sheetNameArr=[{name:"资产负债表"},{name:"利润表"},{name:"长投"},{name:"溢余"},{name:"非经营性损益"},{name:"营运资金"},{name:"营业收支"},{name:"生产成本"},{name:"税金"},{name:"销售费用"},{name:"管理费用"},{name:"研发费用"},{name:"财务费用"},{name:"资本性支出"},{name:"折旧"},{name:"摊销"},{name:"现金流量表"},{name:"折现率计算表"},{name:"现金流预测表"}];
var sortArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ","BA","BB","BC","BD","BE","BF","BG","BH","BI","BJ","BK","BL","BM","BN","BO","BP","BQ","BR","BS","BT","BU","BV","BW","BX","BY","BZ","CA","CB","CC","CD","CE","CF","CG","CH","CI","CJ","CK","CL","CM","CN","CO","CP","CQ","CR","CS","CT","CU","CV","CW","CX","CY","CZ"]
export {
    checkData,
    sheetNameArr,
    sortArr
}