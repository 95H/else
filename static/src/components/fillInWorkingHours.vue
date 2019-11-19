
<template>
    <!-- 工时表格
        ******
        *<work-hours-table :workinghoursData="workinghoursData" @workinghoursFun="workinghoursFun"></work-hours-table>
        *workinghoursData单个项目的数据
        *workinghoursFun 提交的回调
    -->
    <div class="workHoursTable">
        <div class="workHoursTable-wrap" v-for="(workHours,workHoursIndex) in workHoursData" :key="workHoursIndex">
            <div v-if="id===undefined?false:id!=workHours.projectId && workHoursIndex===0" class="otherProject"><i class="iconfont icon-renyuan"></i>人员其他项目</div>
            <div class="workHoursTable-title">{{workHours.projectName}}</div>
            <el-table
                highlight-current-row
                @cell-click="cellClick"
                :span-method="objectSpanMethod"
                :data="workHours.projectWorkingsHoursDto"
                style="width: 100%" size="mini">
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
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateMonBoolean" v-model="scope.row.onlineMon"></el-input>
                        <span v-else>{{scope.row.onlineMon}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateMonBoolean" v-model="scope.row.offlineMon"></el-input>
                        <span v-else>{{scope.row.offlineMon}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周二">
                    <el-table-column
                    prop="onlineTues"
                    label="线上"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateTuesBoolean" v-model="scope.row.onlineTues"></el-input>
                        <span v-else>{{scope.row.onlineTues}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateTuesBoolean" v-model="scope.row.offlineTues"></el-input>
                        <span v-else>{{scope.row.offlineTues}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周三">
                    <el-table-column
                    prop="onlineWed"
                    label="线上"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateWedBoolean" v-model="scope.row.onlineWed"></el-input>
                        <span v-else>{{scope.row.onlineWed}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateWedBoolean" v-model="scope.row.offlineWed"></el-input>
                        <span v-else>{{scope.row.offlineWed}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周四">
                    <el-table-column
                    prop="onlineThur"
                    label="线上"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateThurBoolean" v-model="scope.row.onlineThur"></el-input>
                        <span v-else>{{scope.row.onlineThur}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateThurBoolean" v-model="scope.row.offlineThur"></el-input>
                        <span v-else>{{scope.row.offlineThur}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周五">
                    <el-table-column
                    prop="onlineFri"
                    label="线上"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateFriBoolean" v-model="scope.row.onlineFri"></el-input>
                        <span v-else>{{scope.row.onlineFri}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateFriBoolean" v-model="scope.row.offlineFri"></el-input>
                        <span v-else>{{scope.row.offlineFri}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周六">
                    <el-table-column
                    prop="onlineSat"
                    label="线上"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateSatBoolean" v-model="scope.row.onlineSat"></el-input>
                        <span v-else>{{scope.row.onlineSat}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateSatBoolean" v-model="scope.row.offlineSat"></el-input>
                        <span v-else>{{scope.row.offlineSat}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column align="center" label="周日">
                    <el-table-column
                    prop="onlineSun"
                    label="线上"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateSunBoolean" v-model="scope.row.onlineSun"></el-input>
                        <span v-else>{{scope.row.onlineSun}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="线下"
                    align="center"
                    width="45">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" v-if="timeSheet(scope.row.timeSheetStatus)" :disabled="!scope.row.dateSunBoolean" v-model="scope.row.offlineSun"></el-input>
                        <span v-else>{{scope.row.offlineSun}}</span>
                    </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="timeSheetSumWeekly"
                    label="总计"
                    align="center"
                    width="45">
                </el-table-column>
                <el-table-column
                    label="详情描述"
                    min-width="100">
                    <template slot-scope="scope">
                        <el-input @focus="inputFocus" @blur="inputBlur" maxLength="50" type="textarea" v-if="timeSheet(scope.row.timeSheetStatus)" v-model="scope.row.jobContentDesc"></el-input>
                        <span v-else class="tableTextarea">{{scope.row.jobContentDesc}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="50">
                    <template slot-scope="scope">
                        <div class="table-btns">
                            <el-button type="primary" size="mini" :disabled="!timeSheet(scope.row.timeSheetStatus) || btnDisabled" @click="saveWorkTime(workHoursIndex)">保存</el-button>
                            <el-button class="btnColor" size="mini" :disabled="!timeSheet(scope.row.timeSheetStatus) || btnDisabled" @click="showDialog(workHoursIndex)">提交</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div v-if="id==workHours.projectId && workHoursIndex===0 && workHoursData.length>1" class="otherProject"><i class="iconfont icon-renyuan"></i>人员其他项目</div>
        </div>

        <table class="workHoursTotal" v-if="workHoursData.length>0">
            <colgroup><col width="110"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="45"><col width="203"></colgroup>
            <tbody>
                <tr>
                    <td align="center" rowspan="2"><div class="cell cellHead">每日工时总计</div></td>
                    <td align="center" v-for="(onlineOffline,oInd) in workHoursTotal.onlineOffline" :key="oInd"><div class="cell">{{onlineOffline}}</div></td>
                    <td align="center" rowspan="2"></td>
                </tr>
                <tr>
                    <td align="center" v-for="(total,tInd) in workHoursTotal.total" :colspan="tInd>6?1:2" :key="tInd"><div v-if="tInd<7" class="cell" :class="{'red':total>8,'blue':total<8,'green':total==8}">{{total}}</div><div v-if="tInd==7" class="cell" :class="{'red':total>56,'blue':total<56,'green':total==56}">{{total}}</div></td>
                </tr>
            </tbody>
        </table>
        <div class="noData" v-if='workHoursData.length===0'>暂无数据</div>
        <center-dialog ref="tipsSubmit" dialogWidth="300px" dialogHeight="137px" titlePosition="left">
            <div slot="dialogContent">
                <div class="del_content fs13 text-center">
                    提交后将无法修改，是否确定提交？
                </div>
                <div class="text-center marginTop20">
                    <a class="search-btn" @click="submitWorkTime">确定</a>
                    <a class="reset-btn" @click="closeDialog">取消</a>
                </div>
            </div>
        </center-dialog>
    </div>
</template>

<script>
    import centerDialog from '@/components/centerDialog.vue';
    export default {
        props: ["workinghoursData","onlineDuration","id"],
        data () {
            return {
                workHoursData:[],
                workHoursTotal:{
                    onlineOffline:[],
                    total:[]
                },
                rowObj:"",
                CONSTANT_TOTAL_ARR:["onlineMon","offlineMon","onlineTues","offlineTues","onlineWed","offlineWed","onlineThur","offlineThur","onlineFri","offlineFri","onlineSat","offlineSat","onlineSun","offlineSun","timeSheetSumWeekly"],
                CONSTANT_TOTAL_ONLINE:["onlineMonDate","onlineTuesDate","onlineWedDate","onlineThurDate","onlineFriDate","onlineSatDate","onlineSunDate"],
                projectIndex : "",
                btnDisabled : false
            };
        },
        created(){
            var _this=this;
            if(!_this.workHoursData.length==0){
                data.data[0].projectWorkingsHoursDto[0].spanMethod=data.data[0].projectWorkingsHoursDto.length;
                _this.workHoursData=data.data[0];
                _this.pName=data.data[0].pName;
            }
        },
        methods:{
            showDialog(index){
                this.$refs.tipsSubmit.showDialog();
                this.projectIndex = index;
            },
            closeDialog(){
                this.$refs.tipsSubmit.closeDialog();
            },
            cellClick(row, column, cell, event){
                cell.parentNode.className="el-table__row current-row"
                if(this.rowObj && this.rowObj!=cell.parentNode){
                    this.rowObj.className="el-table__row"
                }
                this.rowObj=cell.parentNode;
            },
            inputFocus(e){
                e.target.style="border:1px solid #88C6FF;background:#fff";
            },
            inputBlur(e){
                e.target.style="";
            },
            ZNumber(str){
                if(str==="" || str===undefined){
                    return 0
                // }else if(isNaN(str)){
                //     this.$messageError("请输入一个标准数字");
                }else{
                    if(String(str).indexOf(".")!=-1 && String(str).split(".")[1].length > 0){
                        return parseFloat(Math.ceil(Number(str)*10)/10);
                    }else{
                        return parseInt(str);
                    }
                }
            },
            //操作合并单元格
            objectSpanMethod({row, column, rowIndex, columnIndex}){
                if(columnIndex==17){
                    if(rowIndex % row.mileCount == 0){
                        return [row.mileCount,1];
                    }else{
                        return [0,0];
                    }
                }
            },
            //保存
            saveWorkTime(index){
                var _this=this;
                if(this.calculateWorkHours()){
                    this.$messageError(this.calculateWorkHours());
                    return
                }else{
                    this.$http.post("/api/projecttimesheetaudit/insertOrUpdateProjectTimeSheetAudit",{
                        projectTimeSheetAuditJson:JSON.stringify(this.workHoursData[index].projectWorkingsHoursDto),
                        flag:"keep",
                        projectId : this.workHoursData[index].projectId
                    }).then(function (data) {
                        _this.$messageSuccess('保存成功');
                        _this.$emit('workinghoursFun');
                    }).catch(function (error) {
                        _this.$messageError(error);
                    });
                }
            },
            //提交
            submitWorkTime(){
                var _this=this;
                if(this.calculateWorkHours()){
                    this.$messageError(this.calculateWorkHours());
                    return
                }else{
                    this.$http.post("/api/projecttimesheetaudit/insertOrUpdateProjectTimeSheetAudit",{
                        projectTimeSheetAuditJson:JSON.stringify(this.workHoursData[this.projectIndex].projectWorkingsHoursDto),
                        flag:"submit",
                        projectId : this.workHoursData[this.projectIndex].projectId
                    }).then(function (data) {
                        _this.btnDisabled = true;
                        _this.$messageSuccess('提交成功');
                        _this.$emit('workinghoursFun');
                        _this.closeDialog();
                    }).catch(function (error) {
                        _this.$messageError(error);
                    });
                }
            },
            timeSheet:function(status){
                switch(status){
                    case "":
                    case 1114:
                    case 1006:
                    return true
                    break;
                    default:
                    return false
                }
            },
            //计算工时总计
            calculateWorkHours(){
                var onlineArr={
                    "onlineThurDate":0,
                    "onlineWedDate":0,
                    "onlineSunDate":0,
                    "onlineTuesDate":0,
                    "onlineMonDate":0,
                    "onlineSatDate":0,
                    "onlineFriDate":0
                },BoolMsg="";
                this.workHoursTotal.onlineOffline=[];
                this.workHoursTotal.total=[];
                for(var i=0;i<this.workHoursData.length;i++){
                    var projectWorkingsHoursDto=this.workHoursData[i].projectWorkingsHoursDto;
                    for (let j = 0; j < projectWorkingsHoursDto.length; j++) {
                        projectWorkingsHoursDto[j].projectId=this.workHoursData[i].pId;
                        //单个项目总工时
                        projectWorkingsHoursDto[j].timeSheetSumWeekly=Math.round((this.ZNumber(projectWorkingsHoursDto[j].onlineMon)+this.ZNumber(projectWorkingsHoursDto[j].onlineTues)+this.ZNumber(projectWorkingsHoursDto[j].onlineWed)+this.ZNumber(projectWorkingsHoursDto[j].onlineThur)+this.ZNumber(projectWorkingsHoursDto[j].onlineFri)+this.ZNumber(projectWorkingsHoursDto[j].onlineSat)+this.ZNumber(projectWorkingsHoursDto[j].onlineSun)+this.ZNumber(projectWorkingsHoursDto[j].offlineMon)+this.ZNumber(projectWorkingsHoursDto[j].offlineTues)+this.ZNumber(projectWorkingsHoursDto[j].offlineWed)+this.ZNumber(projectWorkingsHoursDto[j].offlineThur)+this.ZNumber(projectWorkingsHoursDto[j].offlineFri)+this.ZNumber(projectWorkingsHoursDto[j].offlineSat)+this.ZNumber(projectWorkingsHoursDto[j].offlineSun))*10)/10
                        // 单个项目线上总工时
                        projectWorkingsHoursDto[j].onlineSumWeekly=Math.round((this.ZNumber(projectWorkingsHoursDto[j].onlineMon)+this.ZNumber(projectWorkingsHoursDto[j].onlineTues)+this.ZNumber(projectWorkingsHoursDto[j].onlineWed)+this.ZNumber(projectWorkingsHoursDto[j].onlineThur)+this.ZNumber(projectWorkingsHoursDto[j].onlineFri)+this.ZNumber(projectWorkingsHoursDto[j].onlineSat)+this.ZNumber(projectWorkingsHoursDto[j].onlineSun))*10)/10
                        // 单个项目线下总工时
                        projectWorkingsHoursDto[j].offlineSumWeekly=Math.round((this.ZNumber(projectWorkingsHoursDto[j].offlineMon)+this.ZNumber(projectWorkingsHoursDto[j].offlineTues)+this.ZNumber(projectWorkingsHoursDto[j].offlineWed)+this.ZNumber(projectWorkingsHoursDto[j].offlineThur)+this.ZNumber(projectWorkingsHoursDto[j].offlineFri)+this.ZNumber(projectWorkingsHoursDto[j].offlineSat)+this.ZNumber(projectWorkingsHoursDto[j].offlineSun))*10)/10

                        for (let z = 0; z < this.CONSTANT_TOTAL_ARR.length; z++) {
                            if(this.onlineDuration[this.CONSTANT_TOTAL_ARR[z]+"Date"]!==undefined){
                                this.workHoursTotal.onlineOffline[z]=this.onlineDuration[this.CONSTANT_TOTAL_ARR[z]+"Date"];
                                onlineArr[this.CONSTANT_TOTAL_ARR[z]+"Date"]+=parseFloat(projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]==""?0:projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]])
                            }else{
                                if(typeof projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]==="string"){
                                    this.workHoursTotal.onlineOffline[z]===undefined?this.workHoursTotal.onlineOffline[z]=0+this.ZNumber(projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]):this.workHoursTotal.onlineOffline[z]+=this.ZNumber(projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]);
                                }else{
                                    this.workHoursTotal.onlineOffline[z]===undefined?this.workHoursTotal.onlineOffline[z]=0+projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]]:this.workHoursTotal.onlineOffline[z]+=projectWorkingsHoursDto[j][this.CONSTANT_TOTAL_ARR[z]];
                                }
                            }

                            this.workHoursTotal.onlineOffline[z]=Math.round(this.workHoursTotal.onlineOffline[z] * 10) / 10;
                            // debugger
                            if(this.onlineDuration[this.CONSTANT_TOTAL_ARR[z]+"Date"] < onlineArr[this.CONSTANT_TOTAL_ARR[z]+"Date"]){
                                BoolMsg="每日线上工时总和不能超过每日在线总工时!";
                            }

                            // 判断是否为0.5小时
                            if(String(projectWorkingsHoursDto[j].timeSheetSumWeekly).indexOf(".") != -1 && String(projectWorkingsHoursDto[j].timeSheetSumWeekly).split(".")[1] != 5){
                                BoolMsg="请输入最小单位为0.5小时的数值";
                            }
                        }
                    }
                }
                for (let x = 0; x < 8; x++) {
                    if(x<7){
                        this.workHoursTotal.total[x] = (this.workHoursTotal.onlineOffline[x*2]*10 + this.workHoursTotal.onlineOffline[(x*2)+1]*10) / 10;
                        // this.workHoursTotal.total[x] = Math.round(this.workHoursTotal.total[x] * 10) / 10
                        this.workHoursTotal.total[7] = this.workHoursTotal.total[7] ? (this.workHoursTotal.total[7]*10+this.workHoursTotal.total[x]*10)/10 : (0+this.workHoursTotal.total[x]*10)/10;
                        if(this.workHoursTotal.total[x] > 24){
                            BoolMsg="每日工作时间不能超24小时!";
                        }
                    }else{
                        this.workHoursTotal.onlineOffline[this.workHoursTotal.onlineOffline.length-1] = this.workHoursTotal.total[7];
                        // this.workHoursTotal.total[x] = this.workHoursTotal.total[7];
                    }
                }
                return BoolMsg;
            }
        },
        watch:{
            //计算线上线下工时
            workinghoursData:{
                handler:function(newD,oldD){
                    if(newD.length>0){
                        this.workHoursData = newD;
                        if(this.calculateWorkHours()){
                            this.$messageError(this.calculateWorkHours());
                        }
                    }else{
                        this.workHoursData = newD;
                    }
                },
                deep:true
            },
        },
        components: {
            centerDialog
        }
    }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.workHoursTable{
    /deep/ .el-table::before{ height:0;}
    /deep/ .el-table--border::after,/deep/ .el-table--group::after{ width:0;}
    /deep/ .el-table__body .el-table__row td{
        min-height:60px;
        height:auto;
        position: relative;
        .cell{padding: 0;color:#6A6A6A;height: 100%;
            /*display: -webkit-box;*/
            -webkit-box-orient: horizontal;
            -webkit-box-pack: center;
            -webkit-box-align: center;
            .el-input{
                position: static;
                .el-input__inner{
                    /*position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;*/
                    height: 60px !important;
                    padding: 0!important;
                    border-radius: 0;
                    border-color: rgba(255,255,255,0);
                    background: none;}
            }
            .el-textarea{
                .el-textarea__inner{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-radius: 0;
                    border-color: rgba(255,255,255,0);
                    border: none;
                    background: none;
                    padding:3px 5px;
                    font-size:12px;
                    font-family:"微软雅黑";
                }
            }
            .tableTextarea{
                display: block;
                line-height:20px;
                padding:3px 5px;
            }
        }
    }
    /deep/ .el-table__header thead .cell{color: #262628;}
    .workHoursTable-wrap{
        .otherProject{
            font-size: 13px;
            line-height:32px;
            color:#262628;
            border:1px solid #E5E5E5;
            background-color:#FAFAFA;
            margin-top: 10px;
            >i{
                font-size: 14px;
                color: #c3a2eb;
                padding-left: 19px;
                padding-right:11px;
            }
        }
        .workHoursTable-title{
            position: relative;
            height: 40px;
            line-height: 40px;
            background: #fff;
            padding-left: 16px;
            font-size: 13px;
            font-weight: bold;
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
            line-height: 25px;
            /deep/ .el-button{margin: 0;padding:0;height: 20px;width: 40px;}
            .btnColor{color:#3a8ee6; border-color:#3a8ee6;
                &.is-disabled{border-color: #ebeef5;color: #c0c4cc;}
            }
        }
        /deep/ tr.current-row>td{
            background: #FFF5EB;
        }
    }
    .workHoursTotal{
        margin-top: 10px;
        width: 100%;
        table-layout: fixed;
        tr{
            border-bottom: 1px solid #e5e5e5;
            td{
                height: 32px;
                padding: 0;
                text-align: center;
                border-right: 1px solid #e5e5e5;
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
                border-left: 1px solid #e5e5e5;
            }
        }
        tr:first-child{
            border-top: 1px solid #e5e5e5;
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
            font-size: 13px;
        }
    }

}
</style>
