<template>
    <div class="projectWorkinghours">
        <el-select class="tabFlaySelect" @change="tabFlayFun" v-model="tabFlaySel">
            <el-option v-for="(item,index) in tabFlayData" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div class="projectWorkinghours-header">
            <span class="projectWorkinghours-header-time">统计周期：</span>
            <div class="projectWorkinghours-header-timeDome">
                <work-hours-time :workinghoursStart="workinghoursStart" :isAdd="isAdd" :isTianXie="isTianXie" :workinghoursEnd="workinghoursEnd" @executeFun="executeFun"></work-hours-time>
            </div>
            <!-- <div class="projectWorkinghours-header-right">
                <span class="projectWorkinghours-header-right-tit">本周总工时：<span class="projectWorkinghours-header-right-time">{{timeSheetSumWeekly+"h"}}</span></span>
                <span class="projectWorkinghours-header-right-tit">线上工时：<span class="projectWorkinghours-header-right-time">{{onlineSumWeekly+"h"}}</span></span>
                <span class="projectWorkinghours-header-right-tit">线下工时：<span class="projectWorkinghours-header-right-time">{{offlineSumWeekly+"h"}}</span></span>
            </div> -->
        </div>
        <work-hours-table-details :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></work-hours-table-details>
    </div>
</template>
<script>
import workHoursTime from "@/components/workHoursTime";
import workHoursTableDetails from "@/components/workHoursTableDetails";
export default {
    data(){
        return {
            workinghoursStart:"",
            workinghoursEnd:"",
            weekStatus:"",
            isAdd:true,
            isTianXie:true,
            offlineSumWeekly:0,
            onlineSumWeekly:0,
            timeSheetSumWeekly:0,
            workinghoursData: [],
            tabFlaySel:"all",
            tabFlayData:[
                {label:"全部",value:"all"},
                {label:"未审核",value:"unapproved"},
                {label:"已通过",value:"isPassed"},
                {label:"未通过",value:"isRefuse"},
                {label:"草稿",value:"draft"},
            ]
        }
    },
    created(){
        this.setDate();
        // this.workinghoursStart=this.getFirstDayOfWeek();
        // this.workinghoursEnd=this.getNowFormatDate(new Date(new Date(this.workinghoursStart).getTime()+518400000));
        this.getWorkH();
    },
    methods:{
        //设置初始时间（上周时间）
        setDate(){
            var monDate=this.getFirstDayOfWeek();
            this.workinghoursStart=this.getNowFormatDate(new Date(new Date(monDate).getTime()-604800000))
            this.workinghoursEnd=this.getNowFormatDate(new Date(new Date(monDate).getTime()-86400000));
        },
        //选择类型查找
        tabFlayFun(val){
            this.getWorkH();
        },
        //上下周回调
        executeFun(data){
            if(data.weekStatus == 'next' && new Date(data.workinghoursEnd + ' 23:59:59').getTime() > new Date().getTime()){
                this.isTianXie = false;
            }else{
                this.isTianXie = true;
            }
            this.workinghoursStart=data.workinghoursStart;
            this.workinghoursEnd=data.workinghoursEnd;
            this.tabFlaySel="all"
            this.getWorkH();
        },
        //提交回调
        workinghoursFun(){
            this.getWorkH();
        },
        //数据请求
        getWorkH(){
            var _this=this;
            this.$http.post("/api/projecttimesheetaudit/detail",{
                weekBeginDate:this.workinghoursStart,
                weekEndDate:this.workinghoursEnd,
                createUserId:"",
                tabFlag:this.tabFlaySel, //未审核unapproved  已通过isPassed  未通过isRefuse  草稿draft  全部all
                projectId:this.$store.state.projectId
            }).then(function (data) {
                _this.workinghoursData=data.data.length ? data.data[0].projecttimesheetauditDtos :[] ;
            }).catch(function (error) {
                _this.$messageError(error);
            });
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
        }
    },
    components:{
        workHoursTime,
        workHoursTableDetails
    }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.projectWorkinghours{
    position: relative;
    .tabFlaySelect{
        position: absolute;
        right: 0;
        top: -46px;
    }
    .projectWorkinghours-header{
        height: 30px;
        line-height: 30px;
        .projectWorkinghours-header-time{
            font-size: 13px;
        }
        .projectWorkinghours-header-timeDome{
            display: inline-block;
        }
        .projectWorkinghours-header-right{
            float: right;
            .projectWorkinghours-header-right-tit{
                padding-left: 20px;
                line-height: 30px;
                font-size:13px;
                .projectWorkinghours-header-right-time{
                    color:#EA7F2B;
                }
            }
        }
    }
    .projectWorkinghours-table{
        margin-top: 10px;
        /deep/ .el-table .el-input>input.el-input__inner{padding: 0;text-align:center;}
        .projectWorkinghours-table-btns{
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>
