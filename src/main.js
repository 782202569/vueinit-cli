import '@babel/polyfill'
import Vue from 'vue'
import './config'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import axios from '@/utils/http.js'
import global from './global.js'

import echarts from 'echarts'
import lodashThrottle from './utils/lodashThrottle.js'
import 'echarts/map/js/china.js'
axios.defaults.withCredentials = true
Vue.prototype.$echarts = echarts
Vue.prototype.axios = axios
Vue.prototype.lodashThrottle = lodashThrottle
Vue.prototype.GLOBAL = global

Vue.use(ElementUI, { zIndex: 4000 })
Vue.config.productionTip = false
Vue.prototype.mywindow = window
/* eslint-disable no-new */
window.utryVue = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')

router.afterEach((to, from) => {
  store.commit('setCurrentMenuName', { menuName: to.name })
})
