<template>
    <div class="projectWorkinghoursWrite">
        <div class="projectWorkinghoursWrite-header">
            <span class="projectWorkinghoursWrite-header-time">统计周期：</span>
            <div class="projectWorkinghoursWrite-header-timeDome">
                <work-hours-time :workinghoursStart="workinghoursStart" :isTianXie="isTianXie" :workinghoursEnd="workinghoursEnd" @executeFun="executeFun"></work-hours-time>
            </div>
            <!-- <div class="projectWorkinghoursWrite-header-right">
                <span class="projectWorkinghoursWrite-header-right-tit">本周总工时：<span class="projectWorkinghoursWrite-header-right-time">{{timeSheetSumWeekly+"h"}}</span></span>
                <span class="projectWorkinghoursWrite-header-right-tit">线上工时：<span class="projectWorkinghoursWrite-header-right-time">{{onlineSumWeekly+"h"}}</span></span>
                <span class="projectWorkinghoursWrite-header-right-tit">线下工时：<span class="projectWorkinghoursWrite-header-right-time">{{offlineSumWeekly+"h"}}</span></span>
            </div> -->
        </div>
        <div class="projectWorkinghoursWrite-content">
            <fill-in-working-hours :onlineDuration="onlineDuration" :id="$store.state.projectId" :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></fill-in-working-hours>
        </div>
    </div>
</template>
<script>
import workHoursTime from "@/components/workHoursTime";
import fillInWorkingHours from "@/components/fillInWorkingHours";
export default {
    data(){
        return {
            workinghoursStart:"",
            workinghoursEnd:"",
            weekStatus:"",
            isTianXie:"",
            offlineSumWeekly:0,
            onlineSumWeekly:0,
            timeSheetSumWeekly:0,
            workinghoursData: [],
            onlineDuration:{},
        }
    },
    created(){
        this.getWorkH()
    },
    methods:{
        //上下周回调
        executeFun(data){
            this.workinghoursStart=data.workinghoursStart;
            this.workinghoursEnd=data.workinghoursEnd;
            this.weekStatus=data.weekStatus
            this.getWorkH();
        },
        //提交回调
        workinghoursFun(){
            this.workinghoursStart=this.getNowFormatDate(new Date(new Date(this.workinghoursStart).getTime()-604800000));
            this.workinghoursEnd=this.getNowFormatDate(new Date(new Date(this.workinghoursEnd).getTime()-604800000));
            this.weekStatus="next"
            // this.getWorkH();
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
        //数据请求
        getWorkH(){
            var _this=this;
            this.$http.post("/api/projecttimesheetaudit/selectprojecttimesheetauditAll",{
                weekStartDate:this.workinghoursStart,
                weekEndDate:this.workinghoursEnd,
                weekStatus:this.weekStatus,
                pId:_this.$store.state.projectId
            }).then(function (data) {
                _this.setWorkData(data.dataProject.concat(data.data));
                _this.onlineDuration=data.onlineDuration;
                _this.workinghoursStart=data.mondayDate;
                _this.workinghoursEnd=data.sundayDate;
                // _this.offlineSumWeekly=data.sumTimeWeekly.offlineSumWeekly;
                // _this.onlineSumWeekly=data.sumTimeWeekly.onlineSumWeekly;
                // _this.timeSheetSumWeekly=data.sumTimeWeekly.timeSheetSumWeekly;
                _this.isTianXie=data.isTianXie;
            }).catch(function (error) {
                _this.$messageError(error);
            });
        },
        setWorkData(data){
            for (let i = 0; i < data.length; i++) {
                if(this.$store.state.projectId==data[i].pId){
                    var firstData=data[i];
                    data.splice(i,1);
                    data.unshift(firstData)
                }
            }
            this.workinghoursData=data;
        }
    },
    components:{
        workHoursTime,
        fillInWorkingHours
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.projectWorkinghoursWrite{
    .projectWorkinghoursWrite-header{
        height: 30px;
        line-height: 30px;
        .projectWorkinghoursWrite-header-time{
            font-size: 13px;
        }
        .projectWorkinghoursWrite-header-timeDome{
            display: inline-block;
        }
        .projectWorkinghoursWrite-header-right{
            float: right;
            .projectWorkinghoursWrite-header-right-tit{
                padding-left: 20px;
                line-height: 30px;
                font-size:13px;
                .projectWorkinghoursWrite-header-right-time{
                    color:#EA7F2B;
                }
            }
        }
    }
    .projectWorkinghoursWrite-table{
        margin-top: 10px;
        /deep/ .el-table .el-input>input.el-input__inner{padding: 0;text-align:center;}
        .projectWorkinghoursWrite-table-btns{
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>