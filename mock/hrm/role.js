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
  'GET /hrm/role/rolesForAccount.do': (req, res, next) => {
    return Mock.mock({ Data: '@word(2, 4)', IDS: '@word(2, 4)' })
  },
}
