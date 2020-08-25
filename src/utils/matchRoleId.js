/**
 * 角色id匹配
 */
let matchRoleId = {
  match(ids,resdata) {
    let arr = []
    for (var key in resdata) {
      ids.forEach(function (item) {
        if(resdata[key] == item){
           arr.push(key)
        }
      })
    }
    return arr
  }
}
export default matchRoleId
