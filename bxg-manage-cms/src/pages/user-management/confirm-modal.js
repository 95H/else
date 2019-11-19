let confirmModal = {
  methods: {
    confirmModal(config) {
      const title = config.title || '提示'
      const modalContent = config.content
      const promise = config.promise
      const successMsg = config.successMsg
      const self = this
      
      this.$Modal.confirm({
        title,
        content: modalContent,
        loading: true,
        onOk: async function() {
          let data = {}
          
          try {
            data = await promise.call(self)
          } catch (err) {
            data.message = '网络异常，请稍后再试'
          }

          let message = data.message
          let messageContent = ''
          let method = ''
          
          if (data.status == 200) {
            messageContent = successMsg || message
            method = 'success'
          } else {
            messageContent = message
            method = 'error'
          }

          self.$Message[method]({
            content: messageContent,
            onClose() {
              self.$Modal.remove()
            }
          })
        }
      })
    }
  }
}

export default confirmModal
