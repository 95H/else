import { Loading } from 'element-ui'
import _ from 'lodash'

let needLoadingRequestCount = 0
let loading

function startLoading(bgColor) {
  //console.log('startLoading =============')
  loading = Loading.service({
    lock: true,
    background: bgColor || 'rgba(0, 0, 0, 0.2)'
  })
}

function endLoading() {
  //console.log('endLoading==========')
  loading.close()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export function showFullScreenLoading(bgColor) {
  if (needLoadingRequestCount === 0) {
    startLoading(bgColor)
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)()
  }
}
