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
  'POST /qualityInspectionSystem/averageScore/getAverageScore.do': (req, res, next) => {
    return Mock.mock({ array: [] }).array
  },
}
