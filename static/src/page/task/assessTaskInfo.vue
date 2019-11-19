<template>
	<div class="center-body">
		<!--任务信息-->
		<div class="requiredInformation">
			<div class="top">
				<img src="../../assets/common/must.png" />
				<span>任务信息</span>
			</div>
			<div class="junctions-Info" v-if='dataShow'>
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content">	
				  			<p>项目名称：
				  				<span>{{projectInfoAllData.projectInfo.projectName}}</span>
				  			</p>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="grid-content">
				  			<p>评估基准日：
				  				<span>{{projectInfoAllData.projectInfo.assessmentBaseDate}}</span>
				  			</p>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
				  	<div class="grid-content">	
				  			<p>来源途径：
				  				<span>{{commonData.projectSourceId[projectInfoAllData.projectInfo.ASprojectSourceId]}}</span>
				  			</p>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="grid-content">
				  			<p>项目级别：
				  				<span>{{commonData.projectLevelId[projectInfoAllData.projectInfo.projectLevelId]}}</span>
				  			</p>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content">
				  			<p>评估对象：
				  				<span>{{projectInfoAllData.projectInfo.assessmentObject}}</span>
				  			</p>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="grid-content">
				  			<p>评估报告类型：
				  				<span>{{commonData.assetReportTypeId[projectInfoAllData.projectInfo.assetReportTypeId]}}</span>
				  			</p>
				  	</div>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="12">
				  	<div class="grid-content">
				  			<p>项目性质：
				  				<span>{{commonData.projectNatureId[projectInfoAllData.projectInfo.projectNatureId]}}</span>
				  			</p>
				  	</div>
				  </el-col>
				  <el-col :span="12">
				  	<div class="grid-content">
				  			<p>资产总额：
				  				<span>{{projectInfoAllData.projectInfo.totalAssets}}</span>
				  			</p>
				  	</div>
				  </el-col>
				</el-row>
			</div>
		</div>

		<!-- 基本信息 -->
		<div class="requiredInformation" v-if='InfoShow'>
			<div class="top">
				<img src="../../assets/common/must.png" />
				<span>{{commonData.jobTypeId[this.taskInfoData.jobType]}}</span>
			</div>
			<div class="jobAllocationBox">
					  <ul>
					    <li>任务人</li>
					    <li>负责公司</li>
					    <li>科目类型</li>
					  </ul>
					  <div class="addCont">
					  	<el-form ref="listForm" label-width="80px">
					    	<el-form-item>
							    <div>{{this.taskInfoData.userName}}</div>
							  </el-form-item>
							  <el-form-item>
							  	<ol class="jobDataCompany">
							  		<li v-for="(item,index) in taskInfoData.jobCompanList" :key='index'>	
							  			{{ item.investorName }}
							  		</li>
							  	</ol>
							  </el-form-item>
							  <el-form-item>
							  	<ol class="jobDataCompany">
							  		<li v-for="(item,index) in picArr" :key="index">
							  			{{ item }}
							  		</li>
							  	</ol>
							  </el-form-item>
							</el-form>
					  </div>
					  
					</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'assessTaskInfo',
		data() {
			return {
				id: this.$store.state.projectId,
				projectInfoAllData: {},
				taskInfoData: '',
				commonData: window.commonData,
				dataShow: false,
				InfoShow: false
			};
		},
		computed:{
      picArr:function(){
        return this.taskInfoData.jobContent.split(',');
      }
    },
		created(){
			//console.log(this.$store.state.projectId);
			//console.log(this.$store.state.dataObj.id);
			this.InfoData();
    },
    mounted() {
    	//console.log(this.$store.state.projectId);
      var _this = this;
      this.$http.post('/api/projects/getProjectInfo', {
        projectId: this.$store.state.dataObj.projectId
      }).then(function (data) {
      	_this.dataShow = true;
        _this.projectInfoAllData = data.data;
      }).catch(function (error) {
        _this.$messageError(error);
      });
    },
    methods: {
    	//进入项目按钮
    	childMethod() {
    		if(this.$store.state.commonBtn == '开始工作'){
					this.beginWorkData();
				}else{
					this.onLineData(this.id);
				}
    		
    	},
    	//跳转到线上作业
    	setProjectId(id){
				//console.log(id);
        this.$store.state.projectId = id;
        this.$setCookie('projectId', id ,24*60*60);
        this.$router.push({path:'/zlpg/project/projectCont/projectImplementation/projectOnlineTask/projectInfo'})

        setTimeout(() => {
          this.$store.commit('changeShowCommon');
        }, 1000);
      },
      //跳转到线下作业
      onLineData(id){
				//console.log(id);
        this.$store.state.projectId = id;
        this.$setCookie('projectId', id ,24*60*60);
        this.$router.push({path:'/zlpg/project/projectCont/projectImplementation/projectUnderLineTask/projectInfo'})

        setTimeout(() => {
          this.$store.commit('changeShowCommon');
        }, 1000);
      },
    	//详情
    	InfoData() {
    		var _this = this;
    		_this.$http.post('/api/jobassignment/getInfo', {
	        jobId: this.$store.state.dataObj.id
	      }).then(function (data) {
	      	_this.InfoShow = true;
	        _this.taskInfoData = data.data;
	        //console.log(_this.taskInfoData);
	      }).catch(function (error) {
	        _this.$messageError(error);
	      });
    	}, 
    	//开始工作按钮
    	beginWorkData() {
    		let _this = this;
				_this.$http.post('/api/jobassignment/updateJobStage', {
	        jobId: this.$store.state.dataObj.id,
	        taskStatus: '1185'
	      }).then(function (data) {
	      	//console.log(data.data);
	      	_this.setProjectId(_this.id);
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
				p{
					font-size:13px;
					color: #777777;
					span{
						color: #1D1C1E;
					}
					.blue{
						color: #2E68E7;
					}
				}
			}
		}
	}
}

