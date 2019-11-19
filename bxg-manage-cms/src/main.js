import Vue from 'vue'
import App from './App'
import { router } from '@/router/index'
import { appRouter } from '@/router/router'
import store from '@/store/index'
import iView from 'iview'
import _ from 'lodash'
import $_ from 'lodash/fp'
import util from '@/util/util'
import Clipboard from 'clipboard' //复制

import '../iview-theme/index.less'//导入自定义iview样式

Vue.prototype.Clipboard = Clipboard

Vue._ = _
Object.defineProperty(Vue.prototype, '_', {
  value: _
})

Vue.$_ = $_
Object.defineProperty(Vue.prototype, '$_', {
  value: $_
})

Vue.use(iView)

Vue.mixin({
  methods: {
    hasSomeAccess(keys, client) {
      return util.hasSomeAccess(keys, client)
    },

    hasSomeLiveAccess(keys) {
      return util.hasSomeAccess(keys, 'bxg-live-api-dist')
    },

    hasSomeApiAccess(keys) {
      return util.hasSomeAccess(keys, 'bxg-admin-api-dist')
    },
    
    hasSomeAuthAccess(keys) {
      return util.hasSomeAccess(keys, 'bxg-admin-auth-api-dist')
    },

    calcApiAccess(keys) {
      return util.calcApiAccess(keys)
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name;
    this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    this.$store.commit('updateMenulist');
  },
  created() {
    let tagsList = [];
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children);
      }
    });
    this.$store.commit('setTagsList', tagsList);
  }
}).$mount("#app");
