import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import iview from 'iview';
import * as componens from "./components"

import vueWaterfallEasy from 'vue-waterfall-easy'


if(process.env.NODE_ENV != "prod") {
  window.axios = axios
}

const { Button, BackTop,Affix,RadioGroup, Avatar, FormItem, Form, Radio, Select, Option, Menu, MenuItem, Modal, Tag, Input, Card, Icon } = iview;


const Plugins = {
}

const Components = {
	...componens,
	vueWaterfallEasy,
	Select,
	Option,
	Button,
	Modal,
	Tag,
	Input,
	Icon,
	Menu,
	Card,
	RadioGroup,
	FormItem,
	Form,
	Radio,
	Affix,
	BackTop,
	Avatar,
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
