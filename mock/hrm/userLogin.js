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
  'GET /hrm/userLogin/getClientFrameInfo': (req, res, next) => {
    return Mock.mock({
      quickMenu: [],
      'menu|5-10': [
        {
          'childs|5-10': [
            {
              childs: [],
              icon: '@word(2, 4)',
              isClient: '@integer(0, 1)',
              menuId: '@guid',
              menuName: '@ctitle(5, 10)',
              parentId: '@guid',
              url: '@url',
            },
          ],
          icon: '@word(2, 4)',
          isClient: '@integer(0, 1)',
          menuId: '@guid',
          menuName: '@cword(2, 4)',
          url: '@url',
        },
      ],
      config: {
        search: '@word(2, 4)',
        activeNum: '@word(2, 4)',
      },
      userinfo: {
        accountId: '@guid',
        role: [],
        realName: '@ctitle(5, 10)',
        companyId: '@guid',
        sexuality: '@word(2, 4)',
      },
    })
  },
  'POST /hrm/userLogin/pswOverdue.do': (req, res, next) => {
    return Mock.mock('@boolean')
  },
  'POST /hrm/userLogin/changeHasremind.do': (req, res, next) => next(),
}
