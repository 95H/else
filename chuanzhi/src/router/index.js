import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '../view/home.vue'
import Icom from '../client/icom.vue'
import adminIcom from '../client/adminicom.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/Icom',
      name: 'Icom',
      component: Icom
    },
    {
      path: '/adminIcom',
      name: 'adminIcom',
      component: adminIcom
    }
  ]
})
