<template>
  <span>
    <a v-if="buttonType === 'anchor'" :class="buttonClass" @click="submit">
      <slot>导出</slot>
    </a>
    <el-button
      v-else
      :class="buttonClass"
      :loading="loading"
      @click="submit"
      :size="buttonSize"
      :disabled="disabled"
    >
      <slot>导出</slot>
    </el-button>
    <div style="display:none;">
      <form
        enctype="application/x-www-form-urlencoded"
        style="display:none"
        ref="$form"
        :method="method"
        :action="action"
        :target="targetId"
      >
        <input
          type="hidden"
          :key="name"
          v-for="(value, name) in fields"
          :name="name"
          :value="value"
        />
      </form>
      <iframe
        ref="$frame"
        width="0"
        height="0"
        frameborder="0"
        :id="targetId"
        :name="targetId"
      ></iframe>
    </div>
  </span>
</template>

<script>
/**
 * 导出文件
 */
export default {
  name: 'ExportFile',

  props: {
    /**
     * 接口请求方法
     */
    method: {
      type: String,
      default: 'GET',
    },

    /**
     * 接口地址
     */
    action: {
      type: String,
      default: '',
    },

    /**
     * 参数
     */
    params: {
      type: Object,
      default: () => ({}),
    },

    /**
     * 按钮文本
     */
    buttonText: {
      type: String,
      default: '导出',
    },

    /**
     * 按钮类型
     * - button 默认，普通按钮
     * - anchor a标签
     */
    buttonType: {
      type: String,
      default: 'button',
    },

    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * 导出按钮的自定义样式名
     */
    buttonClass: {
      type: String,
      default: '',
    },

    /**
     * 导出按钮大小
     */
    buttonSize: {
      type: String,
      default: 'mini',
    },

    /**
     * 提交前触发
     */
    'before-submit': {
      type: Function,
      default: null,
    },

    /**
     * 提交后触发
     */
    'after-submit': {
      type: Function,
      default: null,
    },

    /**
     * 请求完成时触发
     */
    complete: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      // 提交窗口的ID
      targetId: `x${Math.floor(Math.random() * 10e8)}`,
      // 是否正在加载中
      loading: false,
    }
  },

  computed: {
    fields() {
      const params = this.params
      const fields = {}
      if (params && typeof params === 'object') {
        Object.keys(params).reduce((data, name) => {
          data[name] = params[name]
          return data
        }, fields)
      }
      return fields
    },
  },

  destroyed() {
    clearInterval(this.timer)
  },

  mounted() {
    try {
      const doc = this.getFrameDocument()
      doc.open()
      doc.write(`<html><script>document.domain="${document.domain}"</` + 'script></html>')
      doc.close()
    } catch (e) {}
  },

  methods: {
    submit() {
      const { disabled, action } = this
      if (disabled || !action) {
        if (!action) {
          console.error('请设置请求地址')
        }
        return
      }
      this.$emit('before-submit')
      this.loading = true
      this.$refs.$form.submit()
      this.checkReadyState()
      this.$emit('after-submit')
    },

    checkReadyState() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        try {
          const doc = this.getFrameDocument()
          const state = doc.readyState
          if (state === 'complete' || state === 'interactive') {
            clearInterval(this.timer)
            this.onTargetLoad()
          }
        } catch (e) {
          console.error(e)
          clearInterval(this.timer)
          this.onTargetLoad()
        }
      }, 1000)
    },

    getFrameDocument() {
      const frame = this.$refs.$frame
      return frame.contentDocument || frame.contentWindow.document
    },

    onTargetLoad() {
      if (this.loading) {
        this.loading = false
        this.$emit('complete')
      }
    },
  },
}
</script>
