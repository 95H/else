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
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>存货类别</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.typeName}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>实物管理</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.objectManagement}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>编报单位</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.reportingUnit}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>库号</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.baseNumber}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>评估基准日</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.assessmentBaseDate1}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>关帐日</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.closingDay}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>盘点日</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.inventoryDay}}</div>
            </td>
            <td class="el-col el-col-4" :colspan="8/(inventoryData.detailsList.length>0?1:2)"></td>
          </tr>
        </tbody>
        <tbody v-for="(item,index) in inventoryData.detailsList" :key="index + '0'">
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="12">
              <div class="text-center">{{item.name}}({{item.serialNumber}})</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">材料规格</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">材料单位</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">存放地点编号</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">单价</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">帐面结存数量</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">帐面结存金额</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">盘点日结存数量</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">盘点日结存金额</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">半年库龄</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">1年库龄</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">2年库龄</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">3年库龄</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.materialSpecification}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.materialUnit}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.placeNumber}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.unitPrice}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.bookNumber}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.bookAmount}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.inventoryDayNumber}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.inventoryDayAmount}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.halfYearAge}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.oneYearAge}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.twoYearAge}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.threeYearAge}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">数量差异</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">入库</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">出库</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">盘盈</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">盘亏</div>
            </td>
            <td class="el-col el-col-2 tableTrbg">
              <div class="text-center">盈亏净金额</div>
            </td>
            <td class="el-col el-col-2 tableTrbg" colspan="6">
              <div class="text-center">库龄及差异分析</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.numberDifference}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.enterStorage}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.outStorage}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.overage}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.loss}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg">
              <div>{{item.netAmount}}</div>
            </td>
            <td class="el-col el-col-2 tableTextbg" colspan="6">
              <div>{{item.analysis}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 tableThbg" colspan="12">
              <div class="text-center">{{item.imgmap[0].mainTitle}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td class="el-col el-col-24 imgLists" colspan="12">
              <div
                v-for="(itemData,indexData) in item.imgmap[0].subData"
                :key="indexData + 'itemData'"
              >
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
                    :src="inventoryData.aliYunUrl + itemP.file_url"
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
          <template v-if="item.soundList != 0">
            <tr class="el-row">
              <td class="el-col el-col-24 tableThbg" colspan="12">
                <div class="text-center">录音</div>
              </td>
            </tr>
            <tr class="el-row">
              <td class="el-col el-col-24 audioList" colspan="12">
                <div
                  v-for="(itemSound,indexSound) in item.soundList"
                  :key="indexSound + 'itemSound'"
                >
                  <interview-audio
                    v-bind:mp3="inventoryData.aliYunUrl + itemSound.file_url"
                    v-bind:audioName="itemSound.file_name"
                  ></interview-audio>
                </div>
              </td>
            </tr>
          </template>
          <tr class="el-row">
            <td class="el-col el-col-24" colspan="12">
              <el-radio class="fr padding5" v-model="item.exception" disabled label="2">异常标记</el-radio>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr class="el-row">
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>库存总金额</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.inventoryAmount}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>抽查金额</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.checkAmount}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>抽查率</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.amountCheckRate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>库存总数量</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.inventoryNumber}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>抽查数量</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.checkNumber}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>抽查率</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.numberCheckRate}}</div>
            </td>
          </tr>
          <tr class="el-row">
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>盘点说明和结论</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="6/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>{{inventoryData.explanationConclusion}}</div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>仓库保管员</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div class="autographImg text-center">
                <img
                  :src="inventoryData.warehouseman?(inventoryData.aliYunUrl + inventoryData.warehouseman):inventoryData.warehouseman"
                  alt
                >
              </div>
            </td>
          </tr>
          <tr class="el-row">
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>抽盘人</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div class="autographImg text-center">
                <img
                  :src="inventoryData.takeOutPerson?(inventoryData.aliYunUrl + inventoryData.takeOutPerson):inventoryData.takeOutPerson"
                  alt
                >
              </div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>盘点单位负责人</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div class="autographImg text-center">
                <img
                  :src="inventoryData.unitPerson?(inventoryData.aliYunUrl + inventoryData.unitPerson):inventoryData.unitPerson"
                  alt
                >
              </div>
            </td>
            <td
              class="el-col el-col-4 tableTrbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div>盘点人</div>
            </td>
            <td
              class="el-col el-col-4 tableTextbg"
              :colspan="2/(inventoryData.detailsList.length>0?1:2)"
            >
              <div class="autographImg text-center">
                <img
                  :src="inventoryData.stocktakPerson?(inventoryData.aliYunUrl + inventoryData.stocktakPerson):inventoryData.stocktakPerson"
                  alt
                >
              </div>
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
  name: "INVENTORY", //存货盘点
  components: {
    tabItem,
    BigImg,
    interviewAudio
  },
  props: ["componentsType", "leftListArr"],
  data() {
    return {
      ids: 0,
      inventoryData: { detailsList: [] },
      showImg: false,
      imgSrc: ""
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
            surveyContent: "INVENTORY"
          })
          .then(function(data) {
            _this.inventoryData = data.data.investory;
            for (var i = 0; i < _this.inventoryData.detailsList.length; i++) {
              _this.inventoryData.detailsList[i].exception =
                _this.inventoryData.detailsList[i].exception + "";
            }
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else {
        this.$http
          .post("/api/fieldinvestigation/surveyType/info", {
            relationCode: "INVENTORY",
            id: thisid
          })
          .then(function(data) {
            _this.inventoryData = data.data;
            for (var i = 0; i < _this.inventoryData.detailsList.length; i++) {
              _this.inventoryData.detailsList[i].exception =
                _this.inventoryData.detailsList[i].exception + "";
            }
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
  > div {
    padding: 0 !important;
    margin-top: 10px;
  }
  > div:first-child {
    margin-top: 0;
  }
}
</style>
