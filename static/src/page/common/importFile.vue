<template>
  <div class="importFile-wrapper">
    <el-dialog
      :visible.sync="showImportFile"
      :modal-append-to-body= false
      center>
      <div slot="title">
        <span class="dialog__title">导入数据</span>
        <a class="import-btn" @click="startImport">开始导入</a>
      </div>
      <div class="dialog-wrapper">
        <div class="dialog-head">
          <span><i class="el-icon-tickets"></i></span>
          <span v-for="(item, index) in importOptions" :key="index" :class="currentIndex === index ? 'active' : ''"
                class="select"  @click="clickHandler(index)">
            {{item}}
          </span>
        </div>
        <div class="dialog-content">
          <el-row>
            <span>文件格式类型：</span>
            <el-select v-model="type" placeholder="请选择">
              <el-option
                v-for="item in fileTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <span>上传科目余额表：</span>
            <el-button>+ 上传科目余额表</el-button>
          </el-row>
          <el-row>
            <div class="uploadExplanation">
              <p>上传填写后端数据文件仅支持xls、xlsx，且文件大小不能超过50M</p>
              <p class="note">* 上传附件后会覆盖您已导入的数据，请谨慎操作</p>
            </div>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '导入数据',
        showImportFile: false,
        currentIndex: 0,
        labelPosition: 'right',
        type: '',
        importOptions: [
          '从科目余额表导入',
          '从资产申报表导入'
        ],
        fileTypes: [
          {value: '选项1', label: 'xls'},
          {value: '选项2', label: 'xlsx'},
        ]
      };
    },
    props: {

    },
    created(){
      const _this = this;
      _this.$store.state.importFile = function(){
        _this.showImportFile = true;
      }
    },
    methods: {
      startImport(){

      },
      clickHandler(index){
        this.currentIndex = index;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
  .importFile-wrapper{
    /deep/ .el-dialog__wrapper{
      .el-dialog--center{
        width: 800px;
        height: 500px;
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 5vh !important;
        .el-dialog__header{
          padding: 9px 20px 10px;
          background-color: #F6FAFF;
          border: 1px solid #E5E5E5;
          .dialog__title{
            font-size: 14px;
            color: #262628;
            font-weight: 600;
          }
          .import-btn{
            position: absolute;
            right: 20px;
            top: 5px;
            width: 70px;
            height: 25px;
            background-color: #3A80EC;
            color: #FFFFFF;
            font-size: 13px;
            text-align: center;
            line-height: 25px;
            border-radius: 2px;
            cursor: pointer;
          }
          .el-dialog__headerbtn{
            left: 20px;
            top: 11px;
          }
        }
        .el-dialog__body{
          padding: 15px 20px 0 15px;
          .dialog-wrapper{
            width: 760px;
            margin: auto;
            border: 1px solid #ECECEC;
            .dialog-head{
              padding: 11px 17px;
              background-color: #FAFAFA;
              border-bottom: 1px solid #ECECEC;
              >span{
                margin-right: 15px;
                color: #262628;
                font-weight: 600;
                font-size: 13px;
              }
              >span.select:hover{
                color: #145FD2;
                cursor: pointer;
              }
              >span.active{
                color: #145FD2;
                position: relative;
                &::after{
                  content:'';
                  width: 104px;
                  height: 2px;
                  background-color: #145FD2;
                  display: inline-block;
                  position: absolute;
                  top: 26px;
                  left: 0;
                }
              }
              >span:first-child{
                margin-right: 10px;
                .el-icon-tickets{
                  color: #F7B543;
                }
              }
            }
            .dialog-content{
              padding: 16px 29px 19px 45px;
              .el-row{
                margin-bottom: 10px;
                overflow: hidden;
                >span{
                  display: inline-block;
                  width: 112px;
                  text-align: right;
                  vertical-align: middle;
                  color: #686868;
                  font-size: 13px;
                }
                .el-select{
                  width: 240px;
                  height: 25px;
                }
                .el-button{
                  color: #3A80EC;
                  border-color: #3A80EC;
                  width: 125px;
                  height: 25px;
                  vertical-align: middle;
                  position: relative;
                  >span{
                    font-size: 13px;
                    margin: auto;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                  }
                }
                .uploadExplanation{
                  width: 570px;
                  padding: 10px 15px;
                  border: 1px dashed #DCDCDC;
                  float: right;
                  box-sizing: border-box;
                  p{
                    font-size: 13px;
                    color: #686868;
                    letter-spacing: 1px;
                  }
                  p.note{
                    color: #F7B543;
                    margin-top: 10px;
                  }
                }
              }
              .el-row:nth-child(2){
                margin-bottom: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
