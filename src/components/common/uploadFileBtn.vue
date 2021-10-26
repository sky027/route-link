<template>
  <div class="uploadBtn">
    <input type="hidden" :value="imgUrl" />
    <div v-if="type === 'btn'">
      <el-button type="primary" icon="el-icon-upload" @click="selectFile">{{ text }}</el-button>
      <div style="display: none">
        <input ref="fileRef" :accept="accept" type="file" @change="changeFile" />
      </div>
    </div>
    <div v-if="type === 'img'" style="display: flex">
      <div class="view-img" v-if="showImage" @mouseenter="isShow = true" @mouseleave="isShow = false">
        <img class="img" width="100%" height="100%" :src="imgUrl" alt="" >
        <span class="over-actions" v-show="isShow">
          <span class="btn item-preview" @click="viewImage">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="btn item-delete" @click="removeImage">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <el-upload
        action="#"
        :multiple="false"
        :file-list="fileList"
        :limit="2"
        ref="loadImg"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="changeLoad"
        class="load-img"
        accept=".jpg, .jpeg, .png"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
          <span class="el-upload-list__item-actions">
            <span  class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog title="查看" :visible.sync="dialogVisible">
        <img width="500px" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UploadBtn',
  props: {
    imgUrl: {
      type: String
    },
    type: {
      type: String,
      default: 'btn'
    },
    text: {
      type: String,
      default: '选择文件'
    },
    accept: {
      type: String,
      default: '.xls, .xlsx, application/msexcel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  },
  data() {
    return {
      file: null,
      dialogVisible: false,
      dialogImageUrl: '',
      disabled: false,
      fileList: [],
      isShow: false,
      showImage: false,
      isSelect: false
    }
  },
  watch: {
    imgUrl(a, b) {
      if (a && !this.isSelect) {
        this.showImage = true
      }
    }
  },
  methods: {
    selectFile() {
      this.$refs.fileRef.click()
    },
    changeFile() {
      this.file = this.$refs.fileRef.files[0]
      this.$emit('changeFile', this.file)
    },
    // 图片
    handleRemove(file) {
      this.$refs.loadImg.uploadFiles = []
      this.$emit('changeFile', null)
    },
    removeImage() {
      this.showImage = false
      this.$emit('changeFile', null)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    viewImage() {
      this.dialogImageUrl = this.imgUrl;
      this.dialogVisible = true;
    },
    changeLoad(file) {
      this.showImage = false
      this.isSelect = true
      const list = this.$refs.loadImg.uploadFiles
      if (list && list.length > 1) {
        this.$refs.loadImg.clearFiles()
        this.$refs.loadImg.uploadFiles.push(file)
      }
      // 调用上传接口，返回文件路径
      const param = new FormData();
      param.append('fileData', file.raw)
      this.$request.post('/aibizhall-birs-manage/file/upload', param, res => {
        if (res.returnCode === '1000' || res.returnCode === 1000) {
          const data = {
            file: list[0],
            filePath: res.dataInfo.url,
            fileId: res.dataInfo.fileId
          }
          this.$emit('changeFile', data)
        } else {
          this.$message.error(res.message)
          this.$refs.loadImg.clearFiles()
          this.$emit('changeFile', null)
        }
      }, true, err => {
        this.$refs.loadImg.clearFiles()
        this.$emit('changeFile', null)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.uploadBtn {
  display: inline-block;
  .load-img {
    /deep/ .el-upload-list.el-upload-list--picture-card{
      display: inline-block;
      height: 148px;
      .el-upload-list__item{
        margin: 0 10px 0 0;
      }
    }
  }
  .view-img{
    width: 146px;
    height: 146px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    position: relative;
    margin-right: 10px;
    .img{
      border-radius: 5px;
    }
    .over-actions{
      width: 100%;
      height: 100%;
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .item-preview{
        color: #FFFFFF;
      }
      .item-delete{
        color: #e63c3c;
      }
      .btn {
        cursor: pointer;
        font-size: 20px;
        margin: 0 15px;
      }
    }
  }
}
</style>
