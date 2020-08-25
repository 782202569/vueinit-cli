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
  'POST /qualityInspectionSystem/AbcByLogin/getCountByLogin.do': (req, res, next) => {
    return Mock.mock({
      count: '@integer(0, 2)',
    })
  },
  'POST /qualityInspectionSystem/AbcByLogin/queryInbox.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          messageId: '@guid',
          content: '@cword(2, 4)',
          messageContent: '@cparagraph(1, 2)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createUser: '@guid',
          createUserName: '@ctitle(5, 10)',
          messageType: '@integer(0, 2)',
          messageStatus: '@integer(0, 0)',
          detailId: '@guid',
          readeTime: null,
          status: '@integer(0, 1)',
          recipient: '@guid',
          recipientName: '@word(2, 4)',
          messageBelong: null,
        },
      ],
      Count: '@integer(0, 1)',
    })
  },
}
