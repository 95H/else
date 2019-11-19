<template>
  <div class="data-quote-wrapper">
    <div class="quote-wrapper">
      <div class="tab-wrapper">
        <ul class="tab clear top">
          <li class="el-icon-tickets icon tabItem icon-xiangmuxinxi iconfont"></li>
          <li
            class="tabItem"
            v-for="(item, index) in tabList"
            :key="index"
            @click="checkTab(item, index)"
            :class="{'activeTab': activeTab === item}"
          >{{item}}</li>
        </ul>
        <span class="search-btn quoteBtn" v-if="activeTab==='数据列表'" @click="confirmQuote()">确认引用</span>
        <span
          class="search-btn quoteBtn"
          v-if="activeTab==='引用结果'&&isShowQuoteResults"
          @click="removeQuote()"
        >确认移出</span>
      </div>
      <div
        class="assetBased-table"
        v-for="(item,index) in tabArr"
        :key="index"
        v-if="tabArr.length>0&&item.name==curTableName"
      >
        <template v-show="parseInt(item.type)">
          <table-more
            ref="quoteTable"
            :tableHeader="tableData[item.type]"
            :curSheetName="item.name"
            :nums="nums"
            :sheetNameBool="item.name==curTableName"
            :tableBodyData="tableCacheData[item.name]"
            :sheetName="curTableName"
            :firstLoad="true"
          ></table-more>
        </template>
      </div>

      <div class="assetBased-foot" v-if="tabArr.length>0">
        <scroll-tab
          :tabArr="tabArr"
          :isSelectM="true"
          :width="width"
          @tabClick="tabClick"
          ref="scrollTab"
          :isFullPart="false"
        ></scroll-tab>
      </div>
    </div>
  </div>
</template>

