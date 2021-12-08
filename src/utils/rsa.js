/* 产引入jsencrypt实现数据RSA加密 */
import JSEncrypt from 'jsencrypt' // 处理长文本数据时报错 jsencrypt.js Message too long for RSA
/* 产引入encryptlong实现数据RSA加密 */
import Encrypt from 'encryptlong' // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。

//公钥
/*const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKX1Fs2JUD25zrAEwPnjnZC0az
rl1XjGzGrJ64eb1lr9QVVOO2zGKZdqDLZD4Ut4Mp6GHMaqqFXKm+zN7IAXu+mqZb
UrqUziHE5YGC02wObiZEzfa6V9a8ZvqpB+Z8KO+hAkkjzjMl+E+hDORpZmez3SMz
etn7mcCeLw8/vmxz3QIDAQAB
-----END PUBLIC KEY-----`;
//私钥
const PRIVATE_KEY = `
-----BEGIN PUBLIC KEY-----
MIICXgIBAAKBgQDKX1Fs2JUD25zrAEwPnjnZC0azrl1XjGzGrJ64eb1lr9QVVOO2
zGKZdqDLZD4Ut4Mp6GHMaqqFXKm+zN7IAXu+mqZbUrqUziHE5YGC02wObiZEzfa6
V9a8ZvqpB+Z8KO+hAkkjzjMl+E+hDORpZmez3SMzetn7mcCeLw8/vmxz3QIDAQAB
AoGBAJBr6b4V6nJwXdHPyngy4PGl/HTqcK60BkTamALqzmEtU9tNU5z2yz7dy+6a
wTsjo7Vao8CwNrUp5fHGXw65EEc1/3Iu2Fiix0XF7RP4NFSoxbBmzQW1nUK/5DFi
4VR1uhEmdbgLwGabsdqzeUqhRKkRGAPVCotBjaDBOu0J3Mu5AkEA+SM7Ctu7evOv
ZwjWrp9a5MGxJ9yLLabbIuWL+420jr2G6ojaTZ2ROA2DWWQPx4JqWxDHttomrb38
dk2emP2WAwJBAM/yU58YRQ+dTeuTzNYC1JdWcs35n9+hoVP7y+x29CmcqDTPp3nR
Bbbq88yMb2nZdlwthWi7BurNHsRJFqj0GJ8CQF5gJCuW1UxcJ2PGi1yW7R2e6fcJ
qoden8B2aDKgmXdBAGyz7s5cE/jB1bH1H60aECPzFVSFCwXh5FMEUEHwPfUCQQC7
JqZ57lbhebrSRcA58GwzFFvY40wu8gIHWvwqgti2xsZgWW+qZCPXf9gSBWaUhmJP
Da0fGAxesGN7VyhswNuTAkEAzCFNqL/zwHXcwh9YyHTdk/bRWIJq49jTA+vbgGv0
szKIvGRKoRbub3NEUiI80TDsCAvbJ6R80J7RjnpmShOwcA==
-----END PUBLIC KEY-----`;*/

/*//-  视频台席
const PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChHQkG5CLYmiCoZfpPvt6zSUG5Gp0DM1vcAlTscNRV8ahlEMVjP25ckxQ+/48AALw01r4vp1hBcZMQAGQb0ujDxIgSoXPBbB6YbwaD51mlctf7gPDdPgrUu3Fxixk8p6zw8PcBK1/U5s3EK4ux6XQW9OMWuwD17mCNGwvEHWOuUwIDAQAB`
const PRIVATE_KEY = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKEdCQbkItiaIKhl+k++3rNJQbkanQMzW9wCVOxw1FXxqGUQxWM/blyTFD7/jwAAvDTWvi+nWEFxkxAAZBvS6MPEiBKhc8FsHphvBoPnWaVy1/uA8N0+CtS7cXGLGTynrPDw9wErX9TmzcQri7HpdBb04xa7APXuYI0bC8QdY65TAgMBAAECgYAX6FQXlrDpDW39LyzGup8XYa6EBkP4Xp2p9xqc/10y56pCXQu9X4ND73tYodmZeYJ0IM2WCrIY+/6DqFsymch6TxSD7mIj0sEiUDDQHDCA5XI9Vw7m3wYKfjmxzkf3Ny/1700JE9cmKzRuYpnagYC3/MXL/zEqGFZhVDgLS+75iQJBAPSjouWnQTEnJ/Rc7j69SbypX0JI87f//vvBLN76qceuyQnigYGxCZhoHXZU3lf6HICb9y2oWQUyWiCAaZSjt20CQQComGmnynEzwUNTOdTqOFn5wIDH9H2EwTg+7vHU5rOJ9i0v1xM2KuKDvWZK2/rVi1AZadMAo/8+Z57P3QyrLKS/AkEAimM61fC8RyLgTjJ3r1QCr0+cjHGaNN8CjcWkLWrcuhGcthPEsOnGBMn4yKSPtnLMxs/zjodp/C+Unkgl8ah/LQJAQZlsItlmSpj8NTnfWnMqrz7z3NmIrUrxM6uNdSV+3kNnOaIZ2428LT5Yuu/1HXnjZMAEVc951TJEXOTJtSDdyQJAcFj8pkg+lIcSl3mRBNKDawHMmsjNnBQ0imI8xCigHnjWV8etUswUocMuU/WY52MYM40z/0rnewLtYtweOxoIKA==`
// -*/

