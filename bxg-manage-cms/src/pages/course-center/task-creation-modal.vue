<template>
  <Modal class="creation-modal"
      v-model="modalShow"
      title="新建学习任务"
      :loading="loading"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      >
    <Form label-position="top" :model="formData" :rules="ruleFormData" ref="creationForm">
      <Row>
        <Col span="20" offset="2">
          <FormItem label="任务名称：" prop="taskName">
            <Input placeholder="请输入任务名称" v-model="formData.taskName" />
            <span class="input-remark">50字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20" offset="2">
          <FormItem label="任务说明：" prop="taskDesc">
            <Input type="textarea" :rows="8" placeholder="请输入任务说明" v-model="formData.taskDesc" />
            <span class="input-remark">500字</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20" offset="2">
          <TaskUpload @success="onSuccess" @remove="onRemove" :beforeUploadCheck="beforeUploadCheck" ref="taskUploader" />
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import TaskUpload from './simple-uploader/simple-uploader'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: [ 'value' ],
  
  components: {
    TaskUpload
  },

  data() {
    return {
      // 
      formData: {
        taskName: '',
        taskDesc: '',
        attachment: ''
      },

      // 
      ruleFormData: {
        taskName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字', trigger: 'blur' }
        ],
        taskDesc: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { max: 500, message: '不能超过500个',  trigger: 'blur' }
        ]
      },

      loading: true
    } 
  },

  computed: {
    modalShow: {
      get() {
        return this.value
      },

      set(val) {
        this.$emit('change', val)
      }
    }
  },

  watch: {
    value(newVal) {
      // 打开弹窗时，清理表单
      if (newVal) {
        this.$refs.creationForm.resetFields()
        this.$refs.taskUploader.clearFiles()
        this.resetAttachment()
      }
    }
  },

  beforeCreate() {
    this.phaseId = Number(this.$route.query.phaseId)
  },

  methods: {
    ...mapActions({
      createTask: 'courseCenter/createTask',
      fetchPageTasks: 'courseCenter/fetchPageTasks'
    }),

    ...mapMutations({
      setTaskPageInfo: 'courseCenter/setTaskPageInfo'
    }),

    ok() {
      let self = this
      let _ = this.$_
      let formData = this.formData

      this.$refs.creationForm.validate(valid => {

        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }

        let params = _.pipe([
          _.pick(['taskName', 'taskDesc', 'attachment']),
          (obj) => {
            return {
              name: _.property('taskName', obj),
              remark: _.property('taskDesc', obj),
              attachPath: _.property('attachment', obj)
            }
          }
        ])(formData)
        
        params.oeTeachingStageId = this.phaseId

        let status
        let message = ''
                         
        this.createTask(params)
          .then(data => {
            status = data.status
            message = data.message
          })
          .catch(err => {})
          .finally(() => {
            if (status == 201) {
              self.$Message.success({
                content: '新建成功！',
                onClose: function() {
                  self.modalShow = false
                }
              })
              self.setTaskPageInfo({
                current: 1
              })
              self.fetchPageTasks()
            } else {
              // 403状态码 为 该阶段下学习任务名称重复
              if (status != 403) {
                self.modalShow = false
              } else {
                self.loading = false
                self.$nextTick(() => {
                  self.loading = true
                })
              }
              self.$Message.error(message)
            }
          })
      })
    },
    
    cancel() {
      this.modalShow = false
    },
    
    // 上传成功
    onSuccess(result) {
      this.formData.attachment = result.url
    },

    resetAttachment() {
      this.formData.attachment = ''
    },

    // 由于只有一个附件，简单处理
    onRemove() {
      this.resetAttachment()
    },

    beforeUploadCheck(file) {
      if (this.formData.attachment) {
        return {
          type: 'warning',
          message: '只能上传一个附件'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.creation-modal {
  .input-remark {
    position: absolute;
    bottom: -30px;
    right: 0;
    color: #ccc;
  }
}
</style>
