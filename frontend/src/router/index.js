import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Tags from '@/components/Tags'
import Tutorials from '@/components/Tutorials'
import Videos from '@/components/Videos'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import CreateUser from '@/components/CreateUser'
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
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/videos/:tag/:tutorial',
      name: 'videos',
      component: Videos
    },
    {
      path: '/tutorials/:tag',
      name: 'tutorials',
      component: Tutorials
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags
    },
    {
      path: '/users/create',
      name: 'createUser',
      component: CreateUser
    },
    {
      path: '/users',
      name: 'users',
      component: Users
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
