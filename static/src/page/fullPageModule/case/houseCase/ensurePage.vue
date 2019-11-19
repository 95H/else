<template>
    <div class="ensure-page">
        <p class="table-title" v-if="showCaseListFlag">案例修正表
            <edit :editFlag="caseUpdataFlag"
                  @cancel="cancel"
                  @save="save"
                  @startEdit="caseUpdateEditor"
                  v-if="noData&&showEdit">
            </edit>
        </p>
        <table class="fixed-table case-table" v-if="showCaseListFlag">
            <thead>
                <tr>
                   <th colspan="2">成本法</th>
                   <th colspan="2">收益法</th>
                   <th colspan="2">市场法</th>
                </tr>
                <tr>
                   <th>建筑面积单价（元/㎡）</th>
                   <th>权重比例（%）</th>
                   <th>评估单价（元/㎡）</th>
                   <th>权重比例（%）</th>
                   <th>评估单价（元/㎡）</th>
                   <th>权重比例（%）</th>
                </tr>
            </thead>
            <tbody id="ensur_table" v-if="caseUpdata.length!=0">
                <tr v-for = "(item,column) in caseUpdata" :key="column">
                    <td v-for="(tableHVal,key,idx) in item" :key="key"  v-if="new RegExp('^[A-F]{1}$').test(key)">
                        <template v-if="caseUpdataFlag&&(idx+1)%2==0&&editArr.indexOf(key)>-1">
                            <input  class="input-edit" :value="tableHVal"  @keyup="amend($event,key)" @blur="blurFn($event,key)"/>
                        </template>
                        <span v-else>{{tableHVal}}</span>
                    </td>
                </tr>

            </tbody>
            <tbody v-else>
                 <tr>
                    <td colspan="6">
                        <div class="noData">暂无数据</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="table-title">评估结果表</p>
        <table class="case-table">
            <thead>
                <tr>
                    <th>房屋所有权证号</th>
                    <th>建筑物名称</th>
                    <th>建筑面积（㎡）</th>
                    <th>评估单价（元/㎡）</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="assessCaseResult.length!=0">
                    <td width="200">{{assessCaseResult[0]['A']}}</td>
                    <td width="200">{{assessCaseResult[0]['B']}}</td>
                    <td width="80">{{assessCaseResult[0]['C']}}</td>
                    <td width="100">{{assessCaseResult[0]['D']}}</td>
                </tr>
                <tr v-else>
                    <td colspan="4">
                        <div class="noData">暂无数据</div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
