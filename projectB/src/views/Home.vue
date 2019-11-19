<template>
  <div class="home">

    <button @click="addA">-</button>
    <span>{{$store.state.count}}</span>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {

  },
  methods:{
    addA(){
      this.$store.commit('addcountA')
    }
  }
};
</script>
