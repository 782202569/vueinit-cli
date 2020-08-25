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
  'POST /analyticSystem/filterTemplate/getFilterModels.do': (req, res, next) => {
    return Mock.mock({
      'Data|5-10': [
        {
          modelId: '@guid',
          createUserName: '@word(2, 4)',
          createTime: '@word(2, 4)',
          modelName: '@cword(2, 4)',
          isZx: null,
          lastUsetime: '@word(2, 4)',
        },
      ],
      Count: '@integer(0, 6)',
    })
  },
  'POST /analyticSystem/filterTemplate/getAllDoseScriptData.do': (req, res, next) => {
    return Mock.mock({
      keywordData: { Data: [], Count: '@integer(0, 0)' },
      doseScriptData: {
        fullScriptId: '@guid',
        scriptName: '@ctitle(5, 10)',
        selienceType: '@integer(0, 0)',
        selienceLengthMin: null,
        selienceLengthMax: null,
        selienceTimes: null,
        speedMin: null,
        speedMax: null,
        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        createUser: '@word(2, 4)',
        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
        updateUser: null,
        status: '@integer(0, 1)',
        leadWords: null,
        leadWordsContext: null,
        silenceRatio: null,
        contentDoseRemark: null,
        matchField: null,
        relatedField: null,
        scriptType: null,
        moodMin: null,
        moodMax: null,
        overlapMin: null,
        overlapMax: null,
        needMatch: null,
        agentSubjectId: null,
        matchType: null,
        matchContentId: null,
        isZx: null,
        silenceTimeMin: null,
        silenceTimeMax: null,
        silenceRatioMin: null,
        silenceRatioMax: null,
        configId: null,
      },
    })
  },
}
