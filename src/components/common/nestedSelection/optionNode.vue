<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
export default {
  name: 'OptionNode',
  data() {
    return {
      expanded: true,
    }
  },

  components: {
    CollapseTransition,
  },
  props: {
    node: {
      type: Object,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  render(h) {
    const { node, level, expanded } = this

    return (
      <div>
        <el-option label={node.name} value={node.id}>
          <span
            style={`display:inline-block; padding-left: ${level * 0.5}em`}
            onClick={(e) => {
              e.stopPropagation()
              this.expanded = !this.expanded
            }}
          >
            {
              <i
                class={[
                  'el-icon-caret-right',
                  'el-tree-node__expand-icon',
                  'padding-one',
                  node._isLeaf && 'hidden',
                  expanded && 'rotated',
                ].join(' ')}
              ></i>
            }
          </span>
          <span>{node.name}</span>
        </el-option>

        <el-collapse-transition>
          {expanded && (
            <div>
              {node.children.map((child) => (
                <OptionNode level={level + 1} node={child} />
              ))}
            </div>
          )}
        </el-collapse-transition>
      </div>
    )
  },
}
// el-collapse-transition 用不了？
</script>
<style scoped>
.rotated {
  transform: rotate(90deg);
  transition-duration: 0.2;
}
.padding-one {
  padding-right: 0.5em;
}
.hidden {
  visibility: hidden;
}
</style>
