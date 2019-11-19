<template>
	<div class="filePreview">
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
		<div class="filePreview_content" v-html="htmlContent"></div>
	</div>
</template>

<script>
// import pdfshower from 'vue-pdf-shower';
export default {
  data() {
    return {
      //            	pdfurls:'//cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      htmlContent: "",
      commonData: window.commonData,
      projectInfo: JSON.parse(this.$getCookie("projectInfo"))
    };
  },
  created() {
    let _this = this;
    console.log(this.$route.query.investorId);
    console.log(this.$route.query.tabId);
//    if (this.$route.query.tabId == "7") {
    if (this.$route.query.type == "1") {
      //报告预览
      _this.$http
        .post("/api/reportEvalDirectory/getReportContent", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$route.query.investorId
        })
        .then(function(res) {
          _this.htmlContent = res.data;
//          _this.$nextTick(_this.hideSpan);
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    } else {
      //说明预览
      _this.$http
        .post("/api/reportDescDirectory/getReportDescContent", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$route.query.investorId
        })
        .then(function(res) {
          _this.htmlContent = res.data;
          _this.$nextTick(_this.hideSpan);
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    }
  },
  methods: {
    // onErr(err){
    // 	this.$messageError(err);
    // }
    hideSpan(){
      const arr = [];
      arr.forEach.call(document.querySelectorAll('span_20104c9b13aab92866ed5c78a376ffde'),(item)=>{
        item.parentNode.removeChild(item);
      });
      arr.forEach.call(document.querySelectorAll('span_ef299e201b7c6546255be2ca8b16b9ea'),(item)=>{
        item.parentNode.removeChild(item);
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.filePreview {
  width: 100%;
  min-height: 2000px;
  background: #f6f6f6;
  padding: 45px 0 10px 0;
  box-sizing: border-box;
  min-width: 800px;
  position: relative;
  .filePreview_title {
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #e5e5e5;
    border-top: none;
    position: fixed;
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
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    min-height: 2000px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    margin: auto;
    overflow: hidden;
    /* 预览样式*/
    /deep/ .page {
      width: 100%;
      margin-bottom: 20px;
      background-color: #fff;
      p {
        margin: 10px 0;
        padding: 0 20px;
        line-height: 1.5;
      }
      /* 报告声明样式 */
      h1{
        text-align: center;
        font-family: 宋体;
        font-size: 25px;
        margin: 20px 0;
        font-weight: 700;
      }
      /* 内容首行缩进 */
      .MsoNormal{
        text-indent: 2em;
        b{
          font-weight: bolder;
        }
      }
      table .MsoNormal{
        text-indent:0;
        word-break:break-all;
        word-wrap:break-word;
      }
      /*加粗*/
      .bold {
        font-weight: 700;
      }
      .left {
        text-align: left;
      }
      .right {
        text-align: right;
        font-family: 仿宋_gb2312;
        font-size: 16px;
        font-weight: 600;
      }
      .center {
        text-align: center;
      }
      /*正文样式*/
      .main {
        text-indent: 40px;
        line-height: 2;
        font-size: 18px;
      }
      /*标题*/
      .title1 {
        font-family: 宋体;
        font-size: 35px;
        margin-bottom: 20px;
        font-weight: 700;
        letter-spacing: 18px;
      }
      /*【项目名称】/【资产占有方判断】*/
      .title2 {
        font-family: Microsoft YaHei;
        font-size: 25px;
        margin-bottom: 20px;
      }
      /*【报告编号】/【投资单位名称】/【报告签发日期大写】*/
      .title3 {
        font-family: 仿宋_gb2312;
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: 700;
      }
      /*目录*/
      .catalogue {
        font-family: 黑体;
        font-size: 25px;
        margin-bottom: 20px;
        font-weight: 700;
        letter-spacing: 20px;
      }
      .catalogueList {
        font-family: 仿宋_gb2312;
        font-size: 18px;
      }
      /*正文一级标题*/
      .title4 {
        font-family: 宋体;
        font-size: 25px;
        margin-bottom: 25px;
        font-weight: 700;
      }
      /*正文二级标题*/
      .title5 {
        font-family: 黑体;
        font-size: 18px;
        margin-bottom: 20px;
      }
      /*正文三级标题*/
      .title6 {
        font-family: 仿宋_gb2312;
        font-size: 18px;
        margin-bottom: 20px;
        font-weight: 700;
      }

      /*评估说明样式*/
      /*说明目录*/
      .catalogue1 {
        font-family: 仿宋_gb2312;
        font-size: 25px;
        margin-bottom: 20px;
        font-weight: 700;
      }
      /*一级目录*/
      .catalogueList1 {
        font-family: 黑体;
        font-size: 18px;
        font-weight: 700;
      }
      /*二级目录*/
      .catalogueList2 {
        font-family: 黑体;
        font-size: 18px;
      }
      /*一级标题*/
      .level1 {
        font-family: 黑体;
        font-size: 20px;
        margin-bottom: 20px;
      }
      /*二级标题*/
      .level2 {
        font-family: 黑体;
        font-size: 18px;
      }
      /*三级标题*/
      .level3 {
        font-family: 仿宋_gb2312;
        font-size: 18px;
        font-weight: 700;
      }
      table {
        margin: 0 !important;
        width: 100% !important;
        td {

          border: 1px solid !important;
          p {
            padding: 0;
            white-space: normal;
          }
        }
      }
    }
  }
}
</style>
