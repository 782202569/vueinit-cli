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
  'POST /qualityInspectionSystem/qualityReport/totalData.do': (req, res, next) => {
    return Mock.mock({
      flag: '@boolean',
      Data: {
        insertEsTotalCount: '@integer(0, 11)',
        insertEsChain: '@word(2, 4)',
        firstQaTotalCount: '@integer(0, 1)',
        firstQaTotalCountChain: '@word(2, 4)',
        secondQaTotalCount: '@integer(0, 0)',
        secondQaTotalCountChain: '@word(2, 4)',
        overdueTotalCount: '@integer(0, 0)',
        insertEschainType: '@integer(0, 2)',
        firstQachainType: '@integer(0, 2)',
        secondQachainType: '@integer(0, 2)',
        overDuechainType: '@integer(0, 2)',
        overdueTotalCountChain: '@word(2, 4)',
        qaQualityReportResults: null,
      },
    })
  },
}
