<template>
  <div class="simpleuploader">
    <Upload
      :max-size="5120" 
      :format="['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']" 
      :data="{ fileType: '2' }" 
      :headers="{ 'Authorization' : 'Bearer ' + token }" 
      :action="actionUrl" 
      :before-upload="beforeUpload" 
      :on-success="onUploadSuccess" 
      :on-format-error="onFormatError" 
      :on-exceeded-size="onSizeError" 
      :on-error="onError" 
      :on-remove="onRemove"
      :default-file-list="defaultList"
      ref="uploader"
    >
      <Button icon="ios-cloud-upload-outline">上传附件</Button>
      <div style="color: #ccc; margin-top: 2px;" slot="tip">
        附件格式只能上传word、excel、ppt、txt文件，且不超过5M
      </div>
    </Upload>
    <Alert show-icon closable :type="uploadInfo.alertLevel" v-if="uploadInfo.showAlert">{{ uploadInfo.alertTxt }}</Alert>
  </div>
</template>

<script>  
import apiConfig from '@/config/apiconfig'
import { mapState } from 'vuex'

export default {
  name: 'SimpleUpload',

  props: {
    beforeUploadCheck: {
      type: Function,
      required: false
    },
    // 默认已上传的文件列表
    defaultList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      uploadInfo: {
        // 是否显示警告
        showAlert: false,
        // 警告等级, 与iview Alert组件一致
        // info, warning, error
        alertLevel: 'warning',
        // 警告文字
        alertTxt: ''
      }
    }
  },

  computed: {
    ...mapState({
      token: state => state.keycloak.keycloak.token
    }),
  },

  beforeCreate() {
    this.actionUrl = `${apiConfig.bmfUrl}/attachment/files`
  },

  methods: {
    beforeUpload(file) {
      let fileName = file.name

      if (file.size == 0) {
        this.showAlert2s('warning', '附件内容不能为空')
        return false
      }

      // 已存在一个附件则提示
      let checkInfo = this.beforeUploadCheck && this.beforeUploadCheck(file)

      if (checkInfo) {
        this.showAlert2s(checkInfo.type, checkInfo.message)
        return false
      }
    },

    showAlert2s(alertLevel, alertTxt) {
      this.uploadInfo.showAlert = true
      this.uploadInfo.alertLevel = alertLevel
      this.uploadInfo.alertTxt = alertTxt
      setTimeout(() => {
        this.uploadInfo.showAlert = false
      }, 2000)
    },

    onFormatError(file) {
      this.showAlert2s('warning', '仅能上传word, excel, ppt, txt格式文件')
    },

    onSizeError(file) {
      this.showAlert2s('warning', '附件大小不能超过5M')
    },
    
    onRemove() {
      this.$emit('remove')
    },

    onUploadSuccess(res) {
      
      let result
      if (res.status == 200) {
        result = JSON.parse(res.result)
        this.$emit('success', result.result)
      } else {
        this.clearFiles()
        this.$emit('error')
      }
    },

    clearFiles() {
      this.$refs.uploader.clearFiles()
    },

    onError() {
      this.showAlert2s('warning', '上传失败')
      this.$emit('error')
    }
  }
}
</script>

<style lang="less" scoped>
// .simpleuploader.disabled {
//   /deep/ .ivu-upload-select {
//     pointer-events: none;
//   }
// }
</style>