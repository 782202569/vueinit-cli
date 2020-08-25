// 支付方式
export default function(type) {
  let unStatus = {
    '1': '支付宝',
    '2': '微信',
    '3': '余额支付',
    '4': '微信扫码支付',
  }

  return unStatus[type]
}
