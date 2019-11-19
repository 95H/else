<template>
  <!--
        支持多级表头，取数据时以最后一级为准  比如[{obj1:{}},{obj2:{}}]表内容取obj2
        表头的参数配置
        表头为操作，多选，序号时
                // operation:{label:"操作",minWidth:100},   //操作
                //check:{label:"",minWidth:80},   //全选未完成单选不好使
                // numB:{label:"序号",minWidth:60},    //序号
            id:{isNoEdit:true}  这一列不可以编写 isNoEdit:true
            id:{colspan:2,rowspan:2}   合并表头单元格
            id:{limits:true}       -5到5的输入范围
            id:{width:100,min-width:100}   当前列的宽和最大宽度
            id:{align:"center"}  单列的内容居中，支持left，center，right
            表头的搜索功能  search
            id:{label:"编号",search:{
                    isShow:false,type:"input",label:"编号",placeholder:"请输入编号"
                },isFilter:true},
                isShow  弹框的显示隐藏
                type  搜索框的内容跟    input纯输入框   select下拉选择   checkbox多选
                      作价规则的tab    selectInput输入框   selectSingle单选  range范围
                label  表头文字
                termArr 单选数组
                placeholder    输入提示内容
                inputType 输入框的类型 ：'date'日期
                last:true 最后一列
            searchCallback(){}输入的确定回调
            表头的排序
            id:{label:"编号",isFilter:true},
  -->
  <div class="table80-wrap" :class="{checkedBG:(customDisplay && customDisplay.checkedBG)}">
    <div class="clear" v-show="searchCondition.length>0" ref="searchCondition">
      <ul class="searchCondition fl">
        <!--selectInput-->
        <li
          v-for="(item,index) in searchCondition"
          :key="index"
          v-if="item.filedType=='selectInput'"
        >
          <span class="c-black">{{item.toolTipCurName}}</span>
          <span>{{item.name}}：</span>
          <span>{{item.condition}}</span>
          <i class="el-icon-close" @click="searchDel(item)"></i>
        </li>
        <!--range or tab(为页面收索的时候)-->
        <li
          v-for="(item,index) in searchCondition"
          :key="index"
          v-if="item.filedType=='range'||(item.filedType=='tab'&&item.activeTab=='first'&&item.toolTipCurName!='作价规则')"
        >
          <span class="c-black">{{item.toolTipCurName}}</span>
          <span v-if="item.value1!=''">{{item.name1}}：</span>
          <span v-if="item.value!=''">{{item.value1}}</span>
          <span class="c-black" v-if="item.value2!=''&&item.value1!=''">和</span>
          <span v-if="item.value2!=''">{{item.name2}}：</span>
          <span v-if="item.value2!=''">{{item.value2}}</span>
          <i class="el-icon-close" @click="searchDel(item)"></i>
        </li>
        <!--作价规则-->
        <li
          v-for="(item,index) in searchCondition"
          :key="index"
          v-if="item.filedType=='tab'&&item.activeTab=='first'&&item.toolTipCurName=='作价规则'"
        >
          <span class="c-black">作价规则</span>
          <span>包含:{{item.ruleStr}}</span>
          <i class="el-icon-close" @click="searchDel(item)"></i>
        </li>
        <!--单选-->
        <li
          v-for="(item,index) in searchCondition"
          :key="index"
          v-if="item.filedType=='selectSingle'"
        >
          <span class="c-black">{{item.toolTipCurName}}</span>
          <span>包含:{{item.value}}</span>
          <i class="el-icon-close" @click="searchDel(item)"></i>
        </li>
      </ul>
      <a class="search-btn marginRight0 fr" @click="termSearch()">搜索</a>
    </div>

    <div class="wrap-table" ref="tableWrap">
      <div class="wrap-table-head" ref="tableHead" @mousemove.prevent="mousemove($event)">
        <transition name="fade">
          <div
            class="table-head-tooltip"
            v-if="showTooltip"
            @click.stop="showTooltip=true"
            :style="toolTipStyle"
          >
            <i class="arrow-up" :class="{last:isLastFiled}"></i>
            <search-module
              ref="tabToolTip"
              :search="curSearch"
              @searchCallback="searchCallback"
              :filed="curFiled"
              @hideTooltip="hideToolTip"
            ></search-module>
          </div>
        </transition>
        <table>
          <thead>
            <tr v-for="(tableH,tableHInd) in tableHeader" :key="tableHInd">
              <th
                v-for="(tableHVal,key) in tableH"
                :key="key"
                v-if="!tableHVal.isNoShow&&!tableHVal.isSpecial"
                v-show="!(cols10 && key==='operation')"
                :align="tableHVal.align?tableHVal.align:'center'"
                :rowspan="tableHVal.rowspan?tableHVal.rowspan:1"
                :colspan="tableHVal.colspan?tableHVal.colspan:1"
              >
                <div
                  @contextmenu.prevent="contextmenuShow($event,'del')"
                  v-if="key==='check'"
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >
                  <el-checkbox
                    @change="checkAllFun"
                    v-model="checkAll"
                    :disabled="!$store.state.readonly"
                  >全选</el-checkbox>
                </div>
                <div
                  v-else
                  class="cell"
                  :class="{searchM:tableHVal.search}"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >
                  <span
                    class="searchMSpan"
                    @click.stop="popup(tableHVal,key,$event,tableHVal.label)"
                  >{{tableHVal.label}}</span>
                  <div v-if="tableHVal.isFilter" class="tableHeadFilter">
                    <i
                      class="triangle-up"
                      title="升序"
                      @click.stop="tableSort('asc',tableHVal,key,$event,tableHVal.search)"
                      ref="tableSortAsc"
                    ></i>
                    <i
                      class="triangle-down"
                      title="降序"
                      @click.stop="tableSort('desc',tableHVal,key,$event,tableHVal.search)"
                      ref="tableSortDesc"
                    ></i>
                  </div>
                </div>
                <span
                  v-if="!tableHVal.colspan"
                  class="headRight"
                  @mousedown="mousedown(tableH,key, $event)"
                ></span>
              </th>
              <!--审定数-->
              <th
                v-for="(tableHVal,key) in tableH"
                v-if="tableHVal.isSpecial"
                :align="tableHVal.align?tableHVal.align:'center'"
                :key="key"
              >
                <div
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >{{tableHVal.label}}</div>
                <span
                  v-if="!tableHVal.colspan"
                  class="headRight"
                  @mousedown="mousedown(tableH,key, $event)"
                ></span>
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <div
        class="wrap-table-body clusterize-scroll"
        @mouseover="mouseoverFun('right')"
        @scroll.stop="loadMore($event, 'right')"
        @contextmenu.prevent="contextmenuShow"
        ref="tableScroll"
        id="tableExampleScroll"
      >
        <div class="noData" :class="{noDataCols10:cols10}" v-if="resultData.length===0">暂无数据</div>
        <table
          class="tableBody clusterize-content"
          ref="tableBody"
          v-if="sheetName!='利润表'&&sheetName!='资产负债表'&&sheetName!='审定数'"
          :style="{height: contentHeight}"
        >
          <tbody id="tableExampleContent">
            <tr
              v-for="(tableR,tableRInd) in tableRowData"
              @click="addBg(tableRInd)"
              :key="tableRInd"
            >
              <td
                v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                :key="key"
                v-if="!tableR.trIsHide"
                v-show="!(cols10 && key==='operation')"
                :align="tableHVal.align?tableHVal.align:'center'"
                :class="tableHVal.align?tableHVal.align:'center'"
              >
                <!-- 操作 -->
                <div
                  v-if="key==='operation'"
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >
                  <img
                    class="operation-icon operationHover"
                    src="/static/img/operation.png"
                    alt
                    @click.stop="operationFun($event,tableR,tableHVal)"
                  >
                </div>
                <!-- 多选 -->
                <div
                  v-else-if="key==='check'"
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >
                  <el-checkbox
                    v-model="tableR[key]"
                    @change="checkedFn(tableR[key],tableR)"
                    :disabled="!$store.state.readonly"
                  ></el-checkbox>
                </div>
                <!-- 序号 -->
                <div
                  v-else-if="key==='numB'"
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >{{tableR[key]}}</div>
                <!-- 其他内容 -->
                <div
                  v-else
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                  @contextmenu.stop.prevent="sign($event,tableR,key,tableRInd,'mid')"
                  @click="setCheckedBG($event,tableR,key,tableRInd)"
                  :class="{checkedBlueCell:checkedBgObj.id==tableR.id&&checkedBgObj.key==key&&tableR[key]!=''}"
                >
                  <el-input
                    :class="{isWarning:tableR[key]=='#N/A',isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1)}"
                    v-if="(tableR['disableColumns'].split(';')).indexOf(key)>-1"
                    :disabled="true"
                    v-model="tableR[key]"
                  ></el-input>
                  <el-select
                    v-else-if="tableHVal.selected"
                    v-model="tableR[key]"
                    :disabled="tableR.id==''||!$store.state.readonly  || cols10 || (customDisplay && customDisplay.disabled)"
                    @change="blurInp(tableR,key,$event,tableRInd,'作价规则')"
                    :class="{isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1)}"
                  >
                    <el-option
                      v-for="item in tableHVal.search.rule"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-else-if="tableHVal.isSelect"
                    v-model="tableR[key]"
                    @change="blurInp(tableR,key,$event,tableRInd,'是否进口')"
                    :disabled="!$store.state.readonly || cols10 || (customDisplay && customDisplay.disabled)"
                    :class="{isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1)}"
                    filterable
                    @paste.native.capture.prevent="pasteFromExcel($event,tableR,key,tableRInd,tableHVal,indx)"
                  >
                    <el-option
                      v-for="item in tableHVal.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-date-picker
                    v-else-if="tableHVal.search && tableHVal.search.inputType=='date'"
                    v-model="tableR[key]"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    :editable="$store.state.readonly||!cols10"
                    :clearable="false"
                    :disabled="!$store.state.readonly || cols10 || (customDisplay && customDisplay.disabled)"
                    @input="blurInp(tableR,key,$event,tableRInd,1,tableHVal)"
                    @paste.native.capture.prevent="pasteFromExcel($event,tableR,key,tableRInd,tableHVal,indx)"
                    :class="{isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1)}"
                  ></el-date-picker>
                  <el-date-picker
                    v-else-if="tableHVal.search && tableHVal.search.inputType=='year'"
                    v-model="value5"
                    type="year"
                    placeholder="选择年"
                    :disabled="!$store.state.readonly || cols10 || (customDisplay && customDisplay.disabled)"
                  ></el-date-picker>
                  <el-input
                    v-else
                    v-model="tableR[key]"
                    :title="tableR[key]"
                    @keyup.native="keyupInp"
                    @blur="blurInp(tableR,key,$event,tableRInd,'',tableHVal)"
                    @focus="focusInp(tableR,key,$event)"
                    :class="{isWarning:tableR[key]=='#N/A',isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1)}"
                    :disabled="!$store.state.readonly || cols10 || (customDisplay && customDisplay.disabled)"
                    @paste.native.capture.prevent="pasteFromExcel($event,tableR,key,tableRInd,tableHVal,indx)"
                  ></el-input>
                </div>
              </td>
            </tr>
            <!---->
          </tbody>
        </table>

        <!--审定数,资产负债表,利润表-->
        <table v-else class="tableBody" ref="tableBody" :class="{isFixedWid:sheetName=='资产负债表'}">
          <tbody
            :class="{isBalanceTable:sheetName=='资产负债表',isAuditedTable:sheetName=='审定数',isProfitTable:sheetName=='利润表'}"
          >
            <tr v-for="(tableR,tableRInd) in tableRowData" :key="tableRInd">
              <td
                v-for="(tableHVal,key) in tableHeader[tableHeader.length-1]"
                :align="tableHVal.align?tableHVal.align:'center'"
                :class="tableHVal.align"
                :key="key"
              >
                <div
                  class="cell"
                  :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                >
                  <el-input
                    :class="{isWarning:tableR[key]=='#N/A'}"
                    v-if="tableHVal.isNoEdit"
                    :readonly="true"
                    v-model="tableR[key]"
                  ></el-input>
                  <!-- <el-input :class="{isWarning:tableR[key]=='#N/A'}"
                              v-else-if="((sheetName=='资产负债表'&&tableRInd==31)&&(key=='F'||key=='G'||key=='H'||key=='I'||key=='J'))||(sheetName=='资产负债表'&&tableRInd==33)"
                             :readonly="true" >
                  </el-input>-->
                  <span
                    v-else-if="((sheetName=='资产负债表'&&tableRInd==31)&&(key=='F'||key=='G'||key=='H'||key=='I'||key=='J'))||(sheetName=='资产负债表'&&tableRInd==33)"
                  >{{tableR[key]}}</span>
                  <div
                    class="cell"
                    v-else-if="tableHVal.isSpecial"
                    @contextmenu.stop.prevent="sign($event,tableR,key,tableRInd,'mid')"
                    @click="setCheckedBG($event,tableR,key,tableRInd)"
                    :class="{checkedBlueCell:checkedBgObj.id==tableR.id&&checkedBgObj.key==key&&tableR[key]!=''}"
                  >
                    <el-input
                      v-model="tableR[key]"
                      @keyup.native="keyupInp"
                      @blur="blurInp(tableR,key,$event,tableRInd,'',tableHVal)"
                      @focus="focusInp(tableR,key,$event)"
                      :class="{isWarning:tableR[key]=='#N/A'}"
                      :disabled="!$store.state.readonly|| (customDisplay && customDisplay.disabled)"
                    ></el-input>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--固定列 begin-->
      <div
        class="wrap-table-fixed"
        ref="tableFixed"
        v-show="sheetName!='利润表'&&sheetName!='资产负债表'&&sheetName!='审定数'"
      >
        <div class="wrap-table-head" @mousemove.prevent="mousemove($event)">
          <transition name="fade">
            <div
              class="table-head-tooltip"
              v-if="showTooltipFixed"
              @click.stop="showTooltipFixed=true"
              :style="toolTipStyle"
            >
              <i class="arrow-up" :class="{last:isLastFiled}"></i>
              <search-module
                ref="tabToolTip"
                :search="curSearch"
                @searchCallback="searchCallback"
                :filed="curFiled"
                @hideTooltip="hideToolTip"
              ></search-module>
            </div>
          </transition>
          <table>
            <thead>
              <tr v-for="(tableH,tableHInd) in tableHeader" :key="tableHInd">
                <th
                  v-for="(tableHVal,key) in tableH"
                  :key="key"
                  v-if="!tableHVal.isNoShow&&!tableHVal.isSpecial&&tableHVal.fixed"
                  v-show="!(cols10 && key==='operation')"
                  :align="tableHVal.align?tableHVal.align:'center'"
                  :rowspan="tableHVal.rowspan?tableHVal.rowspan:1"
                  :colspan="tableHVal.colspan?tableHVal.colspan:1"
                >
                  <div
                    @contextmenu.prevent="contextmenuShow($event,'del')"
                    v-if="key==='check'"
                    class="cell"
                    :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                  >
                    <el-checkbox
                      @change="checkAllFun"
                      v-model="checkAll"
                      :disabled="!$store.state.readonly"
                    >全选</el-checkbox>
                  </div>
                  <div
                    v-else
                    class="cell"
                    :class="{searchM:tableHVal.search}"
                    :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                  >
                    <span
                      class="searchMSpan"
                      @click.stop="popup(tableHVal,key,$event,tableHVal.label,'fixed')"
                    >{{tableHVal.label}}</span>
                    <div v-if="tableHVal.isFilter" class="tableHeadFilter">
                      <i
                        class="triangle-up"
                        title="升序"
                        @click.stop="tableSort('asc',tableHVal,key,$event,tableHVal.search)"
                        ref="tableSortAsc"
                      ></i>
                      <i
                        class="triangle-down"
                        title="降序"
                        @click.stop="tableSort('desc',tableHVal,key,$event,tableHVal.search)"
                        ref="tableSortDesc"
                      ></i>
                    </div>
                  </div>
                  <span
                    v-if="!tableHVal.colspan"
                    class="headRight"
                    @mousedown="mousedown(tableH,key, $event)"
                  ></span>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="wrap-scroll">
          <div
            class="wrap-table-body"
            @mouseover="mouseoverFun('left')"
            @scroll="loadMore($event, 'left')"
            @contextmenu.prevent="contextmenuShow"
            ref="tableFixedBody"
            id="tableFixedBody"
          >
            <table class="fixed-wid-table" :style="{height: contentHeight}" id="fixed_wid_table">
              <tbody id="fix_wid_tbody">
                <tr
                  v-for="(tableR,tableRInd) in tableRowData"
                  @click="addBg(tableRInd)"
                  :key="tableRInd"
                >
                  <td
                    v-for="(tableHVal,key,indx) in tableHeader[tableHeader.length-1]"
                    :key="key"
                    v-if="!tableR.trIsHide&&tableHVal.fixed"
                    v-show="!(cols10 && key==='operation')"
                    :align="tableHVal.align?tableHVal.align:'center'"
                    :class="tableHVal.align?tableHVal.align:'center'"
                  >
                    <!-- 操作 -->
                    <div
                      v-if="key==='operation'"
                      class="cell"
                      :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                    >
                      <img
                        class="operation-icon operationHover"
                        src="/static/img/operation.png"
                        alt
                        @click.stop="operationFun($event,tableR,tableHVal)"
                      >
                    </div>
                    <!-- 单选 -->
                    <div
                      v-else-if="key==='check'"
                      class="cell"
                      :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                    >
                      <el-checkbox
                        v-model="tableR[key]"
                        @change="checkedFn(tableR[key],tableR)"
                        :disabled="!$store.state.readonly"
                      ></el-checkbox>
                    </div>
                    <!-- 序号 -->
                    <div
                      v-else-if="key==='numB'"
                      class="cell"
                      :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                    >{{tableR[key]}}</div>
                    <div
                      v-else
                      class="cell"
                      :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                      :class="{checkedBlueCell:checkedBgObj.id==tableR.id&&checkedBgObj.key==key&&tableR[key]!=''}"
                      @contextmenu.stop.prevent="sign($event,tableR,key,tableRInd,'mid')"
                      @click="setCheckedBG($event,tableR,key,tableRInd)"
                    >
                      <el-select
                        v-if="tableHVal.selected"
                        v-model="tableR[key]"
                        :disabled="tableR.id==''||!$store.state.readonly  || cols10 || (customDisplay && customDisplay.disabled)"
                        @change="blurInp(tableR,key,$event,tableRInd,'作价规则')"
                        :class="{isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1)}"
                        :ref="'select'+tableR.numB+key"
                        @focus="selectMenuDown(tableR,key)"
                      >
                        <el-option
                          v-for="item in tableHVal.search.rule"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-input
                        v-else
                        v-model="tableR[key]"
                        @keyup.native="keyupInp"
                        @blur="blurInp(tableR,key,$event,tableRInd,'',tableHVal)"
                        @focus="focusInp(tableR,key,$event)"
                        :class="{isWarning:tableR[key]=='#N/A',isPasted:(tableR.paste&&pasteCloum.indexOf(key)>-1),inputYinYong:tableR.numB===resultData.length && key==='B'}"
                        :disabled="!$store.state.readonly || cols10 || (customDisplay && customDisplay.disabled)"
                        @paste.native.capture.prevent="pasteFromExcel($event,tableR,key,tableRInd,tableHVal,indx)"
                      ></el-input>
                      <i class="iconfont icon-yinyong yingyong" @click="showAssetBased()" v-if="tableR.numB===resultData.length && key==='B' && $store.state.readonly"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--固定列 end-->
      <!--底部合计 begin-->
      <div class="table-footer">
        <div
          ref="tableFoot"
          @scroll="scrollFoot"
          class="tableTotal"
          :class="{balanceTableFd:sheetName=='资产负债表',noTopBorder:sheetName=='利润表'||sheetName=='审定数'}"
        >
          <table>
            <tbody>
              <tr v-for="(tableT,tableTInd) in totalData" :key="tableTInd">
                <td
                  v-for="(tableH,key) in tableHeader[tableHeader.length-1]"
                  v-show="!(cols10 && key==='operation')"
                  :key="key"
                  :align="tableH.align?tableH.align:'center'"
                  :class="tableH.align?tableH.align:'center'"
                >
                  <div
                    class="cell"
                    :style="{'width':tableH.width?tableH.width+'px':'','min-width':tableH.minWidth?tableH.minWidth+'px':''}"
                  >
                    <template v-if="tableH.footLabel">
                      <span
                        v-if="tableH.footLabel[tableTInd+'']=='合计'"
                      >{{tableH.footLabel[tableTInd]}}(共{{totalNum}}条已入库)</span>
                      <span v-else>{{tableH.footLabel[tableTInd]}}</span>
                    </template>
                    <template v-else>
                      <div
                        @contextmenu.prevent="sign($event,tableT,key,tableTInd,'botm')"
                        v-if="!(key=='operation' || key=='check' || key=='numB') && !(tableTInd==0 || tableTInd==totalData.length-1)"
                      >
                        <el-input
                          v-model="tableT[key]"
                          :title="tableT[key]"
                          @keyup.native="keyupInp"
                          @blur="blurInp(tableT,key,$event,tableTInd,'','',true)"
                          @focus="focusInp(tableT,key,$event)"
                          :disabled="!$store.state.readonly"
                          :class="{isWarning:tableT[key]=='#N/A'}"
                        ></el-input>
                      </div>
                      <span v-else class="pr5" :title="tableT[key]">{{tableT[key]}}</span>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--固定的列 begin-->
        <div class="tableTotal fixed-table-taotal">
          <table>
            <tbody>
              <tr v-for="(tableT,tableTInd) in totalData" :key="tableTInd">
                <td
                  v-for="(tableH,key) in tableHeader[tableHeader.length-1]"
                  v-show="!(cols10 && key==='operation')"
                  :key="key"
                  :align="tableH.align?tableH.align:'center'"
                  :class="tableH.align?tableH.align:'center'"
                  v-if="tableH.fixed"
                >
                  <div
                    class="cell"
                    :style="{'width':tableH.width?tableH.width+'px':'','min-width':tableH.minWidth?tableH.minWidth+'px':''}"
                  >
                    <template v-if="tableH.footLabel">
                      <span
                        v-if="tableH.footLabel[tableTInd+'']=='合计'"
                      >{{tableH.footLabel[tableTInd]}}(共{{totalNum}}条已入库)</span>
                      <span v-else>{{tableH.footLabel[tableTInd]}}</span>
                    </template>
                    <template v-else>
                      <div
                        @contextmenu.prevent="sign($event,tableT,key,tableTInd,'botm')"
                        v-if="!(key=='operation' || key=='check' || key=='numB') && !(tableTInd==0 || tableTInd==totalData.length-1)"
                      >
                        <el-input
                          :title="tableT[key]"
                          v-model="tableT[key]"
                          @keyup.native="keyupInp"
                          @blur="blurInp(tableT,key,$event,tableTInd,'','',true)"
                          @focus="focusInp(tableT,key,$event)"
                          :disabled="!$store.state.readonly"
                          :class="{isWarning:tableT[key]=='#N/A'}"
                        ></el-input>
                      </div>
                      <span v-else class="pr5" :title="tableT[key]">{{tableT[key]}}</span>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--固定的列 end-->
      </div>
      <!--底部合计 end-->
    </div>
    <!-- 鼠标右键 -->
    <div class="contextmenu" ref="contextmenu" :class="{hidden:isHideMenu}">
      <ul>
        <li @contextmenu.prevent="delRow" @click="delRow">删除</li>
        <li @contextmenu.prevent="addRow" @click="addRow()" v-if="isCheckAllFlag">插入一行</li>
        <li @contextmenu.prevent="addRow" @click="addRow(true)" v-if="isCheckAllFlag">
          插入多行
          <span class="cellNums" @click.stop="cellNumsFun">
            <el-input-number
              v-model="cellNums"
              controls-position="right"
              size="small"
              :min="1"
              :max="99"
            ></el-input-number>
          </span>行
        </li>
      </ul>
    </div>
    <!-- 操做弹窗 -->
    <div class="contextmenu operation" ref="operation" :class="{hidden:isHideOperation}">
      <ul>
        <li @click="fieldKC" :class='{"isdisabled":this.tableInfo.id == ""}'>
          <i class="iconfont icon-renwu"></i>底稿
        </li>
        <li
          v-if="isShowProspecting"
          @click="selectPeople"
          :class='{"isdisabled":this.tableInfo.id == ""}'
        >
          <i class="iconfont icon-daiban"></i>勘察
        </li>
        <li
          v-if="isShowConfirmationRequests"
          @click="downLoadinquiryLetter"
          :class='{"isdisabled":this.tableInfo.id == ""}'
        >
          <i class="iconfont icon-xunzhenghan"></i>询证函
        </li>
      </ul>
    </div>
    <!--排序的弹窗-->
    <div class="contextmenu sort-cont" ref="sortCont" :class="{hidden:isShowSortCont}">
      <i :class="{arrowLeft:!isLastSort,arrowRight:isLastSort}"></i>
      <ul>
        <li
          v-for="(value, key, index) in curSortArr"
          :key="index"
          @click="sortPop(key)"
          :class="{active:sheetSearchTerm.sortType==key&&sheetSearchTerm.order==arrowSort.order&&currentArrowHight}"
        >{{value}}</li>
      </ul>
    </div>
    <!--标记-->
    <div class="contextmenu sign-cont" ref="signCont" :class="{hidden:isShowSignCont}">
      <ul>
        <li @click="markCell($event)" v-if="markCellFlag">标记</li>
        <li @click="markCell($event)" v-else>取消标记</li>
      </ul>
    </div>
    <kcperson-Dialog ref="kcDialog" :tableInfo="tableInfo" :kctype="kctype"></kcperson-Dialog>
  </div>
