<template>
  <Modal class="enable-modal"
      v-model="modalShow"
      title="启用"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      >
    <Form :label-width="130" :model="enableData" :rules="ruleFormData" ref="enableForm">
      <Row>
        <Col span="14" offset="5">
          <FormItem label="请选择角色：" prop="roleId">
            <Select v-model="enableData.roleId" multiple filterable>
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
  props: [ 'isShowModal', 'roleList' ,'userDetails'],
  data() {
    let self = this;
    return {
      // 
      UserData:{},  // 当前用户信息
      enableData: {
        roleId : []
      },
      userId:'',
      statusStr:'ENABLE',
      // 
      ruleFormData: {
        roleId:[
          { type: 'array' , required: true, message: '请选择所属角色', trigger: 'change' }
        ]
      },
      loading: true
    } 
  },
  watch:{
    userDetails: {
      handler(newValue, oldValue) {
        this.userId = newValue.id
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
      api.patchPhaseBackgroundUser({
        id : this.userId,
        status : 'ENABLE',
        roleIds: params.roleId + ''
      })
    },
    ok() {
      let self = this
      this.$refs.enableForm.validate(valid => {
        if (valid) {
          this.createUser(self.enableData)
          self.$Message.success({
            content: '启用成功！',
            duration: 1,
            onClose: function() {
              self.$refs.enableForm.resetFields()
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
      this.$refs.enableForm.resetFields()
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
