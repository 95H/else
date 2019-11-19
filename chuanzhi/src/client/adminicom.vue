<template>
  <div class="adminicom">
    <span v-for="(item,index) in list" :key="index">{{item}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      };
    },
    methods: {
  
  
    },
    created() {
      let that = this;
      this.$bus.$on("sendData", function(list) {
        that.list = list;
        console.log(this)
        // 当数据发送完成后 立即释放当前接收数据的监听函数
        this.$bus.$off('sendData')
      });
    }
  };
</script>

<style>
  .adminicom {
    width: 100%;
    height: 100px;
    background: cornflowerblue;
  }
</style>


