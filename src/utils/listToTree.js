let _toString = Object.prototype.toString

function isObject(obj) {
  return obj && _toString.call(obj) === '[object Object]'
}

function isArray(obj) {
  return Array.isArray ? Array.isArray(obj) : _toString.call(obj) === '[object Array]'
}

let listToTree = {
  /*
   * 将列表转换成树结构。
   * 有第三个参数（节点映射）时，新传入的list会自动整合进原来的节点中。
   * 返回的始终为树的根节点列表（包含无法引用到父节点的节点）。
   * 其中每一个节点都有子节点属性（可能为空数组）。
   * @param list
   * @param opts 字段映射配置对象。
   * @return [Array] 根节点列表。
   */
  listToTree(list, opts) {
    let tree = []
    let isObj = isObject
    isObj(opts) || (opts = {})
    if (isArray(list) && opts) {
      let i = 0
      let length = list.length
      let pid = opts.pidField || 'pid'
      while (i < length) {
        let nodeMap = {}
        let node
        if (isObj((node = list[i++]))) {
          // 提取没有根节点的数据
          if (node[pid] === null || node[pid] === '') {
            for (let p in node) {
              // 属性为方法
              if (typeof node[p] == 'function') {
              } else {
                // p 为属性名称，obj[p]为对应属性的值
                nodeMap[p] = node[p]
              }
            }
            nodeMap['children'] = this.getChildNode(list, node, opts)
            tree.push(nodeMap)
          }
        }
      }
    } else {
    }
    return tree
  },
  getChildNode(list, parentNode, opts) {
    let childs = []
    let _this = this
    list.forEach(function(element) {
      let childMap = {}
      for (let p in element) {
        // 属性为方法
        if (typeof element[p] == 'function') {
        } else {
          // p 为属性名称，obj[p]为对应属性的值
          childMap[p] = element[p]
        }
      }
      if (
        element[opts.pidField] != null &&
        element[opts.pidField] !== '' &&
        element[opts.pidField] === parentNode[opts.idField]
      ) {
        childMap['children'] = _this.getChildNode(list, element, opts)
        childs.push(childMap)
      }
    })
    return childs
  },
}
export default listToTree
