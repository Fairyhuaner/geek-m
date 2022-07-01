import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
import ToutiaoIcon from '@/components/ToutiaoIcon'
import '@/styles/index.less'
// 一次性把所有按需导出给导出来
import * as obj from '@/filters'
Vue.use(Vant)
Vue.component('ToutiaoIcon', ToutiaoIcon)
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
