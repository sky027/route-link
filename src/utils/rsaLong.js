import JSEncrypt from 'jsencrypt';
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";

var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";

//整型转字符串
function int2char(n) {
  return BI_RM.charAt(n);
}

//十六进制转Base64字符串
function hex2b64(h) {
  var i;
  var c;
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  }
  else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}

//Base64字符串转十六进制
function b64tohex(s) {
  var ret = "";
  var i;
  var k = 0; // b64 state, 0-3
  var slop = 0;
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break;
    }
    var v = b64map.indexOf(s.charAt(i));
    if (v < 0) {
      continue;
    }
    if (k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    }
    else if (k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    }
    else if (k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    }
    else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if (k == 1) {
    ret += int2char(slop << 2);
  }
  return ret;
}

//十六进制转字节
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

//字节转十六进制
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

String.prototype.replaceAllStr=function(f,e){
  var reg=new RegExp(f,"g");
  return this.replace(reg,e);
}

function urlsafeEncode(e) {
  return e.replaceAllStr("\\+","-").replaceAllStr("/","_").replaceAllStr("=","");
}

function urlsafeDecode(e) {
  e =  e.replaceAllStr("-","+").replaceAllStr("_","/");
  var mob = e.length%4;
  if(mob>0){
    e += "====".substr(mob);
  }
  return e;
}

//长字符串加密
JSEncrypt.prototype.encryptLong = function (string) {
  var k = this.getKey();
  var MAX_ENCRYPT_BLOCK = 117;

  try {
    var lt = "";
    var ct = "";
    //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    //1.获取字符串截取点
    var bytes = new Array();
    bytes.push(0);
    var byteNo = 0;
    var len, c;
    len = string.length;

    var temp = 0;
    for (var i = 0; i < len; i++) {
      c = string.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        byteNo += 4;
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        byteNo += 3;
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        byteNo += 2;
      } else {
        byteNo += 1;
      }
      if ((byteNo % MAX_ENCRYPT_BLOCK) >= 114 || (byteNo % MAX_ENCRYPT_BLOCK) == 0) {
        if (byteNo - temp >= 114) {
          bytes.push(i);
          temp = byteNo;
        }
      }
    }

    //2.截取字符串并分段加密
    if (bytes.length > 1) {
      for (var i = 0; i < bytes.length - 1; i++) {
        var str;
        if (i == 0) {
          str = string.substring(0, bytes[i + 1] + 1);
        } else {
          str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
        }
        var t1 = k.encrypt(str);
        ct += t1;
      }
      if (bytes[bytes.length - 1] != string.length - 1) {
        var lastStr = string.substring(bytes[bytes.length - 1] + 1);
        ct += k.encrypt(lastStr);
      }
      return hex2b64(ct);
    }
    var t = k.encrypt(string);
    var y = hex2b64(t);
    return y;
  } catch (ex) {
    return false;
  }
};

//长字符串解密
JSEncrypt.prototype.decryptLong = function (string) {
  var k = this.getKey();
  var MAX_DECRYPT_BLOCK = 128;
  try {
    var ct = "";
    var t1;
    var bufTmp;
    var hexTmp;
    var str = b64tohex(string);
    var buf = hexToBytes(str);
    var inputLen = buf.length;
    //开始长度
    var offSet = 0;
    //结束长度
    var endOffSet = MAX_DECRYPT_BLOCK;

    //分段加密
    while (inputLen - offSet > 0) {
      if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
        bufTmp = buf.slice(offSet, endOffSet);
        hexTmp = bytesToHex(bufTmp);
        t1 = k.decrypt(hexTmp);
        ct += t1;
      } else {
        bufTmp = buf.slice(offSet, inputLen);
        hexTmp = bytesToHex(bufTmp);
        t1 = k.decrypt(hexTmp);
        ct += t1;
      }
      offSet += MAX_DECRYPT_BLOCK;
      endOffSet += MAX_DECRYPT_BLOCK;
    }
    return ct;
  } catch (ex) {
    return false;
  }
};

var PUBLIC_KEY =  "-----BEGIN PUBLIC KEY-----　MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6BSDlbRplhMMNZBKHX4xe8AwE" +
  "SpzHVfAcHHsX9FFSMuF91W3cxgT/g5n+qlLLFzCE3hWG/yX5NMAxR4mS3MlhyXKw" +
  "ko3tK9Ua691afod1lxORR3IaZ8nV7v5Bv8y4JDe4E3/f/bQIGzroWiJ0sXTcO41G" +
  "qvOw3G9leClSvjVnSwIDAQAB　-----END PUBLIC KEY-----";
