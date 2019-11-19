<template>
    <div class="zlpg-home">
        <!-- 初始化 -->
        <div class="workBox">
            <el-row :gutter="10">
                <el-col :span="12" style="padding-top:15px;">
                    <div v-for="(taskItem,i) in workJsonData.processTaskList" :key="i" v-if="i > 0">
                        <span v-if="i == workJsonData.processTaskList.length-1" class="gray" :data-id="taskItem.id" :data-taskKey="taskItem.taskKey"><i class="iconfont icon-jieshu"></i><em :title="taskItem.taskName">{{taskItem.taskName}}</em></span>
                        <span v-else @click="dialogFun(taskItem,workJsonData.id)"><i class='iconfont icon-renyuan'></i><em :title="taskItem.taskName">{{taskItem.taskName}}</em></span>
                        <b @click="addBranch" v-if="i < workJsonData.processTaskList.length-1" :form-node="workJsonData.processFlowList[i].source" :to-node="workJsonData.processFlowList[i].target" class="line"></b>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form ref="workFlowObj" :model="workJsonData" :rules="workFlowRules" label-width="90px" class="addNode_box text-left addNode_boxTop">
                        <el-form-item label="表单类型：">
                            <el-select v-model="workFormType" placeholder="请选择表单类型" size="mini" v-if="workJsonData.isPublish == 0">
                                <el-option v-for="item in workTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                            <el-input v-else placeholder="请输入表单类型" v-model="workFormType" readonly size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="流程名称：" prop="processName">
                            <el-input placeholder="请输入流程名称" v-model="workJsonData.processName" :readonly="workJsonData.isPublish==0 ? false : 'readonly'" size="mini"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="流程Key：">
                            <el-input placeholder="请输入流程Key" v-model="workJsonData.processKey" :readonly="workJsonData.isPublish==0 ? false : 'readonly'"  size="mini"></el-input>
                        </el-form-item> -->
                        <el-form-item class="text-right">
                            <el-button type="primary" @click="updateWorkFlow('workFlowObj')" v-if="workJsonData.isPublish == 0" size="mini">保存</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <!-- 操作弹窗 -->
        <ul class="dialogWork" v-show="dialogWorkFlag" v-if="workJsonData.isPublish==0">
            <li @click="addChildNode(taskId,definitionId)"><i class="el-icon-circle-plus"></i>添加节点</li>
            <li @click="addChildNode(taskId,definitionId,'编辑节点')"><i class="el-icon-edit"></i>编辑节点</li>
            <li @click="delDialogFun" v-if="isDel"><i class="el-icon-delete"></i>删除节点</li>
        </ul>
        <ul class="dialogWork" v-show="dialogWorkFlag" v-else>
            <li @click="addChildNode(taskId,definitionId,'查看节点')"><i class="el-icon-edit"></i>查看节点</li>
        </ul>

        <!-- 添加、编辑节点 -->
        <center-dialog ref="addOrEdit" :dialogTitle="dialogTitle" dialogWidth='400px' dialogHeight="395px">
            <div slot="dialogContent">
                <el-form ref="addOrEditForm" :rules="addOrEditRules" :model="addOrEditForm" label-width="90px" class="addNode_box">
                    <el-form-item label="节点名称：" prop="taskName">
                        <el-input placeholder="请输入节点名称" v-model="addOrEditForm.taskName" size="mini" :readonly="workJsonData.isPublish==0?false:'readonly'"></el-input>
                    </el-form-item>
                    <div v-if="taskObjFlag">
                        <el-form-item label="执行角色：" prop="executeJuese">
                            <el-input type="textarea" placeholder="请选择执行角色" v-model="addOrEditForm.executeJuese" v-if="workJsonData.isPublish==0" @focus="getPersonList" readonly size="mini"></el-input>
                            <el-input type="textarea" placeholder="请选择执行角色" v-model="addOrEditForm.executeJuese" v-else readonly size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="执行人：" prop="shrNames">
                            <el-input type="textarea" placeholder="请选择执行人" v-model="addOrEditForm.shrNames" readonly size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="执行模式：">
                            <el-radio-group name="pattern" v-model="addOrEditForm.pattern" size="mini" :disabled="workJsonData.isPublish==0?false:'disabled'">
                                <el-radio-button :label="0">单人执行</el-radio-button>
                                <el-radio-button :label="1">全体执行</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <!-- <el-form-item label="结束条件：" v-if="addOrEditForm.conditionFlag">
                            <el-radio-group name="condition" v-model="addOrEditForm.condition" size="mini">
                                <el-radio-button :label="0">一票否决</el-radio-button>
                                <el-radio-button :label="1">处理结果大于50%</el-radio-button>
                            </el-radio-group>
                        </el-form-item> -->
                        <el-form-item label="回退类型：" :prop="addOrEditForm.backType==1 ? 'backType' : ''">
                            <el-radio-group name="BackType" v-model="addOrEditForm.backType" size="mini" v-if="workJsonData.isPublish==0">
                                <el-radio-button @click.native="BackNodeFun(0)" :label="0">流程中自定义</el-radio-button>
                                <el-radio-button @click.native="BackNodeFun(1)" :label="1">退回指定节点</el-radio-button>
                            </el-radio-group>
                            <el-radio-group name="BackType" v-model="addOrEditForm.backType" size="mini" v-else disabled>
                                <el-radio-button :label="0">流程中自定义</el-radio-button>
                                <el-radio-button :label="1">退回指定节点</el-radio-button>
                            </el-radio-group>
                            <el-select class="marginTop10" v-model="addOrEditForm.backNode" placeholder="请选择回退节点" size="mini" v-if="addOrEditForm.isBackFlag" :disabled="workJsonData.isPublish==0?false:'disabled'">
                                <el-option v-for="item in addOrEditForm.backNodeList" :key="item.id" :label="item.taskName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="submitWorkFlow('addOrEditForm')" v-if="workJsonData.isPublish==0" size="mini">确定</el-button>
                        <el-button @click="closeDialog('addOrEdit')" size="mini">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </center-dialog>

        <!-- 删除节点提示信息 -->
        <center-dialog ref="delNode" dialogWidth="300px" dialogHeight="160px" titlePosition="left">
            <div slot="dialogContent">
                <div class="del_content">确认删除当前节点？</div>
                <div class="text-center">
                    <a class="search-btn" @click="removeNode">确定</a>
                    <a class="reset-btn" @click="closeDialog('delNode')">取消</a>
                </div>
            </div>
        </center-dialog>

        <!-- 删除流程提示信息 -->
        <center-dialog ref="delWorkflow" dialogWidth="300px" dialogHeight="160px" titlePosition="left">
            <div slot="dialogContent">
                <div class="del_content">确认删除当前流程？</div>
                <div class="text-center">
                    <a class="search-btn" @click="removeWorkflow">确定</a>
                    <a class="reset-btn" @click="closeDialog('delWorkflow')">取消</a>
                </div>
            </div>
        </center-dialog>

        <!-- 选择执行人 -->
        <center-dialog ref="selectPerson" dialogTitle="选择执行人" dialogWdith="400px" dialogHeight="470px">
            <div slot="dialogContent">
                <el-tabs tab-position="left" v-model="taskAuthority" @tab-click="handleClick">
                    <el-tab-pane label="人员" name="1">
                        <div>
                            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" class="marginBottom10"></el-input>
                            <div class="tree_content treeList padding10">
                                <el-scrollbar>
                                    <el-tree :default-expanded-keys="expandedKeys" :default-checked-keys="addOrEditForm.executePersonList" node-key="value" :expand-on-click-node="false" :props="defaultProps" show-checkbox :data="treeData" :filter-node-method="filterNode" ref="treeData"></el-tree>
                                </el-scrollbar>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="角色" name="2">
                        <div class="tab_content padding10">
                            <el-scrollbar>
                                <el-checkbox-group v-model="jueseSelect">
                                    <el-checkbox v-for="(juese,index) in jueseList" :label="juese.id" :key="index">{{juese.roleName}}</el-checkbox>
                                </el-checkbox-group>
                            </el-scrollbar>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="岗位" name="3">
                        <div class="tab_content padding10" v-if="gangweiList.length != 0">
                            <el-scrollbar>
                                <el-checkbox-group v-model="gangweiSelect">
                                    <el-checkbox v-for="(gangwei,index) in gangweiList" :label="gangwei.id" :key="index">{{gangwei.postName}}</el-checkbox>
                                </el-checkbox-group>
                            </el-scrollbar>
                        </div>
                        <div class="tab_content padding10 text-center fs13" v-else>暂无岗位信息</div>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="自定义" name="4">
                        <div class="tab_content text-center padding10 fs13">请在业务中选择执行人</div>
                    </el-tab-pane> -->
                </el-tabs>
                <div class="marginTop10 text-center">
                    <el-button type="primary" @click="getNodeObj" size="mini">确定</el-button>
                    <el-button @click="closeDialog('selectPerson')" size="mini">取消</el-button>
                </div>
            </div>
        </center-dialog>
    </div>
