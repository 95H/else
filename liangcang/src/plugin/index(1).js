import axios from './axios'
import mintui from 'mint-ui'
export default{
    install(Vue,options){
      Vue.use(axios)
      Vue.use(mintui)
    }
}
