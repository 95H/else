// 是否为QQ内置浏览器
export function isQQBuiltin(userAgent) {
  return userAgent.indexOf(' qq') > -1
}

// 是否为微信内置浏览器
export function isWXBuiltIn(userAgent) {
  return userAgent.indexOf('micromessenger') > -1
}

export function isMobile(userAgent) {
  let agents = new Array(
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  )
  let flag = false
  for (let v = 0; v < agents.length; v++) {
    if (userAgent.indexOf(agents[v]) > 0) {
      flag = true
      break
    }
  }
  return flag
}