<template>
	<div class="center-body">
		<!--结项信息-->
		<div class="requiredInformation">
			<div class="top">
				<img src="../../assets/common/must.png" />
				<span class="fw600">结项信息</span>
			</div>
			<div class="junctions-Info">
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content">
              <label class="itemTitle">项目名称：</label>
              <span class="textOverflow1" :title="$store.state.dataObj.projectName">{{this.$store.state.dataObj.projectName}}</span>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="grid-content">
              <label class="itemTitle">项目编号：</label>
              <span>{{this.$store.state.dataObj.projectNumber}}</span>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content">
              <label class="itemTitle">结项类型：</label>
              <span>{{commonData.nodeTypeId[this.$store.state.dataObj.nodeTypeId]}}</span>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="grid-content">
              <label class="itemTitle">最新提交结项时间：</label>
              <span>{{this.$store.state.dataObj.createTime}}</span>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="24">
				  	<div class="grid-content">
              <label class="itemTitle">备注信息：</label>
              <span>{{this.$store.state.dataObj.comments}}</span>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="24">
				  	<div class="grid-content accessary">
              <label class="itemTitle">结项附件：</label>
              <div class="file-list">
                <p class="blue underlineCommon" v-for="(item, index) in $store.state.dataObj.projectDocs" :key="index"
                      @click="downloadFile(item)">{{item.fileName}}</p>
              </div>
				  	</div>
				  </el-col>
				</el-row>
			</div>
		</div>
		<!--审核信息-->
		<div class="optionalmsg" v-if='show'>
			<div class="top">
				<img src="../../assets/common/optional.png"/>
				<span>审核信息</span>
			</div>
			<div class="auditing-info">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				  <el-form-item label="审核结果：" prop="auditStatus">
				    <el-radio-group v-model="ruleForm.auditStatus" @change="radioChange(val)">
				      <el-radio :label="ruleForm.agree">通过</el-radio>
				      <el-radio :label="ruleForm.disagree">不通过</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="审核意见：" prop="remarks">
				    <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入审核意见"></el-input>
				  </el-form-item>
				  <el-form-item>
				  	<button class="search-btn" @click="submitForm('ruleForm')">确认提交</button>
				    <!-- <el-button type="primary" @click="submitForm('ruleForm')">确认提交</el-button> -->
				  </el-form-item>
				</el-form>
			</div>
		</div>

		<!-- 审核结果 -->
		<div class="projectAudits" v-else>
			<div class="top">
				<span><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
			</div>
			<div class="content">
				<div class="icon"><i class="iconfont" :class="className"></i></div>
				<ul>
          <li><label>审核人员：</label><span>{{this.$store.state.dataObj.auditName}}</span></li>
          <li><label>审核级别：</label><span>{{auditLevel}}</span></li>
					<li><label>审核意见：</label><span>{{this.$store.state.dataObj.comments}}</span></li>
					<li><label>审核时间：</label><span>{{this.$store.state.dataObj.submitStatus}}</span></li>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'junctionsInfo',
		data() {
			return {
				show: true,
				commonData: window.commonData,
				id: this.$store.state.projectId,
				junctionAllData: {},
				className: '',
				ruleForm: {
          auditStatus: '',
          remarks: '',
          disagree: '',
          agree: ''
        },
        rules: {
          auditStatus: [
            { required: true, message: '请选择审核结果', trigger: 'change' }
          ]
        }
			};
		},

    computed:{
      isThrough() {
        return this.ruleForm.auditStatus === this.ruleForm.agree ? 1 : 2 ;
      },

      auditLevel(){
        return window.commonData.processStateId[this.$store.state.dataObj.processStateId];
      }
    },

		mounted(){
			var _this = this;
			//console.log(_this.id);
			if(this.$store.state.dataObj.nowStatus == '已审核'){
				this.show = false;
			}

    },
    created(){
      var _this=this;
      //通过不通过
      _this.passData();
      //审核结果
      _this.adoptData();
      //console.log(this.$store.state.dataObj.processStateId);
    },
		methods: {
			childMethod() {
				var _this = this;
				_this.$store.commit('changeShowCommon');
				_this.setProjectId(this.id);
			},
			//跳转到项目中的结项
			setProjectId(id){
				//console.log(id);
				this.$store.state.projectId = id;
				this.$setCookie('projectId', id ,24*60*60);
	      this.$router.push({path:'/zlpg/project/projectCont/projectAuditing/projectUltimateAudit'})
      },
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交结项审核？', '提示信息', {
		        	confirmButtonText: '确定提交',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          _this.sealConfir(_this.isThrough);
		        }).catch(() => {
		          /*this.$message({
		            type: 'info',
		            message: '已取消操作'
		          });
		          setTimeout(() => {
	              _this.$store.commit('changeShowCommon');
	            }, 2000);*/
		        });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    	},
    	sealConfir(isThrough) {
      	var _this = this;

        this.$http.post("/api/projectfinishaudit/examineProject",{
        	//审批项目ID
        	pfaId: this.$store.state.dataObj.pfaId,
        	//任务Id
          examTaskId: this.$store.state.dataObj.examTaskId,
          //申请人Id
          applyUserId: this.$store.state.dataObj.userId,
          //审批状态
					auditStatus: this.ruleForm.auditStatus,
					//审核意见
					comments: this.ruleForm.remarks,
					//项目Id
        	projectId: this.$store.state.dataObj.projectId,
          //单选组传递的参数
          isThrough
        }).then(function(res){
            _this.$message({
            	showClose: true,
	            type: 'success',
	            message: '结项审核提交成功!'
	          });

	          //刷新表格
	          _this.$store.state.refresh();

	          setTimeout(() => {
              _this.$store.commit('changeShowCommon');
            }, 2000);


        }).catch(function (error) {
					_this.$messageError(error);
				});
      },
      passData() {    //通过不通过接口
      	var _this = this;

        _this.$http.post("/api/projectfinishaudit/judgeProjectStatus",{
					//任务Id
          examTaskId: this.$store.state.dataObj.examTaskId
        }).then(function(res){
	          //console.log(res);
	          _this.ruleForm.auditStatus = res.data.agree;
	         	_this.ruleForm.disagree = res.data.disagree;
	         	_this.ruleForm.agree = res.data.agree;
        }).catch(function (error) {
					//_this.$messageError(error);
				});

      },
      adoptData() {  //返回通过结果
      	var _this = this;
      	if(_this.$store.state.dataObj){
      		switch(_this.$store.state.dataObj.processStateId) {
						case 1069:
							//debugger
							_this.className = 'icon-yitongguo';
							break;
						case 1067:
							_this.className = 'icon-yitongguo';
							break;
						case 1068:
							_this.className = 'icon-yijujue';
							break;
						case 1070:
							_this.className = 'icon-yijujue';
							break;
						case 1078:
							//debugger
							_this.className = 'icon-yitongguo';
							break;
						case 1080:
							_this.className = 'icon-yitongguo';
							break;
						case 1079:
							_this.className = 'icon-yijujue';
							break;
						case 1081:
							_this.className = 'icon-yijujue';
							break;
					}
      	}

      },
      radioChange(val){
      	console.log(val)
      },
      //下载文件
      downloadFile(fileMsg){
        window.location.href = "/api/file/downloadFile?token=" + this.$getCookie("token") + "&docsName=" + this.$filename(fileMsg.fileName) + "&flag=2&alyPath=" + fileMsg.filePath;
      }
		}
	}
