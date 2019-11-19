<template>
  <div class="sendNewWrap">
    <el-form ref="sendNewform" :model="sendNewform" label-width="90px" class="sendNew_Main">
      <div class="sendNew_selectProject">
        <p><i class="iconfont icon-renwuxiangqing"></i>选择项目</p>
        <div class="sendNew_top">
          <el-form-item label="项目名称：" class="fl">
            <el-select filterable v-model="projectIdObj" placeholder="请选择项目名称" value-key="projectId" @change="projectSel">
              <el-option :label="item.projectName" :value='item' v-for='(item,index) in opt' :key="index + '1'"></el-option>
            </el-select>
          </el-form-item>
          <div class="fl" v-show="sendInfos">
            <p class="fl"><b>项目编号：</b><span>{{projectObj.projectNumber}}</span></p>
            <p class="fl"><b>项目负责人：</b><span>{{projectObj.projectLeader}}</span></p>
          </div>
        </div>
      </div>
      <div class="sendNew_fsInfo">
        <p><i class="iconfont icon-renwuxiangqing"></i>发送信息</p>
        <div class="sendNew_center">
          <el-form-item class="fl margin4" label="送达人：">
            <el-input readonly v-model="sendNewform.sendPersonName" placeholder="请选择送达人" @focus="selectPersons('sendPerson')"></el-input>
          </el-form-item>
          <el-form-item class="fl margin4" label="接收人：">
            <el-input v-model="sendNewform.receiver" placeholder="请输入接收人" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item class="marginBottom5" label="接收单位：">
            <el-input v-model="sendNewform.receiveUnit" placeholder="请输入接收单位" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item class="marginBottom5" label="接收人留言：">
            <el-input type="textarea" placeholder="请输入接收人留言" v-model="sendNewform.receiverMessage" maxlength="500"></el-input>
          </el-form-item>
          <el-form-item class="marginBottom0" label="收文时间：">
            <el-col>
              <el-date-picker value-format="yyyy-MM-dd" type="date" v-model="sendNewform.receiveDate" placeholder="请选择收文时间" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </div>
      </div>
      <div class="sendNew_fileInfo">
        <p><i class="iconfont icon-renwuxiangqing"></i>文件信息</p>
        <div class="sendNew_bottom">
          <div class="fileList">
            <ul>
              <li>文件列表</li>
              <li>文件名称</li>
              <li>份数</li>
            </ul>
            <el-form-item v-for="(item, index) in sendNewform.files" :label="'文件' + (index + 1)" :key="item.key" :prop="'files.' + index + '.value'">
              <el-input v-model="item.docName" class="fl" placeholder="请输入文件名称" maxlength="100"></el-input>
              <el-input v-model="item.DocCopies" class="fl" placeholder="请输入份数" maxlength="100"></el-input>
              <i class="iconfont" @click.prevent="removeList(item)">&#xe602;</i>
            </el-form-item>
            <el-form-item class="addListBtn">
              <div class="reset-btn" @click="addList"> + 添加</div>
            </el-form-item>
          </div>
          <div class="fsnewfile marginTop8">
            <span class="fl">客户签收单：</span>
            <el-upload class="upload-demo fl" :on-success="signReceip" action="api/file/upload" :limit="1">
            <!--  :disabled="jyBtn" -->
              <div class="fl reset-btn reset-btnB">上传客户签收单</div>
            </el-upload>
          </div>
          <div class="fsnewfile marginTop5">
            <span class="fl">客户签收表：</span>
            <el-upload class="upload-demo fl" :on-success="signreceiptForm" action="api/file/upload" :limit="1">
              <div class="fl reset-btn reset-btnB">上传客户签收表</div>
            </el-upload>
          </div>
          <div class="fsnewfile marginTop5">
            <span class="fl">其他附件：</span>
            <el-upload class="upload-demo fl" :on-success="otherAnnexes" action="api/file/upload" :limit="1">
              <div class="fl reset-btn reset-btnB">上传其他附件</div>
            </el-upload>
          </div>
        </div>
      </div>
    </el-form>
    <persons-dialog ref="selectPersonsDialog" v-on:setPersonId="setPersonsId"></persons-dialog>
  </div>
