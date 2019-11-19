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
              <div>{{pressurevesselData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.assetsPossessionUnit}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.assessmentBaseDate1}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>编制人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.compilationPerson}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>编制日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.compilationDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>复核人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.reviewer}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>复核日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.reviewDate}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">设备基本状况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设备编号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.equipmentNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.equipmentName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规格型号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.specificationModel}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>制造厂家</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.manufacturer}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>出厂日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.productionDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>购建日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.purchaseDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>启用日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.enableDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规定使用年限</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.serviceLife}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备重量</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.equipmentWeight}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>大修情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.overhaulSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>重大技改情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.technicalImprovement}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">主要技术指标</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>项目</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>压力（Mpa)</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>温度（摄氏度）</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>容积（立方米）</div>
            </td>
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>介质</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设计值</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.designPressure}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.designTemperature}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.designVolume}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="2">
              <div>{{pressurevesselData.designMedium}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>实测值</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.actualPressure}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.actualTemperature}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{pressurevesselData.actualVolume}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="2">
              <div>{{pressurevesselData.actualMedium}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">其他情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>技术资料是否齐全</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.archivesComplete}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>安全等级</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.safetyLevel}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>当地劳动部门检验情况及结论</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.laborDepartment}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>最近一次检验、发证时间及到期日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.correlationTime}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>本体（包括：筒体、封头、法兰等）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.noumenon}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>安全附件（包括：压力表、温度计等）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.safetyAccessories}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>其他</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.otherInformation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>鉴定意见</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.appraisalOpinion}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{pressurevesselData.mattersNotes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位技术人员签字</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div class="autographImg">
                <img
                  :src="pressurevesselData.artisanSign?(pressurevesselData.aliYunUrl + pressurevesselData.artisanSign):pressurevesselData.artisanSign"
                  alt
                >
              </div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in pressurevesselImages">
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
                      :src="pressurevesselData.aliYunUrl + itemP.file_url"
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
              <div class="noData" v-if="pressurevesselData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in pressurevesselData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="pressurevesselData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="pressurevesselRadio" disabled label="2">是否报废</el-radio>
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
  name: "PRESSUREVESSEL", //压力容器
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      pressurevesselData: {},
      pressurevesselRadio: "",
      showImg: false,
      imgSrc: "",
      pressurevesselImages: []
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
            surveyContent: "PRESSUREVESSEL"
          })
          .then(function(data) {
            _this.pressurevesselData = data.data.pressurevessel;
            if (_this.pressurevesselData.exception == 1) {
              _this.pressurevesselRadio = "1";
            } else if (_this.pressurevesselData.exception == 2) {
              _this.pressurevesselRadio = "2";
            }
            _this.pressurevesselImages = data.data.pressurevessel.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "PRESSUREVESSEL",
            id: thisid
          })
          .then(function(data) {
            _this.pressurevesselData = data.data;
            if (_this.pressurevesselData.exception == 1) {
              _this.pressurevesselRadio = "1";
            } else if (_this.pressurevesselData.exception == 2) {
              _this.pressurevesselRadio = "2";
            }
            _this.pressurevesselImages = data.data.imgmap;
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