</template>
<script>
import searchModule from "@/components/searchModule";
import kcpersonDialog from "@/components/kcpersonDialog";
//绘制
window.requestAnimationFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
export default {
  props: [
    "tableHeader",
    "sheetNameBool",
    "sheetName",
    "nums",
    "curSheetName",
    "cols10",
    "customDisplay"
  ],
  components: {
    searchModule,
    kcpersonDialog
  },
  data() {
    return {
      iTime: "", //滚动执行定时器
      scrollLeft: 0,
      checkAll: false, //全选
      inputCont: "", //获取焦点记录输入框内容
      pageNum: 1, //当前页数
      pages: 0, //总共页数
      isHideMenu: true, //右键弹窗隐藏
      isHideOperation: true, //操作弹窗隐藏
      searchCondition: [], //搜索的集合
      searchTermStr: "", //搜索条件
      totalData: [{}], //合计
      tableRows: [], //表格数据
      rowInd: "",
      scrollBool: false, //滚动加载只执行一次
      changeFlag: true,
      tableLoadObj: {}, //所有表格加载的状态tab切换的时候不需要再次加载数据
      curSearch: "", //传入的列表头的对象
      curFiled: "", //传入列表名
      showTooltip: false, //表头的tooltip
      showTooltipFixed: false,
      toolTipStyle: {}, //tooltip的位置
      isCheckAllFlag: true, //是否没有选全选
      visibelFlag: false,
      isLastFiled: false, //最后一列
      checkedArr: [], //勾选的数据
      markData: {
        key: "",
        tableR: "",
        index: "",
        type: ""
      },
      sheetSearchTerm: {
        conditions: "", //搜索的条件
        sort: "", //排序字段名称,
        order: "", //asc或desc(升序或降序)
        sortType: "" //排序规则
      },
      sendParams: {
        investorId: "",
        projectId: ""
      },
      tabX: 0, //表头拖动
      mousemoveWidth: 0,
      isMousemove: false,
      loadDataFlag: false, //是否进入新增、修改的接口
      groupId: "",
      initDate: {}, //初始化的数据
      direction: "dn", //滚动的方西
      sortFlag: false,
      tablefootLabel: {
        应收账款: 3,
        持有到期投资: 2,
        长期应收: 3,
        股权投资: 2,
        投资性房地产: 2,
        工程物资: 2,
        生产性生物资产: 2,
        油气资产: 2,
        商誉: 2,
        其他应收款: 3,
        预付账款: 3,
        原材料: 2,
        "产成品(库存商品)": 2,
        "在产品(自制半成品)": 2,
        发出商品: 2,
        工程施工: 2
      },
      isShowSortCont: true,
      isShowSignCont: true,
      markCellFlag: true,
      sortList: {
        desc: { "2": "归类降序", "1": "数值降序" },
        asc: { "2": "归类升序", "1": "数值升序" }
      },
      curSortArr: {},
      arrowSort: {
        oElem: "",
        sort: "",
        order: ""
      },
      currentArrowHight: false,
      isLastSort: false,
      isShowProspecting: false, //是否显示勘查
      isShowConfirmationRequests: false, //是否显示询证函
      tableInfo: "", //底稿取表格信息
      kctype: "tablemore", //使用类
      totalNum: 0, //合计的条数
      searchTotalNum: 0, //条件查询的数量
      matchRuleType: {
        //作价规则
        账面比例作价: 2,
        成本法作价: 3,
        收盘价作价: 4,
        二手作价: 5,
        特殊作价: 6,
        股权比例作价: 7
      },
      pasteCloum: [], //粘贴的数组
      entranceSelect: {
        //进出口列
        是: "0",
        否: "1"
      },
      cellBG: {
        event: "",
        rowInd: "",
        cell: "",
        id: ""
      },
      cellNums: 1, //插入行数
      firstShowLoading: true, //第一次加载

      isHaveMoreData: false, //是否可以向下滑动
      pageMax: 0, //页面最大值
      scrollNum: 0, //滚动的距离
      dataSize: 60, //每页取得数据
      addTableObj: {}, //页面新增的数据(单行数据)
      resultData: [], //接口返回的结果组
      mousePosition: "", // 鼠标位置
      checkedBlueCell: {
        //标蓝的对象(关联的时候)
        id: "",
        key: ""
      },
      divScrollTop: 0, //距离滚动到顶部的位置
      resetDataFlag: false, //搜索排序的时候从初始开始加载
      curSelectRef: ""
    };
  },
  computed: {
    //页面上显示的数据
    tableRowData() {
      return this.tableRows;
    },
    //计算表格的高度
    contentHeight() {
      return this.resultData.length * 21 + "px";
    },
    //关联显示蓝色背景
    checkedBgObj() {
      return this.checkedBlueCell;
    },
    //当前页面是否是最大化还是最小化(flase:最小化，true:最大化)
    pageType() {
      return this.$store.state.isfixedFlag;
    }
  },
  mounted() {
    var _this = this;
    this.sendParams.projectId = this.$store.state.projectId;
    this.sendParams.investorId =
      this.$store.state.investorId || this.customDisplay.investorId;
    var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(",");
    this.curSortArr = this.sortList["desc"];
    if (groupIdArr[0] == "" && groupIdArr[1]) {
      this.groupId = groupIdArr[1];
    } else {
      this.groupId = groupIdArr[0];
    }

    if (this.sheetNameBool) {
      this.changeFlag = false;
      this.getSheetData();
      this.reckonHg();
    }
    this.$store.state.tableHgFn = _this.reckonHg;
    document.addEventListener(
      "click",
      function() {
        _this.showTooltip = false;
        _this.showTooltipFixed = false;
        _this.isShowSortCont = true;
        _this.isHideOperation = true;
        _this.isShowSignCont = true;
        //需要将粘贴的数据清空
        _this.pasteCloum = [];
        for (var i = 0; i < _this.resultData.length; i++) {
          _this.$set(_this.resultData[i], "paste", false);
        }
      },
      false
    );
  },
  methods: {
    //关联资产基础法
    showAssetBased(){
      this.$store.commit('changeShowCommon');
      this.$store.state.commonTitle = '数据引用';
      this.$store.state.componentsType = 'dataQuote';
      this.$store.state.cprWidth = '1030px';
      this.$store.state.quoteObj= {
        curQuoteName: "股权投资",
        type:'长投',
        getBaseSheetData:()=>{
          this.termSearch();
        }
      }
    },
    //去除冒泡
    cellNumsFun() {},
    //单元格加选中背景
    setCheckedBG(event, tableR, key, index) {
      if (!this.customDisplay || !this.customDisplay.checkedBG) return;
      var id = tableR.id,
        val = tableR[key];
      if (this.cellBG.id != id || this.cellBG.cell != key) {
        if (this.cellBG.event) {
          this.cellBG.event.target.style = "";
        }
        this.cellBG.event = event;
        this.cellBG.rowInd = index;
        this.cellBG.cell = key;
        this.cellBG.id = id;
        // if(val != ''){
        //   event.target.style="background:#3A80EC!important;color:#fff;"
        // }
        this.$store.state.CheckedTable = {
          tableName: this.$store.state.curSheetName,
          id: id,
          val: val,
          key: key
        };
        this.$set(this.checkedBlueCell, "id", id);
        this.$set(this.checkedBlueCell, "key", key);
      } else {
      }
    },
    selectMenuDown(tableR, key) {
      this.curSelectRef = "select" + tableR.numB + "" + key;
      console.log(key);
      console.log(tableR.numB + "" + key);
    },
    //表头拖动
    mousedown(row, key, event) {
      var _this = this;
      this.isMousemove = true;
      this.tabX = event.x;
      this.mousemoveKey = key;
      if (this.tableHeader.length > 1) {
        this.mousemoveRow = this.tableHeader[this.tableHeader.length - 1];
      } else {
        this.mousemoveRow = row;
      }
      if (!this.mousemoveRow[this.mousemoveKey].width) {
        this.$set(
          this.mousemoveRow[this.mousemoveKey],
          "width",
          this.mousemoveRow[this.mousemoveKey].minWidth
        );
      }
      this.mousemoveWidth = this.mousemoveRow[this.mousemoveKey].width;
      document.onmouseup = function() {
        _this.isMousemove = false;
      };
    },
    mousemove(event) {
      if (!this.isMousemove) {
        return;
      }
      // console.log(this.mousemoveRow[this.mousemoveKey].minWidth)
      // console.log(this.mousemoveRow[this.mousemoveKey].width+(event.x-this.tabX))
      // console.log(this.mousemoveRow[this.mousemoveKey].minWidth<=(this.mousemoveRow[this.mousemoveKey].width+(event.x-this.tabX)))
      if (
        this.mousemoveRow[this.mousemoveKey].minWidth <=
        this.mousemoveRow[this.mousemoveKey].width + (event.x - this.tabX)
      ) {
        if (
          this.tableHeader.length > 1 &&
          this.tableHeader[0][this.mousemoveKey]
        ) {
          this.$set(
            this.tableHeader[0][this.mousemoveKey],
            "width",
            this.mousemoveWidth + (event.x - this.tabX)
          );
          this.$set(
            this.mousemoveRow[this.mousemoveKey],
            "width",
            this.mousemoveWidth + (event.x - this.tabX)
          );
        } else {
          this.$set(
            this.mousemoveRow[this.mousemoveKey],
            "width",
            this.mousemoveWidth + (event.x - this.tabX)
          );
        }
      } else {
        if (
          this.tableHeader.length > 1 &&
          this.tableHeader[0][this.mousemoveKey]
        ) {
          this.$set(
            this.tableHeader[0][this.mousemoveKey],
            "width",
            this.tableHeader[0][this.mousemoveKey].minWidth
          );
          this.$set(
            this.mousemoveRow[this.mousemoveKey],
            "width",
            this.mousemoveRow[this.mousemoveKey].minWidth
          );
        } else {
          this.$set(
            this.mousemoveRow[this.mousemoveKey],
            "width",
            this.mousemoveRow[this.mousemoveKey].minWidth
          );
        }
      }
    },
    /*点击表头的toolTip*/
    popup(data, key, event, name, fixed) {
      var _this = this;
      //当再次点击表头的时候tab要恢复初始的样子
      if (this.$refs.tabToolTip) {
        this.$refs.tabToolTip.cancel();
      }
      //如果没有search的数据的话不需要创建pop
      if (!data.search) return;
      var el = event.currentTarget;
      var left = el.parentNode.parentNode.offsetLeft + 23;
      var top = el.parentNode.parentNode.offsetTop;
      var oH = el.parentNode.parentNode.offsetHeight;
      var lastTop = "";
      if (top == 0) {
        lastTop = el.parentNode.parentNode.offsetHeight + 3;
      }
      if (oH >= 50) {
        lastTop = 44;
      }
      if (top > 0 && top < 30 && oH > 0) {
        lastTop = 59;
      }
      this.isLastFiled = false;
      //如果是最后一列
      if (data.search.last) {
        left = left - 120;
        this.isLastFiled = true;
      }
      //固定列不需要减去滚动的距离
      if (!data.fixed) {
        left = left - Number(this.$refs.tableHead.scrollLeft);
      }
      //
      this.toolTipStyle = {
        left: left + "px",
        top: lastTop + "px"
      };

      //  console.log(data);
      //需要创建tooltip
      this.curSearch = data.search;
      this.curFiled = key;
      if (fixed) {
        this.showTooltipFixed = true;
      } else {
        this.showTooltip = true;
      }
    },
    //文件成功之后
    uploadSuccess(response, file, fileList) {
      this.loading.close();
    },
    uploadError(err, file, fileList) {},
    beforeUpload(file) {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        fullscreen: true,
        background: "rgba(0, 0, 0, 0.6)"
      });
    },
    //右键
    contextmenuShow(e, del) {
      if (this.cols10) {
        return;
      }
      if (this.customDisplay && this.customDisplay.disoperation) {
        return;
      }
      if (!this.$store.state.readonly) return;
      if (
        this.sheetName == "利润表" ||
        this.sheetName == "资产负债表" ||
        this.sheetName == "审定数"
      )
        return;
      var _this = this;
      this.isHideOperation = true;
      this.isHideMenu = false;
      this.cellNums = 1;
      this.$refs.contextmenu.style.left = e.x + "px";
      this.$refs.contextmenu.style.top = e.y + "px";
      if (del) {
        this.isCheckAllFlag = false;
      } else {
        this.isCheckAllFlag = true;
      }
      document.addEventListener("click", handler, false);
      function handler() {
        _this.isHideMenu = true;
        document.removeEventListener("click", handler, false);
      }
    },
    //操作
    operationFun(e, tableR, tableHVal) {
      this.tableInfo = tableR;
      var _this = this;
      tableHVal.prospecting === true
        ? (this.isShowProspecting = true)
        : (this.isShowProspecting = false);
      tableHVal.confirmationRequests === true
        ? (this.isShowConfirmationRequests = true)
        : (this.isShowConfirmationRequests = false);
      this.isHideOperation = false;
      this.$refs.operation.style.left = e.x + 12 + "px";
      this.$refs.operation.style.top = e.y + "px";
      //document.addEventListener("click", operaHandler, false);
      // function operaHandler(event) {
      //   if (event.target != e.target) {
      //     _this.isHideOperation = true;
      //   document.removeEventListener("click", operaHandler, false);
      //   }
      // }
    },
    // 操作--底稿
    fieldKC() {
      //英文大写
      var fieldKCY = this.getKCNameFn(this.tableInfo.sheetName);
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "工作底稿详情";
      this.$store.state.commonBtn = "";
      this.$store.state.componentsType = "spotTaskInfo"; //现场勘查
      this.$store.state.dataObj = {
        listType: "manuscript",
        dataTRInfo: this.tableInfo,
        fieldKCY: fieldKCY
      };
    },
    //操作 -- 判断sheetName对应的英文大写
    getKCNameFn(str) {
      switch (str) {
        case "现金":
          return "CASHCHECK";
          break;
        case "银行存款":
          return "BANKREGULATION";
          break;
        case "应收账款":
        case "预付账款":
        case "其他应收款":
          return "CREDITOR";
          break;
        case "材料采购(在途物资)":
        case "原材料":
        case "在库周转材料":
        case "委托加工物资":
        case "产成品(库存商品)":
        case "在产品(自制半成品)":
        case "发出商品":
        case "在用周转材料":
        case "农产品":
        case "消耗性生物资产":
        case "工程施工":
          return "INVENTORY";
          break;
        case "房屋建筑物":
        case "投资性房地产":
          return "HOUSE";
          break;
        case "构筑物":
        case "管道沟槽":
          return "STRUCTURE";
          break;
        case "土地":
        case "无形-土地":
          return "PARCELSTATUS";
          break;
        case "机器设备":
          return "GENERALEQUIPMENT";
          break;
        case "车辆":
          return "VEHICLE";
          break;
        case "电子设备":
          return "LARGEQUIPMENT";
          break;
      }
    },
    //操作--勘察
    selectPeople() {
      this.$store.state.kcseleName = this.getKCNameFn(this.tableInfo.sheetName);
      this.$refs.kcDialog.openDialog();
    },
    // 操作--询证函
    downLoadinquiryLetter() {
      var _this = this;
      this.$http
        .post("/api/confirmationletter/downConfirmationLetter", {
          xlsId: this.tableInfo.id,
          projectId: this.tableInfo.projectId,
          investorId: this.tableInfo.investorId
        })
        .then(function(data) {
          window.location.href = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    //插入行
    addRow(more) {
      if (
        this.sheetName == "利润表" ||
        this.sheetName == "资产负债表" ||
        this.sheetName == "审定数"
      )
        return;
      var checkArr = this.getChecked(),
        index,
        indexNum,
        _this = this;
      if (more) {
        if (this.resultData.length == 0) {
          for (let i = 0; i < _this.cellNums; i++) {
            var addRowObj = Object.assign({}, _this.initData);
            addRowObj.rowSort = 1;
            addRowObj.numB = i + 1;
            addRowObj.check = false;
            _this.resultData.splice(i, 0, addRowObj);
          }
        } else {
          if (checkArr.length === 0) {
            this.$messageError("请选择一条数据");
            return;
          }
          index = this.resultData.indexOf(checkArr[checkArr.length - 1]);
          indexNum = this.resultData[index].numB + 1;
          for (let i = index + 1; i < _this.cellNums + index + 1; i++) {
            var addRowObj = Object.assign({}, _this.initData);
            addRowObj.rowSort = this.resultData[index].rowSort;
            addRowObj.numB = indexNum++;
            addRowObj.check = false;
            _this.resultData.splice(i, 0, addRowObj);
          }
          for (
            var i = _this.cellNums + index + 1;
            i < this.resultData.length;
            i++
          ) {
            var orderNum = this.resultData[i].numB + _this.cellNums;
            this.$set(this.resultData[i], "numB", orderNum);
          }
        }
        _this.renewVisibleData(_this.divScrollTop);
      } else {
        //当页面没有数据的时候
        var addRowObj = Object.assign({}, this.initData);
        this.checkAll = false;
        if (this.resultData.length == 0) {
          var idx = this.resultData.length;
          addRowObj.rowSort = 1;
          addRowObj.numB = 1; //序号
          addRowObj.check = false;
          this.resultData[idx] = addRowObj;
          this.renewVisibleData(_this.divScrollTop);
          this.$forceUpdate();
          return;
        }

        if (checkArr.length === 0) {
          this.$messageError("请选择一条数据");
          return;
        }
        index = this.resultData.indexOf(checkArr[checkArr.length - 1]);
        // if (checkArr[checkArr.length - 1]["ruleType"]) {
        //   addRowObj.ruleType = "";
        //   addRowObj.disableColumns = "";
        // }
        addRowObj.rowSort = this.resultData[index].rowSort + 1;
        addRowObj.numB = Number(this.resultData[index].numB) + 1;
        addRowObj.check = false;
        this.resultData.splice(index + 1, 0, addRowObj);

        for (var i = index + 2; i < this.resultData.length; i++) {
          var orderNum = this.resultData[i].numB + 1;
          this.$set(this.resultData[i], "numB", orderNum);
        }
        this.renewVisibleData(_this.divScrollTop);
      }
    },
    //删除
    delRow() {
      var _this = this;
      var checkArr = this.getChecked();
      if (checkArr.length === 0) {
        this.$messageError("请选择一条数据");
        return;
      }
      //需要判断是不是全选
      var ids = "";
      if (!this.isCheckAllFlag || this.checkAll) {
        //ALL,sheetName,projectId,investorId
        // ids =
        //   "ALL" +
        //   "," +
        //   this.sheetName +
        //   "," +
        //   this.sendParams.projectId +
        //   "," +
        //   this.sendParams.investorId +
        //   ",";
        ids = "全选";
      } else {
        for (var i = 0; i < checkArr.length; i++) {
          var index = this.resultData.indexOf(checkArr[i]);
          if (checkArr[i].id != "") {
            ids += checkArr[i].id + ",";
          }

          this.resultData.splice(index, 1);
        }
      }

      //需要请求接口
      if (ids != "全选") {
        ids = ids.substring(0, ids.length - 1);
      }
      this.deletData(ids);
      // var orderNum
      for (var i = 0; i < this.resultData.length; i++) {
        this.$set(this.resultData[i], "check", false);
        this.$set(this.resultData[i], "numB", i + 1);
      }
      this.checkAll = false;
      this.$nextTick(() => {
        // if(this.resultData.length===0){
        //   this.addRow();
        // }else
        if (
          this.resultData[this.resultData.length - 1].id &&
          !this.isHaveMoreData
        ) {
          var addRowObj = Object.assign({}, this.initData);
          var idx = this.resultData.length;
          addRowObj.rowSort = this.resultData[idx - 1].rowSort;
          addRowObj.numB = idx + 1; //序号
          this.resultData[idx] = addRowObj;
        }
      });
      this.$forceUpdate();
      this.renewVisibleData(_this.divScrollTop);
    },
    //判断是否有选择checked
    checkFun() {
      if (
        this.lookupKey(this.tableHeader[this.tableHeader.length - 1], "check")
      ) {
        this.setCheck(false);
      }
    },
    setCheck(checkBool) {
      //如果是全选(全选的是当前页的数据)
      if (checkBool) {
        for (var i = 0; i < this.tableRows.length; i++) {
          this.$set(this.tableRows[i], "check", checkBool);
          for (var j = 0; j < this.resultData.length; j++) {
            if (this.tableRows[i].id == this.resultData.id) {
              this.$set(this.resultData[i], "check", checkBool);
            }
          }
        }
      } else {
        for (var i = 0; i < this.resultData.length; i++) {
          this.$set(this.resultData[i], "check", checkBool);
        }
      }
    },
    //获取多选选项
    getChecked() {
      var checkArr = [];
      for (var i = 0; i < this.resultData.length; i++) {
        if (this.resultData[i].check === true) {
          checkArr.push(this.resultData[i]);
        }
      }
      this.checkedArr = checkArr;
      console.log(checkArr);
      return checkArr;
    },
    hideToolTip() {
      this.showTooltip = false;
      this.showTooltipFixed = false;
    },
    //表头搜索
    searchCallback(data) {
      var _this = this;
      var flag = true;
      switch (data.type) {
        case "input":
          break;
        case "select":
          break;
        case "checkbox":
          break;
        case "range":
          if (data.value1 == "" && data.value2 == "") flag = false;
          if (data.keyWorld) flag = true;
          break;
        case "selectInput":
          if (!data.value) flag = false;
          if (data.keyWorld) flag = true;
          break;
        case "tab":
          if (
            data.value1 == "" &&
            data.value2 == "" &&
            data.activeTab == "first" &&
            data.lable != "作价规则"
          )
            flag = false;
          break;
        case "selectSingle":
          if (data.value == "") {
            flag = false;
          }
          if (data.keyWorld || data.keyWorld == 0) flag = true;
          break;
      }
      if (
        data.label == "作价规则" &&
        data.activeTab == "first" &&
        data.ruleArr.length <= 0
      ) {
        this.$messageError("搜索项不能为空!");
        return;
      }
      if (!flag && data.type == "selectSingle") {
        this.$messageError("搜索项不能为空!");
        return;
      }
      if (!flag) {
        this.$messageError("输入项不能为空哦!");
        return;
      }
      //如果是tab2点击的确定
      if (data.type == "tab" && data.activeTab == "second") {
        this.batchProcess(data);
        return;
      }
      if (data.type != "tab" && data.activeTab == "second") {
        this.batchProcess(data);
        return;
      }
      //作价规则的 ruleStr(需求改变，多选改单选，泪~~~~)
      var ruleStr = "";
      if (data.label == "作价规则" && data.activeTab == "first") {
        ruleStr = data.ruleArr;
      }

      //需要筛选条件
      this.searchCondition.push(setData(data));

      function setData(data) {
        for (var i = 0; i < _this.searchCondition.length; i++) {
          if (
            _this.searchCondition[i].filedType == "selectInput" &&
            _this.searchCondition[i].name == data.title &&
            _this.searchCondition[i].filed == data.filed
          ) {
            _this.searchCondition.splice(i, 1);
          }
          if (
            _this.searchCondition[i] &&
            _this.searchCondition[i].filedType == "range" &&
            _this.searchCondition[i].filed == data.filed
          ) {
            if (
              _this.searchCondition[i].vaule1 == data.vaule1 &&
              _this.searchCondition[i].vaule2 == data.vaule2 &&
              _this.searchCondition[i].name1 == data.title1 &&
              _this.searchCondition[i].name2 == data.title2 &&
              _this.searchCondition[i].toolTipCurName != "作价规则"
            ) {
              _this.searchCondition.splice(i, 1);
            }
          }
          /**作价规则 */
          if (
            _this.searchCondition[i] &&
            _this.searchCondition[i].toolTipCurName == "作价规则" &&
            _this.searchCondition[i].ruleStr == ruleStr
          ) {
            _this.searchCondition.splice(i, 1);
          }
          /*单选 */
          if (
            _this.searchCondition[i] &&
            _this.searchCondition[i].filedType == "selectSingle" &&
            _this.searchCondition[i].value == data.value
          ) {
            _this.searchCondition.splice(i, 1);
          }
        }

        if (data.type == "selectInput") {
          return {
            toolTipCurName: data.label,
            name: data.title,
            condition: data.value,
            filed: data.filed, //列名
            sheetName: _this.sheetName,
            filedType: data.type
          };
        }
        if (
          data.type == "range" ||
          (data.type == "tab" &&
            data.activeTab == "first" &&
            data.label != "作价规则")
        ) {
          return {
            toolTipCurName: data.label, //表头的名称
            name1: data.title1, //
            name2: data.title2,
            value1: data.value1,
            value2: data.value2,
            filed: data.filed, //列名
            sheetName: _this.sheetName, //科目名称
            filedType: data.type, //表头类型
            activeTab: data.activeTab || "" //当前的tab
          };
        }
        if (data.label == "作价规则" && data.activeTab == "first") {
          return {
            filedType: data.type, //表头类型
            activeTab: data.activeTab || "", //当前的tab
            toolTipCurName: data.label, //表头的名称
            ruleStr: ruleStr,
            filed: data.filed, //列名
            ruleArr: data.ruleArr //规则
          };
        }
        if (data.type == "selectSingle") {
          return {
            filed: data.filed,
            filedType: data.type,
            value: data.value,
            toolTipCurName: data.label
          };
        }
      }
      this.hideToolTip();
      this.$nextTick(function() {
        _this.reckonHg();
        console.log(_this.$refs.searchCondition.offsetHeight);
      });
      //this.reckonHg();
    },
    //从第一页开始查询
    resetPageData() {
      this.pageNum = 1;
      this.resultData = [];
      this.tableRows = [];
      this.pageMax = 0;
      this.dataSize = 60;
      this.firstShowLoading = true;
      this.resetDataFlag = false;
      this.$refs.tableScroll.scrollTop = 0;
      this.sortFlag = true;
    },
    //搜索条件删除
    searchDel(item) {
      var _this = this;
      this.searchCondition.splice(this.searchCondition.indexOf(item), 1);
      if (this.searchCondition.length == 0) {
        this.sheetSearchTerm.conditions = "";
        this.resetPageData();

        this.getSheetData();
        this.$nextTick(function() {
          _this.reckonHg();
        });
      }
    },
    //全选
    checkAllFun() {
      this.setCheck(this.checkAll);
    },
    //输入框失去焦点
    blurInp(tableR, key, event, idx, type, tableHVal, isTotal) {
      //输入框到达边距的时候错位的问题
      var keyupScrollLeft = this.$refs.tableBody.parentNode.scrollLeft;
      var _this = this;
      if (this.loadDataFlag) return;
      if (keyupScrollLeft !== 0) {
        this.scrollLeft += keyupScrollLeft;
        if (
          this.scrollLeft >
          this.$refs.tableBody.offsetWidth -
            this.$refs.tableBody.parentNode.offsetWidth
        ) {
          this.scrollLeft =
            this.$refs.tableBody.offsetWidth -
            this.$refs.tableBody.parentNode.offsetWidth;
        }
        this.$refs.tableHead.scrollLeft = this.scrollLeft;
        this.$refs.tableBody.style.left = "-" + this.scrollLeft + "px";
        this.$refs.tableFoot.scrollLeft = this.scrollLeft;
        this.$refs.tableBody.parentNode.scrollLeft = 0;
      }
      if (tableHVal) {
        this.limits(tableHVal, tableR, key);
      }
      if (!type) event.target.style = "";
      if (this.inputCont != tableR[key]) {
        //调用接口
        //需要判断是修改还是新增的数据
        if (tableR.id) {
          this.updataTable(tableR.id, key, tableR[key], null, idx, isTotal);
        } else {
          var sort;
          if (_this.tableRows[idx - 1]) {
            sort = _this.tableRows[idx - 1].rowSort;
            if (!sort) sort = 8;
          } else {
            sort = 8;
          }
          this.insertData(key, tableR[key], tableR, sort, idx);
        }
      }
    },
    //输入框获取焦点
    focusInp(tableR, key, event) {
      if (this.loadDataFlag) {
        event.target.blur();
        return;
      }

      event.target.style = "border:1px solid #88C6FF;background:#fff";
      this.inputCont = tableR[key];
    },
    //当还在请求的阶段 tab禁止
    disableTab() {
      var _this = this;
      document.onkeydown = function() {
        if (event.keyCode == 9 && _this.loadDataFlag) {
          return false;
        }
      };
    },
    keyupInp(event) {
      //输入框到达边距的时候错位的问题
      var keyupScrollLeft = this.$refs.tableBody.parentNode.scrollLeft;
      if (keyupScrollLeft !== 0) {
        this.scrollLeft += keyupScrollLeft;
        if (
          this.scrollLeft >
          this.$refs.tableBody.offsetWidth -
            this.$refs.tableBody.parentNode.offsetWidth
        ) {
          this.scrollLeft =
            this.$refs.tableBody.offsetWidth -
            this.$refs.tableBody.parentNode.offsetWidth;
        }
        this.$refs.tableHead.scrollLeft = this.scrollLeft;
        this.$refs.tableBody.style.left = "-" + this.scrollLeft + "px";
        this.$refs.tableFoot.scrollLeft = this.scrollLeft;
        this.$refs.tableBody.parentNode.scrollLeft = 0;
      }
    },
    //-5到5的系数
    limits(tableHVal, tableR, key) {
      if (tableHVal.limits) {
        var value = tableR[key];
        if (!value) return "";
        if (
          typeof (value - 1) !== "number" ||
          !/^-?[1-9]\d*$/.test(parseInt(value))
        ) {
          _this.$messageWarning("请输入整数");
          tableR[key] = this.inputCont;
          return;
        }
        if (value >= -5 && value <= 5) {
          return;
        } else {
          _this.$messageWarning("请输入-5到5的整数");
          tableR[key] = this.inputCont;
          return;
        }
      }
    },
    //添加tr样式
    addBg(index) {
      this.$refs.tableBody.childNodes[0].childNodes[index].className =
        "is-selected";
      if (
        this.rowInd !== "" &&
        this.rowInd != index &&
        this.$refs.tableBody.childNodes[0].childNodes[this.rowInd]
      ) {
        this.$refs.tableBody.childNodes[0].childNodes[this.rowInd].className =
          "";
      }
      this.rowInd = index;
    },

    mouseoverFun(type) {
      this.mousePosition = type;
    },

    loadMore(event, type) {
      if (this.mousePosition !== type) return;

      var _this = this,
        scrollLeft = event.target.scrollLeft,
        scrollTop = event.target.scrollTop,
        scrollHeight = event.target.scrollHeight,
        clientHeight = event.target.clientHeight;
      // if(scrollTop+ clientHeight == scrollHeight){
      //   this.$refs.tableFixedBody.scrollTop = this.$refs.tableScroll.scrollTop;
      //   return
      // }
      $("input").blur();
      var obj = {
        select: this.curSelectRef
      };
      // console.log(this.$refs[obj["select"]]);
      if (this.$refs[obj["select"]] && this.$refs[obj["select"]][0]) {
        this.$refs[obj["select"]][0].blur();
      }

      if (this.mousePosition == "right") {
        this.$refs.tableFixedBody.scrollTop = scrollTop;
      } else {
        this.$refs.tableScroll.scrollTop = scrollTop;
      }
      this.divScrollTop = scrollTop;
      // if(this.resetDataFlag){

      //   this.resetDataFlag = true;
      // }

      _this.renewVisibleData(scrollTop);

      if (this.scrollBool) return;
      if (this.sortFlag) return;
      if (!this.isHideMenu) {
        this.isHideMenu = true;
      } //右键弹窗隐藏
      if (!this.isHideOperation) {
        this.isHideOperation = true;
      }

      //需要判断是否还可以往下滚动
      if (this.isHaveMoreData) {
        this.scrollBool = true;
        this.dataSize = 500;
        this.direction = "dn";
        this.firstShowLoading = false;
        this.getSheetData(function() {
          _this.scrollBool = false;
          _this.pageNum++;
          _this.setCheck(false);
        });
      } else {
        _this.setCheck(false);
        _this.checkAll = false;
      }
    },
    //横向滚动条
    scrollFoot(event) {
      this.scrollLeft = event.target.scrollLeft;
      this.$refs.tableHead.scrollLeft = this.scrollLeft;
      this.$refs.tableBody.style.left = "-" + this.scrollLeft + "px";
      this.isShowSortCont = true;
      this.showTooltip = false;
      this.showTooltipFixed = false;
    },
    //查找对象内是否有某个key
    lookupKey(obj, key) {
      for (let k in obj) {
        if (key === k) {
          return true;
        }
      }
      return false;
    },
    /**转换作价规则 */
    changePriceRule(data) {
      var priceRule = {
        账面比例作价: "2", //作价规则
        成本法作价: "3",
        收盘价作价: "4",
        二手作价: "5",
        特殊作价: "6"
      };
      return priceRule[data];
    },
    /**拼接收索条件 */
    getSearchTerm(data) {
      if (!data) return;
      if (data.filedType == "selectInput") {
        this.sheetSearchTerm.conditions +=
          data.filed + "~" + data.name + "~" + data.condition + "^";
      }
      if (
        data.filedType == "range" ||
        (data.filedType == "tab" &&
          data.toolTipCurName != "作价规则" &&
          data.activeTab == "first")
      ) {
        if (data.value1 != "" && data.value2 != "") {
          this.sheetSearchTerm.conditions +=
            data.filed +
            "~" +
            data.name1 +
            "~" +
            data.value1 +
            "^" +
            data.filed +
            "~" +
            data.name2 +
            "~" +
            data.value2 +
            "^";
        }
        if (data.value1 != "" && data.value2 == "") {
          this.sheetSearchTerm.conditions +=
            data.filed + "~" + data.name1 + "~" + data.value1 + "^";
        }
        if (data.value1 == "" && data.value2 != "") {
          this.sheetSearchTerm.conditions +=
            data.filed + "~" + data.name2 + "~" + data.value2 + "^";
        }
      }
      if (data.toolTipCurName == "作价规则") {
        for (var i = 0; i < data.ruleArr.length; i++) {
          this.sheetSearchTerm.conditions +=
            data.filed +
            "~" +
            "包含" +
            "~" +
            this.changePriceRule(data.ruleArr[i]) +
            "^";
        }
      }
      if (data.toolTipCurName == "是否进口") {
        var param = { 是: "0", 否: "1" };
        this.sheetSearchTerm.conditions +=
          data.filed + "~" + "包含" + "~" + param[data.value] + "^";
      }
    },
    /**更新数据
     * scrollTop:向上滚动的高度
     * itemHeight:tr单个的高度
     * mainId:需要滚动的id
     * viceId:需要同时滚动的id
     * tableRows:截取的data
     * resultData:总共获取的数据
     */
    renewVisibleData(scrollTop) {
      this.itemHeight = 21;
      if (!document.getElementById("tableExampleContent")) {
        this.tableRows = this.resultData;
        return;
      }
      var _this = this;
      var obj = this.$store.state.renewVisibleData(
        scrollTop,
        this.itemHeight,
        "tableExampleScroll"
      );
      // console.log(obj)
      var start = Number(obj.start);
      var end = Number(obj.end);
      this.tableRows = this.resultData.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
      this.$forceUpdate();
      // console.log(start * this.itemHeight); //偏移尺寸
      // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
      // document.getElementById('tableExampleContent').style["webkitTransform"]  = `translate3d(0, ${ start * this.itemHeight }px, 0)`;
      $("#fixed_wid_table tbody,#tableExampleContent").css({
        webkitTransform: "translate3d(0," + start * this.itemHeight + "px, 0)",
        mozTransform: "translate3d(0," + start * this.itemHeight + "px, 0)",
        transform: "translate3d(0," + start * this.itemHeight + "px, 0)"
      });
    },
    /**
     * 获取列表数据
     * @param callback回调函数
     * @param type 条件查询
     * @param reload 修改后刷新
     * @param operation  往数据池添加数据
     */
    getSheetData(callback, type, reload, top) {
      var _this = this;
      //条件查询
      if (type) {
        this.sheetSearchTerm.conditions = "";
        for (var i = 0; i < this.searchCondition.length; i++) {
          this.getSearchTerm(_this.searchCondition[i]);
        }
        this.sheetSearchTerm.conditions = this.sheetSearchTerm.conditions.substring(
          0,
          this.sheetSearchTerm.conditions.length - 1
        );
        console.log(this.sheetSearchTerm.conditions);
      }
      this.$http
        .post("/api/incomexls/getLongThrowPage", {
          type: this.direction, //up or dn
          current: this.pageMax,
          dataSize: this.dataSize,
          sheetName: _this.sheetName,
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          templateId: this.$store.state.incomeInitId,
          conditions: _this.sheetSearchTerm.conditions || "",
          sort: _this.sheetSearchTerm.rowSort || "", //排序字段名称,
          order: _this.sheetSearchTerm.order || "", //asc或desc(升序或降序)
          sortType: _this.sheetSearchTerm.sortType || "",
          showLoading: _this.firstShowLoading
        })
        .then(function(data) {
          var pageData = data.data;
          // pageData.pages = 6;
          _this.isHaveMoreData = pageData.moreData; //是否有向下滚的数据
          _this.pageMax += pageData.dataList.length;
          if (_this.sheetSearchTerm.conditions == "") {
            _this.totalNum = pageData.dataCount;
            _this.searchTotalNum = 0;
          } else {
            //保存条件查询结果的数量
            _this.searchTotalNum = pageData.dataCount;
            console.log(_this.searchTotalNum);
          }

          _this.sortFlag = false;

          var tableHeader = _this.tableHeader[_this.tableHeader.length - 1];
          for (var i = 0; i < pageData.dataList.length; i++) {
            for (var item in tableHeader) {
              if (
                tableHeader[item].search &&
                tableHeader[item].search.inputType &&
                tableHeader[item].search.inputType == "date" &&
                !/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(
                  pageData.dataList[i][item]
                )
              ) {
                pageData.dataList[i][item] = "";
              }
              //判断时候是千分列，需要转换数据
              if (tableHeader[item].isThousands || tableHeader[item].isThousandsTwo) {
                if (
                  !(
                    pageData.dataList[i][item] === "" ||
                    pageData.dataList[i][item] === "0"
                  )
                ) {
                  if(tableHeader[item].isThousandsTwo){
                    pageData.dataList[i][item] = _this.$store.state.commafyNumber(pageData.dataList[i][item]);
                  }else{
                    pageData.dataList[i][item] = _this.$store.state.commafyNumber(
                      pageData.dataList[i][item],4
                    );
                  }
                }
              }
            }
          }
          if (_this.firstShowLoading) {
            //增加序号(首次进入序号需要从1开始)
            for (var i = 0; i < pageData.dataList.length; i++) {
              pageData.dataList[i].numB = i + 1;
            }
            if (pageData.totalRow != "") {
              pageData.totalRow = _this.changeToThousand(pageData.totalRow);
            } else if (_this.sheetName === "资产负债表") {
              let totalRowArr = [];
              totalRowArr.push(pageData.initData);
              pageData.totalRow = totalRowArr;
            }
            pageData.initData.check = false;
            //第一次请求的时候才会返回
            _this.initData = pageData.initData;
            _this.addTableObj = Object.assign({}, _this.initData);
            //第一次请求的时候才会返回
            _this.totalData = pageData.totalRow;
            _this.resultData = pageData.dataList;
          } else {
            switch (_this.direction) {
              case "dn":
                var lastOrderNum =
                  _this.resultData[_this.resultData.length - 1].numB;
                for (var i = 0; i < pageData.dataList.length; i++) {
                  var order = (lastOrderNum += 1);
                  pageData.dataList[i].numB = order;
                }
                _this.resultData = _this.resultData.concat(pageData.dataList);
                //进行绘制的时候会有延时
                // requestAnimationFrame(function(){

                // });
                break;
            }

            //_this.checkAll = false;
          }
          if (
            _this.sheetName != "审定数" &&
            _this.sheetName != "资产负债表" &&
            _this.sheetName != "利润表"
          ) {
            _this.setCheck(false);
            _this.checkAll = false;
          }
          // _this.setCheck(false);
          // _this.checkAll = false;

          if (!_this.cols10) {
            // _this.$parent.updateSheetState(_this.sheetName,_this.totalNum);
          }
          //需要添加sort
          if (
            _this.sheetName != "审定数" &&
            _this.sheetName != "资产负债表" &&
            _this.sheetName != "利润表"
          ) {
            if (
              !_this.isHaveMoreData &&
              !_this.cols10 &&
              _this.resultData.length >= 1
            ) {
              _this.addTableObj.numB =
                _this.resultData[_this.resultData.length - 1].numB + 1;
              _this.addTableObj.rowSort = 1;
              _this.resultData.push(_this.addTableObj);
              _this.checkAll = false;
            }
            //没有数据的时候添加一条默认的数据
            if (_this.resultData.length == 0 && !_this.cols10) {
              _this.addTableObj.rowSort = 1;
              _this.addTableObj.numB = 1;
              _this.resultData.push(_this.addTableObj);
            }
          }

          // if(_this.tableRows.length==pageData.total){
          //   if(_this.tableRows.length==0){
          //     addRowObj.rowSort =1;
          //     addRowObj.numB =1;
          //     _this.tableRows.push( addRowObj);
          //   }else{
          //      addRowObj.numB = _this.tableRows[_this.tableRows.length-1].numB+1;
          //      _this.tableRows.push( addRowObj);
          //      _this.checkAll = false;
          //   }

          // }
          if (_this.totalData.length === 0) {
            _this.totalData = [{}];
            _this.$refs.tableFoot.childNodes[0].style.width =
              _this.$refs.tableHead.childNodes[0].offsetWidth + "px";
          }
          _this.resultData.length == 0
            ? (_this.visibelFlag = true)
            : (_this.visibelFlag = false);
          //如果是修改需要刷新的 需要将勾选的去掉
          if (reload) {
            _this.setCheck(false);
            _this.checkAll = false;
          }
          if (_this.firstShowLoading) {
            _this.renewVisibleData();
            _this.setCheck(false);
            _this.checkAll = false;
          }
          callback && callback();
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    //删除数据
    deletData(id) {
      var _this = this;
      var str = "";
      var totArr = [];
      var reloadDataflag = false;
      if (id == "") return;
      if (id != "全选") {
        var arr = id.split(",");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] != "") {
            break;
          }
        }
      }
      _this.$http
        .post("/api/incomexls/delXlsUpdateDataById", {
          ids: id == "全选" ? "all" : id,
          userId: JSON.parse(_this.$getCookie("user")).id,
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          templateId: _this.$store.state.incomeInitId,
          conditions: _this.sheetSearchTerm.conditions,
          sheetName: _this.sheetName,
          groupId: _this.groupId
        })
        .then(function(data) {
          // _this.$messageSuccess("操作成功")
          //如果是全选 需要清除数据
          if (id == "全选") {
            _this.tableRows = [];
            _this.resultData = [];
            console.log(_this.resultData.length);
            if (_this.sheetSearchTerm.conditions == "") {
              _this.totalNum = 0;
            }
            if (
              _this.sheetSearchTerm.conditions != "" &&
              _this.searchTotalNum != 0
            ) {
              _this.totalNum =
                Number(_this.totalNum) - Number(_this.searchTotalNum);
            }
            _this.pageMax = 0;
            _this.firstShowLoading = true;
            _this.isHaveMoreData = true;
          } else {
            var len = id.split(",").length;
            reloadDataflag = true;
            _this.totalNum = Number(_this.totalNum) - Number(len);
            _this.pageMax = _this.pageMax - Number(len);
            if (_this.resultData.length <= 20 && _this.isHaveMoreData) {
              _this.firstShowLoading = false;
              _this.getSheetData(
                function() {
                  _this.renewVisibleData(_this.divScrollTop);
                },
                null,
                "reload"
              );
            }
            console.log(len);
          }
          if (!reloadDataflag) {
            _this.renewVisibleData(_this.divScrollTop);
          }
          //需要去更改状态
          // _this.$parent.updateSheetState(_this.sheetName,_this.totalNum);
          // _this.$parent.sendConnect();
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    /*
     *修改数据
     *@params id:一列id
     *  property:列名
     *  value:修改的值
     *  type:批量修改
     */
    updataTable(id, property, value, type, idx, isTotal, ratioPrice, data) {
      var _this = this;
      var params = {};
      //if((value+'').replace(/\s+/g, "")=='') return;
      var tableHeader = this.tableHeader[this.tableHeader.length - 1];

      //批量修改

      if (tableHeader[property].isThousands || tableHeader[property].isThousandsTwo) {
        value = _this.changeToNum(value, property);
      }
      //作价规则
      if (property == "ruleType") {
        params = {
          ids: id,
          groupId: this.groupId,
          ruleType: value,
          userId: JSON.parse(_this.$getCookie("user")).id,
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          sheetName: _this.sheetName
        };
        //如果作价规则系数调整中填写的有数据
        if (ratioPrice && value == 2) {
          params.property = "XS";
          params.value = ratioPrice;
        }
      } else {
        // params = {
        //   ids: id,
        //   property: property, //属性名称
        //   value: value,
        //   userId:JSON.parse(_this.$getCookie("user")).id,
        //   conditions: "",
        //   projectId: _this.sendParams.projectId,
        //   investorId: _this.sendParams.investorId,
        //   sheetName: _this.sheetName,

        // };
        params = {
          id: id,
          values: value,
          ordinate: property,
          // userId:JSON.parse(_this.$getCookie("user")).id,
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          templateId: _this.$store.state.incomeInitId,
          sheetName: _this.sheetName,
          sort: isTotal?_this.totalData[idx].rowSort:_this.tableRowData[idx].rowSort
        };
      }
      //如果是特殊字段的修改（费率等）
      if (data && data.specialInitData) {
        params = {
          ids: id,
          userId: JSON.parse(_this.$getCookie("user")).id,
          conditions: "",
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          sheetName: _this.sheetName,
          specialInitData: data.specialInitData + "=" + value
        };
      }
      //批量按搜索条件修改
      if (type) {
        params.conditions = this.sheetSearchTerm.conditions;
      }

      this.disableTab();
      if (this.loadDataFlag) return;
      this.loadDataFlag = true;
      if (id != "") {
        _this.$store.state.isSavingFlag = true; // 用于控制正在保存字样的出现
        params.showLoading = false;
      } else {
        params.showLoading = true;
      }
      // if(type&&id==''){this.$parent.getLoadingText('批量修改中');}
      _this.$http
        .post("/api/incomexls/instrOrUpdateRowData", params)
        .then(function(data) {
          _this.loadDataFlag = false;
          // _this.$messageSuccess("操作成功")
          if (
            data.msg != "异步计算中" &&
            _this.sheetName != "资产负债表" &&
            _this.sheetName != "利润表" &&
            _this.sheetName != "审定数"
          ) {
            // _this.$parent.sendConnect();
            // _this.getTotalNum();
          }
          if (isTotal) {
            _this.getTotalNum();
          } else {
            if (
              _this.sheetName == "资产负债表" ||
              _this.sheetName == "利润表" ||
              _this.sheetName == "审定数"
            ) {
              //需要判断当前列是不是千分位
              if (_this.sheetName == "资产负债表" && idx == "32") {
                _this.tableRows.splice(33, 1, data.data[0]);
              }
              _this.changeToThousand("", property, value, idx);
              // _this.$parent.sendConnect();
              return;
            }
            //如果是批量修改需要重新刷新数据
            if (type) {
              if (params.ids == "" && data.msg == "异步计算中") {
                _this.$parent.getLoadingText("批量修改中");
                var timer = setInterval(function() {
                  _this.$parent.getUploadStatu(function() {
                    clearInterval(timer);
                    // _this.pageNum = 1;
                    _this.pageMax = 0;
                    _this.firstShowLoading = true;
                    _this.$refs.tableScroll.scrollTop = 0;
                    //需要增加异步加载
                    _this.getSheetData(null, null, "reload");
                    _this.getTotalNum();
                    _this.$parent.sendConnect();
                  }, "ack");
                }, 3000);
                // _this.pageNum = 1;
                // _this.$refs.tableScroll.scrollTop = 0;
                // //需要增加异步加载
                // _this.getSheetData(null,null,'reload');
              } else {
                //勾选的数据
                for (var i = 0; i < _this.tableRows.length; i++) {
                  for (var j = 0; j < data.data.length; j++) {
                    if (_this.tableRows[i].id == data.data[j].id) {
                      data.data[j].check = true;
                      data.data[j].numB = _this.tableRows[i].numB;
                      data.data[j] = _this.changeToThousand(data.data[j]);
                      _this.tableRows.splice(i, 1, data.data[j]);
                      _this.resultData.splice(data.data[j].numB-1,1,data.data[j]);
                    }
                  }
                }
              }
            } else {
              //如果是单个修改的
              data.data.check = _this.tableRows[idx].check;
              data.data.numB = _this.tableRows[idx].numB;
              data.data = _this.changeToThousand(data.data);
              _this.tableRows.splice(idx, 1, data.data);
              _this.resultData.splice(data.data.numB-1,1,data.data);
            }
            _this.getTotalNum();
          }
          _this.$store.state.isSavingFlag = false;
        })
        .catch(function(error) {
          _this.loadDataFlag = false;
          _this.$store.state.isSavingFlag = false;
          _this.$messageError(error);
        });
    },
    /*新增数据*/
    insertData(key, value, tableR, sort, idx) {
      var _this = this;
      var obj = {};
      obj[key] = value;
      var addRowObj = Object.assign({}, _this.initData);
      if (value.replace(/\s+/g, "") == "") return;
      this.disableTab();
      if (this.loadDataFlag) return;
      this.loadDataFlag = true;
      _this.$store.state.isSavingFlag = true; // 用于控制正在保存字样的出现
      value = _this.changeToNum(value, key);
      _this.$http
        .post("/api/incomexls/instrOrUpdateRowData", {
          // property: key,
          // value: value,
          // sheetName: _this.sheetName,
          // projectId: _this.sendParams.projectId,
          // investorId: _this.sendParams.investorId,
          // sort: sort,
          // userId: JSON.parse(_this.$getCookie("user")).id ,
          // groupId: _this.groupId,
          // showLoading: false,
          id: tableR.id,
          values: value,
          ordinate: key,
          sort:
            this.tableRows[idx].numB === 1
              ? 0
              : this.tableRows[idx - 1].rowSort+1,
          // userId:JSON.parse(_this.$getCookie("user")).id,
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          templateId: this.$store.state.incomeInitId,
          sheetName: _this.sheetName
        })
        .then(function(data) {
          //console.log(idx);
          // _this.tableRows[idx] = data.data;
          // _this.$set(_this.tableRows[idx],data.data);
          data.data.check = _this.tableRows[idx].check;
          data.data.numB = _this.tableRows[idx].numB;
          data.data = _this.changeToThousand(data.data);
          // _this.tableRows.splice(idx,1,data.data);
          _this.resultData.splice(_this.tableRows[idx].numB - 1, 1, data.data);
          _this.loadDataFlag = false;
          // _this.$messageSuccess("操作成功");

          if (idx == _this.tableRows.length - 1 && !_this.isHaveMoreData) {
            addRowObj.rowSort = Number(sort) + 1;
            addRowObj.numB =
              _this.tableRows[_this.tableRows.length - 1].numB + 1;
            _this.resultData.push(addRowObj);
            _this.checkAll = false;
          }
          _this.totalNum++;
          _this.renewVisibleData(_this.divScrollTop);
          //  _this.$parent.updateSheetState(_this.sheetName,_this.totalNum);
          _this.getTotalNum();
          // _this.setCheck(false);
          //  _this.$parent.sendConnect();
          _this.$store.state.isSavingFlag = false;
        })
        .catch(function(error) {
          _this.loadDataFlag = false;
          _this.$store.state.isSavingFlag = false;
          _this.$messageError(error);
        });
    },
    /*获取的合计*/
    getTotalNum() {
      var _this = this;
      this.$http
        .post("/api/incomexls/getLongThrowTotalLine", {
          sheetName: _this.sheetName,
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          templateId: this.$store.state.incomeInitId,
          showLoading: false
        })
        .then(function(data) {
          if (data.data != "") {
            data.data = _this.changeToThousand(data.data);
          }
          _this.totalData = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    /*tab2执行的事件*/
    batchProcess(data) {
      var ids = "";
      switch (data.range) {
        case "全部数据":
          // ids =
          //   "ALL" +
          //   "," +
          //   this.sheetName +
          //   "," +
          //   this.sendParams.projectId +
          //   "," +
          //   this.sendParams.investorId +
          //   ",";

          break;
        case "条件查询数据":
          // ids =
          //   "CONDITION," +
          //   this.sheetName +
          //   "," +
          //   this.sendParams.projectId +
          //   "," +
          //   this.sendParams.investorId +
          //   ",";
          break;
        case "当前勾选数据":
          for (var i = 0; i < this.checkedArr.length; i++) {
            var index = this.tableRows.indexOf(this.checkedArr[i]);
            ids += this.checkedArr[i].id + ",";
          }
          ids = ids.substring(0, ids.length - 1);
          break;
      }

      this.updataTable(
        ids,
        data.filed,
        data.keyWorld,
        "batch",
        null,
        null,
        data.ratioPrice,
        data
      );
      // for (var i = 0; i < this.tableRows.length; i++) {
      //   this.$set(this.tableRows[i], "check", false);
      // }
    },
    /*排序 */
    tableSort(type, tableHVal, key, event, location) {
      //console.log(this.$refs.tableSortAsc);
      this.isShowSortCont = false;
      //如果是最后一列
      console.log(event);
      if (location.last) {
        this.cols10
          ? (this.$refs.sortCont.style.left = event.x - 170 + "px")
          : (this.$refs.sortCont.style.left = event.x - 110 + "px");
        this.isLastSort = true;
      } else {
        this.cols10
          ? (this.$refs.sortCont.style.left = event.x - 60 + "px")
          : (this.$refs.sortCont.style.left = event.x + 12 + "px");
        this.isLastSort = false;
      }
      this.$refs.sortCont.style.top = event.y - 8 + "px";
      this.curSortArr = this.sortList[type + ""];
      // this.sortFlag = true;//不需要滚动加载
      this.arrowSort.oElem = event.target;
      //当前选中的排序
      if (event.target.style.opacity == 1) {
        this.currentArrowHight = true;
      } else {
        this.currentArrowHight = false;
      }
      //event.target.style.opacity = 1;
      //this.sheetSearchTerm.rowSort = key; //排序字段名称,
      //this.sheetSearchTerm.order = type; //asc或desc(升序或降序)
      this.arrowSort.rowSort = key;
      this.arrowSort.order = type;
    },
    sortPop(val) {
      this.sheetSearchTerm.sortType = val;
      this.sortFlag = true; //不需要滚动加载
      for (var i = 0; i < this.$refs.tableSortAsc.length; i++) {
        this.$refs.tableSortAsc[i].style.opacity = 0.6;
        this.$refs.tableSortDesc[i].style.opacity = 0.6;
      }
      this.arrowSort.oElem.style.opacity = 1;
      this.sheetSearchTerm.rowSort = this.arrowSort.rowSort; //排序字段名称,
      this.sheetSearchTerm.order = this.arrowSort.order; //asc或desc(升序或降序)
      this.resetPageData();
      this.getSheetData(null, null, "reload");
    },
    //选中
    checkedFn(flag, tableR) {
      if (!flag) {
        this.checkAll = false;
        //需要将勾选的数据去掉
        this.$set(this.resultData[tableR.numB - 1], "check", false);
      } else {
        this.$set(this.resultData[tableR.numB - 1], "check", true);
      }
    },
    /**搜索 */
    termSearch() {
      this.resetPageData();
      this.getSheetData("", "search");
    },
    //计算表格高度
    reckonHg() {
      if (this.sheetName.indexOf("汇总") != -1) return;
      if (this.cols10) {
        this.$refs.tableScroll.style.height = 160 + "px";
        this.$refs.tableFixedBody.style.maxHeight = 160 + "px";
        return;
      }
      var _this = this;
      if (this.customDisplay && this.customDisplay.tableHeight) {
        var oH = parseInt(this.customDisplay.tableHeight) - 58;
      } else {
        if (this.customDisplay) {
          var oH = parseInt(_this.$store.state.oElemHg) - 58 - 30-50;
        } else {
          var oH = parseInt(_this.$store.state.oElemHg) - 58;
        }
      }
      var distance = 0,
        headSearchH = 0;
      var tableH = this.$refs.tableHead.offsetHeight;
      var len = 1;
      if (this.tablefootLabel[_this.$store.state.curSheetName]) {
        len = Number(this.tablefootLabel[_this.$store.state.curSheetName]) + 1;
      }
      if (len > 1) {
        distance = (Number(len) - 1) * 20;
      }
      if (tableH > 29) {
        distance = distance + (tableH - 42);
      }
      // if(this.$refs.searchCondition){
      // 	headSearchH = this.$refs.searchCondition.offsetHeight;
      // }
      var oDivs = document.getElementsByClassName("assetBased-table");
      this.$refs.tableScroll.style.height =
        oH - 120 - distance - headSearchH + "px";
      if (this.$refs.tableFixedBody) {
        this.$refs.tableFixedBody.style.maxHeight =
          oH - 120 - distance - headSearchH + "px";
      }

      if (this.sheetName == "利润表" || this.sheetName == "审定数") {
        this.$refs.tableScroll.style.height =
          parseInt(this.$refs.tableScroll.style.height) -
          headSearchH +
          36 +
          "px";
      }
      if (this.sheetName == "资产负债表") {
        this.$refs.tableScroll.style.height =
          parseInt(this.$refs.tableScroll.style.height) -
          headSearchH +
          18 +
          "px";
      }
      for (var i = 0; i < oDivs.length; i++) {
        if (oDivs[i].style.display != "none") {
          // console.log(oDivs[i].querySelector('.wrap-table-body'));
          var searchContH = 0;
          searchContH = oDivs[i].querySelector(".searchCondition ")
            .offsetHeight;
          oDivs[i]
            .querySelector(".wrap-table-fixed")
            .querySelector(".wrap-table-body").style.height = oDivs[
            i
          ].querySelector(".wrap-table-body").style.height =
            parseInt(_this.$refs.tableScroll.style.height) - searchContH + "px";
        }
      }
      if (oDivs.length === 0) {
        var searchContH = 0;
        searchContH = document.querySelector(".searchCondition ").offsetHeight;
        document
          .querySelector(".wrap-table-fixed")
          .querySelector(
            ".wrap-table-body"
          ).style.height = document.querySelector(
          ".wrap-table-body"
        ).style.height =
          parseInt(_this.$refs.tableScroll.style.height) - searchContH + "px";
      }
      _this.renewVisibleData(_this.divScrollTop);
    },
    /**
     * @params obj 新增修改的数据
     * @params column 列名
     * 新增，插入转换千分位
     *  */
    changeToThousand(obj, column, value, idx) {
      var tableHeader = this.tableHeader[this.tableHeader.length - 1];
      //如果是数组
      if (typeof obj == "object" && obj.constructor == Array) {
        for (var i = 0; i < obj.length; i++) {
          for (var item in tableHeader) {
            if (!(obj[i][item] === "" || obj[i][item] === "0")) {
              if (tableHeader[item].isThousands) {
                obj[i][item] = this.$store.state.commafyNumber(obj[i][item],4);
              }else if(tableHeader[item].isThousandsTwo){
                obj[i][item] = this.$store.state.commafyNumber(obj[i][item]);
              }
            }
          }
        }
        return obj;
      }
      //如果是对象
      if (typeof obj == "object" && obj.constructor == Object) {
        for (var item in tableHeader) {
          if (
            tableHeader[item].isThousands &&
            !isNaN(obj[item]) &&
            obj[item] != ""
          ) {
            obj[item] = this.$store.state.commafyNumber(obj[item],4);
          }else if(
            tableHeader[item].isThousandsTwo &&
            !isNaN(obj[item]) &&
            obj[item] != ""
          ){
            obj[item] = this.$store.state.commafyNumber(obj[item]);
          }
        }
        return obj;
      }
      //如果直接需要处理一列的话
      if (obj == "") {
        if (tableHeader[column].isThousands) {
          var val = this.$store.state.commafyNumber(value,4);
          this.$set(this.tableRows[idx], column, val);
        }else if(tableHeader[column].isThousandsTwo){
          var val = this.$store.state.commafyNumber(value,100);
          this.$set(this.tableRows[idx], column, val);
        }
      }
    },
    //将千分位转为数字
    changeToNum(value, column) {
      var val = value.replace(/\s+/g, "");
      var tableHeader = this.tableHeader[this.tableHeader.length - 1];
      var pane = "";
      if (tableHeader[column].isThousands || tableHeader[column].isThousandsTwo) {
        if (val != "") {
          var numArr = String(val).split(",");
          for (var i = 0; i < numArr.length; i++) {
            pane += numArr[i];
          }
        } else {
          pane = val;
        }
        return pane;
      } else {
        return value;
      }
    },
    /**重置数据 */
    resetDate() {
      Object.assign(this.$data, this.$options.data());
      var _this = this;
      this.sendParams.projectId = this.$store.state.projectId;
      this.sendParams.investorId = this.$store.state.investorId;
      this.changeFlag = false;
      var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(",");
      this.curSortArr = this.sortList["desc"];
      if (groupIdArr[0] == "" && groupIdArr[1]) {
        this.groupId = groupIdArr[1];
      } else {
        this.groupId = groupIdArr[0];
      }
      //console.log(_this.$options.data());
    },
    /**是否需要再次请求初始数据*/
    getSheetIfRefresh(callback) {
      var _this = this;
      this.$http
        .post("/api/xlsUpdateData/getSheetIfRefresh", {
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          sheetName: _this.sheetName
        })
        .then(function(res) {
          if (res.data) {
            _this.resetDate();
            _this.getSheetData();
          }
        })
        .catch(function(err) {
          _this.$messageError(err);
        });
    },
    /**标记 */
    sign(event, tableR, key, index, type) {
      //外审修改 需要增加标记
      var olem = event.target;
      var disOlem = olem.getAttribute("disabled");
      if (/examineModification/g.test(this.$route.path) && tableR.id != "") {
        this.$refs.signCont.style.left = event.x + "px";
        this.$refs.signCont.style.top = event.y + "px";
        this.markData.tableR = tableR;
        this.markData.key = key;
        this.markData.index = index;
        this.markData.type = type;
        if (!disOlem) {
          this.isShowSignCont = false;
          tableR["columnNames"].split(",").indexOf(key) > -1
            ? (this.markCellFlag = false)
            : (this.markCellFlag = true);
        } else {
          //模拟
          //this.isShowSignCont = false;
          //tableR['columnNames'].split(',').indexOf(key)>-1?this.markCellFlag = false:this.markCellFlag = true;
        }
      } else {
        this.contextmenuShow(event);
      }
    },
    markCell(event) {
      var oStr = event.target.innerHTML;
      var _this = this;
      var markObj = {
        取消标记: "0",
        标记: "1"
      };
      this.$http
        .post("/api/xls/summary/markCell", {
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          dataId: _this.markData.tableR.id,
          colName: _this.markData.key,
          status: markObj[oStr]
        })
        .then(function(res) {
          if (oStr == "标记") {
            if (_this.markData.tableR.columnNames != "") {
              _this.markData.tableR.columnNames += "," + _this.markData.key;
              // _this.markData.tableR.columnNames = _this.markData.tableR.columnNames.substring(0, _this.markData.tableR.columnNames.length - 1);
            } else {
              _this.markData.tableR.columnNames = _this.markData.key;
            }
          } else {
            var arr = _this.markData.tableR.columnNames.split(",");
            var idx = arr.indexOf(_this.markData.key);
            arr.splice(idx, 1);
            _this.markData.tableR.columnNames = arr.toString();
          }
          //需要判断是表身数据还是汇总数据
          if (_this.markData.type == "mid") {
            _this.$set(
              _this.tableRows[_this.markData.index],
              "columnNames",
              _this.markData.tableR.columnNames
            );
          } else {
            _this.$set(
              _this.totalData[_this.markData.index],
              "columnNames",
              _this.markData.tableR.columnNames
            );
          }
          //
        })
        .catch(function(err) {
          _this.$messageError(err);
        });
    },
    /*粘贴 */
    pasteFromExcel(e, tableR, key, tableRInd, tableHVal, indx) {
      if (!this.$store.state.readonly || this.cols10) return;
      var _this = this,
        tableRowSort;
      var headerClums = this.tableHeader[_this.tableHeader.length - 1];
      var disableColumnArr = []; //不能编辑的列tableR.disableColumns.split(';')
      var headerArr = Object.keys(headerClums);
      var copydata = []; //拷贝数据按列名排列
      var idsArr = []; //匹配的数据的id
      var matchCloumArr = []; //获取列表的列名
      var jsonStr = "";
      this.pasteCloum = [];
      var rowNums = 0; //新增的数量
      var startNumB = tableR.numB; //粘贴开始的序号
      // console.log(headerArr);
      //console.log(_this.tableRows);
      //获取粘贴板数据
      var clipboardData = window.clipboardData || e.clipboardData, // IE || chrome
        data = clipboardData.getData("Text"),
        //判断表格数据是使用\n还是\r分行，解析成行数组
        rowArr =
          data.indexOf(String.fromCharCode(10)) > -1
            ? data.split(String.fromCharCode(10))
            : data.split(String.fromCharCode(13)),
        //根据\t解析单元格
        cellArr = rowArr
          .filter(function(item) {
            //兼容Excel行末\n，防止粘贴出多余空行
            return item !== "";
          })
          .map(function(item) {
            return item.split(String.fromCharCode(9));
          });
      //如果是个空的直接返回
      if (cellArr.length == 0) {
        return;
      }
      //复制单个数据
      if (cellArr.length == 1 && cellArr[0].length == 1) {
        if (
          tableHVal.search.inputType == "date" &&
          cellArr[0][0].replace(/\s+/g, "") == ""
        ) {
          return;
        } else {
          tableR[key] = cellArr[0][0].replace(/\s+/g, "");
        }
        if (
          tableHVal.search.inputType == "date" &&
          cellArr[0][0].replace(/\s+/g, "") != "" &&
          /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(
            cellArr[0][0].replace(/\s+/g, "")
          )
        ) {
          tableR[key] = cellArr[0][0].replace(/\s+/g, "");
          _this.blurInp(tableR, key, e, tableRInd, "", tableHVal);
        }
        //_this.blurInp(tableR,key,e,tableRInd,'',tableHVal);
        return;
      }
      //获取匹配的id
      var cellArrInd = 1;
      for (var j = tableRInd; j < cellArr.length + tableRInd; j++) {
        if (this.tableRows[j] && this.tableRows[j].id) {
          //覆盖
          idsArr.push(_this.tableRows[j].id);
          disableColumnArr.push(_this.tableRows[j].disableColumns);
        } else {
          //新增
          idsArr.push("insert" + cellArrInd);
          cellArrInd++;
        }
      }
      if (cellArrInd > 1) {
        var tableRowSortInd = tableRInd;
        if (tableRowSortInd === 0) {
          tableRowSort = 8;
        } else {
          while (tableRowSortInd > 0) {
            if (_this.tableRows[tableRowSortInd - 1].id) {
              tableRowSort = _this.tableRows[tableRowSortInd - 1].rowSort;
              tableRowSortInd = 0;
            } else {
              tableRowSortInd--;
              tableRowSort = 8;
            }
          }
        }
      }
      //获取粘贴的列名
      for (var n = indx; n < cellArr[0].length + indx; n++) {
        matchCloumArr.push(headerArr[n]);
      }
      //处理拼接数据
      for (var i = 0; i < idsArr.length; i++) {
        var obj = (copydata[i] = {});
        for (var j = 0; j < cellArr[i].length; j++) {
          // console.log(matchCloumArr[j]);
          // console.log(cellArr[i][j]);

          //处理作价规则
          if (matchCloumArr[j] == "ruleType") {
            if (this.matchRuleType[cellArr[i][j].replace(/\s+/g, "")]) {
              cellArr[i][j] = this.matchRuleType[
                cellArr[i][j].replace(/\s+/g, "")
              ];
            }
          }
          //千分位的需要转化
          if (
            headerClums[matchCloumArr[j]] &&
            headerClums[matchCloumArr[j]].isThousands
          ) {
            cellArr[i][j] = _this.changeToNum(
              cellArr[i][j].replace(/\s+/g, ""),
              matchCloumArr[j]
            );
          }else if(
            headerClums[matchCloumArr[j]] &&
            headerClums[matchCloumArr[j]].isThousandsTwo
          ){
            cellArr[i][j] = _this.changeToNum(
              cellArr[i][j].replace(/\s+/g, ""),
              matchCloumArr[j]
            );
          }
          //如果是日期的列需要转化
          if (
            headerClums[matchCloumArr[j]] &&
            headerClums[matchCloumArr[j]].search &&
            headerClums[matchCloumArr[j]].search.inputType == "date"
          ) {
            var dateVal = cellArr[i][j].replace(/\s+/g, "");
            if (/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(dateVal)) {
              if (dateVal.indexOf("/") != -1) {
                var dateStr = dateVal.split("/");
                if (Number(dateStr[1]) < 10) {
                  dateStr[1] = "0" + dateStr[1];
                }
                if (Number(dateStr[2]) < 10) {
                  dateStr[1] = "0" + dateStr[2];
                }
                cellArr[i][j] = dateStr[0] + "" + dateStr[1] + "" + dateStr[2];
              }
              if (dateVal.indexOf("-") != -1) {
                var dateStr = dateVal.split("-");
                if (Number(dateStr[1]) < 10) {
                  dateStr[1] = "0" + dateStr[1];
                }
                if (Number(dateStr[2]) < 10) {
                  dateStr[1] = "0" + dateStr[2];
                }
                cellArr[i][j] = dateStr[0] + "" + dateStr[1] + "" + dateStr[2];
              }
            } else {
              cellArr[i][j] = "";
            }
          }
          if (headerClums[matchCloumArr[j]]) {
            copydata[i][matchCloumArr[j]] = cellArr[i][j].replace(/\s+/g, "");
          }
          //进出口转换数据
          if (
            headerClums[matchCloumArr[j]] &&
            headerClums[matchCloumArr[j]].isSelect
          ) {
            copydata[i][matchCloumArr[j]] = this.entranceSelect[
              cellArr[i][j].replace(/\s+/g, "")
            ];
          }
        }
      }
      //console.log(copydata);
      //console.log(matchCloumArr);
      //获取相对应的列名JSON.stringify
      var copyLen = copydata.length;
      if (copyLen > 500) {
        //copyLen = 500;
        this.$messageError(
          "一次性只能粘贴500条数据哦，数据量过大可以尝试部分导入哦！"
        );
        return;
      }
      for (var i = 0; i < copyLen; i++) {
        var str = JSON.stringify(copydata[i]);
        jsonStr +=
          JSON.stringify(idsArr[i]) +
          ":" +
          str.replace(/\\n/g, "").replace(/\\r/g, "") +
          ",";
        if (idsArr[i].indexOf("insert") != -1) {
          rowNums++;
        }
      }

      jsonStr = "{" + jsonStr.substring(0, jsonStr.length - 1) + "}";
      //添加sort
      var jsonStrData = JSON.parse(jsonStr);
      if (tableRowSort) {
        var tableRowSortNum = tableRowSort + 1;
      } else {
        if (tableRInd <= 0) {
          var tableRowSortNum = 9;
        } else {
          var tableRowSortNum = _this.tableRows[tableRInd - 1].rowSort + 1;
        }
      }
      for (let key in jsonStrData) {
        jsonStrData[key].rowSort = tableRowSortNum++;
      }
      jsonStr = JSON.stringify(jsonStrData);
      //e.target.blur();
      _this.$http
        .post("/api/incomexls/copyAndPasteRow", {
          projectId: _this.sendParams.projectId,
          investorId: _this.sendParams.investorId,
          templateId: _this.$store.state.incomeInitId,
          sheetName: _this.sheetName,
          groupId: _this.groupId,
          cellsAndValues: jsonStr,
          sort: tableRowSortNum - copyLen,
          type: 2
        })
        .then(function(data) {
          //console.log(data);
          //新增数据
          if (tableRowSort != undefined) {
            for (var j = 0; j < data.data.length; j++) {
              data.data[j].check = false;
              data.data[j].paste = true;
              data.data[j] = _this.changeToThousand(data.data[j]);
              data.data[j].numB = startNumB + j;
              _this.resultData.splice(startNumB + j - 1, 1, data.data[j]);
            }
          } else {
            //覆盖数据(修改)
            for (var i = 0; i < _this.resultData.length; i++) {
              _this.resultData[i].paste = false;
              for (var j = 0; j < data.data.length; j++) {
                if (_this.resultData[i].id == data.data[j].id) {
                  data.data[j].check = _this.resultData[i].check;
                  data.data[j].numB = _this.resultData[i].numB;
                  data.data[j].paste = true;
                  data.data[j] = _this.changeToThousand(data.data[j]);
                  _this.resultData.splice(i, 1, data.data[j]);
                }
              }
            }
          }
          var dataLen=data.data.length;
          for (let z = startNumB+dataLen-1; z < startNumB+dataLen-1+20; z++) {
            if(z<_this.resultData.length){
              _this.resultData[z].rowSort=_this.resultData[z-1].rowSort+1;
            }
          }
          if (_this.resultData[_this.resultData.length - 1].id) {
            var addRowObj = Object.assign({}, _this.initData);
            addRowObj.numB = _this.resultData.length + 1;
            _this.resultData.push(addRowObj);
          }
          _this.pasteCloum = matchCloumArr;
          // _this.$messageSuccess("操作成功");
          _this.inputCont = cellArr[0][0]
            .replace(/\\n/g, "")
            .replace(/\\r/g, "")
            .replace(/\s+/g, "");
          _this.totalNum = Number(_this.totalNum) + rowNums;

          _this.getTotalNum();
          _this.renewVisibleData(_this.divScrollTop);
          // _this.$parent.sendConnect();

          //需要隐藏下拉框
          // var datePicks = document.getElementsByClassName("el-picker-panel");
          //var selDrop = document.getElementsByClassName("el-select-dropdown");
          // if(datePicks){
          //   for(var i =0;i<datePicks.length;i++){
          //     datePicks[i].style.display = 'none'
          //   }
          // }

          // if(selDrop){
          //   for(var i =0;i<selDrop.length;i++){
          //     selDrop[i].style.display = 'none'
          //   }
          // }
        })
        .catch(function(err) {
          _this.$messageError(err);
        });
    }
  },
  watch: {
    // tableRows: {
    //   handler: function(newD, oldD) {
    //     this.tableRows = newD;
    //   },
    //   deep: true
    // },
    // sheetNameBool(newD, oldD) {
    //   var _this = this;
    //   if(this.curSheetName!=this.sheetName||this.sheetName.indexOf('汇总')>-1) return;
    //   console.log('跟新了');
    //   //如果是股权投资的话是需要刷新的
    //   if(this.sheetName=="股权投资"){this.changeFlag = true}
    //   if (newD && this.changeFlag) {
    //     this.changeFlag = false;
    //     this.getSheetData();
    //     this.reckonHg();

    //   }else{
    //     //需要判断是否有人修改过科目，如果有修改的话则需要刷新页面，重置页面数据
    //      this.getSheetIfRefresh();
    //      this.reckonHg();
    //      //console.log('点击了哟');
    //   }
    // },
    // scrollTop(newD, oldD){
    //   var _this = this;
    //   this.scrollTop = this.$refs.tableScroll.scrollHeight-this.$refs.tableScroll.clientHeight;
    //   if(newD!=oldD){
    //     //this.renewVisibleData(_this.$refs.tableScroll.scrollTop);
    //     var scrollTop = _this.$refs.tableScroll.scrollTop;
    //     var wrapperHeight = this.$refs.tableScroll.clientHeight;
    //     var contentHeight = parseInt(this.contentHeight);
    //     if(contentHeight&&contentHeight>0&&(scrollTop+wrapperHeight)>=contentHeight){
    //       alert();
    //         this.renewVisibleData(contentHeight);
    //     }
    //   }
    // },

    nums: {
      handler: function(newD, oldD) {
        this.changeFlag = true;
      },
      deep: true
    },
    "$store.state.investorId"(newD, oldD) {
      if (newD) {
        this.sendParams.investorId = newD;
        this.pageNum = 1;
      }
    },
    "$store.state.reloadIncomeTable"() {
      this.termSearch();
    },
    /*"$store.state.clickCconfirmBtn"(){
      if(this.sheetName==this.curSheetName){
      	setTimeout(()=>{
      		this.reckonHg()
      	},100)
      }
    }*/
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.isWarning {
  background: #f03131;
}

.isFixedWid {
  width: 1300px;
}
.arrow-up {
  width: 0;
  border: 6px solid transparent;
  border-bottom: 6px solid #ebeef5;
  position: relative;
  left: 11px;
  top: -22px;
}
.arrow-up.last {
  left: 196px;
}
.arrow-up::after {
  position: absolute;
  content: "";
  top: 12px;
  left: -5px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-bottom: 5px solid #fff;
}
.arrowLeft {
  width: 0;
  border: 5px solid transparent;
  border-right: 5px solid #ebeef5;
  position: absolute;
  left: -11px;
  top: 3px;
}

.arrowLeft::after {
  position: absolute;
  content: "";
  top: -5px;
  left: -2px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-right: 5px solid #fff;
}
.arrowRight {
  width: 0;
  border: 5px solid transparent;
  border-left: 5px solid #ebeef5;
  position: absolute;
  right: -11px;
  top: 3px;
}

.arrowRight::after {
  position: absolute;
  content: "";
  top: -5px;
  right: -2px;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-left: 5px solid #fff;
}
.c-black {
  color: #333 !important;
  padding: 0 5px;
}
.table80-wrap {
  position: relative;
  height: 100%;
  .icon-yinyong{
    transform: scale(.7);
  }
  .icon-yinyong:hover{
    opacity: 0.7;
  }
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
        font-size: 12px;
        color: #98c268;
      }
    }
  }
  .search-btn {
    position: absolute;
    top: 10px;
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
    // position: relative;
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
    }

    .tableHeadFilter {
      display: inline-block;
      position: absolute;
      height: 18px;
      top: 3px;
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
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    /*position: absolute;
    top: 28px;
    bottom: 38px;
    width: 100%;*/
    .noData {
      width: 100%;
      z-index: 1;
      position: relative;
    }
    .noDataCols10 {
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
    position: relative;
    height: 100%;
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
          /deep/ .el-checkbox .el-checkbox__label {
            font-size: 14px !important;
          }
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
              cursor: pointer;
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
          height: 100%;
          .cell {
            font-size: 14px;
            overflow: hidden;
            .pr5 {
              padding: 0 5px;
            }
            &.checkedBlueCell {
              /deep/ .el-input.is-disabled .el-input__inner {
                background: #3a80ec !important;
                color: #fff !important;
              }
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
                font-size: 14px !important;
              }
              &.is-disabled {
                .el-input__inner {
                  background: #ededed !important;
                }
                &.el-input--suffix {
                  // .el-input__inner{background: none !important;}
                }
              }
              &.isMarked {
                .el-input__inner {
                  background: yellow !important;
                }
                &.el-input--suffix {
                  .el-input__inner {
                    background: yellow !important;
                  }
                }
              }
              &.isPasted {
                .el-input__inner {
                  background: #e0ffe9 !important;
                }
                &.el-input--suffix {
                  .el-input__inner {
                    background: #e0ffe9 !important;
                  }
                }
              }
            }
            /deep/ .el-select {
              &.isMarked .el-input .el-input__inner {
                background: yellow !important;
              }
            }
            /deep/ .el-select {
              &.isPasted .el-input .el-input__inner {
                background: #e0ffe9 !important;
              }
            }
            .yingyong{
              position: absolute;
              right: 5px;
              top: 5px;
              font-size: 12px;
              color: #F09237;
              cursor: pointer;
            }
            /deep/ div.inputYinYong .el-input__inner {
              padding-right: 32px!important;
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
      tr:last-child td .cell{
        position: relative;
      }
    }
    .tableTotal {
      /*width: 100%;
    	position: absolute;
    	bottom: 0;*/
      position: relative;
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
      &.balanceTableFd {
        min-height: 20px;
      }
      &.noTopBorder {
        border-top: none;
      }
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
        .cellNums {
          display: inline-block;
          padding: 0 3px;
          /deep/ .el-input-number--small {
            width: 50px;
          }
          /deep/ .el-input-number.is-controls-right .el-input-number__decrease,
          /deep/ .el-input-number.is-controls-right .el-input-number__increase {
            width: 16px;
            border: none;
            background: none;
            .el-icon-arrow-up:before {
              content: "\E60C";
            }
            .el-icon-arrow-down:before {
              content: "\E60B";
            }
          }
        }
      }
      li:hover {
        background: #ebeef2;
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
  .sort-cont,
  .sign-cont {
    width: 98px;
    ul {
      position: relative;
    }
    li {
      cursor: pointer;
      font-size: 12px !important;
      border-radius: 2px !important;
      &.active,
      &:hover {
        background: #3a80ec !important;
        color: #fff;
      }
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
.tableBody /deep/.el-date-editor.el-input,
.tableBody /deep/.el-date-editor.el-input__inner {
  width: 100%;
}
.tableBody /deep/ .el-input__icon {
  height: 20px !important;
  line-height: 20px !important;
  color: #c0c0c0;
}
.wrap-table-head thead tr th div {
  text-align: center;
}
/*资产负债表*/
.isBalanceTable {
  @for $i from 2 through 12 {
    tr:nth-child(#{$i}) td:nth-child(1) {
      text-indent: 10px;
    }
    tr:nth-child(#{$i}) td:nth-child(6) {
      text-indent: 10px;
    }
  }
  @for $i from 15 through 31 {
    tr:nth-child(#{$i}) td:nth-child(1) {
      text-indent: 10px;
    }
  }
  @for $i from 16 through 22 {
    tr:nth-child(#{$i}) td:nth-child(6) {
      text-indent: 10px;
    }
  }
  @for $i from 26 through 30 {
    tr:nth-child(#{$i}) td:nth-child(6) {
      text-indent: 10px;
    }
  }
  tr:nth-child(13) td:nth-child(1),
  tr:nth-child(14) td:nth-child(6),
  tr:nth-child(32) td:nth-child(1),
  tr:nth-child(33) td:nth-child(1),
  tr:nth-child(24) td:nth-child(6) {
    text-indent: 28px;
    font-weight: bold;
  }
  tr:nth-child(33),
  tr:nth-child(31) td:nth-child(6) {
    font-weight: bold;
  }
  tr:nth-child(23) td:nth-child(6) {
    text-indent: 24px;
    font-weight: bold;
  }
}
/*审定数*/
.isAuditedTable {
  tr:nth-child(1) td:nth-child(2),
  tr:nth-child(13) td:nth-child(2),
  tr:nth-child(31) td:nth-child(2),
  tr:nth-child(32) td:nth-child(2),
  tr:nth-child(45) td:nth-child(2),
  tr:nth-child(53) td:nth-child(2),
  tr:nth-child(54) td:nth-child(2) {
    font-weight: bold;
  }
  @for $i from 2 through 12 {
    tr:nth-child(#{$i}) td:nth-child(2) {
      text-indent: 10px;
    }
  }
  @for $i from 14 through 30 {
    tr:nth-child(#{$i}) td:nth-child(2) {
      text-indent: 10px;
    }
  }
  @for $i from 33 through 44 {
    tr:nth-child(#{$i}) td:nth-child(2) {
      text-indent: 10px;
    }
  }
  @for $i from 46 through 52 {
    tr:nth-child(#{$i}) td:nth-child(2) {
      text-indent: 10px;
    }
  }
}
.operationHover {
  &:hover {
    opacity: 0.7;
  }
}
.el-icon-close {
  cursor: pointer;
}
.isdisabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
//.isProfitTable{}

//固定列
.wrap-table-fixed {
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 3;
  .cell .el-input .el-input__inner {
    height: 20px !important;
    padding: 0 5px !important;
  }
  .wrap-scroll {
    overflow: hidden;
    width: 100%;
  }
  .wrap-table-body {
    &::-webkit-scrollbar {
      display: none;
    }
    overflow: -moz-scrollbars-none;
    width: calc(100% + 20px);
  }
  .wrap-table-head {
    box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);
    z-index: 4;
  }
}
.table-footer {
  position: relative;
  .fixed-table-taotal {
    position: absolute !important;
    left: 0;
    top: 0;
    box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);
    z-index: 1;
    background: #fff;
  }
}
/deep/ .el-select {
  width: 100%;
}
.fixed-wid-table {
  //width:100px;
  tbody {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    transform: translate3d(0, 0, 0);
  }
}
//去除disabled样式
.checkedBG {
  /deep/ .el-input.is-disabled .el-input__inner {
    cursor: pointer;
    color: #262628;
  }
}

.clusterize-scroll .clusterize-content tbody {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transform: translate3d(0, 0, 0);
}
</style>
