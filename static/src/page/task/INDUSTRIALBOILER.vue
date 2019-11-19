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
              <div>{{industrialboilerData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.assetsPossessionUnit}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.assessmentBaseDate1}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>编制人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.compilationPerson}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>编制日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.compilationDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>复核人</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.reviewer}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>复核日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.reviewDate}}</div>
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
              <div>{{industrialboilerData.equipmentNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.equipmentName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规格型号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.specificationModel}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>制造厂家</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.manufacturer}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>出厂日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.productionDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>购建日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.purchaseDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>启用日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.enableDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>规定使用年限</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.serviceLife}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>设备重量</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.equipmentWeight}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>大修情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.overhaulSituation}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>重大技改情况</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.technicalImprovement}}</div>
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
            <td class="el-col el-col-4 tableTrbg" colspan="2">
              <div>蒸发量(吨/小时) / 供热量(千卡/小时)</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>蒸气温度（摄氏度）</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>蒸气压力（Mpa）</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>热效率（%）</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>设计值</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="2">
              <div>{{industrialboilerData.designEvaporation}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.designTemperature}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.designPressure}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.designEfficiency}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>实测值</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="2">
              <div>{{industrialboilerData.actualEvaporation}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.actualTemperature}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.actualPressure}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{industrialboilerData.actualEfficiency}}</div>
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
              <div>{{industrialboilerData.archivesComplete}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>当地劳动部门检验情况及结论</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.laborDepartment}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>最近一次检验、发证时间及到期日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.correlationTime}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>锅炉本体（包括：炉墙、炉塘等）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.noumenon}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>锅炉附件（包括：安全阀、压力表等）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.boilerAccessories}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>锅炉辅机（可以单独做鉴定）</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.boilerAuxiliary}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>鉴定意见</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.appraisalOpinion}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{industrialboilerData.mattersNotes}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位技术人员签字</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div class="autographImg">
                <img
                  :src="industrialboilerData.artisanSign?(industrialboilerData.aliYunUrl + industrialboilerData.artisanSign):industrialboilerData.artisanSign"
                  alt
                >
              </div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in industrialboilerImages">
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
                      :src="industrialboilerData.aliYunUrl + itemP.file_url"
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
              <div class="noData" v-if="industrialboilerData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in industrialboilerData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="industrialboilerData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="industrialboilerRadio" disabled label="2">是否报废</el-radio>
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
  name: "INDUSTRIALBOILER", //工业锅炉
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      industrialboilerData: {},
      industrialboilerRadio: "",
      showImg: false,
      imgSrc: "",
      industrialboilerImages: []
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
            surveyContent: "INDUSTRIALBOILER"
          })
          .then(function(data) {
            _this.industrialboilerData = data.data.boiler;
            if (_this.industrialboilerData.exception == 1) {
              _this.industrialboilerRadio = "1";
            } else if (_this.industrialboilerData.exception == 2) {
              _this.industrialboilerRadio = "2";
            }
            _this.industrialboilerImages = data.data.boiler.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "INDUSTRIALBOILER",
            id: thisid
          })
          .then(function(data) {
            _this.industrialboilerData = data.data;
            if (_this.industrialboilerData.exception == 1) {
              _this.industrialboilerRadio = "1";
            } else if (_this.industrialboilerData.exception == 2) {
              _this.industrialboilerRadio = "2";
            }
            _this.industrialboilerImages = data.data.imgmap;
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
