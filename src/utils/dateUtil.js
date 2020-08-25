let dateUtil = {
  timeToString() {
    let result = ''
    let arg = arguments[0]
    if (arg) {
      let date = null
      if (arg instanceof Date) {
        date = arg
      }
      if (typeof arg === 'number') {
        date = new Date(arg)
      }
      if (typeof arg === 'string') {
        let num = parseInt(arg)
        if (!isNaN(num)) {
          date = new Date(num)
        }
      }
      if (date !== null) {
        result += date.getFullYear()
        result += '-'
        let m = date.getMonth() + 1
        if (m < 10) {
          m = '0' + m
        }
        result += m
        result += '-'
        let d = date.getDate()
        if (d < 10) {
          d = '0' + d
        }
        result += d
        result += ' '
        let h = date.getHours()

        if (h < 10) {
          h = '0' + h
        }
        result += h
        result += ':'

        let f = date.getMinutes()
        if (f < 10) {
          f = '0' + f
        }
        result += f
        result += ':'
        let s = date.getSeconds()
        if (s < 10) {
          s = '0' + s
        }
        result += s
      }
    }
    return result
  },
  getPreDay(_date, day) {
    let date = _date
    if (typeof date === 'number') {
      date = new Date(date)
    }
    if (typeof date === 'string') {
      date = new Date(parseInt(date))
    }

    let nowDay = date.getDate() + day
    date.setDate(nowDay)
    return date
  },
}

export default dateUtil
