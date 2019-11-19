/**
 * Created by admin on 2017/10/18.
 */
import Vue from 'vue'
// import {
//   Toast,
//   Indicator,
//   MessageBox
// } from 'mint-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

// Vue.use(Toast)
// Vue.use(Indicator)
// Vue.use(MessageBox)

Vue.use(MintUI)

Vue.prototype.$toast = MintUI.Toast;
Vue.prototype.$indicator = MintUI.Indicator;
Vue.prototype.$messagebox = MintUI.MessageBox;