//-  和装维
const PUBLIC_KEY = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwpe5DJyMaFu+O8N+6yxnNUNEhZL9tDoTEgrcv25ahP4uHsswJ3g7t2lMsL/MubVrVCTuDWpwTDGh4hYjHJV9cz+mFY9Ye8taJE9jzdbbpWks1kwTaTePfi7GULhUQhMwcVREtc7Q8qer0kyE2fh7RHBmKO6G/AsUa/DWe8FZnEwIDAQAB`
const PRIVATE_KEY = `MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALCl7kMnIxoW747w
37rLGc1Q0SFkv20OhMSCty/blqE/i4eyzAneDu3aUywv8y5tWtUJO4NanBMMaHiF
iMclX1zP6YVj1h7y1okT2PN1tulaSzWTBNpN49+LsZQuFRCEzBxVES1ztDyp6vST
ITZ+HtEcGYo7ob8CxRr8NZ7wVmcTAgMBAAECgYBC+7icaDPMSdQvHLGJsEgpbbLP
edeIsA+yQGrcT+UPYfwzyZ3LRBPfJ4GQaOJKwZbG34hcp7g1FOhsgx45fbdp5e95
0wm70PzdzJwm6Ykx1SYMCxYbAt5iPabESmocfLJ+cg7osxP9y4on7oxX/QUjdwob
g+vzb4+N7yMOkKI5aQJBANme/oBmyNKf1uyBCYX7twHVbYd+9caLI7KA6LGgtNls
cafcGbQXF76oXEl6K6kDfTOtnuuoYrTrYZ1h/1GxgkcCQQDPzR7EVElVmUhP7nFX
WhTj6++8I5Cafir9Y58FBBgv3DLlhXtmue14rZ8cOxak945rAaeR8x/hkpZ+ObP/
we7VAkEAnDhcrkQaychgeuqusXXfC/vwYqIrQNnFSHDtmgWpjaMhe8Su1u705rLp
fP2stemBSUXLnZQFN6b5LgeZR0XMJQJBAKSveHm6HuBy+Yc3fqXu42161+Uv/nMi
GKn2oNlV1GFhzwht0E2qfpRMbTPvdFPLShhuGEKn/xVDmndw/cFtDf0CQCMWvlQn
DLrtLSqqDN4QrLUmts33VVV4gPHbs70wii6S1XDhtKvdedwEFCAKYx8RgwODGw0J
aY5asJOWxweZ8Nk=`;
//-

const RSA = {
  /* JSEncrypt加密 */
  rsaPublicData(data) {
    var jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(PUBLIC_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.encrypt(data)
    return result
  },
  /* JSEncrypt解密 */
  rsaPrivateData(data) {
    var jsencrypt = new JSEncrypt()
    jsencrypt.setPrivateKey(PRIVATE_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = jsencrypt.decrypt(data)
    return result
  },
  /* Encrypt 长字符串 加密 */
  encrypt(data) {
    var encryptor = new Encrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    const result = encryptor.encryptLong(data)
    // const result = encryptor.encryptLong(window.escape(data))
    return result
  },
  /* Encrypt 长字符串 解密 - PRIVATE_KEY - 验证 */
  decrypt(data) {
    var encryptor = new Encrypt()
    encryptor.setPrivateKey(PRIVATE_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    var result = encryptor.decryptLong(data)
    return result
    // return window.unescape(result)
  }
}

export default RSA;
