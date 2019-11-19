<template>
  <div classs="income-law">
    <income-home
      v-if="isShowIncomeLaw"
      :renounce="renounce"
      @submitForm="submitForm"
      @abandonBtn="abandonBtn"
    ></income-home>
    <income-task v-if="isShowTask" @updataTeml="updataTeml"></income-task>
  </div>
</template>
<script>
import incomeHome from "@/components/incomeLaw/incomeHome.vue";
import incomeTask from "@/components/incomeLaw/incomeTask.vue";
export default {
  components: {
    incomeHome,
    incomeTask
  },
  created() {
    this.getTemplate();
    //如要请求接口，显示隐藏那个组件
    // this.isShowIncomeLaw = true;
  },
  data() {
    return {
      isShowIncomeLaw: false,
      isShowTask: false,
      renounce: false
    };
  },
  methods: {
    //收益法页面显示的模块
    getTemplate() {
      var _this = this;
      this.$store.state.incomeInitId = "";
      this.isShowIncomeLaw = false;
      this.isShowTask = false;
      this.$http
        .post("/api/incomeExcel/isRecord", {
          projectId: this.$store.state.projectId,
          investorId: this.$store.state.investorId.toString(),
          templateId: this.$store.state.incomeInitId,
          intiId: 1
        })
        .then(function(res) {
          if (res.data.list.initId) {
            _this.$store.state.incomeInitId = res.data.list.initId;
            _this.$store.state.incomeTemplateName=res.data.templateName;
            _this.isShowTask = true;
          } else {
            _this.updataTeml();
          }
          _this.$http
              .post("/api/incomexls/getTemplateInfo", {
                projectId: _this.$store.state.projectId,
                investorId: _this.$store.state.investorId,
                templateId: _this.$store.state.incomeInitId
              })
              .then(res => {
                if(res.data.statementAperture=="0"){
                  _this.$store.state.monomerReport=false
                }else if(res.data.statementAperture=="1"){
                  _this.$store.state.monomerReport=true
                }
              })
              .catch(err => {});
        })
        .catch(function(err) {
          if (err === "模板未导入数据") {
            _this.isShowIncomeLaw = true;
          } else {
            _this.$messageError(err);
          }
        });
    },
    abandonBtn() {
      this.isShowIncomeLaw = false;
      this.isShowTask = true;
      this.renounce = false;
    },
    submitForm() {
      this.isShowIncomeLaw = false;
      this.isShowTask = true;
      this.renounce = false;
    },
    updataTeml() {
      this.isShowIncomeLaw = true;
      this.isShowTask = false;
      this.renounce = true;
    }
  },
  watch: {
    //切换组织结构
    "$store.state.investorId"(newD, oldD) {
      if (newD != oldD) {
        this.getTemplate();
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
</style>
