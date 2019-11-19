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
              <div>{{importedequipmentData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.assetsPossessionUnit}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.assessmentBaseDate1}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>金额单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.amountUnit}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-12 tableThbg" colspan="6">
              <div class="text-center">设备基本状况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设备编号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.equipmentNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.equipmentName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规格型号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.specificationModel}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>制造厂家</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.manufacturer}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>购置日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.purchaseDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>启用日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.enableDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>大修次数</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.overhaulTimes}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>最近大修日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.latestOverhaulDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>账面原值</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.originalBookValue}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>账面净值</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.netBookValue}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规定年限</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.prescribedYears}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>已用年数</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.usedYears}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>材料费用</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.materialCost}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>配套部分运费</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.partialFreight}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备利用率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.utilizationRatio}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设计能力</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.designAbility}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>实际能力</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.practicaAbility}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>主体运费</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.subjectFreight}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>安装费率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.installationRate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>安置地点</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.settlementPlace}}</div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">进口情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>外商名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.foreignName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>进口公司</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.importCompany}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>其它税种</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.otherTaxes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>汇率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.exchangeRate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>合同价格</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.contractPrice}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>结算日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.settlementDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>国外运保费</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.foreignPremium}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>进口日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.importDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>关税及税率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.taxRate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>国内运保费</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{importedequipmentData.domesticPremium}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">其他信息</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>事故记录</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.accidentRecord}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设备使用情况介绍</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.equipmentUsage}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设备鉴定情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.appraisalSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>评估原值的确定过程</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.originalDetermine}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>成新率的确定</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.freshRateDetermine}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>评估净值的确定</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.netWorthDetermine}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{importedequipmentData.mattersNotes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位技术人员签字</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="importedequipmentData.artisanSign?(importedequipmentData.aliYunUrl + importedequipmentData.artisanSign):importedequipmentData.artisanSign"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估人员签字</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="importedequipmentData.appraiserSign?(importedequipmentData.aliYunUrl + importedequipmentData.appraiserSign):importedequipmentData.appraiserSign"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <template v-for="(itemTip,indexTip) in importedequipmentImages">
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
                    <img
                      :src="importedequipmentData.aliYunUrl + itemP.file_url"
                      alt
                      @click="enlargeImg($event)"
                    >
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
              <div class="noData" v-if="importedequipmentData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in importedequipmentData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="importedequipmentData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="importedequipmentRadio" disabled label="2">是否报废</el-radio>
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
  name: "IMPORTEDEQUIPMENT", //进口设备
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      importedequipmentData: {},
      importedequipmentRadio: "",
      showImg: false,
      imgSrc: "",
      importedequipmentImages: []
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
            surveyContent: "IMPORTEDEQUIPMENT"
          })
          .then(function(data) {
            _this.importedequipmentData = data.data.ipMent;
            if (_this.importedequipmentData.exception == 1) {
              _this.importedequipmentRadio = "1";
            } else if (_this.importedequipmentData.exception == 2) {
              _this.importedequipmentRadio = "2";
            }
            _this.importedequipmentImages = data.data.ipMent.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "IMPORTEDEQUIPMENT",
            id: thisid
          })
          .then(function(data) {
            _this.importedequipmentData = data.data;
            if (_this.importedequipmentData.exception == 1) {
              _this.importedequipmentRadio = "1";
            } else if (_this.importedequipmentData.exception == 2) {
              _this.importedequipmentRadio = "2";
            }
            _this.importedequipmentImages = data.data.imgmap;
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
