<template>
  <Card>
    <Row class="baseOption" style="margin-bottom:20px;">
      <span @click="addUser" v-if="hasSomeAuthAccess('users_manager_post')" >
        <Button type="primary">新增用户</Button>
      </span>
    </Row>
    <Row id="table-backgroundUser-management">
      <Col span="24">
        <Table border :columns="columns" :data="list" :height="baseHeight"></Table>
      </Col>
      <Col class="margin-top-20" span="24">
        <Page placement="top" :current="pageInfo.pageNumber" :page-size="pageInfo.pageSize" :page-size-opts="arrPage" show-total show-elevator show-sizer style="text-align: right;" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changeSelect"></Page>
      </Col>
    </Row>
    <ModifyModal :isShowModal.sync="isShowModifyModal" :roleList="roleList" :userDetails="UserDetails"  @createSuccess="createSuccess" :nums="numaa"/>
    <ModifyInModal :isShowModal.sync="isShowModifyInModal" :roleList="roleList" :userDetails="UserDetails"  @createSuccess="createSuccess" :nums="numaa"/>
    <AddUserModal :isShowModal.sync="isShowAddModal" :roleList="roleList" @AddcreateSuccess="AddcreateSuccess"/>
    <EnableModal :isShowModal.sync="isShowEnableModall" :roleList="roleList" :userDetails="UserDetails" @createSuccess="createSuccess"/>
  </Card>
