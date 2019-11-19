<template>
  <Modal
    title="提示信息"
    v-model= "isRecallShow"
    class-name="vertical-center-modal"
    width="500"
    :mask-closable="false"
    @on-ok="asyncOK"
    :loading="loading"
    @on-cancel="cancel"
    >
    <Form ref="recallData" :model="recallData" :rules="rulerecallData">
      <p>确定要撤回该文章吗？</p>
      <FormItem label="原因：" prop="recallCause">
        <Input type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." v-model="recallData.recallCause"/>
        <p style="text-align:right;color:#ccc">100字</p>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isRecallModal', 'ids'],
  data (){
    return {
      loading: true,
      recallData: {
        recallCause: ''
      },
      rulerecallData: {
        recallCause: [
          {
            required: true,
            message: '请填写原因！',
            trigger: 'blur'
          },
          {
            max: 100,
            message: '最多输入100字',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    isRecallShow: {
      get() {
        return this.isRecallModal
      },
      set(val) {
        this.$emit('update:isRecallModal', val)
      }
    }
  },

  methods: {
    asyncOK() {
      this.$refs.recallData.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return false
        }
        api.patchArticles({
          ids: this.ids,
          operation: 'BACK',
          remark: this.recallData.recallCause
        }).then(res=>{
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          if(res.status == 200){
            this.$Message.success('撤回成功');
            this.isRecallShow = false;
            this.$refs.recallData.resetFields();
            this.$emit('onloadInfo');
          } else{
            this.$Message. error('撤回失败');
            this.isRecallShow = false;
            this.$refs.recallData.resetFields();
          }
        })
      })
    },

    cancel() {
      this.$refs.recallData.resetFields();
    }
  }
}
</script>