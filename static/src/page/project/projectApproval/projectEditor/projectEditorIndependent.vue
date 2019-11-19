<template>
	<div class="projectindependent-zlpg-content projectapproval">
		<!--重要提示-->
		<div class="importance-title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-zhongyaotishi"></i>重要提示</span>
			</div>
			<div class="content">
				<span>根据中联资产评估集团（以下简称“中联”）《业务质量控制制度》的规定，项目组全体人员（包括聘用的专家和其他需要满足独立性要求人员）均应遵守中联《职业道德行为规范》
					、《独立性政策与执业回避制度》规定的独立性政策和程序。对于以下需确认事项，请项目负责人根据项目组全体成员的实际情况作出回答（选择“是”或“否”处打“√”）。对于任何“否”的回答，请提供详细解释</span>
			</div>
		</div>
		<!--确认事项-->
		<div class="affirm-title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-querenshixiang"></i>确认事项</span><span style="color: #DC4444;">(必填)</span>
			</div>
			<div class="content">
				<div class="affirm-item" v-for="(item,i) in questionList" :key="i">
					<p>{{i+1}}、{{questionList[i].questionDesc}}</p>
					<el-radio-group v-model="answerList[i].answer">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</div>
			</div>
		</div>
		<!--附件信息-->
		<div class="accessory-title">
			<div class="top">
				<span class="fw600"><i class="iconfont icon-fujian"></i>附件</span>
			</div>
			<div class="fujian-content">
				<el-upload class="upload-demo" action="/api/file/upload" :on-remove="delFile" :on-success="successFile"
				 :data="fileData" :headers=fileObj :file-list="fileList" :limit="1" :before-upload="beforeAvatarUpload">
					<button size="small" type="primary" class="dulibtn search-btn" v-loading.fullscreen.lock="loading">独立性自查表上传</button>
				</el-upload>
				<a class="btn reset-btn" href="/api/file/downloadFile?docsName=独立性自查表.xls&alyPath=&flag=1">独立性自查表模板下载</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'projectindependent',
		data() {
			return {
				answerList: [],
				questionList: [],
				fileName: '',
				filePath: '',
				fileList: [],
				fileData: {
					id: '',
					uploadToAliyun: 'no'
				},
				fileObj: {},
				loading: false
			}
		},
		created() {
			var _this = this;
			this.fileData.id = this.$store.state.projectId,
				this.fileObj = {
					token: _this.$getCookie('token')
				};
		},
		mounted() {
			var _this = this;
			this.$http.post('/api/projectRequest/setupFindSelfSurveyInfo', {
					projectId: this.$store.state.projectId
				})
				.then(function(data) {
					if (data.data.projectSelfSurveyList.length) {
						for (var i in data.data.projectSelfSurveyList) {
							var obj = {};
							obj.answer = data.data.projectSelfSurveyList[i].answer;
							obj.optionType = data.data.projectSelfSurveyList[i].optionType;
							obj.questionBankId = data.data.projectSelfSurveyList[i].questionBankId;
							obj.id = data.data.projectSelfSurveyList[i].id;
							_this.answerList.push(obj)
						}
					} else {
						for (var i in data.data.questionBankList) {
							var objq = {};
							objq.answer = '';
							objq.optionType = data.data.questionBankList[i].optionType;
							objq.questionBankId = data.data.questionBankList[i].id;
							_this.answerList.push(objq);
						}
					}
					_this.$store.state.projectSelfJson = _this.answerList;
					_this.$store.state.independentRuls = _this.answerList;
					_this.questionList = data.data.questionBankList;
					var arr = [];
					if (data.data.selfSurveyDocs != '') {
						var obj = {},
							obj1 = {};
						//数据回显
						obj.name = data.data.selfSurveyDocs.fileName;
						obj.url = data.data.selfSurveyDocs.filePath;
						obj.id = data.data.selfSurveyDocs.id;
						_this.fileList.push(obj);
						//数据保存
						obj1.fileName = data.data.selfSurveyDocs.fileName;
						obj1.filePath = data.data.selfSurveyDocs.filePath;
						obj1.id = data.data.selfSurveyDocs.id;
						arr.push(obj1);
					}
					_this.$store.state.selfSurveyDocsJson = arr;

				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		methods: {
			delFile(file, fileList) {
				this.$store.state.selfSurveyDocsJson = fileList;
			},
			successFile(response, file, fileList) {
				if(response.code == 200){
					this.loading = false;
				}
				this.$store.state.selfSurveyDocsJson = [];
				var fileObj = {};
				fileObj.fileName = response.data.fileName;
				fileObj.filePath = response.data.fileDir;
				this.$store.state.selfSurveyDocsJson.push(fileObj);
			},
			beforeAvatarUpload(file){
				this.loading = true;
			}
		}
	}
</script>

<style scoped lang="scss">
	.projectindependent-zlpg-content {
		.importance-title {
			border: 1px solid rgba(229, 229, 229, 1);
			margin-bottom: 12px;
		}

		.affirm-title {
			border: 1px solid rgba(229, 229, 229, 1);
			margin-bottom: 12px;
		}

		.accessory-title {
			border: 1px solid rgba(229, 229, 229, 1);
		}

		.top {
			background: rgba(246, 250, 255, 1);
			height: 30px;
			line-height: 30px;
			border-bottom: 1px solid rgba(229, 229, 229, 1);
			font-size: 13px;
		}

		.content {
			font-size: 13px;
			padding: 14px 40px;
			line-height: 25px;
			font-family: PingFangSC-Regular;
			font-weight: 400;

			.affirm-item:last-child {
				border-bottom: 0;
				margin-bottom: 0;
			}

			.affirm-item {
				border-bottom: 1px dashed rgba(225, 225, 225, 1);
				margin-bottom: 16px;

				p {
					margin-bottom: 10px;
				}

				.el-radio-group {
					margin-bottom: 10px;
				}
			}

			.border0 {
				border-bottom: 0;
			}
		}

		.fujian-content {
			padding: 20px 15px;

		}

		.btn {
			width: 145px;
			height: 25px;
			border-radius: 2px;
			border: 1px solid rgba(58, 128, 236, 1);
			text-align: center;
			line-height: 25px;
			color: #3A80EC;
			font-size: 13px;
			padding: 4px 6px;
			display: inline;
		}

		.dulibtn {
			width: 125px;
			background: rgba(58, 128, 236, 1);
			border-radius: 2px;
			font-size: 13px;
			margin-bottom: 10px;
		}

		.iconfont {
			font-size: 13px;
			margin-right: 10px;
			margin-left: 20px;
			font-weight: 400;
		}

		.icon-zhongyaotishi {
			color: #98C268;
		}

		.icon-querenshixiang {
			color: #5FA9EC;
		}

		.icon-fujian {
			color: #F7B543;
		}
	}

	/deep/ .el-upload-list__item:first-child {
		margin-top: 0px;
		margin-bottom: 10px;
	}
</style>
