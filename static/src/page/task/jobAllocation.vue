<template>
	<div class="jobAllocation">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane v-for="(itemTabs, tabIndex) in editableTabs" :key="tabIndex" :label="itemTabs.name" :name="String(itemTabs.id)">
				<div class="jobAllocationBox">
					<ul>
						<li>任务人</li>
						<li>负责公司</li>
						<li>科目类型</li>
						<li>操作</li> 	<!-- v-if='urlShow && ($store.state.readonly && !$store.state.isNoEditInvestorPower)'  -->
					</ul>
					<div class="addCont">
						<el-form ref="listForm" v-model="jobList" label-width="80px" v-for="(item, index) in jobList" v-if='item.jobType == idjobType && jobList.length>0' :key="index" class="clearfix">
							<el-form-item>
								<!-- <el-select v-bind:disabled="item.isAbled" v-model="item.projectLeaderUserName" placeholder="请选择" value-key="projectLeaderUserName">
									<el-option v-for="(item,optionIndex) in SelectPeopleData" :label="item.projectLeaderUserName" :key="optionIndex" :value="item">

									</el-option>
								</el-select> -->
								<el-input v-bind:disabled="item.isAbled" v-model="item.projectLeaderUserName.projectLeaderUserName" class="ipt ipt-25h" @focus="iptEvent('user',index)"></el-input>
							</el-form-item>
							<el-form-item>
								<div v-model="item.companyName" class="contantBox">
									<ol class="jobDataCompany">
										<li v-for="(compnyItem,CompanyIndex) in item.companyName" :key="CompanyIndex">
											{{ compnyItem }}
										</li>
										<li class="edit-btn" v-if='item.compileBtn'>
											<span @click='editCompany(item,index)'>+ 编辑负责公司</span>
										</li>
									</ol>
								</div>
								<div v-model="item.subjectsName" class="contantBox">
									<ol class="jobDataCompany">
										<li v-for="(typeItem,TypeIndex) in item.subjectsName" :key="TypeIndex">
											{{ typeItem }}
										</li>
										<li class="edit-btn" v-if='item.compileBtn'>
											<span @click='editSubjectType(item,index)'>+ 科目类型</span>
										</li>
									</ol>
								</div>
							</el-form-item>

							<el-form-item v-model="item.operate" > <!-- v-if='urlShow && ($store.state.readonly && !$store.state.isNoEditInvestorPower)' -->
								<span class="keepBtn" @click="saveData(item)" v-if="item.cancelShow">保存</span>
								<span class="cancel" @click.prevent="deleteList(item,index)" v-if="item.cancelShow">取消</span>
								<span class="keepBtn" @click="editData(item,index)" v-if="item.dataShow">编辑</span>
								<span class="cancel" @click.prevent="deleteData(item)" v-if="item.dataShow">删除</span>
							</el-form-item>
						</el-form>

						<div class="white-bg">
							<div class="pagination-con  text-center" v-if="totalDataNum > 10">
								<pagination ref="pagination" v-if="hackReset" :pagesize="pagesize" :totalDataNum="totalDataNum" v-on:currentPageFn="currentPageFn"></pagination>
							</div>
							<!--<div class="noData" v-if="totalDataNum  == 0">暂无数据</div>-->
						</div>
						<!--  -->
            <!-- v-if='urlShow && ($store.state.readonly && !$store.state.isNoEditInvestorPower)' -->
            <div class="marginBottom5 addListBtn clearfix">
            <el-button @click="addList()"> +新增 </el-button>
						</div>
					</div>

				</div>
			</el-tab-pane>
		</el-tabs>

		<!-- 选择人弹框 -->
		<center-dialog ref="selectPerson" :dialogTitle="`选择任务人`" dialogHeight="450px" dialogWidth="450px">
      <div slot="dialogContent">
        <div class="popupBody-container">
          <div class="border-container">
            <div class="popup-list">
              <el-scrollbar :style="{'height': popupData.length>=1 ? '292px':'100%'}" :noresize="false">
                <el-table ref="popupTable" :data="popupData" border stripe style="width: 100%" class="kcTable">
				          <el-table-column width="50">
				            <template slot-scope="scope">
				              <el-radio
				                :label="scope.row.projectLeaderUserId"
				                v-model="templateRadio"
				                @change.native="getTemplateRow(scope.$index,scope.row)"
				              >&nbsp;</el-radio>
				            </template>
				          </el-table-column>
				          <el-table-column label="姓名">
				            <template slot-scope="scope">
				              <div>{{scope.row.source == ''? scope.row.projectLeaderUserName : scope.row.projectLeaderUserName + '（新增）'}}</div>
				            </template>
				          </el-table-column>
				          <!-- <el-table-column prop="projectLeaderUserName" label="姓名"></el-table-column> -->
				        </el-table>
              </el-scrollbar>
            </div>
            <p class="seleRetrialIssuerTitle">
              <span>其他</span>
              <el-input v-model="otherUser.otherUserName" @focus="popupIpt('otherUser')" style="width:140px;" placeholder="请选择"></el-input>
            </p>
          </div>
        </div>
        <div class="popupBtn-container">
          <a class="search-btn" @click="popupConfirm">确认</a>
          <a class="reset-btn" @click="popupClose">取消</a>
        </div>
      </div>
    </center-dialog>
		<!-- 选择人员 -->
		<person-dialog ref="selectPersonProject" v-on:setPersonId="setPersonId"></person-dialog>

		<!-- 编辑负责公司穿梭框 begin -->
		<div class="EidtTransferBox" v-if='show'>

			<div class="transferBox">
				<div class="transferBox-title">评估作业任务分配
					<span><i class="el-icon-close" @click="show = false"></i></span>
				</div>
				<div class="transferBox-cont">
					<!--<el-transfer v-model="value1" :data="generateData" :right-default-checked="value1" :titles="['负责公司', '分配结果']"></el-transfer>-->
					<Transfer v-model="value1" :data="generateData" :right-default-checked='value1' :titles="['负责公司', '分配结果']"></Transfer>
				</div>
				<div class="transferBox-but">
					<a class=" search-btn" type="primary" @click="editSubmit">确认提交</a>
					<a class=" reset-btn" type="primary" @click="editAbolish">取消</a>
				</div>

				<!-- <el-button :plain="true" @click="open8">错误</el-button> -->
			</div>
			<div class="mask"></div>
		</div>
		<!-- 编辑负责公司穿梭框 end -->

		<!-- 科目类型穿梭框 begin -->
		<div class="EidtTransferBox" v-if='typeShow'>
			<div class="transferBox">
				<div class="transferBox-title">
					分配科目
					<span><i class="el-icon-close" @click="typeShow = false"></i></span>
				</div>
				<div class="transferBox-cont">
					<!--<el-transfer v-model="value2" :data="generateType" :titles="['未分配科目', '选中科目']"></el-transfer>-->
					<Transfer v-model="value2" :right-default-checked='value2' :data="generateType" :titles="['未分配科目', '选中科目']"></Transfer>
				</div>
				<div class="transferBox-but">
					<el-button class="submit" type="primary" @click="typeSubmit">确认提交</el-button>
					<el-button class="abolish" type="primary" @click="typeAbolish">取消</el-button>
				</div>
			</div>
			<div class="mask"></div>
		</div>


		<!-- 科目类型穿梭框 end -->
	</div>
