<template>
  <div class="icom">
    icom
    <span v-for="(item,index) in list" :key="index">{{item}}</span>
    <router-link to="/adminicom">去adminIcom</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: ['q', 'r', 'y']
      }
    },
    methods: {},
    beforeDestroy() {
      this.$bus.$emit('sendData', this.list)
    }
  }
</script>

<style>
  .icom {
    width: 100%;
    height: 100px;
    background: yellow;
  }
</style>