</template>
<script>
import api from '@/api/index'
import util from '@/util/util'
import ModifyModal from '../user-modify-modal'
import ModifyInModal from '../user-modify-inside-modal'
import AddUserModal from '../user-addUser-modal'
import confirmModal from '../confirm-modal'
import EnableModal from '../user-enable-modal.vue'
import { setTimeout } from 'timers';
export default {
  name: 'backgroundUser-management',
  components: {
    ModifyModal,
    ModifyInModal,
    AddUserModal,
    EnableModal
  },
  data() {
    const hasmanager_put = this.hasSomeAuthAccess('users_manager_put'); //修改
    const hasmanager_patch = this.hasSomeAuthAccess('users_manager_patch'); //启/禁用(
    let self = this;
    return {
      numaa:0,
      isShowModifyModal:false,
      isShowAddModal:false,
      isShowModifyInModal:false,
      isShowEnableModall:false,
      nowData:{}, // 当前数据
      roleList:[], // 角色列表

      UserDetails:{}, // 用户详情
      list: [],  //列表数据
      arrPage:[10,20,30,40,100,200],
      // 分页信息
      pageInfo: {
        // 当前页码
        pageNumber: 1,
        // 数据总条数
        total: 0,
        // 每页条数
        pageSize: 10
      },
      baseHeight:0,//高度
      columns: [
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index + (this.pageInfo.pageNumber - 1) * this.pageInfo.pageSize + 1
            )
          }
        },
        {
          title: '姓名',
          key: 'name',
          width: 120,
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.name
                }
              },
              params.row.name ? params.row.name : '--'
            )
          }
        },
        {
          title: '邮箱（登录账号）',
          key: 'email',
          width: 300,
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.email
                }
              },
              params.row.email ? params.row.email : '--'
            )
          }
        },
        {
          title: '账号类型',
          key: 'userType',
          align: "center",
          width: 100,
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.userType ? "兼职员工" : '内部员工'
                }
              },
              params.row.userType ? "兼职员工" : '内部员工'
            )
          }
        },
        {
          title: '所属角色',
          key: 'roles',
          minWidth: 360,
          ellipsis: true,
          render: (h, params) => {
            var arr= []
            for(var i =0;i<params.row.roles.length;i++){
              arr.push(params.row.roles[i].name)
            }
            var arrString = arr.join('、')
            return h(
              'span',
              {
                style:{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap' 
                },
                domProps: {
                  title: arrString ? arrString : '--'
                }
              },
              arrString ? arrString : '--'
            )
          }
        },
        {
          title: '创建者',
          key: 'creator',
          // align: "center",
          width: 120,
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.creator
                }
              },
              params.row.creator ? params.row.creator : '--'
            )
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: "right",
          width: 250,
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.createTime
                }
              },
              params.row.createTime ? params.row.createTime : '--'
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          // align: "center",
          width: 200,
          ellipsis: true,
          render(h, params){
            let row = params.row
            let Button = "Button"
            const xiugai = _.partial(self.xiugai,row)
            const ResetPassword = _.partial(self.ResetPassword,row)
            // 启用禁用按钮
            let isDisable = row.status == 0
            let $statusButton = null
            let $statusButton3 = null
            if (isDisable) {
              $statusButton = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.changePhaseStatus , row , 1) }}}>启用</Button>
              $statusButton3 = <Button type="primary" size="small" disabled class="btn-margin" {...{ on: { click: xiugai }}}>修改</Button>
            } else {
              $statusButton = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.changePhaseStatus , row , 0) }}}>禁用</Button>
              $statusButton3 = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: xiugai }}}>修改</Button>
            }

            // 重置密码按钮是否显示
            let isDisable2 = row.userType == 1
            let $statusButton2 = null
            if(isDisable2){
              $statusButton2 = <Button type="primary"  size="small" class="btn-margin" {...{ on: { click: ResetPassword }}}>重置密码</Button>
            }

            return (
              <div>
                { hasmanager_put && $statusButton3}
                { hasmanager_patch && $statusButton}
                {$statusButton2}
              </div>
            )
          }
        }
      ]
    }
  },
  created() {
    this.getList()
    this.getRole()
  },
  mixins: [ confirmModal ],
  methods: {
    createSuccess(){
      var self = this
      var num = 1000;
      for(var i = 0;i<10;i++){
        setTimeout(function(){
          self.getList()
        },num)
        num += 1000;
      }
    },
    AddcreateSuccess(){
      var self = this
      var num = 1000;
      for(var i = 0;i<10;i++){
        setTimeout(function(){
          self.getList()
        },num)
        num += 1000;
      }
    },
    changePhaseStatus(phaseItem, toStatus){
      let self = this;
      if (toStatus == 0) {
        api.patchPhaseBackgroundUser({ 
          id: phaseItem.id,
          status: "DISABLE",
          roleIds: 1
        }).then(res=>{
          api.setBackgroundUser({
            id: phaseItem.id,
            roleIds: ''
          }).then(res=>{
            var num = 1000;
            for(var i = 0;i<10;i++){
              setTimeout(function(){
                self.getList()
              },num)
              num += 1000;
            }
          })
          self.$Message.success('禁用成功！');
          return
        })
        
      } else if (toStatus == 1) {
        this.UserDetails = phaseItem
        this.isShowEnableModall = true
      }
    },
    xiugai(data){
      this.numaa++
      var arr = [];
      for(var i=0;i<data.roles.length;i++){
        arr.push(data.roles[i].name)
      }
      this.UserDetails = data
      if(data.userType){
        this.nowData = data
        this.EmailValue = data.email
        
        this.isShowModifyModal = true
      }else{
        this.nowData = data
        this.isShowModifyInModal = true
      }
    },
    ResetPassword(params){
      let self = this;
      this.$Modal.confirm({
        content: `确定要把该用户密码重置成123456吗?`,
        onOk: () => {
          api.ResetPassword({email:params.email}).then(data => {
            self.$Message.success('重置成功！');
          })
        }
      })
    },
    getList(){
      this.fetchbackgroundUserList({
        page:this.pageInfo.pageNumber,
        size:this.pageInfo.pageSize
      })
    },
    getRole(){
      this.fetchRoleList({limited:"ALL"})
    },
    //添加用户
    addUser(){
      this.isShowAddModal = true;
    },
    //获取后台用户列表
    async fetchbackgroundUserList(params){
      let data=await api.getbackgroundUserList(params);
      this.list = data.items
      this.pageInfo.total = data.totalCount
    },
    //获取角色列表
    async fetchRoleList(params){
      let data=await api.getRoleList(params);
      this.roleList = data.items
    },
    //分页改变当前页
    changeCurrentPage(page) {
      this.pageInfo.pageNumber = page;
      this.getList()
    },
    changeSelect(nub){
      this.pageInfo.pageSize = nub;
      this.getList()
    }
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=>{
      let dom=document.getElementById("table-backgroundUser-management");
      this.baseHeight=util.baseHeight(dom,82);
    })
  },
  computed: {
    modalShow: {
      get() {
        return this.isShowModal
      },

      set(val) {
        this.$emit('update:isShowModal', val)
      }
    }
  }
}
</script>
<style lang="less">
  .btn-margin {
    margin-right: 5px;
  }
</style>
