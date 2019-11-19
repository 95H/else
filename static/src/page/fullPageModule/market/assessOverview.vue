<template>
  <div class="contenner">
    <div class="assessmentResults">
      <div class="title1">
        <div class="point"></div>
        <h4 class="resultTitle">评估结果</h4>
      </div>
      <div class="radioP">
        <el-radio-group v-model="radio1" class="radioButton" size="mini" @change="changeRadio1">
          <el-radio-button label="PE"></el-radio-button>
          <el-radio-button label="PB"></el-radio-button>
          <el-radio-button label="PS"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 评估结果 -->
    <table>
      <tr class="t t1">
        <td :colspan="this.$route.query.way == 'trade'?5:6">
          <span class="tableTitle1">评估值（万元）</span>
          <span class="tableValue1">{{evalOverviewList.assessedValue | filterNumber}}</span>
        </td>
      </tr>
      <tr class="t t2">
        <td width="200" class="assessedTop">
          <div class="tableTitle">{{radio1=="PE"?"预测年度利润":(radio1=="PB"?"净资产":"营业收入")}}（万元）</div>
           <div class="tableValue">{{evalOverviewList.foreAnnProfit | filterNumber}}</div>
        </td>
         <td width="100">
          <div class="tableTitle">{{'调整后' + radio1}}</div>
         <div class="tableValue">{{evalOverviewList.PEBS | filterNumber}}</div>
        </td>
        <td width="200" v-if="this.$route.query.way == 'trade'? false : true">
          <div class="tableTitle">流动折扣率</div>
          <div class="tableValue">{{evalOverviewList.liquidityDiscountRate | filterNumber}}</div>
        </td>
        <td width="200">
          <div class="tableTitle">经营性资产（万元）</div>
          <div class="tableValue">{{evalOverviewList.operatAssets | filterNumber}}</div>
        </td>
        <td width="200">
          <div class="tableTitle">溢余调整（万元）</div>
          <div class="tableValue">{{evalOverviewList.overAdjust | filterNumber}}</div>
        </td>
        <td width="200">
          <div class="tableTitle">长期股权投资（万元）</div>
          <div class="tableValue">{{evalOverviewList.longTermInvestment | filterNumber}}</div>
        </td>
      </tr>
    </table>
    <!-- 价值比率 -->
    <div class="valueRatioShow">
      <div class="assessmentResults">
        <div class="title1">
          <div class="point"></div>
          <h4 class="resultTitle">价值比率</h4>
        </div>
        <!-- <span @click="settingBox()">设置</span> -->
        <div class="radioP" v-if="this.$route.query.way=='trade'">
          <el-radio-group v-model="radio2" class="radioButton" size="mini" @change="changeRadio2">
            <el-radio-button label="1">沪指</el-radio-button>
            <el-radio-button label="2">深指</el-radio-button>
            <el-radio-button label="3">沪深300</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <template>
        <table-group v-on:remarksItem = 'remarksBox' ref="valueRatioList" idName="valueRatioList" :data="valueRatioList">
        </table-group>
        <!-- 备注说明弹框 -->
        <!-- <div class="remarksDialog">
          备注说明
        </div> -->
      </template>
    </div>
    <!-- 财务指标 -->
    <div class="valueRatioShow">
      <div class="assessmentResults">
        <div class="title1">
          <div class="point"></div>
          <h4 class="resultTitle">财务指标</h4>
        </div>
      </div>
       <template>
        <table-group ref="finncIndicList" idName="finncIndicList" :data="finncIndicList"></table-group>
      </template>
    </div>
    <!-- 财务指标评分 -->
    <div class="valueRatioShow">
      <div class="assessmentResults">
        <div class="title1">
          <div class="point"></div>
          <h4 class="resultTitle">财务指标评分</h4>
        </div>
        <div class="radioP">
          <router-link class="viewDetails" :to="'standard/finance?way='+this.$route.query.way">查看标准值</router-link>
        </div>
      </div>
      <template>
         <table-group ref="finncIndicScoreList" idName="finncIndicScoreList" :data="finncIndicScoreList"></table-group>
      </template>
    </div>
    <!-- 业务指标 -->
    <div class="valueRatioShow">
      <div class="assessmentResults">
        <div class="title1">
          <div class="point"></div>
          <h4 class="resultTitle">业务指标</h4>
        </div>
      </div>
      <template>
          <table-group ref="business" idName="business" :data="business"></table-group>
      </template>
    </div>
    <!-- 业务指标评分 -->
    <div class="valueRatioShow">
      <div class="assessmentResults">
        <div class="title1">
          <div class="point"></div>
          <h4 class="resultTitle">业务指标评分</h4>
        </div>
        <div class="radioP">
          <router-link class="viewDetails" :to="'standard/business?way='+this.$route.query.way">查看标准值</router-link>
        </div>
      </div>
      <template>
          <table-group  ref="businessIndic" idName="businessIndic" :data="businessIndic"></table-group>
      </template>
    </div>
    <!-- 流动性折扣系数 -->
    <div class="valueRatioShow dicountCode" v-if="this.$route.query.way != 'trade'">
      <div class="assessmentResults">
        <div class="title1">
          <div class="point"></div>
          <h4 class="resultTitle">流动性折扣率</h4>
        </div>
      </div>
      <template>
        <table-group v-on:dataListItem = 'openSaveVal' ref="discountList" idName="discountList" :data="discountList" ></table-group>
      </template>

      <!-- 权重弹窗 begin -->
      <center-dialog ref="weightDialog" dialogTitle="调整流动性折扣权重" dialogWidth="375px">
        <div slot="dialogContent">
          <div class="weightDialog-box">
            <vue-scroll>
              <div class="weightDialog" v-for="(item,index) in dataList" v-if='item.company_name.value !== "计算"'>
                <label :class="index == checkIndex?'active':''">{{ item.company_name.value }}</label>
                <input maxlength="3" @focus="checkIndex=index" @blur="checkIndex=-1" :id="item.id" v-model="inputVal[index]">
                <p>%</p>
              </div>
            </vue-scroll>
          </div>
          <div class="btn">
            <button class="search-btn" @click="saveWeightVal()">保存</button>
            <button class="reset-btn" @click="handleCancel()">取消</button>
          </div>
        </div>
      </center-dialog>
      <!-- 权重弹窗 end -->
    </div>

  </div>
