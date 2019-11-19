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
              <div>{{generalequipmentData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.assetsPossessionUnit}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.assessmentBaseDate1}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>编制人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.compilationPerson}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>编制日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.compilationDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>复核人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.reviewer}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>复核日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.reviewDate}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">设备基本情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设备编号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.equipmentNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.equipmentName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规格型号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.specificationModel}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>制造厂家</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.manufacturer}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>出厂日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.productionDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>购建日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.purchaseDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>启用日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.enableDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规定使用年限</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.serviceLife}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备重量</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.equipmentWeight}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>大修情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.overhaulSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>重大技改情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.technicalImprovement}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">设备技术状态</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>铭牌、标牌完整</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.signIntegrity}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>外表面划伤</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.scratch}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>锈蚀</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.rust}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>机体变形</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.deformation}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>有缺件</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.missingParts}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>运转正常</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.work}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>能耗增加</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.energyConsumption}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>噪音增大</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.noise}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>有泄漏</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.leak}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>压力正常</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.pressure}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>温升正常</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.temperatureRise}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>振动增加</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.vibration}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>其他</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.other}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">使用情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>使用环境</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.useEnvironment}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>运行状况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.functionStatus}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>工作状态</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.workStatus}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>利用率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.utilizationRatio}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>故障发生率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.faultRatio}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>可提供原出力的</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.outputRatio}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>废品率</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{generalequipmentData.wasteRatio}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">其他情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>技术档案是否齐全</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.archivesComplete}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>最近检测时间及情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.detectionSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>主要技术指标</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.technicalIndex}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>功能先进/落后程度</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.advancedBackward}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>日常维修保养情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.maintenanceSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>鉴定意见</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.appraisalOpinion}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{generalequipmentData.mattersNotes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>技术人员签字</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="generalequipmentData.artisanSign?(generalequipmentData.aliYunUrl + generalequipmentData.artisanSign):generalequipmentData.artisanSign"
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
                  :src="generalequipmentData.appraiserSign?(generalequipmentData.aliYunUrl + generalequipmentData.appraiserSign):generalequipmentData.appraiserSign"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <template v-for="(itemTip,indexTip) in generalequipmentImages">
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
                      :src="generalequipmentData.aliYunUrl + itemP.file_url"
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
              <div class="noData" v-if="generalequipmentData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in generalequipmentData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="generalequipmentData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="generalequipmentRadio" disabled label="2">是否报废</el-radio>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 右侧内容 end -->
  </div>
</template>

<script>
import tabItem from "./tabItem.vue";
import BigImg from "./bigImg.vue";
import interviewAudio from "./interviewAudio.vue";

export default {
  name: "GENERALEQUIPMENT", //通用设备
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      generalequipmentData: {},
      generalequipmentRadio: "",
      showImg: false,
      imgSrc: "",
      generalequipmentImages: []
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
            surveyContent: "GENERALEQUIPMENT"
          })
          .then(function(data) {
            _this.generalequipmentData = data.data.itMent;
            if (_this.generalequipmentData.exception == 1) {
              _this.generalequipmentRadio = "1";
            } else if (_this.generalequipmentData.exception == 2) {
              _this.generalequipmentRadio = "2";
            }
            _this.generalequipmentImages = data.data.itMent.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "GENERALEQUIPMENT",
            id: thisid
          })
          .then(function(data) {
            _this.generalequipmentData = data.data;
            if (_this.generalequipmentData.exception == 1) {
              _this.generalequipmentRadio = "1";
            } else if (_this.generalequipmentData.exception == 2) {
              _this.generalequipmentRadio = "2";
            }
            _this.generalequipmentImages = data.data.imgmap;
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
