<template>
    <div class="sendWrap">
        <div class="fs_header">
            <p class="fs_headTit fl fw600">报告发送</p>
            <div class="fs_headBtn search-btn fr" @click="newSendBtn"><span>+</span> 新建发送</div>
        </div>
        <div class="fs_search">
            <div class="search-container">
                <ipt :itemsiptoptions="fspageOptions.itemsIptOptions"></ipt>
                <div class="fs_searchBtn">
                    <div class="search-btn" @click="fsSearch">搜索</div>
                    <div class="reset-btn" @click="fsReset">重置</div>
                </div>
            </div>
        </div>
        <div class="fs_TableCont table-card marginTop10">
            <div class="fs_Table table-con">
                <zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="fsSearchDatas" v-on:trclick="fsTrClick"></zltable>
            </div>
        </div>
    </div>
</template>
<script>
import zltable from "../../components/zltable.vue";
export default {
  data() {
    return {
      hackReset: true,
      fspageOptions: {
        itemsIptOptions: [
          { name: "项目名称：", holder: "请输入项目名称", key: 'projectName',url:'/api/reportsend/selectReportsents',formData:{}, input: "", width: '194px' },
          { name: "项目编号：", holder: "请输入项目编号", input: "", width: '194px' },
          { name: "收件单位：", holder: "请输入收件单位", input: "", width: '194px' }
        ]
      },
      fsSearchData: {},
      dataTableHead: [
        { title: "项目名称", name: "projectName", width: "200px" },
        { title: "项目编号", name: "projectNumber", width: "140px" },
        { title: "收件单位", name: "receiveUnit", width: "200" },
        { title: "收件人", name: "receiver", width: "140" },
        { title: "发送人", name: "sendPerson", width: "160" },
        { title: "收文时间", name: "receiveDate" }
      ], //表头数据。title：表头的title。name：接口数据字段。
      pagesize: 10, //表格每页的条数。
      totalDataNum: 1000, //表格总条数。
      dataurl: "/api/reportsend/selectReportsents" //表格数据api。
    };
  },
  methods: {
    //返回回显
    goBack(){
      let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
      if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
        this.fspageOptions.itemsIptOptions[0].input = searchCondition.projectName;
        this.fspageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
        this.fspageOptions.itemsIptOptions[2].input = searchCondition.receiveUnit;
        this.fsSearchDatas.projectName = searchCondition.projectName;   //項目名称
        this.fsSearchDatas.projectNumber = searchCondition.projectNumber;  //项目编号
        this.fsSearchDatas.receiveUnit = searchCondition.receiveUnit;  //收件单位
        this.fsSearchDatas.page = searchCondition.page;
      }
    },
    fsSearch() {
    	this.fsSearchDatas.page=1;
      this.$refs.zltable.refreshPage();
    },
    fsReset() {
      this.fspageOptions.itemsIptOptions.forEach(item => {
        item.input = "";
      });
      this.fsSearchDatas = {
      	page: 1,
      	projectName: '',
        projectNumber: '',
        receiveUnit: ''
      }
      this.hackReset = false; //销毁组件
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
        this.$refs.zltable.refreshPage();
      });
      
    },
    fsTrClick(row) {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "发送详情";
      this.$store.state.commonBtn = "进入项目";
      this.$store.state.componentsType = "sendDetails";
      this.$store.state.dataObj = row;
    },
    newSendBtn() {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "新建发送";
      this.$store.state.commonBtn = "提交";
      this.$store.state.componentsType = "sendNew";
    }
  },
  computed: {
    fsSearchDatas() {
      return {
        projectName: this.fspageOptions.itemsIptOptions[0].input,
        projectNumber: this.fspageOptions.itemsIptOptions[1].input,
        receiveUnit: this.fspageOptions.itemsIptOptions[2].input
      };
    }
  },
  created() {
    var _this = this;
    this.goBack();
    this.$store.state.resetFun = function() {
      _this.fsReset();
    };
    this.$store.state.searchInfo = ()=>{
      this.fsSearch();
    }
  },
  components: {
    zltable
  }
};
</script>
<style lang="scss" scoped>
.sendWrap {
	height: 100%;
	flex-direction: column;
	display: -webkit-flex;
	display: flex;
  .fs_header {
    height: 35px !important;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    line-height: 35px;
    padding: 0 20px;
    .fs_headTit {
      font-size: 13px;
      font-family: PingFangSC-Medium;
      // font-weight: 500;
      color: rgba(20, 95, 210, 1);
      border-bottom: 2px solid #145fd2;
      height: 34px;
    }
    .fs_headBtn {
      width: 95px;
      height: 26px;
      margin-top: 4px;
      span {
        width: 13px;
        height: 13px;
        display: inline-block;
        background: #145fd2;
        border-radius: 3px;
        margin-right: 2px;
        line-height: 11px;
      }
    }
  }
  .fs_search {
    height: 56px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-top: none;
    .search-container {
      padding-right: 0;
      .ipt-wrap {
        height: 52px;
        padding-bottom: 0;
      }
    }
    .fs_searchBtn {
      height: 52px;
      line-height: 52px;
    }
  }
  .table-card {
		background: #fff;
		flex: 1;
		-ms-flex:1 0 auto;
		.table-con,.table-comp{height: 100%;box-sizing: border-box;}
	}
}
</style>