</template>
<script>
import personsDialog from "@/components/personsDialog";
export default {
  data() {
    return {
      opt: [],
      sendInfos: false,
      sendNewform: {
        projectId: "", // 项目Id
        sendPersonName: "", // 送达人
        sendPersonId: "", // 送达人
        receiver: "", // 接收人
        receiveUnit: "", // 接收单位
        receiverMessage: "", // 接收人留言
        receiveDate: "", // 收文时间
        SignReceiptFileName: "", // 签收单文件名
        SignReceiptFiledir: "", //签收单文件路径
        SignReceiptFromFileName: "", //签收表文件名
        SignReceiptFromFiledir: "", //签收表文件路径
        uploadsFileName: "", //其他文件名
        uploadsFiledir: "", // 其他文件路径
        files: [{ docName: "", DocCopies: "" }] // 文件信息
      },
      jyBtn: true,
      projectObj: {}, // 项目编号项目负责人集合
      projectIdObj: {}
    };
  },
  methods: {
    // 提交
    childMethod() {
      var _this = this;
      this.$refs["sendNewform"].validate(valid => {
        if (valid) {
          this.$confirm("确认发送此项目？", "提示信息", {
            confirmButtonText: "确认发送",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {
              this.$http
                .post("/api/reportsend/addReportsents", {
                  report: JSON.stringify(this.sendNewform)
                })
                .then(function(data) {
                  _this.$message({
                    type: "success",
                    message: data.msg
                  });
                  _this.$store.commit("changeShowCommon");
                  _this.$store.state.resetFun();
                })
                .catch(function(error) {
                  _this.$messageError(error);
                });
            })
            .catch(() => {
              _this.$message({
                type: "info",
                message: "已取消发送"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加
    addList() {
      this.sendNewform.files.push({
        docName: "",
        DocCopies: ""
      });
    },
    // 删除
    removeList(item) {
      var index = this.sendNewform.files.indexOf(item);
      if (index !== -1) {
        this.sendNewform.files.splice(index, 1);
      }
    },
    // 项目名称更改
    projectSel(val) {
      this.sendInfos = true;
      this.projectObj = val;
      this.sendNewform.projectId = val.projectId;
    },
    // 送达人
    selectPersons(chargeAppraiser) {
      this.$refs.selectPersonsDialog.showPersonDialog(
        chargeAppraiser,
        this.sendNewform[chargeAppraiser + "Id"],
        this.sendNewform[chargeAppraiser + "Name"]
      );
    },
    // 送达人
    setPersonsId(type, name, id) {
      this.sendNewform[type + "Id"] = id.join(",");
      this.sendNewform[type + "Name"] = name.join(",");
    },
    // 上传客户签收单
    signReceip(response) {
      this.sendNewform.SignReceiptFileName = response.data.fileName;
      this.sendNewform.SignReceiptFiledir = response.data.fileDir;
    },
    // 上传客户签收表
    signreceiptForm(response) {
      this.sendNewform.SignReceiptFromFileName = response.data.fileName;
      this.sendNewform.SignReceiptFromFiledir = response.data.fileDir;
    },
    // 上传其他附件
    otherAnnexes(response) {
      this.sendNewform.uploadsFileName = response.data.fileName;
      this.sendNewform.uploadsFiledir = response.data.fileDir;
    }
  },
  mounted() {
    var _this = this;
    // 项目名称
    this.$http
      .post("/api/reportsend/selectReportsentsProjects")
      .then(function(data) {
        _this.opt = data.data;
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  },
  // watch: {
  //   // 监听项目名称变化
  //   sendNewform: {
  //     handler(curVal, oldVal) {
  //       if (curVal.projectId) {
  //         this.jyBtn = false;
  //       } else {
  //         this.jyBtn = true;
  //       }
  //       this.fileData.id = curVal.projectId;
  //     },
  //     deep: true
  //   }
  // },
  components: {
    personsDialog
  }
};
</script>
<style lang="scss" scoped>
.sendNewWrap {
  .sendNew_Main {
    padding: 20px;
    > div {
      height: auto !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(236, 236, 236, 1);
      > p {
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
    }
    .sendNew_selectProject {
      margin-bottom: 12px;
      .sendNew_top {
        padding: 10px 40px;
        display: inline-block;
        .el-form-item {
          margin: 0;
        }
        p {
          line-height: 40px;
          margin-left: 20px;
          width: 150px;
          b {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(99, 99, 99, 1);
          }
          span {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #1d1c1e;
          }
        }
      }
    }
    .sendNew_fsInfo {
      clear: both;
      margin-bottom: 12px;
      .sendNew_center {
        padding: 20px 40px;
        > div:nth-child(3) {
          clear: both;
        }
        .margin4 {
          margin-bottom: -4px;
        }
      }
    }
    .sendNew_fileInfo {
      .sendNew_bottom {
        padding: 12px 20px;
        .fileList {
          ul {
            height: 32px;
            background: #f6faff;
            border: 1px solid #e5e5e5;
            width: 674px;
            line-height: 32px;
            li {
              text-align: center;
              float: left;
              border-left: 1px solid rgba(229, 229, 229, 1);
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(38, 38, 40, 1);
              width: 291px;
            }
            li:first-child {
              width: 90px;
              border-left: none;
            }
          }
          .el-form-item /deep/ {
            margin-bottom: 0;
            :first-child {
              margin-left: 0 !important;
            }
            label {
              border: 1px solid rgba(229, 229, 229, 1);
              border-top: none;
              width: 92px !important;
              height: 30px;
              line-height: 30px;
              text-align: center;
            }
            > div.el-form-item__content {
              height: 30px;
              line-height: 30px;
              .el-input {
                width: 46%;
                height: 29px;
                border: 1px solid #e5e5e5;
                border-top: none;
                padding: 0 1px;
                line-height: 29px;
                border-left: none;
                input {
                  border: none;
                }
              }
              i {
                color: #c0c0c0;
                margin-left: 12px;
                cursor: pointer;
              }
              i:hover {
                color: #f7b543;
              }
            }
          }
          .addListBtn {
            margin-top: 8px;
            button {
              height: 25px;
              border-radius: 2px;
              border: 1px solid rgba(58, 128, 236, 1);
              font-size: 13px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(58, 128, 236, 1);
              padding: 5px 20px;
            }
          }
        }
        .fsnewfile {
          display: inline-block;
          width: 100%;
          .upload-demo /deep/ {
            height: 25px;
            ul {
              float: right;
              li {
                margin-top: 0;
              }
            }
            .reset-btnB {
              width: 110px!important;
            }
          }
          > span:first-child {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            width: 80px;
            display: inline-block;
            color: rgba(99, 99, 99, 1);
            line-height: 25px;
          }
          button {
            width: 120px;
            height: 25px;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid rgba(58, 128, 236, 1);
            padding: 0;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(58, 128, 236, 1);
          }
          > span:last-child {
            color: #1d1c1e;
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>

