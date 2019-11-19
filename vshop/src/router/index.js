import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home.vue'
import Lis from '../components/lis.vue'
import List from '../components/list.vue'
import Car from '../components/car.vue'
import My from '../components/my.vue'
import Detail from '../components/detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {keepAlive: true}
    },
    {
      path: '/lis',
      name: 'lis',
      component: Lis
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/car',
      name: 'car',
      component: Car
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/Detaile/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/*',
      redirect: '/home'
    }

  ]
})
// routes: [
//   {path:'/',redirect:'/home'},
//   {path: '/home',component:()=>import('../components/Home'),meta:{
//     keepAlive:true
//   }},
//   {path: '/car',component: ()=>import('../components/Car')},
//   {path: '/list',component:()=>import('../components/List')},
//   {path: '/my',component: ()=>import('../components/My')},
//   {name:'detail',path: '/detail',component:()=>import('../components/Detail')},
//   {path:'/*',redirect:'/home'}
// ]
