import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Date from '@/views/data'
import parents from '@/views/parents'
import states from '@/views/state'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/date',
      name: 'Date',
      component: Date
    },
    {
      path: '/parents',
      name: 'parents',
      component: parents
    },
    {
      path: '/states',
      name: 'states',
      component: states
    }
  ]
})