<script>
import tableMore from "@/page/fullPageModule/incomeLaw/dataQuote/quoteTable";
import scrollTab from "@/components/scrollTab2.vue";
import tableDataJson from "@/page/fullPageModule/tableJson.js";
import tableSummaryJson from "@/page/fullPageModule/tableSummaryJson.js";
var that;
export default {
  components: { tableMore, scrollTab },
  data() {
    return {
      //tableHeader:[],
      //tabArr: tableDataJson.dataSurface,//tab的列表
      tabList: ["数据列表", "引用结果"],
      activeTab: "数据列表",
      nums: 0,
      tabArr: [],
      width: "100%",
      curTableName: "", //当前显示的table的
      tableData: "", //所有的列表数据
      tableLoadObj: {}, //所有表格加载的状态tab切换的时候不需要再次加载数据
      tableCacheData: {}, //表格的数据
      tableRows: [],
      // 汇总 =====================================================================
      sortsummary: {
        classOptions: "",
        flowsummaryspecial: false,
        summarytablespecial: false,
        fixedassetsspecial: false,
        rangeNumber: "",
        tableData: [],
        taxonomySumBotmData: [],
        theadData: []
      },
      balanceSheetRefresh: false, //余额表刷新
      dialogVisible: false, //导入弹窗
      importDeclarationFormVisible: false,
      //文件导入
      loading: false,
      fileList: [],
      uploadHeaders: {
        token: this.$getCookie("token")
      },
      uploadData: {
        investorId: "",
        projectId: ""
      },
      timer: "",
      loadTxt: "",
      stausFlag: false,
      CancelToken: "",
      cancel: "",
      fullData: [], //全部数据
      groupId: "",
      actived: 0,
      statisticHeight: window.screen.availHeight - 230,
      statisticJson: [], //“统计计算”数据展示
      firstLoadSheet: false, //页面第一次加载
      //项目综合信息展示
      projectInfoData: {},
      activeKey: "", //用于判断选中
      isShowQuoteResults: true //显示
    };
  },
  created() {
    var _this = this;
    that = this;
    this.CancelToken = this.$http.CancelToken;
    //处理投资性房地产的固定列
    var houseEstateArr = tableDataJson.tableHead["27"];
    for (var i = 0; i < houseEstateArr.length; i++) {
      for (var item in houseEstateArr[i]) {
        if (
          item != "operation" &&
          item != "check" &&
          item != "numB" &&
          item != "ruleType" &&
          item != "B"
        ) {
          houseEstateArr[i][item]["fixed"] = false;
        }
      }
    }
    this.tableData = tableDataJson.tableHead;

    this.getGroupId();
    // this.curTableName = tableDataJson.dataSurface[0].name;//默认显示第一个
    this.tableLoadObj[this.curTableName] = true;
    //千分位转换
    // this.$store.state.commafyNumber = function(nums) {
    //   if (isNaN(nums) || nums == "") return nums;
    //   var digit = Number(nums).toFixed(2);
    //   return digit.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
    // };
    this.$store.state.qutoTab = this.activeTab;
    this.$store.state.olreadyOperation = false; //是否操作过移入移除
    this.getSheet();
  },
  mounted() {
    var _this = this;
    if (this.$store.state.quoteObj.type == "长投") {
      this.isShowQuoteResults = false;
      this.tabList = ["数据列表"];
    } else {
      this.isShowQuoteResults = true;
    }
    //解决火狐下的问题
    $(".income-task").hide();
  },
  methods: {
    checkTab(item, index) {
      if (this.activeTab == item) return;
      this.activeTab = item;
      this.$store.state.qutoTab = this.activeTab;
      //this.$refs.quoteTable[0].resetPageData();
      this.$refs.quoteTable[0].$refs.tableFoot.scrollLeft = 0;
      this.$refs.quoteTable[0].resetDate();
      this.$refs.quoteTable[0].resetPageData();
      this.$refs.quoteTable[0].getSheetData();
      this.$nextTick(() => {
        this.$refs.quoteTable[0].reckonHg();
      });
    },

    reloadPage() {
      that.loadText = "";
      that.loading = false;
      // clearInterval(that.timer);
      // that.timer='';
      that.firstLoadSheet = false;
      if (typeof that.cancel === "function") {
        // 取消请求
        that.cancel();
      }
      that.$store.state.hierarchy = false;
      that.getUploadStatu(function() {
        that.loading = false;
        that.getSheet(null);
        that.sortsummary.classOptions = "";
        that.nums++;
        setTimeout(function() {
          that.$store.state.hierarchy = false;
        }, 403);
      }, "inspect");

      if (that.$refs.scrollTab) {
        that.$refs.scrollTab.radio = "1";
        that.$refs.scrollTab.searchVal = "";
        that.$refs.scrollTab.initMarginLeft();
      }
    },
    /**确认引用 */
    confirmQuote() {
      this.$refs.quoteTable[0].confirmQuote();
    },
    /**确认移除 */
    removeQuote() {
      this.$refs.quoteTable[0].removeQuote();
    },
    getGroupId() {
      var groupIdArr = JSON.parse(this.$getCookie("user")).groupIds.split(",");
      var groupId = "";
      if (groupIdArr[0] == "" && groupIdArr[1]) {
        groupId = groupIdArr[1];
      } else {
        groupId = groupIdArr[0];
      }
      this.groupId = groupId;
      //localStorage.setItem("sheet_groupId",groupId);
    },
    /*加载动画的文案 */
    getLoadingText(type) {
      that.loading = true;
      that.loadTxt = " ";
      var text = "";
      if (
        type == "upload" ||
        type == "初次导入中" ||
        type == "部分导入中" ||
        !type
      ) {
        text =
          '<p class = "loading-head-text">正在导入...</p>大约需要2分钟，您可操作其他页面<br/><p class="loading-head-text loading-content">亲，先去忙别的工作吧~</p>';
      } else {
        text =
          "当前页面正在" +
          type +
          "，完成后才可操作哦~<br/>亲，先去操作其他页面吧~";
      }
      that.$parent.$parent.uploadFlag = false;
      that.$parent.$parent.navPosition = 0;
      that.$parent.$parent.showNav();
      setTimeout(() => {
        that.$store.state.hierarchy = false;
      }, 401);
      setTimeout(function() {
        var oLoading = document.querySelector(".el-loading-text");
        oLoading.innerHTML = text;
      }, 100);
    },

    //关闭弹出的回调
    importOpenClose(done) {
      var _this = this;
      if (this.balanceSheetRefresh) {
        this.getSheet(function() {
          _this.balanceSheetRefresh = false;
          _this.nums++;
          done();
        });
      } else {
        done();
      }
    },
    //文件成功之后
    getSheet(callback, type) {
      var tableTabName = tableDataJson.dataSurface;
      var _this = this,
        selectItem = null;
      var curQuoteInfo = _this.$store.state.quoteObj;
      _this.curTableName = "";
      _this.tabArr = [];
      var obj = {};
      for (var i = 0; i < tableTabName.length; i++) {
        if (tableTabName[i].name == curQuoteInfo.curQuoteName) {
          obj.name = tableTabName[i].name;
          obj.type = tableTabName[i].type;
        }
      }
      if (tableTabName == "") {
      }
      _this.tabArr.push(obj);
      _this.fullData = _this.tabArr;
      _this.tabClick(_this.tabArr[0]);
      _this.curTableName = _this.tabArr[0].name;
      _this.$store.state.curSheetName = _this.curTableName;
      _this.$store.state.tipsFlag = false; // 请求完成后将值重置
      return;
    },
    /**默认展示第一条数据 */
    showFirstData() {
      var _this = this;
      for (var i = 0; i < _this.tabArr.length; i++) {
        if (_this.tabArr[i].status == 1) {
          _this.$refs.scrollTab.initMarginLeft();
          _this.$refs.scrollTab.active = i;
          if (_this.tabArr[i].name == _this.curTableName) return;
          _this.tabClick(_this.tabArr[i]);
          _this.curTableName = _this.tabArr[i].name;
          _this.$store.state.curSheetName = _this.curTableName;
          break;
        }
      }
    },
    getUnChecked() {
      var hideSheetNames = "";
      for (var i = 0; i < this.tabArr.length; i++) {
        if (!this.tabArr[i].isChecked) {
          hideSheetNames += this.tabArr[i].name + ",";
        }
      }
      hideSheetNames = hideSheetNames.substring(0, hideSheetNames.length - 1);
      return hideSheetNames;
    },
    //处理选中
    //0表示隐藏 值为 1 表示显示
    checkedSheet(item, idx) {
      console.log(item);
      //需要获取当前没有被勾选的科目
      var hideSheetNames = this.getUnChecked();
      var _this = this;
      var haveNextItem = false;
      console.log(hideSheetNames);
      //勾选
      if (item.isChecked) {
        _this.setSheetState(hideSheetNames, function() {
          _this.tabArr[idx].status = 1;
        });
      } else {
        //去掉勾选的操作
        //如果去掉勾选的科目是当前显示的科目
        if (item.name == this.$store.state.curSheetName) {
          for (var i = idx + 1; i < _this.tabArr.length; i++) {
            if (this.tabArr[i] && this.tabArr[i].status == 1) {
              this.setSheetState(hideSheetNames, function() {
                _this.tabArr[idx].status = 0;
                _this.$refs.scrollTab.setTab(_this.tabArr[i]);
              });
              haveNextItem = true;
              break;
            }
          }

          if (!haveNextItem) {
            for (var i = idx - 1; i < _this.tabArr.length; i--) {
              if (this.tabArr[i] && this.tabArr[i].status == 1) {
                this.setSheetState(hideSheetNames, function() {
                  _this.tabArr[idx].status = 0;
                  _this.$refs.scrollTab.setTab(_this.tabArr[i]);
                  //_this.$refs.scrollTab.tabClick(_this.tabArr[i],i);
                });
                break;
              }
            }
          }
        } else {
          _this.setSheetState(hideSheetNames, function() {
            _this.tabArr[idx].status = 0;
            for (var i = 0; i < _this.tabArr.length; i++) {
              if (_this.tabArr[i].name == _this.$store.state.curSheetName) {
                _this.$refs.scrollTab.setTab(_this.tabArr[i], "onlyScroll");
                break;
              }
            }
          });
        }
      }
    },
    /**展示全部 */
    showAll() {
      //需要默认展示第一条数据
      var _this = this;
      this.tabArr = this.fullData;
      this.$refs.scrollTab.active = 0;
      if (this.tabArr[0].name == this.curTableName) return;
      this.tabClick(_this.tabArr[0]);
      this.curTableName = this.tabArr[0].name;
      this.$store.state.curSheetName = this.curTableName;
      this.curTableName = this.tabArr[0].name;
      _this.$refs.scrollTab.initMarginLeft();
    },
    /*保证页面有一条数据勾选 */
    ensurePageCheck(flag) {
      if (!flag) {
        this.$set(this.tabArr[0], "isChecked", true);
        this.$set(this.tabArr[0], "status", 1);
        var hideSheetNames = this.getUnChecked();
        this.setSheetState(hideSheetNames);
      }
    },
    updateSheetState(name, count) {
      var idx = 0;
      for (var i = 0; i < this.tabArr.length; i++) {
        if (this.tabArr[i].name == name) {
          // this.tabArr[i].count = count;
          this.$set(this.tabArr[i], "count", count);
          idx = i;
        }
      }
      //需要判断tab是不是2
      if (this.$refs.scrollTab.radio == "2" && count == 0) {
        //this.tabArr[idx].isChecked = false;
        // this.$set(this.tabArr[idx],'isChecked',false);
        this.showPart();
      }
    },
    setSheetState(hideSheetNames, callBack) {
      var _this = this;
      this.$http
        .post("/api/xlsUpdateData/setSheetState", {
          projectId: _this.uploadData.projectId,
          investorId: _this.uploadData.investorId,
          hideSheetNames: hideSheetNames //未勾选的科目
        })
        .then(function(res) {
          if (res.data) {
            callBack && callBack();
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
      //callBack&&callBack();
    },
    /**重置 */
    reset() {
      var _this = this;
      this.$refs.scrollTab.isRefresh = true;
      if (this.$refs.scrollTab.radio == 3) {
        this.setSheetState("", function() {
          for (var i = 0; i < _this.tabArr.length; i++) {
            _this.$refs.scrollTab.isRefresh = false;
            _this.$set(_this.tabArr[i], "isChecked", true);
            _this.$set(_this.tabArr[i], "status", 1);
          }
          _this.showFirstData();
        });
      } else {
        this.setSheetState("", function() {
          for (var i = 0; i < _this.tabArr.length; i++) {
            if (_this.tabArr[i].count > 0) {
              _this.$refs.scrollTab.isRefresh = false;
              _this.$set(_this.tabArr[i], "isChecked", true);
              _this.$set(_this.tabArr[i], "status", 1);
            }
          }
          _this.showFirstData();
        });
      }
    },
    tabClick(val) {
      /* //切换科目的时候需要判断状态  that.firstLoadSheet
        if(that.firstLoadSheet){
          that.getUploadStatu(function(){
            that.changeTabSheet(val);
          },'ack')
          return;
        }*/
      that.firstLoadSheet = true;
      this.activeTab = "数据列表";
      that.changeTabSheet(val);
    },
    changeTabSheet(val) {
      //如果tab项已经加载过数据的话则不需要再次加载了
      this.curTableName = val.name; //当前切换的tab名称
      this.$store.state.curSheetName = val.name;
      this.$store.state.moduleChildId = val.name;
      // 统计计算查询接口
      if (val.name == "统计计算") {
        //统计计算
        this.$http
          .post("/api/reportRelation/findSpecialFieldList", {
            projectId: this.$store.state.projectId,
            investorId: this.$store.state.investorId
          })
          .then(res => {
            this.statisticJson = res.data;
            console.log(this.statisticJson);
          })
          .catch(err => {
            this.$messageError(err);
          });
      } else if (val.name == "项目综合信息") {
        this.$http
          .post("api/reportRelation/findProjectInfoList", {
            projectId: this.$store.state.projectId,
            investorId: /openRelationDetail/.test(this.$route.path)
              ? this.$route.query.investorId
              : this.$store.state.investorId
          })
          .then(res => {
            this.projectInfoData = res.data;
          })
          .catch(err => {
            this.$messageError(err);
          });
      } else if (!val.type) {
        that.summaryMethod(1, val.name);
      }
      if (this.tableLoadObj[val.name]) return;
      this.tableLoadObj[val.name] = true;
    },
    summaryMethod(investorId, sheetName) {
      // 汇总调用接口
      let data = {
        //this.uploadData.investorId
        investor_id: that.uploadData.investorId,
        sheet_name: sheetName,
        project_id: that.uploadData.projectId || that.$route.query.projectId
      };
      this.$http
        .post("/api/xls/summary/data_get", data)
        .then(res => {
          // res.data.length=0;
          var flag = res.data.length;
          that.matchTable(sheetName);
          that.sumONDataTableFn(sheetName, flag, res);
          that.setTableData(sheetName);
          // that.sortsummary.tableData = res.data;
          //that.sortsummary.taxonomySumBotmData=tableSummaryJson.taxonomySumBotmData;
        })
        .catch(err => {
          that.matchTable(sheetName);
          that.sumONDataTableFn(sheetName, null, null);
          that.$messageError(err);
          console.log(err);
        });
    },
    //减值数据处理
    setTableData(sheetName) {
      var _this = this;
      switch (sheetName) {
        case "存货汇总":
        case "固定资产汇总":
        case "在建工程汇总":
        case "可供出售金融资产汇总":
        case "无形资产汇总":
          for (var i = 0; i < this.sortsummary.tableData.length; i++) {
            var isEdit = false,
              arr = [];
            for (var key in this.sortsummary.tableData[i]) {
              if (isEdit) {
                arr.push(key);
              } else {
                if (
                  typeof this.sortsummary.tableData[i][key] === "string" &&
                  this.sortsummary.tableData[i][key].indexOf("减：") != -1
                ) {
                  isEdit = true;
                }
              }
            }
            this.sortsummary.tableData[i].isEditJ = arr;
          }
          break;
      }
    },
    /*匹配表格 */
    matchTable(sheetName) {
      that.sortsummary.flowsummaryspecial = false;
      that.sortsummary.fixedassetsspecial = false;
      that.sortsummary.summarytablespecial = false;
      if (sheetName == "分类汇总") {
        // 完成
        this.sortsummary.classOptions = "sortsummary";
        this.sortsummary.rangeNumber = "A-L";
      } else if (sheetName == "流动汇总") {
        this.sortsummary.classOptions = "flowsummary";
        this.sortsummary.rangeNumber = "A-I";
        this.sortsummary.flowsummaryspecial = true;
      } else if (sheetName == "汇总表") {
        this.sortsummary.classOptions = "summarytable";
        this.sortsummary.rangeNumber = "A-G";
        this.sortsummary.summarytablespecial = true;
      } else if (sheetName == "交易性金融资产汇总") {
        this.sortsummary.classOptions = "flowsummary";
        this.sortsummary.rangeNumber = "A-G";
      } else if (sheetName == "存货汇总") {
        // 完成
        this.sortsummary.classOptions = "inventorysummary";
        this.sortsummary.rangeNumber = "A-G";
      } else if (sheetName == "非流动资产汇总") {
        // 完成
        this.sortsummary.classOptions = "unCurrentAssets";
        this.sortsummary.rangeNumber = "A-G";
      } else if (sheetName == "可供出售金融资产汇总") {
        // 完成
        this.sortsummary.classOptions = "financialAssets";
        this.sortsummary.rangeNumber = "A-H";
      } else if (sheetName == "固定资产汇总") {
        this.sortsummary.classOptions = "fixedAssets";
        this.sortsummary.rangeNumber = "A-L";
        this.sortsummary.fixedassetsspecial = true;
      } else if (sheetName == "在建工程汇总") {
        this.sortsummary.classOptions = "buildProject";
        this.sortsummary.rangeNumber = "A-G";
      } else if (sheetName == "无形资产汇总") {
        // 完成
        this.sortsummary.classOptions = "intangibleAssets";
        this.sortsummary.rangeNumber = "A-G";
      } else if (sheetName == "流动负债汇总") {
        // 完成
        this.sortsummary.classOptions = "currentLiabilities";
        this.sortsummary.rangeNumber = "A-G";
      } else if (sheetName == "非流动负债汇总") {
        this.sortsummary.classOptions = "unCurrentLiabilities";
        this.sortsummary.rangeNumber = "A-G";
      }
    },
    sumONDataTableFn(sheetName, flag, res) {
      that.sortsummary.theadData = [];

      for (var i = 0; i < tableSummaryJson.dataSurface.length; i++) {
        if (sheetName == tableSummaryJson.dataSurface[i].name) {
          if (flag <= 0) {
            that.sortsummary.tableData =
              tableSummaryJson.tableData[
                tableSummaryJson.dataSurface[i].sumType
              ];
            //that.sortsummary.tableData.splice(0,1);
          }
          that.sortsummary.theadData =
            tableSummaryJson.tableData[tableSummaryJson.dataSurface[i].sumType]; //表头

          //console.log(that.sortsummary.theadData);
        }
      }
      if (flag > 0) {
        //如果是分类汇总的话需要增加可以编辑的选项 isEdit
        if (sheetName == "分类汇总") {
          for (var j = 0; j < res.data.length; j++) {
            if (54 < j && j < 71) {
              res.data[j].isEdit = true;
            }
          }
        }
        that.sortsummary.tableData = res.data;
      }
      //处理千分列
      var cloumArr = [];

      var tableHeadObj = that.sortsummary.theadData[0];
      for (var item in tableHeadObj) {
        if (item == "thousandColumn") {
          cloumArr = tableHeadObj[item].split(";");
        }
      }

      for (var i = 0; i < that.sortsummary.tableData.length; i++) {
        for (var item in tableHeadObj) {
          if (cloumArr.indexOf(item) > -1) {
            that.sortsummary.tableData[i][
              item
            ] = this.$store.state.commafyNumber(
              that.sortsummary.tableData[i][item]
            );
          }
        }
      }
      this.sortsummary.taxonomySumBotmData =
        tableSummaryJson.taxonomySumBotmData;
    },

    /** */
    sendConnect() {
      this.$http.post(
        "/api/initializationContentController/savaOrUpdateContent",
        {
          projectId: that.uploadData.projectId,
          investorId: that.uploadData.investorId,
          showLoading: false
        }
      );
    }
  },
  beforeDestroy() {
    $(".income-task").show();
    if (typeof that.cancel === "function") {
      // 取消请求
      that.cancel();
    }
    clearInterval(that.timer);
    this.timer = "";
    this.$store.state.quoteObj.getBaseSheetData();
    //需要调用刷新列表方法
    // if (this.$store.state.olreadyOperation) {
    //   this.$store.state.quoteObj.getBaseSheetData();
      //  if(this.$store.state.quoteObj.type=='溢余'){
      //   this.$store.state.quoteObj.getBaseSheetData();
      //   // alert('更新溢余列表')
      //  }else{
      //   this.$store.state.quoteObj.getBaseSheetData();
      //     // alert('更新长投列表')
      //  }
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.data-quote-wrapper {
  padding: 10px;
  position: relative;
  .quote-wrapper {
    border: 1px solid #ececec;
  }
  .tab-wrapper {
    background-color: #fafafa;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding-right: 10px;
    border-bottom: 1px solid rgba(236, 236, 236, 1);
    .tab {
      // height: 100%;
      // line-height: 35px;
      height: 35px;
      // background: #fafafa;
      border-radius: 2px 2px 0px 0px;
      // border: 1px solid rgba(236, 236, 236, 1);
      border-left: 0;
      border-right: 0;
      line-height: 35px;
      .tabItem {
        font-size: 13px;
        margin-left: 15px;
        cursor: pointer;
        float: left;
        height: 100%;
        line-height: 33px;
        &:hover {
          color: #145fd2;
        }
      }
      .icon.tabItem {
        &:hover {
          color: #f7b543;
        }
      }
      .activeTab {
        color: #145fd2;
        border-bottom: 2px solid #145fd2;
      }
    }

    .quoteBtn {
      margin-right: 10px;
    }
  }

  /deep/ .el-icon-tickets {
    color: #f7b543;
    font-size: 15px !important;
  }
}
.assetBased-table {
  padding: 0 10px;
}
/deep/ .assetBased-foot {
  padding: 0 10px;
  padding-bottom: 10px;
}
</style>
