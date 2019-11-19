<template>
  <Modal 
    class="unlock-modal"
    v-model="modalShow"
    :title="info.title"
    :loading="okLoading"
    @on-ok="ok"
  >
    <Form label-position="right" :label-width="90" :model="formData" :rules="ruleFormData" ref="lockForm">
      <Row>
        <Col span="20" offset="1">
          <FormItem :label="info.lockLabel" prop="reason">
            <Input type="textarea" :rows="6" v-model="formData.reason" />
            <span class="input-remark">{{info.lockRemark}}</span>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import api from '@/api'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: [ 'value', 'lockParams', 'lockStatus' ],
  
  computed: {
    modalShow: {
      get() {
        return this.value
      },

      set(val) {
        this.$emit('change', val)
      }
    }
  },

  data() {
    return {
      okLoading: true,

      formData: {
        reason: ''
      },

      ruleFormData: {
        reason: [
          { required: true, message: '请输入备注', trigger: 'blur' }
          // { max: 500, message: '不能超过500个字', trigger: 'blur' }
        ]
      },

      info: {
        // 解锁阶段
        title: '',
        // 解锁原因: 
        lockLabel: '',
        // 注: 解锁后，此阶段以上"未解锁阶段"全部解锁！
        lockRemark: ''
      }
    }
  },

  watch: {
    value(val) {
      if (val) {
        if (this.lockStatus == 1) {
          this.info.title = '锁定阶段'
          this.info.lockLabel = '锁定原因：'
          this.info.lockRemark = '注: 锁定后，此阶段以下"已解锁阶段"全部锁定！'
        } else {
          this.info.title = '解锁阶段'
          this.info.lockLabel = '解锁原因：'
          this.info.lockRemark = '注: 解锁后，此阶段以上"未解锁阶段"全部解锁！'
        }
      } else {
        this.formData.reason = ''
      }
    }
  },

  methods: {
    ok() {
      this.$refs.lockForm.validate(valid => {
        if (!valid) {
          this.okLoading = false
          this.$nextTick(() => {
            this.okLoading = true
          })
          return
        }

        let self = this
        let reason = this.formData.reason
        let status
        
        api.patchPhaseLockStatus({
          type: this.lockStatus == 1 ? 'LOCK' : 'UNLOCK',
          ...this.lockParams,
          reason
        })
          .then((res) => {
            status = res.status
          })
          .catch(err => {})
          .finally(() => {
            if (status == 201) {
              this.$Message.success({
                content: this.lockStatus == 1 ? '锁定成功！' : '解锁成功！',
                onClose() {
                  self.modalShow = false
                  self.$emit('refresh-data')
                }
              })
            } else {
              this.$Message.error('操作失败，请重试！')
            }
          })
      })
    }
  }
}
</script>
