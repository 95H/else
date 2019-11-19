<template>
  <div class="bod">
    <div class="footer" v-show="showA">
      <router-link to="/home">
        <i class="iconfont icon-shouye"></i>首页
      </router-link>
      <router-link to="/lis">
        <i class="iconfont icon-liebiao"></i>全列
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-liebiao"></i>分列
      </router-link>
      <router-link to="/car">
        <i class="iconfont icon-ziyuan"></i>购物车
      </router-link>
      <router-link to="/my">
        <i class="iconfont icon-wode"></i>我的
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showA: true
    };
  },
  watch: {
    $route(to, from) {
      // console.log(to);
      if (to.name == "detail") {
        this.showA = false;
      } else {
        this.showA = true;
      }
    }
  },
  created() {
    if (this.$route.name == "detail") {
      this.showA = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
  color: #24aa7d;
  display: inline-block;
  margin: 0 5px 0 0;
}
a {
  flex: 1;
  border: 1px solid #24aa7d;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
  border-radius: 55px 55px 0 0;
  background: #ccc;
  font-size: 10px;
}
a.router-link-active {
  color: #fff;
  background: darkcyan;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  line-height: 50px;
  display: flex;
  margin: 0 auto;
  z-index: 99;
  text-align: center;
  box-sizing: border-box;
}
</style>
