import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/view/shop'
import List from '@/view/list'
import Lists from '@/view/lists'
import Car from '@/view/car'
import Me from '@/view/my'
import Detai from '@/view/details'
import login from '@/view/login'
import content from '@/view/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/car',
      name: 'Car',
      component: Car
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/Detai',
      name: 'Detai',
      component: Detai
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/lists',
      name: 'Lists',
      component: Lists
    },
    {
      path: '/content',
      name: 'content',
      component: content
    }
  ]
})
