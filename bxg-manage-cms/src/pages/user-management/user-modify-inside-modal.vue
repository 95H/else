<template>
  <Modal class="modify-modal"
      v-model="modalShow"
      title="修改用户"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      >
    <Form :label-width="108" :model="formData" :rules="ruleFormData" ref="modifyForm">
      <Row>
        <Col class="modalTips" span="24">
          <Icon type="ios-information-circle" size="20" color="#108EE9" style="margin-top:-4px;"/>
          <span>该账号密码与该老师OA账号密码保持一致，若需修改密码请登录OA系统修改。</span>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="0">
          <FormItem label="姓名：">
            <span class="span-remark" >{{formData.userName}}</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="0">
          <FormItem label="工号：">
            <span class="span-remark" >{{formData.EmployeeNumber}}</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="18" offset="0">
          <FormItem label="请选择角色：" prop="roleId">
            <Select v-model="formData.roleId" multiple filterable>
              <Option v-for="(item,index) in roleList" :key="index" :value="item.id" >{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>      
  </Modal>
</template>
<script>
import { mapActions } from 'vuex'

import api from '@/api/index'
export default {
  props: [ 'isShowModal', 'roleList' ,'userDetails','nums'],
  data() {
    return {
      UserData:{},  // 当前用户信息
      // 姓名 工号
      formData: {
        roleId : [],
        userName: '',
        EmployeeNumber: ''
      },
      
      // 
      ruleFormData: {
        roleId:[
           { type: 'array',required: true, message: '请选择所属角色', trigger: 'change' }
        ]
      },
      loading: true
    } 
  },
  watch:{
    userDetails: {
      handler(newValue, oldValue) {  
        this.UserData = newValue
        this.formData.userName = this.UserData.name
        this.formData.EmployeeNumber = this.UserData.employeeNumber
      },
      deep: true  
    },
    nums: {
      handler(newValue, oldValue) {  
        this.UserData = this.userDetails
        var arr = [];
        for(var i=0;i<this.UserData.roles.length;i++){
          arr.push(this.UserData.roles[i].id)
        }
        this.formData.roleId = arr
      },
      deep: true  
    } 
  },
  created(){

  },
  mounted(){
    
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
  },

  methods: {
    createUser(params){
      api.setBackgroundUser({
        id : this.UserData.id,
        roleIds : params.roleId+''
      })
    },
    ok() {
      let self = this
      this.$refs.modifyForm.validate(valid => {
        if(valid){
          this.createUser(self.formData)
          self.$Message.success({
            content: '修改成功！',
            duration: 1,
            onClose: function() {
              self.$refs.modifyForm.resetFields()
              self.$emit('createSuccess')
              self.modalShow = false
            }
          })
        }else{
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
      })
    },
    
    cancel() {
      // this.$refs.modifyForm.resetFields()
      this.modalShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.modalTips{
  border:1px solid #ccc;
  padding:10px;
  border-radius: 5px;
  padding-bottom:8px;
  margin-bottom:20px;
}
.ivu-form-item {
  position: relative;
  .span-remark {
    position: absolute;
    top: 0;
    color: #000;
  }
}
</style>
