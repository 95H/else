<template>
  <div class="future-profit-wrapper">
    <div class="case-table-head" ref="caseTableHead" v-if="tableData.length">
      <table class="case-table">
        <thead>
          <tr>
            <th v-for="(tableVal, tableKey, idx) in tableHeader" :key="tableKey" :colspan="idx===2 ? '2':'1'" v-if="tableKey!=='E'">
              <div class="cell" :style="{width: Number(tableVal.length) * 40 + 'px', 'min-width': '90px', 'max-width': '180px'}" v-if="tableKey!=='D'">
                {{tableVal}}
              </div>
              <div class="cell" v-else style="width: 180px">
                {{tableVal}}
              </div>
            </th>
            <th  class="full-no-border" v-if="trPatchWidth!=0" >
              <div :style="{'width':trPatchWidth+'px'}"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="case-table-bd" v-if="tableData.length" :style="{height: contentHeight}" ref="caseTableBodyFuture" @scroll="scrollLeft" id="caseTableBodyFuture" @mouseover="reckonWidth">
      <table class="case-table">
        <tbody>
          <tr v-for="(item, index) in profitData" :key="index" v-if="index>0">
            <td v-for="(val, key, idx) in tableHeader" :key="key" v-if="index===1 && key!=='E'" :colspan="key==='D' ? '2':'1'">
              <div class="cell" v-if="key!=='A' && key!=='D' && key!=='F'"
                   :title="item[key]"
                   :style="{width: Number(val.length) * 40 + 'px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[index].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" v-else-if="key==='F'"
                   :title="item[key]"
                   :style="{width: Number(val.length) * 40 + 'px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag||profitDataFormula[index].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" v-else-if="key ==='D'" style="width: 180px" :title="item[key]">
                {{item[key]}}
              </div>
              <div class="cell" v-else
                   :title="item[key]"
                   :style="{width: Number(val.length) * 40 + 'px', 'min-width': '90px', 'max-width': '180px'}">
                {{item[key]}}
              </div>
            </td>
            <td v-if="index>1" v-for="(val, key, idx) in tableHeader" :key="key" :class="{noTdBorder: key==='D'}">
              <div class="cell" v-if="key!=='A' && key!=='D' && key!=='E'"
                   :title="item[key]"
                   :style="{width: Number(val.length) * 40 + 'px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[index].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" :title="item[key]" v-else-if="key==='D' || key==='A'" :style="{width: key==='A' ? '90px' : '89px'}">
                {{item[key]}}
              </div>
              <div class="cell" :title="item[key]" v-else style="width: 90px">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[index].indexOf(key) > -1"></el-input>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="noData" v-else>暂无数据</div>
  </div>
</template>

<script>
  export default {
    props: ['pageData'],
    data() {
      return {
        tableHeader: {},
        patchWidth:'',
        isScrollFlag: false, // 表格滚动标识

        editFlag: false,
        temporaryVal: '',
        profitDataFormula: [],
        profitData: [],
      };
    },

    computed: {
      tableData: {
        set() {

        },
        get() {
          let arr = [];
          this.profitDataFormula = [];
          this.profitData = [];
          if(this.pageData && this.pageData['未来年度净收益表']) {
            let keyArr = Object.keys(this.pageData['未来年度净收益表'][0]);
            let valArr = Object.values(this.pageData['未来年度净收益表'][0]);
            let lastIndex = valArr.indexOf('最末一个不足一年的周期');
            let headKey = [];
            valArr.forEach((val, valIndex)=> {
              if(valIndex<=lastIndex && val) {
                headKey.push(keyArr[valIndex])
              }
            })
            headKey = ['E', ...headKey].sort();
            this.pageData['未来年度净收益表'].forEach(item=> {
              let obj= {};
              headKey.forEach(key=> {
                obj[key] = item[key];
              })
              arr.push(obj)
              this.profitData.push(obj);
              this.profitDataFormula.push(item['formulaColumn'].split(','));
            })
          }
          this.tableHeader = arr[0];
          this.$emit('showEditFlag', arr.length);
          return arr;
        }
      },

      contentHeight(){
         return  this.$store.state.cprRightHg-298+'px';
       //return  window.screen.availHeight-440+'px';
      },

      trPatchWidth() {
        var _this = this;
        return this.patchWidth;
      }
    },

    created() {

    },

    methods: {
      startEdit() {
        this.temporaryVal = '';
        this.editFlag = true;
        this.temporaryVal = JSON.parse(JSON.stringify(this.profitData))
      },

      save() {
        this.editFlag = false;
        let profitDataObj = {};
        this.profitData.forEach((item, index)=> {
          if(index>0){
            let id = this.pageData['未来年度净收益表'][index]['id'];
            let flag = true;
            for(let key in item) {
              if(item[key] !== this.temporaryVal[index][key]) {
                if(flag) {
                  profitDataObj[id] = {};
                  flag = false;
                }
                profitDataObj[id][key] = item[key];
                profitDataObj[id]['sort'] = this.pageData['未来年度净收益表'][index]['sort'];
              }
            }
          }
        })
        if(!Object.keys(profitDataObj).length) return;
        this.$http.post('api/case/operateCaseList', {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId,
          idAndValue: JSON.stringify(profitDataObj),
          ruleType: '收益法',
          sheetName:'收益法租约版',
          dataId: this.$store.state.caseDataId,
          xlsSheetName: this.$store.state.curSheetName
        }).then(res=> {
          this.$parent.initData();
          this.$store.state.updateCaseFlag = true;
          if(res.data) this.$store.state.resultDataUpdateRow = res.data;
        }).catch(err=> {
          this.$messageError(err);
        })
      },

      cancel() {
        this.editFlag = false;
        this.profitData = this.temporaryVal;
      },

      // 表格滚动
      scrollLeft(event){
        this.$refs.caseTableHead.scrollLeft =  event.target.scrollLeft;;
      },

      reckonWidth(){
        if(this.isScrollFlag)return;
        this.patchWidth = $('#caseTableBodyFuture').width()-$('#caseTableBodyFuture').prop('clientWidth');
        this.isScrollFlag = true;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .future-profit-wrapper{margin-top: 15px;}
  .case-table-head{overflow: hidden; border-right:1px solid #e5e5e5;border-left:1px solid #e5e5e5;
    table.case-table tr:first-child th{border-left:none}
  }
  .case-table-bd{overflow: scroll;border-left:1px solid #e5e5e5;
    tbody tr:first-child td{border-top: none;}
    .cell{color: #6A6A6A;}
    .noTdBorder{border-right: none;}
  }
  /deep/ .el-input__inner{border: none; text-align: center; background-color: transparent !important;}

</style>
