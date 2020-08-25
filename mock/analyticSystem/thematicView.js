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
  'POST /analyticSystem/thematicView/getClassTree.do': (req, res, next) => {
    return Mock.mock({
      'data|5-10': [
        [
          {
            id: '@id',
            text: '@integer(0, 2)',
            name: '@integer(0, 1)',
            subjectClassId: '@guid',
            label: '@cword(2, 4)',
            'children|5-10': [
              {
                id: '@id',
                text: '@integer(0, 3)',
                name: '@integer(0, 2)',
                subjectClassId: '@guid',
                label: '@cword(2, 4)',
                'children|5-10': [
                  {
                    id: '@id',
                    text: '@integer(0, 2)',
                    name: '@integer(0, 3)',
                    subjectClassId: '@guid',
                    label: '@cword(2, 4)',
                  },
                ],
              },
            ],
          },
        ],
      ],
      'options|5-10': [
        {
          value: '@guid',
          label: '@cword(2, 4)',
        },
      ],
    })
  },
  'POST /analyticSystem/thematicView/getAreaData.do': (req, res, next) => {
    return Mock.mock({
      cityData: [],
      'provinceData|5-10': [
        {
          'values|5-10': ['@integer(0, 0)'],
          'keyName|5-10': ['@cword(2, 4)'],
          name: '@cword(2, 4)',
          value: '@integer(0, 0)',
        },
      ],
    })
  },
  'POST /analyticSystem/thematicView/getReasonAnalysis.do': (req, res, next) => {
    return Mock.mock({
      'classes|5-10': ['@cword(2, 4)'],
      'dates|5-10': ['@word(2, 4)'],
      'lines|5-10': [
        {
          name: '@cword(2, 4)',
          'data|5-10': ['@integer(0, 0)'],
          type: '@word(2, 4)',
        },
      ],
    })
  },
  'POST /analyticSystem/thematicView/timeInterval.do': (req, res, next) => {
    return Mock.mock({
      'array|5-10': [
        {
          abscissa: '@word(2, 4)',
          ordinateCount: {
            '0': '@integer(0, 0)',
            '1': '@integer(0, 0)',
            '2': '@integer(0, 0)',
            '3': '@integer(0, 0)',
            '4': '@integer(0, 0)',
            '5': '@integer(0, 0)',
            '6': '@integer(0, 0)',
            '7': '@integer(0, 0)',
            '8': '@integer(0, 0)',
            '9': '@integer(0, 0)',
            '10': '@integer(0, 0)',
            '11': '@integer(0, 0)',
            '12': '@integer(0, 0)',
            '13': '@integer(0, 0)',
            '14': '@integer(0, 0)',
            '15': '@integer(0, 0)',
            '16': '@integer(0, 0)',
            '17': '@integer(0, 0)',
            '18': '@integer(0, 0)',
            '19': '@integer(0, 0)',
            '20': '@integer(0, 0)',
            '21': '@integer(0, 0)',
            '22': '@integer(0, 0)',
            '23': '@integer(0, 0)',
          },
        },
      ],
    }).array
  },
}
