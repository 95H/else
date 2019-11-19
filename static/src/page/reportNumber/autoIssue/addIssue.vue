<template>
	<div class="addIssue-box">
    <div class="recheck-wrapper clear">
      <label class="recheck-man width80">复审人：</label>
      <el-form ref="form" :model="form" label-width="80px"> <!-- v-if='show' -->
	    	<el-input readonly placeholder="请选择" :disabled="flag" v-model="form.recheckPersonName" @focus="selectPersons('recheckPerson')" class="width250"></el-input>
	    </el-form>
    </div>
    <div v-if='listShow'>
    	<!-- 数据列表 begin -->
    	<div class="assignRules-wrapper clear">
	      <label class="assign-rule">分配规则：</label>
	      <div class="rules-list">
	      	<!-- 未选择 begin -->
	        <div v-for="(item, index) in recheckRules" :key="index">
	        	<div v-if="dataIndex !== index"  class="rule-wrapper clear marginBottom10">
		          <ul class="display-block">
		            <li>
		              <label class="">等级：</label>
		              <span class="">{{idToName(item.gradeId,"projectLevelId")}}</span>
		            </li>
		            <li>
		              <label class="">性质：</label>
		              <span class="">{{idToName(item.natureId,"projectNatureId")}}</span>
		            </li>
		            <li>
		              <label class="">部门：</label>
		              <span class="">{{item.deptName}}</span>
		            </li>
		          </ul>
		          <!-- <div class="wrapSet-num" > {{index + 1}} </div> -->
		          <div class="operate-block">
		          	<ul>
		          		<li @click="editorData(item,index)"><i class="iconfont icon-bianji fs14"></i>编辑</li>
		          		<li @click="deleteData(item,index)"><i class="iconfont icon-shanchu2 fs14"></i>删除</li>
		          	</ul>
		          </div>
		        </div>
		        <div class="rule-wrapSet marginBottom10" v-if="dataIndex === index">
		        	<ul class="wrapSet-list">
		            <li>
		              <single-checkbox :singleradiooptions="pageOptions.statusClassify" ref="statusClassify" @onradioclick="radioStatusClassify"></single-checkbox>
		            </li>
		            <li>
		              <!-- <label class="">性质：</label> -->
		              <single-checkbox :singleradiooptions="pageOptions.taskClassify" ref="taskClassify" @onradioclick="radioTaskClassify"></single-checkbox>
		            </li>
		            <li>
		              <label class="">部门：</label>
		              <div class="mechanismBox">
							    	<div ref="branchForm" :model="branchForm" label-width="80px">
							    		<el-input readonly placeholder="请选择" v-model="branchForm.deptName" @focus="brachSelectPersons('dept')" class="width250"></el-input>
							    	</div>
		              </div>
		               
		            </li>
		          </ul>	
		          <!-- 操作按钮 -->   
		          <div class="operate-block">
		          	<ul>
		          		<li @click="saveData(item,index)"><i class="iconfont icon-baocun fs14"></i>保存</li>
		          		<li @click="delData(item,index)"><i class="iconfont icon-shanchu2 fs14"></i>删除</li>
		          	</ul>
		          </div>       
		        </div>
	        </div>
	        <div class="noData" v-if="recheckRules.length == 0">暂无数据</div>
	        <!-- 未选择 end -->
	        <!-- 已选择 begin -->
	        <div v-if="!newDataShow" class="rule-wrapSet marginBottom10">
	        	<ul class="wrapSet-list">
	            <li>
	              <single-checkbox :singleradiooptions="pageOptions.statusClassify" ref="statusClassify" @onradioclick="radioStatusClassify"></single-checkbox>
	            </li>
	            <li>
	              <!-- <label class="">性质：</label> -->
	              <single-checkbox :singleradiooptions="pageOptions.taskClassify" ref="taskClassify" @onradioclick="radioTaskClassify"></single-checkbox>
	            </li>
	            <li>
	              <label class="">部门：</label>
	              <div class="mechanismBox">
						    	<div ref="branchForm" :model="branchForm" label-width="80px">
						    		<el-input readonly placeholder="请选择" v-model="branchForm.deptName" @focus="brachSelectPersons('dept')" class="width250"></el-input>
						    	</div>
	              </div>
	               
	            </li>
	          </ul>	
	          <!-- 操作按钮 -->   
	          <div class="operate-block">
	          	<ul>
	          		<li @click="saveData()"><i class="iconfont icon-baocun fs14"></i>保存</li>
	          		<li @click="delData()"><i class="iconfont icon-shanchu2 fs14"></i>删除</li>
	          	</ul>
	          </div>       
	        </div>
	        <!-- 已选择 end -->
	      </div>
	    </div>
	    <!-- 数据列表 end -->
			<div class="marginBottom5 addListBtn" v-if="newDataShow">
	      <el-button @click="addList()"> + 添加规则 </el-button>
			</div>
    </div>

		<!-- 选择复审人 -->
    <persons-dialog ref="selectPersonsDialog" v-on:setPersonId="setPersonsId"></persons-dialog>
    <brach-dialog ref="brachPersonsDialog" v-on:setPersonId="brachPersonsId"></brach-dialog>
	</div>
