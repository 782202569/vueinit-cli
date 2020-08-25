// 过滤请求地址
export const filterRequestURL = function(url, data) {
  if (url && data && typeof url === 'string' && typeof data === 'object') {
    return url.replace(/(.?){\s*(.*?)\s*(\\|)}/g, (input, g1, g2, g3) => {
      if (g1 === '\\' || g3 === '\\') {
        // 反斜杠转义，不做处理
        return g1 === '\\' ? input.substr(1) : input
      }
      if (!g2) {
        // 没有变量名
        return g1
      }
      let str = data[g2]
      if (str === undefined) {
        str = ''
      }
      return `${g1}${str}`
    })
  }
  return url
}

export default {
  filterRequestURL,
}
