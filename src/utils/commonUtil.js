const CommonUtil = {
  /**
   * 对象深拷贝
   * param obj   拷贝对象
   * returns {any[] | {}}   返回拷贝对象
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
   * 时间戳 转日期
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
   * 获取指定范围内的随机数
   */
  getRoundNum(start, end) {
    return Math.round(Math.random() * (end - start) + start);
  }

};

export default CommonUtil
