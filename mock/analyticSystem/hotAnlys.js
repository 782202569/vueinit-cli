/* eslint-disable */
// http://mockjs.com/examples.html
import Mock from 'mockjs' //
//

export const delay = 0
export const disabled = false
export const locate = true //
//

export default {
  //
  'POST /analyticSystem/hotAnlys/getTrendData.do': (req, res, next) => {
    return Mock.mock({
      trendData: [],
      'dateList|5-10': ['@word(2, 4)'],
    })
  },
  'GET /analyticSystem/hotAnlys/:uuid/0/categoryWord': (req, res, next) => {
    return Mock.mock({
      code: '@word(2, 4)',
      message: '@guid',
      data: '@word(2, 4)',
    })
  },
}
