import Vue from 'vue'
import { zhugeTrack } from './filter'
import { isPlainObject } from '~/common/utils/index'

function off(el, type, fn, option = false) {
  el.removeEventListener(type, fn, false)
}

// 从指令中获取zg参数
function getZgParams(value) {
  let name = ''
  let obj = null
  let url = ''

  // 对象获取name, obj, url
  if (isPlainObject(value)) {
    name = value.name
    obj = value.obj
    url = value.url
  // 数组获取name, obj, url
  } else if (Array.isArray(value)) {
    name = value[0]
    obj = value[1]
    url = value[2]
  } else {
    throw new Error('诸葛统计的参数类型错误')
  }

  return {
    name,
    obj,
    url
  }
}

// 将zg参数值设为el的标签属性
function setZgAttr(el, name, obj, url) {
  el.dataset.zgName = name

  if (obj) {
    el.dataset.zgObj = JSON.stringify(obj)
  }
  
  if (url) {
    el.dataset.zgUrl = url
  }
}

Vue.directive('zg', {
  bind(el, binding) {
    let value = binding.value

    let { name, obj, url } = getZgParams(value)

    if (!name) {
      throw new Error('诸葛统计必须含name值')
    }

    setZgAttr(el, name, obj, url)
    
    el.boundClick = function(event) {
      let zgName = el.dataset.zgName
      let zgObj = null
      let zgUrl = el.dataset.zgUrl

      if (el.dataset.zgObj) {
        zgObj = JSON.parse(el.dataset.zgObj)
      }

      // 跳转解除绑定
      if (zgUrl) {
        off(el, 'click', el._zg_boundClick)
        el._zg_boundClick = null
      }

      zhugeTrack(zgName, zgObj, zgUrl)
      event.preventDefault()
    }
    
    el.addEventListener('click', el.boundClick, false)
  },

  // 如在mouted更新时
  update(el, binding) {
    let { name, obj, url } = getZgParams(binding.value)

    setZgAttr(el, name, obj, url)
  },

  unbind(el) {
    if (el._zg_boundClick) {
      off(el, 'click', el._zg_boundClick)
    }
  }
})