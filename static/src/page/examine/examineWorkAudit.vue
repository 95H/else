<template>
    <div class="examineWorkAudit">
        <div class="zlpg-home">
            <div class="zlpg-home-content">
                <div class="p20 displayIbP container">
                    <work-hours-time :workinghoursStart="workinghoursStart" :isAdd="isAdd" :isTianXie="isTianXie" :workinghoursEnd="workinghoursEnd" @executeFun="executeFun"></work-hours-time>
                    <span class="projectSel-tit">所属项目</span>
                    <el-select v-model="projectSel" filterable @change="projectSelChange">
                        <el-option
                        v-for="item in projectData"
                        :key="item.id"
                        :label="item.projectName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <!-- <div class="btnFr">
                        <button class="search-btn" @click="search">搜索</button>
                        <button class="reset-btn" @click="reset">重置</button>
                    </div> -->
                </div>
                <div class="examineWorkAudit-table">
                    <work-hours-table-audit :workinghoursData="workinghoursData" :details="workHoursTableDetails" :isRowClick="workHoursTableIsRowClick" @workinghoursFun="getWorkH" ></work-hours-table-audit>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import workHoursTime from "@/components/workHoursTime";
    import workHoursTableAudit from "@/components/workHoursTableAudit";
    export default {
        data () {
            return {
                workinghoursStart:"",
                workHoursTableDetails:true,
                workHoursTableIsRowClick:false,
                workinghoursEnd:"",
                workinghoursData:[],
                isTianXie:true,
                isAdd:true,
                projectSel:"",
                projectData:[]
            };
        },
        created(){
            var _this=this;
            _this.getProjectSel()
            _this.workinghoursStart=_this.getFirstDayOfWeek();
            _this.workinghoursEnd=this.getNowFormatDate(new Date(new Date(_this.workinghoursStart).getTime()+518400000));
        },
        methods:{
            getProjectSel(){
                var _this=this;
                this.$http.post("/api/projecttimesheetaudit/selectProjectByIdList").then(function (data) {
                    if(data.data.length==0){
                        _this.projectData=[{id:"",projectName:"暂无数据"}];
                        _this.projectSel="";
                    }else{
                        _this.projectData=data.data;
                        _this.projectSel=data.data[0].id;
                    }
                    _this.getWorkH();
                }).catch(function (error) {
                    _this.$messageError(error);
                });
            },
            projectSelChange(){
                this.workinghoursStart=this.getFirstDayOfWeek();
                this.workinghoursEnd=this.getNowFormatDate(new Date(new Date(this.workinghoursStart).getTime()+518400000));
                this.getWorkH();
            },
            // workinghoursFun(){
            //     this.getWorkH()
            // },
            //数据请求
            getWorkH(){
                var _this=this;
                this.$http.post("/api/projecttimesheetaudit/findPageOneList",{
                    weekBeginDate:this.workinghoursStart,
                    weekEndDate:this.workinghoursEnd,
                    tabFlag:"all",
                    projectId:this.projectSel
                }).then(function (data) {
                    if(data.data.length>0){
                        for (let i = 0; i < data.data.length; i++) {
                            data.data[i].isShow=false;
                            for (let j = 0; j < data.data[i].projectmilestoneplanDtoList.length; j++) {
                                data.data[i].projectmilestoneplanDtoList[j].auditInd=i;
                            }
                        }
                    }
                    _this.workinghoursData=data.data;
                }).catch(function (error) {
                    _this.$messageError(error);
                });
            },
            executeFun(data){
                this.workinghoursStart=data.workinghoursStart;
                this.workinghoursEnd=data.workinghoursEnd;
                this.getWorkH()
            },
            // radioEvent(val){
            //     this.search()
            // },
            // search(){
            //     // this.form.createUserName=this.itemsIpt[0].input
            //     // this.$refs.zltable.refreshPage();
            // },
            reset(){
                this.itemsIpt[0].input="";
                this.workinghoursStart=this.getFirstDayOfWeek();
                this.workinghoursEnd=this.getNowFormatDate(new Date(new Date(this.workinghoursStart).getTime()+518400000));
            },
            getFirstDayOfWeek(){
                var day = new Date(),oneDay=86400000;
                switch(day.getDay()){
                    case 0:
                    return this.getNowFormatDate(new Date(day.getTime()-(oneDay*6)))
                    break;
                    case 1:
                    return this.getNowFormatDate(day)
                    break;
                    case 2:
                    return this.getNowFormatDate(new Date(day.getTime()-oneDay))
                    break;
                    case 3:
                    return this.getNowFormatDate(new Date(day.getTime()-(oneDay*2)))
                    break;
                    case 4:
                    return this.getNowFormatDate(new Date(day.getTime()-(oneDay*3)))
                    break;
                    case 5:
                    return this.getNowFormatDate(new Date(day.getTime()-(oneDay*4)))
                    break;
                    case 6:
                    return this.getNowFormatDate(new Date(day.getTime()-(oneDay*5)))
                    break;
                }
            },
            getNowFormatDate(date) {
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
        },
        components:{
            workHoursTime,
            workHoursTableAudit
        }
    }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.examineWorkAudit{height: 100%;flex-direction:column;display: -webkit-flex;display: flex;}
.zlpg-home{flex: 1;-ms-flex:1 0 auto;
    .zlpg-home-header{
        width: 100%; height: 35px;
        .list-group{line-height: 34px;border:1px solid #ECECEC;overflow:hidden;background: #fff;
            li{float: left;margin-left:30px;
                a{position: relative;}
                a.is-active{display:block;color: #145FD2;}
                a.is-active:after{content:"";left:0;position: absolute;bottom: 0px; width: 100%;height: 2px;background: #145FD2;}
            }
            .list-right{
                float: right;
                cursor: pointer;
                height:27px;
                background:rgba(58,128,236,1);
                border-radius:2px;
                line-height: 27px;
                font-size:13px;
                color:rgba(255,255,255,1);
                text-align: right;
                padding: 0 5px;
                margin-top: 4px;
                margin-right: 5px;
            }
        }
    }
    .zlpg-home-content{height: 100%;
        .search-btn,.reset-btn {
            padding: 0;
            width: 70px;
            height: 25px;
            border-radius: 2px;
            font-size: 13px;
            font-weight: 400;
            cursor: pointer
        }
        .projectSel-tit{
            line-height: 25px;
            font-size: 13px;
            margin-left: 20px;
        }
        .p20{padding: 0 20px;}
        /deep/ .ipt-wrap{height: 25px;}
        .displayIbP{padding-top: 10px;padding-bottom: 10px;
            >*{display: inline-block;}
        }
        /deep/ .workHoursTime{vertical-align: top;}
        /* 头部 */
        .btnFr{margin-left: 20px;}
        .container{background:#fff;}
        .examineWorkAudit-table{
            margin-top: 10px;
            background:#fff;
            padding: 15px 20px;
            height: calc( 100% - 89px );
        }
    }
}
</style>
    