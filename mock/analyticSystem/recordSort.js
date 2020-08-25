/* eslint-disable */
// http://mockjs.com/examples.html
import Mock from 'mockjs' //
//

export const delay = 0
export const disabled = true
export const locate = true //
//

export default {
  //
  'GET /analyticSystem/recordSort/trees': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      'data|5-10': [
        {
          sortID: '@guid',
          sortName: '@ctitle(5, 10)',
        },
      ],
    })
  },
  'GET /analyticSystem/recordSort/:uuid/records': (req, res, next) => {
    return Mock.mock({
      message: '@word(2, 4)',
      results: [],
      result: null,
      state: '@word(2, 4)',
      count: '@integer(0, 0)',
      other: { keywords: [] },
      success: '@boolean',
    })
  },
}
