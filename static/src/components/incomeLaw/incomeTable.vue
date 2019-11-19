<template>
  <div class="incomeTable">
    <div class="wrap-table" ref="tableWrap" :class="{visibilityH:loadShow}">
      <div class="wrap-table-head" ref="tableHead">
        <table>
          <thead>
            <tr>
              <th v-for="(tableH,tableHeadKey) in tableHead" :key="tableHeadKey">
                <div
                  class="cell"
                  :style="{width:checkList.tablesWidth[tableHeadKey]?checkList.tablesWidth[tableHeadKey]+'px':'200px'}"
                >{{tableH}}</div>
              </th> 
            </tr>
          </thead>
        </table>
      </div>
      <div
        class="wrap-table-body"
        ref="tableScroll"
        @scroll="scrollFun"
        @contextmenu.prevent="contextmenuShowBody($event)"
      >
        <table>
          <tbody v-if="refreshTrInd">
            <tr
              v-for="(tableD,tableDInd) in tableData"
              :key="tableDInd"
              :data-tableInd="tableDInd"
              @contextmenu.prevent="contextmenuShow($event)"
            >
              <td
                v-for="(tableH,tableHeadKey) in tableHead"
                :key="tableHeadKey"
                :data-td="tableHeadKey"
                :rowspan="rowspanFun(tableD,tableDInd,tableHeadKey)"
                v-if="rowspanFun(tableD,tableDInd,tableHeadKey,true)"
                :class="[checkList.noEditor.indexOf('A')!=-1 && isNaN(tableD.A) && tableD.A.length>16?'towRow':'',checkList.alignLeft.indexOf(tableHeadKey)!=-1?'alignLeft':'']"
              >
                <div
                  class="cell"
                  v-if="checkList.noEditor.indexOf(tableHeadKey)===-1 && tableD.disableColumns.split(',').indexOf(tableHeadKey)===-1"
                  :style="{width:checkList.tablesWidth[tableHeadKey]?checkList.tablesWidth[tableHeadKey]+'px':'200px'}"
                >
                  <el-input
                    v-if="tableD.dataFormatType.split(',').indexOf(tableHeadKey)!=-1"
                    :value="$store.state.commafyNumber($accMul(tableD[tableHeadKey],100))"
                    :title="$store.state.commafyNumber($accMul(tableD[tableHeadKey],100))"
                    :class="{h100:rowspanFun(tableD,tableDInd,tableHeadKey)>1?true:false}"
                    :style="{height:rowspanFun(tableD,tableDInd,tableHeadKey)>1?21*rowspanFun(tableD,tableDInd,tableHeadKey)-3+'px':''}"
                    :disabled="!$store.state.readonly"
                    @blur="inputBlurFun($event,tableD,tableHeadKey,tableDInd)"
                    @focus="inputFocusFun($event,tableD,tableHeadKey,tableDInd)"
                    @paste.native.capture.prevent="pasteFromExcel($event,tableD,tableHeadKey,tableDInd)"
                  ></el-input>
                  <el-input
                    v-else-if="checkList.permilArr.indexOf(tableHeadKey)===-1 && draftColumnKeys.indexOf(tableHeadKey)===-1"
                    :value="$store.state.commafyNumber(tableD[tableHeadKey],4)"
                    :title="$store.state.commafyNumber(tableD[tableHeadKey],4)"
                    :class="{h100:rowspanFun(tableD,tableDInd,tableHeadKey)>1?true:false}"
                    :style="{height:rowspanFun(tableD,tableDInd,tableHeadKey)>1?21*rowspanFun(tableD,tableDInd,tableHeadKey)-3+'px':''}"
                    :disabled="!$store.state.readonly"
                    @blur="inputBlurFun($event,tableD,tableHeadKey,tableDInd)"
                    @focus="inputFocusFun($event,tableD,tableHeadKey,tableDInd)"
                    @paste.native.capture.prevent="pasteFromExcel($event,tableD,tableHeadKey,tableDInd)"
                  ></el-input>
                  <el-input
                    v-else
                    :value="tableD[tableHeadKey]"
                    :title="tableD[tableHeadKey]"
                    :class="{h100:rowspanFun(tableD,tableDInd,tableHeadKey)>1?true:false}"
                    :style="{height:rowspanFun(tableD,tableDInd,tableHeadKey)>1?21*rowspanFun(tableD,tableDInd,tableHeadKey)-3+'px':''}"
                    :disabled="!$store.state.readonly"
                    @blur="inputBlurFun($event,tableD,tableHeadKey,tableDInd)"
                    @focus="inputFocusFun($event,tableD,tableHeadKey,tableDInd)"
                    @paste.native.capture.prevent="pasteFromExcel($event,tableD,tableHeadKey,tableDInd)"
                  ></el-input>
                </div>
                <div
                  class="cell"
                  :class="{noEditorBG:tableD.disableColumns.split(',').indexOf(tableHeadKey)!=-1}"
                  @click.stop="showFormula($event,tableD,tableHeadKey,tableDInd)"
                  :style="{width:checkList.tablesWidth[tableHeadKey]?checkList.tablesWidth[tableHeadKey]+'px':'200px'}"
                  v-else
                >
                  <span
                    v-if="tableD.dataFormatType.split(',').indexOf(tableHeadKey)!=-1"
                  >{{$store.state.commafyNumber($accMul(tableD[tableHeadKey],100))}}</span>
                  <span
                    v-else-if="checkList.permilArr.indexOf(tableHeadKey)===-1"
                  >{{$store.state.commafyNumber(tableD[tableHeadKey],4)}}</span>

                  <span v-else>{{tableD[tableHeadKey]}}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 小汽泡 -->
        <div class="outBox" ref="outBox" v-show="outBoxShow">
          <div class="dialog-box">
            <span class="bot" ref="bot"></span>
            {{outBoxContent}}
          </div>
        </div>
        <div class="wrap-table-body-fixed" ref="tableFixedBody">
          <table>
            <tbody>
              <tr
                v-for="(tableD,tableDInd) in tableData"
                :key="tableDInd"
                :data-tableInd="tableDInd"
                @contextmenu.prevent="contextmenuShow"
              >
                <td
                  v-for="(tableH,tableHeadKey) in tableHead"
                  :key="tableHeadKey"
                  :data-td="tableHeadKey"
                  :rowspan="rowspanFun(tableD,tableDInd,tableHeadKey)"
                  v-if="rowspanFun(tableD,tableDInd,tableHeadKey,true) && checkList.floatLeft.indexOf(tableHeadKey)!=-1"
                  :class="{alignLeft:checkList.alignLeft.indexOf(tableHeadKey)!=-1}"
                >
                  <div
                    class="cell"
                    v-if="checkList.noEditor.indexOf(tableHeadKey)===-1 && tableD.disableColumns.split(',').indexOf(tableHeadKey)===-1"
                    :style="{width:checkList.tablesWidth[tableHeadKey]?checkList.tablesWidth[tableHeadKey]+'px':'200px'}"
                  >
                    <el-input
                      v-if="tableD.dataFormatType.split(',').indexOf(tableHeadKey)!=-1"
                      :value="$store.state.commafyNumber($accMul(tableD[tableHeadKey],100))"
                      :title="$store.state.commafyNumber($accMul(tableD[tableHeadKey],100))"
                      :class="{h100:rowspanFun(tableD,tableDInd,tableHeadKey)>1?true:false}"
                      :style="{height:rowspanFun(tableD,tableDInd,tableHeadKey)>1?21*rowspanFun(tableD,tableDInd,tableHeadKey)-3+'px':''}"
                      :disabled="!$store.state.readonly"
                      @blur="inputBlurFun($event,tableD,tableHeadKey,tableDInd)"
                      @focus="inputFocusFun($event,tableD,tableHeadKey,tableDInd)"
                      @paste.native.capture.prevent="pasteFromExcel($event,tableD,tableHeadKey,tableDInd)"
                    ></el-input>
                    <el-input
                      v-else-if="checkList.permilArr.indexOf(tableHeadKey)===-1 && draftColumnKeys.indexOf(tableHeadKey)===-1"
                      :value="$store.state.commafyNumber(tableD[tableHeadKey],4)"
                      :title="$store.state.commafyNumber(tableD[tableHeadKey],4)"
                      :class="{h100:rowspanFun(tableD,tableDInd,tableHeadKey)>1?true:false}"
                      :style="{height:rowspanFun(tableD,tableDInd,tableHeadKey)>1?21*rowspanFun(tableD,tableDInd,tableHeadKey)-3+'px':''}"
                      :disabled="!$store.state.readonly"
                      @blur="inputBlurFun($event,tableD,tableHeadKey,tableDInd)"
                      @focus="inputFocusFun($event,tableD,tableHeadKey,tableDInd)"
                      @paste.native.capture.prevent="pasteFromExcel($event,tableD,tableHeadKey,tableDInd)"
                    ></el-input>
                    <el-input
                      v-else
                      :value="tableD[tableHeadKey]"
                      :title="tableD[tableHeadKey]"
                      :class="{h100:rowspanFun(tableD,tableDInd,tableHeadKey)>1?true:false}"
                      :style="{height:rowspanFun(tableD,tableDInd,tableHeadKey)>1?21*rowspanFun(tableD,tableDInd,tableHeadKey)-3+'px':''}"
                      :disabled="!$store.state.readonly"
                      @blur="inputBlurFun($event,tableD,tableHeadKey,tableDInd)"
                      @focus="inputFocusFun($event,tableD,tableHeadKey,tableDInd)"
                      @paste.native.capture.prevent="pasteFromExcel($event,tableD,tableHeadKey,tableDInd)"
                    ></el-input>
                  </div>
                  <div
                    class="cell"
                    :class="headcolorFu(tableDInd,tableD[tableHeadKey],tableHeadKey)"
                    :style="{width:checkList.tablesWidth[tableHeadKey]?checkList.tablesWidth[tableHeadKey]+'px':'200px'}"
                    v-else
                  >
                    <span
                      v-if="checkList.permilArr.indexOf(tableHeadKey)===-1"
                    >{{$store.state.commafyNumber(tableD[tableHeadKey],4)}}</span>
                    <template v-else>
                      <span
                        v-if="tableHeadKey==='mergeCell' && (sheetName==='营业收支' || sheetName==='生产成本') && !(/(合计|总计|营业收支|其他业务收入){1}/g.test(tableD[tableHeadKey]))"
                      >
                        <span
                          class="changes"
                          @click="showDialog(tableD,tableDInd)"
                        >{{tableD[tableHeadKey]}}</span>
                        <div class="delete-project">
                          <div
                            v-if="$store.state.readonly"
                            @click="deleteProjectFun(tableD.xlsBaseId)"
                            class="Delet"
                          >
                            <i class="el-icon-delete fs40 gray"></i>
                          </div>
                        </div>
                      </span>
                      <span v-else-if="sheetName=='溢余'&&tableHeadKey=='A' && $store.state.readonly">
                        {{tableD[tableHeadKey]}}
                        <i
                          class="relation-icon"
                          @click="showAssetBased(tableD[tableHeadKey],tableD.id)"
                          v-if="quoteTableSheetObj[tableD[tableHeadKey]]"
                        ></i>
                      </span>
                      <span v-else>{{tableD[tableHeadKey]}}</span>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--固定列 begin-->
      <div class="wrap-table-fixed" ref="tableFixed">
        <div class="wrap-table-head">
          <table>
            <thead>
              <tr>
                <th
                  v-for="(tableH,tableHeadKey) in tableHead"
                  :key="tableHeadKey"
                  v-if="checkList.floatLeft.indexOf(tableHeadKey)!=-1"
                >
                  <div
                    class="cell"
                    :style="{width:checkList.tablesWidth[tableHeadKey]?checkList.tablesWidth[tableHeadKey]+'px':'200px'}"
                  >{{tableH}}</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <!--固定列 end-->
    </div>
    <!-- 添加产品按钮 -->
    <div
      class="add-project"
      ref="addProject"
      v-if="this.sheetName==='营业收支' || this.sheetName==='生产成本'"
    >
      <div class="add" v-if="$store.state.readonly" @click="addProjectFun">+添加</div>
    </div>
    <!-- 鼠标右键 -->
    <div class="contextmenu" ref="contextmenu" :class="{hidden:isHideMenu}">
      <ul>
        <li @contextmenu.prevent="delRow" v-if="isDelRow" @click="delRow">删除</li>
        <li @contextmenu.prevent="addRow" @click="addRow()">插入一行</li>
        <li @contextmenu.prevent="addRow" @click="addRow(true)">
          插入多行
          <span class="cellNums" @click.stop="cellNumsFun">
            <el-input-number
              v-model="cellNums"
              controls-position="right"
              size="small"
              :min="1"
              :max="99"
            ></el-input-number>
          </span>
        </li>
      </ul>
    </div>
    <!-- 点击修改弹框 -->
    <center-dialog
      ref="addCaseDialog"
      dialogWidth="400px"
      dialogHeight="180px"
      dialogTitle="项目命名"
      titlePosition="center"
    >
      <div class="text-center" slot="dialogContent">
        <el-form ref="addCaseForm" label-width="80px">
          <el-form-item label="项目名称：">
            <el-input :placeholder="entryName" maxlength="30" v-model="entryNames"></el-input>
          </el-form-item>
          <div class="margin0 text-center">
            <a href="javascript:;" class="search-btn" @click="addCaseFun">保存</a>
            <a href="javascript:;" class="reset-btn" @click="closeDialog">取消</a>
          </div>
        </el-form>
      </div>
    </center-dialog>
  </div>
