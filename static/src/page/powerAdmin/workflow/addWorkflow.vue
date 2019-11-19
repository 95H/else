<template>
    <div class="zlpg-home">
        <!-- 设置流程名称 -->
        <el-form ref="workFlowObj" :model="workFlowObj" label-width="90px" class="padding10">
            <el-form-item label="表单类型：">
                <el-select v-model="workFlowObj.workType" placeholder="请选择表单类型" size="mini">
                    <el-option v-for="item in workFlowObj.workTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流程名称：">
                <el-input placeholder="请输入流程名称" @blur="getPinYin" v-model="workFlowObj.workName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="流程Key：">
                <el-input placeholder="请输入流程Key" v-model="workFlowObj.workKey" size="mini"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "addWorkflow",
  data() {
    return {
      workFlowObj: {
        workName: "",
        workKey: "",
        workType: "",
        workTypeList: window.commonOriginalData.formId
      },
      workJsonData: []
    };
  },
  methods: {
    // 新增流程
    childMethod() {
      var _this = this;
      _this.$http
        .post("/api/processDefinition/initProcess", {
          formId: _this.workFlowObj.workType,
          processName: _this.workFlowObj.workName,
          processKey: _this.workFlowObj.workKey
        })
        .then(function(res) {
          _this.workJsonData = res.data;
        });
    },
    getPinYin: function() {
      var _this = this;
      _this.$http
        .post("/api/processDefinition/chinaToEn", {
          chinaStr: _this.workFlowObj.workName
        })
        .then(function(res) {
          _this.workFlowObj.workKey = res.data;
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zlpg-home {
  .zlpg-home-header {
    width: 100%;
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 2px;
    background: #fff;
    .list-group {
      line-height: 34px;
      border-bottom: 1px solid rgba(236, 236, 236, 1);
      overflow: hidden;
      li {
        float: left;
        margin-left: 30px;
        a {
          position: relative;
          font-size: 13px;
          color: rgba(38, 38, 40, 1);
          font-weight: 400;
        }
        a.is-active {
          display: block;
          color: #145fd2;
        }
        a.is-active:after {
          content: "";
          left: 0;
          position: absolute;
          bottom: -1px;
          width: 100%;
          height: 2px;
          background: #145fd2;
        }
      }
      .list-right {
        float: right;
        cursor: pointer;
        height: 27px;
        background: rgba(58, 128, 236, 1);
        border-radius: 2px;
        line-height: 27px;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        text-align: right;
        padding: 0 9px 0 12px;
        margin-top: 4px;
        margin-right: 4px;
        p {
          width: 13px;
          height: 13px;
          background: #145fd2;
          border-radius: 3px;
          line-height: 11px;
          text-align: center;
          padding-left: 2px;
          font-size: 17px;
          color: #fff;
          float: left;
          margin-top: 8px;
          margin-right: 7px;
          opacity: 0.6;
        }
      }
    }
    .list-search {
      padding: 0 30px;
      .search-radio {
        padding: 13px 0 10px 0;
        border-bottom: 1px solid rgba(236, 236, 236, 1);
        .search-radio-title {
          font-size: 14px;
          color: #686868;
          float: left;
          padding: 0 12px 0 0;
          line-height: 18px;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #3a80ec;
        }
        .el-radio__input.is-checked .el-radio__inner {
          border-color: #3a80ec;
          background: #3a80ec;
        }
      }
      .search-form {
        padding: 13px 0;
        .el-input__inner {
          height: 25px !important;
          padding: 0 6px;
          max-width: 135px;
          min-width: 135px;
          border-radius: 2px;
        }
        .el-form-item {
          margin-bottom: 0;
        }
        .el-form-item__label {
          color: #686868;
          line-height: 25px;
        }
        .el-form-item__content {
          line-height: 25px;
        }
        .el-input__icon {
          line-height: 25px;
        }
        .el-input__prefix {
          right: 0 !important;
        }
        .el-button {
          padding: 4px 22px;
          background: #3a80ec;
          span {
            color: #fff;
          }
        }
        .el-button:last-child {
          background: #fff;
          border: 1px solid rgba(58, 128, 236, 1);
          span {
            color: #3a80ec;
          }
        }
      }
    }
  }
  .stamp-list {
    background: #fff;
    margin-top: 10px;
    border: 1px solid rgba(236, 236, 236, 1);
    border-radius: 2px;
    .stamp-list-header {
      height: 35px;
      background: rgba(249, 249, 249, 1);
      border-bottom: 1px solid rgba(236, 236, 236, 1);
      p {
        font-size: 13px;
        color: #262628;
        text-align: right;
        line-height: 35px;
        padding-right: 20px;
      }
    }
    .stamp-list-conter {
      padding: 25px 20px 30px 25px;
      background: #fff;
      .el-table th {
        background: #f6faff;
        color: #262628;
        font-weight: 400;
        font-size: 13px;
        padding: 4px 0;
      }
      .el-table td,
      .el-table th {
        text-align: center;
      }
      .el-table td {
        border: 1px solid #ebeef5;
        border-top: none;
        border-right: none;
        color: #6a6a6a;
        font-size: 12px;
        padding: 3px 0;
      }
      .el-table td:last-child {
        border-right: 1px solid #ebeef5;
      }
      .el-table th.is-leaf {
        border: 1px solid #ebeef5;
        border-right: none;
      }
      .el-table th:last-child {
        border-right: 1px solid #ebeef5 !important;
      }
    }
  }
}
.table-con {
  background: #fff;
  margin-top: 10px;
}
/*此处应用的样式*/
.workBox,
.dialogWork {
  display: flex;
  justify-content: center;
  align-items: center;
}
.workBox span {
  /*display:inline-block;*/
  text-align: center;
  line-height: 30px;
  width: 80px;
  font-size: 12px;
  height: 80px;
  cursor: pointer;
  float: left;
}
/*.workBox span+span,.workBox .span_box span{ margin-left:60px; position:relative; }
    .workBox span+span:before,.workBox .span_box span:before{ position:absolute; content:''; width:60px; height:2px; background-color:#ccc; left:-60px; top:35px; }*/
.workBox b.line {
  width: 60px;
  height: 3px;
  background-color: #ccc;
  margin-top: 29px;
  cursor: pointer;
  float: left;
}
.workBox .span_box {
  position: relative;
}
.workBox .span_box:before,
.workBox .span_box:after {
  position: absolute;
  content: "";
  width: 29px;
  height: 2px;
  background-color: #ccc;
  top: 50%;
  margin-top: -5px;
  left: 0;
}
.workBox .span_box:after {
  left: auto;
  right: 0;
}
.workBox .span_box .beforeLine,
.workBox .span_box .afterLine {
  position: absolute;
  content: "";
  width: 3px;
  left: 28px;
  top: 35px;
  height: 100%;
  background-color: #ccc;
}
.workBox .span_box .afterLine {
  width: 3px;
  right: 28px;
  left: auto;
}
.workBox .span_box .afterLine i {
  background-color: #ccc;
  border-radius: 50%;
  color: #fff;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  display: block;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -10px;
  position: absolute;
  z-index: 99;
  border: 2px solid #fff;
  cursor: pointer;
  font-size: 14px;
}
.workBox .span_box span {
  display: block;
  margin: 0 60px;
}
.workBox .span_box span:before {
  width: 30px;
  left: -30px;
}
.workBox .span_box span:after {
  width: 30px;
  right: -30px;
  content: "";
  position: absolute;
  height: 2px;
  top: 35px;
  background-color: #ccc;
}
.workBox span i {
  width: 50px;
  height: 50px;
  display: block;
  line-height: 50px;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #0883e4;
  color: #fff;
  font-size: 28px;
}
.workBox span em {
  font-style: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  max-width: 100%;
}
.workBox span.red i {
  background-color: red;
}
.workBox span.gray i {
  background-color: gray;
}

/*操作弹窗*/
.dialogWork {
  position: absolute;
  padding: 5px 10px;
  border-radius: 25px;
  background-color: #ccc;
  height: 50px;
  box-sizing: border-box;
  z-index: 999;
  display: flex;
}
.dialogWork li {
  margin: 0 5px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
}
.dialogWork li:hover {
  color: #0883e4;
}
.dialogWork li i {
  display: block;
  font-size: 20px;
}

/*hide*/
.hide {
  display: none;
}

/*弹窗样式*/
.dia_box:before {
  background-color: rgba(0, 0, 0, 0.3);
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
.dia_con {
  z-index: 99;
  background-color: #fff;
  position: relative;
}
.dia_title {
  line-height: 40px;
  padding: 0 15px;
  font-size: 14px;
  color: #333;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
}
.dia_content {
  box-sizing: border-box;
  font-size: 14px;
}
.btn_box {
  text-align: center;
  padding: 10px;
}
.btn {
  line-height: 28px;
  opacity: 1;
  transition: all 0.3s ease;
  height: 28px;
  padding: 0 15px;
  cursor: pointer;
  border-radius: 2px;
  font-size: 13px;
  display: inline-block;
  margin: 0 5px;
  border: 1px solid #dedede;
  color: #333;
}
.btn:hover {
  opacity: 0.7;
  transition: all 0.3s ease;
}
.btn_sure {
  background-color: #1e9fff;
  color: #fff;
  border-color: #1e9fff;
}

/*添加编辑弹窗样式*/
.addNode_box {
  width: 414px;
  height: 380px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  box-sizing: border-box;
  z-index: 999;
}
.del_box {
  width: 260px;
  height: 150px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.del_content {
  padding: 20px;
}
/deep/ .el-form-item__content,
/deep/ .el-form-item__label {
  line-height: 30px;
}
/deep/ .el-form-item {
  margin-bottom: 15px;
}
.addNode_box /deep/ .el-input__inner {
  height: 30px !important;
}
/*.addNode_item .addNode_input{ height:30px; line-height:28px; box-sizing:border-box; padding:0 10px; border:1px solid #E1E1E1; width:100%; font-size:13px; border-radius:3px; display:block;}*/

/*.backNode{ float:right; width:185px; cursor:pointer;  position:relative;}
    .backNode span{ color:#686868; position:relative;}
    .backNode span:after{ position:absolute; content:""; border-color:#ccc transparent transparent; border-width:5px; border-style:solid; display:block; right:10px; top:12px;}
    .backNode span.select:after{border-color:transparent transparent #ccc; top:6px;}
    .backNode ul{ display:none; background-color:#fff; border:1px solid #E1E1E1; padding:5px 0; position:absolute; top:32px; width:100%; box-sizing:border-box; border-radius:2px;}
    .backNode ul li{ padding:0 10px; line-height:25px; font-size:12px;}
    .backNode ul li:hover{ background-color:#f2f2f2;}*/

// 选择执行人
.tree_content {
  border: 1px solid #ececec;
  position: relative;
  box-sizing: border-box;
}
/deep/ .el-tabs--left .el-tabs__header.is-left,
.tree_content {
  height: 348px;
}
/deep/ .el-scrollbar {
  height: 300px;
}
/deep/ .el-scrollbar__wrap {
  overflow: auto;
}
</style>