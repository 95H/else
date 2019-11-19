<template>
	<div class="organization-con">
		<div class="organization-contaniner">

			<!--组织机构树-->
			<div class="organizationTree-container">
				<el-scrollbar>
					<el-tree v-if="sysGroupTreedata.length" :data="sysGroupTreedata" node-key="id" default-expand-all :expand-on-click-node="false">
						draggable>
						<span class="custom-tree-node tree-title el-tree-node__label" :class="{'tree-actived'
            :node.data.id === groupId}" :title="node.data.name" @click="treeClickHandle(node)" slot-scope="{ node, data }">
            {{ node.data.name }}
          </span>
					</el-tree>
				</el-scrollbar>
			</div>
			<!--组织机构详情-->
			<div class="organizationDetail-container">
				<!--组织机构管理-->
				<div class="organizationDetail-header">
					<div class="organizationDetail-infor">
						<div>
							<span class="entry-title">当前公司/部门 ：</span>
							<span class="entry-cont">{{userList.currentOrganization.groupName}}</span>
						</div>
						<div>
							<span class="entry-title">上级公司/部门 ：</span>
							<span class="entry-cont">{{userList.parentOrganization.groupName}}</span>
						</div>
					</div>
					<div class="organizationDetail-crud">
						<!--<button class="search-btn btn1" @click="showDialog('setDeptManager')" v-if="(userList.currentOrganization.groupType*1 === 2)">设置部门经理</button>-->
						<button class="search-btn btn1" @click="showDialog('createOrganization')">新增下属部门</button>
						<button class="search-btn btn2" @click="showDialog('changeOrganization')">修改</button>
						<button class="reset-btn btn2" @click="showDialog('deleteOrganization')">删除</button>
					</div>
				</div>
				<!--组织机构人员管理-->
				<div class="organizationDetail-content">
					<div class="search-container">
						<ipt :itemsiptoptions="searchIptOptions"></ipt>
						<button class="search-btn" @click="searchEvent">查询</button>
						<button class="search-btn btn1" @click="showDialog('createUser')">新增用户</button>
					</div>
					<div class="crew-list">
						<el-table :data="userList.list" stripe border>
							<el-table-column prop="groupNames" label="所在机构/部门" width="200" >
                <template slot-scope="scope">
                  <div class="textOverflow1" :title="scope.row['groupNames']">
                    {{scope.row['groupNames']}}
                  </div>
                </template>
							</el-table-column>
							<el-table-column prop="userName" label="姓名" width="120">
							</el-table-column>
							<el-table-column prop="mobile" label="手机号" width="120">
							</el-table-column>
							<el-table-column prop="status" label="状态" width="115">
							</el-table-column>
							<el-table-column fixed="right" label="操作" width="150">
								<template slot-scope="scope">
									<el-button @click="showDialog('changeUser',scope.row)" type="text" size="small">编辑</el-button>
									<el-button @click="showDialog('deleteUser',scope.row)" type="text" size="small">删除</el-button>
									<el-button @click="showDialog('disableUser',scope.row)" type="text" size="small" v-if="scope.row.status === '正常'">禁用</el-button>
									<el-button @click="showDialog('recoverUser',scope.row)" type="text" size="small" v-else>恢复</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="pagination-container" v-if="userList.count">
						<el-pagination :page-size="10" background layout="prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="userList.currentPage" :total="userList.count">
						</el-pagination>
					</div>
				</div>
			</div>
			<div class="dialog-container">
				<!--部门管理-->
				<center-dialog ref="hendleOrganizationDialog" dialogWidth='500px' dialogHeight="375px" :dialogTitle="(changeOrganization?'修改':'添加')+'下属部门'" titlePosition="left">
					<div slot="dialogContent">
						<div class="hendleOrganization">
							<ul class="left">
								<li v-if="(userList.parentOrganization.groupName || createOrganization)"><span class="redStar">*</span>上级公司/部门 ：</li>
								<li><span class="redStar">*</span>公司/部门名称 ：</li>
								<li><span class="redStar">*</span>机构类型 ：</li>
								<li><span class="redStar">*</span>公司/部门编号 ：</li>
							</ul>
							<ul class="right">
								<li v-if="(userList.parentOrganization.groupName || createOrganization)">{{changeOrganization?userList.parentOrganization.groupName:userList.currentOrganization.groupName}}</li>
								<li>
									<el-form :model="userList.newOrganization" :rules="(!userList.parentOrganization.groupName && changeOrganization) ? null: organizationRule" ref="organizationruruleForm1">
										<el-form-item prop="groupName">
											<el-input v-model="userList.newOrganization.groupName" :readonly="!userList.parentOrganization.groupName && changeOrganization" maxLength="100"></el-input>
										</el-form-item>
									</el-form>
								</li>
								<li>
									<template>
										<el-radio v-model="userList.newOrganization.groupType" label=1 :disabled="!userList.parentOrganization.groupName && changeOrganization">机构</el-radio>
										<el-radio v-model="userList.newOrganization.groupType" label=2 :disabled="!userList.parentOrganization.groupName && changeOrganization">部门</el-radio>
									</template>
								</li>
								<li>
									<el-form :model="userList.newOrganization" :rules="(!userList.parentOrganization.groupName && changeOrganization) ? null : organizationRule" ref="organizationruruleForm2">
										<el-form-item prop="branchCode">
											<el-input v-model="userList.newOrganization.branchCode" :readonly="!userList.parentOrganization.groupName && changeOrganization" maxLength="100"></el-input>
										</el-form-item>
									</el-form>
								</li>
							</ul>
						</div>
						<div class="dialog-footer">
							<a class="search-btn" @click="handleOrganizationEvent">确 定</a>
							<a class="reset-btn" @click="closeOrganizationEvent">取 消</a>
						</div>
					</div>
				</center-dialog>
				<center-dialog ref="deleteOrganizationDialog" dialogWidth='320px' dialogHeight="210px" dialogTitle="删除下属部门" titlePosition="left">
					<div slot="dialogContent">
						<div class="deleteOrganization">您确认删除"{{userList.currentOrganization.groupName}}"？</div>
						<div slot="footer" class="dialog-footer">
							<a class="search-btn" @click="handleOrganizationEvent">确 定</a>
							<a class="reset-btn" @click="closeOrganizationEvent">取 消</a>
						</div>
					</div>
				</center-dialog>
				<!--设置部门经理-->
				<center-dialog ref="setDeptManagerDialog" dialogWidth='600px' dialogHeight="550px" dialogTitle="设置部门经理" titlePosition="left">
					<div slot="dialogContent">
						<div class="setDeptManager">
							<el-scrollbar>
								<el-table ref="deptHeadTable" :data="deptHeadData" border stripe style="width: 100%">
									<el-table-column v-for="(item,index) in dataTableHead" v-if="item.title == '全选'" type="selection" :width="item.width" :key="index"></el-table-column>
									<el-table-column v-for="(item,index) in dataTableHead" v-if="item.title !== '全选'" :width="item.width" :label="item.title" :prop="item.name" :key="index"></el-table-column>
								</el-table>
							</el-scrollbar>
						</div>
						<div slot="footer" class="dialog-footer">
							<a class="search-btn" @click="handleDeptManagerEvent">确 定</a>
							<a class="reset-btn" @click="closeDeptManagerEvent">取 消</a>
						</div>
					</div>
				</center-dialog>
				<!--用户管理-->
				<!--新增、编辑用户-->
				<center-dialog ref="handleUser1Dialog" dialogWidth='600px' dialogHeight="500px" :dialogTitle="(createUser?'新增':'修改')+'用户'" titlePosition="left">
					<div slot="dialogContent">
						<div class="hendleUser1">
							<ul class="left">
								<li><span class="redStar">*</span>所在部门 :</li>
								<li><span class="redStar">*</span>姓名 :</li>
								<li><span class="redStar">*</span>手机号码 :</li>
								<li><span class="redStar">*</span>密码 :</li>
								<li>所有角色 :</li>
								<li>所在岗位 :</li>
								<li>工作座机 :</li>
								<li>工作邮箱 :</li>
							</ul>
							<div class="right">
								<el-form :model="sysuser" status-icon :rules="sysuserRules" ref="sysuserRuleForm" label-width="100px" class="demo-ruleForm">
									<el-form-item prop="groupNames">
										<el-input v-model="sysuser.groupNames" :data-id="sysuser.deptId" @focus="groupFocus"></el-input>
									</el-form-item>
									<el-form-item prop="userName">
										<el-input v-model="sysuser.userName" maxLength="100"></el-input>
									</el-form-item>
									<el-form-item prop="mobile"> 
										<el-input class="inputName" v-model.number="sysuser.mobile" maxLength="11"></el-input>
										<input type="text" class="inputName" style="position: absolute; top: -999px;"/>
									</el-form-item>
									<input type="password" class="inputPassword" style="position: absolute; top: -999px;"/>
									<el-form-item prop="password">
										<el-input class="inputPassword" v-model="sysuser.password" type="password" maxLength="100"></el-input>
										<el-checkbox v-model="sysuser.password" true-label="66666666">默认8个6</el-checkbox>
									</el-form-item>
									<el-form-item>
										<el-input v-model="showRoleList" readonly @focus="showPostAroleDialog('roleSlectionVisible')" maxLength="100"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="showPostList" readonly @focus="showPostAroleDialog('postSlectionVisible')" maxLength="100"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="sysuser.workMobile" maxLength="100"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="sysuser.workEmail" maxLength="100"></el-input>
									</el-form-item>
								</el-form>
							</div>
						</div>
						<div slot="footer" class="dialog-footer">
							<a class="search-btn" @click="handleUserEvent">确 定</a>
							<a class="reset-btn" @click="closeUserEvent">取 消</a>
						</div>
					</div>
				</center-dialog>
				<!--设置用户岗位-->
				<center-dialog ref="handleUserPostDialog" dialogWidth='600px' dialogHeight="500px" dialogTitle="岗位选择" titlePosition="left">
					<div slot="dialogContent">
						<div class="post-slection-container">
							<el-scrollbar>
								<ul class="job-slection">
									<li class="user" v-for="(item,index) in sysRankList" :key="index">
										<div class="user-name">
											<el-button type="primary">{{item.rankName}}</el-button>
											<p v-if="!(index === sysRankList.length-1)">
												<i class="el-icon-arrow-down"></i>
											</p>
										</div>
										<div class="user-post">
											<el-checkbox-group v-model="checkList.postList">
												<el-checkbox :label="sysPost.id" v-for="(sysPost,index) in item.sysPostList " :key="index" v-if="item.sysPostList.length" :title="sysPost.postName">{{sysPost.postName}}</el-checkbox>
											</el-checkbox-group>
										</div>
									</li>
								</ul>
							</el-scrollbar>
						</div>
						<div slot="footer" class="dialog-footer">
							<a class="search-btn" @click="postAroleEvent('',1)">确 定</a>
							<a class="reset-btn" @click="postAroleEvent('',0)">取 消</a>
						</div>
					</div>
				</center-dialog>
				<!--设置用户角色-->
				<center-dialog ref="handleUserRoleDialog" dialogWidth='600px' dialogHeight="500px" dialogTitle="角色选择" titlePosition="left">
					<div slot="dialogContent">
						<div class="role-slection-container">
							<el-scrollbar>
								<el-checkbox-group v-model="checkList.roleList">
									<el-checkbox :label="role.id" v-for="(role,index) in sysRoleList " :key="index">{{role.roleName}}</el-checkbox>
								</el-checkbox-group>
							</el-scrollbar>
						</div>
						<div slot="footer" class="dialog-footer">
							<a class="search-btn" @click="postAroleEvent('',1)">确 定</a>
							<a class="reset-btn" @click="postAroleEvent('',0)">取 消</a>
						</div>
					</div>
				</center-dialog>
				<!--删除/禁用/恢复用户-->
				<center-dialog ref="handleUser2Dialog" dialogWidth='320px' dialogHeight="210px" :dialogTitle="(deleteUser?'删除':disableUser?'禁用':'恢复')+'同事'" titlePosition="left">
					<div slot="dialogContent">
						<div class="hendleUser2">
							您确认{{deleteUser?"删除":disableUser?"禁用":"恢复"}}同事？
						</div>
						<div slot="footer" class="dialog-footer">
							<a class="search-btn" @click="handleUserEvent">确 定</a>
							<a class="reset-btn" @click="closeUserEvent">取 消</a>
						</div>
					</div>
				</center-dialog>
				<!-- <person-dialog ref="selectPersonDialog" v-on:setPersonId="setPersonId"></person-dialog> -->
				<company-dialog ref="selectPersonDialog" v-on:setGroupId="setGroupId"></company-dialog>
			</div>
		</div>
	</div>
