/**
 * 录音时长的重新计算
 * @param {Number} callTime  传入的毫秒数
 * @return {String} 分秒运算以后的集合
 */
export default function(callTime) {
  let needConvert = callTime && callTime != 'null'
  if (!needConvert) {
    needConvert = '-'
  } else {
    let times = parseInt(parseFloat(callTime) / 1000, 10)
    let minute, second
    minute = parseInt(times / 60, 10)
    second = times % 60
    minute = minute ? minute + '分' : ''
    second = second ? second + '秒' : ''
    needConvert = minute + second
  }
  return needConvert
}
