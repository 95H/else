<template>
  <div>
    <div style="width:100%;overflow:auto;" ref="sumOH">

      <template>
        <table :class="'table '+ classoptions">
          <colgroup>
              <template v-for="item in list">
                <col v-if="(item=='J'||item=='L')&&isWarning" :class="{isWarning:true}">
                <col v-else>
              </template>
          </colgroup>
          <thead>
            <tr>
              <!-- 固定资产汇总特殊处理 -->
              <template v-if="fixedassetsspecial">
                <template v-for="(theadTd,tableKey,theadIndex) in theadData[0]">
                  <template v-if="theadTd == '审计前账面值'||theadTd=='账面价值'||theadTd=='评估价值'||theadTd=='增值额'||theadTd=='增值率%'">
                    <td colspan="2"><div>{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                  </template>
                  <template v-else>
                    <td rowspan="2" v-if="theadTd !='' && /(^[A-Z]{1}$)/.test(tableKey)"><div>{{ theadTd }}
                      <span class="headRight" @mousedown="mousedown($event)"></span></div>
                    </td>
                  </template>
                </template>
              </template>

              <!-- 汇总表 -->
              <template v-else-if="summarytablespecial">
                <template v-for="(theadTd,tableKey,theadIndex) in theadData[0]">
                  <template v-if="theadIndex == 0">
                    <td colspan="2" rowspan="2"><div>{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                  </template>
                  <template v-else>
                    <td v-if="theadTd !='' && /(^[A-Z]{1}$)/.test(tableKey)" ><div>{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                  </template>
                </template>
              </template>
              <!--分类汇总-->
              <template v-else-if="classoptions=='sortsummary'" v-for="(theadTd,tableKey,theadIndex) in theadData[0]">
                  <td v-if="theadTd !='' && /(^[A-Z]{1}$)/.test(tableKey)">
                    <div v-if="(tableKey=='L'||tableKey=='J')&&isWarning" :class="{isWarning:true}">{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div>
                    <div v-else>{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div>
                  </td>
              </template>
              <!-- 普通表格 -->
              <template v-else v-for="(theadTd,tableKey,theadIndex) in theadData[0]">
                <td v-if="theadTd !='' && /(^[A-Z]{1}$)/.test(tableKey)"><div>{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
              </template>
            </tr>

            <template v-if="fixedassetsspecial">
              <tr>
                <td><div>原值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>净值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>原值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>净值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>原值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>净值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>原值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>净值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>原值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>净值<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
              </tr>
            </template>

            <template v-if="summarytablespecial && showdata.length>0">
              <tr>
                <td><div>A<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>B<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>C<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>D=C-B<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
                <td><div>E=D/B×100%<span class="headRight" @mousedown="mousedown($event)"></span></div></td>
              </tr>
            </template>

          </thead>
          <tbody>
            <tr v-for="(tbodyTdData,tbodyTdDataIndex) in showdata">
              <template v-for="(tbodyTd,tbodyTdKey,tbodyTdIndex) in tbodyTdData">
                <template v-if="new RegExp( '^['+ rangenumber +']{1}$').test(tbodyTdKey)">
                  <!--流动汇总-->
                  <template v-if="flowsummaryspecial">
                    <template v-if="tbodyTdIndex==27 && tbodyTdDataIndex==0">
                      <td :class="{isWarning:mergeTable=='#N/A'}" @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">{{ mergeTable }}</td>
                    </template>
                    <template v-else-if="tbodyTdIndex==54 || tbodyTdIndex==55">
                      <td style="display:none;"></td>
                    </template>
                    <template v-else>
                      <td :class="{isWarning:tbodyTd=='#N/A'}" @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">{{((tbodyTd == 0.00 || tbodyTd == -0.00) && tbodyTd !=='')? '--' : tbodyTd }}</td>
                    </template>
                  </template>
                   <!-- 汇总表 -->
                  <template v-else-if="summarytablespecial">
                    <!-- <td v-if="tbodyTdIndex == 0">{{ tbodyTdDataIndex }}</td> -->
                    <td :class="{isWarning:tbodyTd=='#N/A'}" @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">{{((tbodyTd == 0.00 || tbodyTd == -0.00) && tbodyTd !=='')? '--' : tbodyTd }}</td>
                  </template>
                  <!--分类汇总-->
                  <template v-else-if="classoptions=='sortsummary'">
                    <template v-if="tbodyTdDataIndex<=53">
                      <td :class="{isWarning:tbodyTd=='#N/A'}" @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">{{((tbodyTd == 0.00 || tbodyTd == -0.00) && tbodyTd !=='')? '--' : tbodyTd }}</td>
                    </template>

                  </template>

                  <template v-else>
                    <td class="isEditJ" v-if="tbodyTdData.isEditJ && tbodyTdData.isEditJ.indexOf(tbodyTdKey)!=-1"
                    :class="{isMarked:(tbodyTdData['columnNames'].split(',')).indexOf(tbodyTdKey)>-1}"
                     @contextmenu.prevent="sign($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)"
                     @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">
                      <el-input v-model="tbodyTdData[tbodyTdKey]"
                      @focus="focusInp(tbodyTdData[tbodyTdKey],$event)"
                      @blur="blurInp(tbodyTdData,tbodyTdKey,$event,'isEditJ')"
                      :disabled="!$store.state.readonly || (customDisplay && customDisplay.disabled)"></el-input>
                    </td>
                    <td v-else :class="{isWarning:tbodyTd=='#N/A'}" @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">{{((tbodyTd == 0.00 || tbodyTd == -0.00) && tbodyTd !=='')? '--' : tbodyTd }}</td>
                  </template>
                </template>
              </template>
            </tr>

            <!--分类汇总-->
            <tr v-if="classoptions=='sortsummary'">
              <td colspan="12" class="l-space"></td>
            </tr>
            <tr v-if="classoptions=='sortsummary'">
              <td colspan="12" class="sortsummary-title">资产减值准备</td>
            </tr>
          </tbody>
        </table>
        <!--分类汇总下面的表格-->
        <template v-if="classoptions=='sortsummary'">
          <table class="table sortsummary sortsummary-bottom">
            <colgroup>
              <template v-for="item in list">
                <col v-if="(item=='J'||item=='L')&&isWarning" :class="{isWarning:true}">
                <col v-else>
              </template>
            </colgroup>
            <thead>
              <tr>
                <template v-for="(theadTd,tableKey,theadIndex) in theadData[0]">
                  <td v-if="theadTd !='' && /(^[A-Z]{1}$)/.test(tableKey)">
                    <div v-if="(tableKey=='L'||tableKey=='J')&&isWarning" :class="{isWarning:true}">{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div>
                    <div v-else>{{ theadTd }}<span class="headRight" @mousedown="mousedown($event)"></span></div>
                  </td>
                </template>
              </tr>
            </thead>
            <tbody>
               <tr  v-for="(tbodyTdData,tbodyTdDataIndex) in showdata" v-if="tbodyTdDataIndex>53">
                 <template v-for="(tbodyTd,tbodyTdKey) in theadData[theadData.length-1]">
                   <td v-if="tbodyTdData['isEdit']&&(tbodyTdKey=='I'||tbodyTdKey=='K')"
                   class="edit-td"
                   :class="{isMarked:(tbodyTdData['columnNames'].split(',')).indexOf(tbodyTdKey)>-1}"
                   @contextmenu.prevent="sign($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)"
                   @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">
                    <el-input
                    v-model="tbodyTdData[tbodyTdKey]"
                    @focus="focusInp(tbodyTdData[tbodyTdKey],$event)"
                    @blur="blurInp(tbodyTdData,tbodyTdKey,$event)"
                    :class="{isWarning:tbodyTdData[tbodyTdKey]=='#N/A'}"
                    :disabled="!$store.state.readonly || (customDisplay && customDisplay.disabled)"></el-input>
                   </td>
                   <td v-else-if="new RegExp( '^['+ rangenumber +']{1}$').test(tbodyTdKey)" :class="{isWarning:tbodyTdData[tbodyTdKey]=='#N/A', gaugeLeft:tbodyTdData[tbodyTdKey]=='长期应收款'}" @click="setCheckedBG($event,tbodyTdData,tbodyTdKey,tbodyTdDataIndex)">{{tbodyTdData[tbodyTdKey] == 0.00 ? '--' : tbodyTdData[tbodyTdKey]}}</td>
                 </template>
               </tr>
            </tbody>
          </table>
        </template>
      </template>
    </div>
     <!--标记 begin-->
      <div class="contextmenu sign-cont" ref="signCont" :class="{hidden:isShowSignCont}">
        <ul>
          <li @click="markCell($event)" v-if="markCellFlag">标记</li>
          <li @click="markCell($event)" v-else>取消标记</li>
        </ul>
      </div>
      <!--标记 end-->
  </div>
</template>
<script>
  export default {
    props: {
      classoptions: String, //表的名称
      rangenumber: String, //正则范围
      showdata: Array,  //数据
      flowsummaryspecial: Boolean, // 流动汇总
      fixedassetsspecial: Boolean, // 固定资产
      summarytablespecial: Boolean, // 汇总表
      taxonomySumBotmData:Array,//分类汇总第二个表格的表头
      theadData:Array, //所有的表头
      investorId:[String, Number],
      projectId:[String, Number],
      customDisplay : Object
    },
    data(){
      return{
        inputVal:'', //输入框的内容
        isWarning:false, //分类汇总警告
        list:["A","B","C","D","E","F","G","H","I","J","K","L"],
        groupId:'',
        isShowSignCont:true,
        markCellFlag:true,
        markData:{
          key:'',
          tableR:'',
          index:''
        },
        cellBG:{
          event:"",
          rowInd:"",
          cell:""
        }
      }
    },
    mounted(){
      this.reckonHg();
      var _this = this;
      document.body.ondragstart = function() {
              return false ;
        };
      var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(',');
      if(groupIdArr[0]==''&&groupIdArr[1]){
        this.groupId = groupIdArr[1];
      }else{
        this.groupId = groupIdArr[0];
      }
      this.$store.state.sumTableHgFn = this.reckonHg;

      document.addEventListener(
        "click",
        function() {
          _this.isShowSignCont = true;
        },
        false
      );
    },
    computed: {
      mergeTable() {
        return this.showdata[0].B + '、' + this.showdata[0].C + '、' + this.showdata[0].D
      }

    },
    methods:{
      //单元格加选中背景
      setCheckedBG(event,tableR,key,index){
        if(!this.customDisplay || !this.customDisplay.checkedBG) return;
        var id=tableR.id,val=tableR[key];
        if(this.cellBG.rowInd!=index || this.cellBG.cell!=key ){
          if(this.cellBG.event){this.cellBG.event.target.style="";}
          this.cellBG.event=event;
          this.cellBG.rowInd=index;
          this.cellBG.cell=key;
          if(val != ''){
            event.target.style="background:#3A80EC!important;color:#fff;"
          }
          this.$store.state.CheckedTable={
            tableName:this.$store.state.curSheetName,
            id:id,
            val:val,
            key:key
          }
        }else{

        }
      },
      //拖拽
      mousedown(e){
        //console.log(e.target.parentNode);
        var _this=this,thisNode=e.target.parentNode,thisWidth=thisNode.clientWidth,X=e.x;

        document.onmousemove=function (ev) {
          var event=ev||window.event;
          thisNode.style.width=thisWidth+(event.x-X)+ "px"
        }
        document.onmouseup=function(){
          document.onmousemove=null;

        }
        thisNode.onmouseup = function(){
           document.onmousemove=null
        }

      },
      focusInp(data,event){
         event.target.style = "border:1px solid #88C6FF;background:#fff";
        this.inputVal = data;

      },
      blurInp(data,column,event,InputType){
        var _this = this;
        event.target.style = "border:1px solid #fff;";
        if(this.inputVal==data[column]) return;
        var numArr = data[column].split(',');
        var pane='';
        for(var i = 0 ;i<numArr.length;i++){
          pane += numArr[i];
        }
        data[column] = pane;

        if(InputType=="isEditJ"){
           _this.$parent.getUploadStatu(function(){
              _this.$http.post("/api/xls/summary/"+_this.projectId+"/"+_this.investorId+"/"+_this.groupId+"/devalue_update",{
              project_id:_this.projectId,
              investor_id:_this.investorId,
              group_id:_this.groupId,
              sheet_name:_this.$store.state.moduleChildId,
              column_code:column,
              new_value:data[column],
              row_name:data['B']
            }).then(function(res){
              _this.$messageSuccess("操作成功");
              _this.$emit('summaryMethodFun', _this.investorId,_this.$store.state.moduleChildId);
              _this.$parent.sendConnect();
            }).catch(function(error) {
              _this.$messageError(error);
            });
           },'ack')

        }else{
           _this.$parent.getUploadStatu(function(){
              _this.$http.post("/api/xls/summary/"+_this.projectId+"/"+_this.investorId+"/audits_statements_update",{
                investor_id:_this.investorId,
                column:column,
                value:data[column],
                row_name:data['B']
                }).then(function(res){
                  _this.$messageSuccess("操作成功");
                  _this.$emit('summaryMethodFun', _this.investorId,_this.$store.state.moduleChildId);
                  _this.$parent.sendConnect();
                }).catch(function(error) {
                  _this.$messageError(error);
                });
           },'ack')

        }
      },
      //计算表格高度
	    reckonHg(){
        if(this.customDisplay && this.customDisplay.tableHeight){
          var oH = parseInt(this.customDisplay.tableHeight)-55;
        }else{
          var oH = parseInt(this.$store.state.oElemHg)-55;
        }
        this.$refs.sumOH.style.height = oH-50+'px';

      },
      //判断是不是需要加warning
      warnFn(){
        if(this.classoptions!='sortsummary') return;
        for(var i =0;i<this.showdata.length;i++){
          if(this.showdata[i].J!=0||this.showdata[i].L!=0){
              this.isWarning = true;
              break;
          }
        }
      },
      sign(event,tableR,key,index){
        var olem = event.target;
        var disOlem = olem.getAttribute('disabled');
        console.log(tableR);
        if(/examineModification/g.test(this.$route.path)&&tableR.id!=''){
          this.$refs.signCont.style.left = event.x + "px";
          this.$refs.signCont.style.top = event.y + "px";
          this.markData.tableR = tableR;
          this.markData.key = key;
          this.markData.index = index;
          if(!disOlem){
            this.isShowSignCont = false;
            tableR['columnNames'].split(',').indexOf(key)>-1?this.markCellFlag = false:this.markCellFlag = true;
          }else{
            //this.isShowSignCont = false;
            //tableR['columnNames'].split(',').indexOf(key)>-1?this.markCellFlag = false:this.markCellFlag = true;
          }
        }
      },
     markCell(event){
        var oStr = event.target.innerHTML;
        var _this = this;
        var markObj = {
          "取消标记":"0",
          "标记":"1"
        };
        this.$http.post("/api/xls/summary/markCell",{
          projectId:_this.projectId,
          investorId:_this.investorId,
          dataId:_this.markData.tableR.id,
          colName:_this.markData.key,
          status:markObj[oStr]
        }).then(function(res){
          if(oStr=="标记"){
            if(_this.markData.tableR.columnNames!=''){
              _this.markData.tableR.columnNames+=","+_this.markData.key;
            }else{
              _this.markData.tableR.columnNames = _this.markData.key;
            }
          }else{
            var arr =  _this.markData.tableR.columnNames.split(',');
            var idx = arr.indexOf(_this.markData.key);
            arr.splice(idx,1);
            _this.markData.tableR.columnNames =  arr.toString();
          }
          //需要判断是表身数据还是汇总数据
          console.log(_this.showdata);
          _this.$set(_this.showdata[_this.markData.index], "columnNames", _this.markData.tableR.columnNames);


        }).catch(function(err){
          _this.$messageError(err)
        })
     }
    },
    watch:{
      classoptions(newD, oldD){
      if (newD) {
            this.warnFn();
            this.classoptions = newD;
           console.log(newD);
        }
      }
    }
  }
</script>
<style lang='scss' scoped>
  .table { display: inline-table;table-layout:fixed; }
  .isWarning{background: #f03131}
  table, td, th { border: 1px solid #e5e5e5; font-size: 14px;vertical-align: middle; }

  .table thead tr td { text-align: center; height: 21px; line-height: 21px;background: #F6FAFF;}
  .table thead tr td div{position: relative;}
  .headRight {
    position: absolute;
    right: -2px;
    top: 0;
    height: 100%;
    width: 3px;
    z-index: 10;
    cursor: col-resize;
  }

  .table tbody tr td { height: 20px; line-height: 20px; }
  .table tbody tr td.isEditJ{padding-right: 0!important;}
  .table tbody tr td.noTableStyle { color: #fff; border: 0; }
  .table .l-space{height: 30px;border-bottom:1px solid #fff; }
  /* 分类汇总 */
  /* .sortsummary { width: 1900px; } */

  .sortsummary thead tr td:nth-child(1) div { min-width: 55px; }
 div
  .sortsummary thead tr td:nth-child(2) div { min-width: 260px; }
 div
  .sortsummary thead tr td:nth-child(3) div { min-width: 204px; }
 div
  .sortsummary thead tr td:nth-child(4) div { min-width: 220px; }
 div
  .sortsummary thead tr td:nth-child(5) div { min-width: 142px; }
 div
  .sortsummary thead tr td:nth-child(6) div { min-width: 142px; }
 div
  .sortsummary thead tr td:nth-child(7) div { min-width: 142px; }
 div
  .sortsummary thead tr td:nth-child(8) div { min-width: 220px; }
 div
  .sortsummary thead tr td:nth-child(9) div { min-width: 142px; }

  .sortsummary thead tr td:nth-child(10) div { min-width: 142px; }
 div
  .sortsummary thead tr td:nth-child(11) div { min-width: 188px; }
 div
  .sortsummary thead tr td:nth-child(12) div { min-width: 142px; }

  .sortsummary tbody tr td:nth-child(1) { text-align: center; }

  .sortsummary tbody tr td:nth-child(2) { padding-left: 30px }

  .sortsummary tbody tr td:nth-child(3),
  .sortsummary tbody tr td:nth-child(4),
  .sortsummary tbody tr td:nth-child(5),
  .sortsummary tbody tr td:nth-child(6),
  .sortsummary tbody tr td:nth-child(7),
  .sortsummary tbody tr td:nth-child(8),
  .sortsummary tbody tr td:nth-child(9),
  .sortsummary tbody tr td:nth-child(10),
  .sortsummary tbody tr td:nth-child(11),
  .sortsummary tbody tr td:nth-child(12) { text-align: right; padding-right: 10px; }

  .sortsummary tbody tr:nth-child(1) td,
  .sortsummary tbody tr:nth-child(13) td,
  .sortsummary tbody tr:nth-child(31) td,
  .sortsummary tbody tr:nth-child(32) td,
  .sortsummary tbody tr:nth-child(45) td,
  .sortsummary tbody tr:nth-child(53) td,
  .sortsummary tbody tr:nth-child(54) td { font-weight: bold; padding-left: 0; }

  // .sortsummary tbody tr:nth-child(1) td:nth-child(2),
  // .sortsummary tbody tr:nth-child(14) td:nth-child(2),
  // .sortsummary tbody tr:nth-child(33) td:nth-child(2),
  // .sortsummary tbody tr:nth-child(34) td:nth-child(2),
  // .sortsummary tbody tr:nth-child(48) td:nth-child(2),
  // .sortsummary tbody tr:nth-child(57) td:nth-child(2),
  // .sortsummary tbody tr:nth-child(59) td:nth-child(2) { text-indent: 5px; }
  /*分类汇总下面的数据*/
  .sortsummary-bottom tbody tr td:nth-child(2){padding-left:4px}
  .sortsummary-bottom tbody tr:nth-child(1) td,
  .sortsummary-bottom tbody tr:nth-child(13) td,
  .sortsummary-bottom tbody tr:nth-child(14) td{font-weight:normal}
  .sortsummary-bottom tbody tr:nth-child(2) td:nth-child(2){padding-left: 24px}
  .sortsummary-bottom tbody tr:nth-child(3) td:nth-child(2),
  .sortsummary-bottom tbody tr:nth-child(4) td:nth-child(2),
  .sortsummary-bottom tbody tr:nth-child(14) td:nth-child(2){padding-left:30px}
  .sortsummary-bottom tbody tr:nth-child(19) td{text-align: center}
  .sortsummary-bottom tbody td.edit-td{padding-right: 0 !important;}
  .sortsummary-title{padding-left:6px;padding-bottom: 5px;font-weight: bold;text-align: left !important;border-bottom: 1px solid #fff;}
  .gaugeLeft{padding-left:30px !important;}
  /* 流动汇总 */
  /* .flowsummary { width: 1300px; } */
  .flowsummary thead tr td:nth-child(1) div { min-width: 100px; }
  .flowsummary thead tr td:nth-child(2) div,
  .flowsummary thead tr td:nth-child(3) div,
  .flowsummary thead tr td:nth-child(4) div,
  .flowsummary thead tr td:nth-child(5) div,
  .flowsummary thead tr td:nth-child(6) div,
  .flowsummary thead tr td:nth-child(7) div { min-width: 220px; }

  .flowsummary tbody tr td:nth-child(1) { text-align: center; }
  .flowsummary tbody tr td:nth-child(2) { text-indent: 5px; text-align: left; }
  .flowsummary tbody tr td:nth-child(3),
  .flowsummary tbody tr td:nth-child(4),
  .flowsummary tbody tr td:nth-child(5),
  .flowsummary tbody tr td:nth-child(6),
  .flowsummary tbody tr td:nth-child(7),
  .flowsummary tbody tr td:nth-child(8),
  .flowsummary tbody tr td:nth-child(9) { text-align: right; padding-right: 10px; }

  /* 汇总表 */
  /* .summarytable{width:1440px;} */
  .summarytable thead tr:nth-child(1) td:nth-child(1) div {height:42px;line-height: 42px;vertical-align: middle;}

  .summarytable thead tr:nth-child(1) td:nth-child(2) div,
  .summarytable thead tr:nth-child(1) td:nth-child(3) div,
  .summarytable thead tr:nth-child(1) td:nth-child(4) div,
  .summarytable thead tr:nth-child(1) td:nth-child(5) div,
  .summarytable thead tr:nth-child(1) td:nth-child(6) div,
  .summarytable thead tr:nth-child(1) td:nth-child(7) div,
  .summarytable thead tr:nth-child(2) td:nth-child(1) div,
  .summarytable thead tr:nth-child(2) td:nth-child(2) div,
  .summarytable thead tr:nth-child(2) td:nth-child(3) div,
  .summarytable thead tr:nth-child(2) td:nth-child(4) div,
  .summarytable thead tr:nth-child(2) td:nth-child(5) div{height:21px;line-height:21px;vertical-align: middle;display: inline-block;}

  .summarytable thead tr:nth-child(1) td:nth-child(1) div { min-width: 200px; }
  .summarytable thead tr:nth-child(1) td:nth-child(2) div ,
  .summarytable thead tr:nth-child(1) td:nth-child(3) div ,
  .summarytable thead tr:nth-child(1) td:nth-child(4) div ,
  .summarytable thead tr:nth-child(1) td:nth-child(5) div ,
  .summarytable thead tr:nth-child(1) td:nth-child(6) div ,
  .summarytable thead tr:nth-child(1) td:nth-child(7) div {min-width:220px;}

  .summarytable tbody tr td:nth-child(1){text-align: center;}
  .summarytable tbody tr td:nth-child(2){text-indent: 5px; }
  .summarytable tbody tr td:nth-child(3),
  .summarytable tbody tr td:nth-child(4),
  .summarytable tbody tr td:nth-child(5),
  .summarytable tbody tr td:nth-child(6),
  .summarytable tbody tr td:nth-child(7){ text-align: right; padding-right: 10px; }


  .summarytable tbody tr:nth-child(7) td:nth-child(2),
  .summarytable tbody tr:nth-child(8) td:nth-child(2),
  .summarytable tbody tr:nth-child(9) td:nth-child(2),
  .summarytable tbody tr:nth-child(12) td:nth-child(2),
  .summarytable tbody tr:nth-child(13) td:nth-child(2),
  .summarytable tbody tr:nth-child(14) td:nth-child(2),
  .summarytable tbody tr:nth-child(15) td:nth-child(2),
  .summarytable tbody tr:nth-child(16) td:nth-child(2),
  .summarytable tbody tr:nth-child(17) td:nth-child(2),
  .summarytable tbody tr:nth-child(18) td:nth-child(2),
  .summarytable tbody tr:nth-child(19) td:nth-child(2),
  .summarytable tbody tr:nth-child(20) td:nth-child(2),
  .summarytable tbody tr:nth-child(21) td:nth-child(2),
  .summarytable tbody tr:nth-child(22) td:nth-child(2),
  .summarytable tbody tr:nth-child(23) td:nth-child(2){padding-left: 38px;}


  .summarytable tbody tr:nth-child(10) td:nth-child(2),
  .summarytable tbody tr:nth-child(11) td:nth-child(2){padding-left: 77px;}

  .summarytable tbody tr:nth-child(24) td:nth-child(2),
  .summarytable tbody tr:nth-child(27) td:nth-child(2),
  .summarytable tbody tr:nth-child(28) td:nth-child(2){text-align: center;}

  .summarytable tbody tr:nth-child(24) td:nth-child(2),
  .summarytable tbody tr:nth-child(24) td:nth-child(3),
  .summarytable tbody tr:nth-child(24) td:nth-child(4),
  .summarytable tbody tr:nth-child(24) td:nth-child(5),
  .summarytable tbody tr:nth-child(24) td:nth-child(6),
  .summarytable tbody tr:nth-child(24) td:nth-child(7),
  .summarytable tbody tr:nth-child(27) td:nth-child(2),
  .summarytable tbody tr:nth-child(27) td:nth-child(3),
  .summarytable tbody tr:nth-child(27) td:nth-child(4),
  .summarytable tbody tr:nth-child(27) td:nth-child(5),
  .summarytable tbody tr:nth-child(27) td:nth-child(6),
  .summarytable tbody tr:nth-child(27) td:nth-child(7){font-weight: bold;background:#F8F8F8}
  .summarytable tbody tr:nth-child(28) td:nth-child(2),
  .summarytable tbody tr:nth-child(28) td:nth-child(3),
  .summarytable tbody tr:nth-child(28) td:nth-child(4),
  .summarytable tbody tr:nth-child(28) td:nth-child(5),
  .summarytable tbody tr:nth-child(28) td:nth-child(6),
  .summarytable tbody tr:nth-child(28) td:nth-child(7) {font-weight: bold;background: #F6FAFF}

  @for $i from 1 through 5{
    .summarytable thead tr:nth-child(2) td:nth-child(#{$i}) div{min-width: 220px;}
  }

  /* 存货汇总 */
  /* .inventorysummary { width: 1540px; } */
  .inventorysummary thead tr td:nth-child(1) div { min-width: 100px; }
  .inventorysummary thead tr td:nth-child(2) div,
  .inventorysummary thead tr td:nth-child(3) div,
  .inventorysummary thead tr td:nth-child(4) div,
  .inventorysummary thead tr td:nth-child(5) div,
  .inventorysummary thead tr td:nth-child(6) div,
  .inventorysummary thead tr td:nth-child(7) div,
  .inventorysummary thead tr td:nth-child(8) div { min-width: 240px; }
 div
  .inventorysummary tbody tr td:nth-child(1) { text-align: center; }
  .inventorysummary tbody tr td:nth-child(2) { text-indent: 5px; }
  .inventorysummary tbody tr td:nth-child(3),
  .inventorysummary tbody tr td:nth-child(4),
  .inventorysummary tbody tr td:nth-child(5),
  .inventorysummary tbody tr td:nth-child(6),
  .inventorysummary tbody tr td:nth-child(7) { text-align: right; padding-right: 10px; }

  /* 非流动资产汇总 */
  /* .unCurrentAssets { width: 1300px; } */
  .unCurrentAssets thead tr td:nth-child(1) div { min-width: 100px; }
  .unCurrentAssets thead tr td:nth-child(2) div,
  .unCurrentAssets thead tr td:nth-child(3) div,
  .unCurrentAssets thead tr td:nth-child(4) div,
  .unCurrentAssets thead tr td:nth-child(5) div,
  .unCurrentAssets thead tr td:nth-child(6) div,
  .unCurrentAssets thead tr td:nth-child(7) div { min-width: 220px; }

  .unCurrentAssets tbody tr td:nth-child(1) { text-align: center; }
  .unCurrentAssets tbody tr td:nth-child(2) { text-indent: 5px; text-align: left;}
  .unCurrentAssets tbody tr td:nth-child(3),
  .unCurrentAssets tbody tr td:nth-child(4),
  .unCurrentAssets tbody tr td:nth-child(5),
  .unCurrentAssets tbody tr td:nth-child(6),
  .unCurrentAssets tbody tr td:nth-child(7){ text-align: right; padding-right: 10px; }

  /* 可供出售金融资产汇总 */
  /* .financialAssets { width: 1540px; } */
  .financialAssets thead tr td:nth-child(1) div { min-width: 100px; }
  .financialAssets thead tr td:nth-child(2) div,
  .financialAssets thead tr td:nth-child(3) div,
  .financialAssets thead tr td:nth-child(4) div,
  .financialAssets thead tr td:nth-child(5) div,
  .financialAssets thead tr td:nth-child(6) div,
  .financialAssets thead tr td:nth-child(7) div,
  .financialAssets thead tr td:nth-child(8) div { min-width: 220px; }

  .financialAssets tbody tr td:nth-child(1) { text-align: center; }
  .financialAssets tbody tr td:nth-child(2) { text-indent: 5px; text-align: left;}
  .financialAssets tbody tr td:nth-child(3),
  .financialAssets tbody tr td:nth-child(4),
  .financialAssets tbody tr td:nth-child(5),
  .financialAssets tbody tr td:nth-child(6),
  .financialAssets tbody tr td:nth-child(7),
  .financialAssets tbody tr td:nth-child(8) { text-align: right; padding-right: 10px; }

  /* 固定资产汇总 */
  /* .fixedAssets { width: 1540px; } */

  .fixedAssets thead tr:nth-child(1) td:nth-child(1) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(2) div{height:42px;line-height:42px;vertical-align:middle;}
  .fixedAssets thead tr:nth-child(1) td:nth-child(3) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(4) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(5) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(6) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(7) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(1) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(2) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(3) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(4) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(5) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(6) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(7) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(8) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(9) div,
  .fixedAssets thead tr:nth-child(2) td:nth-child(10) div{height:21px;line-height:21px;vertical-align: middle;}

  .fixedAssets thead tr:nth-child(1) td:nth-child(1) div{ min-width: 100px; }
  .fixedAssets thead tr:nth-child(1) td:nth-child(2) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(3) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(4) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(5) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(6) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(7) div,
  .fixedAssets thead tr:nth-child(1) td:nth-child(8) div{ min-width: 220px; }

  .fixedAssets tbody tr td:nth-child(1) { text-align: center; }
  .fixedAssets tbody tr td:nth-child(2) { text-indent: 5px; }
  .fixedAssets tbody tr td:nth-child(3),
  .fixedAssets tbody tr td:nth-child(4),
  .fixedAssets tbody tr td:nth-child(5),
  .fixedAssets tbody tr td:nth-child(6),
  .fixedAssets tbody tr td:nth-child(7),
  .fixedAssets tbody tr td:nth-child(8),
  .fixedAssets tbody tr td:nth-child(9),
  .fixedAssets tbody tr td:nth-child(10),
  .fixedAssets tbody tr td:nth-child(11),
  .fixedAssets tbody tr td:nth-child(12) { min-width: 120px; text-align: right; padding-right: 10px; }

  /* 在建工程汇总 */
// .buildProject{width:100%}
// .buildProject tr td,.buildProject tr td div{min-width: 200px;}
.buildProject  thead tr:nth-child(1) td:nth-child(1) div {height:42px;line-height: 42px;vertical-align: middle;}

.buildProject  thead tr:nth-child(1) td:nth-child(2) div,
.buildProject  thead tr:nth-child(1) td:nth-child(3) div,
.buildProject  thead tr:nth-child(1) td:nth-child(4) div,
.buildProject  thead tr:nth-child(1) td:nth-child(5) div,
.buildProject  thead tr:nth-child(1) td:nth-child(6) div,
.buildProject  thead tr:nth-child(1) td:nth-child(7) div,
.buildProject  thead tr:nth-child(2) td:nth-child(1) div,
.buildProject  thead tr:nth-child(2) td:nth-child(2) div,
.buildProject  thead tr:nth-child(2) td:nth-child(3) div,
.buildProject  thead tr:nth-child(2) td:nth-child(4) div,
.buildProject  thead tr:nth-child(2) td:nth-child(5) div{height:21px;line-height:21px;vertical-align: middle;}

.buildProject  thead tr:nth-child(1) td:nth-child(1) div { min-width: 200px; }
.buildProject  thead tr:nth-child(1) td:nth-child(2) div ,
.buildProject  thead tr:nth-child(1) td:nth-child(3) div ,
.buildProject  thead tr:nth-child(1) td:nth-child(4) div ,
.buildProject  thead tr:nth-child(1) td:nth-child(5) div ,
.buildProject  thead tr:nth-child(1) td:nth-child(6) div ,
.buildProject  thead tr:nth-child(1) td:nth-child(7) div {min-width:220px;}

.buildProject  tbody tr td:nth-child(1)  {text-align: center;}
.buildProject  tbody tr td:nth-child(2)  { text-indent: 5px; text-align: left;}
.buildProject  tbody tr td:nth-child(3),
.buildProject  tbody tr td:nth-child(4),
.buildProject  tbody tr td:nth-child(5),
.buildProject  tbody tr td:nth-child(6),
.buildProject  tbody tr td:nth-child(7)  {text-align: right; padding-right: 10px;}
// .buildProject.table tbody tr td {padding-left:5px; }
  /* 无形资产汇总 */
  /* .intangibleAssets { width: 1200px; } */

  .intangibleAssets thead tr td:nth-child(1) div,
  .intangibleAssets thead tr td:nth-child(2) div,
  .intangibleAssets thead tr td:nth-child(3) div,
  .intangibleAssets thead tr td:nth-child(4) div,
  .intangibleAssets thead tr td:nth-child(5) div,
  .intangibleAssets thead tr td:nth-child(6) div,
  .intangibleAssets thead tr td:nth-child(7) div { min-width: 200px; }

  .intangibleAssets tbody tr td:nth-child(1) { text-align: center; }
  .intangibleAssets tbody tr td:nth-child(2) { text-indent: 5px; text-align: left;}
  .intangibleAssets tbody tr td:nth-child(3),
  .intangibleAssets tbody tr td:nth-child(4),
  .intangibleAssets tbody tr td:nth-child(5),
  .intangibleAssets tbody tr td:nth-child(6),
  .intangibleAssets tbody tr td:nth-child(7) { box-sizing: border-box; text-align: right; padding-right: 10px; }

  /* 流动负债汇总 */
  /* .currentLiabilities { width: 1100px; } */

  .currentLiabilities thead tr td:nth-child(1) div { min-width: 100px; }
  .currentLiabilities thead tr td:nth-child(2) div,
  .currentLiabilities thead tr td:nth-child(3) div,
  .currentLiabilities thead tr td:nth-child(4) div,
  .currentLiabilities thead tr td:nth-child(5) div,
  .currentLiabilities thead tr td:nth-child(6) div,
  .currentLiabilities thead tr td:nth-child(7) div { min-width: 200px; }

  .currentLiabilities tbody tr td:nth-child(1) { text-align: center; }
  .currentLiabilities tbody tr td:nth-child(2) { text-indent: 5px; text-align: left;}
  .currentLiabilities tbody tr td:nth-child(3),
  .currentLiabilities tbody tr td:nth-child(4),
  .currentLiabilities tbody tr td:nth-child(5),
  .currentLiabilities tbody tr td:nth-child(6),
  .currentLiabilities tbody tr td:nth-child(7) { text-align: right; padding-right: 10px; }

  /* 非流动负债汇总 */
  /* .unCurrentLiabilities { width: 1176px; } */

  .unCurrentLiabilities thead tr td:nth-child(1) div { min-width: 100px; }
  .unCurrentLiabilities thead tr td:nth-child(2) div,
  .unCurrentLiabilities thead tr td:nth-child(3) div,
  .unCurrentLiabilities thead tr td:nth-child(4) div,
  .unCurrentLiabilities thead tr td:nth-child(5) div,
  .unCurrentLiabilities thead tr td:nth-child(6) div,
  .unCurrentLiabilities thead tr td:nth-child(7) div { min-width: 200px; }

  .unCurrentLiabilities tbody tr td:nth-child(1) { text-align: center; }
  .unCurrentLiabilities tbody tr td:nth-child(2) { text-indent: 5px; text-align: left;}
  .unCurrentLiabilities tbody tr td:nth-child(3),
  .unCurrentLiabilities tbody tr td:nth-child(4),
  .unCurrentLiabilities tbody tr td:nth-child(5),
  .unCurrentLiabilities tbody tr td:nth-child(6),
  .unCurrentLiabilities tbody tr td:nth-child(7) { text-align: right; padding-right: 10px; }

  /deep/ .table .el-input__inner{border:none;height: 20px !important;line-height: 20px !important;padding-right:10px !important;border-radius: 0;text-align:right;font-size:14px !important;}
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
  .sign-cont{width:98px;
    ul{position:relative}
    li{cursor:pointer;font-size:12px !important;border-radius: 2px !important;
      &.active,&:hover{background:#3a80ec !important;color:#fff}
    }
  }
  .isMarked /deep/ .el-input .el-input__inner{background:yellow !important;}
</style>
