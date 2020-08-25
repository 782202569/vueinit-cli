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
  'GET /analyticSystem/sortTreeAlgorithm/checkTrain/': (req, res, next) => {
    return Mock.mock('@boolean')
  },
}
