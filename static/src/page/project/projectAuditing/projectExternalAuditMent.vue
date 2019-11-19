<template>
	<div class="zlpg-content clear">
		<el-scrollbar class="el-scrollbar" :style="{height:height}">
			<div class="center-body">
				<div>
					<!--修改信息 begin-->
					<div class="requiredInformation" v-if='this.$store.state.dataObj != 1'>
						<div class="top">
							<span class="fw600"><i class="iconfont icon-shenhejieguo"></i>修改信息</span>
						</div>
						<div class="junctions-Info" v-if='auditDataInfo != ""'>
							<el-row>
								<el-col :span="12">
									<div class="grid-content">
										<label class="itemTitle">项目名称：</label>
										<span class="textOverflow1">{{ auditDataInfo.projectName }}</span>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="grid-content">
										<label class="itemTitle">项目编号：</label>
										<span>{{ auditDataInfo.projectNumber }}</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<div class="grid-content">
										<label class="itemTitle">承作机构：</label>
										<span>{{ auditDataInfo.groupName }}</span>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="grid-content">
										<label class="itemTitle">项目负责人：</label>
										<span>{{ auditDataInfo.userName }}</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<div class="grid-content">
										<label class="itemTitle">申请时间：</label>
										<span>{{ auditDataInfo.createTime }}</span>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="grid-content">
										<label class="itemTitle">申请原因：</label>
										<span>{{ auditDataInfo.content }}</span>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<div class="grid-content accessary">
										<label class="itemTitle">审核附件：</label>
										<div class="file-list">
											<p class="blue underlineCommon" v-for="(item, index) in newfilename" :key="index"
														@click="downloadFile(item)">{{item.fileName}}</p>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
					<!--修改信息 end-->

					<!-- 修改涉及标地 begin -->
					<div class="projectAudits">
						<div class="top">
							<span><i class="iconfont icon-shenhejieguo"></i>修改涉及标地</span>
						</div>
						<div class="conpanyCont">
							<ul v-if="companyListData.length>0">
			          <li v-for="(item, index) in companyListData" :label="item" :key="index">
			          	<p>{{ item.investorName }}</p>
			          </li>
							</ul>
							<div class="noData" v-else>暂无数据</div>
						</div>
					</div>
					<!-- 修改涉及标地 end -->


					<!-- 签发外审修改审核结果 begin -->
					<div class="projectAudits" v-if='this.$store.state.dataObj != 1 && ThreeTrialShow'>
						<div class="top">
							<span><i class="iconfont icon-shenhejieguo"></i>签发外审修改审核结果</span>
						</div>
						<div class="content">
							<div v-if="threeDetailData != ''">
								<div class="icon"><i class="iconfont" :class="className"></i></div>
									<ul>
					          <li><label>审核人：</label><span>{{ threeDetailData.userName }}</span></li>
					          <li>
					          	<label>审核意见：</label>
					          	<span>{{ threeDetailData.remarkContent }}</span>
					          </li>
										<li><label>审核时间：</label><span>{{ threeDetailData.endTime }}</span></li>
									</ul>
							</div>
							<div class="noData" v-else>暂无数据</div>
						</div>
					</div>
					<!-- 签发外审修改审核结果 end -->

					<!-- 复审外审修改审核结果 begin -->
					<div class="projectAudits" v-if="TwoTrialShow && this.$store.state.dataObj != 1">
						<div class="top">
							<span><i class="iconfont icon-shenhejieguo"></i>复审外审修改审核结果</span>
						</div>
						<div class="content">
							<div v-if="twoDetailData != ''">
								<div class="icon"><i class="iconfont" :class="twoClassName"></i></div>
								<ul>
				          <li><label>审核人：</label><span>{{ twoDetailData.userName }}</span></li>
				          <li>
				          	<label>审核意见：</label>
				          	<span>{{ twoDetailData.remarkContent }}</span>
				          </li>
									<li><label>审核时间：</label><span>{{ twoDetailData.endTime }}</span></li>
								</ul>
							</div>
							<div class="noData" v-else>暂无数据</div>
						</div>
					</div>
					<!-- 复审外审修改审核结果 end -->

					<!-- 初审外审修改审核结果 begin -->
					<div class="projectAudits" v-if="firstTrialShow && this.$store.state.dataObj != 1">
						<div class="top">
							<span><i class="iconfont icon-shenhejieguo"></i>初审外审修改审核结果</span>
						</div>
						<div class="content">
							<div v-if="oneDetailData != ''">
								<div class="icon"><i class="iconfont" :class="oneClassName"></i></div>
								<ul>
				          <li><label>审核人：</label><span>{{ oneDetailData.userName }}</span></li>
				          <li>
				          	<label>审核意见：</label>
				          	<span>{{ oneDetailData.remarkContent }}</span>
				          </li>
									<li><label>审核时间：</label><span>{{ oneDetailData.endTime }}</span></li>
								</ul>
							</div>
							<div class="noData" v-else>暂无数据</div>
						</div>
					</div>
					<!-- 初审外审修改审核结果 end -->

				</div>
			</div>
		</el-scrollbar>
		<div class="nav-container pa">
			<el-collapse v-model="collapseName">
				<el-collapse-item name="1">
					<div class="body">
						<div class="content">
							<div class="ipt-container container-item">
								<span class="name">审核结果：</span>
								<el-radio-group v-model="form.audit" @change="radioChange">
									<el-radio :label="0">通过</el-radio>
									<el-radio :label="1">不通过</el-radio>
								</el-radio-group>
							</div>
							<div class="ipt-container">
								<span class="name">审核意见：</span>
								<el-input v-model="form.content" class="ipt ipt-50h" type="textarea"></el-input>
							</div>
						</div>
						<div class="btn-container">
							<div class="confirm search-btn" @click="onlineAuditSure">确认提交</div>
							<div class="cancel reset-btn" @click="cancelBtn">取消</div>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>

		<!-- 回复意见 begin -->
    <!-- <center-dialog ref="centerDialog" dialogWidth="320px" dialogHeight="260px" titlePosition="left" dialogTitle="提示信息">
      <div slot="dialogContent" class="dialogContent">
        <div class="del_view">
        	<ul>
        		<li>总意见提出：{{auditViewData.totalReplyNumber}} 个</li>
        		<li>未回复意见：{{auditViewData.waitReplyNumber}} 个</li>
        	</ul>
        </div>
        <div class="del_content">确认以上人员参与本次报告外审修改审核？</div>
        <div class="text-center">
            <a class="search-btn" @click="onlineAudit">确定</a>
            <a class="reset-btn" @click="closeDialog()">取消</a>
        </div>
      </div>
    </center-dialog> -->
    <!-- 回复意见 end -->

    <!-- 添加共审人 begin -->
    <center-dialog ref="centerDialog" dialogWidth="320px" dialogHeight="260px" titlePosition="left" dialogTitle="选择共审人">
      <div slot="dialogContent" class="dialogContent">
        <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
          <el-checkbox :disabled="isAbled" v-for="(item, index) in equipments" :label="item" :key="index" v-if='index==1|| index==2' > <!--  v-if='item.taskDefKey=="usertask2" || item.taskDefKey=="usertask3"' -->
            {{item.taskDefKey + ' &nbsp;&nbsp; ' + item.userNames}}
          </el-checkbox>
        </el-checkbox-group>
        <div class="del_content">确认以上人员参与本次报告外审修改审核？</div>
        <div class="text-center">
            <el-button class="search-btn" @click="externalAuditSure" :disabled="isAbled">确定</el-button>
            <el-button class="reset-btn" @click="closeDialog()" :disabled="isAbled">取消</el-button>
        </div>
      </div>
    </center-dialog>
     <!-- 添加共审人 end -->
	</div>
