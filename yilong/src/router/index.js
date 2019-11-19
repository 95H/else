import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../admin'
import Min from '../client/min'
import Headers from '../components/head/headers'
import Footers from '../components/foot/footers'

import Shouye from '../client/shouye'
import Guoneijiudian from '../client/guoneijiudian'
import Guojijiudian from '../client/guojijiudian'
import Jipiao from '../client/jipiao'
import Huochepiao from '../client/huochepiao'
import Qichepiao from '../client/qichepiao'
import Lvyouzhinan from '../client/lvyouzhinan'
import Bottom from '../client/bottom'

import Denglu from '../client/denglu'
import Zhuce from '../client/zhuce'
import Lunbo from '../client/lunbo'
import Zhinan from '../client/zhinan'
import Theme from '../client/theme'
import Cont from '../client/cont'
import guonei from '../client/guonei'
import haiwai from '../client/haiwai'
import zhinan_a from '../client/zhinan_a'
import zhinan_b from '../client/zhinan_b'
import zhinan_c from '../client/zhinan_c'
import zhinan_d from '../client/zhinan_d'
import menghuanjiaqi from '../client/menghuanjiaqi'
import beijingshendan from '../client/beijingshendan'
import ticket from '../client/ticket'
import changjianjiudian from '../client/bottom/changjianjiudian'
import hezuohuoban from '../client/bottom/hezuohuoban'
import jipiaochaxun from '../client/bottom/jipiaochaxun'
import jiudiantuangou from '../client/bottom/jiudiantuangou'
import jiudianyuding from '../client/bottom/jiudianyuding'
import remenchengshi from '../client/bottom/remenchengshi'

import Notfind from '../client/Notfind'
// import { resolve } from 'dns';

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/Admin/shouye' //  选中第一个默认路由
    },
    {
      path: '/Admin',
      component: Admin,
      children: [
        {
          path: '/Admin/shouye',
          component: Shouye,
          alias: '首页'
        },
        {
          path: '/Admin/guoneijiudian',
          component: Guoneijiudian,
          alias: '国内酒店'
        },
        {
          path: '/Admin/guojijiudian',
          component: Guojijiudian,
          alias: '国际酒店'
        },
        {
          path: '/Admin/jipiao',
          component: Jipiao,
          alias: '机票'
        },
        {
          path: '/Admin/huochepiao',
          component: Huochepiao,
          alias: '火车票'
        },
        {
          path: '/Admin/qichepiao',
          component: Qichepiao,
          alias: '汽车票'
        },
        {
          path: '/Admin/lvyouzhinan',
          component: Lvyouzhinan,
          alias: '旅游指南'
        }
      ]
    },
    {
      path: '/Denglu',
      name: 'Denglu',
      component: Denglu
    },
    {
      path: '/Zhuce',
      name: 'Zhuce',
      component: Zhuce
    },
    {
      path: '/zhinan_a',
      name: 'zhinan_a',
      component: zhinan_a
    },
    {
      path: '/zhinan_b',
      name: 'zhinan_b',
      component: zhinan_b
    },
    {
      path: 'zhinan_c',
      name: 'zhinan_c',
      component: zhinan_c
    },
    {
      path: '/zhinan_d',
      name: 'zhinan_d',
      component: zhinan_d
    },
    {
      path: '/menghuanjiaqi',
      name: 'menghuanjiaqi',
      component: menghuanjiaqi
    },
    {
      path: '/beijingshendan',
      name: 'beijingshendan',
      component: beijingshendan
    },
    {
      path: '/Bottom',
      name: 'Bottom',
      component: Bottom
    },
    {
      path: '/jiudianyuding',
      component: jiudianyuding
    },
    {
      path: '/jipiaochaxun',
      component: jipiaochaxun
    },
    {
      path: '/jiudiantuangou',
      component: jiudiantuangou
    },
    {
      path: '/remenchengshi',
      component: remenchengshi
    },
    {
      path: '/hezuohuoban',
      component: hezuohuoban
    },
    {
      path: '/changjianjiudian',
      component: changjianjiudian
    },
    {
      path: '/min',
      name: 'min',
      component: Min
    },
    {
      path: '*',
      name: 'notfind',
      component: Notfind
    }
  ]
})
export default router