var PRIVATE_KEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALoFIOVtGmWEww1k" +
  "EodfjF7wDARKnMdV8Bwcexf0UVIy4X3VbdzGBP+Dmf6qUssXMITeFYb/Jfk0wDFH" +
  "iZLcyWHJcrCSje0r1Rrr3Vp+h3WXE5FHchpnydXu/kG/zLgkN7gTf9/9tAgbOuha" +
  "InSxdNw7jUaq87Dcb2V4KVK+NWdLAgMBAAECgYBqCihhgJtOiarjBEvnrZkIOZCw" +
  "FZRfsWaJr9afph+BWw3dvH+/HYaV3YA4gwFlUlfPNgZRiTstX1u7+8q51HBa+08h" +
  "jPE8Q4GhoUY+sQ9MB8NXA6SWHNPPfMOYIeKEtKmNBdgIbtuhnob3o18rJNFIY+qC" +
  "i8djf4om93+AChmo6QJBAO31hd9qem7BnHXsxiMwS+iHlRjW9KxXva2zf+BNURSR" +
  "Z19cePReHJGE4v1C731MZlygTB5zKChQ8uZ3JLKJeX8CQQDIH4k/xbuhMb8dMdzl" +
  "AYN/CU+MgfWjlgbYjxOnTaLcbs5Mlz9v3/5I/FwqxPvzGuCjHkyh08oFfnQXvzdj" +
  "YMA1AkEApjgyOnzzZviBZXJueVgcPiKvSHmm0dg8W+Cd+72mXHqxPdCngPNYe2Ha" +
  "+VRPXDQI8LzcTwzbyUW6Vrh0/u2+2wJBAK1rZqx01VuimFLcWue4oBL+JolENXFF" +
  "GTmhAw8AIBmVjACjML3qBZmJ1vTZLtxEdlXkc9PojDCmnEPX2E+uD+ECQF2eX4EY" +
  "X95HDzQ4cm1kGQudjgfH1gZ+30DIindIHXNAOFpYeAUD7yUQP5tZO8nG38gybPJg" +
  "FoadlsSMIQIpksM=";

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwpe5DJyMaFu+O8N+6yxnNUNEh' +
  'ZL9tDoTEgrcv25ahP4uHsswJ3g7t2lMsL/MubVrVCTuDWpwTDGh4hYjHJV9cz+mF' +
  'Y9Ye8taJE9jzdbbpWks1kwTaTePfi7GULhUQhMwcVREtc7Q8qer0kyE2fh7RHBmK' +
  'O6G/AsUa/DWe8FZnEwIDAQAB'

const privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALCl7kMnIxoW747w' +
  '37rLGc1Q0SFkv20OhMSCty/blqE/i4eyzAneDu3aUywv8y5tWtUJO4NanBMMaHiF' +
  'iMclX1zP6YVj1h7y1okT2PN1tulaSzWTBNpN49+LsZQuFRCEzBxVES1ztDyp6vST' +
  'ITZ+HtEcGYo7ob8CxRr8NZ7wVmcTAgMBAAECgYBC+7icaDPMSdQvHLGJsEgpbbLP' +
  'edeIsA+yQGrcT+UPYfwzyZ3LRBPfJ4GQaOJKwZbG34hcp7g1FOhsgx45fbdp5e95' +
  '0wm70PzdzJwm6Ykx1SYMCxYbAt5iPabESmocfLJ+cg7osxP9y4on7oxX/QUjdwob' +
  'g+vzb4+N7yMOkKI5aQJBANme/oBmyNKf1uyBCYX7twHVbYd+9caLI7KA6LGgtNls' +
  'cafcGbQXF76oXEl6K6kDfTOtnuuoYrTrYZ1h/1GxgkcCQQDPzR7EVElVmUhP7nFX' +
  'WhTj6++8I5Cafir9Y58FBBgv3DLlhXtmue14rZ8cOxak945rAaeR8x/hkpZ+ObP/' +
  'we7VAkEAnDhcrkQaychgeuqusXXfC/vwYqIrQNnFSHDtmgWpjaMhe8Su1u705rLp' +
  'fP2stemBSUXLnZQFN6b5LgeZR0XMJQJBAKSveHm6HuBy+Yc3fqXu42161+Uv/nMi' +
  'GKn2oNlV1GFhzwht0E2qfpRMbTPvdFPLShhuGEKn/xVDmndw/cFtDf0CQCMWvlQn' +
  'DLrtLSqqDN4QrLUmts33VVV4gPHbs70wii6S1XDhtKvdedwEFCAKYx8RgwODGw0J' +
  'aY5asJOWxweZ8Nk='


const RSALONG = {
  encrypt(data) {
    //公钥加密
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const result = encrypt.encryptLong(data);
    return urlsafeEncode(result);
  },
  decrypt(data) {
    //私钥解密
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    var result = urlsafeDecode(data);
    return decrypt.decryptLong(result);
  }
}
export default RSALONG;
