<template>
  <div class="workinghoursQuery">
    <div class="padding020 bgW" v-if="hackReset">
      <!-- 盖章状态 -->
      <single-radio :singleradiooptions="pageOptions.jobClassify" @onradioclick="radioStateEvent"></single-radio>
    </div>
    <div class="displayIbP container">
      <ipt class="fl" :itemsiptoptions="pageOptions.itemsIptOptions"></ipt>
      <div class="sealsearchBtns">
        <div class="search-btn" @click="sealsearch">搜索</div>
        <div class="reset-btn" @click="sealreset">重置</div>
      </div>
    </div>
    <auditnumber-seal :sealListsArr="sealListsArr" :count="count" :thispath="thispath" :thispage="page" v-if="sealListsArr.length && hackReset"></auditnumber-seal>
  </div>
</template>

<script>
import auditnumberSeal from "@/components/auditnumberSeal.vue";
export default {
  name: "seal",
  data() {
    return {
      hackReset: true,
      sealListsArr: [],
      count: 0,
      issealVal: "all",
      thistype: "seal",
      thispath: "",
      page: 1,
      pagesize: 10,
      sealListsaveData: {},
      pageOptions: {
        itemsIptOptions: [
          {
            name: "项目名称：",
            holder: "请输入项目名称",
            key: "projectName",
            url: "/api/reportseal/selectSealList",
            formData: {
              tabFlag: "all",
              type: "seal"
            },
            input: "",
            width: "162px"
          },
          {
            name: "项目编号：",
            holder: "请输入项目编号",
            input: "",
            width: "162px"
          },
          {
            name: "负责人：",
            holder: "请输入项目负责人",
            key: "createUser",
            input: "",
            width: "162px"
          },
          {
            name: "签发人：",
            holder: "请输入签发人",
            key: "createUser",
            input: "",
            width: "162px"
          }
        ],
        jobClassify: {
          txt: "盖章状态：",
          option: [
            {
              name: "全部",
              label: "all"
            },
            {
              name: "已盖章",
              label: "yes"
            },
            {
              name: "部分盖章",
              label: "parte"
            },
            {
              name: "未盖章",
              label: "no"
            }
          ]
        },
        tableOptions: [
          {
            principal: "委托方：",
            continuedTimes: "签发人：",
            situation: "核数人员：",
            allotTimes: "最新时间："
          },
          {
            principal: "项目编号：",
            continuedTimes: "第一签字评估师：",
            situation: "盖章人员：",
            allotTimes: "最新时间："
          },
          {
            principal: "报告编号：",
            continuedTimes: "第二签字评估师：",
            situation: "项目状态："
          }
        ]
      }
    };
  },
  created() {
    let _this = this;
    if(this.$route.path == "/zlpg/reportNumber/seal") {
      this.thispath = "盖章";
    }
    this.$store.state.searchInfo = () => {
      this.sealsearch();
    };
    let searchCondition = JSON.parse(this.$getCookie("searchCondition"));
    if (this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path) {
      this.pageOptions.itemsIptOptions[0].input = searchCondition.projectName;
      this.pageOptions.itemsIptOptions[1].input = searchCondition.projectNumber;
      this.pageOptions.itemsIptOptions[2].input = searchCondition.projectLeaderName;
      this.pageOptions.itemsIptOptions[3].input = searchCondition.issueName;
      this.issealVal = searchCondition.tabFlag;
      this.pageOptions.jobClassify.value = this.issealVal;
      this.page = searchCondition.page;
    }
    this.sealListFunc(this.page);
  },
  methods: {
    // 列表数据
    sealListFunc(pageval) {
      var _this = this;
      _this.sealListsaveData = {
        groupId: _this.$store.state.groupId,
        year: _this.$store.state.year,
        projectName: _this.pageOptions.itemsIptOptions[0].input,
        projectNumber: _this.pageOptions.itemsIptOptions[1].input,
        projectLeaderName: _this.pageOptions.itemsIptOptions[2].input,
        issueName: _this.pageOptions.itemsIptOptions[3].input,
        tabFlag: _this.issealVal,
        type: _this.thistype,
        page: pageval || _this.page,
        rows: _this.pagesize,
        dataSearchPath: _this.$route.path
      };
      this.$setCookie('searchCondition', JSON.stringify(_this.sealListsaveData), 24 * 60 * 60);
      var sealListData = {
        groupId: _this.$store.state.groupId,
        year: _this.$store.state.year,
        projectName: _this.pageOptions.itemsIptOptions[0].input,
        projectNumber: _this.pageOptions.itemsIptOptions[1].input,
        projectLeaderName: _this.pageOptions.itemsIptOptions[2].input,
        issueName: _this.pageOptions.itemsIptOptions[3].input,
        tabFlag: _this.issealVal,
        type: _this.thistype,
        page: pageval || _this.page,
        rows: _this.pagesize
      };
      this.$http
        .post("/api/reportseal/selectSealList", sealListData)
        .then(function(data) {
          _this.count = data.count * 1;
          _this.sealListsArr = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 搜索
    sealsearch() {
      this.sealListsArr = [];
      this.sealListFunc();
    },
    // 重置
    sealreset() {
      this.issealVal = "all";
      this.pageOptions.jobClassify.value = "";
      this.pageOptions.itemsIptOptions.forEach(item => {
        item.input = "";
      });
      this.page = 1;
      this.hackReset = false; //销毁组件
      this.$nextTick(() => {
        this.hackReset = true; //重建组件
        this.sealsearch();
      });
    },
    // 单选筛选
    radioStateEvent(val) {
      this.issealVal = val;
      this.page = 1;
      this.sealsearch();
    }
  },
  components: {
    auditnumberSeal
  }
};
</script>

<style type="text/scss" lang='scss' scoped>
.workinghoursQuery {
  height: 100%;
  flex-direction: column;
  display: -webkit-flex;
  display: flex;
  /* 头部 */
  .bgW {
    background: #fff;
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;
    .singeRadio {
      height: 42px;
      border-bottom: none;
    }
    .singeRadio:last-child {
      border-bottom: 2px dotted rgba(236, 236, 236, 1);
    }
  }
  .displayIbP {
    padding: 0 20px;
    border: 1px solid #ececec;
    border-top: none;
    height: auto;
    background: #fff;
    > * {
      display: inline-block;
    }
    /deep/ .ipt-container {
      float: left !important;
      margin-right: 19px !important;
    }
    .sealsearchBtns {
      margin-bottom: 10px;
      float: right;
      margin-right: 21px;
    }
  }
  .sealListBox {
    margin-top: 12px;
    border: 1px solid #ececec;
    background: #fff;
    flex: 1;
    .list-head {
      padding-right: 20px;
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(38, 38, 40, 1);
      background: rgba(249, 249, 249, 1);
      border-radius: 2px;
      /*border: 1px solid rgba(236, 236, 236, 1);*/
      border-bottom: 1px solid #ececec;
      text-align: right;
    }
    .content-nodata {
      box-sizing: border-box;
      width: 100%;
      background: #fff;
      text-align: center;
      height: 100%;
    }
    .sealcontent {
      padding: 0 15px;
      margin-top: 15px;
      .sealwrap {
        padding-bottom: 10px;
        border: 1px solid #e5e5e5;
        margin-bottom: 10px;
        cursor: pointer;
        .sealhead {
          box-sizing: border-box;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e5e5e5;
          height: 40px;
          line-height: 38px;
          background: #f6faff;
          h2 {
            width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: 15px;
            font-size: 16px;
          }
          .headLabel-container {
            .leaderName {
              color: #636363;
              font-size: 13px;
              margin-right: 25px;
              i {
                color: #262628;
              }
            }
            .head-label {
              margin-left: 5px;
              padding: 3px 8px;
              border-radius: 2px;
              font-size: 12px;
            }
            .projectNature {
              color: #98c268;
              border: 1px solid #c8deaf;
              background: #f1f8e8;
            }
            .projectLevel {
              color: #f09237;
              border: 1px solid #ffc68f;
              background: #fff2e5;
            }
            .assessmentTarget {
              color: #7c9fee;
              border: 1px solid #bbd0ff;
              background: #e9f0ff;
            }
            .projectMessage {
              color: #50adee;
              border: 1px solid #9bd6ff;
              background: #e6f5ff;
            }
          }
        }
        .sealbody {
          padding: 10px 0;
          .body-container {
            display: flex;
            cursor: pointer;
            .basic {
              font-size: 13px;
              line-height: 26px;
            }
            .instanceName {
              display: flex;
              .circular {
                display: block;
                width: 6px;
                height: 6px;
                margin: 10px 10px 10px 15px;
                border-radius: 100%;
              }
              .instance {
                width: 70px;
              }
              .name {
                width: 240px;
                padding-right: 10px;
                font-size: 15px;
                color: #1d1c1e;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-right: 1px solid #ececec;
              }
            }
            .names {
              margin-left: 20px;
              display: flex;
              .nameTit {
                width: 110px;
              }
              .nameItem {
                width: 90px;
                padding-right: 10px;
                font-size: 15px;
                color: #1d1c1e;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                border-right: 1px solid #ececec;
              }
            }
            .namestimes {
              margin-left: 20px;
              display: flex;
              .nameTit {
              }
              .nameItem {
                width: 90px;
                padding-right: 10px;
                font-size: 15px;
                color: #1d1c1e;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .timeTit {
                margin-left: 20px;
              }
              .timeItem {
              }
            }
          }
          li {
            margin-top: 15px;
          }
          li:nth-child(1) {
            .circular {
              background: #49b4a3;
            }
            .instance {
              white-space: nowrap;
              color: #49b4a3;
            }
          }
          li:nth-child(2) {
            .circular {
              background: #698ae9;
            }
            .instance {
              white-space: nowrap;
              color: #698ae9;
            }
            .instanceName,
            .times,
            .situation {
              position: relative;
              &::after {
                content: "";
                width: 1px;
                height: 100px;
                background-color: #ececec;
                position: absolute;
                right: 0;
                top: -35px;
              }
            }
          }
          li:nth-child(3) {
            .circular {
              background: #ea7f2b;
            }
            .instance {
              white-space: nowrap;
              color: #ea7f2b;
            }
          }
        }
      }
    }
    .pagination-container {
      padding-bottom: 20px;
      background: #fff;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
