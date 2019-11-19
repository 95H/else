<template>
  <Modal
    title="提示信息"
    v-model= "isOutShow"
    class-name="vertical-center-modal"
    width="500"
    :mask-closable="false"
    :loading="loading"
    @on-ok="asyncOK"
    @on-cancel="cancel"
    >
    <Form ref="auditFormDataRef" :model="auditFormData" :rules="ruleAuditData" :show-message="true">
      <p>确定要下架改文章吗？</p>
      <FormItem label="原因：" prop="auditCause">
        <Input type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." v-model="auditFormData.auditCause"/>
        <p style="text-align:right;color:#ccc">100字</p>
      </FormItem>
      <p style="text-align:left;color:#ccc;font-size:14px;">注：下架后该文章不在显示前台页面</p>
    </Form>
  </Modal>
</template>
<script>
import api from '@/api/index'
export default {
  props: ['isOutModal', 'ids'],
  data () {
    return {
      auditOut: 'OUT',
      loading: true,
      auditFormData: {
        auditCause: ''
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
    isOutShow: {
      get() {
        return this.isOutModal
      },
      set(val) {
        this.$emit('update:isOutModal', val)
      }
    }
  },
  methods: {
    asyncOK() {
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
          operation: this.auditOut,
          remark: this.auditFormData.auditCause
        }).then(res => {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          if (res.status === 200) {
            this.$Message.success('操作下架成功');
            this.$emit('onLoadInfoOutOk');
            this.isOutShow = false;
            this.$refs.auditFormDataRef.resetFields();
          } else {
            this.$Message.error('操作下架失败');
            this.$emit('onLoadInfoOutOk');
            this.isOutShow = false;
            this.$refs.auditFormDataRef.resetFields();
          }
        })
      });
    },
    cancel() {}
  }
}
</script>
<style lang="less" scoped>
</style>
