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
  'GET /analyticSystem/recordSort/trees/:uuid': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      data: {
        sortID: '@guid',
        sortName: '@cword(2, 4)',
        'children|5-10': [
          {
            sortID: '@guid',
            sortName: '@ctitle(5, 10)',
            'children|5-10': [
              {
                sortID: '@guid',
                sortName: '@word(2, 4)',
                children: [],
                labels: [],
                count: '@integer(0, 0)',
                otherCount: '@integer(0, 0)',
                parentSortID: '@guid',
                parentSortName: '@ctitle(5, 10)',
                calculating: '@boolean',
                allParentSortName: '@ctitle(5, 10)',
                parentID: '@guid',
                id: '@id',
              },
            ],
            labels: [],
            count: '@integer(0, 0)',
            otherCount: '@integer(0, 0)',
            parentSortID: '@guid',
            parentSortName: '@cword(2, 4)',
            calculating: '@boolean',
            allParentSortName: null,
            parentID: '@guid',
            id: '@id',
          },
        ],
        labels: [],
        count: '@integer(0, 0)',
        otherCount: '@integer(0, 0)',
        parentSortID: '@word(2, 4)',
        parentSortName: null,
        calculating: '@boolean',
        allParentSortName: null,
        parentID: '@word(2, 4)',
        id: '@id',
      },
    })
  },
  'DELETE /analyticSystem/recordSort/trees/:uuid': (req, res, next) => next(),
}
