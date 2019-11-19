<template>
  <div class="content">
    <logo></logo>
    <div class="errorImg" v-if="error.statusCode === 404">
      <img src="/web/images/defaultImg/404.png" alt=""/>
    </div>
    <div class="errorTips" v-else>
      <img src="/web/images/loginRegister/filed.png">
      <p>网络连接超时!</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error',
    props:['error']
  }
</script>

<style lang="less">
  @import "../static/css/variable.less";
  .errorImg{
    width:unit(260/@u,@uu);
    height:unit(165/@u,@uu);
    overflow:hidden;
    position:absolute;
    top:30%;
    left:50%;
    transform:translate(-50%);
    -webkit-transform:translate(-50%);
    img{
      width:100%;
      height:100%;
    }
  }
  .errorTips{
    width:100%;
    overflow:hidden;
    position:absolute;
    top:30%;
    left:50%;
    transform:translate(-50%);
    -webkit-transform:translate(-50%);
    text-align: center;
    img{
      width: unit(120/@u,@uu);
      height: unit(120/@u,@uu);

    }
    p{
      font-size: unit(32/@u,@uu);
      text-align: center;
      margin-top: unit(20/@u,@uu);
      color: #333;
    }
  }
</style>
