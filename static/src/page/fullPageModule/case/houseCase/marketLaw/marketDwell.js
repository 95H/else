var tableType = {
  "市场法住宅": "01",
  "市场法办公": "02",
  "市场法商业": "03"
}

var tableHeader = {
  "市场法住宅": [{
    "A": {label: "项目",minWidth: 180,rowspan: 2,colspan:2},
    // "B":{isNoShow:true,minWidth: 180},
    "C": {label: "价格影响因素分析及分值",minWidth: 160,rowspan: 2},
    "CC":{label: "案例因素说明表",colspan: 4,editBar:true,caseUpdataFlag:false},
    "GG":{label:"因素条件说明表",colspan: 4,editBar:true,caseUpdataFlag:false},
    "KK":{label:"因素调节修正系数表",colspan: 3}
  }, {
    "A": {label: "项目",minWidth: 180,rowspan: 2,isNoShow: true,colspan:2},
    // "B":{isNoShow:true,minWidth: 180},
    "C": {label: "价格影响因素分析及分值",minWidth: 160,rowspan: 2,isNoShow: true},
    "D": {label: "待估房产",isEdit: true,minWidth: 100},
    "E": {label: "实例一",isEdit: true,minWidth: 100},
    "F": {label: "实例二",isEdit: true,minWidth: 100},
    "G": {label: "实例三",isEdit: true,minWidth: 100},
    "H": {label: "待估房产",isEdit: true,minWidth: 100},
    "I": {label: "实例一",isEdit: true,minWidth: 100},
    "J": {label: "实例二",isEdit: true,minWidth: 100},
    "K": {label: "实例三",isEdit: true,minWidth: 100},
    "L": {label:"待估/例一",minWidth: 110},
    "M": {label:"待估/例二",minWidth: 110},
    "N": {label:"待估/例三",minWidth: 110},
  }]
}
export default {
  tableHeader,
  tableType
};
