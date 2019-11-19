/**
 * Created by admin on 2017/10/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import indexState from "~/store/modules/index/indexState";
import loginResState from '~/store/modules/loginRegister/loginResState'
import discountPoupon from '~/store/modules/discountPoupon/discountPoupon'
import discountClass from '~/store/modules/discountPoupon/discountClass'
import orderState from '~/store/modules/order/orderState'
import userModule from './modules/userModule'

export default () => {
  return new Vuex.Store({
    modules: {
      indexModules: indexState,
      loginModules: loginResState,
      discountPoupon: discountPoupon,
      discountClass: discountClass,
      orderState: orderState,
      userModule
    }
  })
}
