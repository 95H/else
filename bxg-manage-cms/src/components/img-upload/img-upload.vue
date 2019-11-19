<template>
  <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :data="{ fileType: '1' }"
      :headers="{ 'Authorization' : 'Bearer ' + token }"
      :on-success="handleSuccess"
      :format="['jpg','png','JPG','PNG']"
      :max-size="2048"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      :action="actionUrl"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片预览" v-model="visible">
      <img :src="uploadList[0].url" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import apiConfig from '@/config/apiconfig'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      actionUrl: `${apiConfig.bmfUrl}/attachment/files`,
      imgName: '',
      img: '',
      visible: false,
      uploadList: []
    }
  },

  computed: {
    ...mapState({
      token: state => state.keycloak.keycloak.token
    })
  },
  methods: {
    handleView(name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.uploadList.length = 0
      this.img = ''
    },
    handleSuccess(res, file) {
      if (res.status == 200) {
        let result = JSON.parse(res.result)
        file.name = result.result.fileName
        file.url = result.result.url
        this.img = result.result.url
        this.$refs.upload.fileList.length = 0
        this.$refs.upload.fileList[0] = file
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '请上传正确的文件格式'
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: file.name + '已超过2M.'
      })
    },
    handleBeforeUpload(file) {
      return true
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList
  },
  watch: {
    img(newImg, oldImg) {
      if (!newImg) {
        this.handleRemove()
      }
    }
  }
}
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
