<template>
  <!-- 
    表头格式:
      tableHead:[{title:"标题",strname:"字段key",flex:"是否固定列",type:"number",align:"排列方式",width:"单元格宽度",minWidth:"单元格最小宽度"}]
      title : 表头显示的文字
      strname : tbody中显示文字的key值
      flex : 是否固定列，可选值：left、rigth
      type : 默认不填，唯一值number,表示“序号”列
      align : 单元格中文字的排列方式。默认：center，可选值：left、right、center
      width : 单元格的宽度
      minWidth : 单元格的最小宽度

    表格内容格式 :
      tableData : [{title: {value:'',source:true}]
      title : 与表头的strname值相匹配，即字段的key值
      value : 单元格中显示的内容
      source : 数据来源/数据是否可编辑，导入的数据可以编辑，通过计算得到的值不可编辑。可选值：true【可修改】、false【不可修改】
   -->
  <div class="fiexd-table" :style="{'height':tableHeight}">
    <!-- 表头 -->
    <div class="fiexd-thead-box">
      <table ref="tableHead">
        <colgroup>
          <col v-for="(item,index) in tableHead" :key="index" :width="item.width"/>
        </colgroup>
        <thead>
          <th v-for="(item,index) in tableHead" :key="index" :width="item.width">
            <div class="cell" :style="{'min-width':item.minWidth,'width':item.width,'text-align':item.align || 'center'}">
              <span>{{item.title}}</span>
            </div>
          </th>
        </thead>
      </table>
    </div>
    <!-- tableBody -->
    <div class="fiexd-tbody-box" ref="fiexdTbodyBox" @scroll="scrollFun">
      <div style="position:relative;">
        <!-- 左侧固定列 -->
        <div class="table-flex-left" ref="flexLeftBox" v-if="flexShow">
          <div class="flex-left-box">
            <div class="fiexd-tbody">
              <table ref="flexLeft">
                <colgroup>
                  <col v-for="(item,index) in tableHead" :key="index" :width="item.width" v-if="item.flex=='left'"/>
                </colgroup>
                <tbody align="center" :class="className">
                  <tr v-for="(bodyItem,index) in tableData" :key="index">
                    <td v-for="(headItem,ind) in tableHead" :key="ind" v-if="headItem.flex=='left'" :width="headItem.width" :class="{'bg-gray':!bodyItem[headItem.strname].source || readOnly}">
                      <!-- <div class="cell bg-gray" v-if="headItem.type=='number'" :style="{'min-width':headItem.minWidth,'width':headItem.width}">
                        {{index + 1}}
                      </div> -->
                      <div class="cell" :style="{'min-width':headItem.minWidth,'width':headItem.width,'text-align':headItem.align || 'center'}">
                        <span v-if="!bodyItem[headItem.strname].source || readOnly">{{bodyItem[headItem.strname].value || '--'}}</span>
                        <input v-else maxlength="11" placeholder="--" v-model='bodyItem[headItem.strname].value' @change="saveVal($event,headItem.strname,bodyItem)"/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <table ref="tableBody" class="tableBody">
          <colgroup>
            <col v-for="(item,index) in tableHead" :key="index" :width="item.width"/>
          </colgroup>
          <tbody align="center" :class="className">
            <tr v-for="(bodyItem,index) in tableData" :key="index">
              <td v-for="(headItem,ind) in tableHead" :key="ind" :width="headItem.width" :class="{'bg-gray':!bodyItem[headItem.strname].source || readOnly}">
                <div class="cell bg-gray" v-if="headItem.type=='number'" :style="{'min-width':headItem.minWidth,'width':headItem.width}">
                  {{index + 1}}
                </div>
                <div class="cell" v-else :style="{'min-width':headItem.minWidth,'width':headItem.width,'text-align':headItem.align || 'center'}">
                  <span v-if="!bodyItem[headItem.strname].source || readOnly">{{bodyItem[headItem.strname].value || '--'}}</span>
                  <input v-else maxlength="11" placeholder="--" v-model='bodyItem[headItem.strname].value' @change="saveVal($event,headItem.strname,bodyItem)"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 右侧固定列 -->
        <div class="table-flex-right" ref="flexRightBox" v-if="flexShow">
          <div class="flex-right-box">
            <div class="fiexd-tbody">
              <table ref="flexRight">
                <colgroup>
                  <col v-for="(item,index) in tableHead" :key="index" :width="item.width" v-if="item.flex=='right'"/>
                </colgroup>
                <tbody align="center">
                  <tr v-for="(bodyItem,index) in tableData" :key="index">
                    <td v-for="(headItem,ind) in tableHead" :key="ind" v-if="headItem.flex=='right'" :width="headItem.width" :class="{'bg-gray':!bodyItem[headItem.strname].source || readOnly}">
                      <div class="cell" :style="{'min-width':headItem.minWidth,'width':headItem.width,'text-align':headItem.align || 'center'}">
                        <span v-if="!bodyItem[headItem.strname].source || readOnly">{{bodyItem[headItem.strname].value || '--'}}</span>
                        <input v-else maxlength="11" placeholder="--" v-model='bodyItem[headItem.strname].value' @change="saveVal($event,headItem.strname,bodyItem)"/>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 左侧固定列表头 -->
    <div class="table-flex-left" v-if="flexShow">  <!-- :style="{'bottom':flexShow?'16.5px':0}" -->
      <div class="fiexd-thead">
        <table>
          <colgroup>
            <col v-for="(item,index) in tableHead" :key="index" :width="item.width" v-if="item.flex=='left'"/>
          </colgroup>
          <thead>
            <th v-for="(item,index) in tableHead" :key="index" v-if="item.flex=='left'" :width="item.width">
              <div class="cell" :style="{'min-width':item.minWidth,'width':item.width,'text-align':item.align || 'center'}">
                <span>{{item.title}}</span>
              </div>
            </th>
          </thead>
        </table>
      </div>
    </div>
    <!-- 右侧固定列表头 -->
    <div class="table-flex-right" v-if="flexShow">
      <div class="fiexd-thead">
        <table>
          <colgroup>
            <col v-for="(item,index) in tableHead" :key="index" :width="item.width" v-if="item.flex=='right'"/>
          </colgroup>
          <thead>
            <th v-for="(item,index) in tableHead" :key="index" v-if="item.flex=='right'" :width="item.width">
              <div class="cell" :style="{'min-width':item.minWidth,'width':item.width,'text-align':item.align || 'center'}">
                <span>{{item.title}}</span>
              </div>
            </th>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      scrollLeft : 0,
      scrollTop : 0,
      flexShow : true,  //左右两侧的固定列是否显示【默认显示】
      // isScroll : false,  //是否存在竖向滚动条 【默认不存在】
      readOnly : !this.$store.state.readonly,
      errorArr : [],
    }
  },
  props:{
    tableHeight : String,  //表格的高度
    tableHead : Array,     //表头数据
    tableData : Array,     //表格数据
    className : String
  },
  watch:{
    '$store.state.isfixedFlag'(){
      this.resetTable();
    },
    '$store.state.readonly'(){
      this.readOnly = !this.$store.state.readonly;
    },
    $route(){
      this.errorArr.forEach(ele => {
        ele.style.border = "none";
      });
    }
  },
  methods:{
    // 初始化表格状态
    resetTable(){
      this.flexShow = $(".fiexd-tbody-box").width() < $(".fiexd-tbody-box table.tableBody").width();
      this.$refs.tableHead && (this.$refs.tableHead.style.left = 0);
      this.$refs.flexLeftBox && (this.$refs.flexLeftBox.style.left = 0);
      this.$refs.flexRightBox && (this.$refs.flexRightBox.style.right = 0);
      this.$refs.fiexdTbodyBox && (this.$refs.fiexdTbodyBox.scrollLeft = 0);
    },
    // 滚动中间内容左右固定列和表头跟随移动
    scrollFun(){
      if((event.target.scrollLeft + event.target.clientWidth) < event.target.scrollWidth+17){
        this.scrollLeft = event.target.scrollLeft;
        this.$refs.tableHead.style.left = "-" + this.scrollLeft + "px";
        this.$refs.flexLeftBox.style.left = this.scrollLeft + 'px';
        this.$refs.flexRightBox.style.right = '-' + this.scrollLeft + 'px';
      }
    },
    // 保存修改的值
    saveVal(ev,colName,itemObj){
      let val = itemObj[colName].value.replace(/,/g,'');
      // if(val == ''){
      //   ev.currentTarget.style.border="none";
      //   return;
      // }
      if(isNaN(val)){
        this.$messageError("请输入一个合法的数字");
        ev.currentTarget.style.border="1px solid #f00";
        // 如果存在问题则将这个event放进一个数组，方便切换时清空这个状态
        if(this.errorArr.indexOf(ev.currentTarget) == -1){
          this.errorArr.push(ev.currentTarget);
        }
      }else if(val != '' && !/^\d/.test(val)){
        this.$messageError("请输入一个正数");
        // 如果存在问题则将这个event放进一个数组，方便切换时清空这个状态
        if(this.errorArr.indexOf(ev.currentTarget) == -1){
          this.errorArr.push(ev.currentTarget);
        }
        ev.currentTarget.style.border="1px solid #f00";
      }else{
        this.errorArr.splice(this.errorArr.indexOf(ev.currentTarget),1);
        ev.currentTarget.style.border="none";
        this.$http.post('/api/marketTransit/updateExcelDate',{
          id : itemObj.id,
          columnKey : colName,
          value : val,
          projectId : this.$store.state.projectId,
          investorId : this.$store.state.investorId,
          companyId : itemObj.companyId,
          // 1是上市公司法，2是交易案例法
          caseType :this.$store.state.fileFlag == '0' ? '0':this.$route.query.way == 'trade'? '2':'1',
        }).then(res=>{
          this.$messageSuccess(res.msg);
          this.$parent.getFromData();
        }).catch(err => {
          this.$messageError(err);
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .fiexd-table{ width:100%; position: relative; border:1px solid #d7d7d7; box-sizing:border-box; height:100%;
    &:after{ content:''; display:block; width:18px; height:26px; box-sizing:border-box; background-color:#F6FAFF; right:0; top:0; position:absolute;  z-index:9;border-right:1px solid #D7D7D7; border-top:1px solid #D7D7D7; border-bottom:1px solid #D7D7D7; }
    .fiexd-thead-box{width:100%; overflow: hidden; box-sizing:border-box; padding-right:17px; position:relative; z-index:1;
      table{ position: relative; left:0;}
    }
    .fiexd-tbody-box{ overflow-x:auto; overflow-y:scroll; width:100%; position:absolute; top:26px; bottom:0;
      .flex-left-box,.flex-right-box{ position:relative; height:100%; z-index:99;
        .fiexd-tbody{ position: relative;}
      }
      .table-flex-right{ right:0;}
      // 资产负债表
      .assets{
        tr:nth-child(1),tr:nth-child(13),tr:nth-child(14),
        tr:nth-child(36),tr:nth-child(37),
        tr:nth-child(38),tr:nth-child(51),
        tr:nth-child(52),tr:nth-child(61),
        tr:nth-child(62),tr:nth-child(63),
        tr:nth-child(72),tr:nth-child(73){
          td:nth-child(2){font-weight:bold}
        }
        @for $i from 2 through 12{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        @for $i from 15 through 35{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        @for $i from 39 through 50{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        @for $i from 53 through 60{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        @for $i from 64 through 71{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        // 合计
        tr:nth-child(13),
        tr:nth-child(36),tr:nth-child(37),
        tr:nth-child(51),tr:nth-child(61),
        tr:nth-child(62),
        tr:nth-child(72),tr:nth-child(73){
          td:nth-child(2){ text-indent:20px;}
        }
      }
      // 利润表
      .profit{
        tr:nth-child(1),tr:nth-child(14),
        tr:nth-child(17),tr:nth-child(19),
        tr:nth-child(20){
          td:nth-child(2){font-weight:bold}
        }
        @for $i from 2 through 13{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        tr:nth-child(15),tr:nth-child(16),tr:nth-child(18),tr:nth-child(21){
          td:nth-child(2){text-indent: 10px}
        }
      }
      // 附表
      .other{
        tr:nth-child(1),tr:nth-child(8){
          td:nth-child(2){font-weight:bold}
        }
        @for $i from 2 through 7{
          tr:nth-child(#{$i}) td:nth-child(2){text-indent: 10px}
        }
        tr:nth-child(9){
          td:nth-child(2){text-indent: 10px}
        }
        tr:nth-child(8){
          td:nth-child(2){text-indent: 20px}
        }
      }
    }
    .table-flex-left,.table-flex-right{overflow:hidden; position:absolute;left:0; top:0; background:#fff; z-index:9;
      .fiexd-thead{ position: relative; z-index:99;}
      .fiexd-tbody{ overflow-y:hidden; position:absolute; top:0; bottom:0; }
    }
    .table-flex-right{right:17px;left:auto;}
    .flex-left-box,.flex-right-box{overflow-y:auto;position:absolute;left:0; right:0;top:0; bottom:0}
    table{ table-layout:fixed; min-width:100%;
      td,th{border:1px solid #D7D7D7; line-height:20px; font-size:12px; color:#6A6A6A; height:20px;}
      th{ height:25px; background-color:#F6FAFF; font-size:13px; font-weight:bold; line-height:25px;}
      .cell{ box-sizing: border-box; overflow: hidden; text-overflow: ellipsis; white-space: normal; word-break: break-all; height:inherit; min-width:100%; margin:0 auto; line-height:inherit; width:50px;
        input{ border:none; background:none; text-align:inherit; box-sizing:border-box; width:100%; height:20px; line-height:20px; border:1px solid #fff; padding:0 5px; font-size:12px;
          &:focus{ border:1px solid rgb(136,198,255); text-align:left;}
        }
        span{ height:20px; padding:0 5px;}
      }
    }
  }
</style>
