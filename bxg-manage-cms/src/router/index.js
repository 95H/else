import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import { routers } from './router'
import Util from '@/util/util'
import store from '@/store/index'
import InitAuth from '@/util/keycloak'

Vue.use(VueRouter);
// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => { //路由钩子
    iView.LoadingBar.start();
    document.title = to.meta.title;
    let keycloak = store.state.keycloak;
    if (to.meta.requiresAuth) {
        if (!keycloak.authenticated) {
            InitAuth(next)//认证组件未初始化或未认证
        } else {
            next()
        }
    } else {
        next()
    }
})
router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
