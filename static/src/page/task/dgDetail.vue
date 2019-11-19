<template>
  <div class="dgBox">
    <div class="dgList">
      <div class="dgOne" v-for="(item1,index1) in dgFileListsData" :key="index1 + 'item1'">
        <div class="dgTit">{{item1.draftName}}</div>
        <div class="dgCont">
          <div
            v-show="item2.fileName"
            class="dgFileLists"
            v-for="(item2,index2) in item1.list"
            :key="index2 + 'item2'"
            @mouseenter="deleteBtnShow(item2.id)"
            @mouseleave="deleteBtnHide()"
          >
            <div class="icon_box">
              <i v-if="dgfilterFile(item2.fileName)" :class="dgfilterFile(item2.fileName)"></i>
              <img v-else :src="item2.fileUrl" alt>
              <div class="link-hover" v-show="ind === item2.id">
                <i
                  class="iconfont icon-shanchu2 fr"
                  @click="dgdeleteFile(item2.id,item1.list,index2)"
                ></i>
              </div>
            </div>
            <a :title="item2.fileName">{{item2.fileName}}</a>
          </div>
          <div class="dgFileUpload" @click="uploadFileclass(item1.draftName,item1.list,item1.parentId)">
            <el-upload
              class="fl"
              ref="upload"
              action="/api/file/upload"
              :multiple="true"
              :on-success="dguploadFileSuccess"
            >
              <div class="icon_box">
                <div class="upload_icon">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
              <a title="上传文件">上传文件</a>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dgFileListsData: [],
      ind: -1,
      thisdraftName: "",
      dgListDataPush: [],
      thisparentId: ""
    };
  },
  methods: {
    // 操作---sheetName对应索引号
    sheetNameKey(val) {
      switch (val) {
        case "现金":
          return "CZ1";
          break;
        case "银行存款":
          return "CZ2";
          break;
        case "其他货币资金":
          return "CZ3";
          break;
        case "交易性-股票":
        case "交易性-债券":
        case "交易性-基金":
          return "CZ4";
          break;
        case "应收票据":
          return "CZ5";
          break;
        case "应收账款":
          return "CZ6";
          break;
        case "预付账款":
          return "CZ7";
          break;
        case "应收利息":
          return "CZ8";
          break;
        case "应收股利(利润)":
          return "CZ9";
          break;
        case "其他应收款":
          return "CZ10";
          break;
        case "材料采购(在途物资)":
          return "CZ11-5";
          break;
        case "原材料":
          return "CZ11-6";
          break;
        case "在库周转材料":
          return "CZ11-7";
          break;
        case "委托加工物资":
          return "CZ11-8";
          break;
        case "产成品(库存商品)":
          return "CZ11-9";
          break;
        case "在产品(自制半成品)":
          return "CZ11-10";
          break;
        case "发出商品":
          return "CZ11-11";
          break;
        case "在用周转材料":
          return "CZ11-12";
          break;
        case "农产品":
          return "CZ11-13";
          break;
        case "消耗性生物资产":
          return "CZ11-14";
          break;
        case "工程施工":
          return "CZ11-15";
          break;
        case "一年到期非流动资产":
          return "CZ12";
          break;
        case "其他流动资产":
          return "CZ13";
          break;
        case "可出售-股票":
          return "CZ14-1";
          break;
        case "可出售-债券":
          return "CZ14-2";
          break;
        case "可出售-其他":
          return "CZ14-3";
          break;
        case "持有到期投资":
          return "CZ15";
          break;
        case "长期应收":
          return "CZ16";
          break;
        case "股权投资":
          return "CZ17";
          break;
        case "投资性房地产":
          return "CZ18";
          break;
        case "房屋建筑物":
        case "构筑物":
        case "管道沟槽":
          return "CZ19";
          break;
        case "机器设备":
          return "CZ20-5";
          break;
        case "车辆":
          return "CZ20-6";
          break;
        case "职工薪酬":
          return "CZ39";
          break;
        case "电子设备":
          return "CZ20-7";
          break;
        case "土地":
          return "CZ53";
          break;
        case "在建(土建)":
          return "CZ21-1";
          break;
        case "在建(设备)":
          return "CZ21-2";
          break;
        case "工程物资":
          return "CZ22";
          break;
        case "固定资产清理":
          return "CZ23";
          break;
        case "生产性生物资产":
          return "CZ24";
          break;
        case "油气资产":
          return "CZ25";
          break;
        case "无形-土地":
          return "CZ26";
          break;
        case "无形-矿业权":
          return "CZ27";
          break;
        case "无形-其他":
          return "CZ30";
          break;
        case "开发支出":
          return "CZ28";
          break;
        case "商誉":
          return "CZ29";
          break;
        case "长期待摊费用":
          return "CZ31";
          break;
        case "递延所得税资产":
          return "CZ32";
          break;
        case "其他非流动资产":
          return "CZ33";
          break;
        case "短期借款":
          return "CZ34";
          break;
        case "交易性金融负债":
          return "CZ35";
          break;
        case "应付票据":
          return "CZ36";
          break;
        case "应付账款":
          return "CZ37";
          break;
        case "预收账款":
          return "CZ38";
          break;
        case "应交税费":
          return "CZ40";
          break;
        case "应付利息":
          return "CZ41";
          break;
        case "应付股利(利润)":
          return "CZ42";
          break;
        case "其他应付款":
          return "CZ43";
          break;
        case "一年到期非流动负债":
          return "CZ44";
          break;
        case "其他流动负债":
          return "CZ45";
          break;
        case "长期借款":
          return "CZ46";
          break;
        case "应付债券":
          return "CZ47";
          break;
        case "长期应付款":
          return "CZ48";
          break;
        case "专项应付款":
          return "CZ49";
          break;
        case "预计负债":
          return "CZ50";
          break;
        case "递延所得税负债":
          return "CZ51";
          break;
        case "其他非流动负债":
          return "CZ52";
          break;
      }
    },
    // 文件上传成功的回调
    dguploadFileSuccess(item) {
      var _this = this,
        params = {
          projectId: _this.$store.state.dataObj.dataTRInfo.projectId,
          investorId: _this.$store.state.dataObj.dataTRInfo.investorId,
          fileIds: _this.$store.state.dataObj.dataTRInfo.id,
          draftType: 2,
          fileUrl: item.data.fileDir,
          fileName: item.data.fileName,
          draftName: _this.thisdraftName,
          parentId: _this.thisparentId
        };
      this.$http
        .post("/api/reportDraft/saveReportDraft/upload", params)
        .then(function(res) {
          _this.dgListDataPush.push(res.data);
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 删除（取关）
    dgdeleteFile(ids, val2, ind2) {
      var _this = this;
      this.$http
        .post("/api/reportDraft/report/File/update", {
          fileIds: _this.$store.state.dataObj.dataTRInfo.id,
          reportIds: ids
        })
        .then(function(res) {
          if (val2.length == 1) {
            val2[0] = { draftName: val2[0].draftName };
          } else {
            val2.splice(ind2, 1);
          }
          _this.$forceUpdate();
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 鼠标滑过取关
    deleteBtnShow(id) {
      this.ind = id;
    },
    // 鼠标离开取关
    deleteBtnHide() {
      this.ind = -1;
    },
    // 上传点击事件取值
    uploadFileclass(v1, v2, v3) {
      this.thisdraftName = v1;
      this.dgListDataPush = v2;
      this.thisparentId = v3;
    },
    // 过滤上传的文件的格式
    dgfilterFile(val) {
      if (val) {
        val = val.slice(((val.lastIndexOf(".") - 1) >>> 0) + 2);
        switch (val) {
          case "xls":
          case "xlsx":
            return "iconexcel";
            break;
          case "doc":
          case "docx":
            return "iconword";
            break;
          case "pdf":
            return "iconpdf";
            break;
          case "jpg":
          case "jpeg":
          case "png":
          case "gif":
          case "bmp":
            return false;
            break;
          default:
            return "iconunknownfile";
        }
      }
    }
  },
  mounted() {
    var _this = this,
      sheetnameKey = this.sheetNameKey(
        this.$store.state.dataObj.dataTRInfo.sheetName
      );
    // 底稿列表渲染
    this.$http
      .post("/api/reportDraft/report/fileShow", {
        projectId: this.$store.state.dataObj.dataTRInfo.projectId,
        investorId: this.$store.state.dataObj.dataTRInfo.investorId,
        xlsIds: this.$store.state.dataObj.dataTRInfo.id,
        consult: sheetnameKey
      })
      .then(function(data) {
        _this.dgFileListsData = data.data;
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  }
};
</script>

<style lang="scss" scoped>
.dgBox {
  .dgList {
    .dgOne {
      border: 1px solid rgba(229, 229, 229, 1);
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
      .dgTit {
        height: 32px;
        background: rgba(246, 250, 255, 1);
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        line-height: 32px;
        text-align: center;
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(38, 38, 40, 1);
      }
      .dgCont {
        display: inline-block;
        .dgFileLists {
          display: block;
          width: 100px;
          height: auto;
          margin: 10px 10px 0;
          text-align: center;
          border-radius: 5px;
          box-sizing: border-box;
          position: relative;
          cursor: pointer;
          float: left;
          transition: all 0.2s ease;
          .icon_box {
            padding: 18px 15px 0;
            margin-bottom: 10px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 70px;
              height: 58px;
            }
            .iconexcel {
              background: url("../../../static/img/excel.png") no-repeat;
              background-size: 100%;
              width: 50px;
              height: 58px;
            }
            .iconword {
              background: url("../../../static/img/word.png") no-repeat;
              background-size: 100%;
              width: 50px;
              height: 58px;
            }
            .iconpdf {
              background: url("../../../static/img/pdf.png") no-repeat;
              background-size: 100%;
              width: 50px;
              height: 58px;
            }
            .iconunknownfile {
              background: url("../../../static/img/unknownfile.png") no-repeat;
              background-size: 100%;
              width: 44px;
              height: 58px;
            }
            .link-hover {
              height: 16px;
              box-sizing: border-box;
              line-height: 16px;
              position: absolute;
              top: 5px;
              right: 5px;
              transition: all 0.2s ease;
              i {
                color: #f09237;
              }
            }
          }
          > a {
            font-size: 13px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(38, 38, 40, 1);
            margin-bottom: 10px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100px;
            height: 18px;
          }
          > a:hover {
            color: #3a80ec;
          }
        }
        .dgFileUpload {
          display: inline-block;
          .icon_box {
            margin: 18px auto 0;
            width: 62px;
            height: 68px;
            overflow: hidden;
            line-height: 65px;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              font-size: 50px;
            }
          }
          a {
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13px;
            width: 100px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .upload_icon {
            width: 60px;
            height: 60px;
            border: 1px dashed #cdcdcd;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              font-size: 25px;
              color: #e1e1e1;
            }
            &:hover {
              border-color: #b9e1fc;
              i {
                color: #b9e1fc;
              }
            }
          }
          /deep/ .el-upload-list {
            display: none;
          }
        }
      }
    }
  }
}
</style>


