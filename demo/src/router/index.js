import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/first'
import Test from '@/components/test'
import Tab from '@/components/tabs'
import com from '@/views/com'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //   path: '/',
        //   name: 'HelloWorld',
        //   component: HelloWorld
        // }
        // {
        //   path: '/',
        //   name: 'First',
        //   component: First
        // },
        {
            path: '/',
            name: 'com',
            component: com
        },
        {
            path: '/',
            name: 'Test',
            component: Test
        },
        {
            path: '/tab',
            name: 'Tab',
            component: Tab
        }
    ]
})
