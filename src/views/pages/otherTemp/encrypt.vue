<template>
  <div class="encrypt">
    <div class="box">
      <div class="title">加密</div>
      <div class="warp">
        <el-form :model="encryptForm" :rules="rules" ref="encryptForm" label-width="130px" class="ruleForm">
          <el-form-item label="JSON字符串" prop="JSONstr">
            <el-input type="textarea" :rows="5" v-model="encryptForm.JSONstr"></el-input>
          </el-form-item>
          <el-form-item label="密钥" prop="aesKey">
            <el-input v-model="encryptForm.aesKey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="startEncrypt">开始加密</el-button>
          </el-form-item>
        </el-form>
        <div class="result">
          <div class="opt">
            <span class="r20">输出结果</span>
            <el-button class="r20" type="primary" @click="clearResult(1)">清空</el-button>
            <el-button class="r20" type="primary" @click="copyResult(1)">复制结果</el-button>
          </div>
          <div class="res-box">{{ encryptForm.result }}</div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="title">解密</div>
      <div class="warp">
        <el-form :model="decryptForm" :rules="rules2" ref="decryptForm" label-width="130px" class="ruleForm">
          <el-form-item label="字符串" prop="resultStr">
            <el-input type="textarea" :rows="5" v-model="decryptForm.resultStr"></el-input>
          </el-form-item>
          <el-form-item label="密钥" prop="aesKey">
            <el-input v-model="decryptForm.aesKey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="startDecrypt">开始解密</el-button>
          </el-form-item>
        </el-form>
        <div class="result">
          <div class="opt">
            <span class="r20">输出结果</span>
            <el-button class="r20" type="primary" @click="clearResult(2)">清空</el-button>
            <el-button class="r20" type="primary" @click="copyResult(2)">复制结果</el-button>
          </div>
          <div class="res-box">{{ decryptForm.result }}</div>
        </div>
      </div>
    </div>
    <div style="height: 30px;"></div>
    <div>
      <el-button @click="encryptRsa">RSA加密</el-button>
      <el-button @click="encryptRsa2">RSA加密 - 2</el-button>
      <el-button @click="encryptRsa3">RSA加密 - 3</el-button>
    </div>
  </div>
</template>

<script>
import {encryptAndDecode, rsaEncrypt} from "../../../utils/encryp";
import CommonUtil from "../../../utils/commonUtil";
import '@/utils/rsaSelf.js';
import RSASELF from '@/utils/rsaSelf.js'
import RSA from '@/utils/rsa.js';
import RSALONG from "@/utils/rsaLong";
import NodeRsaTXT from '@/utils/nodeRsa.js'

