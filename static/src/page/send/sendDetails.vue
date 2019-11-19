<template>
    <div class="sendDetailsWrap">
        <div class="sendDetails_Main" v-if="fsDdataShow">
            <div class="sendDetails_projectInfo">
                <p><i class="iconfont icon-renwuxiangqing"></i>项目信息</p>
                <div class="sendDetails_top">
                    <div>
                        <p class="fl">项目名称：<span>{{fsDetailsData[0].projectName}}</span></p>
                        <p class="fl">评估基准日：<span>{{fsDetailsData[0].assessmentBaseDate}}</span></p>
                    </div>
                    <div>
                        <p class="fl">来源途径：<span>{{commonData.projectSourceId[fsDetailsData[0].ASprojectSourceId]}}</span></p>
                        <p class="fl">项目级别：<span>{{commonData.projectLevelId[fsDetailsData[0].projectLevelId]}}级</span></p>
                    </div>
                    <div>
                        <p class="fl">评估对象：<span>{{fsDetailsData[0].assessmentObject}}</span></p>
                        <p class="fl">评估报告类型：<span>{{commonData.assetReportTypeId[fsDetailsData[0].assetReportTypeId]}}</span></p>
                    </div>
                    <div>
                        <p class="fl">项目性质：<span>{{commonData.projectNatureId[fsDetailsData[0].projectNatureId]}}</span></p>
                        <p class="fl">资产总额：<span v-if="fsDetailsData[0].totalAssets != ''">{{fsDetailsData[0].totalAssets}}万元</span></p>
                    </div>
                </div>
            </div>
            <div class="sendDetails_fsDetails">
                <p><i class="iconfont icon-renwuxiangqing"></i>发送详情</p>
                <div class="sendDetails_center">
                    <div>
                        <p class="fl">送达人：<span>{{fsDetailsData[0].sendPerson}}</span></p>
                        <p class="fl">收文时间：<span>{{fsDetailsData[0].receiveDate}}</span></p>
                    </div>
                    <div>
                        <p class="fl">接收单位：<span>{{fsDetailsData[0].receiveUnit}}</span></p>
                        <p class="fl">接收人：<span>{{fsDetailsData[0].receiver}}</span></p>
                    </div>
                    <div>
                        <p>接收留言：<span>{{fsDetailsData[0].receiverMessage}}</span></p>
                    </div>
                </div>
            </div>
            <div class="sendDetails_fileDetail">
                <p><i class="iconfont icon-renwuxiangqing"></i>文件详情</p>
                <div class="sendDetails_bottom">
                    <div class="fileTable">
                        <el-table :data=fsDetailtableData border stripe style="width: 100%">
                            <el-table-column type="index" :index="ind" label="文件列表" width="140"></el-table-column>
                            <el-table-column prop="docName" label="文件名称" width="400"></el-table-column>
                            <el-table-column prop="DocCopies" label="份数"></el-table-column>
                        </el-table>
                    </div>
                    <p class="marginTop10">客户签收单：<span class="filecolor" v-if="fsDetailsData[0].signReceiptFileNamedata != ''">{{fsDetailsData[0].signReceiptFileNamedata}}</span><span class="nocolor" v-if="fsDetailsData[0].signReceiptFileNamedata == ''">无</span></p>
                    <p>客户签收表：<span class="filecolor" v-if="fsDetailsData[0].signReceiptFromFileNamedata != ''">{{fsDetailsData[0].signReceiptFromFileNamedata}}</span><span class="nocolor" v-if="fsDetailsData[0].signReceiptFromFileNamedata == ''">无</span></p>
                    <p>其他附件：<span class="filecolor" v-if="fsDetailsData[0].therEnclosureFileNamedata != ''">{{fsDetailsData[0].therEnclosureFileNamedata}}</span><span class="nocolor" v-if="fsDetailsData[0].therEnclosureFileNamedata == ''">无</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      fsDetailsData: {},
      fsDdataShow: false,
      commonData: window.commonData,
      fsDetailtableData: [],
      row: this.$store.state.dataObj
    };
  },
  mounted() {
    var _this = this;
    this.$http
      .post("/api/reportsend/selectReportSentById", {
        projectId: _this.row.projectId,
        id: _this.row.id
      })
      .then(function(data) {
        _this.fsDdataShow = true;
        _this.fsDetailsData = data.data;
        _this.fsDetailtableData = JSON.parse(data.data[0].docName);
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  },
  methods: {
    ind(index) {
      return "文件" + (index + 1);
    },
    childMethod() {
      // 进入项目
      this.$store.commit("changeShowCommon");
      this.$setCookie('projectId', this.row.projectId ,24*60*60);
      this.$store.state.projectId = this.row.projectId;
      this.$router.push({
        path: "/zlpg/project/projectCont"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.sendDetailsWrap {
  .sendDetails_Main {
    padding: 20px;
    > div {
      height: auto !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      > p {
        height: 35px;
        background: #fafafa;
        border-radius: 2px 2px 0px 0px;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        line-height: 36px;
        font-size: 13px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(38, 38, 40, 1);
        > i {
          color: #f7b543;
          margin-left: 17px;
          margin-right: 10px;
        }
      }
    }
    .sendDetails_projectInfo {
      margin-bottom: 12px;
      .sendDetails_top {
        padding: 20px 40px;
        > div {
          height: auto;
          display: inline-block;
          width: 100%;
          p {
            width: 48%;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #777777;
            line-height: 30px;
            span {
              color: #1d1c1e;
            }
          }
          p:nth-child(even) {
            margin-left: 4%;
          }
        }
      }
    }
    .sendDetails_fsDetails {
      margin-bottom: 12px;
      .sendDetails_center {
        padding: 20px 40px;
        > div {
          height: 30px;
          p {
            width: 50%;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #777777;
            line-height: 30px;
            span {
              color: #1d1c1e;
            }
          }
        }
        > div:last-child {
          > p {
            width: 100%;
          }
        }
      }
    }
    .sendDetails_fileDetail {
      .sendDetails_bottom {
        padding: 12px 20px;
        > p {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #777777;
          line-height: 30px;
          span.filecolor {
            color: #2e68e7;
          }
          span.nocolor {
            color: #1D1C1E;
          }
        }
        .fileTable {
          .el-table /deep/ {
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
      }
    }
  }
}
</style>