</script>

<style scoped="scoped" lang="scss">
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
			img {
				display: inline-block;
				margin-left: 20px;
			}
			span {
				display: inline-block;
				margin-left: 10px;
				font-size: 13px;
				font-weight: 600;
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
	.optionalmsg {
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
			img {
				display: inline-block;
				width: 12px;
				height: 12px;
				margin-left: 20px;
			}
			span {
				display: inline-block;
				margin-left: 10px;
				font-size: 13px;
				font-weight: 600;
			}
		}
		.auditing-info{
			padding: 27px 40px 20px 40px;
		}
	}

	.projectAudits {
		height: 136px;
		background: rgba(255, 255, 255, 1);
		padding-bottom: 15px;
		.top {
			height: 35px;
			background: #fafafa;
			border-radius: 2px 2px 0px 0px;
			border: 1px solid rgba(236, 236, 236, 1);
			line-height: 35px;
			font-size: 13px;
		}
		.content {
			overflow: hidden;
			padding-top: 20px;
			border: 1px solid rgba(236, 236, 236, 1);
			border-top: 0;
			padding-bottom: 15px;
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
			color: #F76D43;
			font-size: 57px;
		}
		.icon {
			float: left;
			// display: inline-block;
			margin-left: 43px;
		}
		ul {
			margin-left: 112px;
			overflow: hidden;
			li {
				width: 200px;
				float: left;
				line-height: 30px;
				font-size: 13px;
			}
			li:last-child {
				width: 100%;
			}
		}
	}
}
.junctions-row {
	height: 40px;
	background: rgba(246, 250, 255, 1);
	border: 1px solid rgba(229, 229, 229, 1);
	&:last-child {
		margin-bottom: 0;
	}
	.grid-content {
		min-height: 40px;
		line-height: 40px;
	}
}

.sealBox /deep/{
	.el-row{
		.el-col{
			padding-left: 0 !important;
			padding-right: 0 !important;
			margin-right: 16px;
		}
	}
	.sealBtn{
		padding: 26px 18px;
		background: #3a8ee6;
		color: #fff;
		font-size: 13px;
		text-align: center;
		border-radius: 5px;
	}
	p{
		font-size:13px;
		color: #505050;
		padding-bottom: 18px;
		span{
			color: #1D1C1E;
		}
	}
}

/deep/ .el-form-item{
	margin-bottom: 15px !important;
}
</style>
