import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import iView from 'iview';

import InfiniteLoading from 'vue-infinite-loading';
import Viewer from 'v-viewer'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import vueWaterfallEasy from 'vue-waterfall-easy'


const Plugins = {
  Viewer,
}

const Components = {
  InfiniteLoading,
  vueWaterfallEasy,
  Waterfall,
  WaterfallSlot
}

for (let [key, value] of Object.entries(Components)) {
  Vue.component(key, value)
}
for (let [key, value] of Object.entries(Plugins)) {
  Vue.use(value)
}


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')