</template>

<script>
	import centerDialog from "../../../components/centerDialog";
	export default {
		name: 'projectExternalAuditMent',
		data() {
			return {
				show: true,
				checkedAuditData: [],   //给后台传的taskId和investorId
				commonData: window.commonData,
				className: '',           //审核签发结果
				oneClassName: '',        //初审结果
				twoClassName: '',        //复审结果
				collapseName: ["1"],
				flag:'',
				height: "",
				isAbled: false,  //禁用
        checked: [],  //默认选中
        equipments: [],  //共审人列表数据
        checkedData: [],  //所以选中的数据
        checkUserId: '',  //给后台传的选中的人员id
        checkAuditType: '',  //给后台传的选中的auditType
				externalAuditData: '',  //详情数据
				newfilename: [],         //最新附件
				companyListData: '',    //修改涉及标地数据
				companyTime: '',
				externalResult: '',          //签发结果
				twoExternalResult: '',       //复审结果
				oneExternalResult: '',       //初审结果
				firstTrialShow: false,    //初审数据显示
				TwoTrialShow: false,      //复审数据显示
				ThreeTrialShow: true,     //审核数据
				threeDetailData: '',      //签发外审修改审核结果
				TwoDetailData: '',      //复审外审修改审核结果
				oneDetailData: '',      //初审外审修改审核结果
				auditDataInfo: '',
				auditViewData: '',      //意见数据
				addAuditBtn: '',         //判断添加共审人按钮是否显示
				investorIdValue: '',
				form: {
					audit: 0,
					content: ""
				}
			};
		},
		components: {
      centerDialog
    },
    computed:{
      isThrough() {
        return this.ruleForm.auditStatus === this.ruleForm.agree ? 1 : 2 ;
      }
    },
		mounted(){
			var _this = this;
			this.$store.state.isScroll = false;
	    this.height = (/projectExternalAudit/g.test(this.$route.path))
	        ? window.innerHeight - 255 + "px"
	        : window.innerHeight - 150 + "px";
    },
    created(){
      var _this=this;
      /*console.log(_this.$store.state.dataObj);
    	console.log(_this.$store.state.getCheckKeyData.join(","));*/
    	if(this.$store.state.dataObj == 1){
      	this.investorIdValue = _this.$store.state.getCheckKeyData.join(",");
      }else{
      	this.investorIdValue = _this.$store.state.investorId;
      }
      //审核结果
      _this.externalAuditMessges();
      //console.log(this.$store.state.dataObj.processStateId);
    },
    watch:{
	    'collapseName'(){
	      this.height = this.collapseName.length>0 ? window.innerHeight-255 + "px" : window.innerHeight-150 + "px"
	    }
	  },
		methods: {
			childMethod() {
				var _this = this;
				_this.$refs.centerDialog.showDialog();
        _this.externalAuditList();   //共审人列表接口
			},
			handleCheckedCitiesChange(value) {
        this.checkUserId = '';
        this.checkAuditType = '';
        this.checkedData = [];
        value.forEach((item) => {
          //console.log(item);
          this.checkUserId = item.userIds;
          this.checkAuditType = item.taskDefKey;
          this.checkedData.push({
            userIds: this.checkUserId,
            taskDefKey: this.checkAuditType
          })
        })
      },
      // 添加共审人取消--关闭弹窗
      closeDialog() {
        this.$refs.centerDialog.closeDialog();
        this.checked = [];
      },
			externalAuditList() {   //共审人列表接口
        var _this = this;
        _this.$http.post('/api/changeInvestors/findCoTrialPerson',{
          investorId: _this.$store.state.investorId
        }).then(function (data) {
          _this.equipments = data.data;
          _this.equipments.forEach((value, index) => {
            if(value.taskDefKey == "usertask3"){
              value.taskDefKey = "复审人";
            }
            if(value.taskDefKey == "usertask2"){
              value.taskDefKey = "初审人";
            }
            //判断接口是否有选中，如果有选中禁用
            if(value.checked == true){
              _this.isAbled = true;
              _this.checked.push(value)
            }
          });
          //console.log(_this.equipments);
        }).catch(function (error) {
          _this.$messageError(error);
        });
      },
      //添加共审人确认接口
      externalAuditSure() {
        var _this = this;
        if(_this.checked.length == 0){
          this.$messageError('请选择共审人！');
          return false;
        }else{
          let dataJson = {
            projectId: _this.$store.state.projectId,
            investorId: _this.$store.state.investorId,
            taskId: _this.$store.state.taskId,
            distributionJson: JSON.stringify(_this.checkedData)
          }
          _this.checked.map(item=>{
            item.checked = true;
          })
          console.log(_this.checked);
          //console.log(dataJson);
          _this.$http.post('/api/changeInvestors/saveCoTrialPerson',dataJson)
          .then(function (data) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: '共审人添加成功!'
            });
            setTimeout(() => {
              _this.$refs.centerDialog.closeDialog();
            }, 2000);

            _this.externalAuditList();   //刷新共审人列表
            //this.checked = true;
            //this.isAbled = false;
          }).catch(function (error) {
            _this.$messageError(error);
          });
        }
      },
			externalAuditMessges() {   //详情信息
        var _this = this;
        if(this.$store.state.dataObj == 1){
        	_this.$http.post('/api/changeInvestors/findInvestorName',{
	          projectId: _this.$store.state.projectId,
	          investorIds: _this.investorIdValue
	        }).then(function (data) {
	          if(data.data){
	          	//console.log(data.data);
	          	_this.companyListData = data.data;
	          }
	          //console.log(_this.externalAuditData.threeDetailList.remarkState);
	        }).catch(function (error) {
	          _this.$messageError(error);
	        });
        }else{
        	_this.$http.post('/api/changeInvestors/findUpdateDetail',{
	          projectId: _this.$store.state.projectId,
	          investorId: _this.investorIdValue,
	          procInstId: _this.$store.state.dataObj.procInstId,
	          chrId: _this.$store.state.dataObj.chrId
	        }).then(function (data) {
	          if(data.data){
	          	_this.externalAuditData = data.data;
		          _this.companyListData = _this.externalAuditData.investorList;
		          _this.auditDataInfo = _this.externalAuditData.detailMap;
		          _this.newfilename = _this.auditDataInfo.projectDocs;
              _this.$store.state.commonBtn = _this.externalAuditData.isIssueUserShow ? '添加共审人' : '';
		          _this.threeDetailData = _this.externalAuditData.threeDetailList || {};    //签发
		          _this.twoDetailData = _this.externalAuditData.twoDetailList || {};        //复审
		          _this.oneDetailData = _this.externalAuditData.oneDetailList || {};        //初审

		          _this.externalResult = _this.threeDetailData.remarkState || {};  //签发
		          _this.adoptData(_this.externalResult);
		          _this.twoExternalResult = _this.twoDetailData.remarkState || {};    //复审结果
		          _this.twoAdoptData(_this.twoExternalResult);
		          _this.oneExternalResult = _this.oneDetailData.remarkState || {};    //初审结果
		          _this.oneAdoptData(_this.oneExternalResult);
		          if(_this.externalAuditData.oneDetailList == ''){
		          	_this.firstTrialShow = false;
		          }
		          if(_this.externalAuditData.twoDetailList == ''){
		          	_this.TwoTrialShow = false;
		          }
		          if(_this.externalAuditData.threeDetailList == ""){
		          	_this.ThreeTrialShow = false;
		          }
	          }
	          //console.log(_this.externalAuditData.threeDetailList.remarkState);
	        }).catch(function (error) {
	          _this.$messageError(error);
	        });
        }

      },
      adoptData(item) {  //返回通过结果
      	var _this = this;
      	if(item){
      		switch(item) {
						case "1354":
            _this.className = 'icon-yichehui';
            break;
          case "1355":
            _this.className = 'icon-yitongguo';
            break;
          case "1356":
            _this.className = 'icon-yijujue';
            break;
          case "1357":
              _this.className = 'icon-yitongguo';
              break;
          case "1358":
            _this.className = 'icon-yijujue';
            break;
          case "1359":
            _this.className = 'icon-daishenhe';
            break;
          case "1360":
            _this.className = 'icon-yitongguo';
            break;
          case "1361":
            _this.className = 'icon-yijujue';
            break;
					}
      	}
      },
      twoAdoptData(item) {  //复审返回通过结果
      	//console.log(item);
      	var _this = this;
      	if(item){
      		switch(item) {
      			case "1354":
              _this.twoClassName = 'icon-yichehui';
              break;
	          case "1355":
              _this.twoClassName = 'icon-yitongguo';
              break;
	          case "1356":
              _this.twoClassName = 'icon-yijujue';
              break;
	          case "1357":
              _this.twoClassName = 'icon-yitongguo';
              break;
	          case "1358":
              _this.twoClassName = 'icon-yijujue';
              break;
	          case "1359":
              _this.twoClassName = 'icon-daishenhe';
              break;
	          case "1360":
              _this.twoClassName = 'icon-yitongguo';
              break;
	          case "1361":
              _this.twoClassName = 'icon-yijujue';
              break;
	        }
      	}

      },
      oneAdoptData(item) {  //初审返回通过结果
      	//console.log(item);
      	var _this = this;
      	if(item){
      		switch(item) {
      			case "1354":
              _this.oneClassName = 'icon-yichehui';
              break;
	          case "1355":
              _this.oneClassName = 'icon-yitongguo';
              break;
	          case "1356":
              _this.oneClassName = 'icon-yijujue';
              break;
	          case "1357":
              _this.oneClassName = 'icon-yitongguo';
              break;
	          case "1358":
              _this.oneClassName = 'icon-yijujue';
              break;
	          case "1359":
              _this.oneClassName = 'icon-daishenhe';
              break;
	          case "1360":
              _this.oneClassName = 'icon-yitongguo';
              break;
	          case "1361":
              _this.oneClassName = 'icon-yijujue';
              break;
	        }
      	}
      },
      radioChange(val) {
			 	var _this = this;
			 	_this.audit = val;
			 	//console.log(_this.audit);
			},
			//取消按钮
			cancelBtn() {
				this.$store.commit("changeShowCommon");
			},
			//审核--确认按钮
      onlineAuditSure() {
        var _this = this;
        _this.$confirm('确认提交本次外审修改审核？', '提示信息', {
        	confirmButtonText: '确定提交',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.onlineAudit();
        }).catch(() => {
          /*this.$message({
            type: 'info',
            message: '已取消操作'
          }); */
        });
        //this.$refs.centerDialog.showDialog();
        //this.auditView();
      },
      //下载文件
      downloadFile(fileMsg){
        window.location.href = "/api/file/downloadFile?token=" + this.$getCookie("token") + "&docsName=" + this.$filename(fileMsg.fileName) + "&flag=2&alyPath=" + fileMsg.filePath;
      },
      // 添加共审人取消--关闭弹窗
      closeDialog() {
        this.$refs.centerDialog.closeDialog();
        this.checked = [];
      },
      //线上审核接口
      onlineAudit() {
      	//alert(9999);
        var _this = this;
        this.checkedAuditData = [];    //清空之前的数据
				if(this.$store.state.dataObj == 1){
					this.checkedAuditData = this.$store.state.getCheckedObjArr;
				}else{
					this.checkedAuditData.push({
						taskId: _this.$store.state.taskId,
						investorId: _this.$store.state.investorId
					})
				}
        let dataJson = {
          projectId: _this.$store.state.projectId,
          flag: _this.form.audit,
          content: _this.form.content,
          auditingJson: JSON.stringify(this.checkedAuditData)
				}
        _this.$http.post('/api/changeInvestors/examineChangeInvestors',dataJson)
        .then(function (data) {
          _this.$message({
            showClose: true,
            type: 'success',
            message: '审核成功!'
					});
					if(data.data){
						_this.$http.post('/api/changeInvestors/copyIssueReportDraft',{issueInvestorIds:data.data,showLoading:false})
						.then(function (data) {
						}).catch(function (error) {
						});
					}
          setTimeout(() => {
            _this.$store.commit('changeShowCommon');
          }, 2000);
          _this.$store.state.auditTree = !_this.$store.state.auditTree;   //刷新左侧树
          _this.$store.state.auditData = !_this.$store.state.auditData;   //刷新外审数据

        }).catch(function (error) {
          _this.$messageError(error);
        });
      },
      //意见接口
      auditView() {
        var _this = this;
        _this.$http.post('/api/changeInvestors/findReplyNumber',{
        	projectId: _this.$store.state.projectId,
        	investorId: _this.$store.state.investorId
        })
        .then(function (data) {
        	console.log(data.data);
        	_this.auditViewData = data.data;
        }).catch(function (error) {
          _this.$messageError(error);
        });
      }
		}
	}
