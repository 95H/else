<template>
  <Modal
    title="审核"
    v-model= "isAuditShow"
    class-name="vertical-center-modal"
    width="500"
    :mask-closable="false"
    :loading="loading"
    @on-ok="asyncOK"
    @on-cancel="cancel"
    >
    <Form ref="auditFormDataRef" :model="auditFormData" :rules="ruleAuditData" :show-message="true">
      <FormItem style="text-align: center;">
        <RadioGroup v-model="auditFormData.radio">
          <Radio :label="this.auditApprove">通过</Radio>
          <Radio :label="this.auditDisapprove" style="margin-left: 50px;">退回</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="auditFormData.radio === 'DISAPPROVE'" label="原因：" prop="auditCause">
        <Input type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." v-model="auditFormData.auditCause"/>
        <p style="text-align:right;color:#ccc">100字</p>
      </FormItem>
      <p style="text-align:center;color:#ccc;font-size:14px;">注：通过后，视为已上架展示在前台页面</p>
    </Form>
  </Modal>
</template>
<script>
import api from '@/api/index'
export default {
  props: ['isAuditModal', 'ids', 'allAudit'],
  data () {
    return {
      loading: true,
      auditApprove: 'APPROVE',
      auditDisapprove: 'DISAPPROVE',
      auditFormData: {
        auditCause: '',
        radio: this.auditApprove
      },
      ruleAuditData: {
        auditCause: [
          {
            required: true,
            message: '请填写原因！'
          },
          {
            max: 100,
            message: '最多输入100字'
          }
        ]
      }
    }
  },
  computed: {
    isAuditShow: {
      get() {
        return this.isAuditModal
      },
      set(val) {
        this.$emit('update:isAuditModal', val)
      }
    }
  },
  methods: {
    asyncOK() {
      if (this.auditFormData.radio === this.auditDisapprove) {
        // 操作退回
        this.$refs.auditFormDataRef.validate((valid) => {
          if (!valid) {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            return false
          }

          api.patchArticles({
            ids: this.ids,
            operation: this.auditFormData.radio,
            remark: this.auditFormData.auditCause
          }).then(res => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
            if (res.status === 200) {
              this.$Message.success('操作退回成功');
              this.$emit('onLoadInfo');
              this.isAuditShow = false;
              this.$refs.auditFormDataRef.resetFields();
            } else {
              this.$Message.error('操作退回失败');
              this.$emit('onLoadInfo');
              this.isAuditShow = false;
              this.$refs.auditFormDataRef.resetFields();
            }
          })
        });
      } else {
        // 操作通过
        api.patchArticles({
          ids: this.ids,
          operation: this.auditFormData.radio
        }).then(res => {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          if (res.status === 200) {
            this.$Message.success('审核通过成功');
            this.$emit('onLoadInfo');
            this.isAuditShow = false;
            this.$refs.auditFormDataRef.resetFields();
          } else {
            this.$Message.error('审核通过失败');
            this.$emit('onLoadInfo');
            this.isAuditShow = false;
            this.$refs.auditFormDataRef.resetFields();
          }
        })
      }
    },
    cancel() {
      if(!this.allAudit){
        this.$emit('cancelChecked');
      }
    }
  }
}
</script>
<style lang="less" scoped>
p{
  text-align: center
}
</style>
