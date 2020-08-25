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
  'POST /analyticSystem/rvp/queryProjects.do': (req, res, next) => {
    return Mock.mock({
      message: '@word(2, 4)',
      results: [],
      result: null,
      state: '@word(2, 4)',
      count: '@integer(0, 0)',
      other: null,
      success: '@boolean',
    })
  },
}
