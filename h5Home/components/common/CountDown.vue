<template>
  <no-ssr>
    <div class="countdown">
      <slot></slot>
      <span class="txt">{{ timeStr }}</span>
    </div>
  </no-ssr>
</template>

<script>
import { calcCountDown, getNow } from '~/common/utils/index'

// 倒计时组件
export default {
  name: 'CompCountDown',
  props: {
    // 总毫秒数(看必要情况决定是否支持秒)
    timeStamp: {
      type: Number,
      default: 0
      // required: true
    },
    // 是否初始化即开始计时
    initailStart: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      totalTimeStamp: this.timeStamp
    }
  },

  watch: {
    timeStamp(newValue, oldValue) {
      this.totalTimeStamp = newValue
    }
  },

  computed: {
    /**
     * @param timestamp {number} 剩余毫秒数
     */
    timeStr() {
      const timeStamp = this.totalTimeStamp
      
      let { padH, padM, padS } = calcCountDown(timeStamp)
      
      return `${padH}: ${padM}: ${padS}`
    }
  },

  mounted() {
    if (this.initailStart) {
      this.start()
    }
  },

  methods: {
    // 开始计时
    start() {
      
      if (this.totalTimeStamp < 0) {
        this.$emit('timeover')
        this.totalTimeStamp = 0
        return
      }

      let startTime = getNow()
      setTimeout(() => {
        let passTime = getNow() - startTime
        this.totalTimeStamp = this.totalTimeStamp - passTime
        this.start()
      }, 1000)
    }
  }
}
</script>
