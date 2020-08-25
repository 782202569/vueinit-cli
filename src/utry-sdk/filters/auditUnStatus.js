// 审核状态
export default function(type) {
  let unStatus = {
    '0': '未审核',
    '1': '审核中',
    '2': '审核通过',
    '3': '审核不通过',
  }

  return unStatus[type] ? unStatus[type] : ''
}
