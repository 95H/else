// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'swiper/dist/css/swiper.min.css'
import VueLazyload from 'vue-lazyload'


import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://bpic.588ku.com/element_origin_min_pic/01/29/90/03573af86229ae7.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543982088554&di=6cd8ed4a21a44fce307dc453e5f4981a&imgtype=0&src=http%3A%2F%2Fstatic.codeceo.com%2Fimages%2F2015%2F12%2F57aa60fb38f27b6830c50d572c68176b.jpg',
  attempt: 1
})
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
