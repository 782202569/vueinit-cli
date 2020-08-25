// 支付状态
export default function(type) {
  let unStatus = {
    '1': '未确认',
    '2': '已完成',
    '3': '取消',
  }

  return unStatus[type]
}
