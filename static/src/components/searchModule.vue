
<template>
    <div class="searchModule">
        <div class="searchModule-content">
            <!--表头名称-->
            <!-- <div class="searchModule-content-tit">{{search.label+'：'}}</div> -->
            <!-- 输入框 -->
            <!--<p class="searchModule-title" v-if="search.type==='range'||search.type==='selectInput'||search.type==='selectSingle'">
                    <span class="">页面搜索</span>
            </p>
            <div class="searchModule-content-cont" v-if="search.type==='input'">
                <el-input :placeholder="search.placeholder"></el-input>
            </div>
            &lt;!&ndash; 下拉 &ndash;&gt;
            <div class="searchModule-content-cont" v-else-if="search.type==='select'">
                <el-select v-model="search.default" :placeholder="search.placeholder">
                      <el-option v-for="item in search.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            &lt;!&ndash; 多选 &ndash;&gt;
            <div class="searchModule-content-cont" v-else-if="search.type==='checkbox'">
                <el-checkbox-group v-model="search.checkList">
                    <el-checkbox label="复选框 A"></el-checkbox>
                </el-checkbox-group>
            </div>
             &lt;!&ndash; 单选 &ndash;&gt;
            <div class="searchModule-content-cont selectSingle" v-else-if="search.type==='selectSingle'">
                 <el-radio-group v-model="search.radio">
                    <el-radio :label="item" v-for="(item,key) in search.termArr" :key="key">{{item}}</el-radio>
                </el-radio-group>
            </div>
            &lt;!&ndash; 范围 &ndash;&gt;
            <div class="searchModule-content-cont rangeInput" v-else-if="search.type==='range'">
                <div class="searchModule-content-cont selectInput">
                     <el-select  v-model="search.title1">
                        <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-date-picker v-if="search.inputType=='date'" v-model="search.suffixInput1" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                        :editable="false"
                        :clearable="false"></el-date-picker>
                    <el-input v-else :placeholder="search.placeholder" v-model="search.suffixInput1"></el-input>
                </div>
                 <div class="searchModule-content-cont selectInput">
                     <el-select  v-model="search.title2">
                        <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-date-picker v-if="search.inputType=='date'" v-model="search.suffixInput2" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"
                    format="yyyy/MM/dd"
                    :editable="false"
                    :clearable="false"></el-date-picker>
                    <el-input v-else :placeholder="search.placeholder" v-model="search.suffixInput2"></el-input>
                </div>
                &lt;!&ndash; <el-input :placeholder="search.placeholder"></el-input><span>&#45;&#45;</span><el-input :placeholder="search.placeholder"></el-input> &ndash;&gt;
            </div>
            &lt;!&ndash; 大于，小于，等于，非等 &ndash;&gt;
            <div class="searchModule-content-cont selectInput" v-else-if="search.type==='selectInput'">
                <el-select  v-model="search.title">
                    <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-input :placeholder="search.placeholder" v-model="search.suffixInput"></el-input>
            </div>-->


            <!--tab切换的 tab1-->
            <el-tabs v-model="activeName" @tab-click="handleClick" v-if="search.type==='tab'">
                <el-tab-pane label="页面搜索" name="first">
                    <!--搜索范围-->
                    <div class="searchModule-content-cont rangeInput" v-if="search.tab1=='range'">
                        <div class="searchModule-content-cont selectInput">
                            <el-select  v-model="search.title1">
                                <el-option
                                    v-for="item in options"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <el-input :placeholder="search.placeholder" v-model="search.suffixInput1"></el-input>
                        </div>
                        <div class="searchModule-content-cont selectInput">
                            <el-select  v-model="search.title2">
                                <el-option
                                    v-for="item in options"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <el-input :placeholder="search.placeholder" v-model="search.suffixInput2"></el-input>
                        </div>
                    </div>
                    <!--单选 作价规则-->
                    <div class="searchModule-content-cont rangeInput selectSingle" v-if="search.tab1==='checkbox'">
                        <!-- <el-checkbox-group v-model="search.check">
                             <el-checkbox :label="item.label" v-for="(item,key) in search.rule" :key="key.value">{{item.label}}</el-checkbox>
                        </el-checkbox-group>   -->

                        <el-radio-group v-model="search.check">
                            <el-radio :label="item.label" v-for="(item,key) in search.rule" :key="key.value">{{item.label}}</el-radio>
                        </el-radio-group>
                    </div>
                </el-tab-pane>
                <!--tab2 begin-->
                <el-tab-pane :label="search.tabTitle" name="second" v-if="!search.noReplace">
                    <!--单选***作价规则-->
                    <div v-if="search.label=='作价规则'" class="searchModule-radio-group rule-type-cont">
                        <el-radio-group v-model="search.radio1" class="price-rule">
                            <el-radio-button :label="item.value" v-for="(item,key) in search.rule" :key="key" >{{item.label}}</el-radio-button>
                        </el-radio-group>
                        <p class="ratio-item" v-if="search.radio1==2">
                            <label class="dd-title">账面值系数:</label>
                            <el-input placeholder="请输入账面值系数" v-model="search.ratioPrice"></el-input>
                        </p>
                        <el-radio-group v-model="search.radio2" class="full-single-item">
                            <el-radio label="全部数据">全部数据</el-radio>
                            <el-radio label="条件查询数据">条件查询数据</el-radio>
                            <el-radio label="当前勾选数据">当前勾选数据</el-radio>
                        </el-radio-group>
                    </div>

                    <!--账面值系数-->
                    <div v-if="search.label=='账面值系数'" class="searchModule-input-group">
                        <p class="ratio-item"><label class="dd-title">账面值系数:</label><el-input :placeholder="search.placeholder" v-model="search.radio1"></el-input></p>
                        <p class="ratio-item">
                            <label class="dd-title">&nbsp</label>
                            <el-radio-group v-model="search.radio1">
                                <el-radio-button label="100"></el-radio-button>
                                <el-radio-button label="75"></el-radio-button>
                                <el-radio-button label="25"></el-radio-button>
                                <el-radio-button label="0"></el-radio-button>
                            </el-radio-group>
                        </p>
                        <el-radio-group v-model="search.radio2" class="full-single-item">
                            <el-radio label="全部数据">全部数据</el-radio>
                            <el-radio label="条件查询数据">条件查询数据</el-radio>
                            <el-radio label="当前勾选数据">当前勾选数据</el-radio>
                        </el-radio-group>
                    </div>
                    <!--购置税-->
                    <!-- <div v-if="search.label=='购置税'" class="searchModule-input-group">
                        <p class="ratio-item"><label class="dd-title">购置税税率:</label><el-input :placeholder="search.placeholder" v-model="search.radio2"></el-input></p>
                        <el-radio-group v-model="search.radio2" class="full-single-item">
                            <el-radio label="全部数据">全部数据</el-radio>
                            <el-radio label="条件查询数据">条件查询数据</el-radio>
                            <el-radio label="当前勾选数据">当前勾选数据</el-radio>
                        </el-radio-group>
                    </div> -->
                    <!--默认值调整||列调整-->
                    <div v-if="search.tab2" class="searchModule-input-group">
                        <p class="ratio-item"><label class="dd-title">{{search.tabTitle}}</label>
                            <el-input  v-model="search.defaultVal" :placeholder="search.placeholder2"></el-input>
                        </p>
                        <el-radio-group v-model="search.radio2" class="full-single-item">
                            <el-radio label="全部数据">全部数据</el-radio>
                            <el-radio label="条件查询数据">条件查询数据</el-radio>
                            <el-radio label="当前勾选数据">当前勾选数据</el-radio>
                        </el-radio-group>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <!--非tab类型的表头-->
            <el-tabs v-else @tab-click="handleClick" v-model="activeName">
                <el-tab-pane label="页面搜索" name="first">
                  <!--<p class="searchModule-title" v-if="search.type==='range'||search.type==='selectInput'||search.type==='selectSingle'">
                    <span class="">页面搜索</span>
                  </p>-->
                  <div class="searchModule-content-cont" v-if="search.type==='input'">
                    <el-input :placeholder="search.placeholder"></el-input>
                  </div>
                  <!-- 下拉 -->
                  <div class="searchModule-content-cont" v-else-if="search.type==='select'">
                    <el-select v-model="search.default" :placeholder="search.placeholder">
                      <el-option v-for="item in search.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <!-- 多选 -->
                  <div class="searchModule-content-cont" v-else-if="search.type==='checkbox'">
                    <el-checkbox-group v-model="search.checkList">
                      <el-checkbox label="复选框 A"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <!-- 单选 -->
                  <div class="searchModule-content-cont selectSingle" v-else-if="search.type==='selectSingle'">
                    <el-radio-group v-model="search.radio">
                      <el-radio :label="item" v-for="(item,key) in search.termArr" :key="key">{{item}}</el-radio>
                    </el-radio-group>
                  </div>
                  <!-- 范围 -->
                  <div class="searchModule-content-cont rangeInput" v-else-if="search.type==='range'">
                    <div class="searchModule-content-cont selectInput">
                      <el-select  v-model="search.title1">
                        <el-option
                          v-for="item in options"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                      <el-date-picker v-if="search.inputType=='date'" v-model="search.suffixInput1" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"
                                      format="yyyy/MM/dd"
                                      :editable="false"
                                      :clearable="false"></el-date-picker>
                      <el-input v-else :placeholder="search.placeholder" v-model="search.suffixInput1"></el-input>
                    </div>
                    <div class="searchModule-content-cont selectInput">
                      <el-select  v-model="search.title2">
                        <el-option
                          v-for="item in options"
                          :key="item"
                          :label="item"
                          :value="item">
                        </el-option>
                      </el-select>
                      <el-date-picker v-if="search.inputType=='date'" v-model="search.suffixInput2" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"
                                      format="yyyy/MM/dd"
                                      :editable="false"
                                      :clearable="false"></el-date-picker>
                      <el-input v-else :placeholder="search.placeholder" v-model="search.suffixInput2"></el-input>
                    </div>
                    <!-- <el-input :placeholder="search.placeholder"></el-input><span>--</span><el-input :placeholder="search.placeholder"></el-input> -->
                  </div>
                  <!-- 大于，小于，等于，非等 -->
                  <div class="searchModule-content-cont selectInput" v-else-if="search.type==='selectInput'">
                    <el-select  v-model="search.title">
                      <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                    <el-input :placeholder="search.placeholder" v-model="search.suffixInput"></el-input>
                  </div>
                  <!--数值区间-->
                  <div class="searchModule-content-cont selectInput text-center" v-else-if="search.type==='numbers'">
                    <el-input :placeholder="search.placeholder" class="width104" v-model="search.suffixInput1"></el-input>
                    <span>--</span>
                    <el-input :placeholder="search.placeholder" class="width104" v-model="search.suffixInput2"></el-input>
                  </div>
                  <!--日期区间-->
                  <div class="searchModule-content-cont selectInput datarange" v-else-if="search.type==='daterange'">
                    <el-date-picker
								      v-model="search.suffixInput"
								      type="daterange"
								      range-separator="-"
								      start-placeholder="开始日期"
								      end-placeholder="结束日期"
								       value-format="yyyy-MM-dd"
								      :editable="false">
								    </el-date-picker>
                  </div>
                  <!--汇总输入框-->
                  <div class="searchModule-content-cont selectInput" v-else-if="search.type==='suminput'">
                    <span>包含：</span>
                    <el-input :placeholder="search.placeholder" class="width200" v-model="search.suffixInput"></el-input>
                  </div>
                </el-tab-pane>
                <!-- 项目汇总无替换功能 -->
                <el-tab-pane label="批量替换" name="second" v-if="!/projectList/.test(this.$route.path) && !search.noReplace">
                  <div class="searchModule-input-group">
                    <p class="ratio-item">
                      <label class="dd-title">替换为:</label>
                      <!--日期-->
                      <el-date-picker v-if="search.inputType=='date'" v-model="search.radio1" type="date" placeholder="选择日期" value-format="yyyy/MM/dd"
                                      format="yyyy/MM/dd"
                                      :editable="false"
                                      :clearable="false"></el-date-picker>
                      <!--下拉-->
                      <el-select v-model="search.radio1" :placeholder="search.placeholder" v-else-if="search.type==='select'">
                        <el-option v-for="item in search.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <!--单选-->
                      <el-radio-group v-model="search.radio1" v-else-if="search.type==='selectSingle' && search.label == '是否进口' ">
                        <el-radio :label="item" v-for="(item,key) in search.termArr" :key="key">{{item}}</el-radio>
                      </el-radio-group>
                      <!--输入-->
                      <el-input v-else :placeholder="search.placeholder" v-model="search.radio1"></el-input>
                    </p>
                    <el-radio-group v-model="search.radio2" class="full-single-item">
                      <el-radio label="全部数据">全部数据</el-radio>
                      <el-radio label="条件查询数据">条件查询数据</el-radio>
                      <el-radio label="当前勾选数据">当前勾选数据</el-radio>
                    </el-radio-group>
                  </div>
                    <!--<div class="searchModule-input-group">
                        <el-radio-group v-model="search.radio2" class="full-single-item">
                            <el-radio label="全部数据">全部数据</el-radio>
                            <el-radio label="条件查询数据">条件查询数据</el-radio>
                            <el-radio label="当前勾选数据">当前勾选数据</el-radio>
                        </el-radio-group>
                        <p class="ratio-item">
                            <label class="dd-title">替换为:</label>
                            <el-input :placeholder="search.placeholder" v-model="search.radio1"></el-input>
                        </p>
                    </div>-->
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="searchModule-footer">
            <el-button type="primary" size="mini" @click.stop="confirmFun" v-if="activeName!='second'">确认</el-button>
            <el-button type="text" size="mini" @click.stop="doQuery" v-if="activeName=='second'&&search.type==='tab'" class="min-btn">确认</el-button>
            <el-button type="text" size="mini" @click.stop="replace" v-if="activeName=='second'&&search.type!=='tab' " class="min-btn">确认</el-button>
            <el-button size="mini" @click.stop="cancel">取消</el-button>
        </div>
        <!-- <center-dialog ref="centerDialog" dialogTitle="提示" dialogWidth="500px" dialogHeight="540px">
        	<div slot="dialogContent">
        		<p>确认修改{{search.label}}么？</p>

        	</div>
        </center-dialog> -->
    </div>
