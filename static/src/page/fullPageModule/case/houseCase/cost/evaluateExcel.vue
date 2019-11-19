<template>
  <div class="cost-law-wrapper">
    <div class="table-wrapper">
      <div class="table-title-wrapper">
        <p class="table-title">工程费用汇总表</p>
      </div>
      <table class="evaluate-table" v-if="projectData.length">
        <thead>
          <tr class="evaluate-table-head">
            <th v-for="(head, index) in projectDataHead" :key="index">
              <div class="cell">{{head}}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in projectData" :key="index">
            <td class="evaluate-table-row">
              <div class="cell">{{index+1}}</div>
            </td>
            <td v-for="(val, key) in item" class="evaluate-table-row">
              <div class="cell" v-if="key!=='B'">
                <el-input v-model="item[key]" :disabled="!(currentRow === index)"></el-input>
              </div>
              <div class="cell" v-else>
                {{item[key]}}
              </div>
            </td>
            <td class="evaluate-table-row operate">
              <span class="operateBtn" @click="detailView(item, index)" v-if="item['B'] !=='合计'">查看详细</span>
              <!--<span v-if="!(currentRow === index) && item['B'] !=='合计'">编辑</span>-->
              <edit v-if="item['B'] !=='合计'" :editFlag="!forbidProjectData && (currentRow === index)" @startEdit="startEdit('project', index, item)" @save="save('project', index, item)" @cancel="cancel('project', index, item)"></edit>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="noData" v-else>暂无数据</div>
    </div>
    <div class="table-wrapper">
      <div class="table-title-wrapper">
        <p class="table-title">前期费用表</p>
        <edit :editFlag="!forbidUpfrontFeeData" @startEdit="startEdit('frontFee')" @save="save('frontFee')" @cancel="cancel('frontFee')"></edit>
      </div>
      <table class="evaluate-table" v-if="upfrontFeeData.length">
        <thead>
          <tr class="evaluate-table-head">
            <th colspan="2" rowspan="2">序号</th>
            <th colspan="2" rowspan="2">项目名称</th>
            <th colspan="2" rowspan="2">取费基数</th>
            <th colspan="2">费率</th>
            <th colspan="2">费用</th>
            <th colspan="2" rowspan="2">依据</th>
          </tr>
          <tr class="evaluate-table-head">
            <th>含税</th>
            <th>不含税</th>
            <th>含税</th>
            <th>不含税</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in upfrontFeeData" :key="index" >
            <td colspan="2" class="evaluate-table-row" :class="{forbidUpfrontFeeData: forbidUpfrontFeeData && (item['B'] !=='小计' && item['B'] !=='合计'), contextmenuCon: item['B'] !=='小计' && item['B'] !=='合计'}" @contextmenu.prevent.stop="showDialog(item, index, $event)">
              {{index+1}}
              <div class="contextmenu"  ref="contextmenu" v-if="contextmenuShow && (index === currentIndex)">
                <li @click="addRow(index)">增加一行</li>
                <li @click="delRow(index)">删除</li>
              </div>
            </td>
            <td colspan="2" v-for="(val, key, idx) in item"
                class="evaluate-table-row"
                :title="item[key]"
                v-if="key!=='D' && key!=='E' && key!=='F' && key!=='G'">
              <div class="cell" v-if="item['B'] ==='小计' || item['B'] ==='合计'">
                <el-input disabled  v-model="item[key]"></el-input>
              </div>
              <div class="cell" v-else-if="key==='B'">
                <el-input  @input.native="limitInput" v-model="item[key]" :disabled="forbidUpfrontFeeData || upfrontFormula[index].indexOf(key)>-1"></el-input>
              </div>
              <div class="cell" v-else>
                <el-input  v-model="item[key]" :disabled="forbidUpfrontFeeData || upfrontFormula[index].indexOf(key)>-1"></el-input>
              </div>
            </td>
            <td v-else class="evaluate-table-row" :title="item[key]">
              <div class="cell">
                <el-input disabled v-if="item['B'] ==='小计' || item['B'] ==='合计'" v-model="item[key]"></el-input>
                <el-input v-else v-model="item[key]" :disabled="forbidUpfrontFeeData || upfrontFormula[index].indexOf(key)>-1"></el-input>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="noData" v-else>暂无数据</div>
    </div>
    <div class="table-wrapper">
      <div class="table-title-wrapper">
        <p class="table-title">资金成本计算表</p>
        <edit :editFlag="!forbidEvaluateData" @startEdit="startEdit('evaluate')" @save="save('evaluate')" @cancel="cancel('evaluate')"></edit>
      </div>
      <table class="evaluate-table" v-if="evaluateData.length">
        <tr class="evaluate-table-head">
          <th v-for="(item, index) in evaluateHead" :key="index">{{item}}</th>
        </tr>
        <tr v-for="(item, index) in evaluateData" :key="index">
          <td class="evaluate-table-row">{{index+1}}</td>
          <td class="evaluate-table-row" v-for="(val, key) in item" :key="key">
            <span v-if=" key=== 'B'" > {{item['B']}}</span>
            <el-popover
              placement="bottom"
              v-model="toolTipShow"
              trigger="manual"
              v-else-if="key === 'C' && item['B'] ==='建造期资金均匀投入'">
              <div class="input-toolTip" style="line-height: 32px; padding: 5px; box-sizing: border-box; ">
                <template>
                  <el-radio v-model="radio" label="1">均匀投入</el-radio>
                  <br>
                  <el-radio v-model="radio" label="2">自定义：</el-radio><el-input class="width100" :disabled="radio==='1'" placeholder="请输入系数" v-model="defineRatio"></el-input>
                </template>
                <div class="toolTip-footer" style="margin-top: 5px; text-align: center;">
                  <a class="search-btn" @click="handleValueRatio(true, index)">确认</a>
                  <a class="reset-btn" @click="handleValueRatio(false)">取消</a>
                </div>
              </div>
              <el-input  v-model="item[key]" slot="reference" :suffix-icon="toolTipShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                         :disabled="forbidEvaluateData || forbidInput " @focus="confirmParam(index)"></el-input>
            </el-popover>
            <el-input v-else v-model="item[key]" :disabled="forbidEvaluateData || (evaluateFormula[index].indexOf(key)>-1)"></el-input>
            <!--<el-input v-else-if="key==='C'" v-model="item[key]"  :disabled="forbidEvaluateData"></el-input>
            <el-input v-else v-model="item[key]" :disabled="forbidEvaluateData"></el-input>-->
          </td>
        </tr>
      </table>
      <div class="noData" v-else>暂无数据</div>
    </div>
    <div class="table-wrapper">
      <div class="table-title-wrapper">
        <p class="table-title">成新率计算表</p>
        <edit :editFlag="!forbidNewnessRate" @startEdit="startEdit('newnessRate')" @save="save('newnessRate')" @cancel="cancel('newnessRate')"></edit>
      </div>
      <table class="evaluate-table" v-if="newnessRate.length">
        <thead>
          <tr class="evaluate-table-head">
            <th v-for="(item, index) in evaluateHead" :key="index">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in newnessRate" :key="index">
            <td class="evaluate-table-row">{{index+1}}</td>
            <td class="evaluate-table-row">{{item['B']}}</td>
            <td v-for="(val, key) in item" :key="key" class="evaluate-table-row" v-if="key !== 'B'">
              <div class="cell" v-if="(index===0 || index===1) && key==='C'">
                <el-date-picker
                  v-model="item[key]"
                  type="date"
                  format="yyyy/MM/dd"
                  :disabled="forbidNewnessRate || newnessFormula[index].indexOf(key)>-1"
                  :ref="'date'+key+index"
                  @focus="selectMenuDown(item,key,index)"
                  value-format="yyyy/MM/dd">
                </el-date-picker>
              </div>
              <div class="cell" v-else>
                <el-input v-model="item[key]" :disabled="forbidNewnessRate || newnessFormula[index].indexOf(key)>-1"></el-input>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="noData" v-else>暂无数据</div>
    </div>
    <div class="table-wrapper">
      <div class="table-title-wrapper">
        <p class="table-title">评估结果表</p>
        <edit :editFlag="!forbidFundsCostData" @startEdit="startEdit('fundsCost')" @save="save('fundsCost')" @cancel="cancel('fundsCost')"></edit>
      </div>
      <table class="evaluate-table" v-if="fundsCostData.length">
        <thead>
        <tr class="evaluate-table-head">
          <th v-for="(item, index) in evaluateHead" :key="index">{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in fundsCostData" :key="index">
          <td class="evaluate-table-row">{{index+1}}</td>
          <td class="evaluate-table-row">{{item['B']}}</td>
          <td v-for="(val, key) in item" :key="key" class="evaluate-table-row" v-if="key !== 'B'">
            <el-input v-model="item[key]" :disabled="forbidFundsCostData || fundsFormula[index].indexOf(key)>-1"></el-input>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="noData" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
  import feeExcel from './feeExcel';
  import edit from '../edit.vue';
  export default {
    props:['casePageData'],
    watch:{
      casePageData:{
        handler: function(newD, oldD){
          console.log(newD.length);
          this.tableData = Object.assign({},newD);
          this.handleTableData();
          console.log(this.tableData);

        },
      },

      radio: {
        handler: function(newD, oldD) {
          if(newD === '1') {
            this.defineRatio = ''
          }
        }
      }
    },
    data() {
      return {
        projectData: [],
        upfrontFeeData: [],
        evaluateData: [],
        newnessRate: [],
        fundsCostData: [],
        projectFormula: [],
        upfrontFormula: [],
        evaluateFormula: [],
        newnessFormula: [],
        fundsFormula: [],
        projectDataHead: ['序号', '费用类型', '税前工程造价', '税金', '税后工程造价', '操作'],
        evaluateHead: ['序号', '名称', '取费系数', '费用（元）', '备注'], //评估结果表的表头
        toolTipShow: false, // 用于输入框的提示
        forbidInput: false, // 用于禁止输入框输入
        forbidProjectData: true, // 禁止工程费用汇总的编辑
        forbidUpfrontFeeData: true, // 禁止前期费用表的编辑
        forbidEvaluateData: true, // 禁止评估结果表的编辑
        forbidNewnessRate: true, // 禁止成新率编辑
        forbidFundsCostData: true, // 禁止资金成本结果表
        contextmenuShow: false, // 菜单右键展示
        currentRow: '', // 费用汇总表的当前行
        currentIndex: '', // 当前元素下标
        temporaryVal: '', // 用于暂存数值
        temporaryTable: '', // 暂存前期费用表
        temporaryFormula: '',
        radio: '',
        tableData:'',
        defineRatio: '', // 自定义系数
        indexId: 1, // 用于插入元素的id标识
        curDateRef:''

      };
    },
    created() {
      // this.$http.post('api/case/getCaseDetails', {
      //   projectId: this.$store.state.projectId,
      //   investorId: this.$store.state.investorId,
      //   sheetName: '',
      //   ruleType: '成本法',
      //   dataId: this.$store.state.caseDataId
      // }).then(res=> {
      //   console.log(res);
      // }).catch(err=> {
      //   this.$messageError(err);
      // })
    },

    mounted() {
      let _this = this;
      document.addEventListener(
        "click", function() {
          _this.contextmenuShow = false;
        }, false)
    },

    methods: {
      initData(){
        this.$http.post('api/case/getCaseDetails', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          sheetName: '成本法评估值计算表',
          ruleType: '成本法',
          dataId: this.$store.state.caseDataId
        }).then(res=> {
          this.tableData = res.data.data;
          this.handleTableData();
        }).catch(err=> {
          this.$messageError(err);
        })
      },

      // 处理数据
      handleTableData() {
        this.projectData = [];
        this.upfrontFeeData = [];
        this.evaluateData = [];
        this.newnessRate = [];
        this.fundsCostData = [];
        this.projectFormula = [];
        this.upfrontFormula = [];
        this.evaluateFormula = [];
        if(!Object.keys(this.tableData).length) return;
        this.tableData['工程费用汇总表'].forEach((item, index)=> {
          let {B, C, D, E} = item;
          this.projectData.push({B, C, D, E})
          this.projectFormula.push(item['formulaColumn'].split(','))
        });
        this.tableData['前期费用表'].forEach((item, index)=> {
          let {B, C, D, E, F, G, H} = item;
          this.upfrontFeeData.push({B, C, D, E, F, G, H})
          this.upfrontFormula.push(item['formulaColumn'].split(','))
        });
        this.tableData['资金成本计算表'].forEach((item, index) => {
          let {B, C, D, E} = item;
          this.evaluateData.push({B, C, D, E});
          this.evaluateFormula.push(item['formulaColumn'].split(','))
        });
        this.tableData['成新率计算表'].forEach((item, index)=> {
          let obj = {};
          let {B, C, D, E} = item;
          obj = {B, C, D, E};
          if(index ===0 || index === 1) {
            if(!/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test(obj['C'])) obj['C'] = '';
          }
          this.newnessRate.push(obj);
          this.newnessFormula.push(item['formulaColumn'].split(','))
        })
        this.tableData['评估结果表'].forEach((item, index)=> {
          let {B, C, D, E} = item;
          this.fundsCostData.push({B, C, D, E})
          this.fundsFormula.push(item['formulaColumn'].split(','))
        })

      },

      // 表格下标
      indexMethod(index) {
        return index+1;
      },

      // 取值系数小窗口按钮操作
      handleValueRatio(flag, index) {
        let _this = this;
        if(flag){
          if(!_this.radio) return (_this.$messageError('请选择相应方式！'))
          if(_this.radio === '1') {
            _this.$set(_this.evaluateData[index], 'C', '均匀投入（系数0.5）')
          }else{
            if(_this.defineRatio<0.1 || _this.defineRatio >1) return(_this.$messageError('请输入0.1~1之间数值！'))
            _this.$set(_this.evaluateData[index], 'C', _this.defineRatio)
          }
        }
        this.forbidInput = false;
        this.toolTipShow = false;
      },

      detailView(data, index) {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'));
        this.$parent.$parent.$parent.$refs['footer-tab'].tabClick('', index+1);
        this.$parent.$parent.$parent.currentSheet = data['B']  + '表' ;
        this.$parent.$parent.$parent.view = this.$parent.$parent.$parent.sheet[data['B'] + '表'];
      },

      // 确定系数时触发函数
      confirmParam(index) {
        if(this.forbidEvaluateData) return;
        setTimeout(()=> {
          this.toolTipShow = true;
          this.forbidInput = true;
        }, 200)
      },

      // 处理编辑
      startEdit(tableClass, index, item) {
        if(!this.$store.state.caseTabFlag) return(this.$messageError('请先保存！'))
        this.temporaryVal = '';
        this.temporaryTotal = '';
        switch(tableClass) {
          case 'project' :
            this.currentRow = index;
            this.forbidProjectData = false;
            this.temporaryVal = JSON.parse(JSON.stringify(item));
            break;
          case 'frontFee':
            this.forbidUpfrontFeeData = false;
            this.temporaryVal = JSON.parse(JSON.stringify(this.upfrontFeeData));
            this.temporaryTable = JSON.parse(JSON.stringify(this.tableData['前期费用表']));
            this.temporaryFormula = JSON.parse(JSON.stringify(this.upfrontFormula));
            break;
          case 'evaluate':
            this.forbidEvaluateData = false;
            this.temporaryVal = JSON.parse(JSON.stringify(this.evaluateData));
            break;
          case 'newnessRate':
            this.forbidNewnessRate = false;
            this.temporaryVal = JSON.parse(JSON.stringify(this.newnessRate));
            break;
          case 'fundsCost':
            this.forbidFundsCostData = false;
            this.temporaryVal= JSON.parse(JSON.stringify(this.fundsCostData));
            break;
        }
      },

      save(tableClass, index, item) {
        switch(tableClass) {
          case 'project' :
            let obj = {};
            let id = this.tableData['工程费用汇总表'][index]['id'];
            this.currentRow = '';
            this.forbidProjectData = true;
            obj[id] = {};
            for(let key in item) {
              if(this.temporaryVal[key] !== item[key]) {
                obj[id][key] = item[key];
              }
            }
            if(!Object.keys(obj[id]).length) return
            obj[id]['sort'] = this.tableData['工程费用汇总表'][index]['sort'];
            this.handleUpdateData(JSON.stringify(obj));
            break;
          case 'frontFee':
            let UpfrontFeeDataObj = this.operateFee();
            this.forbidUpfrontFeeData = true;
            if( !UpfrontFeeDataObj['idAndValue'] && ! UpfrontFeeDataObj['idList']) return;
            this.$http.post('api/case/operateCaseList', UpfrontFeeDataObj).then(res=> {
              this.initData();
              this.indexId = 1;
              if(res.data) this.$store.state.resultDataUpdateRow = res.data;
              this.$store.state.updateCaseFlag = true;
            }).catch(err=> {
              this.$messageError(err)
            })
            break;
          case 'evaluate':
            let evaluateObj = {};
            this.forbidEvaluateData = true;
            this.handleParams(this.evaluateData, '资金成本计算表', evaluateObj);
            if(!Object.keys(evaluateObj).length) return;
            this.handleUpdateData(JSON.stringify(evaluateObj));
            break;
          case 'newnessRate':
            let newnessRateObj = {};
            this.forbidNewnessRate = true;
            this.handleParams(this.newnessRate, '成新率计算表', newnessRateObj);
            if(!Object.keys(newnessRateObj).length) return;
            this.handleUpdateData(JSON.stringify(newnessRateObj));
            break;
          case 'fundsCost':
            let fundsCostDataObj = {};
            this.forbidFundsCostData = true;
            this.handleParams(this.fundsCostData, '评估结果表', fundsCostDataObj);
            if(!Object.keys(fundsCostDataObj).length) return;
            this.handleUpdateData(JSON.stringify(fundsCostDataObj));
            break;
        }
      },

      cancel(tableClass, index) {
        switch(tableClass) {
          case 'project' :
            this.currentRow = '';
            this.$set(this.projectData, index, this.temporaryVal);
            this.forbidProjectData = true;
            break;
          case 'frontFee':
            this.forbidUpfrontFeeData = true;
            this.upfrontFeeData = this.temporaryVal;
            this.tableData['前期费用表'] = this.temporaryTable;
            this.upfrontFormula = this.temporaryFormula;
            break;
          case 'evaluate':
            this.forbidEvaluateData = true;
            this.handleValueRatio(false);
            this.evaluateData= this.temporaryVal;
            break;
          case 'newnessRate':
            this.forbidNewnessRate = true;
            this.newnessRate = this.temporaryVal;
            break;
          case 'fundsCost':
            this.forbidFundsCostData = true;
            this.fundsCostData= this.temporaryVal;
            break;
        }
      },

      // 鼠标右键弹窗
      showDialog(item, index, el) {
        if(item['B'] ==='合计' || item['B'] ==='小计' ||
          item['B']==='按费率计算小计' || item['B']==='按面积计算小计') return;
        if(this.forbidUpfrontFeeData) return(this.$messageError('当前为不可编辑状态'));
        this.contextmenuShow = true;
        this.currentIndex = index;
        this.$nextTick(()=> {
          this.$refs.contextmenu[0].style.position = 'absolute';
          this.$refs.contextmenu[0].style['z-index'] = 10;
          this.$refs.contextmenu[0].style.left = el.offsetX + 'px';
          this.$refs.contextmenu[0].style.top = el.offsetY + 'px';
        })
      },

      // 增加一行
      addRow(index) {
        let fontArr = [],
            backArr = [];
        fontArr = this.upfrontFeeData.slice(0, index+1);
        backArr = this.upfrontFeeData.slice(index+1); //(index === 0) ? this.upfrontFeeData.slice(index+1) :
        fontArr.push({
          B: '',
          C: '',
          D: '',
          E: '',
          F: '',
          G: '',
          H: ''
        });
        this.upfrontFeeData = fontArr.concat(backArr);
        // 处理数据，用于后期接口使用
        let fontTableArr = [];
        let backTableArr = [];
        let sort = '';
        fontTableArr = this.tableData['前期费用表'].slice(0,index+1);
        backTableArr = this.tableData['前期费用表'].slice(index+1);
        sort = fontTableArr[fontTableArr.length-1]['sort'] + 1;
        fontTableArr.push({
          id: 'insert' + this.indexId++,
          sort,
        });
        backTableArr.forEach(item=> {
          this.$set(item, 'sort', item['sort']+1);
        });
        this.tableData['前期费用表'] = fontTableArr.concat(backTableArr);
        // 用于编辑区判断：
        let frontFormulaArr = [],
            backFormulaArr =[];
        frontFormulaArr =  this.upfrontFormula.slice(0, index+1);
        backFormulaArr =  this.upfrontFormula.slice(index+1);
        frontFormulaArr.push([]);
        this.upfrontFormula = frontFormulaArr.concat(backFormulaArr);
      },

      delRow(index) {
        if(this.tableData['前期费用表'][index]['isImport'] === 0) return(this.$messageError('当前行不能删除！'))
        if(index===0 && this.upfrontFeeData[index+1]['B'] === '小计') {
          this.$messageError('需保留一条数据！');
          return;
        }
        if(this.upfrontFeeData.length >= 5 && index>0) {
          if(this.upfrontFeeData[index-1]['B'] === '小计' && this.upfrontFeeData[index+1]['B'] === '小计') {
            this.$messageError('需保留一条数据！');
            return;
          }
        }
        this.upfrontFeeData.splice(index, 1);
        this.upfrontFormula.splice(index, 1);
        this.tableData['前期费用表'].splice(index, 1);
      },

      limitInput(event) {
        let value = event.target.value;
        if(value.length === 2 && (value === '小计' || value === '合计')) {
          event.target.value = '';
          return (this.$messageError('此处不能手动输入' + value))
        }
      },

      // 保存数据
      handleUpdateData(data) {
        this.$http.post('api/case/operateCaseList' , {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          idAndValue: data,
          ruleType: '成本法',
          sheetName:'成本法评估值计算表',
          dataId: this.$store.state.caseDataId,
          xlsSheetName: this.$store.state.curSheetName
        }).then(res=> {
          this.initData();
          if(res.data) this.$store.state.resultDataUpdateRow = res.data;
          this.$store.state.updateCaseFlag = true;
          console.log(res.data);
        }).catch(err=> {
          this.$messageError(err)
        })
      },

      // 处理传参
      handleParams(tableData, excel, paramObj) {
        tableData.forEach((item, index) => {
          let id = this.tableData[excel][index]['id'];
          let flag = true;
          for(let key in item) {
            if(item[key] !== this.temporaryVal[index][key]) {
              if(flag) {
                paramObj[id] = {};
                flag = false
              }
              paramObj[id][key] = item[key];
              paramObj[id]['sort'] = this.tableData[excel][index]['sort'];
            }
          }
        })
      },

      // 删除前期费用表
      deleteFeeData() {
        let idArr = [],
          idList= '',
        initIdArr = [];
        this.upfrontFeeData.forEach((item, index)=> {
          let id = this.tableData['前期费用表'][index]['id'];
          idArr.push(id);
        });
        this.temporaryTable.forEach((item, index)=> {
          initIdArr.push(item['id']);
        })
        initIdArr.forEach(item=> {
          if(idArr.indexOf(item)<0) {
            idList += item + ',' ;
          }
        })
        return idList.substring(0, idList.length-1);
      },

      // 操作前期费用表
      operateFee() {
        let UpfrontFeeDataObj = {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          ruleType: '成本法',
          dataId: this.$store.state.caseDataId,
          caseId:this.temporaryTable[0]['caseId'],
          sheetName:'成本法评估值计算表',
          xlsSheetName: this.$store.state.curSheetName
        };
        let idList = this.deleteFeeData();
        let idAndValue = this.judgeOperateType();
        if(idList && !idAndValue) {
          UpfrontFeeDataObj['idList'] = idList
        }else if(idAndValue && idList){
          UpfrontFeeDataObj['idAndValue'] = idAndValue;
          UpfrontFeeDataObj['idList'] = idList;
        }else if(idAndValue && !idList){
          UpfrontFeeDataObj['idAndValue'] = idAndValue;
        }
        return UpfrontFeeDataObj
      },

      // 判断当前是否有修改与新增
      judgeOperateType() {
        let idArr = [],
        idInitArr = [],
        paramObj = {},
        idAndValue = '';
        //更新sort
        var firstSort = this.temporaryTable[0]['sort'];
        this.tableData['前期费用表'].forEach((item, index)=> {
          idArr.push(item['id']);
          this.$set(this.tableData['前期费用表'][index], 'sort',firstSort++);
        });

        this.temporaryTable.forEach(item=> {
          idInitArr.push(item['id']);
        });
        idArr.forEach((item, index)=> {
          let flag = true;
          if(idInitArr.indexOf(item)<0) {
            // 取出操作后对应的值
            for(let key in this.upfrontFeeData[index]) {
              if(flag) {
                paramObj[item] = {};
                flag = false;
              }
              paramObj[item][key] = this.upfrontFeeData[index][key];
              paramObj[item]['sort'] = this.tableData['前期费用表'][index]['sort']; // 新增行的排序
            }
          }else {
            for(let key in this.upfrontFeeData[index]) {
              if(this.upfrontFeeData[index][key] !== this.tableData['前期费用表'][index][key]) {
                if(flag) {
                  paramObj[item] = {};
                  flag = false;
                }
                paramObj[item][key] = this.upfrontFeeData[index][key];
                paramObj[item]['sort'] = this.tableData['前期费用表'][index]['sort'];
              }
            }
          }
        });
        idAndValue = Object.keys(paramObj).length ? JSON.stringify(paramObj) : '';
        return  idAndValue;
      },
      selectMenuDown(item,key,index){
        var _this = this;
        this.curDateRef = 'date'+key+index;
        console.log(_this.curDateRef);
      }
    },

    components: {
      edit
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .cost-law-wrapper{
    margin-top: 10px;
    border-top: 1px dashed #ECECEC;
    .table-title-wrapper{display: flex; margin-bottom: 5px; height: 22px; line-height: 22px;}
    .table-title{ color: #262628; font-size: 13px; font-weight: 500; margin-bottom: 5px;
      &:before{content: ''; width: 6px; height: 6px; border-radius: 3px; background-color: #F09237; display: inline-block; margin:0 10px 3px 0; vertical-align: middle;}
    }
    .table-wrapper{margin-top: 15px;
      .evaluate-table{width: 100%; border: 1px solid #E5E5E5; border-collapse: collapse;  font-size: 13px;
        .evaluate-table-head{
          th{border-right: 1px solid #E5E5E5; border-bottom: 1px solid #E5E5E5; height: 32px; line-height: 32px; background-color: rgba(246,250,255,1); vertical-align: middle;min-width: 75px;
            &:last-child{border-right: none;}
          }
        }
        .evaluate-table-row{border-right: 1px solid #E5E5E5; border-bottom: 1px solid #E5E5E5; /*height: 30px;*/ line-height: 30px; text-align: center; color: #9d9b9b; font-size: 12px; min-width: 75px;
          .cell{color: #9d9b9b;}

        }
        .evaluate-table-row.contextmenuCon{position: relative; &:hover{cursor: pointer;}}
        .evaluate-table-row.forbidUpfrontFeeData{&:hover{cursor: not-allowed;}}
        .operate{ min-width: 203px;
          .operateBtn{
            color:#3A80EC; margin-right: 3px; cursor: pointer;
          }
        }
      }
      &:last-child{margin-bottom: 1px;}
      /deep/ .el-input__inner{border: none; text-align: center; background-color: transparent; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 5px !important;}
      /deep/ .el-table__body-wrapper{.cell{color: #6A6A6A;}}
      /deep/ .operate:not(.is-leaf){.cell{color: #3A80EC; cursor: pointer;}}
      /deep/ .el-icon-loading{display: none;}
    }
    .contextmenu{padding: 5px; box-sizing: border-box; background-color: #ffffff; border: 1px solid #E5E5E5; line-height: 28px; width: 120px; text-align: center;
      li:hover{background-color: #ECECEC; }
    }
    /deep/ .el-popper{font-size: 20px;}
    /deep/ .el-icon-arrow-up, /deep/ .el-icon-arrow-down{ color: #6A6A6A;}
    /deep/ .el-icon-date {display: none;}
  }
</style>
