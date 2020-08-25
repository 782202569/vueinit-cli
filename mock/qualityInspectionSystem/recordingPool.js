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
  'POST /qualityInspectionSystem/recordingPool/getLabel.do': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [
        {
          name: '@cword(2, 4)',
          from: '@word(2, 4)',
          key: '@guid',
        },
      ],
    }).array
  },
  'POST /qualityInspectionSystem/recordingPool/getAllRecord.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          callId: '@word(2, 4)',
          labelContent: '@word(2, 4)',
          emotionLabel: '@word(2, 4)',
          dataState: '@cword(2, 4)',
          seatName: '@cword(2, 4)',
          wholeContent: '@cparagraph(1, 2)',
          callSTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          algLabelContent: '@word(2, 4)',
          keywordMark: '@csentence(11, 20)',
          callNo: '@word(2, 4)',
          isSampled: '@word(2, 4)',
          contentTime: '@word(2, 4)',
          autoSummary: '@cparagraph(1, 2)',
          personName: '@cword(2, 4)',
          organization: '@cword(2, 4)',
          seatGroup: '@cword(2, 4)',
          placeName: '@word(2, 4)',
          callTime: '@integer(0, 12174)',
        },
      ],
      Count: '@integer(0, 11)',
      'id|5-10': '@id',
      'fields|5-10': ['@word(2, 4)'],
      'fieldsName|5-10': ['@cword(2, 4)'],
    })
  },
}
