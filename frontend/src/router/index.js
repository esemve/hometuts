import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Tags from '@/components/Tags'
import Tutorials from '@/components/Tutorials'
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
      path: '/tags',
      name: 'tags',
      component: Tags
    },
    {
      path: '/tutorials/:tag',
      name: 'tutorials',
      component: Tutorials
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
      next('/tags')
    }
  } else {
    if (!store.getters['user/isLoggedIn']) {
      next('/login')
    }
  }
  next()
})

export default router
