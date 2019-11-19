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
                <li v-for="(item,index) in searchCondition" :key="index" v-if="item.filedType=='selectInput'"><span class="c-black">{{item.toolTipCurName}}</span><span>{{item.name}}：</span><span>{{item.condition}}</span><i class="el-icon-close" @click="searchDel(item)"></i></li>
                <!--numbers or daterange or range-->
                <li v-for="(item,index) in searchCondition" :key="index" v-if="item.filedType=='numbers' || item.filedType=='daterange' || item.filedType=='range'"><span class="c-black">{{item.toolTipCurName}}</span><span v-if="item.value1!=''">{{item.name1}}：</span><span v-if="item.value!=''">{{item.value1}}</span><span class="c-black" v-if="item.value2!=''&&item.value1!=''">-</span><span v-if="item.value2!=''">{{item.name2}}</span><span v-if="item.value2!=''">{{item.value2}}</span><i class="el-icon-close" @click="searchDel(item)"></i></li>
                <!--suminput-->
                <li v-for="(item,index) in searchCondition" :key="index" v-if="item.filedType=='suminput'"><span class="c-black">{{item.toolTipCurName}}</span><span>包含：</span><span v-if="item.value!=''">{{item.value}}</span><i class="el-icon-close" @click="searchDel(item)"></i></li>
	              <!--单选-->
	              <li v-for="(item,index) in searchCondition" :key="index" v-if="item.filedType=='selectSingle'"><span class="c-black">{{item.toolTipCurName}}</span><span>包含:{{item.value}}</span><i class="el-icon-close" @click="searchDel(item)"></i></li>
            </ul>
           <a class="search-btn marginRight0 fr" @click="termSearch()">搜索</a>
        </div>

        <div class="wrap-table" ref="tableWrap">
            <div class="wrap-table-head" ref="tableHead" @mousemove.prevent='mousemove($event)'>
                <transition name="fade">
                 <div class="table-head-tooltip" v-if="showTooltip" @click.stop="showTooltip=true" :style="toolTipStyle">
                    <i class="arrow-up" :class="{last:isLastFiled}"></i>
                    <search-module ref="tabToolTip"  :search="curSearch"  @searchCallback="searchCallback"  :filed="curFiled" @hideTooltip="hideToolTip" ></search-module>
                 </div>
                </transition>
                <table>
                  <thead>
                      <tr>
                        <th v-for="(tableHVal,key) in tableHeader" :key="key" v-if="!tableHVal.isNoShow&&!tableHVal.isSpecial" v-show="!(cols10 && key==='operation')" :align="tableHVal.align?tableHVal.align:'center'" :rowspan="tableHVal.rowspan?tableHVal.rowspan:1" :colspan="tableHVal.colspan?tableHVal.colspan:1">
                          <div class="cell" :class="{searchM:tableHVal.search}" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}">
                              <span  class="searchMSpan"  @click.stop="popup(tableHVal,key,$event,tableHVal.label)">
                                  {{tableHVal.label}}
                              </span>
                                <div v-if="tableHVal.isFilter" class="tableHeadFilter" >
                                  <i class="triangle-up" title="升序" @click.stop="tableSort('asc',tableHVal,key,$event)" ref="tableSortAsc"></i>
                                  <i class="triangle-down" title="降序" @click.stop="tableSort('desc',tableHVal,key,$event)" ref="tableSortDesc"></i>
                              </div>
                          </div>
                          <span v-if="!tableHVal.colspan" class="headRight" @mousedown="mousedown(tableHeader,key, $event)"></span>
                        </th>
                      </tr>
                  </thead>
                </table>
            </div>

            <div class="wrap-table-body clusterize-scroll" @mouseover="mouseoverFun('right')" @scroll="loadMore($event, 'right')" ref="tableScroll" id="sumTableExampleScroll">
                <div class="noData" v-if='tableRowData.length===0'>暂无数据</div>
                <table class="tableBody clusterize-content" ref="tableBody" :style="{height: contentHeight}">
                    <tbody id="sumTableExampleContent" class="pa">
                        <tr v-for="(tableR,tableRInd) in tableRowData" @click="addBg(tableRInd)" :key="tableRInd">
                            <td v-for="(tableHVal,key,indx) in tableHeader" :key="key"   :align="tableHVal.align?tableHVal.align:'center'"  :class="tableHVal.align?tableHVal.align:'center'">                                
                                <!-- 序号 -->
                                <div v-if="key==='isListedCompany'" class="cell textOverflow1" :style="{'width':tableHVal.minWidth?tableHVal.minWidth+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                                	 :title="tableR[key]">
                                	{{tableR[key]?"上市":"非上市"}}
                                </div>
                                <!-- 其他内容 -->
                                <div v-else class="cell textOverflow1" :style="{'width':tableHVal.width?tableHVal.width+'px':'','min-width':tableHVal.minWidth?tableHVal.minWidth+'px':''}"
                                	:title="tableR[key]">
                                		{{tableR[key]}}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import searchModule from "@/components/searchModule";
