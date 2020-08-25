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
  'POST /qualityInspectionSystem/reportForm/qaUserUnFinish.do': (req, res, next) => {
    return Mock.mock({
      'list|5-10': [
        {
          qaUserName: '@ctitle(5, 10)',
          qaUserNameNo: '@word(2, 4)',
          finish: '@integer(0, 0)',
          unFinish: '@integer(0, 0)',
          avgTime: '@integer(0, 0)',
          totcalTime: '@integer(0, 0)',
        },
      ],
    })
  },
  'POST /qualityInspectionSystem/reportForm/qaUserFinish.do': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [
        {
          date: '@word(2, 4)',
          totalAvgTime: '@integer(0, 0)',
          'list|5-10': [
            {
              qaUserName: '@ctitle(5, 10)',
              qaUserNameNo: '@word(2, 4)',
              finish: '@integer(0, 0)',
              unFinish: '@integer(0, 0)',
              avgTime: '@integer(0, 0)',
              totcalTime: '@integer(0, 0)',
            },
          ],
          totalCount: '@integer(0, 0)',
        },
      ],
    }).array
  },
}
