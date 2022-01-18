/**
 * 项目中公共使用方法
 * @type {any}
 */
const CommonUtil = {
  /**
   * 对象深拷贝
   * @param obj {Object}  拷贝对象
   * @returns {any[] | {}}   返回拷贝对象
   */
  deepClone: (obj) => {
    const objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        // 判断ojb属性元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = CommonUtil.deepClone(obj[key])
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
    return objClone
  },

  /**
   * 去前后空格
   * @param str {string} 传入的字符串
   * @returns {string}
   */
  trim: (str) => {
    let str2
    if (!str || str === '') {
      str2 = null
    } else {
      str2 = str.toString().replace(/(^\s*)|(\s*$)/g, '')
    }
    return str2
  },


  /**
   * 时间戳 手动 转日期
   * @param times {number} 时间戳数字
   * @param type {string}  时间格式
   * @returns {string}
   */
  translateTime: (times, type) => {
    if (times) {
      const date = new Date(times)
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      const h = date.getHours()
      const ms = date.getMinutes()
      const s = date.getSeconds()
      return `${y}-${turn(m)}-${turn(d)} ${turn(h)}:${turn(ms)}:${turn(s)}`
    } else {
      return ''
    }
    function turn(t) {
      return t < 10 ? '0' + t : t
    }
  },
  /**
   * 生成 32位 UUID
   * @param r {boolean}  是否需要连字符 -
   * @returns {string}
   */
  getUUID(r) {
    const ID = [];
    const hexDigits = "0123456789ABCDEF";
    for (let i = 0; i < 36; i++) {
      ID[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    ID[14] = "4";
    ID[19] = hexDigits.substr((ID[19] & 0x3) | 0x8, 1);
    if (r) {
      ID[8] = ID[13] = ID[18] = ID[23] = '-';
    } else {
      ID[8] = ID[13] = ID[18] = ID[23];
    }

    return ID.join("");
  },

  /**
   *
   * @param start {number}
   * @param end {number}
   * @returns {number}
   */
  getRoundNum(start, end) {
    return Math.round(Math.random() * (end - start) + start);
  },

  /**
   * 设置缓存语言值
   * @param key {string} 字段
   * @param value {string} 值
   */
  setStorageItem(key, value) {
    window.localStorage.setItem(key, value)
  },
  /**
   * 获取缓存中的语言值
   * @param key {string} 字段
   * @returns {string}
   */
  getStorageItem(key) {
    return window.localStorage.getItem(key)
  }

};

export default CommonUtil
