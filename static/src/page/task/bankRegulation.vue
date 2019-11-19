<template>
  <div class="title">
    <div class="noData" v-show="ids==''">暂无数据</div>
    <!-- 左侧导航 begin -->
    <tab-item
      v-show="ids!=''"
      @tabItem="tabItems"
      :componentsType="componentsType"
      :leftListArr="leftListArr"
    ></tab-item>
    <!-- 右侧内容 begin -->
    <div v-show="ids!=''" class="commonTable marginTop5">
      <table class="tableList">
        <tbody>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>明细表序号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.assetsPossessionUnit}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.assessmentBaseDate1}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>编制人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.compilingPerson}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>编制日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.compilationDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>开户银行名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.bankName}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>帐号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.accounts}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估复核人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.evaluationReviewer}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估复核日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.assessmentReviewDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>银行对帐单余额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.bankStatementBalance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>企业银行存款日记帐余额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.bankDepositDayBalance}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>加:企业已收银行未收金额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.enterprisesReceivedBankNot}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>加:银行已收企业未收金额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.bankReceivedEnterprisesNot}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-12" colspan="3">
              <table class="el-col el-col-24">
                <tr class="el-row">
                  <td class="el-col el-col-8 tableTrbg">
                    <div>内容</div>
                  </td>
                  <td class="el-col el-col-8 tableTrbg">
                    <div>发生日期</div>
                  </td>
                  <td class="el-col el-col-8 tableTrbg">
                    <div>金额</div>
                  </td>
                </tr>
                <tr
                  class="el-row"
                  v-for="(item1,index1) in bankData.enterprisesReceivedBankNotList"
                  :key="index1 + 'item1'"
                >
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item1.content}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item1.occurrenceDate}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item1.amount}}</div>
                  </td>
                </tr>
                <tr class="el-row">
                  <td class="el-col el-col-4 tableTrbg" colspan="2">
                    <div>减:企业已付银行未支金额</div>
                  </td>
                  <td class="el-col el-col-4 tableTextbg" colspan="1">
                    <div>{{bankData.enterprisesPaymentBankNot}}</div>
                  </td>
                </tr>
                <tr class="el-row">
                  <td class="el-col el-col-4 tableTrbg">
                    <div>内容</div>
                  </td>
                  <td class="el-col el-col-4 tableTrbg">
                    <div>发生日期</div>
                  </td>
                  <td class="el-col el-col-4 tableTrbg">
                    <div>金额</div>
                  </td>
                </tr>
                <tr
                  class="el-row"
                  v-for="(item2,index2) in bankData.enterprisesPaymentBankNotList"
                  :key="index2 + 'item2'"
                >
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item2.content}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item2.occurrenceDate}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item2.amount}}</div>
                  </td>
                </tr>
              </table>
            </td>
            <td class="el-col el-col-12" colspan="3">
              <table class="el-col el-col-24">
                <tr class="el-row">
                  <td class="el-col el-col-8 tableTrbg">
                    <div>内容</div>
                  </td>
                  <td class="el-col el-col-8 tableTrbg">
                    <div>发生日期</div>
                  </td>
                  <td class="el-col el-col-8 tableTrbg">
                    <div>金额</div>
                  </td>
                </tr>
                <tr
                  class="el-row"
                  v-for="(item3,index3) in bankData.bankReceivedEnterprisesNotList"
                  :key="index3 + 'item3'"
                >
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item3.content}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item3.occurrenceDate}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item3.amount}}</div>
                  </td>
                </tr>
                <tr class="el-row">
                  <td class="el-col el-col-4 tableTrbg" colspan="2">
                    <div>减:银行已付企业未支金额</div>
                  </td>
                  <td class="el-col el-col-4 tableTextbg" colspan="1">
                    <div>{{bankData.bankPaymentEnterprisesNot}}</div>
                  </td>
                </tr>
                <tr class="el-row">
                  <td class="el-col el-col-4 tableTrbg">
                    <div>内容</div>
                  </td>
                  <td class="el-col el-col-4 tableTrbg">
                    <div>发生日期</div>
                  </td>
                  <td class="el-col el-col-4 tableTrbg">
                    <div>金额</div>
                  </td>
                </tr>
                <tr
                  class="el-row"
                  v-for="(item4,index4) in bankData.bankPaymentEnterprisesNotList"
                  :key="index4 + 'item4'"
                >
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item4.content}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item4.occurrenceDate}}</div>
                  </td>
                  <td class="el-col el-col-8 tableTextbg">
                    <div>{{item4.amount}}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg"><div>内容</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>发生日期</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>金额</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>内容</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>发生日期</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>金额</div></td>
          </tr>-->
          <!-- <tr class="el-row">
            <td class="el-col el-col-4 tableTextbg"><div>11</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>12</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>13</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>21</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>22</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>23</div></td>
          </tr>-->
          <!-- <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>减:企业已付银行未支金额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="1">
              <div>{{bankData.enterprisesPaymentBankNot}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>减:银行已付企业未支金额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="1">
              <div>{{bankData.bankPaymentEnterprisesNot}}</div>
            </td>
          </tr>-->
          <!-- <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg"><div>内容</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>发生日期</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>金额</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>内容</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>发生日期</div></td>
            <td class="el-col el-col-4 tableTrbg"><div>金额</div></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTextbg"><div>11</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>12</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>13</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>21</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>22</div></td>
            <td class="el-col el-col-4 tableTextbg"><div>23</div></td>
          </tr>-->
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>调整后银行对帐单余额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.adjustmentBankStatementBalance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>调整后银行日记帐单余额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{bankData.adjustmentBankDepositDayBalance}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>复核及提供调整事项与会计分录</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="4">
              <div>{{bankData.adjustmentItemsAccountingEntries}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="4">
              <div>{{bankData.mattersNotes}}</div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in bankImages">
            <tr class="el-row" :key="indexTip + 'title'">
              <td class="el-col el-col-24 tableThbg" colspan="6">
                <div class="text-center">{{itemTip.mainTitle}}</div>
              </td>
            </tr>
            <tr class="el-row" :key="indexTip+ 'tips'">
              <td class="el-col el-col-24 imgLists" colspan="6">
                <div v-for="(itemData,indexData) in itemTip.subData" :key="indexData + 'itemData'">
                  <p class="secondaryTitle" :title="itemData.name">
                    <span></span>
                    {{itemData.name}}
                  </p>
                  <div
                    class="secondary secondaryPicture fl"
                    v-for="(itemP,indexP) in itemData.imgList"
                    :key="indexP + 'picture'"
                  >
                    <img :src="bankData.aliYunUrl + itemP.file_url" alt @click="enlargeImg($event)">
                    <span :title="itemP.file_name">{{itemP.file_name}}</span>
                    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
                  </div>
                  <div
                    class="secondary secondaryFile fl"
                    v-for="(itemF,indexF) in itemData.fileList"
                    :key="indexF + 'file'"
                  >
                    <i :class="filterFileFn(itemF.file_name)"></i>
                    <span :key="indexF + 'file2'" :title="itemF.file_name">{{itemF.file_name}}</span>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">录音</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 audioList" colspan="6">
              <div class="noData" v-if="bankData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in bankData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="bankData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="bankRadio" disabled label="2">异常标记</el-radio>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import tabItem from "./tabItem.vue";
import BigImg from "./bigImg.vue";
import interviewAudio from "./interviewAudio.vue";

export default {
  name: "BANKREGULATION", //银行调节
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      bankData: {},
      bankRadio: "",
      showImg: false,
      imgSrc: "",
      bankImages: []
    };
  },
  methods: {
    filterFileFn(val) {
      return this.$filterSuffix(val);
    },
    tabItems(id, fId) {
      if (id != "") {
        this.ids = id;
        this.listFn(id);
      } else {
        this.ids = "";
      }
      if (this.$store.state.dataObj.listType == "manuscript") {
        this.topInfoFn(fId);
      }
    },
    enlargeImg(e) {
      this.showImg = true;
      this.imgSrc = e.currentTarget.src;
    },
    viewImg() {
      this.showImg = false;
    },
    listFn(thisid) {
      var _this = this;
      if (this.$store.state.dataObj.listType != "manuscript") {
        this.$http
          .post("/api/fieldinvestigation/getInfo", {
            id: thisid,
            surveyContent: "BANKREGULATION"
          })
          .then(function(data) {
            _this.bankData = data.data.bank;
            if (_this.bankData.exception == 1) {
              _this.bankRadio = "1";
            } else if (_this.bankData.exception == 2) {
              _this.bankRadio = "2";
            }
            _this.bankImages = data.data.bank.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "BANKREGULATION",
            id: thisid
          })
          .then(function(data) {
            _this.bankData = data.data;
            if (_this.bankData.exception == 1) {
              _this.bankRadio = "1";
            } else if (_this.bankData.exception == 2) {
              _this.bankRadio = "2";
            }
            _this.bankImages = data.data.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      }
    },
    topInfoFn(thisfId) {
      var _this = this;
      // 资产基础法-底稿-顶部信息
      this.$http
        .post("/api/app/fieldInvestigation/info", {
          fieldInvestigationId: thisfId
        })
        .then(function(data) {
          _this.$emit("top-Info", data.data);
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  > .noData {
    width: 100%;
    border: 1px solid #e5e5e5;
    margin-top: 5px;
  }
  .commonTable .tableList tr th,
  .commonTable .tableList tr td {
    vertical-align: top;
  }
}
.imgLists {
  padding: 14px 40px;
  > div {
    padding: 0 !important;
    clear: both;
    display: inline-block;
    width: 100%;
  }
  .secondary {
    margin: 6px 9px;
    span {
      display: inline-block;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 116px;
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(38, 38, 40, 1);
      line-height: 26px;
    }
    span:hover {
      color: #3a80ec;
    }
  }
  .secondaryTitle {
    span {
      width: 6px;
      height: 6px;
      background: rgba(240, 146, 55, 1);
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
      margin-bottom: 2px;
    }
    font-size: 13px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(38, 38, 40, 1);
    margin-bottom: 8px;
    margin-top: 2px;
  }
  .secondaryPicture {
    img {
      width: 70px;
      height: 50px;
      cursor: zoom-in;
      display: block;
      margin: 4px auto;
    }
  }
}
.audioList {
  padding: 10px 0 !important;
  .noData {
    height: 104px;
    line-height: 194px;
  }
  > div {
    padding: 0 !important;
    margin-top: 10px;
  }
  > div:first-child {
    margin-top: 0;
  }
}
</style>
