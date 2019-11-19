<template>
<div>
    <div class="compare-cont table80-wrap">
       <!--已匹配表格 begin-->
        <div class="wrap-table" ref="tableWrap">
            <div class="wrap-table-head" ref="tableHead" @mousemove.prevent='mousemove($event,tableHdId)' :id="tableHdId" :class="{visSate:tableRows.length===0}">
                <table>
                  <thead>
                      <tr v-for="(tableH,tableHInd) in tableHeader" :key="tableHInd">
                        <th v-for="(tableHVal,key) in tableH" :key="key" v-if="!tableHVal.isNoShow&&key!='operation'&&key!='check'"  :align="tableHVal.align?tableHVal.align:'center'" :rowspan="tableHVal.rowspan?tableHVal.rowspan:1" :colspan="tableHVal.colspan?tableHVal.colspan:1">
                          <div  class="cell" :class="{searchM:tableHVal.search}" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                              <span  class="searchMSpan">
                                  {{tableHVal.label}}
                              </span>
                          </div>
                          <span v-if="!tableHVal.colspan" class="headRight" @mousedown="mousedown(tableH,key, $event,tableHdId)"></span>
                        </th>
                        <!--占位-->
                        <th  class="full-no-border" v-if="trPatchWidth!=0">
                          <div :style="{'width':trPatchWidth+'px'}"></div>
                        </th>
                      </tr>
                  </thead>
                </table>
            </div>

            <div class="wrap-table-body" :id="tableBdId"  ref="tableScroll" 
            @scroll="scrollFn($event,tableBdId)"  
            @mouseover="mouseScrollFun($event,tableBdId)">
                <div class="noData"  v-if='tableRows.length===0'>暂无数据</div>
                <table class="tableBody" ref="tableBody" :style="{height: contentHeight}">
                    <tbody>
                        <tr v-for="(tableR,tableRInd) in tableRows"  :key="tableRInd">
                            <td v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]" 
                            :key="key" 
                            v-if="!tableR.trIsHide&&key!='operation'&&key!='check'" 
                            :align="tableHVal.align?tableHVal.align:'center'"  
                            :class="tableHVal.align?tableHVal.align:'center'"
                            >
                                <!-- 序号 -->
                                <div v-if="key==='numB'" class="cell" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                    {{tableR[key]}}
                                </div>
                                <!-- 其他内容 -->
                                <div v-else-if="key!='operation'&&key!='check'" class="cell" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                                    <el-input :class="{isWarning:tableR[key]=='#N/A'}"  v-if="(tableR['disableColumns'].split(';')).indexOf(key)>-1" :disabled="true" v-model="tableR[key]"></el-input>
                                    <el-select v-else-if="tableHVal.selected" v-model="tableR[key]" :disabled="true"
                                    :class="{isMarked:(tableR['columnNames'].split(',')).indexOf(key)>-1}">
                                         <el-option
                                            v-for="item in tableHVal.search.rule"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-select v-else-if="tableHVal.isSelect" v-model="tableR[key]" 
                                    :class="{isMarked:(tableR['columnNames'].split(',')).indexOf(key)>-1}" :disabled="true">
                                         <el-option
                                            v-for="item in tableHVal.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
	                                <el-date-picker v-else-if="tableHVal.search && tableHVal.search.inputType=='date'"  v-model="tableR[key]" type="date" placeholder="选择日期"
                                        format="yyyy/MM/dd"
                                        value-format="yyyy/MM/dd"
                                        :editable="false"
                                        :clearable="false"
                                        :disabled="true"
                                        :class="{isMarked:(tableR['columnNames'].split(',')).indexOf(key)>-1}">
	                                </el-date-picker>
                                    <el-date-picker v-else-if="tableHVal.search && tableHVal.search.inputType=='year'" v-model="value5" type="year" placeholder="选择年"  :disabled="true"></el-date-picker>
                                    <el-input v-else  v-model="tableR[key]" @keyup.native="keyupInp" @blur="blurInp(tableR,key,$event,tableRInd,'',tableHVal)" @focus="focusInp(tableR,key,$event)"
                                    	:class="{isWarning:tableR[key]=='#N/A',isMarked:(tableR['columnNames'].split(',')).indexOf(key)>-1}"
                                        :disabled="true">
                                    </el-input>
                                </div>
                            </td>
                            
                        </tr>
                        <!---->
                    </tbody>
                </table>
            </div>
        </div>
      <!--已匹配表格 end-->
    </div>
    <!-- <div class="compare-cont table80-wrap" v-show="activeNum=='1'">
       <div class="wrap-table" v-show="false">
          <div class="wrap-table-head" ref="tableHead" @mousemove.prevent='mousemove($event,tableHdId)' :id="tableHdId">
              <table>
                <thead>
                  <tr>
                    <th v-for="(tableH,column) in tableHeader" :key="column">
                      <div class="cell" :style="{'width':Number(tableH.length)*40+'px'}" :class="{searchM:tableH!='序号'}">
                          <span  class="searchMSpan">
                              {{tableH}}
                          </span>
                      </div>
                      <span  class="headRight" @mousedown="mousedown(tableH,column,$event,tableHdId)"></span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="wrap-table-body" :id="tableBdId"  ref="tableScroll" 
            @scroll="scrollFn($event,tableBdId)"  
            @mouseover="mouseScrollFun($event,tableBdId)">
              <div class="noData"  v-if='tableRows.length===0'>暂无数据</div>
               <table class="tableBody" ref="tableBody" :style="{height: contentHeight}">
                 <tbody>
                   <tr></tr>
                 </tbody>
               </table>
            </div>

        </div>
    </div> -->
