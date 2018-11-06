/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import {MapAPI} from '@/config/maps/scripts/arcgis.API'
import {SCMap} from '@/config/maps/scripts/oneMap'
import esriLoader from 'esri-loader'
import iView from 'iview'
import './assets/css/index.css'
import 'iview/dist/styles/iview.css'
import vuePlugin from '@/config/plugins/vuePlugin.js'
Vue.config.productionTip = false
Vue.use(store)
Vue.use(iView)
Vue.use(vuePlugin)
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  store,
  router,
  created() {},
  methods: {},
  template: '<App/>',
  components: {
    App
  }
})

esriLoader.loadScript({
  url: 'http://58.210.204.106:10031/1199/arcgisapi/map324/jsapi/index.js',
  dojoConfig: {
    async: true,
    paths: {
      plugins: window.webSiteRootUrl + '/#/src/config/maps/plugins'
    }
  }
})
esriLoader.loadCss('http://58.210.204.106:10031/1199/arcgisapi/map324/jsapi/3.24/esri/css/esri.css')

axios.defaults.timeout = 30000
axios.defaults.baseURL = 'http://192.168.252.119:8085/shencai-cm-web/service/'
axios.interceptors.request.use(config => {
  if (store.state.token) {
    if (config.data !== null && typeof config.data === 'object') {
      config.headers.Authorization = store.state.token
    } else {
      config.data += '&ticket=testTicket'
    }
  } else {
    iView.Message.error('请输入正确密码')
  }
  console.log(config)
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  // if (response.data.status === '900' && store.state.token) {
  //   iView.Modal.warning({
  //     title: '用户信息异常',
  //     content: '登录超时，请重新登录',
  //     onOk: () => {
  //       store.commit('resetToken')
  //       router.replace({
  //         path: '/',
  //         query: {redirect: store.state.historyUrl}
  //       })
  //     }
  //   })
  // } else if (response.data.status === '900' && store.state.token === null) {
  //   iView.Message.error('请输入正确密码')
  // }
  return response
}, error => {
  let status = error.response.status
  switch (status) {
    case 300:
      console.log('300错误')
      break
    case 400:
      console.log('400错误')
      break
    case 500:
      console.log('500错误')
      break
  }
  // 返回后给每个请求catch抓住针对错误做处理
  return Promise.reject(error)
})
