const andoridReg = /android/
const iosReg = /iphone|ipad|ipod;?/

/**
 * 获取页面隐藏属性的前缀
 */
function getPagePropertyPrefix() {
  const prefixes = ['webkit', 'moz', 'ms', 'o']
  let correctPrefix

  if ('hidden' in document) return ''

  prefixes.forEach((prefix) => {
    if (`${prefix}Hidden` in document) {
      correctPrefix = prefix
    }
  })
  
  return correctPrefix || false
}

/**
 * 获取判断页面 显示|隐藏 状态改变的属性
 */
function getVisibilityChangeProperty() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) return false

  return `${prefix}visibilitychange`
}

/**
 * 判断页面是否隐藏（进入后台）
 */
function isPageHidden() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) return false

  const hiddenProperty = prefix ? `${prefix}Hidden` : 'hidden'
  return document[hiddenProperty]
}

/**
 * 检测是否唤端成功
 * @param {function} cb - 唤端失败回调函数
 */
function checkOpen(cb, timeout = 3000) {
  const visibilityChangeProperty = getVisibilityChangeProperty()
  console.log('visibilityChangeProperty:' + visibilityChangeProperty)
  const timer = setTimeout(() => {
    const hidden = isPageHidden()
    console.log('hidden:' + hidden)
    if (!hidden) {
      cb()
    }
  }, timeout)
  
  if (visibilityChangeProperty) {
    document.addEventListener(visibilityChangeProperty, () => {
      console.log('visibilityChangeProperty clear')
      clearTimeout(timer);
    })

    return
  }

  window.addEventListener('pagehide', () => {
    console.log('pagehide clear')
    clearTimeout(timer)
  })
}

/**
 * 通过 iframe 唤起
 * @param {string}} [uri] - 需要打开的地址
 */
let iframe = null
function evokeByIFrame(uri) {
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.frameborder = '0'
    iframe.style.cssText = 'display:none;border:0;width:0;height:0;'
    document.body.appendChild(iframe)
  }

  iframe.src = uri
}

function evokeByLocation(uri) {
  window.top.location.href = uri
}

export function evokeApp() {
  let schemeUrl = ''
  let downlink = ''
  const ua = navigator.userAgent.toLowerCase()
  
  if (andoridReg.test(ua)) {
    // schemeUrl = 'boxueguapp://'
    schemeUrl = 'mtjd089f12195://'
    downlink = 'https://attachment-center.boxuegu.com/data/attachment/online/apk/bxg.apk'
    evokeByIFrame(schemeUrl)
  } else if (iosReg.test(ua)) {
    schemeUrl = 'BoxueguApp://' 
    downlink = encodeURI('https://itunes.apple.com/cn/app/博学谷/id1241182369?mt=8')
    evokeByLocation(schemeUrl)
  }

  checkOpen(function() {
    window.top.location.href = downlink
  })
}