</template>

<script>
import centerDialog from "../../../components/centerDialog";
export default {
  name: "workflow",
  data() {
    return {
      workJsonData: this.$store.state.dataObj.workJsonData, //流程图数据
      workTypeList: window.commonOriginalData.formId,
      workFormType:
        window.commonData["formId"][
          this.$store.state.dataObj.workJsonData.formId
        ],
      dialogWorkFlag: false, //操作弹窗
      isDel: false, //当前节点是否可以删除【即是否为初始化的节点】
      taskId: "", //用于提交新增或编辑节点数据
      definitionId: "", //流程图ID
      dialogTitle: "添加节点", //添加编辑节点标题
      // 添加编辑节弹窗中的变量
      addOrEditForm: {
        taskName: "", //节点名称
        shrNames: "", //执行人
        executePersonList: [],
        executeJuese: "",
        pattern: "0", //执行模式
        // condition : "0",            //结束条件
        // isBack : "0",               //可否回退
        backNode: "", //回退的节点
        backNodeList: "", //回退的节点列表
        // conditionFlag : false,         //结束条件显示状态
        isBackFlag: false, //回退状态,
        // BackNodeFlag : false,
        backType: "0"
      },
      // 选择执行人
      taskAuthority: "1",
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "data",
        label: "title"
      },
      expandedKeys: [],
      executePersonNameList: [], //执行人名称列表
      defaultData: [],
      jueseList: [],
      jueseSelect: [],
      gangweiList: [],
      gangweiSelect: [],
      taskObjFlag: true,
      addOrEditRules: {
        taskName: [
          { required: true, message: "请输入节点名称", trigger: "blur" }
        ],
        executeJuese: [{ required: true, message: "请选择执行角色" }],
        shrNames: [{ required: true, message: "请选择执行人" }],
        backType: [{ required: true, message: "请选择回退节点" }]
      },
      workFlowRules: {
        processName: [
          { required: true, message: "请输入流程名称", trigger: "blur" }
        ]
      },
      newBuild: false
    };
  },
  components: { centerDialog },
  watch: {
    filterText(val) {
      this.$refs.treeData.filter(val);
    }
  },
  created() {
    this.defaultData = JSON.parse(JSON.stringify(this.$data.addOrEditForm));
  },
  mounted() {
    document.addEventListener("click", this.closeosDia);
  },
  methods: {
    // 关闭才做弹窗
    closeosDia(e) {
      var btn = document.querySelector(".dialogWork li");
      if (btn && !btn.contains(event.target)) {
        this.dialogWorkFlag = false;
      }
    },
    // 关闭弹窗
    closeDialog(refName) {
      this.$refs[refName].closeDialog();
    },
    // 操作弹窗
    dialogFun: function(taskItem, definitionId, event) {
      var e = window.event || event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      this.definitionId = definitionId;
      this.isDel = taskItem.isEdit == "0" ? false : true;
      this.taskId = taskItem.id;

      if (this.workJsonData.isPublish == "1" && !this.isDel) {
        this.dialogWorkFlag = false;
      } else {
        this.dialogWorkFlag = true;
      }

      document.querySelector(".dialogWork").style.top =
        e.currentTarget.offsetTop + 10 + "px";
    },
    // 添加编辑节点
    addChildNode: function(id, definitionId, title) {
      var _this = this;
      if (!title) {
        _this.newBuild = true;
      } else {
        _this.newBuild = false;
      }
      _this.$data.addOrEditForm = Object.assign(
        _this.$data.addOrEditForm,
        _this.defaultData
      );
      _this.dialogTitle = title;
      _this.dialogWorkFlag = false;
      /*#######################设置回退节点#########################*/
      // var backNodeStr = '';
      _this.$http
        .post("/api/processDefinition/returnNode", {
          taskId: _this.taskId,
          operaType: _this.dialogTitle == "编辑节点" ? "update" : "save"
        })
        .then(function(res) {
          _this.addOrEditForm.backNodeList = res.data;
          _this.$refs.addOrEdit.showDialog();
          // 判断是否编辑功能，回显值
          if (title == "编辑节点" || title == "查看节点") {
            _this.taskObjFlag = false;
            if (
              (_this.workJsonData.isPublish != "1" && _this.isDel) ||
              title == "查看节点"
            ) {
              _this.taskObjFlag = true;
            }
            _this.$http
              .post("/api/processDefinition/findNodeById", {
                taskId: _this.taskId
              })
              .then(function(res) {
                var editObj = res.data;
                _this.taskAuthority = editObj.taskAuthority;
                _this.addOrEditForm.taskName = editObj.taskName;
                _this.addOrEditForm.executeJuese = editObj.taskUserQxNames;
                _this.addOrEditForm.shrNames = editObj.shrNames;
                _this.addOrEditForm.pattern = editObj.exexuteModel;
                // _this.addOrEditForm.condition = editObj.overCondition;
                _this.addOrEditForm.executePersonList = editObj.taskUserQxId
                  .split(",")
                  .map(Number);
                _this.addOrEditForm.backNode = Number(editObj.returnNode) || "";
                _this.addOrEditForm.backType = editObj.goBackType;
                // _this.addOrEditForm.conditionFlag = editObj.exexuteModel==0 ? false : true;
                _this.addOrEditForm.isBackFlag =
                  editObj.goBackType == 0 ? false : true;
                _this.addOrEditForm.BackNodeFlag =
                  editObj.isGoBack == 0 ? false : true;
                _this.jueseSelect = editObj.taskUserQxId.split(",").map(Number);
                _this.gangweiSelect = editObj.taskUserQxId
                  .split(",")
                  .map(Number);
              })
              .catch(function(error) {
                _this.$messageError(error);
              });
          } else {
            _this.taskObjFlag = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // getPinYin:function(){
    //     var _this = this;
    //     _this.$http.post("/api/processDefinition/chinaToEn",{
    //         chinaStr : _this.workJsonData.processName
    //     }).then(function(res){
    //         _this.workJsonData.processKey = res.data;
    //     })
    // },
    // 设置分支条件【预留】
    addBranch: function() {},
    // 删除确认弹窗
    delDialogFun() {
      this.$refs.delNode.showDialog();
    },
    // 删除节点
    removeNode: function() {
      var _this = this;
      _this.$http
        .post("/api/processDefinition/deleteNode", {
          processTaskId: _this.taskId
        })
        .then(function(res) {
          _this.closeDialog("delNode");
          _this.workJsonData = res.data;
          _this.$messageSuccess("节点删除成功");
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    },
    // 执行人列表
    getPersonList: function() {
      var _this = this;
      if (_this.newBuild) {
        _this.taskAuthority = "1";
        _this.jueseSelect = [];
        _this.gangweiSelect = [];
      }
      _this.$refs.selectPerson.showDialog();
      if (_this.taskAuthority == "1") {
        _this.$http
          .post("/api/sysgroup/getGroupAndUserTree")
          .then(function(res) {
            _this.treeData = res.data;
            _this.expandedKeys.splice(0, 1, res.data[0].value);
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else if (_this.taskAuthority == "2") {
        _this.$http
          .post("/api/sysrole/getRoleListByGroupId")
          .then(function(res) {
            _this.jueseList = res.data;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else if (_this.taskAuthority == "3") {
        _this.$http
          .post("/api/sysPost/getPostByCompanyId")
          .then(function(res) {
            _this.gangweiList = res.data;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      }
    },
    //确定按钮执行方法
    submitWorkFlow: function(formName) {
      var _this = this,
        url = "";
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.dialogTitle == "编辑节点") {
            url = "/api/processDefinition/updateNode";
          } else {
            url = "/api/processDefinition/saveNode";
          }
          _this.$http
            .post(url, {
              id: _this.taskId,
              taskName: _this.addOrEditForm.taskName,
              definitionId: _this.definitionId,
              exexuteModel: _this.addOrEditForm.pattern,
              // isGoBack : _this.addOrEditForm.isBack,
              taskAuthority: _this.taskAuthority, //权限类型    1：用户   2：角色  3：岗位
              taskUserQxId: this.addOrEditForm.executePersonList.join(","), //权限类型ID
              returnNode: _this.addOrEditForm.backNode || "",
              // overCondition : _this.addOrEditForm.condition,
              goBackType: _this.addOrEditForm.backType
            })
            .then(function(res) {
              if (res.code == 200) {
                _this.workJsonData = res.data;
                _this.closeDialog("addOrEdit");
              } else {
                _this.$messageError(res.msg);
              }
            })
            .catch(function(error) {
              _this.$messageError(error);
            });

          _this.addOrEditFlag = false;
        } else {
          return false;
        }
      });
    },
    //执行人搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    handleClick(tab) {
      var _this = this;
      this.taskAuthority = tab.name;
      if (tab.name == "2") {
        _this.$http
          .post("/api/sysrole/getRoleListByGroupId")
          .then(function(res) {
            _this.jueseList = res.data;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      } else if (tab.name == "3") {
        _this.$http
          .post("/api/sysPost/getPostByCompanyId")
          .then(function(res) {
            _this.gangweiList = res.data;
          })
          .catch(function(error) {
            _this.$messageError(error);
          });
      }
    },
    // 获取执行人
    getNodeObj: function() {
      var _this = this;
      // this.executePersonList = this.$refs.treeData.getCheckedNodes();
      this.addOrEditForm.executePersonList = [];
      // this.executePersonNameList = [];
      if (this.taskAuthority == "1") {
        for (var i in this.$refs.treeData.getCheckedNodes()) {
          if (!this.$refs.treeData.getCheckedNodes()[i].isDept) {
            this.addOrEditForm.executePersonList.push(
              this.$refs.treeData.getCheckedNodes()[i].value
            );
          }
        }
      } else if (this.taskAuthority == "2") {
        this.addOrEditForm.executePersonList = this.jueseSelect;
      } else {
        this.addOrEditForm.executePersonList = this.gangweiSelect;
      }

      if (this.addOrEditForm.executePersonList.length != 0) {
        _this.$http
          .post("/api/processDefinition/findUserRolePost", {
            taskAuthority: _this.taskAuthority,
            taskUserQxId: _this.addOrEditForm.executePersonList.join(",")
          })
          .then(function(res) {
            if (res.data.shrNames != "") {
              _this.addOrEditForm.executeJuese = res.data.taskUserQxNames;
              _this.addOrEditForm.shrNames = res.data.shrNames;
              _this.closeDialog("selectPerson");
            } else {
              _this.$messageError("暂无人员");
            }
          });
      } else {
        _this.$messageError("暂无人员");
      }
    },
    //编辑流程信息
    updateWorkFlow(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$http
            .post("/api/processDefinition/updateProcess", {
              formId: _this.workJsonData.formId,
              processName: _this.workJsonData.processName,
              processKey: _this.workJsonData.processKey,
              id: _this.workJsonData.id
            })
            .then(function(res) {
              _this.jueseList = res.data;
              _this.$store.state.refresh();
            });
        } else {
          return false;
        }
      });
    },
    // 回退类型
    BackNodeFun: function(id) {
      if (id == "1") {
        this.addOrEditForm.isBackFlag = true;
      } else {
        this.addOrEditForm.isBackFlag = false;
      }
    },
    // 发布流程
    childMethod: function() {
      var _this = this;
      _this.$http
        .post("/api/processDefinition/releaseProcess", {
          id: _this.workJsonData.id
        })
        .then(function(res) {
          _this.$messageSuccess("流程发布成功");
          _this.$store.state.refresh();
          _this.$store.commit("changeShowCommon");
          // _this.$emit("childRefreshPage");
        });
    },
    // 删除流程[打开弹窗]
    extraChildMethod: function() {
      // var _this = this;
      // _this.$http.post("/api/processDefinition/deleteProcess",{
      //     id : _this.workJsonData.id
      // }).then(function(res){
      //     _this.$messageSuccess("删除成功");
      //     _this.$store.state.refresh();
      //     _this.$store.commit('changeShowCommon');

      // })
      this.$refs.delWorkflow.showDialog();
    },
    // 删除流程确定按钮方法
    removeWorkflow() {
      var _this = this;
      _this.$http
        .post("/api/processDefinition/deleteProcess", {
          id: _this.workJsonData.id
        })
        .then(function(res) {
          _this.$messageSuccess("删除成功");
          _this.$store.state.refresh();
          _this.$store.commit("changeShowCommon");
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-con {
  background: #fff;
  margin-top: 10px;
}
/*此处应用的样式*/
.workBox {
  text-align: center;
  margin: 10px;
}
.dialogWork {
  display: flex;
  justify-content: center;
  align-items: center;
}
.workBox span {
  display: inline-block;
  text-align: center;
  line-height: 30px;
  width: 60px;
  font-size: 12px;
  height: 80px;
  cursor: pointer;
}
.workBox b.line {
  height: 20px;
  width: 3px;
  background-color: #ccc;
  margin-top: 29px;
  cursor: pointer;
  display: block;
  margin: 0 auto 10px;
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
  width: 200px;
  left: 103px;
  margin: auto;
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
  margin-bottom: 5px;
}

/*hide*/
.hide {
  display: none;
}

/deep/ .el-form-item__content,
/deep/ .el-form-item__label {
  line-height: 30px;
}
/deep/ .el-form-item {
  margin-bottom: 15px;
}
/deep/ .el-input.el-input--mini .el-input__inner {
  height: 30px !important;
}
/deep/ .el-textarea__inner {
  padding-left: 5px;
}
/deep/ .el-select {
  width: 100%;
}

.tree_content {
  border: 1px solid #ececec;
  position: relative;
  box-sizing: border-box;
}
.treeList {
  overflow: hidden;
}
/deep/ .el-tabs--left .el-tabs__header.is-left,
.tab_content {
  height: 348px;
}
.tree_content {
  height: 308px;
}
.tab_content {
  box-sizing: border-box;
  border: 1px solid #ececec;
}
/deep/ .el-scrollbar {
  height: 100%;
}
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/ .el-tabs__item {
  padding-left: 0;
  width: 60px;
}
.tab_content .el-checkbox {
  width: 180px !important;
  margin: 5px 0 !important;
}
.del_content {
  height: 52px;
}
/deep/ .el-radio-button__orig-radio:disabled:checked + .el-radio-button__inner {
  background-color: #409eff;
  color: #fff;
}
/deep/ .el-form-item__error {
  padding-top: 2px;
}
.addNode_boxTop{
  position:relative;
  left:-55px;
  top:15px;
}
</style>