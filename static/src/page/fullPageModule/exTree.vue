<template>
    <div class="exTree">
        <div class="exTree-content">
            <div class="exTree-content-child">
                <div class="exTree-content-child-header">
                    导入科目选择
                    <el-checkbox v-model="subjectAllChecked" @change="subjectAllCheckedFun">全选</el-checkbox>
                </div>
                <div class="exTree-content-child-cont">
                    <el-scrollbar :style="{height:height+'px'}">
                        <el-collapse accordion>
                            <el-collapse-item v-for="(item,key) in sheetData" :key="key">
                                <template slot="title">
                                    <div class="exTree-content-child-cont-tit">
                                        <el-checkbox :dataKey="key" v-model="item.checked" @change="setPartAllFun">{{key}}（{{item.num}}）</el-checkbox>
                                    </div>
                                </template>
                                <ul>
                                    <li v-for="(childitem,childKey) in item.childList" :key="childKey"><el-checkbox :dataKey="key" :dataName="childitem.name" v-model="childitem.checked"  @change="setPartFun"></el-checkbox><span class="el-checkbox-label" :dataKey="key" @click="checkSpanFun($event,childitem)">{{childitem.name}}</span></li>
                                </ul>
                            </el-collapse-item>
                        </el-collapse>
                    </el-scrollbar>
                </div>
            </div>
            <div class="exTree-content-child">
                <div class="exTree-content-child-header">
                    导入基准列选择
                    <span class="c-orange">(必选)</span>
                </div>
                <div class="exTree-content-child-cont noData" :style="{height:height+'px',lineHeight:height+100+'px'}" v-if="selectBenchmarkList.length===0">请选择科目</div>
                <div class="exTree-content-child-cont scrollY" data-type="left" @mouseover="mouseoverFun($event,'left')" @scroll="scrollFun" ref="scrollLeft" :style="{height:height+'px'}" v-else>
                    <div class="exTree-content-child-cont-select-tit">
                        {{checkedData.name}}-数据基准列
                    </div>
                    <div class="exTree-content-child-cont-select-cont">
                        <ul>
                            <li></li>
                            <li v-for="(select,selectKey) in selectBenchmarkList" :key="selectKey"><el-checkbox :dataInd="selectKey" v-model="select.checked" @change="setBenchmarkFun"><span :title="select.name">{{select.name}}</span></el-checkbox></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="exTree-content-child">
                <div class="exTree-content-child-header">
                    导入补充列选择
                    <span class="c-orange">(必选)</span>
                    <!-- <el-checkbox v-model="subjectSupplementAllChecked">全选</el-checkbox> -->
                </div>
                <div class="exTree-content-child-cont noData" :style="{height:height+'px',lineHeight:height+100+'px'}" v-if="selectSupplementList.length===0">请选择科目</div>
                <div class="exTree-content-child-cont scrollY" data-type="right" @mouseover="mouseoverFun($event,'right')" @scroll="scrollFun" ref="scrollRight" :style="{height:height+'px'}" v-else>
                    <div class="exTree-content-child-cont-select-tit">
                        {{checkedData.name}}-数据补充列
                    </div>
                    <div class="exTree-content-child-cont-select-cont">
                        <ul>
                            <li><el-checkbox v-model="subjectSupplementAllChecked" @change="subjectSupplementAllFun">全选（除基准列）</el-checkbox></li>
                            <li v-for="(select,selectKey) in selectSupplementList" :key="selectKey"><el-checkbox :dataInd="selectKey" v-model="select.checked" @change="setSupplementFun"><span :title="select.name">{{select.name}}</span></el-checkbox></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sheetData from '@/page/fullPageModule/tableJson/sheetData.js'
