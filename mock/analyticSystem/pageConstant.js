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
  'POST /analyticSystem/pageConstant/getValue.do': (req, res, next) => {
    return Mock.mock({
      'ipType|5-10': [
        {
          id: '@id',
          name: '@cword(2, 4)',
        },
      ],
    })
  },
  'POST /analyticSystem/pageConstant/getConfig.do': (req, res, next) => {
    return Mock.mock({
      analyseId: null,
      silenceSeconds: null,
      consClusterSeconds: null,
      mood: null,
      minSpeed: null,
      maxSpeed: null,
    })
  },
  'GET /analyticSystem/pageConstant/getStandByCode.do': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [{ key: '@word(2, 4)', value: '@cword(2, 4)' }],
    }).array
  },
}
