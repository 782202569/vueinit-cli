<template>
  <div class="urty-tree">
    <div class="utry-tree-nomsg" v-if="!treeList.length">
      暂无数据
    </div>
    <div class="utry-tree-box" v-if="treeList.length">
      <treeList :treeData="treeList" :props="propsDefalut"></treeList>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import treeList from './treeList.vue'
// 不全局会报错，循环引用组件的时候，组件会比vue实例后创建
// 找不到组件，使得render函数出错，有好办法前先全局
Vue.component('treeList', treeList)

export default {
  name: 'utryTree',
  props: {
    treeData: {
      type: Array,
      default() {
        return []
      },
    },
    props: {
      type: Object,
    },
  },
  data() {
    return {
      treeList: [],
      propsDefalut: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
    }
  },
  watch: {
    /**
     * 监听传入的树数据
     */
    treeData() {
      // 判断是否是数组
      if (this.treeList instanceof Array) {
        this.treeList = JSON.parse(JSON.stringify(this.treeData))
      } else {
        console.error('treeData需要数组')
      }
    },
  },
  mounted() {
    this.handleProps()
  },
  methods: {
    /**
     * 重新赋值化tree的数据
     */
    handleProps() {
      this.propsDefalut = Object.assign(this.propsDefalut, this.props)
      console.log(this.propsDefalut, 11111)
    },
  },
}
</script>
<style lang="less">
.urty-tree {
  width: 100%;
  .utry-tree-nomsg {
    text-align: center;
    line-height: 30px;
  }
  // .utry-tree-box{
  //   .tree-list +.tree-list-header{
  //     background: red;
  //   }

  // }
}
</style>
