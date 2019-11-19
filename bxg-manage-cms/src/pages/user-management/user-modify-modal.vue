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
        <Col span="14" offset="5">
          <FormItem label="姓名：" prop="Username">
            <Input :number="true" :placeholder="UserData.name" v-model="formData.Username" disabled/>
            <span class="input-remark">10字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="15" offset="4">
          <FormItem label="邮箱(登录账号）：" prop="Useremail" :label-width="130">
            <Input v-model="formData.Useremail"  :placeholder="UserData.email" disabled/>
            <span class="input-remark">50字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
          <FormItem label="请选择角色：" prop="roleId">
            <Select placeholder="请选择角色" v-model="formData.roleId" multiple filterable >
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
  props: [ 'isShowModal', 'roleList' ,'userDetails','showUserList','nums'],
  data() {
    let self = this;
    return {
      UserData:{},  // 当前用户信息
      formData: {
        Username: '',
        Useremail: '',
        roleId : []
      },
      // 
      ruleFormData: {
        Username: [
          { required: false, message: '姓名不能为空', trigger: 'blur' },
          { max: 10, message: '不能超过10个字', trigger: 'blur' }
        ],
        Useremail:[
          { required: false, message: '邮箱不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字', trigger: 'blur' }
        ],
        roleId:[
          {  type: 'array',required: true, message: '请选择所属角色', trigger: 'change' }
        ]
      },
      loading: true
    } 
  },
  watch:{
    nums: {
      handler(newValue, oldValue) {  
        this.UserData = this.userDetails
        this.formData.Useremail = this.UserData.email
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
    createPhase(params){
      api.setBackgroundUser({
        id : this.UserData.id,
        // name : params.Username?params.Username:this.UserData.name,
        roleIds : params.roleId+''
      })
    },
    ok() {
      let self = this
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          this.createPhase(self.formData)
          self.$Message.success({
            tent: '修改成功！',
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
.modify-modal {
  .input-remark {
    position: absolute;
    top: 0;
    right: -30px;
    color: #ccc;
  }
}
</style>