</template>
<script>
	import pagination from '@/components/pagination.vue';
	import personsDialog from '@/components/personsDialog';
	import brachDialog from '@/components/brachDialog';
	import TreeNode from "@/page/fullPageModule/fullPageTreeNode";
  export default {
  	name: 'addIssue',
  	components: {
			pagination,personsDialog,TreeNode,brachDialog
		},
    data() {
      return {
      	pageOptions: {
					statusClassify: {
						txt: '等级：',
						option: [],
						optionId: [],
						optionIdOld: [],
						optionName: []
					},
					taskClassify: {
						txt: '性质：',
						option: [],
						optionId: [],
						optionIdOld: [],
						optionName: []
					}
				},
      	form: {
					recheckPerson: '',
					recheckPersonName: ''
				},
				branchForm: {
					dept: '',
					deptName: ''
				},
      	totalDataNum: 0,        //分页条数
      	pagesize: 10,           //分页10条
	      page: 1,
      	hackReset: true,
        show: false,
        listShow: true,
        treeDataShow: false,   //部门树是否展示
        checked: [],  //默认选中
        isAbled: false,  //禁用
        rankId: [],       //等级选中的id
        qualityId: [],    //性质选中的id
        rankData: [],       //等级选中的数据
        qualityData: [],     //性质选中的数据
        nodataShow: false,     //暂无数据显示隐藏
        newDataShow: true,   //新增显示隐藏
        dataIndex: '',
        checkRehearing: '',
        getRehearingId: [],   //传给后台的复审人id
        getRehearingData: [],	//传给后台的复审人值
        checkenGrade: '',   //传给后台的等级id
        checkNature: '',     //传给后台的性质id
        getCheckId: [],    //传给后台的部门id
        checkDivision: '',  //传给后台的部门值
        createData: [],      //保存传递给后台的值
        checkSignActive: '',       //标签
        recheckRules: [],
        addRule: [],
        flag:false
      }
    },
    created() {
    	let _this = this;
    	//等级
    	commonOriginalData.projectLevelId.forEach(function(val, key) {
				_this.pageOptions.statusClassify.option.push({
					name: val.name + '级',
					id: val.id
				}, )
				_this.pageOptions.statusClassify.optionIdOld.push(val.id);
			})
			/*_this.rankId.push(_this.pageOptions.statusClassify.optionId);
			_this.rankData.push(_this.pageOptions.statusClassify.optionName);*/

			//性质
			commonOriginalData.projectNatureId.forEach(function(val, key) {
				_this.pageOptions.taskClassify.option.push({
					name: val.name.slice(0, val.name.length - 2),
					id: val.id
				} )
				_this.pageOptions.taskClassify.optionIdOld.push(val.id);
			})
			/*_this.qualityId = _this.pageOptions.taskClassify.optionId;
			_this.qualityData = _this.pageOptions.taskClassify.optionName;*/

			//点击编辑数据回显
			if (this.$store.state.dataObj.judge) {
				this.nodataShow = true;
				this.getCheckId = [];
				this.getRehearingId = [];
				this.$store.state.chooseData = [];
				this.checkSignActive = this.$store.state.dataObj.checkSign;
				this.recheckRules = [];
			} else {
				this.nodataShow = false;
				this.checkSignActive = this.$store.state.dataObj.row.checkSign;
				this.recheckRules.push(this.$store.state.dataObj.row);
				this.form.recheckPersonName = this.$store.state.dataObj.row.recheckPersonName;
				this.form.recheckPerson = this.$store.state.dataObj.row.recheckPersonId;
				this.getRehearingData.push(this.$store.state.dataObj.row.recheckPersonName);
				//编辑时候复审人赋值
				this.getRehearingId.push(this.$store.state.dataObj.row.recheckPersonId);
				this.checkRehearing = this.getRehearingId.join(',');
				//编辑时候部门赋值
				this.getCheckId.push(this.$store.state.dataObj.row.deptId);
				this.checkDivision = this.getCheckId.join(',');
				this.flag = true;
				this.listData();    //调用列表接口
			}
     },
    methods: {
    	addList() { //只能追加一行新数据
    		if(this.dataIndex !== "") {
					this.$messageError('请先保存当前数据！');
				}	else{
					this.newDataShow = false;
					this.branchForm.deptName = '';
					this.branchForm.dept = '';
				}
			},
			//点击分页
			currentPageFn(val) { 
				this.page = val;
			},			
			//选择人员--多选
			selectPersons(chargeAppraiser) {
				this.$refs.selectPersonsDialog.showPersonDialog(chargeAppraiser, this.form[chargeAppraiser], this.form[chargeAppraiser + 'Name']);
			},
			setPersonsId(type,name,id){
				this.getRehearingId = [];
				//判断是否选中人员
				if(id != ''){
					this.listShow = true;
					this.getRehearingId.push(id);
					this.getRehearingData = name;
				}
				this.form[type] = id.join(',');
				this.form[type + 'Name'] = name.join(',');
			},

			//选择部门--多选
			brachSelectPersons(brachAppraiser) {
				this.$refs.brachPersonsDialog.showPersonDialog(brachAppraiser, this.branchForm[brachAppraiser], this.branchForm[brachAppraiser + 'Name']);
			},
			brachPersonsId(type,name,id){
				this.getCheckId = [];
				this.getCheckId.push(id);
				this.branchForm[type] = id.join(',');
				this.branchForm[type + 'Name'] = name.join(',');
			},
      //等级
			radioStatusClassify(val, arr) {
				/*this.rankId = [];
				if(arr) {
					this.rankId.push(arr.join(','));
				} else if(val) {
					this.rankId.push(this.pageOptions.statusClassify.optionId.join(','));
				} else {
					this.rankId = [];
				}*/
			},
      //性质
      radioTaskClassify(val, arr) {
   			/*this.qualityId = [];
				if(arr) {
					this.qualityId.push(arr.join(','));
				} else if(val) {
					this.qualityId.push(this.pageOptions.taskClassify.optionId.join(','));
				} else {
					this.qualityId = [];
				}*/
			},
			//新增中的保存按钮
			saveData() {
				if(this.$refs.statusClassify.checked && !this.$refs.statusClassify.checked.length || this.$refs.statusClassify[0] && this.$refs.statusClassify[0].checked && !this.$refs.statusClassify[0].checked.length){
					this.$messageError('请先选择等级！');
					return
				} else {
					//this.checkenGrade = this.rankId.join(',');
					//console.log(this.checkenGrade);
				}

				if(this.$refs.taskClassify.checked && !this.$refs.taskClassify.checked.length || this.$refs.taskClassify[0] && this.$refs.taskClassify[0].checked && !this.$refs.taskClassify[0].checked.length){
					this.$messageError('请先选择性质！');
					return
				}

				if(this.branchForm.deptName == ''){
					this.$messageError('请先选择部门！');
					return
				}
				
				let gradeId = '',natureId = '';
				if(this.$refs.statusClassify.checked){
					gradeId = this.$refs.statusClassify.checked.join(',');
					natureId = this.$refs.taskClassify.checked.join(',')
				}else if(this.$refs.statusClassify[0].checked){
					gradeId = this.$refs.statusClassify[0].checked.join(',');
					natureId = this.$refs.taskClassify[0].checked.join(',');
				}
				let data = {
        	gradeId: gradeId,//this.$refs.statusClassify.checked.join(','),
					natureId: natureId,//this.$refs.taskClassify.checked.join(','),
					deptName: this.branchForm.deptName,
					deptId: this.branchForm.dept
      	}
				if(this.dataIndex === ""){
					this.recheckRules.push(data);
				}else{
 					this.recheckRules.splice(this.dataIndex,1,data);
 					this.dataIndex = ""
				}
        this.newDataShow = true;
				this.$message({
					showClose: true,
					type: 'success',
					message: '保存成功!',
				});
			},
			//新增中的删除按钮
			delData(item,index) {
				var _this = this;
				if(item){
					var index = this.recheckRules.indexOf(item);
					if(index !== -1) {
						this.recheckRules.splice(index, 1);
					}
				}else{
					_this.newDataShow = true;
				}
			},
			//已有数据中的编辑
			editorData(item,index) {
				if(this.dataIndex !== '' || !this.newDataShow){
					this.$messageError('请先保存当前数据！');
				}else {
					this.dataIndex = index;
					this.newDataShow = true;
					item.listDataShow = false;
					this.pageOptions.statusClassify.optionId = item.gradeId.split(',');
					this.pageOptions.taskClassify.optionId = item.natureId.split(',');
					this.branchForm.deptName = item.deptName;
					this.branchForm.dept = item.deptId;
				}
			},
			//已有数据中的删除
			deleteData(item) {
				this.$confirm('确定删除此条数据吗?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	var index = this.recheckRules.indexOf(item);
        	if(index !== -1) {
						this.recheckRules.splice(index, 1);
						this.$message({
							showClose: true,
							type: 'success',
							message: '删除成功!',
						});
					} 
					if(this.recheckRules.length <= 0){
						this.nodataShow = true;
					}
        }).catch(() => {

        });
			},
			//列表数据接口
			listData() {
				this.$http.post('api/allocationManage/findAutoAllotByRecheckPerson', {
        	checkSign: this.checkSignActive,
        	recheckPersonId: this.checkRehearing
	      }
	      ).then(res=>{
	      	this.recheckRules = res.data;
	      }).catch(err=>{
	      	this.$messageError(err);
	      })
			},

			//新增，保存按钮
			childMethod() {
				var _this = this;
				if(_this.form.recheckPersonName == ''){
					_this.$messageError('请先选择复审人！');
					return
				} else {
					_this.checkRehearing = this.getRehearingId.join(',');
				}

				_this.createData = [];
				if(_this.recheckRules.length <= 0 ){
					_this.$messageError('请先添加要提交的内容！');
					return
				} else {
					_this.recheckRules.forEach(data=>{
						if(data.id){
							//dataId = data.id;
							_this.createData.push({
								gradeId: data.gradeId,
								natureId: data.natureId,
								deptId: data.deptId,
								id: data.id,
								status: data.status
							})
						}else{
							_this.createData.push({
								gradeId: data.gradeId,
								natureId: data.natureId,
								deptId: data.deptId
							})
						}
						
					})
					//console.log(_this.createData);
				}

				_this.$confirm('确认提交么？', '提示信息', {
			    	confirmButtonText: '确定提交',
			      cancelButtonText: '取消',
			      type: 'warning'
			    }).then(() => {
			    	if (this.$store.state.dataObj.judge) {
			        _this.modifyOrAdd(_this.checkRehearing,_this.createData);
			    	}else{
			    		_this.updateAutoAllot(_this.checkRehearing,_this.createData);
			    	}
			    }).catch(() => {
			      /*this.$message({
			        type: 'info',
			        message: '已取消操作'
			      });*/ 
			    });
      },
      modifyOrAdd(checkRehearing,createData) {
				var _this = this;
        let data = {
          checkSign: this.checkSignActive,
          recheckPersonId: checkRehearing,
          checkJson: JSON.stringify(createData)
        };
        this.$http.post('/api/allocationManage/addAutoAllot', data)
          .then(res => {
            //刷新表格
						_this.$message({
							showClose: true,
							type: 'success',
							message: '提交成功!',
						});
          	_this.$store.state.refresh();
          	_this.$store.commit('changeShowCommon');
          }).catch(err => {
	          _this.$messageError(err);
        })
      },
      updateAutoAllot(checkRehearing,createData) {
      	var _this = this;
        let data = {
          checkSign: this.checkSignActive,
          recheckPersonId: checkRehearing,
          checkJson: JSON.stringify(createData)
        };
        this.$http.post('/api/allocationManage/updateAutoAllot', data)
          .then(res => {
            //刷新表格
						_this.$message({
							showClose: true,
							type: 'success',
							message: '提交成功!',
						});
          	_this.$store.state.refresh();
          	_this.$store.commit('changeShowCommon');
          }).catch(err => {
	          _this.$messageError(err);
        })
      },
      branchTree() {
      	this.treeDataShow = true;
      },
      idToName(arr,type){
    		if(type == "projectLevelId"){
    			let projectLevelName = [];
	    		commonOriginalData.projectLevelId.forEach(function(val, key) {
						if(arr.indexOf(val.id) != -1){
							projectLevelName.push(val.name + '级');
						}
					})
					return projectLevelName.join(",");
    		}else if(type == "projectNatureId"){
    			let projectNatureName = [];
    			commonOriginalData.projectNatureId.forEach(function(val, key) {
						if(arr.indexOf(val.id) != -1){
							projectNatureName.push(val.name);
						}
					})
					return projectNatureName.join(",");
    		}
    	}
			
   	},
    
  }
