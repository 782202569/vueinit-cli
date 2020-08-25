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
  'GET /oam/api/company/getAllCompany': (req, res, next) => {
    return Mock.mock({
      code: '@integer(0, 0)',
      message: '@word(2, 4)',
      'data|5-10': [
        {
          companyid: '@guid',
          companycode: '@word(2, 4)',
          domainname: '@word(2, 4)',
          companyname: '@word(2, 4)',
          contacts: '@word(2, 4)',
          contactnumber: '@word(2, 4)',
          contactnumber2: null,
          fax: null,
          email: '@email',
          account: '@word(2, 4)',
          launchdate: null,
          deadlinedate: null,
          createdate: '@datetime("yyyy-MM-dd HH:mm:ss")',
          effectivelength: '@integer(0, 0)',
          enable: '@integer(0, 1)',
          maxuser: '@integer(0, 0)',
          password: null,
        },
      ],
    })
  },
}
