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
  'POST /analyticSystem/crossAnalysis/statistical.do': (req, res, next) => {
    return Mock.mock({
      map: null,
      mainLatitudeCode: [],
      mainLatitudeValue: [],
      minorLatitudeCode: null,
      minorLatitudeValue: null,
      mainLatitudeValues: [],
      minorLatitudeValues: [],
    })
  },
  'POST /analyticSystem/crossAnalysis/statisticalThree.do': (req, res, next) => {
    return Mock.mock({
      lineName: [],
      'abscissa|5-10': ['@word(2, 4)'],
      values: [],
      data: { 'X|5-10': ['@word(2, 4)'], XName: [], Y: [] },
    })
  },
}
