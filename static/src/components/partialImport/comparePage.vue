<template>
<div id="comparePage">
    <center-dialog ref="centerDialog" :dialogWidth='dialogWidth' :dialogHeight="dialogHeight" :dialogTitle="dialogTitle" :titlePosition="titlePosition">
            <div slot="dialogContent" class="contrast-cont">
                 <div class="btn-group">
                      <el-button type="primary" @click="subImport">确认导入</el-button>
					  <el-button type="primary" class="defaultBtn" @click="cancelImp">取消导入</el-button>
                      <el-button type="primary" @click="exportExcel" v-show="activeNum=='1'&&resDataType!='partialImport'">导出</el-button>
                      <span class="dialog-close iconfont" @click="cancelImp"></span>
                </div>
                <!--台账对比 begin -->
                
                <ul class = "menu-list" v-if="resDataType!='partialImport'">
                    <li v-for="(item,index) in tabList" :key="index" :class="{actived:index==activeNum}" @click="menuTab(index)">{{item}}</li>
                </ul>
               
                 <!--台账对比 end -->
                <!--对比匹配页面 begin-->
                <div v-show="activeNum=='0'">
                    <div class="clear over-hide">
                        <div class="contrast-panel fl">
                            <p class="b-title">
                                <i class="circle"></i>
                                <span class="ver-mid">补充数据 - </span>
                                <span class="c-orange">{{curSheetName}}</span>
                                
                            </p>
                            <table-sheet 
                            @loadMoreDate="loadMoreDate"
                            @spanMouseDown="spanMouseDown"
                            @tableHdMouseMove="tableHdMouseMove"
                            :tableHeader="tableHeader" 
                            :uploadData="combinationId" 
                            :tableRows="comparedData" 
                            :tableHdId="comparedHdId" 
                            :tableBdId="comparedBdId"
                            :resultData="comResultData"
                            :resDataType="resDataType"
                            :activeNum="activeNum">
                            </table-sheet>
                        </div>
                        <div class="contrast-panel fr">
                            <p class="b-title">
                                <i class="circle"></i>
                                <span class="ver-mid">原始数据 - </span>
                                <span class="c-orange">{{curSheetName}}</span>
                            </p>
                            <table-sheet  
                            @loadMoreDate="loadMoreDate" 
                            @spanMouseDown="spanMouseDown"
                            @tableHdMouseMove="tableHdMouseMove"
                            :tableHeader="tableHeader" 
                            :uploadData="combinationId" 
                            :tableRows="rawData" 
                            :tableHdId="rawHdId" 
                            :tableBdId="rawBdId"
                            :resultData="comResultData"
                            :resDataType="resDataType"
                            :activeNum="activeNum">
                            </table-sheet>
                        </div>
                    </div>
                    <scroll-tab :tabArr="tabArr" :isSelectM="true"  :isFullPart="false" @tabClick="tabClick"></scroll-tab>
                </div>    
                <!--对比匹配页面 end-->
                <!--未匹配页面 begin-->    
                <div v-show="activeNum=='1'">
                   
                        <!-- <table-sheet 
                            @loadMoreDate="loadMoreDate"
                            @spanMouseDown="spanMouseDown"
                            @tableHdMouseMove="tableHdMouseMove"
                            :tableHeader="unMatchTableHeader" 
                            :uploadData="uploadData" 
                            :tableRows="unMatchTableData" 
                            :tableHdId="unMatchHdId" 
                            :tableBdId="unMatchBdId"
                            :resultData="unMatchResultData"
                            :resDataType="resDataType"
                            :activeNum="activeNum">
                        </table-sheet> -->
                        <unmatch-table
                       
                        @loadMoreDate="loadMoreDate"
                        @spanMouseDown="spanMouseDown"
                        @dragUnmatchTable="dragUnmatchTable"
                        :tableHeader="unMatchTableHeader" 
                        :tableRows="unMatchTableData" 
                        :tableHdId="unMatchHdId" 
                        :tableBdId="unMatchBdId"
                        :resultData="unMatchResultData"
                        :resDataType="resDataType"
                        :unMatchThWidth="unMatchThWidth">
                        </unmatch-table>
                    <scroll-tab  :tabArr="unMatchSheetArr" :isSelectM="true"  :isFullPart="false" @tabClick="tabUnMatch"></scroll-tab>
                    
                </div>
                 <!--未匹配页面 end-->   
            </div>
        </center-dialog>
