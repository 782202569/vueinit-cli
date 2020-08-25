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
  'POST /analyticSystem/recordLabelClass/getRecordLabelClassTree.do': (
    req,
    res,
    next
  ) => {
    return Mock.mock({
      'array|5-10': [
        {
          recordLabelClassId: '@guid',
          recordLabelClassName: '@cword(2, 4)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createUser: '@word(2, 4)',
          createUserName: '@ctitle(5, 10)',
          state: '@word(2, 4)',
          parentLabelClassId: '@word(2, 4)',
          configId: null,
          'children|5-10': [
            {
              recordLabelClassId: '@guid',
              recordLabelClassName: '@cword(2, 4)',
              createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
              createUser: '@word(2, 4)',
              createUserName: '@ctitle(5, 10)',
              state: '@word(2, 4)',
              'children|5-10': [
                {
                  recordLabelClassId: '@guid',
                  recordLabelClassName: '@cword(2, 4)',
                  createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                  createUser: '@word(2, 4)',
                  createUserName: '@ctitle(5, 10)',
                  state: '@word(2, 4)',
                  children: [],
                  parentLabelClassId: '@guid',
                  configId: null,
                },
              ],
              parentLabelClassId: '@guid',
              configId: null,
            },
          ],
        },
      ],
    }).array
  },
}
