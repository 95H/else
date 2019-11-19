<template>
    <div class="evaluationWorkWrap">
        <el-container class="evaluationWorkBox">
            <span class="hidden" ref="ids">{{dataObj}}</span>
            <el-main class="evaluationWork_Main">
                <div>
                    <p><i class="iconfont icon-renwuxiangqing"></i>任务详情</p>
                    <div class="evaluationWork_top">
                        <div>
                            <p>项目名称：<span></span></p>
                            <p>项目编号：<span>ZHG1231313131</span></p>
                        </div>
                        <div>
                            <p>联系人姓名：<span>李思妙</span></p>
                            <p>联系人手机：<span>12345678765</span></p>
                        </div>
                        <div>
                            <p>联系人电话：<span>010-88395886</span></p>
                            <p>联系人传真：<span>010-88395888</span></p>
                        </div>
                        <div>
                            <p>办公地址：<span>北京市海淀区上园村3号院北京市海淀区上园村3号院北京市海淀区上园村3号院</span></p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        <i class="iconfont icon-renwuxiangqing fl"></i>
                        <ul class="fl">
                            <li v-for="(list,index) in evaluationWorkForm.navLists" :key="index" :id="list.id" :class="{lineActive:changeRed == index}" @click="line(index)">{{list.text}}</li>
                        </ul>
                    </p>
                    <div>
                        <p><span>{{evaluationWorkForm.navLists[changeRed].text}}</span>：</p>
                        <div class="newEWlistBox">
                            <el-form :model="evaluationWorkForm" ref="evaluationWorkForm" label-width="110px" size="mini" class="evaluationWorkForm" :show-message="false">
                                <div class="newEWlist" v-for="(i,ind) in evaluationWorkForm.navLists[changeRed].items" :key="ind">
                                    <p>{{ind + 1}}</p>
                                    <div class="paddingLeft10">
                                        <el-form-item label="任务负责人：" :prop="'navLists.'+changeRed+'.items.'+ind+'.taskPeople'" :rules="[{
                                            required: true, message: '请选择任务负责人', trigger: 'change'
                                        }]"  class="marginBottom10">
                                            <el-select class="allw" v-model="i.taskPeople" placeholder="请选择任务负责人">
                                            <el-option :label="item.userName" :value='item.userId' v-for='(item,index) in opt' :key="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="负责公司：" :prop="'navLists.'+changeRed+'.items.'+ind+'.responsibleCompany'" :rules="[{
                                            required: true, message: '请选择负责公司', trigger: 'blur'
                                        }]"  class="marginBottom0">
                                            <el-input v-model="i.responsibleCompany" placeholder="请输入负责公司"  ></el-input>
                                        </el-form-item>
                                    </div>
                                    <p><i class="iconfont icon-shanchu1" @click="delitem(ind)"></i></p>
                                </div>
                            </el-form>
                        </div>
                        <el-button type="primary" size="mini" plain @click="additem" class="marginTop10"> + 添加</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            opt:[],
            
            allMsg:[
                {
                    "headUserId":"409",
                    "jobType":1178,
                    "investorIds":"2"
                }
            ],
            changeRed:0,
            evaluationWorkForm: {
                navLists: [
                    { 
                        "text": "流动资产与负债",
                        "id":1178,
                        items: [
                            {responsibleCompany: ''}
                        ],
                        select: [],
                        job: ''
                    },
                    { "text": "房产","id":1179,
                        items: [{}] },
                    { "text": "土地","id":1180,
                        items: [{}] },
                    { "text": "设备与车辆","id":1181,
                        items: [{}] },
                    { "text": "无形资产","id":1182,
                        items: [{}] },
                    { "text": "特殊无形资产","id":1183,
                        items: [{}] }
                ],
            },
            dataObj:""
        }
    },
    created() {

    },
    beforeMount() {
        // res.list = {a: 1}
        // this.navLists = list
        // res.list
        // a.then(res => {
        //     this.handelData(res.list, 'aaa')
        // })
        // b.then(res => {
        //     this.handelData(res.list, 'bbb')
        // })
    },
    methods: {
        // handelData(list, fromServe) {
        //     let ar  = [];
            
        //     list.map(() => {

        //     })
        // },
        childMethod(){
            this.$refs["evaluationWorkForm"].validate((valid) => {
                console.log(valid);
                if (valid) {
                    console.log(this.evaluationWorkForm);
                    this.$confirm('确认分配本次评估作业任务？', '提示信息', {
                        confirmButtonText: '确认分配',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '分配成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消分配'
                        });          
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        line:function(index){
            this.changeRed = index;
        },
        delitem(ind) {
           // debugger;
            console.log(ind);
            this.navLists[ind-1].items.splice(ind,1);
        },
        additem(){
           // debugger;
            console.log(this.navLists);
            this.navLists[this.changeRed].items.push([]);
        }
    },
    mounted() {
        var _this = this;
        this.dataObj = this.$store.state.num;
        this.$http.post('/api/projectuser/findHeaderUserList',{
            projectId:this.dataObj
        }).then(function (data) {
            _this.opt = data.data;
            console.log(_this.opt);
        }).catch(function (error) {
            _this.$messageError(error);
        });
    }
}
</script>
<style lang="scss" scoped>
.evaluationWorkWrap {
  .evaluationWorkBox {
    width: 800px;
    height: 786px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(203, 203, 203, 0.5);
    .evaluationWork_Main {
        >div:first-child {
            height: auto;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid rgba(236, 236, 236, 1);
            >p {
                height: 35px;
                background: #fafafa;
                border-radius: 2px 2px 0px 0px;
                border-bottom: 1px solid rgba(236, 236, 236, 1);
                line-height: 36px;
                font-size: 13px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color: rgba(38, 38, 40, 1);
                > i {
                    color: #f7b543;
                    margin-left: 17px;
                    margin-right: 10px;
                }
            }
            .evaluationWork_top {
                padding: 15px 35px;
                display: inline-block;
                width: 688px;
                > div > p {
                    float: left;
                    width: 50%;
                    line-height: 34px;
                    font-size: 13px;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: #505050;
                    span {
                    color: #1d1c1e;
                    }
                }
                > div:last-child > p {
                    width: 100%;
                }
            }
        }
        >div:last-child {
            margin-top: 12px;
            height: auto;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid rgba(236, 236, 236, 1);
            >p {
                width:100%;
                height:35px;
                background:#fafafa;
                border-radius:2px 2px 0px 0px;
                border-bottom:1px solid rgba(236,236,236,1);
                line-height: 35px;
                i {
                    color:rgba(247,181,67,1);
                    margin-left: 16px;
                    margin-right: 10px;
                }
                ul {
                    li {
                        float: left;
                        font-size:13px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(38,38,40,1);
                        margin-right: 20px;
                        cursor: pointer;
                    }
                    li:last-child {
                        margin-right: 0;
                    }
                    .lineActive {
                        color: #145FD2;
                        border-bottom:2px solid #145FD2;
                    }
                }
            }
            >div {
                margin: 18px 24px;
                >p {
                    font-size:13px;
                    font-family:PingFangSC-Regular;
                    font-weight:400;
                    color:rgba(38,38,40,1);
                }
                .newEWlist {
                    margin-top: 12px;
                    background: #f9f9f9;
                    display: inline-block;
                    width: 100%;
                    height: 90px;
                    display: flex;
                    p:first-child {
                        width:14px;
                        height:90px;
                        background:rgba(152,194,104,1);
                        text-align: center;
                        line-height: 90px;
                        font-size:13px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                    p:last-child {
                        margin: 0 20px;
                        i {
                            color: rgba(192,192,192,1);
                            line-height: 90px;
                        }
                    }
                    >div {
                        flex: 1;
                        -ms-flex:1 0 auto;
                        margin: 11px 0;
                        >div {
                            .allw {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }
  }
}
</style>
