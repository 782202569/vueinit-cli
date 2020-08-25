import Vue from 'vue'
import * as filters from '@/utry-sdk/filters'
import * as utryComponent from '@/utry-sdk/components'

/**
 * 注册vue业务组件/过滤器/指令
 * @param {string} type - 要注册的vue类型
 * @param {object} sets - 要注册的组件选项，键/值对
 */
function register(type, sets) {
  Object.entries(sets).forEach(([key, value]) => {
    if (/^mixin$|^use$/.test(type)) {
      Vue[type](value)
    } else {
      Vue[type](key, value)
    }
  })
}
// 注册vue插件
// register('use', plugins)
// 注册通用组件
register('component', utryComponent)
// 注册通用过滤器
register('filter', filters)
// 注册通用指令
// register('directive', directives)
// 注册通用混入
// register('mixin', mixins)
