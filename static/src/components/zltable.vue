<template>
	<div class="table-comp">
		<!-- #############使用方式【自定义列表顶部】################ -->
		<!-- 1、默认不设置的情况显示【共计***条数据】 -->
		<!-- 2、设置以后可以设置成任意结构，组件中使用方式如下 -->
		<!-- <zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form">
            <div slot="tableTop">
                这里写你需要显示的结构
            </div>
        </zltable> -->
		<!-- #############使用方式【自定义列表顶部】################ -->
		<div class="totalCon"><slot name="tableTop">共计{{totalDataNum}}条数据</slot></div>
		<div class="zltable">
			<slot name="tableSelect"></slot>
		    <el-table ref="zlpgtable" :data="tableData" border stripe style="width: 100%" @row-click="openDetails" :show-summary="showSummary" @select="handleSelectionChange" @select-all="handleSelectionChange">
				<el-table-column class="fs13" v-for="(item,index) in dataTableHead" v-if="item.title == '全选'" type="selection" :width="item.width" :key="index"></el-table-column>
			    <el-table-column class="fs13" v-for="(item,index) in dataTableHead" v-if="item.title == '序号'" type="index" :label="item.title" :width="item.width" :key="index" @click="showOk = !showOk" ></el-table-column>

			    <el-table-column class="fs13" v-for="(item,index) in dataTableHead" v-if="item.name != 'id' && item.title != '序号' && item.title != '全选'" :label="item.title" :width="item.width" :key="index" @click="showOk = !showOk" >
			    	<template slot-scope="scope">
              <div v-if="item.title == '负责公司' && item.dataType == 'Array'" class="textOverflow1" :title="scope.row[item.name] | arrayToString()">
                   {{ scope.row[item.name] | arrayToString() }}
                </div>
				      <div v-else-if="item.title == '任务人' && item.dataType == 'object'" class="textOverflow1" :title="scope.row[item.name] | objectToString()">
                {{ scope.row[item.name] | objectToString() }}
              </div>
              <div v-else class="textOverflow1" :title="scope.row[item.name] | setValue(item._param)">
                {{ scope.row[item.name] | setValue(item._param) }}
              </div>
				    </template>
			    </el-table-column>
			    <!-- <el-table-column v-for="(item,index) in dataTableHead" v-if="item.title == '操作'" fixed="right" label="操作" :width="item.width" :key="index">
			      <template slot-scope="scope">
			      	<el-button v-for="(val,ind) in item.operation" @click="handleClick(scope.row)" type="text" size="small" :key="ind">{{ val.name }}</el-button> -->
			      	<!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button> -->
			      <!-- </template>
			    </el-table-column> -->
			</el-table>
		</div>
		<div class="pagination-con" v-if="pageShowFlag || totalDataNum > 10">
			<pagination ref="pagination" :page="dataSearch.page" :pagesize="pagesize" :totalDataNum="totalDataNum" v-on:currentPageFn="currentPageFn"></pagination>
		</div>
	</div>
</template>

