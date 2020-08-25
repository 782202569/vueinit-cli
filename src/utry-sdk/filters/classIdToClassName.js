/**
 * 递归找寻className的值，发现children下的值
 * @param {String} classId 所属分类的id
 * @param {Array} treeList 所属分类的树
 * @return {Object} 整个所属分类的树状
 */
function findClassName(classId, treeList) {
  if (Array.isArray(treeList) && treeList.length) {
    for (const node of treeList) {
      const { recordLabelClassId: id, children } = node
      const matched = id === classId ? node : findClassName(classId, children)
      if (matched) {
        return matched
      }
    }
  }
  return null
}

/**
 * 根据所属分类id生成所属分类的名称
 * @param {String} classId 所属分类的id
 * @param {Array} treeList 所属分类的树
 * @return {String} 所属分类名称
 */
export default function(classId, treeList) {
  const item = findClassName(classId, treeList)
  const className = item ? item.recordLabelClassName : ''
  return className || '-'
}
