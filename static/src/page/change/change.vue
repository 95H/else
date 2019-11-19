<template>
  <div>
    <div class="container">

      <div class="nav-container">
        <nav-list :navoptions="pageOptions.tabOptions" @onnavlistclick="navEvent"></nav-list>
      </div>

      <div class="singleRadio-container" v-if="hackReset">
        <single-checkbox :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent()" v-if="pageOptions.itemsIptOptionschecked==='first'" :key=1></single-checkbox>
        <single-checkbox :singleradiooptions="pageOptions.singleRadioOptions" @onradioclick="radioEvent()" v-else :key=2></single-checkbox>
      </div>

      <div class="search-container">
        <ipt :itemsiptoptions="itemsIptOptions"></ipt>
        <!--<span class="txt" style="width:auto;font-size:13px;">操作时间：</span>-->
        <!--<el-date-picker-->
          <!--v-model="value2"-->
          <!--align="right"-->
          <!--type="date"-->
          <!--placeholder="请选择"-->
          <!--:picker-options="pickerOptions1">-->
        <!--</el-date-picker>-->
        <div style="margin-left: 10px;">
          <button class="search-btn" @click="searchEvent">搜索</button>
          <button class="reset-btn" @click="resetEvent">重置</button>
        </div>
      </div>

      <personnel-show-list :childdata="parentDate"
                           :tableoptions="pageOptions.tableOptions">
        <div slot="head-info">
          <div class="list-head">
            <span>共计 {{ count }} 个签发信息</span>
          </div>
        </div>
      </personnel-show-list>

    </div>
  </div>
</template>

<script>
  import PersonnelShowList from '../personnel/PersonnelShowList'

  export default {
    components: {PersonnelShowList},
    data() {
      return {
        pageOptions: {
          tabOptions: [
            {label: '项目变更', href: 'changeshowprojectlist', name: 'first'},
            {label: '报告变更', href: 'changeshowreportlist', name: 'second'}
          ],
          singleRadioOptions: {
            txt: '类型分类：',
            option: [
              {name: '待审核', id: 1},
              {name: '已通过', id: 2},
              {name: '未通过', id: 3},
            ],
            optionId:[1,2,3]
          },
          itemsIptOptions: [
            {name: '项目名称：', holder: '请输入项目名称',width:'120px'},
            {name: '项目编号：', holder: '请输入项目编号',width:'120px'},
            {name: '承作机构：', holder: '请输入承作机构',width:'120px'},
            {name: '报告编号：', holder: '请输入报告编号',width:'120px'},
            {name: '申请人：', holder: '请输入申请人',width:'120px'},
          ],
          itemsIptOptionschecked:"first",
          tableOptions: [
            {prop: 'userName', width: 100, label: '人员姓名'},
            {prop: 'mechanism', width: '', label: '所属机构'},
            {prop: 'department', width: 160, label: '所属部门'},
            {prop: 'endDate', width: 120, label: '最早释放日期'},
            {prop: 'projectName', width: 276, label: '项目名称'},
            {prop: 'procStage', width: 100, label: '状态', _param: "projectPhaseId"}
          ]
        },
        parentDate: [],
        count: 0,
        input: '',
        pickerOptions1: {},
        value2: '',
        hackReset: true
      };
    },
    computed:{
      itemsIptOptions(){
        if(this.pageOptions.itemsIptOptionschecked === "first"){
          return this.pageOptions.itemsIptOptions.filter((item,index) => (index !== 3))
        }else if(this.pageOptions.itemsIptOptionschecked === "second"){
          return this.pageOptions.itemsIptOptions.filter((item,index) => (index !== 2))
        }
      }
    },
    methods: {
      navEvent(name) {
        this.pageOptions.itemsIptOptionschecked = name;
      },
      radioEvent(val) {
//        console.log(val);
      },
      projectEvent() {
        this.showMask = !this.showMask;
      },
      searchEvent() {
      },
      resetEvent() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  /* 头部 */
  .container {
    height: 135px;
    background: #fff;
  }

  /*  */
  .nav-container {
    border-bottom: 1px solid rgba(236, 236, 236, 1);
  }

  /* 单选模块 */
  .singleRadio-container {
    padding: 0 20px;
  }

  /* 搜索模块 */
  .search-container {
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  /* 按钮 */
  .search-btn,
  .reset-btn {
    padding: 0;
    border: none;
    width: 70px;
    height: 25px;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer
  }

  /* 搜索按钮 */
  .search-btn {
    margin-right: 5px;
    background: rgba(58, 128, 236, 1);
    color: rgba(255, 255, 255, 1);
  }


  /* 重置按钮 */
  .reset-btn {
    background: #fff;
    border: 1px solid rgba(58, 128, 236, 1);
    color: rgba(58, 128, 236, 1);
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
</style>
