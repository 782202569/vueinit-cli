const global = {}
let baseUrl = ''
let wsUrl = ''
let translatorsUrl = ''
// 兼容之前版本的定义形式
if (g && typeof g === 'object') {
  if (typeof g.baseUrl === 'string') {
    baseUrl = g.baseUrl
  }
  if (typeof g.wsUrl === 'string') {
    wsUrl = g.wsUrl
  }
  if (typeof g.translatorsUrl === 'string') {
    translatorsUrl = g.translatorsUrl
  }
}

// 基础接口地址
global.baseUrl = baseUrl || process.env.app_base_url
// websocket地址
global.wsUrl = wsUrl || process.env.app_ws_url
// 客服助手语音转译接口地址
global.translatorsUrl = translatorsUrl || process.env.app_translators_url

// 中台地址
global.aiUrl = global.baseUrl + '/ai'
// sys地址
global.sysApi = global.baseUrl + '/sys'
global.hrmApi = global.baseUrl + '/hrm'
global.qualityUrl = global.baseUrl + '/qualityInspectionSystem'
global.currentBaseUrl = global.baseUrl + '/analyticSystem'
global.suanfaBaseUrl = global.baseUrl + '/recordAlgLabel/startTask'
// global.currentBaseUrl = global.baseUrl
global.analyticSystemUrl = global.currentBaseUrl
// file路径地址
global.fileApi = global.baseUrl + '/fileMananer'
// ivs页面路径地址
global.ivsUrl = global.baseUrl + '/ivs'
global.ivsZuulUrl = global.baseUrl + '/zuul/ivs'
// ivs-task地址
global.taskBaseUrl = global.baseUrl + '/task'
// 质检地址
global.qualityUrl = global.baseUrl + '/qualityInspectionSystem'
// 表单引擎地址
global.formEngineUrl = global.baseUrl + '/formEngine/formCreater'
global.formHeader = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    'prefer-service-zone': '',
  },
}

global.jsonHeader = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'prefer-service-zone': '',
  },
}

// 角色编码
global.roleCode = [
  // 'admin', // 系统管理员或者超级管理员
  'seatman', // 坐席人员
  'headman', // 组长
  'qa', // 质检员
  'qa_suvs', // 质检主管
]
global.roleOptions = ['全部角色', '客服', '客户']
global.positionOptions = ['前', '后']
global.positionOptionsText = ['全文', '开头', '结束']

export default global
