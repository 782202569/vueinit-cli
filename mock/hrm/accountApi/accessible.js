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
  'POST /hrm/accountApi/accessible/getFuncIdByAccountId.do': (req, res, next) => {
    return Mock.mock({ 'array|5-10': ['@word(2, 4)'] }).array
  },
}
