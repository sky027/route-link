import axios from 'axios'
import store from '@/store/index'
import { Loading } from 'element-ui'
// const prodEnv = require('./prod.env')
import { message } from '@/utils/message'
import router from '../router/index'


// const isDev = process.NODE_ENV === 'development'
// let HOST_NAME = isDev ? `${window.origin}/api` : window.location.origin
const service = axios.create({
  baseURL: window.location.origin,
  withCredentials: true,
  headers: { 'content-type': 'application/json;charset=UTF-8' },
  timeout: 60000 // request timeout
})

/**
 * 处理二进制文件
 * @param res
 * @returns {Promise<any>}
 */
function blobToJson(res) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(res, 'utf-8')
    reader.onload = (e) => {
      try {
        resolve(JSON.parse(reader.result))
      } catch (err) {
        resolve(false)
      }
    }
  })
}

/**
 * 发送请求时配置
 */
service.interceptors.request.use(
  config => {
    // 可以在此处判断token添加header等配置
    const token = store.getters.token
    if (token) {
      return config
    }
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 请求响应时
 * 处理不同的返回值code
 */
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.returnCode === '1') {
      return res
    }
    if (res.code === 401) {
      // 重新登录
      window.localStorage.clear();
      store.dispatch('system/removeToken');
      router.push('/login');
    }
  },
  error => {
    return Promise.reject(error)
  }
)



const request = {
  api: (method, url, body, responseType) => {
    const params = method === 'get' ? body : {}
    const data = body
    const options = {
      url: url,
      method: method,
      params: params,
      data
    }
    if (responseType) { options.responseType = responseType }
    return service(options).then(res => {
        return Promise.resolve(res)
      }, err => {
        return Promise.reject(err)
      }
    )
  },
  post: (url, data, callback, catchFun) => {
    this.api('post', url, data)
      .then(response => {
        callback && callback(response)
      })
      .catch((response) => {
      catchFun && catchFun(response)
    })
  },
  get: (url, data, callback, catchFun) => {
    this.api('get', url, data)
      .then(response => {
        callback && callback(response)
      }).catch(() => {
      catchFun && catchFun()
    })
  },
  downloadPOST: (fileName, url, data, callback, catchFun) => {
    this.api('post', url, data, 'blob')
      .then(res => {
        callback && callback()
        // 兼容ie11
        if (window.navigator.msSaveOrOpenBlob) {
          try {
            const blobObject = new Blob([data])
            window.navigator.msSaveOrOpenBlob(blobObject, fileName)
          } catch (e) {
            console.log(e)
          }
        } else {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName || '')
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      }).catch(() => {
      catchFun && catchFun()
    })
  },
  fileDownload: (url, fileName) => {
    const loading = Loading.service({
      lock: true,
      text: '获取文件中...',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.8)'
    })
    return new Promise(resolve => {
      axios.get(url, {responseType: 'blob'}).then(res => {
        loading.close()
        if (res.data) {
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = window.URL.createObjectURL(new Blob([res.data]))
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          link.remove()
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch( err => {
        resolve(false)
        loading.close()
        message({
          message: '下载失败',
          type: 'error',
          duration: 2 * 1000
        })
      })
    })
  }
}

export default request
