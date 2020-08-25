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
  'GET /analyticSystem/recordLabel/all': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      'data|5-10': [
        {
          labelId: '@guid',
          labelName: '@ctitle(5, 10)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createUser: '@word(2, 4)',
          createUserName: '@ctitle(5, 10)',
          executeState: '@word(2, 4)',
          state: '@word(2, 4)',
          classId: '@guid',
          isFirst: '@word(2, 4)',
          firstRecordTimeMin: '@datetime("yyyy-MM-dd HH:mm:ss")',
          firstRecordTimeMax: null,
          overlapMin: null,
          overlapMax: null,
          avgSpeedMin: null,
          avgSpeedMax: null,
          moodScoreMin: null,
          moodScoreMax: null,
          silenceType: '@word(2, 4)',
          silenceTimeMin: null,
          silenceTimeMax: null,
          silencePerMin: null,
          silencePerMax: null,
          silenceLongMin: null,
          silenceLongMax: null,
          isChanged: '@word(2, 4)',
          recordCount: null,
          'keyWords|5-10': [
            {
              scriptKeywordId: '@guid',
              fullScriptId: '@guid',
              keywordContext: '@cword(2, 4)',
              keywordTimeMin: null,
              keywordTimeMax: null,
              count: null,
              type: '@integer(0, 2)',
              note: null,
              fullScriptRole: '@word(2, 4)',
              scriptKeywordSilenceId: '@guid',
              silenceType: '@integer(0, 1)',
              silenceTimeMin: null,
              silenceTimeMax: null,
              sceneTime: null,
              sceneType: null,
              sceneValue: null,
              sceneValueType: null,
            },
          ],
          configId: null,
        },
      ],
    })
  },
  'GET /analyticSystem/recordLabel/allInProgress': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      'data|5-10': [
        {
          labelId: '@guid',
          labelName: '@cword(2, 4)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createUser: '@word(2, 4)',
          createUserName: '@ctitle(5, 10)',
          executeState: '@word(2, 4)',
          state: '@word(2, 4)',
          classId: '@guid',
          isFirst: '@word(2, 4)',
          firstRecordTimeMin: '@datetime("yyyy-MM-dd HH:mm:ss")',
          firstRecordTimeMax: null,
          overlapMin: null,
          overlapMax: null,
          avgSpeedMin: null,
          avgSpeedMax: null,
          moodScoreMin: null,
          moodScoreMax: null,
          silenceType: '@word(2, 4)',
          silenceTimeMin: null,
          silenceTimeMax: null,
          silencePerMin: null,
          silencePerMax: null,
          silenceLongMin: null,
          silenceLongMax: null,
          isChanged: '@word(2, 4)',
          recordCount: '@integer(0, 1024)',
          keyWords: null,
          configId: null,
        },
      ],
    })
  },
  'POST /analyticSystem/recordLabel/getList.do': (req, res, next) => {
    return Mock.mock({
      message: '@word(2, 4)',
      'results|5-10': [
        {
          labelId: '@guid',
          labelName: '@ctitle(5, 10)',
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          createUser: '@word(2, 4)',
          createUserName: '@ctitle(5, 10)',
          executeState: '@word(2, 4)',
          state: '@word(2, 4)',
          classId: '@guid',
          isFirst: '@word(2, 4)',
          firstRecordTimeMin: '@datetime("yyyy-MM-dd HH:mm:ss")',
          firstRecordTimeMax: null,
          overlapMin: null,
          overlapMax: null,
          avgSpeedMin: null,
          avgSpeedMax: null,
          moodScoreMin: null,
          moodScoreMax: null,
          silenceType: '@word(2, 4)',
          silenceTimeMin: null,
          silenceTimeMax: null,
          silencePerMin: null,
          silencePerMax: null,
          silenceLongMin: null,
          silenceLongMax: null,
          isChanged: '@word(2, 4)',
          recordCount: null,
          keyWords: null,
          configId: null,
        },
      ],
      result: null,
      state: '@word(2, 4)',
      count: '@integer(0, 12)',
      other: null,
      success: '@boolean',
    })
  },
}
