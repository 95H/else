var tableType = [{
    name:'审定数',
    type:'34'
  },{
    name:'资产负债表',
    type:'35'
  },{
    name:'利润表',
    type:'36'
  },{
    name:'统计计算'
  },{
    name:'项目综合信息'
  }
];

var tableHead={
    '34':[{
        "A":{"label": "序号", "align": "center", "minWidth": 188,search:{},isNoEdit:true,isSpecial:true},
        "B":{"label": "科目名称", "align": "left", "minWidth": 210,search:{},isNoEdit:true,isSpecial:true,footLabel:[]},
        "C":{"label": "金额", "align": "center", "minWidth": 200,search:{},isSpecial:true,"isThousands":true}
    }],
    '35':[{
        "A":{"label": "资产", "align": "left", "minWidth": 210,search:{},isNoEdit:true,isSpecial:true},
        "B":{"label": "序号", "align": "center", "minWidth": 80,search:{},isNoEdit:true,isSpecial:true,footLabel:[]},
        "C":{"label": "期初数", "align": "right", "minWidth": 140,search:{},isSpecial:true,"isThousands":true},
        "D":{"label": "期末数", "align": "right", "minWidth": 140,search:{},isSpecial:true,"isThousands":true},
        "E":{"label": "备注", "align": "left", "minWidth": 140,search:{},isSpecial:true},
        "F":{"label": "负债及所有者权益", "align": "left", "minWidth": 180,search:{},isNoEdit:true,isSpecial:true},
        "G":{"label": "序号", "align": "center", "minWidth": 80,search:{},isNoEdit:true,isSpecial:true},
        "H":{"label": "期初数", "align": "right", "minWidth": 140,search:{},isSpecial:true,"isThousands":true},
        "I":{"label": "期末数", "align": "right", "minWidth": 140,search:{},isSpecial:true,"isThousands":true},
        "J":{"label": "备注", "align": "left", "minWidth": 140,search:{},isSpecial:true},


    }],
    '36':[{
        "A":{"label": "项目", "align": "left", "minWidth": 300,search:{},isNoEdit:true,isSpecial:true},
        "B":{"label": "附注", "align": "center", "minWidth": 200,search:{},isNoEdit:true,isSpecial:true,footLabel:[]},
        "C":{"label": "本年实际数", "align": "right", "minWidth": 200,search:{},isSpecial:true,"isThousands":true},
        "D":{"label": "上年实际数", "align": "right", "minWidth": 200,search:{},isSpecial:true,"isThousands":true}
    }]
}




export default {
    tableType,
    tableHead

}