</template>
<script>
import tableGroup from '@/page/fullPageModule/market/table-group';
import centerDialog from '@/components/centerDialog.vue';
export default {
  data(){
    return {
      checkIndex:-1,
      evalOverviewList:{},
      dataList: [],
      createData: [],
      inputVal : [],
      //评价总览 表格数据
      radio1: '',
      radio2: '',
      finncIndicList:{},//财务指标 表格数据
      finncIndicListWidth:{
        companyName:"200px",
        // returnNetAssets:"100px",
        // returnTotalAssets:"100px",
        // totalAssetTurnover:"100px",
        // currentAssetsTuenover:"110px",
        // assetLiabilityRatio:"80px",
        // interestCoverage:"100px",
        // increaseRateBusinessIncome:"120px",
        // increaseRateOperatProfit:"120px"
      },
      finncIndicScoreList:{},//财务指标评分 表格数据
      finncIndicScoreListWidth:{
        companyName:"200px",
        // roe_rate:"110px",
        // roa_rate:"110px",
        // total_asset_rate:"100px",
        // current_asset_rate:"100px",
        // assets__liabi_rate:"100px",
        // interest_multiplier:"100px",
        // incom_growth_rate:"110px",
        // profit_growth_rate:"110px",
        // profitability:"90px",
        // operat_capacity:"90px",
        // solvency:"90px",
        // growth_ability:"90px",
        // total:"90px",
      },
      valueRatioList:{},//价值比率 表格数据
      valueRatioListWidth:{
        companyName:"200px",
        // fin_indic_score:"90px",
        // fin_indic_factor:"130px",
        // bus_indic_score: '90px',
        // bus_indic_factor:"140px",
        // ave_corr_factor:"100px",
        // sh_average_price:"100px",
        // sz_average_pric:"80px",
        // time_adjust_factor:"80px",
        // liq_dis_factor:"90px",
        // pe_val:"80px",
        // dynamic_pe_val:"80px",
        // pb_val: '80px',
      },
      //业务指标 表格数据
      business:{},
      // 业务指标 单元格宽度
      businessWidth : {
        a:"200px",
        // supplierStability:"120px",
        // supplierIndustryVisibility:"140px",
        // endUserIndustryVisibility:"150px",
        // terminalMarketGrowthRate:"130px",
        // terminalMarketGrowthRates:"160px",
        // quantityProportion:"130px",
        // numberOfPersonnel:"120px",
        // strengthOfTechnicians:"140px"
      },
      //业务指标评分 表格数据
      businessIndic:{},
      businessIndicWidth : {
        companyName:"200px",
        // supplier_stability:"120px",
        // vendor_industry_visibility:"150px",
        // user_industry_visibility:"160px",
        // market_growth_rate:"140px",
        // intellectual_property_right:"160px",
        // patent_ratio:"150px",
        // numberOfresearchers:"120px",
        // personnel_research_strength:"140px",
        // total : "120px"
      },
      //流动性折扣系数
      discountList:{
      },
      discountListWidth:{
        company_name:"200px",
        // dateOfListing:"120px",
        // initialPrice:"120px",
        // thirtyDayClosingAverage:"120px",
        // sixtyDayClosingAverage:"120px",
        // ninetyDayClosingAverage:"120px",
        // twentyDayClosingAverage:"120px",
        // weights:"100px",
        // flowdiscount:"120px"
      },
      companyType:'',//是否为上市公司 trade 为非上市公司 listed 为上市公司
    }
  },
  filters: {
    filterNumber: function (val) {
      if(val == ''){
        return '--';
      }else if(val && !isNaN(val.replace(/,/g,''))){
        return String(val).replace(/(?:\.0*|(\.\d+?)0+)$/,'$1');
      }else{
        return val;
      }
    }
  },
  components : { tableGroup,centerDialog },
  created(){
    this.$store.state.fileFlag = this.$route.query.way=="trade" ? "2" : "1";
    this.getData();
  },
  mounted(){
    this.$store.state.getbusslist = ()=>{
      this.getData();
    }
  },
  methods:{
    // 获取当前所有表格数据
    getData(){
      let _this = this;
      this.$http.post('/api/marketTransit/getbusslist',{
        projectId : this.$store.state.projectId,
        investorId : this.$store.state.investorId,
        caseType : this.$route.query.way=="trade" ? "2" : "1",
        type : this.radio1,
        priceType : this.radio2
      }).then(res => {
        _this.evalOverviewList = res.data.evalOverviewList;//评估结果
        _this.valueRatioList = res.data.valueRatioList;//价值比率 
        if(_this.$refs.valueRatioList) _this.$refs.valueRatioList.delZero(res.data.valueRatioList);
        // if(_this.$refs.valueRatioList) _this.$refs.valueRatioList.setTdWidth(res.data.valueRatioList.tableHead,_this.valueRatioListWidth);
        _this.finncIndicList = res.data.finncIndicList;//财务指标
        if(_this.$refs.finncIndicList) _this.$refs.finncIndicList.delZero(res.data.finncIndicList);
        // if(_this.$refs.finncIndicList) _this.$refs.finncIndicList.setTdWidth(res.data.finncIndicList.tableHead,_this.finncIndicListWidth);
        _this.finncIndicScoreList = res.data.finncIndicScoreList;//财务指标评分
        if(_this.$refs.finncIndicScoreList) _this.$refs.finncIndicScoreList.delZero(res.data.finncIndicScoreList);
        // if(_this.$refs.finncIndicScoreList) _this.$refs.finncIndicScoreList.setTdWidth(res.data.finncIndicScoreList.tableHead,_this.finncIndicScoreListWidth);
        _this.business = res.data.business;//业务指标
        if(_this.$refs.business) _this.$refs.business.delZero(res.data.business);
        // if(_this.$refs.business) _this.$refs.business.setTdWidth(res.data.business.tableHead,_this.businessWidth);
        _this.businessIndic = res.data.businessIndic;//业务指标评分
        if(_this.$refs.businessIndic) _this.$refs.businessIndic.delZero(res.data.businessIndic);
        // if(_this.$refs.businessIndic) _this.$refs.businessIndic.setTdWidth(res.data.businessIndic.tableHead,_this.businessIndicWidth);
        if(_this.$route.query.way != 'trade'){
          _this.discountList = res.data.discountList;//流动折扣率列表
          if(_this.$refs.discountList) _this.$refs.discountList.delZero(res.data.discountList);
          // if(_this.$refs.discountList) _this.$refs.discountList.setTdWidth(res.data.discountList.tableHead,_this.discountListWidth);
          _this.dataList = _this.discountList.tableData;
        }
        //从后台获取PE,PB,PS,判断有用，不要删！！！
        if(this.radio1 == ''){
          this.radio1 = res.data.type;
        }
        //从后台获取沪指,深指,沪深300,判断有用，不要删！！！
        if(this.radio2 == ''){
          this.radio2 = res.data.priceType;
        }
        localStorage.setItem('radioData',this.radio1);
        localStorage.setItem('radio2Data',this.radio2);

      }).catch(err => {
        let radioPeCode = localStorage.getItem('radioData');
        this.radio1 = radioPeCode;

        let radio2PeCode = localStorage.getItem('radio2Data');
        this.radio2 = radio2PeCode;
        _this.$messageError(err);
      })
    },
    //radio1值发生变化时触发的函数
    changeRadio1(radio1){
      this.getData();
    },
    //radio2值发生变化时触发的函数
    changeRadio2(radio2){
      this.getData();
    },
    //修改权重系数
    saveWeightVal(){
      this.createData = [];
      let numData = 0;

      // this.dataList.forEach(item => {
      //   if(item.company_name.value !== '计算'){
      //     this.createData.push({
      //       companyId: item.companyId,
      //       projectId: item.projectId,
      //       investorId: item.investorId,
      //       updateValue: item.weights.value
      //     })

      //     if(!/^\d+$/.test(item.weights.value)){
      //       this.$messageError("内容不能为空或数字不合法");
      //       return
      //     }
      //     numData += item.weights.value*1;
      //   }
      // });
      for(let i in this.dataList){
        if(this.dataList[i].company_name.value !== '计算'){
          this.createData.push({
            companyId: this.dataList[i].companyId,
            projectId: this.dataList[i].projectId,
            investorId: this.dataList[i].investorId,
            updateValue: this.inputVal[i]
          })
          numData += this.inputVal[i]*1;
          if(!/^\d+$/.test(this.inputVal[i]*1)){
            this.$messageError("内容不能为空或数字不合法");
            return
          }
        }
      }

      if(numData !== 100){
        this.$messageError("请保证百分数和为100");
        return
      } else{
        this.$http.post('/api/marketTransit/updateWeight',{
          jsonArrayValues: JSON.stringify(this.createData)
        }).then(res=>{
          this.$messageSuccess("保存成功！");
          this.$refs.weightDialog.closeDialog();
          this.getData();
        }).catch(err => {
          this.$messageError(err);
        })
      }
    },
    //判断input框数字格式
    // saveVal(event,value) {
    //   if(isNaN(value) || value == '' || !/^\d+$/.test(value)){
    //     event.target.style.border="1px solid #f00";
    //     this.$messageError("内容不能为空或数字不合法");
    //     return
    //   }else{
    //     event.target.style.border="none";
    //   }
    // },
    
    //打开权重弹框
    openSaveVal (data) {
      // 防止数据同步
      this.dataList.forEach(item=>{
        this.inputVal.push(item.weights.value);
      })
      this.$refs.weightDialog.showDialog();
    },
    //权重弹窗取消
    handleCancel(){
      this.$refs.weightDialog.closeDialog();
    },
    //打开设置页面
    settingBox() {
      this.$store.commit("changeShowCommon");
      this.$store.state.commonTitle = "新增报告号";
      this.$store.state.commonBtn = "";
      this.$store.state.componentsType = "fullPageDetail";
    },
    //备注说明
    remarksBox () {
      console.log(9999);
    }
  },
  watch: {
    '$route.query.way'(){
      this.getData();
    },
    "$store.state.investorId" () {
      this.radio1 = '';
      this.radio2 = '';
      this.getData();
    },
  }
}
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
  .contenner{
    width: 100%;
    overflow:hidden;
    .radioP>span{
      cursor: pointer;
    }
    .assessmentResults{
      width: 100%;
      height: 18px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      margin-top: 10px;
      span{
        font-size:13px;
        cursor:pointer;
      }
      .title1{
        .point{
          height: 6px;
          width: 6px;
          background:rgba(240,146,55,1);
          float: left;
          border-radius: 50%;
          margin: 6px 10px 0 0;
        }
        .resultTitle{
          float: left;
          width:100px;
          height:18px;
          font-size:13px;
          font-family:PingFangSC-Medium;
          font-weight:700;
          color:rgba(38,38,40,1);
          line-height:18px;
        }
      }
      .viewDetails{
        font-size: 13px;
        font-weight: 500;
        &:hover{
          color: #0099FF;
        }
      }
      .radioButton{
        /deep/ .el-radio-button__inner{
          font-size: 12px;
          padding: 1px 10px;
          color: #262628;
          border-color:#D1D1D1 
        }
        /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
          color: #FFFFFF
        }
      }
    }
    table{
      width: 100%;
      margin-top:5px;
      margin-bottom: 16px;
      td{ min-width:100px;}
      .t.t1{
        border:1px solid rgba(229,229,229,1);
        td{
          padding: 9px 0;
          border: none;
          .tableTitle1{
            font-size:18px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(152,199,101,1);
            line-height:25px;
            margin-top:6px;
          }
          .tableValue1{
            height:37px;
            font-size:26px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(240,146,55,1);
            line-height:37px;
          }
        }
      }
      .t.t2{
        .assessedTop{
          text-align:center;
        }
        td{
          padding: 12px 0;
          box-sizing: border-box;
        }
      }
      .t{
        width: 100%;
        td{
          text-align: center;
          background:rgba(255,255,255,1);
          border:1px solid rgba(229,229,229,1);
          .tableTitle{
            font-size:12px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(152,199,101,1);
            line-height:22px;
          }
          .tableValue{
            font-size:18px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(240,146,55,1);
            line-height:28px;
          }
        }
      }
    }
    .valueRatioShow .radioButton{
      /deep/ .el-radio-button__inner{
        font-size: 12px;
        padding: 2px 5px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(38,38,40,1);
      }
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        color: #FFFFFF
      }
    }
    .empty{
      width: 100%;
      height:31px;
    } 
  }
  /deep/ .empty   .el-table   .el-table__header-wrapper   .el-table__header  .has-gutter   .is-leaf   .cell{
    color:#3a80ec;
    font-weight:600
  }
  /deep/ .cell{
    text-align: center;
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#262628;
    position: relative;
    .input{
      height: 80px;
      width: 100%;
      position: absolute;
      left: -1px;
      top: -10px;
      // border:1px solid #333;
      display: none;
      z-index: 999999;
    }
  }
  /deep/ .el-table__row:last-child td .cell{
    color: #3a80ec;
    font-weight:600;
  }
  /deep/ .el-table .success-row {
    background-color:rgba(246,250,255,1);
    .cell{
      color:rgba(58,128,236,1);
      font-weight:600
    }
  }
  /deep/ .el-table__row:last-child{
    background-color:rgba(246,250,255,1);
    .cell{
      .textOverflow1{
        color:rgba(58,128,236,1);
        font-weight:600;
      }
    }
  }
  /deep/ .emptyText{
    text-align: center;
    margin-bottom: 14px;
    font-size:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(144,144,144,1);
    line-height:18px;
  }
  /deep/ .el-table__empty-text{
    width: 100%
  }
  /deep/ .el-radio-button:first-child .el-radio-button__inner{ border-radius:2px 0 0 2px;}
  /deep/ .el-radio-button:last-child .el-radio-button__inner{ border-radius:0 2px 2px 0;}

