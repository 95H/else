let getNow = null
if (process.server) {
  getNow = function () {
    return +new Date()
  }
} else if (window.performance && window.performance.now) {
  getNow = function () {
    return window.performance.now() + window.performance.timing.navigationStart
  }
} else {
  getNow = function () {
    return +new Date()
  }
}

/**
 * 截取指定长度的中英文混合字符串
 * @param  {String} str 待截取的字符串
 * @param  {Number} n   截取长度 (中文字符为英文的2倍)
 * @return {String}     截取后的字符串
 */
export function subString(str, n) {
  let strlen = 0
  let s = ''
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      strlen += 2
    } else {
      strlen++
    }
    s += str.charAt(i)
    if (strlen >= n) {
      return s + '...'
    }
  }
  return s
}
export { getNow }