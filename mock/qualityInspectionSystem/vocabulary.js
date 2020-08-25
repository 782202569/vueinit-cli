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
  'POST /qualityInspectionSystem/vocabulary/queryPage.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          wordId: '@guid',
          wordName: '@ctitle(5, 10)',
          wordDescribe: null,
          wordType: null,
          wordlibType: '@integer(0, 1)',
          createUser: '@ctitle(5, 10)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          updateUser: '@ctitle(5, 10)',
          updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          status: '@integer(0, 1)',
          classId: '@guid',
          roleType: null,
          alikeWordId: null,
          alikeWordList: null,
        },
      ],
      Count: '@integer(0, 46)',
    })
  },
  'POST /qualityInspectionSystem/vocabulary/getTrees.do': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [
        {
          classId: '@guid',
          classTitle: '@cword(2, 4)',
          parentClassId: '@word(2, 4)',
          createTime: null,
          createUser: null,
          updateTime: null,
          updateUser: null,
          remark: null,
          status: null,
          classType: '@integer(0, 1)',
          'childIqc|5-10': [
            {
              classId: '@guid',
              classTitle: '@cword(2, 4)',
              parentClassId: '@guid',
              createTime: null,
              createUser: null,
              updateTime: null,
              updateUser: null,
              remark: null,
              status: null,
              classType: '@integer(0, 1)',
              'childIqc|5-10': [
                {
                  classId: '@guid',
                  classTitle: '@cword(2, 4)',
                  parentClassId: '@guid',
                  createTime: null,
                  createUser: null,
                  updateTime: null,
                  updateUser: null,
                  remark: '@ctitle(5, 10)',
                  status: null,
                  classType: '@integer(0, 1)',
                  childIqc: null,
                },
              ],
            },
          ],
        },
      ],
    }).array
  },
}
