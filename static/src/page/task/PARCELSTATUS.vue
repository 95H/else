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
              <div>宗地类别</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.type}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>明细表序号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>土地权证编号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.warrantNumber}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>宗地名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.parcelName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>所在地</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.location}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>填报单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.fillingUnit}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">周围土地状况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>宗地位于县市</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.city}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>宗地距县市中心距离</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.centerDistance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>周围土地类型</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.landType}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>东至</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.east}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>西至</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.west}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>北至</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.north}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>南至</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.south}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">交通状况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>主干道名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.trunkRoadName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>主干道距宗地距离（米）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.trunkRoadDistance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>次干道名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.secondRoadName}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>次干道距宗地距离（米）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.secondRoadDistance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>支路名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.branchName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>支路距宗地距离（米）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.branchDistance}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>公交便利度</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.transit}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>铁路</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.railway}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>航运</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.shipping}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>距火车站距离（公里）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.trainStationDistance}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>距机场离（公里）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.airportDistance}}</div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">外部基础设施</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>供电来源</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.externalPowerSource}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>供水来源</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.externalWaterSource}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>排水</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.externalDrainage}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>雨污排水类型</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.externalDrainageType}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>供暖</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.externalHeating}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>供气</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.externalSupplyGas}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">内部基础设施</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>供电来源</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.insidePowerSource}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>供水来源</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.insideWaterSource}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>排水</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.insideDrainage}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>雨污排水类型</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.insideDrainageType}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>供暖</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.insideHeating}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>供气</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.insideSupplyGas}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">配套和环境</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>邮局</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.postOffice}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>银行</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.bank}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>中小学</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.schools}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>医院</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.hospital}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>超市</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.supermarket}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>商场</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.market}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>自然环境</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.naturalEnvironment}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>人文环境</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.culturalEnvironment}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规划限制</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.planningConstraints}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>周边集聚状况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.peripheralAgglomeration}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">地质地形状况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>地质状况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.geologicalCondition}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>宗地形状</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.parcelShape}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>宗地内场地</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.parcelSite}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>影响利用的自然灾害</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.naturalDisaster}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">宗地建筑物状况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>房产名称</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>竣工日期</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>建筑结构</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>现用途</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>房产证号</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>建筑面积（平方米）</div>
            </td>
          </tr>
          <tr class="el-row" v-for="(item,index) in parcelstatusData.detailsList" :key="index">
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item.houseName}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item.completionDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item.buildingStructure}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item.presentUse}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item.houseCertificate}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item.buildingArea}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">其他信息</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="4">
              <div>{{parcelstatusData.mattersNotes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>填表人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="parcelstatusData.formHolderSign?(parcelstatusData.aliYunUrl + parcelstatusData.formHolderSign):parcelstatusData.formHolderSign"
                  alt
                >
              </div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>联系电话</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{parcelstatusData.contactNumber}}</div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <template v-for="(itemTip,indexTip) in parcelstatusImages">
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
                      :src="parcelstatusData.aliYunUrl + itemP.file_url"
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
              <div class="noData" v-if="parcelstatusData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in parcelstatusData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="parcelstatusData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="parcelstatusRadio" disabled label="2">异常标记</el-radio>
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
  name: "PARCELSTATUS", //宗地
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      parcelstatusData: {},
      parcelstatusRadio: "",
      showImg: false,
      imgSrc: "",
      parcelstatusImages: []
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
            surveyContent: "PARCELSTATUS"
          })
          .then(function(data) {
            _this.parcelstatusData = data.data.parcelStatus;
            if (_this.parcelstatusData.exception == 1) {
              _this.parcelstatusRadio = "1";
            } else if (_this.parcelstatusData.exception == 2) {
              _this.parcelstatusRadio = "2";
            }
            _this.parcelstatusImages = data.data.parcelStatus.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "PARCELSTATUS",
            id: thisid
          })
          .then(function(data) {
            _this.parcelstatusData = data.data;
            if (_this.parcelstatusData.exception == 1) {
              _this.parcelstatusRadio = "1";
            } else if (_this.parcelstatusData.exception == 2) {
              _this.parcelstatusRadio = "2";
            }
            _this.parcelstatusImages = data.data.imgmap;
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
