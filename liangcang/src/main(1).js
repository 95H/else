// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import plugin from './plugin'
import store from './store'
import "mint-ui/lib/index.js"
import "amfe-flexible/index.js"
import Error from './error/error'

Vue.use(plugin)

Vue.config.productionTip = false
Vue.prototype.$Error = Error

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
