import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        count:1
    },
    actions:{
        
    },
    mutations:{
        ass(state){
            state.count+=7
        }
    },
    getters:{},
    modules:{}
    // 消息模块【推送的信息】、用户模块【登陆存信息 token】、登陆模块
})