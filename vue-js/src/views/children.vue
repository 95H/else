<template>
  <div class="box">
    <h5>{{childmsg}}</h5>
    <h1>父组件传过来的:{{msg}}</h1>
    <!-- <input type="text" v-model="user" @change="setUer" /> -->
    <button @click="setUser">传值</button>
    <h4>{{$store.state.author}}</h4>
  </div>
</template>

<script>
export default {
  name: "children",
  data() {
    return {
      childmsg: "子级",
      user: "子传给父的内容"
    };
  },
  props: ["msg"],
  methods: {
      setUser(){
          this.$emit('transfer',this.user)
      }
  },
  created() {}
};
</script>


<style scoped>
.box {
  border: 1px solid orange;
}
</style>