/deep/ .weightDialog-box{ 
  height:169px;
  border-top:1px solid #E5E5E5;
  //border-bottom:1px solid #E5E5E5;
  .weightDialog{
    border:1px solid #E5E5E5;
    position: relative;
    display: flex;
    height:34px;
    margin-top:-1px;
    p{
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: 13px;
    }
    label{
      flex: 2;
      font-size:12px;
      color:rgba(106,106,106,1);
      line-height:35px;
      border-right:1px solid #E5E5E5;
      text-align:center;
    }
    .active{
      background:#FFF5EB;
    }
    input{
      line-height:32px;
      box-sizing:border-box; 
      border: 1px solid #fff; 
      text-align:center; 
      font-size:12px;
      background-color:transparent; 
      color:inherit; 
      font-weight:inherit;
      height: 34px;
      width: 100px;
      &:focus{
        border:.5px solid #88C6FF;
      }
    }
  }
}
/deep/ .btn{
  margin-top:20px;
  display: flex;
  justify-content: center;
  .search-btn{
    margin-right:14px;
  }
}

/deep/ .center-body{
  max-height: 350px;
  //overflow: auto;
  position: static !important;
}

/deep/ .remarksDialog{
  background: #fff;
  padding: 10px 20px;
  border: solid 1px #00f;
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 0;
}
</style>