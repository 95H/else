<template>
    <div class="fi_Wrap">
        <div class="fi_top">
            <div class="fi_header">
                <p class="fi_headTit fl">现场任务</p>
                <div class="fr search-btn newBuildField marginTop5" @click="fieldSurvey" v-if="$store.state.readonly && !$store.state.isNoEditInvestorPower">新建现场任务</div>
            </div>
            <div class="fi_seleBtn singleRadio-container">
                <!-- 作业类型 -->
                <single-radio :singleradiooptions="fipageOptions.singleRadioTypeOptions" @onradioclick="radiojobTypeEvent"></single-radio>
                <!-- 状态分类 -->
                <single-checkbox :singleradiooptions="fipageOptions.singleRadioStateOptions" @onradioclick="radioStateEvent"></single-checkbox>
                <!-- 资产类型 -->
                <single-checkbox :singleradiooptions="fipageOptions.singleRadioAssetsOptions" @onradioclick="radioAssetsEvent"></single-checkbox>
            </div>
            <div class="fi_search">
                <div class="search-container">
                    <ipt :itemsiptoptions="fipageOptions.itemsIptOptions"></ipt>
                    <div class="fi_searchBtn">
                        <div class="search-btn" @click="fiSearch">搜索</div>
                        <div class="reset-btn" @click="fiReset">重置</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-card marginTop10">
            <div class="table-con" v-if="tableShow">
                <zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="form" v-on:trclick="fsTrClick"></zltable>
            </div>
        </div>
    </div>
