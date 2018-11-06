import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    token: null,  // 用户身份认证
    historyUrl: null  // 登录超时返回登出前所在页面
  },
  mutations: {
    resetToken(state) {
      state.token = null
    },
    setHistoryUrl(state, url) {
      state.historyUrl = url
    }
  },
  getters: {
    token(state) {
      if (!state.token) return localStorage.getItem('token')
      else return state.token
    }
  }
})

export default store
