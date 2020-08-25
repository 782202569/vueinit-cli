/* eslint-disable */

// http://mockjs.com/examples.html
import Mock from 'mockjs'

//
//
export const delay = 0
export const disabled = true
export const locate = true
//
//
export default {
  //
  'GET /analyticSystem/hotAnlys/type/keyword': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      data: {
        '0': '@cword(2, 4)',
        '1': '@cword(2, 4)',
        '2': '@cword(2, 4)',
      },
    })
  },
}
