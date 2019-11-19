<template>
  <Modal
    :title="title"
    v-model="modalShow"
    class-name="transfer-modal"
    width="70%"
    :loading="loading"
    @on-ok="OK"
    @on-cancel="cancle"
    :mask-closable="false"
  >
    
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapState } from 'vuex'
export default {
  props: [ 'isShowModal'],
  data() {
    return {
        title:'线上互转',
        modal:[],
        loading:false
    }
  },
  methods: {
    OK(){
        
    },
    cancle(){
      this.modalShow = false
    }
    
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
  watch: {
    
  }
}
</script>

 <style lang="less">

</style>