import edit from "@/page/fullPageModule/case/houseCase/edit"
export default {
    components:{edit},
    data(){
        return{
            caseUpdataFlag:false,
            //
            caseUpdata:[],
            assessCaseResult:[{

            }],
            caseCopyData:{}, //复制数据
           // editData:{},
           columnObj:{
               "B":true,
               "D":true,
               "F":true,
           },
           updataObj:{},
           noData:true, //是否有数据
           editArr:[],//可编辑的列
           editObj:{
               "B":0,
               "D":1,
               "F":2,
           },
           showCaseListFlag:false,//暂时隐藏案例修正表

        }
    },
    mounted(){


    },
    watch:{

    },
    computed:{
        showEdit(){
            var flag = true;
            this.$store.state.allCaseEnable.length<=1?flag=false:flag=true;
            return flag;
        }
    },
    methods:{
        /**案列编辑 */
        caseUpdateEditor(){
            this.caseUpdataFlag = true;
            this.editArr = [];
            for(var i=0;i<this.$store.state.allCaseEnable.length;i++){
                switch (this.$store.state.allCaseEnable[i]) {
                    case "成本法":
                        this.editArr.push("B")
                        break;
                    case "收益法":
                        this.editArr.push("D")
                        break;
                    case "市场法":
                        this.editArr.push("F")
                        break;
                }
            }
            for(var item in this.caseUpdata[0]){
                if(this.editArr.indexOf(item)>-1&&this.caseUpdata[0][item]=='--'){
                        this.caseUpdata[0][item] ="";
                    }

            }
        },
        cancel(){
            var _this = this;
            this.caseUpdataFlag = false;

            for(var item in this.columnObj){
                this.columnObj[item] =true;
            }
            for(var item in this.caseUpdata[0]){
                if((item=="B"||item=="D"||item=="F")&&this.caseUpdata[0][item]==''){
                        this.caseUpdata[0][item] ="--";
                    }
            }
            this.updataObj ={};
            this.caseCopyData = {};
            //console.log(_this.caseUpdate);
        },

        save(){
            var _this = this;
            var flag = false;
            //需要判断输入的值是否正确
            if(!this.columnObj['B']||!this.columnObj['D']||!this.columnObj['F']){
                 this.$messageError('请输入正确的权重比列')
                return;
            }
            //需要判断输入框的值
            var totalNum = 0;
            for(var i =0;i<this.editArr.length;i++){
                totalNum+=Number($('#ensur_table').find('input')[i].value);
                flag = true;

            }
            if(flag&&totalNum!=100){
                this.$messageError('权重比例之和须为100');
                return;
            }


           //判断是否有修改的数据
           if(JSON.stringify(_this.caseCopyData)!="{}"){
                var jsonStr = JSON.stringify(_this.caseCopyData);
                console.log(jsonStr);
                //需要请求数据
                this.$http.post('/api/case/operateCaseList',{
                    projectId:this.$store.state.projectId,
                    investorId:this.$store.state.investorId,
                    idAndValue:jsonStr,
                    ruleType:'结果确定表',
                    dataId:this.$store.state.caseDataId,
                    xlsSheetName: this.$store.state.curSheetName,
                    sheetName:'结果确定表'
                }).then(function(res){
                    //_this.$messageSuccess('保存成功')
                    _this.caseCopyData = {};
                    _this.cancel();
                    _this.initData();
                    _this.$store.state.updateCaseFlag = true;
                    if(res.data)_this.$store.state.resultDataUpdateRow = res.data;
                }).catch(function(err){
                    _this.$messageError(err);
                    _this.$store.state.caseTabFlag = false;
                })
           }else{
                _this.cancel();
           }

        },
        amend(e,key){
            e.target.value=e.target.value.replace(/\s+/g, "");
            //需要判断输入值为

        },
        blurFn(e,key){
            var _this = this;
            //小数点2位/^(0|[1-9][0-9]{0,1})([.]{1}[0-9]{1,2})?$/
            if(e.target.value!=''&&!/^(0|[1-9][0-9]{0,2})?$/.test(e.target.value)){
                 this.$messageError('权重比例须是正整数');
                 this.columnObj[''+key] =false;
                 return;
            }
            this.columnObj[''+key] = true;
            //需要判断跟初始值是否一致
            for(var item in this.caseUpdata[0]){
                if(item==key&&this.caseUpdata[0][item]==e.target.value) return;
            }
             if(!this.caseCopyData[this.caseUpdata[0].id]){
                this.caseCopyData[this.caseUpdata[0].id] = {};
            }
            this.caseCopyData[this.caseUpdata[0].id][key] = e.target.value;
            this.caseCopyData[this.caseUpdata[0].id]['sort'] = this.caseUpdata[0]['sort'];
            console.log(_this.caseCopyData)
        },
        /**无数据的处理 */
        noDataFn(){
            this.caseUpdata =[];
            this.assessCaseResult=[];
        },
        initData(){
            //需要判断如果各个案列都没数据的话就不需要请求数据
            var _this =this;
            this.$http.post('api/case/getCaseDetails', {
                projectId: this.$store.state.projectId,
                investorId: this.$store.state.investorId,
                sheetName: '',
                ruleType:'结果确定表',
                dataId: this.$store.state.caseDataId
            }).then(res=> {
                for(var i =0 ;i<res.data.data["案例修正表"].length;i++){
                    for(var item in res.data.data["案例修正表"][i]){
                        if(new RegExp('^[A-F]{1}$').test(item)&&res.data.data["案例修正表"][i][item]==''){
                                res.data.data["案例修正表"][i][item] ="--";
                        }
                    }
                }
               _this.caseUpdata = res.data.data["案例修正表"];
               _this.assessCaseResult = res.data.data["评估结果表"];

            }).catch(err=> {
                this.$messageError(err);
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.fixed-table{table-layout: fixed;}
input{outline: 0;}
// table.case-table{width:100%;
//     *{box-sizing: border-box;}
//     th{color:#262628;font-size: 13px;}
//     td{color: #6A6A6A;font-size: 12px;white-space: pre-wrap;word-wrap: break-word;position: relative;
//       .input-edit{border: 1px solid #e5e5e5;text-align: center;position: absolute;left: 0;top: 0;width: 100%;height: 100%;padding: 0 14px 1px;border-radius: 0;box-shadow: 1px 1px 20px rgba(0,0,0,.15)}
//     }
//     tr th,tr td{border: 1px solid #e5e5e5;text-align: center;height: 30px;line-height: 30px;position: relative;}
//     thead tr{background: #f6faff;}
// }
table.case-table{
     tbody td:first-child{border-left:1px solid #e5e5e5;}
     td{word-wrap: break-word;}
}
.ensure-page{
    .table-title{ color: #262628; font-size: 13px; font-weight:bold; margin-bottom: 5px;margin-top:14px;height: 22px;line-height:22px;
        &:before{content: ''; width: 6px; height: 6px; border-radius: 3px; background-color: #F09237; display: inline-block; margin:0 10px 3px 0; vertical-align: middle;}
    }
    .noData{height: 144px;line-height: 232px;}
}

</style>