<script>
import pagination from "./pagination.vue";
export default {
  name: "zltable",
  props: {
    show: false,
    dataurl: String,
    dataTableHead: Array,
    dataSearch: Object,
    showSummary: {
      type: Boolean,
      default: false
    },
    pageShowFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      pagesize: 10,
      totalDataNum: 0,
      tableTopHtml: "",
      //回显
      echoArr: [],
      echoKey: ""
    };
  },
  created() {
    var _this = this;
    this.$nextTick(function() {
      _this.currentPageFn(this.dataSearch.page || 1);
    });
  },
  filters: {
    //根据接口返回数据字段设置页面需要显示的值。
    setValue: function(value, _param) {
      if (value && _param) {
        if (/,/g.test(value)) {
          let valueArr = value.split(","),
            valueItem = "",
            valueParam = "";
          for (let i = 0; i < valueArr.length; i++) {
            valueItem = valueArr[i];
            valueParam =
              valueParam + "," + window.commonData[_param][valueItem];
          }
          return valueParam.substring(1);
        } else {
          return window.commonData[_param][value];
        }
      } else {
        return value || "";
      }
    },
    arrayToString: function(value) {
      if (value.length) {
        return value.join(",");
      } else {
        return "";
      }
    },
    objectToString: function(value) {
      //console.log(value);
      if (value && value.projectLeaderUserName) {
        return value.projectLeaderUserName;
      } else {
        return "";
      }
    }
  },
  methods: {
    /* 监听分页事件。加载表格分页数据。
    	    	【使用方式】
    	    	在需要刷新表格的地方增加下面的代码
				this.$refs.zltable.currentPageFn();
        	*/
    currentPageFn(val) {
//  	this.searchConditionData = {
//					singleradiooption : this.state,
//					projectNatureIds:this.nature,
//					projectLevelIds:this.level,
//					projectName : this.pageOptions.itemsIptOptions[0].input,
//					projectNumber : this.pageOptions.itemsIptOptions[1].input,
//					leaderName : this.pageOptions.itemsIptOptions[2].input,
//					userName : this.pageOptions.itemsIptOptions[3].input,
//					contantPerson : this.pageOptions.itemsIptOptions[4].input,
//					startTime : this.dateArr && this.dateArr[0] ? this.dateArr[0] : '',
//					endTime : this.dateArr && this.dateArr[1] ? this.dateArr[1] : '',
//					index : this.page,
//					path:this.$route.path,
//					findType: this.active
//				}
//				this.$setCookie('searchCondition', JSON.stringify(this.searchConditionData) , 24 * 60 * 60);
      var _this = this;
//    if(flag){
      	this.dataSearch.page = val;
//    }else{
//				this.dataSearch.page = this.dataSearch.page ? this.dataSearch.page : val;
//    }
      
      this.dataSearch.limit = 10;
      this.dataSearch.pagesize = 10;
      this.dataSearch.dataSearchPath = this.$route.path;
      if(this.$store.state.dataSearchTabInd){this.dataSearch.dataSearchTabInd=this.$store.state.dataSearchTabInd}
      if(!/projectCont/g.test(this.$route.path)){
        this.$setCookie('searchCondition', JSON.stringify(this.dataSearch) , 24 * 60 * 60);
      }
      // 获取渲染表格数据
      this.$http.post(_this.dataurl, _this.dataSearch).then(
        response => {
          //console.log(JSON.stringify(response.data));
          switch (_this.dataSearch.uniqueType) {
            case "workTime":
              _this.tableData = [];
              if (response.data.length != 0) {
                for (let i = 0; i < response.data.length; i++) {
                  const list = response.data[i].projectmilestoneplanDtoList;
                  for (let j = 0; j < list.length; j++) {
                    list[j].createUserName = response.data[i].createUserName;
                    list[j].normalHour = response.data[i].normalHour;
                    list[j].overHour = response.data[i].overHour;
                    list[j].uId = response.data[i].uId;
                    list[j].weekTotalHours = response.data[i].weekTotalHours;
                    _this.tableData.push(list[j]);
                  }
                }
              } else if (response.data.page) {
                _this.tableData = response.data.page.records;
                _this.totalDataNum = Number(response.data.page.total);
                return;
              }
              break;
            case "fieldnewList":
              _this.tableData = [];
              _this.tableData = response.data.page.records;
              _this.totalDataNum = Number(response.data.page.total);
              break;
            default:
              _this.tableData = response.data;
              _this.totalDataNum = Number(response.count);
          }
        },
        response => {
          console.log("数据加载失败" + response);
        }
      );
    },
    //监听父元素的搜索事件。
    refreshPage() {
      // if(this.totalDataNum > 10){
      	this.currentPageFn(1);
       		//this.$refs.pagination.handerCurrentChange(1);
      // }
    },
    // 给父组件派发事件
    openDetails(row, event, column) {
      this.$emit("trclick", row);
    },
    // 获取选中的内容
    getCheckedTr() {
      return this.$refs.zlpgtable.store.states.selection;
    },
    // 表格多选框
    handleSelectionChange(selection, row) {
      if (!row && selection.length === 0) {
        this.$emit("seleTable", selection, row, this.tableData);
      } else {
        this.$emit("seleTable", selection, row);
      }
    },
    //回显
    selectEcho(arr, key) {
      this.echoArr = arr;
      this.echoKey = key;
    },
    selectEchoCallback() {
      var _this = this;
      this.tableData.forEach((item, index) => {
        if (_this.echoArr.indexOf(item[_this.echoKey]) != -1) {
          _this.$refs.zlpgtable.toggleRowSelection(item, true);
        }
      });
    }
  },
  components: {
    pagination
  },
  watch: {
    tableData: {
      handler(newD, oldD) {
        if (newD && this.echoKey && this.echoArr.length > 0) {
          this.$nextTick(() => {
            this.selectEchoCallback();
          });
        }
      },
      deep: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss'>
.table-comp {
  border: 1px solid rgba(236, 236, 236, 1);
  .totalCon {
    height: 35px;
    line-height: 35px;
    background: rgba(249, 249, 249, 1);
    border-radius: 2px;
    border-bottom: 1px solid rgba(236, 236, 236, 1);
    font-size: 13px;
    color: #262628;
    text-align: right;
    padding-right: 20px;
  }
  .zltable {
    padding: 20px;
    .el-table {
      thead {
        tr {
          height: 32px;
          line-height: 32px;
          font-size: 13px;
          th {
            background-color: #f6faff;
          }
        }
      }
      tr {
        cursor: pointer;
      }
      td,
      th {
        height: 30px;
        line-height: 30px;
        color: #6a6a6a;
        text-align: center;
        padding: 0;
        margin: 0;
      }
    }
  }
  .pagination-con {
    margin: 15px 0 10px 0;
    text-align: center;
  }
}
.zltable .el-table__empty-block {
  height: 300px;
  background: url(../assets/common/nodata.png) no-repeat center;
  .el-table__empty-text {
    margin-top: 100px;
    font-size: 13px;
  }
}
</style>
