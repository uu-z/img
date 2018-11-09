import Vue from 'vue'
import Router from 'vue-router'
import ga from 'vue-ga';

Vue.use(Router)

const router =  new Router({
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

ga(router, 'UA-128746837-2');

export default router