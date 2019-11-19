<template>
  <div class="pages">
    <div class="pages-left">
      <ul>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
        <li>
          <span>qq</span>
        </li>
      </ul>
    </div>
    <div class="pages-right"></div>
  </div>
</template>
<script>
export default {
  name: "pages"
};
</script>
<style lang='less' scoped>
.pages {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // overflow-y: scroll;
  .pages-left {
    width: 20%;
    height: 100%;
    background: #f3f3f3;

    ul {
      width: 100%;
      height: 100%;
      li {
        line-height: 1.333333rem;
        text-align: center;
        border: 1px solid pink;
        box-sizing: border-box;
      }
    }
  }
  .pages-right {
    float: right;
    width: 80%;
    box-sizing: border-box;
    height: 100%;
  }
}
</style>
