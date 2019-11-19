<template>
  <div class="incomeHome">
    <p class="b-title">
      收益法作价模板自动生成
      <i class="iconfont icon-xiangmuxinxi fl"></i>
      <el-button type="primary" v-if="renounce" size="mini" class="waiver" @click="amendment">放弃修改</el-button>
    </p>
    <div class="income-wrap">
      <div class="income-info">
        <p class="b-title">
          重要提示
          <i class="iconfont icon-zhongyaotishi fl"></i>
        </p>
        <div
          class="income-box article"
        >请评估作业人员根据项目实际情况和要求谨慎选择和填写以下内容，系统会根据您的选择自动生成本次评估作业模板，您可在生成的模板上进行收益法作业。如遇到特殊情况需要对模板进行调整，请您在操作界面点击“模板调整”按钮进行模板修改操作（重新生成的模板会保留当前已录入的信息数据）。</div>
      </div>
      <div class="income-info">
        <p class="b-title">
          确认事项
          <i class="iconfont icon-querenshixiang fl"></i>
        </p>
        <div class="income-box">
          <el-form
            :model="incomeForm"
            :rules="rules"
            label-position="left"
            ref="incomeForm"
            label-width="180px"
            class="demo-incomeForm"
          >
            <!-- <el-form-item v-for="(item,index) in data" :key="index" :label="item.lab" prop="manner">
              <el-radio-group  v-model="incomeForm">
                <el-radio v-for="(itemD,ind) in item.list" :key="ind" :label="itemD"></el-radio>
              </el-radio-group>
            </el-form-item>-->
            <el-form-item label="1、本项目报表口径：" prop="statementAperture">
              <el-radio-group v-model="incomeForm.statementAperture">
                <el-radio label="0">单体报表</el-radio>
                <el-radio label="1">合并报表</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2、本项目基准日类型：" prop="baseDateType">
              <el-radio-group v-model="incomeForm.baseDateType">
                <el-radio label="0">年底</el-radio>
                <el-radio label="1">期中</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3、本项目模型选择：" prop="modelChoice">
              <el-radio-group v-model="incomeForm.modelChoice">
                <el-radio label="0">企业自由现金流</el-radio>
                <el-radio label="1" disabled>股权自由现金流</el-radio>
                <el-radio label="2" disabled>DDM</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4、本项目收益期限：" prop="isSustainable">
              <el-radio-group v-model="incomeForm.isSustainable">
                <el-radio label="1">永续期</el-radio>
                <!-- <el-input class="inp" v-model="incomeForm.input" placeholder="请输入稳定年增长率"></el-input> -->
                <el-radio label="0">有限期</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5、本项目折现方式为：" prop="discountManner">
              <el-radio-group v-model="incomeForm.discountManner">
                <el-radio label="0">年中折现</el-radio>
                <el-radio label="1">年底折现</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="6、历史期类型：" prop="historicalYear">
              <el-radio-group v-model="incomeForm.historicalYear">
                <el-radio label="3">3年</el-radio>
                <el-radio label="4">4年</el-radio>
                <el-radio label="5">5年</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="7、未来期年限：" prop="futureYear">
              <el-select v-model="incomeForm.futureYear" filterable placeholder="请选择">
                <el-option
                  v-for="(item,index) in futureYearNum"
                  :key="index"
                  :label="item+'年'"
                  :value="item"
                  v-if="item>=5">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <p class="income-fd">
        <el-button type="primary" :disabled="!$store.state.readonly" @click="submitForm('incomeForm')">开始收益法作价</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["renounce"],
  data() {
    return {
      // data: [
      //   { lab: "1、本项目报表口径：", list: ["单体报表", "合体报表"] },
      //   {
      //     lab: "2、本项目基准日类型：",
      //     list: ["期末", "期中"]
      //   },
      //   {
      //     lab: "3、本项目模型选择：",
      //     list: ["企业自由现金流", "股权自由现金流", "DDM"]
      //   },
      //   { lab: "4、本项目收益期限：", list: ["永续期", "有限期"] },
      //   { lab: "5、本项目折现方式为：", list: ["年中折现", "年底折现"] }
      // ],
      futureYearNum:70,  //未来年限
      incomeForm: {
        statementAperture: "0",
        modelChoice: "0",
        discountManner: "1",
        baseDateType: "1",
        isSustainable: "1",
        historicalYear: "4",
        futureYear:5,
        input: ""
      },
      rules: {
        statementAperture: [{ required: true, trigger: "change" }],
        modelChoice: [{ required: true, trigger: "change" }],
        discountManner: [{ required: true, trigger: "change" }],
        baseDateType: [{ required: true, trigger: "change" }],
        isSustainable: [{ required: true, trigger: "change" }],
        historicalYear: [{ required: true, trigger: "change" }],
        futureYear: [{ required: true, trigger: "change" }],
        input: [{ type: "number", min: 1, max: 3, trigger: "blur" }]
      },
      futureYearArr:[],
    };
  },
  methods: {
    submitForm(formName) {
      // console.log(this)
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/incomeExcel/checkTemplate", {
              statementAperture: this.incomeForm.statementAperture,
              modelChoice: this.incomeForm.modelChoice,
              discountManner: this.incomeForm.discountManner,
              baseDateType: this.incomeForm.baseDateType,
              isSustainable: this.incomeForm.isSustainable,
              historicalYear: this.incomeForm.historicalYear,
              futureYear: this.incomeForm.futureYear,
              projectId: this.$store.state.projectId,
              investorId: this.$store.state.investorId
            })
            .then(res => {
              if (res.data.list.id) {
                _this.$store.state.incomeInitId = res.data.list.id;
                _this.$store.state.incomeTemplateName=res.data.templateName;
                _this.$emit("submitForm");
              }
              if(this.incomeForm.statementAperture=='0'){
                _this.$store.state.monomerReport=false                
              }else{
                _this.$store.state.monomerReport=true
              }
            })
            .catch(error => {
              _this.$messageError(error);
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //放弃修改
    amendment(){
      this.$emit("abandonBtn");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.incomeHome {
  width: 970px;
  margin: 0 auto;
  border: 1px solid #ececec;
  font-size: 13px;
  color: #262628;
  box-sizing: border-box;
  position: relative;
  .b-Rtitle {
    height: 23px;
    font-size: 12px;
    line-height: 9px;
    position: absolute;
    top: 7px;
    right: 12px;
    font-weight: bold;
    cursor: pointer;
  }
  .b-title {
    background: #fafafa;
    position: relative;
    font-weight: bold;
    height: 35px;
    line-height: 35px;
    padding-left: 18px;
    padding-right: 18px;
    border-bottom: 1px solid #ececec;
    .waiver{
      position: absolute;
      right: 10px;
      top: 3px;
    }
    .iconfont {
      margin-right: 10px;
    }
    .b-txt {
      vertical-align: middle;
    }
    .icon-xiangmuxinxi {
      color: #f7b543;
    }
    .icon-zhongyaotishi {
      color: #98c268;
    }
    .icon-querenshixiang {
      color: #5fa9ec;
    }
  }
  .income-wrap {
    padding: 0 10px 10px;
  }
  .income-info {
    border: 1px solid #ececec;
    margin-top: 10px;
    .b-title {
      height: 32px;
      line-height: 32px;
      font-weight: normal;
      background: #f6faff;
    }
    .income-box {
      color: #676767;
      width: 688px;
      margin: 0 auto;
      padding: 14px 0;
      /deep/.el-form-item.is-success .el-input__inner {
        border-color: #e1e1e1;
      }
      /deep/.el-radio-group .el-radio__label {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(103, 103, 103, 1);
        line-height: 18px;
      }
      &.article {
        width: 688px;
        height: 75px;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(103, 103, 103, 1);
        line-height: 25px;
      }
      .inp {
        width: 145px;
        height: 25px;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        border: 1px solid rgba(225, 225, 225, 1);
        margin: 0px 20px 0 10px;
      }
    }
  }
  .income-fd {
    text-align: center;
    margin-top: 34px;
    margin-bottom: 68px;
  }
  /deep/ .el-form-item{
    padding: 15px 0px;
    border-bottom: 1px dashed #E1E1E1 !important;
  }
  /deep/ .el-form-item__label {
    color: #262628;
  }
}
</style>
