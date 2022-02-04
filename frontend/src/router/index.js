import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Tuts from '@/components/Tuts'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tuts',
      name: 'tuts',
      component: Tuts
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    if (store.getters['user/isLoggedIn']) {
      next('/tuts')
    }
  } else {
    if (!store.getters['user/isLoggedIn']) {
      next('/login')
    }
  }
  next()
})

export default router
