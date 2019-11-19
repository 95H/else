<template>
	<div class="projectindependent-zlpg-content projectapproval">
		<!--重要提示-->
		<div class="importance-title">
			<div class="top fw600">
				<span>重要提示<i class="iconfont icon-zhongyaotishi fl"></i></span>
			</div>
			<div class="content">
				<span>根据中联资产评估集团（以下简称“中联”）《业务质量控制制度》的规定，项目组全体人员（包括聘用的专家和其他需要满足独立性要求人员）均应遵守中联《职业道德行为规范》 、《独立性政策与执业回避制度》规定的独立性政策和程序。对于以下需确认事项，请项目负责人根据项目组全体成员的实际情况作出回答（选择“是”或“否”处打“√”）。对于任何“否”的回答，请提供详细解释</span>
			</div>
		</div>
		<!--确认事项-->
		<div class="affirm-title">
			<div class="top fw600">
				<span>确认事项<i class="iconfont icon-querenshixiang fl"></i></span>
			</div>
			<div class="content">
				<div class="affirm-item" v-for="(item,i) in questionList" :key="i">
					<p>{{i+1}}、{{questionList[i].questionDesc}}</p>
	  				<el-radio-group v-model="answerList == [] ? answerList : answerList[i].answer">
						<el-radio disabled label="1">是</el-radio>
						<el-radio disabled label="0">否</el-radio>
					</el-radio-group>
				</div>
			</div>
		</div>
		<!--附件信息-->
		<div class="accessory-title">
			<div class="top fw600">
				<span>附件<i class="iconfont icon-fujian fl"></i></span>
			</div>
			<div class="fujian-content">
				<div class="fileContent clear" v-if="fileList!=''">
					<span >{{fileName}}</span>
					<a @click="downFile" class="underlineCommon">下载</a>
				</div>
        <div class="noData" v-if="fileList == ''">暂无数据</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'projectindependent',
		data() {
			return {
				answerList:'',
				questionList:[],
				fileName:'',
				filePath:'',
				fileList:''
			};
		},
		mounted() {
			var _this = this;
			this.$http.post('/api/projectRequest/setupFindSelfSurveyInfo', {
					projectId: this.$store.state.projectId
				})
				.then(function(data) {
					if(data.data.projectSelfSurveyList.length){
						_this.answerList = data.data.projectSelfSurveyList;
					}
					_this.questionList = data.data.questionBankList;

					_this.fileList = data.data.selfSurveyDocs
					_this.fileName = data.data.selfSurveyDocs.fileName;
					_this.filePath = data.data.selfSurveyDocs.filePath
				})
				.catch(function(error) {
					_this.$messageError(error);
				});
		},
		methods:{
			downFile(){
				window.location.href = "/api/file/downloadFile?token="+ this.$getCookie("token") +"&docsName=" + this.$filename(this.fileName) + "&alyPath=" + this.filePath + "&flag=" + 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	.projectindependent-zlpg-content {
    /*border-bottom: 1px solid #ECECEC;*/
		padding:15px 15px 12px;
		.importance-title {
			border:1px solid rgba(229,229,229,1);
			margin-bottom: 12px;
		}
		.affirm-title {
			border:1px solid rgba(229,229,229,1);
			margin-bottom: 12px;
		}
		.accessory-title {
			border:1px solid rgba(229,229,229,1);
		}
		.top {
			background:rgba(246,250,255,1);
			height: 30px;
			line-height: 30px;
			border-bottom: 1px solid rgba(229,229,229,1);
			font-size: 13px;
		}
		.content {
			font-size: 13px;
			padding: 16px 40px;
			line-height: 25px;
			font-family:PingFangSC-Regular;
			font-weight:400;
      color: #676767;
			.affirm-item {
				border-bottom: 1px dashed rgba(225,225,225,1);
				margin-top: 10px;
				p {
					margin-bottom: 10px;
          color: #676767;
				}
				.el-radio-group {
					margin-bottom: 16px;
				}
			}
			.affirm-item:last-child {
				border-bottom:none;
			}
		}
		.fujian-content {
			padding: 20px;
			.fileContent {
        position: relative;
				border: 1px dashed #dcdcdc;
				line-height: 23px;
				padding: 5px 20px;
        font-size: 13px;
			}
			span {
				display: inline-block;
        float: left;
        width: calc(97% - 25px);
        white-space: normal;

			}
			a {
				position: absolute;
        top:50%;
        right: 20px;
        transform: translateY(-50%);
				color: #5FA9EC;
				cursor: pointer;
			}
			.isActive {
				text-align: center;
				color: #909399;
				font-size: 13px;
			}
      .noData{
        height: 100px;
        line-height: 180px;
      }
		}
		.iconfont {
			font-size: 13px;
			margin-right: 10px;
			margin-left: 20px;
		}
		.icon-zhongyaotishi {
			color: #98C268;
			font-weight: normal;
		}
		.icon-querenshixiang{
			color: #5FA9EC;
			font-weight: normal;
		}
		.icon-fujian {
			color:#F7B543;
			font-weight: normal;
		}
	}
</style>
