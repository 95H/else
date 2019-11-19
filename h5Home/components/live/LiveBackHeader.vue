<template>
	<div class="headbar cl" >
		<div class="head-wrapper">
      <div class="head-title" ref="titleContainer" v-if="!isAnim">
        <span ref="titleTxt">{{titleName}}</span>
      </div>
      <marquee class="head-title" direction="left" scrolldelay="200" hspace="10" v-else>{{titleName}}</marquee>
		</div>
  </div>
</template>

<script>
export default {
  name: 'liveHeader',
  props: ['titleName'],
  
  data() {
    return {
      isAnim: false
    }
  },

  mounted() {
    let titleContainer = this.$refs.titleContainer
    let titleTxt = this.$refs.titleTxt
    let { width: txtWidth } = titleTxt.getBoundingClientRect()
    if (txtWidth > titleContainer.clientWidth) {
      this.isAnim = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../static/css/index'

.headbar
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: px2rem(100)
  background: #ffffff
  line-height: px2rem(100)
  padding: 0 px2rem(100)
  z-index: 100
  box-shadow: 0px 0 7px 3px rgba(0, 0, 0, 0.05)

  .head-wrapper
    height: 100%
    width: 100%
    position: relative
    text-align: center

    .head-title
      height: 100%
      font-size: px2rem(36)
      color: #333
      line-height: px2rem(100)
      white-space: nowrap
      overflow: hidden
      // text-overflow: ellipsis;
      width: 80%
      margin: 0 auto
</style>
