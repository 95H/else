
<template>
    <!-- 工时表格
        ******
        *<work-hours-table :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></work-hours-table>
        *workinghoursData单个项目的数据
        *workinghoursFun 提交的回调
    -->
    <div class="workHoursTable">
        <div class="workHoursTable-wrap" v-for="(workHours,workHoursIndex) in workHoursData" :key="workHoursIndex">
            <div class="workHoursTable-title">{{workHours.projectName}} <el-button class="workHoursTable-title-btn" size="mini" type="primary" @click="jumpProject(workHours)">进入项目</el-button></div>
            <el-table
                :data="workHours.projectWorkingsHoursDto"
                style="width: 100%" size="mini">
                <!-- <el-table-column
                prop="mileStoneName"
                label="人员"
                align="center"
                width="80"> -->
                <el-table-column
                prop="mileStoneName"
                label="里程碑"
                align="center"
                width="110">
                </el-table-column>
                <el-table-column align="center" label="周一">
                    <el-table-column
                    prop="onlineMon"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineMon"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周二">
                    <el-table-column
                    prop="onlineTues"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineTues"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周三">
                    <el-table-column
                    prop="onlineWed"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineWed"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周四">
                    <el-table-column
                    prop="onlineThur"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineThur"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周五">
                    <el-table-column
                    prop="onlineFri"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineFri"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周六">
                    <el-table-column
                    prop="onlineSat"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineSat"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周日">
                    <el-table-column
                    prop="onlineSun"
                    label="线上"
                    align="center"
                    width="45">
                    </el-table-column>
                    <el-table-column
                    prop="offlineSun"
                    label="线下"
                    align="center"
                    width="45">
                    </el-table-column>
                </el-table-column>
                <el-table-column
                prop="timeSheetSumWeekly"
                label="总计"
                align="center">
                </el-table-column>
                <el-table-column
                prop="timeSheetStatus"
                label="审核结果"
                align="center">
                <template slot-scope="scope">
                    <span>{{timeSheetStatus[scope.row.timeSheetStatus]}}</span>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="el-table__noData" v-if="workHoursData.length===0"><span class="noData">暂无数据</span></div>
    </div>
</template>

<script>
    export default {
        props: ["workinghoursData"],
        data () {
            return {
                workHoursData:[],
                timeSheetStatus:window.commonData.timeSheetStatus
            };
        },
        created(){
            var _this=this;
            if(!_this.workHoursData.length==0){
                data.data[0].projectWorkingsHoursDto[0].spanMethod=data.data[0].projectWorkingsHoursDto.length;
                _this.workHoursData=data.data[0];
                _this.projectName=data.data[0].projectName;
            }
        },
        methods:{
            jumpProject(row){
                this.$store.state.projectId = row.projectId;
                this.$setCookie('projectId', row.projectId ,24*60*60);
                this.$router.push({name:"projectInformation"});
                this.$store.commit('changeShowCommon')
            }
        },
        watch:{
            //计算线上线下工时
            workinghoursData:{
                handler:function(newD,oldD){
                    this.workHoursData=newD;
                },
                deep:true
            }

        }
    }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.workHoursTable{
    margin-top: 10px;
    /deep/ .el-table__body .el-table__row td{
        padding: 0;
        .cell{padding: 0;color:#6A6A6A;height: 100%;
            display: -webkit-box;
            -webkit-box-orient: horizontal;
            -webkit-box-pack: center;
            -webkit-box-align: center;
            .el-input{
                .el-input__inner{
                    height: 60px !important;    
                    padding: 0!important;
                    border: none;
                    background: none;}
            }
            .el-textarea{
                .el-textarea__inner{
                    height: 60px !important;    
                    /* padding: 0!important; */
                    border: none;
                    background: none;
                }
            }
        }
    } 
    /deep/ .el-table__header thead .cell{color: #262628;}
    .workHoursTable-wrap{
        .workHoursTable-title{
            position: relative;
            height: 40px;
            line-height: 40px;
            background: #fff;
            padding-left: 16px;
            font-size: 13px;
            font-weight: bold;
            .workHoursTable-title-btn{
                float: right;
                margin-top: 6px;
            }
        }
        .workHoursTable-title:after{
            content:"";
            position: absolute;
            left: 0;
            width:6px;
            height:6px;
            border-radius: 3px;
            top: 17px;
            background: #F09237;
            display: inline-block;
        }
        /deep/ .el-table .el-input>input.el-input__inner{padding: 0;text-align:center;}
        .workHoursTable-table-btns{
            margin-top: 10px;
            text-align: center;
        }
        .table-btns{
            line-height: 30px;
            /deep/ .el-button{margin: 0;padding:0;height: 20px;width: 40px;}
            /* .btnColor{color:#3a8ee6;} */
        }
        /deep/ tr.current-row>td{
            background: #FFF5EB;
        }
    }
    .workHoursTotal{
        margin-top: 10px;
        width: 100%;
        tr{
            border-bottom: 1px solid #ebeef5;
            td{
                height: 32px;
                padding: 0;
                text-align: center;
                border-right: 1px solid #ebeef5;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                position: relative;
                .cell{
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 23px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 12px;
                    color:#F09237;
                }
                .cellHead{
                    color:#262628;
                }
            }
            td:first-child{
                border-left: 1px solid #ebeef5;
            }
        }
        tr:first-child{
            border-top: 1px solid #ebeef5;
        }
        
    }
    .el-table__noData{
        min-height: 60px;
        text-align: center;
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        .el-table__noData-text{
            width: 50%;
            color: #909399;
        }
    }
    
}
</style>
    