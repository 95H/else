<template>
  <!-- 报告号管理 -->
  <div class="examine">
    <!-- 导航模块 begin -->
    <div class="zlpg-content">
      <div class="zlpg-content-header">
        <ul class="list-group">
          <li v-for="(item,key) in routerLink" :key="key">
            <router-link :to="'/zlpg'+item.jump">{{item.title}}</router-link>
          </li>
          <!-- <li><router-link :to="'/zlpg/reportNumber/autoIssue'">自动签发分配管理</router-link></li> -->
        </ul>
      </div>
    </div>
    <!-- 列表 begin -->
    <div class="examine-con">
      <router-view></router-view>
    </div>
    <!-- 列表 end -->
  </div>
</template>

<script>
export default {
  name: "reportnumber",
  data() {
    return {
      form: {},
      routerLink: []
    };
  },
  created() {
    var _this = this;
    this.$store.state.queryUserSysFunction.forEach((val, key) => {
      if (val.title == "管理") {
        this.routerLink = val.list;
      }
    });
  },
  methods: {
    fieldSurvey() {
      var _this = this;
      this.$store.state.dataObj = {
        name: "",
        reportRuleConstant: "",
        rulePage: "",
        startPageNum: "",
        pageRuleConstant: "",
        dateLeft: "",
        dateMiddle: "",
        dateRigth: "",
        previewNum: ""
      };
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "新增报告号";
      this.$store.state.commonBtn = "新增";
      this.$store.state.componentsType = "reportNumberInfo";
      this.$store.state.refresh = function() {
        _this.$refs.zltable.refreshPage();
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.zlpg-content-header {
  .list-group {
    a:hover {
      color: #145fd2;
    }
  }
}
.examine {
  height: 100%;
  flex-direction: column;
  display: -webkit-flex;
  display: flex;
}
.examine-con {
  flex: 1;
  -ms-flex: 1 0 auto;
}
</style>
