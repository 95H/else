<template>
  <Modal
    title="放弃"
    v-model= "isAbandonModalshow"
    class-name="vertical-center-modal"
    width="800"
    :loading="loading"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel">
    <Form ref="formAbandon" :model="formAbandon" :rules="ruleAbandon">
      <FormItem label="请输入原因：" prop="cause">
        <Input type="textarea" :autosize="{minRows: 4}" placeholder="请输入..." v-model="formAbandon.cause"/>
        <p style="text-align:right;color:#ccc">500字</p>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isAbandonModal', 'planId'],
  data() {
    return {
      loading: true,
      formAbandon: {
        cause: ''
      },
      ruleAbandon: {
        cause: [
          {
            required: true,
            message: '放弃原因不能为空！',
          },{
            max: 500,
            message: '最多输入500字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed:{
    isAbandonModalshow: {
      get() {
        return this.isAbandonModal
      },
      set(val) {
        this.$emit('update:isAbandonModal', val)
      }
    }
  },
  methods:{
    //关闭弹窗
    cancel() {
      this.$refs.formAbandon.resetFields();
    },
    asyncOK() {
      this.$refs.formAbandon.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }
        api.patchAbandon({
          planId: this.planId,
          type: 1,
          content: this.formAbandon.cause
        }).then(res=>{
          if(res.status == 201){
            this.$Message.success('计划已放弃！');
            this.$parent.$parent.fecthPlans()
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          } else if(res.status == 401){
            this.$Message.error('登录人不是班主任或导师!');
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          }else if(res.status == 403){
            this.$Message.error('登录人不是学员所在群的班主任或导师!');
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          }else if(res.status == 406){
            this.$Message.error('计划不属于登录人!');
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          }else if(res.status == 407){
            this.$Message.error('计划不存在或不是未完成状态!');
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          }else if(res.status == 409){
            this.$Message.error('沟通计划角色与登录人当前角色不匹配!');
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          }else if(res.status == 410){
            this.$Message.error('计划不存在或已删除!');
            this.isAbandonModalshow = false;
            this.$refs.formAbandon.resetFields();
          }else{
            this.$Message.error('放弃失败，请稍后重试~');
            this.$refs.formAbandon.resetFields();
            this.loading = false;
          }
        })
      })
    }
  }
}
</script>


