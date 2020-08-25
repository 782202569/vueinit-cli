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
  'POST /qualityInspectionSystem/ivsCaseClass/getCaseClassTreeData.do': (
    req,
    res,
    next
  ) => {
    return Mock.mock({
      'array|5-10': [
        {
          name: '@cword(2, 4)',
          value: {
            caseClassId: '@guid',
            className: '@word(2, 4)',
            parentClassId: null,
            createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
            createUser: '@word(2, 4)',
            updateTime: null,
            updateUser: null,
            remark: '@word(2, 4)',
            status: '@integer(0, 1)',
            objectType: null,
            isParent: '@boolean',
          },
        },
      ],
    }).array
  },
}
