import axios from 'axios'
import store from '@/store/index.js'
import global from '@/global.js'
import Vue from 'vue'
import Cookie from 'vue-cookie'


let vueInstance = new Vue()

let instance = axios.create({
  timeout: 1000000,
  baseURL: global.baseUrl,
  headers: {
    // 'Content-Type': 'application/json; charset=UTF-8',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
    'prefer-service-zone': '',
  },
})

instance.interceptors.request.use(
  (config) => {
    // console.info(store.state.token)
    if (store.state.token) {
      config.headers.accessToken = store.state.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // vueInstance.$message.destroy()
    console.log(error.message)
    if (isNotLogin(error.response.data)) {
      store.commit('setToken', '')
      Cookie.delete('userNameHead')
      window.utryVue.$router.replace('/login')
    } else if (isError(error.response.data)) {
      vueInstance.$message.error(error.response.data.message)
    } else {
      vueInstance.$message.error('请求失败')
    }
    return Promise.reject(error)
  }
)

function isError(data) {
  let code = data.code
  return code == '500'
}

function isNotLogin(data) {
  let code = data.code
  return code == '401'
}

export default instance
