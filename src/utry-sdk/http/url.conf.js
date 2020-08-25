import global from '@/global'

let currentBaseUrl = global.currentBaseUrl
let suanurl = global.suanfaBaseUrl
let requestUrls = {
  getTreeDataUrl: currentBaseUrl + '/recordLabelClass/getRecordLabelClassTree.do',
  saveTreeNodeUrl: currentBaseUrl + '/recordLabelClass/addNode.do',
  updateTreeNodeNameUrl: currentBaseUrl + '/recordLabelClass/updateNodeName.do',
  deleteTreeNodeUrl: currentBaseUrl + '/recordLabelClass/deleteNode.do',
  queryLabelUrl: currentBaseUrl + '/recordLabel/getList.do',
  batchPauseUrl: currentBaseUrl + '/recordLabel/batchLabelPause.do',
  deleteLabelUrl: currentBaseUrl + '/recordLabel/delete.do',
  isCallQaModel: currentBaseUrl + '/recordLabel/isCallQaModel.do',
  startLabelUrl: currentBaseUrl + '/recordLabel/start.do',
  getAlgorithmLabel: currentBaseUrl + '/recordAlgLabel',
  poststartTask: suanurl,
  startAlgLabelUrl: currentBaseUrl + '/recordAlgLabel/startTask.do',
  startSentimentLabelUrl: currentBaseUrl + '/sentimentLabel/startTask.do',
  stopAlgLabelUrl: currentBaseUrl + '/recordAlgLabel/stop.do',
  stopSentimentLabelUrl: currentBaseUrl + '/sentimentLabel/stopTask.do',
  getAlgLabelTaskState: currentBaseUrl + '/recordAlgLabel/taskState.do',
  getSentimentLabelTaskState: currentBaseUrl + '/sentimentLabel/taskState.do',
  getSentimentLabel: currentBaseUrl + '/sentimentLabel/count.do',
}

export { requestUrls }
