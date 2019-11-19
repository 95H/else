<template>
  <div class="audit_box">
    <div class="projectDetail-zlpg-content zlpg-content clear pv">
      <div class="zlpg-content-header projectDetail-header">
            <el-tabs class="el-tabs-class" v-model="activeName">
                <i class="iconfont icon-xiangmuxinxi"></i>
                <el-tab-pane name="first">
                    <span class="first-tab-pane" slot="label">价值比率</span>
                    <el-scrollbar class="el-scrollbar">
                        <ratingValue v-if="activeName=='first'"></ratingValue>
                    </el-scrollbar>
                </el-tab-pane>
                <template v-if="JSON.parse($getCookie('user')).isExternal != true">
                  <el-tab-pane label="财务可比指标" name="second">
                    <el-scrollbar class="el-scrollbar">
                        <standardValue v-if="activeName=='second'"></standardValue>
                    </el-scrollbar>
                  </el-tab-pane>
                  <el-tab-pane label="业务可比指标" name="third">
                      <el-scrollbar class="el-scrollbar">
                          <businessValue v-if="activeName=='third'"></businessValue>
                      </el-scrollbar>
                  </el-tab-pane>
                  <el-tab-pane label="股市指标" name="fourth">
                      <el-scrollbar class="el-scrollbar">
                          <projectValue v-if="activeName=='fourth'"></projectValue>
                      </el-scrollbar>
                  </el-tab-pane>
                </template>
            </el-tabs>
        </div>
    </div>
  </div>
</template>

<script>
import standardValue from "../../fullPageModule/market/standardValue";  //财务可比指标
import businessValue from "../../fullPageModule/market/businessValue";  //业务可比指标
import projectValue from "../../fullPageModule/market/projectValue";    //股市指标
import ratingValue from "../../fullPageModule/market/ratingValue";   //价值比率

