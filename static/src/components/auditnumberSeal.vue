<template>
  <div class="sealListBox">
    <div class="list-head" v-if="count !== 0">
      <span>
        共计 {{ count }} 个
        <i>{{thispath}}</i>信息
      </span>
    </div>
    <div v-else class="content-nodata">
      <div class="noData">暂无数据</div>
    </div>
    <div
      class="sealcontent"
      v-if="sealListsArr.length"
      v-for="(sealItem,sealIndex) in sealListsArr"
      :key="sealIndex"
    >
      <div class="sealwrap" @click="sealbodyClick(sealItem)">
        <div class="sealhead">
          <h2 :title="sealItem.projectName">{{sealItem.projectName}}</h2>
          <div class="headLabel-container">
            <span class="leaderName">项目负责人：
              <i>{{sealItem.projectLeader}}</i>
            </span>
            <span
              class="head-label projectNature"
            >{{ commonData.projectNatureId[sealItem.projectNatureId] }}</span>
            <span
              class="head-label projectLevel"
            >{{ commonData.projectLevelId[sealItem.projectLevelId] }}级</span>
            <span
              class="head-label assessmentTarget"
            >{{ commonData.assessmentTarget[sealItem.assessmentTarget] }}</span>
            <span
              class="head-label projectMessage"
            >{{ sealItem.isListedCompany == 1 ? "上市" : "非上市" }}</span>
          </div>
        </div>
        <ul class="sealbody">
          <li v-for="(option,index) in pageOptions.tableOptions" :key="index">
            <div class="body-container">
              <div class="basic instanceName">
                <i class="circular"></i>
                <span class="instance">{{option.principal}}</span>
                <span
                  class="name"
                  :title="index === 0 ? sealItem.otherCompanys: '' || index === 1 ? sealItem.projectNumber : '' || index === 2 ? sealItem.reportNumber : ''"
                >{{index === 0 ? sealItem.otherCompanys: ''}}{{index === 1 ? sealItem.projectNumber : ''}}{{index === 2 ? sealItem.reportNumber : ''}}</span>
              </div>
              <div class="basic names">
                <span class="nameTit">{{option.continuedTimes}}</span>
                <span
                  class="nameItem"
                  :title="index === 0 ? sealItem.issueName: '' || index === 1 ? sealItem.firstAppraiser : '' || index === 2 ? sealItem.secondAppraiser : ''"
                >{{index === 0 ? sealItem.issueName: ''}}{{index === 1 ? sealItem.firstAppraiser : ''}}{{index === 2 ? sealItem.secondAppraiser : ''}}</span>
              </div>
              <div class="basic namestimes">
                <span class="nameTit">{{option.situation}}</span>
                <span
                  class="nameItem"
                  :title="index === 0 ? sealItem.auditor: '' || index === 1 ? sealItem.sealName : '' || index === 2 ? sealItem.projectStatus : ''"
                >{{index === 0 ? sealItem.auditor: ''}}{{index === 1 ? sealItem.sealName : ''}}{{index === 2 ? sealItem.projectStatus : ''}}</span>
                <span class="timeTit">{{option.allotTimes}}</span>
                <span
                  class="timeItem"
                  :title="index === 0 ? sealItem.auditorTime: '' || index === 1 ? sealItem.sealTime : ''"
                >{{index === 0 ? sealItem.auditorTime: ''}}{{index === 1 ? sealItem.sealTime : ''}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="pagination-container" v-if="count > 10">
      <pagination
        :pagesize="pagesize"
        :totalDataNum="count"
        :page="page"
        v-on:currentPageFn="sealcurrentPage"
      ></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@/components/pagination";
export default {
  name: "auditnumberSeal",
  props: ["sealListsArr", "count", "thispath", "thispage"],
  data() {
    return {
      commonData: window.commonData,
      page: this.thispage,
      pagesize: 10,
      pageOptions: {
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
  methods: {
    // 点击每个卡片打开详情弹窗
    sealbodyClick(item) {
      this.$store.state.projectId = item.projectId;
      this.$store.commit("changeShowCommonOther");
      if (this.thispath == "盖章") {
        this.$store.state.commonTitleOther = "报告盖章";
      } else if (this.thispath == "核数") {
        this.$store.state.commonTitleOther = "报告核数";
      }
      this.$store.state.commonBtnOther = "进入项目";
      this.$store.state.componentsTypeOther = "sealInfo";
      this.$store.state.cprWidthOther = true;
      this.$store.state.dataObj = item;
    },
    sealcurrentPage(val) {
      this.page = val;
      this.$parent.sealListFunc(val);
    }
  },
  components: {
    pagination
  }
};
</script>

<style type="text/scss" scoped lang="scss">
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
</style>
