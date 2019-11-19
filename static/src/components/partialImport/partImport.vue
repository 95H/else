<template>
    <div class="center-body part-import" id="partImport">
        <div class="part-cont">
            <div class="tab-header">
                <span class="iconfont icon-xiangmuxinxi"></span>
                <ul class="menu-list">
                    <li v-for="(item,index) in tabList" :key="index" :class="{actived:index==activeNum}" @click="tab(index)">{{item}}</li>
                </ul>
            </div>
            <div class="tab-bd">
                <div class="tab-cont" v-show="activeNum==0">
                    <upload-panel :type="activeNum" ref="uploadCont1" @implement="confirmCase"></upload-panel>
                </div>

                <div class="tab-cont" v-show="activeNum==1">
                    <upload-panel :type="activeNum" ref="uploadCont2" @implement="confirmCase"></upload-panel>
                    <ex-tree :height="cprHg" ref="exTree"></ex-tree>
                </div>
            </div>
        </div>
        <!-- <center-dialog ref="centerDialog" :dialogWidth='dialogWidth' :dialogHeight="dialogHeight" :dialogTitle="dialogTitle" :titlePosition="titlePosition">
			<div slot="dialogContent" class="contrast-cont clear">
                <div class="contrast-panel fl">
                    <p class="b-title">
                        <i class="circle"></i>
                        <span class="ver-mid">补充数据</span>
                    </p>
                    <compare-page :tableHeader="tableData['01']" :uploadData="uploadData" :tableRows="comparedData" :tableHdId="comparedHdId" :tableBdId="comparedBdId"></compare-page>
                </div>
                <div class="contrast-panel fr">
                    <p class="b-title">
                        <i class="circle"></i>
                        <span class="ver-mid">原始数据</span>
                    </p>
                    <compare-page :tableHeader="tableData['01']" :uploadData="uploadData" :tableRows="rawData" :tableHdId="rawHdId" :tableBdId="rawBdId"></compare-page>
                </div>
               
			</div>
		</center-dialog> -->

    </div>
</template>
<script>
import uploadPanel from '@/components/partialImport/uploadPanel';
import exTree from '@/page/fullPageModule/exTree';

// import comparePage from "@/components/partialImport/comparePage"

export default {
    components:{uploadPanel,exTree},
    data(){
        return{
            tabList:['初次导入','数据补充'],
            activeNum:0,
            cprHg:'',//高度
            
            dialogWidth:'',
            dialogHeight:'',
            dialogTitle:'补充数据比对',
            titlePosition:'center',
            uploadData:{},

            dataArr:[
                {
                    benchmarkColumn: "B,C",
                    sheetName: "现金",
                    supplementaryColumn: ""
                },{
                    sheetName: "银行存款"
                },{
                    sheetName: "交易性-股票"
                },{
                    sheetName: "交易性-债券"
                }
            ],
            tableData:'',
            singleSheet:'',
            comparedData:[],//补充数据
            rawData:[], //原始数据
            comparedHdId:"comTableHead",//补充数据的表头id
            comparedBdId:"comTableBody",//补充数据的表身id
            rawHdId:"rawTableHead",//原始数据表头id
            rawBdId:"rawTableBody",//原始数据的表身id
        }
    },
   watch:{
        "$store.state.investorId"(newD,oldD){
            if(newD){
                this.uploadData.investorId=newD;
            }
        }
    },
    created(){
        var _this = this;
        this.uploadData.projectId=this.$store.state.projectId ;
        this.uploadData.investorId=this.$store.state.investorId ;

        
    },
    methods:{
        /*提交 */
        childMethod(){ 
            var _this = this;
            if(this.activeNum==0){
                //提交
                this.$refs.uploadCont1.submitUpload();
                //this.$refs.centerDialog.showDialog();
                //this.getSheetData();
                
                //this.$refs.compareCont.scrollFn();    

            }else{
                //获取部分科目的提交
                this.$refs.uploadCont2.submitUpload(_this.$refs.exTree.getData());
            }
			
        },
        /*取消*/
        extraChildMethod(){ 
            this.$store.commit("changeShowCommon");
        },
        tab(idx){
            var _this  = this;
            this.activeNum = idx;
            this.cprHg = this.$store.state.cprRightHg-289-80;//需要传递的高度
            //传递高度
            //alert(_this.$store.state.cprRightHg);

        },
        /*提示 */
        confirmCase(text,callbackFn){
            var _this=this;
             this.$confirm(text, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'search-confire-box',
                    type: 'warning',
                    callback:action=>{
                           //confirm(确定)cancel（确定）
                            if(action=="confirm"){
                                //是否是部分导入tab
                                if(_this.$store.state.downLoadChecked){
                                     window.location.href = "/api/xlsUpdateData/exportExcel?token="+this.$getCookie("token") +"&projectId="+this.uploadData.projectId+"&investorId="+this.uploadData.investorId+"&formula="+4;
                                }
                                callbackFn&&callbackFn();
                            }
                        }
                })
        },
    },
    beforeDestroy(){
       
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
*{box-sizing:border-box;}
.ver-mid{vertical-align:middle}
.c-orange{color: #F09237;}
.part-cont{border:1px solid #ECECEC;
    .tab-header{padding:0 18px;height: 35px;line-height: 35px;border-bottom:1px solid #ECECEC;
        .menu-list{ display: inline-block;
            li{display: inline-block;cursor: pointer;margin:0 15px;font-size:13px;color:#262628;height: 35px;line-height: 35px;
                &.actived{color:#145FD2;border-bottom:2px solid #145FD2;}
            }
        }
    }
    .icon-xiangmuxinxi{font-size:13px;display: inline-block;color: #f7b543;}
    
}

</style>
