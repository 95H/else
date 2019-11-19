<template>
  <div class="auditingContainer">
    <div class="projectProjectAuditing-zlpg-content zlpg-content clear" style="width:100%;" >
      <div class="zlpg-content-header projectProjectAuditing-header " id="middleDistance">
        <div>
          <!--使用指令v-link进行导航-->
          <el-tabs v-model="activeName1" >
              <!--<span class="title">立项申请</span>-->
            <el-tab-pane label="基本信息" name="first" :style="navStyle">
                <projectmessage></projectmessage>
            </el-tab-pane>
            <el-tab-pane label="独立性自查" name="second" :style="navStyle">
              <projectindependent></projectindependent>
            </el-tab-pane>
            <el-tab-pane label="项目计划" name="third" :style="navStyle">
              <projectplan></projectplan>
            </el-tab-pane>
            <el-tab-pane label="项目预算" name="fourth" :style="navStyle">
              <projectbudget></projectbudget>
            </el-tab-pane>
          </el-tabs>
          <div class="projectAudit" v-if="$store.state.isShowAudit=='1' && false">
            <div class="top">
              <span><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
            </div>
            <div class="content">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="审核结果：">
                  <el-radio-group v-model="form.audit">
                    <el-radio :label="form.agree">通过</el-radio>
                    <el-radio :label="form.disagree">不通过</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="审核意见：">
                  <el-input type="textarea" v-model="form.idea"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确认提交</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="projectAudits" v-if="($store.state.isShowAudit=='0' && auditResult!='') && false">
            <div class="top">
              <span><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
            </div>
            <div class="content">
              <div class="icon"><i class="iconfont" :class="className"></i></div>
              <ul>
                <li><label>审核人员:</label><span>{{auditResult.userName}}</span></li>
                <li><label>审核级别:</label><span>{{auditResult.currentNode}}</span></li>
                <li><label>审核时间:</label><span>{{auditResult.createTime}}</span></li>
                <li><label>审核意见:</label><span>{{auditResult.remarkContent==''?'无':auditResult.remarkContent}}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-container" id="navCon">
        <el-collapse v-model="collapseName">
          <el-collapse-item name="1">
            <div class="nav-style">
              <el-tabs v-model="navName" @tab-click="navHandleClick">
                <el-tab-pane label="复审分配" name="first"></el-tab-pane>
                <el-tab-pane label="签发分配" name="second"></el-tab-pane>
              </el-tabs>
              <span v-if="!showBtn" class="redWarning">{{toolTip ? '('+ toolTip + ')' : '' }}</span>
            </div>
            <div class="body">
          <div class="content">
            <div class="ipt-container" style="justify-content: flex-start;">
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
          </div>
        </div>
          </el-collapse-item>
        </el-collapse>
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
  </div>
