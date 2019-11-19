<template>
	<div class="filePreview">
		<!-- 顶部内容 -->
    <!-- 顶部内容 -->
		<div class="filePreview_title">
			<h3 class="fs14 fl projectName" :title="projectInfo.projectName">{{ projectInfo.projectName }}</h3>
      <span class="marginRight20 fs12 fl">{{ projectInfo.projectNumber }}</span>
      <div class="project-nature marginRight10 fl">
        <span>{{ commonData.projectNatureId[projectInfo.projectNatureId]?commonData.projectNatureId[projectInfo.projectNatureId].slice(0,commonData.projectNatureId[projectInfo.projectNatureId].length-2):'' }}</span>
        <span>{{ commonData.projectLevelId[projectInfo.projectLevelId] }}级</span>
        <span v-if="commonData.assessmentTarget[projectInfo.assessmentTarget]">{{ commonData.assessmentTarget[projectInfo.assessmentTarget]}}</span>
        <span>{{ projectInfo.isListedCompany==1?"上市":"非上市" }}</span>
      </div>
      <span class="fs13 fl">负责人：{{projectInfo.projectPersonName}}</span>
			 <!--<a href="javascript:;" class="search-btn marginTop5 fr">导出</a>-->
		</div>
    <!-- 预览文件 -->
    <div class="filePreview_content" v-if="isShow">
      <pdfshower :pdfurl="pdfurls" @onErr="onErr"></pdfshower>
    </div>
	</div>
</template>

<script>
import pdfshower from "vue-pdf-shower";
export default {
  data() {
    return {
      pdfurls: "",
      commonData: window.commonData,
      projectInfo: JSON.parse(this.$getCookie("projectInfo")),
      isShow: false
    };
  },
  components: {
    pdfshower
  },
  created(){
    this.$http.post('/api/reportDescDirectory/previewReportOrDesc',{
      projectId : this.$store.state.projectId || this.$route.query.projectId,
      investorId : this.$route.query.investorId,
      type : this.$route.query.type    // 1是报告，2是说明
    }).then(res => {
      //this.pdfurls = res.data.filePath;
      window.location.href = res.data.filePath;
      //this.isShow = true;
    }).catch(err => {
      this.$messageError(err);
    })
  },
  methods: {
    onErr(err) {
      this.$messageError(err);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.filePreview {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f6f6f6;
  padding-top: 45px;
  box-sizing: border-box;
  min-width: 800px;
  .filePreview_title {
    height: 35px;
    line-height: 35px;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-top: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 800px;
    margin: auto;
    z-index: 80;
    .projectName {
      margin-right: 20px;
      padding-left: 15px;
      position: relative;
      font-weight: bold;
      &:before {
        position: absolute;
        content: "";
        width: 6px;
        height: 6px;
        background: #f09237;
        display: block;
        top: 14px;
        left: 4px;
        border-radius: 50%;
      }
    }
    .project-nature {
      margin-right: 10px;
      overflow: hidden;
      span {
        height: 25px;
        padding: 0 10px;
        line-height: 23px;
        text-align: center;
        color: #98c268;
        background: #f1f8e8;
        border: 1px solid #c8deaf;
        border-radius: 2px;
        float: left;
        margin: 5px 10px 5px 0;
        font-size: 12px;
        box-sizing: border-box;
      }
      :nth-child(2) {
        color: #f09237;
        background: #fff2e5;
        border: 1px solid #ffc68f;
      }
      :nth-child(3) {
        color: #7c9fee;
        background: #e9f0ff;
        border: 1px solid #bbd0ff;
      }
      :nth-child(4) {
        color: #50adee;
        background: #e6f5ff;
        border: 1px solid #9bd6ff;
      }
    }
  }
  .filePreview_content {
    width: 800px;
    background-color: #fff;
    box-sizing: border-box;
    margin: auto;
    position: absolute;
    top: 45px;
    bottom: 15px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
/deep/ #cvsWraper {
  height: 100%;
  border-color: #e5e5e5;
  overflow: auto;
  position: absolute;
  box-sizing: border-box;
}
/deep/ .canvas-item {
  width: 781px;
  border-bottom: 5px solid #e5e5e5;
  &:last-child {
    border: none;
  }
}
/deep/ .loading-pdf {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  position: relative;
  height: 100%;
  font-size: 13px;
}
</style>