</script>

<style scoped="scoped" lang="scss">
.center-body {
	padding: 20px;
	height: 430px;
	.requiredInformation {
		width: 760px;
		background: rgba(255, 255, 255, 1);
		border-radius: 2px;
		border: 1px solid rgba(236, 236, 236, 1);
		border-top: 0;
		margin-bottom: 10px;
		.top {
			height: 35px;
			background: #fafafa;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-left: 0;
			border-right: 0;
			line-height: 35px;
			span {
				display: inline-block;
				font-size: 13px;
				font-weight: 600;
				i{
					color: #98C268;
			    margin-left: 20px;
			    margin-right: 10px;
				}
			}
		}
		.junctions-Info{
			padding: 27px 40px;
			.el-row{
				padding-bottom: 18px;
			}
			.el-row:last-child{
				padding-bottom: 0;
			}
			.grid-content{
        overflow: hidden;
				.itemTitle{
          float: left;
					font-size:13px;
					color: #777777;
				}
        span{
          float: left;
          font-size:13px;
          display: inline-block;
          width: 50%;
          color: #1D1C1E;
        }
			}
      .accessary{
        label{
          float: left;
          line-height: 18px;
        }
        .file-list{
          float: left;
          line-height: 18px;
          .blue{
            cursor: pointer;
            font-size:13px;
            color: #2E68E7;
          }
        }
      }
		}
	}
	.projectAudits {
		background: rgba(255, 255, 255, 1);
		padding-bottom: 10px;
		.top {
			height: 35px;
			background: #fafafa;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			line-height: 35px;
			font-size: 13px;
			font-weight: 600;
		}
		.content {
			overflow: hidden;
			padding: 15px 0;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			ul {
				margin-left: 125px;
				overflow: hidden;
				li {
					line-height: 30px;
					font-size: 13px;
					color: #1D1C1E;
					label{
	    			color: #777777;
					}
				}
			}
		}
		.icon-shenhejieguo {
			color: #98C268;
			margin-left: 20px;
			margin-right: 10px;
		}
		.icon-yitongguo {
			font-size: 57px;
			color: #11BF6B;
		}
		.icon-yijujue {
			color: #F86F45;
			font-size: 57px;
		}
		.icon-daishenhe{
	    font-size: 50px;
	    color: #B1B1B1;
	  }
	  .icon-yichehui{
	    font-size: 50px;
	    color: #B1B1B1;
	  }
		.icon {
			float: left;
			margin-left: 43px;
		}

		.conpanyCont{
			overflow: hidden;
			padding: 15px 40px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			ul{
				li {
					line-height: 30px;
					font-size: 13px;
					color: #1D1C1E;
				}
			}
		}
	}
}


