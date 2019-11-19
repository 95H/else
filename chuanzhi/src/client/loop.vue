<template>
  <div id="loop">
    子级轮播组件
    <span v-for="(item,index) in list" :key="index">{{item}}</span>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  export default {
    props: ['list'],
    data() {
      return {
        msg: 'zheshiyigezhongyaoxinxi',
        username: 'name'
      }
    },
    mounted() {
      this.$emit('send', this.msg, this.username)
    }
  }
</script>

<style>
  #loop {
    width: 100%;
    height: 100px;
    background: indianred;
  }
</style>


