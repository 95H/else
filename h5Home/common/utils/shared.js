const _toString = Object.prototype.toString

/**
 * 判断是否是字面量对象
 */
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

/**
 * 获取url参数
 */
export function getUrlParam(name, url = '') {
  if (!url) {
    url = window.location.href
  }
  
  // name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  let results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const ESC = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '&': '&amp;'
}

/**
 * 转义4个字符
 */
export function escape(s) {
  return s.replace(/[<>"&]/g, (a) => ESC[a] || a)
}

/**
 * 简单判断是否是ip
 * 
 * @param str string 检查的字符串
 */
const ipReg = /^(?:\d{1,3}\.){3}\d{1,3}$/
export function isIp(str = '') {
  return ipReg.test(str)
}

/**
 * 判断是否为邮件
 * @param {string} email 
 */
const emailReg = /^[a-zA-Z0-9](?:[\w]{4,17})@[^.\s@]+(?:\.[^.\s@]+){1,}$/
export function checkEmail(email) {
  return emailReg.test(email);
}

/**
 * 判断是否为手机号
 * 仅判断以数字1开头,共11位数字即可
 */
const phoneRestReg = /^1\d{10}$/
export function checkPhone(phone) {
  return phoneRestReg.test(phone)
}

/**
 * 判断是否为QQ号
 */
const qqReg = /^\d{5,11}$/
export function checkQQ(qq) {
  return qqReg.test(qq)
}


function padZero(num) {
  if (num < 10) {
    return '0' + num
  }

  return num
}

/**
 * 根据传入的毫秒数转换为对象形式
 * 
 * @param {number} tNum 剩余毫秒数
 * @return {Object} 
 * {
 *    h: 小时
 *    m: 分
 *    s: 秒
 * padH: 小时(补0)
 * padM: 小时(补0)
 * padS: 小时(补0)
 * }
 */
export function calcCountDown(tNum) {
  let t = 0
  let h = 0
  let m = 0
  let s = 0

  if (tNum > 0) {
    // 比如3698毫秒，应该显示为4秒
    t = Math.ceil(tNum / 1000)
    h = Math.floor(t / (60 * 60))
    m = Math.floor(t / 60) % 60
    s = Math.floor(t % 60)
  }

  let padH = padZero(h)
  let padM = padZero(m)
  let padS = padZero(s)

  return {
    h,
    m,
    s,
    padH,
    padM,
    padS
  }
}