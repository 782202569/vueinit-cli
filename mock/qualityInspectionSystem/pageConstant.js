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
  'POST /qualityInspectionSystem/pageConstant/getValue.do': (req, res, next) => {
    return Mock.mock({
      'seatGroup|5-10': [
        {
          pdptid: null,
          name: '@cword(2, 4)',
          id: '@id',
        },
      ],
    })
  },
  'POST /qualityInspectionSystem/pageConstant/getRoleIdByCode.do': (req, res, next) => {
    return Mock.mock({
      qa: 'hr-13003',
      seatman: '90a7c14e0f3f11e9b143000c291dd76f',
      qa_suvs: '8cc0ea2c0f3f11e9b143000c291dd76f',
      headman: '93a7e1f00f3f11e9b143000c291dd76f',
    })
  },
}
