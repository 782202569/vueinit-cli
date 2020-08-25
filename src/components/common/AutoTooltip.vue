<template>
  <el-tooltip
    v-if="isTooltip"
    v-model="tooltipVisible"
    v-bind="$attrs"
    v-on="$listeners"
    :effect="effect"
  >
    <span class="wrapper">
      <slot />
    </span>

    <slot name="content" slot="content">
      <pre style="max-height: 500px; overflow-y:auto">{{
        content.toString().trim()
      }}</pre>
    </slot>
  </el-tooltip>
  <span class="wrapper" v-else><slot></slot></span>
</template>

<script>
export default {
  name: 'AutoTooltip',

  inheritAttrs: false,

  mounted() {
    const el = this.$el
    // console.log(el.scrollWidth, el.clientWidth)
    this.isTooltip = el.scrollWidth > el.clientWidth
  },
  props: {
    wrap: {
      type: Boolean,
      default: false,
    },

    content: {
      type: null,
      default: '',
    },

    effect: {
      type: String,
      default: 'light',
    },
  },

  data() {
    return {
      isTooltip: false,
      tooltipVisible: false,
    }
  },

  computed: {},
  methods: {
    handleHoverIn() {
      const el = this.$el
      this.tooltipVisible = el.scrollWidth > el.clientWidth
    },

    handleHoverOut() {
      this.tooltipVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-wrap: none;
  word-break: keep-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
