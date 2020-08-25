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
  'GET /analyticSystem/recordAlgLabel/all': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [
        {
          labelId: '@word(2, 4)',
          labelName: '@cword(2, 4)',
          count: '@integer(0, 1)',
          parentLabelID: null,
          lastExecuteTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        },
      ],
    }).array
  },
}
