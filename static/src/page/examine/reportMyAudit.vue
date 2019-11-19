<template>
	<div class="examine">
		<div class="container">
			<div class="singleRadio-container" v-if="hackReset">
        <single-radio :singleradiooptions="auditStatus" @onradioclick="radioStateEvent"></single-radio>
				<single-radio :singleradiooptions="examineResultOptions" @onradioclick="examineResultEvent"></single-radio>
			</div>
			<div class="search-container">
				<ipt :itemsiptoptions="selectOpinion">
          <div slot="ipt-date">
            <div class="timeData">
              <span class="txt fs13" style="width:auto;">申请时间：</span>
              <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" class="marginRight20">
              </el-date-picker>
            </div>
            <div class="btn-container">
              <button class="search-btn" @click="onSubmit">搜索</button>
              <button class="reset-btn" @click="resetTable">重置</button>
            </div>
          </div>
        </ipt>
				<!-- <el-button type="primary" class="search-btn" @click="onSubmit">搜索</el-button>
				<el-button class="reset-btn" @click="resetTable">重置</el-button> -->
			</div>
		</div>
		<div class="table-card">
			<div class="table-con" v-if="tableFlag">
				<zltable ref="zltable" :dataTableHead="dataTableHead" :dataurl="dataurl" :dataSearch="tableSelect" v-on:trclick="trclick"></zltable>
			</div>
		</div>
	</div>
</template>

