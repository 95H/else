<template>
     <div class="importOpen">
        <div class="importOpen-left"><span>上传资产申报表：</span></div>
        <div class="importOpen-right">
            <el-upload
            class="upload-demo"
            action="/api/file/uploadAssetsPossessionXls"
            ref="upload"
            :data="uploadData"
            :headers="uploadHeaders"
            :on-error="uploadError"
            :on-remove="uploadRemove"
            :on-success="uploadSuccess"
            :on-change="uploadChange"
            :before-upload="beforeUpload"
            accept="xls,xlsx"
            :file-list="fileList"
            :auto-upload="false">
                <el-button class="clear" size="small" ref="uploadBtn">+ 上传资产申报表</el-button>
                <div slot="tip" class="el-upload__tip">
                    <div class="tip-box">
                        <a href="/api/file/downloadFile?docsName=资产基础法测算表模板v1.13.xlsx&alyPath=&flag=1" class="el-button clear el-button--default el-button--small down-btn">下载资产申报表模板</a>
                        <p class="tip-title" v-if="type==0">上传填写后端数据文件仅支持xls、xlsx格式，切文件大小不能超过50M</p>
                        <p class="c-orange">* 上传文件后会覆盖您已导入的数据，请谨慎操作</p>
                        <p class="c-orange">* 上传的附件文件要和模板一致，否则系统无法读取 上传的文件数据</p>
                    </div>
                    <template v-if="type!=0">
                        <p class="down-cont">
                            <el-checkbox v-model="downLoadChecked">自动为您导出当前资产基础法明细表作为备份</el-checkbox>
                        </p>
                        <p class="down-cont">
                            <el-checkbox v-model="formulaChecked">导入成功后,自动为您进行公式计算</el-checkbox>
                        </p>
                        <span  class="tip-last" @click="showProcess">
                            <i class="icon-play"></i>
                            点我演示
                        </span>
                    </template>
                    
                </div>
            </el-upload>
        </div>
        <CenterDialog ref="centerDialog" :dialogWidth="'850px'" :dialogHeight="'550px'"
                      :dialogTitle="'演示窗口'" >
            <div slot="dialogContent">
                <img src="../../../static/img/demonstrate.gif" width="100%" height="470px"/>
            </div>
        </CenterDialog>
    </div>
</template>
<script>
import Public from "../../public.js";
import CenterDialog from '@/components/centerDialog'
export default {
    props:["type"],
    data(){
        return{
            uploadData:{
                investorId:"",
                projectId:"",
                uploadType:"",
            },
            uploadHeaders:{
                token:this.$getCookie('token'),
            },
            fileList:[],
            subjectData:[],
            downLoadChecked:true,
            formulaChecked:true
        }
    },
    components: {
      CenterDialog
    },
     watch:{
        "$store.state.investorId"(newD,oldD){
            if(newD){
                this.uploadData.investorId=newD;
            }
        }
    },
    created(){
        this.uploadData.projectId=this.$store.state.projectId ;
        this.uploadData.investorId=this.$store.state.investorId ;
    },
    mounted(){
        var _this = this;

    },
    methods:{
        /*上传之前 */
        beforeUpload(){
             this.$store.state.hierarchy = false;
             this.$store.commit("changeShowCommon");
             Public.$emit('beforeUpload');
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
        uploadSuccess(response, file, fileList){
            var _this =  this;
            Public.$emit('uploadSuccess',response, file, fileList,this.subjectData);
            
        },
        /*文件删除时 */
        uploadRemove(file, fileList){
            this.fileList=fileList;
        },
        uploadError(err, file, fileList){
             Public.$emit('uploadError',err, file, fileList);
        },
        //提交
        submitUpload(data){
            var _this = this;
            //需要判断用户是不是正在导入
             this.$store.state.getUploadStatu(function(){
                 if(_this.fileList.length===0){
                        _this.$messageWarning("请选择导入文件");
                        return
                    }
                    if(data && data instanceof Array){
                        if(data.length==0){
                            _this.$messageWarning("请选择数据补充科目");
                            return
                        }
                    }else if(data && data instanceof Object){
                        _this.$messageWarning("选中的每个科目中都必须选择基准列和补充列");
                        return
                    }
                    //弹框
                    if(_this.type==0){
                        _this.uploadData.uploadType = "all";
                        _this.$store.state.downLoadChecked = '';
                        _this.$emit('implement','确认进行数据初次导入？',_this.$refs.upload.submit)
                    }else{
                        _this.subjectData=data;
                        _this.uploadData.uploadType = "part";
                        _this.$store.state.downLoadChecked = _this.downLoadChecked;
                        if(_this.formulaChecked){
                            _this.$store.state.formulaChecked = 'yes';
                        }else{
                            _this.$store.state.formulaChecked = 'no';
                        }
                        
                        _this.$emit('implement','确认进行数据补充？',_this.$refs.upload.submit);
                    }
             },'allImp');
            

            //this.$refs.upload.submit();
        },
        showProcess () {
          this.$refs.centerDialog.showDialog();
        }
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
*{box-sizing:border-box;}
.c-orange{color: #F09237;}
.c-blue{color:#3A80EC;}
.importOpen{width: 100%;padding: 32px 32px 10px;display: flex;box-sizing: border-box;
            .importOpen-right{width:552px}
            .down-btn{line-height:25px;position:absolute;left:130px;top:-33px;}
            .importOpen-right .el-upload .el-button,.down-btn {height: 25px;padding: 0 10px;border-radius: 2px;border: 1px solid #3A80EC;color: #3A80EC;}
            .el-upload__tip{margin-bottom:5px;position:relative;
                .tip-box{border:1px dashed #DCDCDC;padding:9px 15px;margin-bottom:8px;width:552px;}
                .tip-title{color:#676767;margin-bottom: 5px;}
                .c-orange{margin-bottom:2px;}
                .icon-play{width:13px;height:13px;display: inline-block;background:url('../../../static/img/play.png');margin-right:6px;}
                .tip-last{color:#3A80EC;cursor: pointer;}
                .down-cont{margin-bottom: 5px;}
            }
        }

</style>
