<template>
  <div class="page1">
    <p>{{userlist.id}}---{{userlist.name}}</p>
    <button @click="send">发送数据</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userlist: {
          id: 1,
          name: 'lili'
        }
      }
    },
    methods: {
      send() {
        this.$bus.$emit('senddata', this.userlist)
      }
    },
    mounted() {
      // console.log(this)
    }
  
  }
</script>

<style>
  .page1 {
    width: 100%;
    height: 100px;
    background: pink;
  }
</style>


