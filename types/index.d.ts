import Vue from 'vue'
import { platformStore } from './vue'
import { AxiosInstance } from 'axios'
import lodashThrottle from '../src/utils/lodashThrottle'

// 注释掉 node_modules/vuex/types/index.d.ts 中的   import './vue'
declare module 'vue/types/vue' {
  interface Vue {
    $store: platformStore
    axios: AxiosInstance
    lodashThrottle: typeof lodashThrottle
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store?: platformStore
  }
}
