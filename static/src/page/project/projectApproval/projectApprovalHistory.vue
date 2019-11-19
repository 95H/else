<template>
	<div class="projectHistory">
		<div class="content">
			<div class="top">
				<span class="fw600">审批记录<i class="iconfont icon-shenhejieguo fl"></i></span>
			</div>
			<div class="table">
				<el-table :data="nodeList" border stripe style="width: 100%" :show-summary="showSummary">
					<el-table-column prop="userName" label="审核人" width="70">
					</el-table-column>
					<el-table-column prop="createTime" label="审核时间" width="150">
					</el-table-column>
					<el-table-column prop="remarkStates" label="审核步骤" width="80">
					</el-table-column>
					<el-table-column prop="remarkType" label="审核结果" width="80">
					</el-table-column>
					<el-table-column prop="remarkContent" label="审核意见">
					</el-table-column>
					<el-table-column prop="nextExecuter" label="下一步操作人" width="110">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "projectapprovalhistory",
  data() {
    return {
      nodeList: [],
      showSummary: false
    };
  },
  created() {
    var _this = this;
    this.$http
      .post("/api/projectRequest/getActivityInfo ", {
        projectId: this.$store.state.projectId
      })
      .then(function(data) {
        if (data.data) {
          _this.nodeList = data.data.noteList;
          if (_this.nodeList.length) {
            for (var i in _this.nodeList) {
              if (_this.nodeList[i].taskType == "REVOKE") {
                _this.nodeList[i].remarkStates = "撤销";
              } else {
                if (_this.nodeList[i].processStateId == 1067) {
                  _this.nodeList[i].remarkStates = "初审";
                }
                if (_this.nodeList[i].processStateId == 1068) {
                  _this.nodeList[i].remarkStates = "初审";
                }
                if (_this.nodeList[i].processStateId == 1069) {
                  _this.nodeList[i].remarkStates = "复审";
                }
                if (_this.nodeList[i].processStateId == 1070) {
                  _this.nodeList[i].remarkStates = "复审";
                }
                if (
                  _this.nodeList[i].processStateId == 1076 ||
                  _this.nodeList[i].processStateId == ""
                ) {
                  _this.nodeList[i].remarkStates = "提交申请";
                }

                if (
                  _this.nodeList[i].processStateId == 1067 ||
                  _this.nodeList[i].processStateId == 1069
                ) {
                  _this.nodeList[i].remarkType = "通过";
                }
                if (
                  _this.nodeList[i].processStateId == 1068 ||
                  _this.nodeList[i].processStateId == 1070
                ) {
                  _this.nodeList[i].remarkType = "不通过";
                }
              }
            }
          }
        }
      })
      .catch(function(error) {
        _this.$messageError(error);
      });
  }
};
</script>

<style scoped lang="scss">
.projectHistory {
  padding: 15px 15px 12px;
  background: #fff;
  // min-height: 400px;
  .content {
    border: 1px solid rgba(229, 229, 229, 1);
    .table {
      padding: 15px 20px;
      /deep/ .el-table th,
      .el-table tr {
        background: #f4f4f4;
				padding: 3px 0;
				.cell {
          font-size: 13px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(38, 38, 40, 1);
        }
      }
    }
    .top {
      background: rgba(246, 250, 255, 1);
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
			font-size: 13px;
      .iconfont {
        font-size: 13px;
        margin-right: 10px;
        margin-left: 20px;
      }
      .icon-shenhejieguo {
        color: #57bfb2;
        font-weight: normal;
      }
    }
  }
}
</style>