</template>
<script>
import centerDialog from "@/components/centerDialog";
import { sortArr } from "@/components/incomeLaw/incomeTableData.js";
export default {
  props: ["checkList", "displayFormula", "sheetName", "checkedList"],
  data() {
    return {
      outBoxContent: "", //气泡内容
      outBoxShow: false, //小气泡
      isHideMenu: true, //右键模块
      tableHead: {},
      tableData: [],
      tableDataInitData: [],
      filterTableDataArr: [],
      alphabeticalOrder: sortArr,
      tabVal: "",
      cellNums: 1,
      headcolor: ["color1", "color2", "color3", "color4", "color5"],
      Headlist: {},
      genre: "",
      currentCell: "", //当前单元格的值,
      loadShow: false,
      cellDom: null, //公式显示
      abID: {}, //修改
      entryName: "", // 项目名称
      entryNames: "",
      loadDataFlag: false,
      //溢余科目
      quoteTableSheetObj: {
        应收票据: "应收票据",
        应收账款: "应收账款",
        预付款项: "预付账款",
        应收利息: "应收利息",
        应收股利: "应收股利(利润)",
        其他应收款: "其他应收款",
        一年内到期的非流动资产: "一年到期非流动资产",
        其他流动资产: "其他流动资产",
        持有至到期投资: "持有到期投资",
        长期应收款: "长期应收",
        长期股权投资: "股权投资",
        投资性房地产: "投资性房地产",
        工程物资: "工程物资",
        固定资产清理: "固定资产清理",
        生产性生物资产: "生产性生物资产",
        油气资产: "油气资产",
        开发支出: "开发支出",
        商誉: "商誉",
        长期待摊费用: "长期待摊费用",
        递延所得税资产: "递延所得税资产",
        其他非流动资产: "其他非流动资产",
        短期借款: "短期借款",
        交易性金融负债: "交易性金融负债",
        应付票据: "应付票据",
        应付账款: "应付账款",
        预收款项: "预收账款",
        应付职工薪酬: "职工薪酬",
        应交税费: "应交税费",
        应付利息: "应付利息",
        应付股利: "应付股利(利润)",
        其他应付款: "其他应付款",
        一年内到期的非流动负债: "一年到期非流动负债",
        其他流动负债: "其他流动负债",
        长期借款: "长期借款",
        应付债券: "应付债券",
        长期应付款: "长期应付款",
        专项应付款: "专项应付款",
        预计负债: "预计负债",
        递延所得税负债: "递延所得税负债",
        其他非流动负债: "其他非流动负债"
      },
      isDelRow: true,
      draftColumnKeys: [] ,//草稿栏
      refreshTrInd: true,//奇葩问题
    };
  },
  components: { centerDialog },
  created() {},
  mounted() {
    this.getBaseSheetData();
    this.reckonHg();
  },
  methods: {
    //当还在请求的阶段 tab禁止
    disableTab() {
      var _this = this;
      document.onkeydown = function(event) {
        if (event.keyCode == 9 && _this.loadDataFlag) {
          return false;
        }
      };
    },
    //添加产品
    addProjectFun() {
      this.$http
        .post("/api/incomexls/increaseModule", {
          sheetName: this.sheetName,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId
        })
        .then(res => {
          this.tableDataInitData = (() => {
            return this.setTableData(res.data);
          })();
          this.filterTableData(this.filterTableDataArr);
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    //删除产品
    deleteProjectFun(baseId) {
      var _this = this;
      _this
        .$confirm("您是否确认删除此产品?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$http
            .post("/api/incomexls/deleteModule", {
              sheetName: _this.sheetName,
              projectId: _this.$store.state.projectId,
              investorId: _this.$store.state.investorId,
              templateId: _this.$store.state.incomeInitId,
              xlsBaseId: baseId,
              templateName: ""
            })
            .then(res => {
              _this.tableDataInitData = _this.tableData.filter(item => {
                return item.xlsBaseId != baseId;
              });
              _this.filterTableData(_this.filterTableDataArr);
              _this.getTolte();
              _this.$messageSuccess("删除成功！");
            })
            .catch(error => {
              _this.$messageError(error);
            });
        })
        .catch(() => {
          _this.$messageInfo("已取消删除");
        });
    },
    //请求数据
    getBaseSheetData() {
      //表头
      this.$http
        .post("/api/incomexls/getTemplate", {
          sheetName: this.sheetName,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          templateName: "H"
        })
        .then(res => {
          this.Farray(res.data);
          this.setCheckListPermilArr();
        })
        .catch(error => {
          this.$messageError(error);
        });
      //表数据
      this.$http
        .post("/api/incomexls/getBaseSheetData", {
          sheetName: this.sheetName,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId
        })
        .then(res => {
          this.tableData = this.setTableData(res.data);
          this.tableDataInitData = (() => {
            return this.tableData;
          })();
          this.loadShow = false;
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    //处理接口获取tableData
    setTableData(data) {
      var tableData = null;
      switch (this.sheetName) {
        case "营业收支":
        case "生产成本":
          //xls归类
          tableData = this.classifyTableData(data);
          //合计重置到前端
          tableData = this.setTotal(tableData);
          return tableData;
          break;
        case "销售费用":
        case "管理费用":
        case "研发费用":
        case "资本性支出":
          //合计重置到前端
          tableData = this.setTotal(data);
          return tableData;
          break;
        default:
          return data;
          break;
      }
    },
    //处理合计
    setTotal(data) {
      var i = 0, num = 0, j = 0, numJ = 0, dataRowArr = [], otherDataArr = [], dataRow = null;
      if (this.sheetName === "营业收支" || this.sheetName === "生产成本") {
        while (j < data.length) {
          if (/(其他业务收入|其他合计){1}/g.test(data[j].mergeCell)) {
            otherDataArr.push(data.splice(j, 1)[0]);
          } else if (/(成本合计|营业收支){1}/g.test(data[j].mergeCell)) {
            dataRowArr.push(data.splice(j, 1)[0]);
          } else{
            j++;
          }
        }
        data=otherDataArr.concat(data);
        data=dataRowArr.concat(data);
      } else {
        while (i < data.length) {
          if (/(合计){1}/g.test(data[i].mergeCell)) {
            dataRow = data.splice(i, 1)[0];
            data.splice(num, 0, dataRow);
            i++;
            num++;
          } else {
            i++;
          }
        }
      }
      return data;
    },
    //xls归类
    classifyTableData(data) {
      var dataArr = [],
        xlsArr = [],
        i = 0;
      while (i < data.length) {
        if (xlsArr.indexOf(data[i].xlsBaseId) === -1) {
          xlsArr.push(data[i].xlsBaseId);
          dataArr[xlsArr.indexOf(data[i].xlsBaseId)] = [];
        }
        dataArr[xlsArr.indexOf(data[i].xlsBaseId)].push(data[i]);
        i++;
      }
      return [].concat.apply([], dataArr);
    },
    contextmenuShowBody(e) {
      if (!this.$store.state.readonly) return;
      if (
        this.sheetName != "销售费用" &&
        this.sheetName != "管理费用" &&
        this.sheetName != "研发费用" &&
        this.sheetName != "资本性支出" &&
        this.sheetName != "税金"
      )
        return;
      var _this = this;
      //获取左列的下标
      // this.tableInd = -1;
      // this.genre = this.tableData[this.tableInd].mergeCell;
      // //右键菜单显示开关,
      // this.isHideMenu = false;
      // this.cellNums = 1;
      // this.$refs.contextmenu.style.left = e.x + "px";
      // this.$refs.contextmenu.style.top = e.y + "px";
      // document.addEventListener("click", handler, false);
      // function handler() {
      //   _this.isHideMenu = true;
      //   document.removeEventListener("click", handler, false);
      // }
    },
    //右键
    contextmenuShow(e) {
      var isNoShow = true,
        index = parseInt(e.currentTarget.attributes["data-tableInd"].value);
      e.stopPropagation(); //原生阻止冒泡事件
      if (!this.$store.state.readonly) return;
      if (
        this.sheetName != "销售费用" &&
        this.sheetName != "管理费用" &&
        this.sheetName != "研发费用" &&
        this.sheetName != "资本性支出" &&
        this.sheetName != "税金"
      )
        return;
      if (/(合计|总计){1}/g.test(this.tableData[index.mergeCell])) return;
      this.isHideMenu = true;
      var i = 0,eTag=e.target;
      while (eTag.tagName!="TR") {
        if (eTag.tagName === "TD") {
          var key = eTag.attributes["data-td"].value;
          if (
            key != "mergeCell" &&
            (this.tableData[index].disableColumns || "")
              .split(",")
              .indexOf(key) === -1
          ) {
            isNoShow = false;
          }
        }
        eTag=eTag.parentNode;
      }
      this.isDelRow = true;
       if (
        this.sheetName === "税金" &&
        this.tableData[index].A === "应缴增值税" || this.tableData[index].A === "销项增值税" || this.tableData[index].A === "进项增值税"
      ) {
           return false; 
      }
      if (
        this.sheetName === "税金" &&
        this.tableData[index].A === "应缴增值税"
      ) {
        (isNoShow = false), (this.isDelRow = false);
      }
      if (isNoShow) {
        e.preventDefault();
      } else {
        var _this = this;
        //获取左列的下标
        this.tableInd = index;
        this.genre = this.tableData[this.tableInd].mergeCell;
        // //右键菜单显示开关,
        this.isHideMenu = false;
        this.cellNums = 1;
        this.$refs.contextmenu.style.left = e.x + "px";
        this.$refs.contextmenu.style.top = e.y + "px";
        document.addEventListener("click", handler, false);
        function handler() {
          _this.isHideMenu = true;
          document.removeEventListener("click", handler, false);
        }
      }
    },
    //删除表格
    delRow() {
      var _this = this;
      if (this.tableData[this.tableInd].id) {
        this.$http
          .post("/api/incomexls/delXlsUpdateDataById", {
            sheetName: this.sheetName,
            projectId: this.$store.state.projectId,
            investorId: this.$store.state.investorId,
            templateId: this.$store.state.incomeInitId,
            ids: this.tableData[this.tableInd].id
          })
          .then(res => {
            if (res.data) {
              this.tableData.splice(this.tableInd, 1, res.data);
            } else {
              this.isHideMenu = true;
              this.tableData.splice(this.tableInd, 1);
              for (let i = this.tableInd; i < this.tableData.length; i++) {
                this.tableData[i].rowSort =
                  this.tableData[i - 1].rowSort + 1;
              }
            }
            this.getTolte();
          })
          .catch({});
      } else {
        this.isHideMenu = true;
        this.tableData.splice(this.tableInd, 1);
      }
    },
    //添加行数
    addRow(derail) {
      var obj = {},
        tableRow = this.tableData[this.tableInd];
      for (const key in tableRow) {
        switch (key) {
          case "mergeCell":
          case "disableColumns":
          case "dataFormatType":
          case "xlsBaseId":
            if (this.sheetName === "税金") {
              obj[key] = "";
            } else {
              obj[key] = tableRow[key];
            }
            break;
          default:
            obj[key] = "";
            break;
        }
      }
      //添加多行
      if (derail) {
        for (var i = 0; i < this.cellNums; i++) {
          this.tableData.splice(
            this.tableInd + 1,
            0,
            JSON.parse(JSON.stringify(obj))
          );
        }
      } else {
        //添加一行
        this.tableData.splice(
          this.tableInd + 1,
          0,
          JSON.parse(JSON.stringify(obj))
        );
      }
      this.isHideMenu = true;
    },
    cellNumsFun() {},
    //计算高度
    reckonHg() {
      var pageModuleHeight = parseFloat(this.$store.state.oElemHg) - 57,
        tabHeight = 30,
        incomeTablesModuleHeight = document.querySelector(
          ".incomeTablesModule-checkboxs"
        ).clientHeight,
        addProjectHeight = 0;
      if (
        (this.sheetName === "营业收支" || this.sheetName === "生产成本") &&
        this.$store.state.readonly
      ) {
        addProjectHeight = 37;
      }
      this.$refs.tableScroll.style.height =
        pageModuleHeight -
        50 -
        28 -
        tabHeight -
        addProjectHeight -
        incomeTablesModuleHeight +
        "px";
    },
    //滚动条
    scrollFun(event) {
      var _this = this,
        scrollLeft = event.target.scrollLeft,
        scrollTop = event.target.scrollTop,
        scrollHeight = event.target.scrollHeight,
        clientHeight = event.target.clientHeight;
      this.isHideMenu = true;
      this.$refs.tableHead.style.marginLeft = -scrollLeft + "px";
      this.$refs.tableFixedBody.style.marginLeft = scrollLeft + "px";
    },
    //公式显示
    formulaShowFun(thisDom, rowData, key) {
      this.outBoxShow = false;
      if (!this.displayFormula) return;
      this.$http
        .post("/api/incomexls/getFormulaShow", {
          sheetName: rowData.sheetName,
          templateId: this.$store.state.incomeInitId,
          formulaColumnRow: rowData.sheetName + key + rowData.rowSort,
          showLoading: false
        })
        .then(res => {
          if (res.data) {
            var Bubble = this.$refs.outBox;
            var tableWidth = this.$refs.tableScroll;
            let [x, y, z, w] = [
              thisDom.offsetLeft,
              thisDom.offsetWidth,
              thisDom.offsetTop,
              thisDom.offsetHeight
            ];
            Bubble.style.top = z + w + 8 + "px";
            if (tableWidth.offsetWidth > x + y) {
              Bubble.style.left = x + (y * 3) / 4 + "px";
              this.$refs.bot.style.left = "30px";
            } else {
              Bubble.style.left = x + (y * -3) / 2 + "px";
              this.$refs.bot.style.left = "310px";
            }
            this.outBoxContent = res.data[0].originalFormulaDesc
              ? res.data[0].originalFormulaDesc
              : res.data[0];
            this.outBoxShow = true;
          }
        })
        .catch(error => {
          this.$messageError(error);
        });
    },
    //公式显示
    showFormula(e, rowData, key) {
      var i = 0,
        cellDom = null;
      while (i < e.path.length) {
        if (
          e.path[i].className.split(" ").indexOf("cell") != -1 &&
          e.path[i].nodeName === "DIV"
        ) {
          cellDom = e.path[i];
          i = e.path.length;
        } else {
          i++;
        }
      }
      cellDom.className = "cell addBd noEditorBG";
      if (this.cellDom) {
        if (this.cellDom === cellDom) {
          return;
        } else {
          this.cellDom.className = "cell noEditorBG";
        }
      }
      this.cellDom = cellDom;
      return;
      this.formulaShowFun(cellDom, rowData, key);
    },
    // 获得焦点
    inputFocusFun(e, rowData, key) {
      var _this = this,
        value = null;
      if (this.loadDataFlag) {
        e.target.blur();
        return;
      }
      e.target.style.cssText += ";border:1px solid #88C6FF";
      if (
        rowData.dataFormatType.split(",").indexOf(key) != -1 ||
        this.checkList.permilArr.indexOf(key) === -1
      ) {
        value = e.target.value;
      } else {
        value = rowData[key];
      }
      this.currentCell = value;
      if (this.cellDom) {
        this.outBoxShow = false;
        this.cellDom.className = "cell noEditorBG";
        this.cellDom = null;
      }
    },
    // 失去焦点
    inputBlurFun(e, rowData, key, index) {
      var value = null,
        _this = this,
        params = {};
      e.target.style.border = "1px solid #fff";
      if (rowData.dataFormatType.split(",").indexOf(key) != -1) {
        value = e.target.value;
        value = this.$store.state.commafyNumber(value);
        if (this.currentCell == value) return;
        value = this.$accDiv(value, 100);
      } else if (
        this.checkList.permilArr.indexOf(key) === -1 &&
        this.draftColumnKeys.indexOf(key) === -1
      ) {
        value = this.changeToNum(e.target.value);
        if (isNaN(value)) {
          e.target.value = this.$store.state.commafyNumber(rowData[key], 4);
          return;
        }
        if (
          this.changeToNum(this.currentCell) / 1 ==
          this.changeToNum(this.$store.state.commafyNumber(value, 4)) / 1
        ) {
          e.target.value = this.$store.state.commafyNumber(this.currentCell, 4);
          return;
        }
      } else {
        value = e.target.value;
        if (this.currentCell === value) return;
      }
      this.disableTab();
      if (this.loadDataFlag) return;
      this.loadDataFlag = true;
      this.$store.state.isSavingFlag = true;
      switch (this.sheetName) {
        case "销售费用":
        case "管理费用":
        case "研发费用":
        case "资本性支出":
        case "税金":
          if (rowData.id) {
            params = {
              id: rowData.id,
              values: value,
              ordinate: key,
              projectId: this.$store.state.projectId,
              investorId: this.$store.state.investorId.toString(),
              sheetName: _this.sheetName,
              templateId: this.$store.state.incomeInitId,
              showLoading: false,
              sort: rowData.rowSort
            };
          } else {
            params = {
              id: "",
              values: value,
              ordinate: key,
              projectId: this.$store.state.projectId,
              investorId: this.$store.state.investorId.toString(),
              sheetName: _this.sheetName,
              templateId: this.$store.state.incomeInitId,
              showLoading: false
            };
            params.sort = this.getSort(index) + 1;
          }
          this.$http
            .post("/api/incomexls/instrOrUpdateRowData", params)
            .then(res => {
              this.loadDataFlag = false;
              this.$store.state.isSavingFlag = false;
              if(this.sheetName==="税金"){
                this.tableDataInitData = (() => {
                  return this.setTableData(res.data);
                })();
                this.filterTableData(this.filterTableDataArr);
              }else{
                if (rowData.id) {
                  this.tableData.splice(index, 1, res.data);
                } else {
                  this.tableData.splice(index, 1, res.data);
                  for (let i = index + 1; i < this.tableData.length; i++) {
                    this.tableData[i].rowSort = this.tableData[i - 1].rowSort + 1;
                  }
                }
                this.getTolte();
              }
              this.refreshTrInd=false;
              this.$nextTick(()=>{
                this.refreshTrInd=true;
              })
            })
            .catch(error => {
              this.loadDataFlag = false;
              this.$store.state.isSavingFlag = false;
              this.$messageError(error);
            });
          break;
        default:
          this.$http
            .post("/api/incomexls/updateCellByCoordinate", {
              sheetName: _this.sheetName,
              projectId: this.$store.state.projectId,
              investorId: this.$store.state.investorId.toString(),
              templateId: this.$store.state.incomeInitId,
              xlsUpdateDataId: rowData.id,
              ordinate: key,
              abscissa: rowData.rowSort,
              values: value,
              showLoading: false
            })
            .then(res => {
              this.loadDataFlag = false;
              this.$store.state.isSavingFlag = false;
              this.tableDataInitData = (() => {
                return this.setTableData(res.data);
              })();
              this.filterTableData(this.filterTableDataArr);
              this.refreshTrInd=false;
              this.$nextTick(()=>{
                this.refreshTrInd=true;
              })
            })
            .catch(error => {
              this.loadDataFlag = false;
              this.$store.state.isSavingFlag = false;
              this.$messageError(error);
            });
          break;
      }
    },
    //总计
    getTolte() {
      var _this = this;
      this.$http
        .post("/api/incomexls/getLongThrowTotalLine", {
          sheetName: _this.sheetName,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId.toString(),
          templateId: this.$store.state.incomeInitId,
          showLoading: false
        })
        .then(function(res) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              const rd = res.data[i];
              for (let j = 0; j < _this.tableDataInitData.length; j++) {
                const InitDataR = _this.tableDataInitData[j];
                if (rd.id === _this.tableDataInitData[j].id) {
                  _this.tableDataInitData.splice(j, 1, rd);
                }
              }
              for (let j = 0; j < _this.tableData.length; j++) {
                const InitDataR = _this.tableData[j];
                if (rd.id === _this.tableData[j].id) {
                  _this.tableData.splice(j, 1, rd);
                }
              }
            }
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 查找sort
    getSort(index) {
      var i = index;
      if (i === 0) {
        return 0;
      } else {
        while (i >= 0) {
          i--;
          if (this.tableData[i].rowSort) {
            return this.tableData[i].rowSort;
          }
        }
        return 0;
      }
    },
    // 粘贴
    pasteFromExcel(e, tableD, tableHeadKey, tableDInd) {
      var _this = this,
        data = null,
        rowArr = null,
        cellArr = null,
        subObj = {},
        resType = "",
        num = 1,
        currentCell = "",
        sortNum = this.tableData[tableDInd].id
          ? this.tableData[tableDInd].rowSort
          : this.getSort(tableDInd) + 1;
      var clipboardData = window.clipboardData || e.clipboardData; // IE || chrome
      data = clipboardData.getData("Text");
      rowArr =
        data.indexOf(String.fromCharCode(10)) > -1
          ? data.split(String.fromCharCode(10))
          : data.split(String.fromCharCode(13));
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
        tableD[tableHeadKey] = cellArr[0][0].replace(/\s+/g, "");
        // this.inputBlurFun(e, tableD, tableHeadKey, tableDInd)
        return;
      }
      this.disableTab();
      if (this.loadDataFlag) return;
      this.loadDataFlag = true;
      this.$store.state.isSavingFlag = true;
      //解析生成cellsAndValues
      for (let i = 0; i < cellArr.length; i++) {
        const cellA = cellArr[i];
        var subObjChild = null;
        if (this.tableData[tableDInd + i] && this.tableData[tableDInd + i].id) {
          subObjChild = subObj[this.tableData[tableDInd + i].id] = {};
        } else {
          subObjChild = subObj["insert" + num] = {};
          if (
            this.tableData[tableDInd + i] &&
            !this.tableData[tableDInd + i].id
          )
            subObjChild.mergeCell = this.tableData[tableDInd + i].mergeCell;
          if (!this.tableData[tableDInd + i])
            subObjChild.mergeCell = this.tableData[this.tableData.length - 1].mergeCell;
          num++;
        }
        var keyInd = this.alphabeticalOrder.indexOf(tableHeadKey);
        for (var j = 0; j < cellA.length; j++) {
          var cell = cellA[j];
          if (
            this.tableData[tableDInd + i] &&
            (this.tableData[tableDInd + i].disableColumns ||
              this.tableData[tableDInd + i].dataFormatType)
          ) {
            if (
              this.tableData[tableDInd + i].dataFormatType
                .split(",")
                .indexOf(this.alphabeticalOrder[keyInd]) != -1
            ) {
              subObjChild[
                this.alphabeticalOrder[keyInd]
              ] = this.$store.state.commafyNumber(
                this.$accDiv(
                  _this.changeToNum(
                    cell
                      .replace(/\\n/g, "")
                      .replace(/\\r/g, "")
                      .replace(/\s+/g, "")
                  ),
                  100
                ),
                4
              );
            } else {
              subObjChild[
                this.alphabeticalOrder[keyInd]
              ] = this.$store.state.commafyNumber(
                _this.changeToNum(
                  cell
                    .replace(/\\n/g, "")
                    .replace(/\\r/g, "")
                    .replace(/\s+/g, "")
                ),
                4
              );
            }
          } else {
            subObjChild[this.alphabeticalOrder[keyInd]] = _this.changeToNum(
              cell
                .replace(/\\n/g, "")
                .replace(/\\r/g, "")
                .replace(/\s+/g, "")
            );
          }
          if (i === 0 && j === 0) {
            currentCell =
              this.tableData[tableDInd + i].dataFormatType
                .split(",")
                .indexOf(this.alphabeticalOrder[keyInd]) != -1
                ? this.$accMul(subObjChild[this.alphabeticalOrder[keyInd]], 100)
                : subObjChild[this.alphabeticalOrder[keyInd]];
          }
          keyInd++;
        }
        if (Object.keys(subObjChild).length > 0) {
          subObjChild.rowSort = sortNum++;
        } else {
          if (this.tableData[tableDInd + i].id) {
            delete subObj[this.tableData[tableDInd + i].id];
          } else {
            delete subObj["insert" + (num - 1)];
          }
        }
      }
      resType = this.setResType();
      _this.$http
        .post("/api/incomexls/copyAndPasteRow", {
          sheetName: this.sheetName,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId.toString(),
          templateId: this.$store.state.incomeInitId,
          cellsAndValues: JSON.stringify(subObj),
          sort: this.tableData[tableDInd].id
            ? this.tableData[tableDInd].rowSort
            : this.getSort(tableDInd) + 1,
          type: resType, // 1 返回整个页面数据， 2 只返回合计数据
          showLoading: false
        })
        .then(function(data) {
          _this.loadDataFlag = false;
          _this.$store.state.isSavingFlag = false;
          _this.currentCell = currentCell;
          if (resType === 1) {
            _this.tableDataInitData = (() => {
              return _this.setTableData(data.data);
            })();
            _this.filterTableData(_this.filterTableDataArr);
          } else if (resType === 2) {
            var dataLen = data.data.length,
              dataNum = 0;
            for (let i = tableDInd; i < _this.tableData.length; i++) {
              const tableD = _this.tableData[i];
              if (dataNum < dataLen) {
                _this.tableData.splice(
                  tableDInd + dataNum,
                  1,
                  data.data[dataNum]
                );
              } else {
                _this.tableData[i].rowSort = _this.tableData[i - 1].rowSort + 1;
              }
              dataNum++;
            }
            //销售费用  管理费用  研发费用  资本性支出
            if (
              _this.sheetName === "销售费用" ||
              _this.sheetName === "管理费用" ||
              _this.sheetName === "研发费用" ||
              _this.sheetName === "资本性支出"
            ) {
              _this.getTotalNum();
            }
          }
        })
        .catch(function(err) {
          _this.$messageError(err);
        });
    },
    /*获取的合计*/
    getTotalNum() {
      var _this = this;
      this.$http
        .post("/api/incomexls/getLongThrowTotalLine", {
          sheetName: _this.sheetName,
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId.toString(),
          templateId: this.$store.state.incomeInitId,
          showLoading: false
        })
        .then(function(res) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              const rd = res.data[i];
              if (rd.id === _this.tableDataInitData[i].id) {
                _this.tableDataInitData.splice(i, 1, rd);
              }
              if (rd.id === _this.tableData[i].id) {
                _this.tableData.splice(i, 1, rd);
              }
            }
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    //set resType  1 返回整个页面数据， 2 只返回合计数据
    setResType() {
      switch (this.sheetName) {
        case "销售费用":
        case "资本性支出":
        case "管理费用":
        case "研发费用":
        case "税金":
          return 2
          break;
        default:
          return 1
          break;
      }
    },
    //将千分位转为数字
    changeToNum(value) {
      var val = value.replace(/\s+/g, "");
      var pane = "";
      if (val != "") {
        var numArr = (String(val) || "").split(",");
        for (var i = 0; i < numArr.length; i++) {
          pane += numArr[i];
        }
      } else {
        pane = val;
      }
      return pane;
    },
    //类别颜色
    headcolorFu(i, v, l) {
      if (l == "mergeCell") {
        if (/(合计|总计){1}/.test(v)) {
          return "color6 text-center";
        } else {
          return this.headcolor[i % this.headcolor.length] + " text-center";
        }
      }
      if (/(合计|总计){1}/.test(v) && l == "A") {
        return "color7";
      }
    },
    //合并单元格
    rowspanFun(rowData, index, key, show) {
      var rowSpan = null;
      if (this.checkList.mergeCellKey.indexOf(key) === -1) {
        rowSpan = show ? true : 1;
        return rowSpan;
      }
      if (this.sheetName === "营业收支" || this.sheetName === "生产成本") {
        return this.rulesMergingMCellsMC(
          rowData,
          index,
          key,
          show,
          "xlsBaseId"
        );
      } else {
        return this.rulesMergingMCellsMC(rowData, index, key, show, "mergeCell");
      }
    },
    //合并单元格的规则
    rulesMergingMCellsMC(rowData, index, key, show, rulesStr) {
      var rowSpan = null;
      if (index > 0) {
        if (
          !this.tableData[index][rulesStr] &&
          this.tableData[index]["mergeCell"] != this.tableData[index - 1]["mergeCell"]
        ) {
          return this.lookupCellNumFun(index, rowData, show, "mergeCell");
        }
        if (
          this.tableData[index][rulesStr] &&
          this.tableData[index][rulesStr] != this.tableData[index - 1][rulesStr]
        ) {
          return this.lookupCellNumFun(index, rowData, show, rulesStr);
        } else {
          rowSpan = show ? false : 1;
          return rowSpan;
        }
      } else {
        return this.lookupCellNumFun(index, rowData, show, rulesStr);
      }
    },
    //查找单元格的个数
    lookupCellNumFun(index, rowData, show, rulesStr) {
      var i = index,
        num = 0,
        rowSpan = null;
      while (i < this.tableData.length) {
        if (!this.tableData[i][rulesStr]) {
          if (this.tableData[i]["mergeCell"] === rowData["mergeCell"]) {
            i++;
            num++;
          } else {
            i = this.tableData.length;
          }
        } else {
          if (this.tableData[i][rulesStr] === rowData[rulesStr]) {
            i++;
            num++;
          } else {
            i = this.tableData.length;
          }
        }
      }
      rowSpan = show ? true : num;
      return rowSpan;
    },
    //表头数据处理
    Farray(data) {
      var cArr=["CC","CD","CE","CF","CG"];
      this.draftColumnKeys = [];
      if (data.length === 0) return;
      this.tableHead = {};
      this.Headlist = data[0];
      switch (this.sheetName) {
        case "资产负债表":
        case "溢余":
        case "非经营性损益":
        case "营运资金":
        case "销售费用":
        case "管理费用":
        case "研发费用":
        case "现金流量表":
        case "财务费用":
        case "营业收支":
        case "生产成本":
        case "税金及附加":
        case "摊销":
        case "资本性支出":
        case "折旧":
          this.tableHead.mergeCell = this.Headlist.mergeCell;
          break;
        case "利润表":
          break;
        default:
          break;
      }
      for (let i = 0; i < this.alphabeticalOrder.length; i++) {
        if (this.Headlist[this.alphabeticalOrder[i]]) {
          this.tableHead[this.alphabeticalOrder[i]] = this.Headlist[
            this.alphabeticalOrder[i]
          ];
          if (
            this.sheetName == "营业收支" ||
            this.sheetName == "生产成本" ||
            this.sheetName == "折旧"
          ) {
            delete this.tableHead.A;
          }
        }
      }
      //添加草稿列和评估取值列
      switch (this.sheetName) {
        case "资产负债表":
        case "利润表":
        case "折旧":
        case "销售费用":
        case "管理费用":
        case "研发费用":
        case "资本性支出":
        case "摊销":
          // var lastKey = Object.keys(this.tableHead)[
          //   Object.keys(this.tableHead).length - 1
          // ];
          // var lastKeyInd = this.alphabeticalOrder.indexOf(lastKey);
          // if (
          //   this.sheetName === "销售费用" ||
          //   this.sheetName === "管理费用" ||
          //   this.sheetName === "研发费用"
          // ) {
          //   lastKeyInd++;
          //   this.tableHead[this.alphabeticalOrder[lastKeyInd]] = "评估取值";
          // }
          // for (let j = 1; j <= 5; j++) {
          //   this.tableHead[this.alphabeticalOrder[lastKeyInd + j]] =
          //     "草稿栏" + j;
          //   this.draftColumnKeys.push(this.alphabeticalOrder[lastKeyInd + j]);
          // }

          if (
            this.sheetName === "销售费用" ||
            this.sheetName === "管理费用" ||
            this.sheetName === "研发费用"
          ) {
            this.tableHead["CB"] = "评估取值";
          }
          for (let j = 0; j < cArr.length; j++) {
            this.tableHead[cArr[j]] =
              "草稿栏" + (j + 1);
            this.draftColumnKeys.push(cArr[j]);
          }
          break;
        default:
          break;
      }
    },
    //筛选
    filterTableData(newD) {
      if (this.checkList.checkboxList.length > 0 && this.tableDataInitData) {
        if (this.sheetName === "营业收支" || this.sheetName === "生产成本") {
          if (newD.indexOf("产品明细") === -1) {
            this.tableData = this.tableDataInitData.filter(item => {
              return newD.indexOf(item.mergeCell) != -1;
            });
          } else {
            this.tableData = this.tableDataInitData.filter(item => {
              return item.xlsBaseId || newD.indexOf(item.mergeCell) != -1;
            });
          }
        } else {
          this.tableData = this.tableDataInitData.filter(item => {
            return newD.indexOf(item.mergeCell) != -1;
          });
        }
      } else {
        this.tableData = this.tableDataInitData;
      }
    },
    // 打开居中弹窗
    showDialog(tabD, dex) {
      this.abID = tabD;
      this.entryName = tabD.mergeCell;
      this.$refs.addCaseDialog.showDialog();
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs.addCaseDialog.closeDialog();
    },
    // 修改弹框确定按钮
    addCaseFun() {
      this.$http
        .post("/api/incomexls/modifyModule", {
          sheetName: this.sheetName,
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          templateId: this.$store.state.incomeInitId,
          xlsBaseId: this.abID.xlsBaseId,
          mergeCell: this.entryNames
        })
        .then(res => {
          if (this.entryNames != "") {
            this.abID.mergeCell = this.entryNames;
          } else {
            this.abID.mergeCell = this.abID.mergeCell;
          }
          this.$refs.addCaseDialog.closeDialog();
        })
        .catch(error => {});
    },
    //关联资产基础法
    //关联资产基础法
    showAssetBased(sheetName, id) {
      var _this = this;
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "数据引用";
      this.$store.state.componentsType = "dataQuote";
      this.$store.state.cprWidth = "1030px";
      this.$store.state.quoteObj = {
        curQuoteName: this.quoteTableSheetObj[sheetName],
        type: "溢余",
        sheetNameId: id,
        getBaseSheetData: () => {
          _this.getBaseSheetData();
        }
      };
    },
    setCheckListPermilArr(){
      switch(this.sheetName){
        case "非经营性损益":
        var keys="";
        for (const key in this.tableHead) {
          if (this.tableHead[key]==="调整原因") {
            keys=key
          }
        }
        this.checkList.permilArr.push(keys);
        break;
      default:
        break;
      }
    }
  },
  watch: {
    //切换组织结构
    "$store.state.investorId"(newD, oldD) {
      if (newD != oldD) {
        this.getBaseSheetData();
      }
    },
    //重新计算高度
    "$store.state.oElemHg": {
      handler: function(newD, oldD) {
        this.reckonHg();
      }
    },
    displayFormula(newD, oldD) {
      if (!newD) {
        this.outBoxShow = false;
      }
    },
    sheetName(newD, oldD) {
      if (newD != oldD) {
        this.reckonHg();
        this.loadShow = true;
        this.outBoxShow = false;
        this.getBaseSheetData();
        //初始化滚动条
        this.$refs.tableScroll.scrollTop = 0;
        this.$refs.tableScroll.scrollLeft = 0;
        this.$refs.tableHead.style.marginLeft = 0 + "px";
        this.$refs.tableFixedBody.style.marginLeft = 0 + "px";
      }
    },
    //重载页面
    "$store.state.reloadIncomeTable"() {
      this.getBaseSheetData();
    },
    //筛选
    checkedList: {
      handler: function(newD, oldD) {
        this.filterTableDataArr = newD;
        this.filterTableData(newD);
      },
      deep: true
    }
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.incomeTable {
    .relation-icon {
      display: inline-block;
      position: absolute;
      width: 14px;
      height: 14px;
      right: 8px;
      top: 2px;
      background: url('../../../static/img/quote.png') no-repeat center;
      cursor: pointer;
    }

    .visibilityH {
      visibility: hidden;
    }

    .add-project {
      .add{
      
        cursor: pointer;
        clear: both;
        width: 62px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 13px;
        color: rgba(58, 128, 236, 1);
        border-radius: 2px;
        border: 1px solid rgba(58, 128, 236, 1);
        margin-top: 10px;
      }
      .add:hover{
            opacity: 0.7; 
            transition: all 0.5s ease;
      }
    }

    .contextmenu {
      cursor: pointer;
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

    .wrap-table {
      position: relative;
      height: 100%;
      border: 1px solid #e5e5e5;
      overflow: hidden;
      border-collapse: collapse;

      .wrap-table-body {
        position: relative;
        overflow-x: auto;
        overflow-y: auto;

        .wrap-table-body-fixed {
          background: #fff;
          position: absolute;
          top: 0;
          box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);

          .cell {
            /* line-height: 20px; */
            min-height: 20px !important;
            /* padding: 0 5px !important; */
            box-sizing: border-box;
          }
        }
      }

      tr {
        height: 21px;

        td,
        th {
          vertical-align: middle;
          border: 1px solid #e5e5e5;
        }
      }

      thead {
        tr {
          background: #f6faff;
          height: 28px;

          th {
            .cell {
              position: relative;
              font-size: 14px;
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
      }

      tbody {
        tr {
          td {
            height: 100%;

            .noEditorBG {
              background: #ededed;
            }

            .cell {
              min-height: 20px !important;
              font-size: 14px;
              position: relative;

              >span {
                height: 20px;
                padding: 0 6px;
                line-height: 20px;
                color: #606266;
              }

              .operation {
                text-align: center;

                >i {
                  padding: 0 5px;
                }
              }

              /deep/ .el-input {
                .el-input__inner {
                  border-radius: 0;
                  border-color: rgba(255, 255, 255, 0);
                  height: 20px !important;
                  line-height: 20px !important;
                  padding: 0 5px !important;
                  background: none;
                  font-size: 14px !important;
                }

                &.is-disabled {
                  .el-input__inner {
                    background: #f5f7fa !important;
                  }
                }
              }

              .h100 /deep/ .el-input__inner {
                height: 100% !important;
              }
            }

            .cell.color1>span {
              color: #98c765;
            }

            .cell.color2>span {
              color: #f09237;
            }

            .cell.color3>span {
              color: #50adee;
            }

            .cell.color4>span {
              color: #c76565;
            }

            .cell.color5>span {
              color: #65c791;
            }

            .cell.color6>span {
              color: #86a7f0;
            }

            .cell.color7>span {
              font-weight: bold;
            }

            .addBd:after {
              content: "";
              border: 1px solid #88c6ff;
              position: absolute;
              width: calc(100% - 2px);
              height: calc(100% - 2px);
              left: 0;
              top: 0;
            }
          }
        }

        td.towRow {
          .cell {
            /deep/ .el-input {
              .el-input__inner {
                border-radius: 0;
                border-color: rgba(255, 255, 255, 0);
                height: 40px !important;
                padding: 0 5px !important;
                background: none;
                font-size: 14px !important;
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

        tr td.alignLeft .cell,
        tr td.alignLeft .cell /deep/ .el-input input.el-input__inner {
          box-sizing: border-box;
          text-align: left;
          /* padding-left: 12px; */
        }
      }
    }

    .wrap-table-fixed {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);
      z-index: 1;
      background: #fff;

      .cell .el-input .el-input__inner {
        min-height: 20px !important;
        padding: 0 5px !important;
      }
    }

    .outBox {
      position: absolute;

      .dialog-box {
        position: relative;
        padding: 10px;
        width: 340px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 7px 0px rgba(203, 202, 202, 0.5);
        border-radius: 5px;
        color: #262628;
        font-size: 13px;
        line-height: 24px;
        text-align: center;

        span {
          width: 0;
          height: 0;
          font-size: 0;
          overflow: hidden;
          position: absolute;
        }

        .bot {
          border-width: 8px;
          border-style: solid dashed dashed;
          border-color: transparent transparent rgba(255, 255, 255, 1) transparent;
          left: 30px;
          top: -15px;
        }
      }
    }

    .changes {
      cursor: pointer;
    }

    .delete-project {
      display: inline-block;
      .el-icon-delete{
        cursor: pointer;
      }
      .Delet{
        .gray:hover{
             color:orange !important;
        }
         
      }
    }
  }

  .el-message-box {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 170px;
    margin: auto;
    padding: 20px;

    .button {
      width: 100px;
      margin: 10px;
      line-height: 30px;
    }
  }
</style>