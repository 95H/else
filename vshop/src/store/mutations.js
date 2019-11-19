import * as Types from './mutations-types'
import Vue from 'vue'

const mutations = {
  [Types.ADD_CAR](state, param) {
    // {type:'ADD_CAR',good:{}}
    // console.log(param.good)
    let good = param.good
    Vue.set(good, 'sele', true)
    // 判断购物车里有没有这个商品 有的话数量加1 没有的话数量为1
    let production = state.goodlist.find(item => item.id === good.id)
    if (production) {
      production.count += 1
      state.goodlist = [...state.goodlist]
      // state里面的值必须手动更新【因为是单向数据流】
      // console.log(production)
    } else {
      good.count = 1
      state.goodlist = [...state.goodlist, good]
      localStorage['list'] = JSON.stringify(state.goodlist)
    }
  },
  // 单选事件
  change (state, good) {
    // 找到点击的项
    let prod = state.goodlist.find(item => item.id == good.id)
    // 改变点击这一项的值
    prod.sele = good.sele
    // 手动修改state
    state.goodlist = [...state.goodlist]
  },
  checkall (state, val) {
    state.goodlist.forEach(item => item.sele = val)
    state.goodlist = [...state.goodlist]
  },
  jian (state, index) {
    let list = state.goodlist[index]
    list.count--
  },
  jia(state, index) {
    let list = state.goodlist[index]
    list.count++
  },
  [Types.DELETE_CAR](state, index) {
    state.goodlist.splice(index, 1)
    localStorage['list'] = JSON.stringify(state.goodlist)
  }
}
export default mutations
