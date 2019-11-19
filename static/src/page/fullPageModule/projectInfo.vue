<template>
	<div class="projectInfo-wrapper">
		<ul class="list-group-item">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="基本信息" name="first">
			    	<projectmessage v-if="activeName == 'first'"></projectmessage>
			    </el-tab-pane>
					<template v-if="JSON.parse($getCookie('user')).isExternal != true">
						<el-tab-pane label="独立性自查" name="second">
							<projectindependent v-if="activeName == 'second'"></projectindependent>
						</el-tab-pane>
						<el-tab-pane label="项目计划" name="third">
							<projectplan v-if="activeName == 'third'"></projectplan>
						</el-tab-pane>
						<el-tab-pane label="项目预算" name="fourth">
							<projectbudget v-if="activeName == 'fourth'"></projectbudget>
						</el-tab-pane>
					</template>
			    <!--<div class="projectAudits" v-if="$store.state.isShowAudit=='0' && auditResult!=''">
					<div class="top">
						<span><i class="iconfont icon-shenhejieguo"></i>审核结果</span>
					</div>
					<div class="content">
						<div class="icon"><i class="iconfont" :class="className"></i></div>
						<ul>
							<li><label>审核人员:</label><span>{{auditResult.userName}}</span></li>
							<li><label>审核级别:</label><span>{{auditResult.currentNode}}</span></li>
							<li><label>审核时间:</label><span>{{auditResult.createTime}}</span></li>
							<li><label>审核意见:</label><span>{{auditResult.remarkContent}}</span></li>
						</ul>
					</div>
				</div>-->
			</el-tabs>
		</ul>
	</div>
</template>
<script>
	import projectindependent from '../project/projectApproval/projectIndependent';
	import projectplan from '../project/projectApproval/projectPlan';
	import projectbudget from '../project/projectApproval/projectBudget';
	import projectmessage from '../project/projectApproval/projectMessage';
	export default {
	    data() {
	      	return {
	        	activeName: 'first',
	        	id:this.$store.state.projectId,
	        	className:'',
	        	auditResult:'',
	      	};
	    },
	    mounted(){
	    	var _this = this;
	    	_this.getResult();
	    },
	    methods: {
	      	handleClick(tab, event) {
	        	console.log(tab);
	      	},
	      	getResult(){
	      		var _this = this;
		    	this.$http.post('/api/projectRequest/getLatestAuditResults',{
					projectId:_this.id
				})
		    	.then(function(data){
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
	    			_this.auditResult = data.data;

		    	})
		    	.catch(function(error) {
					_this.$messageError(error);
				});
	      	}
	    },
	    components: {
			projectindependent,
			projectplan,
			projectbudget,
			projectmessage,
		}
	}
</script>
<style lang="scss" scoped>
	.projectInfo-wrapper {
		.list-group-item {
			border: 1px solid rgba(236, 236, 236, 1);
		}
		.projectAudits {
			width:990px;
			height: 136px;
			background:rgba(255,255,255,1);
			padding: 0 22px;
			padding-bottom: 15px;
			.top {
				height: 35px;
				background: #f6faff;
				border-radius: 2px 2px 0px 0px;
				border: 1px solid rgba(236, 236, 236, 1);
				line-height: 35px;
			}
			.content{
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
				}
				li:last-child {
					width: 100%;
				}
			}

		}
	}
	/*/deep/ .el-tabs__nav-wrap::after {*/
		/*background-color:#fff;*/
	/*}*/
	/deep/ .el-tabs__nav {
		margin-left: 18px;
	}
</style>
