<template>
  <no-ssr>
    <transition name="overlay-fade">
      <div class="modal-overlay" v-if="visibility.overlay">
        <div class="modal-background-click" @touchstart.self="handleBackgroundClick">
          <div class="modal-box" v-if="visibility.modal">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </no-ssr>
</template>

<script>
export default {
  name: 'CompSimpleModal',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },

    // modal在overlay延迟
    delay: {
      type: Number,
      default: 0
    },

    clickToClose: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: false,
      visibility: {
        modal: false,
        overlay: false
      }
    }
  },

  watch: {
    isShow(v) {
      if (v) {
        this.show()
      } else {
        this.hide()
      }
    }
  },

  methods: {
    show() {
      this.visible = true
      this.startOpeningModal()
    },

    hide() {
      this.visible = false
      this.startClosingModal()
      this.$emit('close')
    },

    startOpeningModal() {
      this.visibility.overlay = true
      setTimeout(() => {
        this.visibility.modal = true
      }, this.delay)
    },

    startClosingModal() {
      this.visibility.modal = false
      setTimeout(() => {
        this.visibility.overlay = false
      }, this.delay)
    },

    handleBackgroundClick() {
      if (this.clickToClose) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../static/css/index'

.modal-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background-color: rgba(0, 0, 0, 0.4)
  z-index: 988
  opacity: 1  

  .modal-background-click
    width: 100%
    min-height: 100%
    display: flex
    justify-content: center
    align-items: center
  
  .modal-box
    width: 75%
    // max-width: 80%

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity .4s
}

.overlay-fade-enter,
.overlay-fade-leave-to {
  opacity: 0
}
</style>

