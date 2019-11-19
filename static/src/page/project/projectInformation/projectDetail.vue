<template>
  <div class="audit_box">
    <div class="projectDetail-zlpg-content zlpg-content clear pv">
      <div class="zlpg-content-header projectDetail-header">
            <el-tabs class="el-tabs-class" v-model="activeName">
                <i class="iconfont icon-xiangmuxinxi"></i>
                <el-tab-pane name="first">
                    <span class="first-tab-pane" slot="label">基本信息</span>
                    <el-scrollbar class="el-scrollbar" :style="navStyle">
                        <projectmessage v-if="activeName=='first'"></projectmessage>
                    </el-scrollbar>
                </el-tab-pane>
                <template v-if="JSON.parse($getCookie('user')).isExternal != true">
                  <el-tab-pane label="独立性自查" name="second">
                    <el-scrollbar class="el-scrollbar" :style="navStyle">
                        <projectindependent v-if="activeName=='second'"></projectindependent>
                    </el-scrollbar>
                  </el-tab-pane>
                  <el-tab-pane label="项目计划" name="third">
                      <el-scrollbar class="el-scrollbar" :style="navStyle">
                          <projectplan v-if="activeName=='third'"></projectplan>
                      </el-scrollbar>
                  </el-tab-pane>
                  <el-tab-pane label="项目预算" name="fourth">
                      <el-scrollbar class="el-scrollbar" :style="navStyle">
                          <projectbudget v-if="activeName=='fourth'"></projectbudget>
                      </el-scrollbar>
                  </el-tab-pane>
                </template>
            </el-tabs>
        </div>
      <center-dialog ref="selectPerson" :dialogTitle="`选择${popupTitle}人`" dialogHeight="450px" dialogWidth="450px">
        <div slot="dialogContent">
          <div class="popupBody-container">
            <div class="border-container">
              <div class="popup-list">
                <el-scrollbar :style="{'height': popupData.length>=9 ? '292px':'100%'}" :noresize="false">
                  <el-table ref="popupTable" :data="popupData" border stripe style="width: 100%">
                    <el-table-column  v-for="(item,index) in dataTableHead" v-if="item.title == '全选'" type="selection" :width="item.width" :key="index"></el-table-column>
                    <el-table-column  v-for="(item,index) in dataTableHead" v-if="item.title !== '全选'" :width="item.width" :label="item.title" :prop="item.name" :key="index"></el-table-column>
                  </el-table>
                </el-scrollbar>
              </div>
              <p class="seleRetrialIssuerTitle">
                <span>其他</span>
                <el-input v-model="showOtherName" @focus="popupIpt('user')" style="width:140px;" placeholder="请选择"></el-input>
              </p>
            </div>
          </div>
          <div class="popupBtn-container">
            <a class="search-btn" @click="popupConfirm">确认</a>
            <a class="reset-btn" @click="popupClose">取消</a>
          </div>
        </div>
      </center-dialog>
      <persons-dialog ref="selectPersonsProject" v-on:setPersonId="setPersonId"></persons-dialog>
    </div>
    <div class="nav-container" v-if="isShow">
      <el-collapse v-model="collapseName">
        <el-collapse-item name="1">
          <div class="nav-style">
            <!--<nav-list :navoptions="tabOptions"></nav-list>-->
            <el-tabs v-model="navName" @tab-click="navHandleClick">
              <el-tab-pane label="复审分配" name="first"></el-tab-pane>
              <el-tab-pane label="签发分配" name="second"></el-tab-pane>
            </el-tabs>
            <span v-if="!showBtn" class="redWarning">{{toolTip ? '('+ toolTip + ')' : '' }}</span>
          </div>
          <div class="body">
            <div class="content">
              <div class="ipt-container">
                <span class="name">{{ navTabOptions[count].label }}</span>
                <el-input v-model="iptName" class="ipt ipt-25h" @focus="iptEvent('user')" :disabled="!showBtn"></el-input>
              </div>
              <div class="ipt-container">
                <span class="name">{{ navTabOptions[count].textLabel }}</span>
                <el-input v-model="textInput" class="ipt ipt-50h" type="textarea"></el-input>
              </div>
            </div>
            <div class="btn-container" v-if="showBtn">
              <a class="search-btn" @click="confirmEvent">{{isChange? "确认修改" : "确认提交"}}</a>
              <a class="reset-btn" @click="cancelEvent">取消</a>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import projectindependent from "../projectApproval/projectIndependent";