export default {
  name: 'encrypt',
  data(){
    return {
      encryptForm: {
        aesKey: 'd7b85f6e214abcda',
        JSONstr: '',
        result: ''
      },
      decryptForm: {
        aesKey: 'd7b85f6e214abcda',
        resultStr: '',
        result: ''
      },
      rules: {
        aesKey: [
          { required: true, message: '请输入密钥', trigger: 'blur' }
        ],
        JSONstr: [
          { required: true, message: '请填写JSON字符串', trigger: 'blur' }
        ],
      },
      rules2: {
        aesKey: [
          { required: true, message: '请输入密钥', trigger: 'blur' }
        ],
        resultStr: [
          { required: true, message: '请填写需要解密的字符串', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.getKey();

  },
  methods: {
    getKey: function() {
      var n = 16;
      var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var res = "";
      for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
      }
      this.encryptForm.aesKey = res;
      this.decryptForm.aesKey = res;
      return res;
    },
    // 加密提交
    startEncrypt() {
      this.$refs.encryptForm.validate((valid) => {
        if (valid) {
          this.encryptForm.result = encryptAndDecode.encrypt(this.encryptForm.aesKey, this.encryptForm.JSONstr);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 复制结果
    copyResult(type) {
      let dom = document.createElement("input");
      if (type === 1) {
        if (this.encryptForm.result) {
          dom.value = this.encryptForm.result;
        } else {
          this.$message.error('结果为空');
        }
      } else {
        if (this.decryptForm.result) {
          dom.value = this.decryptForm.result;
        } else {
          this.$message.error('结果为空');
        }
      }
      document.body.appendChild(dom);
      dom.select();
      document.execCommand("Copy");
      dom.remove()
    },
    // 开始解密
    startDecrypt() {
      this.$refs.decryptForm.validate((valid) => {
        if (valid) {
          this.decryptForm.result = encryptAndDecode.decrypt(this.decryptForm.aesKey, this.decryptForm.resultStr);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    clearResult(type) {
      if (type === 1) {
        this.encryptForm.result = '';
      } else {
        this.decryptForm.result = '';
      }
    },
    encryptRsa() {
      debugger
      console.log(CommonUtil.getUUID());
      const data = {
        "appFile": "['16111344759811', 'downloadUrl']",
        "appFilename": "",
        "appName": "和装维",
        "createdTime": "1603942468144",
        "createdUser": "张三3",
        "deleted": "1",
        "description": "<p>1，扫描对焦优化</p>\n<p>2，提现UI优化</p>",
        "deviceType": "2",
        "downloadUrl": "https://117.134.46.37:31021/moses/20210125/10.1.27.0_IRS-debug-v1.1.3-show.apk",
        "forceUpgrade": "1",
        "id": "105115973592350728",
        "mainVersion": "",
        "released": 123,
        "updatedTime": "1603942468144",
        "updatedUser": "张三3",
        "version": "1.0.5"
      }
      const param = {
        password: '123456',
        username: 'chenliqiang',
        nickname: '测试加密数据',
        rememberMe: true
      }
      console.log('加密前', param);
      //const str = RSA.encrypt(JSON.stringify(param));
      //const str = RSALONG.encrypt(JSON.stringify(param))
      //const str = RSALONG.encrypt('data:image/png;base64,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')
      const str = RSA.rsaPublicData('测试加密数据');
      // console.log('加密后', str);

      //const str = 'jSI5I72QWktdL2TYcs7xXrj5eI9tX7EVvoSbpTRRO2UorqRVC55AWzyxKN3GpfKXCWyZaYnbh6-uR1OOihcBlyuvwODk-af5CEASVJdcguL9L-DvaJh_8JRE-l2SXMHrnS8E8Khdl__aZ7kkhUpu7v6WsmV-Y2eCdOA7NEIP2xOYOBCqRw-JeKGzpykyNa-YfNfKOm-d6lhaPFwQflEoIjNZUURkNmKmfuFXNPEqjB4hHWZmbK_Sg2ilHnHqIaAXc968Ri6wEMz67hS0Sea3hBIeGmOSQL1Iiq_iV2b94AplyrDvya1-HbgRrY0Z3g-VR34s_N3n_k78spOtT7Xi0yJPxbwsXFtZ_cF_FplbdFldo-3I5yCz0fkMYeMdNc4x4a9og3ImhTQa7rwUOV5Rkg864LPWNUhLTOuOMIPgMsA0T3xPK24EB-BY8IGDJ-sY6HB-vUXmePDZBYHhFziS4hq8HPmnzjClMAe5EWP6Xd-XQGsC8CrLCkos4VhIWTV9QbGo9GceJ2dKBYS8Q-ZfUsjJHtSx4M-6nsuao-VqJUq6-alc83mKgEslGx68HgvQA_FDgy1pj5P4zlQ7etfgBNdeSQLEUf-_2SzG12FOT9YN2JkRgBOpU0fhFp4cls_EVDM0rSKNkQD8q6O_TjUZ7n54K2lji02oHO1LTVH7Hr0yLGapwD-Dq8Js45r8RUctbYvnlfcSdNp7SvCyOnm2K9tMuaStDYTJw7QSCMZzA_P4zFEjQ0xJFnydAzmzhIzKCFWFOFSbJhBKnIr4l9ivcD143m2abP-oTm_Ul5khJhjo-_98O2PAJe-7Kq8iScoNmOtw3xcXMbJ3OLLABk2knIbzhTbLo5bRfVCuVqx0Xhu5ZYVAB2mubV8vJGCsgqVPa76T_dbhNlNnaPsIQuqPNQXN4JBhULj9JXD9ZbLCF-qxIjzppMlINTh1RKJmpE6Qzy2YReqRp7abTzfa4gFpJrp40rlZK6p2XAqaenmgaWW12JP0PYKkKayv84Q_V70xUaIv3EjIUFqk2nDhb-wAYS4y9YnMYPJQ7mLbE3bsyXE6DAFuQovHSPA8SbDBfYqiNIp4tbBOREb5bOI9N3Rq3283H0snRRukpjk5I-jsVy88awacAM_nT7UO-hdV-FB1TMsaxV8PjecgpXlMKvEMqsq3Q9RGBBpufYYO13O87j0uBu6hxOM6qRbwtfSQn-lVREW9PFpN9WqIhprSed8gz4_xz2vlEfdM-UG8NjH61DDmW0VDBWNqZIpPO_cx2QnR9vzecLe7bH4uYCXR1mGH7pCy0O7mDW5nAISBf1TIu3Oyev-1EqxL96esbSp4Yueh0VmbwxTfatzj2aSQp6GzfwzzxFaVhb_ge5UWfB3P3QtsDvAOoYoeRKKxfVrz391pvIpc8O0cpidoC8CJ7KKjHIuUCnpV7pGTl-OTwNfsCWV2oZs5g5OaT3_OSW83BewDnGXUw1l91xyih3jD_EML1NGKUsqLaZHS_hBfbee_COUFEALV-WinlSNQBI3NB6M3b92vqrYJpNL7cu78Yo4nTAuoR4G9ByaDS-9tBNI4lL1aDKDEGH8hyxrAzd0KYT6YR11JZUGJ66AxYC4K60Iij9IsFaSfEFyKAOze122XpsHJgTZ3kuWqChAFnh8-JLZN2NE5mikU347jQ_zBns_NBd3sB3xglPAs2DrUyJc-BJQ1_-IoWqsNTk9vEhknhvsBf0r6_dX_LQ4bSAdqojJ94JJzyAw6ZAJd5NtQrOUyBinqjYKnC4RniMy4veWtmSJbnfwmRtgvKaTm5G3WhM5FfEm07oYrsNGZlw145CsL9-bLIGUOEhsblt2ndVbpuME4znCGVu44W_q2TGPkyQINYoRlVu0LYNwg_26uActrAMeHEwoHcep2aJaXOm_yUjvekCjXqP2H6Pl00V_CPSJ3AUaZG83J6GrI6Mvg70x9waZzVmn7W8moStdxn656riouUS4YbTXjZUA4nz3qUAoRT6YhTNXBWb9KqC7v2cdRRzBOTrunkVMcd_FNX5_RZ6KLac84cSsMCVC0zh6cnUxE9YMaF0XYpV1JBAeELPHRfgg8tckjC39eK5P_CqUXbGIWbknKET2twpQD-MabFnBvOZcij8ZXkI2U_s6zUyB6ktShs2HTiYYF5jAfeMrXw2IspB-QrXl2-KPWkFYbwCs_PmfwI2HAOUlkooaSndWeY-J-eaLC8gVc0FXsKKEfMtwv4iC5cVWP_bz5_8Vs_ozhI8sFDwxDompe0j5YpUHtgKfRcl5-YCl56Uu19NyR6xjkbMhw5KwjE9rxg8cBM3SoJqeXROiW8uQuyXXUY2G08bjQdoRte_rTy3sQEMrK7QnOWeipqHS0v0ETRULJazOBMk9NhKcvxYcu5T_kDrsacsFxhCgx-zae6ZPMKtQbraBXtb0_9d8dab11onClC9TBApMIyGJW7S-A9dOBw6LNKM3hT0tNtgzMZTBPPfmw3nqPgnFrQ61Ew5yWXxEhQUPK7ZmYObe12-KJWrRmHORtvWL3wGnDGi8MT7dDJLZLPDfgAY1Nbmo-DcggEn4x2meNDCqdBCmv1--83hQjldgED-9Aipky1sFF6OWaBn4JDjyvyBOXiyYUjz3tt_Q5ppPSgWC0bAtI4iZ00Hyv2Wi_7jek27HhXRffjb92vh75M2KSxQ67ZS35g7JBA8YDKiKaTavIsxHEd9oejFgrQA2F28gabqDa-qfQg_dOf6ZY6pwPq7Tl9JxTGjHYk6qCMBTn74205TZ3g-pIN2S8qgzj-z__x3RUrLpnc9H85p-i0ypYVfDHv3skzztxyjd5zezROfPz8hB5gQPmFUhX-6fyCGoyxmxU91XCF5_hQeBFfL9z121WByR3ZEaXa9YB2nDxxSmH8mNibe1JasJXPOKb_M4NoIghpdwFOfZxGS5j37kUb94CnSaEjdHBGNy55W3nxnw9Me_B9s7K54QbXp1vjb9D0MUoLsURT_eLNudt_me69XQRnkOfzZoiNsT0oiHBjoowaNkUmktnSRIpmTFGhNdTGihC7RLPzcZ67H_jrcr-LjRYvkumeb1amjZLyNLKTNbKrzS0YPwPagUZvLL9WkGZV2XCzzeZINvoaMem3Bi1wM8PliQhUEhIHHPF57_WTU1eKtUYM0jX_5MQSLeAJukGOWF2s35ZpUN4vYfblR2mHLzWXFuvs-mrUoEWidQgpvPWTnuTswdFRZ700m_dVeULS3WZPdFJgFKuH6JIu6qwN0f8jLj1Y3Px9LPevbg1B3U6S-m24vQOvdVKy1iizcximSjOsEbeWQE8GQpcl9XchLFDCsVIqJCwYCkbfTaqEzJORSwSbLwd-1xJrzsPBlyAYwU0j2Efy-wPMswo2QchNHq5MgdO49VurPSKX_uK0D6RFuna31t-ZgSLH-546dIO_WFI2of6m4KKnKzO-NXMxBWqg6HZTTNTnO8TlsG_iBzXurLdo6e9BZzp3w5Le8rp6YoBchqyfYw5vIQ2k8b1pog8sN-5KcukqtBjGrmBRGZI77RR0aqWOC9LuXSlttbbdLGksy9Q5WieGYmoOMXwoXf3Wbejm-FRXCVFFT0XDCovwBSoXJiFMMwGhc1uozR0sJdwtsCIv2fo1exdRoBJgwl6jgMcWCoJ5p1xOqPMwCn7BrU7-ktoh41yvlcVW1vcAntRfIGm9cE-Ya5QWLSwcqifJ_tu3X6NQbfMMFXjkxwi1yTzxNX2469ns4prTmylLXdAr1F8qDQ15WLVHZiiGvgU8ckwEvl6TeWaT1fDkmcjuL-wQWF-Mm7QdtvjLGJup_W70699_7F466R-OGerAbN_E4UB9MBeA_YxLAFlZV-U0hBB0eirqdWqFhpEGGHaZf3FKwlh7UKCx8l2Znh2A4JQk3E38uH7bX8IDIGYbZl8v4pt3ZxM_V4KxYwQyO1UwIC8dcogn5y1VWuth5ABimZ0U_LxMVWjfQuJ4GYs93D9SC_zMT6DqoIlPLd8UawhZBYl1d-8qa593ieAhuMUQt9QR51z2KTFEG2plCpWt1Kts3f8ytbgj-1-tW_3jffuBQxgCcoDgouXwttHhrM-i4Ho5EoMdvX0mikv_wbALguBbxt-2QUH3_t1x_evDnwkXuTAUpNzFKQvE5WRD19Ut1tQhIRVQbz-o-ZdeDCQ8ZQM0DoQy_4vio5DJTFguph-CaUmBXAxSxv5JK1E5a_02xwgJtCekxhpErLh9TDSMioVnvs-2NgEWdvw0N3Z3C53YV7L14yIAjgE5ZmUyDxw3oRlCv_YpP4Ki3fVlP4ecq9MDmcZNVvY2UYbeIwAbC_aGflWC8uw_69sc9aMoenoBOJ4G1vpK4t8deQLdiY0H3VtnNGbW7O8zEIsatNwwVMmX9SCm8QuddfFMSqmWyO63ylQlllh0FHP07-MbKQ6Soa7siagXpK0rJ1dOvmNSz6DHnfTUgju8d9Mt5wYKCfZGk0AS0pEWlpx2Zk6nyvKTaNteFTgnmHtiPDnqHL_FxJvsdCpTK9JzZvsPMuv1ryiaQva5V9hi3QnkidmOH33qAf_FqxXd2beFpVWCiPj-0yRIlYxtkd5LV_VR5UTZsA4BCNCYL5NTlsExlCq9RvnR7nztCnkg916ML6xAIc2TcmN4KQBFNc9HgN4RG_CVi-FjYEriN7qq5reqmF92-wa6KnwAIyblNmZPOiI-nMFvo4jGom89gOlcN1k5FikWCAwJaxDFuTtKRadf1bL8A14jScfS1vT4j5rxybn5kSuIzSYA7AcQo2wpTzl8qjR2Fn8MrMIp6fI_1SiyMOm3vcSlJ1NMmxwA7hWm0X31mCSOsv6Kaa7bD8m9DCklT8WUH_XjxTVm09A_vwpvn7nmBdUvbCdYx5HhUs5WAXomhPj-EyrZta6mFUa4kUYMV2HH58YEpPrU-1LX6wS3Jxlpmt8UASeQAzun1beiBYPt2bJLMBZfqdNMtxevBP9wk3BYaT3F4fPw95ioub_kKf99ccF_wg08gII-86Z-vV8cT_VuFy7k-CPJ4BedcX1W5X8NiBzMRPpb0mlg1giIO8rSejcedLdCJ9mNlLAuCAwl-LrjzmCVo80qCgDbIpT043jTOH3bEzsudA9HAWBw4IUuQz_2EcBhHEBhpPRwB3HEOhlzrZKCyNW64VEaOOdeqbzR6YjNfWjhpNx2JWj4XjttUvng-SepKQSaXNG4wAhQPVjN_wPQSDgF7Apwb8fV7dS6ijXmiY8ROprjXqOHrr-5B2RzK5WZ9YK6zmpt2Sq5AZbIr-XaIzDtNh34OdcaWUzJH6RSi8mXlIs-sCtqse7m1QDwtX6F8IuY7tq8F6Mj2J8RmEszr5-wZhGxzWgw-gyN_kROBE-9qD7iEbFt_ui4Mc6W4uHLy3pwu3RQjg9kYHZX76TcNGVid4s-xF_xAj2DTfE-QZG9s7YWMctwMyGFxHY2UlNyQkZPFjs1jHj081xR2NkNeCtapBIQbzqGC6peLbsgYhUQrF7khWuiC_Gt2bSS9tgUvVeHKhQPvvcqdxskMd8Zfx8PxOD6qSnqsU3apzGzHJwwj3sw62eViNbf99Ul3RFnrk0Ut5WWFAu_PY-72fNAZfSOd09Nx8tvjLcRZHVTmV3vt6uvUZsnO8YKLZyisev2-_Gd09UiSQRS67-yucLSeyzoRGV8RNpoSbtdmuAHEwM4Pjhi90pTVTDkFqiiBciNQNU34ivCxK48ZJzPpxofiB_SJjGuio9QHA-VQ_LQtzfzbSKVe3_r1jA7pXMHTT2QcCdqeppXq18hlmaDsZ_KO2VFZKqLTXmuqFVxvRhadg8GsSbFdGecvg3l4PaMbU97BArx644IodolDINCP6vmMS0rE9LC96c2EtmNTkmZv8wQQt7KJXvZBDak_POo5tBYuXGuefpEZh0nSvonQunqIpsFfwzoOjItG3_751XVO_HSQ9-BiWMj1drYpmDhYLzbeF8biV0tdYD_HgmO-5qHd-b5H51DHYxyHR4XSPJfwngdyPfBQIi9J8FNshN4IOxPlTqqnctyR2aadOCG9Ag3cTvNTLsVJ0Z5RXpt51StGMmvH0Ey46nmsXuAJThmIYWC_lUUr5-qAs5Rl4mmzlJkwDbvJfzAMQjUzyR5OT5nILc-q3PWHWErP5dyYyQ3uf9d7E1D-aFhWk3Aj6DhrHwtUGIthbtljdjMwU9BLoVorVnGs1mt4hWZOlJP85KtMc0-zKwEPmRh6TpowivDTbkCoRpc1EmiifExuMaEcpcXnRSWYfxJvwAQ0gO8OIXCKUuLWaYt5PirupGSDQM8V-wlsL2Bk7ykPOs6EnK4hRC-Q6Mkl6uV94SDvnmEWEXujMgE5LXfYQu-NXjYm0sTM1_ZSvrXlAFh8xwJVY6XeLdZaMVX_2-BxCO6b8rNl7vtl7Wyzhn_3Qe3lqf1vl6yHlpTObHmdIymjK1Ltj-PXxJIGHKDUqMF1cftnZ5E1e0KlCNQesJvCGfOnwWyQy8E4FGwQVtBf1R3aCSximRky00T4y-LFsBWGMlSIIwCaSRHTdr3jkHFjSEyBC31nHto5iioNkCVLv3fujrMfc0No6rJylB1W4xGmKyo3_W1JFQL3y4kDqx9yt1Q_Zx4bfiH3jPd9YLub_PZnceWeYeDhgzg8I3xqBtd-JEZ4ZHuEy6jOo7340jmOsC60YjrMpL8E9e1oYIzE8Y0JEiSZuNM4kG1BsMm9k6ZVJde1yC9CYCWISBeZyMqjkOIZ5HnpBCZm8kVPXCTfut__IW74mod1JDe4nuXrRTsJGYecQErATj5YK54obD5e7rVtX6uyPqAU0rb63upDqYZ1QfaNEIhoaY2UGWnqriAof_5C6HNG7ZnywSm3pEPRBgkquXqgYGlIduZjg6no0e2QdxS7p3kiOBUrAZySJT_TynEoCStLjOq6mduhXLjr0OiHVuRLCjz2GDWmCHYHHwArPmwIYcpLMjeAkx8pDE-a423zdPQdxLIZpjZf1fI0w0_tfY0HsW6sqpfM5QHhLX1HHLVjtIl1EUayNlPQEYAleyDc3tOwZ_vJc6b7ZiPIGqygt1hsMkNeL1ZCHdpCtdSX3Jxkj64gr8GBjLpk8AxBTiOHFsnvFskD1d5JUxRH47tgLi5r-ezAeGS8-ZB7kw1FeMcvVOtaM5Ehi-VdoaHRNkzgaVqHTOqo0P3ldBHMQTbM-GP_FZAsNGkk7oMwpkosj1vtnF5uUR_V0ZEI_4ZLOYa1DjtCqNWQIsr5fF05tjJwuoZUO6oXXpefHEXc9wKtd1vea09UGmXtDpytZ9Uw15wQA7tAuzfUcyuavnqrv1nlo1rGVAsu4eHO8dhQjX2aAt4POEyZqS6hxR1_ZJbq990g9q2HtRP_aXccdPzJsKKZhQ6NQH1EJO4b7_cK4AwJWg62L_QQt6mZxUAXPI2B8tLqZBSxm3bda8YqnXjlx6VwpDaEKQUqitlYCCc8egCTBmB0HTtCFiqNy9tQRcLH1yjYsLxGMP-CkdanyizqakZi4wy1eltMc4C6zL0Nf7OLH6pvD9MsCOheRr_GrFCp__NyhAojLPoLb05VdpScb8QGd9DDFa-D8TxKgI-IdbOPFTmE3GGBpzhqECrnENO6p42PRFmmQfXiTDZAVToOczCK2PlKTrRL-zpkfMtBqTfiO9Zjp9gVntCWFo7Qo_OyHqQmb_Hw3_ZVnQH717t8Cpk0yQ8hbF0hKU6xcpki67f1A22zIKbfVegysXcY2sOpor1aEduLbWXV6dmNIRq7I-5FBZhLIZLfdX_8OvsxqIQxqLYVpM1ayZCklxApJnA9HrJq945WZrHT7UpwwQj9wilfoTMA479487WEch8DNCm20jbI2hlPaEYjKUxwVFQ8PKzroOQlVb8iD2TF0q2L1QO4BCt3hGyjL0UndGPxIY52_XxBrwDtZBLB0btCUmMvxoGOmIy8qkkevoFNbf8VUqbUHSwsyUNM1aOfa3oOz2RW9ZW6EzZh7sMXPfhOqB5YHZP28Et9SG01Rmq25HJa-oPDgwuF6VScGRc4yDHsOBr5vu1NvFTkz_PIMleC5QlV640VpSi6s_mngYgCX1l9q40j5EM2nJqU38F9DjtemzVjdTTF3_aXpE6RC2FwN39D-gJ5aNAxbB9JxKWVSZDUVC7JLmesiPzv6yjaBBJrLISEztBjfNXMXzVFfkSIzCRpu2KBH9RaBQxXb6ZvAoT7EySZuViYo4UzDPrH3xD1OVMLY1GuqHHOLVzIX5YpyAl3vN512uoJQe08m9n-MdhAXXICkbYpUXP9eOiP5gEgwm408wXROkDtBecU1DIrSMLlqx2Tt6veqhANvCZSsphGQdR9m73aqp-MSUBeF36_-y9MzCRGC7Zy2V1R_E4-tKVxTtDPMEjsMuf0oiye4bTdGWZ7Ll7qw0uBoouWOC49K8DADBZedLT4JIJV0wAagVtT8ohbMACyECYXqeZu_4lluQ-Eq2JwadvIOawNd6bTL7vFoepKtXBswwmxPzrkV4Fzmml3fAWksB5gm8biUOUF5Om9rQD_vEJ-QG5Tl6bcBZ5oiyiqHZEcFAyRSpXhz8vR2IGGvumiq1kxayIPHFV7_7VEYUxEsy_5pBNsbih4dE-eAZxd7TnDI8arE7D1Q2Zo8eYUWVUrIxDEpbvSp763jmztXTI-ya33FRTMdsTh2p46M3BjzHE5xsTmsh5aRz1sYciQYNW-8f49fwC6A3BAnJMglOlhAuMLbC-ac9qK8u0BxIo-i7JbALsvyYCKPQcFlKaFWttETSD_k8QX_Gby7LtuXlAIebYroADybnrMoPXfRA7cn8g0S6NARQAZd1X_T-rjTSwR_CyYhuRVYXqO215E4VWtaOP3iiZF6fS25aToqOn3Lw18ZAN4BxUiXrnPe4Vo1gR0ynX7buouzZKqnbYMgWr2zN2OG0uJFqdAf5fuBLkiL2arfdrM0nQneTdhe5-yfVt86d8kCIyJbSuwEH7yCSf8UR5jwqsHzsITimQqdcc90NA-thiAtN44OtY_iALfwjGOutHRij69unx4kAUOys3XHinw-VI7c7lPwhRDWaM1xDgBdsGtLHERPZuR9RQA63gyvsQWXh4FVazgRXrOFxToFrq7xRjdizwOmmPam6kLupA220ODekTtzz6Fg7PnxEB3jgZ0rbAiguIoafyZrDNAx4wzZavbCpPTPTQO-9yPjYintlfPDIhl6jf517IftY5S_IK0Fo-lBcihgKfgisP-Az6klv437D4zrqBqcaFksYfZk6Su-vf7z_uHs8gIG0r0P4NbGLGEf9iAIAxRvRHIxOXq5zCQbJs4-Bik9vksTImgIA7HXKOrYfVwCvppDNutje78SfUNLAXcYPxQWAj0-2HW1rgyLSXIhj1RK-egDf3EAt7dTdyxGAjHs9gYDOPnLwuw7YN2y04BQ5_EIMg-7DLCVY8mMUf6LIz4p6QJ-RCgrsFFQO3bCSuFnpnW3BSi-eTCCgaLu_-dyhuBY9MoSyGB7flf8oNRlzmqhXQbFsDWRDRgstx2U-U9yhwtRldrW_T560SLM4kIdtU4sUtNi1gi_oRhZpW7F3plSYJHoaubNjcMGJWVeh0XXrCI14o7lh3LXki9pyHS14cOB2Yvhn_-i2mbI3F1awd6bM7zEU0Lk7koqK4WRzgy9Dv5sOrU8P36h5rhUZI67OrdArOlZ9368u7mVekOv0UruvhMPFSeZYK46eIoYOCCBL0Tz_T3zNeEPRmmYxVKg1dfphXC424FcbX0Anbb56Pun6ndcKp6NRy2O2VDMlqXC3YJ3l7sevWbpgvExr7sntv7gKVu5NfZFSKat7MC3ZQS8NHc9WZS_6ld6qWKKXmNRtUX4sVC8N-tHTlvnTDciWHdr0jQ3ZtalJ2kgymRMONlBej5J35DOhzTmXRP9YJR_zBu98_C65wfuVgMbanuUBIRvm283dQWux1aJNN36Y50mvAiJ2wYUcNBQ2iW14mznM42NWSSk3xHhKK7HChmc1wHp_45lskKk3qPVlV8NFOHT4H_OfBw6IDkzn0B6yDkHn50PB6iySTS_eZLhUJAvXg21PyFB6zpd1b5day2eP_oihApDZQeuDUDHqxtAAs1jPWvAGKCNqS5YUr_TxoOEJPq_zPs-brZLpF5vb7KGfvlLZEx2dj9wRKQy_iUeP7lifN2p7uXvLP2-I3fRwIDxOmHPLvSAxlkWdrbkCEH-pKx9ZON8GbTTbHRmf0YjCUg5byc3hhXY0S5DzDeeRKQSCTSD9UvP8ZTdvKq1SIer5JtjRf5hfwpMuHf4Eq7Nm-pZAvvBZDa4OBrfBSAyH9NWp8eLRnCEOhf4N7od1tY28DUuJCqoQKNIF-gDHQyNVuNfdermNBTroS3Kcx3oeoZ80cBrLP6n2t84seN5HHyWN22EN9GlReersxDF1hn2hTZ5qe-9jtBkXgQ2BlXOj4Sj0WCPBtTA6uX00ndr85Fmwdf-IR9QmFxZcC8SUnCBoEgaEW8hUsiMpB9vo1ws2o3ucoCoLD2d_BMbWABWOA6awc3T5YQsA1Uw4zEwr0renVrMjAGSMDyCJwHdjgi9SXP8o1YicWIbeq_cZTL9cRJq68XFSUfZV7y1chHyJuQFlde8ECkhnmIToiy61llBfgbwdrKR2WUNJrYHnt3Q6arPfJ9hPHd-OgwuRCZUeQA-it2-NJBN16nIKsJ6DUAUn2cefGQedN3TyYrtFrxIvLGRwhjq6UA6lDeCVbZM5o_LQg4fziwCCxLH80sPHkyw7oa1ZjQgAUdBXJRdRMhX7o1Ur0ef13r3R6SbLP7eFkVzUInz0pC3rYn-mn9jaExyPmwk4dY_0_NGQXwC4YbnLgy_Xmv8OwJ7S_wMBqga1uOHg0jzX-2EKjCzoIIx-6i8ZfEZ9YwcdUbJb2NtKBQqhIcRVlWyQ_0bsYjaXxqq1CsfrvH_eXptFqd8rYyDG3QrSQyjdwdJhQNDPiu6ZdyEURoTRXVh0_u0oH8AWqMfqHEb12jjA6nh2jAI3ogZMMPNq1YdUcmv90RcJyG8-VCDUFr25pc4jLPB-LoXj6tOxKZHiKtZQf0ZkYArson3yMPWhJfK-wSENef4ApEWCJHVT1JJu0_0QUgfARGwTuEOnDUBU83SW19eYPc1-8rOMQU9WE4tk0WcGylu3T6djWtXGZEUnakCkw7woOgL90pDRn89R_Kq-_-i__AIY5aTd9uYfgzTteNO33X-VZSb0EmeZDnqWClKIpX6dAIH0ValxxTc1sG031_0dMQ16NZ6vD5PPVli-p0gCiBOakrltKQ8AHnhtvAK8P5Iu8P_xG7dEt70iTwu_tEe_a8-c1MEG2KuGNQCGvuMrlCqzSq1lyAbgTOtqYHCTtDzO51fJuWCjkMUi_-_MCr3VrCCsnTuo5FH8sKk2XItz7ad7hSoTh30BjkyFecZzdFvW2h8HyyNMA-4YCQRFH6lny5naY1CmDQALSujL5Y62PBVqhpd4q5PHo7HZSsHdWQrpPm350RbeM2uJjiDeSY22QdHsBRHs_UXlYoWIj_jFETqQJP1XhW4oiWhixQoE16iUrsxVh5nFa-2ITDr6PGCyutLI6R5dLvW_bGSnZ64E_I82ICcZ3L3yF0cEA7ITtpL6odgdynJyjObaJgFyvSKj25M7XNBBMjpYC4qK375lAKA6LyuK1gKyw7Jq3I1fK9dn0bfo3jlmoXCgdialr0kOmSPGhYOqN2zK9TZwYjaz2gaQBYPL6-mouA3lgKM9yGiszY8psGm5chgc9JD0TZeRdPzd2PVxiKuN3saAOeT06pvoJlGSXgSg-vPcOJGSiaw7GnLjVBUcr_x6XMB4MQ6HSRDj-a_44dQxRZi5XobjMhcF3FXuzinK7eWXttpxgXx5zdnOevkqJxne-HGlLkydA52JJTly6vOVNXtFfX1alsZvJPJ5VrRLkiAwITzwbjGoxvUsN79CST-sKhwb-2lTHOnUiLNeHlKvIB0InyhjF8OKnF0tS-V4Oqv2suI0G0xx_PgXQVM36HwAlZfmqIUUbAENJ1MNW_ynM8cPaa3xDf3GpvuL6gC_7NkZT2dijyHyNy5KiPxJUUplcyBca4rwLZPTR31VsgRupNBKNpe4AucT8mGd1sCDysqSXmgT027lS0a4wMm5rzJYew7emWgBctJ2PLFFQcxaHqW85A9e0gYFf-JNSvxEzeMWTh840Mw8RiVYh7haOR5pBXTQX_FiG-FzTkEB-h8FebnnCN0qC0wxkf-6kUkPU8OZnaa_cpUsR3_DDGhZWDQoqljtlDJdhDqZY9iIn157kANRgivZdQCaaeT1FmXdRRZxFenizZx9v46L6KbxI3MUGjnHXaD8qFDaQ2en_IllAxWc_Ons2YceqlpJyNHhFNUBnSeRtcGElvK34YZoHrFON6wgvOGGmRbZM7w-MxXUhFTF17cH9rjrIEttmzki4bRTpVWFnaqG84vDwuHHVXsmxcWxslESZ-xnUDayZAbdGXTRN1QAwxtk-GwLVASzFJjwCAdVF6PXTZAW8q6iUesA3rnicIEEU6hcyDS0fpVAP5HUNh-5Fupni2OOEJlzjOgRt8WdYptLM5pwFY8SjvJe1GwzeB1TesV5vZ4BRzVtFcdHG2oxMJMV7PaAkaGfyQtWtICAg73p9Un5L0gmqVOjVzXSSfxxKULZGZwtRwLE3M4gTJ3cs0mO5l6dfUYy2rIziG0_wUUQozBC8n_P2_uow6lpSL1nFRbcXw0f83pPlB_oURmzZuua5GoUmUQ831ZazJzOLrD7CpaLapwrNPahSghJCsg-P8587Q6TZo69nww6EDi5CCXVkPXncPxZrwjNafp4HEKyLH1XYSgn2oG0677x4f2_7O1lXocu3ZMwviTdtvZeOnNhAFWdHT3Ncytx7xb1uRc42tg2lwtn550DC6gfc8kt7KXaNBgGsKTLkNPmJMLRO9I1qLywElFHGHh-_ZweJrTRneyaCPs84VfVQ7O1km9CigH8YKFfzTPegvuqSvOp9xjMY36mFu-HyTN8vnFzi3MkLVt4_idkOHiXORkZy3E3uxoEC02tmY_LMHPFTAagpE4TY8_3l4aV5Gqqk0b9x8W0-367dCLg9OfAhg-h_6TYzllK9E2NuSzpgMW8AM4SzPdAT4vJ_AqkP-zM4YkKb3DkMjaJ2JIRufkZtYIY9fqhokKc9BsJ0Bhlgox0fWJ_ckeSf1FFwwfIeQ50qniMC32N8keUwUgSRd7X0WXcDPG3nJFfsVzizwe9VlT3ksvtycB_tS2XjS3FQgRI0bNFSK70r7DOgQmZG3issqwa59G6bsrtP6wtdwUXpIa_2CtHnX887blFs81YTYl0xJBCtL_OysGQY18fPZ6p8hTful-nFN9Xmz3XLTwLK9GdsuYyE52z8GjLewF4JA6z_p80djc-Ky8HDIhFwCAu0-2aMfVGJHIgU8tfBBONM0Di2OiOMhGeNJwlpYDi1YD9IcVQiKSMCAcmaETz54biP2aaHKwyEn7OSV0XrjCrBZ059ROFJWjs0YK9gGxPY6BvpF47T68BswkDX5ObmQduWGRFUlditucHnftkNu8DjoFnV1CX6zVZ-Riv1zxvdJq8R7bIgTawik8uBwcLW_hxFHlWpD-BScoGSAcmWOY2sCur0BZ3APQCJnNi67TnARRErmHdua3WP8c7XdADwWBThe8kNK4UnQkJXUU0QYHCU9lFSeEowCohwi03FOtzsVfmKLQh4ZOiFoUraAQDUey77WUbdz64NpREr0gmYztKW7LGisVthrW0d5e7YN8FVTQPHGfVW-YPpN8TrKLvKxfhKKMvKSyImaFyKWgow3cNgZdc9G8Uc3v_ey6b789G1RbJsZ3qtCqa9eKlFnm1j4jlixwlsupzLeQ6gH6mmMFrx2DsS3lZWx1bdYP9hFcH8sHQM09WzogXtve9mclpxlzSSWhXiDem57wlWkGmRBONa13qa_TCi2xH5JpZLAtBqoOMix05KSznNUhjeg3EmelBvsXsuiKqoIgAgkrm-xIj3i8XZXabCtwBCQVdRV9qhWGgQAmBSugLMDjgP2KnwAIOxS0XbDlyDgQGZ4YGRrZkzsfBLAEQYjDD_T8l2KxyGvlgGwZ3gwjwZA2hpjTO6yCTt0QzjlIrxl0L725U_W7cAf-Dj5s-HHaY0UCyxxGA9AnKFhwS5FMux9htiA1jCx71dovoPGyFr8qnReBn1iWbMiP0AX6J4XI2jT25vrsFbiuKExM5b3I4xXvVTOCDGLhihF57rLwtt4wp1v_XwUPgCv4nINHtI_LSpcz9kd2Qa6GE68ppPVoRjiVGSF5G2Qq_on3tH4eN9NC1IeauIem_0fN9hkS1XeEZ1GpN_aN0DxSmASCWMX5xFVDnmMOcHwO3PSNkfejlPe0N24-Ii0wAWua8YB2t4oQk2CbbjcbApxZg4EvbeB90kNnzroXibvmpWBFQNAbnthbV3tJOw-GxQyuPEHLWyaLMQ-KojRLBEz2Tmh4kmxAX0F4KCtZ_Kz5sQUfdbDINqgy8NGrSk3khdyTzEibAz-b0_txpOrphWkbGcZzROC9VUc-MvNGxI4I7LxPLXinSGMfvDX5uDQYyqmr90XrXt-ysoa53XX8p51Rf2MPDtKPHKcEmgbgS9PatHv5N9yahLgz1GzVTuoimmu23B80KWlAx9kTc9N8Y8We7usDs-5Kmq-jM2k_AOmEYZ2pu6U5wxPA0cN12dYvV7LMj_FVnXao8wpwV2pdgNxiXm2GtIF70U2ii7UV6HHVXYHLkIq-NSMs-TkuPrGhH2tgDftleAsG-xsFHDdJW8PU6-tPnf0jWGTga'
      //const str2 = RSA.decrypt(str);
      //const str2 = RSALONG.decrypt(str);
      const str2 = RSA.rsaPrivateData(str);
      console.log('解密后', JSON.parse(str2));
    },
    encryptRsa2() {
      const param = {
        "appFile": "['16111344759811', 'downloadUrl']",
        "appFilename": "",
        "appName": "和装维",
        "createdTime": "1603942468144",
        "createdUser": "张三3",
        "deleted": "1",
        "description": "<p>1，扫描对焦优化</p>\n<p>2，提现UI优化</p>",
        "deviceType": "2",
        "downloadUrl": "https://117.134.46.37:31021/moses/20210125/10.1.27.0_IRS-debug-v1.1.3-show.apk",
        "forceUpgrade": "1",
        "id": "105115973592350728",
        "mainVersion": "",
        "released": 123,
        "updatedTime": "1603942468144",
        "updatedUser": "张三3",
        "version": "1.0.5"
      }
      debugger
      var n = 'e1eb7ab440eb2b3413146dc64c66b4047c7d035712201f944dc092d6d65fb6496c27bb6984477e9d4d683cfe28f06e03efdbe28e92134071f5867adb5789d3b076b79bba167a710197ef7f47894f1d3737e4bf5dd33a7db4de67eebbd85f72f7fd681f17f03a30575d613df6ed682fd324e12ec14bd17cc2b667f7536d8db137';
      var e = '20001';
      var d = '9316ca9c034c59a39cec87103d7bfca6931a9d8b1a0cfa228780e2d9a757478a8435562abbea04808bfe5affab4de682ffaeacd1e03f528d1faaffe0411d4649fb2e691f0eea759f609b26e04e86419e4e2c628da8ea54168999d744fd611aa1f3c67ceba4a87a289e251dc1dbdd91448d996971dd6daf5804843fe4d0776091';

      /*var encryptR = RSASELF.encryptRSA(e, n, '测试加密数据');
      console.log('加密后: %o', encryptR);
      var decryptR = RSASELF.decryptRSA(e, n, encryptR);
      console.log('解密后: %o', decryptR);*/

      console.log('------------- 私钥加密，公钥解密 -------------');
      var encryptR = RSASELF.encryptRSA(d, JSON.stringify(param));
      console.log('加密后: %o', encryptR);
      var decryptR = RSASELF.decryptRSA(e, encryptR);
      console.log('解密后: %o', JSON.parse(decryptR));
      /*// 一般客户端不要传私钥，这里是为了测试
      var encrypt = '651e45bc3f35e766cb2397eef719401a88b6177fc1e566f97d24bf22398aad87b00e82a55cd70520172abd7e8d70a452ef22ce0c5a2477ea61f9430fa94c0913753f18781868bdb730fb78b812461884db72a2211ec681780bd7143d7fd0dddff81be42b887cf6fd70c2cad7a845f93bd79563dc60bb94b85610230cbb327c55';

      console.log('------------- 服务端私钥加密，客户端公钥解密 -------------');
      var decryptR = RSASELF.decryptRSA(e, n, encrypt);
      console.log('decryptR: %o', decryptR);

      console.log('------------- 公钥加密，私钥解密 -------------');
      var str = '客户端 - 法拉利_123_abc_《》';
      console.log('str: %o', str);
      var encryptR = RSASELF.encryptRSA(e, n, str);
      console.log('encryptR: %o', encryptR);
      decryptR = RSASELF.decryptRSA(d, n, encryptR);
      console.log('decryptR: %o', decryptR);
      console.log('------------- 私钥加密，公钥解密 -------------');
      console.log('str: %o', str);
      encryptR = RSASELF.encryptRSA(d, n, str);
      console.log('encryptR: %o', encryptR);
      decryptR = RSASELF.decryptRSA(e, n, encryptR);
      console.log('decryptR: %o', decryptR);*/
    },
    encryptRsa3() {
      const param = {
        password: '123456',
        username: 'chenliqiang',
        nickname: '测试加密数据',
        rememberMe: true
      }
      // const str = NodeRsaTXT.simpleEncrypt('测试加密数据')
      const str = NodeRsaTXT.encrypt('测试加密数据')
      console.log('加密后', str)

      // const str2 = NodeRsaTXT.simpleDecrypt(str)
      const str2 = NodeRsaTXT.decrypt(str)
      console.log('解密后', str2)
    }
  }
}
</script>
<style scoped lang="scss">
  .encrypt{
    padding: 20px;
    .box{
      width: 100%;
      border: 1px solid #e8e8e8;
      margin-bottom: 20px;
      line-height: 30px;
      overflow-x: hidden;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
      .title{
        height: 56px;
        line-height: 56px;
        padding-left: 30px;
        font-size: 16px;
      }
      .warp{
        display: flex;
        .ruleForm {
          width: 700px;
        }
        .result{
          width: 50%;
          margin-left: 20px;
        }
        .opt{
          display: flex;
          height: 50px;
          line-height: 50px;
          align-items: center;
        }
        .res-box{
          min-height: 200px;
          height: auto;
        }
      }
    }
    .r20{
      margin-right: 20px;
    }
    .el-button{
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      text-align: center;
    }
  }
</style>
