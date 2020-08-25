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
  'POST /qualityInspectionSystem/ascorec/selectRobertProject.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          robertProjectId: '@guid',
          objectType: '@word(2, 4)',
          callType: null,
          projectName: '@word(2, 4)',
          modleId: '@guid',
          satisfyStatus: '@integer(0, 0)',
          postType: null,
          consultType: null,
          seatgroup: null,
          operationperiod: '@integer(0, 1)',
          collectionperiod: '@integer(0, 1)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createUser: '@word(2, 4)',
          updateTime: null,
          finshCount: '@integer(0, 0)',
          status: '@integer(0, 1)',
          firBusiClass: null,
          secBusiClass: null,
          thiBusiClass: null,
          seatStarList: null,
          seatNameList: null,
        },
      ],
      Count: '@integer(0, 2)',
    })
  },
}