</div>    
</template>
<script>
import Public from "../../public.js";
import tableDataJson from '@/page/fullPageModule/tableJson.js';
import centerDialog from "@/components/centerDialog.vue";
import tableSheet from '@/components/partialImport/tableSheet';
import unmatchTable from '@/components/partialImport/unmatchTable'
import scrollTab from '@/components/scrollTab2.vue';
export default {
    components:{centerDialog,tableSheet,scrollTab,unmatchTable},
    props:["combinationId","compareFullData","compareType","uploadData"],
    data(){
        return{
            dialogWidth:'',
            dialogHeight:'',
            dialogTitle:'补充数据比对',
            titlePosition:'center',
            tabArr:[],// scroll科目
            tableHeader:'',
            tableDataJson:'',
            tableHdFullData:'', //所有表头数据
            curSheetName:'', //当前的科目名
            curBenchmarkColumn:'',//当前科目的列名
            comparedData:[],//补充数据
            rawData:[], //原始数据
            comparedHdId:"comTableHead",//补充数据的表头id
            comparedBdId:"comTableBody",//补充数据的表身id
            rawHdId:"rawTableHead",//原始数据表头id
            rawBdId:"rawTableBody",//原始数据的表身id
            pageNum: 1, //当前页数
            dataNums:0,//
            moreData: '', //是否可以加载下一页
            totalCount:0,//总条数
            direction:'',//滚动加载的方向
            scrollBool: false, //滚动加载只执行一次
            isMousemove:false,//拖拽
            tabX:0,
            firstLoad:true, //第一次加载数据
            divScrollTop:0,//向上滚动的距离
            comResultData:[],//补充的全部数据
            rawResultData:[],//原始的全部数据

            resDataType:'',//请求数据的类型
            tabList:["已补充数据","未补充数据"], //台账导入的menu
            activeNum:0,//当前的tab
            unMatchSheetArr:[],//未匹配的科目
           // unMatchData:[],//demo 数据
            unMatchSheetName:'',//未匹配科目
            unMatchTableHeader:{},//未匹配的表头
            unMatchTableData:[],//未匹配的数据
            unMatchResultData:[],//未匹配的全部数据
            unMatchHdId:"unMatchHdId",//未匹配表头
            unMatchBdId:"unMatchBdId",//未匹配表身
            unMatchCurNumber:1,//当前页码
            unMatchThWidth:{},//未匹配表的宽度
            unmatchStartIndex:0,//开始的序号
            importType:'',//导入方式(1台账, 2部分导入)
            unmatchMoreData:'',//未匹配是否可以向下加载数据
            unmatchScrollTop:0,
           
        }
    },
    //
    computed:{
        //页面上显示的数据
       rawVisData(){
           return this.rawData;
       },
       //
       comVisData(){
           return this.comparedData;
       }
    },
    mounted(){
        var _this = this;
        //var oH = document.getElementById('comparePage').querySelector(".center-body").offsetHeight;
        this.tableDataJson = tableDataJson.dataSurface;
        this.$store.state.activePage = 0;
    },
    watch:{
        tableRows:{
            handler: function(newD, oldD) {
              
            },
            deep: true
        },
        unMatchThWidth:{
            handler: function(newD, oldD) {
              
            },
            deep: true                
        },
        compareType(newVal,oldVal){
            switch (newVal) {
                case "部分导入对比页面":
                    this.dialogTitle = "补充数据比对";
                    this.resDataType = "partialImport";
                    this.importType ='2';
                    break;
                case "台账导入对比页面":
                    this.dialogTitle = "台账导入比对";
                    this.resDataType = "account"; 
                    this.importType ='1';
                    break;
                
            }
        },
        compareFullData:{
             handler: function(newD, oldD) {
                var _this = this;
                this.tabArr = [];
                for(var i =0;i<this.compareFullData.length;i++){
                    var obj ={};
                    obj.name= _this.compareFullData[i].sheetName;
                    this.tabArr.push(obj);
                };
                
                //默认显示第一个科目
                this.curSheetName =   this.compareFullData[0].sheetName; 
                this.curBenchmarkColumn =   this.compareFullData[0].benchmarkColumn; 
                this.$store.state.curSheetName =  this.compareFullData[0].sheetName; 
                
                this.getTableType(_this.curSheetName );//获取表头
                console.log(_this.compareType);
                this.getSheetData();
            },
            deep: true
        },
       
    },
    created(){
        var _this = this;
        this.tableHdFullData = tableDataJson.tableHead;
        window.onresize = function(){
             Public.$emit('reckonHg');
             console.log(_this.activeNum);
             if(_this.activeNum==0){
                _this.renewVisibleData(_this.divScrollTop);
             }else{
                _this.renewVisibleData(_this.unmatchScrollTop);
             }
           
        };
        //
        //this.unMatchData = unMatchData;

    },
    methods:{
        showDialog(){
            var _this = this;
            this.$refs.centerDialog.showDialog();
            
        },
         /*取消导入 */
        cancelImp(){
            var _this = this;
            this.confirmCase('是否放弃本次导入？',function(){
                _this.setImportFn('cancel');
            });
        },
        /*确认导入 */
        subImport(){
            var _this = this;
            this.confirmCase('是否确认本次导入？',function(){
                _this.setImportFn('confirm');
            });
        },
        /*是否导入的状态*/
        setImportFn(type){
            var _this = this;
            this.$http.post('/api/xls/summary/confirmOrCancel',{
                projectId:_this.combinationId.projectId,
                investorId:_this.combinationId.investorId,
                operationType:type,
                importType:_this.importType
            }).then(function(){
                _this.$emit("reloadPage");
                if(type=="confirm"){
                     _this.$emit("sendConnect");
                }
                //需要重置数据
                _this.pageNum = 1;
                _this.dataNums = 0;
                _this.firstLoad = true;
                _this.activeNum = 0;
                _this.moreData = '';
                _this.unmatchMoreData ='';
                _this.unMatchCurNumber = 1;
                _this.unmatchStartIndex = 0;
                _this.unMatchSheetName = '';
                _this.$store.state.hierarchy = true;
                _this.divScrollTop = 0;
                _this.unmatchScrollTop = 0;    
                _this.$refs.centerDialog.closeDialog();
            }).catch(function(err){
                _this.$messageError(err);
            })
        },
         /*提示 */
        confirmCase(text,callback){
            var _this=this;
            this.$confirm(text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal:false,
                customClass:'search-confire-box',
                type: 'warning',
                callback:action=>{
                        //confirm(确定)cancel（确定）
                        if(action=="confirm"){
                            //需要做判断
                            callback&&callback();
                        }
                    }
            })
        },
        getTableType(sheetName){
            var _this = this;
            for(var i =0;i<_this.tableDataJson.length;i++){
                if(_this.tableDataJson[i].name==sheetName){
                    _this.tableHeader = _this.tableHdFullData[_this.tableDataJson[i].type]
                }
            }
            //console.log(_this.tableHeader);
        },
        /*获取数据 */
        getSheetData(callback){
            var _this = this;
            //计算高度
           
            this.$http.post('/api/xls/summary/showDiffData',{
                projectId:this.combinationId.projectId,
                investorId:this.combinationId.investorId,
                sheetName:this.curSheetName,
                startIndex:this.dataNums, //从0开始
                pageNum:this.pageNum, //当前页面
                dataSize:60,
                importType:this.importType// 对比类型(2部分导入or 1 台账页面) 
            }).then(function(res){
                //_this.pageNum =Number(res.data.pageNum);//当前页码
                _this.moreData = res.data.moreData;//是否可以加载下一页
                _this.dataNums = res.data.dataNums;
                var tableHeader= _this.tableHeader[_this.tableHeader.length-1];
                //处理序号
                for(var i =0;i<res.data.comparedData.length;i++){
                    res.data.comparedData[i].numB = (_this.pageNum-1)*60+(i+1);
                    res.data.rawData[i].numB = (_this.pageNum-1)*60+(i+1);
                }
                //处理日期
                 for(var i =0;i<res.data.comparedData.length;i++){
                    for(var item in tableHeader){
                        if(tableHeader[item].search&&tableHeader[item].search.inputType&&tableHeader[item].search.inputType=="date"&&!/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(res.data.comparedData[i][item])){
                            res.data.comparedData[i][item]='';
                            
                        }
                        if(tableHeader[item].search&&tableHeader[item].search.inputType&&tableHeader[item].search.inputType=="date"&&!/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(res.data.rawData[i][item])){
                            res.data.rawData[i][item]='';    
                        }
                        //判断时候是千分列，需要转换数据
                        if(tableHeader[item].isThousands){
                            if(!(res.data.comparedData[i][item]==="" || res.data.comparedData[i][item]==="0")){
                                res.data.comparedData[i][item] = _this.$store.state.commafyNumber(res.data.comparedData[i][item]);
                            }
                            if(!(res.data.rawData[i][item]==="" || res.data.rawData[i][item]==="0")){
                                res.data.rawData[i][item] = _this.$store.state.commafyNumber(res.data.rawData[i][item]);
                            }
                        }

                    }
                }
                //计算高度
                Public.$emit('reckonHg');
                //第一页
                if(_this.pageNum==1){
                    _this.comparedData = [];
                    _this.rawData = [];
                    _this.comResultData =[];
                    _this.rawResultData =[];
                    // _this.comparedData=res.data.comparedData;
                    // _this.rawData=res.data.rawData;
                    _this.direction = '';
                    _this.comResultData =  res.data.comparedData;//全部数据
                    _this.rawResultData =  res.data.rawData;
                    _this.renewVisibleData();
                }else{
                    //判断滚动的方向
                    switch (_this.direction) {
                        case 'bottom':
                            var lastOrderNum =  _this.comparedData[_this.comparedData.length-1].numB;
                            for(var i =0;i<res.data.comparedData.length;i++){
                                var order = lastOrderNum +=1;
                                res.data.comparedData[i].numB = order;
                                res.data.rawData[i].numB = order;
                            };
                             _this.comResultData =  _this.comResultData.concat(res.data.comparedData);
                            _this.rawResultData =_this.rawResultData.concat(res.data.rawData);
                        break;
                        case 'top':

                        break;

                    }
                }
                //需要计算高度
            //    setTimeout(function(){
                    
            //     },100);
               callback && callback();
            }).catch(function(err){
                _this.$messageError(err);
            })
        },
        /**加载数据 */
        loadMoreDate(scrollTop,scrollHeight,clientHeight){
            var _this = this;
            if(this.activeNum==0){
                /**已匹配数据 */
                this.divScrollTop = scrollTop;
                this.renewVisibleData(scrollTop);	
                if(this.scrollBool) return;
                //向下滚动的时候
                if (scrollTop > scrollHeight - clientHeight - 20){
                    if (this.moreData){
                        this.scrollBool = true;
                        this.pageNum += 1;
                        this.direction = 'bottom';
                        this.getSheetData(function(){
                        _this.scrollBool = false;
                        });
                    }
                }
            }else{
                /**加载未匹配的数据 */
                this.unmatchScrollTop = scrollTop;
                this.renewVisibleData(scrollTop);	
                if(this.scrollBool) return;
                if (scrollTop > scrollHeight - clientHeight - 20){
                    if (this.unmatchMoreData){
                        this.scrollBool = true;
                        this.unMatchCurNumber++;
                        this.getUnmatchData(function(){
                             _this.scrollBool = false;
                        });
                    }
                }

            }
           
        },
        /**切换科目 */
        tabClick(val){
            var _this = this;
            if(val.name==this.$store.state.curSheetName) return;
            this.pageNum = 1;
            this.dataNums = 0;
            this.moreData = '';
            this.$store.state.curSheetName = val.name;
            this.curSheetName = val.name;
            this.getTableType(val.name);
            for(var i = 0;i<this.compareFullData.length;i++){
                if(this.compareFullData[i].sheetName==val.name){
                   this.curBenchmarkColumn = this.compareFullData[i].benchmarkColumn; 
                   this.getSheetData(function(){
                       //需要将滚动条置位
                        document.getElementById('rawTableBody').scrollTop = 0;
                        document.getElementById('rawTableBody').scrollLeft = 0;
                        document.getElementById('comTableBody').scrollTop = 0;
                        document.getElementById('comTableBody').scrollLeft = 0;
                   });
                   break;
                }
            }
        },
        /**未匹配scrollBar的切换 */
        tabUnMatch(val){
             var _this = this;
             if(this.$store.state.curSheetName == this.unMatchSheetName == val.name) return;
             this.$store.state.curSheetName =  this.unMatchSheetName = val.name;//当前点击的科目
             this.unMatchCurNumber = 1; //当前页码
             this.unmatchStartIndex = 0;//开始的序号
             this.getUnmatchData(function(){
                  document.getElementById('unMatchBdId').scrollTop = 0;
                  document.getElementById('unMatchBdId').scrollLeft = 0;
             });

        },
        exportExcel(){
            window.location.href = "/api/xls/summary/ledgerUnmatchedExport?projectId="+this.combinationId.projectId+"&investorId="+this.combinationId.investorId+"&token="+this.$getCookie("token");
        },
        getUnmatchData(callback){
            var _this = this;
            this.$http.post("/api/xls/summary/showUnmatchedData",{
                projectId:this.combinationId.projectId,
                investorId:this.combinationId.investorId,
                sheetName:this.unMatchSheetName,
                importType:this.importType,//(1台账, 2部分导入)
                dataSize:60,
                startIndex:this.unmatchStartIndex
            }).then(function(res){
                _this.unmatchStartIndex+= res.data.count;
                _this.unmatchMoreData = res.data.moreData;
                //没有数据的处理
                if(res.data.dataList.length==0){
                    _this.unMatchResultData = [];
                    _this.unMatchSheetArr = [];
                    _this.firstLoad = false;
                    _this.unMatchCurNumber++;
                    return;
                }
                //需要请求未匹配的数据
                if(_this.firstLoad){
                     _this.unMatchSheetArr = [];
                    _this.unMatchResultData =[];
                    for(var i =0;i<res.data.sheetNames.length;i++){
                        var obj ={};
                        obj.name= res.data.sheetNames[i];
                        _this.unMatchSheetArr.push(obj);
                    };
                    _this.unMatchSheetName = _this.unMatchSheetArr[0].name;
                    _this.$store.state.curSheetName =  _this.unMatchSheetName;
                    _this.unMatchTableHeader.numB = "序号";
                    _this.unMatchTableHeader = Object.assign(_this.unMatchTableHeader,res.data.tableTitle);
                }
                 //需要添加序号
                  Public.$emit('reckonHg');
                if(_this.unMatchCurNumber==1){
                    for(var i =0;i<res.data.dataList.length;i++){
                       res.data.dataList[i].numB=(_this.unMatchCurNumber-1)*60+(i+1);
                    }
                     //需要添加宽度()
                    if(_this.unMatchTableHeader){
                        for(var item in _this.unMatchTableHeader){
                             _this.$set(_this.unMatchThWidth,item,Number(_this.unMatchTableHeader[item].length)*40);
                        //this.unMatchThWidth[item] = Number(this.unMatchTableHeader[item].length)*40
                        }
                    }
                    _this.unMatchResultData =  res.data.dataList;
                     setTimeout(function(){
                        _this.renewVisibleData();
                        _this.$forceUpdate();
                    },80);
                }else{
                    var lastOrderNum =  _this.unMatchResultData[_this.unMatchResultData.length-1].numB;
                    for(var i =0;i<res.data.dataList.length;i++){
                        var order = lastOrderNum +=1;
                        res.data.dataList[i].numB = order;
                    };
                     _this.unMatchResultData =  _this.unMatchResultData.concat( res.data.dataList);
                }
               
               
               
                _this.firstLoad = false;
                _this.unMatchCurNumber++;
                callback && callback();
            }).catch(function(err){
                 _this.$messageError(err);
            })
        },
        /*切换 （已匹配和未匹配）*/
        menuTab(idx){
            var _this = this;
            var scrollTop = 0;
            this.activeNum = idx;
            this.$store.state.activePage = idx;
            var time1 ='';
            var time2 ='';
            //第一次切换的时候
            if(this.activeNum==1&&this.firstLoad){
                this.getUnmatchData();
                return;
            }
            
            //已匹配页面
            if(this.activeNum==0){
                this.$store.state.curSheetName = this.curSheetName;
                scrollTop = this.divScrollTop;
                clearTimeout(time1);
                clearTimeout(time2);
            }else{
                this.$store.state.curSheetName =  this.unMatchSheetName;
                scrollTop = this.unmatchScrollTop;
                clearTimeout(time1);
                clearTimeout(time2);
            }
            time1=setTimeout(function(){
                 Public.$emit('reckonHg');
            },100)
            time2=setTimeout(function(){
                _this.renewVisibleData(scrollTop);
                _this.$forceUpdate();
            },200)
           
        },
        spanMouseDown(row,key,event,id){
            var _this=this;
            this.isMousemove=true;
            this.tabX=event.x;
            this.mousemoveKey=key;
            if(this.tableHeader.length>1){
              this.mousemoveRow=this.tableHeader[this.tableHeader.length-1];
            }else{
              this.mousemoveRow=row;
            }
            if(!this.mousemoveRow[this.mousemoveKey].width){
              this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveRow[this.mousemoveKey].minWidth)
            }
            this.mousemoveWidth=this.mousemoveRow[this.mousemoveKey].width;
            document.onmouseup=function () {
              _this.isMousemove=false;
            }
        },
        tableHdMouseMove(event,id){
            if(!this.isMousemove) return;
            if(this.mousemoveRow[this.mousemoveKey].minWidth<=(this.mousemoveRow[this.mousemoveKey].width+(event.x-this.tabX))){
                if(this.tableHeader.length>1 && this.tableHeader[0][this.mousemoveKey]){
                this.$set(this.tableHeader[0][this.mousemoveKey],"width",this.mousemoveWidth+(event.x-this.tabX))
                this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveWidth+(event.x-this.tabX))
                }else{
                this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveWidth+(event.x-this.tabX))
                }
            }else{
                if(this.tableHeader.length>1 && this.tableHeader[0][this.mousemoveKey]){
                this.$set(this.tableHeader[0][this.mousemoveKey],"width",this.tableHeader[0][this.mousemoveKey].minWidth)
                this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveRow[this.mousemoveKey].minWidth)
                }else{
                this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveRow[this.mousemoveKey].minWidth)
                }
            }
        },
        dragUnmatchTable(cloum,width){
            var _this = this;
            this.$set(_this.unMatchThWidth,cloum,width);
            _this.$forceUpdate();
        },
        renewVisibleData(scrollTop){
          this.itemHeight = '21';
          //已匹配页面
          if(this.activeNum==0){
                var obj = this.$store.state.renewVisibleData(scrollTop,this.itemHeight,'comTableBody');
                var start = Number(obj.start);
                var end = Number(obj.end);
                this.comparedData = this.comResultData.slice(start, end);
                this.rawData = this.rawResultData.slice(start, end);
                this.$forceUpdate();
                $('#comTableBody table tbody,#rawTableBody table tbody').css({
                        'webkitTransform':'translate3d(0,' +start *this.itemHeight+'px, 0)',
                        'mozTransform':'translate3d(0,' +start *this.itemHeight+'px, 0)',
                        'transform':'translate3d(0,' +start *this.itemHeight+'px, 0)'
                        
                    });
          }else{
               var obj = this.$store.state.renewVisibleData(scrollTop,this.itemHeight,'unMatchBdId');
               var start = Number(obj.start);
               var end = Number(obj.end);
               this.unMatchTableData = this.unMatchResultData.slice(start, end);
               this.$forceUpdate();
                $('#unMatchBdId table tbody').css({
                        'webkitTransform':'translate3d(0,' +start *this.itemHeight+'px, 0)',
                        'mozTransform':'translate3d(0,' +start *this.itemHeight+'px, 0)',
                        'transform':'translate3d(0,' +start *this.itemHeight+'px, 0)'
                    });
          }
            
        }
    },
     beforeDestroy(){
        
    },
    /**重置数据 */

   
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.contrast-cont{
    .b-title{color: #262628;font-size: 13px;position: relative;font-weight: bold;margin-bottom:10px;
        .circle{display: inline-block;width:6px;height: 6px;border-radius: 50%;background-color: #FF5722;vertical-align: middle;margin:0 5px;}
    }
    .c-orange{color:#FF5722;}
    .contrast-panel{width:49.7777%;}
}
.btn-group{position: absolute;top:-32px;right: 12px;background: #f6faff;
  .el-button{height: 25px;line-height:25px;padding: 0 10px;font-size:13px;border-radius: 2px;border-color:#409EFF;}
  .defaultBtn{background: #fff !important;border-color: #3a80ec;color: #3a80ec;
    &:hover{background: #E0ECFF!important;opacity: .7;}
  }
  .dialog-close{cursor: pointer;width: 18px;height: 18px;display: inline-block;margin-left: 35px;color: #c0c0c0;
    &::before{content: "\e607";}
    &:hover{color: #f09237 !important;}
  }
 
}
.over-hide{overflow: hidden;}
/deep/ .center-body{overflow:inherit}
.menu-list{border: 1px solid #ECECEC;padding-left:5px;margin-bottom: 13px; 
    li{display: inline-block;cursor: pointer;margin:0 15px;font-size:13px;color:#262628;height: 31px;line-height: 31px;
        &.actived{color:#145FD2;border-bottom:2px solid #145FD2;}
    }
}
</style>
