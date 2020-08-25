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
  'POST /gateway/login': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 1)',
      message: '@ctitle(5, 10)',
      data: null,
    })
  },
}
