import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import home from '@/pages/home/home'
import equipments from '@/pages/equipment-management/equipments'

import {getCookie} from '../assets/js/cookie.js'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/apparatus_web/',
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:login,
      meta:{
        needLogin:false
      }
    },
    {
      path:'/home',
      component:home,
      meta:{
        requireAuth: true,
        needLogin:true
      }
    },
    {
      path:'/equipments',
      component:equipments,
      meta:{
        requireAuth: true,
        needLogin:true
      }
    },
  ],

});
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (getCookie('token') && (getCookie('token') != 'undefined')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});
export default router
