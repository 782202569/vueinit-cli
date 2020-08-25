/**
 * 去样本范围的重复
 * @param {Array} list 样本范围列表
 * @return {String} 根据样本值合并最后计算结果
 */
function repeatList(list) {
  let lastList = []
  let listArray = JSON.parse(JSON.stringify(list))
  let str = ''
  listArray.forEach((val, i) => {
    let obj = val
    listArray.forEach((val2) => {
      if (obj.key === val2.key) {
        obj = Object.assign(obj, val2)
      }
    })
    // 锁定数据
    if (!listArray[i].db) {
      lastList.push(obj)
    }
    // 锁定数据，不再加入push值，
    listArray[i].db = true
  })
  lastList.forEach((val) => {
    str = `${str}${val.key}:${val.min || '0'} - ${val.max || '0'} /`
  })
  return str || '全部录音'
}
/**
 * 合并样本范围字段数据
 * @param {Array} sample 样本范围列表
 * @return {String} 根据样本值合并最后计算结果
 */
export default function(sample) {
  let str = '全部录音'
  let sampleArray = []
  if (sample) {
    let sampleList = JSON.parse(JSON.stringify(sample))
    sampleList.forEach((val) => {
      let strKey = val.key
      if (val.key.indexOf('最大') >= 0) {
        val['max'] = val.value
      } else {
        val['min'] = val.value
      }
      val.key = strKey.replace('最大', '').replace('最小', '')
      console.log(val)
      sampleArray.push({
        ...val,
      })
    })
    str = repeatList(sampleArray)
  }
  return str
}