//绘制
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
export default {
  props: ["tableHeader", "sheetNameBool", "sheetName","nums","curSheetName","cols10","customDisplay","year"],
  components: {
    searchModule
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
      showTooltipFixed:false,
      toolTipStyle: {}, //tooltip的位置
      isCheckAllFlag: true, //是否没有选全选
      visibelFlag: false,
      isLastFiled: false, //最后一列
      checkedArr: [], //勾选的数据
      markData:{
        key:'',
        tableR:'',
        index:'',
        type:''
      },
      sheetSearchTerm: {
        conditions: "", //搜索的条件
        sort: "", //排序字段名称,
        order: "",//asc或desc(升序或降序)
      },
     /*  sendParams: {
        investorId: "",
        projectId: ""
      }, */
      tabX:0,     //表头拖动
      mousemoveWidth:0,
      isMousemove:false,
      loadDataFlag:false, //是否进入新增、修改的接口
      groupId:'',
      initDate:{},
      prevPage:0, //上一页的页码
      nextPage:0,  //下一页的页码
      direction:'dn',//滚动的方西
      sortFlag:false,
      tablefootLabel:{
        "应收账款":3,
        "持有到期投资":2,
        "长期应收":3,
        "股权投资":2,
        "投资性房地产":2,
        "工程物资":2,
        "生产性生物资产":2,
        "油气资产":2,
        "商誉":2,
        "其他应收款":3,
        "预付账款":3
      },
      isShowSignCont:true,
      sortList:{
        "desc":{"2":"归类降序","1":"数值降序"},
        "asc":{"2":"归类升序","1":"数值升序"},
      },
      curSortArr:{},
      arrowSort:{
         oElem:'',
         sort:'',
         order:''
      },
      currentArrowHight:false,
      isShowProspecting: false,  //是否显示勘查
      isShowConfirmationRequests: false, //是否显示询证函
      tableInfo: "",   //底稿取表格信息
      kctype: "tablemore",  //使用类
      totalNum:0, //合计的条数
      searchTotalNum:0,//条件查询的数量
      matchRuleType:{ //作价规则
        "账面比例作价":2,
        "成本法作价":3,
        "收盘价作价":4,
        "二手作价":5,
        "特殊作价":6,
        "股权比例作价":7
      },
      pasteCloum:[],//粘贴的数组
      entranceSelect:{
        '是':'0',
        '否':'1'
      },
      cellBG:{
        event:"",
        rowInd:"",
        cell:""
      },
      cellNums:1,   //插入行数
      firstShowLoading:true,//第一次加载需要

      isHaveMoreData:false, //是否可以向下滑动
      pageMax:0, //页面最大值
      scrollNum:0,//滚动的距离
      addTableObj:{},//页面新增的数据(单行数据)
      tableClusterize:'',
      mousePosition: '', // 鼠标位置
      resultData:[],
      scrollTop:0,  //监听滚动条 
    };
  },
  computed:{
    tableRowData(){
      return this.tableRows;
    },
     //计算表格的高度
    contentHeight() {
        return this.resultData.length * 21 + 'px';
    },
  },
  mounted() {
    var _this = this;
   /*  this.sendParams.projectId=this.$store.state.projectId;
    this.sendParams.investorId=this.$store.state.investorId || this.customDisplay.investorId; */
    var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(',');
    this.curSortArr = this.sortList['desc'];
    if(groupIdArr[0]==''&&groupIdArr[1]){
      this.groupId = groupIdArr[1];
    }else{
       this.groupId = groupIdArr[0];
    }

    if (this.sheetNameBool) {
      this.changeFlag = false;
      this.getSheetData();
	    this.reckonHg();
    }
    this.$store.state.tableHgFn = _this.reckonHg;

//  this.$refs.tableBody.parentNode.style.height =
//    window.screen.availHeight / 2 + "px";
    //点击空白处tooltip隐藏
    //document.
    document.addEventListener(
      "click",
      function() {
        _this.showTooltip = false;
        _this.showTooltipFixed = false;
        _this.isHideOperation = true;
        _this.isShowSignCont = true;
        _this.pasteCloum = [];
      },
      false
    );



  },
  methods: {
    //表头拖动
    mousedown(row,key,event){
      var _this=this;
      this.isMousemove=true;
      this.tabX=event.x;
      this.mousemoveKey=key;
      if(this.tableHeader.length>1){
        this.mousemoveRow=this.tableHeader;
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
    mousemove(event){
      if(!this.isMousemove){return}
      // console.log(this.mousemoveRow[this.mousemoveKey].minWidth)
      // console.log(this.mousemoveRow[this.mousemoveKey].width+(event.x-this.tabX))
      // console.log(this.mousemoveRow[this.mousemoveKey].minWidth<=(this.mousemoveRow[this.mousemoveKey].width+(event.x-this.tabX)))
      if(this.mousemoveRow[this.mousemoveKey].minWidth<=(this.mousemoveRow[this.mousemoveKey].width+(event.x-this.tabX))){
        if(this.tableHeader[this.mousemoveKey]){
          this.$set(this.tableHeader[this.mousemoveKey],"width",this.mousemoveWidth+(event.x-this.tabX))
          this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveWidth+(event.x-this.tabX))
        }else{
          this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveWidth+(event.x-this.tabX))
        }
      }else{
        if(this.tableHeader[this.mousemoveKey]){
          this.$set(this.tableHeader[this.mousemoveKey],"width",this.tableHeader[this.mousemoveKey].minWidth)
          this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveRow[this.mousemoveKey].minWidth)
        }else{
          this.$set(this.mousemoveRow[this.mousemoveKey],"width",this.mousemoveRow[this.mousemoveKey].minWidth)
        }
      }
    },
    /*点击表头的toolTip*/
    popup(data, key, event, name,fixed) {
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
        lastTop = el.parentNode.parentNode.offsetHeight+3;
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
        left = left - 200;
        this.isLastFiled = true;
      }
      this.toolTipStyle = {
        left: left + "px",
        top: lastTop + "px"
      };

      //  console.log(data);
      //需要创建tooltip
      this.curSearch = data.search;
      this.curFiled = key;
      if(fixed){
        this.showTooltipFixed = true;
      }else{
        this.showTooltip = true;
      }

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
          if(data.keyWorld) flag = true;
          break;
        case "selectInput":
          if (!data.value) flag = false;
          if(data.keyWorld) flag = true;
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
         if(data.value==''){
           flag = false;
         }
         if(data.keyWorld || data.keyWorld == 0) flag = true;
          break;
        case "numbers":
        	if (data.value1 == "" && data.value2 == "") flag = false;
          if(data.keyWorld) flag = true;
        case "daterange":
        	if (data.value == "") flag = false;
          if(data.keyWorld) flag = true;
        case "suminput":
        	if (data.value == "") flag = false;
          if(data.keyWorld) flag = true;
      }
      
      if (!flag&&data.type=='selectSingle'){
        this.$messageError("搜索项不能为空!");
        return;
      }
      
      if (!flag) {
        this.$messageError("输入项不能为空哦!");
        return;
      }
      
			if(data.type=='numbers' && (isNaN(data.value1) || isNaN(data.value2))){
      	this.$messageError("请输入数字!");
        return;
      }
      //需要筛选条件
      if(this.searchCondition.length){
	      for(var item in this.searchCondition){
	      	if(this.searchCondition[item].filed == data.filed){
	      		this.searchCondition.splice(item,1);
	      	}
	      }
      }
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
          /*单选 */
          if( _this.searchCondition[i]&& _this.searchCondition[i].filedType=="selectSingle"&&_this.searchCondition[i].value==data.value){
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
	      if(data.type=="selectSingle"){
          return{
            filed:data.filed,
            filedType:data.type,
            value:data.value,
            toolTipCurName:data.label
          }
        };
        if(data.type=="numbers"){
          return{
            filed:data.filed,
            filedType:data.type,
            value1: data.value1,
         		value2: data.value2,
            toolTipCurName:data.label
          }
       	};
       	if(data.type=="daterange"){
          return{
            filed:data.filed,
            filedType:data.type,
            value1: data.value[0],
            value2: data.value[1],
            toolTipCurName:data.label
          }
       	};
       	if(data.type=="suminput"){
          return{
            filed:data.filed,
            filedType:data.type,
            value: data.value,
            toolTipCurName:data.label
          }
       	};
	    }
      this.hideToolTip();
      this.$nextTick(function(){
        _this.reckonHg();
      })
     //this.reckonHg();
    },
    //搜索条件删除
    searchDel(item) {
      var _this = this;
      this.searchCondition.splice(this.searchCondition.indexOf(item), 1);
      if (this.searchCondition.length == 0) {
        this.sheetSearchTerm.conditions = "";
        this.sortFlag = true;
        this.firstShowLoading = true; 
        this.pageNum=1;
        this.$refs.tableScroll.scrollTop = 0;
        this.getSheetData();
        this.$nextTick(function(){
          _this.reckonHg();
        })
      }
    },
    //添加tr样式
    addBg(index) {
      this.$refs.tableBody.childNodes[0].childNodes[index].className =
        "is-selected";
      if (this.rowInd !== "" && this.rowInd != index&&this.$refs.tableBody.childNodes[0].childNodes[this.rowInd]) {
        this.$refs.tableBody.childNodes[0].childNodes[this.rowInd].className =  "";
      }
      this.rowInd = index;
    },
    mouseoverFun(type) {
      this.mousePosition = type;
    },

    loadMore(event, type){
      if(this.mousePosition !== type) return
      var _this = this,
        scrollLeft = event.target.scrollLeft,
        scrollTop = event.target.scrollTop,
        scrollHeight = event.target.scrollHeight,
        clientHeight = event.target.clientHeight;
        this.scrollTop = event.target.scrollTop;
    	this.$refs.tableHead.style.left = "-" + scrollLeft + "px";
      this.$refs.tableScroll.scrollTop = scrollTop;
      
   		this.renewVisibleData(scrollTop);
			if(this.scrollBool) return;
      if(this.sortFlag) return;
      if(this.isHaveMoreData && parseInt(this.contentHeight)<parseInt(this.$refs.tableScroll.style.height)+scrollTop+400){
        this.scrollBool = true;
        this.direction = 'dn';
        this.firstShowLoading = false
        this.pageNum++;
        this.getSheetData(function() {
          _this.scrollBool = false;
          
        });
      }
      //向下滚动的时候
      //scrollTop + clientHeight == scrollHeight
//    console.log(scrollTop > scrollHeight - clientHeight - 200)
//    if (scrollTop > scrollHeight - clientHeight - 200){
//      if (this.isHaveMoreData){
//         this.scrollBool = true;
//        this.pageNum += 1;
//         this.direction = 'dn';
//         this.firstShowLoading = false;
//         this.getSheetData(function() {
//            _this.scrollBool = false;
//          });
//      }
//    }
//    return
//    //向上滚动的时候
//    if(scrollTop<=0&&_this.prevPage>=1){
//      this.direction = 'up';
//      this.scrollBool = true;
//      this.firstShowLoading = false;
//      //this.pageNum = _this.prevPage;
//      this.getSheetData(function() {
//          _this.scrollBool = false;
//        });
//    }
			
			
      
   },
    /**拼接收索条件 */
    getSearchTerm(data) {
      if (!data) return;
      if(data.filedType == "daterange" || data.filedType == "numbers"){
      	this.sheetSearchTerm.conditions += data.filed + "~" + data.value1 + "##" + data.value2 + "^";
      }else if(data.filedType == "suminput"){
      	this.sheetSearchTerm.conditions += data.filed + "~" + data.value + "^";
      }else if(data.filedType == "selectSingle"){
      	let param = {"是":"1","否":"0"}
      	this.sheetSearchTerm.conditions += data.filed + "~" + param[data.value] + "^";
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
    renewVisibleData(scrollTop){
      this.itemHeight = 21;
      if(!document.getElementById('sumTableExampleContent')) {
          this.tableRows = this.resultData;
          return
      }
      var _this = this;
      var obj = this.$store.state.renewVisibleData(scrollTop,this.itemHeight,'sumTableExampleScroll');
      var start = Number(obj.start);
      var end = Number(obj.end);
      this.tableRows = this.resultData.slice(start, end);// 计算出可见区域对应的数据，让 Vue.js 更新
      this.$forceUpdate();
      $('#sumTableExampleContent').css({
        'webkitTransform':'translate3d(0,' +start *this.itemHeight+'px, 0)',
        'transform':'translate3d(0,' +start *this.itemHeight+'px, 0)'
      });
    },
    /**
     * 获取列表数据
     * @param callback回调函数
     * @param type 条件查询
     * @param reload 修改后刷新
     * @param operation  往数据池添加数据
     */
    getSheetData(callback, type,reload,operation) {
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
      }
      this.$http
        .post("/api/project/findProjectCollect", {
          page: this.pageNum,
          type:this.direction,//up or dn
          limit:60,//this.pageMax, //页面最大值
          condition: _this.sheetSearchTerm.conditions || "",
          sort: _this.sheetSearchTerm.sort || "", //排序字段名称,
          order: _this.sheetSearchTerm.order || "", //asc或desc(升序或降序)
          sheetGroupId:this.sheetName,
          year: this.year
        })
        .then(data => {
          var pageData = data.data;
          _this.isHaveMoreData = this.pageNum*60<data.count; //是否有向下滚的数据
          _this.pageMax += pageData.length;
          if(_this.sheetSearchTerm.conditions==''){
            _this.totalNum = pageData.dataCount;
            _this.searchTotalNum = 0;
          }else{
            //保存条件查询结果的数量
            _this.searchTotalNum = pageData.dataCount;
            console.log( _this.searchTotalNum);
          }

          
          _this.sortFlag = false;
	        for(var i =0;i<pageData.length;i++){
	        	for(var item in this.tableHeader){
	            //判断时候是千分列，需要转换数据
	            if(this.tableHeader[item].isThousands){
	              if(!(pageData[i][item]==="" || pageData[i][item]==="0")){
	                pageData[i][item] = _this.$store.state.commafyNumber(pageData[i][item]);
	              }
	            }
	
	          }
	        }
	        if (_this.firstShowLoading) {
            //增加序号(首次进入序号需要从1开始)
            for(var i =0;i<pageData.length;i++){
              pageData[i].numB = i+1;
            };
            _this.resultData = pageData;

          } else {
            switch (_this.direction) {
              case 'dn':
                  var lastOrderNum =  _this.resultData[_this.resultData.length-1].numB;
                  for(var i =0;i<pageData.length;i++){
                    var order = lastOrderNum +=1;
                    pageData[i].numB = order;
                  };
                  _this.resultData =  _this.resultData.concat(pageData);
                break;
            }
							
          }
         if(_this.firstShowLoading){
            _this.renewVisibleData();
          }
          callback && callback();
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  	},
    /*排序 */
    tableSort(type, tableHVal, key, event) {
      //console.log(this.$refs.tableSortAsc);
      //如果是最后一列
      console.log(event)
      this.curSortArr= this.sortList[type+''];
     // this.sortFlag = true;//不需要滚动加载
      this.arrowSort.oElem = event.target;
      //当前选中的排序
      if(event.target.style.opacity==1){
        this.currentArrowHight = true;
      }else{
        this.currentArrowHight = false;
      }
      //event.target.style.opacity = 1;
      //this.sheetSearchTerm.sort = key; //排序字段名称,
      //this.sheetSearchTerm.order = type; //asc或desc(升序或降序)
      this.arrowSort.sort = key;
      this.arrowSort.order = type;
      
      this.sortFlag = true;//不需要滚动加载
      for (var i = 0; i < this.$refs.tableSortAsc.length; i++) {
        this.$refs.tableSortAsc[i].style.opacity = 0.6;
        this.$refs.tableSortDesc[i].style.opacity = 0.6;
      }
      this.arrowSort.oElem.style.opacity = 1;
      this.sheetSearchTerm.sort = this.arrowSort.sort; //排序字段名称,
      this.sheetSearchTerm.order =  this.arrowSort.order; //asc或desc(升序或降序)
      this.pageNum = 1;
      this.pageMax =0;
      this.$refs.tableScroll.scrollTop = 0;
      this.firstShowLoading = true;
      this.getSheetData(null,null,'reload');
    },
    /**搜索 */
    termSearch(){
      this.pageNum=1;
      this.pageMax =0;
      this.getSheetData('','search');
      this.$refs.tableScroll.scrollTop = 0;
      this.sortFlag = true;
      this.firstShowLoading = true;
    },
    //计算表格高度
    reckonHg(){
    	let headSearchH = 0;
			if(this.$refs.searchCondition){
				headSearchH = this.$refs.searchCondition.offsetHeight;
			}
      let h =	window.innerHeight ||	document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.tableScroll.style.height = h - 210 - headSearchH +'px';
    },
  /**重置数据 */
   resetDate(){

    Object.assign(this.$data, this.$options.data());
    var _this = this;
    /* this.sendParams.projectId=this.$store.state.projectId;
    this.sendParams.investorId=this.$store.state.investorId; */
    this.changeFlag = false;
    var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(',');
    this.curSortArr = this.sortList['desc'];
    if(groupIdArr[0]==''&&groupIdArr[1]){
      this.groupId = groupIdArr[1];
    }else{
       this.groupId = groupIdArr[0];
    }
      //console.log(_this.$options.data());
   },
   /**是否需要再次请求初始数据*/
   getSheetIfRefresh(callback){
     var _this = this;
     this.$http.post('/api/xlsUpdateData/getSheetIfRefresh',{
          sheetName: _this.sheetName
     }).then(function(res){
        if(res.data){
          _this.resetDate();
          _this.getSheetData();
        }
     }).catch(function(err){
       _this.$messageError(err);
     })
   },
  },
  watch: {
       tableRows: {
         handler: function(newD, oldD) {
           this.tableRows = newD;
         },
         deep: true
       },
    sheetNameBool(newD, oldD) {
      var _this = this;
      if(this.curSheetName!=this.sheetName||this.sheetName.indexOf('汇总')>-1) return;
      console.log('跟新了');
      //如果是股权投资的话是需要刷新的
      if (newD && this.changeFlag) {
        this.changeFlag = false;
        this.getSheetData();
        this.reckonHg();

      }else{
        //需要判断是否有人修改过科目，如果有修改的话则需要刷新页面，重置页面数据
         this.getSheetIfRefresh();
         this.reckonHg();
         //console.log('点击了哟');
      }
    },
    nums:{
        handler: function(newD, oldD) {
            this.changeFlag = true;
        },
        deep: true
    },
    "scrollTop"(newD,oldD){
    	var _this=this;
       
    }
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.isWarning{background: #f03131}

.isFixedWid{width:1300px}
.arrow-up {
  width: 0;
  border: 6px solid transparent;
  border-bottom: 6px solid #ebeef5;
  position: relative;
  left: 11px;
  top: -24px;
}
.arrow-up.last {
  left: 196px;
}
.arrow-up::after {
  position: absolute;
  content: "";
  top: 17px;
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
  padding:0 5px;
}
.table80-wrap {
  position: relative;
  height: 100%;
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
    overflow-y: auto;
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
        line-height: 20px;
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
          height:100%;
          .cell {
            font-size: 14px;
            padding:3px 5px;
            box-sizing:border-box;
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
                   .el-input__inner{background: #ededed !important;}
                  &.el-input--suffix{
                    // .el-input__inner{background: none !important;}
                  }
              }
              &.isMarked{
                  .el-input__inner{background:yellow !important;}
                   &.el-input--suffix{
                     .el-input__inner{background:yellow !important;}
                  }
                }
               &.isPasted{
                 .el-input__inner{background: #e0ffe9!important;}
                 &.el-input--suffix{
                     .el-input__inner{background: #e0ffe9!important;}
                  }
               }
            }
            /deep/ .el-select{
               &.isMarked .el-input .el-input__inner{background:yellow !important;}
            }
             /deep/ .el-select{
               &.isPasted .el-input .el-input__inner{background: #e0ffe9!important;}
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
        .cellNums{
          display: inline-block;
          padding: 0 3px;
          /deep/ .el-input-number--small{
              width: 50px;
          }
          /deep/ .el-input-number.is-controls-right .el-input-number__decrease,/deep/ .el-input-number.is-controls-right .el-input-number__increase{
            width: 16px;
            border:none;
            background: none;
            .el-icon-arrow-up:before{
              content: "\E60C"
            }
            .el-icon-arrow-down:before{
              content: "\E60B"
            }
          }
        }
      }
      li:hover {
        background: #EBEEF2;
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
.tableBody /deep/ .el-input__icon{height: 20px !important; line-height: 20px !important; color: #C0C0C0;
}
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
.wrap-table-fixed{position:absolute;left:0;top:0;box-shadow: 0 -1px 8px rgba(0,0,0,.08);z-index:1;background:#fff;overflow: hidden;
  .cell .el-input .el-input__inner{height: 20px !important;padding: 0 5px !important;}
  .wrap-table-body{&::-webkit-scrollbar{  display: none; }
    -ms-overflow-style: none;
    width: calc(100% + 20px);
  }

}
.table-footer{position:relative;
  .fixed-table-taotal{position:absolute !important;left:0;top:0;box-shadow: 0 -1px 8px rgba(0,0,0,.08);z-index:1;background:#fff;}
}
/deep/ .el-select{width:100%;}
 .fixed-wid-table{width:100px;}
//去除disabled样式
.checkedBG{
  /deep/ .el-input.is-disabled .el-input__inner{
    cursor: pointer;
    color:#262628;
  }
}
</style>
