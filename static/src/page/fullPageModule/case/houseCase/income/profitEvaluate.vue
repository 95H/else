<template>
  <div class="profit-evaluate-wrapper">
    <div class="case-table-head" ref="caseTableHead" v-if="tableData.length">
      <table class="case-table">
        <thead>
          <tr>
            <th v-for="(head, index) in tableHead" :key="index" :colspan = "index===0 ? '2' : '1'">
              <div class="cell" style="width: 309px">
                {{head}}
              </div>
            </th>
            <th v-if="patchWidth != 0">
              <div class="cell" :style="{width: patchWidth + 'px'}"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="case-table-bd" v-if="tableData.length" :style="{height: contentHeight + 'px'}" ref="caseTableBodyProfit" id="caseTableBodyProfit" @mouseover="reckonWidth">
      <table class="case-table">
        <tbody>
          <tr v-for="(item, index) in profitData" :key="index" v-if=" index< profitData.length-3">
            <td v-for="(val, key) in item" :key="key" v-if="key!=='B'" :colspan=" key==='A' ? '2': '1'">
              <div class="cell" :title="item[key]" v-if="key ==='A'" style="width: 309px">
                {{item[key]}}
              </div>
              <div class="cell" :title="item[key]" v-else style="width: 309px">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[index].indexOf(key) > -1"></el-input>
              </div>
            </td>
          </tr>
          <tr v-for="(item, index) in profitData" :key="index" v-if="index >= profitData.length-3">
            <td rowspan="3" v-if="index === profitData.length-3" class="totalResult">
              <div class="cell" :title="item['A']" style="width: 154px">
                {{item['A']}}
              </div>
            </td>
            <td v-for="(val, key) in item" v-if="key!=='A'" :key="key">
              <div class="cell" :title="item[key]" v-if="key!=='B'" style="width: 309px">
                <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[index].indexOf(key) > -1"></el-input>
              </div>
              <div class="cell" :title="item[key]" v-else style="width: 154px">
                {{item[key]}}
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
        tableHead: ['内容', '单位', '比率'],

        editFlag: false,
        temporaryVal: '',
        contentHeight: this.$store.state.cprRightHg-298,
        isScrollFlag: false,
        patchWidth: '',
        profitDataFormula: [],
        profitData: []
      };
    },

    computed: {
      tableData: {
        get() {
          let arr = [];
          this.profitDataFormula = [];
          this.profitData = [];
          if(this.pageData && this.pageData['收益法评估结果表']) {
            this.pageData['收益法评估结果表'].forEach(item=> {
              let {A, B, C, D} = item;
              arr.push({A, B, C, D});
              this.profitData.push({A, B, C, D})
              this.profitDataFormula.push(item['formulaColumn'].split(','))
            })
          }
          return arr;
        },
        set() {

        }
      }
    },

    created() {

    },
    methods: {
      startEdit() {
        this.editFlag = true;
        this.temporaryVal = '';
        this.temporaryVal = JSON.parse(JSON.stringify(this.profitData));
      },

      save() {
        this.editFlag = false;
        let profitDataObj = {};
        this.profitData.forEach((item, index)=> {
          if(index>0){
            let id = this.pageData['收益法评估结果表'][index]['id'];
            let flag = true;
            for(let key in item) {
              if(item[key] !== this.temporaryVal[index][key]) {
                if(flag) {
                  profitDataObj[id] = {};
                  flag = false;
                }
                profitDataObj[id][key] = item[key];
                profitDataObj[id]['sort'] = this.pageData['收益法评估结果表'][index]['sort'];
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

      reckonWidth() {
        if(this.isScrollFlag)return;
        this.patchWidth = $('#caseTableBodyProfit').width()-$('#caseTableBodyProfit').prop('clientWidth');
        this.isScrollFlag = true;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.profit-evaluate-wrapper{
  margin-top: 15px;
  .case-table-head{overflow: hidden; border-right:1px solid #e5e5e5;border-left:1px solid #e5e5e5;
    table.case-table tr th{border-left:none;}
  }
  .case-table-bd{overflow-y: scroll; border-left:1px solid #e5e5e5;
    .case-table tr:first-child td{border-top: none;}
    .cell{color: #6A6A6A; margin: 0;}
    .noTdBorder{border-right: none;}
  }
  /*.evaluate-table{
    .cell{color: #6A6A6A;}
    width: 100%; border: 1px solid #E5E5E5; font-size: 13px; margin-bottom: 1px;
    th, td{border-right: 1px solid #E5E5E5; border-bottom: 1px solid #E5E5E5;
      text-align: center; box-sizing: border-box; max-width: 170px; min-width: 75px;
      &:last-child{border-right: none;}
    }
    th{min-height: 32px; line-height: 32px; background-color: rgba(246,250,255,1);}
    td:not(.totalResult){ background-color: #fff; min-height: 32px; line-height: 32px; font-size: 12px; color: #6A6A6A; text-align: center;}
    .totalResult{vertical-align: middle; font-size: 12px; color: #6A6A6A; text-align: center; min-width: 75px;}
  }*/
  /deep/ .el-input__inner{border: none; text-align: center; background-color: transparent;}
}
</style>
