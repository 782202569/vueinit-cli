import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

//
const getValidString = (str) => {
  if (typeof str !== 'string') {
    return ''
  }
  return str.trim()
}

//
const getValidFunction = (fn) => {
  if (typeof fn === 'function') {
    return fn
  }
  return () => {}
}

/**
 * 参数：
 * - context web上下文
 * - biz 业务编码，不指定则为global
 * - token 访问token字符串，为对象时，取obj.state.token值
 */
export class SimMessageClient {
  //
  constructor(context, biz, token) {
    this.context = context = getValidString(context)
    this.biz = getValidString(biz) || 'global'
    this.store = token || {}
    if (!context) {
      throw '请指定上下文'
    }
  }

  // 启用连接
  connect(callback, errorCallback) {
    if (this.socket) {
      return
    }
    //
    const { context, store } = this
    let token = ''
    callback = getValidFunction(callback)
    errorCallback = getValidFunction(errorCallback)
    //
    if (typeof store === 'object') {
      const state = store.state
      if (state) {
        token = getValidString(state.token)
      }
    } else {
      token = getValidString(store)
    }
    const path = `${context}/ws`
    //
    this.socket = new SockJS(`${path}?accessToken=${token}`, null, {
      transports: ['websocket', 'xhr-polling'],
    })
    //
    const client = Stomp.over(this.socket)
    //
    client.configure({
      debug(str) {
        console.log(str)
      },
      onStompError(err) {
        errorCallback(err)
        console.error(`stomp消息错误！[${path}]`)
      },
      onWebSocketError(err) {
        errorCallback(err)
        console.error(`websocket连接错误！[${path}]`)
      },
      onDisconnect() {
        console.log(`websocket连接已断开！[${path}]`)
      },
      onConnect: () => {
        console.log(`websocket已连接！[${path}]`)
        client.subscribe('/app/subscribe', (message) => {
          const body = message.body
          if (body && typeof body === 'string') {
            // client.subscribe(`${body.replace(/\/+$/, '')}/${this.biz}`, (msg) => {
            client.subscribe(`${body}${this.biz}`, (msg) => {
              callback(msg)
            })
          }
        })
      },
    })

    // 开启stomp服务
    client.activate()

    this.stompClient = client
  }

  // 断开连接
  disconnect(callback) {
    if (this.socket) {
      callback = getValidFunction(callback)
      this.stompClient.disconnect(() => {
        this.socket = null
        callback()
      })
    }
  }
}

//
export default (...args) => {
  return new SimMessageClient(...args)
}
