<template>
    <h1>欢迎您，{{userName}}老师。</h1>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'home_index',

  computed: {
    ...mapState({
      keycloak: state => state.keycloak.keycloak
    }),

    userName() {
      let tokenParsed = this.keycloak.tokenParsed
      return tokenParsed.name || tokenParsed.given_name
    }
  }
}
</script>

<style lang="less">
  .red {
    color: red;
  }
  .margin-top-20 {
    margin-top: 20px;
  }
  .margin-left-10 {
    margin-left: 10px;
  }
  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
  .hide{
    //仅限于用在按钮权限控制
    display: none !important;
  }
</style>

