/**
 * 自定义封装 Ajax
 */

const Ajax = {
  ajax: (options) => {
    let { url, method, data, headers } = options;
    const times = 5000;
    if (!headers) {
      headers = {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }
    const lowerMethod = method.toLowerCase();

    const _isGet = lowerMethod === 'get';
    const _isPost = lowerMethod === 'post';

    // 拼接 data
    let requestData = null
    if (_isGet) {
      url += `?${Ajax.dataStringify(data)}`
    } else if (_isPost) {
      requestData = options.format === 'json' ? JSON.stringify(data) : Ajax.dataStringify(data)
    }

    // 返回Promise
    return new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();
      XHR.timeout = times;
      XHR.withCredentials = Boolean(options.withCredentials);
      // 检测请求
      XHR.onreadystatechange = () => {
        if (XHR.readyState == 4) {
          if (XHR.status == 200) {
            Ajax.reqSuccess(resolve, XHR.responseText)
          } else {
            Ajax.reqFailed(reject)
          }
        }
      }
      XHR.onerror = () => {
        Ajax.reqFailed(reject)
      }
      // 绑定自定义 handler
      for (let ev in options.handlers) {
        let _prevHandler = xhr[ev];
        XHR[ev] = function () {
          _prevHandler();
          options.handlers[ev]();
        }
      }
      // 开启
      XHR.open(method, url, true);

      // 设置headers, 请求头
      for (let attr in headers) {
        XHR.setRequestHeader(attr, headers[attr]);
      }

      // 发送
      XHR.send(requestData);
    })
  },
  dataStringify: (_data) => {
    return Object.keys(_data).map(key => `${key}=${_data[key]}`).join('&')
  },
  // 请求失败
  reqFailed: (reject) => {
    reject({
      code: '0',
      data: null,
      message: '请求失败'
    })
  },
  // 请求成功
  reqSuccess: (resolve, rtx) => {
    resolve({
      code: '1',
      data: rtx,
      message: '请求成功'
    })
    console.log('success - ', rtx)
  }
};

export default Ajax;
