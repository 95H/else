<template>
  <div class="bod">
    <div class="footer">
      <router-link to="/">
        <i class="iconfont icon-shouye"></i>商店
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-liebiao"></i>分类
      </router-link>
      <router-link to="/car">
        <i class="iconfont icon-ziyuan"></i>购物车
      </router-link>
      <router-link to="/me">
        <i class="iconfont icon-wode"></i>个人
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // showA: true
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
  color: #ccc;
  display: inline-block;
  margin: 0 5px 0 0;
}
i:hover{
  color:#000;
}
a {
  flex: 1;
  color:#ccc;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
  font-size: 10px;
}
a.router-link-active {
  color: #000;
  background: #fff;
}
.footer {
  border-top:1px solid #ccc;
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  position: fixed;
  bottom: 0;
  line-height:1.5rem;
  display: flex;
  margin: 0 auto;
  z-index: 99;
  text-align: center;
  box-sizing: border-box;
}
</style>
