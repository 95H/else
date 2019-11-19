<template>
    <div v-if="bottomOpenIsShow">
        <div class="mask"></div>
        <transition name="slide-fade">
            <div class="manuscriptAssociation" :class="{widMax:$store.state.isfixedFlag}">
                <div class="manuscriptAssociationList">
                    <bottom-open :isHead=true :isShow="bottomOpenIsShow">
                        <div slot="tit">资产关联</div>
                        <div slot="btns">
                            <div class="search-btn" @click="dataSub">确认</div>
                            <div class="reset-btn" @click="setBottomOpenIsShow">取消</div>
                        </div>
                        <div slot="cont">
                            <!-- <el-scrollbar style="height:260px"> -->
                                <div class="assetBased-table" v-for="(item,index) in tabArr" :key="index" v-show="item.name==curTableName">
                                    <table-more ref="tableMore" :cols10=true :tableHeader="tableAllArr[item.type]" :curSheetName="item.name" :sheetNameBool="item.name==curTableName" :sheetName="curTableName"></table-more>
                                </div>
                                <scroll-tab :tabArr="tabArr" @tabClick="tabClick" ref="scrollTab"></scroll-tab>
                            <!-- </el-scrollbar> -->
                        </div>
                    </bottom-open>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import tableMore from '@/components/tableMore';
