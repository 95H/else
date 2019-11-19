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
              <div>{{cashData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.assessmentBaseDate1}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>币种</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.currencyName}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>存放地点</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.storagePlace}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>基准日记帐汇率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.benchmarkDailyRate}}</div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">清点现金</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-center">货币面额</div>
            </td>
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-center">张数</div>
            </td>
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-center">金额</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">100元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsHundredQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsHundredSum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">50元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsFiftyQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsFiftySum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">20元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsTwentyQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsTwentySum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">10元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsTenQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsTenSum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">5元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsFiveQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsFiveSum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">2元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsTwoQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsTwoSum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">1元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsOneQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsOneSum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">小于1元</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsLessOneQuantity}}</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="2">
              <div class="text-right">{{cashData.denominationsLessOneAmount}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-8 tableTrbg" colspan="2">
              <div class="text-left">合计</div>
            </td>
            <td class="el-col el-col-8 tableTextbg" colspan="4">
              <div class="text-right">{{cashData.sum}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">核对金额</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>现金基准日帐面余额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.cashBalanceBookBalance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>加：收入凭证未记帐</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.receiptsNotAccounted}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>减：付出凭证未记帐</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.expenditureNotAccounted}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>加：基准日至盘点日收入</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.baseToInventoryIncome}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>减：基准日至盘点日支出</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.baseToInventoryExpenditure}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>调后（盘点日）现金余额</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.cashBalance}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>实盘现金</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.firmCash}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>长款</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.moreCash}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>短款</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{cashData.lessCash}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>现金盘点日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{cashData.cashStocktakingDay}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>差异原因分析、拟进行的调整及调整结果</div>
            </td>
            <td class="el-col el-col-20 tableTextbg" colspan="5">
              <div>{{cashData.analysisAndResults}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>出纳</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="cashData.cashier?(cashData.aliYunUrl + cashData.cashier):cashData.cashier"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>财务负责人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="cashData.finance?(cashData.aliYunUrl + cashData.finance):cashData.finance"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估人员</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="cashData.appraiser?(cashData.aliYunUrl + cashData.appraiser):cashData.appraiser"
                  alt
                >
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-20 tableTextbg" colspan="5">
              <div>{{cashData.mattersNotes}}</div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in cashImages">
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
                    <img :src="cashData.aliYunUrl + itemP.file_url" alt @click="enlargeImg($event)">
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
              <div class="noData" v-if="cashData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in cashData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="cashData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="cashRadio" disabled label="2">异常标记</el-radio>
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
  name: "CASHCHECK", //现金盘点
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      cashData: {},
      cashRadio: "",
      showImg: false,
      imgSrc: "",
      cashImages: []
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
            surveyContent: "CASHCHECK"
          })
          .then(function(data) {
            _this.cashData = data.data.cash;
            if (_this.cashData.exception == 1) {
              _this.cashRadio = "1";
            } else if (_this.cashData.exception == 2) {
              _this.cashRadio = "2";
            }
            _this.cashImages = data.data.cash.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "CASHCHECK",
            id: thisid
          })
          .then(function(data) {
            _this.cashData = data.data;
            if (_this.cashData.exception == 1) {
              _this.cashRadio = "1";
            } else if (_this.cashData.exception == 2) {
              _this.cashRadio = "2";
            }
            _this.cashImages = data.data.imgmap;
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
