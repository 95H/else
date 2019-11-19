<template>
  <div class="page2">
    <p>{{userlist.id}}---{{userlist.name}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userlist: {}
      }
    },
    methods: {},
    mounted() {
      let that = this;
      this.$bus.$on('senddata', function(userlist) {
        that.userlist = userlist
      })
  
    }
  }
</script>

<style>
  .page2 {
    width: 100%;
    height: 100px;
    background: yellowgreen;
  }
</style>


