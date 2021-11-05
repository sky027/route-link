import CryptoJS from 'crypto-js'

export const encryptAndDecode = {
  aesKey: 'd7b85f6e214abcda',
  // 加密
  encrypt: (keys, value) => {
    let key = CryptoJS.enc.Utf8.parse(encryptAndDecode.aesKey)
    if (keys) {
      key  = CryptoJS.enc.Utf8.parse(keys)
    }
    const srcs = CryptoJS.enc.Utf8.parse(value)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
  },
  //解密
  decrypt: (keys, value) => {
    let key = CryptoJS.enc.Utf8.parse(encryptAndDecode.aesKey)
    if (keys) {
      key  = CryptoJS.enc.Utf8.parse(keys)
    }
    const decrypt = CryptoJS.AES.decrypt(value, key, { mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
