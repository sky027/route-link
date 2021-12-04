import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

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

export const rsaEncrypt = {
  // 73E157FE21257249E3288A72096F1067F5E7
  // 加密方法
  encrypt: str => {
    const encrypt = new JSEncrypt()
    const pubKey=`-----BEGIN RSA PRIVATE KEY-----   -----END RSA PRIVATE KEY-----`
    const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8HMr2CBpoZPm3t9tCVlrKtTmI4jNJc7/HhxjIEiDjC8czP4PV+44LjXvLYcSV0fwi6nE4LH2c5PBPEnPfqp0g8TZeX+bYGvd70cXee9d8wHgBqi4k0J0X33c0ZnW7JruftPyvJo9OelYSofBXQTcwI+3uIl/YvrgQRv6A5mW01QIDAQAB';
    // encrypt.setPublicKey(pubKey) // 设置 加密公钥
    encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');
     // 进行加密
    return encrypt.encrypt(str.toString())
  },
  // 解密
  decrypt: str => {
    const decrypt = new JSEncrypt()
    const pubKeyPrivate = `-----BEGIN RSA PRIVATE KEY-----  -----END RSA PRIVATE KEY-----`// ES6 模板字符串 引用 rsa 公钥
    const PRIVATE_KEY = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALwcyvYIGmhk+be320JWWsq1OYjiM0lzv8eHGMgSIOMLxzM/g9X7jguNe8thxJXR/CLqcTgsfZzk8E8Sc9+qnSDxNl5f5tga93vRxd5713zAeAGqLiTQnRffdzRmdbsmu5+0/K8mj056VhKh8FdBNzAj7e4iX9i+uBBG/oDmZbTVAgMBAAECgYEAmgNU5NTDkj9B+Pnt6UU8doSjw3+3j+bV2K2yS3QUOvAUus/Ax7x6ktjWxzCXvDY9IfUil2RNv9vtKEAqYLCWjc+lf8PV/yH1b7NEgyeAPBXtAJRoOnmYL2bdPW92kP9KgxJruF6Dz/C5AmMOncsvq8ABD+9Darn4p8dwj2ZC4O0CQQDf/AHmZsQokEItfCy4mHS9UbxbfIhEUv1ApPh/+Sr7NkJkHWYCtBQo+8jKO6zurAZQgWBPD1XX2UE4R+VIiZazAkEA1wAqtMvGhccyRZr+6kpkpDIa8+9jOE+nGUzqTDvgCID6as8AzOONFVVK6m/UUqkhcJ8Qu1pF36BGojy5BX2KVwJBAJSFpbji0hXXupowqfLp3RcgmNbNWAp+QUJZYhJx5cdYbmO2fssyH+AhPT6knYJR/YnqkDM8hv6vKCkqu2YDHjMCQAOA8TE5EOclM+CGghj3VWSHnIDVKdzFD4gOBNNxNlltIKeU8AJmwunSFgJ0CBXAw9a+ANvMwM7AIeaK7sj0HskCQAvxfDCq7gaNx+pfu0FHG8Gix08A/A6foggBl1fVu+L9sr9ZuOQ3HbXnl28F9ewuB9xdjnLUDjp7W7U0pB+vKoQ=';
    // decrypt.setPrivateKey(pubKeyPrivate)//解密公钥
    decrypt.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----'+PRIVATE_KEY+'-----END RSA PRIVATE KEY-----');
    return decrypt.decrypt(str.toString())
  }
}