import projectplan from "../projectApproval/projectPlan";
import projectbudget from "../projectApproval/projectBudget";
import projectmessage from "../projectApproval/projectMessage";
import personsDialog from "@/components/personsDialog";
import CenterDialog from "@/components/centerDialog";

export default {
  name: "projectDetail",
  components: {
    projectindependent,
    projectplan,
    projectbudget,
    projectmessage,
    personsDialog,
    CenterDialog
  },

  data() {
    return {
      navTabOptions: [
        {
          label: "签发人：",
          textLabel: "签发备注："
        },
        {
          label: "复审人：",
          textLabel: "复审备注："
        }
      ],

      collapseName: ["1"],
      popupData: [],
      checkList: [],
      userId: [],
      userName: [],
      secondIdList: [],
      secondNameList: [],
      userIdList: [],
      userNameList: [],
      issueUserIdList: [],
      auditUserIdList: [],
      issueUserNameList: [], //签发
      auditUserNameList: [], //复审
      //初始人员数据，用来判断按钮文本是提交还是修改
      initIssueUser: [],
      initAuditUser: [],
      updateList: function() {},

      height: "",
      top: "",
      radio: "",
      popupTitle: "",
      activeName: "first",
      navName: "first",
      textInput: "",
      auditComment: '',
      signComment: '',
      count: 1,
      mask: false,
      isShow: false,
      showBtn: true,
      personFlag: false,
      dataTableHead:[//复审签发弹窗表头
        {
          title:"全选",
          name:"",
          width:"80"
        },
        {
          title:"姓名",
          name:"userName",
          width:"164"
        },
        {
          title: "当前复审任务",
          name:"taskCount",
          width:"163"
        },
      ],

      toolTip: ''

    };
  },

  computed: {
    //复审签发显示隐藏上方内容过渡效果样式
    navStyle(){
      return {height:this.height,transition:'height .2s linear'}
    },
    iptName(){
      const _this = this;
      return this.count ? _this.uniq([..._this.userNameList,..._this.secondNameList]).join() : _this.uniq([..._this.userNameList,..._this.userName]).join()
    },
    showOtherName() {
      return this.count ? this.secondNameList.join() : this.userName.join();
    },
//    checkBoxes() {
//      const _this = this;
//      _this.checkList = [];
//      if (_this.popupData.length) {
//        _this.popupData.forEach((item, index) => {
//          _this.checkList.push({ check: "", id: item.id });
//        });
//      }
//      if (_this.userIdList.length) {
//        _this.userIdList.forEach(id => {
//          _this.checkList.forEach(check => {
//            if (check.id * 1 === id * 1) {
//              check.check = true;
//            }
//          });
//        });

//      }
//      return _this.checkList;
//    },
    isChange() {
      if (this.count) {
        return this.initAuditUser.length;
      } else {
        return this.initIssueUser.length;
      }
    }
  },

  watch:{
    'collapseName'(){
      this.height = this.collapseName.length>0 ? window.innerHeight-334 + "px" : window.innerHeight-168 + "px"
    },
    activeName(){
      if(!/auditing/.test(this.$route.path)) return;
      this.collapseName = '1'
    },
    popupTitle(){ //复审签发表格标题
      this.dataTableHead[2].title = `当前${this.popupTitle}任务`
    }
  },

  created() {
    this.isShow = this.$store.state.dataObj.isShow;
    this.readyMethod(this.count);
    this.updateList = this.$store.state.refresh;
    this.$http.post('/api/reportDistribution/findAuditOrIssueUser', {
      projectId: this.$store.state.projectId
    })
    .then(res=>{
      this.showBtn = res.data.isAuditOrIssueUser === 1;
      if(res.msg && res.msg !== "OK"){
        this.toolTip = res.msg
      }
    })
  },

  mounted() {
    this.$store.state.isScroll = false;
    this.height = (/auditing/g.test(this.$route.path) && this.isShow)
        ? window.innerHeight - 345 + "px"
        : window.innerHeight - 150 + "px";
  },

  methods: {
    navHandleClick(tab) {
      if (tab.label == "签发分配") {
        this.userNameList = [...this.issueUserNameList];
        this.userIdList = [...this.issueUserIdList];
        this.count = 0;
        this.auditComment = this.textInput;
        this.textInput = this.signComment;
      } else {
        this.userNameList = [...this.auditUserNameList];
        this.userIdList = [...this.auditUserIdList];
        this.count = 1;
        this.signComment = this.textInput;
        this.textInput = this.auditComment;
      }
    },

    confirmEvent() {
      if (!this.iptName) {
        this.count === 0
          ? this.$messageError("未选择签发人")
          : this.$messageError("未选择复审人");
        return;
      }
      this.checkPerson();
      if(this.personFlag){
        this.personFlag = false;
        return;
      }
      if(this.count === 0){
        this.signComment = this.textInput;
      }else{
        this.auditComment = this.textInput;
      }
      //获取审核人员传递参数
      const audit = this.uniq([...this.auditUserIdList,...this.secondIdList]).map(userId=>{
        return {
          auditType: 2,
          userId,
          projectId: this.$store.state.projectId,
          comments: this.auditComment
        }
      })
      const sign = this.uniq([...this.issueUserIdList,...this.userId]).map(userId=>{
        return {
          auditType: 3,
          userId,
          projectId: this.$store.state.projectId,
          comments: this.signComment
        }
      })
      let data = {
        reportDistributions: JSON.stringify([...sign, ...audit])
      };
      this.$http
        .post("/api/reportDistribution/saveReportAuditOrIssue", data)
        .then(res => {
          if (res.code === 200) {
            this.cancelEvent();
            this.updateList();
            this.$messageSuccess((this.isChange ? "修改" : "提交") + "成功");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 点击输入框，弹出人选
    iptEvent() {
      const _this = this;
      _this.$refs.selectPerson.showDialog();
      _this.popupTitle = _this.count ? "复审" : "签发";
      let type;
      _this.count === 0 ? (type = "BGQF") : (type = "BGSH");
      let data = {
        type: type
      };
      _this.$http
        .post("/api/reportDistribution/findReportAuditOrIssueList", data)
        .then(res => {
          _this.popupData = res.data;
          let newIdList = [];
          let newIdList1 = [];
          let newNameList = [];
          let newNameList1 = [];
          if (!_this.userId.length || !_this.secondIdList.length) {
            _this.popupData.forEach(data => {
              newIdList = newIdList.concat(
                _this.userIdList.filter(id => id * 1 === data.id * 1)
              );
              newNameList = newNameList.concat(
                _this.userNameList.filter(name => name === data.userName)
              );
            });
            if (_this.count === 0 && !_this.userId.length) {
              newIdList.forEach(id => {
                const index = _this.userIdList.indexOf(id);
                if (index + 1 !== 0) {
                  _this.userIdList.splice(index, 1);
                }
              });
              newNameList.forEach(name => {
                const index = _this.userNameList.indexOf(name);
                if (index + 1 !== 0) {
                  _this.userNameList.splice(index, 1);
                }
              });
              newIdList1 = _this.userIdList;
              newNameList1 = _this.userNameList;
              _this.userNameList = _this.issueUserNameList = newNameList;
              _this.userIdList = _this.issueUserIdList = newIdList;
              _this.userId = [...newIdList1];
              _this.userName = [...newNameList1];
            }
            else if (_this.count === 1 && !_this.secondIdList.length) {
              newIdList.forEach(id => {
                const index = _this.userIdList.indexOf(id);
                if (index + 1 !== 0) {
                  _this.userIdList.splice(index, 1);
                }
              });
              newNameList.forEach(name => {
                const index = _this.userNameList.indexOf(name);
                if (index + 1 !== 0) {
                  _this.userNameList.splice(index, 1);
                }
              });
              newIdList1 = _this.userIdList;
              newNameList1 = _this.userNameList;
              _this.userNameList = _this.auditUserNameList = newNameList;
              _this.userIdList = _this.auditUserIdList = newIdList;
              _this.secondIdList = [...newIdList1];
              _this.secondNameList = [...newNameList1];
            }
          }
          _this.$nextTick(()=>{
            _this.userIdList.forEach(id=>{
              _this.popupData.forEach(item=>{
                if(id*1 === item.id*1){
                  _this.$refs.popupTable.toggleRowSelection(item)
                }
              })
            })
          })

        })
        .catch(err => {
          console.log(err);
        });
    },

    onSubmit() {
      console.log(this.form);
      var _this = this;
      this.$confirm("确认提交本次审核意见?", "提示", {
        confirmButtonText: "确认提交",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api/projectRequest/auditRequest", {
              projectId: this.$store.state.projectId,
              projectNumber: "",
              majorRisk: _this.form.idea,
              setupAuditStatus: _this.form.audit
            })
            .then(function(data) {
              _this.$messageSuccess('提交成功!');
            })
            .catch(function(error) {
              _this.$messageError(error);
            });
        })
        .catch(() => {
          _this.$messageError('已取消提交');
        });
    },

    popupIpt(user) {
      let ids = this.count ? this.secondIdList : this.userId;
      let names = this.count ? this.secondNameList : this.userName;
      this.$refs.selectPersonsProject.showPersonDialog(
        user,
        ids.join(),
        names.join()
      );
    },

    //第一层选人完毕，点击确认
    popupConfirm() {
      this.$refs.selectPerson.closeDialog();
      if (!this.count) {
        this.issueUserIdList = [];
        this.issueUserNameList = [];
        this.$refs.popupTable.store.states.selection.forEach(item=>{
          this.issueUserIdList.push(item.id);
          this.issueUserNameList.push(item.userName)
        });
        this.userIdList = this.issueUserIdList;
        this.userNameList = this.issueUserNameList;
      } else {
        this.auditUserIdList = [];
        this.auditUserNameList = [];
        this.$refs.popupTable.store.states.selection.forEach(item=>{
          this.auditUserIdList.push(item.id);
          this.auditUserNameList.push(item.userName)
        });
        this.userIdList = this.auditUserIdList;
        this.userNameList = this.auditUserNameList;
      }
    },

    //点击取消按钮后，首个弹窗的处理
    popupClose() {
      this.$refs.selectPerson.closeDialog();
    },

    //接收persons多选弹窗数据
    setPersonId(type, name, id) {
      const _this = this;
      if (id.length) {
        if (_this.count) {
          _this.secondIdList = id;
          _this.secondNameList = name;
        } else {
          _this.userId = id;
          _this.userName = name;
        }
      } else {
        _this.userId = [];
        _this.userName = [];
        _this.secondIdList = [];
        _this.secondNameList = [];
      }
    },

    //第一层选人弹窗点击事件
    popupClick(item, event, index) {
      this.checkBoxes[index].check = event;
      if (event) {
        this.userIdList.push(item.id);
        this.userNameList.push(item.userName);
      } else {
        this.userIdList = this.userIdList.filter(id => id * 1 !== item.id);
        this.userNameList = this.userNameList.filter(
          name => name !== item.userName
        );
      }
    },

    // 初次进入页面时
    readyMethod(count) {
      const _this = this;
      let data = {
        projectId: _this.$store.state.projectId
      };
      _this.$http
        .post("/api/reportDistribution/findReportAuditOrIssue", data)
        .then(res => {
          if (res.data.thirdAuditor.length) {
            _this.initIssueUser = _this.issueUserNameList = res.data.thirdAuditor.split(
              ","
            );
            _this.issueUserIdList = res.data.thirdAuditorId.split(",");
          }
          if (res.data.secondAuditor.length) {
            _this.initAuditUser = _this.auditUserNameList = res.data.secondAuditor.split(
              ","
            );
            _this.auditUserIdList = res.data.secondAuditorId.split(",");
          }
          if (count === 0) {
            _this.userNameList = [..._this.issueUserNameList];
            _this.userIdList = [..._this.issueUserIdList];
            _this.textInput = res.data.issueComments.replace(/^\s+|\s+$/g, "");
          } else {
            _this.userNameList = [..._this.auditUserNameList];
            _this.userIdList = [..._this.auditUserIdList];
            _this.textInput = res.data.auditComments.replace(/^\s+|\s+$/g, "");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //取消按钮事件
    cancelEvent() {
      this.$store.commit("changeShowCommon");
    },

    //蓝色按钮——进入项目
    childMethod() {
      this.$store.state.projectId = this.$store.state.dataObj.projectId;
      this.$router.push({
        path: "/zlpg/project/projectCont"
      });
      this.$store.commit("changeShowCommon");
    },
    //复审签发人员选择用数组去重
    uniq(array){
      var temp = []; //一个新的临时数组
      for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
          temp.push(array[i]);
        }
      }
      return temp;
    },

    // 检查人员重复
    checkPerson(){
      console.log(this.uniq([...this.auditUserIdList,...this.secondIdList]), this.uniq([...this.issueUserIdList,...this.userId]))
      this.uniq([...this.auditUserIdList,...this.secondIdList]).forEach(userId=>{
        if(typeof userId === 'number'){
          userId = String(userId);
        }
        if(this.uniq([...this.issueUserIdList,...this.userId]).indexOf(userId) !== -1){
          this.$messageWarning('复选人员与签发人员重复！');
          this.personFlag = true ;
          return
        }
      })
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