import tableDataJson from '@/page/fullPageModule/tableJson.js';
import bottomOpen from '@/components/bottomOpen';
import scrollTab from '@/components/scrollTab2.vue';
export default {
    components: {tableMore, scrollTab, bottomOpen},
    props:[],
    data() {
      return {
          bottomOpenIsShow:false,
          curTableName:"",
          tabArr:[],
          xlsIds:"",
          tableAllArr: tableDataJson.tableHead
      }
    },
    methods:{
        setBottomOpenIsShow(){
            this.bottomOpenIsShow=!this.bottomOpenIsShow;
        },
        //确认
        dataSub(){
            var _this=this,reportIds="";
            for (let i = 0; i < this.tabArr.length; i++) {
                var checkList=this.$refs.tableMore[i].getChecked();
                for (let j = 0; j < checkList.length; j++) {
                    if(checkList[j].id){
                        reportIds+=checkList[j].id+","
                    }
                }
            }
            reportIds=reportIds.substr(0,reportIds.length-1);
            if(reportIds==""){
                _this.setBottomOpenIsShow()
            }else{
                this.$http
                .post("/api/reportDraft/report/File", {
                    projectId:this.$store.state.projectId,
                    xlsIds:this.xlsIds,
                    reportIds:reportIds
                })
                .then(function(data) {
                    _this.setBottomOpenIsShow()
                    _this.$emit("refresh")
                })
                .catch(function(error) {
                    _this.$messageError(error);
                });
            }
            
        },
        //点击tab切换
        tabClick(val){
            this.curTableName = val.name;
            console.log(val)
        },
        //关联  data关联信息
        relation(listStr,arr){
            var _this=this;
            if(!this.bottomOpenIsShow){
                this.$http.post("/api/reportDraft/judgeTable", {
                    investorId:this.$store.state.investorId
                })
                .then(function(data) {
                    if(data.data==="Y"){
                        _this.xlsIds=listStr;
                        _this.ifTable(arr)
                        if(_this.tabArr.length==0){
                            _this.$messageWarning("该目录不可以关联")
                            return;
                        }
                        _this.curTableName = _this.tabArr[0].name;
                        _this.setBottomOpenIsShow()
                    }else{
                        _this.$messageWarning("请先生成资产基础法")
                        return
                    }
                })
                .catch(function(error) {
                    _this.$messageError(error);
                });
                
            }else{
                this.setBottomOpenIsShow()
            }
        },
        //判断显示那个表
        ifTable(arr){
            this.tabArr=[];
            switch (arr[0]) {
                case "CZ1":
                    this.tabArr=[{name: '现金',type: '01'}]
                    break;
                case "CZ2":
                    this.tabArr=[{name: '银行存款',type: '02'}]
                    break;
                case "CZ3":
                    this.tabArr=[{name: '其他货币资金',type: '03'}]
                    break;
                case "CZ4":
                    this.tabArr=[{name: '交易性-股票',type: '04'},{name: '交易性-债券',type: '05'},{name: '交易性-基金',type: '06'}]
                    break;
                case "CZ5":
                    this.tabArr=[{name: '应收票据',type: '07'}]
                    break;
                case "CZ6":
                    this.tabArr=[{name: '应收账款',type: '08'}]
                    break;
                case "CZ7":
                    this.tabArr=[{name: '预付账款',type: '09'}]
                    break; 
                case "CZ8":
                    this.tabArr=[{name: '应收利息',type: '10'}]
                    break;
                case "CZ9":
                    this.tabArr=[{name: '应收股利(利润)',type: '11'}]
                    break;
                case "CZ10":
                    this.tabArr=[{name: '其他应收款',type: '08'}]
                    break;
                case "CZ11":
                    switch (arr[1]) {
                        case "5":
                            this.tabArr=[{name: '材料采购(在途物资)',type: '12'}]
                            break;
                        case "6":
                            this.tabArr=[{name: '原材料',type: '13'}]
                            break;
                        case "7":
                            this.tabArr=[{name: '在库周转材料',type: '13'}]
                            break;
                        case "8":
                            this.tabArr=[{name: '委托加工物资',type: '14'}]
                            break;
                        case "9":
                            this.tabArr=[{name: '产成品(库存商品)',type: '13'}]
                            break;
                        case "10":
                            this.tabArr=[{name: '在产品(自制半成品)',type: '12'}]
                            break;
                        case "11":
                            this.tabArr=[{name: '发出商品',type: '15'}]
                            break;
                        case "12":
                            this.tabArr=[{name: '在用周转材料',type: '16'}]
                            break;
                        case "13":
                            this.tabArr=[{name: '农产品',type: '17'}]
                            break;
                        case "14":
                            this.tabArr=[{name: '消耗性生物资产',type: '18'}]
                            break;
                        case "15":
                            this.tabArr=[{name: '工程施工',type: '19'}]
                            break;
                        default:
                            break;
                    }
                    break;
                case "CZ12":
                    this.tabArr=[{name: '一年到期非流动资产',type: '20'}]
                    break;
                case "CZ13":
                    this.tabArr=[{name: '其他流动资产',type: '20'}]
                    break;
                case "CZ14":
                    switch (arr[1]) {
                        case "1":
                            this.tabArr=[{name: '可出售-股票',type: '21'}]
                            break;
                        case "2":
                            this.tabArr=[{name: '可出售-债券',type: '22'}]
                            break;
                        case "3":
                            this.tabArr=[{name: '可出售-其他',type: '23'}]
                            break;
                        default:
                            break;
                    }
                    break;
                case "CZ15":
                    this.tabArr=[{name: '持有到期投资',type: '24'}]
                    break;
                case "CZ16":
                    this.tabArr=[{name: '长期应收',type: '25'}]
                    break;
                case "CZ17":
                    this.tabArr=[{name: '股权投资',type: '26'}]
                    break;
                case "CZ18":
                    //标红
                    this.tabArr=[{name: '投资性房地产',type: '27'}]
                    break;
                case "CZ19":
                    //标红
                    this.tabArr=[{name: '房屋建筑物',type: '28'},{name: '构筑物',type: '29'},{name: '管道沟槽',type: '30'}]
                    break;
                case "CZ20":
                    switch (arr[1]) {
                        case "5":
                            this.tabArr=[{name: '机器设备',type: '31'}]
                            break;
                        case "6":
                            this.tabArr=[{name: '车辆',type: '32'}]
                            break;
                        case "7":
                            this.tabArr=[{name: '电子设备',type: '51'}]
                            break;
                        default:
                            break;
                    }
                    break;
                case "CZ39":
                    this.tabArr=[{name: '职工薪酬',type: '33'}]
                    break;
                case "CZ21":
                    switch (arr[1]) {
                        case "1":
                            this.tabArr=[{name: '在建(土建)',type: '53'}]
                            break;
                        case "2":
                            this.tabArr=[{name: '在建(设备)',type: '54'}]
                            break;
                        default:
                            break;
                    }
                    break;
                case "CZ22":
                    this.tabArr=[{name: '工程物资',type: '55'}]
                    break;
                case "CZ23":
                    this.tabArr=[{name: '固定资产清理',type: '56'}]
                    break;
                case "CZ24":
                    this.tabArr=[{name: '生产性生物资产',type: '57'}]
                    break;
                case "CZ25":
                    this.tabArr=[{name: '油气资产',type: '58'}]
                    break;
                case "CZ26":
                    this.tabArr=[{name: '无形-土地',type: '59'}]
                    break;
                case "CZ27":
                    this.tabArr=[{name: '无形-矿业权',type: '60'}]
                    break;
                case "CZ30":
                    this.tabArr=[{name: '无形-其他',type: '61'}]
                    break;
                case "CZ28":
                    this.tabArr=[{name: '开发支出',type: '62'}]
                    break;
                case "CZ29":
                    this.tabArr=[{name: '商誉',type: '63'}]
                    break;
                case "CZ31":
                    this.tabArr=[{name: '长期待摊费用',type: '64'}]
                    break;
                case "CZ32":
                    this.tabArr=[{name: '递延所得税资产',type: '65'}]
                    break;
                case "CZ33":
                    this.tabArr=[{name: '其他非流动资产',type: '66'}]
                    break;
                case "CZ34":
                    this.tabArr=[{name: '短期借款',type: '67'}]
                    break;
                case "CZ35":
                    this.tabArr=[{name: '交易性金融负债',type: '68'}]
                    break;
                case "CZ36":
                    this.tabArr=[{name: '应付票据',type: '69'}]
                    break;
                case "CZ37":
                    this.tabArr=[{name: '应付账款',type: '70'}]
                    break;
                case "CZ38":
                    this.tabArr=[{name: '预收账款',type: '71'}]
                    break;
                case "CZ40":
                    this.tabArr=[{name: '应交税费',type: '72'}]
                    break;
                case "CZ41":
                    this.tabArr=[{name: '应付利息',type: '73'}]
                    break;
                case "CZ42":
                    this.tabArr=[{name: '应付股利(利润)',type: '74'}]
                    break;
                case "CZ43":
                    this.tabArr=[{name: '其他应付款',type: '75'}]
                    break;
                case "CZ44":
                    this.tabArr=[{name: '一年到期非流动负债',type: '76'}]
                    break;
                case "CZ45":
                    this.tabArr=[{name: '其他流动负债',type: '77'}]
                    break;
                case "CZ46":
                    this.tabArr=[{name: '长期借款',type: '78'}]
                    break;
                case "CZ47":
                    this.tabArr=[{name: '应付债券',type: '79'}]
                    break;
                case "CZ48":
                    this.tabArr=[{name: '长期应付款',type: '80'}]
                    break;
                case "CZ49":
                    this.tabArr=[{name: '专项应付款',type: '81'}]
                    break;
                case "CZ50":
                    this.tabArr=[{name: '预计负债',type: '82'}]
                    break;
                case "CZ51":
                    this.tabArr=[{name: '递延所得税负债',type: '83'}]
                    break;
                case "CZ52":
                    this.tabArr=[{name: '其他非流动负债',type: '84'}]
                    break;              
                case "CZ53":
                    this.tabArr=[{name: '土地',type: '52'}]
                    break; 
                default:
                    break;
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(322px);
}
.manuscriptAssociation{
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 1200px;
    height: 100%;
    z-index: 1111;
}
.manuscriptAssociationList{
    position: absolute;
    right: 0;
    bottom: 0;
    width:1029px;
    // width:calc(100% - 171px);
    .manuscriptAssociationList-header{
        background: #F6FAFF;
        border: 1px solid #E5E5E5;
    }
    .manuscriptAssociationList-cont{
        border-left: 1px solid #E5E5E5;
    }
    /deep/ .table80-wrap .el-input.is-disabled .el-input__inner{
        color: #262628;
    }
}
.widMax{
    width: 100%;
    .manuscriptAssociationList{
        padding: 0 10px;
        box-sizing: border-box;
        width: 100%;
    }
}
</style>

