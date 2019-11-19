// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import bus from './eventBus'
import http from './http'

Vue.prototype.$bus = bus
Vue.prototype.$http = http
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  bus,
  http,
  components: { App },
  template: '<App/>'
})
