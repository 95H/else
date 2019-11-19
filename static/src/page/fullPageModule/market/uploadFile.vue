<template>
  <div class="uploadFile">
    <div class="upload-title">导入数据：</div>
    <div class="upload-content">
      <el-upload
        class="upload-demo"
        action="/api/marketTransit/uploadmarket"
        ref="upload"
        :data="uploadData"
        :headers="uploadHeaders"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-change="uploadChange"
        :before-upload="beforeUpload"
        accept="xls,xlsx"
        :file-list="fileList"
        :auto-upload="false">
          <a class="reset-btn width100" ref="uploadBtn">+ 选择文件</a>
          <a @click.stop="downloadFile" class="reset-btn width100">下载模板</a>
          <div slot="tip" class="el-upload__tip">
            <div class="tip-box">
              <span>* 提示：</span>
              <p>1.请使用下载的模板导入数据，非固定模板可能导入失败</p>
              <p class="red">2.导入新数据时，已存在公司的数据会被相应的新数据替代</p>
            </div>
          </div>
        </el-upload>
    </div>
  </div>
</template>
<script>
import CenterDialog from '@/components/centerDialog'
import Public from "../../../public.js"
export default {
  components : { CenterDialog },
  data(){
    return {
      uploadHeaders:{
        token:this.$getCookie('token'),
      },
      uploadData:{   //文件上传时附带的额外参数
        investorId:this.$store.state.investorId,
        projectId:this.$store.state.projectId,
        caseType:this.$store.state.fileFlag,
        companyId:!/listed|trade/.test(this.$store.state.companyId) ? this.$store.state.companyId : '',
        assessmentBaseDate : this.$store.state.projectInfo.assessmentBaseDate
      },
      fileList:[],
    }
  },
  mounted(){
    //判断是评估总览还是公司数据,及被评估公司还是比较公司
    if(/assessOverview|finance|business/.test(this.$route.path)){
      if(this.$route.query.way=='listed'){
        this.uploadData.caseType="1"
      }else{
        this.uploadData.caseType="2";
      } 
    }
  },
  methods:{
    // 模版下载
    downloadFile(){
      window.location.href = "/api/file/downloadFile?token=" + this.$getCookie("token") + "&docsName=" + this.$filename(this.getFileName()) + "&flag=1";
    },
    // 获取模版名称
    getFileName(){
      switch (this.$store.state.fileFlag){
        case "0":
        case "3":
          return "财报模板.xlsx";
          break;
        case "1":
          return "上市公司法(导入).xlsx";
          break;
        case "2":
          return "交易案例法(导入).xlsx";
          break;  
      }
    },
    /*上传之前 */
    beforeUpload(){
      this.$store.commit("changeShowCommon");
      Public.$emit('marketBeforeUpload');
    },
    //文件列表新增时
    uploadChange(file, fileList){
      var typeStr=file.name.substr(file.name.lastIndexOf(".")+1).toLowerCase() ;
      if(typeStr ==="xls" || typeStr ==="xlsx"){
        if(file.size>52428800){
          fileList.shift();
          this.$messageWarning('导入文件不能大于50M');
          return;
        }
        if(fileList.length>1){
          fileList.shift();
        }
        this.fileList=fileList;
      }else{
        fileList.shift();
        this.$messageWarning('导入文件仅支持xls、xlsx格式');
        return;
      }
    },
    // 文件上传成功
    uploadSuccess(response, file, fileList){
      Public.$emit('marketUploadSuccess',response, file, fileList);
    },
    //文件上传失败
    uploadError(err, file, fileList){
      Public.$emit('marketUploadError',err, file, fileList);
    },
    //点击确定上传模板的回调函数
    childMethod(){
      this.$refs.upload.submit();
    }
  }
}
</script>
<style ref="stylesheet/scss" lang="scss" scoped>
.uploadFile{ display:flex; padding:20px; box-sizing:border-box;
  .upload-title{ font-size:13px; color:#686868; width:100px; text-align:right; line-height:25px;}
  .upload-content{ flex:1;
    .tip-box{ border:1px dashed #DCDCDC; padding:5px 10px 5px 65px; position:relative; line-height:20px;
      span{ position:absolute; color:#FF8E11; font-size:12px; left:20px;}
      p{color:#676767; font-size:12px;}
    }
  }
}
</style>
