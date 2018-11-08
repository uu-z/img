import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import iview from 'iview';

import vueWaterfallEasy from 'vue-waterfall-easy'

const { Button, Menu, MenuItem, Modal, BackTop, Tag, Input, Affix, Card, Form, FormItem, Notice, Message, Icon } = iview;


const Plugins = {
}

const Components = {
	vueWaterfallEasy,
	Button,
	Modal,
	Tag,
	Input,
	Icon,
  Menu,
  Card,
	MenuItem
};

for (let [key, value] of Object.entries(Components)) {
  Vue.component(key, value)
}
for (let [key, value] of Object.entries(Plugins)) {
  Vue.use(value)
}


Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
