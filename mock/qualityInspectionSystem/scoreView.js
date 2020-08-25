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
  'POST /qualityInspectionSystem/scoreView/getLocus.do': (req, res, next) => {
    return Mock.mock({
      'locus|5-10': [
        {
          orderNum: '@integer(0, 1)',
          stepName: '@cword(2, 4)',
          score: '@integer(0, 11)',
          scoreDate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          nowScore: '@integer(0, 0)',
          qaUser: null,
        },
      ],
    })
  },
}