export default {
  name: "fullPageDetail",
  components: {
    standardValue,
    businessValue,
    projectValue,
    ratingValue
  },

  data() {
    return {
      collapseName: ["1"],
      height: "",
      radio: "",
      activeName: "first",
      navName: "first",
      count: 1,
      mask: false,
    };
  },

  computed: {
    
  },

  watch:{
    'collapseName'(){
      this.height = this.collapseName.length>0 ? window.innerHeight-334 + "px" : window.innerHeight-168 + "px"
    },
    activeName(){
      if(!/auditing/.test(this.$route.path)) return;
      this.collapseName = '1'
    },
  },

  created() {
    
  },

  methods: {
    //蓝色按钮——进入项目
    childMethod() {
      this.$store.state.projectId = this.$store.state.dataObj.projectId;
      this.$router.push({
        path: "/zlpg/project/projectCont"
      });
      this.$store.commit("changeShowCommon");
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .nav-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 760px;
  padding: 0 20px;
  z-index: 5;
  border-bottom: none;
  .nav-style {
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    line-height: 35px;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(236, 236, 236, 1);
  }
  .body {
    display: flex;
    background: #fff;
    padding: 20px 10px;
    border: 1px solid #ececec;
    border-top: none;
    .content {
      border-right: 1px dotted #ececec;
      padding: 0 20px;
    }
    .ipt-container {
      display: flex;
      align-items: center;
      justify-content: center;
      .ipt {
        width: 510px;
      }
      .ipt-25h {
        height: 25px;
      }
      .ipt-50h {
        height: 50px;
      }
      .name {
        width: 75px;
        font-size: 13px;
        font-weight: 400;
        color: rgba(104, 104, 104, 1);
        text-align: right;
      }
      /deep/ .el-textarea__inner {
        height: 100%;
        font-size: 13px;
        font-weight: 400;
        color: #686868;
        padding: 0 5px;
      }
    }
    .ipt-container:first-child{
      margin-bottom: 10px;
    }
    .container-item {
      justify-content: flex-start;
    }
    .btn-container {
      display: flex;
      flex-direction: column;
      margin: 22px 0 0 18px;
      .reset-btn {
        margin-top: 10px;
      }
    }
  }
}
.audit_box{
  position: relative;
  height:100%;
  .projectDetail-zlpg-content{
    position: absolute;
    width:100%;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  .zlpg-content-header {
    height:auto;
    .el-tabs-class {
      margin: 20px;
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      /*/deep/ .el-tabs__item{font-weight: 600}*/
    }
    .icon-xiangmuxinxi {
      color: #f7b543;
      margin-right: 10px;
      position: absolute;
      left: 25px;
      top: -27px;
      z-index: 1;
    }
    .el-scrollbar {
      width: 100%;
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
}
/deep/ .el-tabs__header {
  margin-bottom: 0;
}
/deep/ .el-tabs__nav-scroll {
  background: rgba(250, 250, 250, 1);
  border-radius: 2px 2px 0 0;
  padding-left: 55px;
}
/deep/ .el-tabs__content {
  overflow: visible;
}

/deep/ .el-collapse-item__header {
  height: 10px;
  background: #f6faff;
  border-left: 1px solid #ECECEC;
  border-right: 1px solid #ECECEC;
}
/deep/ .el-scrollbar__wrap {
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 0 !important;
}
/deep/ .el-collapse-item__arrow {
  margin-right: 50%;
  line-height: 10px;
  width: 45px;
  transform: translateX(50%);
  &:hover{opacity: .7}
}

/deep/ .el-collapse-item__arrow::before {
  content: "";
  display: block;
  background-image: url("../../../assets/common/openClose.png");
  background-size: contain;
  background-repeat: no-repeat;
  width: 45px;
  height: 10px;
}

/deep/ .el-collapse-item__arrow.is-active {
  transform:translateX(50%) rotate(180deg);
}

/deep/ .nav-container .nav-style {
  height: 40px;
  line-height: 40px;
  .el-tabs__item {
    font-weight: 400;
  }
  .el-tabs__nav-scroll /deep/ {
    padding-left: 25px;
  }
  .redWarning{
    color: red;
    position: absolute;
    left: 230px;
    top: 12px;
  }
}
/deep/ .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px !important;
  background-color: #e4e7ed;
  z-index: 1;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  opacity: 0.3;
}

/*.popup-container { position: fixed; top: 0; left: 0; bottom: 0; right: 0; margin: auto;width: 500px; height: 500px; z-index: 2; box-sizing: border-box; background: #fff; }*/
.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -250px 0 0 -250px;
  width: 500px;
  z-index: 2;
  box-sizing: border-box;
  background: #fff;
}

.head-container {
  display: flex;
  justify-content: space-between;
  height: 32px;
  line-height: 32px;
  background: blue;
  span {
    font-size: 14px;
    color: #fff;
    margin-left: 20px;
  }
  .popupCloseStyle {
    color: #fff;
    margin-right: 20px;
    cursor: pointer;
  }
}

.popupBody-container {
  .border-container {
    padding: 0;
    .popup-list{max-height: 292px;overflow: hidden}
    /*.popup-ul{max-height: 230px;}*/
    /deep/ .cell{
      text-align: center;
    }
  }
}

.seleRetrialIssuerTitle {
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  border-top: 1px solid #dcdcdc;
  font-size: 14px;
  overflow: hidden;
  & span {
    //   display: inline-block;
    float: left;
  }
  & span:first-child {
    width: 75px;
    text-align: center;
  }
  & span:nth-child(2) {
    width: 140px;
    box-sizing: border-box;
    padding-left: 45px;
  }
  & span:nth-child(3) {
    width: 140px;
    text-align: center;
  }
}

.popup-ul li {
  padding-left: 30px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #dcdcdc;
  .radio-name {
    display: inline-block;
    width: 160px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .radio-number {
    display: inline-block;
    width: 140px;
    text-align: center;
    font-size: 13px;
  }
}

.popupBtn-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom:6px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  line-height: 32px;
  a {
    margin: 0 5px;
  }
}
/deep/ .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-weight: 600 !important;
  color: rgba(20, 95, 210, 1);
}
/deep/ .el-tabs__active-bar {
  background-color: rgba(20, 95, 210, 1);
}
/deep/ .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(38, 38, 40, 1);
  font-size: 13px;
}
/deep/ .el-tabs__item:hover {
  color: #145FD2;
}
/deep/ .el-collapse-item__wrap{border-bottom:none;}
/deep/ .el-collapse-item__content{ padding-bottom: 0;}
// /*/deep/ .el-radio__label { padding-left: 48px; }*/
</style>

