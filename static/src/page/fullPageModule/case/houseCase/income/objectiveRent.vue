<template>
  <div class="objective-wrapper" >
    <div class="case-table-head" v-if="tableData.length" ref="caseTableHead">
      <table class="case-table">
        <thead>
          <tr>
            <th v-for="(head, headKey, headIndex) in profitData[0]"
                :colspan="headKey==='A' ? '2':'1'" v-if="headKey!=='B'">
              <div class="cell" :style="setWidth" v-if="headKey!=='A'">
                {{head}}
              </div>
              <div class="cell" v-else style="width: 255px">
                {{head}}
              </div>
            </th>
            <th v-if="trPatchWidth!=0">
              <div class="cell" :style="{width: trPatchWidth + 'px'}"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="case-table-bd" v-if="tableData.length" :style="{height: pageHeight }" ref="caseTableBodyRent" id="caseTableBodyRent"  @mouseover="reckonWidth" @scroll="scrollLeft">
      <table class="case-table">
        <tr v-for="(item, itemIndex) in profitData" :key="itemIndex" v-if="itemIndex>0 &&itemIndex<profitData.length-3">
          <td v-for="(val, key) in profitData[0]" :colspan="key==='A' ? '2' : '1'" v-if="key!=='B'">
            <div class="cell" v-if="key!=='A'" :style="setWidth" :title="item[key]">
              <el-input v-model="item[key]" :disabled="!editFlag || profitDataFormula[itemIndex].indexOf(key) > -1"></el-input>
            </div>
            <div class="cell" v-else style="width: 255px" :title="item[key]">
              {{item[key]}}
            </div>
          </td>
        </tr>
        <tr v-for="(result, resultIndex) in profitData" v-if="resultIndex >= profitData.length-3">
          <td rowspan="3"  v-if="resultIndex === profitData.length-3" class="totalResult">
            <div class="cell" style="width: 127px; min-width: 125px; max-height: 210px;">
              {{result['A']}}
            </div>
          </td>
          <td v-for="(val, key) in profitData[0]" :key="key" v-if="key!=='A'">
            <div class="cell" v-if="key!=='B'" :style="setWidth" :title="result[key]">
              <el-input v-model="result[key]" :disabled="!editFlag || profitDataFormula[resultIndex].indexOf(key) > -1"></el-input>
            </div>
            <div class="cell" :title="result[key]" v-else style="width: 127px ; min-width: 125px; max-height: 225px;">
              {{result[key]}}
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="noData" v-else>暂无数据</div>
  </div>
</template>

<script>
  import edit from '../edit.vue';
  export default {
    props: ['pageData'],
    data() {
      return {
        editFlag: false,
        profitData: [],
        tableHeads: ['名称', '单位', '可比实例1', '可比实例2', '可比实例3', '说明'],
        temporaryVal: '',
        setWidth: {width: '145px' , 'min-width': '120px', 'max-height': '225px'},
        trPatchWidth: '',
        profitDataFormula: [],
      };
    },

    components: {
      edit
    },

    computed: {
      tableData: {
        get() {
          let _this = this;
          let arr = [];
          this.profitDataFormula = [];
          this.profitData = [];
          if(this.pageData && this.pageData['客观租金确定过程表']){
            this.pageData['客观租金确定过程表'].forEach(item=> {
              let {A, B, C, D, E, F, G} = item;
              arr.push({A, B, C, D, E, F, G})
              _this.profitDataFormula.push(item['formulaColumn'].split(','))
              this.profitData.push({A, B, C, D, E, F, G})
            })
          }
          this.$emit('showEditFlag', arr.length);
          return arr;
        },
        set(){

        }
      },
      pageHeight() {
        return this.$store.state.cprRightHg-298 + 'px'
      }

    },

    created() {

    },
    methods: {
      startEdit() {
        this.editFlag = true;
        this.temporaryVal = JSON.parse(JSON.stringify(this.profitData));
      },

      save() {
        this.editFlag = false;
        let profitDataObj = {};
        this.profitData.forEach((item, index)=> {
          if(index>0){
            let id = this.pageData['客观租金确定过程表'][index]['id'];
            let flag = true;
            for(let key in item) {
              if(item[key] !== this.temporaryVal[index][key]) {
                if(flag) {
                  profitDataObj[id] = {};
                  flag = false;
                }
                profitDataObj[id][key] = item[key];
                profitDataObj[id]['sort'] = this.pageData['客观租金确定过程表'][index]['sort'];
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
          dataId: this.$store.state.caseDataId,
          sheetName:'收益法简版',
          xlsSheetName: this.$store.state.curSheetName
        }).then(res=> {
          this.$store.state.incomeLawInitData();
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
        this.trPatchWidth = $('#caseTableBodyRent').width()-$('#caseTableBodyRent').prop('clientWidth');
        this.isScrollFlag = true;
      },

      scrollLeft() {
        this.$refs.caseTableHead.scrollLeft =  event.target.scrollLeft;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .objective-wrapper{
    margin-top: 15px;
    .case-table-head{overflow: hidden; border-right:1px solid #e5e5e5;border-left:1px solid #e5e5e5;
      table.case-table tr th{border-left:none;}
    }
    .case-table-bd{overflow-y: scroll; border-left:1px solid #e5e5e5;
      .case-table tr td:first-child{ border-left:none;}
      .case-table tr:first-child td{border-top: none;}
      .cell{color: #6A6A6A; margin: 0;}
      .noTdBorder{border-right: none;}
    }
    /deep/ .el-input__inner{border: none; text-align: center; background-color: transparent; padding: 0 5px !important; white-space: nowrap; overflow:hidden;text-overflow: ellipsis}
  }
</style>

