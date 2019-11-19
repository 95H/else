<template>
	<div class="center-body">
		<!--任务信息 begin-->
		<div class="requiredInformation">
			<div class="top">
				<img src="../../assets/common/must.png" />
				<span>选择项目</span>
			</div>
			<div class="junctions-Info">
				<el-row>
					<el-col :span="10">
						<div class="grid-content">
							<p>项目名称：</p>
							<el-form ref="form" :model="form" label-width="80px" class="newProject">
								<el-form-item>
							    <el-select v-model="form" @change="chickvalue" value-key="projectName" placeholder="请选择项目名称">
							      <el-option v-for="(item,index) in newSpotTaskData" :label="item.projectName" :key="index" :value="item">
							      	
							      </el-option>
							    </el-select>
							  </el-form-item>
							</el-form>
						</div>
					</el-col>
					<el-col :span="7" :offset="1">
						<div class="grid-content">
							<p>项目编号：<span>{{this.newProjectNum}}</span></p>
						</div>
					</el-col>
					<el-col :span="5" :offset="1">
						<div class="grid-content">
							<p>项目负责人：<span>{{this.newProjectUser}}</span></p>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--任务信息 end-->

		<!-- 评估任务 begin -->
		<div class="requiredInformation">
			<div class="top">
				<img src="../../assets/common/must.png" />
				<span>评估任务</span>
			</div>
			<!-- 头部导航 begin -->
			<ul class="newSpotItem">
				<p>评估任务</p>
			  <li v-for="(item,index) in tabs" :key="index" :class="{active:index == num}" @click="tabItem(num,index,item.id)">
					{{item.name}}
				</li>
			</ul>
			<!-- 跳转到对应页面 begin -->
			<component v-if='show' ref="child" v-bind:is="componentsType" :projectId="newProjectId"></component>
		</div>
		<!-- 评估任务 end -->
	</div>
</template>

<script>
	import jobAllocation from "./jobAllocation";      //按资产类别分配
	/*import powerAllocation from "./powerAllocation";      //按公司分配*/
	export default {
		name: 'newSpotTask',
		components: {
	    jobAllocation
	    //,powerAllocation
	  },
		data() {
			return {
				num: 0,
				show: false,
				form: {},
				newSpotTaskData: '',
				newProjectNum: '',
				newProjectUser: '',
	      tabs: [
	        { name: "按资产类别分配",id:"jobAllocation"}
	        /*{ name: "按公司分配",id:"powerAllocation"}*/
	      ],
	      componentsType: "jobAllocation"
			};
		},
		created(){
			
    },
    mounted() { //选择项目接口
    	//console.log(this.$store.state.projectId);
      var _this = this;
      _this.$http.post('/api/project/getProjectInfoByLogin', {
        
      }).then(function (data) {
      	//console.log(data.data);
        _this.newSpotTaskData = data.data;
      }).catch(function (error) {
        _this.$messageError(error);
      });

    },
    methods:{
    	tabItem(num, index, val) {
    		this.componentsType = val;
	      this.num = index;
	      this.$emit("tabItem", index);	
	    },
	    chickvalue(val) { //下拉框数据改变时，项目编号和负责人跟着改变
	    	//console.log(this.form.projectName);
	    	this.newProjectId = val.id;
	    	this.show = false;
	    	this.$nextTick(() => {
	        this.show = true; //重建组件
	      });
	
	    	this.newProjectNum = val.projectNumber;
	    	this.newProjectUser = val.userName;
    		//console.log(this.newProjectNum);
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
					color: #505050;
					span{
						color: #1D1C1E;
					}
					.blue{
						color: #2E68E7;
					}
				}
				p:first-child{
					float:left;
				}
			}
		}
		.newSpotItem {
			font-size: 0;
			border-bottom: solid 1px #ECECEC;
			height: 35px;
			p{
				display: inline-block;
				font-size:13px;
				color: #262628;
				margin-left: 22px;
				line-height: 35px;
				position: relative;
			}
			p:after{
				content: '';
				position: absolute;
				top: 6px;
				height: 20px;
				border: 1px solid #C8C8C8;
				margin-left: 8px;
			}
			li{
				display: inline-block;
				font-size:13px;
				color: #262628;
				margin-left: 20px;
				line-height: 35px;
			}
			li.active {
	      border-bottom: solid 2px #145FD2;
	      color: #145FD2;
	    }
		}
	}
}
/deep/ .newProject{
	float:left;
	margin-top: -5px;
	.el-form-item{
		margin-bottom: 0;
		.el-form-item__content{
			margin-left: 0 !important;
			line-height: 0;
		}
	}
}

</style>