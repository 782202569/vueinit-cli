<template>
  <div class="tree-list-box">
    <div class="tree-list" v-for="(item, index) in treeList" :key="item[value]">
      <p class="tree-list-header">
        <i
          v-if="item[children].length"
          :class="[
            'el-icon-caret-right',
            {
              active: childrenShow(item.childrenDb),
            },
          ]"
          @click="hanlderChildren(index)"
        ></i>
        {{ item[label] }}
      </p>
      <transition name="fade">
        <div
          class="tree-list-chindren"
          v-if="item[children].length && childrenShow(item.childrenDb)"
        >
          <treeList :treeData="item[children]" :props="props"></treeList>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'utryTreeList',
  props: {
    treeData: {
      type: Array,
      default() {
        return []
      },
    },
    props: {
      type: Object,
      default() {
        return {
          value: 'value',
          label: 'label',
          children: 'children',
        }
      },
    },
  },
  data() {
    return {
      treeList: this.treeData,
      value: this.props.value,
      label: this.props.label,
      children: this.props.children,
      show: true,
    }
  },
  methods: {
    /**
     * 显示子数据
     * @param {Number} i 需要显示位置的index
     */
    hanlderChildren(i) {
      this.treeList[i].childrenDb = !this.treeList[i].childrenDb
      this.$forceUpdate()
    },
    /**
     * 自定义传值判断是默认展开的一个挂载方法
     * @param {Boolean}} childrenDb 虚拟属性，是否显示子tree
     * @return {Boolean} 计算后所得
     */
    childrenShow(childrenDb) {
      return !childrenDb
    },
  },
  watch: {
    /**
     * 监听传入的树数据
     */
    treeData() {
      console.log(this.treeList, 'treedata')
      // 判断是否是数组
      if (this.treeList instanceof Array) {
        this.treeList = JSON.parse(JSON.stringify(this.treeData))
      } else {
        console.error('treeData子数据需要数组')
      }
    },
  },
}
</script>
<style lang="less">
.tree-list {
  padding-left: 10px;
  overflow: hidden;
}
.tree-list-header {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  background: #fff;
  position: relative;
  z-index: 22;
  .el-icon-caret-right {
    font-size: 14px;
    position: absolute;
    left: 3px;
    top: 0;
    line-height: 30px;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    transform: rotate(0);
  }
  .el-icon-caret-right.active {
    transform: rotate(90deg);
  }
}
.tree-list-chindren {
  overflow: hidden;
  z-index: 11;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
  transform: translate3d(0, 0, 0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(0, -100%, 0);
}
</style>
