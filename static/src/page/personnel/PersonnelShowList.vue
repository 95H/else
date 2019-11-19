<template>
  <div class="list-container">
    <slot name="head-info"></slot>
    <div class="list-content">
      <table-list :listoptions="tableoptions"
                  @oncolumnclick="tableShowEvent"
                  :tabledata="childdata"
                  :totalnumber="totalnumber"
      ></table-list>
      <slot name="pagination-info"></slot>
    </div>
  </div>
</template>
<script>
  import TableList from '../common/TableList'
  export default {
    components: { TableList },
    props: {
      totalnumber: Number,
      childdata: Array,
      tableoptions: Array
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      tableShowEvent(arg) {
        this.$emit('onparentclick', arg);
      }
    }
  }
</script>
<style scoped lang="scss">
  .list-container {
    margin-top: 10px;
  }

  .list-content {
    padding: 20px;
    background: #fff;
    border: 1px solid rgba(236, 236, 236, 1);
  }

</style>
