import NavList from './Nav'
import SingleRadio from './SingleRadio'
import SingleCheckbox from './SingleCheckbox'
import Ipt from './Ipt'


export default {
  install(Vue){
    Vue.component('NavList', NavList);
    Vue.component('SingleRadio', SingleRadio);
    Vue.component('SingleCheckbox', SingleCheckbox);
    Vue.component('Ipt', Ipt);
  }
}
