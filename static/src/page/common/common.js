import NavList from '@/page/common/Nav'
import SingleRadio from '@/page/common/SingleRadio'
import MultiSelection from '@/page/common/MultiSelection'
import Ipt from '@/page/common/Ipt'


export default {
  install(Vue){
    Vue.component('NavList', NavList); // 导航
    Vue.component('SingleRadio', SingleRadio); // 单选
    Vue.component('MultiSelection', MultiSelection); // 多选
    Vue.component('Ipt', Ipt); // 普通输入框
  }
}
