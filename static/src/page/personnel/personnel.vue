<template>
  <div class="personnel-con">
    <div class="container">
      <!-- 导航模块 begin -->
      <div class="nav-container">
        <nav-list class="pv" :navoptions="pageOptions.tabOptions"></nav-list>
      </div>
      <!-- 导航模块 end -->
      <!-- 单选模块 begin -->
      <!-- <div class="singleRadio-container" v-if="hackReset">
        <single-radio :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent"></single-radio>
      </div> -->
      <!-- 单选模块 end -->
      <!-- 搜索模块 begin -->
      <div class="search-container">
        <ipt :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
        <span class="fs13">提交时间：</span>
        <el-date-picker
          v-model="dateArr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div class="text-right padding020 marginBottom10">
        <button class="search-btn" @click="searchEvent">搜索</button>
        <button class="reset-btn" @click="resetEvent">重置</button>
      </div>
      <!-- 搜索模块 end -->
    </div>
    <!-- 列表展示模块 begin -->
    <div class="marginTop10 bg_white">
      <div class="totalCon">共计{{totalDataNum}}条数据</div>
      <!-- <zltable ref="zltable" :dataTableHead="pageOptions.tableOptions" :dataurl="userListUrl" :pageShowFlag="true" v-on:trclick="tableEvent" :dataSearch="selectForm"></zltable> -->
      <div class="userList padding20">
        <el-table border
          @row-click="tableEvent"
          :data="tableData"
          stripe
          style="width: 100%" size="mini">
          <el-table-column
            prop="userName"
            label="员工姓名"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="所属机构"
            show-overflow-tooltip
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="所属部门"
            show-overflow-tooltip
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="最早释放日期"
            align="center">
          </el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称"
            align="center"
            width="280">
            <template slot-scope="scope">
              <table class="projectNameListTable">
                <tr v-for="(projectItem,index) in scope.row.pName.split(',')" :key="index">
                  <td><div class="cell el-tooltip" style="width:280px;" :title="projectItem">{{projectItem}}</div></td>
                </tr>
              </table>
            </template>
          </el-table-column>
          <el-table-column
            prop="projectNumber"
            label="项目编号"
            align="center"
            width="160">
            <template slot-scope="scope">
                <table class="projectNumListTable">
                <tr v-for="(projectItem,index) in scope.row.pNumber.split(',')" :key="index">
                  <td>{{projectItem==0 ? '' : projectItem}}</td>
                </tr>
              </table>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center marginTop20" v-show="totalDataNum > 10">
          <pagination ref="pagination" :pagesize="10" :totalDataNum="totalDataNum" v-on:currentPageFn="currentPageFn"></pagination>
        </div>
      </div>
    </div>
    <!-- 列表展示模块 end -->
  </div>
</template>

<script>
  import zltable from '../../components/zltable.vue';
  import PersonnerDetails from '../personnel/PersonnerDetails'
  import pagination from "../../components/pagination.vue";
  var that
  export default {
    data() {
      return {
        pageOptions: {
          tabOptions: [
            {label: '项目人员', href: 'personnel', name: 'first'}
          ],
          itemsIptOptions: [
            {name: '员工姓名：', holder: '请输入员工姓名',key:'createUser', input: '',width:'135px'},
            {name: '所属机构：', holder: '请输入所属机构',key:'groupName', input: '',width:'135px'},
            {name: '所属部门：', holder: '请输入所属部门',key:'responsible', input: '',width:'135px'}
          ]
        },
        // userListUrl : "/api/projectuser/findUserList",
        selectForm:{
          userName : "",
          organName : "",
          deptName : "",
          startDate: "",
          endDate : "",
          page : 1,
          pagesize : 10,
        },
        tableData : [],
        totalDataNum : 0,
        dateArr : [],
        pageNo : 1,
      };
    },
    components: {
      zltable,
      PersonnerDetails,
      pagination
    },
    created() {
      that = this;
      this.getTableData();
      this.$store.state.searchInfo = ()=>{
        this.searchEvent();
      }
    },
    methods: {
      currentPageFn(val){
        this.selectForm.page = val;
        this.getTableData();
      },
      getTableData(){
        this.$http.post('/api/projectuser/findUserList',this.selectForm).then(res => {
          this.tableData = res.data;
          this.totalDataNum = Number(res.count);
        }).catch(error => {
          this.$messageError(error);
        })
      },
      searchEvent() { // 搜索按钮事件
        this.selectForm.userName = that.pageOptions.itemsIptOptions[0].input;
        this.selectForm.groupName = that.pageOptions.itemsIptOptions[1].input;
        this.selectForm.deptName = that.pageOptions.itemsIptOptions[2].input;
        this.selectForm.startDate = this.dateArr[0];
        this.selectForm.endDate = this.dateArr[1];
        this.currentPageFn(1);
      },
      resetEvent() { // 重置按钮事件
        this.pageOptions.itemsIptOptions.forEach(item => {
          item.input = '';
        })
        this.dateArr = [];
        for(let i in this.selectForm){
          this.selectForm[i] = '';
        }
        this.currentPageFn(1);
      },

      tableEvent(arg) {
        this.$store.commit('changeShowCommon');
        this.$store.state.commonTitle = '人员详情';
        this.$store.state.componentsType = 'PersonnerDetails';
        this.$store.state.cprWidth=true;
        this.$store.state.dataObj = arg;
      }
    }
  }


</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.personnel-con{
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		/deep/ .el-table__empty-block {
	    height: 300px;
	    background: url(../../assets/common/nodata.png) no-repeat center;
	    .el-table__empty-text {
	      margin-top: 100px;
	      font-size: 13px;
	    }
	  }
	}
  /* 列表头部 */
  .list-head {
    padding-right: 20px;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(38, 38, 40, 1);
    background: rgba(249, 249, 249, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-bottom: none;
    text-align: right
  }
  .bg_white{ background-color:#fff !important; border:1px solid #ececec;flex:1;
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
    .userList{
    	.el-table td, .el-table th{box-sizing: content-box;}
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
          .projectNameListTable,.projectNumListTable{
            margin:0 -10px 0 -10px;
            width:280px;
            tr{
              background-color:transparent;
              td{ border-right:none;}
              &:last-child td{ border-bottom:none; }
            }
          }
          .projectNumListTable{ width:160px; }
        }
      }
      .el-table__empty-block {
        height: 300px;
        background: url(../../assets/common/nodata.png) no-repeat center;
        .el-table__empty-text {
          margin-top: 100px;
          font-size:13px;
        }
      }
    }
  }

</style>
