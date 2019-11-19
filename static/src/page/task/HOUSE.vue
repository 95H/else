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
              <div>房屋类别</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.type}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>明细表序号</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.serialNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.assetsPossessionUnit}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.assessmentBaseDate1}}</div>
            </td>
            <td class="el-col el-col-4" colspan="4"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">房屋基本情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>建筑名称</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.buildingName}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>结构主体类型</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.subjectType}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>结构局部类型</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.localType}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>竣工日期</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.completionDate}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>排架跨度(m)</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.span}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>地上层高</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.upperLayerHeight}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>地下层高</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.undergroundHeight}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>局部层高</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.localStoreyHeight}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>檐高</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.eavesHight}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>地上层数</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.upperLayerNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>地下层数</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.undergroundNumber}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>局部层数</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.localStoreyNumber}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>主体建筑面积</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.subjectArea}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>附房建筑面积</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.subsidiaryArea}}</div>
            </td>
            <td class="el-col el-col-4" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">房屋结构部分</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>结构名称</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>结构作法</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>材质</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>现状</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>标准分</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>勘察分</div>
            </td>
          </tr>
          <tr
            class="el-row"
            v-for="(item1,index1) in houseData.houseStructurePartList"
            :key="index1 + 'item1'"
          >
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item1.structureName}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item1.structuralMethod}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item1.material}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item1.presentSituation}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item1.standardScore}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item1.reconnaissanceScore}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>分值合计</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.structureBaseScore}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>权重确定</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.structureWeight}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>权重后得分</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.structureScore}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">房屋装修情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>结构名称</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>结构作法</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>材质</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>现状</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>标准分</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>勘察分</div>
            </td>
          </tr>
          <tr
            class="el-row"
            v-for="(item2,index2) in houseData.houseDecorationList"
            :key="index2 + 'item2'"
          >
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item2.structureName}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item2.structuralMethod}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item2.material}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item2.presentSituation}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item2.standardScore}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item2.reconnaissanceScore}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>分值合计</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.renovationBaseScore}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>权重确定</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.renovationWeight}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>权重后得分</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.renovationScore}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">房屋设备情况</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>结构名称</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>结构作法</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>材质</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>现状</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>标准分</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>勘察分</div>
            </td>
          </tr>
          <tr
            class="el-row"
            v-for="(item3,index3) in houseData.houseEquipmentList"
            :key="index3 + 'item3'"
          >
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item3.structureName}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item3.structuralMethod}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item3.material}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item3.presentSituation}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item3.standardScore}}</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{item3.reconnaissanceScore}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>分值合计</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.equipmentBaseScore}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>权重确定</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.equipmentWeight}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>权重后得分</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.equipmentScore}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="6">
              <div class="text-center">其他信息</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>总得分</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div>{{houseData.scoreSum}}</div>
            </td>
            <td class="el-col el-col-4 tableTrbg">
              <div>资产占有单位技术人员签字</div>
            </td>
            <td class="el-col el-col-4 tableTextbg">
              <div class="autographImg text-center">
                <img
                  :src="houseData.artisanSign?(houseData.aliYunUrl + houseData.artisanSign):houseData.artisanSign"
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
                  :src="houseData.appraiserSign?(houseData.aliYunUrl + houseData.appraiserSign):houseData.appraiserSign"
                  alt
                >
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-4 tableTrbg">
              <div>备注</div>
            </td>
            <td class="el-col el-col-4 tableTextbg" colspan="5">
              <div>{{houseData.remarks}}</div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in houseImages">
            <tr class="el-row" :key="indexTip + 'title'">
              <td class="el-col el-col-24 tableThbg" colspan="12">
                <div class="text-center">{{itemTip.mainTitle}}</div>
              </td>
            </tr>
            <tr class="el-row" :key="indexTip+ 'tips'">
              <td class="el-col el-col-24 imgLists" colspan="12">
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
                      :src="houseData.aliYunUrl + itemP.file_url"
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
            <td class="el-col el-col-24 tableThbg" colspan="12">
              <div class="text-center">录音</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 audioList" colspan="12">
              <div class="noData" v-if="houseData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in houseData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="houseData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="6">
              <el-radio class="fr padding5" v-model="houseRadio" disabled label="2">异常标记</el-radio>
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
  name: "HOUSE", //房屋
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      houseData: {},
      houseRadio: "",
      showImg: false,
      imgSrc: "",
      houseImages: []
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
            surveyContent: "HOUSE"
          })
          .then(function(data) {
            _this.houseData = data.data.investigaHouseList;
            if (_this.houseData.exception == 1) {
              _this.houseRadio = "1";
            } else if (_this.houseData.exception == 2) {
              _this.houseRadio = "2";
            }
            _this.houseImages = data.data.investigaHouseList.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "HOUSE",
            id: thisid
          })
          .then(function(data) {
            _this.houseData = data.data;
            if (_this.houseData.exception == 1) {
              _this.houseRadio = "1";
            } else if (_this.houseData.exception == 2) {
              _this.houseRadio = "2";
            }
            _this.houseImages = data.data.imgmap;
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
