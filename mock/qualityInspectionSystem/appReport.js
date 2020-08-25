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
  'POST /qualityInspectionSystem/appReport/getQABeAppedRate.do': (req, res, next) => {
    return Mock.mock({
      Data: [],
    })
  },
  'POST /qualityInspectionSystem/appReport/getQAAppealRateData.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          apType: '@integer(0, 2)',
          name: '@cword(2, 4)',
          value: '@integer(0, 0)',
        },
      ],
    })
  },
}