</template>

<script>
	import Transfer from './transfer/transferMain.vue';
	import personDialog from "@/components/personDialog";
	import CenterDialog from "@/components/centerDialog";
	import pagination from '@/components/pagination.vue';
	export default {
		name: 'jobAllocation',
		props: ['projectId'],
		components: {
			Transfer,personDialog,CenterDialog,pagination
		},
		data() {
			return {
				personIndex:'',
				value1: [], //负责公司中右侧的值
				value2: [], //科目类型中右侧的值
				activeName: '',
				show: false,
				typeShow: false,
				urlShow: true,
				index: '', //负责公司的index
				typeIndex: '', //科目类型的index
				presideCompony: '', //给后台传的选中的负责公司
				ComponyDataId: '', //给后台传的去除最后一个,的值
				presideName: '', //给后台传的选中的科目类型
				slectTypeData: '', //给后台传的去除最后一个,的值
				joberName: '', //接口中下拉选中人员的数据
				joberValue: '', //传给后台的下拉框中的value
				tabLabel: '', //tab切换的lable值
				editableTabs: '', //接口的tab切换值
				SelectPeopleData: '', //下拉框接口数据
				createData: [], //创建接口传递给后台的值
				idjobType: '', //使tab切换等于新增列表的tab
				jobProjectId: '', //projectId的路径
				jobList: [],
				startCompanyName: [], //初始公司名称
				startSubjectsName: [], //初始科目类型
				startUserName: '', //初始任务人
				companyData: [], //获取编辑公司的数据
				courseTypeData: [], //获取科目类型的数据
				jobId: '',
				repeatComeData: [],   //存储相同公司的数据
				repeatTypeData: [],    //存储相同科目类型的数据
				popupData: [],         //存储接口任务人数据
	      templateSelection: '',
	      templateRadio: '',
	      totalDataNum: 0,        //分页条数
	      pagesize: 10,           //分页10条
	      page: 1,
	      otherUser: {
	      	otherUserName: '',
	      	otherUserId: ''
	      },
				dataTableHead:[  //选择任务人弹窗表头
	        {
	          title:"",
	          name:"",
	          width:"60"
	        },
	        {
	          title:"姓名",
	          name:"projectLeaderUserName",
	          width:""
	        }
	      ],
        hackReset: true
			};
		},
		created() {
			//console.log(this.value1);
			//console.log(this.$store.state.projectId);
			var _this = this;
			//获取当前页面路径，如果是评估任务显示评估任务按钮
			if(this.$route.path == '/zlpg/task/assessTask') {
				this.jobProjectId = this.projectId;
			} else {
				this.jobProjectId = this.$store.state.projectId;
				//this.listData();             //列表接口
			}
			//this.selectData(); //下拉框数据
			this.tabItemData(); //tab切换数据

			//获取页面初始数据
			this.$store.state.updateList = function() {
				_this.page = 1;
        _this.hackReset = false //销毁组件
        _this.$nextTick(() => {
          _this.listData();
          _this.hackReset = true //重建组件
        })

			}
		},
		computed: {
			//编辑负责公司穿梭框赋值
			generateData() {
				const data = [];
				//debugger
				this.companyData.forEach((city, index) => {
					data.push({
						label: city.name,
						key: index,
						id: city.id
					});
				});
				return data;
			},
			generateType() {
				const typeData = [];
				this.courseTypeData.forEach((type, index) => {
					typeData.push({
						label: type.sheetName,
						key: index,
						id: type.id
					});
				});
				return typeData;
			}
		},
		watch: {
			//判断当前路由路径，显示新建现场任务或新建评估任务
			$route(to, from) {
				if(this.$route.path == '/zlpg/task/assessTask') {
					this.jobProjectId = this.projectId;
				} else {
					this.jobProjectId = this.$store.state.projectId;
					//this.listData(); //列表接口
					//console.log(this.jobProjectId);
				}
			}
		},
		methods: {
			handleClick(tab, event, val) { //点击切换tab
				//console.log(tab,event,tab.name);
				//console.log(event.target.getAttribute('id'))

				this.idjobType = tab.name;
				this.tabLabel = tab.label; //tab的lable值
				this.joberValue = ''; //清空下拉框的值
				this.listData();
			},
			addList() { //只能追加一行新数据
				if(this.jobList == '') {
					this.jobList.push(this.addListData());
					//console.log(this.jobList[(this.jobList.length - 1)]);
				} else if(this.jobList[(this.jobList.length - 1)].id) {
					if(this.jobList[(this.jobList.length - 1)].cancelShow == false){
						this.jobList.push(this.addListData());
					}else{
						this.$messageError('请先保存当前数据！');
					}
				} else {
					this.$messageError('请先保存当前数据！');
					/*if(!this.jobList[(this.jobList.length-1)].companyName == ''){
						this.saveData(this.jobList[(this.jobList.length-1)]);
					}*/
				}
			},
			addListData() {
				return {
					projectLeaderUserName:{
						projectLeaderUserName: '',
						projectLeaderUserId: ''
					},
					companyIds: '',
					companyId: [], //公司id
					companyName: '', //公司名称
					companyKey: [], //公司key值
					subjects: '',
					subjectsId: [], //科目id
					subjectsName: [], //科目名称
					jobType: this.idjobType,
					cancelShow: true,
					dataShow: false,
					compileBtn: true,
					isAbled: false
				}
			},
			editData(item,index) { //点击编辑按钮
				console.log(index);
				/*this.jobList.forEach((item) => {
					if(item.cancelShow == true){
						this.$messageError('请先保存当前数据！');
						return
					}

      	}) */

				item.isAbled = false;
				item.dataShow = false;
				item.cancelShow = true;
				item.compileBtn = true;
			},
			deleteData(item) { //删除所在行
				this.cutOutDataConfom(item);
			},
			deleteList(item,index) { //取消操作
				var _this = this;
				var indexNum = index;
				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}
				this.$http.post('/api/jobassignment/findJobList', {
					taskType: 1,
					projectId: _this.jobProjectId,
					jobType: _this.idjobType,
					pagesize: this.pagesize,
					page: this.page
				}).then(function(data) {
					if(item.id) {
						item.isAbled = true;
						item.dataShow = true;
						item.cancelShow = false;
						item.compileBtn = false;
						item.companyName = data.data[indexNum].companyName;
						item.subjectsName = data.data[indexNum].subjectsName;
						item.userName = data.data[indexNum].projectLeaderUserName.projectLeaderUserName;
					}else{
						var index = _this.jobList.indexOf(item);
						if(index !== -1) {
							_this.jobList.splice(index, 1);
						}
					}

				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			saveData(item) {
				//console.log(item);
				item.projectLeaderUserId = this.templateRadio;
				if(item.projectLeaderUserName.projectLeaderUserName == '') {
					this.$messageError('请选择任务人！');
					return
				} else if(item.projectLeaderUserId == ''){
					item.projectLeaderUserId = this.otherUser.otherUserId;
					this.joberValue = item.projectLeaderUserId;
				}else {
					this.joberValue = item.projectLeaderUserId;
				}

				//负责公司
				this.presideComponyId = '';
				if(item.companyId.length == 0) {
					this.$messageError('请选择负责公司！');
					return
				} else {
					item.companyId.forEach((item) => {
						this.presideComponyId += item + ',';
						this.ComponyDataId = this.presideComponyId.substring(0, this.presideComponyId.lastIndexOf(','))
						//console.log(this.ComponyDataId);
					})
				}

				//科目类型
				this.presideName = '';
				if(item.subjectsName.length == 0) {
					this.$messageError('请选择科目类型！');
					return
				} else {
					item.subjectsName.forEach((item) => {
						this.presideName += item + ',';
						this.slectTypeData = this.presideName.substring(0, this.presideName.lastIndexOf(','))
					})
				}

				//this.tabItemData();          //tab切换数据

				this.jobNewData(item); //调用新建接口
				this.editorData(); //刷新编辑公司
			},
			editCompany(item, index) { //点击负责公司中的编辑
				var _this = this;
				_this.value1 = [];
				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}
				this.$http.post('/api/investors/selectJobtList', {
					projectId: _this.jobProjectId,
					jobType: _this.idjobType
				}).then(function(data) {
					_this.companyData = data.data;
					_this.repeatComeData = [];
					if(item.id) {
						for(var i = 0; i < _this.generateData.length; i++) {
							//console.log(_this.generateData[i]);  
							for(var j = 0; j < item.companyName.length; j++) {      
								if(_this.generateData[i].label === item.companyName[j]) {      
									_this.repeatComeData.push(_this.generateData[i]);     
								}    
							}  
						}
						_this.repeatComeData.forEach((item,index)=>{
							//console.log(item.key);
							_this.value1.push(item.key);
						})
					}
					_this.index = index;
					_this.show = true;
				}).catch(function(error) {
					_this.$messageError(error);
				});
//				_this.editorData(); //编辑公司的接口数据
//				console.log(_this.editorData());
				//console.log(item.companyName, item, _this.value1);
			},
			editSubjectType(item, index) { //点击科目类型中的编辑
				var _this = this;
				_this.typeIndex = index;
				_this.value2 = [];

				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}

				//调用科目类型接口
				if(this.jobList[index].companyId.join(",") == '') {
					this.$messageError('请先选择负责公司！');
					return false;
				} else {
					this.$http.post('/api/jobassignment/selectJobContent', {
						projectId: this.jobProjectId,
						investorIds: this.jobList[index].companyId.join(","),
						jobType: _this.idjobType
					}).then(function(data) {
						//console.log(data.data);
						_this.courseTypeData = data.data;
						_this.typeShow = false; //销毁组件
						_this.$nextTick(() => {
							_this.typeShow = true; //重建组件
						});

						_this.repeatTypeData = [];
						if(item.id) {
							for(var i = 0; i < _this.generateType.length; i++) {
								//console.log(_this.generateData[i]);  
								for(var j = 0; j < item.subjectsName.length; j++) {      
									if(_this.generateType[i].label === item.subjectsName[j]) {      
										_this.repeatTypeData.push(_this.generateType[i]);     
									}    
								}  
							}
							_this.repeatTypeData.forEach((item,index)=>{
								//console.log(item.key);
								_this.value2.push(item.key);
							})
						}
						//console.log(courseTypeData);
					}).catch(function(error) {
						_this.$messageError(error);
					});
				}

			},
			editAbolish() { //点击负责公司中的取消
				this.show = false;
			},
			typeAbolish() { //点击科目类型中的取消
				this.typeShow = false;
			},
			editSubmit() { //点击负责公司中的确认提交
				var _this = this;
				_this.editCompanyId = []; //获取接口中公司的id;
				_this.editCompanyData = []; //获取接口中公司的label值;
				_this.editCompanyKey = []; //获取接口中公司的key值;

				for(var i in _this.value1) {
					_this.editCompanyData.push(_this.generateData[_this.value1[i]].label);
					_this.editCompanyId.push(_this.generateData[_this.value1[i]].id);
					_this.editCompanyKey.push(_this.generateData[_this.value1[i]].key);
				}
				this.jobList[this.index].companyName = _this.editCompanyData;
				this.jobList[this.index].companyId = _this.editCompanyId;
				this.jobList[this.index].companyKey = _this.editCompanyKey;
				//				console.log(this.jobList[this.index].companyKey);
				this.jobList[this.index].companyIds = _this.jobList[this.index].companyId.join(",");

				//判断右侧内容是否为空
				if(_this.value1.length == 0) {
					this.$messageError('右侧内容不能为空！');
					this.show = true;
				} else {
					this.show = false;
				}

			},
			typeSubmit() { //点击科目类型中的确认提交
				var _this = this;
				_this.subjectTypeId = []; //获取接口中科目类型的label值;
				_this.subjectTypeData = []; //获取接口中科目类型的id;
				for(var i in _this.value2) {
					_this.subjectTypeData.push(_this.generateType[_this.value2[i]].label);
					_this.subjectTypeId.push(_this.generateType[_this.value2[i]].id);
					//console.log(_this.subjectTypeData);
				}
				this.jobList[this.typeIndex].subjectsName = _this.subjectTypeData;
				this.jobList[this.typeIndex].subjectsId = _this.subjectTypeId;
				this.jobList[this.typeIndex].subjects = this.jobList[this.typeIndex].subjectsId.join(",");

				//判断右侧内容是否为空
				if(_this.value2.length == 0) {
					this.$messageError('右侧内容不能为空！');
					this.typeShow = true;
				} else {
					this.typeShow = false;
				}

			},
			jobNewData(item) { //新建接口
				let _this = this;
				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}
				this.createData = []; //清空之前保存的数据
				if(item.id) {
					this.jobId = item.id
				} else {
					this.jobId = ''
				}
				this.createData.push({
					investorIds: this.ComponyDataId,
					headUserId: this.joberValue,
					jobType: this.idjobType,
					jobContent: this.slectTypeData,
					jobId: this.jobId
				})
				//console.log(this.createData);
				let dataJson = {
					projectId: this.jobProjectId,
					dataJson: JSON.stringify(this.createData)
				}
				//return;
				_this.$http.post('/api/jobassignment/createJobAssignment', dataJson)
					.then(response => {
						this.$message({
							showClose: true,
							type: 'success',
							message: '创建成功!'
						});

						/*this.joberValue = ''; //清空下拉框的值
						this.jobList[this.index].companyName = ''; //清空编辑公司的值;
						this.jobList[this.typeIndex].subjectsName = []; //清空科目类型的值;*/

						this.listData(); //调用列表接口
						item.isAbled = true;
						item.dataShow = true;
						item.cancelShow = false;
						item.compileBtn = false;
						//刷新表格
						_this.$store.state.refresh();
					}).catch(error => {
						_this.$messageError(error);
					})
			},
			selectData() { //选择任务人接口
				var _this = this;
				_this.$http.post('/api/project/getUsers', {
					projectId: this.jobProjectId
				}).then(function(data) {
					_this.SelectPeopleData = data.data;
					//console.log(_this.SelectPeopleData);
				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
	    //点击取消按钮后，首个弹窗的处理
	    popupClose() {
	      this.$refs.selectPerson.closeDialog();
	      this.templateRadio = "";
	      this.otherUser.otherUserName = "";
	      this.otherUser.otherUserId = "";
	    },
			iptEvent(user,index) {
	      const _this = this;
				this.personIndex = index;
	      _this.$refs.selectPerson.showDialog();
	      _this.$http.post("/api/project/getUsers", {
	      		projectId: this.jobProjectId
	      	}).then(res => {
	          _this.popupData = res.data;
	          //console.log(_this.popupData);
	          //实时获取选中人员
	          _this.$nextTick(()=>{
              _this.popupData.forEach(item=>{
                _this.$refs.popupTable.toggleRowSelection(item)
              })
	          })

	        })
	        .catch(err => {
	          console.log(err);
	        });
	    },
	    getTemplateRow(index, row) {
	    	this.templateSelection = row;
				//console.log(this.templateSelection)
	      if (this.templateRadio != "") {
	        this.otherUser.otherUserName = "";
	        this.otherUser.otherUserId = "";
	      }
	      this.joberValue = this.templateSelection.projectLeaderUserId;
	      //console.log(this.joberValue);
	    },
	    popupIpt(otherUser) {
	      this.$refs.selectPersonProject.showPersonDialog(otherUser);
	    },
	    setPersonId(type,name,id){
				const _this = this;
			  this.otherUser[type + "Id"] = id;
	      this.otherUser[type + "Name"] = name;
	      this.templateRadio = "";
	      this.joberValue = id;
			},
	    //选人完毕后，
	    popupConfirm() {
        //选择表格里的人员
        if(this.templateRadio != "" && this.otherUser.otherUserName == "") {
        	//console.log(this.jobList[(this.jobList.length - 1)]);
          this.jobList[this.personIndex].projectLeaderUserName.projectLeaderUserName = this.templateSelection.projectLeaderUserName;
          this.$refs.selectPerson.closeDialog();
        } else if(this.templateRadio == "" && this.otherUser.otherUserName != "") {
        	//选择其他
          this.jobList[this.personIndex].projectLeaderUserName.projectLeaderUserName = this.otherUser.otherUserName;
          this.joberValue = this.otherUser.otherUserId;
          this.$refs.selectPerson.closeDialog();
        }
	    },
			tabItemData() { //tab切换接口
				var _this = this;
				_this.$http.post('/api/jobassignment/selectTypeList', {
					projectId: this.jobProjectId
				}).then(function(data) {
					_this.editableTabs = data.data;
					//console.log(_this.editableTabs);
					if(data.data.length) {
						_this.activeName = _this.editableTabs[0].id + ''; //默认显示第一个
						_this.idjobType = _this.editableTabs[0].id + ''; //默认第一个的id为接口第一个id
						_this.$store.state.jobTypeTab = _this.idjobType;

						_this.listData();
					}

				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			editorData() { //编辑负责公司接口
				var _this = this;
				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}
				this.$http.post('/api/investors/selectJobtList', {
					projectId: _this.jobProjectId,
					jobType: _this.idjobType
				}).then(function(data) {
					_this.companyData = data.data;
					//console.log(_this.companyData);
				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			ProjectTypeData(index) { //科目类型接口
				var _this = this;
				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}
				_this.$http.post('/api/jobassignment/selectJobContent', {
					projectId: this.jobProjectId,
					investorIds: this.jobList[index].companyId.join(","),
					jobType: _this.idjobType
				}).then(function(data) {
					//console.log(data.data);
					_this.courseTypeData = data.data;
					_this.typeShow = false; //销毁组件
					_this.$nextTick(() => {
						_this.typeShow = true; //重建组件
					});
					//console.log(courseTypeData);
				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			listData() { //保存成功之后显示列表数据
				var _this = this;
				if(_this.idjobType == '') {
					_this.idjobType = _this.$store.state.jobTypeTab;
				}
				_this.$http.post('/api/jobassignment/findJobList', {
					taskType: 1,
					projectId: this.jobProjectId,
					investorId: _this.$store.state.investorId,
					jobType: this.idjobType,
					pagesize: this.pagesize,
					page: this.page
				}).then(function(data) {
					_this.totalDataNum = data.count * 1;
					var entryData2 = data.data;
					for(let value of entryData2) {          
						if(value.flag == 0) {
							_this.urlShow = false;
						} else if(value.flag == 1) {
							_this.urlShow = true;
						}
						value.dataShow = true;
						value.cancelShow = false;
						value.compileBtn = false;
						value.isAbled = true;        
					}
					_this.jobList = [...entryData2];

				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			currentPageFn(val) { //点击分页
				this.page = val;
				this.listData();
			},
			cutOutData(item) { //删除接口
				//console.log(item.id);
				var _this = this;
				_this.$http.post('/api/jobassignment/updateJobStatus', {
					jobId: item.id
				}).then(function(data) {
					_this.$message({
						showClose: true,
						type: 'success',
						message: '删除成功!',
					});
					_this.listData(); //刷新列表数据
					_this.editorData(); //刷新编辑公司数据
				}).catch(function(error) {
					_this.$messageError(error);
				});
			},
			cutOutDataConfom(item) { //点击删除按钮
				var _this = this;
				this.$confirm('确认要删除此项目吗？', '提示信息', {
					confirmButtonText: '确定删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.cutOutData(item);
				}).catch(() => {
					/*this.$message({
						type: 'info',
						message: '已取消操作'
					});*/

				});
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	/deep/ .el-tabs__header {
		background: #FAFAFA;
		margin: 0;
	}

	/deep/ .el-tabs__nav-wrap::after {
		height: .8px;
		background-color: #E5E5E5;
	}

	/deep/ .el-tabs__active-bar {
		height: .8px;
		background-color: #145FD2;
	}

	/deep/ .el-tabs__item.is-active {
		color: #145FD2;
	}

	/deep/ .el-tabs__item:hover {
		color: #145FD2;
	}

	/deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
		padding-left: 3px;
	}

	/deep/ .el-tabs__nav {
		transform: translateX(20px) !important;
	}

	/deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(1) .el-tabs__active-bar {
		margin-left: 12px !important;
	}

	/deep/ .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
		font-size: 13px;
	}

	/deep/ .borderColor {
		border-color: #fb0a0a !important;
	}

	/deep/ .el-transfer-panel__item {
		.el-checkbox__label {
			font-size: 12px;
		}
	}

	/deep/ .el-transfer-panel {
		width: 300px !important;
	}

	.jobAllocation {
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
					border-left: 1px solid rgba(229, 229, 229, 1);
					font-size: 13px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(38, 38, 40, 1);
				}
				li:first-child {
					width: 140px;
					border-left: none;
				}
				li:nth-child(2) {
					flex: 1;
					-ms-flex:1 0 auto;
				}
				li:nth-child(3) {
					flex: 1;
					-ms-flex:1 0 auto;
				}
				li:last-child {
					width: 140px;
				}
			}
			.el-form /deep/ {
				width: 100%;
				display: flex;
				box-sizing: border-box;
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
						li {
							float: left;
							margin-right: 30px;
							font-size: 13px;
							color: #6A6A6A;
							line-height: 22px;
							z-index: 999;
    					position: relative;
						}
						.edit-btn {
							span {
								color: #145FD2;
								font-size: 12px;
								font-weight: 400;
								cursor: pointer;
							}
						}
					}
					.keepBtn {
						color: #145FD2;
						text-align: center;
						cursor: pointer;
					}
					.keepBtn:hover {
						text-decoration: underline;
					}
					.cancel {
						color: #F09237;
						text-align: center;
						cursor: pointer;
						margin-left: 12px !important;
					}
					.cancel:hover {
						text-decoration: underline;
					}
					:first-child {
						margin-left: 0!important;
					}
					>div {
						text-align: center;
						font-size: 12px;
						word-wrap:break-word;
						.el-input {
							height: 29px;
							line-height: 29px;
							.el-input__inner {
								border-radius: 2px;
								/*max-width: 73px;*/
								color: #909090;
								font-size: 13px;
							}
						}
					}
					.el-form-item__content {
						display: -webkit-box;
						-webkit-box-pack: center;
						-webkit-box-align: center;
					}
				}
				.el-form-item:first-child {
					width: 141px;
					box-sizing: border-box;
					border-right: none;
				}
				.el-form-item:nth-child(2) {
					flex: 1;
					position: relative;
					.el-form-item__content{
						width: 100%;
						.contantBox{
							width: 50%;
							float: left;
							z-index: 999;
    					position: relative;
						}
						.contantBox:first-child{
							padding-right: 20px;
    					box-sizing: border-box;
						}
						.contantBox:last-child{
							box-sizing: border-box;
							padding-left: 20px;
						}
					}
					
				}
				.el-form-item:nth-child(2):after{
					content: " ";
					position: absolute;
					top: 0;
					left: 50%;
					width: 1px;
					height: 100%;
					background: #e5e5e5;
				}
				/*.el-form-item:nth-child(3) {
					flex: 1;
					-ms-flex:1 0 auto;
				}*/
				.el-form-item:last-child {
					width: 141px;
					box-sizing: border-box;
					border-left: none;
				}
			}
			.addListBtn {
				margin-top: 8px;
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
		}
		.transferBox {
			background: #fff;
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			box-sizing: border-box;
			width: 665px;
			max-width: 665px;
			max-height: 400px;
			z-index: 1120;
			.transferBox-title {
				height: 35px;
				background: #fafafa;
				border-radius: 2px 2px 0px 0px;
				border: 1px solid #ececec;
				border-left: 0;
				border-right: 0;
				line-height: 35px;
				text-align: center;
				font-size: 14px;
				overflow: hidden;
				margin-bottom: 15px;
				.el-icon-close {
					float: right;
					margin: 10px 10px 0 0;
					cursor: pointer;
				}
			}
			.transferBox-cont {
				display: -webkit-box;
				-webkit-box-pack: center;
				-webkit-box-align: center;
			}
			/deep/ .transferBox-but {
				margin: 15px auto 10px;
				text-align: center;
				.submit {
					padding: 8px;
					font-size: 13px;
				}
				.abolish {
					padding: 8px 18px;
					font-size: 13px;
					background: #fff !important;
					border: solid 1px #efefef;
					color: #3A80EC;
				}
			}
		}
	}

	/deep/ .seleRetrialIssuerTitle {
	  height: 30px;
	  line-height: 30px;
	  margin-top: 5px;
	  border-top: 1px solid #dcdcdc;
	  font-size: 14px;
	  overflow: hidden;
	  & span {
	    //   display: inline-block;
	    float: left;
	  }
	  & span:first-child {
	    width: 75px;
	    text-align: center;
	  }
	  & span:nth-child(2) {
	    width: 140px;
	    box-sizing: border-box;
	    padding-left: 45px;
	  }
	  & span:nth-child(3) {
	    width: 140px;
	    text-align: center;
	  }
	}
	/deep/ .popupBtn-container {
	  position: absolute;
	  left: 0;
	  right: 0;
	  bottom:6px;
	  margin: auto;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 50px;
	  line-height: 32px;
	  a {
	    margin: 0 5px;
	  }
	}
	/deep/ .popupBody-container {
	  .border-container {
	    .cell{
	      text-align: center;
	    }
	  }
	}

	/deep/ .center-body{
		border: none !important;
	}
	/deep/ .el-radio__label{
		padding-left: 0 !important;
	}
	/deep/ .white-bg{
		margin-top: 12px;
	}
	/deep/ .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0
	}
	/deep/ .clearfix {
	  *zoom: 1
	}
</style>
