<template>
  <div class="profit-calculate-wrapper">
    <div class="case-table-head" ref="caseTableHead" v-if="tableData.length">
      <table class="case-table">
        <thead>
          <tr>
            <th v-for="(val, key, idx) in tableHeads" :key="key" :colspan="(key ==='A' || key==='D') ? '2' :'1'" v-if="key!=='B' && key!=='E'">
              <div class="cell" v-if="key!=='D' && key!=='A'" :style="{width: '180px', 'min-width': '90px', 'max-width': '180px'}">
                {{val}}
              </div>
              <div class="cell" v-else :style="{width: '264px', 'min-width': '90px', 'max-width': '265px'}">
                {{val}}
              </div>
            </th>
            <th v-if="trPatchWidth!=0">
              <div class="cell" :style="{width: trPatchWidth + 'px'}"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="case-table-bd" :style="{height: pageHeight + 'px'}" ref="caseTableBodyCal" id="caseTableBodyCal" @scroll="scrollLeft" @mouseover="reckonWidth" v-if="tableData.length">
      <table class="case-table">
        <tbody>
          <tr v-for="(item, itemIndex) in profitData" :key="itemIndex" v-if="itemIndex>0 &&itemIndex<profitData.length-2">
            <td v-for="(val, key, idx) in tableHeads" :key="key" :colspan="(key ==='A')? '2':'1'" v-if="key!=='B'">
              <div class="cell" :title="item[key]" v-if="key !=='A' && key!=='D' && key!=='E'" :style="{width: '180px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[itemIndex].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" :title="item[key]" v-else-if="key==='D'" :style="{width: '131px', 'min-width': '90px', 'max-width': '180px'}">
                {{item[key]}}
              </div>
              <div class="cell" :title="item[key]" v-else-if="key==='E'" :style="{width: '132px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[itemIndex].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" :title="item[key]" v-else :style="{width: '264px', 'min-width': '90px', 'max-width': '265px'}">
                {{item[key]}}
              </div>
            </td>
          </tr>
          <tr v-for="(item, itemIndex) in profitData" :key="itemIndex" v-if="itemIndex>=profitData.length-2">
            <td rowspan="2" v-if="itemIndex === profitData.length-2" class="totalResult">
              <div class="cell" :style="{width: '131px', 'min-width': '90px', 'max-width': '180px'}">
                {{item['A']}}
              </div>
            </td>
            <td v-for="(val, key) in tableHeads" :key="key" v-if="key!=='A'">
              <div class="cell" :title="item[key]" v-if="key!=='B'&& key!=='D' && key!=='E'" :style="{width: '180px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[itemIndex].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" :title="item[key]" v-else-if="key==='E'" :style="{width: '131px', 'min-width': '90px', 'max-width': '180px'}">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[itemIndex].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" :title="item[key]" v-else :style="{width: '132px', 'min-width': '90px', 'max-width': '180px'}">
                {{item[key]}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="noData" v-else >
      暂无数据
    </div>
  </div>
</template>

<script>
  export default {
    props: ['pageData'],

    computed: {
      tableData: {
        get(){
          let arr = [];
          this.profitDataFormula = [];
          this.profitData = [];
          if(this.pageData && this.pageData['收益法测算过程表']) {
            this.pageData['收益法测算过程表'].forEach(item=> {
              let {A, B, C, D, E, F, G} = item;
              arr.push({A, B, C, D, E, F, G});
              this.profitData.push({A, B, C, D, E, F, G});
              this.profitDataFormula.push(item['formulaColumn'].split(','))
            })
          }
          this.tableHeads = arr[0];
          return arr;
        },
        set(){

        }
      },
      trPatchWidth() {
        var _this = this;
        return this.patchWidth;
      }
    },

    data() {
      return {
        editFlag: false,
        //tableHeads: ['名称', '单位', '实例1', '实例2', '实例3', '说明'],
        tableHeads: '',
        temporaryVal: '',
        pageHeight: this.$store.state.cprRightHg-298,
        isScrollFlag: false, // 滚动的标识符
        patchWidth: '', // 计算滚动后表格表头不足的宽度
        profitDataFormula: [],
        profitData: [],
      };
    },
    created() {

    },
    methods: {
      startEdit() {
        this.temporaryVal = '';
        this.editFlag = true;
        this.temporaryVal = JSON.parse(JSON.stringify(this.profitData));
      },

      save() {
        this.editFlag = false;
        let profitDataObj = {};
        this.profitData.forEach((item, index)=> {
          if(index>0){
            let id = this.pageData['收益法测算过程表'][index]['id'];
            let flag = true;
            for(let key in item) {
              if(item[key] !== this.temporaryVal[index][key]) {
                if(flag) {
                  profitDataObj[id] = {};
                  flag = false;
                }
                profitDataObj[id][key] = item[key];
                profitDataObj[id]['sort'] = this.pageData['收益法测算过程表'][index]['sort'];
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
          sheetName:'收益法简版',
          dataId: this.$store.state.caseDataId,
          xlsSheetName: this.$store.state.curSheetName
        }).then(res=> {
          this.$store.state.incomeLawInitData();
          this.$store.state.updateCaseFlag = true;
          if(res.data) this.$store.state.resultDataUpdateRow = res.data;
        }).catch(err=> {
          this.$messageError(err);
        })
      },

      reckonWidth() {
        if(this.isScrollFlag)return;
        this.patchWidth = $('#caseTableBodyCal').width()-$('#caseTableBodyCal').prop('clientWidth');
        this.isScrollFlag = true;
      },

      scrollLeft(event) {
        this.$refs.caseTableHead.scrollLeft =  event.target.scrollLeft;
      },

      cancel() {
        this.editFlag = false;
        this.profitData = this.temporaryVal;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.profit-calculate-wrapper{
  margin-top: 15px;
  .case-table-head{overflow: hidden; border-right:1px solid #e5e5e5;border-left:1px solid #e5e5e5;
    table.case-table tr th{border-left:none;}
  }
  .case-table-bd{overflow-y: scroll; border-left:1px solid #e5e5e5;
    .case-table tr:first-child td{border-top: none;}
    .cell{color: #6A6A6A; margin: 0;}
    .noTdBorder{border-right: none;}
  }
  /*.profit-table{
    width: 100%; border: 1px solid #E5E5E5; font-size: 13px; margin-bottom: 1px;
    th, td{border-right: 1px solid #E5E5E5; border-bottom: 1px solid #E5E5E5;
      text-align: center; box-sizing: border-box; max-width: 170px; min-width: 85px;
      &:last-child{border-right: none;}
    }
    th{min-height: 32px; line-height: 32px; background-color: rgba(246,250,255,1);}
    td:not(.totalResult){ background-color: #fff; min-height: 32px; line-height: 32px; font-size: 12px; color: #6A6A6A; text-align: center; vertical-align: middle;}
    .totalResult{vertical-align: middle; font-size: 12px; color: #6A6A6A; text-align: center;}
  }*/
  /deep/ .el-input__inner{border: none; text-align: center; background-color: transparent; padding: 0 5px !important;}
}
</style>
