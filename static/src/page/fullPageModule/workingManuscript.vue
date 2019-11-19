<template>
  <div class="manuscript">
    <div class="manuscript_left">
      <el-scrollbar>
        <el-tree :data="manuscriptTree" default-expand-all :props="defaultProps" :expand-on-click-node="false">
          <span class="custom-tree-node el-tree-node__label" slot-scope="{ node, data }"
            :class="{'tree-actived':node.data.id === parentId}"
            @click="handleNodeClick(node)">
            {{ node.label }}
          </span>
          </el-tree>
      </el-scrollbar>
    </div>
    <div class="manuscript_right">
      <div class="file_title text-right">
        <a href="javascript:;" class="marginLeft10 backFolder fl" v-if="FileZindex" @click="backFolder"><i class="iconfont gray icon-back"></i></a>
        <el-button type="text" v-if="(isCheckedNum > 0 && !linkFileFlag) && $store.state.readonly && /projectOnlineTask|externalOnLineTask/g.test($route.path)" @click.stop="onLink('')"><i class="iconfont icon-guanlian"></i> 关联</el-button>
        <el-button type="text" @click="createFileBox" v-if="(showAddFlag && !FileZindex) && $store.state.readonly"><i class="iconfont icon-xinjian"></i> 新建文件夹</el-button>
        <!-- <el-button type="text"><i class="el-icon-upload"></i> 上传</el-button> -->
        <div class="fr" v-if="isCheckedNum > 0">
          <el-button type="text" @click="downLoadFile"><i class="iconfont icon-xiazai"></i> 下载</el-button>
          <el-button type="text" @click="deleteFile('')" v-if="$store.state.readonly"><i class="iconfont icon-shanchu1"></i> 删除</el-button>
          <el-button type="text" v-if="(isCheckedNum == 1) && $store.state.readonly" @click="renameFileBox"><i class="el-icon-edit-outline"></i> 重命名</el-button>
        </div>
      </div>
      <div class="file_box" v-if="showAddFlag">
        <el-scrollbar>
          <el-checkbox-group v-model="checkedList" v-if="!FileZindex">
            <div class="file_item" v-for="(fileItem,index) in fileList" @mouseover="showCheckbox($event)" @mouseout="hideCheckbox($event)" :key="index"><!--  -->
              <el-checkbox :label="fileItem.id" @change="isCheckedFun(index)"></el-checkbox>
              <div @dblclick="goToChild(fileItem.id)" title="folder" v-if="fileItem.draftType == 1">
                <div class="icon_box not-border">
                  <i class="iconfont icon-wenjianjia orange"></i>
                </div>
                <a :title="fileItem.draftName">{{fileItem.draftName}}</a>
              </div>
              <div v-else>
                <div class="icon_box">
                  <!-- <i class="iconfont" v-if="filterFile(fileItem.fileName.split('.')[fileItem.fileName.split('.').length-1])" :class="filterFile(fileItem.fileName.split('.')[fileItem.fileName.split('.').length-1])"></i> -->
                  <img v-if="filterFile(fileItem.fileName.split('.')[fileItem.fileName.split('.').length-1])" :src="filterFile(fileItem.fileName.split('.')[fileItem.fileName.split('.').length-1])" />
                  <img :src="ossFileUrl + fileItem.fileUrl" v-else />
                  <div class="link-hover" v-if="$store.state.readonly">
                    <i class="iconfont icon-link fl" v-if="/projectOnlineTask|externalOnLineTask/g.test($route.path)" @click.stop="onLink(fileItem.id)"></i>
                    <i class="iconfont icon-shanchu1 fr" @click="deleteFile(fileItem.id)"></i>
                  </div>
                </div>
                <a :title="fileItem.fileName">{{fileItem.fileName}}</a>
              </div>
              <template v-if="/projectOnlineTask|externalOnLineTask/g.test($route.path)">
                <el-popover
                placement="bottom"
                width="350"
                @show='showOnLinkList(fileItem.id)'
                v-if="fileItem.reportCount > 0"
                trigger="click">
                  <!-- 显示已关联的资产 -->
                  <span class="associatedTitle">关联资产</span>
                  <el-table
                    :data="associated"
                    max-height="150"
                    width="100%"
                    class="associatedTable"
                    border stripe>
                    <el-table-column
                      prop="sheetName"
                      align="center"
                      label="资产类型"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      label="编号"
                      width="50">
                      <template slot-scope="scope">
                        {{scope.$index + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      align="center"
                      label="资产名称">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      width="50">
                      <template slot-scope="scope">
                        <el-button type="text" class="padding0" @click.native.prevent="disassociate(scope.$index,scope.row.id,fileItem)" size="small">取关</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <span class="linkNum" v-if="fileItem.draftType != 1" slot="reference">{{fileItem.reportCount}}</span>
                </el-popover>
                <span class="linkNum noLink" v-if="fileItem.draftType != 1 && fileItem.reportCount == 0">{{fileItem.reportCount}}</span>
              </template>
            </div>
          </el-checkbox-group>
          <el-checkbox-group v-model="subCheckedList" v-else>
            <div class="file_item" v-for="(fileItem,index) in subFileList" @mouseover="showCheckbox($event)" @mouseout="hideCheckbox($event)" :key="index"><!-- @mouseover="showCheckbox($event)" @mouseout="hideCheckbox($event)" -->
              <el-checkbox :label="fileItem.id" @change="isCheckedFun(index)"></el-checkbox>
              <div>
                <div class="icon_box">
                  <img v-if="filterFile(fileItem.fileName.split('.')[fileItem.fileName.split('.').length-1])" :src="filterFile(fileItem.fileName.split('.')[fileItem.fileName.split('.').length-1])" />
                  <img :src="ossFileUrl + fileItem.fileUrl" v-else />
                  <div class="link-hover" v-if="$store.state.readonly">
                    <i class="iconfont icon-link fl" @click.stop="onLink(fileItem.id)"></i>
                    <i class="iconfont icon-shanchu1 fr" @click="deleteFile(fileItem.id)"></i>
                  </div>
                </div>
                <a :title="fileItem.fileName">{{fileItem.fileName}}</a>
              </div>
              <el-popover
                width="350"
                v-if="fileItem.reportCount > 0"
                @show='showOnLinkList(fileItem.id)'
                trigger="click">
                  <!-- 显示已关联的资产 -->
                  <span class="associatedTitle">关联资产</span>
                  <el-table
                    :data="associated"
                    max-height="150"
                    width="100%"
                    class="associatedTable"
                    border stripe>
                    <el-table-column
                      prop="sheetName"
                      align="center"
                      label="资产类型"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      align="center"
                      label="编号"
                      width="50">
                      <template slot-scope="scope">
                        {{scope.$index + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      align="center"
                      label="资产名称">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      align="center"
                      width="50">
                      <template slot-scope="scope">
                        <el-button v-if="$store.state.readonly" type="text" class="padding0" @click.native.prevent="disassociate(scope.$index,scope.row.id,fileItem)" size="small">取关</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                <span class="linkNum" slot="reference">{{fileItem.reportCount}}</span>
              </el-popover>
              <span class="linkNum noLink" v-else>{{fileItem.reportCount}}</span>
            </div>
          </el-checkbox-group>
          <div class="file_item" v-if="$store.state.readonly">
            <el-upload class="fl" ref="upload" action="/api/file/upload" :multiple="true" :data="upLoadParams" :on-success="uploadFileSuccess">
              <div class="icon_box not-border">
                <div class="upload_icon">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
              <a title="上传文件">上传文件</a>
            </el-upload>
          </div>
          <div class="noData" v-if="(!$store.state.readonly && ((!FileZindex && !fileList.length) || (FileZindex && !subFileList.length)))">暂无数据</div>
        </el-scrollbar>
      </div>
      <div class="empty_box" v-else>请点击左侧菜单进行选择</div>
    </div>
    <!-- 新建文件夹、重命名 -->
    <center-dialog ref="centerDialog" dialogWidth='400px' dialogHeight="180px" :dialogTitle="centerTitle">
      <div slot="dialogContent">
        <el-form ref="renameFile" :model="renameFile">
          <el-form-item>
            <el-input required placeholder="请输入文件夹名称" maxLength="25" v-model="renameFile.draftName"></el-input>
          </el-form-item>
          <div class="btn_box text-center">
            <a href="javascript:;" class="search-btn" @click="submitFileName()">确定</a>
            <a href="javascript:;" class="reset-btn" @click="closeDialog('centerDialog')">取消</a>
          </div>
        </el-form>
      </div>
    </center-dialog>
    <!-- 删除文件夹 -->
    <center-dialog ref="delFileBox" dialogWidth="300px" dialogHeight="160px" titlePosition="left">
      <div slot="dialogContent">
        <div class="del_content">确认删除当前文件（夹）？</div>
        <div class="text-center">
          <a class="search-btn" @click="delFileBoxSure">确定</a>
          <a class="reset-btn" @click="closeDialog('delFileBox')">取消</a>
        </div>
      </div>
    </center-dialog>
    <manuscript-association ref="association" @refresh="getFiles"></manuscript-association>
  </div>
</template>

<script>
import manuscriptAssociation from "@/components/manuscriptAssociationList";
import centerDialog from "../../components/centerDialog";
import Public from "../../public.js";
export default {
  data() {
    return {
      ossFileUrl : '',
      manuscriptTree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      showAddFlag: false,
      centerTitle: "",
      fileList: [],
      subFileList: [],
      checkedList: [],
      subCheckedList: [],
      isCheckedNum: 0,
      isClick: false,
      renameFile: {
        draftName: "",
        fileType: ""
      },
      upLoadParams: {
        fileUrl: ""
      },
      FileZindex: false,
      holderId: "",
      parentId: "",
      consultArr:[],
      thisFileId : '',
      linkFileFlag : 0,   //是否显示上方的关联按钮
      associated : [],  //已关联的资产
      linkIdStr : '',   //关联资产的id
      reportId : '',   //文件Id
      draftName : '',  //目录名称
    };
  },
  mounted() {
    let _this = this,
      treeNodeList = document.querySelectorAll(
        ".manuscript_left .el-tree .el-tree-node__label"
      );
    if (treeNodeList.length > 0) {
      treeNodeList[0].classList.add("tree-actived");
    }
    Public.$on("fileUrl", function(data) {
      _this.upLoadParams.fileUrl = data;
    });
  },
  created() {
    let _this = this;
    this.defaultData = JSON.parse(JSON.stringify(this.$data.renameFile));
    // 进入工作底稿初始化数据
    _this.$store.state.workingManuscript = function() {
      _this.$http
        .post("/api/reportDraft/initReportDraft", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId
        })
        .then(function(res) {
          // 切换机构，底稿页面重置
          _this.showAddFlag = false;
          _this.parentId = '';
          // 重置目录
          _this.manuscriptTree = res.data;
          setTimeout(function() {
            // 树结构添加title  方便查看全部内容
            let labelList = document.querySelectorAll(
              ".manuscript_left .el-tree .el-tree-node__label"
            );
            for (let i = 0; i < labelList.length; i++) {
              labelList[i].setAttribute("title", labelList[i].innerText);
            }
          });
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    };
    _this.$store.state.workingManuscript();
  },
  components: { centerDialog,manuscriptAssociation },
  methods: {
    // 过滤上传的文件的格式
    filterFile(val){
      switch(val){
        case 'xls':
        case 'xlsx':
          return '../../../static/img/excel.png';
          break;
        case 'doc':
        case 'docx':
          return '../../../static/img/word.png'
          break;
        case 'pdf':
          return '../../../static/img/pdf.png'
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'bmp':
          return false
          break;
        default :
          return '../../../static/img/unknownfile.png'
      }
    },
    // 返回文件夹
    backFolder() {
      this.FileZindex = false;
      // this.$messageSuccess("返回顶级文件夹");

      // 重置选中样式
      this.resetCheckedStyle();
    },
    //查找叶子节点
    findLeaf(node) {
      if (!node.isLeaf) {
        this.findLeaf(node.childNodes[0]);
      } else {
        this.parentId = node.data.id;
        this.draftName = node.data.label;
        this.consultArr = node.data.consult.split("-");
        //关联所用 parentData
        // console.log(this.findParent(node));
        // this.parentData = node.parent;
      }
    },
    //查找是否是资产基础法部分
    findParent(node){
      if(node.parent===null){
        return
      }else{
        this.findParent(node.parent)
      }
    },
    //树结构点击
    handleNodeClick: function(node) {
      let _this = this;
      this.findLeaf(node);
      // 切换左侧树的选中状态
      //                let nodeList = document.querySelectorAll(".manuscript_left .el-tree .el-tree-node__label")
      this.getFiles(true);
        // if(node.childNodes.length > 0){
        //   return false
        // }else{
        //   for(let i=0; i<nodeList.length; i++){
        //     if(nodeList[i].innerText == data.label.trim()){
        //       // 请求右侧工作底稿内容
        //       nodeList[i].classList.add("tree-actived");
        //     }else{
        //       nodeList[i].classList.remove("tree-actived");
        //     }
        //   }
        // }
    },
    // 查找结点文件
    getFiles(flag){
      var _this=this;
      _this.$http
        .post("/api/reportDraft/findReportDraftFile", {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          id: _this.FileZindex ? _this.holderId : _this.parentId
        })
        .then(function(res) {
          _this.resetCheckedStyle();
          _this.showAddFlag = true;
          if(!_this.FileZindex){
            _this.fileList = res.data;
          }else{
            _this.subFileList = res.data;
          }
          if(flag){
            _this.FileZindex = false;
          }
          if(res.data.length){
            _this.ossFileUrl = res.data[0].ossFileUrl;
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 新建文件夹
    createFileBox() {
      this.renameFile.draftName = "";
      this.centerTitle = "新建文件夹";
      this.$refs.centerDialog.showDialog();
    },
    // 重命名
    renameFileBox() {
      this.centerTitle = "重命名";
      let thisText = document.querySelector(".file_box .isChecked")
        .children[1].childNodes[2].innerText;
      if (thisText.lastIndexOf(".") == -1) {
        this.renameFile.draftName = thisText;
        this.renameFile.fileType = "";
      } else {
        this.renameFile.draftName = thisText.substring(
          0,
          thisText.lastIndexOf(".")
        );
        this.renameFile.fileType = thisText.substring(
          thisText.lastIndexOf(".")
        );
      }
      this.$refs.centerDialog.showDialog();
    },
    // 新建、重命名确定事件
    submitFileName(fromName) {
      let _this = this;
      if (_this.centerTitle == "重命名") {
        if (_this.renameFile.draftName.trim() == "") {
          _this.$message({
            type: "error",
            message: "请输入文件（夹）名称",
            duration: 1000
          });
        } else {
          let params = {
            fileName: _this.renameFile.draftName + _this.renameFile.fileType,
            id: _this.checkedList.join(",") || _this.subCheckedList.join(","),
          }
          if(!_this.FileZindex){
            params.parentId = _this.parentId;
          }else{
            params.parentId = _this.holderId;
          }
          _this.$http
            .post("/api/reportDraft/updateReportDraft", params)
            .then(function(res) {
              let fileListBox = [],
                fileCheckbox = [];
              // 判断当前文件层级
              if (_this.FileZindex) {
                fileListBox = _this.subFileList;
                fileCheckbox = _this.subCheckedList;
              } else {
                fileListBox = _this.fileList;
                fileCheckbox = _this.checkedList;
              }
              for (let i = 0; i < fileListBox.length; i++) {
                if (
                  JSON.stringify(fileListBox[i]).indexOf(
                    '"id":' + fileCheckbox.join(",")
                  ) !== -1
                ) {
                  fileListBox[i][fileListBox[i]['fileName']!=''? "fileName" : "draftName"] =
                    _this.renameFile.draftName + _this.renameFile.fileType;
                }
              }
              _this.closeDialog("centerDialog");
              // 重置数据
              _this.resetCheckedStyle();
            })
            .catch(function(error) {
              _this.$messageError(error);
            });
        }
      } else {
        if (_this.renameFile.draftName.trim() == "") {
          _this.$message({
            type: "error",
            message: "请输入文件夹名称",
            duration: 1000
          });
        } else {
          _this.$http.post("/api/reportDraft/saveReportDraft", {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            draftName: _this.renameFile.draftName,
            parentId: _this.parentId,
            draftType: 1
          })
          .then(function(res) {
            _this.fileList = res.data;
            _this.closeDialog("centerDialog");
            _this.$data.renameFile = Object.assign(
              _this.$data.renameFile,
              _this.defaultData
            );
            _this.resetCheckedStyle();
            _this.renameFile.draftName = "";
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
        }
      }
    },
    // 下载
    downLoadFile() {
      window.location.href =
        "/api/reportDraft/downloadDraftFile?token=" +
        this.$getCookie("token") +
        "&ids=" +
        (this.checkedList.join(",") || this.subCheckedList.join(","));
    },
    // 打开删除文件弹窗
    deleteFile(number){
      if(number){
        this.thisFileId = number;
      }
      this.showDialog('delFileBox');
    },
    // 删除文件、文件夹【确定按钮】
    delFileBoxSure(number) {
      let _this = this,
          params = {};
      if(this.thisFileId != ''){
        params['ids'] = this.thisFileId;
      }else{
        params['ids'] = _this.checkedList.join(",") || _this.subCheckedList.join(",")
      }
      _this.$http
        .post("/api/reportDraft/deleteReportDraft", params)
        .then(function(res) {
          let fileListBox = [],
              fileCheckbox = [];
          // 判断当前文件层级
          if (_this.FileZindex) {
            fileListBox = _this.subFileList;
            fileCheckbox = _this.subCheckedList;
          } else {
            fileListBox = _this.fileList;
            fileCheckbox = _this.checkedList;
          }
          if(_this.thisFileId != ''){   //如果点击的是单个文件上面的删除按钮
            for (let i = 0; i < fileListBox.length; i++) {
              if (JSON.stringify(fileListBox[i]).indexOf('"id":' + _this.thisFileId) !== -1) {
                fileListBox.splice(i, 1);
              }
            }
          }else{
            for (let i = 0; i < fileListBox.length; i++) {
              for (let j = 0; j < fileCheckbox.length; j++) {
                if (
                  JSON.stringify(fileListBox[i]).indexOf(
                    '"id":' + fileCheckbox[j]
                  ) !== -1
                ) {
                  fileListBox.splice(i, 1);
                }
              }
            }
          }
          // 重置选中状态
          _this.resetCheckedStyle();
          _this.$messageSuccess("删除成功");
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
      this.closeDialog("delFileBox");
    },
    // 鼠标移入事件
    showCheckbox(ev) {
      ev.currentTarget.classList.add("showCheckbox");
    },
    // 鼠标移出事件
    hideCheckbox(ev) {
      ev.currentTarget.classList.remove("showCheckbox");
    },
    // 选中状态
    isCheckedFun(index) {
      let fileItem = document.querySelectorAll(".file_item")[index];
      if (fileItem.childNodes[0].childNodes[0].childNodes[1].checked) {
        this.isCheckedNum += 1;
        this.isClick = true;
        fileItem.classList.add("isChecked");
        if(fileItem.children[1].title == "folder"){
          this.linkFileFlag += 1;
        }
      } else {
        this.isCheckedNum -= 1;
        // fileItem.classList.add("showCheckbox");
        fileItem.classList.remove("isChecked");
        if(fileItem.children[1].title == "folder"){
          this.linkFileFlag -= 1;
        }
      }
    },
    // 文件上传成功后的回调
    uploadFileSuccess(file) {
      let _this = this,
        params = {
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          draftName: _this.draftName,
          parentId: _this.parentId,
          draftType: 2,
          fileUrl: file.data.fileDir,
          fileName: file.data.fileName
        };

      if (_this.FileZindex) {
        params.parentId = _this.holderId;
      }

      _this.$http
        .post("/api/reportDraft/saveReportDraft", params)
        .then(function(res) {
          _this.getFiles()
          // if (_this.FileZindex) {
          //   _this.subFileList = res.data;
          // } else {
          //   _this.fileList = res.data;
          // }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 进入子级
    goToChild(id) {
      let _this = this;
      _this.holderId = id;
      // _this.parentId = id;
      _this.FileZindex = true;
      _this.getFiles();
      // _this.$http
      //   .post("/api/reportDraft/findReportDraftFile", {
      //     projectId: _this.$store.state.projectId,
      //     investorId: _this.$store.state.investorId,
      //     id: id
      //   })
      //   .then(function(res) {
      //     _this.showAddFlag = true;
      //     _this.subFileList = res.data;
      //   })
      //   .catch(function(error) {
      //     _this.$messageError(error);
      //   });
      // _this.resetCheckedStyle();
    },
    // 打开弹窗
    showDialog(refName) {
      this.$refs[refName].showDialog();
    },
    // 关闭弹窗
    closeDialog(refName) {
      this.$refs[refName].closeDialog();
    },
    // 重置选中样式
    resetCheckedStyle() {
      let fileItem = document.querySelectorAll(".file_item");
      for (let i = 0; i < fileItem.length; i++) {
        fileItem[i].classList.remove("isChecked");
        // fileItem[i].classList.remove("showCheckbox");
      }
      this.isCheckedNum = 0;
      this.checkedList = [];
      this.subCheckedList = [];
      this.thisFileId = '';
      this.linkFileFlag = 0;
    },
    // 显示已经关联的资产
    showOnLinkList(id){
      this.$http.post('/api/reportDraft/report/fileShow/reverse',{
        investorId : this.$store.state.investorId,
        reportIds : id,
        projectId : this.$store.state.projectId
      }).then(res => {
        this.reportId = id;
        this.associated = res.data;
      }).catch(err => {
        this.$messageError(err);
      })
    },
    // 关联
    onLink(id){
      if(id){
        this.linkIdStr = id;
      }else{
        this.linkIdStr = this.checkedList.join(",") || this.subCheckedList.join(",");
      }
      //打开关联资产弹窗【将linkIdStr的值传入子组件即可】
      this.$refs.association.relation(this.linkIdStr,this.consultArr)
    },
    // 取消关联
    disassociate(index,id,item){
      this.$http.post('/api/reportDraft/report/File/update',{
        fileIds : id,
        reportIds : this.reportId + ''
      }).then(res => {
        this.associated.splice(index,1);
        item.reportCount=item.reportCount-1;
      }).catch(err => {
        this.$messageError(err);
      })
    },
  },
  watch: {
    FileZindex() {
      this.$emit("fileZindex", this.FileZindex);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.manuscript{
  // position: relative;
  width: 100%;
  height: 100%;
}
.manuscript_left {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid #ececec;
  padding: 15px 10px;
  /deep/ .el-scrollbar {
    height: 100%;
    .is-current > .el-tree-node__content{
      background-color:#EDF5FF;
    }
  }
}
.manuscript_right {
  position: absolute;
  left: 290px;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid #ececec;
  .file_title {
    background-color: #fafafa;
    border-bottom: 1px solid #ececec;
    line-height: 35px;
    box-sizing: border-box;
    height: 35px;
    .backFolder:hover {
      i {
        color: #3a80ec !important;
      }
    }
    .el-button {
      font-size: 13px;
      margin: 0 10px 0 0;
      color: #262628;
      transition: all 0.2s ease;
      padding: 0;
      i {
        font-size: 16px;
        color: #c0c0c0;
        transition: all 0.2s ease;
      }
      &:hover {
        color: #3a80ec;
        transition: all 0.2s ease;
        i {
          color: #3a80ec;
          transition: all 0.2s ease;
        }
      }
    }
  }
  .file_box {
    padding: 5px;
    position: absolute;
    top: 35px;
    bottom: 0;
    width: 100%;
    .file_item {
      display: block;
      width: 107px;
      height: 125px;
      margin: 5px;
      text-align: center;
      border-radius: 5px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      float: left;
      transition: all 0.2s ease;
      .el-checkbox {
        position: absolute;
        left: 5px;
        top: 5px;
        opacity: 0;
        transition: all 0.2s ease;
      }
      .linkNum{
        position:absolute;
        right:5px;
        top:5px;
        background-color:#FFAA29;
        color:#fff;
        font-size:12px;
        border-radius:10px;
        display:block;
        padding:2px 5px;
        &.noLink{ background-color:#d3d3d3;}
      }
      .icon_box {
        // padding: 9px 11px 0;
        margin-bottom:10px;
        position: relative;
        width: 107px;
        height: 94px;
        box-sizing:border-box;
        border: 1px solid #E5E5E5;
        overflow: hidden;
        line-height: 84px;
        display: flex;
        justify-content: center;
        align-items: center;
        >i {
          font-size: 50px;
        }
        .link-hover{ background-color:rgba(0,0,0,0.5); height:20px; padding:0 10px; box-sizing: border-box; line-height:20px; position:absolute; bottom:-20px; left:0; right:0;transition: all 0.2s ease;
          i{ color:#fff;}
        }
        img{ max-height:100%; max-width:100%;}
      }
      &:hover .link-hover{
        bottom:0;
        transition: all 0.2s ease;
      }
      a {
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        width: 100px;
        margin: 0 auto;
        height: 18px;
        line-height:18px;
      }
      &.showCheckbox {
        // border-color: #f1f5fa;
        // background-color: #f1f5fa;
        // transition: all 0.2s ease;
        .el-checkbox {
          opacity: 1;
          transition: all 0.2s ease;
        }
      }
      &.isChecked {
        // border-color: #90c3fd;
        // background-color: #f1f5fa;
        .el-checkbox {
          opacity: 1;
        }
      }
      .upload_icon {
        width: 55px;
        height: 55px;
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
    }
  }
  .empty_box{
    padding: 5px;
    position: absolute;
    top: 35px;
    bottom: 0;
    width: 100%;
    font-size: 13px;
    padding-left:10px;
    padding-top: 10px;
  }
}
/deep/ .el-checkbox__label {
  display: none;
}
/deep/ .el-tree-node__label {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
  margin-right: 5px;
}
/deep/ .el-input__inner {
  line-height: 35px !important;
  height: 35px !important;
}
.del_content {
  min-height: 50px;
}
.file_item /deep/ .el-upload-list {
  display: none;
}
.associatedTitle{ font-weight:bold; font-size:14px; padding-left:10px; position: relative; margin-bottom:5px; display:block;
  &::before{ position:absolute; left:0; top:8px; width:6px; height:6px; background-color:#FFAA29; border-radius:50%; display:block; content:'';}
}
.associatedTable{width:370px; box-sizing:border-box;
  /deep/ .el-table__body-wrapper td{ height:20px; font-size:12px;
    >div{ color:#6A6A6A;}
  }
  /deep/ .el-table__header-wrapper thead tr,
  /deep/ .el-table__header-wrapper thead th,
  /deep/ .el-table__header-wrapper .has-gutter tr,
  /deep/ .el-table__header-wrapper .has-gutter th{ height:20px !important; font-size:12px;}
}
</style>
