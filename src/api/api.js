// import './mock/index'
import axios from 'axios'
import { Loading } from 'element-ui'
import { message } from '@/utils/message'
import router from '../router/index'


// const isDev = process.NODE_ENV === 'development'
// let HOST_NAME = isDev ? `${window.origin}/api` : window.location.origin
axios.create({
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
axios.interceptors.request.use(
  config => {
    // 可以在此处判断token添加header等配置
    // const token = store.getters.token
    const token = window.localStorage.getItem('app_token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 请求响应时
 * 处理不同的返回值code
 */
axios.interceptors.response.use(
  response => {
    if (request.loadingTemp) {
      request.endLoading()
    }
    const res = response.data;
    if (response.status === 200) {
      return res
    } else if (response.status === 401) {
      // 重新登录
      message.error('无权限')
      window.localStorage.clear();
      store.dispatch('system/removeToken');
      router.push('/login');
    } else {
      router.push('/error/404')
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
    request.startLoading()
    return axios(options).then(res => {
        return Promise.resolve(res)
      }, err => {
        return Promise.reject(err)
      }
    )
  },
  post: (url, data, callback, catchFun) => {
    request.api('post', url, data)
      .then(response => {
        callback && callback(response)
      })
      .catch((response) => {
      catchFun && catchFun(response)
    })
  },
  get: (url, data, callback, catchFun) => {
    request.api('get', url, data)
      .then(response => {
        callback && callback(response)
      }).catch((err) => {
      catchFun && catchFun(err)
    })
  },
  downloadPOST: (fileName, url, data, callback, catchFun) => {
    request.api('post', url, data, 'blob')
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
  },
  loadingTemp: null,
  startLoading: (text) => {
    request.loadingTemp = Loading.service({
      lock: true,
      text: text ? text : '加载中....',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.8)',
      // background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  endLoading: () => {
    request.loadingTemp.close();
  }
}

export default request
