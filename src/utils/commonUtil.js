import cache from './cache.js'
let commonUtil = {
  createUrl(_baseUrl, params) {
    let baseUrl = _baseUrl
    if (!baseUrl.endsWith('?')) {
      baseUrl += '?'
    }
    let arr = []
    for (let prop in params) {
      if (params.hasOwnProperty(prop)) {
        let str = prop + '='
        let val = params[prop]
        if (val !== undefined || val !== null) {
          str += val
        }
        arr.push(str)
      }
    }
    return baseUrl + arr.join('&')
  },
  doExport(action, params) {
    let form = document.createElement('form')
    form.method = 'post'
    form.target = '_blank'
    for (let key in params) {
      let input = document.createElement('input')
      input.name = key
      input.value = params[key]
      form.appendChild(input)
    }
    let tagInput = document.createElement('input')
    tagInput.name = 'accessToken'
    tagInput.value = cache.getItem('tgt_id')
    form.appendChild(tagInput)

    // let tagInput1 = document.createElement('input')
    // tagInput1.name = 'prefer-service-zone'
    // tagInput1.value = 'xjrtest'
    // form.appendChild(tagInput1)

    form.action = action
    document.querySelector('body').appendChild(form)
    form.submit()
    document.querySelector('body').removeChild(form)
  },
  isBlank(val) {
    return val === null || val === undefined || val.toString().trim() === ''
  },
  isNotBlank(val) {
    return !this.isBlank(val)
  },
  // 将ss转化为HH:MM:SS的形式
  formateTime(seconds) {
    let ss = parseInt(seconds) // 秒
    let mm = 0 // 分
    let hh = 0 // 小时
    if (ss > 60) {
      mm = parseInt(ss / 60)
      ss = parseInt(ss % 60)
    }
    if (mm > 60) {
      hh = parseInt(mm / 60)
      mm = parseInt(mm % 60)
    }
    let result = ('00' + parseInt(ss)).slice(-2)
    if (mm > 0) {
      result = ('00' + parseInt(mm)).slice(-2) + ':' + result
    } else {
      result = '00:' + result
    }
    if (hh > 0) {
      result = ('00' + parseInt(hh)).slice(-2) + ':' + result
    }
    return result
  },
}

export default commonUtil
