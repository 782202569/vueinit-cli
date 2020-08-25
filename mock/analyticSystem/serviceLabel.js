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
  'POST /analyticSystem/serviceLabel/getAllIvsCustomerLabel.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          labelConfigId: '@guid',
          labelName: '@ctitle(5, 10)',
          talkTimeMax: null,
          talkTimeMin: null,
          incomingCountMax: null,
          incomingCountMin: null,
          callTurnRatioMax: null,
          callTurnRatioMin: null,
          longDurationCallMax: null,
          longDurationCallMin: null,
          createUser: null,
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          labelStatus: '@word(2, 4)',
          keyword: '@cword(2, 4)',
          role: '@word(2, 4)',
          filterCount: '@integer(0, 2)',
          linkRelativeRatio: null,
          executeTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          configIds: null,
        },
      ],
      Count: '@integer(0, 1)',
    })
  },
}
