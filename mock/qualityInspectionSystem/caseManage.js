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
  'POST /qualityInspectionSystem/caseManage/queryCaseDetail.do': (req, res, next) => {
    return Mock.mock({
      Data: [],
      Count: '@integer(0, 2)',
    })
  },
  'POST /qualityInspectionSystem/caseManage/showClassName.do': (req, res, next) => {
    return Mock.mock({ data: [] })
  },
}
