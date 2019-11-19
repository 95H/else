<template>
	<div class="projectplan-zlpg-content projectapproval">
		<!--项目基本信息-->
		<div class="importance-title title">
			<div class="top fw600">
				<span>项目基本信息<i class="iconfont icon-xiangmujibenxinxi fl"></i></span>
			</div>
			<div class="content">
				<ul>
					<li>
						<label>评估对象：</label><span :style="spceilWidth">{{showData(projectPlan.assessmentObjectDesc)}}</span>
					</li>
					<li>
						<label>评估范围：</label><span :style="spceilWidth">{{showData(projectPlan.assessmentRangeDesc)}}</span>
					</li>
					<li>
						<label>评估目的：</label><span :style="spceilWidth">{{showData(projectPlan.assessmentObjectiveDesc)}}</span>
					</li>
					<li>
						<label>资产分布情况及特点：</label><span :style="spceilWidth">{{showData(projectPlan.assessmentNature)}}</span>
					</li>
					<li>
						<label>价值类型：</label><span>{{showData(projectPlan.valuetype)}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!--项目计划-->
		<div class="plan-title title">
			<div class="top fw600">
				<span>项目计划<i class="iconfont icon-xiangmujihua fl"></i></span>
			</div>
			<div class="content">
				<ul>
					<li>
						<label>出具初稿时间：</label><span>{{showData(projectPlan.firstVersionDate)}}</span>
					</li>
					<li>
						<label>审核时间：</label><span>{{showData(projectPlan.auditDate)}}</span>
					</li>
					<li>
						<label>要求出具报告时间：</label><span>{{showData(projectPlan.reportDate)}}</span>
					</li>
					<li>
						<label>项目备案时间：</label><span>{{showData(projectPlan.fileDate)}}</span>
					</li>
					<li>
						<label>需搜集资料：</label><span>{{showData(projectPlan.majorInfo)}}</span>
					</li>
					<li>
						<label>协助配合事项：</label><span>{{showData(projectPlan.cooperationItem)}}</span>
					</li>
					<li>
						<label>外聘专家使用控制：</label><span>{{showData(projectPlan.externalExpert)}}</span>
					</li>
					<li>
						<label>项目风险控制：</label><span>{{showData(projectPlan.riskControl)}}</span>
					</li>
					<li>
						<label>报告出具体例：</label><span>{{showData(projectPlan.reportStylistic)}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!--评估方法-->
		<div class="milestone-title title">
			<div class="top fw600">
				<span>评估方法<i class="iconfont icon-lichengbei1 fl"></i></span>
			</div>
			<div class="content">
				<ul>
					<li v-if="projectPlan.ifAssetBasedMethod=='1'">
						<label>资产基础法：</label><span :style="spceilWidth">{{showData(projectPlan.assetBasedMethod)}}</span>
					</li>
					<li v-if="projectPlan.ifIncomeMethod=='1'">
						<label>收益法：</label><span :style="spceilWidth">{{showData(projectPlan.incomeMethod)}}</span>
					</li>
					<li v-if="projectPlan.ifMarketMethod=='1'">
						<label>市场法：</label><span :style="spceilWidth">{{showData(projectPlan.marketMethod)}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!--里程碑-->
		<div class="milestone-title title">
			<div class="top fw600">
				<span>里程碑<i class="iconfont icon-lichengbei1 fl"></i></span>
			</div>
			<div class="content pgpadding">
				<div class="milestone-item" v-for="(item,i) in milestoneList" :key="i">
					<ul>
						<li>
							<label>里程碑：</label><span>{{showData(milestoneList[i].mileStone)}}</span>
						</li>
						<li>
							<label>里程碑描述：</label><span>{{showData(milestoneList[i].mileStoneDesc)}}</span>
						</li>
						<li>
							<label>开始时间：</label><span>{{showData(milestoneList[i].beginDate)}}</span>
						</li>
						<li>
							<label>完成时间：</label><span>{{showData(milestoneList[i].endDate)}}</span>
						</li>
					</ul>
				</div>
				<!--<div class="isActive" v-if="milestoneList.length==0">暂无数据</div>-->
        <div class="noData" v-if="milestoneList.length==0">暂无数据</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "projectplan",
  data() {
    return {
      projectPlan: "",
      milestoneList: "",
      spceilWidth:{
      	width:"63%"
      }
    };
  },
  mounted() {
    var _this = this;
    this.$http
      .post("/api/projectRequest/setupFindPlanInfo", {
        projectId: this.$store.state.projectId
      })
      .then(function(data) {
        _this.projectPlan = data.data.projectPlan;
        _this.milestoneList = data.data.projectMilestonePlanList;
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  },
  methods:{
    //回显数据
    showData(data){
      return data ? data : '--'
    },
  },
};
</script>

<style lang="scss" scoped>
.projectplan-zlpg-content {
  /*border-bottom: 1px solid #ECECEC;*/
	padding:15px 15px 12px;
  .title {
    border: 1px solid rgba(229, 229, 229, 1);
    margin-bottom: 12px;
		&:last-child{ margin-bottom: 0;}
  }
  .milestone-title {
    height: auto;
    .milestone-item {
      background: rgba(249, 249, 249, 1);
      margin-bottom: 15px;
      li {
        width: 45%;
        line-height: 33px;
        padding-left: 20px;
      }
    }
    .milestone-item:last-child{
      margin-bottom: 0;
    }
    .content {
      padding-left: 45px;
      padding-top: 24px;
      padding-bottom: 24px;
    }
    .pgpadding {
			padding: 15px 25px;
			ul {
				li:nth-child(even) {
					padding-left: 40px;
				}
			}
    }
    .isActive {
      text-align: center;
      color: #909090;
    }
    .noData{
      height: 100px;
      line-height: 180px;
    }
  }
  .content {
    font-size: 13px;
    line-height: 25px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    overflow: hidden;
    padding: 28px 40px;
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 49%;
        margin-bottom: 3px;
        margin-left: 0;
        label {
        	float: left;
          color: #777777;
        }
        span {
        	float: left;
          display: inline-block;
          color: #1d1c1e;
        }
      }
    }
  }
  .top {
    background: rgba(246, 250, 255, 1);
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    font-size: 13px;
  }
  .iconfont {
    font-size: 13px;
    margin-right: 10px;
    margin-left: 20px;
  }
  .icon-xiangmujibenxinxi {
		color: #98c268;
		font-weight: normal;
  }
  .icon-xiangmujihua {
		color: #5fa9ec;
		font-weight: normal;
  }
  .icon-lichengbei1 {
		color: #c3a2eb;
		font-weight: normal;
  }
}
</style>
