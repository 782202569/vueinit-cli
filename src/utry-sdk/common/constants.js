/**
 * 价格正则匹配
 * ***********************************
 * 只能输入数字，整数，最多保留2位小数点
 * ***********************************
 */
// export const PRICE_REG = /^\d+(\.\d{1,2})?$/
export const PRICE_REG = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

/**
 * 正整数正则匹配
 * ***********************************
 * 只能输入数字，整数
 * ***********************************
 */
export const NUMBER_REG = /(^[1-9]([0-9]+)?$)|(^(0){1}$)/

/**
 * 检查空格验证,暂定是不能超过10个字符
 * @param {Object} rule 验证的一些属性，如：message
 * @param {String} value 要验证的值
 * @param {Function} callback 回调（潜规则，第一个参数为错误信息）
 * @return {Any} 无
 */
export const validModelTrim = (rule, value, callback) => {
  if (value.indexOf(' ') >= 0) {
    console.log('1111')
    callback(new Error('不能输入空格'))
  } else if (value.trim().length > 10) {
    callback(new Error('不能超过10个字符'))
  } else if (value === '' || value === null) {
    callback(new Error('请输入名称'))
  } else {
    callback()
  }
}
