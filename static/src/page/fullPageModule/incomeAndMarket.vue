<template>
    <div class="incomeAndMarket">
        <img src="../../assets/common/fileIcon.png" width="60" height="63" />
        <!--<span class="fs13 marginTop20" v-if="hasFile">您是否要打开？</span>-->
        <h2 class="fs20 green padding20">{{companyName}}{{fileType}}评估明细表</h2>
        <!--<div id="openTheFile" v-show="hasFile"></div>-->
        <a href="javascript:;" class="search-btn" v-show="hasFile" @click="downloadFile">下载</a>
        <span class="create_btn is_disabled" v-show="!hasFile">暂无数据</span>
    </div>
</template>

<script>
    import Public from '../../public.js'
	export default {
        data () {
            return {
                companyName : '',
                fileType : this.$route.params.tabId == 4 ? "收益法" : this.$route.params.tabId == 5 ? "市场法" : "",
                hasFile : false,
                fileDetail : {},
                importParams: {}
            }
        },

        created(){
            var _this = this;
            _this.$store.state.exportFile = function(obj){
                if(obj && obj.fileDir){
                    if(obj.fileDir == ''){
                        _this.$messageError('暂无文件可以导出');
                    }else{
                        obj.filePath = obj.fileDir;
                        _this.exportFile(obj);
                    }
                }else{
                    if(_this.fileDetail.filePath == ''){
                        _this.$messageError('暂无文件可以导出');
                    }else{
                        _this.exportFile(_this.fileDetail);
                    }
                }
            }
            _this.initData();
            _this.$store.state.initIncomeAndMarketData = function(){
                _this.initData();
            }
        },

        mounted(){
            var _this = this
            // 用$on事件来接收参数
            Public.$on('hasFile', (data) => {
                _this.hasFile = data.hasFile;
                _this.importParams = data
            })
        },
        watch:{
            $route(to,from){
                var _this = this;
                _this.fileType = _this.$route.params.tabId == 4 ? "收益法" : _this.$route.params.tabId == 5 ? "市场法" : "";
                _this.$store.state.exportFile = function(obj){
                    if(obj && obj.fileDir){
                        if(obj.fileDir == ''){
                            _this.$messageError('暂无文件可以导出');
                        }else{
                            obj.filePath = obj.fileDir;
                            _this.exportFile(obj);
                        }
                    }else{
                        if(_this.fileDetail.filePath == ''){
                            _this.$messageError('暂无文件可以导出');
                        }else{
                            _this.exportFile(_this.fileDetail);
                        }
                    }
                }
                _this.initData();
            }
        },

        methods:{
            // 初始化页面数据
            initData(){
                let _this = this;
                _this.$http.post("/api/projectdocs/isProjectdocsFile",{
                    projectId : _this.$store.state.projectId,
                    investorId : _this.$store.state.investorId,
                    docType : 1,
                    filetype : _this.$route.params.tabId==4?"PRESENTATIONINCOMELAW":_this.$route.params.tabId==5?"PRESENTATIONMARKETLAW":''
                }).then(function(res){
                    _this.hasFile = res.data.projectdocs.filePath=='' ? false : true;
                    _this.companyName = res.data.investor.name;
                    _this.fileDetail = res.data.projectdocs;
                    /*let url = "/api/projectdocs/openReportDocsOffice?projectId="+_this.$store.state.projectId+"&investorId="+_this.$store.state.investorId+"&filetype="+(_this.$route.params.tabId==4?"PRESENTATIONINCOMELAW":_this.$route.params.tabId==5?"PRESENTATIONMARKETLAW":'')+"&docType=1&flag=editor&xsName=打开明细表"
                    let str = "<iframe id='myFrame' src="+ url +"></iframe>";
                    document.getElementById("openTheFile").innerHTML = str;*/
                }).catch(function(error){
                    _this.$messageError(error);
                })
            },

            exportFile(item){
                window.location.href = "/api/file/downloadFile?token=" + this.$getCookie("token") + "&docsName=" + this.$filename(item.fileName) + "&flag=2&alyPath=" + item.filePath;
            },

            openFile(){
                let msg = "";
                if(this.$route.params.tabId == "4"){
                    msg = "收益法文件";
                }else{
                    msg = "市场法文件";
                }
                this.$messageSuccess("打开"+msg);
            },

            // 修改后，将打开明细表改为下载
            downloadFile(){
              if(!this.importParams.filePath){
                this.exportFile(this.fileDetail);
              }else{
                this.exportFile(this.importParams);
              }

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
    .incomeAndMarket{ width:850px; height:370px; display:flex; justify-content:center; align-items:center; box-sizing:border-box; background-color:#FCFDFF; border:1px dashed #B4DCFF; margin:auto; position:absolute; left:0; top:0; right:0; bottom:0; flex-flow:column;
        span{ font-weight:bold;}
        .create_btn,#openTheFile{ width:120px; height:30px; line-height:30px; display:block; background:#3a80ec; text-align:center; color:#fff; font-size:14px; border-radius:2px; cursor:pointer; overflow:hidden; }
        .is_disabled{ background:none; color:#767676; font-weight:normal;}
    }
</style>