<script>
	import zltable from '../../components/zltable.vue';
	import Public from '../../public.js'
	export default {
		name: 'examineDetails',
		data() {
			return {
        dateArr: [],
        auditStatus: {
          txt: '审核级别：',
          option: [
            {
              name: '初审',
              label: 'usertask2'
            },
            {
              name: '复审',
              label: 'usertask3'
            },
            {
              name: '签发',
              label: 'usertask4'
            }
          ]
        },
				examineResultOptions: {
					txt: '审核结果',
					option: [{
							name: '待审核',
							label: '0'
						},
						{
							name: '已审核',
							label: '1'
						},
						{
							name: '全部',
							label: '2'
						},
					]
				},
				selectOpinion: [{
						name: '项目名称：',
						holder: '请输入项目名称',
            key: 'projectName',
            url: "/api/investors/selectProjectReport",
            formData:{
								auditingType:'usertask2',
								tabFlag:'0'
            },
						input: ''
					},
					{
						name: '项目编号：',
						holder: '请输入项目编号',
						input: ''
          },
          {
						name: '承作机构：',
            holder: '请输入承作机构',
            url: "/api/investors/selectProjectReport",
            key: 'groupName',
            formData:{
								auditingType:'usertask2',
								tabFlag:'0'
            },
						input: ''
					},
					{
						name: '申请人：',
            holder: '请输入申请人',
            url: "/api/investors/selectProjectReport",
            formData:{
								auditingType:'usertask2',
								tabFlag:'0'
            },
						key: 'createUser',
						input: ''
          }
				],
				tableSelect: {
					tabFlag: 0,
					projectName: '',
					projectNumber: '',
          applicant: "",
          auditingType: '',
          groupName: '',
          startTime: '',
          endTime: '',
          type: 'reportMyAudit',
          index: 0
				},
				dataTableHead: [{
						title: "项目名称",
						name: "projectName",
						// width: "200px"
					},
					{
						title: "项目编号",
						name: "projectNumber",
						// width: "150px"
					},
					{
						title: "承作机构",
						name: "groupName",
						// width: "150",
					},
					{
						title: "申请人",
						name: "userName",
						width: "100"
          },
					{
						title: "状态",
						name: "auditingStatus",
						width: "120"
					},
					{
						title: "申请日期",
						name: "applyTime"
					}
				], //表头数据。title：表头的title。name：接口数据字段。
				pagesize: 10, //表格每页的条数。
				totalDataNum: 1000, //表格总条数。
				dataurl: "/api/investors/selectProjectReport", //表格数据api。
				hackReset: false, //查询条件重置
				tableFlag: false, //表格重置
				isShqfData: []
			};
		},
		created() {
			let searchCondition = JSON.parse(this.$getCookie("searchCondition"))
      let _this = this
      this.$http.post("/api/sysrole/getUserRole")
	 			.then(function(data) {
           if (data.data.isJSZXZR == 1 || data.data.isSXPGS == 1) {
             _this.$emit('isJszxzr',1)
           }
         })
      this.$http.post("/api/sysrole/isShqf")
	 			.then(data => {
	 				this.isShqfData = data;
          this.auditingTypeFn(data);
          this.goBack(searchCondition);
          this.hackReset = true;
          this.tableFlag = true;
        })
      this.defaultSelectOpinion = JSON.parse(JSON.stringify(this.$data.selectOpinion));
			this.defaultTableSelect = JSON.parse(JSON.stringify(this.$data.tableSelect));
			for(let i=0;i<this.$store.state.projectMenu.child.length;i++){
				if(this.$store.state.projectMenu.child[i].functionName == '审核'){
					localStorage.setItem("index", i);
				}
      }

		},
		methods: {
			//返回回显
			goBack(searchCondition){
				if(this.$store.state.rememberSearchCondition && searchCondition && searchCondition.dataSearchPath == this.$route.path){
					this.selectOpinion[0].formData.auditingType = searchCondition.auditingType;
					this.selectOpinion[0].formData.tabFlag = searchCondition.tabFlag;
					this.auditStatus.value= searchCondition.auditingType;
					this.examineResultOptions.value= searchCondition.tabFlag;
					this.tableSelect.auditingType = searchCondition.auditingType;
					this.tableSelect.tabFlag = searchCondition.tabFlag;
					this.tableSelect.projectName = searchCondition.projectName;
					this.tableSelect.projectNumber = searchCondition.projectNumber;
					this.tableSelect.groupName = searchCondition.groupName;
					this.tableSelect.applicant = searchCondition.applicant;
					this.tableSelect.startTime = searchCondition.startTime;
					this.tableSelect.endTime = searchCondition.endTime;
					this.tableSelect.page = searchCondition.page;
					this.selectOpinion[0].input = searchCondition.projectName;
					this.selectOpinion[1].input = searchCondition.projectNumber;
	        this.selectOpinion[2].input = searchCondition.groupName;
	        this.selectOpinion[3].input = searchCondition.applicant;
	        if(searchCondition.startTime){
	        	this.dateArr=[searchCondition.startTime,searchCondition.endTime];
	        }else{
	        	this.dateArr=[];
	        }
				}
			},
      radioStateEvent(val) {
        this.tableSelect.auditingType = val;
        this.selectOpinion[0].auditingType = val
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			examineResultEvent(val) {
        this.tableSelect.tabFlag = val;
        this.selectOpinion[0].tabFlag = val
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			onSubmit() {
				this.getSearchVal();
				this.$refs.zltable.refreshPage();
			},
			getSearchVal() {
				this.tableSelect.projectName = this.selectOpinion[0].input;
				this.tableSelect.projectNumber = this.selectOpinion[1].input;
        this.tableSelect.groupName = this.selectOpinion[2].input;
        this.tableSelect.applicant = this.selectOpinion[3].input;
        this.tableSelect.startTime = this.dateArr && this.dateArr[0] ? this.dateArr[0] : '';
				this.tableSelect.endTime = this.dateArr && this.dateArr[1] ? this.dateArr[1] : '';
			},
			trclick(row) {
				this.$setCookie('projectId', row.id, 24 * 60 * 60);
				this.$store.state.projectId = row.id;
				this.$store.state.isfixedFlag = true;
				this.$router.push({
					path: "/zlpg/project/projectCont/projectAuditing/projectReportAudit/projectInfo"
				});
			},
			resetTable() {
				this.hackReset = false;
				this.$nextTick(() => {
					this.hackReset = true //重建组件
				})
				this.selectOpinion.forEach(item => {
					item.input = ''
				})
				this.dateArr=[];
				// $data用在此处，页面输入框不会置空，且vue文档中不推荐使用$data
				//this.$data.selectOpinion = Object.assign(this.$data.selectOpinion,this.defaultSelectOpinion);
				this.$data.tableSelect = Object.assign(this.$data.tableSelect, this.defaultTableSelect);
				this.auditingTypeFn(this.isShqfData);
				this.auditStatus.value = "";
				this.examineResultOptions.value= "";
				this.$refs.zltable.refreshPage();
			},
			auditingTypeFn(data){
				if(data.length==0) return
				if ((data.data.isBGQF == 0 && data.data.isBGSH == 0 && data.data.isBMJL == 0 && data.data.isJSZXZR == 0 && data.data.isSXPGS == 0) || data.data.isBMJL == 1) {
					this.$store.state.status = this.auditStatus.option[0].label;
					this.tableSelect.auditingType = 'usertask2'
				} else if (data.data.isJSZXZR == 1 || data.data.isBGSH == 1) {
					this.$store.state.status = this.auditStatus.option[1].label;
					this.tableSelect.auditingType = 'usertask3'
				} else if (data.data.isSXPGS == 1 || data.data.isBGQF == 1) {
					this.tableSelect.auditingType = 'usertask4'
					this.$store.state.status = this.auditStatus.option[2].label;
				} else {
					this.tableSelect.auditingType = 'usertask2'
					this.$store.state.status = this.auditStatus.option[0].label;
				}
			}
		},
		components: {
			zltable
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.isAllowPerson /deep/ .el-range-editor.el-input__inner {
  width: 276px!important;
}
.isAllowPerson /deep/ .el-range-editor .el-range-input {
  font-size: 12px!important;
}
.isAllowPerson /deep/ .el-date-editor .el-range-separator  {
  font-size: 12px;
  line-height: 25px;
}
	.examine {
		height: 100%;
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
	}

	.reportList {
		background-color: #fff;
		border-top: 1px solid #ebeef5;
	}

	.el-form-item {
		margin-bottom: 0px;
	}

	.search-row {
		border: 1px solid rgba(236, 236, 236, 1);
		background: #fff;
		padding: 0 30px;
		border-bottom-right-radius: 2px;
		border-bottom-left-radius: 2px;
	}
	.table-card {
		background: #fff;
		margin-top: 10px;
		flex: 1;
		-ms-flex:1 0 auto;
		.table-con,
		.table-comp {
			height: 100%;
			box-sizing: border-box;
		}
  }

.btn-container {
  position: absolute;
  right: 27px;
  top: 55px;
}
/deep/ .ipt-wrap {
  position: relative;
}
/deep/ .ipt-wrap .ipt-container{
margin-right: 10px !important;
}
// /deep/ .ipt-wrap .ipt-container:nth-child(4n) {
//   margin-right: 0 !important;
// }
/deep/ .timeData{
	padding-top: 15px;
	span{
		color: #686868;
	}
}
</style>
