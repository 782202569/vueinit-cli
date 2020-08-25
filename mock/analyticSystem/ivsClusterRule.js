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
  'POST /analyticSystem/ivsClusterRule/getClusterRuleData.do': (req, res, next) => {
    return Mock.mock({
      Data: [],
      Count: '@integer(0, 0)',
    })
  },
  'POST /analyticSystem/ivsClusterRule/getExistTopic': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [
        {
          topicClusterId: '@guid',
          clusterRuleId: '@guid',
          talkNo: null,
          talkContent: null,
          topicContent: null,
          topicKeyWord: null,
          topicNo: null,
          createTime: null,
          objectId: null,
          objectType: null,
          busiClassId: null,
          callStime: null,
          seatNo: null,
          seatName: null,
          callTime: null,
          topicName: '@cword(2, 4)',
          parentId: null,
          keywordLabel: null,
          algorithmLabel: null,
        },
      ],
    }).array
  },
}
