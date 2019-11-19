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
              <div>科目名称</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.type}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>明细表序号</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.serialNumber}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>评估基准日</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.assessmentBaseDate1}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>资产占有单位</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.assetsPossessionUnit}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>编制人</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.compilationPerson}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>编制日期</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.compilationDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>复核人</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.verifyingPerson}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>复核日期</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.verifyingDate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>户名</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.accountName}}</div>
            </td>
            <td class="el-col el-col-6 tableTrbg">
              <div>金额</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.amountMoney}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>被调查人及资料索引</div>
            </td>
            <td class="el-col el-col-6 tableTextbg">
              <div>{{creditorData.respondentsData}}</div>
            </td>
            <td class="el-col el-col-6" colspan="2"></td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>帐款形成原因</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{creditorData.formationCause}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>债权追偿、诉讼等情况</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{creditorData.lawsuit}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>债务人现状及拟采取的追偿措施</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{creditorData.recoveryMeasures}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>被调查人分析判断</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{creditorData.respondentsAnalysis}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>评估师分析判断</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{creditorData.appraiserAnalysis}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-6 tableTrbg">
              <div>特殊事项备注</div>
            </td>
            <td class="el-col el-col-6 tableTextbg" colspan="3">
              <div>{{creditorData.mattersNotes}}</div>
            </td>
          </tr>
          <template v-for="(itemTip,indexTip) in creditorImages">
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
                      :src="creditorData.aliYunUrl + itemP.file_url"
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
              <div class="noData" v-if="creditorData.soundList == 0">暂无录音</div>
              <div
                v-for="(itemSound,indexSound) in creditorData.soundList"
                :key="indexSound + 'itemSound'"
              >
                <interview-audio
                  v-bind:mp3="creditorData.aliYunUrl + itemSound.file_url"
                  v-bind:audioName="itemSound.file_name"
                ></interview-audio>
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="4">
              <el-radio class="fr padding5" v-model="creditorRadio" disabled label="2">异常标记</el-radio>
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
  name: "CREDITOR", //可疑债权调查
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      creditorData: {},
      creditorRadio: "",
      showImg: false,
      imgSrc: "",
      creditorImages: []
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
            surveyContent: "CREDITOR"
          })
          .then(function(data) {
            _this.creditorData = data.data.creditor;
            if (_this.creditorData.exception == 1) {
              _this.creditorRadio = "1";
            } else if (_this.creditorData.exception == 2) {
              _this.creditorRadio = "2";
            }
            _this.creditorImages = data.data.creditor.imgmap;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "CREDITOR",
            id: thisid
          })
          .then(function(data) {
            _this.creditorData = data.data;
            if (_this.creditorData.exception == 1) {
              _this.creditorRadio = "1";
            } else if (_this.creditorData.exception == 2) {
              _this.creditorRadio = "2";
            }
            _this.creditorImages = data.data.imgmap;
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
  >.noData {
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