</template>

<script>
    export default {
        props: ["search","filed"],
        data () {
            return {
                activeName:'first',
                options:['包含','不包含','等于','不等于','大于','大于等于','小于','小于等于','开头是','开头不是','结尾是','结尾不是'],
                regs:{
                    "1":/^[0-9]\d*(\.\d+)?$/, //0到正无穷大
                },
                specialParams:{
                    "国外海运费":"FOREIGN_OCEAN_FREIGHT_RATES",
                    "国外运输保险费":"FOREIGN_INSURANCE_PREMIUM_RATE",
                    "银行财务费":"BANK_FINANCIAL_FEE_RATE",
                    "外贸手续费":"FOREIGN_TRADE_FEE_RATE",
                    "商检费":"COMMODITY_INSPECTION_FEE_RATE",
                    "其他费用":"OTHER_RATES",
                    "其它费(含税)":"OTHER_FEES_INCLUDING_TAX_RATES",
                    "其它费(不含税)":"OTHER_FEES_EXCLUDING_TAX_RATES",
                    "购置税":"VEHICLE_PURCHASE_TAX_RATE"
                }
            };
        },
        created(){
            var _this=this;
        },
        methods:{
            handleClick(){

            },
            /*点击确认 */
            confirmFun(){
                var _this=this,param={};
                this.search.isShow=!this.search.isShow;

                switch (this.search.type) {
                    case "input":
                        break;
                    case "select":
                        break;
                    case "checkbox":

                        break;
                    case "range":
                         param = {
                            filed:this.filed,
                            title1:this.search.title1,
                            title2:this.search.title2,
                            value1:this.search.suffixInput1||'',
                            value2:this.search.suffixInput2||'',
                            type:this.search.type,
                            label:this.search.label

                        };
                        break;
                    case "selectInput":
                        param = {
                            filed:this.filed,
                            title:this.search.title,
                            value:this.search.suffixInput,
                            label:this.search.label,//表头的名称
                            type:this.search.type
                        };
                        break;
                    case "tab":
                        //第一个tab页
                        if(this.activeName=="first"&&this.search.label!="作价规则"){
                            param = {
                                filed:this.filed,
                                title1:this.search.title1,
                                title2:this.search.title2,
                                value1:this.search.suffixInput1||'',
                                value2:this.search.suffixInput2||'',
                                type:this.search.type,
                                label:this.search.label,
                                activeTab:"first"
                            }
                        };
                        if(this.activeName=="first"&&this.search.label=="作价规则"){
                            param = {
                                    filed:this.filed,
                                    label:this.search.label,
                                    type:this.search.type,
                                    ruleArr:this.search.check,
                                    activeTab:"first"
                            }

                        }
                        break;
                    case "selectSingle":

                        param = {
                            filed:this.filed,
                            value:this.search.radio||'',
                            type:this.search.type,
                            label:this.search.label
                        }
                        break
                    case "numbers":
                         param = {
                            filed:this.filed,
                            value1:this.search.suffixInput1||'',
                            value2:this.search.suffixInput2||'',
                            type:this.search.type,
                            label:this.search.label
                        };
                        break;
                    case "daterange":
                         param = {
                            filed:this.filed,
                            value:this.search.suffixInput||'',
                            type:this.search.type,
                            label:this.search.label
                        };
                        break;
	                  case "suminput":
	                       param = {
	                          filed:this.filed,
	                          value:this.search.suffixInput||'',
	                          type:this.search.type,
	                          label:this.search.label
	                      };
	                      break;
                }
                this.$emit("searchCallback",param);
                //重置输入框的状态
                this.search.title = this.options[0];
                this.search.title1 = this.options[0];
                this.search.title2 = this.options[0];
                this.search.suffixInput = '';
                this.search.suffixInput1 = '';
                this.search.suffixInput2 = '';
                this.activeName = "first";
                //this.$store.state.clickCconfirmBtn = !this.$store.state.clickCconfirmBtn;

            },
            /*点击取消 */
            cancel(){
                this.activeName = "first";
                this.$emit("hideTooltip");
            },
            /** tab2弹框确认*/
            doQuery(){
                var _this  = this;
                if(this.search.defaultVal){
                    this.search.radio1 = this.search.defaultVal;
                }
                 var  param ={
                    filed:this.filed,//列名
                    keyWorld:this.search.radio1||'',//传入的系数
                    range:this.search.radio2||'',//范围
                    activeTab:"second",
                    label:this.search.label,
                    type:this.search.type,
                    ratioPrice:this.search.ratioPrice||'' //账面值系数
                };
                this.$parent.getChecked();
                //输入框为空
                // if(!this.search.radio1&&this.search.label!='作价规则'){
                //     this.$messageError('请输入'+this.search.label);
                //     return;
                // }
                if(this.search.radio1==2&&this.search.label=='作价规则'&&!this.search.ratioPrice){
                     this.$messageError('请输入账面值系数');
                    return;
                }
                if(!this.search.radio1&&this.search.label=='作价规则'){
                    this.$messageError('请选择'+this.search.label);
                    return;
                }

                    //如果没有选择范围的话需要给与提示
                if(!this.search.radio2){
                    this.$messageError('请选择修改'+this.search.label+'的范围');
                    return;
                };
                //没有按条件查询的数据
                if(this.search.radio2=="条件查询数据"&&this.$parent.sheetSearchTerm.conditions==''){
                    this.$messageError('您当前还没有按条件查询数据哦！');
                    return;
                }

                //如果没有当前勾选的值
                if(this.search.radio2=="当前勾选数据"&&this.$parent.checkedArr.length<=0){
                    this.$messageError('您当前没有勾选数据哦!');
                    return;
                }

                //需要判断页面是不是有数据
                if(this.search.radio2=='全部数据'){
                   var isHasData = false;
                   if(this.$parent.tableRows.length<=0){
                        this.$messageError('当前科目还没有数据哦！');
                       return;
                   }
                   for(var i =0;i<this.$parent.tableRows.length;i++){
                       if(this.$parent.tableRows[i].id){
                            isHasData = true;
                       }
                   }
                   if(!isHasData){
                       this.$messageError('当前科目还没有数据哦！');
                       return;
                   }
                }
                 //需要判断输入的值为0到无穷大的数
               if(this.search.regType&&!(this.regs[this.search.regType]).test(this.search.radio1)){
                    this.$messageError('请输入大于或为0的数值');
                    return;
               }
               if(this.specialParams[this.search.label]){
                   param.specialInitData = this.specialParams[this.search.label];
               }
                this.$confirm('确认修改'+this.search.label+'么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'search-confire-box',
                    type: 'warning',
                    callback:action=>{
                           //confirm(确定)cancel（确定）
                            if(action=="confirm"  ){
                                //需要做判断
                               this.$parent.searchCallback(param)
                            }
                        }
                })
                //this.$store.state.clickCconfirmBtn = !this.$store.state.clickCconfirmBtn;
            },

            // 非tab类型的tab2 弹框确认
            replace(){
                let param ={
                    filed:this.filed,//列名
                    keyWorld:this.search.radio1||'',//传入的系数
                    range:this.search.radio2||'',//范围
                    activeTab:"second",
                    label:this.search.label,
                    type:this.search.type,
                };
                this.$parent.getChecked();
                if (!this.search.radio1) {
                    this.$messageError('请输入替换值');
                    return;
                }
                //如果没有按条件查询的数据
                if(!this.search.radio2){
                    this.$messageError('请选择修改'+this.search.label+'的范围');
                    return;
                }else if(this.search.radio2=="条件查询数据"&&this.$parent.sheetSearchTerm.conditions==''){
                    this.$messageError('您当前还没有按条件查询数据哦！');
                    return;
                //如果没有当前勾选的值
                }else if(this.search.radio2=="当前勾选数据"&&this.$parent.checkedArr.length<=0){
                    this.$messageError('您当前没有勾选数据哦!');
                    return;
                //需要判断页面是不是有数据
                }else if(this.search.radio2=='全部数据'){
                    let isHasData = false;
                    if (this.$parent.tableRows.length<=0) {
                        this.$messageError('当前科目还没有数据哦！');
                        return;
                    }
                    for(var i =0;i<this.$parent.tableRows.length;i++){
                        if(this.$parent.tableRows[i].id){
                          isHasData = true;
                        }
                    }
                    if(!isHasData){
                        this.$messageError('当前科目还没有数据哦！');
                        return;
                    }
                }
                /*//需要判断输入的值为0到无穷大的数
                if(this.search.regType&&!(this.regs[this.search.regType]).test(this.search.radio1)){
                    this.$messageError('请输入大于或为0的数值');
                    return;
                }*/
                if(this.specialParams[this.search.label]){
                    param.specialInitData = this.specialParams[this.search.label];
                }
                this.$confirm('确认将 '+ this.search.label + ' 的 ' + this.search.radio2 + ' 替换为 '+ this.search.radio1 + ' 么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'search-confire-box',
                    type: 'warning',
                    callback:action=>{
                        //confirm(确定)
                        if(action=="confirm"  ){
                          if(this.search.label=== '是否进口'){
                            param.keyWorld = (this.search.radio1 == '是') ? '是' : '否'
                          }
                          this.$parent.searchCallback(param)
                        }
                    }
                })
            }
        },

        watch:{


        }
    }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.searchModule{
    padding: 0px 3px;
    box-sizing: border-box;
    .searchModule-content{
         .searchModule-title{border-bottom:1px solid #e4e7ed;font-size: 13px;font-size: 13px;margin-bottom: 14px;
            span{width: 53px;display: inline-block;height: 13px;padding-bottom: 6px;color:#3a80ec;position: relative;cursor: pointer;}
            span:after{
              content: "";
              left: 0;
              position: absolute;
              bottom: -1px;
              width: 100%;
              height: 2px;
              background: #3a80ec;}
         }
        .searchModule-content-tit{
            color:#686868;
            font-size: 13px;
            margin-top: 5px;
        }
        .searchModule-content-cont{
            margin-top: 7px;

        }
        .rangeInput{
            .el-input{
                width: 110px;
                display: inline-block;
            }
            span{
                padding: 0 10px;
            }
        }
        .selectInput{
            .el-select{
                width: 100px;
                display: inline-block;
                margin-right:10px;
            }
            .el-input{
                width: 139px;
                display: inline-block;
            }
        }
        .datarange{
        	 /deep/ .el-input__inner{width: 250px!important;}
        }
        /deep/ .el-tabs__item{height: 19px;line-height: unset;}
        /deep/ .el-tabs__content{position: relative;top:0;}
        /deep/ .el-tabs__content{padding: 10px 0px 0 0px;}
        /deep/ .el-checkbox{width: 120px;margin-bottom: 5px;}
        /deep/ .el-checkbox+.el-checkbox{width: 120px;margin-left: 0}
        /deep/ .price-rule{margin-bottom: 6px}
        /deep/ .price-rule .el-radio-button__inner{font-size: 12px;padding: 6px 2px;}
        /deep/ .el-tabs__nav{margin: 0;width: auto;float: left;}
        /deep/ .el-icon-date{color: #C0C0C0;}
        .searchModule-input-group,.searchModule-radio-group{
            .ratio-item{margin-bottom: 10px;
                /deep/ .el-radio-group{margin-left: -2px}
            }
            .dd-title{margin-right:10px;font-size:12px;width: 64px;display: inline-block;}
            /deep/ .el-input{width:60%;font-size:12px;}
            /deep/ .el-radio-button__inner{padding: 4px 12px;font-size:12px;}
        }
        .full-single-item{
            /deep/ .el-radio__label{padding-left: 4px;}
            /deep/ .el-radio+.el-radio{margin-left: 4px;}
        }
        // .searchModule-radio-group{text-align: center;}
    }
    .searchModule-radio-group{
        .dd-title{width: 81px !important;}
        .ratio-item /deep/ .el-input{width:158px;}
    }
    .searchModule-footer{
        margin-top: 19px;
        text-align: right;
        /deep/ .el-button--text{background: #3A80EC;color: #fff;padding: 7px 15px;}
    }
    .selectSingle /deep/ .el-radio{width: 120px;margin-bottom:5px}
    .selectSingle /deep/ .el-radio__label{margin-left: 4px;}
    .selectSingle /deep/ .el-radio+.el-radio{margin-left: 0;}
    .rule-type-cont{
        /deep/ .el-radio-button, /deep/ .el-radio-button__inner{margin-right: 5px;margin-bottom: 4px;width: 100px;}
        /deep/ .el-radio-button__inner{-webkit-transition:none;transition:none;}
        /deep/ .el-radio-button:first-child .el-radio-button__inner,
        /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{box-shadow: 1px 0 0 0 #409EFF;-webkit-box-shadow:1px 0 0 0 #409EFF;}
        /deep/ .el-radio-button:first-child .el-radio-button__inner,/deep/ .el-radio-button:last-child .el-radio-button__inner{border-radius:0}
        /deep/ .el-radio-button__inner{border-left:1px solid #dcdfe6;}

    }
    /deep/  .el-button--text:hover{opacity: .7;}
}
.el-scrollbar__view ,.el-select-dropdown__list{
    .el-select-dropdown__item{
        font-size:12px;
    }
    .selected{
        color:#145FD2;
    }
}
 /deep/ .el-button{
    padding: 0;
    height:25px ;
    width:70px ;
    border-radius:2px;
    line-height: 9px;
    &.el-button--default {border: 1px solid #3a80ec;color: #409EFF !important;
            &:hover{background-color: #E0ECFF;opacity: .7;}
            &.el-button--small{border: 1px solid #3a80ec !important;color: #409EFF !important;}
  }
}

</style>
<style lang='scss'>
.search-confire-box{
   .el-button--default {border: 1px solid #3a80ec;
        &:hover{background-color: #E0ECFF;opacity: .7;}
        &.el-button--small{border: 1px solid #3a80ec !important;color: #409EFF}
        &.el-button--primary{color: #fff}
  }
  .el-icon-close{color:#0883E4 !important;
    &:hover{color:#F09237!important;}
  }
}

</style>