</template>
<script>
import zltable from "../../components/zltable.vue";
export default {
  name: "fieldInvestigation",
  data() {
    return {
      state: "",
      tableShow: false,
      form: {
        jobType: 1,
        jobStatus: "1184,1185,1186,1187",
        taskType: "1,2",
        projectName: "",
        groupName: "",
        headName: "",
        investorId: this.$store.state.investorId
      },
      fipageOptions: {
        itemsIptOptions: [
          { name: "项目名称：", holder: "请输入项目名称",key:"projectName",url:"/api/fieldinvestigation/fieldInvestigationList",formData:{jobType: 1,jobStatus: "1184,1185,1186,1187",taskType: "1,2",}, input: "" },
          { name: "承作机构：", holder: "请输入承作机构",key:"groupName", input: "" },
          { name: "任务人：", holder: "请输入任务人",key:"createUser", input: "" }
        ],
        singleRadioTypeOptions: {
          txt: "作业类型：",
          option: [
            { name: "我分配的", label: "1", zyisShow: JSON.parse(this.$getCookie('user')).isExternal },
            { name: "我作业的", label: "2" }
          ],
          optionId: []
        },
        singleRadioStateOptions: {
          txt: "状态分类：",
          option: [
            { name: "未开始", id: "1184" },
            { name: "进行中", id: "1185" },
            { name: "已完成", id: "1186" },
            { name: "被拒绝", id: "1187" }
          ],
          optionId: ["1184", "1185", "1186", "1187"]
        },
        singleRadioAssetsOptions: {
          txt: "资产分类：",
          option: [
            { name: "现场访谈", id: "1" },
            { name: "实地调查", id: "2" }
          ],
          optionId: ["1", "2"]
        }
      },
      dataTableHead: [
        { title: "项目名称", name: "projectName" },
        { title: "负责公司", name: "name" },
        { title: "任务类型", name: "jobType", width: "80" },
        { title: "任务人", name: "userName", width: "70" },
        { title: "承作机构", name: "groupName" },
        { title: "任务内容（科目数量：个）", name: "content", width: "220" },
        { title: "状态", name: "taskStatus", width: "70", _param: "taskStatusId" }
      ], //表头数据。title：表头的title。name：接口数据字段。
      pagesize: 10, //表格每页的条数。
      totalDataNum: 1000, //表格总条数。
      dataurl: "/api/fieldinvestigation/fieldInvestigationList" //表格数据api。
    };
  },
  methods: {
    // 搜索
    fiSearch() {
      this.form.projectName = this.fiSearchDatas.projectName;
      this.form.groupName = this.fiSearchDatas.groupName;
      this.form.headName = this.fiSearchDatas.headName;
      this.$refs.zltable.refreshPage();
    },
    // 重置
    fiReset() {
      this.fipageOptions.itemsIptOptions.forEach(item => {
        item.input = "";
      });
      this.form.projectName = "";
      this.form.groupName = "";
      this.form.headName = "";
      this.hackReset = false; //销毁组件
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
      });
      this.$refs.zltable.refreshPage();
    },
    //作业类型
    radiojobTypeEvent(val) {
      this.form.jobType = val;
      this.fipageOptions.itemsIptOptions[0].formData.jobType = val;
      this.$refs.zltable.refreshPage();
    },
    //状态分类
    radioStateEvent(val, arr) {
      if (arr) {
        this.state = arr.join(",");
      } else if (val) {
        this.state = this.fipageOptions.singleRadioStateOptions.optionId.join(
          ","
        );
      } else {
        this.state = "";
      }
      this.form.jobStatus = this.state;
      this.fipageOptions.itemsIptOptions[0].formData.jobStatus = this.state;
      this.$refs.zltable.refreshPage();
    },
    //资产分类
    radioAssetsEvent(val, arr) {
      if (arr) {
        this.state = arr.join(",");
      } else if (val) {
        this.state = this.fipageOptions.singleRadioAssetsOptions.optionId.join(
          ","
        );
      } else {
        this.state = "";
      }
      this.form.taskType = this.state;
      this.fipageOptions.itemsIptOptions[0].formData.taskType = this.state;
      this.$refs.zltable.refreshPage();
    },
    //新建现场任务
    fieldSurvey() {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "新建现场调查任务";
      this.$store.state.commonBtn = "分配";
      this.$store.state.componentsType = "newFieldSurvey";
    },
    // 点击表格每一行弹出详情
    fsTrClick(row) {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "现场作业任务详情";
      if (row.taskStatus == "1184" && this.form.jobType == "2") {
        // 待接受
        this.$store.state.commonBtn = "接受"; // 第一个按钮
        this.$store.state.extraBtn = "拒绝"; //第二个按钮
      } else if (
        row.taskStatus == "1185" ||
        row.taskStatus == "1186" ||
        row.taskStatus == "1187"
      ) {
        // 进行中，已完成，已拒绝
        this.$store.state.commonBtn = "";
      }
      if (row.fiType == 1) {
        this.$store.state.componentsType = "spotInterview"; //现场访谈
      } else if (row.fiType == 2) {
        this.$store.state.componentsType = "spotTaskInfo"; //现场勘查
      }
      this.$store.state.dataObj = row;
      this.$store.state.taskWorkType = "work";
    }
  },
  created() {
    var _this = this;
    this.$store.state.resetFun = function() {
      _this.fiReset();
    };
    this.$store.state.searchInfo = ()=>{
      _this.fiSearch();
    }
    for(var i = 0;i< this.fipageOptions.singleRadioTypeOptions.option.length;i++) {
      if(this.fipageOptions.singleRadioTypeOptions.option[i].zyisShow != true) {
        this.form.jobType = this.fipageOptions.singleRadioTypeOptions.option[i].label;
        this.fipageOptions.itemsIptOptions[0].formData.jobType = this.form.jobType;
        this.tableShow = true;
        return
      }
    }

  },
  computed: {
    fiSearchDatas() {
      return {
        projectName: this.fipageOptions.itemsIptOptions[0].input,
        groupName: this.fipageOptions.itemsIptOptions[1].input,
        headName: this.fipageOptions.itemsIptOptions[2].input
      };
    }
  },
  watch: {
    "$store.state.investorId"(newD, oldD) {
      if (newD) {
        this.form.investorId = newD;
        this.fiReset();
      }
    }
  },
  components: {
    zltable
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.fi_Wrap {
  .fi_top {
    border-radius: 2px;
    border: 1px solid rgba(236, 236, 236, 1);
    .fi_header {
      display: inline-block;
      border-bottom: 1px solid rgba(236, 236, 236, 1);
      width: 96%;
      padding: 0 2%;
      height: 35px;
      line-height: 35px;
      p {
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #145fd2;
        line-height: 34px;
        border-bottom: 2px solid #145fd2;
      }
      .newBuildField {
        height: 25px;
        padding: 0 11px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: white;
        width: auto;
      }
    }
    .fi_seleBtn {
      .singeRadio {
        height: 34px;
      }
    }
    /deep/ .fi_search {
      width: 100%;
      display: inline-block;
      /deep/ .el-input {
        width: 186px;
      }
    }
  }
}
</style>