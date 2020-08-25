const build = (arr, parentKeyName = 'pdptid') => {
  const roots = arr.filter((item) => !item[parentKeyName])
  roots.map((root) => __build(arr, parentKeyName, root))

  if (roots.lengths === 0) {
    return arr
  }

  return roots
}

const __build = (arr, parentKeyName, root) => {
  const children = arr.filter((node) => node[parentKeyName] === root.id)
  if (children.length === 0) {
    Object.defineProperty(root, '_isLeaf', { value: true })
  } else {
    children.map((child) => __build(arr, parentKeyName, child))
  }

  root.children = children
}

export default build
