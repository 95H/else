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
            <td class="el-col el-col-6 tableTrbg">
              <div>车辆类别</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.type}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>明细表序号</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.serialNumber}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.assetsPossessionUnit}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.assessmentBaseDate1}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>车辆牌号</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.vehicleBrand}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>车辆名称及规格型号</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.nameAndModel}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>生产厂家</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.manufacturer}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>规定行驶里程（公里）</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.prescribedMileage}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>已行驶里程（公里）</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.traveledMileage}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>购置日期</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.purchaseDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>启用日期</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.enableDate}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>规定使用年限</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.prescribedLife}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>大修情况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.overhaulSituation}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>改装情况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.refittingSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>耗油量</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.fuelConsumption}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>是否达到环保要求</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.environmentalProtection}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>事故次数及情况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.accidentSituation}}</div>
            </td>
            <td class="el-col el-col-6" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">外型车身部分</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>车外颜色</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.outColor}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>光泽</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.gloss}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>退色</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.fade}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>锈蚀</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.rust}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>有否被碰撞</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.collision}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>严重程度</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.severity}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>修复</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.repair}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>车灯是否齐全</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.lighting}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>前、后保险杠是否完整</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.bumper}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>其他</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.bodyOther}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">车内装潢部分</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>车内装璜程度</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.decoration}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>颜色</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.innerColor}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>清洁</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.cleanSituation}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>仪表是否齐全有效</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.meter}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>座位是否完整</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.seat}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>其他</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.decorationOther}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">发动机总成</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>动力状况评分</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.powerScore}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>有否更换部件</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.changeParts}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>有否修补现象</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.patchingPhenomenon}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>有否替代部件</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.replaceParts}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>漏油现象</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.engineOilLeakage}}</div>
            </td>
            <td class="el-col el-col-6" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">底盘各部分</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>有否变形</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.deformation}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>有否异响</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.abnormalSound}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>变速箱状况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.transmissionCase}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>后桥状况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.rearAxle}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>前桥状况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.frontAxle}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>传动状况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.transmission}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>漏油现象</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.chassisOilLeakage}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>转向系统情况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.steeringSystem}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>制动系统情况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.brakingSystem}}</div>
            </td>
            <td class="el-col el-col-6" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">电器系统</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>电源系统是否工作正常</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.powerSupplySystem}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>发动机点火器是否工作正常</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.ignitor}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>空调系统是否有效</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.airConditioningSystem}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>音响系统是否正常工作</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.soundSystem}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>其他</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.electricOther}}</div>
            </td>
            <td class="el-col el-col-6" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">其他信息</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>鉴定意见</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{vehicleData.appraisalOpinion}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>市调价格</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.marketPrice}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>评估价格</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{vehicleData.assessmentPrice}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{vehicleData.mattersNotes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>资产占有单位技术人员</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="vehicleData.artisanSign?(vehicleData.aliYunUrl + vehicleData.artisanSign):vehicleData.artisanSign"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>评估人员</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="vehicleData.appraiserSign?(vehicleData.aliYunUrl + vehicleData.appraiserSign):vehicleData.appraiserSign"
                  alt
                >
              </div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in vehicleImages">
            <tr class="el-row" :key="indexTip + 'title'">
              <td class="el-col el-col-24 tableThbg" colspan="4">
                <div class="text-center">{{itemTip.mainTitle}}</div>
              </td>
            </tr>
            <tr class="el-row" :key="indexTip+ 'tips'">
              <td class="el-col el-col-24 imgLists" colspan="4">
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
                      :src="vehicleData.aliYunUrl + itemP.file_url"
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
            <td class="el-col el-col-24 tableThbg" colspan="4">
              <div class="text-center">录音</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 audioList" colspan="4">
              <div class="noData" v-if="vehicleData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in vehicleData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="vehicleData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="4">
              <el-radio class="fr padding5" v-model="vehicleRadio" disabled label="2">是否报废</el-radio>
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
  name: "VEHICLE", //车辆
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      vehicleData: {},
      vehicleRadio: "",
      showImg: false,
      imgSrc: "",
      vehicleImages: []
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
            surveyContent: "VEHICLE"
          })
          .then(function(data) {
            _this.vehicleData = data.data.vehicle;
            if (_this.vehicleData.exception == 1) {
              _this.vehicleRadio = "1";
            } else if (_this.vehicleData.exception == 2) {
              _this.vehicleRadio = "2";
            }
            _this.vehicleImages = data.data.vehicle.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "VEHICLE",
            id: thisid
          })
          .then(function(data) {
            _this.vehicleData = data.data;
            if (_this.vehicleData.exception == 1) {
              _this.vehicleRadio = "1";
            } else if (_this.vehicleData.exception == 2) {
              _this.vehicleRadio = "2";
            }
            _this.vehicleImages = data.data.imgmap;
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
