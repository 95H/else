<script>
import _ from 'lodash/fp'

export default {
  name: 'SimpleModal',

  props: {
    // 弹窗标题
    title: {
      type: String,
      required: true
    },

    // 是否显示弹窗
    value: {
      type: Boolean,
      required: true
    },

    isLoadingModalData: {
      type: Boolean,
      default: false
    }
  },

  render(h) {
    let children = []

    this.$slots.default.context = this._self
    children.push(this.$slots.default)

    if (this.$scopedSlots.footer) {
      let scopeSlotFooter = this.$scopedSlots.footer({
        cancel: this.cancel
      })

      children.push(h('div', {
        slot: 'footer'
      }, [  scopeSlotFooter ]))
    }

    let props = _.pipe([
      _.assign({ mask: true, transfer: true, 'mask-closable': false }),
      _.omit(['isLoadingModalData'])
    ])(this.$props)

    if (this.$props.isLoadingModalData !== false) {
      let spin = h('div', {
        class: 'modal-spin-container'
      }, [
        h('Spin', {
          attrs: {
            fix: true
          }
        })
      ])

      children.push(spin)
    }

    return h('Modal', {
      on: {
        ...this.$listeners,
        'on-ok': this.ok
      },
      class: 'simple-modal',
      attrs: this.$attrs,
      props: props
    }, children)
  },

  methods: {
    ok() {
      console.log('ok')
    },

    cancel() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less">
.simple-modal {
  .ivu-modal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ivu-modal {
    top: 0;
  }

  .modal-spin-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
