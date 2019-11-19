<template>
  <!-- 目前直播宽屏的头部在使用 -->
  <section :class="$style.backHeader" :style="headerStyle">
    <!-- 箭头暂时不要了
    <div :class="$style.backSection">
      <span :class="$style.backArrow" @click="back"></span>
      <p :class="$style.backName" v-if="backName">{{backName}}</p>
    </div> -->
    <!-- slot? -->
    <div class="head-title">
      <p>头部</p>
    </div>
    <div :class="$style.rightSection">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    backName: {
      type: String,
      default: ''
    },
    // 带单位的值，比如 0.75rem, 100px...
    height: {
      type: String
    }
  },

  data() {
    return {
      headerStyle: {}
    }
  },

  beforeMount() {
    // 是否这里给加一个默认的单位，比如rem
    if (this.height) {
      this.headerStyle.height = this.height
    }
  },

  methods: {
    // 默认触发back事件
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus">
@import "../static/css/index"

.backHeader
  display: flex
  justify-content: space-between
  width: 100%
  height: px2rem(100)
  padding: 0 px2rem(30)
  box-sizing: border-box
  // 黑白阴影背景暂时不要了
  // background-image: linear-gradient(to bottom,rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0))

// 返回区域 >>>
.backSection
  height: px2rem(100)
  overflow: hidden
  display: flex
  align-items: center

.backArrow
  display: inline-block
  size: px2rem(16) px2rem(58)
  background: url('../static/web/images/common/back-icon.png') no-repeat
  background-size: 100%
  vertical-align: top
  margin-top: px2rem(24)

.backName
  margin-left: px2rem(12)
  font-size: px2rem(36)
// 返回区域 <<<

// 右侧区域
.rightSection
  display: flex
  align-items: center
</style>