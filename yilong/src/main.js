// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Element)
Vue.use(BaiduMap, {
	ak: 'NmBVDfPfdgBcqkP6eZG4c6IKciRyPewl'
});
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	axios,
	render: h => h(App)
})