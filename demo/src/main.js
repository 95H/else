import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

import Hcolumn from '@/views/column'
Vue.use(Hcolumn)

Vue.use(ElementUI)
// import G2 from '@antv/g2'
// Vue.use(G2)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
