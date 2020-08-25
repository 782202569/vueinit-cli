// 时间戳转日期格式
export default function(val) {
  val = parseInt(val)
  let date = new Date(val)
  let Y = date.getFullYear() + '-'
  let M =
    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()

  return Y + M + D + h + m + s
}