import tableJson from '@/page/fullPageModule/tableJson.js'
import dealtListVue from '../../components/dealtList.vue';
export default {
    props:['height'],
    data(){
        return {
            sheetData:{},
            subjectAllChecked:false,    //导入科目全选
            subjectSupplementAllChecked:false,   //补充列全选（除基准列）
            checkedData:{},     //当前选中科目
            checkedEvent:{},     //当前选中event
            selectBenchmarkList:[],      //当前基准列选择
            selectSupplementList:[],    //当前补充列选择
            checkedSubject:[],   //选中科目
            subjectData:{},   //基准列和补充列的选中
            sortSubjectArr:[],   //排序模板
            scrollType:"",   //滚动的模块
        }
    },
    mounted(){
        this.createdData();
    },
    methods:{
        //初始化数据
        createdData(){
            var _this=this,treeData={};
            for (const key in sheetData) {
                treeData[key]={
                    checked:false,
                    num:0,
                    childList:sheetData[key].sheetList.map(function(val,index){
                        var list=[];
                        for (var i = 0; i < tableJson.dataSurface.length; i++) {
                            if(tableJson.dataSurface[i].name===val.name){
                                var headList=tableJson.tableHead[tableJson.dataSurface[i].type][tableJson.tableHead[tableJson.dataSurface[i].type].length-1];
                                for (const cell in headList) {
                                    var headval=headList[cell];
                                    if(headval.label!="操作" && cell!="ruleType" && headval.label!="作价规则" && headval.label!="" && headval.label!="序号" && headval.label.indexOf("草稿栏")===-1){
                                        list.push({key:cell,name:headval.subHead?headval.subHead+'-'+headval.label:headval.label})
                                    }
                                }
                            }
                        }
                        _this.sortSubjectArr.push(val.name)
                        return {checked:false,name:val.name,childList:list}
                    })
                }
            }
            this.$set(this,'sheetData',treeData)
        },
        //确认滚动的模块，防止重复执行滚动
        mouseoverFun(event,type){
            this.scrollType=type;
        },
        //滚动
        scrollFun(event){
            var scrollTop=event.target.scrollTop,type=event.target.attributes['data-type'].value;
            if(this.scrollType!=type){return}
            if(type==="left"){
                this.$refs.scrollRight.scrollTop=scrollTop
            }else if(type==="right"){
                this.$refs.scrollLeft.scrollTop=scrollTop
            }
        },
        //获取提交数据
        getData(){
            var getDataArr=[],errData={nameList:[]},_this=this;
            for (let i = 0; i < this.sortSubjectArr.length; i++) {
                const val = this.sortSubjectArr[i];
                if(_this.checkedSubject.indexOf(val)===-1) continue;
                var subjectData={};
                subjectData.sheetName=val;
                if(_this.subjectData[val]){
                    subjectData.supplementaryColumn=_this.subjectData[val].supplementaryColumnArr.join(",");
                    subjectData.benchmarkColumn=_this.subjectData[val].benchmarkColumnArr.join(",");
                }
                if(!_this.subjectData[val] || (_this.subjectData[val].supplementaryColumnArr.length===0 || _this.subjectData[val].benchmarkColumnArr.length===0)){
                    errData.nameList.push(val)
                }
                getDataArr.push(subjectData)
            }
            if(errData.nameList.length>0){
                return errData;
            }else{
                return getDataArr;
            }
        },
        //补充列全选
        subjectSupplementAllFun(val){
            if(val){
                for (let i = 0; i < this.selectBenchmarkList.length; i++) {
                    const item = this.selectBenchmarkList[i];
                    if(!item.checked){
                        if(!this.subjectData[this.checkedData.name]){this.subjectData[this.checkedData.name]={benchmarkColumnArr:[],supplementaryColumnArr:[]};}
                        var supplementaryColumnArr=this.subjectData[this.checkedData.name].supplementaryColumnArr
                        if(supplementaryColumnArr.indexOf(item.key)===-1){
                            this.selectSupplementList[i].checked=true;
                            supplementaryColumnArr.push(item.key)
                        }
                    }
                }
            }else{
                for (let i = 0; i < this.selectBenchmarkList.length; i++) {
                    const item = this.selectBenchmarkList[i];
                    if(!item.checked){
                        if(!this.subjectData[this.checkedData.name]){this.subjectData[this.checkedData.name]={benchmarkColumnArr:[],supplementaryColumnArr:[]};}
                        var supplementaryColumnArr=this.subjectData[this.checkedData.name].supplementaryColumnArr
                        if(supplementaryColumnArr.indexOf(item.key)!=-1){
                            this.selectSupplementList[i].checked=false;
                            supplementaryColumnArr.splice(supplementaryColumnArr.indexOf(item.key),1)
                        }
                    }
                }
            }
        },
        //基准列选择
        setBenchmarkFun(val,event){
            var ind=event.target.parentElement.parentElement.attributes.dataInd.value;
            if(val){
                if(!this.subjectData[this.checkedData.name]){this.subjectData[this.checkedData.name]={benchmarkColumnArr:[],supplementaryColumnArr:[]};}
                this.subjectData[this.checkedData.name].benchmarkColumnArr.push(this.selectBenchmarkList[ind].key);
                if(this.subjectData[this.checkedData.name].supplementaryColumnArr.indexOf(this.selectSupplementList[ind].key)!=-1){this.subjectData[this.checkedData.name].supplementaryColumnArr.splice(this.subjectData[this.checkedData.name].supplementaryColumnArr.indexOf(this.selectSupplementList[ind].key),1)}
                this.selectSupplementList[ind].checked=false;
            }else{
                this.subjectData[this.checkedData.name].benchmarkColumnArr.splice(this.subjectData[this.checkedData.name].benchmarkColumnArr.indexOf(this.selectBenchmarkList[ind].key),1)
            }
        },
        //补充列选择
        setSupplementFun(val,event){
            var ind=event.target.parentElement.parentElement.attributes.dataInd.value;
            if(val){
                if(!this.subjectData[this.checkedData.name]){this.subjectData[this.checkedData.name]={benchmarkColumnArr:[],supplementaryColumnArr:[]};}
                this.subjectData[this.checkedData.name].supplementaryColumnArr.push(this.selectSupplementList[ind].key);
                if(this.subjectData[this.checkedData.name].benchmarkColumnArr.indexOf(this.selectBenchmarkList[ind].key)!=-1){this.subjectData[this.checkedData.name].benchmarkColumnArr.splice(this.subjectData[this.checkedData.name].benchmarkColumnArr.indexOf(this.selectBenchmarkList[ind].key),1)}
                this.selectBenchmarkList[ind].checked=false;
            }else{
                this.subjectData[this.checkedData.name].supplementaryColumnArr.splice(this.subjectData[this.checkedData.name].supplementaryColumnArr.indexOf(this.selectSupplementList[ind].key),1)
            }
            if(this.subjectData[this.checkedData.name] && this.subjectData[this.checkedData.name].benchmarkColumnArr.length+this.subjectData[this.checkedData.name].supplementaryColumnArr.length===this.selectSupplementList.length){
                this.subjectSupplementAllChecked=true;
            }else{
                this.subjectSupplementAllChecked=false;
            }
        },
        //选中当前的基准列
        checkSpanFun(event,item){
            var _this=this,key=event.target.attributes.dataKey.value;
            if(this.checkedData!=item){
                if(this.checkedEvent.target){this.checkedEvent.target.setAttribute('style', '')}
                if(!item.checked) this.sheetData[key].num++;
                item.checked=true;
                this.subjectAdd(item.name);
                this.checkedEvent=event;
                this.checkedData=item;
                event.target.setAttribute('style', 'color:#3A80EC');
                // event.target.style="color:#3A80EC";
                //初始化当前选中的基准列和补充列
                this.selectBenchmarkList=item.childList.map(function(val,index){
                    if(_this.subjectData[item.name] && _this.subjectData[item.name].benchmarkColumnArr.indexOf(val.key)!=-1){
                        return {key:val.key,name:val.name,checked:true}
                    }else{
                        return {key:val.key,name:val.name,checked:false}
                    }
                });
                this.selectSupplementList=item.childList.map(function(val,index){
                    if(_this.subjectData[item.name] && _this.subjectData[item.name].supplementaryColumnArr.indexOf(val.key)!=-1){
                        return {key:val.key,name:val.name,checked:true}
                    }else{
                        return {key:val.key,name:val.name,checked:false}
                    }
                });
                if(_this.subjectData[item.name] && _this.subjectData[item.name].benchmarkColumnArr.length+_this.subjectData[item.name].supplementaryColumnArr.length===this.selectSupplementList.length){
                    this.subjectSupplementAllChecked=true;
                }else{
                    this.subjectSupplementAllChecked=false;
                }
                //回到顶端
                this.$nextTick(()=>{
                    if(this.$refs.scrollRight){
                        this.$refs.scrollRight.scrollTop=0;
                        this.$refs.scrollLeft.scrollTop=0;
                    }
                })
            }else{
                if(!item.checked) this.sheetData[key].num++;
                item.checked=true;
                this.subjectAdd(item.name)
            }

        },
        //科目部分选
        setPartAllFun(val,event){
            var key=event.target.parentElement.parentElement.attributes.dataKey.value;
            if(val){
                this.sheetData[key].num=this.sheetData[key].childList.length;
                this.subjectBatch(this.sheetData[key].childList,"ADD")
            }else{
                this.sheetData[key].num=0;
                this.subjectBatch(this.sheetData[key].childList,"DEL")
            }
            this.isSubjectAll()
        },
        //科目全选
        subjectAllCheckedFun(val){
            var _this=this;
            if(val){
                for (const key in _this.sheetData) {
                    _this.sheetData[key].checked=true;
                    _this.sheetData[key].num=_this.sheetData[key].childList.length;
                    _this.subjectBatch(_this.sheetData[key].childList,"ADD")
                }
            }else{
                for (const key in _this.sheetData) {
                    _this.sheetData[key].checked=false;
                    _this.sheetData[key].num=0;
                    _this.subjectBatch(_this.sheetData[key].childList,"DEL")
                }
            }
        },
        //科目单选
        setPartFun(val,event){
            var _this=this,key=event.target.parentElement.parentElement.attributes.dataKey.value,name=event.target.parentElement.parentElement.attributes.dataName.value;
            if(val){
                this.subjectAdd(name)
                this.sheetData[key].num++;
                for (let i = 0; i < this.sheetData[key].childList.length; i++) {
                    const item = this.sheetData[key].childList[i];
                    if(!item.checked){
                        _this.isSubjectAll()
                        return
                    }
                }
                this.sheetData[key].checked=true;
                this.isSubjectAll()
            }else{
                this.subjectDeletion(name)
                this.sheetData[key].checked=false;
                this.sheetData[key].num--;
                this.isSubjectAll()
            }
        },
        //科目批量删除和添加
        subjectBatch(list,type){
            var _this=this;
            list.forEach(item => {
                if(type==="ADD"){
                    item.checked=true;
                    _this.subjectAdd(item.name)
                }else if(type==="DEL"){
                    item.checked=false;
                    _this.subjectDeletion(item.name)
                }
            });
        },
        //科目是否批量全选
        isSubjectAll(){
            var _this=this;
            for (const key in this.sheetData) {
                const item = _this.sheetData[key];
                if(!item.checked){
                    _this.subjectAllChecked=false;
                    return
                }
            }
            this.subjectAllChecked=true;
        },
        //科目删除
        subjectDeletion(name){
            if(this.checkedSubject.indexOf(name)!=-1){
                this.checkedSubject.splice(this.checkedSubject.indexOf(name),1)
            }
        },
        //科目添加
        subjectAdd(name){
            if(this.checkedSubject.indexOf(name)===-1){
                this.checkedSubject.push(name)
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
    .c-orange{color: #F09237}
    .exTree{
        padding: 10px;
        box-sizing: border-box;
        .exTree-content{
            display: flex;
            border:1px solid #E5E5E5;
            .exTree-content-child:nth-child(1){
                width: 220px;
            }
            .exTree-content-child:nth-child(2),.exTree-content-child:nth-child(3){
                flex: 1;
                width: 10px;
                border-left:1px solid #E5E5E5;
                ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
                    background-color:#fff;
                }
                ::-webkit-scrollbar {//滚动条的宽度
                    width:6px;
                    height:6px;
                }
                ::-webkit-scrollbar-thumb {//滚动条的设置
                    background-color:rgba(144,147,153,.3);
                    background-clip:padding-box;
                    border-radius: 3px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color:rgba(144,147,153,.5);
                }
            }
            .exTree-content-child{
                .exTree-content-child-header{
                    height: 32px;
                    line-height: 32px;
                    background: #F6FAFF;
                    padding-left: 14px;
                    box-sizing: border-box;
                    color:#262628;
                    border-bottom:1px solid #E5E5E5;
                    .el-checkbox{
                        float: right;
                        margin-right: 14px;
                        .el-checkbox__label{
                           color:#262628;
                        }
                    }
                }
                .exTree-content-child-cont{
                    .exTree-content-child-cont-tit{
                        padding-left: 15px;
                        box-sizing: border-box;
                    }
                    ul li{
                        height: 30px;
                        line-height: 30px;
                        padding-left: 15px;
                        box-sizing: border-box;
                        .el-checkbox-label{
                            cursor: pointer;
                            margin-left: 10px;
                            font-size: 12px;
                        }
                    }
                    .exTree-content-child-cont-select-tit{
                        font-size: 12px;
                        padding: 20px 0 8px 15px;
                    }
                }
            }
            .scrollY{
                overflow-y: scroll;
                overflow-x: hidden;
            }
        }
        /deep/ .el-collapse{
            border:none;
            .el-collapse-item__header{
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #E5E5E5;
                color: #262628;
                font-weight: bold;
                .el-collapse-item__arrow{
                    line-height: 30px;
                    margin-right: 10px;
                }
                .el-icon-arrow-right::before{
                    content: "\E60E";
                }
            }
            .el-collapse-item__content{
                padding: 10px 0;
            }
        }
        /deep/ .el-scrollbar{
            .el-scrollbar__wrap{
                overflow-x:hidden;
            }
        }
    }
</style>