.jobAllocationBox {
	padding: 15px 20px 12px 20px;
  ul {
    height: 32px;
    background: #f6faff;
    border: 1px solid #e5e5e5;
    width: 100%;
    line-height: 32px;
    display: flex;
    box-sizing: border-box;
    li {
      text-align: center;
      border-left: 1px solid rgba(229,229,229,1);
      font-size:13px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(38,38,40,1);
    }
    li:first-child {
      width: 140px;
      border-left:none;
    }
    li:nth-child(2){
      flex: 1;
      -ms-flex:1 0 auto;
    }
    li:nth-child(3){
      flex: 1;
      -ms-flex:1 0 auto;
    }
  }
  .el-form /deep/{
  	width: 100%;
  	display: flex;
  	.el-form-item {
	    margin-bottom: 0;
	    padding: 10px 20px;
	    border: solid 1px #E5E5E5;
	    border-top: none;
	    display: -webkit-box;
	  	-webkit-box-pack: center;
	  	-webkit-box-align: center;
	  	-webkit-box-orient: vertical;
	    .jobDataCompany {
	    	li{
	    		float: left;
	    		margin-right: 20px;
	    		font-size: 13px;
	    		color: #6A6A6A;
	    		line-height: 22px;
	    	}
	    	/*li:nth-child(3n){
	    		margin-right: 0;
	    	}*/
	    	.edit-btn{
		    	span{
		    		color: #145FD2;
		    		font-size:12px;
		    		font-weight: 400;
		    		cursor:pointer;
		    	}
		    }
	    }
	    
	    :first-child {
	      margin-left: 0!important;
	    }
	    >div {
	      text-align: center;
	      .el-input {
	        height: 29px;
	        line-height: 29px;
	        .el-input__inner{
	        	border-radius: 2px;
	        	max-width: 73px;
	        	color: #909090;
	        	font-size: 13px;
	        }
	      }        
	    }
	    .el-form-item__content{
	  		display: -webkit-box;
	  	  -webkit-box-pack: center;
	  	  -webkit-box-align: center;
	  	}
	  }

	  .el-form-item:first-child{
  		width: 142px;
  		box-sizing: border-box;
	  }
	  .el-form-item:nth-child(2){
	  	flex: 1;
	  	-ms-flex:1 0 auto;
	  	border-left: none;
	  }
	  .el-form-item:nth-child(3){
	  	flex: 1;
	  	-ms-flex:1 0 auto;
	  	border-left: none;
	  }
  }
  
}
</style>