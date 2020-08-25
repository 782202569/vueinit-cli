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
  'POST /qualityInspectionSystem/speechFeature/getPlayInfoTapeName.do': (
    req,
    res,
    next
  ) => {
    return Mock.mock({
      code: '@word(2, 4)',
      message: '@guid',
      data: '@word(2, 4)',
    })
  },
  'POST /qualityInspectionSystem/speechFeature/getPlayInfo.do': (req, res, next) =>
    next(),
}
