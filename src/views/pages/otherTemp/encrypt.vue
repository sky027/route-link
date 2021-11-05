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
  </div>
</template>

<script>
import {encryptAndDecode} from "../../../utils/encryp";

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
  methods: {
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
