import axios from './http.js'
import global from '@/global'
let hrmApi = global.hrmApi
function getFilterFuncId(menuId, url) {
  axios
    .post(
      hrmApi + '/accountApi/accessible/getFuncId.do?menuId=' + menuId + '&href=' + url
    )
    .then((res) => {
      if (res.data != '{"login":true}') {
        let menuContent = document.getElementById('menuContentWrap')
        let buttons = menuContent.childNodes[0].querySelectorAll('[funcId]')
        buttons.forEach((item) => {
          let funcid = item.attributes['funcid'].nodeValue
          let index = res.data.findIndex((i) => i == funcid)
          if (index < 0) {
            item.remove()
          }
        })
      }
    })
    .catch((err) => {
      console.log('获取按钮权限失败' + err)
    })
}
export default getFilterFuncId
