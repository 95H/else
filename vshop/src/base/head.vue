<template>
  <div class="header">
    <i v-if="showArrow" class="iconfont icon-fanhui" @click="goBack"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  name: "car",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // zlpg/project/projectCont/projectImplementation/projectOnlineTask/incomeLaw
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 50px;
  background: #ccc;
  padding: 0 10px;
  text-align: center;
  z-index: 99;
  color: #feb1ac;
  font-size: 28px;
  letter-spacing: 10px;
  text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  -webkit-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
  -moz-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
}
i {
  position: absolute;
  left: 20px;
}
</style>
