import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'danboru',
      component: require('@/views/danboru').default
    },
    {
      path: '/pixiv',
      name: 'pixiv',
      component: require('@/views/pixiv').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})