.nav-container {
	left: 0;
	bottom: 0;
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
			margin-bottom: 10px;
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
		}
		.container-item {
			justify-content: flex-start;
		}
		.btn-container {
			display: flex;
			flex-direction: column;
			margin: 22px 0 0 18px;
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
}
/deep/ .el-form-item{
	margin-bottom: 15px !important;
}

/deep/ .el-collapse-item__header {
	height: 10px;
	background: #f6faff;
}

/deep/ .el-collapse-item__arrow {
	margin-right: 50%;
	line-height: 10px;
}

/deep/ .el-collapse-item__arrow::before {
	content: "∧";
	color: #fff;
	background: #5296ff;
	padding: 0 10px;
}

/deep/ .el-collapse-item__arrow.is-active {
	transform: rotate(180deg);
}

/deep/ .nav-container .nav-style {
	height: 40px;
	line-height: 40px;
	padding-left: 10px;
}

/deep/ .el-scrollbar__wrap {
	overflow-y: scroll;
	overflow-x: hidden;
}

/deep/ .el-tabs__nav-wrap::after {
	height: 1px;
}

.dialogContent{
  .del_content{
    font-size: 13px;
    padding-bottom: 20px;
    padding-top: 35px;
    text-align: center;
  }
  .del_view{
  	text-align: center;
  	ul{
  		margin-top: 10px;
  		li{
  			line-height: 30px;
  			font-size: 13px;
  		}
  	}
  }
}
/deep/ .noData{
	height: 100px !important;
}

.dialogContent{
  .del_content{
    font-size: 13px;
    padding-bottom: 20px;
    padding-top: 25px;
    text-align: center;
  }
  .el-checkbox-group{
    text-align: center;
    padding-top: 15px;
    label{
      display: block !important;
      margin-bottom: 10px;
    }
    .el-checkbox+.el-checkbox{
      margin-left: 0 !important;
    }
  }
}
</style>
