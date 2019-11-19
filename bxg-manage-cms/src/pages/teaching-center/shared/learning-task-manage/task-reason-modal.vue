<template>
  <div class="reason-modal-container">
    <Modal
      class="reason-modal"
      v-model="modalShow"
      title="查看原因"
    >
      <div class="reason">
        <span>修改原因：</span>
        <p class="txt">{{ taskItem.taskReason }}</p>
      </div>
      <div class="info">
        <div class="info-date">
          <span>修改时间：</span>
          <span class="txt">{{ taskItem.taskUpdateTime }}</span>
        </div>
        <div class="info-user">
          <span>修改人：</span>
          <span class="txt">{{ taskItem.taskOperator }}</span>
        </div>
      </div>

      <template slot="footer">
        <Button type="primary" size="large" @click="close">关闭</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: [ 'value', 'taskItem' ],

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

  methods: {
    close() {
      this.modalShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.reason-modal {
  /deep/ .reason {
    margin-bottom: 20px;

    .txt {
      display: inline;
      color: #999;
      word-break: break-all;
    }
  }

  /deep/ .info {
    overflow: hidden;

    .info-user {
      float: right;
      margin-right: 30px;
    }

    .info-date {
      float: right;
    }

    .txt {
      color: #999;
    }
  }
}
</style>

