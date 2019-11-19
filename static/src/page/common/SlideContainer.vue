<template>
  <div>
    <div class="peraonnelDetails">
      <slot name="slide-content"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
<style scoped lang="scss">
  .peraonnelDetails {position:absolute;right:0;top:0;z-index:999;background:red;}
</style>