</template>
<script>
//  import ProjectDetail from '../projectInformation/projectDetail.vue';
  import projectindependent from '../projectApproval/projectIndependent';
  import projectplan from '../projectApproval/projectPlan';
  import projectbudget from '../projectApproval/projectBudget';
  import projectmessage from '../projectApproval/projectMessage';
  import personsDialog from '@/components/personsDialog';
  import CenterDialog from '@/components/centerDialog';

  export default {
    data() {
      return {
        navTabOptions: [
          {
            label: '签发人：',
            textLabel: '签发备注：'
          },
          {
            label: '复审人：',
            textLabel: '复审备注：'
          }
        ],

        pageOptions: {
          tabOptions: [
            {label: '立项信息', href: "{path:'/test',query: {name: id}}", name: 'first'},
            {label: '独立性自查', href: '', name: 'second'},
            {label: '项目计划', href: '', name: 'third'},
            {label: '项目预算', href: '', name: 'third'}
          ]
        },

        form: {
          audit:'',
          idea:'',
          disagree:'',
          agree:''
        },

        popupData: [],
        popupTitle: '',
        checkList: [],
        userId: [],
        userName: [],
        secondIdList: [],
        secondNameList: [],
        userIdList: [],
        issueUserIdList: [],
        auditUserIdList: [],
        userNameList:[],
        issueUserNameList: [],//签发
        auditUserNameList: [],//复审
        //初始人员数据，用来判断按钮文本是提交还是修改
        initIssueUser:[],
        initAuditUser:[],

        navName: 'first',
        textInput: '',
        auditComment: '',
        signComment: '',
        radioVal: '',
        collapseName: '1',
        activeName1: 'first',
        className:'',
        auditResult:'',
        count: 1,
        showBtn: true,
//        iptName: '',
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

    computed:{
      //复审签发显示隐藏上方内容过渡效果样式
      navStyle(){
        return {height:'100%','margin-bottom':this.collapseName.length ? '166px' : '0',transition:'margin-bottom .2s linear'}
      },
      iptName(){
          const _this = this;
          return this.count ? _this.uniq([..._this.userNameList,..._this.secondNameList]).join() : _this.uniq([..._this.userNameList,..._this.userName]).join()
      },
      showOtherName(){
        return this.count ? this.secondNameList.join() : this.userName.join()
      },
//      checkBoxes(){
//        const _this = this
//        _this.checkList = [];
//        if(_this.popupData.length){
//          _this.popupData.forEach((item, index)=>{
//            _this.checkList.push({check: '',id:item.id})
//          })
//        }
//        if(_this.userIdList.length){
//          _this.userIdList.forEach(id=>{
//            _this.checkList.forEach(check=> {
//              if(check.id*1 === id*1 ){
//                check.check = true
//              }
//            })
//          })
//        }
//        return _this.checkList;
//      },
      isChange(){
        if(this.count){
          return this.initAuditUser.length
        }else {
          return this.initIssueUser.length
        }
      }
    },

    created(){
      this.$http.post('/api/reportDistribution/findAuditOrIssueUser', {
        projectId: this.$store.state.projectId
      })
        .then(res=>{
          this.showBtn = res.data.isAuditOrIssueUser === 1;
          if(res.msg && res.msg !== "OK"){
            this.toolTip = res.msg
//            this.$messageWarning(res.msg);
          }
        })
    },

    mounted(){
      var _this = this;
      _this.readyMethod(_this.count)
      _this.$http.post('/api/projectRequest/getActivityInfo ',{
        projectId:this.$store.state.projectId
      })
        .then(function(data) {
          console.log(data);
          _this.form.audit = data.data.agree;
          _this.form.disagree = data.data.disagree;
          _this.form.agree = data.data.agree;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });

      _this.$http.post('/api/projectRequest/getLatestAuditResults',{
        projectId:this.$store.state.projectId
      })
        .then(function(data){
          if(data.data){
            switch(data.data.processStateId){
              case '1069':
                _this.className='icon-yitongguo';
                break;
              case '1067':
                _this.className='icon-yitongguo';
                break;
              case '1068':
                _this.className='icon-yijujue';
                break;
              case '1070':
                _this.className='icon-yijujue';
                break;
            }
          }
          _this.auditResult = data.data;
        })
        .catch(function(error) {
          _this.$messageError(error);
        });

      _this.$nextTick(()=>{
        let familiarEle = document.getElementById('middleDistance');
        let target = $('#navCon');
        let distance;
        if(target){
          let original_left = parseInt(target.css('left').slice(0, -2));
          $(window).resize(function(){
            distance = familiarEle.getBoundingClientRect().left;
            original_left = distance;
            target.css('left', (distance - $(window).scrollLeft()) + 'px');
          })
          $(window).scroll(function(){
            target.css('left', ( original_left - $(window).scrollLeft()) + 'px');
          })
        }
      })
    },

    beforeDestroy(){
      $(window).off('scroll');
      $(window).off('resize');
    },

    methods: {

      navHandleClick(tab){
        if (tab.label == '签发分配') {
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

      confirmEvent(){
        if(!this.iptName){
          this.count ===0 ? this.$messageError('未选择签发人') : this.$messageError('未选择复审人') ;
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
          .post('/api/reportDistribution/saveReportAuditOrIssue', data)
          .then(res => {
//            this.cancelEvent();
            this.$messageSuccess((this.isChange? "修改" : "提交")+"成功")
          })
          .catch(err => {
            console.log(err)
          })
      },

      iptEvent(){
        const _this = this
        _this.$refs.selectPerson.showDialog();
        _this.popupTitle = _this.count ? '复审' : '签发';
        let type;
        _this.count === 0 ? type = 'BGQF' : type = 'BGSH';
        let data = {
          type: type
        };
        _this.$http
          .post('/api/reportDistribution/findReportAuditOrIssueList', data)
          .then(res => {
            _this.popupData = res.data;
            let newIdList = [];
            let newIdList1 = [];
            let newNameList = [];
            let newNameList1 = [];
            if(!_this.userId.length  || !_this.secondIdList.length){
              _this.popupData.forEach(data=>{
                newIdList = newIdList.concat(_this.userIdList.filter(id=> id*1 === data.id*1));
                newNameList = newNameList.concat(_this.userNameList.filter(name=> name === data.userName));
              });
              if(_this.count === 0 && !_this.userId.length){
                newIdList.forEach(id =>{
                  const index = _this.userIdList.indexOf(id);
                  if(index+1 !==0){
                    _this.userIdList.splice(index,1)
                  }
                });
                newNameList.forEach(name=>{
                  const index = _this.userNameList.indexOf(name)
                  if(index+1 !==0){
                    _this.userNameList.splice(index,1)
                  }
                });
                newIdList1 = _this.userIdList;
                newNameList1 = _this.userNameList;
                _this.userNameList = _this.issueUserNameList = newNameList;
                _this.userIdList = _this.issueUserIdList = newIdList;
                _this.userId = [...newIdList1];
                _this.userName = [...newNameList1]
              }else if(_this.count === 1 && !_this.secondIdList.length){
                newIdList.forEach(id =>{
                  const index = _this.userIdList.indexOf(id);
                  if(index+1 !==0){
                    _this.userIdList.splice(index,1)
                  }
                });
                newNameList.forEach(name=>{
                  const index = _this.userNameList.indexOf(name)
                  if(index+1 !==0){
                    _this.userNameList.splice(index,1)
                  }
                });
                newIdList1 = _this.userIdList;
                newNameList1 = _this.userNameList;
                _this.userNameList = _this.auditUserNameList = newNameList;
                _this.userIdList = _this.auditUserIdList = newIdList;
                _this.secondIdList = [...newIdList1];
                _this.secondNameList = [...newNameList1]
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
            console.log(err)
          })
      },

      onSubmit() {
        console.log(this.form);
        var _this = this;
        this.$confirm('确认提交本次审核意见?', '提示', {
          confirmButtonText: '确认提交',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/projectRequest/auditRequest',{
            projectId:this.$store.state.projectId,
            projectNumber:"",
            majorRisk:_this.form.idea,
            setupAuditStatus:_this.form.audit
          })
            .then(function(data) {
              _this.$messageSuccess('提交成功!');
            })
            .catch(function(error) {
              _this.$messageError(error);
            });

        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      },

      //弹出第二层人选
      popupIpt(user){
        let ids = this.count ? this.secondIdList : this.userId;
        let names = this.count ? this.secondNameList : this.userName;
        this.$refs.selectPersonsProject.showPersonDialog(user, ids.join(), names.join());
      },

      //选人完毕后，
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
          this.userNameList = this.issueUserNameList
//        this.issueUserIdList = [...this.userIdList];
//        this.issueUserNameList = [...this.userNameList];
        } else {
          this.auditUserIdList = [];
          this.auditUserNameList = [];
          this.$refs.popupTable.store.states.selection.forEach(item=>{
            this.auditUserIdList.push(item.id);
            this.auditUserNameList.push(item.userName)
          });
          this.userIdList = this.auditUserIdList;
          this.userNameList = this.auditUserNameList
//        this.auditUserIdList = [...this.userIdList];
//        this.auditUserNameList = [...this.userNameList];
        }
      },

      //接收persons多选弹窗数据
      setPersonId(type, name, id) {
//        console.log(type, name, id);
        const _this = this;
        if(id.length){
          if(_this.count){
            _this.secondIdList = id;
            _this.secondNameList = name;
          }else {
            _this.userId  = id;
            _this.userName = name;
          }
        }
        else{
          _this.userId = [];
          _this.userName = [];
          _this.secondIdList = [];
          _this.secondNameList = [];
        }
      },

      //第一层选人弹窗点击事件
      popupClick(item, event, index){
        this.checkBoxes[index].check = event;
        if(event){
          this.userIdList.push(item.id);
          this.userNameList.push(item.userName)
        }else{
          this.userIdList = this.userIdList.filter(id => id*1 !== item.id);
          this.userNameList = this.userNameList.filter(name => name !== item.userName);
        }
      },

      //点击取消按钮后，首个弹窗的处理
      popupClose(){
        this.$refs.selectPerson.closeDialog();
//        if(!this.count){
//          this.userIdList = [...this.issueUserIdList];
//          this.userNameList = [...this.issueUserNameList]
//        }else {
//          this.userIdList = [...this.auditUserIdList];
//          this.userNameList = [...this.auditUserNameList]
//        }
//        this.checkBoxes.forEach((item, index)=>{
//          item.check = '';
//        });
      },

      readyMethod(count) {
        let data = {
          projectId: this.$store.state.projectId
        };
        this.$http
          .post('/api/reportDistribution/findReportAuditOrIssue', data)
          .then(res => {
            this.initIssueUser = this.issueUserNameList = res.data.thirdAuditor.length ? res.data.thirdAuditor.split(",") : [];
            this.initAuditUser = this.auditUserNameList = res.data.secondAuditor.length ? res.data.secondAuditor.split(",") : [];
            this.issueUserIdList = res.data.thirdAuditorId.length ? res.data.thirdAuditorId.split(",") : [];
            this.auditUserIdList = res.data.secondAuditorId.length ? res.data.secondAuditorId.split(",") : [];
            if (count === 0) {
              this.userNameList = [...this.issueUserNameList];
              this.userIdList = [...this.issueUserIdList];
              this.textInput = (res.data.issueComments).replace(/^\s+|\s+$/g,"");
            } else {
              this.userNameList = [...this.auditUserNameList];
              this.userIdList = [...this.auditUserIdList];
              this.textInput = (res.data.auditComments).replace(/^\s+|\s+$/g,"");
            }
          })
          .catch(err => {
            console.log(err)
          })
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
      }
    },

    components: {
//      ProjectDetail,
      projectindependent,
      projectplan,
      projectbudget,
      projectmessage,
      CenterDialog,
      personsDialog
    },

    /*watch:{
      textInput(value){
        if(this.count === 0){
          this.auditComment = value;
        }else{
          this.signComment = value;
        }
      }
    }*/
  }
</script>
<style lang="scss" scoped>
  .projectmessage-zlpg-content{border-bottom: none}
  .auditingContainer{display:flex;box-sizing:border-box;padding:10px 20px;background: #fff;
    .projectProjectAuditing-header{
      .el-tabs{border:1px solid rgba(229,229,229,1);
        /deep/ .el-tabs__header{padding-left: 85px;border-bottom: 1px solid #e4e7ed;box-sizing: border-box;background-color: rgba(246,250,255,1);margin-bottom: 0;
          .el-tabs__nav-wrap{margin-bottom: 0 !important}
          .el-tabs__nav-wrap:after{height: 0}
          .el-tabs__item{height: 32px;line-height: 32px;font-size: 13px}
          .el-tabs__item:hover{color: #145FD2}
          .is-active{color: #145FD2;font-weight: 600}
          .el-tabs__active-bar{background-color: #145FD2;}
        }
        /deep/ .el-tabs__header:before{
          content: "立项申请";
          display: block;
          position: absolute;
          height: 20px;
          line-height: 20px;
          left: 10px;
          top: 6px;
          font-size: 13px;
          padding-right: 10px;
          border-right: 1px solid #C8C8C8;
          cursor: text;
        }
        /deep/ .el-tabs__content{
            .title{
              .top{background-color: #fafafa;
              }
            }
        }
      }
    }
  }
  /*.nav-container{display:flex;padding-left:10px;background:#F6FAFF;height: 35px;line-height: 35px;color:rgba(38,38,40,1);font-size: 13px;}*/
  /*.titleName{padding-right: 10px;border-right: 1px solid #C8C8C8}*/
 /* .title{width:160px;height:13px;padding-right: 10px;border-right: 1px solid #C8C8C8;font-size: 13px;color:rgba(38,38,40,1);}*/

  .zlpg-content .zlpg-content-header{height:100%!important;
    .el-scrollbar{
      /deep/ .el-scrollbar__wrap{overflow-x: hidden;}
    }
    /deep/ .el-tab-pane{ margin-bottom: 197px;}
  }

  /deep/ .el-collapse-item__wrap{
    border: none;
    .el-collapse-item__content{
      padding-bottom: 0;
    }
  }
  .nav-container {
    position: fixed;
    bottom: 0;
    width: 987px;
    /*padding: 0 15px;*/
    z-index: 9;
    border-bottom: none;
    background: rgba(255,255,255,0);
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
        border-right: 1px dotted #ECECEC;
        padding: 0 20px;
      }
      .ipt-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .ipt {
          width:720px;
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
        margin: 60px 0 0 15px;
        & .confirm,
        & .cancel {
          margin: 0 0 10px 0;
          padding: 0;
          width: 70px;
          height: 25px;
        }
        .confirm {
          background: rgba(58, 128, 236, 1);
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        .cancel {
          border: 1px solid rgba(58, 128, 236, 1);
          font-size: 13px;
          font-weight: 400;
          color: rgba(58, 128, 236, 1);
        }
      }
    }
    /deep/ .el-tabs__nav-scroll{background-color: #f6faff;

    }
    /deep/ .el-tabs__item{font-size: 13px}
  }



  /deep/ .el-collapse-item__header {
    height: 10px;
    background: #F6FAFF;
    border-left: 1px solid #ECECEC;
    border-right: 1px solid #ECECEC;
  }

  /deep/ .el-collapse-item__arrow {
    margin-right: 50%;
    line-height: 10px;
  }

  /deep/ .el-collapse-item__arrow::before {
    content: '';
    display: block;
    background-image: url("../../../assets/common/openClose.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 45px;
    height: 10px;
    transform:translateX(50%);
    &:hover{opacity: .7;}
  }
  /deep/ .el-collapse-item__arrow:hover{
    opacity: .7;
  }

  /deep/ .el-collapse-item__arrow.is-active {
    transform:translateX(100%) rotate(180deg);
  }

  /deep/ .nav-container .nav-style {
    height: 40px;
    line-height: 40px;
    .el-tabs__nav-scroll{padding-left: 20px;}
    /*padding-left: 20px;*/
    .redWarning{
      color: red;
      position: absolute;
      left: 230px;
      top: 12px;
    }
  }
  .popupBody-container {
    .border-container { padding: 0;
      .popup-list{max-height: 292px;overflow: hidden}
      /*.popup-ul{max-height: 230px;}*/
      /deep/ .cell{
        text-align: center;
      }
    }
  }

  .seleRetrialIssuerTitle { height: 30px; line-height: 30px; margin-top: 5px;
    border-top: 1px solid #dcdcdc; font-size: 14px; overflow: hidden;
    & span { /*display: inline-block;*/ float: left}
    & span:first-child { width: 75px;  text-align: center;}
    & span:nth-child(2) { width: 140px; box-sizing: border-box; padding-left: 45px;}
    & span:nth-child(3) { width: 140px;  text-align: center;}

  }

  .popup-ul li { padding-left: 30px; height: 30px; line-height: 30px; border-bottom: 1px solid #DCDCDC;
    .radio-name { display: inline-block; width: 160px; height: 30px; line-height: 30px; text-align: center; }
    .radio-number { display: inline-block; width: 140px; text-align: center; font-size: 13px;}
  }

  .popupBtn-container { position: absolute;left: 0;right: 0;bottom:6px;margin: auto;display: flex; justify-content: center; align-items: center; height: 50px; line-height: 32px;
    a{margin: 0 5px;}
  }
/deep/ .el-tabs__item.is-active{
  color: #145FD2;
  font-weight: 600;
}
/deep/ .el-tabs__item:hover{color: #145FD2 !important}
  /deep/ .el-tabs__active-bar{
    background-color: #145FD2;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 0 !important;
  }
</style>