</script>
<style scoped lang="scss">
  .addIssue-box{
  	margin: 20px;
    .recheck-wrapper{
      display: flex;
      margin-bottom: 10px;
      .recheck-man{margin-right: 10px; line-height: 24px; text-align: right;}
      .recheck-man, .selectPerson{font-size: 13px; color: #686868; align-items: center}
    }
    .assignRules-wrapper{
      display: flex;
      .assign-rule{
      	margin-right: 10px; 
      	line-height: 24px;
      	text-align: right;
      	width: 90px;
      }
      .assign-rule, .rules-list{
      	font-size: 13px; 
      	color: #686868;
      }
      .rules-list{
      	width: 100%;
      	.noData {
      		border: solid 1px #E1E1E1;
			    height: 200px;
			    line-height: 320px;
			    margin-bottom: 15px;
      	}
      	.icon-baocun,.icon-shanchu2,.icon-bianji{
      		margin-right: 8px;
      		color: #C0C0C0;
      	}
      }
      .rule-wrapper{
      	position: relative;
      	border:1px solid rgba(225,225,225,1);
      	padding: 15px 25px 15px 20px;
        .display-block{
        	li{
        		/*margin-left: 12px;*/
        		margin-bottom: 12px;
        		font-size: 13px;
        		label{
        			color: #686868;
        		}
        		span{
        			color: #636363;
        		}
        	}
        	li:last-child{
        		margin-bottom: 0;
        	}
        }
        .operate-block{
        	position: absolute;
        	top: 10px;
        	right: 25px;
        	ul {
        		li {
        			cursor: pointer;
        			display:inline-block;
        			color: #C0C0C0;
        		}
        		li:first-child{
        			margin-right: 16px;
        		}
        		li:hover:first-child {
        			color: #3A80EC;
        			.iconfont {
        				color: #3A80EC;
        			}
        		}
        		li:hover:last-child {
        			color: #F09237;
        			.iconfont {
        				color: #F09237;
        			}
        		}
        	}
        }
        .wrapSet-num{
      		background: #98C268;
      		width: 14px;
      		height: 102%;
      		position: absolute;
      		left: 0;
      		top: -1px;
      		text-align: center;
      		display:flex;
          justify-content:center;
          align-items:center;
      		color: #fff;
      	}
      }

      .rule-wrapSet{
      	position: relative;
      	border:1px solid #EDEDED;
      	padding: 15px 25px 15px 20px;
      	background: #F9F9F9;
      	.wrapSet-list{
      		li{
        		margin-bottom: 12px;
        		font-size: 13px;
        		label{
        			color: #686868;
        			float: left;
        			line-height: 22px;
    					margin-right: 10px;
        		}
        		.el-checkbox-group{
        			.el-checkbox__label{
        				color: #262628 !important;
        			}			
        			display: inline-block;
        		}
        		/deep/.el-input__inner {
        			width: 300px;
        		}
        		.mechanismBox{
        			position: relative;
        			.mechanism {
								width: 249px;
								height: 120px;
								box-shadow: 0px 2px 7px 0px rgba(203, 202, 202, 0.5);
								z-index: 1111;
								background: #fff;
								overflow: hidden;
								position: absolute;
								top: 25px;
    						left: 50px;
								.el-scrollbar /deep/ {
									height: 100%;
									border: 1px solid #E5E5E5;
									margin-bottom: 0;
									.el-scrollbar__wrap {
										height: calc(250px + 17px);
									}
									.filter-tree {
										padding: 6px;
									}
									.is-current * {
										background: none;
									}
									.is-current>.el-tree-node__content .el-tree-node__label {
										color: #145FD2;
										background: #EDF5FF;
										border-radius: 2px;
										border: 1px solid #91BDFF;
										line-height: 16px;
										padding: 2px;
									}
								}
								.mechanism-btn-group {
									text-align: center;
									.mechanism-btn {
										width: 70px;
										height: 25px;
										line-height: 23px;
										display: inline-block;
										color: #fff;
										background: #3A80EC;
										text-align: center;
										border-radius: 2px;
										margin: 5px;
									}
									.mechanism-cancle-btn {
										background: none;
										border: 1px solid #3A80EC;
										color: #606266;
									}
								}
							}
        		}
        		
        	}
        	li:last-child{
        		margin-bottom: 0;
        	}
      	}
      	.operate-block{
        	position: absolute;
        	top: 10px;
        	right: 25px;
        	ul {
        		li {
        			cursor: pointer;
        			display:inline-block;
        			color: #C0C0C0;
        		}
        		li:first-child{
        			margin-right: 16px;
        		}
        		li:hover:first-child {
        			color: #3A80EC;
        			.iconfont {
        				color: #3A80EC;
        			}
        		}
        		li:hover:last-child {
        			color: #F09237;
        			.iconfont {
        				color: #F09237;
        			}
        		}
        	}
        }
      }
    }

    .addListBtn {
			margin-top: 8px;
			margin-left: 90px;
			button {
				height: 25px;
				border-radius: 2px;
				border: 1px solid rgba(58, 128, 236, 1);
				font-size: 13px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(58, 128, 236, 1);
				padding: 5px 20px;
			}
		}

		/deep/ .singeCheckbox{
			height: auto !important;
		}
		/*/deep/ .el-checkbox__input.is-checked + .el-checkbox__label{
			color: #262628 !important;
		}
		/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
			border-color: #C3C3C3 !important;
    	background: #C3C3C3 !important;
		}
		/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner{
			border-color: #C3C3C3 !important;
    	background: #C3C3C3 !important;
		}
		.el-checkbox__input.is-checked + .el-checkbox__label{
				color: #3A80EC !important;
			}*/
		/deep/ .el-col-2:nth-child(2){
			margin-right: 15px;
		}
		/deep/ .el-checkbox+.el-checkbox{
			margin-left: 15px;
		}
  }
</style>
