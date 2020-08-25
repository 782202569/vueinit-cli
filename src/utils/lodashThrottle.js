// 这玩意叫throttle？

// let lodashThrottle = {
//   throttle(method, context) {
//     clearTimeout(method.tId)
//     method.tId = setTimeout(function() {
//       method.call(context)
//     }, 150)
//   },
// }

const lodashThrottle = {
  throttle(method, context, ms = 300) {
    if (method.throttled) {
      return
    } else {
      method.call(context)
      method.throttled = true
      setTimeout(() => {
        method.throttled = false
      }, ms)
    }
  },
}
export default lodashThrottle
