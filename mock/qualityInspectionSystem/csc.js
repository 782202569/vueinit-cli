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
  'POST /qualityInspectionSystem/csc/isQa.do': (req, res, next) => {
    return Mock.mock('@boolean')
  },
  'POST /qualityInspectionSystem/csc/getAllAlign.do': (req, res, next) => {
    return Mock.mock({ Data: [], Count: '@integer(0, 0)' })
  },
}
