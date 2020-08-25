<template>
  <div id="app" style="height:100%;">
    <router-view></router-view>
  </div>
</template>

<script>
import $ from 'jquery'
import global from './global'
if (process.env.NODE_ENV === 'production') {
  // 导出jQuery，防止有遗漏的没有手动导入的组件存在而产生错误
  // 后面都梳理完毕后要删掉
  window.$ = $
  window.jQuery = $
  window.global = global
}

export default {
  name: 'app',
}
</script>
<style lang="less">
// ui主题
@import '~element-ui/lib/theme-chalk/index.css';
// 字体图标样式
@import 'assets/fonts/iconfont.css';
// 遗留的基础样式（待整理并清理）
@import 'assets/css/base.css';
// 项目公共样式
@import 'assets/css/common.less';
</style>
