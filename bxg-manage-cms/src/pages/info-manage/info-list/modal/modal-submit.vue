<template>
  <Modal
    title="提示信息"
    v-model= "isSubmitShow"
    class-name="vertical-center-modal"
    width="300"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel"
    >
    <p v-if="all" style="text-align:center;font-size:14px">确定批量提交选中资讯吗？</p>
    <p v-else style="text-align:center;font-size:14px">确定提交该条资讯吗？</p>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isSubmitModal', 'all', 'ids'],

  computed: {
    isSubmitShow: {
      get() {
        return this.isSubmitModal
      },
      set(val) {
        this.$emit('update:isSubmitModal', val)
      }
    }
  },

  methods: {
    asyncOK() {
      this.loading = true
      api.patchArticles({
        ids:this.ids,
        operation: 'SUBMIT'
      }).then(res=>{
        if(res.status===200){
          this.loading = false
          this.$Message.success('提交成功');
          this.$emit('onloadInfo');
          this.$nextTick(() => {
            this.loading = true
          })
        }else{
          this.loading = false
          this.$Message.error('提交失败');
          this.$nextTick(() => {
            this.loading = true
          })
        }
      })
    },

    cancel() {
      if(!this.all){
        this.$emit('cancelChecked');
      }
    }
  }
}
</script>