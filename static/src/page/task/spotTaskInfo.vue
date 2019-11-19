<template>
  <div class="center-body">
    <i class="iconfont icon-lixiangshenqingxinxi fl marginTop10" v-if="$store.state.dataObj.listType == 'manuscript'"></i>
    <ul class="tabs" v-if="$store.state.dataObj.listType == 'manuscript'">
      <li
        class="li-tab fl"
        v-for="(item,index) in tabsParam"
        :key="index"
        @click="toggleTabs(index)"
        :class="{active:index===nowIndex}"
        v-show="!(index == 1 && kcData === '[]' || (index == 1 && $store.state.dataObj.fieldKCY == undefined))"
      >{{item}}</li>
    </ul>
    <div class="divTab" v-show="nowIndex===0" v-if="$store.state.dataObj.listType == 'manuscript'">
      <dg-Detail></dg-Detail>
    </div>
    <div class="divTab" v-show="nowIndex===1" v-if="kcData !== '[]' && $store.state.dataObj.fieldKCY != undefined">
      <kc-Detail @setKcData="setKcData"></kc-Detail>
    </div>
    <kc-Detail ref="kcDetai" @setKcData="setKcData" v-if="$store.state.dataObj.listType != 'manuscript'"></kc-Detail>
  </div>
</template>

<script>
import kcDetail from "./kcDetail.vue";
import dgDetail from "./dgDetail.vue";
export default {
  name: "spotTaskInfo",
  data() {
    return {
      tabsParam: ["工作底稿", "勘察记录"],
      nowIndex: 0,
      kcData: ""
    };
  },
  methods: {
    toggleTabs(index) {
      this.nowIndex = index;
    },
    setKcData(val) {
      this.kcData = val;
    },
    childMethod() {
    	this.$refs.kcDetai.childMethod();
    }
  },
  components: {
    kcDetail,
    dgDetail
  }
};
</script>

<style scoped="scoped" lang="scss">
.center-body {
  padding: 20px;
  >.iconfont {
    color: #17adf4;
    margin-left: 16px;
  }
  .tabs {
    height: 35px;
    background: rgba(250, 250, 250, 1);
    border-radius: 2px 2px 0px 0px;
    border: 1px solid rgba(236, 236, 236, 1);
    li {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(42, 42, 44, 1);
      line-height: 34px;
      margin-left: 18px;
    }
    li:hover {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(20, 95, 210, 1);
    }
    .active {
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(20, 95, 210, 1);
      border-bottom: 2px solid #145fd2;
    }
  }
  .divTab {
    border: 1px solid rgba(236, 236, 236, 1);
    padding: 16px 18px;
    border-top: none;
  }
}
</style>