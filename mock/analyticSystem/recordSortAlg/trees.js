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
  'GET /analyticSystem/recordSortAlg/trees/:uuid/treeID/exist': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      data: '@boolean',
    })
  },
  'GET /analyticSystem/recordSortAlg/trees/:uuid/treeID': (req, res, next) => next(),
}
