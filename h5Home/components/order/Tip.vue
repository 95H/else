<template>
  <no-ssr>
    <transition name="tip-fade">
      <div class="tip" :style="tipStyle" v-show="isShowTip">
        <div class="tip-content">
          <p class="content-line-txt">课程价格 {{detailInfo.coursePrice}}</p>
          <p class="content-line-txt">报名费冲抵 {{detailInfo.chargeAgainstAmount}}</p>
          <p class="content-line-txt">优惠 {{detailInfo.discountAmount}}</p>
        </div>
      </div>
    </transition>
  </no-ssr>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    // tip定位的位置(左上角)
    tipPosition: {
      type: Object
    }
  },

  data() {
    return {
      isShowTip: this.isShow,
      tipStyle: { left: 0, top: 0 },
      detailInfo: {
        coursePrice: '...',
        chargeAgainstAmount: '...',
        discountAmount: '...'
      }
    }
  },

  methods: {
    // 格式化金额
    /**
     * 
     * @param num {number} 金额数字
     */
    formatAmount(num) {
      return `￥${num.toFixed(2)}`
    },

    show(detailData) {
      this.detailInfo.coursePrice = this.formatAmount(detailData.coursePrice)
      this.detailInfo.chargeAgainstAmount = `-${this.formatAmount(detailData.chargeAgainstAmount)}`
      this.detailInfo.discountAmount = `-${this.formatAmount(detailData.discountAmount)}`

      this.isShowTip = true
      this.$nextTick(() => {
        let left = this.tipPosition.x - this.$el.offsetWidth
        let top = this.tipPosition.y - this.$el.offsetHeight

        this.tipStyle.left = `${left}px`
        this.tipStyle.top = `${top}px`
      })
    },
    
    hide() {
      this.isShowTip = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../static/css/index'

.tip
  position: absolute
  top: 0
  left: 0
  padding: px2rem(18)
  background-color: rgba(56, 173, 255, 0.98)
  border: 1px solid #ccc
  box-shadow: 0 4px 7px 0 rgba(139, 139, 139, 0.5)
  border-radius: 8px 8px 0 8px

  .tip-content
    color: #fff
    font-size: px2rem(26)
    line-height: px2rem(28)

    .content-line-txt
      white-space: nowrap
  
.tip-fade-enter-active,
.tip-fade-leave-active {
  transition: opacity .2s
}

.tip-fade-enter,
.tip-fade-leave-to {
  opacity: 0
}
</style>