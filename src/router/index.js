import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
Vue.use(Router)

// 登录页
const login = (resolve) => {
  import('@/page/login/login.vue').then((module) => {
    resolve(module)
  })
}
// 首页
const index = (resolve) => {
  import('@/page/index/index.vue').then((module) => {
    resolve(module)
  })
}

const test = (resolve) => {
  import('@/page/test/test.vue').then((module) => {
    resolve(module)
  })
}

const router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// router.beforeEach((to, from, next) => {
//   store.commit('setHistoryUrl', to.fullPath)
//   if (to.meta.requireAuth) {
//     if (store.state.token) {
//       next()
//     } else {
//       store.commit('resetToken')
//       next({
//         path: '/',
//         query: {redirect: store.state.historyUrl}
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
