<template>
	<div class="project-number">
		<div class="content">
			<div class="top">
				<span class="fw600">集群项目编号<i class="iconfont icon-lixiangshenqingxinxi fl"></i></span>
			</div>
			<div class="subproject">
				<table-tree v-if="isShowTreeTable" :columns="columns" :tree-structure="true" :data-source="dataSource" :tableHeader="true" :defaultExpandAll="true"></table-tree>
			</div>
		</div>

	</div>
</template>

<script>
import tableTree from "@/components/tableTree.vue";
export default {
  name: "projectNumber",
  components: {
    tableTree
  },
  data() {
    return {
      columns: [
        {
          text: "项目名称",
          dataIndex: "projectName",
          type: "text"
        },
        {
          text: "项目编号",
          dataIndex: "projectNumber",
          type: "text"
        }
      ],
      dataSource: [],
      isShowTreeTable: true
    };
  },
  created() {
    var _this = this;
    this.$http
      .post("/api/project/getProjectColonyById", {
        projectId: this.$store.state.projectId
      })
      .then(function(data) {
        //				if(data.data.length){
        //					_this.startNumber = data.data[0].projectNumber;
        //				}
        _this.dataSource = data.data;
        //				_this.$store.state.dataSource = data.data;
      });
  },
  mounted() {
    //			this.$store.state.projectNumber = this.startNumber;
  },
  methods: {
    //			operationNodeFun(val){
    //				var index = val.row.projectNumber.indexOf('-');
    //				console.log(index);
    //				if(index > 0){
    //					var num = val.row.projectNumber.substring(0,index);
    //					num = this.startNumber;
    //				}else{
    //					console.log(val.row.projectNumber);
    //					val.row.projectNumber = this.startNumber;
    //				}
    //			}
  }
};
</script>

<style scoped lang="scss">
.project-number {
  padding: 0 20px;
  padding-top: 20px;
  padding-bottom: 12px;
  background: #fff;
  min-height: 400px;
  .content {
    border: 1px solid rgba(229, 229, 229, 1);
    .subproject {
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
    }
  }
  .iconfont {
    font-size: 13px;
    margin-right: 10px;
    margin-left: 20px;
  }
  .icon-lixiangshenqingxinxi {
    color: #7c9fee;
    font-weight: normal;
  }
}
</style>
