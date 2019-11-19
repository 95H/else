<template>
  <!-- 多级表头实现
    data : 表格数据。是一个对象，里面包含表头数据和表格数据，表头数据一直存在，表格数据最少包含一条被评估公司数据
    idName : 传递一个id值，如果在同一个页面引入多次此组件，一定要保证id的唯一性【主要用来判断无对比公司数据时显示的样式】
    isTarget : 判断当前表格无数据时是否默认显示标的公司，默认值true，显示标的公司，如评估总览中的大部分表格，false，不显示标的公司，如公司数据中的一些表格
    同时表格支持宽度设置，需要执行“setTdWidth”方法
   -->
<div>
  <el-table
    :data="data.tableData"
    border class="table-group"
    :id="idName"
    @header-click="headerClick"
    style="width: 100%">
    <el-table-column v-for="item in data.tableHead" :render-header="renderHeader" :fixed="noData && (item.title=='合计' || item.title=='流动性折扣率') ? 'right' : false" :label="item.title" :key="item.strName" :min-width="item.title=='公司名称' ? '200px' : item.title=='上市日期' ? '110px' : 'auto'">
      <template slot-scope="scope" v-if="!item.children">
        <em v-if="!scope.row[item.strName].source || readOnly" :title="scope.row[item.strName].value" class="bg-gray" :class="{'textOverflow1':item.title=='公司名称'}">{{ scope.row[item.strName].value || '--' }}</em>
        <div v-else>
          <el-date-picker v-if="item.title=='上市日期'" value-format="yyyy-MM-dd" @change="saveVal($event,scope.row,item.strName,scope.row[item.strName].value,true)" v-model="scope.row[item.strName].value" type="date" placeholder="选择日期"></el-date-picker>
          <input v-else maxlength="11" placeholder="--" v-model='scope.row[item.strName].value' @change="saveVal($event,scope.row,item.strName,scope.row[item.strName].value)"/>
        </div>
      </template>
      <el-table-column v-for="i in item.children" :label='i.title' :key="i.strName" :width="i.width">
        <template slot-scope="scope" v-if="!i.children">
          <em v-if="!scope.row[i.strName].source || readOnly" :title="scope.row[i.strName].value" class="bg-gray">{{scope.row[i.strName].value || '--' }}</em>
          <input v-else maxlength="11" placeholder="--" v-model='scope.row[i.strName].value' @change="saveVal($event,scope.row,i.strName,scope.row[i.strName].value)"/>
        </template>
        <el-table-column v-for="x in i.children" :label='x.title' :key="x.strName" :width="x.width">
          <template slot-scope="scope" v-if="!x.children">
            <em v-if="!scope.row[x.strName].source || readOnly" :title="scope.row[x.strName].value" class="bg-gray">{{scope.row[x.strName].value || '--'}}</em>
            <input v-else maxlength="11" placeholder="--" v-model='scope.row[x.strName].value' @change="saveVal($event,scope.row,x.strName,scope.row[x.strName].value)"/>
          </template>
          <el-table-column v-for="y in x.children" :label='y.title' :key="y.strName" :width="y.width">
            <template slot-scope="scope">
              <em v-if="!scope.row[y.strName].source || readOnly" :title="scope.row[y.strName].value" class="bg-gray">{{scope.row[y.strName].value || '--'}}</em>
              <input v-else maxlength="11" placeholder="--" v-model='scope.row[y.strName].value' @change="saveVal($event,scope.row,y.strName,scope.row[y.strName].value)"/>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  name : 'table-group',
  data(){
    return{
      noData : true,
      readOnly : !this.$store.state.readonly
    }
  },
  props : {
    data : Object,
    idName : String,
    isTarget : {
      type : Boolean,
      default : true
    },
  },
  watch:{
    "data"(){
      if(this.data.tableData && this.data.tableData.length < 2 && this.isTarget && $("#" + this.idName).find(".noData").length == 0){
        this.noData = false;
        $("#" + this.idName + " .el-table__header-wrapper").after("<div class='noData'>暂无数据</div>");
      }else if(this.data.tableData.length > 1 && $("#" + this.idName).find(".noData").length != 0){
        $("#" + this.idName + " .noData").remove();
        this.noData = true;
      }
    },
    "$store.state.readonly" () {
      this.readOnly = !this.$store.state.readonly;
    },
  },
  methods:{
    /* 向表头中插入单个单元格的宽度
        tableArr ： 表头数据的数组
        widthObj ：单元格宽度的一个对象，key有要求，一定要是当前列数据的key，例 ：table的数据是如下格式：
        data : {
          tableHead : [{strName: "A",title: "公司名称"}],
          tableData : [{ A : {source: true, title : "公司名称"}}],
        }
        则对应的widthObj的格式：
        widthObj : { A : "120px" }
        特别注意：上面的“A”必须完全一致，是A就都是A   是B就都是B
    */
    setTdWidth(theadArr,widthObj){
      theadArr.forEach(item => {
        if(item.strName != '' && !item.children){
          item.width = widthObj[item.strName]
        }
        if(item.children && item.children.length > 0){
          this.setTdWidth(item.children,widthObj);
        }
      });
      return theadArr;
    },
    // 处理数据[去掉后面多余的0]
    delZero(obj){
      let tableHeadArr = [];
      // 递归取最底层tableHead值
      function tableHeadLoop(headArr){
        headArr.forEach(e => {
          // 判断tableHeadArr中是否存在相同的值，如果不存在则插入，否则忽略
          if(tableHeadArr.indexOf(e.strName) == -1) tableHeadArr.push(e.strName);
          if(e.children && e.children.length > 0){
            tableHeadLoop(e.children)
          }
        })
        return tableHeadArr;
      }
      tableHeadLoop(obj.tableHead);
      tableHeadArr.forEach(item=>{
        obj.tableData.forEach(ele=>{
          if(ele[item].value == ''){
            return;
          }else{
            ele[item].value = String(ele[item].value).replace(/(?:\.0*|(\.\d+?)0+)$/,'$1');
          }
        })
      })
    }, 
    // 保存内容
    saveVal(event,row,colId,value,flag){
      //判断一个value是日期格式还是普通数字。如果是日期格式则判断格式是否正确，不属于正确的日期格式则设置为当前日期
      let val = typeof value === "object" ? (value instanceof Date && !isNaN(value.getTime()) ? value : new Date()) : value.replace(/,|\s/g,'');
      if(flag){
        this.editVal(row,colId,val);
      }else{
        // 检测输入的数值是否正确
        if(isNaN(val) || val==''){
          event.currentTarget.style.border="1px solid #f00";
          this.$messageError("内容不能为空或数字不合法");
        }else{
          event.currentTarget.style.border="none";
          this.editVal(row,colId,val);
        }
      }
    },
    // 修改内容
    editVal(row,colId,val){
      this.$http.post('/api/marketTransit/UpdateFinance',{
        id : row.id,
        columnKey : colId,
        value : val,
        projectId : this.$store.state.projectId,
        investorId : this.$store.state.investorId,
        companyId : row.companyId,
        // 1是上市公司法，2是交易案例法
        caseType : this.$route.query.way == 'trade' ? "2" : "1"
      }).then(res=>{
        this.$messageSuccess(res.msg);
        this.$parent.getData();
      }).catch(err => {
        this.$messageError(err);
      })
    },
    // 动态设置表头内容
    renderHeader(h,{column}){
      if(column.label == '权重(%)' && !this.readOnly){
        return h('em',[
          h('i', column.label),
              h('i', {
                class:'iconfont icon-bianji',
                style:'color:#409eff;margin-left:4px;font-size:10px;cursor:pointer',
              })
        ])
      }else{
        return h('i', column.label)
      }
    },
    // 动态设置列方法
    headerClick(column, event){
      if(column.label == '权重(%)' && !this.readOnly){
        this.$emit("dataListItem", column);
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  /deep/.table-group{
    .el-table__empty-block{ display:none;}
    td,th{ padding:0;}
    th{ background-color:#F6FAFF; height:32px;}
    .cell{ padding:0 !important; text-align:center; font-size:12px;
      em{ width:100%; height:32px; display:block; line-height:32px; padding:0 5px; box-sizing:border-box;}
      input{ width:100%; height:32px; box-sizing:border-box; padding:0 5px; border-color:transparent; text-align:center; font-size:12px; background-color:transparent; color:inherit; font-weight:inherit;}
      .el-input--suffix .el-input__inner{ padding-right:0; text-align:left;}
      .el-input__suffix{ display: none;}
    }
    /deep/ .el-table__row:last-child{
      .cell{
        em,input{background-color:rgba(246,250,255,1);color: #3a80ec;font-weight:600;}
      }
    }
    /deep/ .el-table__fixed-right{ border-left:1px solid #e5e5e5;}
    .noData{ height:120px; line-height:190px; background-position:center 20px; border-bottom:1px solid #ebeef5;}
  }
</style>