</div>    
</template>
<script>
import Public from "../../public.js";
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
export default {
    props: ["tableHeader", "tableRows","uploadData","tableHdId","tableBdId","resultData","resDataType","activeNum"],
    data(){
        return{
          pageType:'',
          patchWidth:''
        }
    },
    mounted(){
        var _this = this;
        //this.getSheetData();
        console.log(_this.tableRows);
        
    },
    watch:{
        tableRows:{
             handler: function(newD, oldD) {
               this.patchWidth = $('#rawTableBody').width()-$('#rawTableBody').prop('clientWidth');
            },
            deep: true
        },
        tableHeader:{
            handler: function(newD, oldD) {
              
            },
            deep: true
        },
        activeNum(newD, oldD){
         
        }
       
    },
    computed:{
      contentHeight(){
        return this.resultData.length * 21 + 'px';
      },
      trPatchWidth(){
        var _this = this;
        return this.patchWidth;
      }
    },
    created(){
        var _this = this;
       Public.$on('reckonHg',()=>{
           _this.reckonHg();
       });
    },
    mounted(){
      var _this = this;
    },
    methods:{
        mousemove(event,id){
          this.$emit("tableHdMouseMove",event,id);
        },
        mousedown(row,key,event,id){
          this.$emit("spanMouseDown",row,key,event,id);
        },
        mouseScrollFun(event,id){
            var _this = this;
            if(id=='comTableBody'){
                this.$store.state.tableSheetScrollType = 'left';
            }
            if(id=="rawTableBody"){
                 this.$store.state.tableSheetScrollType = 'right';
            }
           
        },
        scrollFn(event,id){
            var _this = this;
            var scrollLeft = event.target.scrollLeft,
                scrollTop = event.target.scrollTop,
                scrollHeight = event.target.scrollHeight,
                clientHeight = event.target.clientHeight;
           // this.$refs.tableHead.scrollLeft = scrollLeft;
            if(this.$store.state.tableSheetScrollType=='left'&&id!="comTableBody") return
            if(this.$store.state.tableSheetScrollType=='right'&&id!="rawTableBody") return
            if(id=="comTableBody"){
                if(this.$store.state.tableSheetScrollType=="right") return;
                document.getElementById('comTableHead').scrollLeft=scrollLeft;
                document.getElementById('rawTableHead').scrollLeft=scrollLeft;
                document.getElementById('rawTableBody').scrollLeft = scrollLeft;
                document.getElementById('rawTableBody').scrollTop = scrollTop;
                this.$emit('loadMoreDate',scrollTop,scrollHeight,clientHeight);
                //this.loadMoreDate(scrollTop,scrollHeight,clientHeight);
            }else{
                if(this.$store.state.tableSheetScrollType=="left") return;
                document.getElementById('comTableHead').scrollLeft=scrollLeft;
                document.getElementById('rawTableHead').scrollLeft=scrollLeft;
                document.getElementById('comTableBody').scrollLeft = scrollLeft;
                document.getElementById('comTableBody').scrollTop = scrollTop;
                this.$emit('loadMoreDate',scrollTop,scrollHeight,clientHeight);
                
            }
           
        },
        reckonHg(){
            //部分导入对比页面
            var deviation = 0;
            var _this = this;
            if(this.resDataType=="account"){
              deviation= 48;
            }
            var oH = document.getElementById('comparePage').querySelector(".center-body").offsetHeight-116-28-deviation;
            var tableH = document.getElementById('comTableHead').offsetHeight;
            var distance = 0;
            //二级表头
            if(tableH>29){
                distance = distance+(tableH-28);
            }
            $('#comTableBody,#rawTableBody').height(oH-distance);
            $('#unMatchBdId').height(oH+26);
           
           
            //this.$refs.tableScroll.style.height = oH-distance+'px';
            
        },
       
       
    },
     beforeDestroy(){
        Public.$off('reckonHg');
       
        
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.c-black {
  color: #333 !important;
  padding:0 5px;
}
.table80-wrap {
  position: relative;
  height: 100%;
  overflow: hidden;
  .searchCondition {
    margin-right: 90px;
    > li {
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 5px;
      height: 25px;
      line-height: 25px;
      background: #f1f8e8;
      border-radius: 2px;
      border: 1px solid #c8deaf;
      padding: 0 10px;
      > span {
        color: #98c268;
        font-size: 13px;
      }
      > i {
        margin-left: 20px;
        font-size: 13px;
        color: #98c268;
      }
    }
  }
  .search-btn{
    position: absolute;
    top: 0;
    right: 0;
  }
  .left {
    /deep/ .el-input {
      .el-input__inner {
        text-align: left;
      }
    }
  }
  .center {
    /deep/ .el-input {
      .el-input__inner {
        text-align: center;
      }
    }
  }
  .right {
    /deep/ .el-input {
      .el-input__inner {
        text-align: right;
      }
    }
  }
  .wrap-table-head {
  	position: relative;
    overflow: hidden;
  	/*width: 100%;
    position: absolute;
    top: 0;*/
    th {
      position: relative;
      .headRight {
        position: absolute;
        right: -2px;
        top: 0;
        height: 100%;
        width: 3px;
        z-index: 10;
        cursor: col-resize;
      }
      &.full-no-border{border:none}

    }

    .tableHeadFilter {
      display: inline-block;
      position: absolute;
      height: 18px;
      top: 6px;
      right: 6px;
      margin-left: 8px;
      > i {
        display: block;
        cursor: pointer;
      }
      .triangle-up {
        margin-bottom: 3px;
        width: 0;
        height: 0;
        border-bottom: 6px solid #3a80ec;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        opacity: 0.6;
      }
      .triangle-down {
        margin-top: 2px;
        width: 0;
        height: 0;
        border-top: 6px solid #3a80ec;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        opacity: 0.6;
      }
      .triangle-up:hover,
      .triangle-down:hover {
        opacity: 1;
      }
    }
  }
  .wrap-table-body {
    overflow: auto;
    /*position: absolute;
    top: 28px;
    bottom: 38px;
    width: 100%;*/
    .noData {
      width: 100%;
    }
    .noDataCols10{
      height: 140px;
      line-height: 230px;
    }
    table {
      position: relative;
      .operation-icon {
        cursor: pointer;
      }
    }
    .el-table__noData {
      min-height: 60px;
      text-align: center;
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .el-table__noData-text {
        width: 50%;
        color: #909399;
        font-size: 13px;
      }
    }
  }
  .wrap-table {
    position:relative;
    
    border: 1px solid #e5e5e5;
    overflow: hidden;
    border-collapse: collapse;
    tr {
      height: 21px;
      td,
      th {
        border: 1px solid #e5e5e5;
      }
    }
    thead {
      tr {
        background: #f6faff;
        height: 28px;
        th {
           /deep/ .el-checkbox  .el-checkbox__label{font-size:14px!important;}
          .cell {
            position: relative;
            /* height: 40px;
                        display: -webkit-box;
                        -webkit-box-orient: horizontal;
                        -webkit-box-pack: center;
                        -webkit-box-align: center; */
            font-size: 14px;
          }
          .searchM {
            padding: 3px 22px;
            box-sizing: border-box;
            > span {
              width: 100%;
              display: block;
              // line-height: 19px;
            }
            .searchMSpan {
              position: relative;
              display: block;
              border-radius: 2px;
              border: 1px solid #3a80ec;
              color: #3a80ec;
            }
          }
        }
      }
      tr:first-child th {
        border-top: none;
        vertical-align: middle;
      }
      tr th:first-child {
        border-left: none;
      }
      tr th:last-child {
        //border-right: none;
      }
    }
    tbody {
      tr {
        td {
          height:100%;
          .cell {
            font-size: 14px;
            .pr5{
              padding: 0 5px;
            }
            .operation {
              text-align: center;
              > i {
                padding: 0 5px;
              }
            }

            /deep/ .el-input {
              .el-input__inner {
                border-radius: 0;
                border-color: rgba(255, 255, 255, 0);
                height: 20px !important;
                padding: 0 5px !important;
                background: none;
                font-size:14px !important;
              }
              &.is-disabled{
                   .el-input__inner{cursor: default;color: #606266;}
                  &.el-input--suffix{
                    // .el-input__inner{background: none !important;}
                  }
              }
              &.isMarked{
                  .el-input__inner{background:#f09237 !important;}
                   &.el-input--suffix{
                     .el-input__inner{background:#f09237 !important;}
                  }
                }
            }
            /deep/ .el-select{
               &.isMarked .el-input .el-input__inner{background:#f09237 !important;}
            }
             
          }
        }
      }
      tr:first-child td {
        border-top: none;
      }
      tr td:first-child {
        border-left: none;
      }
      tr td:last-child {
        //border-right: none;
      }
      tr.is-selected td {
        background: #fff5eb;
      }
    }
    .tableTotal {
     	/*width: 100%;
    	position: absolute;
    	bottom: 0;*/
      position:relative;
      margin-top: 0;
      border-top: 1px solid #e5e5e5;
      overflow-x: auto;
      background: #fff;
     // min-height: 20px;
      table {
        position: relative;
        tr > td {
          line-height: 20px;
        }
      }
      &.balanceTableFd{min-height: 20px;}
      &.noTopBorder{border-top:none;}

    }
  }
  .contextmenu {
    position: fixed;
    z-index: 1000;
    width: 200px;
    background: #fff;
    border: 1px solid #e5e5e5;
    box-shadow: 0px 2px 7px 0px rgba(203, 202, 202, 0.5);
    border-radius: 3px;
    ul {
      li {
        line-height: 25px;
        padding-left: 20px;
        font-size: 13px;
      }
      li:hover {
        background: #5FA9EC;
        color: #fff;
      }
    }
  }
  .operation {
    width: 110px;
    i {
      padding-right: 10px;
      display: inline-block;
      font-size: 14px;
      width: 18px;
      text-align: center;
      color: #939393;
    }
  }
  .sort-cont, .sign-cont{width:98px;
    ul{position:relative}
    li{cursor:pointer;font-size:12px !important;border-radius: 2px !important;
      &.active,&:hover{background:#3a80ec !important;color:#fff}
    }
  }

  .table-head-tooltip {
    width: 260px;
    height: auto;
    background: #fff;
    box-shadow: 0px 2px 7px 0px rgba(203, 202, 202, 0.5);
    border-radius: 3px;
    padding: 0 12px 12px;
    border: 1px solid #ebeef5;
    position: absolute;
    z-index: 2;
  }
  .collapse {
    visibility: collapse;
  }
}
.tableBody /deep/.el-date-editor.el-input,.tableBody /deep/.el-date-editor.el-input__inner{width: 100%;}
.tableBody /deep/ .el-input__icon{height: 20px !important; line-height: 20px !important; color: #C0C0C0;}
.tableBody tbody{position: absolute;transform: translate3d(0,0,0);}
.wrap-table-head thead tr th div{text-align:center;}
/*资产负债表*/
.isBalanceTable{
  @for $i from 2 through 12 {
     tr:nth-child(#{$i}) td:nth-child(1){text-indent: 10px}
     tr:nth-child(#{$i}) td:nth-child(6){text-indent: 10px}
  }
  @for $i from 15 through 31{
     tr:nth-child(#{$i}) td:nth-child(1){text-indent: 10px}
  }
   @for $i from 16 through 22{
     tr:nth-child(#{$i}) td:nth-child(6){text-indent: 10px}
  }
   @for $i from 26 through 30{
     tr:nth-child(#{$i}) td:nth-child(6){text-indent: 10px}
  }
  tr:nth-child(13) td:nth-child(1), tr:nth-child(14) td:nth-child(6),tr:nth-child(32) td:nth-child(1),
  tr:nth-child(33) td:nth-child(1), tr:nth-child(24) td:nth-child(6)
  {text-indent: 28px;font-weight:bold }
  tr:nth-child(33),tr:nth-child(31) td:nth-child(6){font-weight:bold}
  tr:nth-child(23) td:nth-child(6){text-indent: 24px;font-weight:bold}
}
/*审定数*/
.isAuditedTable{
   tr:nth-child(1) td:nth-child(2),tr:nth-child(13) td:nth-child(2),
   tr:nth-child(31) td:nth-child(2),tr:nth-child(32) td:nth-child(2),
   tr:nth-child(45) td:nth-child(2),tr:nth-child(53) td:nth-child(2),
   tr:nth-child(54) td:nth-child(2){font-weight:bold}
  @for $i from 2 through 12{
     tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
  }
  @for $i from 14 through 30{
     tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
  }
  @for $i from 33 through 44{
     tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
  }
   @for $i from 46 through 52{
     tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
  }
}
.operationHover{
  &:hover{
    opacity: 0.7;
  }
}
.el-icon-close{
  cursor:pointer;
}
.isdisabled {
  pointer-events:none;
  opacity:0.5;
  cursor: default;
}
//.isProfitTable{}

//固定列
.wrap-table-fixed{position:absolute;left:0;top:0;box-shadow: 0 -1px 8px rgba(0,0,0,.08);z-index:1;background:#fff;
  .cell .el-input .el-input__inner{height: 20px !important;padding: 0 5px !important;}
  .wrap-table-body{overflow:hidden;}

}
.table-footer{position:relative;
  .fixed-table-taotal{position:absolute !important;left:0;top:0;box-shadow: 0 -1px 8px rgba(0,0,0,.08);z-index:1;background:#fff;}
}
/deep/ .el-select{width:100%;}
// .fixed-wid-table{width:100px;}
//去除disabled样式
.checkedBG{
  /deep/ .el-input.is-disabled .el-input__inner{
    cursor: pointer;
    color:#262628;
  }
}
.visSate{visibility: hidden;}
/deep/ .el-icon-arrow-up:before{content:'' !important}
</style>
