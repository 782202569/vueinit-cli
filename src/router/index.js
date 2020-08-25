import Vue from 'vue'
import Router from 'vue-router'
import funcFilter from '@/utils/funcFilter.js'
import Cookie from 'vue-cookie'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: (resolve) => require(['../components/common/Login.vue'], resolve),
  },
  {
    name: 'home页面',
    path: '/home',
    meta: { checkPermission: false },
    component: (resolve) => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: '首页',
        path: '/homepage', // 首页界面
        meta: { checkPermission: false },
        component: (resolve) =>
          require(['../components/page/home/HomePage.vue'], resolve),
      },
    ],
  },
]

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 判断该路由是否需要登录权限
    next()
  } else {
    if (
      localStorage.getItem('tgt_id') &&
      ((to.meta.checkPermission &&
        localStorage.getItem('sliderMenu').indexOf(to.path.replace('/', '')) > -1) ||
        !to.meta.checkPermission) &&
      Cookie.get('userNameHead')
    ) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
})
// 解决刷新过滤按钮问题
router.afterEach((to, from, next) => {
  if (to.path == localStorage.getItem('routerPath')) {
    let menuId = localStorage.getItem('menuId')
    let path = to.path.replace('/', '')
    funcFilter(menuId, path)
  }
})
//funcFilter(localStorage.getItem('menuId'), localStorage.getItem('routerPath').replace('/', ''))
export default router
