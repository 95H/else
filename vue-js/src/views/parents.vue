<template>
  <div class="box">
    <h5>{{psmsg}}</h5>
    <h5>父组件接收到的：{{userName}}</h5>
    <input type="text" v-model="inputText" />
    <button @click="setAuthor">传参</button>
    <children :msg="psmsg" @transfer="getUer"></children>
  </div>
</template> 

<script>
import children from "./children";
export default {
  name: "parents",
  data() {
    return {
      arr: [1, 2, 3, 4, 5],
      psmsg: "父级",
      userName: "",
      inputText: ""
    };
  },
  components: {
    children
  },
  methods: {
    getUer(psmsg) {
      console.log(psmsg);
      this.userName = psmsg;
    },
    setAuthor: function() {
      this.$store.commit("newAuthor", this.inputText);
    }
  },
  created() {}
};
</script>


<style scoped>
.box {
  border: 5px solid greenyellow;
}
</style>
