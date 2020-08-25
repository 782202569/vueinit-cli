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
  'POST /qualityInspectionSystem/ipd/queryIndexData.do': (req, res, next) => {
    return Mock.mock({
      waitCheck: '@integer(0, 22)',
      waitTask: '@integer(0, 0)',
      waitScore: '@integer(0, 0)',
    })
  },
  'POST /qualityInspectionSystem/ipd/findIndexDataByTimeSolt.do': (req, res, next) => {
    return Mock.mock({
      'ScoreRate|5-10': [
        {
          qaCount: null,
          qaUser: null,
          status: null,
          assignDate: null,
          startAssignDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          endAssignDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          scoreMin: '@integer(0, 100)',
          scoreMax: '@integer(0, 101)',
          description: '@ctitle(5, 10)',
          sum: '@integer(0, 0)',
        },
      ],
      taskRate: {},
    })
  },
}
