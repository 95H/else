<template>
  <div class="hello">
    <div class="box"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  width:100%;
  height: 100%;
  border: 1px solid red;
  .box{
    width:100%;
    height:200px;
    background:yellowgreen;
  }
}
</style>
