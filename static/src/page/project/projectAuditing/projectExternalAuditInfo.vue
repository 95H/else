<template>
	<div class="center-body">
		<!--修改信息 begin-->
		<div class="requiredInformation">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-shenhejieguo"></i>修改信息</span>
			</div>
			<div class="junctions-Info" v-if='auditDataInfo != ""'>
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content">
              <label class="itemTitle">项目名称：</label>
              <span class="textOverflow1">
              	{{ auditDataInfo.projectName }}
              </span>
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
              <label class="itemTitle">其他负责人：</label>
              <span>{{ auditDataInfo.otherLeaderName }}</span>
            </div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content accessary">
              <label class="itemTitle">审核附件：</label>
              <div class="file-list">
                <p class="blue underlineCommon" v-for="(item, index) in newfilename" :key="index" @click="downloadFile(item)"> {{ item.fileName }} </p>
              </div>
				  	</div>
				  </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <label class="itemTitle">申请原因：</label>
              <span>{{ auditDataInfo.content }}</span>
            </div>
          </el-col>
				</el-row>
			</div>
			<!-- <div class="noData" v-else>暂无数据</div> -->
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
		<div class="projectAudits" v-if="ThreeTrialShow">
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
		<div class="projectAudits" v-if="TwoTrialShow">
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
		<div class="projectAudits" v-if='firstTrialShow'>
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
		<!-- 查看共审人 begin -->
    <center-dialog ref="centerDialog" dialogWidth="320px" dialogHeight="260px" titlePosition="left" dialogTitle="查看共审人">
      <div slot="dialogContent" class="dialogContent">
        <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
          <el-checkbox :disabled="isAbled" v-for="(item, index) in equipments" :label="item" :key="index" v-if='index==1|| index==2' >
            {{item.taskDefKey + ' &nbsp;&nbsp; ' + item.userNames}}
          </el-checkbox>
        </el-checkbox-group>
        <!-- <div class="del_content">确认以上人员参与本次报告外审修改审核？</div> -->
        <!-- <div class="text-center">
            <el-button class="search-btn" @click="externalAuditSure" :disabled="isAbled">确定</el-button>
            <el-button class="reset-btn" @click="closeDialog()" :disabled="isAbled">取消</el-button>
        </div> -->
      </div>
    </center-dialog>
     <!-- 查看共审人 end -->
	</div>
</template>

<script>
	import centerDialog from "@/components/centerDialog";
	export default {
		name: 'projectExternalAuditInfo',
		data() {
			return {
				show: true,
				commonData: window.commonData,
				id: this.$store.state.projectId,
				junctionAllData: {},
				className: '',           //审核签发结果
				oneClassName: '',        //初审结果
				twoClassName: '',        //复审结果
				externalAuditData: '',  //详情数据
				auditDataInfo: '',      //头部详情
				newfilename: '',         //最新附件
				companyListData: '',    //修改涉及标地数据
				companyTime: '',
				externalResult: '',          //签发结果
				twoExternalResult: '',       //复审结果
				oneExternalResult: '',       //初审结果
				firstTrialShow: true,    //初审数据
				TwoTrialShow: true,      //复审数据
				ThreeTrialShow: true,     //审核数据
				threeDetailData: '',      //签发外审修改审核结果
				twoDetailData: '',      //复审外审修改审核结果
				oneDetailData: '',      //初审外审修改审核结果
				revokeListData: '',
				isAbled:false,
				checked: [],  //默认选中
        equipments: [],  //共审人列表数据
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
			//console.log(_this.id);
    },
    created(){
      var _this=this;
      //审核结果
      _this.externalAuditMessges();
      /*console.log(this.$store.state.dataObj);
      console.log(this.$store.state.dataObj.procInstId);
      console.log(this.$store.state.dataObj.chrId);*/
    },
		methods: {
      externalAuditMessges() {   //详情信息
        var _this = this;
        _this.$http.post('/api/changeInvestors/findUpdateDetail',{
          projectId: _this.$store.state.projectId,
          investorId: _this.$store.state.investorId,
          procInstId: _this.$store.state.dataObj.procInstId,
          chrId: _this.$store.state.dataObj.chrId
        }).then(function (data) {
          if(data.data){
						_this.externalAuditData = data.data;
						//console.log(_this.externalAuditData);
						if(!data.data.isIssueUserShow && _this.$parent.$parent.$children[0].$children[2]){
							_this.$parent.$parent.$children[0].$children[2].$el.innerHTML=""
						}
	          _this.companyListData = _this.externalAuditData.investorList;
	          _this.auditDataInfo = _this.externalAuditData.detailMap || '';
	          _this.newfilename = _this.auditDataInfo.projectDocs;
	          _this.threeDetailData = _this.externalAuditData.threeDetailList || {};    //签发
	          //console.log(_this.threeDetailData);
	          _this.twoDetailData = _this.externalAuditData.twoDetailList || {};        //复审
	          _this.oneDetailData = _this.externalAuditData.oneDetailList || {};        //初审
	          //console.log(_this.oneDetailData);
	          _this.externalResult = _this.threeDetailData.remarkState  || {};  //签发
	          _this.adoptData(_this.externalResult);
	          _this.twoExternalResult = _this.twoDetailData.remarkState  || {};    //复审结果
	          _this.twoAdoptData(_this.twoExternalResult);
	          _this.oneExternalResult = _this.oneDetailData.remarkState  || {};    //初审结果
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
			},
			childMethod() {
				var _this = this;
				_this.$refs.centerDialog.showDialog();
        _this.externalAuditList();   //共审人列表接口
			},
			handleCheckedCitiesChange(value) {
        
      },
			//共审人
			externalAuditList(){
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
              _this.checked.push(value)
						}
						_this.isAbled = true;
          });
          //console.log(_this.equipments);
        }).catch(function (error) {
          _this.$messageError(error);
        });
			},
      adoptData(item) {  //返回通过结果
      	//console.log(item);
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
      // 下载某个文件
      downloadFile(item) {
        window.location.href =
          "/api/file/downloadFile?token=" +
          this.$getCookie("token") +
          "&docsName=" +
          this.$filename(item.fileName) +
          "&flag=2&alyPath=" +
          item.filePath;
      }
		}
	}
</script>

<style scoped="scoped" lang="scss">
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
.center-body {
	padding: 20px;
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
					color: #29292B;
				}
			}
		}
	}
}

/deep/ .el-form-item{
	margin-bottom: 15px !important;
}
/deep/ .noData{
	height: 100px !important;
}
</style>