</template>

<script>
	import CenterDialog from "../../components/centerDialog.vue";
	import CompanyDialog from "../../components/companyDialog.vue";
	export default {
		components: {
			CenterDialog,
			CompanyDialog
		},
		data() {
			//      const checkMobile = (rule, value, callback)=>{
			//        if (!(""+value).trim()) {
			//          return callback(new Error('请输入手机号码'));
			//        }else if (!(/^1[34578]\d{9}$/.test(value))) {
			//          callback(new Error('请输入正确的手机号码'));
			//        }else {
			//          callback();
			//        }
			//      };
			//      const checkWorkMobile = (rule, value, callback)=>{
			//        if(value){
			//          if(!(/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(value))){
			//            callback(new Error('请输入正确的固话号码'));
			//          }
			//        }
			//        callback()
			//      };
			//      const checkWorkEmail = (rule, value, callback)=>{
			//        if(value){
			//          if(!(/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value))){
			//            callback(new Error('请输入正确的邮箱地址'));
			//          }
			//        }
			//        callback()
			//      };
			//      const postAndRole = (rule, value, callback)=>{
			//        callback()
			//      };
			return {
				//tree数据
				sysGroupTreedata: [],
				//当前选中的节点的id
				groupId: '',
				//部门Id
				deptId: '',
				searchIptOptions: [{
						name: '用户名称：',
						holder: '请输入用户名称',
						width: '120px',
						input: ''
					},
					{
						name: '手机号：',
						holder: '请输入手机号',
						width: '120px',
						input: ''
					},
				],
				//组织机构及对应的用户列表
				userList: {
					list: [],
					count: 0,
					currentPage: 1,
					currentOrganization: {
						groupName: '',
						groupType: '',
						branchCode: ''
					},
					parentOrganization: {
						groupName: '',
						groupId: '',
						branchCode: ''
					},
					newOrganization: {
						groupName: '',
						groupType: '2',
						branchCode: ''
					}
				},
				deptManagerList: {},
				dataTableHead: [{
						title: "全选",
						name: "",
						width: "50"
					},
					{
						title: "用户名",
						name: "userName",
						width: "150"
					},
					{
						title: "手机号",
						name: "mobile",
						width: "100"
					},
					{
						title: "角色",
						name: "roleName",
						width: "157"
					},
					{
						title: "岗位",
						name: "postName",
						width: "100"
					},
				],
				deptHeadData: [],
				dataurl: '/api/deptHead/findSysUserByDeptId',
				fsSearchDatas: {},
				userIds: '',
				createOrganization: false,
				changeOrganization: false,
				deleteOrganization: false,
				setDeptManager: false,
				organizationRule: {
					groupName: [{
						required: true,
						message: ' ',
						trigger: 'change'
					}, {
						required: true,
						message: ' ',
						trigger: 'blur'
					}],
					branchCode: [{
						required: true,
						message: ' ',
						trigger: 'change'
					}, {
						required: true,
						message: ' ',
						trigger: 'blur'
					}],
				},
				//用户管理
				sysuser: {
					groupIds: "",
					deptId: '',
					groupNames: "",
					loginName: "",
					mobile: "",
					status: "",
					id: "",
					userName: "",
					password: '',
					workMobile: '',
					workEmail: '',
				},
				sysuserRules: {
					groupNames: [{
						required: true,
						trigger: 'blur'
					}],
					userName: [{
						required: true,
						message: ' ',
						trigger: 'change'
					}, {
						required: true,
						message: ' ',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: ' ',
						trigger: 'change'
					}, {
						required: true,
						message: ' ',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: ' ',
						trigger: 'change'
					}, {
						required: true,
						message: ' ',
						trigger: 'blur'
					}]
					//            [{ validator: checkMobile, trigger: 'blur' }],
				},
				createUser: false,
				changeUser: false,
				deleteUser: false,
				disableUser: false,
				recoverUser: false,
				postSlectionVisible: false,
				roleSlectionVisible: false,
				checkList: {
					postList: [],
					roleList: []
				}, //保存修改的岗位和角色列表
				sysRankList: [], //当前所有职级岗位信息列表
				sysPostList: [], //当前所有可选岗位列表
				sysRoleList: [], //当前所有可选岗位列表
				roleList: [], //暂存角色列表
				postList: [], //暂存岗位列表
				maxlength: '10',
			}
		},
		computed: {
			showPostList() {
				const _this = this;
				const {
					postList
				} = _this.checkList;
				return this.showPostAndRole(postList, _this.sysPostList);
			},
			showRoleList() {
				const _this = this;
				const {
					roleList
				} = _this.checkList;
				return this.showPostAndRole(roleList, _this.sysRoleList);
			},
		},
		mounted() {
			this.getsysGroupTree(this.getUserList);
			this.$refs.handleUserRoleDialog.closeDialog = this.postAroleEvent;
			this.$refs.handleUserPostDialog.closeDialog = this.postAroleEvent;
		},
		methods: {
			showPostAndRole(selectedList, itemList) {
				let showList = [];
				if(!selectedList.length || !itemList.length) return;
				const newList = selectedList.sort((a, b) => a * 1 > b * 1);
				newList.forEach(id => {
					itemList.forEach(item => {
						if(id * 1 === item.id * 1) {
							showList.push(item.roleName || item.postName)
						}
					});
				});
				return showList.join(',')
			},
			searchEvent() {
				this.userList.currentPage = 1;
				this.getUserList()
			},
			//显示弹窗一级
			showDialog(active, target) {
				this.handleClose();
				this[active] = true;
				if(target) {
					this.sysuser.userId = target.userId;
				}
				switch(active) {
					case "changeOrganization":
					case "createOrganization":
						this.$refs.hendleOrganizationDialog.showDialog();
						break;
					case "deleteOrganization":
						this.$refs.deleteOrganizationDialog.showDialog();
						break;
					case "changeUser":
						this.editSysUser(this.sysuser);
						break;
					case "createUser":
						this.getSysRankPost();
						this.getSelectRoles();
						this.sysuser.deptId = this.groupId;
						break;
					case "deleteUser":
					case "disableUser":
					case "recoverUser":
						this.$refs.handleUser2Dialog.showDialog();
						break;
					case "setDeptManager":
						if(!this.userList.list.length) return this.$messageError("请先为当前部门添加人员");
						this.fsSearchDatas = {
							deptId: this.sysuser.deptId
						};
						this.getdeptHeadData();
						break;
					default:
						break
				}
			},
			//显示角色、岗位弹窗（二级）
			showPostAroleDialog(active) {
				this[active] = true;
				const {
					roleSlectionVisible,
					postSlectionVisible
				} = this;
				if(roleSlectionVisible) {
					this.$refs.handleUserRoleDialog.showDialog()
				} else if(postSlectionVisible) {
					this.$refs.handleUserPostDialog.showDialog()
				}
			},
			//组织机构的增删改
			handleOrganizationEvent() {
				if(!this.userList.parentOrganization.groupName && this.changeOrganization) {
					return this.closeOrganizationEvent()
				}
				let url = "/sysgroup/saveOrUpdateSysGroup";
				let sysGroup = { ...this.userList.newOrganization
				};
				sysGroup.groupType = sysGroup.groupType * 1;
				const {
					groupId
				} = this;
				if(this.createOrganization || this.changeOrganization) {
					let flag = false;
					this.$refs.organizationruruleForm1.validate((valid) => {
						flag = valid
					});
					this.$refs.organizationruruleForm2.validate((valid) => {
						flag = valid
					});
					if(!flag) return this.$messageError('请输入必填项');
					if(this.createOrganization) {
						sysGroup.parentId = groupId
					} else if(this.changeOrganization) {
						sysGroup.parentId = this.userList.parentOrganization.groupId;
						sysGroup.id = groupId
					}
					this.setOrganization(url, sysGroup)
				} else if(this.deleteOrganization) {
					this.setOrganization("/sysgroup/deleteSysGroup", {
						groupId
					})
				}
			},
			//关闭组织机构弹窗
			closeOrganizationEvent() {
				this.createOrganization = this.changeOrganization = this.deleteOrganization = false;
				const {
					changeOrganization,
					createOrganization,
					deleteOrganization
				} = this;
				if(!changeOrganization && !createOrganization) {
					this.initdata();
					this.$refs.hendleOrganizationDialog.closeDialog()
				}
				if(!deleteOrganization) {
					this.$refs.deleteOrganizationDialog.closeDialog()
				}
			},
			//设置部门经理
			handleDeptManagerEvent() {
				const _this = this;
				let list = _this.$refs.deptHeadTable.store.states.selection;
				_this.userIds = list.map(item => item.userId).join(",");
				_this.$http.post('/api/deptHead/saveUpdDeptHead', { ..._this.fsSearchDatas,
					userIds: _this.userIds
				}).then(response => {
					this.$refs.setDeptManagerDialog.closeDialog()
				}).catch(error => {
					this.$messageError('数据加载失败' + error)
				})
			},
			//关闭部门经理弹窗
			closeDeptManagerEvent() {
				this.$refs.setDeptManagerDialog.closeDialog()
			},
			//组织机构树的点击回调
			treeClickHandle(node) {
				this.userList.currentPage = 1;
				this.groupId = node.data.id;
				this.userList.currentOrganization.groupName = node.data.name;
				this.userList.currentOrganization.groupType = node.data.type;
				this.userList.currentOrganization.branchCode = node.data.branchCode;
				this.userList.parentOrganization.groupName = node.parent.data.name;
				this.userList.parentOrganization.groupId = node.parent.data.id;
				this.sysuser.deptId = node.data.id;
				this.getUserList()
			},
			//获取组织机构树数据
			getsysGroupTree(cb) {
				const _this = this;
				_this.$http.post('/api/sysgroup/sysGroupTree', {}).then(response => {
					_this.sysGroupTreedata = response.data;
					_this.groupId = _this.groupId ? _this.groupId : response.data[0].id;
					_this.sysuser.deptId = response.data[0].id;
					_this.userList.currentOrganization.groupName = response.data[0].name;
					_this.userList.currentOrganization.branchCode = response.data[0].branchCode;
					_this.userList.currentOrganization.groupType = response.data[0].type;
					cb && cb()
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			//获取部门用户列表（设置部门经理）
			getdeptHeadData() {
				const _this = this;
				_this.$http.post(_this.dataurl, _this.fsSearchDatas).then(response => {
					_this.deptHeadData = response.data.sysUserList;
					_this.userIds = response.data.userIds;
					//回显数据
					const showList = [];
					_this.$refs.setDeptManagerDialog.showDialog();
					if(_this.userIds.length) {
						const userIdList = _this.userIds.split(",");
						userIdList.forEach((id, index) => {
							for(let i = 0; i < _this.deptHeadData.length; i++) {
								if(_this.deptHeadData[i].userId * 1 === id * 1) {
									showList[index] = _this.deptHeadData[i]
								}
							}
						});
						setTimeout(() => {
							showList.forEach(item => _this.$refs.deptHeadTable.toggleRowSelection(item));
						}, 200)
					}
				}).catch(error => {
					_this.$messageError('数据加载失败' + error)
				})
			},
			//获取组织机构用户列表
			getUserList() {
				const _this = this;
				const {
					groupId
				} = _this;
				const page = _this.userList.currentPage;
				const userNameQuery = _this.searchIptOptions[0].input;
				const mobileQuery = _this.searchIptOptions[1].input;
				const {
					groupType
				} = this.userList.currentOrganization;
				_this.sysuser.groupNames = _this.userList.currentOrganization.groupName;
				_this.$http.post('/api/sysgroup/findPageByGroupId', {
					groupId,
					groupType,
					page,
					userNameQuery,
					mobileQuery
				}).then(response => {
					const list = response.data;
					_this.userList.list = list.map(user => {
						user.status = user.status === 1 ? '正常' : '禁用';
						return user
					});
					_this.userList.count = response.count * 1
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			//获取岗位列表
			getSysRankPost() {
				const _this = this;
				_this.$http.post('/api/sysRank/findSysRankPost', {}).then(response => {
					_this.sysRankList = response.data.sysRankList;
					_this.sysPostList = _this.setSysPostList(_this.sysRankList);
					this.$refs.handleUser1Dialog.showDialog()
					_this.$nextTick(() => {
						_this.$refs.sysuserRuleForm.clearValidate(['userName', 'password', 'mobile'])
					})
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			//获取角色列表
			getSelectRoles() {
				const _this = this;
				_this.$http.post('/api/sysuser/selectRoles', {}).then(response => {
					_this.sysRoleList = response.data;
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			//列表分页切换
			handleCurrentChange(val) {
				this.userList.currentPage = val;
				this.getUserList()
			},
			//用户的增删改
			handleUserEvent() {
				const _this = this;
				const sysuser = { ..._this.sysuser
				};
				const {
					createUser,
					changeUser,
					deleteUser,
					disableUser,
					recoverUser
				} = _this;
				let flag;
				if(createUser || changeUser) {
					this.$refs.sysuserRuleForm.validate((valid) => {
						if(valid) {
							let {
								groupType
							} = _this.userList.currentOrganization;
							const postIds = _this.checkList.postList.join(",");
							const roleIds = _this.checkList.roleList.join(",");
							const {
								status,
								loginName,
								mobile,
								password,
								userName,
								workEmail,
								workMobile,
								id,
								deptId
							} = sysuser;
							const data = {
								id,
								status,
								deptId,
								groupType,
								loginName,
								mobile,
								password,
								userName,
								workEmail,
								workMobile,
								postIds,
								roleIds,
							};
							if(createUser){
								data.id = '';
							};
							_this.$http.post('api/sysuser/saveOrUpdSysUser', data).then(response => {
								this.closeUserEvent()
								this.getUserList()
							}).catch(error => {
								_this.$messageError(error);
							})
						} else {
							return _this.$messageError('请输入必填项');
						}
					});
				} else {
					if(deleteUser) {
						flag = 0;
					} else if(disableUser) {
						flag = 1;
					} else if(recoverUser) {
						flag = 2
					}
					_this.$http.post('/api/sysuser/updateUserStatus', {
						userId: sysuser.userId,
						flag
					}).then(response => {
						this.getUserList();
						this.closeUserEvent()
					}).catch(error => {
						_this.$messageError(error);
					})
				}
			},
			//关闭用户管理弹窗
			closeUserEvent() {
				this.createUser = this.changeUser = this.deleteUser = this.disableUser = this.recoverUser = false;
				if(!this.changeUser && !this.changeUser) {
					this.$refs.handleUser1Dialog.closeDialog()
				}
				if(!this.deleteUser && !this.disableUser && !this.recoverUser) {
					this.$refs.handleUser2Dialog.closeDialog()
				}
				this.initdata()
			},
			//关闭弹窗
			handleClose() {
				this.closeUserEvent()
				this.closeOrganizationEvent()
			},
			//角色岗位修改
			postAroleEvent(event, type) {
				this.postSlectionVisible = this.roleSlectionVisible = false
				this.$refs.handleUserRoleDialog.dialogFlag = false;
				this.$refs.handleUserPostDialog.dialogFlag = false;
				if(!type) {
					this.checkList.roleList = [...this.roleList];
					this.checkList.postList = [...this.postList]
				} else {
					this.roleList = [...this.checkList.roleList];
					this.postList = [...this.checkList.postList]
				}
			},
			//初始化数据
			initdata() {
				this.userList.newOrganization = {
					groupName: '',
					groupType: '2',
					branchCode: ''
				};
				this.sysuser.userName = "";
				this.sysuser.userId = "";
				this.sysuser.status = "";
				this.sysuser.loginName = "";
				this.sysuser.groupIds = "";
				this.sysuser.mobile = "";
				this.sysuser.password = "";
				this.sysuser.workMobile = "";
				this.sysuser.workEmail = "";
				this.sysuser.groupNames = this.userList.currentOrganization.groupName;
				this.checkList = {
					postList: [],
					roleList: []
				};
				this.postList = [];
				this.roleList = [];
			},
			//组织机构增删改请求函数
			setOrganization(url, sysGroup) {
				this.$http.post(`/api${url}`,
					sysGroup
				).then(response => {
					this.getsysGroupTree();
					this.closeOrganizationEvent();
					this.initdata()
				}).catch(error => {
					this.$messageError(error);
				})
			},
			//整理岗位列表数据
			setSysPostList(sysRankList) {
				const postList = [];
				sysRankList.forEach(rank => {
					rank.sysPostList.forEach(sysPost => {
						postList.push(sysPost)
					})
				});
				return postList
			},
			//编辑用户信息的请求函数
			editSysUser(sysUser) {
				const _this = this;
				const {
					userId
				} = sysUser;
				_this.$http.post('/api/sysuser/editSysUser', {
					userId
				}).then(response => {
					if(response.data.roleIds.length) {
						_this.roleList = response.data.roleIds.split(",").map(roleId => roleId * 1);
						_this.checkList.roleList = [..._this.roleList]
					}
					if(response.data.postIds.length) {
						_this.postList = response.data.postIds.split(",").map(postId => postId * 1);
						_this.checkList.postList = [..._this.postList]
					}
					_this.sysuser = { ...response.data.sysUser
					};
					_this.sysuser.groupNames = response.data.sysGroup.groupName;
					_this.getSysRankPost();
					_this.getSelectRoles();
				}).catch(error => {
					_this.$messageError(error);
				})
			},
			//获取当前节点的GroupId
			getGroupId(node) {
				if(node.data.type === 1) {
					return node.data.id
				} else if(node.data.type === 2) {
					return this.getGroupId(node.parent)
				}
			},

			//修改新增用户的所在部门
			groupFocus(event){
				let ev = event || window.event;
				let target = ev.target || ev.srcElement
				this.$refs.selectPersonDialog.showPersonDialog('','',target.value);
			},
			setGroupId(name,id) {
				this.sysuser.deptId = id
				 this.sysuser.groupNames = name;
			},
		},
		watch: {
			changeOrganization() {
				if(this.changeOrganization) {
					this.userList.newOrganization = { ...this.userList.currentOrganization
					};
					this.userList.newOrganization.groupType = this.userList.newOrganization.groupType + ""
				} else {
					this.initdata()
				}
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
	.organization-con {
		height: calc(100% - 10px);
		flex-direction: column;
		display: -webkit-flex;
		display: flex;
		border: 1px solid #ebeef5;
		background: #fff;
		margin-top: 10px;
		box-sizing: border-box;
		.organization-contaniner {
			height: 661px;
			padding: 20px;
			overflow: hidden;
			.organizationTree-container {
				float: left;
				width: 25%;
				height: 100%;
				box-shadow: 0px 0px 3px 0px rgba(202, 202, 202, 1);
				border-radius: 3px;
				box-sizing: border-box;
				.el-scrollbar {
					height: 100%;
					.tree-title {
						font-size: 13px
					}
					/deep/ .el-tree-node__label {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						font-size: 13px;
						margin-right: 5px;
					}
				}
			}
			.organizationDetail-container {
				float: right;
				width: 75%;
				height: 100%;
				padding-left: 10px;
				box-sizing: border-box;
				.organizationDetail-header {
					width: 100%;
					padding: 10px;
					margin-bottom: 10px;
					box-shadow: 0px 0px 3px 0px rgba(202, 202, 202, 1);
					border-radius: 3px;
					box-sizing: border-box;
					overflow: hidden;
					.organizationDetail-infor {
						float: left;
						line-height: 25px;
						.entry-title {
							width: 115px;
							text-align: right;
							font-size: 12px;
							color: #1D1C1E;
							display: inline-block;
							padding-right: 7px;
							vertical-align: baseline;
						}
						.entry-cont {
							font-size: 12px;
							color: #6A6A6A;
							display: inline-block;
							max-width: 80%;
						}
					}
					.organizationDetail-crud {
						float: right;
						font-size: 13px;
						.btn1 {
							width: 100px
						}
						.btn2 {
							width: 60px
						}
					}
				}
				.organizationDetail-content {
					height: 577px;
					padding: 10px;
					box-shadow: 0px 0px 3px 0px rgba(202, 202, 202, 1);
					border-radius: 3px;
					box-sizing: border-box;
					.search-container {
						position: relative;
						background-color: #F8F8F8;
            width: 100%;
            box-sizing: border-box;
						.btn1 {
							width: 80px;
							position: absolute;
							right: 20px;
							font-size: 12px;
						}
					}
					.crew-list>.el-table /deep/ .el-table__header-wrapper {
						font-size: 13px
					}
					.pagination-container {
						margin-top: 19px;
						margin-bottom: 18px
					}
				}
				.dialog-container {
					position: absolute;
				}
			}
		}
		.hendleOrganization,
		.hendleUser1 {
			overflow: hidden;
			li {
				width: 130px;
				height: 40px;
				line-height: 40px;
				margin-right: 10px;
				font-size: 13px;
				text-align: right;
			}
			.left {
				float: left;
				li {
					color: #686868
				}
			}
			.right {
				float: left;
				.el-form-item {
					width: 300px;
					text-align: left;
					margin-bottom: 0;
					/deep/ .el-form-item__content {
						width: 100%;
						margin: 0 !important;
					}
					/deep/ .el-input__inner {
						border-radius: 4px;
						height: 30px !important;
						&:-webkit-autofill {
							box-shadow: 0 0 0 1000px #fff inset;
						}
					}
					/deep/ .el-checkbox {
						position: absolute;
						left: 312px;
						top: 0;
					}
					/deep/ .el-form-item__error {
						top: 10px;
						right: 30px;
						left: auto
					}
					/deep/ .el-input__suffix {
						display: none
					}
				}
			}
		}
		.hendleOrganization {
			.right {
				li {
					width: 300px;
					text-align: left;
					/deep/ .el-input__inner {
						border-radius: 4px;
						height: 30px !important;
					}
				}
			}
		}
		.deleteOrganization,
		.hendleUser2 {
			padding: 30px 0;
			font-size: 13px;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: rgba(38, 38, 40, 1);
			line-height: 18px;
		}
		.dialog-footer {
			position: absolute;
			text-align: center;
			left: 0;
			right: 0;
			bottom: 30px;
			margin: auto;
		}
		.setDeptManager {
			height: 400px;
			border-bottom: 1px solid #ececec;
			box-sizing: border-box;
			/deep/ .el-scrollbar {
				height: 400px;
			}
		}
		.redStar {
			color: red;
			line-height: 30px;
			font-style: italic;
			margin-right: 3px
		}
		.post-slection-container {
			/deep/ .el-scrollbar {
				height: 365px;
				.job-slection {
					width: 100%;
					.user {
						overflow: hidden;
						position: relative;
						.user-name {
							width: 30%;
							float: left;
							text-align: center;
							.el-button--primary {
								width: 100%
							}
							p {
								position: absolute;
								bottom: 3px;
								left: 15%;
								transform: translateX(-50%);
							}
						}
						.user-post {
							width: 70%;
							float: left;
							box-sizing: border-box;
							margin-bottom: 30px;
							/deep/ .el-checkbox {
								width: 30%;
								height: 20px;
								line-height: 20px;
								margin-left: 13px !important;
								flex: 1;
								-ms-flex:1 0 auto;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								.el-checkbox__label {
									width: 80%;
								}
							}
						}
					}
				}
				.is-horizontal {
					display: none
				}
			}
		}
		.role-slection-container {
			height: 365px;
			/deep/ .el-scrollbar {
				height: 100%;
				.is-horizontal {
					display: none
				}
			}
			.el-checkbox {
				width: 48%;
				line-height: 20px;
				margin: 0 0 10px 10px !important;
			}
		}
		.tree-title {
			font-size: 14px;
		}
		/deep/ .el-table__empty-block {
			height: 300px;
			background: url(../../assets/common/nodata.png) no-repeat center;
			.el-table__empty-text {
				margin-top: 100px;
			}
		}
		.tree-active {
			border: 1px solid royalblue;
			background-color: #F6FAFF;
		}
		/deep/ .el-table td {
			height: 32px !important;
			padding: 0;
			text-align: center;
		}
		/deep/ .el-table .cell {
			text-align: center;
			line-height: 16px
		}
		/deep/ thead th {
			height: 32px !important;
			padding: 0;
			background: #F6FAFF;
		}
		/deep/ .el-pagination {
			text-align: center;
		}
		/deep/ .el-scrollbar {
			.el-scrollbar__wrap {
				overflow-x: hidden;
			}
		}
	}
</style>
